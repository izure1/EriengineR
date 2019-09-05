export default function (macros) {

  return macros.map(macro => {

    return {
      key: macro.cid,
      text: macro.title,
      value: macro
    }

  })

}