var assign = require('object-assign');

function slugify(name, i) {
  return "toc-" + i
}

module.exports = function toc(md, options) {
  var push = Array.prototype.push;
  var splice = Array.prototype.splice;
  var Token = md.core.__proto__.State.prototype.Token;
  var defaults = {
    depth: 6,
    slugify: slugify,
    className: 'table-of-contents'
  };

  options = options ? assign({}, defaults, options) : defaults;

  function build(items) {
    var tokens = [];
    tokens.push(new Token('bullet_list_open', 'ul', 1))
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      tokens.push(new Token('list_item_open', 'li', 1))
      tokens.push(new Token('paragraph_open', 'p', 1))

      if (item.inline) {
        var link = new Token('link_open', 'a', 1);
        link.attrs = [['href', '#' + item.id]];
        var inline = new Token('inline', '', 0);
        inline.children = [link];
        push.apply(inline.children, item.inline.children);
        inline.children.push(new Token('link_close', 'a', -1));
        tokens.push(inline);
      }

      if (item.items.length) {
        var itemTokens = build(item.items);
        push.apply(tokens, itemTokens);
      }

      tokens.push(new Token('paragraph_close', 'p', -1))
      tokens.push(new Token('list_item_close', 'li', -1))
    }
    tokens.push(new Token('bullet_list_close', 'ul', -1))

    return tokens;
  }

  function transform(tokens, tocs) {
    var offset = 0;
    for (var i = 0; i < tocs.length; i++) {
      var toc = tocs[i];
      if (toc.root !== null) {
        var tocTokens = build(toc.root.items);
        if (options.className) {
          tocTokens[0].attrPush(['class', options.className]);
          var pStart = new Token('paragraph_open', 'p', 1)
          var pEnd = new Token('paragraph_close', 'p', -1)
          var divStart = new Token('paragraph_open', 'div', 1)
          var divEnd = new Token('paragraph_close', 'div', -1)
          var inline = new Token('inline', '', 0);
          var title = new Token('text', '', 1);
          divStart.attrPush(['id', 'toc'])
          title.content = '文章目录'
          inline.children = [title]
          tocTokens.unshift(divStart, pStart, inline, pEnd)
          tocTokens.push(divEnd)
        }
        toc.range[0] += offset;
        offset += tocTokens.length - toc.range[1];
        splice.apply(tokens, toc.range.concat(tocTokens));
      } else {
        tokens.splice(toc.range[0], toc.range[1]);
      }
    }

  }

  md.core.ruler.push('build-toc', function(state) {
    var tokens = state.tokens;
    var length = tokens.length;
    var current = null;
    var toc = null;
    var tocs = [];
    var modifiers = [];

    for (var i = 0; i < length; i++) {
      if (tokens[i].type === 'paragraph_open') {

        var inline = tokens[i + 1];
        if (inline && inline.children.length === 1 && inline.content === '{!toc}') {
          if (toc === null) {
            toc = { range: [i, 3], root: null };
            tocs.push(toc);
          }
        }
      } else if (tokens[i].type === 'heading_open') {
        var level = Number(tokens[i].tag[1]);
        if (toc === null || level < 2 || level > options.depth) {
          i += 2;
          continue;
        }
        var id = options.slugify(tokens[i+1].content, i);
        tokens[i].attrPush(['id', id]);
        if (toc.root === null) {
          toc.root = current = {
            level: level - 1,
            parent: null,
            items: []
          };
        }
        while (current && current.level >= level) {
          current = current.parent;
        }
        if (current === null) {
          toc = null;
        } else if (current.level >= level - 2) {
          if (current.level === level - 2) {
            if (current.items.length === 0) {
              continue;
            }
            current = current.items[current.items.length - 1];
          }
          current.items.push({
            id: id,
            level: level,
            inline: tokens[i + 1],
            items: [],
            parent: current
          });
        }
        i += 2;
      }
    }
    toc = null;
    transform(tokens, tocs);
  });
};