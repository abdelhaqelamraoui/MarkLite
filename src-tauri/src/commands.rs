use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use thiserror::Error;

/// Error type for file operation commands
#[derive(Debug, Error)]
pub enum CommandError {
    #[error("File not found: {0}")]
    FileNotFound(String),
    #[error("Failed to read file: {0}")]
    ReadError(String),
    #[error("Failed to write file: {0}")]
    WriteError(String),
}

impl Serialize for CommandError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

/// File metadata returned when opening a file
#[derive(Debug, Serialize, Deserialize)]
pub struct FileData {
    pub path: String,
    pub name: String,
    pub content: String,
    pub size: u64,
    pub line_count: usize,
}

/// Read a markdown file from disk
#[tauri::command]
pub async fn read_file(path: String) -> Result<FileData, CommandError> {
    let file_path = PathBuf::from(&path);
    
    if !file_path.exists() {
        return Err(CommandError::FileNotFound(path));
    }
    
    let content = tokio::fs::read_to_string(&file_path)
        .await
        .map_err(|e| CommandError::ReadError(e.to_string()))?;
    
    let metadata = tokio::fs::metadata(&file_path)
        .await
        .map_err(|e| CommandError::ReadError(e.to_string()))?;
    
    let name = file_path
        .file_name()
        .and_then(|n| n.to_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| "Untitled".to_string());
    
    let line_count = content.lines().count();
    
    Ok(FileData {
        path,
        name,
        content,
        size: metadata.len(),
        line_count,
    })
}

/// Save content to a file
#[tauri::command]
pub async fn save_file(path: String, content: String) -> Result<(), CommandError> {
    tokio::fs::write(&path, &content)
        .await
        .map_err(|e| CommandError::WriteError(e.to_string()))?;
    
    Ok(())
}

/// Get just the file info without content (for status bar)
#[tauri::command]
pub async fn get_file_info(path: String) -> Result<FileInfo, CommandError> {
    let file_path = PathBuf::from(&path);
    
    if !file_path.exists() {
        return Err(CommandError::FileNotFound(path));
    }
    
    let metadata = tokio::fs::metadata(&file_path)
        .await
        .map_err(|e| CommandError::ReadError(e.to_string()))?;
    
    let name = file_path
        .file_name()
        .and_then(|n| n.to_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| "Untitled".to_string());
    
    Ok(FileInfo {
        path,
        name,
        size: metadata.len(),
    })
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileInfo {
    pub path: String,
    pub name: String,
    pub size: u64,
}
