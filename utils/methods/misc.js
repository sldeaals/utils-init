// DEP MODULES IMPORT
const fs           = require('fs');
const readXlsxFile = require('read-excel-file/node');

// FUNCTIONS BLOCK
const readFromExcel = async (pathParam) => {
    let rowsArr = [];
    // Readable Stream.
    try {
      rowsArr = await readXlsxFile(fs.createReadStream(pathParam))
                     .then((rows) => rows);
      return rowsArr
    } catch(err){
        console.log(err);
        return err
    }
};
  
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const returnMessageError = err => {
    const message = err.message
        ? err.message
        : (
            typeof err.errors !== "undefined" ? err.errors[0].message : err
        );
    return message || "";    
};

const buildResponse = (message = { message: "" }, didSucceed = false, data) => {
    return {
        success: didSucceed,
        message: returnMessageError(message),
        data: (data === null ? [] : data)
    }
};

const isEmpty = (obj) => {
    for(let key in obj) {
        if (key)
            return false;
        else if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

module.exports = {
    readFromExcel,
    getRandomNumber,
    returnMessageError,
    buildResponse,
    getSecretKey,
    isEmpty
};