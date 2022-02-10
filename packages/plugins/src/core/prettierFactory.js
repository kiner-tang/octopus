"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrettierFactory = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
var prettier_1 = __importDefault(require("prettier"));
var PrettierFactory = /** @class */ (function (_super) {
    __extends(PrettierFactory, _super);
    function PrettierFactory() {
        return _super.call(this, "Prettier") || this;
    }
    PrettierFactory.prototype.resolveData = function (data) {
        data.forEach(function (item) { return item.codes.forEach(function (code) {
            if (code.prettier) {
                code.code = prettier_1.default.format(code.code, code.prettierOptions);
            }
        }); });
        return _super.prototype.resolveData.call(this, data);
    };
    return PrettierFactory;
}(octopus_shared_1.BaseApp));
exports.PrettierFactory = PrettierFactory;
