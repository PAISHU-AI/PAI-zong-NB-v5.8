[CmdletBinding()]
param(
  [string]$CodexHome = $env:CODEX_HOME,
  [switch]$Force,
  [switch]$Uninstall,
  [string]$DailyTime = '10:00',
  [string]$WeeklyTime = '10:30'
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  $CodexHome = Join-Path $HOME '.codex'
}

$MaintainScript = Join-Path $CodexHome 'skills\zhuluyou\scripts\maintain-memory.mjs'
$DailyName = 'PAI-Zong-NB Memory Daily'
$WeeklyName = 'PAI-Zong-NB Memory Weekly'

if (-not $Uninstall -and -not (Test-Path -LiteralPath $MaintainScript)) {
  throw "Missing installed maintenance script: $MaintainScript"
}

$NodeCommand = Get-Command node -ErrorAction Stop
$NodePath = $NodeCommand.Source

function Remove-MemoryTask {
  param([string]$Name)
  $existing = Get-ScheduledTask -TaskName $Name -ErrorAction SilentlyContinue
  if ($null -eq $existing) {
    return "missing:$Name"
  }
  Unregister-ScheduledTask -TaskName $Name -Confirm:$false
  return "removed:$Name"
}

function Register-MemoryTask {
  param(
    [string]$Name,
    [string]$Mode,
    [string]$At,
    [switch]$Weekly
  )

  $existing = Get-ScheduledTask -TaskName $Name -ErrorAction SilentlyContinue
  if ($null -ne $existing -and -not $Force) {
    return "exists:$Name"
  }

  if ($null -ne $existing -and $Force) {
    Unregister-ScheduledTask -TaskName $Name -Confirm:$false
  }

  $arguments = "`"$MaintainScript`" --scope global --$Mode --write-report --codex-home `"$CodexHome`""
  $action = New-ScheduledTaskAction -Execute $NodePath -Argument $arguments
  if ($Weekly) {
    $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At $At
  } else {
    $trigger = New-ScheduledTaskTrigger -Daily -At $At
  }
  $principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive
  $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries
  $task = New-ScheduledTask -Action $action -Trigger $trigger -Principal $principal -Settings $settings
  Register-ScheduledTask -TaskName $Name -InputObject $task | Out-Null
  return "registered:$Name"
}

if ($Uninstall) {
  $daily = Remove-MemoryTask -Name $DailyName
  $weekly = Remove-MemoryTask -Name $WeeklyName
} else {
  $daily = Register-MemoryTask -Name $DailyName -Mode 'daily' -At $DailyTime
  $weekly = Register-MemoryTask -Name $WeeklyName -Mode 'weekly' -At $WeeklyTime -Weekly
}

[pscustomobject]@{
  ok = $true
  platform = 'win32'
  codexHome = $CodexHome
  maintainScript = $MaintainScript
  nodePath = $NodePath
  daily = $daily
  weekly = $weekly
  force = [bool]$Force
  uninstall = [bool]$Uninstall
} | ConvertTo-Json -Depth 4
