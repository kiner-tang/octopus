"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseAst = exports.matchHTMLText = exports.astCallObjectMethod = exports.astObjectPropertyFn = void 0;
var types_1 = require("@babel/types");
var fs_1 = require("fs");
var parser_1 = require("@babel/parser");
var common_1 = require("./common");
function astObjectPropertyFn(_a) {
    var name = _a.name, _b = _a.id, id = _b === void 0 ? name : _b, _c = _a.params, params = _c === void 0 ? [] : _c, body = _a.body, _d = _a.generator, generator = _d === void 0 ? false : _d, _e = _a.async, async = _e === void 0 ? false : _e;
    return (0, types_1.objectProperty)((0, types_1.stringLiteral)(name), (0, types_1.functionExpression)((0, types_1.identifier)(id), params, (0, types_1.blockStatement)(body), async, generator));
}
exports.astObjectPropertyFn = astObjectPropertyFn;
/**
 * 调用对象方法的 ast
 * @param objName 对象名称
 * @param methodName 方法名称
 * @param params 参数名
 * @returns
 */
function astCallObjectMethod(objName, methodName, params) {
    return (0, types_1.callExpression)((0, types_1.memberExpression)((0, types_1.identifier)(objName), (0, types_1.identifier)(methodName)), params);
}
exports.astCallObjectMethod = astCallObjectMethod;
exports.matchHTMLText = /[^><]+(?=<\/p>)/img;
/**
 * 创建一个AST对象
 * @param tplPath 可选，根据本地模版文件直接创建AST对象
 */
function createBaseAst(tplPath, exportFileName) {
    var core = "";
    if (tplPath) {
        core = (0, fs_1.readFileSync)(tplPath).toString("utf-8");
    }
    var ast = (0, parser_1.parse)(core, common_1.defaultAstParserOption);
    if (exportFileName) {
        ast.extra = {
            fileName: exportFileName
        };
    }
    return ast;
}
exports.createBaseAst = createBaseAst;
