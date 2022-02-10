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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsManager = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
var webpack_sources_1 = require("webpack-sources");
var FsManager = /** @class */ (function (_super) {
    __extends(FsManager, _super);
    function FsManager() {
        return _super.call(this, 'FsManager') || this;
    }
    FsManager.prototype.resolveData = function (data) {
        // 将代码重新放回原始的资源列表当中
        data.forEach(function (item) {
            var codes = item.codes, oriAssets = item.oriAssets;
            codes.forEach(function (code) {
                if (code.isAppend) {
                    oriAssets[code.filePath] = new webpack_sources_1.ConcatSource(oriAssets[code.filePath], code.code);
                }
                else {
                    oriAssets[code.filePath] = new webpack_sources_1.ConcatSource(code.code);
                }
            });
        });
        return _super.prototype.resolveData.call(this, data);
    };
    return FsManager;
}(octopus_shared_1.BaseApp));
exports.FsManager = FsManager;
