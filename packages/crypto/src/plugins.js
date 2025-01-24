"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
var plugin_1 = require("./p256/plugin");
var plugin_2 = require("./secp256k1/plugin");
exports.plugins = [plugin_1.default, plugin_2.default];
exports.default = exports.plugins;
