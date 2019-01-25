
// let crypto;
// try {
//     crypto = require('crypto');
// } catch (err) {
//     console.log('no crypt');
// }


// var config = {
//     cryptkey: crypto.createHash('sha256').update('Nixnogen').digest(),
//     iv: 'a2xhcgAAAAAAAAAA'
//     // iv: crypto.randomBytes()
// }

// exports.encrypt = function(text) {
//     console.log(config.cryptkey)
//     var cipher = crypto.createCipheriv('aes-256-cbc', config.cryptkey, config.iv)
//     return Buffer.concat([
//         cipher.update(text),
//         cipher.final()
//     ]).toString('base64') // Output base64 string
// }

// exports.decrypt = function(text) {
//     console.log(config.cryptkey)
//     if (text === null || typeof text === 'undefined' || text === '') {
//         return text
//     }
//     var decipher = crypto.createDecipheriv('aes-256-cbc', config.cryptkey, config.iv)
//     return Buffer.concat([
//         decipher.update(text, 'base64'), // Expect `text` to be a base64 string
//         decipher.final()
//     ]).toString()
// }

// // https://nodejs.org/api/crypto.html#crypto_class_decipher
// // https://nodejs.org/api/crypto.html#crypto_class_cipher

const salt = 'salt';
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';


// // export class Cryptor {
// // private static readonly salt: string = 'salt';
// // private static readonly algorithm: string = 'aes-192-cbc';
// // private static readonly password: string = 'Password used to generate key';

exports.encrypt = function (cleartext) {
    var encrypted = '';
    let crypto;

    try {
        crypto = require('crypto');
    } catch (err) {
        console.log('no crypt');
    }

    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, salt, 24);
    console.log('encrypt key: ',key);

    // Use `crypto.randomBytes()` to generate a random iv instead of the static iv
    // shown here.
    // const iv = Buffer.alloc(16, 0); // Initialization vector.
    const iv = crypto.randomBytes(16);
    console.log('encrypt iv: ', iv);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    encrypted = cipher.update(cleartext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    encrypted += iv.toString('hex');

    // cipher.on('readable', () => {
    //     let chunk;
    //     while (null !== (chunk = cipher.read())) {
    //         console.log('encrypt chunk: ', chunk);
    //         encrypted += chunk.toString('hex');
    //     }
    // });
    // cipher.on('end', () => {
    //     console.log(encrypted);
    //     // Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
    // });

    // cipher.write(cleartext);
    // cipher.end();


    return encrypted;
}

exports.decrypt = function (encrypted) {
    let decrypted = '';
    let crypto;

    try {
        crypto = require('crypto');
    } catch (err) {
        console.log('no crypt');
    }

    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, salt, 24);
    console.log('decrypt key: ', key);

    // The IV is usually passed along with the ciphertext.
    // const iv = Buffer.alloc(16, 0); // Initialization vector.
    const splitat = index => x => [x.slice(0,index), x.slice(index)];
    encrarr = splitat(32)(encrypted);
    console.log(encrarr);

    const iv = Buffer.from(encrarr[1], 'hex');
    console.log('decryt iv: ', iv);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    decrypted = decipher.update(encrarr[0], 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // decipher.on('readable', () => {
    //     let chunk;
    //     while (null !== (chunk = decipher.read())) {
    //         console.log('decrypt chunk: ', chunk);
    //         decrypted += chunk.toString('base64');
    //     }
    // });
    // decipher.on('end', () => {
    //     console.log(decrypted);
    //     // Prints: some clear text data
    // });

    // decipher.write(encrypted, 'hex');
    // decipher.end();

    return decrypted;
}

