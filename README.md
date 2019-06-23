# Hexo-theme-geektutu

> [极客兔兔的博客](https://geektutu.com)目前使用该主题。
> [Github - Geektutu's Blog](https://github.com/geektutu/geektutu-blog)

![样图](Geektutu.png)

## 1. 特性

- [x] 支持标签、归档 (2019-06-06)。
- [x] 支持`baidu` `google` `biying` `360`站点认证，以及`baidu`站点统计(2019-06-07)。
- [x] 支持显示目录，目录随文章滚动高亮(2019-06-07)。
- [x] 增加对gitalk（基于Github Issue第三方评论）的支持(2019-06-07)。
- [x] 响应式布局，支持PC和移动端(2019-06-08)。
- [x] 增加支付宝、微信赞赏功能(2019-06-08)。
- [x] 对专题进行强化，聚合同专题链接，[点击查看效果](https://geektutu.com/post/tensorflow-make-npy-hdf5-data-set.html)(2019-06-13)。
- [x] 点击文章区域的图片，可以查看大图，再点击图片则关闭。(2019-06-17)
- [x] 使用QRious实现生成二维码功能，方便微信扫一扫，阅读/分享。(2019-06-17)
- [x] 添加开关控制百度网址自动推送功能。(2019-06-22)
- [x] 添加点击页面出现彩蛋的特效。(2019-06-22)
- [x] 侧边栏目录与专题可进行切换，完善内链功能，方便依次浏览所有同专题的文章，进一步强化专题。(2019-06-22)

## 2. Hexo 基础命令

```bash
hexo new post "<post name>" # 创建一篇新文章
hexo clean && hexo generate # 生成静态文件
hexo server # 本地调测
hexo deploy # 自动部署到你配置的仓库的gh-pages分支
```

## 3. 如何使用该主题

- 第一步，初始化博客

```bash
cd <empty_dir> # 进入一个空目录
hexo init      # 初始化hexo博客
```

- 第二步，将package.json中的内容替换为[4.1](#user-content-41-packagejson)中的内容

- 第三步，下载主题，并启动

```bash
npm i   # 安装依赖
npm update # 下载geektutu主题
npm build  # 生成页面
npm start  # http://localhost:4000 可以看到效果
```

- 最终的目录结构

```bash
|--node_modules/
|--source/
    |--_posts/
        |-- link.md  # 友链，必须有
        |-- about.md # 关于我，必须有
    |--img/   # _config.xml配置的img/xxx在这里
        |--icon.png
        |--bg.jpg
        |--pay/ # 赞赏的图片位置，可自定义
            |--alipay.jpeg
            |--wechat.jpeg
    |--archives/  # 归档
        index.md
    |--series/    # 专题
        index.md
    |--tags/      # 标签
        index.md
    |--404.md
    CNAME
|--themes/
    |--geektutu/ # 主题将会下载在这里
|--_config.xml   # 配置在这里
|--package.json
```

## 4. 我的博客配置

### 4.1 package.json

```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.8.0"
  },
  "scripts": {
    "update": "rm -rf themes/geektutu && git clone https://github.com/geektutu/hexo-theme-geektutu.git themes/geektutu",
    "build": "hexo clean && hexo generate",
    "start": "hexo server --draft",
    "deploy": "hexo deploy"
  },
  "dependencies": {
    "hexo": "^3.8.0",
    "hexo-deployer-git": "^1.0.0",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-feed": "^1.2.2",
    "hexo-generator-index": "^0.2.1",
    "hexo-generator-sitemap": "1.1.2",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.2.0",
    "hexo-renderer-marked": "^1.0.1",
    "hexo-renderer-stylus": "^0.3.3",
    "hexo-server": "^0.3.3"
  }
}
```

### 4.2 _config.yml

```yml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html

# Site
title: 极客兔兔
keyword: 极客兔兔,极客兔兔的博客,极客兔兔的小站
description: 极客兔兔的小站，致力于分享一些技术教程和有趣的技术实践。
author: 极客兔兔
language: zh-CN

url: https://geektutu.com
root: /
permalink: post/:title.html

# seo优化各个浏览器的验证信息
beian: 沪ICP备18001798号-1
seo_title: 极客兔兔 # 子页面的后缀，效果： 关于我 | 极客兔兔，如果与title一致，则可以不设置
seo:
  google_site_verification: 19ixTFj-X-rXuvZFvR1PMkqSHMXZ5GjN7nhYdYYFm-c
  baidu_site_verification: p7Pz3jlx4t
  ms_site_verification: 7E2AEE3378AC93764DEAB411177A21A1
  _360_site_verification: 5c7e8a1fdbf35ed6003c48733208f705 # 不能以数字开头，所以加上了下划线

# 开启博客资源的相对链接 https://hexo.io/zh-cn/docs/asset-folders
post_asset_folder: true

# Site settings
header_img: img/bg.jpg
header_icon: img/icon.png

github_username:  geektutu

theme: geektutu

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: https://git.coding.net/gzdaijie/geektutu-blog.git
  branch: coding-pages

gitalk:
  client_id: 'c1fdd456a4caae5f7df0'
  client_secret: 'b2674451e21feae50520f99337ec15d2aebe7879'
  repo: 'hexo-theme-geektutu'
  owner: 'geektutu'

reward:
  alipay: img/pay/alipay.jpeg
  wechat: img/pay/wechat.jpeg

related_links:
- link: https://github.com/geektutu/hexo-theme-geektutu
  img: img/related_links/github.png
- link: https://github.com/geekcircle
  img: img/related_links/geekcircle.png
- link: mailto:Geektutu<gzdaijie@gmail.com>?subject=From Geektutu's Blog
  img: img/related_links/email.png

ba_auto_push: true # Baidu 自动推送
ba_track_id: 1a0ec38c52c08db815b0046c2783b1aa # Baidu Analytics
cnzz_track_id: 1277693649 # CNZZ Analytics
```

### 4.3 md参考

- archives/index.md [效果](https://geektutu.com/archives)

```markdown
---
layout: "archive"
title: "归档"
description: "极客兔兔的博客的归档列表"
---
```

- tags/index.md  [效果](https://geektutu.com/tags)

```markdown
---
layout: "tags"
title: "标签"
description: "极客兔兔的博客的标签列表"
---
```

- series/index.md  [效果](https://geektutu.com/series)

```markdown
---
layout: "category"
title: "专题"
description: "极客兔兔的博客的专题列表"
---
```

- _posts/about.md [效果](https://geektutu.com/post/about.html)

```markdown
---
title: 关于我
date: 2017-07-03 11:51:24
description: 极客兔兔的小站，致力于分享一些技术教程和有趣的技术实践。
tags:
- 关于我
---

## 个人介绍

··· 省略

```

- _posts/tensorflow-mnist-simplest.md [效果](https://geektutu.com/post/tensorflow-mnist-simplest.html)

```markdown
---
title: TensorFlow入门(一) - mnist手写数字识别(网络搭建)
date: 2017-12-09 11:51:24
description: TensorFlow 入门系列文章，mnist手写数字识别(网络搭建)。
tags:
- 机器学习
- tensorflow
- mnist
- Python
categories:
- TensorFlow入门
github: https://github.com/geektutu/tensorflow-tutorial-samples
---

这篇文章是整个 TensorFlow入门-mnist手写数字识别系列的第一篇，主要介绍了如何从0开始用tensorflow搭建最简单的网络进行训练。

··· 省略
```

## 5. 最后

喜欢就点个[star](https://github.com/geektutu/hexo-theme-geektutu)吧。
