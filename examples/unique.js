function unique(numbers) {
  const uniqueNumbers = []
  for (const n of numbers) {
    if (uniqueNumbers.indexOf(n) === -1) {
      uniqueNumbers.push(n)
    }
  }
  return uniqueNumbers
}

// function unique(numbers, uniqueNumbers = []) {
//   const [head, ...tail] = numbers
//   if (head === undefined) {
//     return uniqueNumbers
//   } else {
//     if (uniqueNumbers.indexOf(head) === -1) {
//       uniqueNumbers.push(head)
//     }
//     return unique(tail, uniqueNumbers)
//   }
// }

const result = unique([1, 2, 2, 3, 3, 3])
console.log(result)