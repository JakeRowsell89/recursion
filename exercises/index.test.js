const recursive = require('.')

describe('recursive functions:', () => {
  describe('find', () => {
    const emptyArray = []
    const x = 0

    test('Base case: Should return undefined when searching in an empty array', () => {
      expect(recursive.find(x, emptyArray)).toBeUndefined()
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
})