function find(x, list) {
  if (!list.length) {
    return undefined
  }
  if (list[0] === x) {
    return list[0]
  }
  return find(x, list.slice(1))
}

function indexOf(x, list, index = -1) {
  if (!list.length) {
    return -1
  }
  if (list[0] === x) {
    return index + 1
  }

  return indexOf(x, list.slice(1), index + 1)
}

function reverse(list) {
  if (!list.length) {
    return []
  }
  return reverse(list.slice(1)).concat(list[0])
}

function filter(fn, list) {
  if (!list.length) {
    return []
  }

  if (fn(list[0])) {
    return [list[0], ...filter(fn, list.slice(1))]
  } else {
    return filter(fn, list.slice(1))
  }
}

module.exports = {
  indexOf,
  find,
  reverse,
  filter,
}