'use strict';

const misc = require('./methods/misc');
const userValidation = require('./methods/user-validation');

function extractMethodsArray(name, object){
    const methodsArray = [];
    for (let property in object) {
        methodsArray.push({
            name: `${name}.${property}`,
            method: object[property]
        });
    }
    return methodsArray;
};

exports.methods = [].concat(
    extractMethodsArray('utils', misc),
    extractMethodsArray('utils', userValidation)
);