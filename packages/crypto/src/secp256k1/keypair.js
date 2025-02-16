"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1Keypair = void 0;
var secp256k1_1 = require("@noble/curves/secp256k1");
var sha256_1 = require("@noble/hashes/sha256");
var uint8arrays_1 = require("uint8arrays");
var const_1 = require("../const");
var did = require("../did");
var Secp256k1Keypair = /** @class */ (function () {
    function Secp256k1Keypair(privateKey, exportable) {
        this.privateKey = privateKey;
        this.exportable = exportable;
        this.jwtAlg = const_1.SECP256K1_JWT_ALG;
        this.publicKey = secp256k1_1.secp256k1.getPublicKey(privateKey);
    }
    Secp256k1Keypair.create = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exportable, privKey;
            return __generator(this, function (_b) {
                _a = (opts || {}).exportable, exportable = _a === void 0 ? false : _a;
                privKey = secp256k1_1.secp256k1.utils.randomPrivateKey();
                return [2 /*return*/, new Secp256k1Keypair(privKey, exportable)];
            });
        });
    };
    Secp256k1Keypair.import = function (privKey, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exportable, privKeyBytes;
            return __generator(this, function (_b) {
                _a = (opts || {}).exportable, exportable = _a === void 0 ? false : _a;
                privKeyBytes = typeof privKey === 'string' ? (0, uint8arrays_1.fromString)(privKey, 'hex') : privKey;
                return [2 /*return*/, new Secp256k1Keypair(privKeyBytes, exportable)];
            });
        });
    };
    Secp256k1Keypair.prototype.publicKeyBytes = function () {
        return this.publicKey;
    };
    Secp256k1Keypair.prototype.publicKeyStr = function (encoding) {
        if (encoding === void 0) { encoding = 'base64pad'; }
        return (0, uint8arrays_1.toString)(this.publicKey, encoding);
    };
    Secp256k1Keypair.prototype.did = function () {
        return did.formatDidKey(this.jwtAlg, this.publicKey);
    };
    Secp256k1Keypair.prototype.sign = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var msgHash, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sha256_1.sha256)(msg)
                        // return raw 64 byte sig not DER-encoded
                    ];
                    case 1:
                        msgHash = _a.sent();
                        return [4 /*yield*/, secp256k1_1.secp256k1.sign(msgHash, this.privateKey, { lowS: true })];
                    case 2:
                        sig = _a.sent();
                        return [2 /*return*/, sig.toCompactRawBytes()];
                }
            });
        });
    };
    Secp256k1Keypair.prototype.export = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.exportable) {
                    throw new Error('Private key is not exportable');
                }
                return [2 /*return*/, this.privateKey];
            });
        });
    };
    return Secp256k1Keypair;
}());
exports.Secp256k1Keypair = Secp256k1Keypair;
exports.default = Secp256k1Keypair;
