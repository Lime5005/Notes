## What is design pattern
### SOLID: Principles of Good Software Design
- Single Responsibility Principle.
> Each class should have only one responsibility for encapsulation.
- Open-Closed Principle.
> A class should be Open to extension (by enheritance or composition), but Close to modification.
- Liskov Substitution Principle.
> If two objects implement the same interface, they should be substitutable for one another without breaking your app.
- Interface Segregation Principle.
> Classes should only depend on interfaces that they actually use.
- Dependency Inversion Principle.
> All parts of your code should depend on interfaces, or abstractions. Implementation details should depend on interfaces, not the other way around.

## A design pattern is a general solution to certain kinds of common desgin issues that occur in software development.
- A design issue is the question you ask for how to organize your code.
- General solutions need to be customized to fit the specific situation.

### Why?
- Build strong software design intuition, can be used as a framework later.
- Help to adhere the good design principles.

## Patterns covered here:
- Creational patterns: Patterns that deal with creating objects.
- Behavioral patterns: Patterns that deal with how different objects interact.
- Structural patterns: Patterns that deal with how different objects fit together.

## Creational patterns
> A creational design pattern is any design pattern that concerns how objects in your program are created. These patterns can help you manage the creation of objects as your code becomes increasingly complex.   

### Singleton:
- A class that has only one instance, but no clear owner.
- You want that instance to be available everywhere in your code.
- The instance is initialized only when it's first used (also known as lazy initialization).
- Java ENUM types are always singletons.
```java
import java.util.Objects;

public final class Database {
    private static Database database;

    private Database() {}

    public static Database getInstance() {
        if (database == null) {
            database = new Database();
            database.connect("/usr/local/data/users.db");
        }
        return database;
    }

    // Connects to the remote database.
    private void connect(String url) {
        Objects.requireNonNull(url);
    }

    public static void main(String[] args) {
        Database a = Database.getInstance();
        Database b = Database.getInstance();

        System.out.println(a == b); // true
    }
}
```
#### Disadvantages of Singletons
- Singletons can cause brittle assumptions in your code. If later on, you decide you need - multiple instances of the class, you might have to refactor a bunch of code.
- Code that depends on singletons can become hard to test.
> Solution: Dependency Injection.

### Abstract Factory
- You want to hide construction details from callers.
- You want to encapsulate construction of several related objects into a single Java interface.
> Factories can return different implementations under the hood, while hiding construction complexity from callers.
> SLID applied.

### Builder
- A mutable factory that constructs the state of a to-be-created object, property by - property, and then builds the object.
- Usually supports method chaining.
- Often used to create immutable data objects.
> Create mutable versions of immutable objects.   
> Holds states that can be mutated before building an object.   
> Can improve the API of object creation, especially when the class being instantiated has a lot of constructor parameters.


### Dependency Injection
- DI moves the creation of dependencies outside of your code, means you tell the DI framework to create the objects for you and inject them into your class.
```java
class CourseRegistrar {
  //add @Inject annotations to instance fields:
  @Inject private Database db;
  @Inject private Clock clock;
  @Inject private RegistrationFactory factory;

  boolean registerStudentForCourse(Student s, int courseId) {
    Course c = db.getCourse(courseId);
    if (clock.instant().isAfter(c.getRegistrationDeadline())) return false;
    if (!s.getPassedCourses().containsAll(c.getPrereqs())) return false;
    db.createRegistration(factory.create(courseId, s.getId()));
    return true;
  }
}

```

```java
class CourseRegistrar {
  private final Database db;
  private final Clock clock;
  private final RegistrationFactory factory;

//add @Inject annotations to constructors:
  @Inject
  CourseRegistrar(Database db, Clock clock, RegistrationFactory factory) {
    this.db = db;
    this.clock = clock;
    this.factory = factory;
  }

  boolean registerStudentForCourse(Student s, int courseId) {
    Course c = db.getCourse(courseId);
    if (clock.instant().isAfter(c.getRegistrationDeadline())) return false;
    if (!s.getPassedCourses().containsAll(c.getPrereqs())) return false;
    db.createRegistration(factory.create(courseId, s.getId()));
    return true;
  }
}
```
> DI frameworks can usually be configured to return a specific instance of an object whenever it's injected. Any time that object is requested by an @Inject annotation, the DI framework will supply the exact same instance, making it effectively a singleton.   
> In test, it simulate behavoir by injecting fake objects, hence solved the problem of Singleton. 
> See more [spring_dependency_injection](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-dependencies).   


## Behavioral Patterns
> A behavioral design pattern is a pattern that involves how different objects interact. This is a very broad category. This lesson covers the following patterns:   
- The Strategy pattern.
- The Template Method pattern.

### Strategy pattern
- You define an interface to represent a kind of task or problem.
- Each concrete implementation defines a different "strategy" for solving the task.
- The strategies can be swapped for each other because callers code against the interface.
> Ex, the calculator interface.   
> What is the role of polymorphism in strategy pattern?   
> Polymorphism determines which concrete method implementation gets called when invoking the task interface.

### Template method pattern
- You define a base class or interface for a procedure or algorithm, but leave empty - placeholders for some parts of the procedure.
- Each placeholder is a blank or default method in the base class.
- This base class acts as a template.
- Callers fill in the blanks by extending the base class and overriding the placeholder methods.
> OLD applied.

### Observer pattern
- A subject notifies one or more subscribers that something has changed about the subject.

## Structural Patterns
> A structural design pattern is a design pattern that involve how objects fit together to form the structure of the software.   
### Adapter pattern
- The main purpose of the adapter pattern is to **transform** one API to another API.
> When to use?   
> You can use an adapter whenever you need to transform one API or interface into another. Adapters allow classes with otherwise incompatible interfaces to work together!   
> Adapters typically "wrap" an existing interface to adapt it to a different interface. One common use of the adapter pattern is to wrap legacy APIs, but adapters can be used with all sorts of APIs.   

### Decorator pattern
> Used extensively in Java's built-in IO libraries. Favoring composition.
- Both Adapter and Decorator patterns "wrap" another object, called the delegate.
- An adapter returns a different interface than the delegate.
- A decorator returns the same interface, but with **added** functionality or responsibilities.
- A Proxy代理 is similar to a Dacorator, the proxy **controls** or manages the access to the delegate.
> SL applied.
