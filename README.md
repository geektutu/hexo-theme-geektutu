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
- [x] 添加文章置顶功能。(2019-06-17)
- [x] 不蒜子统计。(2019-08-09)
- [x] 新增 Cheat Sheet 样式。 [点击查看效果](https://geektutu.com/post/cheat-sheet-sqlite.html) (2020-03-01)

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
    "hexo": "^3.9.0",
    "hexo-deployer-git": "^2.1.0",
    "hexo-generator-category": "^1.0.0",
    "hexo-generator-feed": "3.0.0",
    "hexo-generator-index": "1.0.0",
    "hexo-generator-sitemap": "2.0.0",
    "hexo-generator-tag": "1.0.0",
    "hexo-renderer-ejs": "1.0.0",
    "hexo-renderer-marked": "2.0.0",
    "hexo-renderer-stylus": "1.1.0",
    "hexo-server": "1.0.0"
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
header_icon: img/icon.png

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
  accessToken: 'xxxx'
  repo: 'hexo-theme-geektutu'
  owner: 'geektutu'

# alipay wechatpay 的二维码转换的网址，不使用二维码图片，提高加载速率。
# https://cli.im/deqr 可将二维码转为网址
reward:
  alipay: HTTPS://QR.ALIPAY.COM/FKX060337TUXBAX9LIFJE8
  wechat: wxp://f2f0qgGBlfD1nZXjvBjievxB0z0fc0W2sBq5

related_links:
- link: https://github.com/geektutu/hexo-theme-geektutu
  img: img/related_links/github.png
- link: https://github.com/geekcircle
  img: img/related_links/geekcircle.png
- link: mailto:Geektutu<gzdaijie@gmail.com>?subject=From Geektutu's Blog
  img: img/related_links/email.png

# 文章末尾配置一些提示信息，可选，不配置则不显示
post_tips:
  find_me: true # 本站永久域名「 xx.domain 」， 也可以通过搜索「 xx 」找到我。
  zhihu_zhuanlan: https://zhuanlan.zhihu.com/geektutu # 欢迎关注我的「 知乎专栏 」，所有文章可在「 知乎APP 」查看。

widgets:
  mobile_qrcode: false # 开启移动端二维码，扫一扫，手机上阅读
  caidan: true  # 开启彩蛋，点击屏幕会随机弹出 '点个赞','留个言'等
  busuanzi: true # 开启不蒜子统计 https://busuanzi.ibruce.info/

ba_auto_push: true # Baidu 自动推送，以下均为可选配置
ba_track_id: 1a0ec33b1aa # Baidu Analytics
cnzz_track_id: 123649 # CNZZ Analytics
google_analysis: UA-141425-1 # Google Analytics
google_ad_client: ca-pub-939225546 # Google Ad

feed:
  enable: true
  limit: 0
  type: rss2
  content: false
  path: feed.xml
  icon: img/icon.png
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
nav:
- TensorFlow
categories:
- TensorFlow教程
top: 1
github: https://github.com/geektutu/tensorflow-tutorial-samples
image: post/tensorflow-mnist-simplest/xxx.jpg
---

这篇文章是整个 TensorFlow入门-mnist手写数字识别系列的第一篇，主要介绍了如何从0开始用tensorflow搭建最简单的网络进行训练。

··· 省略
```

> 注意，这里的`image`是显示在主页和推荐阅读文章卡片左侧的图片，尽量选择方形的图片，相对路径从`根路径`开始。
> 关于`nav`，默认导航框显示的是 categories 的值，避免分类太多，可以使用nav标签聚合，属于同一`nav`的 `categories` 导航链接将会聚合在一起。
> nav 可选设置，若不设置，将平铺所有的 `categories`。
> top 是置顶顺序。

## 5. 最后

喜欢就点个[star](https://github.com/geektutu/hexo-theme-geektutu)吧。
