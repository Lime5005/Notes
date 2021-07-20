### Defining Custom Annotations
- Example:
```java
@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)  // Applies to class, interface, or enum
public @interface ConvertsTo {
  Class<?> targetClass();
  String setterPrefix() default "set";
}
```
- Elements: the type of an element has to be a compile-time constant, an enum, a class literal, or an array initializer.
- `default`, `value`.
- Retention Policies：
  - `SOURCE`	Annotation only exists in the source code.
  - `RUNTIME`	Annotation exists in the .class bytecode file and is available at runtime to be used with reflection.
  - `CLASS`	Annotation exists in the .class bytecode file but not exist while the program is running.
- Annotation Targets:
  - `TYPE`	Annotation is applied to a class, interface, or enum.
  - `FIELD`	Annotation is applied to a field.
  - `METHOD`	Annotation is applied to a method.
  - `PARAMETER`	Annotation is applied to a parameter.
  - `CONSTRUCTOR`	Annotation is applied to a constructor.
  - `LOCAL_VARIABLE`	Annotation is applied to a local variable.
  - `ANNOTATION_TYPE`	Annotation is applied to an annotation type.
  - `PACKAGE`	Annotation is applied to a package.
  - `TYPE_PARAMETER`	Annotation is applied to a type parameter.
  - `TYPE_USE`	Annotation is applied to a type use.
- `ElementType`:
  - `TYPE`	A class, interface, enum, or annotation type.
  - `FIELD`	A field.
  - `METHOD`	A method.
  - `PARAMETER`	A parameter.
  - `CONSTRUCTOR`	A constructor.
  - `LOCAL_VARIABLE`	A local variable.
  - `ANNOTATION_TYPE`	An annotation type.
  - `PACKAGE`	A package.
  - `TYPE_PARAMETER`	A type parameter.
  - `TYPE_USE`	A type use.


### Reflection API
- java.lang.reflect package
- Reflection allows your code to examine its own structure and behavior.
- Every class, interface, and type (including primitive types) has a corresponding `Class` object that accesses metadata about that type.
- `Class` objects are the main entry point into Java's Reflection API.

#### Obtaining `Class` Objects
- Call `getClass()` on an object: `Class<String> c = "Hello world!".getClass();`
- Use `.class` to create a class literal:
```java
Class<String> c = String.class;
Class<int[]>  c = int[].class;
```
- Create classes dynamically using `Class.forName()`: `Class<String> c = Class.forName("java.lang.String");`.
- Use `Class.forName()` to create an array class: `Class<String[]> c = Class.forName("[Ljava.lang.String;");`.
> Once you have a `Class` object, you can start using reflection with the [Class API](https://docs.oracle.com/javase/10/docs/api/java/lang/Class.html)! 

### Working with Methods
- java.lang.reflect Class Method
- Method[] getMethods()
- Method getMethod(String name, Class<?>... parameterTypes)
  - Object invoke(Object obj, Object... args)
  - method.invoke(obj)

### Dynamic Proxy
- A dynamic proxy is a class that implements a list of interfaces specified at runtime.
- When to use: when the interface to implement is only known at runtime.
- avoid manually writing decorator code for many interfaces.
- Used to create method intercepters, such as for Aspect Oriented Programming.
- Creating a general Decorator wrapper so that you don't need to know the intferface to implement at compile time

#### How Do Dynamic Proxies Work?
1, First, you create a custom `InvocationHandler`, it is an abstract class that receives method invocations. A method invocation is a `Method` and an array of parameters.
2, Then, you create a dynamic proxy instance using the `Proxy.newProxyInstance()`.
3, When clients call a method on the proxy instance, the method invocation is forwared to your `MethodInvocationHandler`.
> See details: [java.lang.reflect.Proxy](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html).
