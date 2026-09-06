# SOWMYA.KCODE — DSA DEMYSTIFIED
## *The Beginner’s Step-by-Step Blueprint to Data Structures & Algorithms*
### Phone-First Multi-Language Master Edition (Java • C++ • Python)

---

# 📱 ABOUT THIS BOOK

> **The Golden Teaching Rule:**  
> **ONE concept $\longrightarrow$ ONE useful visual $\longrightarrow$ ONE clear explanation $\longrightarrow$ THREE compact implementations $\longrightarrow$ ONE shared complexity.**

This book was designed from day one to be read comfortably on a **mobile phone screen**:
- Short, high-impact paragraphs (2–4 lines).
- Clear visual ASCII diagrams that fit vertical mobile screens.
- Compact, clean code in **Java** (Primary), **C++**, and **Python** that avoids awkward horizontal scrolling.
- Zero textbook fluff: no filler paragraphs, no duplicate explanations.

---

# 🗺️ CURRICULUM ROADMAP

```text
LEVEL 0: FOUNDATIONS
  └── Part 0: Mental Models & Big-O Made Intuitive

LEVEL 1: LINEAR STRUCTURES
  ├── Part 1: Arrays & Dynamic Arrays
  └── Part 2: Strings & Character Manipulation

LEVEL 2: SEARCHING & SORTING
  ├── Part 3: Searching (Linear & Binary Search)
  └── Part 4: Sorting (Elementary & Divide & Conquer)

LEVEL 3: CONNECTED & ORDERED STRUCTURES
  ├── Part 5: Linked Lists (Singly, Doubly, Fast & Slow)
  ├── Part 6: Stacks (LIFO & Monotonic Stack)
  ├── Part 7: Queues & Deques (FIFO & BFS Engine)
  └── Part 8: Hashing & HashMaps (O(1) Lookups & Two Sum)

LEVEL 4: HIERARCHIES & GRAPHS
  ├── Part 9: Recursion & Backtracking
  ├── Part 10: Trees & Binary Search Trees
  ├── Part 11: Heaps & Priority Queues
  └── Part 12: Graphs & Graph Traversal (BFS & DFS)

LEVEL 5: ADVANCED OPTIMIZATION
  └── Part 13: Dynamic Programming (Memoization & Tabulation)

LEVEL 6: PATTERN RECOGNITION
  └── Part 14: The 14 Master Interview Patterns

LEVEL 7: INTERVIEW PLAYBOOK
  └── Part 15: 30 / 60 / 90-Day Roadmaps & Interview Day Checklist
```

---

# 🔹 PART 0: FOUNDATIONS & MENTAL MODELS

## 1. Why Do We Need Data Structures?
Imagine a library with 50,000 books thrown into one giant pile on the floor. Finding a specific book would take hours. 

Now imagine those same 50,000 books placed on labeled, alphabetical shelves. Finding a book takes 30 seconds.

> **🔵 Concept:**  
> A **Data Structure** is simply a structured way to organize and store data in computer memory so we can read and modify it efficiently.

---

## 2. Big-O Complexity Made Intuitive

We never measure algorithm speed in seconds or milliseconds because a new computer runs faster than an old laptop. Instead, we measure:
> **"How does the number of operations grow as the input size ($n$) grows?"**

```text
Operations
    ▲
 n² │                  /  O(n²) [Slow: Nested Loops]
    │                 /
  n │               /    O(n)   [Fair: Single Loop]
    │             /
log │ ───────────        O(log n) [Fast: Halving]
  1 │ ═══════════        O(1)   [Instant: Direct Jump]
    └──────────────────────► Input Size (n)
```

### The 4 Most Common Complexities:
1. **$O(1)$ Constant Time:** One single action. Doesn't matter if $n = 10$ or $n = 10,000,000$.  
   *Example:* Opening Locker #3.
2. **$O(\log n)$ Logarithmic Time:** Cutting the problem in half every step.  
   *Example:* Looking up a word in a dictionary ($1000 \to 500 \to 250 \to 125 \dots$).
3. **$O(n)$ Linear Time:** Visiting every element once.  
   *Example:* Reading every name in a sign-up sheet of $n$ people.
4. **$O(n^2)$ Quadratic Time:** A loop inside another loop.  
   *Example:* Everyone in a room of $n$ people shaking hands with everyone else.

---

## 3. 🧠 Beginner Doubts
- **What is $n$?** The total number of items given to your program.
- **Why do we ignore constants (e.g. why is $2n$ just $O(n)$)?** Because when $n = 1,000,000$, whether it takes 1 million or 2 million operations is negligible compared to an $n^2$ algorithm taking 1,000,000,000,000 operations!

