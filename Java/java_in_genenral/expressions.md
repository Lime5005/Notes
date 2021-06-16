### `System.out::println`:
- It's called a "method reference" and it's a syntactic sugar for expressions like this:
- `numbers.forEach(x -> System.out.println(x));`

### Static reference
```java
// A Singleton class, also called as a "static reference"
public static CustomerService getInstance() {
    if (customerService == null) {
        customerService = new CustomerService();
    }
    return customerService;
}
```
