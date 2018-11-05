export default function disableMenu (menu) {
  for (let item of menu) {
    if (item.aftered) {
      item.enabled = false
      delete item.aftered
    }

    if (Array.isArray(item.submenu)) {
      disableMenu(item.submenu)
    }
  }

  return menu
};
