#!/bin/bash

pkgs=('shared' 'plugins' 'transformer' 'transporter')
for item in ${pkgs[*]}
do
 cd packages/$item
 yarn link;
 echo "🌻 创建别名成功: @kiner/octopus-$item"
 cd ../..
done

for item in ${pkgs[*]}
do
 cd packages/$item
 if [ "$item" == "plugins" ]; then
    yarn link "@kiner/octopus-shared"
    yarn link "@kiner/octopus-transformer"
    yarn link "@kiner/octopus-transporter"
    echo "🌛 为“@kiner/octopus-${item}” 添加依赖分包软链接：@kiner/octopus-shared、@kiner/octopus-transformer、@kiner/octopus-transporter"
 fi
 if [ "$item" == "transformer" ]; then
    yarn link "@kiner/octopus-shared"
    echo "🌛 为“@kiner/octopus-${item}” 添加依赖分包软链接：@kiner/octopus-shared"
 fi
 if [ "$item" == "transporter" ]; then
    yarn link "@kiner/octopus-shared"
    echo "🌛 为“@kiner/octopus-${item}” 添加依赖分包软链接：@kiner/octopus-shared"
 fi
 cd ../..
done

cd example;
yarn link "@kiner/octopus-plugins"
echo "🌛 为“example” 添加依赖分包软链接：@kiner/octopus-plugins"