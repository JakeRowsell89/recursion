function contains(element, list) {
  if (list.length === 0) {
    return false
  } else {
    return list[0] === element || contains(element, list.slice(1)) // tail recursive
  }
}