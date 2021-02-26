# To run the server:

    node app.js

# node.js:

https://www.youtube.com/watch?v=TlB_eWDSMt4&ab_channel=ProgrammingwithMosh

    asynchronous - non-blocking

    single thread app

    not good for cpu-intensive apps

    good for data intensive and real time apps

## Install node

    node version:
    node -v

    download latest version:
    nodejs.org
    ---install stable version (not newest)
    -go through installer entire process

    documentation: https://nodejs.org/dist/latest-v14.x/docs/api/

### NPM - Node Package Manager

    command line tool
    registry of 3rd part libraries to add functionality to application

    npm -v (globally)
    ( to have mosh's version:  sudo npm i -g npm@5.5.1  )

### package.json

    json file that holds info about application
    npm init
    name: can just press enter through all the prompts
        is this ok? enter
    workaround flag: npm init --yes

## APPLICATION DEPENDENCIES:

### install npm package: underscore

    npm i underscore

    documentation: http://underscorejs.org/

### install npm package: mongoose

    npm i mongoose

### re-install dependencies:

    npm i

### git

    git init
    git status
    .gitignore file
        node_modules/

    git add .
    git commit -m "..."
    git push

### Caret character -> ^

    Semantic Versioning: SemVer
        "^4.13.6"
    Major.Minor.Patch versions

        -Patch - bugs fixed
        -Minor - adding new features w/out breaking existing API
        -Major - features that may break existing apps

    ^4 - means we are interested in any version of the package as long as the Major version is also 4

    ^4 === 4.x

### Tilda character -> ~

    "~1.8.3"
    ~1.8 - means we are interested in any version as long as the Major is 1 and the Minor version is 8

    ~1.8 === 1.8.x

### Make sure to get exact NPM version:

    remove tilda (~) or carets (^) before the semantic version

### see list of installed dependencies and their versions:

    npm list

### only want to see only your depencies:

    npm list --depth=0

### meta data about npm library:

    npm view mongoose

### interested only on dependencies"

    npm view mongoose dependencies

### versions of a npm library:

    npm view mongoose versions

### downgrade or upgrade a node package:

    npm i mongoose@2.4.2

### find outdate versions of packages:

    npm outdated

    global:
    npm -g outdated

    npm update (only for minor version updates)

    sudo npm i -g npm-check-updates
    npm-check-updates (or ncu -u)

    npm i
    npm outdated

## DEVELOPMENT DEPENDENCIES

### JS Hint

    npm i jshint --save-dev

## Uninstall A Package

    npm un mongoose
