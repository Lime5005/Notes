### Packages, Inheritance, Abstract classes
- Packages, which are essentially like folders you can use to organize your code and identify exactly which file (or class) you are referring to.
- Inheritance, where one class acquires properties and methods from another class.
- Abstract classes, which cannot be directly instantiated themselves, but that allow us to define the behavior for each of the subclasses.
- Interfaces, which support decoupling and allow us to avoid hardcoding features in an application.
- Polymorphism 多态性, which is the ability for an object to take on many forms.

- `clone()`, so that we can clone or make a copy of any object.
- `equals()`, which we can use to determine if two objects are the same.
- `hashCode()`, which provides a unique hash code for each object. This is something we'll make use of later on when we need to store and retrieve objects in specific data sets.
- `toString()`, which we can use to get a description of the current state of an object.

### Inheritance
- Use `super(var1, var2)` and `super.method()` for a subclass.

### Polymorphism
- Polymorphism is the ability of an object to take on many forms.
> Ex, a `Car` object is also a `Vehicle` object since `Car` inherits from `Vehicle`.
- Abstract class and abstract method

### Interface
- When to use interface instead of abstract class:
> We expect unrelated classes will be implementing our interface.   
> We want to support multiple inheritance.   
> We want to specify the behavior for a data type, but we do not care about the implementation.   
- Through interface, we can `implements` more than one class.
- `public class Car implements Vehicle, Production{}`, hence implements the methods from both classes.
