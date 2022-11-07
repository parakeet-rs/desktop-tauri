#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use state::config::AppConfigState;
use tauri::Manager;

mod commands;
mod state;
mod utils;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut config = AppConfigState::default();
            config.read_from_json();
            app.manage(config);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::fs::stat_file,
            commands::config::fetch_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