---

## ⚡ 1-PAGE REVISION: PART 0
```text
┌─────────────────────────────────────────────────────────┐
│              BIG-O CHEAT SHEET (FASTEST TO SLOWEST)     │
├─────────────────────────────────────────────────────────┤
│ 1. O(1)      : Direct access / math calculation         │
│ 2. O(log n)  : Halving search space (Binary Search)     │
│ 3. O(n)      : Single loop through n items              │
│ 4. O(n log n): Divide & conquer sorting (Merge/Quick)   │
│ 5. O(n²)     : Nested loops (comparing all pairs)       │
│ 6. O(2ⁿ)     : Brute-force recursive branches (Subsets) │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 1: ARRAYS & DYNAMIC ARRAYS

## 1. Why Do We Need Arrays?
Storing 100 student scores as `int score1, score2, ... score100` requires hundreds of lines of code. An array lets us store all 100 numbers under **one name** and access any score instantly using its locker number.

---

## 2. Real-Life Analogy: Hallway Lockers

```text
Index:       0       1       2       3       4
          ┌───────┬───────┬───────┬───────┬───────┐
Values:   │  85   │  92   │  78   │  90   │  88   │
          └───────┴───────┴───────┴───────┴───────┘
          First item                       Last item
          (index 0)                        (index n - 1)
```

- **Index:** The position number. **Always starts at 0** (0 steps from start).
- **Length ($n$):** Total elements ($n = 5$ above).
- **Last Index:** Always $n - 1$ (which is $5 - 1 = 4$).

---

## 3. ⭐ Core Operations in 3 Languages

```java
// ☕ Java
int[] arr = {10, 20, 30};
int val = arr[1];       // Read: O(1)
arr[1] = 99;            // Update: O(1)
int len = arr.length;   // Length
```

```cpp
// ⚙️ C++
vector<int> arr = {10, 20, 30};
int val = arr[1];       // Read: O(1)
arr[1] = 99;            // Update: O(1)
int len = arr.size();   // Length
```

```python
# 🐍 Python
arr = [10, 20, 30]
val = arr[1]  # Read: O(1)
arr[1] = 99  # Update: O(1)
length = len(arr)  # Length
```

---

## 4. Fixed Array vs. Dynamic Array
- **Fixed Array (`int[]` / `int arr[5]`):** Capacity fixed permanently at creation.
- **Dynamic Array (`ArrayList` / `vector` / `list`):** Expands automatically.
- **Appending to dynamic array:** **$O(1)$ amortized** (fast most of the time; occasionally resizes internal storage which takes $O(n)$).

---

## 5. 💡 Core Pattern: Two Pointers (Converging)

> 💡 **What is a "Pointer"?**  
> In Java and Python, there are no C++ memory pointers. "Two Pointers" simply means **two integer index variables** (like `left` and `right`) tracking positions in an array.

```text
Index:    0    1    2    3    4
Array:  [10,  20,  30,  40,  50]
          ▲                   ▲
          │                   │
      left = 0           right = 4
```
**When to consider:** Array is **sorted**, searching for a **pair**, or reversing in-place.

---

## 🚀 ESSENTIAL PRACTICE: ARRAYS

### 🟢 Warmup: Find Maximum Element
**Goal:** Return the highest number in an array.  
**Intuition:** Assume `arr[0]` is current max. Compare each element; update max if bigger.

```java
// ☕ Java
public static int findMax(int[] arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}
```
```cpp
// ⚙️ C++
int findMax(const vector<int>& arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}
```
```python
# 🐍 Python
def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val
```
- **Complexity:** Time $O(n)$, Space $O(1)$.
- ⚠️ **Mistake:** Setting `maxVal = 0` (breaks if array has only negative numbers).

---

### 🟡 Pattern Building: Move Zeroes (LeetCode 283)
**Goal:** Move all 0s to the end in-place while keeping relative order.  
**Intuition (Scanning Index + Write Position):**  
`insertPos` tracks where the next non-zero goes. Scan with `i`: if `arr[i] != 0`, copy to `arr[insertPos++]`. Then fill the rest with zeros.

```java
// ☕ Java
public static void moveZeroes(int[] nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) nums[insertPos++] = nums[i];
    }
    while (insertPos < nums.length) nums[insertPos++] = 0;
}
```
```cpp
// ⚙️ C++
void moveZeroes(vector<int>& nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) nums[insertPos++] = nums[i];
    }
    while (insertPos < nums.size()) nums[insertPos++] = 0;
}
```
```python
# 🐍 Python
def move_zeroes(nums):
    insert_pos = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[insert_pos] = nums[i]
            insert_pos += 1
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1
```
- **Complexity:** Time $O(n)$, Space $O(1)$.

---

### 🔴 Interview Classic: Two Sum II (Sorted Array — LeetCode 167)
**Goal:** Find 2 numbers in a sorted array that sum to `target`. Return 1-based indices.  
**Intuition:** Start `left = 0` and `right = n - 1`:
- `sum > target` $\implies$ sum too big $\implies$ `right--`
- `sum < target` $\implies$ sum too small $\implies$ `left++`
- `sum == target` $\implies$ found answer!

```text
[ 2,   7,  11,  15 ]    target = 9
  ▲              ▲      2 + 15 = 17 (> 9) -> right--
  left         right

