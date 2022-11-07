use std::{fs::File, io::Read};

use serde::{Deserialize, Serialize};

use super::qmc2_config::QMC2ConfigState;

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct AppConfigState {
    qmc2: QMC2ConfigState,
}

impl AppConfigState {
    pub fn read_from_json(&mut self) {
        let cur_dir_path = std::env::current_dir().unwrap();
        let config_file_path = cur_dir_path.join("parakeet.json");
        let config_file_path = config_file_path.to_str().unwrap();
        println!("config_file_path: {}", config_file_path);

        let mut file = File::open(config_file_path).unwrap();
        let mut data = String::new();
        file.read_to_string(&mut data).unwrap();
        let new_data = serde_json::from_str::<AppConfigState>(&data).unwrap();
        *self = new_data;
    }
}
