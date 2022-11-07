use tauri::{Manager, Runtime};

use crate::state::config::AppConfigState;

#[tauri::command]
pub fn fetch_config<R: Runtime>(app: tauri::AppHandle<R>) -> Result<String, String> {
    let config = app.state::<AppConfigState>();
    Ok(serde_json::to_string(config.inner()).unwrap())
}