[ 2,   7,  11,  15 ]    2 + 7 = 9 (MATCH!) -> return [1, 2]
  ▲    ▲
```

```java
// ☕ Java
public static int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum > target) right--;
        else left++;
    }
    return new int[]{};
}
```
```cpp
// ⚙️ C++
vector<int> twoSum(const vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum > target) right--;
        else left++;
    }
    return {};
}
```
```python
# 🐍 Python
def two_sum(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum > target:
            right -= 1
        else:
            left += 1
    return []
```
- **Complexity:** Time $O(n)$, Space $O(1)$.

---

## ⚡ 1-PAGE REVISION: ARRAYS
```text
┌─────────────────────────────────────────────────────────┐
│                      ARRAYS SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│ • Index starts at 0. Last index is length - 1.          │
│ • Read / Update: O(1) | Search: O(n)                    │
│ • Append (Dynamic): O(1) amortized                      │
│ • Two Pointers: Converge inward on sorted arrays.       │
│ • Write Pointer: Overwrite in-place (Move Zeroes).      │
│ • ⚠️ Avoid using <= arr.length in loops (causes crash). │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 2: STRINGS & CHARACTER MANIPULATION

## 1. Why Do Strings Matter?
Strings are arrays of characters under the hood:
```text
String "CODE"
Index:   0    1    2    3
       ┌────┬────┬────┬────┐
Char:  │ 'C'│ 'O'│ 'D'│ 'E'│
       └────┴────┴────┴────┘
```
In Java and Python, **Strings are immutable** (cannot be altered in-place). Doing `str += "a"` inside a loop creates a new copy of the string every time ($O(n^2)$ memory waste!). Use `StringBuilder` in Java.

---

## 2. Character Arithmetic: The 26-Bucket Array
Every lowercase letter `'a'` through `'z'` has an ASCII number code.  
Notice: `'a' - 'a' = 0`, `'b' - 'a' = 1`, `'z' - 'a' = 25`.  
We can count frequencies of all 26 letters using a fixed-size `int[26]` array!

---

## 🚀 ESSENTIAL PRACTICE: STRINGS

### 🟡 Pattern: Valid Anagram (LeetCode 242)
**Goal:** Return `true` if string `t` is an anagram of `s` (same characters with same counts).  
**Intuition:** Count frequency of each letter in `s` (+1) and decrement for `t` (-1). If all buckets end at 0, they match.

```java
// ☕ Java
public static boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}
```
```cpp
// ⚙️ C++
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}
```
```python
# 🐍 Python
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    return all(c == 0 for c in count)
```
- **Complexity:** Time $O(n)$, Space $O(1)$ (fixed 26-slot bucket).

---

## ⚡ 1-PAGE REVISION: STRINGS
```text
┌─────────────────────────────────────────────────────────┐
│                     STRINGS SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│ • Java/Python strings are immutable.                    │
│ • Use StringBuilder in Java for repeated concatenation. │
│ • 'c' - 'a' maps lowercase chars to indices 0..25.      │
│ • Comparing strings: use .equals() in Java, NOT ==.     │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 3: SEARCHING ALGORITHMS

## 1. Linear Search vs. Binary Search
- **Linear Search:** Check items one by one ($O(n)$). Works on unsorted data.
- **Binary Search:** Cut the remaining half away on every guess ($O(\log n)$). **Requires data to be sorted!**

```text
Target = 7 in sorted array:
[ 1,  3,  5,  7,  9, 11, 13 ]    low=0, high=6, mid=3 (val 7)
              ▲
          MATCH in 1 step!
```

---

## 2. Binary Search Template (The 3 Rules)
1. `low = 0`, `high = n - 1`
2. `mid = low + (high - low) / 2` (Prevents integer overflow!)
3. Loop condition: `while (low <= high)`

```java
// ☕ Java
public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}
```
```cpp
// ⚙️ C++
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```
```python
# 🐍 Python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```
- **Complexity:** Time $O(\log n)$, Space $O(1)$.

