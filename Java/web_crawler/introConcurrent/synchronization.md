## Synchronization
- Case: A voting app, each audience will vote with their threads to the performers.
- How to update the votes and get the winner?
```java
Map<String, Integer> votes = new HashMap<>(); // name, votes_received_now
// code to handle an audience vote:
votes.computeIfPresent("Name",(k, v) -> v + 1);
// If thread-1 read the v as 45, and write as 46, at the same time thread-2 read and write, then v from thread 2 is not counted. 
```
> If all the threads are just reading the shared resource, that's usually okay without synchronization. This is sometimes called read-only access to the shared resource.   
> On the other hand, if one or both of the threads is updating, or writing to, the shared resource, synchronization may be required!   
- Do we need synchronization when two threads commiting a transaction to a database at the same time?
> NO, any database worth its salt will not allow conflicting commits to both succeed.

### Ways to Synchronize
- Synchronized collection wrappers:
```java
Map<String, Integer> votes = Collections.synchronizedMap(new HashMap<>());
// 捆绑每个线程的读写
//With Collections.synchronizedMap() only one thread at a time is allowed to access the map, no matter how those threads are using the map.
```
- Data structures and tools in the `java.util.concurrent` package that are specifically designed for concurrent access: 
```java
Map<String, Integer> votes = new ConcurrentHashMap<>(); // 读写结合
//consider when two threads try to add entries to the map at the same time. Under the right circumstances `ConcurrentHashMap` may determine that the writes are non-conflicting, and will allow them both to happen at the same time.
```
> ConcurrentHashMap has low-level optimizations that make it ideal for multi-threaded access.

### What are Atomic Operations?
- An atomic operation is an operation that is executed as a **single step**, and cannot be split into smaller steps.
- Ex, the code below about `HashSet`, what kind of operations can be atomic?
```java
Set<String> set = Collections.synchronizedSet(new HashSet<>());
```
> Check [java.util.HashSet<E>](https://docs.oracle.com/javase/7/docs/api/java/util/HashSet.html), and you will see methods like `	add(E e)` or `contains(Object o)` or `	size()` can be atomic.


### The `synchronized` Keyword
```java
    private final Map<String, Integer> votes = new HashMap<>();

    public void castVote(String performer) {
        synchronized (this) {
            Integer count = votes.get(performer);
            if (count == null) {
                votes.put(performer, 1);
            } else {
                votes.put(performer, count + 1);
            }
        }
    }
    // Above is the same as below:
//    public synchronized void castVote(){}
```
#### Lock Objects
- The thing in parentheses after the `synchronized` keyword is the lock object. When a thread enters the code block, it takes ownership of the lock. Only one thread at a time can own the lock at a time, so only one thread is allowed to be executing code inside the synchronized block at a given time.
- Any object can be used as the lock.
```java
private final Object lock = "SpecialLock";
public void castVote(String performer) {
    synchronized (lock) {
      ...
    }
  }
}
```
- Sometimes, you may want to take ownership of the lock in one method, and release ownership of the lock in another method.
- For these kinds of situations, Java provides the `ReentrantLock` class.
```java
public final class VotingApp {
  private final Map<String, Integer> votes = new HashMap<>();|
  private final Lock lock = new ReentrantLock();
  public void castVote(String performer) {
    lock.lock();
    try {
      votes.compute(
        performer, (k, v) -> (v == null) ? 1 : v + 1);
    } finally {
      lock.unlock();
    }
  }
}
```
- It contains other kinds of specialty locks, such as `ReadWriteLock`. This can be useful when you have some threads that only need to read a shared resource, but other threads need to modify the resource.

#### Semamphores
- The Semaphore class can help when you need to allow more than one thread at a time within a guarded block of code.
- `Semaphore semaphore = new Semaphore(4);`.
```java
try {
  semaphore.acquire();
  // Up to 4 threads can be executing here in parallel!
  // ...
} finally {
  // Give another thread a turn.
  semaphore.release();
}
```
- See details[java.util.concurrent.Semaphore](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/concurrent/Semaphore.html).
