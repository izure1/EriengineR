import dirTree from 'directory-tree'


function sortTree(children) {

  let order

  children.sort((a, b) => {

    if (a.type === 'directory') {

      if (a.type === b.type) {
        sortTree(a.children)
        return a.name > b.name ? 1 : -1
      } else return -1

    } else {

      if (a.type === b.type) {
        return a.name > b.name ? 1 : -1
      } else return -1

    }

  })

}

export default function (directory, filter = {}) {

  let tree

  tree = dirTree(directory, filter)
  sortTree(tree.children)

  return tree

}