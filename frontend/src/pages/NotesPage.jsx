import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ArrowRight, Sparkles, Layers, Award } from 'lucide-react';

const chapters = [
  {
    num: '00',
    title: 'Foundations & Big-O Intuition',
    pages: 'Part 0',
    topics: ['Why Data Structures Matter', 'Big-O Growth Curves (Zero Math)', 'The 4 Core Complexities: O(1), O(log n), O(n), O(n²)', 'Time vs Space Tradeoffs'],
  },
  {
    num: '01',
    title: 'Arrays & Two Pointers',
    pages: 'Part 1',
    topics: ['The School Lockers Mental Model', 'Fixed Array vs Dynamic Array', 'O(1) Amortized Append Explained', 'Two Pointers Converging (Two Sum II)', 'Move Zeroes (Scanning + Write Position)'],
  },
  {
    num: '02',
    title: 'Strings & Character Manipulation',
    pages: 'Part 2',
    topics: ['String Immutability & StringBuilder', 'The 26-Bucket Alphabet Array', 'Valid Anagram Multi-Language Implementation', 'ASCII Arithmetic tricks'],
  },
  {
    num: '03',
    title: 'Searching Algorithms',
    pages: 'Part 3',
    topics: ['Linear Search vs Halving with Binary Search', 'The 3 Binary Search Invariants', 'mid = low + (high - low) / 2', 'Binary Search in ☕ Java, ⚙️ C++, 🐍 Python'],
  },
  {
    num: '04',
    title: 'Sorting Algorithms',
    pages: 'Part 4',
    topics: ['Bubble, Selection, Insertion Visual Traces', 'Merge Sort Divide & Conquer Tree', 'Quick Sort Lomuto Partitioning', 'When to use built-in sorts'],
  },
  {
    num: '05',
    title: 'Linked Lists & Pointer Rewiring',
    pages: 'Part 5',
    topics: ['Train Compartment Heap Model', 'Node & Reference Foundations', 'Reverse Linked List (3-Pointer Trace)', 'Floyd’s Fast & Slow Cycle Detection'],
  },
  {
    num: '06',
    title: 'Stacks (LIFO)',
    pages: 'Part 6',
    topics: ['Cafeteria Plate Dispenser Model', 'ArrayDeque vs Legacy Stack', 'Valid Parentheses (LeetCode 20)', 'Monotonic Stack Pattern'],
  },
  {
    num: '07',
    title: 'Queues & Deques (FIFO)',
    pages: 'Part 7',
    topics: ['Grocery Checkout Line Model', 'Queue via LinkedList / ArrayDeque', 'Circular Queue Modulo Math', 'Sliding Window Maximum Deque'],
  },
  {
    num: '08',
    title: 'Hashing & HashMaps',
    pages: 'Part 8',
    topics: ['The Phone Contact Book Model', 'O(1) Average Lookups & Hash Codes', 'Two Sum (Unsorted) with Complement Map', 'HashSet vs HashMap'],
  },
  {
    num: '09',
    title: 'Recursion & Backtracking',
    pages: 'Part 9',
    topics: ['Russian Nesting Dolls Model', 'Factorial Call Stack Step-by-Step', 'Base Case vs Recursive Step', 'Backtracking: Choose -> Explore -> Unchoose'],
  },
  {
    num: '10',
    title: 'Trees & Binary Search Trees (BST)',
    pages: 'Part 10',
    topics: ['Organizational Chart Hierarchy', 'Preorder, Inorder, Postorder Visuals', 'BST Invariant (Left < Root < Right)', 'Max Depth & Height of Tree'],
  },
  {
    num: '11',
    title: 'Heaps & Priority Queues',
    pages: 'Part 11',
    topics: ['ER Hospital Triage Model', 'Min-Heap vs Max-Heap in 3 Languages', 'Top K Frequent Elements (LeetCode 347)', 'Array-backed Complete Binary Trees'],
  },
  {
    num: '12',
    title: 'Graphs & Networks',
    pages: 'Part 12',
    topics: ['Airports & Connecting Flights Model', 'Adjacency List vs Matrix', 'BFS Shortest Path (Queue Engine)', 'DFS Number of Islands (LeetCode 200)'],
  },
  {
    num: '13',
    title: 'Dynamic Programming (DP)',
    pages: 'Part 13',
    topics: ['Remembering Answers Mental Model', 'Fibonacci Duplicate Work Tree', 'Climbing Stairs O(1) Space Solution', 'The 5-Step DP Master Framework'],
  },
  {
    num: '14',
    title: 'The 14 Master Coding Patterns',
    pages: 'Part 14',
    topics: ['Two Pointers, Sliding Window, Fast & Slow', 'Merge Intervals, Cyclic Sort, In-place Reversal', 'Two Heaps, Subsets, Modified Binary Search', 'Pattern Recognition Cheat Sheets'],
  },
  {
    num: '15',
    title: 'Roadmaps & Interview Playbook',
    pages: 'Part 15',
    topics: ['30-Day Beginner Action Plan', '60-Day Core Competence Plan', '90-Day FAANG Mastery Plan', 'The 6-Step Live Technical Interview Strategy'],
  },
];

const NotesPage = () => {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-4 shadow-xs">
            <BookOpen size={14} className="text-cyan-500" /> Complete 16-Module Curriculum
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Detailed Course <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Curriculum</span>
          </h1>
          <p className="mt-4 text-[#475569] text-base sm:text-lg leading-relaxed">
            Every single topic is broken down with step-by-step logic, hand-drawn ASCII diagrams, Big-O complexity tables, and multi-language code patterns in ☕ Java, ⚙️ C++, and 🐍 Python.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pay"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base shadow-md transition-all active:scale-95 text-center"
            >
              Get DSA Notes — ₹39
            </Link>
            <Link
              to="/preview"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-slate-300 hover:border-cyan-300 text-[#0F172A] font-bold text-base shadow-xs transition text-center"
            >
              Sample Interactive Reader
            </Link>
          </div>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((ch, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-cyan-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.08)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 sm:pb-4 mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs font-black px-2.5 sm:px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 shrink-0">
                    Mod {ch.num}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-[#0F172A]">{ch.title}</h3>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{ch.pages}</span>
              </div>

              <ul className="space-y-2.5">
                {ch.topics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155]">
                    <CheckCircle size={15} className="text-cyan-600 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 border border-cyan-200/80 rounded-3xl p-8 sm:p-12 shadow-[0_15px_40px_rgba(6,182,212,0.08)]">
          <Award size={40} className="text-cyan-600 mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            Ready to crack your technical interview?
          </h3>
          <p className="text-[#475569] mt-2 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Get instant lifetime access to all 16 modules, 14 master pattern templates, multi-language solutions, and 30/60/90-day roadmaps for just ₹39.
          </p>
          <div className="mt-6">
            <Link
              to="/pay"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base shadow-md transition-all active:scale-95"
            >
              <span>Unlock Full Notes for ₹39</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotesPage;
