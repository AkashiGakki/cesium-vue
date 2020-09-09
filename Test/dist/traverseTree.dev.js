"use strict";

var treeData = [{
  title: "根节点1",
  key: "root-1",
  children: [{
    title: "节点1-1",
    key: "node-1-1",
    children: [{
      title: "节点1-1-1",
      key: "node-1-1"
    }, {
      title: "节点1-1-2",
      key: "node-1-2"
    }, {
      title: "节点1-1-3",
      key: "node-1-3"
    }]
  }, {
    title: "节点1-2",
    key: "node-1-2",
    children: [{
      title: "节点1-2-1",
      key: "node-1-2-1"
    }]
  }, {
    title: "节点1-3",
    key: "node-3"
  }]
}, {
  title: "根节点2",
  key: "root-2",
  children: [{
    title: "节点2-1",
    key: "node-2-1"
  }]
}, {
  title: "根节点3",
  key: "root-3"
}];

function traverseTree(tree, key) {
  var title = tree.forEach(function (element) {
    if (element.key === key) {
      console.log('key', element.title);
      return element.title;
    }

    if (!element.children) {
      return 'none';
    }

    traverseTree(element.children, key);
  });

  if (title !== 'none' || title !== undefined) {
    return title;
  }
}

var title = traverseTree(treeData, 'node-2-1');
console.log('title', title);