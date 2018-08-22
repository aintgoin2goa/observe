.PHONY: test

lint:
	eslint

test:
	karma start ./karma.conf.js --single-run

test-dev:
	karma start ./karma.conf.js --auto-watch

test-debug:
	karma start ./karma.conf.js --browsers Chrome
