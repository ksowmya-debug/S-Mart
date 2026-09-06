# SOWMYA.KCODE — COMPLETE DSA LEARNING BOOK
## Comprehensive Curriculum & Chapter-by-Chapter Blueprint
> **Book Title:** *DSA Demystified: The Beginner’s Step-by-Step Blueprint to Data Structures & Algorithms*  
> **Target Audience:** Complete DSA Beginners, College Students, Career Switchers, and Junior Developers  
> **Primary Programming Language:** Java (with clean, commented, beginner-friendly syntax)  
> **Teaching Philosophy:** *"Someone sitting right beside you, explaining the 'Why' before the 'How', with ASCII diagrams, memory layouts, dry-run tables, and zero gatekeeping."*

---

## 🗺️ Master Curriculum Overview

| Part | Module Title | Primary Learning Goal | Tiered Problems |
|---|---|---|---|
| **Part 0** | **Foundations & Mental Models** | How computer memory works, Big-O intuition, space vs. time | 3 Warmup |
| **Part 1** | **Arrays & Dynamic Arrays** | Contiguous memory, index arithmetic, two pointers, prefix sums | 9 Questions |
| **Part 2** | **Strings & Char Manipulation** | String pool, immutability, StringBuilder, frequency counting | 9 Questions |
| **Part 3** | **Searching Algorithms** | Linear search vs. Binary search space reduction, boundary conditions | 9 Questions |
| **Part 4** | **Sorting Algorithms** | Bubble, Selection, Insertion, Merge Sort, Quick Sort, Java internals | 9 Questions |
| **Part 5** | **Linked Lists** | Pointers/references in heap, Node chains, Fast & Slow runners, reversals | 9 Questions |
| **Part 6** | **Stacks** | LIFO cafeteria tray model, Call stack, Monotonic Stack pattern | 9 Questions |
| **Part 7** | **Queues & Deques** | FIFO grocery queue, Circular Queue, BFS connection, Sliding window max | 9 Questions |
| **Part 8** | **Hashing & Hash Maps** | Buckets, hash functions, collision chaining, O(1) lookups, Two Sum | 9 Questions |
| **Part 9** | **Recursion & Backtracking** | Base cases, recursive call stack frames, choose-explore-unchoose pattern | 9 Questions |
| **Part 10**| **Trees & Binary Search Trees**| Hierarchies, DFS traversals (Pre/In/Post), BFS level-order, BST properties | 9 Questions |
| **Part 11**| **Heaps & Priority Queues** | Array-based complete binary trees, Min/Max heaps, Top-K elements | 9 Questions |
| **Part 12**| **Graphs & Graph Algorithms** | Vertices, edges, Adjacency lists, BFS shortest path, DFS, cycle detection | 9 Questions |
| **Part 13**| **Dynamic Programming (DP)** | Overlapping subproblems, optimal substructure, Memoization vs Tabulation | 9 Questions |
| **Part 14**| **The 14 Master Interview Patterns**| Recognizing the blueprint behind 90% of technical interview questions | 14 Patterns |
| **Part 15**| **Roadmaps & Interview Playbook** | 30 / 60 / 90-Day schedules, FAANG behavioral guide, Interview cheat sheets | Action Plans |

---

## 📌 Detailed Chapter Outline

---

### 🔹 Part 0: Foundations & Mental Models
#### 1. What Exactly is a Data Structure?
- Real-world analogy: Organizing a messy wardrobe vs. a structured bookshelf.
- Why algorithms without good data structures are like fast cars with square wheels.
- RAM Mental Model: Street addresses, memory slots, byte alignment, and $O(1)$ direct indexing.

#### 2. Big-O Complexity Made Intuitive
- Why we don’t measure algorithms in milliseconds (CPU variance, background tasks).
- Counting operations: $O(1)$ constant, $O(\log n)$ dividing in half, $O(n)$ walking through a line, $O(n \log n)$ divide & conquer, $O(n^2)$ nested loops, $O(2^n)$ exponential explosions.
- Real-Life Analogy:
  - $O(1)$: Looking up someone's phone number when you have their direct contact card.
  - $O(n)$: Checking every person in a stadium row one-by-one.
  - $O(n^2)$: Shaking hands with every person in a room where everyone shakes everyone's hand.
- Time Complexity vs. Space Complexity (Memory overhead and Auxiliary space).
- Best, Average, and Worst Case (Big-O, Big-$\Omega$, Big-$\Theta$).

