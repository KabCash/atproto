"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDidKey = exports.parseDidKey = exports.formatMultikey = exports.parseMultikey = void 0;
var uint8arrays = require("uint8arrays");
var const_1 = require("./const");
var plugins_1 = require("./plugins");
var utils_1 = require("./utils");
var parseMultikey = function (multikey) {
    var prefixedBytes = (0, utils_1.extractPrefixedBytes)(multikey);
    var plugin = plugins_1.default.find(function (p) { return (0, utils_1.hasPrefix)(prefixedBytes, p.prefix); });
    if (!plugin) {
        throw new Error('Unsupported key type');
    }
    var keyBytes = plugin.decompressPubkey(prefixedBytes.slice(plugin.prefix.length));
    return {
        jwtAlg: plugin.jwtAlg,
        keyBytes: keyBytes,
    };
};
exports.parseMultikey = parseMultikey;
var formatMultikey = function (jwtAlg, keyBytes) {
    var plugin = plugins_1.default.find(function (p) { return p.jwtAlg === jwtAlg; });
    if (!plugin) {
        throw new Error('Unsupported key type');
    }
    var prefixedBytes = uint8arrays.concat([
        plugin.prefix,
        plugin.compressPubkey(keyBytes),
    ]);
    return (const_1.BASE58_MULTIBASE_PREFIX + uint8arrays.toString(prefixedBytes, 'base58btc'));
};
exports.formatMultikey = formatMultikey;
var parseDidKey = function (did) {
    var multikey = (0, utils_1.extractMultikey)(did);
    return (0, exports.parseMultikey)(multikey);
};
exports.parseDidKey = parseDidKey;
var formatDidKey = function (jwtAlg, keyBytes) {
    return const_1.DID_KEY_PREFIX + (0, exports.formatMultikey)(jwtAlg, keyBytes);
};
exports.formatDidKey = formatDidKey;
