## JUnit
### Types of Assertions
- `assertEquals(expected, actual)` / `assertNotEquals` - Fails if the expected an actual - values don't match. Available for all primitive data types, as well as Object.
- `assertArrayEquals(expected, actual)` - Fails if any element of the two arrays are not equal. Available for all primitive arrays as well as Object[].
- `assertIterableEquals(expected, actual)` - Like ArrayEquals, but for Iterable collections
- `assertTrue(condition)` / `assertFalse` - Fails if condition doesn't match what method - expects.
- `assertNull(object)` / `assertNotNull` - Fails if object null status does not match what method expects.
- `assertThrows(Class exceptionType, executable)` / `assertDoesNotThrow` - Runs the - executable and fails if the provided exception type is not thrown
- `assertAll(Executable... executables)` - Runs all the executables and fails if any of the - executables fail
- `fail` - Always fails

- How to use `assertAll`:
```java
@Test
public void getCat_returnsBeigeSonicAge10(){
   Cat cat = catTest.getCat();
   assertAll("This Message Will Print In The Test Report",
           () -> assertEquals("Sonic", cat.getName()),
           () -> assertEquals(Color.BEIGE, cat.getColor()),
           () -> assertEquals(10, cat.getAge())
           // This test will indicate all properties that do not match.
   );
}
```
### Parameterized
```java
@ParameterizedTest
@ValueSource(ints = {1, 5, 100, 1000, 100000})
public void addTwoNumbers_addSix_returnsNumberPlusSix(int number) {
    int input1 = 6;
    int expected = number + 6;
    App app = new App();
    Assertions.assertEquals(expected, app.addTwoNumbers(number, input1));
}
```
### CsvSource
```java
@ParameterizedTest(name = "[{index}] {0} + {1} = {2}")
@DisplayName("Add 6 to normal numbers \uD83D\uDC04")
@CsvSource({
        "6, 5, 11",
        "6, 1, 7",
        "6, 100, 106",
        "6, 1000, 1006",
        "6, 100000, 100006"
})
public void addTwoNumbers_addSix_returnsNumberPlusSix(int input1, int input2, int expected) {
    App app = new App();
    Assertions.assertEquals(expected, app.addTwoNumbers(input1, input2));
}
```

### MethodSource
```java
@MethodSource("fancyArgumentProvider")
```
- Then:
```java
private static Stream<Arguments> fancyArgumentProvider() {
    return Stream.of(
            Arguments.of(6, 5, 11),
            Arguments.of(6, 1, 7)
    );
}
```


### EnumSource
```java
enum SomeNumber {
    ONE(1), FIVE(5), ONE_HUNDRED(100);
    int number;
    SomeNumber(int number) { this.number = number; }
    public int getNumber() { return this.number;}
}

@ParameterizedTest
@EnumSource(SomeNumber.class)
public void addTwoNumbers_addSixEnum_returnsValuePlusSix(SomeNumber num) {
    App app = new App();
    int expected = switch(num) {
        case ONE -> 7;
        case FIVE -> 11;
        case ONE_HUNDRED -> 106;
        default -> 0;
    };
    Assertions.assertEquals(expected, app.addTwoNumbers(6, num.getNumber()));
}
```

### Repeated Test Annotation
```java
@RepeatedTest(10)
public void addTwoNumbers_addSix_returnsValuePlusSix(RepetitionInfo repetitionInfo) {
    int input1 = repetitionInfo.getCurrentRepetition();
    int input2 = 6;
    int expected = 6 + input1;
    App app = new App();
    Assertions.assertEquals(expected, app.addTwoNumbers(input1, input2));
}
```
- You might use `@RepeatedTest` to:
- Verify actions can be executed multiple times with the same result.
- Identify infrequent errors.
- Informal performance evaluation.

### JUnit Lifecycle Stages
- `@BeforeAll`: ex, establishing a Database Connection.
- `@BeforeEach`: ex, initializing the Class Under Test.
- `@AfterEach`:ex, deleting Files Created By a Test.
- `@AfterAll`: ex, closing a Database Connection.

### Types of Test Doubles
> A test double is any kind of object that acts as a stand-in for an expected dependency in order to facilitate testing.   
> Benifits: Verify the behavior of the tested class without relying on its dependencies performing paticular actions, ex: A class depends on B class's return value, we use doubles to imitate B's behavior.
- Dummy: A class that doesn't actually do anything, but fills a required parameter of some method: just for testing.
```java
public class DummySalesService implements SalesService {
   @Override
   public String fizzBuzz(int i) {
   }
}
```

