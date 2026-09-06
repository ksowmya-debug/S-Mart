import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Lock, Eye, CheckCircle2, ChevronRight, FileText, ArrowRight, Shield, Code, Sparkles, Smartphone, Layers } from 'lucide-react';

const FiveQuestionsCard = ({ what, why, how, when, recognize }) => (
  <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/60 border border-blue-200/90 rounded-2xl p-3.5 sm:p-5 text-xs space-y-2.5 shadow-xs break-words">
    <div className="flex items-center justify-between pb-2 border-b border-blue-200/70">
      <span className="font-extrabold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
        <Sparkles size={13} className="text-blue-600" />
        THE 5 CORE QUESTIONS ANSWERED
      </span>
      <span className="text-[10px] font-bold text-blue-700 bg-white/80 px-2 py-0.5 rounded-full border border-blue-100">
        Framework
      </span>
    </div>
    <div className="space-y-2 text-[#334155]">
      <div>
        <span className="font-bold text-blue-950">1. WHAT is this? </span>
        <span>{what}</span>
      </div>
      <div>
        <span className="font-bold text-blue-950">2. WHY do we need it? </span>
        <span>{why}</span>
      </div>
      <div>
        <span className="font-bold text-blue-950">3. HOW does it work? </span>
        <span>{how}</span>
      </div>
      <div>
        <span className="font-bold text-blue-950">4. WHEN should I use it? </span>
        <span>{when}</span>
      </div>
      <div>
        <span className="font-bold text-blue-950">5. HOW do I recognize it in problems? </span>
        <span>{recognize}</span>
      </div>
    </div>
  </div>
);

