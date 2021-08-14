### Rules of TDD
1, Test the expected outcome of an example.
2, Don't pre-judge design, let your tests drive the design.
3, Write the minimum code required to get your tests to pass.
4, Each test should validate one single piece of logic.
5, Test business logic, not methods.
6, A test must be consistent and repeatable, same result any time.

### What is a "good" or "bad" test?
- A new test will initially fail.
- We work to get the test to pass.
- We finally optimise our code and tests.

### What tests should I write?
- Waht should the logic be?
- What is the opposite of the logic?
- Are there any edge cases? ex, a string ends with an X should be valid also?
- Are there any error conditions?

### Mockito methods
- MyClass myClass = mock(MyClass.class);
- when(myClass.myMethod(params)).thenReturn(self-defined-value);
- verify(myClass, times(?)).myMethod(params);
- times(?) = times(1)/atLeast(2)/atMost(7)/never()/between(2,7), default = times(1)
- params = "abc"/anyString()/anyInt()/anyObject()/anyVarargs()/any(myClass.class)

### Stubs, Mocks and Fakes
- Fake: For no tests, use mock() in Mockito.
- Stub: For test data, use mock(), when().thenReturn() in Mockito.
- Mock: For test behavior, use mock(), verify().myMethod() in Mockito.
