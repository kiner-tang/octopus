import { BaseApp, PluginPipelineData, readFileFromDir } from '@kiner/octopus-shared';
import { ConcatSource } from 'webpack-sources';
import { resolve, relative } from 'path';
import { readFileSync } from 'fs';
import { replaceInnerDeps, sharedPath, transformerPath } from './common';

export class FsManager extends BaseApp<PluginPipelineData> {
  constructor() {
    super('FsManager');
  }
  resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
    // 将代码重新放回原始的资源列表当中
    data.forEach((item) => {
      const { codes, oriAssets } = item;
      codes.forEach((code) => {
        oriAssets[code.filePath] = new ConcatSource(code.code);
      });
    //   const transformerBasePath = resolve(__dirname, '../../transformer');
    //   readFileFromDir(transformerBasePath, (filePath) => {
    //     const source = readFileSync(filePath, 'utf-8');
    //     oriAssets[`${transformerPath}/${relative(transformerBasePath, filePath)}`] = new ConcatSource(
    //       replaceInnerDeps(source)
    //     );
    //   });
    //   const sharedBasePath = resolve(__dirname, '../../shared');
    //   readFileFromDir(sharedBasePath, (filePath) => {
    //     const source = readFileSync(filePath, 'utf-8');
    //     oriAssets[`${sharedPath}/${relative(transformerBasePath, filePath)}`] = new ConcatSource(
    //       replaceInnerDeps(source)
    //     );
    //   },'js', ["inner.js", "queue.js"]);
    });

    return super.resolveData(data);
  }
}
