const recursive = require('.')

describe('recursive functions:', () => {
  const emptyArray = []
  const x = 0
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
      const array = [x]
      expect(recursive.find(x, array)).toBe(x)
    })

    test('Should return x if an array containing x is passed in', () => {
      const array = [x]
      expect(recursive.find(x, array)).toBe(x)
    })

    test('Should return x if an array with values before x is passed in', () => {
      const array = [1,2,3,4,x]
      expect(recursive.find(x, array)).toBe(x)
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
      const array = [x]
      expect(recursive.indexOf(x, array)).toBe(0)
    })

    test('Should return x if an array containing x is passed in', () => {
      const array = [x]
      expect(recursive.indexOf(x, array)).toBe(x)
    })

    test('Should return x if an array with values before x is passed in', () => {
      expect(recursive.indexOf(x, arrayWithX)).toBe(arrayWithX.indexOf(x))
    })
  })
})