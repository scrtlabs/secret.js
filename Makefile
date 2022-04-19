build:
	yarn build

publish-alpha: build
	npm version prerelease --preid=alpha
	npm publish --tag alpha

publish-beta: build
	npm version prerelease --preid=beta
	npm publish --tag beta

publish-minor: build
	npm version minor
	npm publish
