use std::{fs::File, path::Path};

use serde::{Deserialize, Serialize};
use tauri::Runtime;

#[derive(Debug, Serialize, Deserialize)]
pub struct FileStatData {
    path: String,
    name: String,
    size: u64,
}

#[tauri::command]
pub fn stat_file<R: Runtime>(
    app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
    path: String,
) -> Result<FileStatData, String> {
    println!("recv file: {:?}", path);
    let file_path = Path::new(&path);
    let f = File::open(file_path).or(Err("open file failed"))?;
    let metadata = f.metadata().or(Err("could not query file metadata"))?;
    let file_len = metadata.len();

    let path = file_path.to_str().ok_or("path.to_str() failed")?.to_owned();
    let name = Path::new(&path)
        .file_name()
        .ok_or("could not extract file name")?
        .to_str()
        .ok_or("path.to_str() failed")?
        .to_owned();
    let data = FileStatData {
        name,
        path,
        size: file_len,
    };
    Ok(data)
}
