## Benefits of Thread Pools
- Limits the number of threads used by the program, and prevents the number of threads from growing in an unbounded manner. 放缓客户端请求queue, 防止内存不够，或者爬虫变慢。
- Reuses worker threads, which reduces the time and memory spent creating new threads.

### Executors API: 3 ways to create thread pools
```java
// Method 1: Thread pool with only one thread. 测试时，或者为保证没有多线程时。
ExecutorService pool = Executors.newSingleThreadExecutor();
// Method 2: Thread pool that reuses threads but has no limit on number of threads.
// 任务来了，有空的线程就用空的，如果没有就建立新线程。
ExecutorService pool = Executors.newCachedThreadPool(); // risk
// Method 3: Reuses threads and limite the number of threads to n. 重复利用有限数量的线程。
ExecutorService pool = Executors.newFixedThreadPool(n);
```
> Threads are a limited resource, and they should be cleaned up proactively similarly to how you should close files when you are done with them.   
> 单个线程可能会没有时间完成任务，而不停的被转换，叫做：thrashing.   


### Submitting Asynchronous Work
- Thread pools have several methods that let you submit work to be executed asynchronously:
```java
// Submits a Runnable with no return value, and returns a Future.
Future<?> print = pool.submit(() -> System.out.println("foo"));
// Submits a Runnable and returns void.
pool.execute(() -> System.out.println("foo"));
// Submits an implementation of Callable interface, return value will be accessible via the Future.
Future<Path> pathFuture = pool.submit(() -> downloadFile());
```
- A future is a reference to the result of an asynchronous computation.
- Future is a generic class.
- `thread.join()` wait for the first thread to complete.
- Call `Future.get()`, it waits for 异步工作完成，系统会停下来等待它完成，（所以先start()所有需要平行完成的任务再叫get()）。如果有结果，会得到。
> Java uses the Future class to represent this concept.    
> If the asynchronous computation is done, calling the `get()` method will return the result of the computation. If the computation is not done, calling `get()` will cause the program to stop and wait for the computation to finish.     
> How to access thread pool? How to wait the access?   
```java
print.get(); // waits for the work to complete.
Path path = pathFuture.get();
// No future:
pool.execute(() -> System.out.println("foo"));
// How to wait for no Future condition: use a CountDownLatch
CountDownLatch latch = new CountDownLatch(1); // the number of async tasks need to wait.
pool.execute(() -> {
  System.out.print("foo");
  latch.countDown();
});
latch.wait(); // waits for the count to become zero.
```
> `Future`s are parameterized. Calling the `get()` method of a `Future<Map>` will return a `Map`. Or, if the result is a `List`, calling `get()` on a `Future<List>` will return a `List` result, and so on.   

#### What is the maximum number of threads that this code can possibly run in parallel?
```java
ExecutorService pool = Executors.newFixedThreadPool(12);
Future<?> a = pool.submit(() -> System.out.println("a"));
Future<?> b = pool.submit(() -> System.out.println("b"));
a.get();
Future<?> c = pool.submit(() -> System.out.println("c"));
```
> Since `a.get();`, `a` will wait for the others to finish first, so max 2 threads `b` and `c` run in parallel.   
> This process of waiting for asynchronous work is called joining; That's why the Thread class has a method called `join()`.   
> See details: [java.util.concurrent.CountDownLatch](https://api.ichochy.com/) or [oracle_doc](https://docs.oracle.com/javase/10/docs/api/java/util/concurrent/CountDownLatch.html), and [java.util.concurrent.Future<V>](https://docs.oracle.com/javase/10/docs/api/java/util/concurrent/Future.html).   

## ForkJoin Pools
- `ForkJoinPool` is a specialized kind of thread pool that has the following advantages over traditional thread pools:
> It uses a technique called **work stealing** so that idle worker threads can find work to do.   
> Its API is optimized for asynchronous work called **recursive work**.   

### `ForkJoinTask`s
- The `ForkJoinPool` API is optimized for recursive work, which is work that creates other work.
- When you create work to submit to a `ForkJoinPool`, you usually do so by subclassing either `RecursiveTask` or `RecursiveAction`.
- When you are implementing the `compute()` method of a `RecursiveAction` or `RecursiveTask`, you can submit more work to the thread pool by calling the `invoke()` method, or one of its many variants.
