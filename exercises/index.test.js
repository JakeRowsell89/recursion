const recursive = require('.')

describe('recursive functions:', () => {
  const emptyArray = []
  const x = 0
  const arrayOnlyX = [x]
  const arrayWithoutX = [1,2,3]
  const arrayWithX = [1,2,3,4,x]

  describe('find', () => {
    test('Base case: Should return undefined when searching in an empty array', () => {
      expect(recursive.find(x, emptyArray)).toBeUndefined()
    })

    test('Should return undefined when the array passed in does not contain the value', () => {
      expect(recursive.find(x, arrayWithoutX)).toBeUndefined()
    })

    test('Should return the value if an array containing that value is passed in', () => {
      expect(recursive.find(x, arrayOnlyX)).toBe(x)
    })

    test('Should return x if an array containing x is passed in', () => {
      expect(recursive.find(x, arrayOnlyX)).toBe(x)
    })

    test('Should return x if an array with values before x is passed in', () => {
      expect(recursive.find(x, arrayWithX)).toBe(x)
    })
  })

  describe('indexOf', () => {
    test('Base case: Should return -1 when searching in an empty array', () => {
      expect(recursive.indexOf(x, emptyArray)).toBe(-1)
    })

    test('Should return -1 when the array passed in does not contain the value', () => {
      expect(recursive.indexOf(x, arrayWithoutX)).toBe(-1)
    })

    test('Should return the value if an array containing that value is passed in', () => {
      expect(recursive.indexOf(x, arrayOnlyX)).toBe(0)
    })

    test('Should return x if an array containing x is passed in', () => {
      expect(recursive.indexOf(x, arrayOnlyX)).toBe(x)
    })

    test('Should return x if an array with values before x is passed in', () => {
      expect(recursive.indexOf(x, arrayWithX)).toBe(arrayWithX.indexOf(x))
    })
  })

  describe('reverse', () => {
    test('Base case: Should return an empty array when reversing an empty array', () => {
      expect(recursive.reverse(emptyArray)).toEqual([])
    })

    test('Should return the same array when passing in an array of 1', () => {
      expect(recursive.reverse(arrayOnlyX)).toEqual(arrayOnlyX)
    })

    test('Should return a reversed array', () => {
      const array = [x]
      expect(recursive.reverse(arrayWithX)).toEqual(arrayWithX.reverse())
    })
  })
  
  describe('filter', () => {
    const isPositive = (x) => x > 0
    const positiveNumbers = [1,2,3]
    const negativeNumbers = [-1,-2,-3]

    test('Base case: Should return undefined when filtering in an empty array', () => {
      expect(recursive.filter(isPositive, emptyArray)).toEqual(emptyArray)
    })

    test('Should return the same array if every element matches the predicate', () => {
      expect(recursive.filter(isPositive, positiveNumbers)).toEqual(positiveNumbers)
    })

    test('Should return only the elements matching the predicate', () => {
      expect(recursive.filter(isPositive, [...negativeNumbers, ...positiveNumbers])).toEqual(positiveNumbers)
    })

    test('Should return an empty array when no elements match the predicate', () => {
      const array = [1,2,3,4,x]
      expect(recursive.filter(isPositive, negativeNumbers)).toEqual(emptyArray)
    })
  })
})