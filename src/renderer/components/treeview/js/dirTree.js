import dirTree from 'directory-tree'


function sortTree(children) {

  let order

  children.sort((a, b) => {

    if (a.type === 'directory') {

      order = -1

      sortTree(a.children)

    } else {

      order = 1

    }

    return order

  })

}

export default function (directory, filter = {}) {

  let tree

  tree = dirTree(directory, filter)
  sortTree(tree.children)

  return tree

}