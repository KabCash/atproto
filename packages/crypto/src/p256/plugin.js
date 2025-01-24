"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p256Plugin = void 0;
var operations_1 = require("./operations");
var encoding_1 = require("./encoding");
var const_1 = require("../const");
exports.p256Plugin = {
    prefix: const_1.P256_DID_PREFIX,
    jwtAlg: const_1.P256_JWT_ALG,
    verifySignature: operations_1.verifyDidSig,
    compressPubkey: encoding_1.compressPubkey,
    decompressPubkey: encoding_1.decompressPubkey,
};
exports.default = exports.p256Plugin;
