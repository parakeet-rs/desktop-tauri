use std::fs::File;

use parakeet_crypto::{
    interfaces::decryptor::Decryptor,
    tencent::{qmc2::QMC2, qmc2_footer_parser::QMCFooterParser},
};
use tauri::State;

use crate::state::config::AppConfigState;

#[tauri::command]
pub fn decrypt_qmc2(config: State<AppConfigState>, path: String) -> Result<bool, String> {
    let qmc2 = { config.0.lock().unwrap().qmc2 };
    let mut parser = QMCFooterParser::new(qmc2.seed);
    parser.set_key_stage1(qmc2.stage_1_key);
    parser.set_key_stage2(qmc2.stage_2_key);
    let qmc2 = QMC2::new(parser);

    let mut src_file = File::open(&path).or(Err("open file failed"))?;
    qmc2.check(&mut src_file)
        .map_err(|err| format!("ERR: {:?}", err))?;
    let mut out_file = File::create(path + "_fixme.flac").or(Err("open file failed"))?;
    qmc2.decrypt(&mut src_file, &mut out_file)
        .map_err(|err| format!("ERR: {:?}", err))?;
    Ok(true)
}
