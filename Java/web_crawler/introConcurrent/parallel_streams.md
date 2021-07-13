## Parallel Streams
- Parallel streams are a way to execute stream pipelines in parallel, on multiple threads.
- They can often be a quick way to add parallelism to existing, sequential stream pipeline.
- Code without:
```java
Map<Year, Long> graduatingClassSizes = studentList
    .stream()
    .collect(Collectors.groupingBy(
        Student::getGraduationYear, Collectors.counting());
```
- Code with:
```java
Map<Year, Long> graduatingClassSizes = studentList
    .parallelStream()
    .collect(Collectors.groupingByConcurrent(
        Student::getGraduationYear, Collectors.counting());
```
> Notice: not all collectors support concurrency.   

#### Using Parallel Streams with Thread Pools
- By default, parallel streams run threads in the default `ForkJoinPool.commonPool()`. You can circumvent规避 that default by wrapping the stream computation in a `Callable` and submitting it to a `ForkJoinPool` explicitly:
```java
ForkJoinPool pool = new ForkJoinPool();
Future<Map<Year, Long>> graduatingClassSizes = pool.submit(() ->
    studentList.parallelStream()
    .collect(Collectors.groupingByConcurrent(
        Student::getGraduationYear, Collectors.counting()));
```
> This can come in handy if you want finer control over the parallelism, or if you want to separate your parallel stream computations into different thread pools.   
