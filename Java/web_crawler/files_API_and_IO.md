### Files and Path APIs
- Java's Swiss Army knife for working with files:
- Files.exists(Path)/.size(Path)/.delete(Path)/.isDirectory(Path)/.copy(Path, Path).
- Files.move(Path, Path)/.readString(Path)/.readAllBytes(Path)/.writeString(Path, String)/.write(Path, byte[]).

#### Path API
- `Path p = Path.of("your/path/here");`
> Absolute paths start with a forward-slash (/) (known as the root directory on Mac and Linux), or a drive name on Windows.   
> Relative paths are only meaningful relative to some other starting point. They do not start with a forward slash or drive name, ex, `../home/../home/local/bin`.   
```java
Path p = Path.of(".");
        System.out.println("p.toAbsolutePath().normalize().toUri() = " + p.toAbsolutePath().normalize().toUri());
```
> See details: [java_Files_API](https://docs.oracle.com/javase/10/docs/api/java/nio/file/Files.html).   
> And [java_Path_API](https://docs.oracle.com/javase/10/docs/api/java/nio/file/Path.html).   
> And [java_StandardOpenOption](https://docs.oracle.com/javase/10/docs/api/java/nio/file/StandardOpenOption.html).   


### Input & Output streams
- Raw data -> Input/Output streams(work with bytes) -> Readers/Writers(work with Text Characters) -> Buffered Readers/Writers.
> How many bytes of data can be read from a single call to the `InputStream.read(..)` method?   
> As much as you defined, the maximum number of bytes read depends on the size of the byte array that you pass in, ex, 
```java
byte[] data = new byte[10];
// -1 is the end of the stream
while (in.read(data) != -1) {
        out.write(data);
}*/
```
> See details: [java_InputStream](https://docs.oracle.com/javase/10/docs/api/java/io/InputStream.html).   


### Readers and Writers
- Readers and Writers are the next level of abstraction built on top of input and output streams, these interfaces read and write text characters.
- `in.transferTo(out);`.
> See datails: [java_Reader_doc](https://docs.oracle.com/javase/10/docs/api/java/io/Reader.html).

#### File Encodings
- 1 byte = 8 bits = 1 character, HTML uses UTF-8.
> A character encoding is a way to convert between binary data and human-readable text characters in a character set.   
> Unicode is the most common character set, and it can represent 143,859 characters and symbols in many different languages.   
> There's also a character set called ASCII(English characters).      
- Using `StandardCharsets.UTF_8` and `StandardCharsets.UTF_16` to write "Hello there", took 11 bytes and 24 bytes respectively.
- Using `StandardCharsets.UTF_8` and `StandardCharsets.UTF_16` to write "你好" took both 6 bytes.

### Buffered Reader and Writer
- Why ?
> Buffered streams reduce the number of I/O operations performed by your program.    
> This can significantly shrink the amount of time your program spends doing I/O!     
- `reader.readLine()`, `writer.flush()`.
> 清空缓冲区被称为刷新。你可以通过调用flush()方法强迫它立即发生。如果你正在写一个文件，刷新缓冲区将把它的内容写到文件中，这样任何改变都是可见的。   
> See details: [java_bufferedReader_doc](https://docs.oracle.com/javase/10/docs/api/java/io/BufferedReader.html).   

### Path Path.of
- `static Path of​(String first, String... more)`.
> Parameters:   
> first - the path string or initial part of the path string.   
> more - additional strings to be joined to form the path string.   
> Returns: the resulting Path.   
- Ex, `Path output = Path.of(outputFolder.toString(), getOutputFileName(shardNum));`

#### Preventing Resource leaks
- Why ?
- Leaving files open wastes memory and other system resources.
- Most operating systems limit the number of files that can be open at one time, so, when you leave a file open after you're done using it, you're potentially depriving programs of the ability to open other files in the future.
- If you are using a buffered writer and forget to close it, the buffered writes might never actually be written to disk.
- Using `try-catch-finally` or `try-with-resources` to prevent the leak.
```java
try (Writer writer = Files.newBufferedWriter(Path.of("test"))) {
  writer.write("Hello, world!");
} catch (IOException e) {
  e.printStackTrace();
}
```
> Resources initialized in this way are guaranteed to be closed after the `try` block finishes executing.     
- Only `Closeable` or `AutoCloseable` objects can be used in the `try` statement.
- `Closeable` interface has been implemented to most of the I/O classes like: `Stream`, `Reader`, `Writer`, `InputStream`, and `OuptutStream`, whose `close()` method can throw an `IOException`.
> See All Known Implementing Classes: [java_AutoCloseable_doc](https://docs.oracle.com/javase/10/docs/api/java/lang/AutoCloseable.html), or [java_tryResourceClose_example](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html).   

#### Java Bean
- A data class that follows the naming convention (prefixed by "get" and "set", followed by the name of the property) is called a Java Bean.

#### Java Object Serialization
- What is Serialization?
- Serialization is the process of converting an object into a data format that can later be deserialized back into the original object.
- What can we serialized into: Bytes, Json, XML.
- Why ?
- To save its contents to file.
- To send it over a network.