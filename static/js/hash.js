// common.js
const crypto = require('crypto');

// keccak (SHA-3)
const keccakHash = crypto.createHash('keccak256').update('your_string').digest('hex');

// SHA


// shake256
const shake256Hash = crypto.createHash('shake256').update('your_string').digest('hex');

// MD5
const md5Hash = crypto.createHash('md5').update('your_string').digest('hex');


// MD4, MD2
function md4(str) {
    const hash = crypto.createHash('md4');
    hash.update(str);
    return hash.digest('hex');
}
const md4Hash = md4('your_string');

// CRC32
const crc32Hash = require('crc32').unsigned('your_string');

// CRC16
const crc16Hash = require('crc').crc16('your_string');


console.log('keccak:', keccakHash);
console.log('sha1:', sha1Hash);
console.log('sha256:', sha256Hash);
console.log('sha384:', sha384Hash);
console.log('sha512:', sha512Hash);
console.log('sha512/256:', sha512_256Hash);
console.log('sha512/224:', sha512_224Hash);
console.log('shake256:', shake256Hash);
console.log('md5:', md5Hash);
console.log('md4:', md4Hash);
console.log('crc16:', crc16Hash);
console.log('sha1:', sha1Hash);
console.log('sha512/256:', sha512_256Hash);
console.log('sha512/224:', sha512_224Hash);
console.log('shake256:', shake256Hash);
console.log('md5:', md5Hash);
console.log('crc32:', crc32Hash);
