# SOWMYA.KCODE — DSA DEMYSTIFIED
## Part 1: Arrays & Dynamic Arrays (Multi-Language Lean Edition)
> **Goal:** Complete mastery of linear arrays in under 15 minutes.  
> **Languages:** ☕ Java (Primary) | ⚙️ C++ | 🐍 Python  
> **Golden Rule:** One concept. One visual. Three compact implementations. One shared complexity.

---

## 1. ⭐ MUST KNOW: The Core Concept

### Why do we need an Array?
Storing 1,000 scores as `score1, score2, ... score1000` is impossible to manage. We need **one named container** holding multiple ordered values where any item can be opened immediately by its position number.

### Real-Life Analogy: The School Lockers
An array is like a row of numbered lockers in a hallway:

```text
Index:       0       1       2       3       4
          ┌───────┬───────┬───────┬───────┬───────┐
Values:   │  85   │  92   │  78   │  90   │  88   │
          └───────┴───────┴───────┴───────┴───────┘
          First item                       Last item
          (index 0)                        (index n - 1)
```

- **Index:** The locker number. **Always starts at 0** (0 steps away from start).
- **$n$:** The total count of items ($n = 5$ here).
- **Last Index:** Always $n - 1$ (which is $5 - 1 = 4$).

---

## 2. ⭐ Syntax at a Glance: 4 Core Operations

| Operation | ☕ Java | ⚙️ C++ | 🐍 Python |
|---|---|---|---|
| **1. Create** | `int[] arr = {10, 20, 30};` | `vector<int> arr = {10, 20, 30};` | `arr = [10, 20, 30]` |
| **2. Read** | `int val = arr[1];` | `int val = arr[1];` | `val = arr[1]` |
| **3. Update** | `arr[1] = 99;` | `arr[1] = 99;` | `arr[1] = 99` |
| **4. Size / Length** | `arr.length` (or `.size()`) | `arr.size()` | `len(arr)` |

### Traversing an Array (Visiting Every Element)

```java
// ☕ Java
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}
```
```cpp
// ⚙️ C++
for (int i = 0; i < arr.size(); i++) {
    cout << arr[i] << "\n";
}
```
```python
# 🐍 Python
for i in range(len(arr)):
    print(arr[i])
```

---

## 3. ⭐ Fixed Array vs. Dynamic Array

| Type | ☕ Java | ⚙️ C++ | 🐍 Python | Behavior |
|---|---|---|---|---|
| **Fixed Array** | `int[] arr = new int[5];` | `int arr[5];` | *(Not native)* | Fixed capacity upon creation. |
| **Dynamic Array** | `ArrayList<Integer> list` | `vector<int> vec` | `list = []` | Expands capacity automatically. |

### Dynamic Array Common Methods

```java
// ☕ Java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);          // Add to end
int val = list.get(0); // Read
list.set(0, 99);       // Update
```
```cpp
// ⚙️ C++
vector<int> vec;
vec.push_back(10);     // Add to end
int val = vec[0];      // Read
vec[0] = 99;           // Update
```
```python
# 🐍 Python
lst = []
lst.append(10)         # Add to end
val = lst[0]           # Read
lst[0] = 99            # Update
```

---

## 4. ⚡ Complexity at a Glance

| Operation | Time Complexity | Intuition |
|---|:---:|---|
| **Read (`arr[i]`)** | $O(1)$ | Direct jump to locker via index. |
| **Update (`arr[i] = x`)** | $O(1)$ | Direct jump and overwrite. |
| **Search (unsorted)** | $O(n)$ | Must check every locker one-by-one. |
| **Insert at End (Dynamic)** | **$O(1)$ amortized** | Instant most of the time; occasionally resizes internal memory ($O(n)$). |
| **Insert/Delete at Start** | $O(n)$ | Must shift all existing elements right or left. |

---

## 5. 💡 CORE PATTERN: Two Pointers (Converging)

> 💡 **What is a "Pointer"?**  
> In Java and Python, there are no C++ memory pointers. In DSA, "Two Pointers" simply means **two integer index variables** (like `left` and `right`) tracking array positions.

```text
Index:    0    1    2    3    4
Array:  [10,  20,  30,  40,  50]
          ▲                   ▲
          │                   │
      left = 0           right = 4
```

### 🔎 Recognition Clues:
- Array is **sorted**.
- Searching for a **pair** matching a target sum.
- Need to reverse or swap elements from outside inward.

---

# 🚀 ESSENTIAL PRACTICE: 3 High-Impact Problems

---

### 🟢 Level 1 (Warmup): Find Maximum Element
**Problem:** Return the largest number in an array.  
*Example:* `[12, 35, 1, 10, 34]` $\longrightarrow$ Output: `35`.

#### 💡 Intuition
Start by assuming `arr[0]` is the maximum (`max`). Check every other element: if a number is bigger, update `max`.

```text
Trace: [12, 35, 1, 10, 34]
Start: max = 12
i = 1: 35 > 12  -> max = 35
i = 2: 1  < 35  -> max = 35
i = 3: 10 < 35  -> max = 35
i = 4: 34 < 35  -> max = 35
Result: 35
```

#### 💻 Multi-Language Implementations

```java
// ☕ Java
public static int findMax(int[] arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}
```

