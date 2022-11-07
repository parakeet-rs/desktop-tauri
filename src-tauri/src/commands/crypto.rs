use std::fs::File;

use parakeet_crypto::{
    interfaces::decryptor::Decryptor,
    tencent::{qmc2, qmc2_footer_parser::QMCFooterParser},
};
use tauri::{Manager, Runtime};

use crate::state::config::AppConfigState;

#[tauri::command]
pub fn check_qmc2<R: Runtime>(
    app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
    path: String,
) -> Result<bool, String> {
    let config = app.state::<AppConfigState>();
    let f = File::open(path).or(Err("open file failed"))?;
    // let parser = QMCFooterParser::new(seed);
    Ok(true)
}
