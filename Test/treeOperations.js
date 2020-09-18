const treeData = [{
    title: "根节点1",
    key: "root-1",
    children: [{
        title: "节点1-1",
        key: "node-1-1",
        children: [{
            title: "节点1-1-1",
            key: "node-1-1"
          },
          {
            title: "节点1-1-2",
            key: "node-1-2"
          },
          {
            title: "节点1-1-3",
            key: "node-1-3"
          },
        ],
      },
      {
        title: "节点1-2",
        key: "node-1-2",
        children: [{
          title: "节点1-2-1",
          key: "node-1-2-1"
        }],
      },
      {
        title: "节点1-3",
        key: "node-3",
      },
    ],
  },
  {
    title: "根节点2",
    key: "root-2",
    children: [{
      title: "节点2-1",
      key: "node-2-1"
    }],
  },
  {
    title: "根节点3",
    key: "root-3",
  },
];

function getFirstChildren(nodes) {
  let keys = [];
  nodes.forEach(item => {
    if (!item.children) {
      keys = [item.key];
      console.log('keys', keys);
      return keys;
    }
    keys.push(item.key);
    if (item.children) {
      getFirstChildren(item.children);
    }
  });
}

let res = getFirstChildren(treeData);
console.log(res);

function getNodeByKey(key, tree) {
  let keyNode = {};
  let vm = this;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      keyNode = node;
      break;
    } else {
      if (node.children.length > 0) {
        if (vm.getNodeKey(key, node.children)) {
          keyNode = vm.getNodeByKey(key, node.children);
        }
      }
    }
  }
  return keyNode;
}
function openTreeByKey(key, tree) {
  let vm = this;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      vm.expandedKeys.push(node.key);
    } else {
      if (node.children) {
        vm.openTreeByKey(key, node.children);
        vm.expandedKeys.push(node.key);
      }
    }
  }
}
function getNodeKey(key, tree) {
  let parentKey = "";
  let vm = this;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      parentKey = node.key;
    } else {
      if (node.children) {
        if (vm.getNodeKey(key, node.children)) {
          parentKey = vm.getNodeKey(key, node.children);
        }
      }
    }
  }
  return parentKey;
}
function deleteNode(key, tree) {
  let vm = this;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key === key) {
      tree.splice(i, 1);
    } else {
      if (node.children) {
        vm.deleteNode(key, node.children);
      }
    }
  }
}