import {
  ObjectExpression,
  stringLiteral,
  identifier,
  callExpression,
  expressionStatement,
  Statement,
  variableDeclaration,
  variableDeclarator,
  ObjectProperty,
  FunctionExpression,
  Identifier,
  objectProperty,
} from '@babel/types';
import { BaseApp, noop, obj2querystr } from '@kiner/octopus-shared';
import { load } from 'cheerio';
import type { CheerioAPI, Element } from 'cheerio';
import codeGen from '@babel/generator';
import traverse from '@babel/traverse';
import {
  buildInView,
  componentReactPath,
  customParamsClassName,
  injectClassName,
  injectEventName,
  libFilePath,
  libName,
  needCatchLoadErrorComponents,
  PluginPipelineData,
  utilModuleName,
  wxLibName,
} from './common';
import { astObjectPropertyFn, astCallObjectMethod } from './utils';
import { injectLibFiles } from './injectCode';
import { CodeGenInfo } from './codeGen';
import { objectExpression } from '@babel/types';
import { utilFilePath } from '.';

export class InjectCodeToCollectDatasource extends BaseApp<PluginPipelineData> {
  constructor() {
    super('InjectCodeToCollectDatasource');
  }
  /**
   * 为 wxml 打入补丁代码
   * @param $
   */
  patchCodeInitWxml($: CheerioAPI) {
    $._root.firstChild;
    $(buildInView)
      .addClass(injectClassName)
      .map((idx: number, item: Element) => {
        item.attribs['data-tag'] = item.tagName;
        item.attribs['data-attrs'] = obj2querystr(item.attribs);
        return item;
      });
  }
  /**
   * 由于 cheerio 输出的属性字符串会将 ' 转换成 &apos; ，因此再完成补丁输出源码前需要转换回来
   * @param html
   * @returns
   */
  replaceEncodeChar(html: string): string {
    return html.replace(/&apos;/g, "'");
  }
  /**
   * 注入代码到 wxml 文件中
   * @param code
   */
  injectCodeIntoWxml(code: PluginPipelineData['asts']['wxml']): void {
    const filePaths = Object.keys(code);
    filePaths.forEach((path) => {
      const wxml = code[path];

      const $ = load(`<view id="wxmlWrapper"><wxs module="${utilModuleName}" src="${utilFilePath}"/>\n${wxml}</view>`, {
        xml: true,
        xmlMode: true,
      });
      this.patchCodeInitWxml($);

      code[path] = this.replaceEncodeChar($('#wxmlWrapper').html()!);
    });
  }