#### 3. Common Beginner Pitfalls & Mental Traps
- Thinking $O(2N)$ is different from $O(N)$ (Dropping constants).
- Ignoring space taken by recursion stack frames.
- Premature optimization before understanding the brute force approach.

---

### 🔹 Part 1: Arrays & Dynamic Arrays
#### Core Concepts & Mental Models
- Contiguous memory allocation: Why `arr[i]` calculation `base_address + i * size_of(type)` is instant $O(1)$.
- Fixed-size primitive arrays (`int[] arr = new int[5]`) vs. Dynamic Arrays (`ArrayList<Integer>`).
- Internal workings of Java `ArrayList`: Resizing strategy ($1.5\times$ growth factor), amortized $O(1)$ inserts.
- Subarrays vs. Subsequences vs. Subsets (Visual clarity diagram).

#### Core Techniques & Patterns
1. **Two Pointers Technique:** Opposite ends converging vs. same-direction sliding.
2. **Prefix Sum Array:** Answering range sum queries in $O(1)$ after $O(n)$ preprocessing.
3. **In-Place Modification:** Modifying elements without allocating extra array space ($O(1)$ space).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Find Maximum and Minimum Element in an Array* (Simple traversal, baseline loop).
  2. *Reverse an Array In-Place* (Two pointers from left and right).
  3. *Count Occurrences of an Element* (Frequency counting with a single loop).
- 🟡 **Easy Practice:**
  4. *Move All Zeroes to End* (LeetCode 283 — Fast & Slow pointer in-place overwrite).
  5. *Remove Duplicates from Sorted Array* (LeetCode 26 — Two pointers, tracking unique boundary).
  6. *Running Sum of 1D Array* (LeetCode 1480 — Prefix sum introduction).
- 🔴 **Interview Classics:**
  7. *Two Sum II - Input Array Is Sorted* (LeetCode 167 — Two-pointer convergence).
  8. *Best Time to Buy and Sell Stock* (LeetCode 121 — Single-pass running minimum).
  9. *Maximum Subarray (Kadane’s Algorithm)* (LeetCode 53 — Dynamic decision: continue or start fresh).

---

### 🔹 Part 2: Strings & Character Manipulation
#### Core Concepts & Mental Models
- How Strings are stored in Java: The String Constant Pool, Heap Memory, and Immutability.
- Why doing `str += "a"` inside a loop creates $O(N^2)$ memory garbage.
- `StringBuilder` vs. `StringBuffer` vs. `String` (Thread safety vs. Speed).
- Character arithmetic in Java: `'c' - 'a'` gives index 2 (The 26-element alphabet frequency array).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Reverse a String* (Using `char[]` and two pointers).
  2. *Count Vowels and Consonants* (Direct ASCII/character checking).
  3. *Check if String is Palindrome* (Left and right pointers skipping invalid characters).
- 🟡 **Easy Practice:**
  4. *Valid Anagram* (LeetCode 242 — Frequency bucket array comparison).
  5. *First Unique Character in a String* (LeetCode 387 — Two-pass frequency array).
  6. *Implement `strStr()` / Find Needle in Haystack* (LeetCode 28 — Substring window search).
- 🔴 **Interview Classics:**
  7. *Longest Common Prefix* (LeetCode 14 — Horizontal and vertical scanning).
  8. *Group Anagrams* (LeetCode 49 — Categorizing strings by sorted key or frequency signature).
  9. *Longest Substring Without Repeating Characters* (LeetCode 3 — Sliding window with a visited set/map).

---

### 🔹 Part 3: Searching Algorithms
#### Core Concepts & Mental Models
- Linear Search ($O(N)$): When the data is unsorted.
- Binary Search ($O(\log N)$): The dictionary/phonebook halving intuition.
- The 3 Invariants of Binary Search: `low`, `high`, `mid = low + (high - low) / 2` (Avoiding integer overflow!).
- Loop termination: `while (low <= high)` vs `while (low < high)`.
- Binary Search on Answer Space (Looking for a threshold or optimal value).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Linear Search with Early Exit* (Basic sequential search).
  2. *Standard Binary Search on Sorted Array* (LeetCode 704 — Canonical template).
  3. *Find Square Root of an Integer (Floor value)* (LeetCode 69 — Search space from `1` to `x`).
