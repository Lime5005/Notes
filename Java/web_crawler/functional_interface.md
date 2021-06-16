### Functional interfaces
> A functional interface is a Java interface with exactly one abstract method, called the functional method.  
> Only functional interfaces can be implemented by lambdas.    
```java
@FunctionalInterface
public interface Predicate<T> {
  boolean test(T t); // An abstract method, a functional method.
  default Predicate<T> negate() {return (t) -> !test(t);} // a default method is allowed
}
```
- The annotation `@FunctionalInterface` is optional, added for:
- If the interface is not a valid functional interface, it will report a Compilation error.
- The interface is designed to be used with lambdas.
> When you're designing a Java interface, you should consider making it a functional interface if it describes a single operation.    
- See more details such as `BinaryOperation` in [java_util_function_doc](https://docs.oracle.com/javase/10/docs/api/java/util/function/package-summary.html);
