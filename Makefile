build:
	yarn build

npm-publish: build
	npm version patch
	npm publish
	git push --follow-tags

npm-publish-alpha: build
	npm version prerelease --preid=alpha
	npm publish --tag alpha
	git push --follow-tags

npm-publish-beta: build
	npm version prerelease --preid=beta
	npm publish --tag beta
	git push --follow-tags