---

## ⚡ 1-PAGE REVISION: SEARCHING
```text
┌─────────────────────────────────────────────────────────┐
│                    SEARCHING SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│ • Unsorted data  -> Linear Search : O(n)                │
│ • Sorted data    -> Binary Search : O(log n)            │
│ • Use mid = low + (high - low) / 2 to avoid overflow.   │
│ • Look for: "Sorted array" or "Find minimum/maximum X"  │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 4: SORTING ALGORITHMS

## 1. Visualizing Sorting
Why do we sort? Because searching sorted data takes $O(\log n)$ instead of $O(n)$.

```text
Bubble Sort (Bubbling the largest item to the right):
[ 5,  3,  4,  1 ]
  5 > 3 -> swap -> [ 3, 5, 4, 1 ]
  5 > 4 -> swap -> [ 3, 4, 5, 1 ]
  5 > 1 -> swap -> [ 3, 4, 1, 5 ] (5 reached end!)
```

---

## 2. Comparison of Core Sorting Algorithms

| Algorithm | Average Time | Worst Time | Space | Mental Model |
|---|:---:|:---:|:---:|---|
| **Bubble Sort** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Sinking heavy items to the bottom. |
| **Insertion Sort** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Sorting playing cards in your hand. |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Split in half, sort each, merge together. |
| **Quick Sort** | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$| Pick a pivot, put smaller left, bigger right. |

---

## 3. Merge Sort (The Divide & Conquer Standard)

```text
       [ 4, 2, 1, 3 ]
       /            \
    [ 4, 2 ]       [ 1, 3 ]
    /     \        /     \
  [4]     [2]    [1]     [3]
    \     /        \     /
    [ 2, 4 ]       [ 1, 3 ]
       \            /
       [ 1, 2, 3, 4 ]
```

```java
// ☕ Java Merge Step
public static void merge(int[] arr, int l, int m, int r) {
    int[] temp = new int[r - l + 1];
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r) temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
    while (i <= m) temp[k++] = arr[i++];
    while (j <= r) temp[k++] = arr[j++];
    for (i = 0; i < temp.length; i++) arr[l + i] = temp[i];
}
```

---

## ⚡ 1-PAGE REVISION: SORTING
```text
┌─────────────────────────────────────────────────────────┐
│                     SORTING SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│ • Small arrays / simple: Insertion Sort O(n²)           │
│ • Guaranteed fast: Merge Sort O(n log n) [Needs O(n)]   │
│ • Fast in-place: Quick Sort O(n log n) avg              │
│ • In interviews: Use built-in sort (Arrays.sort) unless │
│   asked to implement from scratch!                      │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 5: LINKED LISTS

## 1. Why Linked Lists?
In arrays, elements are locked into one continuous block of memory. Inserting at the start requires shifting every element ($O(n)$).  
A **Linked List** scatters elements across memory like cars of a train, connected by links (**references**).

```text
HEAD
  ↓
┌─────┬──────┐    ┌─────┬──────┐    ┌─────┬──────┐
│ 10  │ next ├───►│ 20  │ next ├───►│ 30  │ null │
└─────┴──────┘    └─────┴──────┘    └─────┴──────┘
  Node 1            Node 2            Node 3
```

- **Node:** A small object containing `data` and a `next` link.
- **Head:** The reference pointing to the very first node.
- **Null:** Indicates the end of the chain.

---

## 2. Basic Node Definition in 3 Languages

```java
// ☕ Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}
```
```cpp
// ⚙️ C++
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
```
```python
# 🐍 Python
class ListNode:

  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next
```

---

## 🚀 ESSENTIAL PRACTICE: LINKED LISTS

### 🟡 Pattern 1: Reverse a Linked List (LeetCode 206)
**Goal:** Flip all arrows: $1 \to 2 \to 3 \to \text{null}$ becomes $\text{null} \leftarrow 1 \leftarrow 2 \leftarrow 3$.  
**Intuition (3 Pointers):** `prev`, `curr`, and temporary `next`.

```text
Before:   prev(null)    curr(1) ──► 2 ──► 3
Step:     curr.next = prev; prev = curr; curr = next;
After:    null ◄── 1 (prev)    curr(2) ──► 3
```

```java
// ☕ Java
public static ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode nextNode = curr.next; // Save next
        curr.next = prev;              // Reverse arrow
        prev = curr;                   // Move prev forward
        curr = nextNode;               // Move curr forward
    }
    return prev; // New head
}
```
```cpp
// ⚙️ C++
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}
```
```python
# 🐍 Python
def reverse_list(head: ListNode) -> ListNode:
  prev, curr = None, head
  while curr:
    next_node = curr.next
    curr.next = prev
    prev = curr
    curr = next_node
  return prev
```
- **Complexity:** Time $O(n)$, Space $O(1)$.

