Recursion
===

1. What is Recursion?
2. Mutual Recursion
3. Tail Recursion
4. Where Recursion Shines
5. Recursion: A Double Edged Sword

What is recursion? 
===
```
recursion
/rɪˈkəːʃ(ə)n/
the repeated application of a recursive procedure or definition.
```

See what it did there? It used the word `recursive` to describe what `recursion` is.
A more useful definition can be found in the [Wikipedia article](https://en.wikipedia.org/wiki/Recursion):
"... a function being defined is applied within its own definition."

Recursion is an approach that tries to break a problem down into small pieces and solve those.

Many problems can be solved with or without recursion. Let's take a function for summing the contents of an array. Most people are familiar with using loops or other means of iteration to sum up an array like this:
```javascript
function sum(numbers) {
  let total = 0
  for (const n of numbers) {
    total += n
  }
  return total
}
```

Let's look what we've done here. We take an array of `numbers`, set a `total` to 0, and for each number `n` set `total` to `total + n`. Once we are out of numbers we return `total`.

How can do this recursively? Well, instead of dealing with the whole problem we can return a fairly simple expression: "return <first number> + sum(<remaining numbers>)". Instead of adding all the numbers in our function, we add the current number to the sum of our total. Let's write that out in code.

There are three rules to produce a working recursive function:
1. A recursive algorithm must have a base case.
2. A recursive algorithm must change its state and move toward the base case.
3. A recursive algorithm must call itself, recursively.

The base case is a condition that ensures your function stops recursively calling itself. For arrays generally a good place to start is the case of receiving an empty array. I'd argue the sum of an empty list is 0, so that seems like a sensible return value.

Next onto the actual recursion, we take the first number of the list and add it to the _sum of the rest of the numbers_: 

```javascript
function sum(numbers) {
  if (numbers.length === 0) { // base case
    return 0
  } else {
    return numbers[0] + sum(numbers.slice(1)) // meat of the function
  }
}
```

Let's try to solve another problem with recursion and write a `unique` function to de-duplicate values. You might end up writing something like this:

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
      return unique(tail, uniqueNumbers.concat(head))
    }
    return unique(tail, uniqueNumbers)
  }
}
```

Mutual Recursion
===

Sometimes recursion occurs through two functions, in that function A might call function B, and vice versa. In this case the function doesn't _look_ recursive but if you look back at our definition, it does satisfy it:
"... a function being defined is applied within its own definition."

You'd not be able to write out a full definition without ending up referring to the function you are defining. In reality I've encountered a use case for this exactly once, but we may as well cover it just in case. (contrived example ahead):

```javascript
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
```

Tail Recursion
===

Tail recursion is very similar to regular recursion with the caveat that the result of your recursive call is used in no further computation (besides being returned). There is probably a more technical explanation available, but this should suffice to illustrate the concept. We will delve deeper into the use of tail recursion later on. Let's write a simple function to check if an array contains an element:

```javascript 
function contains(element, list) {
  if (list.length === 0) {
    return false
  } else {
    return list[0] === element || contains(element, list.slice(1)) // tail recursive
  }
}
```

In this function we have our base case that says "if the current list is empty, the element is not in here". Our else block says "Is the current element what we are looking for _or_ is within the remainder of elements". This is tail recursive, because when the bottom return statement is run, the recursive call is the last possible thing to happen. The `||` (OR) runs left-to-right but it doesn't need the right-hand-side expression to determine the result. Once it has run the left hand side the OR can simply return whatever happens on its right which would be different from for instance an AND if the first value was truthy.

For comparison, in our previous `sum` function the result of the recursive call is still used as an operand on the `+` operator. `+` needs the results of the expressions on both sides to be able to resolve itself to a total. As such it is not tail recursive:
```javascript
function sum(numbers) {
  if (numbers.length === 0) {
    return 0
  } else {
    // not tail recursive, it needs the values both sides of + to evaluate the expression
    return numbers[0] + sum(numbers.slice(1)) 
  }
}
function sum(numbers, total = 0) {
  if (numbers.length === 0) {
    return total
  } else {
    // tail recursive, the last call is to sum
    return sum(numbers.slice(1), total + numbers[0]) 
  }
}
```

Where Recursion Shines
===

What is the benefit of taking this approach over something more familiar? A recursive approach is beneficial when a problem can be broken down into smaller problems. A frequently cited example is depth-first tree traversal, so lets try to write a function to check if a binary tree `contains` a certain value.

```javascript
// Lets assume each node in the tree has the following structure, where left/right can contain references to other nodes
const node = {
  value: null,
  left: null,
  right: null
}

