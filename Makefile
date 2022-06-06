build:
	yarn build

publish-alpha: build
	npm version prerelease --preid=alpha
	npm publish --tag alpha
	git push
	git push --tags

publish-beta: build
	npm version prerelease --preid=beta
	npm publish --tag beta
	git push
	git push --tags
