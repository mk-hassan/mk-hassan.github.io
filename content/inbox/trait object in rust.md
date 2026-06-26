---
tags:
  - Rust
type: fleeting
date: 25-05-2026
destination:
---
```rust
use std::error::Error; // --snip-- 

fn run(config: Config) -> Result<(), Box<dyn Error>> { 
	let contents = fs::read_to_string(config.file_path)?; 
	
	println!("With text:\n{contents}"); 
	
	Ok(()) 
}
```

what is `Box<dyn Error>`, the [article](https://doc.rust-lang.org/book/ch12-03-improving-error-handling-and-modularity.html#returning-errors-from-run) mentions it means that the function will return a type that implements the `Error` trait.

