# Publish a Package to NPM

    add new folder

    add package.json file:
    npm init --yes

    add file: index.js
    add line of code:
        -module.exports.add = function(a, b) { return a + b };

    if no login for npm:
    npm adduser

    already have acct:
    npm login
    username:
    password:
    email:

    npm publish

# Updating a Published Package

    back in lion-lib folder
    in indes.js file
    add line of code:
        -module.exports.multiply = function(a, b) { return a * b };

    run:
    npm version minor

    version was: v1.0.0
    now: v1.1.0

    run:
    npm publish
