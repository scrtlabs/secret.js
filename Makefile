build:
	yarn build

publish-alpha: build
	yarn doc
	npm version prerelease --preid=alpha
	npm publish --tag alpha

publish-beta: build
	yarn doc
	npm version prerelease --preid=beta
	npm publish --tag beta

publish-minor: build
	yarn doc
	npm version minor
	npm publish

start-testnet: # CTRL+C to stop
	docker run -it --rm \
		-p 26657:26657 \
		--name secretjs-testnet enigmampc/secret-network-sw-dev:v1.2.2-1