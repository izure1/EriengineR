function setValue(data, properties, value) {
  eval(`(data.${properties} = value)`)
}

function getValue(data, properties) {
  return eval(`(data.${properties})`)
}


export {
  setValue,
  getValue
}