  _traverseJs({
    code,
    filePath,
    injectDepCb = noop,
    callDepCb = noop,
    eventHandler = noop,
    loadErrorHandler = noop,
    customData = noop,
  }: {
    code: PluginPipelineData['asts']['js'];
    filePath: string;
    injectDepCb?: (objectProperties: ObjectProperty[]) => void;
    callDepCb?: (body: Statement[]) => void;
    eventHandler?: (body: Statement[]) => void;
    loadErrorHandler?: (body: Statement[], eventObjName: string) => void;
    customData?: (data: string) => void;
  }): void {
    const appJs = code[filePath];
    let flag = 0;
    traverse(appJs?.[0], {
      enter: (path) => {
        // 依赖注入
        if (path.isArrayExpression() && flag <= 1) {
          // 代码中第 2 个数组定义
          if (flag === 1) {
            const properties = (path.node.elements[1] as ObjectExpression).properties;
            injectDepCb(properties as ObjectProperty[]);
          }
          flag++;
        }
        // 依赖调用
        if (path.isObjectProperty() && (path.node.key as any).value === './src/app.tsx') {
          const body = (path.node.value as any).body.body as Statement[];
          callDepCb(body);
        }
        /**
         * 所有事件统一回调
         */
        if (path.isFunctionExpression() && path.node.id?.name === 'dispatch') {
          if (filePath === 'taro.js') {
            path.node.body && eventHandler(path.node.body.body as Statement[]);
          }
        }
        // 处理图片加载失败事件监听
        if (
          path.isVariableDeclarator() &&
          path.node.init?.type === 'CallExpression' &&
          path.node.init.arguments.find((item) => {
            return item.type === 'StringLiteral' && item.value === componentReactPath;
          }) &&
          path.node.id.type === 'Identifier'
        ) {
          // 先根据条件获取 component-react 的模块 id,
          const componentReactModuleId = path.node.id.name;
          traverse(appJs?.[0], {
            enter(_path) {
              if (
                _path.isMemberExpression() &&
                _path.node.object.type === 'Identifier' &&
                _path.node.object.name === componentReactModuleId &&
                _path.node.property.type === 'StringLiteral' &&
                needCatchLoadErrorComponents.includes(_path.node.property.value)
              ) {
                if (_path.parentPath.node.type === 'CallExpression') {
                  const imageComp = _path.parentPath.node.arguments[1];
                  if (imageComp.type === 'ObjectExpression') {
                    const onError: FunctionExpression = (
                      imageComp.properties.find((item: any) => {
                        return (item.key as Identifier).name === 'onError';
                      }) as ObjectProperty
                    )?.value as FunctionExpression;
                    let eventObjName = "e";
                    if (onError) {
                      if(onError.params.length === 0) {
                        onError.params.push(identifier('e'));
                      } else {
                        eventObjName = onError.params[0].type === "Identifier" ? onError.params[0].name : "e";
                      }
                      loadErrorHandler(onError.body.body, eventObjName);
                    } else {
                      const body: Statement[] = [];
                      imageComp.properties.push(
                        astObjectPropertyFn({ name: 'onError', params: [identifier('e')], body })
                      );
                      loadErrorHandler(body, eventObjName);
                    }
                  }
                }
              }
            },
          });
        }
        // 查找指定 class 类名的组件属性
        if(path.isStringLiteral() && path.node.value.includes(customParamsClassName)) {
          if(path.parentPath.isObjectProperty()) {
            const value = path.parentPath.node.value as ObjectExpression;
            const parentChildren = path.parentPath?.parentPath?.parentPath?.parentPath;
            if(parentChildren?.isArrayExpression()) {
              const arrContainer = (parentChildren.node.elements as object[]);
              // const itemCnt = arrContainer.length;
              const curIdx = arrContainer.findIndex(item => item === path?.parentPath?.parentPath?.parentPath?.node);
              // console.log(`总共有${itemCnt}个元素,当前索引为: ${curIdx}`);
              traverse(appJs?.[0], {
                enter(_path) {
                  if(_path.isIdentifier() && _path.node.name === "cn") {
                    if(_path?.parentPath?.parentPath?.isObjectExpression()) {
                      const properties = _path.parentPath.parentPath.node.properties;
                      let customDataProp = properties.find(item => item.type === "ObjectProperty" && (item.key as any).name === "customData");
                      if(!customDataProp) {
                        customDataProp = objectProperty(identifier("customData"), objectExpression([
                          objectProperty(identifier(String(curIdx)), value)
                        ]));
                        properties.push(customDataProp);
                      } else {
                        if(customDataProp.type === "ObjectProperty") {
                          if(customDataProp.value.type === "ObjectExpression") {
                            if(customDataProp.value.properties.find(item => item.type === "ObjectProperty" && (item.key as any).name === String(curIdx))) return;
                            customDataProp.value.properties.push(objectProperty(identifier(String(curIdx)), value));
                          }
                        }
                      }
                      // console.log("页面数据", );
                    }
                  }
                }
              });
              // customData((new Function(`return ${code.code.replace(/\\n/g, '')}`))())
            }
          }
        }
      },
    });
  }
  /**
   * 注入引入模块语句
   * @param code 抽象语法树集合
   * @param filePath 文件路径
   * @param injectFilePath 待注入模块的路径
   */
  _injectRequire(code: PluginPipelineData['asts']['js'], filePath: string, injectFilePath: string) {
    const appJs = code[filePath];
    appJs[0].program.body.unshift(
      expressionStatement(callExpression(identifier('require'), [stringLiteral(injectFilePath)]))
    );
  }
  /**
   * 在 js 中注入代码
   * @param code 抽象语法树集合
   */
  injectCodeIntoJs(code: PluginPipelineData['asts']['js']): void {
    this._injectRequire(code, 'app.js', libFilePath);
    this._traverseJs({
      code,
      filePath: 'app.js',
      injectDepCb: (properties: ObjectProperty[]) => {
        properties.push(
          astObjectPropertyFn({
            name: 'octopus_inject_code',
            id: 'OctopusInjectCode',
            body: [
              expressionStatement(
                astCallObjectMethod('console', 'log', [
                  stringLiteral('🐙 可以在这里加入一些小程序启动时要执行的预处理代码'),
                ])
              ),
            ],
          })
        );
      },
      callDepCb: (body: Statement[]) => {
        body.unshift(
          variableDeclaration('var', [
            variableDeclarator(
              identifier(libName),
              callExpression(identifier('__webpack_require__'), [stringLiteral(libFilePath)])
            ),
          ]),
          variableDeclaration('var', [
            variableDeclarator(
              identifier('octopus_inject_code'),
              callExpression(identifier('__webpack_require__'), [stringLiteral('octopus_inject_code')])
            ),
          ])
        );
      },
    });
    // 注入通用事件监听代码
    this._traverseJs({
      code,
      filePath: 'taro.js',
      eventHandler(body: Statement[]) {
        body.push(expressionStatement(astCallObjectMethod(wxLibName, injectEventName, [identifier('e')])));
      },
    });
    // 注入 image 加载失败监听代码
    Object.keys(code).forEach((filePath) => {
      this._traverseJs({
        code,
        filePath: filePath,
        loadErrorHandler(body: Statement[], eventObjName: string) {
          body.unshift(expressionStatement(astCallObjectMethod(wxLibName, injectEventName, [identifier(eventObjName)])));
        },
      });
    });
    // 注入 image 加载失败监听代码
    Object.keys(code).forEach((filePath) => {
      this._traverseJs({
        code,
        filePath: filePath,
        customData(data: string) {
          console.log(filePath, data);
        },
      });
    });
  }
  /**
   * 将库文件的代码加入到源码队列当中
   * @param libs
   * @param config
   */
  injectCodeLib(libs: CodeGenInfo[], config: PluginPipelineData): void {
    config.codes.push(...libs);
  }

  /**
   * 注入代码入口
   * @param asts
   */
  injectCode(asts: PluginPipelineData['asts'], config: PluginPipelineData): void {
    this.injectCodeIntoJs(asts.js);
    this.injectCodeIntoWxml(asts.wxml);
    this.injectCodeLib(injectLibFiles(config.pluginOptions), config);
  }
  /**
   * 处理数据
   * @param data
   * @returns
   */
  resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
    data.forEach((item) => this.injectCode(item.asts, item));
    return super.resolveData(data);
  }
}
