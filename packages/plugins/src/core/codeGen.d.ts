import { BaseApp, CodeGenInfo, CodeGenOptionInfo, PluginPipelineData } from "@kiner/octopus-shared";
import { GeneratorOptions } from "@babel/generator";
import { Node } from "@babel/types";
export declare const baseOption: (info: CodeGenOptionInfo) => GeneratorOptions;
export declare function genJSCodeFromAst(ast: Node, filePath: string): CodeGenInfo;
export declare function genCodeFormAst(asts: PluginPipelineData["asts"]): CodeGenInfo[];
export declare class CodeGen extends BaseApp<PluginPipelineData> {
    constructor();
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
