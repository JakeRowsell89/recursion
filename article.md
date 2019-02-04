Recursion
===

Have you ever heard of the (~Law of the instrument~)[https://en.wikipedia.org/wiki/Law_of_the_instrument]? I hadn't before today, but I had heard the saying: "One who's only tool is a hammer will see a lot of problems that look like nails". It is a great saying that lends itself very well for software development. It has always been a motto for me and pushed me to explore different programming languages, paradigms and techniques. One of these techniques you might encounter, or be able to apply is _recursion_.

The definition gives you a bit of a flavour of how it works:
```
recursion
/rɪˈkəːʃ(ə)n/
the repeated application of a recursive procedure or definition.
```

See what it did there? It used the word `recursive` to describe what `recursion` is.
A more useful definition can be found in the (Wikipedia article)[https://en.wikipedia.org/wiki/Recursion]:
"... a function being defined is applied within its own definition."

There are a lot of problems that can be solved with or without recursion. Let's take a function for summing the contents of an array. Most people are familiar with using loops or other means of iteration to sum up an array like this:
```
function sum(numbers) {
  let total = 0
  for (const n of numbers) {
    total += n
  }
  return total
}
```

We can do this same thing recursively. Our approach will deal with a single element at a time. Because in recursion you call your own function, you generally start with a _base case_. The base case is a condition that leads to ending recursion. If you pass in an empty array you will not need to recursively go over the remainder of the array, so it's a good base case. The sensible value of the sum of an empty array seems 0, so we return that.

Next onto the actual recursion, we take the first number of the list and add it to the _sum of the rest of the numbers_. Makes sense right?  

```javascript
function sum(numbers) {
  if (list[0] === undefined) { // base case
    return 0
  } else {
    return numbers[0] + sum(numbers.slice(1)) // meat of the function
  }
}
```

A lot of languages have a list data structure used for variable-length ordered collections. It contains a head and a tail. The head is the value of the first element in the list, the tail is another list (describing a list already uses recursion!). We can do the same thing in Scala, which has the List data structure, for comparison to JavaScript.

```scala
def sum(list: List[Int]): Int = {
  if (list.isEmpty) 0 
  else list.head + add(list.tail)
}
```

p.s. I am aware we can use the new ES functionality to make the JS example more like Scala using array destructuring and the spread operator.
```javascript
const sum = ([head, ...tail]) => head === undefined ? 0 : head + sum(tail)
```

Let's try to solve another problem with recursion and write a `unique` function to de-duplicate. If you ever need to do this, the easiest way is _probably_ `Array.from(new Set([1,2,3,3])) // [ 1, 2, 3 ]` but we're in need of an example so let's say both the `Array.filter` and `Set` are off limits. 

```javascript
function unique(numbers) {
  const uniqueNumbers = []
  for (const n of numbers) {
    if (uniqueNumbers.indexOf(n) === -1) {
      uniqueNumbers.push(n)
    }
  }
  return uniqueNumbers
}
```

Now you know how recursion works, do you feel like having a go at writing the above in a recursive way?

We're all busy people, so I'll add a recursive solution for demonstrative purposes:
```javascript
function unique(numbers, uniqueNumbers = []) {
  const [head, ...tail] = numbers
  if (head === undefined) {
    return uniqueNumbers
  } else {
    if (uniqueNumbers.indexOf(head) === -1) {
      return unique(tail, uniqueNumbers.concat(head)) // you could also push into uniqueNumbers instead
    }
    return unique(tail, uniqueNumbers)
  }
}
```

We've recursively solved our problem! Does it seem like an obvious/easy way to do things? 
If you think you've got the hang of it why don't you try writing one of the following Array methods recursively:
- Array.filter
- Array.find
- Array.sort
- Array.reverse
- Array.indexOf


Special Cases of Recursion: Mutual Recursion

Sometimes recursion occurs through two functions. In this case the function doesn't _look_ recursive but if you look back at our definition, it satisfies it. The definition of function A refers to the definition of function B, and vice versa. You'd not be able to write out a full definition without ending up referring to the function you are defining. In reality I've encountered a use case for this exactly once, YMMV. (contrived example ahead):
```javascript
const addFromEvenIndex = (list) => {
  if (list[0] === undefined) {
    return 0
  } else {
    return list[0] + addFromUnevenIndex(list.slice(1))
  }
}

const addFromUnevenIndex = (list) => {
  if (list[0] === undefined) {
    return 0
  } else {
    return list[0].total + addFromEvenIndex(list.slice(1))
  }
}

// somehow I have an array that was made by collapsing a bunch of arrays of length 2
const array = [1, {total: 10}, 5, {total: 20}, 2, {total: 50}]
addFromEvenIndex(array)
```


Special Cases of Recursion: Tail Recursion

Tail recursion is very similar to regular recursion with the caveat that the result of your recursive call is used for in no further computation (besides being returned). There is probably a more technical explanation available, but this should suffice to illustrate the concept. We will delve deeper into the use of tail recursion later on. Let's write a simple function to check if an array contains an element:

```javascript 
function contains(element, list) {
  if (list[0] === undefined) {
    return false
  } else {
    return list[0] === element || contains(element, list.slice(1)) // tail recursive
  }
}
```

In this function we have our base case that says "if the current list is empty, the element is not in here". Our else block says "Is the current element what we are looking for, if not is it within the remainder of elements?". This is tail recursive, because when the bottom return statement is run, the recursive call is the last possible thing to happen. The `||` (OR) runs left-to-right but does not need to know about any result of what happens to its right. It only cares about what happens on its left.

For comparison, in our previous `sum` function the result of the recursive call is still used as an operand on the `+` operator. As such, it is not tail recursive:
```javascript
function sum(numbers) {
  if (list[0] === undefined) {
    return 0
  } else {
    // not tail recursive, + needs a result before being able to resolve to a value
    return numbers[0] + sum(numbers.slice(1)) 
  }
}
```

What's the point of (tail/mutual) recursion?

Lets start by asking ourselves why we need to know about our special cases of recursion.
What's the point in understanding mutual recursion? To be able to identify that it is recursion under the hood
What's the point in understanding tail recursion? Tail Call Optimisation (TCO)


Recursion, a double edged sword

If you are familiar with how the call stack works in <insert your favourite language>, you might have cleverly spotted there is a big problem with recursion. Returning another function call from your function means it needs to resolve newly called function before it can resolve the function that is supposed to return it. This means your call stack will push the second function call on top of the first one. If we are doing this with enough elements in the collection we are traversing we have a very good chance of seeing your languages equivalent of:
`RangeError: Maximum call stack size exceeded`

<A bit about call stacks>

TCO to the rescue, maybe.

One way to circumvent the call stack of your language being abused like this is by implementing TCO. When we have a proper tail recursive function, maybe we don't actually _need_ to resolve our calls before declaring the current function as "done executing". Take for example our `contains` function, if the current element is not what we are looking for, and there is something in our list of elements left to search, do we _care_ that this is resolved before our function is done?:
```javascript 
function contains(element, list) {
  if (list[0] === undefined) {
    return false
  } else {
    return list[0] === element || contains(element, list.slice(1)) // tail recursive
  }
}
```
If we were a compiler could we see that the last recursive step to be taken is not that different from a new function call to the same function with slightly different parameters? In _some_ languages (mostly functional programming) a tail-call is interpreted by the compiler as a jump statement rather than a function call. In effect this allows it to treat tail recursive functions to be treated as a loop rather than 



Cool, but why do I need it? Well.. In a lot of cases you don't. 

http://wiki.c2.com/?TailCallOptimization