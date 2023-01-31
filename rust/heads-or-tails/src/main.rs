use std::io::Write;
use rand::{{Rng, thread_rng}};

fn get_percentage(x: f32, y: f32) -> String {
    // Convert to percentage string.
    let result = (x * 100.0) / y;
    return format!("{}%", result);
}

enum CoinSide {
    HEADS,
    TAILS
}

fn flip_a_coin() -> CoinSide {
    if thread_rng().gen_range(1..3) == 1 {
        CoinSide::HEADS
    } else {
        CoinSide::TAILS
    }
}

fn prompt_coin_toss_count() -> i32 {
    println!("Please specify amount of tosses to perform:");
    std::io::stdout().flush().unwrap();
    let mut toss_amount = String::new();
    std::io::stdin().read_line(&mut toss_amount).expect("Failed to read coin toss number");

    let trimmed_toss_amount = toss_amount.trim();

    match trimmed_toss_amount.parse::<i32>() {
        Ok(i) => i,
        Err(..) => {
            println!("Given number is not an integer (i32).");
            prompt_coin_toss_count()
        }
    }
}

fn log_outcome(heads: f32, tails: f32, tosses: f32) {
    println!("{} Heads {} - {} Tails {}",
             get_percentage(heads, tosses),
             heads,
             tails,
             get_percentage(tails, tosses)
    );
}

fn main() {
    let mut toss_count = 0;
    let mut tails_counter = 0;
    let mut heads_counter = 0;

    let toss_count_target = prompt_coin_toss_count();

    println!("Tossing {} times...", toss_count_target);
    while toss_count < toss_count_target {
        match flip_a_coin() {
            CoinSide::TAILS => tails_counter += 1,
            CoinSide::HEADS => heads_counter += 1,
        }
        toss_count += 1;
    }
    log_outcome(
        heads_counter as f32,
        tails_counter as f32,
        toss_count_target as f32
    );
    println!("Finished!")
}
