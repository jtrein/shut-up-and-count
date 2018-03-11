[![Build Status](https://travis-ci.org/jtrein/shut-up-and-count.svg?branch=master)](https://travis-ci.org/jtrein/shut-up-and-count)

![alt text](https://raw.githubusercontent.com/jtrein/shut-up-and-count/master/client/src/img/logo.png)

Happily parses your words for total count and occurrence.

## Running locally

To quickly test and run the project locally, copy+paste this full command:

```sh
git clone git@github.com:jtrein/shut-up-and-count.git
cd ./shut-up-and-count
cd ./client
npm install
cd ../server
npm install && npm test
cd ../client
npm test
cd ../server
npm start
echo "Servers started."
```
This will start the server first on PORT 4000 and then the client on PORT 3000.

**Your browser should load a tab @ [http://localhost:3000](http://localhost:3000). The app is now up and ready.**

## Tests
If you wish to run tests separately:

```sh
# inside project root

# server
cd server && npm install && npm test

# client
cd client && npm install && npm test
```
