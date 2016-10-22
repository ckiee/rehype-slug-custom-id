'use strict';

/* Dependencies. */
var slugs = require('github-slugger')();
var visit = require('unist-util-visit');
var toString = require('hast-util-to-string');
var is = require('hast-util-is-element');
var has = require('hast-util-has-property');

/* Expose. */
module.exports = slug;

/* Constants. */
var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/* Attacher - Add id attributes to h1-h6. */
function slug() {
  return transformer;
}

function transformer(tree) {
  slugs.reset();

  visit(tree, 'element', function (node) {
    if (is(node, headings) && !has(node, 'id')) {
      node.properties.id = slugs.slug(toString(node));
    }
  });
}