```cpp
// ⚙️ C++
int findMax(const vector<int>& arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
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

#### ⏱ Complexity — All Implementations
- **Time:** $O(n)$ — Single pass over $n$ elements.
- **Space:** $O(1)$ — Only one variable (`maxVal`).

#### ⚠️ Common Mistake
Initializing `maxVal = 0`. If all numbers are negative (`[-5, -12, -2]`), `0` will be returned incorrectly. Always start with `arr[0]`.

---

### 🟡 Level 2 (Pattern Building): Move Zeroes to End (LeetCode 283)
**Problem:** Move all `0`s to the end of the array in-place while preserving the relative order of non-zero numbers.  
*Example:* `[0, 1, 0, 3, 12]` $\longrightarrow$ Output: `[1, 3, 12, 0, 0]`.

#### 💡 Intuition (Scanning Index + Write Position)
Use two indices:
- `insertPos`: Tracks where the next non-zero number should be placed.
- `i`: Scans each element in the array.

Whenever `arr[i]` is not zero, write it to `arr[insertPos]` and increment `insertPos`. Finally, fill all slots from `insertPos` to the end with zeros.

```text
Scan non-zeros:   [1, 3, 12,  ?,  ?]   (insertPos stopped at index 3)
Fill zeros:       [1, 3, 12,  0,  0]
```

#### 💻 Multi-Language Implementations

```java
// ☕ Java
public static void moveZeroes(int[] nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
}
```

```cpp
// ⚙️ C++
void moveZeroes(vector<int>& nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.size()) {
        nums[insertPos++] = 0;
    }
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

#### ⏱ Complexity — All Implementations
- **Time:** $O(n)$ — One pass to shift non-zeros, one short pass to fill zeros.
- **Space:** $O(1)$ — Modified in-place with no auxiliary array.

#### ⚠️ Common Mistake
Deleting elements inside a loop (e.g. `list.remove(i)`). Deleting from an array shifts all subsequent elements left, causing an unwanted $O(n^2)$ slowdown.

---

### 🔴 Level 3 (Interview Classic): Two Sum II — Sorted Array (LeetCode 167)
**Problem:** Given a **sorted** array, find two numbers that add up to `target`. Return 1-based indices.  
*Example:* `nums = [2, 7, 11, 15]`, `target = 9` $\longrightarrow$ Output: `[1, 2]`.

#### 💡 Intuition (Two Pointers Converging)
Because the array is sorted, start one pointer at the beginning (`left`) and one at the end (`right`):
- If `sum == target` $\longrightarrow$ Found pair!
- If `sum > target` $\longrightarrow$ Sum is too large; decrement `right--` to pick a smaller value.
- If `sum < target` $\longrightarrow$ Sum is too small; increment `left++` to pick a larger value.

```text
[ 2,   7,  11,  15 ]    target = 9
  ▲              ▲      2 + 15 = 17 (> 9) -> move right inward
  left         right

[ 2,   7,  11,  15 ]    2 + 11 = 13 (> 9) -> move right inward
  ▲        ▲
  left   right

[ 2,   7,  11,  15 ]    2 + 7 = 9 (== 9)  -> MATCH! Return [1, 2]
  ▲    ▲
```

#### 💻 Multi-Language Implementations

```java
// ☕ Java
public static int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum > target) right--;
        else left++;
    }
    return new int[]{};
}
```

```cpp
// ⚙️ C++
vector<int> twoSum(const vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum > target) right--;
        else left++;
    }
    return {};
}
```

```python
# 🐍 Python
def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum > target:
            right -= 1
        else:
            left += 1
    return []
```

#### ⏱ Complexity — All Implementations
- **Time:** $O(n)$ — Pointers step inward at most $n$ times.
- **Space:** $O(1)$ — Only two index variables (`left`, `right`).

#### ⚠️ Common Mistake
Returning 0-based indices `[0, 1]` when the problem specifically asks for 1-based indexing `[1, 2]`.

---

## 🎯 QUICK CHECK (30 Seconds)

1. What is the index of the last element in an array of size $n$?
2. What is the time complexity of `arr[5]`?
3. Why is appending to an ArrayList / Vector considered **$O(1)$ amortized**?
4. When should you use the Two Pointers (Converging) pattern?

*Answers:* 1. $n - 1$ | 2. $O(1)$ | 3. Most inserts are instant, but occasional memory resizings take $O(n)$ | 4. When an array is sorted and you need to find a pair matching a target.

---

## ⚡ 1-PAGE REVISION: ARRAYS

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ARRAYS SUMMARY CARD                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ • CORE IDEA: Ordered collection with instant O(1) index access.             │
│ • INDEXING: Starts at 0. Last element is at size - 1.                       │
│ • TIME COMPLEXITIES:                                                        │
│     - Read / Update: O(1) [Instant]                                         │
│     - Search (unsorted): O(n)                                               │
│     - Dynamic Append: O(1) amortized                                        │
│     - Insert / Delete at start: O(n) [Requires shifting elements]           │
│                                                                             │
│ • SYNTAX QUICK REF:                                                         │
│     - Java:   int[] arr = {1, 2};  arr.length;  list.add();  list.get(i);   │
│     - C++:    vector<int> a={1, 2}; a.size();    a.push_back(); a[i];       │
│     - Python: a = [1, 2];          len(a);      a.append();    a[i];        │
│                                                                             │
│ • CORE PATTERNS:                                                            │
│     - Two Pointers (Converging): left = 0, right = n - 1 (Sorted pairs)     │
│     - Scanning + Write Index: in-place overwrite (e.g. Move Zeroes)         │
│                                                                             │
│ • GOLDEN INTERVIEW RULE:                                                    │
│     "If the array is sorted, ALWAYS consider Two Pointers or Binary Search."│
└─────────────────────────────────────────────────────────────────────────────┘
```
