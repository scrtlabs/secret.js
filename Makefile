build:
	yarn build

publish-alpha: build
	npm version prerelease --preid=alpha
	npm publish --tag alpha

publish-beta: build
	npm version prerelease --preid=beta
	npm publish --tag beta

start-testnet: # CTRL+C to stop
	docker run -it -d \
		-p 26657:26657 -p 26656:26656 -p 1317:1317 \
		--name secretjs-testnet enigmampc/secret-network-sw-dev:v1.2.2-1