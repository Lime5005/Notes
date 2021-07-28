## Building Java Applications
### Java Archive Files (JAR)
- A **JAR** file is just a zip file full of java bytecode, in the form of a bunch of `.class` files. It also contains a directory called `META-INF`, which holds a file containing program metadata, called `MANIFEST.MF`.
### Web Archive Files (WAR)
- A **WAR** is designed to be deployed to a Java Web Application Server. It contains all the files necessary for the application server to host your web application.
### Android Package Files (APK)
- An **APK** another variation of a JAR that also contains a number of files that specifically describe how this application should run on Android.

### Running Java Applications
- Command line:`javac Test.java` will compile the `Test.java` file into a `.class` file, and also the `foo.java` that `Test.java` is depending on.   
- Command line: `jar -cfe Test.jar Test *.class`, `c` means create a new archive, `f` allows to name a jar file, `e` means the entry point into the app which will be our main class name, `Test.jar` for file name, `Test` for the entry point, `*.class` for specify which files to include into the jar.
- Command line: `java -jar Test.jar` will run the app.

### Read-Eval-Print Loop (REPL)
- CML `jshell`.
- Useful Commands: 
- /vars** **- Prints a list of all the variables you've declared.
- /types - Prints all the classes you've defined.
- /methods - Prints all the methods you've defined.
- /list - Prints all the source code you've entered.
- /exit - Closes JShell.
- /help - Prints all the commands you can use.

### jshell for jar files
- First close `jshell` if any jshell is open.
- `jshell --class-path validator.jar`
- Then import all dependencies: `import com.udacity.domain.*;`, `import com.udacity.validator.strategies.*;`.
- Then you can explore the methods inside: `new PhoneCheck().validateUser(new User("user@validemail.com","+1 708-868-9779"));`

## Java History
- Java 5(2004): Introduced initial, core java language features.
- Java 6(2006): Infrastructure support for more powerful frameworks.
- Java 7(2011): Imporvement of exception handling, and IO, ect.
- Java 8(2014): Added Lambda, Stream API, and funcional interfaces.
- Java 9(2017): Added modules, also named as Project Jigsaw.
- Java 10 & 11(2018): Java libraries, new HTTP client Object for submitting HTTP request, and also the `var` keyword.
- Java 12-15(2020): Improvement of compilers, similar to java 11.
- Java 11 has Long Term Support (LTS).
