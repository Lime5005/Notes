### Main components
- CLI for user interface: user login, search a room, book a room, etc.
- Java code: our business logic.
- Java collections: for in-memory data storage.

### Application Architecture
- UI components: main menu, admin menu
- Resources: Hotel reservation resource, admin resource
- Services: reservation service, customer service
- Models: Freeroom, Room, Reservation, Customer

> Layers:   
> An important thing to notice about this architecture is how we use layers to support modularization and decoupling.   
> Layering is achieved by ensuring there are no cross-communication calls from one layer to another.   
> Ex, we may need to move UI from CLI to a webpage, the layer is easy to move.   

### Requirements
> Business logic requirements: a room should be booked for only one user a time.


### Download java and IntelliJ IDEA
- [java_download](https://docs.oracle.com/en/java/javase/15/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A)
- [IntelliJ IDEA_download](https://www.jetbrains.com/idea/download/#section=mac)
- Java Development Kit 
- Java Runtime Environment

### About Java
- James Gosling in 1995, name is inspired by java coffee
- Primitive types: byte, 1bt, [-128, 127]; short, 2bt, [-32k, 32k]; int, 4bt, [-2B, 2B]; long, 8bt; decimal numbers: float, 4bt; double, 8bt; char, 2bt; boolean, 1bt;
> A primitive value is simply a value, by itself, with no additional data.   
- Reference/object types: date; email, etc;
> A reference value is a value that refers to an object stored in another location in memory.      
- Reference types are copied by the references, primitive types are copied by their value, these values are independent of each other.

### What is Java
- Object-Oriented Programming: model code as objects
- Static typing: variable data type is defined, cannot change.
- Not dynamic typing
- Portable: desktop, mobile, macOS, linux, windows.
- Not like C++, no need different compiles for different platforms.
- Use Java Virtual Machine for compile, write once, run anywhere.

### When to use java
- Business applications(client and server)
- Web applications
- Android - mobile applications

> Java excels in: Scalability, performance, multi-threading, memory management, portability.

### Application building blocks:
- Keywords, Variables, Loops, Methods, Access Modifiers, Javadoc, Arrays.
- 51 keywords, ex, abstract, assert, byte, implements, transient, volatile
