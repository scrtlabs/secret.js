build:
	yarn build

npm-publish-patch: build
	npm version patch
	npm publish
	git push --follow-tags

npm-publish-minor: build
	npm version minor
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

run-localsecret:
	sudo docker compose -f test/docker-compose.yml up

kill-localsecret:
	sudo docker compose -f test/docker-compose.yml stop 
	sudo docker compose -f test/docker-compose.yml rm -f 