const PreviewPage = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [activeLang, setActiveLang] = useState('java'); // java | cpp | python
  const [ordering, setOrdering] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Deterrent copy protection for course content
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isInput) return; // Allow normal input/textarea typing & shortcuts

      const isMac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;

      if (modifierKey) {
        const key = e.key ? e.key.toLowerCase() : '';
        if (['c', 'x', 'u', 's', 'a'].includes(key)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBuy = async () => {
    if (!isAuthenticated) {
      navigate('/register?redirect=pay');
      return;
    }

    try {
      setOrdering(true);
      const { data } = await API.post('/api/orders', {});
      navigate(`/pay/${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      console.error('Order creation error:', err);
      if (err.response?.data?.alreadyOwned) {
        navigate('/dashboard');
      } else {
        navigate('/pay');
      }
    } finally {
      setOrdering(false);
    }
  };

  const pagesData = [
    {
      id: 1,
      moduleNum: '00',
      title: 'Part 0: Foundations & Big-O Intuition',
      subtitle: 'Zero Math Formulas * Growth Curves Demystified',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Module 00 - Core Foundations
            </span>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Big-O Complexity Without Scary Math
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Big-O does not measure seconds on a stopwatch. It measures how operation count grows as input size (n) scales to infinity.
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="A mathematical notation that describes how the execution time or memory of an algorithm scales as input size (n) grows to infinity."
            why="Stopwatch time varies with CPU hardware; Big-O provides a universal, hardware-independent standard for algorithm efficiency."
            how="Count dominant loops/operations, discard constant factors (O(3n) becomes O(n)), and keep only the highest-order term."
            when="Analyze complexity before coding to ensure the algorithm satisfies interview time limits (usually 10^8 operations per second)."
            recognize="Check input limits: n <= 10^5 demands O(n) or O(n log n); n <= 1000 permits O(n^2); n <= 20 permits O(2^n)."
          />

          {/* Visual Dry Run */}
          <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl text-slate-200 shadow-inner space-y-3 font-mono">
            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Operation Growth Comparison (Fastest to Slowest)
            </h3>
            <pre className="text-xs text-cyan-200 overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
{`Operations
  n^2 |            /  O(n^2)   [Slow: Nested Loops]
  n   |          /    O(n)     [Fair: Single Loop]
log n | -------       O(log n) [Very Fast: Halving candidates]
  1   | =======       O(1)     [Constant: Direct Index Jump]
      +--------------------> Input Size (n)`}
            </pre>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
              <span className="font-bold text-emerald-800 text-sm">O(1) Constant:</span>
              <p className="text-[#475569] mt-1">Direct jump to locker via index. Execution time stays the same whether n=10 or n=10,000,000.</p>
            </div>
            <div className="p-4 bg-cyan-50/70 rounded-2xl border border-cyan-200">
              <span className="font-bold text-cyan-800 text-sm">O(log n) Logarithmic:</span>
              <p className="text-[#475569] mt-1">Cuts search space in half every single step. Like looking up a word in an alphabetical dictionary.</p>
            </div>
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="font-bold text-amber-800 text-sm">O(n) Linear:</span>
              <p className="text-[#475569] mt-1">Visiting every item once. A single for-loop traversing an array of size n.</p>
            </div>
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200">
              <span className="font-bold text-rose-800 text-sm">O(n²) Quadratic:</span>
              <p className="text-[#475569] mt-1">Nested loops comparing all pairs. For n=1,000, operations explode to 1,000,000.</p>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">💡 Two Golden Simplification Rules:</p>
            <p>1. <strong>Drop Constants:</strong> O(2n) simplifies to O(n). O(500) simplifies to O(1).</p>
            <p>2. <strong>Keep Dominant Term:</strong> O(n² + 100n) simplifies directly to O(n²).</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      moduleNum: '01',
      title: 'Part 1: Arrays & Two Pointers Converging',
      subtitle: 'Hallway Lockers • Two Sum II (LeetCode 167)',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start">
                Module 01 • Arrays
              </span>
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang('java')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'java' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ☕ Java
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('cpp')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'cpp' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ⚙️ C++
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'python' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  🐍 Python
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Two Sum II — Sorted Array (LeetCode 167)
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Two Pointers converging inward drops naive O(n²) brute-force nested loops down to clean linear O(n) time!
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="Contiguous memory storing identical data types at index locations 0 to n-1."
            why="Direct memory pointer calculation (base + index * elementSize) gives instant O(1) random reads."
            how="Fixed arrays lock capacity. Dynamic arrays (ArrayList) allocate 2x memory and copy elements when full."
            when="Use when lookups by numeric index are frequent, elements are ordered, or doing sequential buffer scans."
            recognize="Keywords: 'sorted array', 'pair with target sum', 'two pointers', 'contiguous subarray', 'sliding window'."
          />

          {/* Visual Dry Run */}
          <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl text-slate-200 shadow-inner font-mono text-xs">
            <p className="text-cyan-300 font-bold mb-2">Visual Dry Run (Target = 9):</p>
            <pre className="text-cyan-200 overflow-x-auto leading-relaxed">
{`[ 2,   7,  11,  15 ]   target = 9
  ▲              ▲     2 + 15 = 17 (> 9) -> sum too large, move right inward (right--)
 left          right
[ 2,   7,  11,  15 ]   2 + 7 = 9 (EXACT MATCH!) -> return [1, 2]
  ▲    ▲`}
            </pre>
          </div>

          {/* Multi-language Code Block */}
          <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                {activeLang === 'java' && '☕ Java Solution (Primary)'}
                {activeLang === 'cpp' && '⚙️ C++ Solution'}
                {activeLang === 'python' && '🐍 Python Solution'}
              </span>
              <span className="text-slate-400 text-[11px]">Clean & Interview-Ready</span>
            </div>
            <pre className="text-slate-100 overflow-x-auto p-3 bg-black/50 rounded-xl leading-relaxed">
              {activeLang === 'java' &&
`public static int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum > target) right--; // sum too large
        else left++;                   // sum too small
    }
    return new int[]{};
}`}
              {activeLang === 'cpp' &&
`vector<int> twoSum(const vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum > target) right--;
        else left++;
    }
    return {};
}`}
              {activeLang === 'python' &&
`def two_sum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum > target:
            right -= 1
        else:
            left += 1
    return []`}
            </pre>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">⏱ Shared Complexity: Time O(n) | Space O(1)</p>
            <p>💡 <span className="text-cyan-700 font-semibold">Beginner Tip:</span> In DSA, "two pointers" does not mean C memory pointers. It simply means two index integer variables (like <code>left</code> and <code>right</code>) that move along the array!</p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      moduleNum: '02',
      title: 'Part 2: Strings & 26-Bucket Array',
      subtitle: 'Character Arithmetic • Valid Anagram (LeetCode 242)',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start">
                Module 02 • Strings
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang('java')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'java' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ☕ Java
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('cpp')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'cpp' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ⚙️ C++
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'python' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  🐍 Python
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Valid Anagram (LeetCode 242)
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Using the 26-element alphabet frequency array: character arithmetic <code>'c' - 'a'</code> maps directly to index 2 in O(1) space!
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="Ordered sequence of characters. In Java/Python, strings are immutable (cannot be edited in-place)."
            why="Text operations are fundamental to software, but string concatenation inside loops causes hidden O(n^2) allocations."
            how="Use StringBuilder for O(1) appends. Use a 26-slot integer array for character frequency comparisons."
            when="Use 26-element array whenever input characters are bounded to lowercase English letters (a-z)."
            recognize="Keywords: 'anagram', 'palindrome', 'substring', 'character frequency', 'ASCII arithmetic'."
          />

          {/* Multi-language Code Block */}
          <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                {activeLang === 'java' && '☕ Java Solution'}
                {activeLang === 'cpp' && '⚙️ C++ Solution'}
                {activeLang === 'python' && '🐍 Python Solution'}
              </span>
              <span className="text-slate-400 text-[11px]">O(1) Fixed Space</span>
            </div>
            <pre className="text-slate-100 overflow-x-auto p-3 bg-black/50 rounded-xl leading-relaxed">
              {activeLang === 'java' &&
`public static boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`}
              {activeLang === 'cpp' &&
`bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`}
              {activeLang === 'python' &&
`def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - 97] += 1
        count[ord(t[i]) - 97] -= 1
    return all(c == 0 for c in count)`}
            </pre>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">⏱ Shared Complexity: Time O(n) | Space O(1)</p>
            <p>⚠️ <span className="text-rose-600 font-bold">Java Crucial Pitfall:</span> Never compare strings using <code>==</code> (which compares memory addresses). Always use <code>s.equals(t)</code>!</p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      moduleNum: '05',
      title: 'Part 5: Linked Lists & 3-Pointer Reversal',
      subtitle: 'Train Compartments • Reverse List (LeetCode 206)',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start">
                Module 05 • Linked Lists
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang('java')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'java' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ☕ Java
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('cpp')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'cpp' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ⚙️ C++
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'python' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  🐍 Python
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Reverse Linked List (LeetCode 206)
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Rewiring train compartment couplings in-place using 3 pointers: <code>prev</code>, <code>curr</code>, and <code>nextNode</code>.
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="Linear collection of nodes where each node stores data and a reference (next) to the following node."
            why="Arrays require contiguous memory blocks. Linked lists allow O(1) head insertions without memory copying."
            how="Rewire pointers in-place. Always save curr.next into a temporary variable before reversing the pointer link!"
            when="Use when constant-time insertion/deletion at endpoints is needed (Queues, LRU Cache, undo stacks)."
            recognize="Keywords: 'node.next', 'reverse list', 'detect cycle', 'merge two sorted lists', 'remove nth from end'."
          />

          {/* Visual Diagram */}
          <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl text-slate-200 shadow-inner font-mono text-xs">
            <p className="text-cyan-300 font-bold mb-2">Pointer Rewiring Visual:</p>
            <pre className="text-cyan-200 overflow-x-auto leading-relaxed">
{`Before:  prev(null)    curr(1) ---> [ 2 ] ---> [ 3 ]
Step:    nextNode = curr.next; curr.next = prev; prev = curr; curr = nextNode;
After:   null <--- [ 1 ] (prev)    curr(2) ---> [ 3 ]`}
            </pre>
          </div>

          {/* Code */}
          <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                {activeLang === 'java' && '☕ Java Solution'}
                {activeLang === 'cpp' && '⚙️ C++ Solution'}
                {activeLang === 'python' && '🐍 Python Solution'}
              </span>
              <span className="text-slate-400 text-[11px]">O(1) Memory In-Place</span>
            </div>
            <pre className="text-slate-100 overflow-x-auto p-3 bg-black/50 rounded-xl leading-relaxed">
              {activeLang === 'java' &&
`public static ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode nextNode = curr.next; // 1. Save ahead
        curr.next = prev;              // 2. Reverse arrow
        prev = curr;                   // 3. Move prev forward
        curr = nextNode;               // 4. Move curr forward
    }
    return prev; // New head of reversed list
}`}
              {activeLang === 'cpp' &&
`ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`}
              {activeLang === 'python' &&
`def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`}
            </pre>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">⏱ Shared Complexity: Time O(n) | Space O(1)</p>
            <p>💡 <span className="text-cyan-700 font-semibold">Mental Model:</span> Always save <code>curr.next</code> before breaking the arrow, otherwise you lose the rest of the train forever!</p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      moduleNum: '08',
      title: 'Part 8: Hashing & Two Sum (Unsorted)',
      subtitle: 'Phone Contact Book • Two Sum in One Pass',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start">
                Module 08 • Hashing
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang('java')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'java' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ☕ Java
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('cpp')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'cpp' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ⚙️ C++
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'python' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  🐍 Python
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Two Sum (LeetCode 1) — Unsorted Array
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              One-pass HashMap storing the complement (<code>target - num</code>) for instantaneous O(1) lookup.
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="Key-value mapping data structure converting keys into integer memory indices using a hash function."
            why="Replaces slow O(n) linear scans with instant O(1) average lookup, insertion, and deletion."
            how="Key -> hashCode() -> bucket index. Collisions are handled via separate chaining (linked list / tree)."
            when="Use whenever you need fast lookups, frequency counting, duplicate tracking, or pair matching by complement."
            recognize="Keywords: 'two sum', 'count frequency', 'contains duplicate', 'first unique', 'group anagrams'."
          />

          {/* Code Block */}
          <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                {activeLang === 'java' && '☕ Java Solution'}
                {activeLang === 'cpp' && '⚙️ C++ Solution'}
                {activeLang === 'python' && '🐍 Python Solution'}
              </span>
              <span className="text-slate-400 text-[11px]">The #1 Interview Classic</span>
            </div>
            <pre className="text-slate-100 overflow-x-auto p-3 bg-black/50 rounded-xl leading-relaxed">
              {activeLang === 'java' &&
`public static int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`}
              {activeLang === 'cpp' &&
`vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`}
              {activeLang === 'python' &&
`def two_sum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []`}
            </pre>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">⏱ Shared Complexity: Time O(n) | Space O(n)</p>
            <p>💡 <span className="text-cyan-700 font-semibold">Golden Rule:</span> When the array is unsorted and you need pair matching in linear time, HashMap is your go-to pattern.</p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      moduleNum: '13',
      title: 'Part 13: Dynamic Programming (DP)',
      subtitle: 'Remembering Answers • Climbing Stairs (LeetCode 70)',
      isLocked: false,
      render: () => (
        <div className="space-y-6 text-sm">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black tracking-wider text-cyan-600 uppercase bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start">
                Module 13 • Dynamic Programming
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang('java')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'java' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ☕ Java
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('cpp')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'cpp' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  ⚙️ C++
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                    activeLang === 'python' ? 'bg-cyan-600 text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  🐍 Python
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] mt-3">
              Climbing Stairs (LeetCode 70) — O(1) Space DP
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              DP is simply: <em>Remembering answers to subproblems so you never re-calculate them!</em>
            </p>
          </div>

          {/* The 5 Questions Answered */}
          <FiveQuestionsCard
            what="Optimization method that breaks complex problems into overlapping subproblems and caches results."
            why="Naive recursion recalculates identical subproblems exponentially (O(2^n)). DP remembers them in O(n) polynomial time."
            how="Follow the 5-Step Framework: 1. State definition, 2. Base case, 3. Recurrence relation, 4. Order of execution, 5. Space optimize."
            when="Use when a problem displays both Overlapping Subproblems and Optimal Substructure."
            recognize="Keywords: 'min/max cost', 'number of unique ways', 'longest common subsequence', 'knapsack', 'partition'."
          />

          {/* Diagram */}
          <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl text-slate-200 shadow-inner font-mono text-xs">
            <p className="text-cyan-300 font-bold mb-2">Duplicate Work in Naive Recursion:</p>
            <pre className="text-cyan-200 overflow-x-auto leading-relaxed">
{`               climb(5)
              /        \\
          climb(4)     climb(3)  <--- Duplicate branch calculated twice!
          /      \\     /      \\
      climb(3) climb(2)climb(2) climb(1) -> Store previously computed answers in variables!`}
            </pre>
          </div>

          {/* Code */}
          <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                {activeLang === 'java' && '☕ Java Solution'}
                {activeLang === 'cpp' && '⚙️ C++ Solution'}
                {activeLang === 'python' && '🐍 Python Solution'}
              </span>
              <span className="text-slate-400 text-[11px]">Space-Optimized O(1)</span>
            </div>
            <pre className="text-slate-100 overflow-x-auto p-3 bg-black/50 rounded-xl leading-relaxed">
              {activeLang === 'java' &&
`public static int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`}
              {activeLang === 'cpp' &&
`int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`}
              {activeLang === 'python' &&
`def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1`}
            </pre>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs text-[#334155] space-y-1">
            <p className="font-bold text-[#0F172A]">⏱ Shared Complexity: Time O(n) | Space O(1)</p>
            <p>💡 <span className="text-cyan-700 font-semibold">Takeaway:</span> Notice we don't need a full array of size n. We only ever need the last two steps!</p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      moduleNum: '14',
      title: 'Part 14: 14 Master Interview Patterns',
      subtitle: 'Two Pointers, Sliding Window, Fast & Slow, Monotonic Stack',
      isLocked: true,
      blurTitle: 'The 14 Master Interview Patterns & Recognition Guide',
    },
    {
      id: 8,
      moduleNum: '15',
      title: 'Part 15: 30/60/90-Day Roadmaps & Playbook',
      subtitle: 'FAANG Interview Strategy, Cheat Sheets & Final Checklist',
      isLocked: true,
      blurTitle: '30/60/90-Day Step-by-Step Study Roadmaps & Live Interview Checklist',
    },
  ];

  const selectedPage = pagesData.find((p) => p.id === selectedId) || pagesData[0];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-xs">
            <Eye size={14} className="text-cyan-500" /> Interactive Sample Reader
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Notes <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Preview</span>
          </h1>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Browse through core modules from the official <span className="text-cyan-600 font-bold">DSA Demystified</span> digital book. Switch between ☕ Java, ⚙️ C++, and 🐍 Python solutions!
          </p>
        </div>

        {/* Mobile Module Quick Bar (< lg screens) */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
              Select Module
            </span>
            <span className="text-[11px] text-cyan-700 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
              Mod {selectedPage.moduleNum} Active
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {pagesData.map((page) => {
              const isSelected = selectedId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => setSelectedId(page.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                    isSelected
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300'
                  }`}
                >
                  <span>Mod {page.moduleNum}</span>
                  {page.isLocked ? <Lock size={12} className="opacity-70" /> : <FileText size={12} className="opacity-70" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Preview Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Module Thumbnails */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                Course Modules
              </h3>
              <span className="text-[11px] text-cyan-700 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
                16 Modules Total
              </span>
            </div>

            {pagesData.map((page) => {
              const isSelected = selectedId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => setSelectedId(page.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/80 border-cyan-500 shadow-[0_4px_20px_rgba(6,182,212,0.15)] ring-2 ring-cyan-200'
                      : 'bg-white border-slate-200/80 hover:border-cyan-300 text-[#475569] shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {page.moduleNum}
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-[#0F172A]' : 'text-slate-800'}`}>
                        {page.title}
                      </h4>
                      <p className="text-[11px] text-[#475569] mt-0.5 truncate max-w-[200px]">
                        {page.subtitle}
                      </p>
                    </div>
                  </div>

                  {page.isLocked ? (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 ml-2">
                      <Lock size={13} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 ml-2">
                      <FileText size={13} />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Quick Pricing Summary Card on Left */}
            <div className="bg-white border border-cyan-200 rounded-3xl p-6 shadow-[0_10px_30px_rgba(6,182,212,0.06)] space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-cyan-600 tracking-wider">
                  Complete Digital Book
                </span>
                <span className="text-2xl font-black text-[#0F172A]">₹39</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Get full instant access to all 16 modules, 14 master interview patterns, 30/60/90-day roadmaps, and phone-first PDF download!
              </p>
              <button
                onClick={handleBuy}
                disabled={ordering}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{ordering ? 'Generating Order...' : 'Get Instant Access — ₹39'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Viewer: Active Page Mockup */}
          <div className="order-1 lg:order-2 lg:col-span-8 min-w-0 max-w-full w-full">
            <div
              className="relative bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] min-h-[520px] flex flex-col justify-between overflow-hidden select-none min-w-0 max-w-full"
              onContextMenu={(e) => {
                const t = e.target;
                if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
                e.preventDefault();
              }}
              onCopy={(e) => {
                const t = e.target;
                if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
                e.preventDefault();
              }}
            >
              
              {/* Reader Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                  <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs font-mono text-slate-500 flex items-center gap-1.5 truncate">
                    <Smartphone size={13} className="text-cyan-600 shrink-0" />
                    DSA_DEMYSTIFIED_PHONE_FIRST.pdf — Mod {selectedPage.moduleNum}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-wide">
                  SOWMYA.KCODE
                </span>
              </div>

              {/* Page Content / Locked View */}
              {selectedPage.isLocked ? (
                <div className="relative my-auto flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-xs">
                    <Lock size={32} />
                  </div>

                  <div className="max-w-md space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100 inline-block">
                      Module {selectedPage.moduleNum} Locked
                    </span>
                    <h3 className="text-2xl font-black text-[#0F172A]">
                      {selectedPage.blurTitle}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      This premium module and all 16 modules, 14 interview pattern templates, and roadmaps are unlocked instantly upon purchase.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleBuy}
                      disabled={ordering}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base shadow-md hover:shadow-cyan-200/50 transition active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Unlock with Full Access — ₹39</span>
                      <ArrowRight size={18} />
                    </button>
                    <p className="text-xs text-slate-500 mt-2.5">
                      Instant unlock after UPI scan • Immediate high-quality PDF download
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 my-2">
                  {selectedPage.render()}
                </div>
              )}

              {/* Reader Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <span>◈ SOWMYA.KCODE Phone-First Learning Series</span>
                <span className="text-cyan-600 font-bold">
                  Java • C++ • Python Multi-Language Edition
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PreviewPage;
