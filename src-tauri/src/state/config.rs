use std::{
    fs::File,
    io::{Read, Write},
    sync::Mutex,
};

use serde::{Deserialize, Serialize};

use super::qmc2_config::QMC2Config;

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct AppConfig {
    pub qmc2: QMC2Config,
}

impl AppConfig {
    pub fn read_from_json(&mut self, json: &str) {
        if let Ok(new_data) = serde_json::from_str::<AppConfig>(json) {
            *self = new_data;
        }
    }

    pub fn get_config_path() -> String {
        let cur_dir_path = std::env::current_dir().unwrap();
        let config_file_path = cur_dir_path.join("parakeet.json");
        String::from(config_file_path.to_str().unwrap())
    }

    pub fn read_from_fs(&mut self) {
        let config_file_path = Self::get_config_path();

        if let Ok(mut file) = File::open(&config_file_path) {
            let mut data = String::new();
            file.read_to_string(&mut data).unwrap();
            self.read_from_json(&data);
        }
    }

    pub fn save_to_fs(&self) -> Result<(), String> {
        let config_file_path = Self::get_config_path();

        let serialised = serde_json::to_string_pretty(self).unwrap();
        if let Ok(mut file) = File::create(config_file_path) {
            file.write_all(serialised.as_bytes())
                .map_err(|_| "could not write config")?;
            Ok(())
        } else {
            Err(String::from("open config file failed"))
        }
    }

    pub fn to_json(self) -> String {
        serde_json::to_string_pretty(&self).unwrap()
    }
}

#[derive(Debug, Default)]
pub struct AppConfigState(pub Mutex<AppConfig>);