- 🟡 **Easy Practice:**
  4. *Search Insert Position* (LeetCode 35 — Finding insertion point when element is missing).
  5. *First and Last Position of Element in Sorted Array* (LeetCode 34 — Lower bound and Upper bound).
  6. *Peak Index in a Mountain Array* (LeetCode 852 — Binary search on unsorted slopes).
- 🔴 **Interview Classics:**
  7. *Search in Rotated Sorted Array* (LeetCode 33 — Identifying which half is sorted).
  8. *Find Minimum in Rotated Sorted Array* (LeetCode 153 — Convergence on inflection point).
  9. *Koko Eating Bananas* (LeetCode 875 — Binary search on solution feasibility range).

---

### 🔹 Part 4: Sorting Algorithms
#### Core Concepts & Mental Models
- Why do so many sorting algorithms exist? Stability, in-place memory, cache locality.
- Elementary Sorts ($O(N^2)$):
  - **Bubble Sort:** Sinking bubbles, adjacent swaps.
  - **Selection Sort:** Finding the minimum and placing it at the front.
  - **Insertion Sort:** Like arranging cards in your hand (fast on almost-sorted arrays).
- Divide and Conquer Sorts ($O(N \log N)$):
  - **Merge Sort:** Divide in halves, sort recursively, merge two sorted arrays ($O(N)$ extra memory).
  - **Quick Sort:** Partitioning around a pivot, in-place sorting ($O(1)$ auxiliary space, worst-case $O(N^2)$).
- Java Standard Library Sorting: Dual-Pivot Quicksort for primitives (`Arrays.sort(int[])`) and TimSort for objects (`Collections.sort()`).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Bubble Sort Implementation with Early-Stop Flag* (Optimized bubble sort).
  2. *Selection Sort Step-by-Step* (Tracking minimum index per outer iteration).
  3. *Insertion Sort Implementation* (Shifting elements backward).
- 🟡 **Easy Practice:**
  4. *Merge Two Sorted Arrays* (LeetCode 88 — Three pointers starting from the back).
  5. *Sort an Array of 0s, 1s, and 2s (Dutch National Flag)* (LeetCode 75 — 3-way partitioning).
  6. *Intersection of Two Sorted Arrays* (LeetCode 349 — Two pointers on sorted inputs).
- 🔴 **Interview Classics:**
  7. *Full Merge Sort Implementation* (Clean recursive divide and conquer with dry-run trace).
  8. *Quick Sort with Lomuto / Hoare Partitioning* (In-place partition trace).
  9. *Merge Intervals* (LeetCode 56 — Sort by start time and merge overlapping segments).

---

### 🔹 Part 5: Linked Lists
#### Core Concepts & Mental Models
- The Memory Leap: From contiguous arrays to scattered nodes connected by references (`next`).
- Singly Linked List vs. Doubly Linked List (`prev` & `next`) vs. Circular Linked List.
- The Superhero: **Sentinel / Dummy Head Node** (Eliminating `null` edge cases forever).
- Visualizing Pointers in Java: `Node temp = head` is NOT a copy of data, it’s a reference alias.
- The Two-Pointer Runner Technique (Fast & Slow pointers).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Design a Singly Linked List Node and Print Elements* (Creation, traversal).
  2. *Insert Node at Head, Tail, and Index $k$* (Reference rewiring).
  3. *Delete a Node by Value* (Tracking `prev` and `curr`).
- 🟡 **Easy Practice:**
  4. *Reverse a Singly Linked List* (LeetCode 206 — 3 pointers: `prev`, `curr`, `next`).
  5. *Find Middle of the Linked List* (LeetCode 876 — Fast runner 2x, Slow runner 1x).
  6. *Merge Two Sorted Linked Lists* (LeetCode 21 — Using dummy head node).
