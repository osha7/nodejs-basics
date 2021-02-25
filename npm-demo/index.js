var _ = require('underscore');  // this loads underscore library

// Core module
// file or folder in project? no it's a library
// this module exists in the node_modules folder ? yes


// contains:   
    // _.contains(list, value, [fromIndex]) Aliases: include, includes
    // Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

    // _.contains([1, 2, 3], 3);
    // => true

var result = _.contains([1, 2, 3], 2);

console.log(result);