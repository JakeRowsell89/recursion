function sum(numbers) {
  let total = 0
  for (const n of numbers) {
    total += n
  }
  return total
}

// function sum(numbers) {
//   if (numbers.length === 0) { // base case
//     return 0
//   } else {
//     return numbers[0] + sum(numbers.slice(1)) // meat of the function
//   }
// }

const result = sum([1, 10, 100, 1000])

console.log(result)