- 🔴 **Interview Classics:**
  7. *Linked List Cycle Detection & Cycle Start Node* (LeetCode 141 & 142 — Floyd's Tortoise and Hare).
  8. *Remove Nth Node From End of List* (LeetCode 19 — Window offset pointer).
  9. *Add Two Numbers Represented by Linked Lists* (LeetCode 2 — Carry propagation).

---

### 🔹 Part 6: Stacks
#### Core Concepts & Mental Models
- The LIFO Principle (Last-In, First-Out): Cafeteria tray dispenser mental model.
- Stack Operations: `push()`, `pop()`, `peek()`, `isEmpty()` — all $O(1)$.
- Implementation: Array-based stack vs. Linked List-based stack.
- The Program Execution Call Stack: How function calls use a stack under the hood.
- **The Monotonic Stack Pattern:** When to use an increasing or decreasing stack to find next greater/smaller elements in $O(N)$ instead of $O(N^2)$.

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Implement Stack using Array* (Handling overflow/underflow, pointer tracking).
  2. *Reverse a String / Array using a Stack* (LIFO property verification).
  3. *Check for Balanced Parentheses of Single Type `()`* (Basic counter vs stack).
- 🟡 **Easy Practice:**
  4. *Valid Parentheses* (LeetCode 20 — Matching `()`, `[]`, `{}` with a stack).
  5. *Min Stack* (LeetCode 155 — Supporting `getMin()` in $O(1)$ using auxiliary stack or encoded values).
  6. *Backspace String Compare* (LeetCode 844 — Simulating typing edits with stack).
- 🔴 **Interview Classics:**
  7. *Next Greater Element I* (LeetCode 496 — Monotonic decreasing stack).
  8. *Daily Temperatures* (LeetCode 739 — Storing indices to calculate waiting days).
  9. *Evaluate Reverse Polish Notation (Postfix Expression)* (LeetCode 150 — Stack calculation).

---

### 🔹 Part 7: Queues & Deque
#### Core Concepts & Mental Models
- The FIFO Principle (First-In, First-Out): Real-world bank counter or cinema ticket queue.
- Queue Operations: `offer()` / `enqueue()`, `poll()` / `dequeue()`, `peek()` — all $O(1)$.
- The Circular Queue: Reusing empty slots left by dequeued items using modulo arithmetic `(tail + 1) % capacity`.
- `Deque` (Double-Ended Queue): Insertion and deletion at both ends in $O(1)$ (`ArrayDeque` in Java).
- Queues as the Engine for Breadth-First Search (BFS).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Implement Queue using Array* (Front and rear pointers).
  2. *Implement Queue using Java LinkedList / ArrayDeque* (Standard syntax and operations).
  3. *Generate Binary Numbers from 1 to N using a Queue* (BFS number generation).
- 🟡 **Easy Practice:**
  4. *Implement Queue using Stacks* (LeetCode 232 — `inStack` and `outStack` amortized $O(1)$).
  5. *Implement Stack using Queues* (LeetCode 225 — Single queue rotation).
  6. *Number of Recent Calls / RecentCounter* (LeetCode 933 — Sliding time window with queue).
- 🔴 **Interview Classics:**
  7. *Design Circular Queue* (LeetCode 622 — Fixed-size array with modular indexing).
  8. *Sliding Window Maximum* (LeetCode 239 — Monotonic Deque storing candidate maximum indices).
  9. *Rotting Oranges* (LeetCode 994 — Multi-source BFS using queue).

---

### 🔹 Part 8: Hashing & Hash Tables
#### Core Concepts & Mental Models
- Why Hashing is Magic: Turning an arbitrary key into an array index in $O(1)$ average time.
- Hash Function, Hash Code, and Modulo Bucketing: `index = hash(key) % table_size`.
- Handling Collisions:
  - **Separate Chaining:** Linked list or balanced tree at each bucket (Java 8 `HashMap` threshold of 8 switches to Red-Black Tree).
  - **Open Addressing:** Linear probing, quadratic probing.
- Load Factor and Rehashing: Why doubling array size keeps operations $O(1)$.
- `HashMap` vs. `HashSet` vs. `TreeMap` (Unordered $O(1)$ vs. Ordered $O(\log N)$).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Count Frequency of Every Element in an Array* (Using `HashMap<Integer, Integer>`).
  2. *Find All Duplicates in an Array* (Using `HashSet`).
  3. *Check if Two Arrays are Disjoint (No Common Elements)* (Lookup using set).
- 🟡 **Easy Practice:**
  4. *Two Sum* (LeetCode 1 — One-pass HashMap storing `target - num`).
  5. *Contains Duplicate* (LeetCode 217 — Early return on set insertion).
  6. *Intersection of Two Arrays II* (LeetCode 350 — Frequency map decrementing).
- 🔴 **Interview Classics:**
  7. *Longest Consecutive Sequence* (LeetCode 128 — Set lookup checking sequence beginnings).
  8. *Subarray Sum Equals K* (LeetCode 560 — Prefix sum with HashMap frequency count).
  9. *LRU Cache (Least Recently Used)* (LeetCode 146 — HashMap + Custom Doubly Linked List).

---

### 🔹 Part 9: Recursion & Backtracking
#### Core Concepts & Mental Models
- Demystifying Recursion: A function that solves a problem by solving a smaller instance of itself.
- The 2 Non-Negotiable Rules of Recursion:
  1. **The Base Case** (The stopping condition that prevents stack overflow).
  2. **The Recursive Step** (Progressing toward the base case).
- Visualizing the Call Stack: Activation frames, parameter passing, and return values.
- What is Backtracking? Recursion with undoing choices:  
  **Choose $\to$ Explore $\to$ Unchoose (Backtrack)**.
- Decision Trees and State Space Trees.

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Print Numbers from 1 to N and N to 1 Recursively* (Understanding pre-order vs post-order calls).
  2. *Factorial of a Number* (Call stack trace dry run).
  3. *Sum of Digits of a Number* (Recursive extraction via modulo and division).
- 🟡 **Easy Practice:**
  4. *Fibonacci Number* (LeetCode 509 — Recursion tree visualization and overlapping branches).
  5. *Power of Three / Power of Two* (LeetCode 231 / 326 — Repeated division).
  6. *Reverse a String Recursively* (Swapping ends recursively).
- 🔴 **Interview Classics:**
  7. *Subsets / Power Set* (LeetCode 78 — Include / Exclude decision tree).
  8. *Permutations* (LeetCode 46 — Backtracking with visited array or swapping).
  9. *Combination Sum* (LeetCode 39 — Backtracking with candidate reuse).

---

### 🔹 Part 10: Trees & Binary Search Trees
#### Core Concepts & Mental Models
- Non-linear Hierarchical Data: Root, edges, parent, child, leaf, height, depth.
- Binary Tree Definition: At most 2 children per node (`left`, `right`).
- Tree Traversals (Depth-First Search):
  - **Preorder:** Root $\to$ Left $\to$ Right (Serialization, cloning).
  - **Inorder:** Left $\to$ Root $\to$ Right (Yields sorted order in a BST!).
  - **Postorder:** Left $\to$ Right $\to$ Root (Bottom-up calculations like height, deletion).
- Breadth-First Search (Level-Order Traversal): Visiting nodes layer by layer using a Queue.
- Binary Search Tree (BST) Property: Left subtree values $<$ Root value $<$ Right subtree values.

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Binary Tree Node Class and Manual Construction* (Creating a 3-node tree).
  2. *Recursive Inorder Traversal* (LeetCode 94 — Printing sorted BST nodes).
  3. *Count Total Nodes in a Binary Tree* (Recursive tree aggregation).
- 🟡 **Easy Practice:**
  4. *Maximum Depth of Binary Tree* (LeetCode 104 — $1 + \max(\text{depth}(left), \text{depth}(right))$).
  5. *Invert / Flip Binary Tree* (LeetCode 226 — Swapping left and right child pointers).
  6. *Same Tree* (LeetCode 100 — Checking structural and value equality).
- 🔴 **Interview Classics:**
  7. *Binary Tree Level Order Traversal* (LeetCode 102 — Queue BFS with size-bounded loops).
  8. *Validate Binary Search Tree* (LeetCode 98 — Range bounds $(min, max)$ validation).
  9. *Lowest Common Ancestor of a BST* (LeetCode 235 — Utilizing BST split property).

---

### 🔹 Part 11: Heaps & Priority Queues
#### Core Concepts & Mental Models
- The Priority Queue Mental Model: An ER hospital triage where the sickest patient goes first.
- Complete Binary Tree Property: Filled at every level except possibly the last, packed from left.
- Storing a Tree in a Flat Array:
  - Parent of index $i$: `(i - 1) / 2`
  - Left child of index $i$: `2 * i + 1`
  - Right child of index $i$: `2 * i + 2`
- Min-Heap vs. Max-Heap invariant.
- Heapify Operations: `siftUp()` on insert ($O(\log N)$), `siftDown()` on extract ($O(\log N)$).
- Building a Heap in $O(N)$ (Floyd's algorithm) vs. inserting elements one-by-one ($O(N \log N)$).
- Java `PriorityQueue<Integer>`: Min-heap by default, custom comparator `(a, b) -> b - a` for Max-heap.

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *PriorityQueue Basics in Java* (Adding, peeking, polling, reverse-order comparator).
  2. *Find the 3 Largest Elements in an Unsorted Array* (Using a size-3 Min-Heap).
  3. *Sort an Almost Sorted Array (k-sorted)* (Maintaining a size-k heap).
- 🟡 **Easy Practice:**
  4. *Kth Largest Element in an Array* (LeetCode 215 — Min-heap of size $K$).
  5. *Last Stone Weight* (LeetCode 1046 — Simulation with Max-Heap).
  6. *Relative Ranks* (LeetCode 506 — Priority queue of athlete scores with original indices).
- 🔴 **Interview Classics:**
  7. *Top K Frequent Elements* (LeetCode 347 — Frequency map + Min-Heap of size $K$).
  8. *Merge k Sorted Lists* (LeetCode 23 — Min-Heap holding current head node of each list).
  9. *Find Median from Data Stream* (LeetCode 295 — Two Heaps: Max-Heap for lower half, Min-Heap for upper half).

---

### 🔹 Part 12: Graphs & Graph Algorithms
#### Core Concepts & Mental Models
- What is a Graph? Set of Vertices ($V$) connected by Edges ($E$).
- Directed vs. Undirected; Weighted vs. Unweighted; Cyclic vs. Acyclic (DAG).
- Representations in Code:
  - **Adjacency Matrix:** 2D array `int[V][V]`, $O(1)$ edge query, $O(V^2)$ space.
  - **Adjacency List:** `List<List<Integer>>` or `Map<Integer, List<Integer>>`, memory-efficient $O(V + E)$.
- Graph Traversal Algorithms:
  - **BFS (Breadth-First Search):** Explores neighbor-by-neighbor using a Queue (guarantees shortest path in unweighted graphs).
  - **DFS (Depth-First Search):** Dives deep into a path using recursion / stack (connected components, cycle detection).
- Cycle Detection: Visited arrays, 3-color states (White, Gray, Black).
- Topological Sorting: Ordering tasks with dependencies (Kahn’s Algorithm using Indegrees & Queue).

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Build an Adjacency List from an Edge Array in Java* (Graph construction).
  2. *Print All Neighbors of a Given Node* (Traversing the list).
  3. *Count the Degree of Each Vertex* (In-degree and out-degree calculation).
- 🟡 **Easy Practice:**
  4. *Find if Path Exists in Graph* (LeetCode 1971 — Basic BFS or DFS with visited boolean array).
  5. *Number of Islands* (LeetCode 200 — Grid DFS/BFS sink technique).
  6. *Flood Fill* (LeetCode 733 — Recursive connected pixel recoloring).
- 🔴 **Interview Classics:**
  7. *Clone Graph* (LeetCode 133 — Deep copy with HashMap tracking cloned nodes).
  8. *Course Schedule I & II* (LeetCode 207 & 210 — Topological sort & cycle detection via Kahn's algorithm).
  9. *Word Ladder* (LeetCode 127 — Shortest transformation path using BFS).

---

### 🔹 Part 13: Dynamic Programming (DP)
#### Core Concepts & Mental Models
- What DP Really Is: Smart recursion that never solves the same subproblem twice ("Remembering your past").
- The 2 Hallmarks of a DP Problem:
  1. **Overlapping Subproblems:** Same subproblems called repeatedly.
  2. **Optimal Substructure:** Optimal solution to problem built from optimal solutions to subproblems.
- The Two Approaches:
  - **Top-Down with Memoization:** Normal recursion + Cache table (HashMap or array).
  - **Bottom-Up with Tabulation:** Iterative table filling from base cases upward.
- The 5-Step DP Framework:
  1. Define the state: What does `dp[i]` mean in English?
  2. Find the base cases: What is known immediately?
  3. State transition relation: How does `dp[i]` relate to `dp[i-1]`, `dp[i-2]`?
  4. Determine computation order: From small subproblems to target.
  5. Space optimization: Can we replace the array with 2 variables?

#### Tiered Problem Roadmap
- 🟢 **Beginner Warmup:**
  1. *Fibonacci Series: From Naive $O(2^N)$ to Memoized to Tabulated to $O(1)$ Space* (The quintessential DP evolution).
  2. *Climbing Stairs* (LeetCode 70 — Ways to reach step $N$).
  3. *Tribonacci Number* (LeetCode 1137 — 3-variable space optimization).
- 🟡 **Easy Practice:**
  4. *House Robber* (LeetCode 198 — Non-adjacent decision: rob current + previous non-adjacent vs skip).
  5. *Min Cost Climbing Stairs* (LeetCode 746 — Running minimum accumulation).
  6. *Coin Change* (LeetCode 322 — Unbounded knapsack variation finding minimum coins).
- 🔴 **Interview Classics:**
  7. *0/1 Knapsack Problem* (The foundational 2D weight-value tradeoff table).
  8. *Longest Common Subsequence (LCS)* (LeetCode 1143 — 2D string grid matching).
  9. *Longest Increasing Subsequence (LIS)* (LeetCode 300 — $O(N^2)$ DP and $O(N \log N)$ patience sort binary search).

---

### 🔹 Part 14: The 14 Master Coding Patterns
*Learn these patterns, and you can solve 90% of unseen interview problems:*
1. **Two Pointers:** Sorted arrays, pairs, in-place partitions.
2. **Fast & Slow Pointers (Floyd’s Cycle Finding):** Linked list loops, middle element, happy number.
3. **Sliding Window:** Subarrays/substrings of fixed size $k$ or dynamic condition.
4. **Merge Intervals:** Meeting rooms, overlapping events, interval scheduling.
5. **Cyclic Sort:** Array with numbers in range $[1, n]$ or $[0, n]$.
6. **In-place Reversal of a LinkedList:** Reversing sublists without extra allocation.
7. **Tree Breadth-First Search:** Level-order, zigzag, right view, min depth.
8. **Tree Depth-First Search:** Path sum, all root-to-leaf paths, tree diameter.
9. **Two Heaps:** Median of a stream, maximize capital.
10. **Subsets & Backtracking:** Power sets, permutations, combinations.
11. **Modified Binary Search:** Rotated arrays, nearly sorted, infinite arrays.
12. **Top 'K' Elements:** Min/Max heap of size $K$ for frequency or extreme values.
13. **K-way Merge:** Merging $K$ sorted arrays/lists using a PriorityQueue.
14. **0/1 Knapsack & Dynamic Programming:** Pick or don't pick state space transitions.

---

### 🔹 Part 15: Roadmaps, Cheat Sheets & Interview Day Playbook
#### 1. 30-Day Crash Course (Beginner Foundation)
- Week 1: Memory, Big-O, Arrays, Two Pointers (Part 0, 1)
- Week 2: Strings, Searching, Elementary Sorting (Part 2, 3, 4)
- Week 3: Linked Lists, Stacks, Queues (Part 5, 6, 7)
- Week 4: Hashing, Recursion, Basic Trees (Part 8, 9, 10)

#### 2. 60-Day Comprehensive Track (Core Competence)
- Adding Heaps, Advanced Trees, Graphs (BFS/DFS), and Top-Down DP.

#### 3. 90-Day FAANG Mastery Track (Interview Ready)
- Deep DP (Knapsack, LCS, LIS), All 14 Patterns, Hard LeetCode interview simulations, Space-time trade-off defenses.

#### 4. The 6-Step Technical Interview Framework
- Step 1: Clarify constraints (Can inputs be negative? Empty? Duplicates?).
- Step 2: Propose brute force out loud (Establish the worst-case baseline).
- Step 3: Identify the pattern & structure (Why a Hash Map or Two Pointers reduces complexity).
- Step 4: Dry run on a small example before coding.
- Step 5: Write clean, modular Java code with descriptive names.
- Step 6: Test edge cases (Empty input, 1 element, all duplicates, already sorted).

---

## 🎯 Verification & Quality Checklist
- [x] **No Gatekeeping or Jargon Overload:** Every concept starts with a physical analogy before any syntax.
- [x] **Zero Missing Fundamentals:** Covers all primary data structures (Arrays through Graphs) and key algorithms.
- [x] **Clear 3-Tier Problem Progression:** 🟢 Warmup (confidence), 🟡 Easy (core patterns), 🔴 Interview (FAANG standards).
- [x] **Java Centric:** Idiomatic Java code templates using modern best practices (`StringBuilder`, `ArrayDeque`, `ArrayList`).
- [x] **Actionable Blueprints:** Includes 30/60/90-day study paths and interview mental checklists.
