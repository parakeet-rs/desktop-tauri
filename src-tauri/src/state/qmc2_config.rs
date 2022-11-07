use crate::utils::serialise::{byte_array_from_base64, bytes_to_base64};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct QMC2Config {
    pub seed: u8,

    #[serde(
        serialize_with = "bytes_to_base64",
        deserialize_with = "byte_array_from_base64"
    )]
    pub stage_1_key: [u8; 16],

    #[serde(
        serialize_with = "bytes_to_base64",
        deserialize_with = "byte_array_from_base64"
    )]
    pub stage_2_key: [u8; 16],
}