---

### 🔴 Pattern 2: Detect Cycle (Floyd's Fast & Slow Pointers — LeetCode 141)
**Goal:** Determine if a linked list contains a circular loop.  
**Intuition:** Like two runners on a circular race track: a **Fast runner** (2 steps) and a **Slow runner** (1 step). If there is a loop, Fast will eventually lap and collide with Slow!

```java
// ☕ Java
public static boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true; // Collision!
    }
    return false;
}
```
```cpp
// ⚙️ C++
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```
```python
# 🐍 Python
def has_cycle(head: ListNode) -> bool:
  slow = fast = head
  while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
      return True
  return False
```
- **Complexity:** Time $O(n)$, Space $O(1)$.

---

## ⚡ 1-PAGE REVISION: LINKED LISTS
```text
┌─────────────────────────────────────────────────────────┐
│                  LINKED LISTS SUMMARY                   │
├─────────────────────────────────────────────────────────┤
│ • Insert/Delete at head: O(1) (No shifting!)            │
│ • Access by index k: O(n) (Must walk from head)         │
│ • Reversal needs 3 pointers: prev, curr, nextNode       │
│ • Cycle Detection: Fast (2x) & Slow (1x) pointers       │
│ • Sentinel Dummy Node eliminates null-head edge cases!  │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 6: STACKS

## 1. What is a Stack? (LIFO)
Think of a **stack of plates** in a cafeteria:
- You add new plates to the **TOP** (`push`).
- You remove plates from the **TOP** (`pop`).
- **LIFO:** Last-In, First-Out.

```text
TOP ──► [ 30 ]  (Most recently added)
        [ 20 ]
        [ 10 ]  (First added)
```

---

## 2. Core Operations in 3 Languages
- `push(x)`: Add item to top ($O(1)$)
- `pop()`: Remove and return top item ($O(1)$)
- `peek()`: Look at top item without removing ($O(1)$)

```java
// ☕ Java (Use ArrayDeque, not legacy Stack)
ArrayDeque<Integer> stack = new ArrayDeque<>();
stack.push(10); stack.push(20);
int top = stack.pop(); // 20
```
```cpp
// ⚙️ C++
stack<int> s;
s.push(10); s.push(20);
int top = s.top(); s.pop(); // 20
```
```python
# 🐍 Python (Standard list)
stack = []
stack.append(10)
stack.append(20)
top = stack.pop()  # 20
```

---

## 🚀 ESSENTIAL PRACTICE: STACKS

### 🔴 Interview Classic: Valid Parentheses (LeetCode 20)
**Goal:** Given a string of brackets `()[]{}` determine if valid.  
**Intuition:** Push expected closing brackets onto stack when opening brackets are seen. When closing bracket arrives, verify it matches top of stack.

```java
// ☕ Java
public static boolean isValid(String s) {
    ArrayDeque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}
```
```cpp
// ⚙️ C++
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}
```
```python
# 🐍 Python
def is_valid(s: str) -> bool:
  stack = []
  mapping = {'(': ')', '{': '}', '[': ']'}
  for c in s:
    if c in mapping:
      stack.append(mapping[c])
    elif not stack or stack.pop() != c:
      return False
  return len(stack) == 0
```
- **Complexity:** Time $O(n)$, Space $O(n)$.

---

# 🔹 PART 7: QUEUES & DEQUES

## 1. What is a Queue? (FIFO)
Think of people standing in line at a movie ticket counter:
- First person in line gets served first.
- **FIFO:** First-In, First-Out.

```text
FRONT ──► [ 10 ] [ 20 ] [ 30 ] ◄── REAR
(Served first)                 (Joined line last)
```

- **Enqueue / Add:** Add to back (`offer` / `push`).
- **Dequeue / Remove:** Remove from front (`poll` / `pop`).
- **Deque (Double-Ended Queue):** Can add/remove at BOTH ends in $O(1)$.

```java
// ☕ Java
Queue<Integer> q = new LinkedList<>();
q.offer(10); q.offer(20);
int front = q.poll(); // 10
```
```cpp
// ⚙️ C++
queue<int> q;
q.push(10); q.push(20);
int front = q.front(); q.pop(); // 10
```
```python
# 🐍 Python
from collections import deque

