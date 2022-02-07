"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchHTMLText = exports.astCallObjectMethod = exports.astObjectPropertyFn = void 0;
var types_1 = require("@babel/types");
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
