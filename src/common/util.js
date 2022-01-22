function stringToColor(str) {
  var hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var color = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

export { stringToColor }