const left = { ...node, value: 1 }
const right = { ...node, value: 1 }
const tree = { ...node, left, right } // A tree is really the same as a node and the branches on the left and right

function contains(x, tree) {
  if (tree === null) {
    return false // base-case
  } else {
    return tree.value === x || contains(x, tree.left) || contains(x, tree.right)
  }
}
```

Pretty neat right? If the tree is null the tree doesn't contain x, so we return false. Otherwise we return the expression "current node value is x OR it's contained in the left subtree OR its contained in the right subtree". Sure, tree traversal _can_ be done iteratively but it's definitely not as clean as this. What's also nice is that we can quite easily change the _order of traversal_. This implementation is _pre-order_, but we could easily tweak it to be _in-order_ or _post-order_. The naming is derived from when the root of a tree is evaluated in comparison to its left and right sub-trees.

```
Single node perspective:
  X     In-order (Left, Root, Right): Y -> X -> Z
 / \    Pre-order (Root, Left, Right): X -> Y -> Z
Y   Z   Post-order (Left, Right, Root): Z -> Y -> X

Multi node perspective:
      A
     / \
    B   C
   /
  X     In-order: Y -> X -> Z -> B -> A -> C
 / \    Pre-order: A -> B -> X -> Y -> Z -> C
Y   Z   Post-order: Y -> Z -> X -> B -> C -> A

Returning in a specific order:
In-order: contains(x, tree.left) || tree.value === x || contains(x, tree.right)
Pre-order: tree.value === x || contains(x, tree.left) || contains(x, tree.right)
Post-order: contains(x, tree.left) || contains(x, tree.right) || tree.value === x
```

Hopefully you can appreciate the elegance of that solution! 
Additionally thinking about the problem from a different perspective brings you closer to the problem. Knowing alternative approaches to solving problems allows you to recognize patterns you would otherwise overlook.
Lastly recursive functions are generally _pure functions*_ which come with several benefits beyond the scope of this document. 

_* pure functions are functions in a mathematical sense, their output is a direct result of input and they don't result in any observable changes besides returning a value_

Recursion: A Double Edged Sword
===

If you are familiar with how the call stack works in <your favourite language>, you might have cleverly spotted there is a big problem with recursion. Returning another function call from your function means it needs to resolve newly called function before it can resolve the calling function. This means your call stack will push a new stack frame for the second function call on top of the first one. If we do this with enough elements in our inputs we have a good chance of seeing your languages equivalent of:
`RangeError: Maximum call stack size exceeded`

One way to circumvent this problem on a language level is by Tail Call Optimization. 
_"If the last thing a function does before it returns is call itself, rather than doing a jump-and-add-stack-frame immediately followed by a pop-stack-frame-and-return-to-caller, it should be safe to simply jump to the start of the second function, letting it re-use the first functions stack frame."_ ~ Loosely paraphrased from [this interesting read](http://wiki.c2.com/?TailCallOptimization)

In other words, under the hood it gets around the problem by solving it similarly to how a loop would be run rather than how accumulative function calls would be.

Exercises:
===

Does recursion seem like an obvious/easy way to do things? Maybe not, but hopefully you will at least have found it interesting. Why not try writing one of the following Array methods recursively?
- Array.filter
- Array.find
- Array.reverse
- Array.indexOf
