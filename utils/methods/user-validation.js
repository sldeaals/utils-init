const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const validateJWT = (token, usedFor) => {
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT);
        if (!(tokenPayload.use === usedFor)) {
            return null;
        }
    } catch (e) {
        return null;
    }
    return tokenPayload;
};

const validateRequest = (decoded, request, h) => {
    request.logingInfo = decoded;
    return { isValid: true }
};

const sendMail = (transporterOptions, mailOptions) => new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(transporterOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { reject(error) };
        resolve(info);
    })
});

const generateJWT = (payload, secretKey, expiresIn) => {
    const algorithmToUse = 'HS256';
    const options = {
        algorithm: algorithmToUse,
        expiresIn: expiresIn
    }
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

const comparePassword = (passwordToMatch, hashedPass) => {
    return bcrypt.compare(passwordToMatch, hashedPass);
};

module.exports = {
    validateJWT,
    sendMail,
    generateJWT,
    validateRequest,
    hashPassword,
    comparePassword
};