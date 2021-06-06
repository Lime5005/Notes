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
