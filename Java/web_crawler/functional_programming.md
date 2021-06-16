### Imperative code
- Each line of code gives a specific operation.
- Focus on how a task is performed.
```java
int getTopScore(List<Student> students) {
  int toScore = 0;
  for (Student s : students) {
    if (s == null) continue;
    topScore = Math.max(topScore, s.getScore());
  }
  return topScore;
}
```

### Functional code
- Describe what happens to inputs to produce outputs.
- Using streams and lambda Expressions, step to step transforms the input into output.
> Les expressions lambda sont aussi nommées closures ou fonctions anonymes : leur but principal est de permettre de passer en paramètre un ensemble de traitements.   
> Ex, `list.forEach(System.out::println);`.   
```java
int getTopScore(List<Student> students) {
  return students.stream()
        .filter(Objects::notNull)
        .mapToInt(Student::getScore)
        .max()
        .orElse(0);
}
```
- Lambda expression example:
```java
(Double x, int y) -> {return x * y};
(x, y) -> x * y;
x -> x * x;
() -> () -> 10;
```

### Java bytecode
- Write a simple main function `Test` to print "Hello World".
- `javac Test.java`;
- Now you have 2 files: `Test.java` and `Test.class`.
- `cd ..`
- `java javaTest.Test`
- "Hello World"
- `cd javaTest`
- `javap -c Test`
- See details about compiled file.

### Anonymous Subclasses
- Lambda is a convenient way to implement functional interfaces in Java.
- When to use lambda? 
- When we use functional interfaces.
> An anonymous class is a class that is defined "in-line" and has no name, and so it is called "anonymous".   
- Difference between anonymous and lambda classes?
- Anoymous class: generated at compile-time, can override `equals()/ hashCode()`. `this` refers to the anonymous class.
- Lambda class: generated at runtime, cannot override the functions, has no identity, `this` refers to the lambda enclosed class (if it's defined in a static function, it'll not compile).

### Capturing Variables
- If a lambda uses any variables from the surrounding code, those variables are captured.
- `Effectively final` variables can be captured by lambda expressions.
- Its value will never change after initialized.
- To test, add a `final` to the variable, if it compiles, it is `effectively final`. 
```java
Map<Year, Integer> getClassSizes(List<Student> students) {
  final Map<Year, Integer> classSizes = new HashMap<>(); // The classSizes is an effectively final.
  students.stream().forEach(s ->
      classSizes.compute(
          s.getGraduationYear(),
          (k, v) -> (v == null) ? 1 : 1 + v));
  return classSizes;
}
```
> In java, objects are passed by reference, but primitives are passed by value.   
> Even though the `HashMap` changes, the variable's value is the `HashMap`'s location in memory, and that location never changes.   

- How to get below code compile?
```java
List<Runnable> runnables = new ArrayList<>(10);
for (int i = 0; i < 10; i++) {
  runnables.add(() -> System.out.println(i)); // The i changes by i++, so not effectively final.
}
```
- Using `IntStream` to get around:
```java
List<Runnable> runnables = IntStream.range(1, 10)
                                    .map(i -> () -> System.out.println(i))
                                    .collect(Collectors.toList());
```

### Method references
- `::`.
- When to use: when using a lambda.
- `String::valueOf` = `o -> String.valueOf(o)`;
- `Object::toString` = `o -> o.toString()`;
- `bar::equals` = `o -> bar.equals(o)`;
- `HashMap:: new` = `() -> new HashMap<>()`;
- `(System.out)::println` = `o -> System.out.println(o)`;
> Method references cannot capture surrounding variables, if needed, use a custom lambda instead.   

### The stream API
- A stream is a sequence of elements, create -> operate -> terminate.
- Identify common `intermediate` and `terminal` stream operations.
- `intermediate`: return another stream, transform the elements, pipeline has one or more intermediate operations.
- `terminal`: Ends the stream, returns a result, only one and it's at the end of the pipeline.
> Streams are single-use. Once you do an operation on a Stream, you cannot to any more operations on that same stream. This means intermediate operations always return a brand new Stream, never the original.   
> Streams are lazily evaluated. No computation happens until the very end, when the terminal operation is called.   

#### Stream API: Collectors
- A `Collector` is a terminal stream operation that accumulates stream elements into a container.
> There are collectors for all the common data structures such as lists, sets, and maps.   
```java
Map<Year, Long> graduatingClassSizes = studentList.stream()
    .collect(Collectors.groupingBy(
        Student::getGraduationYear, Collectors.counting());
        // Count how many students graduate from each year
```
- Commun usages:
- Aggregating 汇总 stream elements into a data structure such as a list, a map or a set.
- Performing reduction operations like summing or counting elements.

### Optional type
- `java.util.Optional`, an alternative to use `null`.
- When you're designing Java APIs, you should consider using `Optional` instead of `null` to represent the absence of values.
- `Optional` can have methods invoked on it without throwing `NullPointerException`, the Stream API uses optional types for many of its terminal operations.
- Methods like: `orElse()`, `orElseThrow()`, and `map()`.
- However, optionals can sometimes lead to more verbose code 冗长的代码 by forcing you to call `.get()` whenever you want the value.
