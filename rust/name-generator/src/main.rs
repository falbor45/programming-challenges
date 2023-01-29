use std::fs;
use serde::{Deserialize, Serialize};
use serde_json::Result;
use rand::{Rng, thread_rng};

#[derive(Serialize, Deserialize)]
struct Names {
    first_names: Vec<String>,
    last_names: Vec<String>,
}

fn source_names_from_json(path: &str) -> Names {
    let json_string = fs::read_to_string(path).unwrap();

    let list_of_names = serde_json::from_str(&json_string);

    list_of_names.unwrap()
}

fn get_random_name(list_of_names: &Vec<String>) -> &String {
    let rng = thread_rng().gen_range(0..list_of_names.len());

    list_of_names.get(rng).unwrap()
}

fn main() -> Result<()> {
    let names = source_names_from_json("./static/names.json");

    println!("{} {}", get_random_name(&names.first_names), get_random_name(&names.last_names));

    Ok(())
}
