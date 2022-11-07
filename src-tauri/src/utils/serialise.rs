use serde::{Deserialize, Deserializer, Serializer};

pub fn bytes_to_base64<T: AsRef<[u8]>, S: Serializer>(
    val: &T,
    serializer: S,
) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(&base64::encode(val))
}

pub fn byte_vec_from_base64<'de, D: Deserializer<'de>>(
    deserializer: D,
) -> Result<Vec<u8>, D::Error> {
    use serde::de;

    <&str>::deserialize(deserializer).and_then(|s| {
        base64::decode(s)
            .map_err(|e| de::Error::custom(format!("invalid base64 string: {}, {}", s, e)))
    })
}

pub fn byte_array_from_base64<'de, const WIDTH: usize, D: Deserializer<'de>>(
    deserializer: D,
) -> Result<[u8; WIDTH], D::Error> {
    let data = byte_vec_from_base64(deserializer)?;

    let copy_len = usize::min(data.len(), WIDTH);
    let mut buffer = [0u8; WIDTH];
    buffer[..copy_len].copy_from_slice(&data[..copy_len]);
    Ok(buffer)
}
