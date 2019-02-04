const addFromEvenIndex = (list) => {
  if (list.length === 0) {
    return 0
  } else {
    return list[0] + addFromUnevenIndex(list.slice(1))
  }
}

const addFromUnevenIndex = (list) => {
  if (list.length === 0) {
    return 0
  } else {
    return list[0].total + addFromEvenIndex(list.slice(1))
  }
}

// somehow I have an array that was made by collapsing a bunch of arrays of length 2
const array = [1, {total: 10}, 5, {total: 20}, 2, {total: 50}]
addFromEvenIndex(array)