q = deque()
q.append(10)
q.append(20)
front = q.popleft()  # 10
```

---

## ⚡ 1-PAGE REVISION: STACKS & QUEUES
```text
┌─────────────────────────────────────────────────────────┐
│               STACKS & QUEUES SUMMARY                   │
├─────────────────────────────────────────────────────────┤
│ • Stack: LIFO (Last In First Out) | push/pop at top O(1)│
│ • Queue: FIFO (First In First Out)| add rear/poll front │
│ • Stack uses: Undo, Matching brackets, Call Stack       │
│ • Queue uses: BFS, Print jobs, Buffer queues            │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 8: HASHING & HASHMAPS

## 1. Why Hashing is Magic
An array search takes $O(n)$. A HashMap lets us search by **key** in **$O(1)$ average time**!
Think of a **phone contact book**: you look up the name `"Alice"` directly to get her number `98765`.

```text
Key: "Alice" ──► Hash Function ──► Index 3 ──► Value: 98765
```

---

## 2. HashMap Syntax in 3 Languages

```java
// ☕ Java
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
int score = map.getOrDefault("Alice", 0);
boolean exists = map.containsKey("Alice");
```
```cpp
// ⚙️ C++
unordered_map<string, int> map;
map["Alice"] = 90;
int score = map.count("Alice") ? map["Alice"] : 0;
bool exists = map.count("Alice");
```
```python
# 🐍 Python
hash_map = {}
hash_map["Alice"] = 90
score = hash_map.get("Alice", 0)
exists = "Alice" in hash_map
```

---

## 🚀 ESSENTIAL PRACTICE: HASHING

### 🔴 The #1 Interview Classic: Two Sum (LeetCode 1)
**Goal:** In an **unsorted** array, find 2 indices that sum to `target`.  
**Intuition:** As we scan each number `x`, we check: *"Have we already seen its complement `(target - x)`?"* If yes, return their indices. If not, save `x` into the map!

```java
// ☕ Java
public static int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}
```
```cpp
// ⚙️ C++
vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) return {map[complement], i};
        map[nums[i]] = i;
    }
    return {};
}
```
```python
# 🐍 Python
def two_sum(nums, target):
  seen = {}
  for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
      return [seen[complement], i]
    seen[num] = i
  return []
```
- **Complexity:** Time $O(n)$, Space $O(n)$.

---

## ⚡ 1-PAGE REVISION: HASHING
```text
┌─────────────────────────────────────────────────────────┐
│                     HASHING SUMMARY                     │
├─────────────────────────────────────────────────────────┤
│ • Insert / Lookup / Delete: O(1) average time           │
│ • Use HashMap for: Key-Value pairs & Frequency counts   │
│ • Use HashSet for: Fast existence check & Unique items  │
│ • Unsorted Two Sum -> HashMap stores complement in O(n) │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 9: RECURSION & BACKTRACKING

## 1. What is Recursion?
A function that calls itself to solve a smaller instance of the same problem.
Think of **Russian nesting dolls**: each doll opens to reveal a smaller doll until you reach the smallest solid doll (**Base Case**).

```text
The 2 Rules of Recursion:
1. Base Case: The stopping condition (Prevents infinite loop & stack overflow!)
2. Recursive Step: Moving one step closer to the base case.
```

---

## 2. Visualizing the Call Stack (Factorial of 3)

```text
Calling factorial(3):
  fact(3) calls 3 * fact(2)
    fact(2) calls 2 * fact(1)
      fact(1) reaches Base Case -> returns 1
    fact(2) receives 1 -> returns 2 * 1 = 2
  fact(3) receives 2 -> returns 3 * 2 = 6
```

---

## 3. Backtracking: Choose $\to$ Explore $\to$ Unchoose
Backtracking is recursion that explores all possibilities by making a choice, diving deeper, and then **undoing the choice** (backtracking) to try other branches.

```java
// ☕ Java Subsets Template
public static void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr)); // Record state
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);                  // 1. Choose
        backtrack(nums, i + 1, curr, res);  // 2. Explore
        curr.remove(curr.size() - 1);       // 3. Unchoose (Backtrack!)
    }
}
```

---

# 🔹 PART 10: TREES & BINARY SEARCH TREES

## 1. What is a Tree?
A hierarchical data structure.
Think of an **organizational chart** or a **family tree**:

```text
            10          ◄── Root Node
          /    \
         5      15      ◄── Child Nodes
        / \
       2   7            ◄── Leaf Nodes (No children)
