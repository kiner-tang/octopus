import { Identifier, ObjectProperty, Pattern, RestElement, Expression, SpreadElement, JSXNamespacedName, ArgumentPlaceholder, Statement, File } from '@babel/types';
/**
 * 生成对象属性
 */
export declare type AstObjectPropertyOptions = {
    name: string;
    id?: string;
    params?: Array<Identifier | Pattern | RestElement>;
    body: Statement[];
    generator?: boolean;
    async?: boolean;
};
export declare function astObjectPropertyFn({ name, id, params, body, generator, async, }: AstObjectPropertyOptions): ObjectProperty;
/**
 * 调用对象方法的 ast
 * @param objName 对象名称
 * @param methodName 方法名称
 * @param params 参数名
 * @returns
 */
export declare function astCallObjectMethod(objName: string, methodName: string, params: (Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder)[]): import("@babel/types").CallExpression;
export declare const matchHTMLText: RegExp;
/**
 * 创建一个AST对象
 * @param tplPath 可选，根据本地模版文件直接创建AST对象
 */
export declare function createBaseAst(tplPath?: string, exportFileName?: string): File;
