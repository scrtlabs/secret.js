all: src/contract.rs src/lib.rs src/msg.rs Cargo.toml Cargo.lock
	rustup target add wasm32-unknown-unknown
	RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown
	cat ./target/wasm32-unknown-unknown/release/ibc_hooks_contract.wasm | gzip -9 > ../ibc-hooks.wasm.gz

clean:
	cargo clean
	-rm -f ./ibc-hooks-contract.wasm ../ibc-hooks-contract.wasm.gz