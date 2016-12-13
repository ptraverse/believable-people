# Believable-People

https://www.youtube.com/watch?v=Ypkv0HeUvTc

### Requirements 
```
# Node + NPM
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Mongo
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Dev Tools
npm install -g mocha nodemon

```
See the following links:
* https://nodejs.org/en/download/package-manager/
* https://yarnpkg.com/en/docs/install#linux-tab
* https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### Deploy
t0
```
yarn install
service mongod start
```
t1
```
npm run webpack
```
t2
```
npm run 
```

### A note about CSV files
Excel saves CSV's with a ^M newline character. NOT the same as Dos new line... these can be fixed with substitution in vim:
```
:%s/\r/\r/g
```


### Test
```
mocha
```
<img src="/mocha-screenshot.png" />