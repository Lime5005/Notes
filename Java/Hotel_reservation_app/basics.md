## Concepts

### Primitives vs Objects
- Define a primitive: `integer age = 42;`
- Define an object: `Integer age = 42;`

### Type casting
- Automatic for smaller to larger type, ex, `int` to `double`.
- Manually for larger to smaller, ex, `double` to `int`, double 8bt to int 4bt.
> Truncation: remove, cut off the additional data.

### Methods vs functions
- Methods attached with a class or an object, functions can be accessed from anywhere.
- return type, params types.

### Types of Access Modifiers
- Public, Private, Protected, Default
- The protected can be accessed from: the defining class, inside the same package as the defining class, outside the package by a subclass.
- Can be used on methods and variables.

### New way to create an array
- `int [] numbers  = {1, 2, 3, 4};`
- Or: 
```java
int [] numbers = new int[4];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
```

### Loops
- A `for` loop in reversed order:
```java
public static void main(String[] args){
    // Add your code here
    int[] numbers = new int[4];
    numbers[0] = 1;
    numbers[1] = 2;
    numbers[2] = 3;
    numbers[3] = 4;
    String[] words = {"Ignition sequence start!", "Liftoff!"};
    System.out.println(words[0]);
    for (int i = numbers.length - 1 ; i >= 0; i--) {
      System.out.println(numbers[i]);
    }
    System.out.println(words[1]);
}
```
- A `while` loop:
```java
public static void main(String[] args) {

  int[] numbers = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

  int index = 0;
  do {
    System.out.println(numbers[index]);
    index++;
  }
  while (index < numbers.length);
}

```
### JavaDoc
> The JavaDoc reads through java files and parse certain parts of the code to automatically generate useful documentation.

### Java class vs object
- What is a class? A name, variables, constructor, methods.
- What is an object? 
> Data encapsulation  数据封装   
> State: variables; Behavior: methods;   
> A class is like a blueprint 蓝图 for a kind of object. The class defines the state and behavior that an object of that class will have.   

### Accessor methods vs mutator methods
- getters and setters for each variables

### Garbage collections
> Runs as a background task, removes unused Objects and no references Objects from Heap memory.   