```

- **Root:** The topmost node.
- **Leaf:** A node with no children.
- **Binary Tree:** Each node has at most 2 children (`left` and `right`).
- **Binary Search Tree (BST) Invariant:**  
  `Left Child < Parent < Right Child`

---

## 2. The 3 Depth-First Traversals
```text
Tree: [Root: 1, Left: 2, Right: 3]
• Preorder  (Root, Left, Right) : 1 -> 2 -> 3
• Inorder   (Left, Root, Right) : 2 -> 1 -> 3 (Sorted order in a BST!)
• Postorder (Left, Right, Root) : 2 -> 3 -> 1
```

---

## 🚀 ESSENTIAL PRACTICE: TREES

### 🟡 Maximum Depth of Binary Tree (LeetCode 104)
**Intuition:** Depth of a tree is $1 + \max(\text{depth}(left), \text{depth}(right))$.

```java
// ☕ Java
public static int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```
```cpp
// ⚙️ C++
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
```
```python
# 🐍 Python
def max_depth(root):
  if not root:
    return 0
  return 1 + max(max_depth(root.left), max_depth(root.right))
```
- **Complexity:** Time $O(n)$, Space $O(h)$ where $h$ is tree height.

---

# 🔹 PART 11: HEAPS & PRIORITY QUEUES

## 1. What is a Heap?
Think of an **Emergency Room (ER) triage**: patients are treated not by arrival time, but by **urgency/priority**.
- **Min-Heap:** Smallest value always at the top ($O(1)$ peek).
- **Max-Heap:** Largest value always at the top ($O(1)$ peek).
- **Insertion and Removal:** $O(\log n)$.

```java
// ☕ Java
PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Default Min-Heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a); // Max-Heap
```
```cpp
// ⚙️ C++
priority_queue<int, vector<int>, greater<int>> minHeap; // Min-Heap
priority_queue<int> maxHeap;                            // Default Max-Heap
```
```python
# 🐍 Python
import heapq

min_heap = []
heapq.heappush(min_heap, 10)
top = heapq.heappop(min_heap)
```

---

## 🚀 ESSENTIAL PRACTICE: HEAPS

### 🔴 Top K Frequent Elements (LeetCode 347)
**Goal:** Return the $k$ most frequent elements.  
**Intuition:** Count frequencies with a map. Keep a **Min-Heap of size $k$**. If heap exceeds size $k$, pop the least frequent element!

```java
// ☕ Java
public static int[] topKFrequent(int[] nums, int k) {
    HashMap<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));
    for (int n : count.keySet()) {
        heap.offer(n);
        if (heap.size() > k) heap.poll();
    }
    int[] res = new int[k];
    for (int i = 0; i < k; i++) res[i] = heap.poll();
    return res;
}
```
- **Complexity:** Time $O(n \log k)$, Space $O(n)$.

---

# 🔹 PART 12: GRAPHS & GRAPH ALGORITHMS

## 1. What is a Graph?
Think of **airports (nodes/vertices)** connected by **flights (edges)**.

```text
    A ─────── B
    │         │
    │         │
    C ─────── D
```
- **Adjacency List:** An array of lists storing each node's neighbors.

---

## 2. BFS vs. DFS: When to Use Which?
- **Breadth-First Search (BFS):** Layer-by-layer exploration using a **Queue**.  
  ⭐ *Use for:* Shortest path in unweighted graphs.
- **Depth-First Search (DFS):** Dive as deep as possible using **Recursion / Stack**.  
  ⭐ *Use for:* Connected components, maze solving, cycle detection.

---

## 🚀 ESSENTIAL PRACTICE: GRAPHS

### 🔴 Number of Islands (LeetCode 200)
**Goal:** Count connected clusters of `'1'`s (land) surrounded by `'0'`s (water).  
**Intuition:** Loop over grid. When `'1'` is found, increment count and run DFS to "sink" (turn into `'0'`) all connected land cells.

```java
// ☕ Java
public static int numIslands(char[][] grid) {
    int islands = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                islands++;
                dfs(grid, r, c);
            }
        }
    }
    return islands;
}

private static void dfs(char[][] g, int r, int c) {
    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0'; // Sink cell
    dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);
}
```
- **Complexity:** Time $O(m \times n)$, Space $O(m \times n)$.

---

# 🔹 PART 13: DYNAMIC PROGRAMMING (DP)

## 1. What is Dynamic Programming?
Dynamic Programming is simply:  
> **"Remembering answers to subproblems so you never calculate them twice."**

Notice Fibonacci without DP does enormous duplicate work:
```text
               fib(5)
              /      \
          fib(4)     fib(3)  ◄── Duplicate!
          /    \     /    \
      fib(3)  fib(2)fib(2) fib(1)
       ▲
   Duplicate!
