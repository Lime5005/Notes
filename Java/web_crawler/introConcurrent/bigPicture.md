## Sequential vs Concurrent vs Parallel
> The difference between these kinds of programs lies in how and when the program works on tasks. A task in this context is any unit of work, such as processing a user request.

- Sequential programs can only work on one task at a time,（洗衣机运行时你在一旁等待它的结束， 以便下次的运行）。
- Concurrent programs can have multiple tasks in progress at the same time, （洗衣机运行时，你一边等待，一边在叠已经洗好的衣服）。
- Parallel programs can actively be working on multiple tasks at the same time, （你买了另一台洗衣机，两台机器一起运行）。

### Why Do We Use Concurrency and Parallelism?
- Allows programs to get more work done in the same amount of time.
- Divides a problem into smaller subproblems, and solves each subproblem in parallel.
