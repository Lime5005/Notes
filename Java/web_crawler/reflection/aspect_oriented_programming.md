### Aspect Oriented Programming (AOP)
> Aspect Oriented Programming (AOP) is a design pattern that organizes code into cross-cutting concerns.   
- A cross-cutting concern is any concern that affects many different parts of the system. Examples include: logging, performance profiling, and database transaction managements.
- All the code that handles a cross-cutting concern is organized into an aspect, which is subdivided into advice.
Advice plugs into your executing code, via a method interceptor, to take care of the cross-cutting concern.
- Join points are places where advice can plug into your code, usually via method interceptors.
- Whereas a join point is a place where your code could potentially use advice, pointcuts are places where your code actually does use advice. An aspect is defined by advice and one or more pointcuts.

#### How AOP Uses Dynamic Proxies and Dependency Injection
- AOP uses dynamic proxies to intercept methods and execute advice.
- When you add an @Inject annotation to your code, the AOP framework uses dependency injection to supply an object. The supplied object is actually a dynamic proxy with method interceptors to run different pieces of advice code.

### How Java Loads Classes
#### Java Program Lifecycle
- You start by writing Java source code, which is human-readable text.
- The Java compiler, or the javac command, compiles the source code into bytecode;Bytecode is Java's platform-independent representation of the classes in the program.
- The Java launcher, or the java command, starts up the Java Virtual Machine, and loads the bytecode to execute the program.
> Why does Java compile to byte code? Byte code can execute on any JVM.   

#### Where Java Looks for Bytecode
- Class bytecode is stored in files, such as `.class` files, `.jar` files, or `.zip` files. The Java launcher needs to find these files. Here are the different ways the Java launcher looks for them:
  - Looks in the local file system for the Java Runtime Installation, which contains Bootstrap Classes, like `java.lang.Object` and `java.lang.String`. The location of the installation comes from the `JAVA_HOME` environment variable.
  - Looks for user-defined classes in the current directory where the `java` command is running.
  - Follows the `CLASSPATH` environment variable.
  - Follows the `-classpath` or `-jar` options passed to the `java` command on the command-line.

#### Class Loaders
- Every class in the Java Runtime is loaded by a `ClassLoader`.
- `"java.lang.String"` --> Class Loader ((find bytecode-->create instance)) --> Class<String>.
- See details: [ClassLoader](https://docs.oracle.com/javase/10/docs/api/java/lang/ClassLoader.html).

## Steps for Reflection
- Annotations: adding annotations to your code, defining your own annotations, and using them to add functionality at runtime.
- Reflection API: use Java's reflection API to inspect the program's structure, and use reflection to look for annotations, inspect classes, etc.
- Dynamic code: dynamic coding techniques, such as: invoking `Method` objects at runtime, using dynamic proxy, and loading class byte code using custom `ClassLoader`s.
> By applying these advanced techniques tastefully, you can make your programs flexible, extensible, and dynamic.   