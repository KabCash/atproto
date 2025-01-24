"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPrefix = exports.extractPrefixedBytes = exports.extractMultikey = void 0;
var uint8arrays = require("uint8arrays");
var const_1 = require("./const");
var extractMultikey = function (did) {
    if (!did.startsWith(const_1.DID_KEY_PREFIX)) {
        throw new Error("Incorrect prefix for did:key: ".concat(did));
    }
    return did.slice(const_1.DID_KEY_PREFIX.length);
};
exports.extractMultikey = extractMultikey;
var extractPrefixedBytes = function (multikey) {
    if (!multikey.startsWith(const_1.BASE58_MULTIBASE_PREFIX)) {
        throw new Error("Incorrect prefix for multikey: ".concat(multikey));
    }
    return uint8arrays.fromString(multikey.slice(const_1.BASE58_MULTIBASE_PREFIX.length), 'base58btc');
};
exports.extractPrefixedBytes = extractPrefixedBytes;
var hasPrefix = function (bytes, prefix) {
    return uint8arrays.equals(prefix, bytes.subarray(0, prefix.byteLength));
};
exports.hasPrefix = hasPrefix;
