build:
	yarn build

publish-beta: build
	npm publish --tag beta
