import { BaseApp } from "@kiner/octopus-shared";
import { PluginPipelineData } from "./common";
import { GeneratorOptions } from "@babel/generator";
import { Node } from "@babel/types";
import prettier from "prettier";
export declare type CodeGenInfo = {
    filePath: string;
    code: string;
    prettier?: boolean;
    prettierOptions?: prettier.Options;
};
export declare type CodeGenOptionInfo = {
    filePath: string;
    ast: Node;
};
export declare const baseOption: (info: CodeGenOptionInfo) => GeneratorOptions;
export declare function genJSCodeFromAst(ast: Node, filePath: string): CodeGenInfo;
export declare function genCodeFormAst(asts: PluginPipelineData["asts"]): CodeGenInfo[];
export declare class CodeGen extends BaseApp<PluginPipelineData> {
    constructor();
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