```

---

## 2. Memoization vs. Tabulation
- **Top-Down (Memoization):** Normal recursion + an array/map cache.
- **Bottom-Up (Tabulation):** Iterative loop filling a `dp[]` table from base cases upward.

---

## 🚀 ESSENTIAL PRACTICE: DP

### 🟡 Climbing Stairs (LeetCode 70)
**Goal:** You are climbing a staircase of $n$ steps. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?  
**Intuition:** To reach step $n$, you must have jumped from step $n-1$ or step $n-2$.  
Therefore: $\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2)$! (It's Fibonacci!).

```java
// ☕ Java (O(1) Space Optimized)
public static int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```
```cpp
// ⚙️ C++
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```
```python
# 🐍 Python
def climb_stairs(n: int) -> int:
  if n <= 2:
    return n
  prev2, prev1 = 1, 2
  for _ in range(3, n + 1):
    curr = prev1 + prev2
    prev2, prev1 = prev1, curr
  return prev1
```
- **Complexity:** Time $O(n)$, Space $O(1)$.

---

## ⚡ 1-PAGE REVISION: DYNAMIC PROGRAMMING
```text
┌─────────────────────────────────────────────────────────┐
│                    DP 5-STEP BLUEPRINT                  │
├─────────────────────────────────────────────────────────┤
│ 1. Define State: What does dp[i] represent?             │
│ 2. Find Base Cases: What are the smallest values known? │
│ 3. Recurrence Relation: How does dp[i] build on past?   │
│ 4. Order of Computation: From base case up to target.   │
│ 5. Space Optimization: Can we keep only 2 variables?    │
└─────────────────────────────────────────────────────────┘
```

---

# 🔹 PART 14: THE 14 MASTER INTERVIEW PATTERNS

Recognizing common patterns makes unfamiliar interview questions much easier to approach:

1. **Two Pointers Converging:** Sorted arrays, finding pairs, reversing strings.
2. **Fast & Slow Pointers:** Detecting linked list cycles, finding list middle.
3. **Sliding Window:** Subarrays/substrings with contiguous limits (e.g. longest substring without repeating characters).
4. **Merge Intervals:** Overlapping time intervals, calendar scheduling.
5. **Cyclic Sort:** Numbers in range $1$ to $n$ placed at index $val - 1$.
6. **In-place Reversal of LinkedList:** Reversing sublists using 3 pointers.
7. **Tree BFS (Level Order):** Processing trees layer by layer with a Queue.
8. **Tree DFS:** Path sums, max depth, finding ancestors recursively.
9. **Two Heaps:** Median of a data stream (Min-Heap + Max-Heap).
10. **Subsets & Backtracking:** Power sets, permutations, combinations.
11. **Modified Binary Search:** Rotated sorted arrays, search space elimination.
12. **Top 'K' Elements:** Using size-$k$ Min-Heap for $k$ largest elements.
13. **K-Way Merge:** Merging $k$ sorted lists using a PriorityQueue.
14. **0/1 Knapsack & DP:** Pick or skip items to maximize value under weight constraints.

---

# 🔹 PART 15: ROADMAPS & INTERVIEW DAY PLAYBOOK

## 📅 The 30-Day Beginner Sprint
- **Week 1 (Days 1–7):** Big-O, Arrays, Strings, Two Pointers (Parts 0, 1, 2).
- **Week 2 (Days 8–14):** Binary Search, Sorting, Linked Lists (Parts 3, 4, 5).
- **Week 3 (Days 15–21):** Stacks, Queues, HashMaps (Parts 6, 7, 8).
- **Week 4 (Days 22–30):** Recursion, Trees, BFS/DFS, Basic DP (Parts 9, 10, 12, 13).

---

## 🎯 The 6-Step Live Interview Strategy
When an interviewer hands you a problem:
1. **Clarify Constraints (1 min):** Can inputs be negative? Empty? Are there duplicates?
2. **State Brute Force (2 min):** *"The brute force is $O(n^2)$ using nested loops..."* Establish baseline.
3. **Identify Pattern (2 min):** *"Because the array is sorted, we can use Two Pointers to solve this in $O(n)$ time."*
4. **Dry Run on Small Example (2 min):** Trace indices on paper before writing code!
5. **Write Clean Code (10 min):** Meaningful variable names (`left`, `insertPos`), modular helper methods.
6. **Test Edge Cases (3 min):** Empty input, 1 element, all duplicates, already sorted.

---

## 🏆 FINAL ENCOURAGEMENT FROM SOWMYA
You don't need to solve 500 LeetCode problems to get hired. You only need to understand the **core data structures**, master the **14 fundamental patterns**, and communicate your thinking clearly. 

Stay consistent, practice code by hand, and believe in your journey!
