use std::{
    fs::File,
    io::{Seek, SeekFrom},
    path::Path,
};

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
    _app: tauri::AppHandle<R>,
    _window: tauri::Window<R>,
    path: String,
) -> Result<FileStatData, String> {
    println!("recv file: {:?}", path);
    let file_path = Path::new(&path);

    let mut f = File::open(file_path).or(Err("open file failed"))?;
    let pos = f.seek(SeekFrom::End(0)).or(Err("seek file failed"))?;
    let file_len = pos;

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
