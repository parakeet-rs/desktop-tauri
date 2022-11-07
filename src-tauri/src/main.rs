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
        .manage(AppConfigState::default())
        .setup(|app| {
            let app_config_state = app.state::<AppConfigState>();
            let mut config = app_config_state.0.lock().unwrap();
            config.read_from_fs();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::fs::stat_file,
            commands::config::fetch_config,
            commands::config::save_config,
            commands::config::reload_config,
            commands::util::b64_to_hex,
            commands::util::hex_to_b64,
            commands::crypto::decrypt_qmc2,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
