## Sets, Maps, Queues
- Queues: FIFO, first in first out, one execution a time. 保持顺序
- Maps: access an object without iterate over the whole list. 查找数据
- Sets: store data and avoid duplicate elements. 避免重复

### Maps
- Without Maps: Linear Lookup Time, iterate each element until we find the right one. 数据越多 耗时越长
- With Maps: Constant Lookup Time, key-value pairs, search value by key. 耗时固定
> The Java `Map` is an Interface that provides three different distinct views of the data: A list of the keys + A list of the values + A set of key-value mappings.   
- `Map<String, Person> mapOfPeople = new HashMap<String, Person>();`
- Using `put` to add in the map.

### Sets
- 3 Concrete implementations: 
- `HashSet`
- `Treeset`
- `LinkedHashSet`
> They are not interfaces or abstract classes, and they contain all of the code necessary per the interface.   
>  Unfortunately, the only way retrieve an object from a Set is to iterate over the Set looking for the object.
- Using `add` to add in the set.


### Queues
- [pop_off, put_new]
```java
Queue<String> myQueue = new LinkedList<String>();
myQueue.add("Hi");
myQueue.add("There");
// To retrieve one by one:
myQueue.poll();
```
- Using `add` to add in the queue.
