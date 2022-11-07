use tauri::State;

use crate::state::config::AppConfigState;

#[tauri::command]
pub fn fetch_config(config: State<AppConfigState>) -> Result<String, String> {
    let config = config.0.lock().unwrap();
    Ok(config.to_json())
}

#[tauri::command]
pub fn save_config(config: State<AppConfigState>, json: String) -> Result<(), String> {
    let mut config = config.0.lock().unwrap();
    config.read_from_json(&json);
    config.save_to_fs()?;
    Ok(())
}

#[tauri::command]
pub fn reload_config(config: State<AppConfigState>) -> Result<String, String> {
    let mut config = config.0.lock().unwrap();
    config.read_from_fs();
    Ok(config.to_json())
}
