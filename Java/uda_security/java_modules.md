## Introduction to Modules
### Project Jigsaw
> Our dependency examples have been simple, but libraries that use other libraries eventually create a very complex dependency chain. Project Jigsaw was the effort to declare dependency relationships in a way that would allow Java to recognize library dependencies and control package-level visibility based on those dependencies. Eventually, the changes implemented by Project Jigsaw were merged into Java 9 and became the Module system.   
> Benefits of controlling package visibility and dependency relationship at compile time:    
- Easier for developers to maintain libraries and large applications.
- Improve the security of the JDK by limiting which packages were exposed.
- Improve application performance by reducing the size and surface area of java components.
- Enable the JDK to better scale for use in small devices and cloud deployments.

### Modules as Organizational Strategy
- Java organizes classes using the concept of Packages. Packages contain classes and class visibility depends on which package references them.
- Modules perform a similar role for organizing packages. Each module contains packages, and package visibility depends on which module references them.
- A Module is still a JAR. Modules are just like normal jars, in that they contain classes in packages and use a `MANIFEST.MF` to declare class metadata.
- Module Descriptor: A Java class that provides information about the module. It is stored in a class called `module-info.java` and compiles into a class file called `module-info.class`.

### `module-info.java`
```java
module com.udacity.jpnd.module1 {
    exports com.udacity.jpnd.module1.somepackage;
    requires com.udacity.jpnd.module2;
}

module com.udacity.jpnd.module1 {
    exports com.udacity.jpnd.publicpackage;
    exports com.udacity.jpnd.internalpackage to com.udacity.jpnd.module3;
    opens com.udacity.jpnd.internalpackage to com.udacity.jpnd.module3;
    requires transitive com.udacity.jpnd.module2;
}

module module1  {
    exports module1.somepackage;
    provides module1.somepackage.MyInterface with module1.somepackage.MyInterfaceImpl;
}

module module2 {
    requires module1;
    uses module1.somepackage.MyInterface;
}
```

### Module Access
- Automatic modules can access everything in the unnamed module. Maven places transitive dependencies on the classpath, so they become part of the unnamed module. The direct dependencies are placed on the modulepath and become automatic modules. This allows your module to access the direct dependencies, but not the transitive dependencies.
- `exports` = public
- `opens` = expose
- `requires` = import

### Java Linker
- JLink is a tool that allows us to create a custom Java Runtime Environment containing the minimal components necessary to run a specific Java module. 
- Create a jar using: `mvn clean package`.
- Analyze dependencies: `jdeps Example.jar`.
- Create a custom JRE to run this jar: `jlink --module-path "$JAVA_HOME/jmods" --module-path target/classes --add-modules com.udacity.gcd --output tinyJRE`.
- Check the size of this image: `du -sh tinyJRE`.
- Try running the jar with the custom image: `tinyJRE/bin/java -jar target/gcd-1.0-SNAPSHOT.jar`.
- If your program has additional dependencies, you can use jdeps to determine whether you need to manually include additional packages in your jar.
- To run JLink, we must put all the required modules on the modulepath.

### Common Problems
- If your non-modular dependencies reference transitive dependencies that are modular, those dependencies will become modules and be inaccessible to your module unless you explicitely `require` them.

#### Reflection Access to Non-Modules
- You cannot open your module to the Unnamed Module. If a transitive dependency requires reflection access to your module, it will be unable to access that package unless you fully open the package to everyone.
- This occurs in some Test frameworks that use reflection libraries as transitive dependencies. One solution for this case is to limit the scope in which you open your package by only opening the module during the execution of the testing plugin.
```xml
<plugin>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>3.0.0-M5</version>
  <configuration>
    <argLine>
      --add-opens com.udacity.jpnd.mymodule/com.udacity.jpnd.mypackage=ALL-UNNAMED
    </argLine>
  </configuration>
</plugin>
```

#### Libraries Removed from JDK
- Some libraries are not exposed by the core JDK as modules. If you relied on one of the JDK internal libraries in the `javax` or `com.sun` packages, you may encounter ClassNotFoundException trying to access those classes. You can check for these classes using: `jdeps -jdkinternals pathToClasses`.
