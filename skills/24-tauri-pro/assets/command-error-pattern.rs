use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(tag = "code", content = "message")]
pub enum CommandError {
    InvalidInput(String),
    NotFound(String),
    PermissionDenied(String),
    Internal(String),
}

pub type CommandResult<T> = Result<T, CommandError>;

impl From<std::io::Error> for CommandError {
    fn from(err: std::io::Error) -> Self {
        CommandError::Internal(err.to_string())
    }
}
