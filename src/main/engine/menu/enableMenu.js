export default function enableMenu (menu) {
  for (let item of menu) {
    if (item.aftered) {
      item.enabled = true
      delete item.aftered
    }

    if (Array.isArray(item.submenu)) {
      enableMenu(item.submenu)
    }
  }

  return menu
};
