### Functional interfaces
> A functional interface is a Java interface with exactly one abstract method, called the functional method.   
```java
@FunctionalInterface
public interface Predicate<T> {
  boolean test(T t); // An abstract method, a functional method.
  default Predicate<T> negate() {return (t) -> !test(t);}
}
```
- The annotation `@FunctionalInterface` is added for:
- If the interface is not a valid functional interface, it will report a Compilation error.
- The interface is designed to be used with lambdas.
> When you're designing a Java interface, you should consider making it a functional interface if it describes a single operation.   
