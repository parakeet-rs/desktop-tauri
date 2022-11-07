#[tauri::command]
pub fn b64_to_hex(text: String) -> Result<String, String> {
    let bytes = base64::decode(text).unwrap_or_default();
    if bytes.is_empty() {
        Ok(String::from(""))
    } else {
        Ok(hex::encode(bytes))
    }
}

#[tauri::command]
pub fn hex_to_b64(text: String) -> Result<String, String> {
    let mut text = text.to_lowercase();
    text.retain(|c| !c.is_whitespace());
    let bytes = hex::decode(text).unwrap_or_default();
    if bytes.is_empty() {
        Ok(String::from(""))
    } else {
        Ok(base64::encode(bytes))
    }
}
