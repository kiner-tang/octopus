import {
  Identifier,
  ObjectProperty,
  Pattern,
  RestElement,
  objectProperty,
  stringLiteral,
  identifier,
  functionExpression,
  blockStatement,
  callExpression,
  memberExpression,
  Expression,
  SpreadElement,
  JSXNamespacedName,
  ArgumentPlaceholder,
  Statement,
  File
} from '@babel/types';

import { readFileSync } from "fs";
import { parse } from "@babel/parser";
import { defaultAstParserOption } from './common';

/**
 * 生成对象属性
 */
export type AstObjectPropertyOptions = {
  name: string;
  id?: string;
  params?: Array<Identifier | Pattern | RestElement>;
  body: Statement[];
  generator?: boolean;
  async?: boolean;
};
export function astObjectPropertyFn({
  name,
  id = name,
  params = [],
  body,
  generator = false,
  async = false,
}: AstObjectPropertyOptions): ObjectProperty {
  return objectProperty(
    stringLiteral(name),
    functionExpression(
      identifier(id),
      params,
      blockStatement(body),
      async,
      generator
    )
  );
}

/**
 * 调用对象方法的 ast
 * @param objName 对象名称
 * @param methodName 方法名称
 * @param params 参数名
 * @returns
 */
export function astCallObjectMethod(
  objName: string,
  methodName: string,
  params: (Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder)[]
) {
    return callExpression(memberExpression(identifier(objName), identifier(methodName)), params);
}

export const matchHTMLText = /[^><]+(?=<\/p>)/img;

/**
 * 创建一个AST对象
 * @param tplPath 可选，根据本地模版文件直接创建AST对象
 */
 export function createBaseAst(tplPath?: string, exportFileName?: string): File {
  let core = "";
  if (tplPath) {
    core = readFileSync(tplPath).toString("utf-8");
  }
  const ast = parse(core, defaultAstParserOption);
  if(exportFileName) {
    ast.extra = {
      fileName: exportFileName
    };
  }
  return ast;
}

const wxAttrReg = /\{\{(.*)\}\}/g;
export function getAttrValue(attr: string) {
  if(!attr) return attr;
  return attr.replace(wxAttrReg, '$1');
}