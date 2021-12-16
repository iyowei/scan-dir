[node version badge]: https://img.shields.io/badge/node.js-%3E%3D12.20.0-brightgreen?style=flat&logo=Node.js
[download node.js]: https://nodejs.org/en/download/
[prs welcome badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[lsdirsync]: https://github.com/iyowei/ls-dir-sync
[lsdir]: https://github.com/iyowei/ls-dir
[scandireachsync]: https://github.com/iyowei/scan-dir-sync
[scandireach]: https://github.com/iyowei/scan-dir-each
[scandirsync]: https://github.com/iyowei/scan-dir-sync
[scandir]: https://github.com/iyowei/scan-dir

# scanDir(path, [worker, raw = false])

> 并行扫描文件夹，可在扫描的同时更新或过滤数据，一定程度复用遍历。

## 使用

> 项目中同时使用 [`lsDir()`][lsdir]、[`scanDirEach()`][scandireach] 模块的话，推荐使用当前模块。

- `path` 待扫描的路径，**必需提供**，{String}
- `worker` 处理器，如果扫描的同时需要更新、过滤操作可提供，一定程度复用穷举，**可选**，{ Function }
  - 返回 { Object | Boolean | Promise }
    - `false` 过滤掉当前扫描结果
    - `true` 保留当前扫描结果
    - 对象字面量，保留 / 更新当前扫描结果
    - 如果需要在处理器中需要安放些异步操作，如远程数据请求，可在处理器中返回一个 Promise，该 Promise 可返回，
      - `false` 过滤掉当前扫描结果
      - `true` 保留当前扫描结果
      - 对象字面量，保留 / 更新当前扫描结果
      - 其它类型则默认为没有任何处理
    - 其它类型则默认为没有任何处理
- `raw` 是否专门返回未加工的扫描结果，使用 `worker` 后才会生效，默认 `false`，**可选**，{ Boolean }
- 返回，扫描结果 { Array }
  - 如果设置了 `raw` 为 `true`，则返回 **二维数组**，第一项为加工后的扫描结果，第二项为未加工的扫描结果
  - 默认返回 **一维数组**，即：加工后的扫描结果

```js
import { log } from "console";
import scanDir from "@iyowei/scan-dir";

(async () => {
  const got = await scanDir(
    process.cwd(),
    (cur, index) =>
      new Promise((resolve) => {
        // 可以做些异步操作，如远程数据请求
        resolve(index % 2 === 0 ? cur : false);
      }),
    false
  );

  log(got);

  /**
   * [
   *   {
   *     path: '',
   *     dirent: [Dirent]
   *   },
   *   ...
   * ]
   */
})();
```

## 安装

[![Node Version Badge][node version badge]][download node.js]

```shell
# Pnpm
pnpm add @iyowei/scan-dir

# yarn
yarn add @iyowei/scan-dir

# npm
npm add @iyowei/scan-dir
```

## 相关

- [**`lsDirSync()`**][lsdirsync]，串行扫描文件夹；
- [**`lsDir()`**][lsdir]，并行扫描文件夹；
- [**`scanDirEachSync()`**][scandireachsync]，可在扫描的同时更新或过滤数据，**串行** 实现；
- [**`scanDirEach()`**][scandireach]，可在扫描的同时更新或过滤数据，**并行** 实现；
- [**`scanDirSync()`**][scandirsync]，`worker` 选填，有 `worker`，行为同 `scanDirEachSync()` 一致，否则与 `lsDirSync()` 一致，如果项目中同时使用了 `scanDirEachSync()`、`lsDirSync()`，则推荐使用 `scanDirSync()`；

## 参与贡献

![PRs Welcome][prs welcome badge]