- Stub: A simple class that always returns a hard-coded value: not flexible, but ex, test a hard-coded response.
```java
public class StubSalesService implements SalesService {
   @Override
   public String fizzBuzz(int i) {
       return "Buzz"; // Always returns Buzz.
   }
}
```

- Fake: A test double that allows you to customize the response to imitate actual functionality: more flexible, ex, test a response that is based on a user-supplied input.
```java
public class FakeSalesService implements SalesService {
   private String returnValue;
   public FakeSalesService(String returnValue) {
       this.returnValue = returnValue;
   }
   @Override
   public String fizzBuzz(int i) {
       return returnValue;
   }
}
```
 
- Spy: A test double that can keep track of which methods were called. Sometimes they can also track what parameters were used or how often the methods were called: ex, check if a servive class has written to database a data trough some dependencies.
```java
public class SpySalesService implements SalesService {
   // Tracks number of calls and the parameters used:
   private int numFizzBuzzCalled; 
   private List<Integer> parameters = new ArrayList<>(); 
   @Override
   public String fizzBuzz(int i) {
       numFizzBuzzCalled++;
       parameters.add(i);
       return null;
   }
   public int getNumFizzBuzzCalled() { return numFizzBuzzCalled; }
   public List<Integer> getParameters() { return parameters; }
}
```


- Mock: A generic term for test doubles, or more specifically, a test double that can prepare specific responses for different kinds of input.
```java
public class MockSalesService implements SaleService {
  // Stores responses for inputs:
  private Map<Integer, String> returnValue = new HashMap<>();
  @OVerride
  public String fizzBuzz(int i) {
    return returnValue.getOrDefault(i, null);
  }
  public void setReturnForInput(int i, String s) {
    returnValue.put(i, s);// Allows you to tell it which string to return for each input value.
  }
}
```

## Mockito
- Mockito is a framework that can automatically generate mock objects.
- A **Mockito Mock** is an object that can programmatically implement any behavior from any of the test doubles we learned earlier. Mockito Mocks can be spies, dummies, stubs, or mocks.
- A **Mockito Spy** can do everything a Mock can do, but it also inherits the behavior of the class it extends. Sometimes this construct is referred to as a partial mock, because it's part mock, part original class. Usually been used when you need to verify that a certain method is called on the tested class.

### Mocking Variable Input
```java
when(salesService.fizzBuzz(1)).thenReturn(input);
```
### Types of ArgumentMatchers
#### Type Matchers:
- Primitives: anyInt(), anyFloat(), anyBoolean(), etc.
- Objects: any(), any(Class)
- Collections: anyCollection(), anyIterable(), anyList(), anyMap(), anySet()
#### Value Matchers:
- Primitives: eq(val)
- Objects: eq(obj), same(obj), refEq(obj)


### Verify Methods Called
> `Mockito.when` allows us to override the behavior of methods, but we need a different tool to tell if a method was called. That tool is `verify`.   
> If we had a method that saved results to a database, we might want to write a test to check if that method saved the correct values. Testing the full interaction between a service and a database is no longer in the scope of a unit test, however, so what we will do instead is check if the method to save the results was called.   
- Verify with ArgumentMatchers:
```java
//checks that any string is saved for the current integer
verify(salesRepository).saveResults(i, anyString());
```
- Verify the Number of Interactions:
```java
//fail if saveResults not called exactly 2 times
verify(salesRepository, times(2)).saveResults(i, anyString());

//fail if saveResults called more than 10 times
verify(salesRepository, atMost(10)).saveResults(i, anyString());

//fail if saveResults not called 3 or more times
verify(salesRepository, atLeast(3)).saveResults(i, anyString());
```
- Verify Order of Interactions:
```java
//fail if delete and saveResults are not called in order
InOrder inOrder = Mockito.inOrder(salesRepository);
inOrder.verify(salesRepository).delete(i);
inOrder.verify(salesRepository).saveResults(i, result);
```

## CI/CD - Continous Integration / Continuous Delivery
- **Continuous Integration** refers to the process of automatically running unit tests any time your code changes. It usually is performed by a service that monitors the state of your repository and runs all your unit tests whenever you commit new changes.

- **Continuous Delivery** is a process that follows CI and involves creating deployable build artifacts every time the project changes.

- **Containerization** means creating a self-contained environment with known parameters to build and run your application.

- **Docker** is an application that provides a container format and an engine that can run those containers.

