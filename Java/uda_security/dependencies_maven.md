## Introduction to Maven
### Maven Phases
- Maven organizes the build process into phases. Each phase represents a different step of the build lifecycle.
- The phases are:
  - `validate`: Validates the project.
  - `compile`: Compiles the source code.
  - `test`: Runs the tests.
  - `package`: Creates the final product.
  - `install`: Installs the final product.
  - `deploy`: Deploys the final product.
- Executing a phase in maven will run all the preceding phases in order. When Maven reaches each phase, it will process all the goals attached to that phase, ex, Running the `Compile` phase will execute `Validate` first.
- POM: project object model.

### Pom.xml
- modelVersion: The format of the current pom. Should always be 4.0.0 at this time.
- groupId: The group identifier for your project. Can be shared with other projects.
- artifactId: The specific identifier for this project. Combination of artifactId and groupId uniquely identifies your project.
- version: An arbitrary additional identifier indicating which version of your artifact you're on. By incrementing this, you can use can use Maven to keep track of different versions of your project.

### Creating a New Maven Project
- `mvn archetype:generate`.
- Press enter to accept the default template, which is the maven quickstart project.
- Press enter again to accept the newest version of the quickstart template.
- Fill in the required elements of a minimal pom:
  - Define value for property 'groupId': com.lili.jpnd
  - Define value for property 'artifactId': mvntest
  - Define value for property 'version' 1.0-SNAPSHOT: :
  - Define value for property 'package' com.lili.jpnd: :
- `cd mvntest`.
- `mvn package`
- Now you got a jar file, project build.
> Little tip if you like doing things by hand: one way to quickly create the directories referenced by the Standard Directory Layout manually is by running `mkdir -p src/{main,test}/{java,resources}`.

### Maven Project Structure
- src:
  - main: Contains source code and resources related to your project.
  - test: Contains source code and resources for testing your project.
- java: Both Java folders hold your `.java` source files.

- resources: Contains non-java files related to running and building your project. Commonly holds properties files.

- filters: Contains resource filter files that Maven will use when filtering resources.

### Importing Dependencies
- Go to the website to find the latest version of the dependency: ex, for JUnit, go to [JUnit5](https://junit.org/junit5/).
- Click the newest version tag, find GroupId and ArtifactId, version is not required, but it is recommended.

#### Dependency Scope
- The scope element of a dependency tells Maven when to include that dependency: compile, test, runtime, provided, import, etc.
- This example tells Maven to only include the JUnit dependency during test phases.
- ```java
<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

#### Dependency Type
- The type element tells Maven what type of artifact is provided by a dependency: jar, war, ear, rar, etc.
- Ex, `<type>jar</type>`.

### Pom Inheritance
- Run `mvn archetype:generate`, create `maven-test-parent` project with groupId `com.lili.jpnd`.
- Run `cd maven-test-parent`, run `mvn archetype:generate` again, create `B` project with groupId `com.lili.jpnd`.
- Run `mvn archetype:generate` again, create `C` project with groupId `com.lili.jpnd`.
- Run `mvn package`, see after `maven-test-parent` been built, `B` and `C` also built.

### Maven Plugins
> "Maven is -at its heart- a plugin execution framework; all work is done by plugins." - Apache Maven Documentation.   
- Plugin Management vs. Plugins: You can customize the versions of these plugins in the `<pluginManagement>` element of the build. Changes in that area will affect all children projects as well. If you wish to customize a plugin for this project only, place those changes in the `<plugins>` element instead.

### Learn how to use Maven plugins
#### Customizing Plugin Execution
- Copy [Maven assembly plugin](https://maven.apache.org/plugins/maven-assembly-plugin/usage.html) to `pom.xml` in `B` module, in `<build>` tag.
- Run `mvn package`, after adding below into `<configuration>`:
```xml
<archive>
  <manifest>
    <mainClass>
    <!-- Find the entry point (main) first -->
      cim.lili.jpng.App 
    </mainClass>
  </manifest>
</archive>
```
- Go to `target`, run `java -jar B-1.0-SNAPSHOT-jar-with-dependencies.jar`, see "Hello World!" printed.
- Try `source` and `javadoc` plugins, use them with `package` phase, and `jar-no-fork` or `jar` goal. 
- Find more plugins and try to use them: [Maven Plugins](https://maven.apache.org/plugins/index.html).

### Maven Properties
- Creating Properties:
```xml
<properties>
  <some.plugin.version>2.0</some.plugin.version>
<properties>
```
- Using Properties:
```xml
<plugin>
  <groupId>my.group</groupId>
  <artifactId>some-plugin</artifactId>
  <version>${some.plugin.version}</version>
</plugin>
```

#### Automatic Properties
- **Environment variables**: any variables in the shell's environment can be referenced with `${env.VAR_NAME}`,, for example `${env.PATH}`.
- **POM elements**: Properties in the pom can be referenced according to their place in the object structure.  For example, if I wanted to reference the `<project><groupId>value</groupId></project>`, I could use `$- {project.groupId}`.
- **Settings.xml**: Users can provide customizations to their maven profile in a file called `settings.xml`. These - variables can be referenced with `${settings.propName}`.
- **Java System properties**: Anything provided by `java.lang.System.getProperties()` can be accessed using `${java.propName}`.

#### How to customize javadoc to add to report
- Copy from [Maven Javadoc Plugin](https://maven.apache.org/plugins/maven-javadoc-plugin/usage.html) the code.
- Add to a `<reporting>` tag.
