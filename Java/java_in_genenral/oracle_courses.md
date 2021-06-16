### Java design
- Analysis, Design, and Architecture
- Use Unified Modelling Language(UML) to:
- Analyze business requirements
- Model code structures
- Describe application deployment
> Use case -> Class -> Activity -> Sequence -> State transition -> Deployment

### Java APIs
- An array is a simple group of elements.

#### The `Collection` API provides more flexible capabilities of managing groups of elements.
> Such as ArrayList, LinkedList, Set, Stack, Queue, to add, update, remove, search, rearrange.   

#### The Java `Steams` APIs: 
- They Efficiently filter, map, and reduce large streams of data.
- They perform actions upon data using lambda expressions.
- Lambda expressions are a form of functional programming, very powerful for large data sets.
```java
List<Employee> employees = new ArrayList<>();
employees.stream().parallel()
                  .filter(e->e.getSalary()>1000)
                  .forEach(e->calculateBonus());
// Return a stream of objects, doing in parallel, multi-threaded automatically, filtering the list, and calculate bonus at the same time.
```

#### The Java `IO` APIs:
- Transfer data through a series of interconnected streams.
- Read information from various source - input direction.
- Write information to various destinations - output direction.
```java
Path file = Path.of("../employee.txt");
```
```java
Files.lines (readme, Charset.forName("UTF-8))
      .forEach(line->System.out.println(line));
```

#### Java `Concurrency` API
- Take advantage of multi-CPU-core architecture.
- Execute code concurrently 同时进行的 to achieve better performance and user experience.
```java
Callable<BigDecimal> taxCalculation = new Callable<>() {
  public BigDecimal call() throws Exception {
    /* Perform concurrent calculations */
    return tax;
  }
}
ExecutorService es = Executors.newCachedThreadPool();
Future<BigDecimal> result = es.submit(taxCalculation); 
```

#### Java `Persistence` API
- Java Database Connectivity protocol (JDBC) enables database connectivity and SQL statement execution.
- Java Persistence API(JPA) enables Java object-relational mappings.
> Application logic -> JPA -> JDBC API -> Provider JDBC Driver -> Native database protocol -> Database (any provider).   

### Java in the enterprise
- Java EE (enterprise edition).
- Implement web services with Java:
- Expose code to the enterprise for reuse in a controlled, standardised manner.
- JAXB, JAXP APIs enable XML object mappings, marshaling, and unmarshaling.
- JSONP API enables JSON object mappings, marshaling, and unmarshaling, (JSONP API实现了JSON对象的映射、编排和解编).
- JAX-WS API enables SOAP Service implementation, (any transport, XML).
- JAX-RS API enables REST Service implementation, (HTTP transport, XML, JSON, Plain Text).

#### Enterprise java
- Java EE Application Server (Weblogic):
- Web Container: Web front-end components.
- EJB(enterprise java bean) Container: business logic, back-end components.
- Hosts Java EE Applications.
- Provides Enterprise Java bean anf web containers.
- Provides security, Concurrency, Transaction management and so on.
- Oracle Cloud Infrastructure(OCI), support all kinds of Developer tools, language and Frameworks, Cloud native, data magagement, DevOps, ect.
