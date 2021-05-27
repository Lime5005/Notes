## Common class types provided by the Java API
- Exceptions, which help us handle errors.
- Enums, which help us set variables from a list of predefined values.
- Dates and Calendar, which help us store and retrieve dates.
- Regular Expressions (RegEx) which help us look for string patterns.
- Advanced String features, which will help us manipulate and process strings more efficiently.

### Exceptions
- The Error class is used to indicate a serious problem that the application should not try to handle.
- The Exception class is used when there is a less catastrophic event that the application should try to handle.
- The Throwable Class
> Both Error and Exception classes inherit from the abstract class throwable: both contain: the type of problem, the problem message, the stack trace where the exception occurred.   
- Checked vs Unchecked Exceptions:  
> Checked exceptions will get caught at compile time and will not allow the code to build until they are either in a catch block or thrown. Unchecked (or runtime) exceptions are not checked by the compiler.     
- Exception handler involves three main components: try, catch, finally.   
- A catch block is an exception handler that handles one specific type of Exception.   

### Enums
- Constant variables
> To have pre-defined choices, concise and powerful.    

### Scanner class
- It parses primitive types and String types into tokens.
- By default it uses whitespaces to delimitate each word; However, it can also use regular expressions.
- The Scanner class can read from several different types of sources, like strings, files and `System.in` (to get input from the command line).
- `Scanner scanner = new Scanner(System.in)`: read the user input.
```java
Scanner scanner = new Scanner("This is a line");
System.out.println(scanner.nextLine()); // Read the entier string
System.out.println(scanner.next()); // Read only the first word
```
* By default the Scanner tokenizes input by whitespaces.
> Java has also other classes like: `BufferedReader`, and `Console`, read user input from command line.

### Date and Calendar classes
- A date class is a concrete class, represents only a specific day and time.
- A calendar class is an abstract class, represents a specific day and time and provides transformation methods to set a specific Day, Month, and Year.
> Java has also class `LocalDate`, see details [local_date_doc](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html).   
> Use `SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");` to change the format.   

### Regex
- `^` caret, means start.
- `(.+)`, means any characters one to many times.
- `$`, means the end.
- `private String emailRegex = "^(.+)@(.+).com$";`.
> See details [java_regex_doc](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html).   
> Try pattern: [try_regex_explain](https://regexr.com/).   
- Use `Pattern` and `Matcher` to check if the input data matches the regex.
```java
String emailRegex = "^(.+)@(.+).(.+)$";
Pattern pattern = Pattern.compile(emailRegex);
Matcher matcher = pattern.matcher("jeff@example.com");
```

### String methods
- Memory management: String pool to store only one copy of a string.
- String are immutable, change a string, it's a new string in the memory.
- Multiple String objects can point to the same String reference.
- `charAt()`, examine characters in a string.
- `equalsIgnoreCase()`, compare two strings and ignore case sensitivity.
- `contains()`, check if contains a substring.
- `split()`, create substrings and store them in an array based of a regex or sentinel value that we want to split on.
- `substring(begin_include, end_not_include)`, create substring.
- `replace(target, replacement)`, replace a value and returns a new string.
> In java, a variable' value is changed, but the old value is still in memory, and can be used by new variables.
