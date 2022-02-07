/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

import { BaseApp } from "@kiner/octopus-shared";
import { PluginPipelineData } from "./common";
import generate, { GeneratorOptions, GeneratorResult } from "@babel/generator";
import { Node } from "@babel/types";
import prettier from "prettier";

export type CodeGenInfo = {
    filePath: string,
    code: string,
    prettier?: boolean,
    prettierOptions?: prettier.Options
}

export type CodeGenOptionInfo = {
    filePath: string,
    ast: Node
}

export const baseOption: (info: CodeGenOptionInfo) => GeneratorOptions = (info: CodeGenOptionInfo) => ({
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
});

export function genJSCodeFromAst(ast: Node, filePath: string): CodeGenInfo {
    const tsCode = generate(ast , baseOption({
        filePath,
        ast
    }));
    return {
        filePath,
        code: tsCode.code,
        prettier: true,
        prettierOptions: { semi: true, parser: 'babel' }
    }
}

export function genCodeFormAst(asts: PluginPipelineData["asts"]) {
    const infos:CodeGenInfo[] = [];
    Object.keys(asts.js).forEach(baseFilePath => {
        const fileAsts = asts.js[baseFilePath];
        fileAsts.forEach(file => {
            const info = genJSCodeFromAst(file, (file.extra?.fileName as string) || baseFilePath);
            infos.push(info);
        });
    });
    Object.keys(asts.wxml).forEach(baseFilePath => {
        const fileAst = asts.wxml[baseFilePath];
        infos.push({
            filePath: baseFilePath,
            code: fileAst
        });
    });
    return infos;
}

export class CodeGen extends BaseApp<PluginPipelineData> {
    constructor() {
        super("CodeGen");
    }
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
        // todo 将抽象语法树生成代码
        data.forEach(item => {
            item.codes.push(...genCodeFormAst(item.asts))
        });
        // console.log(data[0].codes)
        return super.resolveData(data);
    }
}
