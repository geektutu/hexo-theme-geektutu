import {Post, Tag} from '../models'
import {POSTS_BASE_PATH, STATIC_DIR, DOMAIN_NAME} from '../config/'
import fs from 'fs'
import shell from 'shelljs'

let tagNames2TagIds = async(tagNames) => {
  let tags = []
  // 去重
  let _tagNames = tagNames.filter((item, pos) => tagNames.indexOf(item) === pos)
  // 外键引用
  for (let i = 0; i < _tagNames.length; i++) {
    let name = _tagNames[i]
    if (name.length === 24) {
      tags.push(name)
      continue
    }
    let tag = (await Tag.findOne({name})) || (await new Tag({name}).save())
    tags.push(tag._id)
  }

  return tags
}


export default {
  'GET /posts': async(ctx, next) => {
    let groupBy = ctx.query.groupBy
    let data
    let push_data = {_id: "$_id", title: "$title", slug: "$slug", createdAt: "$createdAt"}
    console.log(`get posts group by ${groupBy}`)
    switch (groupBy) {
      case 'date':
        data = await Post.aggregate([
          {$match: {isArticle: true}},
          {$sort: {index: 1}},
          {
            $group: {
              _id: {month: {$month: "$createdAt"}, year: {$year: "$createdAt"}},
              posts: {$push: push_data}
            }
          }])
        data.forEach(item => {
          item.date = item._id
          delete item._id
        })
        break
      case 'category':
        data = await Post.aggregate([
          {$match: {isArticle: true}},
          {$sort: {index: 1}},
          {
            $group: {
              _id: '$category',
              posts: {$push: push_data}
            }
          }
        ])
        data.forEach(item => {
          item.category = item._id
          delete item._id
        })
        break
      case 'tag':
        data = await Post.aggregate([
          {$match: {isArticle: true}},
          {$sort: {index: 1}},
          {$unwind: '$tags'},
          {
            $group: {
              _id: '$tags',
              posts: {$push: push_data}
            }
          }
        ])
        data.forEach(item => {
          item.tag = item._id
          delete item._id
        })
        data = await Tag.populate(data, {path: 'tag'})
        break
      default:
        let fields = {title: 1, slug: 1, createdAt: 1, excerpt: 1, index: 1}
        data = await Post.find({isArticle: true}, fields).sort({'index': -1}).limit(20).populate('tags')
    }
    ctx.response.body = {
      'data': data
    };
  },
  'GET /posts/tags/:id': async(ctx, next) => {
    ctx.response.body = {
      'data': await Post.find({tags: {$in: [ctx.params.id]}}).populate('tags')
    };
  },
  'GET /posts/:slug': async(ctx, next) => {
    let slug = ctx.params.slug;
    let post = await Post.findOne({slug}).populate('tags')
    if (post && post._id && post.isArticle) {
      let fields = {title: 1, slug: 1, createdAt: 1}
      let tags = []
      post.tags.forEach(item => tags.push(item._id))
      post._doc.related = await Post.find({tags: {$in: tags}, _id: {$ne: post._id}, isArticle: true}, fields)
    }
    ctx.response.body = {
      'data': post
    };
  },
  'GET /admin/git-pull': async(ctx, next) => {
    console.log('git pull')
    try {
      shell.cd(POSTS_BASE_PATH)
      let gitPull = shell.exec('git pull', {silent: true}).stdout
      ctx.response.body = {'data': gitPull}
    } catch (e) {
      ctx.response.body = {'data': e};
    }
  },
  'GET /admin/posts': async(ctx, next) => {
    await Tag.remove().exec()
    await Post.remove().exec()

    let manifest = JSON.parse(fs.readFileSync(POSTS_BASE_PATH + '/manifest.json'));
    let records = []
    shell.cd(POSTS_BASE_PATH)

    Object.keys(manifest).forEach((category) => {
      manifest[category].forEach((meta) => {
        let content = fs.readFileSync(POSTS_BASE_PATH + '/' + meta.path, 'utf-8')
        let record = {
          slug: meta.path.split('/').reverse()[0].replace('.md', '.html'),
          content: content,
          tags: meta.tags.split(','),
          isArticle: meta.isArticle || meta.isArticle === undefined,
          canComment: meta.canComment || meta.canComment === undefined,
          category: category
        }
        let log = shell.exec('git log --follow --format="%cd" -- ' + meta.path, {silent: true}).stdout.trim()
        let dates = log.split('\n')

        record.updatedAt = new Date(dates[0])
        record.createdAt = new Date(dates.reverse()[0])
        record.title = content.substr(0, content.indexOf('\n')).replace('#', '').trim()
        records.push(record)
      })
    })

    let needRecords = records.filter((item) => item.isArticle)

    needRecords.forEach((item, index, arr) => {
      let _pre = arr[index - 1]
      let _next = arr[index + 1]
      item.index = index
      item.previous = arr[index - 1] === undefined ? null : {
        slug: _pre.slug,
        title: _pre.title
      }
      item.next = arr[index + 1] === undefined ? null : {
        slug: _next.slug,
        title: _next.title
      }
    })

    let error = []
    let success = 0
    let fail = 0
    let urls = ['/', '/series', '/archives']
    for (let i = 0; i < records.length; i++) {
      let item = records[i]
      try {
        item.tags = await tagNames2TagIds(item.tags)
        let post = new Post(item)
        await post.save()
        success += 1
        urls.push('/post/' + item.slug)
      } catch (e) {
        fail += 1
        error.push(e.message)
      }
    }

    if (fail === 0) {
      urls = urls.map(url => DOMAIN_NAME + url)
      fs.writeFileSync(STATIC_DIR + '/sitemap.txt', urls.join('\n'))
    }

    ctx.response.body = {
      'data': {success, fail, error}
    };
  }
}