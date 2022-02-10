"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
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
exports.CodeGen = exports.genCodeFormAst = exports.genJSCodeFromAst = exports.baseOption = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
var generator_1 = __importDefault(require("@babel/generator"));
var baseOption = function (info) { return ({
    retainLines: false,
    sourceMaps: false,
    decoratorsBeforeExport: true,
    compact: true,
    filename: info.filePath,
    comments: false,
    minified: true,
    jsescOption: {
        quotes: "double",
    },
}); };
exports.baseOption = baseOption;
function genJSCodeFromAst(ast, filePath) {
    var tsCode = (0, generator_1.default)(ast, (0, exports.baseOption)({
        filePath: filePath,
        ast: ast
    }));
    return {
        filePath: filePath,
        code: tsCode.code,
        prettier: true,
        prettierOptions: { semi: true, parser: 'babel' }
    };
}
exports.genJSCodeFromAst = genJSCodeFromAst;
function genCodeFormAst(asts) {
    var infos = [];
    Object.keys(asts.js).forEach(function (baseFilePath) {
        var fileAsts = asts.js[baseFilePath];
        fileAsts.forEach(function (file) {
            var _a;
            var info = genJSCodeFromAst(file, ((_a = file.extra) === null || _a === void 0 ? void 0 : _a.fileName) || baseFilePath);
            infos.push(info);
        });
    });
    Object.keys(asts.wxml).forEach(function (baseFilePath) {
        var fileAst = asts.wxml[baseFilePath];
        infos.push({
            filePath: baseFilePath,
            code: fileAst
        });
    });
    return infos;
}
exports.genCodeFormAst = genCodeFormAst;
var CodeGen = /** @class */ (function (_super) {
    __extends(CodeGen, _super);
    function CodeGen() {
        return _super.call(this, "CodeGen") || this;
    }
    CodeGen.prototype.resolveData = function (data) {
        // todo 将抽象语法树生成代码
        data.forEach(function (item) {
            var _a;
            (_a = item.codes).push.apply(_a, genCodeFormAst(item.asts));
        });
        // console.log(data[0].codes)
        return _super.prototype.resolveData.call(this, data);
    };
    return CodeGen;
}(octopus_shared_1.BaseApp));
exports.CodeGen = CodeGen;
