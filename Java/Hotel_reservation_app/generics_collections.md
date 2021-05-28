## Generics and Collections
### Generics
- Why? 
- Generics: A single method to handle different types of data.
> Generics are a way to parameterize class types into classes, methods and variables so that we eliminate the need for casting, have stronger type checks at compile time, and develop generic algorithms.   
```java
List strings = new List();
List<String> strings = new <String>ArrayList();
```
> Because we've used generics to identify the items in the list as Strings, we could now call methods directly on them without having to first cast them.  
- `for` loop for Object in java:
```java
for (Object variable: variables) {
            GenericsExercise.displayClassName(variable);
        }
```

### Collections
- Why?
- Collections: Collections are a set of data structures that were introduced in Java 5.0 to solve problems with consistency between data structures and to address performance issues.
- For High performance/efficiency, High degree of interoperability, Integrate with existing APIs seamlessly.
> Collections are data structures that were created to provide improved interoperability and performance. Collections provides a more effective framework and architecture for storing, retrieving, and processing data.   
- Collections is an interface, implements by `Set`, `Map`, `List`, are all from the `Iterable` interface.
> The Collections framework consists of several different data structure classes like `List`, `Maps` and `Queues`. In addition, there are utility classes like `Collections` and `Arrays` that provide methods for sorting and creating empty lists.    
- Example: 
- Using `Iterator` class:
```java
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class IteratorExercise {
    public static void main(String[] args) {
        List<String> names = new LinkedList<String>();
        names.add("Mike");
        names.add("Bob");
        names.add("Kitty");

        Iterator<String> iterator = names.iterator();

        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}
```
- Using `for each` loop:
```java
import java.util.LinkedList;
import java.util.List;

public class CollectionsExercise {
    public static void main(String[] args) {
        List<String> listOfItems = new LinkedList<String>();
        listOfItems.add("Mike");
        listOfItems.add("Bob");
        listOfItems.add("Alice");

        for(String name :  listOfItems) {
            System.out.println(name);
        }
    }
}
``` 
#### Sorting collections
- A list of Strings can be sorted by simply passing the list to the `Collections.sort()` method.
- Wrapper objects were introduced in Java to wrap primitive variable types into objects, ex, the primitive `int` can be converted to `Integer` objects and then been sorted.
- User-defined classes, implement the `Comparable` Interface to use the `Collections.sort()` method, ex, using `compareTo` to compare two objects of the same type.
- Example:
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SortingExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<String>();
        names.add("Kitty");
        names.add("Bob");
        names.add("Alice");

        Collections.sort(names); // Import the Collections interface to use `sort`.
        for (String name: names) {
            System.out.println(name); // The result is Alice, Bob, Kitty.
        }
    }
}
```
