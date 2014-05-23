.PHONY: init clean

init:
	npm install
	bower install
	grunt less

clean:
	rm .*.un~
