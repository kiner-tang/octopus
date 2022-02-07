import {
  Identifier,
  ObjectProperty,
  Pattern,
  RestElement,
  BlockStatement,
  objectProperty,
  stringLiteral,
  identifier,
  functionExpression,
  blockStatement,
  expressionStatement,
  callExpression,
  memberExpression,
  Expression,
  SpreadElement,
  JSXNamespacedName,
  ArgumentPlaceholder,
  Statement,
} from '@babel/types';

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