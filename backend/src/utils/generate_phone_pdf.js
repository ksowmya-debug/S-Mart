import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePhoneFirstDsaPdf = () => {
  return new Promise((resolve, reject) => {
    const dir = path.resolve('src/storage/secure_notes');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const outputPath = path.join(dir, 'dsa_notes.pdf');

    // Phone-First Dimensions: 420pt wide x 750pt high (ideal vertical phone reading ratio)
    const doc = new PDFDocument({
      size: [420, 750],
      margins: { top: 24, bottom: 20, left: 24, right: 24 },
      bufferPages: true,
      autoFirstPage: true,
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Color Palette - Professional Royal Blue Design System
    const ROYAL_BLUE = '#1D4ED8';
    const NAVY_HEADER = '#0F172A';
    const CARD_BG_BLUE = '#EFF6FF';
    const CARD_BORDER_BLUE = '#BFDBFE';
    const CARD_BG_GREEN = '#F0FDF4';
    const CARD_BORDER_GREEN = '#BBF7D0';
    const CARD_BG_AMBER = '#FFFBEB';
    const CARD_BORDER_AMBER = '#FDE68A';
    const CARD_BG_ROSE = '#FEF2F2';
    const CARD_BORDER_ROSE = '#FECACA';
    const CODE_BG = '#0F172A';
    const CODE_CYAN = '#38BDF8';
    const TEXT_MAIN = '#1E293B';
    const TEXT_MUTED = '#64748B';

    const pageWidth = 420;
    const contentWidth = pageWidth - 48; // 372pt

    // Helper: Chapter Header Card
    const drawChapterHeader = (partNum, title) => {
      const startY = 24;
      doc.roundedRect(24, startY, contentWidth, 26, 6).fill(ROYAL_BLUE);
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9.5)
         .text(`${partNum} : ${title.toUpperCase()}`, 32, startY + 7, { width: contentWidth - 16, lineBreak: false });
      doc.y = startY + 32;
    };

    // Helper: The 5 Questions & Answers Card
    const drawFiveQuestionsCard = (data) => {
      const startY = doc.y;
      const cardH = 114;
      doc.roundedRect(24, startY, contentWidth, cardH, 6).fillAndStroke(CARD_BG_BLUE, CARD_BORDER_BLUE);

      doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(8)
         .text('THE 5 CORE QUESTIONS ANSWERED', 32, startY + 6);

      const items = [
        ['1. WHAT', data.what],
        ['2. WHY', data.why],
        ['3. HOW', data.how],
        ['4. WHEN', data.when],
        ['5. RECOGNIZE', data.recognize],
      ];

      let curY = startY + 20;
      items.forEach(([label, text]) => {
        doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(7)
           .text(`${label}: `, 32, curY, { continued: true, lineBreak: false });
        doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(7)
           .text(text, { width: contentWidth - 20, lineGap: 1 });
        curY += 18;
      });

      doc.y = startY + cardH + 6;
    };

    // Helper: Clean ASCII Diagram Box
    const drawAsciiBox = (title, asciiText) => {
      const lines = asciiText.trim().split('\n');
      const boxHeight = lines.length * 9.5 + 16;
      const startY = doc.y;
      doc.roundedRect(24, startY, contentWidth, boxHeight, 5).fillAndStroke('#F8FAFC', '#E2E8F0');
      doc.fillColor(TEXT_MUTED).font('Helvetica-Bold').fontSize(7)
         .text(title.toUpperCase(), 32, startY + 4);
      doc.fillColor('#0F172A').font('Courier-Bold').fontSize(7.5);
      lines.forEach((line, idx) => {
        doc.text(line, 32, startY + 13 + (idx * 9.5), { width: contentWidth - 16, lineBreak: false });
      });
      doc.y = startY + boxHeight + 6;
    };

    // Helper: Practice Problem Card with Full Solution & Complexity
    const drawPracticeCard = (problemData) => {
      const startY = doc.y;
      const cardH = 118;
      doc.roundedRect(24, startY, contentWidth, cardH, 5).fillAndStroke(CARD_BG_GREEN, CARD_BORDER_GREEN);

      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(8)
         .text(`INTERVIEW CHALLENGE : ${problemData.title.toUpperCase()}`, 32, startY + 6);

      doc.fillColor(TEXT_MAIN).font('Helvetica-Bold').fontSize(7.2)
         .text('QUESTION: ', 32, startY + 18, { continued: true });
      doc.font('Helvetica').text(problemData.question, { width: contentWidth - 20 });

      doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(7)
         .text('HINT: ', 32, startY + 36, { continued: true });
      doc.fillColor(TEXT_MAIN).font('Helvetica').text(problemData.hint, { width: contentWidth - 20 });

      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7)
         .text('APPROACH & ANSWER: ', 32, startY + 54, { continued: true });
      doc.fillColor(TEXT_MAIN).font('Helvetica').text(problemData.answer, { width: contentWidth - 20 });

      doc.fillColor(TEXT_MUTED).font('Helvetica-Bold').fontSize(7)
         .text('EXPLANATION: ', 32, startY + 76, { continued: true });
      doc.fillColor(TEXT_MAIN).font('Helvetica').text(problemData.explanation, { width: contentWidth - 20 });

      // Complexity row
      const compY = startY + 98;
      doc.roundedRect(32, compY, contentWidth - 16, 14, 3).fill('#DCFCE7');
      doc.fillColor('#15803D').font('Helvetica-Bold').fontSize(7)
         .text(`TIME: ${problemData.timeComplexity}   |   SPACE: ${problemData.spaceComplexity}`, 38, compY + 3, { lineBreak: false });

      doc.y = startY + cardH + 6;
    };

    // Helper: Revision & Mistake Card
    const drawAlertRow = (mistakeText, proTipText) => {
      const startY = doc.y;
      const cardH = 46;

      // Common Mistake Box (Rose)
      const halfW = (contentWidth - 8) / 2;
      doc.roundedRect(24, startY, halfW, cardH, 5).fillAndStroke(CARD_BG_ROSE, CARD_BORDER_ROSE);
      doc.fillColor('#991B1B').font('Helvetica-Bold').fontSize(7)
         .text('COMMON MISTAKE', 30, startY + 5);
      doc.fillColor('#7F1D1D').font('Helvetica').fontSize(6.6)
         .text(mistakeText, 30, startY + 16, { width: halfW - 12, lineGap: 1 });

      // Pro Tip Box (Amber)
      doc.roundedRect(24 + halfW + 8, startY, halfW, cardH, 5).fillAndStroke(CARD_BG_AMBER, CARD_BORDER_AMBER);
      doc.fillColor('#92400E').font('Helvetica-Bold').fontSize(7)
         .text('PRO INTERVIEW TIP', 30 + halfW + 8, startY + 5);
      doc.fillColor('#78350F').font('Helvetica').fontSize(6.6)
         .text(proTipText, 30 + halfW + 8, startY + 16, { width: halfW - 12, lineGap: 1 });

      doc.y = startY + cardH + 6;
    };

    // Helper: Multi-Language Code Lab Page (Java, C++, Python)
    const drawMultiLangCodePage = (partNum, title, problemName, solutions, complexity) => {
      doc.addPage();
      drawChapterHeader(partNum, `${title} : CODE LAB`);

      // Language Subheader Bar
      const subBarY = doc.y;
      doc.roundedRect(24, subBarY, contentWidth, 18, 4).fill('#1E293B');
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(7)
         .text('MULTI-LANGUAGE IMPLEMENTATIONS:', 32, subBarY + 5, { continued: true });
      doc.fillColor('#60A5FA').font('Helvetica-Bold')
         .text('   JAVA (Primary)   |   ', { continued: true });
      doc.fillColor('#93C5FD')
         .text(' C++ (STL)   |   ', { continued: true });
      doc.fillColor('#34D399')
         .text(' PYTHON (Clean)');
      doc.y = subBarY + 23;

      const renderCodeCard = (langTitle, badgeColor, codeLines, keyNote) => {
        const startY = doc.y;
        const lineH = 8.2;
        const codeH = codeLines.length * lineH + 16;
        doc.roundedRect(24, startY, contentWidth, codeH, 5).fill(CODE_BG);

        // Language Badge inside code card
        doc.roundedRect(28, startY + 3, doc.widthOfString(langTitle) + 12, 12, 3).fill(badgeColor);
        doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.8)
           .text(langTitle, 34, startY + 4.5, { lineBreak: false });

        // Code text
        doc.fillColor(CODE_CYAN).font('Courier').fontSize(7.2);
        codeLines.forEach((line, idx) => {
          doc.text(line, 32, startY + 14 + (idx * lineH), { width: contentWidth - 16, lineBreak: false });
        });

        let nextY = startY + codeH + 3;
        if (keyNote) {
          doc.roundedRect(24, nextY, contentWidth, 13, 3).fill('#F1F5F9');
          doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(6.5)
             .text(`* ${keyNote}`, 30, nextY + 3, { width: contentWidth - 12, lineBreak: false });
          nextY += 16;
        }
        doc.y = nextY;
      };

      // 1. Java Card
      renderCodeCard(` JAVA : ${problemName}`, '#1D4ED8', solutions.java.code, solutions.java.note);

      // 2. C++ Card
      renderCodeCard(` C++ : ${problemName}`, '#334155', solutions.cpp.code, solutions.cpp.note);

      // 3. Python Card
      renderCodeCard(` PYTHON : ${problemName}`, '#065F46', solutions.python.code, solutions.python.note);

      // 4. Shared Complexity & Takeaway Card
      const compY = doc.y;
      const compH = 34;
      doc.roundedRect(24, compY, contentWidth, compH, 5).fillAndStroke(CARD_BG_GREEN, CARD_BORDER_GREEN);
      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7.5)
         .text(` SHARED COMPLEXITY: TIME ${complexity.time}   |   SPACE ${complexity.space}`, 32, compY + 5, { lineBreak: false });
      doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(6.8)
         .text(` Key Takeaway: ${complexity.takeaway}`, 32, compY + 18, { width: contentWidth - 18, lineBreak: false });
      doc.y = compY + compH + 6;
    };

    // =========================================================================
    // PAGE 1: COVER PAGE
    // =========================================================================
    doc.rect(0, 0, pageWidth, 750).fill(NAVY_HEADER);

    // Decorative Header Banner
    doc.rect(0, 0, pageWidth, 175).fill(ROYAL_BLUE);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(22)
       .text('SOWMYA.KCODE', 24, 45, { align: 'center', width: contentWidth });
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#DBEAFE')
       .text('DSA DEMYSTIFIED', 24, 75, { align: 'center', width: contentWidth });
    doc.font('Helvetica-Bold').fontSize(14).fillColor('#FFFFFF')
       .text('The Complete Student-Friendly Handbook', 24, 95, { align: 'center', width: contentWidth });
    doc.font('Helvetica').fontSize(9.5).fillColor('#BFDBFE')
       .text('Phone-First Multi-Language Master Edition (Java * C++ * Python)', 24, 118, { align: 'center', width: contentWidth });

    // Center Card: Handbook Architecture
    doc.roundedRect(24, 195, contentWidth, 170, 8).fill('#1E293B');
    doc.fillColor('#38BDF8').font('Helvetica-Bold').fontSize(10.5)
       .text('HANDBOOK ARCHITECTURE & LEARNING SYSTEM', 34, 210);
    doc.fillColor('#E2E8F0').font('Helvetica').fontSize(8.5)
       .text('* 5 Core Questions Answered in Every Single Chapter:\n  (WHAT, WHY, HOW, WHEN, & PATTERN RECOGNITION)\n* Complete Triple-Language Code Labs (Java * C++ * Python).\n* Intuitive Visual Models and Clean ASCII Dry-Runs.\n* Practice Interview Challenges with Hints & Answers.\n* Zero Broken Fonts or Corrupted Characters.\n* 14 Master Coding Patterns & My 90-Day Action Roadmap.', 34, 230, { lineGap: 3.5 });

    // Language Badges
    const badgeW = (contentWidth - 16) / 3;
    doc.roundedRect(24, 385, badgeW, 40, 6).fill('#2563EB');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10).text('JAVA', 24, 394, { align: 'center', width: badgeW });
    doc.font('Helvetica').fontSize(7.5).text('Primary Teaching', 24, 408, { align: 'center', width: badgeW });

    doc.roundedRect(24 + badgeW + 8, 385, badgeW, 40, 6).fill('#334155');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10).text('C++', 24 + badgeW + 8, 394, { align: 'center', width: badgeW });
    doc.font('Helvetica').fontSize(7.5).text('Fast Execution', 24 + badgeW + 8, 408, { align: 'center', width: badgeW });

    doc.roundedRect(24 + (badgeW + 8) * 2, 385, badgeW, 40, 6).fill('#059669');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10).text('PYTHON', 24 + (badgeW + 8) * 2, 394, { align: 'center', width: badgeW });
    doc.font('Helvetica').fontSize(7.5).text('Clean Syntax', 24 + (badgeW + 8) * 2, 408, { align: 'center', width: badgeW });

    // Audience Card
    doc.roundedRect(24, 445, contentWidth, 95, 8).fill('#1E293B');
    doc.fillColor('#F59E0B').font('Helvetica-Bold').fontSize(9.5).text('BUILT SPECIFICALLY FOR:', 34, 458);
    doc.fillColor('#CBD5E1').font('Helvetica').fontSize(8.5)
       .text('* Beginners looking for clear intuition without scary math.\n* College students preparing for campus recruitment tests.\n* Developers gearing up for product-based company rounds.\n* Working professionals switching to software engineering.', 34, 475, { lineGap: 3 });

    // Quality Seal
    doc.roundedRect(24, 560, contentWidth, 50, 6).fillAndStroke('#0A1424', '#2563EB');
    doc.fillColor('#38BDF8').font('Helvetica-Bold').fontSize(8.5).text('OFFICIAL SOWMYA.KCODE VERIFIED RELEASE', 34, 570);
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(7.5).text('Hand-crafted curriculum. Multi-language verified code in Java, C++, Python.', 34, 584);

    // Footer Author Info
    doc.fillColor('#94A3B8').font('Helvetica').fontSize(8.5)
       .text('Author: Sowmya Katkojwal  |  Instagram: @sowmya.kcode\nCommercial Release  |  Price: Rs 39', 24, 665, { align: 'center', width: contentWidth });

    // =========================================================================
    // PAGE 2: TABLE OF CONTENTS & THE 5 QUESTIONS MASTER FRAMEWORK
    // =========================================================================
    doc.addPage();
    drawChapterHeader('SYLLABUS', 'Complete 16-Part Curriculum');

    const syllabus = [
      ['Part 0', 'Foundations & Big-O Complexity (Zero Math Growth Curves)'],
      ['Part 1', 'Arrays & Dynamic Arrays (Two Pointers, Move Zeroes)'],
      ['Part 2', 'Strings & Character Manipulation (26-Bucket Alphabet Array)'],
      ['Part 3', 'Searching Algorithms (Binary Search 3-Invariant Master Template)'],
      ['Part 4', 'Sorting Algorithms (Elementary vs Merge Sort Divide & Conquer)'],
      ['Part 5', 'Linked Lists (Pointer Rewiring, In-Place Reversal, Cycle Detect)'],
      ['Part 6', 'Stacks (LIFO Cafeteria Plates, Valid Parentheses Matching)'],
      ['Part 7', 'Queues & Deques (FIFO Line, BFS Level-Order Engine)'],
      ['Part 8', 'Hashing & HashMaps (O(1) Lookups, Two Sum Key-Value Hashing)'],
      ['Part 9', 'Recursion & Backtracking (Call Stack, Subsets Power Set)'],
      ['Part 10', 'Trees & BST (Hierarchies, Maximum Depth, Inorder Traversal)'],
      ['Part 11', 'Heaps & Priority Queues (Min-Heap, Kth Largest Element)'],
      ['Part 12', 'Graphs & Networks (Adjacency Lists, Number of Islands DFS)'],
      ['Part 13', 'Dynamic Programming (Climbing Stairs 1D Tabulation)'],
      ['Part 14', 'The 14 Master Interview Patterns & Recognition Guide'],
      ['Part 15', 'My 90-Day Action Roadmap & Live Technical Strategy'],
    ];

    let sylY = 60;
    syllabus.forEach(([part, desc]) => {
      doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(7.5).text(part, 28, sylY, { continued: true, lineBreak: false });
      doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(7.5).text(` : ${desc}`, { width: contentWidth - 30, lineBreak: false });
      sylY += 16;
    });

    // Master 5 Questions Explanation Box
    doc.y = 330;
    doc.roundedRect(24, 330, contentWidth, 195, 6).fillAndStroke(CARD_BG_BLUE, CARD_BORDER_BLUE);
    doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(9)
       .text('THE 5 QUESTIONS MASTER LEARNING FRAMEWORK', 34, 340);
    doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(7.5)
       .text('Every single chapter in this course strictly answers these five questions:', 34, 354);

    const framework = [
      ['1. WHAT IS THIS?', 'Gives a crystal-clear definition in plain, student-friendly language.'],
      ['2. WHY DO WE NEED IT?', 'Explains the practical motivation and the real problem it solves.'],
      ['3. HOW DOES IT WORK?', 'Details the underlying algorithmic or memory mechanics step-by-step.'],
      ['4. WHEN SHOULD I USE IT?', 'Outlines optimal scenarios where this structure or algorithm shines.'],
      ['5. HOW DO I RECOGNIZE IT?', 'Provides keywords, hints, and problem patterns to spot it in interviews.'],
    ];

    let fwY = 372;
    framework.forEach(([q, a]) => {
      doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(7.5).text(q, 34, fwY);
      doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(7).text(a, 34, fwY + 10, { width: contentWidth - 20 });
      fwY += 24;
    });

    // Multi-Language Code Lab Notice Pill
    doc.roundedRect(24, 540, contentWidth, 38, 5).fillAndStroke(CARD_BG_GREEN, CARD_BORDER_GREEN);
    doc.fillColor('#166534').font('Helvetica-Bold').fontSize(8)
       .text('TRIPLE-LANGUAGE CODE LABS INCLUDED (JAVA * C++ * PYTHON)', 34, 549);
    doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(7)
       .text('Each topic contains verified, clean solutions in Java, C++, and Python with syntax notes and complexity.', 34, 562);

    // =========================================================================
    // PART 0: FOUNDATIONS & BIG-O COMPLEXITY
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 0', 'Foundations & Big-O Complexity');

    drawFiveQuestionsCard({
      what: 'A mathematical notation describing how algorithm time or memory scales with input size (n).',
      why: 'Stopwatches measure hardware speed; Big-O measures true algorithm efficiency.',
      how: 'Count dominant operations, discard constant factors (O(3n) -> O(n)), keep highest power term.',
      when: 'Analyze before coding to verify the algorithm fits within interview runtime limits (10^8 ops/sec).',
      recognize: 'Check constraints: n <= 10^5 demands O(n) or O(n log n); n <= 1000 allows O(n^2).',
    });

    drawAsciiBox('Big-O Growth Curves (Zero Math Intuition)',
      'Operations\n' +
      '  n^2 |            /  O(n^2)   [Slow: Nested Loops]\n' +
      '  n   |          /    O(n)     [Fair: Single Loop]\n' +
      'log n | -------       O(log n) [Very Fast: Halving Space]\n' +
      '  1   | =======       O(1)     [Constant: Direct Memory Jump]\n' +
      '      +--------------------> Input Size (n)'
    );

    drawPracticeCard({
      title: 'Array Search Comparison',
      question: 'Determine the time complexity of searching for target x in an unsorted array vs a sorted array.',
      hint: 'Can you eliminate half the remaining numbers without checking them individually?',
      answer: 'Unsorted array requires Linear Search: O(n). Sorted array allows Binary Search: O(log n).',
      explanation: 'In an unsorted array, x could be anywhere. In a sorted array, comparing x with mid cuts candidates by 50%.',
      timeComplexity: 'O(log n) sorted vs O(n) unsorted',
      spaceComplexity: 'O(1) auxiliary memory',
    });

    drawAlertRow(
      'Assuming Big-O measures seconds. It measures operations growth as n scales.',
      'Drop constants: O(2n + 50) simplifies directly to O(n) in interviews.'
    );

    // =========================================================================
    // PART 1: ARRAYS & DYNAMIC ARRAYS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 1', 'Arrays & Dynamic Arrays');

    drawFiveQuestionsCard({
      what: 'Contiguous block of memory holding elements of identical type at indices 0 to n-1.',
      why: 'Direct memory addressing (base + index * size) enables instant O(1) reads and writes.',
      how: 'Fixed arrays have locked size. Dynamic arrays (ArrayList) auto-expand 2x when capacity fills.',
      when: 'Use for fast index-based lookups, contiguous buffer storage, and sequential scans.',
      recognize: 'Keywords: "sorted array", "find pair", "subarray", "two pointers", "sliding window".',
    });

    drawAsciiBox('Two Pointers Converging Inward (Target = 9)',
      '[ 2,   7,  11,  15 ]   target = 9\n' +
      '  ^              ^     2 + 15 = 17 (> 9) -> sum too large, move right--\n' +
      ' left          right\n' +
      '[ 2,   7,  11,  15 ]   2 + 7 = 9 (MATCH!) -> return 1-based indices [1, 2]\n' +
      '  ^    ^'
    );

    drawPracticeCard({
      title: 'Move Zeroes (LeetCode 283)',
      question: 'Move all 0s to the end of nums while maintaining relative order of non-zero elements.',
      hint: 'Keep a write pointer tracking where the next non-zero element belongs.',
      answer: 'Iterate read pointer; when nums[read] != 0, write to nums[write++] then fill trailing with 0.',
      explanation: 'Overwrites non-zeroes forward in one pass. Fills remaining indices with 0 in second pass.',
      timeComplexity: 'O(n) single pass',
      spaceComplexity: 'O(1) in-place modification',
    });

    drawAlertRow(
      'Creating a new array when in-place modification is required.',
      'For sorted pair searching, Two Pointers drops brute force O(n^2) to linear O(n).'
    );

    // Part 1 Code Lab
    drawMultiLangCodePage('PART 1', 'Arrays', 'Two Sum II (Sorted Array)', {
      java: {
        code: [
          'public static int[] twoSum(int[] numbers, int target) {',
          '    int left = 0, right = numbers.length - 1;',
          '    while (left < right) {',
          '        int sum = numbers[left] + numbers[right];',
          '        if (sum == target) return new int[]{left + 1, right + 1};',
          '        else if (sum < target) left++; // Increase sum',
          '        else right--;                  // Decrease sum',
          '    }',
          '    return new int[]{};',
          '}',
        ],
        note: 'Pointers start at opposite ends; sorted property guarantees directional movement.',
      },
      cpp: {
        code: [
          'vector<int> twoSum(const vector<int>& numbers, int target) {',
          '    int left = 0, right = numbers.size() - 1;',
          '    while (left < right) {',
          '        int sum = numbers[left] + numbers[right];',
          '        if (sum == target) return {left + 1, right + 1};',
          '        else if (sum < target) left++;',
          '        else right--;',
          '    }',
          '    return {};',
          '}',
        ],
        note: 'Pass vector by const reference to avoid expensive deep copies.',
      },
      python: {
        code: [
          'def two_sum(numbers: list[int], target: int) -> list[int]:',
          '    left, right = 0, len(numbers) - 1',
          '    while left < right:',
          '        curr_sum = numbers[left] + numbers[right]',
          '        if curr_sum == target: return [left + 1, right + 1]',
          '        elif curr_sum < target: left += 1',
          '        else: right -= 1',
          '    return []',
        ],
        note: 'Python list indexing is 0-based; problem requests 1-based index return.',
      },
    }, {
      time: 'O(n) Single Pass',
      space: 'O(1) Auxiliary Memory',
      takeaway: 'Two pointers converging inward drops brute-force O(n^2) to clean linear O(n).',
    });

    // =========================================================================
    // PART 2: STRINGS & CHARACTER MANIPULATION
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 2', 'Strings & Character Manipulation');

    drawFiveQuestionsCard({
      what: 'Ordered sequence of characters. In Java and Python, strings are completely immutable.',
      why: 'Immutable strings prevent accidental corruption but repeated str += "a" causes O(n^2) copies.',
      how: 'Use StringBuilder for O(1) appends. Use 26-element integer array for letter frequency counting.',
      when: 'Use frequency buckets when character set is bounded (lowercase a-z) for O(1) auxiliary space.',
      recognize: 'Keywords: "anagram", "palindrome", "substring", "character frequency", "ASCII diff".',
    });

    drawAsciiBox('The 26-Bucket Alphabet Array (Index = char - \'a\')',
      'Char:    \'a\'   \'b\'   \'c\'   ...   \'z\'\n' +
      'Index:    0     1     2    ...    25\n' +
      'Math:   \'c\' - \'a\' = 99 - 97 = 2  (Instant O(1) bucket mapping!)'
    );

    drawPracticeCard({
      title: 'Valid Palindrome (LeetCode 125)',
      question: 'Check if string reads same backwards after converting to lowercase and stripping non-alphanumeric.',
      hint: 'Two pointers converging inward; skip non-alphanumeric via Character.isLetterOrDigit().',
      answer: 'left = 0, right = s.length() - 1. Compare chars; if mismatch return false.',
      explanation: 'Pointers advance inward, skipping punctuation. Returns true if pointers meet without mismatch.',
      timeComplexity: 'O(n) linear scan',
      spaceComplexity: 'O(1) in-place pointers',
    });

    drawAlertRow(
      'Comparing Java strings with == (compares memory addresses!). Always use .equals().',
      'A 26-slot integer array beats HashMap in speed and memory for lowercase alphabet.'
    );

    // Part 2 Code Lab
    drawMultiLangCodePage('PART 2', 'Strings', 'Valid Anagram (LeetCode 242)', {
      java: {
        code: [
          'public static boolean isAnagram(String s, String t) {',
          '    if (s.length() != t.length()) return false;',
          '    int[] count = new int[26];',
          '    for (int i = 0; i < s.length(); i++) {',
          '        count[s.charAt(i) - \'a\']++;',
          '        count[t.charAt(i) - \'a\']--;',
          '    }',
          '    for (int c : count) if (c != 0) return false;',
          '    return true;',
          '}',
        ],
        note: 'Single loop increments bucket for s and decrements for t simultaneously.',
      },
      cpp: {
        code: [
          'bool isAnagram(const string& s, const string& t) {',
          '    if (s.length() != t.length()) return false;',
          '    vector<int> count(26, 0);',
          '    for (int i = 0; i < s.length(); i++) {',
          '        count[s[i] - \'a\']++;',
          '        count[t[i] - \'a\']--;',
          '    }',
          '    for (int c : count) if (c != 0) return false;',
          '    return true;',
          '}',
        ],
        note: 'Fixed vector of size 26 avoids hashing overhead of std::unordered_map.',
      },
      python: {
        code: [
          'def is_anagram(s: str, t: str) -> bool:',
          '    if len(s) != len(t): return False',
          '    count = [0] * 26',
          '    for ch_s, ch_t in zip(s, t):',
          '        count[ord(ch_s) - ord(\'a\')] += 1',
          '        count[ord(ch_t) - ord(\'a\')] -= 1',
          '    return all(c == 0 for c in count)',
        ],
        note: 'ord() converts character to ASCII code; zip() pairs characters cleanly.',
      },
    }, {
      time: 'O(n) Linear Scan',
      space: 'O(1) Fixed 26-Slot Array',
      takeaway: 'For fixed alphabets, a 26-element array is 10x faster than HashMap lookups.',
    });

    // =========================================================================
    // PART 3: SEARCHING ALGORITHMS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 3', 'Searching Algorithms');

    drawFiveQuestionsCard({
      what: 'Algorithms to locate target elements. Linear search checks all; Binary Search halves candidates.',
      why: 'Linear search takes 1,000,000 checks for n = 1,000,000. Binary search takes only 20 checks!',
      how: 'Compare target with midpoint. If target is smaller, search left half; else search right half.',
      when: 'Use Binary Search when array is sorted, or when search space has monotonic true/false condition.',
      recognize: 'Keywords: "sorted array", "find minimum in rotated", "O(log n) time requirement".',
    });

    drawAsciiBox('Binary Search Invariant (Target = 23)',
      'Left=0                     Mid=3                      Right=6\n' +
      '[  2,    5,    8,   |12|,   16,    23,    38  ]\n' +
      'Target 23 > Mid 12 -> Eliminate left half -> left = mid + 1 (Index 4)'
    );

    drawPracticeCard({
      title: 'Search in Rotated Sorted Array (LeetCode 33)',
      question: 'Search target in sorted array rotated at unknown pivot. Must achieve O(log n) runtime.',
      hint: 'At least one half (left..mid or mid..right) is always strictly sorted!',
      answer: 'Check which half is sorted. If target lies within sorted half bounds, search it; else search other half.',
      explanation: 'Determining the sorted half allows discarding 50% candidates in every iteration.',
      timeComplexity: 'O(log n) logarithmic',
      spaceComplexity: 'O(1) constant auxiliary space',
    });

    drawAlertRow(
      'Using (left + right) / 2 causes integer overflow when left + right > 2^31 - 1.',
      'Always use left + (right - left) / 2 to safely calculate the midpoint.'
    );

    // Part 3 Code Lab
    drawMultiLangCodePage('PART 3', 'Searching', 'Binary Search (LeetCode 704)', {
      java: {
        code: [
          'public static int binarySearch(int[] nums, int target) {',
          '    int left = 0, right = nums.length - 1;',
          '    while (left <= right) {',
          '        int mid = left + (right - left) / 2; // Safe from overflow',
          '        if (nums[mid] == target) return mid;',
          '        else if (nums[mid] < target) left = mid + 1;',
          '        else right = mid - 1;',
          '    }',
          '    return -1;',
          '}',
        ],
        note: 'Condition left <= right ensures single remaining element is properly evaluated.',
      },
      cpp: {
        code: [
          'int binarySearch(const vector<int>& nums, int target) {',
          '    int left = 0, right = nums.size() - 1;',
          '    while (left <= right) {',
          '        int mid = left + (right - left) / 2;',
          '        if (nums[mid] == target) return mid;',
          '        else if (nums[mid] < target) left = mid + 1;',
          '        else right = mid - 1;',
          '    }',
          '    return -1;',
          '}',
        ],
        note: 'Standard STL provides std::lower_bound and std::binary_search.',
      },
      python: {
        code: [
          'def binary_search(nums: list[int], target: int) -> int:',
          '    left, right = 0, len(nums) - 1',
          '    while left <= right:',
          '        mid = left + (right - left) // 2',
          '        if nums[mid] == target: return mid',
          '        elif nums[mid] < target: left = mid + 1',
          '        else: right = mid - 1',
          '    return -1',
        ],
        note: '// operator performs integer floor division in Python 3.',
      },
    }, {
      time: 'O(log n) Logarithmic',
      space: 'O(1) Constant Auxiliary',
      takeaway: 'Halving the search space every iteration cuts 1,000,000 items in 20 comparisons.',
    });

    // =========================================================================
    // PART 4: SORTING ALGORITHMS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 4', 'Sorting Algorithms');

    drawFiveQuestionsCard({
      what: 'Arranging elements into ascending or descending numerical / alphabetical order.',
      why: 'Sorted data unlocks O(log n) Binary Search, O(n) Two Pointers, and eliminates duplicate checks.',
      how: 'Elementary sorts (Bubble, Selection) take O(n^2). Divide-and-conquer (Merge Sort) achieves O(n log n).',
      when: 'Sort before processing when order allows greedy choices or fast interval comparisons.',
      recognize: 'Keywords: "kth smallest", "merge intervals", "meeting rooms", "sort colors".',
    });

    drawAsciiBox('Merge Sort Divide & Conquer Tree',
      'Split:        [ 38, 27, 43, 3, 9, 82, 10 ]\n' +
      'Divide:     [ 38, 27, 43 ]      [ 3, 9, 82, 10 ]\n' +
      'Base:      [38] [27] [43]        [3] [9] [82] [10]\n' +
      'Merge:      [ 27, 38, 43 ]        [ 3, 9, 10, 82 ]\n' +
      'Final:        [ 3, 9, 10, 27, 38, 43, 82 ]'
    );

    drawPracticeCard({
      title: 'Quick Sort Pivot Partitioning',
      question: 'Explain why Quick Sort average case is O(n log n) but worst case degrades to O(n^2).',
      hint: 'What happens when array is already sorted and you pick the last element as pivot?',
      answer: 'Balanced pivot divides array in half (height log n). Unbalanced pivot divides into 1 and n-1 (height n).',
      explanation: 'Use randomized pivot selection to ensure average O(n log n) runtime in real interviews.',
      timeComplexity: 'O(n log n) average, O(n^2) worst',
      spaceComplexity: 'O(log n) call stack',
    });

    drawAlertRow(
      'Using Bubble Sort in coding interviews. Interviewers expect O(n log n) mastery.',
      'Merge Sort is stable and guarantees O(n log n) even in the worst case scenario.'
    );

    // Part 4 Code Lab
    drawMultiLangCodePage('PART 4', 'Sorting', 'Merge Sort (Divide & Conquer)', {
      java: {
        code: [
          'public static void mergeSort(int[] arr, int left, int right) {',
          '    if (left >= right) return;',
          '    int mid = left + (right - left) / 2;',
          '    mergeSort(arr, left, mid);',
          '    mergeSort(arr, mid + 1, right);',
          '    merge(arr, left, mid, right); // Merges two sorted halves',
          '}',
        ],
        note: 'Recursively divides array into singletons then merges them back in sorted order.',
      },
      cpp: {
        code: [
          'void mergeSort(vector<int>& arr, int left, int right) {',
          '    if (left >= right) return;',
          '    int mid = left + (right - left) / 2;',
          '    mergeSort(arr, left, mid);',
          '    mergeSort(arr, mid + 1, right);',
          '    merge(arr, left, mid, right);',
          '}',
        ],
        note: 'In-place std::sort uses Introsort (QuickSort + HeapSort hybrid) taking O(n log n).',
      },
      python: {
        code: [
          'def merge_sort(arr: list[int]) -> list[int]:',
          '    if len(arr) <= 1: return arr',
          '    mid = len(arr) // 2',
          '    left = merge_sort(arr[:mid])',
          '    right = merge_sort(arr[mid:])',
          '    return merge(left, right)',
        ],
        note: 'Python built-in Timsort (.sort() / sorted()) combines Merge and Insertion sort.',
      },
    }, {
      time: 'O(n log n) Guaranteed',
      space: 'O(n) Auxiliary Buffer',
      takeaway: 'Divide and conquer breaks problem into log n levels with n work per level.',
    });

    // =========================================================================
    // PART 5: LINKED LISTS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 5', 'Linked Lists');

    drawFiveQuestionsCard({
      what: 'Linear data structure where elements (nodes) contain data and pointer to next node.',
      why: 'Dynamic size with O(1) head insertion/deletion without shifting elements in memory.',
      how: 'Nodes scattered across heap memory; sequential pointer traversal replaces index math.',
      when: 'Use when constant-time insertion/deletion at boundaries is needed (LRU cache, queues).',
      recognize: 'Keywords: "reverse list", "middle of list", "cycle detection", "dummy node".',
    });

    drawAsciiBox('In-Place Pointer Rewiring (Reverse Linked List)',
      'Before:   [1] ---> [2] ---> [3] ---> null\n' +
      'Step:     next = curr.next; curr.next = prev; prev = curr; curr = next;\n' +
      'After:    null <--- [1] <--- [2] <--- [3] (prev is new head!)'
    );

    drawPracticeCard({
      title: 'Linked List Cycle (LeetCode 141)',
      question: 'Determine if a linked list contains a cycle using O(1) auxiliary memory.',
      hint: 'Floyd\'s Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps.',
      answer: 'If slow == fast at any point, cycle exists. If fast or fast.next reaches null, no cycle.',
      explanation: 'Inside a cycle of length C, the gap between fast and slow shrinks by 1 step every iteration.',
      timeComplexity: 'O(n) linear traversal',
      spaceComplexity: 'O(1) two pointers',
    });

    drawAlertRow(
      'Losing track of next node before rewiring pointer (causes memory orphan leak).',
      'Always save next = curr.next before changing curr.next to prev!'
    );

    // Part 5 Code Lab
    drawMultiLangCodePage('PART 5', 'Linked Lists', 'Reverse Linked List (LeetCode 206)', {
      java: {
        code: [
          'public static ListNode reverseList(ListNode head) {',
          '    ListNode prev = null, curr = head;',
          '    while (curr != null) {',
          '        ListNode next = curr.next; // 1. Save next',
          '        curr.next = prev;          // 2. Reverse pointer',
          '        prev = curr;               // 3. Advance prev',
          '        curr = next;               // 4. Advance curr',
          '    }',
          '    return prev; // New head',
          '}',
        ],
        note: '4-step pointer dance rewires links in-place without allocating new nodes.',
      },
      cpp: {
        code: [
          'ListNode* reverseList(ListNode* head) {',
          '    ListNode* prev = nullptr;',
          '    ListNode* curr = head;',
          '    while (curr != nullptr) {',
          '        ListNode* next = curr->next;',
          '        curr->next = prev;',
          '        prev = curr;',
          '        curr = next;',
          '    }',
          '    return prev;',
          '}',
        ],
        note: 'Use nullptr in modern C++ instead of NULL for type-safe pointer initialization.',
      },
      python: {
        code: [
          'def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:',
          '    prev, curr = None, head',
          '    while curr:',
          '        nxt = curr.next',
          '        curr.next = prev',
          '        prev = curr',
          '        curr = nxt',
          '    return prev',
        ],
        note: 'Python multiple assignment allows: curr.next, prev, curr = prev, curr, curr.next',
      },
    }, {
      time: 'O(n) Single Pass',
      space: 'O(1) In-Place Rewiring',
      takeaway: 'Linked list manipulation is all about careful pointer temporary storage.',
    });

    // =========================================================================
    // PART 6: STACKS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 6', 'Stacks');

    drawFiveQuestionsCard({
      what: 'LIFO (Last-In, First-Out) linear structure. Elements added and removed only at top.',
      why: 'Tracks execution context, nested syntax hierarchies, and reverses sequence naturally.',
      how: 'push() adds to top in O(1); pop() removes from top in O(1); peek() views top in O(1).',
      when: 'Use for matching brackets, undo/redo buffers, evaluating expressions, and monotonic scans.',
      recognize: 'Keywords: "valid parentheses", "next greater element", "monotonic stack", "undo".',
    });

    drawAsciiBox('LIFO Stack Mechanism & Bracket Matching',
      'Push:   push(\'(\') -> [ \'(\' ]\n' +
      'Match:  Incoming \')\' matches top \'(\' -> pop() -> Stack empty (VALID!)\n' +
      'Rule:   Every closing bracket must match the most recently opened bracket.'
    );

    drawPracticeCard({
      title: 'Daily Temperatures (LeetCode 739)',
      question: 'Given daily temperatures, return array showing days to wait until a warmer temperature.',
      hint: 'Maintain a Monotonic Decreasing Stack storing indices of unresolved temperatures.',
      answer: 'When today\'s temp > stack.peek(), pop index and record difference: result[prev] = today - prev.',
      explanation: 'Every index is pushed and popped at most once, yielding linear O(n) total runtime.',
      timeComplexity: 'O(n) single pass',
      spaceComplexity: 'O(n) stack memory',
    });

    drawAlertRow(
      'Using legacy Stack in Java (thread-safe, slow). Use ArrayDeque for 3x speed.',
      'Always check !stack.isEmpty() before calling stack.pop() to prevent empty stack exception.'
    );

    // Part 6 Code Lab
    drawMultiLangCodePage('PART 6', 'Stacks', 'Valid Parentheses (LeetCode 20)', {
      java: {
        code: [
          'public static boolean isValid(String s) {',
          '    Deque<Character> stack = new ArrayDeque<>();',
          '    for (char c : s.toCharArray()) {',
          '        if (c == \'(\') stack.push(\')\');',
          '        else if (c == \'{\') stack.push(\'}\');',
          '        else if (c == \'[\') stack.push(\']\');',
          '        else if (stack.isEmpty() || stack.pop() != c) return false;',
          '    }',
          '    return stack.isEmpty();',
          '}',
        ],
        note: 'Push expected closing bracket; compare directly on encountering close character.',
      },
      cpp: {
        code: [
          'bool isValid(string s) {',
          '    stack<char> st;',
          '    for (char c : s) {',
          '        if (c == \'(\') st.push(\')\');',
          '        else if (c == \'{\') st.push(\'}\');',
          '        else if (c == \'[\') st.push(\']\');',
          '        else {',
          '            if (st.empty() || st.top() != c) return false;',
          '            st.pop();',
          '        }',
          '    }',
          '    return st.empty();',
          '}',
        ],
        note: 'C++ std::stack::top() inspects value; std::stack::pop() removes it (void return).',
      },
      python: {
        code: [
          'def is_valid(s: str) -> bool:',
          '    stack = []',
          '    pairs = {\'(\': \')\', \'{\': \'}\', \'[\': \']\'}',
          '    for ch in s:',
          '        if ch in pairs: stack.append(pairs[ch])',
          '        elif not stack or stack.pop() != ch: return False',
          '    return len(stack) == 0',
        ],
        note: 'Standard Python list serves as an optimal stack using append() and pop().',
      },
    }, {
      time: 'O(n) Single Pass',
      space: 'O(n) Stack Storage',
      takeaway: 'Pushing expected closing character simplifies matching logic to a single check.',
    });

    // =========================================================================
    // PART 7: QUEUES & DEQUES
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 7', 'Queues & Deques');

    drawFiveQuestionsCard({
      what: 'FIFO (First-In, First-Out) structure. Deque supports O(1) push/pop at both front and back.',
      why: 'Guarantees fair processing in order of arrival; forms the core engine for BFS graph traversal.',
      how: 'offer() adds to back; poll() removes from front; peek() inspects front element.',
      when: 'Use for level-order tree traversal, shortest path in unweighted graphs, and printer buffers.',
      recognize: 'Keywords: "level order", "shortest path", "sliding window maximum", "BFS".',
    });

    drawAsciiBox('FIFO Queue & Level-Order BFS Wavefront',
      'Enq: [Root] -> Poll Root -> Enq Left, Right\n' +
      'Level 0:  [ 1 ]\n' +
      'Level 1:  [ 2,  3 ]\n' +
      'Level 2:  [ 4,  5,  6,  7 ]  (Natural level-by-level wavefront!)'
    );

    drawPracticeCard({
      title: 'Sliding Window Maximum (LeetCode 239)',
      question: 'Find maximum element in sliding window of size k moving across array nums.',
      hint: 'Maintain a Monotonic Deque storing indices of elements in strictly decreasing order.',
      answer: 'Front of deque always holds maximum of current window. Pop smaller elements from back before inserting.',
      explanation: 'Each element enters and exits deque at most once, yielding linear O(n) total runtime.',
      timeComplexity: 'O(n) linear scan',
      spaceComplexity: 'O(k) window deque',
    });

    drawAlertRow(
      'Using LinkedList for queue when high performance is critical. ArrayDeque is faster.',
      'Record int size = q.size() before level loop to process exactly one tree depth at a time.'
    );

    // Part 7 Code Lab
    drawMultiLangCodePage('PART 7', 'Queues & BFS', 'Tree Level Order Traversal (LeetCode 102)', {
      java: {
        code: [
          'public static List<List<Integer>> levelOrder(TreeNode root) {',
          '    List<List<Integer>> res = new ArrayList<>();',
          '    if (root == null) return res;',
          '    Queue<TreeNode> q = new LinkedList<>();',
          '    q.offer(root);',
          '    while (!q.isEmpty()) {',
          '        int size = q.size(); // Freeze count for current level',
          '        List<Integer> level = new ArrayList<>();',
          '        for (int i = 0; i < size; i++) {',
          '            TreeNode node = q.poll();',
          '            level.add(node.val);',
          '            if (node.left != null) q.offer(node.left);',
          '            if (node.right != null) q.offer(node.right);',
          '        }',
          '        res.add(level);',
          '    }',
          '    return res;',
          '}',
        ],
        note: 'Freezing int size = q.size() isolates exact elements belonging to current depth.',
      },
      cpp: {
        code: [
          'vector<vector<int>> levelOrder(TreeNode* root) {',
          '    vector<vector<int>> res; if (!root) return res;',
          '    queue<TreeNode*> q; q.push(root);',
          '    while (!q.empty()) {',
          '        int size = q.size(); vector<int> level;',
          '        for (int i = 0; i < size; i++) {',
          '            TreeNode* node = q.front(); q.pop();',
          '            level.push_back(node->val);',
          '            if (node->left) q.push(node->left);',
          '            if (node->right) q.push(node->right);',
          '        }',
          '        res.push_back(level);',
          '    }',
          '    return res;',
          '}',
        ],
        note: 'std::queue::front() retrieves item; std::queue::pop() removes it.',
      },
      python: {
        code: [
          'def level_order(root: Optional[TreeNode]) -> list[list[int]]:',
          '    if not root: return []',
          '    res, q = [], collections.deque([root])',
          '    while q:',
          '        level = []',
          '        for _ in range(len(q)):',
          '            node = q.popleft()',
          '            level.append(node.val)',
          '            if node.left: q.append(node.left)',
          '            if node.right: q.append(node.right)',
          '        res.append(level)',
          '    return res',
        ],
        note: 'collections.deque provides O(1) popleft(); avoid list.pop(0) which is O(n).',
      },
    }, {
      time: 'O(n) Visits Every Node Once',
      space: 'O(w) Max Tree Width',
      takeaway: 'Freezing queue size before inner loop is the universal level-by-level BFS pattern.',
    });

    // =========================================================================
    // PART 8: HASHING & HASHMAPS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 8', 'Hashing & HashMaps');

    drawFiveQuestionsCard({
      what: 'Data structure mapping unique keys to values using hash function for O(1) lookups.',
      why: 'Replaces expensive O(n) array scans with instantaneous O(1) key existence checks.',
      how: 'Hash code computes bucket index. Collisions resolved via linked chains or open addressing.',
      when: 'Use when tracking counts, finding complements, detecting duplicates, or memoization.',
      recognize: 'Keywords: "two sum", "group anagrams", "frequency map", "O(1) lookup", "unique count".',
    });

    drawAsciiBox('HashMap Complement Lookup (Target = 9)',
      'Index 0: val = 2  -> need 9 - 2 = 7 -> not in map -> map.put(2, 0)\n' +
      'Index 1: val = 7  -> need 9 - 7 = 2 -> FOUND IN MAP at index 0!\n' +
      'Return indices [0, 1] in O(1) lookup!'
    );

    drawPracticeCard({
      title: 'Group Anagrams (LeetCode 49)',
      question: 'Group array of strings into sublists where each sublist contains anagrams of each other.',
      hint: 'Sorted string or 26-character frequency count serves as identical hash key for all anagrams!',
      answer: 'Iterate strings. Compute frequency key (e.g. "#1#0#0..."). Store in Map<String, List<String>>.',
      explanation: 'Strings with identical character counts map to identical key bucket in O(n * k) time.',
      timeComplexity: 'O(n * k) where k is string length',
      spaceComplexity: 'O(n * k) map storage',
    });

    drawAlertRow(
      'Using mutable objects as HashMap keys (mutating key changes hash code, making value lost!).',
      'For unsorted arrays, HashMap drops Two Sum brute force O(n^2) to linear O(n).'
    );

    // Part 8 Code Lab
    drawMultiLangCodePage('PART 8', 'HashMaps', 'Two Sum (LeetCode 1)', {
      java: {
        code: [
          'public static int[] twoSumHash(int[] nums, int target) {',
          '    Map<Integer, Integer> map = new HashMap<>();',
          '    for (int i = 0; i < nums.length; i++) {',
          '        int complement = target - nums[i];',
          '        if (map.containsKey(complement)) {',
          '            return new int[]{map.get(complement), i};',
          '        }',
          '        map.put(nums[i], i);',
          '    }',
          '    return new int[]{};',
          '}',
        ],
        note: 'Stores (value -> index). Checks complement existence in single linear pass.',
      },
      cpp: {
        code: [
          'vector<int> twoSum(const vector<int>& nums, int target) {',
          '    unordered_map<int, int> seen;',
          '    for (int i = 0; i < nums.size(); i++) {',
          '        int complement = target - nums[i];',
          '        if (seen.count(complement)) {',
          '            return {seen[complement], i};',
          '        }',
          '        seen[nums[i]] = i;',
          '    }',
          '    return {};',
          '}',
        ],
        note: 'Use std::unordered_map for O(1) average hash lookups instead of std::map O(log n).',
      },
      python: {
        code: [
          'def two_sum(nums: list[int], target: int) -> list[int]:',
          '    seen = {}',
          '    for i, num in enumerate(nums):',
          '        diff = target - num',
          '        if diff in seen:',
          '            return [seen[diff], i]',
          '        seen[num] = i',
          '    return []',
        ],
        note: 'Python dict provides O(1) amortized lookup via highly optimized hash table.',
      },
    }, {
      time: 'O(n) Single Pass',
      space: 'O(n) Hash Table',
      takeaway: 'Trading auxiliary memory for instantaneous O(1) lookups is DSA\'s master trade-off.',
    });

    // =========================================================================
    // PART 9: RECURSION & BACKTRACKING
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 9', 'Recursion & Backtracking');

    drawFiveQuestionsCard({
      what: 'Technique where function calls itself. Backtracking explores candidates, undoing dead ends.',
      why: 'Solves complex combinatorial problems (subsets, permutations, N-Queens) with clean code.',
      how: '1. Base Case (stops recursion). 2. Choose candidate. 3. Recurse. 4. Un-choose (backtrack).',
      when: 'Use when problem demands generating all possible configurations, combinations, or paths.',
      recognize: 'Keywords: "generate all", "subsets", "permutations", "N-Queens", "solve sudoku".',
    });

    drawAsciiBox('Backtracking Decision Tree (Subsets of [1, 2])',
      '                 []\n' +
      '        / (Exclude 1)    \\ (Include 1)\n' +
      '       []                 [1]\n' +
      '     /    \\             /    \\\n' +
      '   []     [2]         [1]   [1, 2]  -> 4 total subsets (2^n)!'
    );

    drawPracticeCard({
      title: 'Permutations (LeetCode 46)',
      question: 'Given an array nums of distinct integers, return all possible permutations.',
      hint: 'Track visited elements using boolean array. Recurse until path length equals nums.length.',
      answer: 'Loop over elements. If not visited: mark visited, append to path, recurse, pop, mark unvisited.',
      explanation: 'Systematically explores all n! arrangements, backtracking at each branch.',
      timeComplexity: 'O(n * n!) factorial',
      spaceComplexity: 'O(n) recursion call stack',
    });

    drawAlertRow(
      'Forgetting the base case (causes stack overflow exception: java.lang.StackOverflowError).',
      'Always undo the state change (e.g. list.remove(list.size() - 1)) during backtracking!'
    );

    // Part 9 Code Lab
    drawMultiLangCodePage('PART 9', 'Recursion & Backtracking', 'Subsets / Power Set (LeetCode 78)', {
      java: {
        code: [
          'public static List<List<Integer>> subsets(int[] nums) {',
          '    List<List<Integer>> res = new ArrayList<>();',
          '    backtrack(0, nums, new ArrayList<>(), res);',
          '    return res;',
          '}',
          'private static void backtrack(int start, int[] nums, List<Integer> cur, List<List<Integer>> res) {',
          '    res.add(new ArrayList<>(cur)); // Copy snapshot',
          '    for (int i = start; i < nums.length; i++) {',
          '        cur.add(nums[i]);              // Choose',
          '        backtrack(i + 1, nums, cur, res); // Explore',
          '        cur.remove(cur.size() - 1);    // Un-choose (backtrack)',
          '    }',
          '}',
        ],
        note: 'Always pass new ArrayList<>(cur) when saving; otherwise reference gets cleared.',
      },
      cpp: {
        code: [
          'void backtrack(int start, const vector<int>& nums, vector<int>& cur, vector<vector<int>>& res) {',
          '    res.push_back(cur);',
          '    for (int i = start; i < nums.size(); i++) {',
          '        cur.push_back(nums[i]);',
          '        backtrack(i + 1, nums, cur, res);',
          '        cur.pop_back(); // Backtrack',
          '    }',
          '}',
          'vector<vector<int>> subsets(const vector<int>& nums) {',
          '    vector<vector<int>> res; vector<int> cur;',
          '    backtrack(0, nums, cur, res); return res;',
          '}',
        ],
        note: 'std::vector push_back and pop_back naturally implement state transition.',
      },
      python: {
        code: [
          'def subsets(nums: list[int]) -> list[list[int]]:',
          '    res = []',
          '    def backtrack(start: int, cur: list[int]):',
          '        res.append(list(cur)) # Copy snapshot',
          '        for i in range(start, len(nums)):',
          '            cur.append(nums[i])',
          '            backtrack(i + 1, cur)',
          '            cur.pop() # Backtrack',
          '    backtrack(0, [])',
          '    return res',
        ],
        note: 'list(cur) creates independent shallow copy of candidate list.',
      },
    }, {
      time: 'O(n * 2^n) Combinatorial',
      space: 'O(n) Recursion Call Stack',
      takeaway: 'Choose -> Explore -> Backtrack is the immutable formula for all generation tasks.',
    });

    // =========================================================================
    // PART 10: TREES & BINARY SEARCH TREES
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 10', 'Trees & Binary Search Trees');

    drawFiveQuestionsCard({
      what: 'Hierarchical node structure with root node and subtrees. BST enforces left < root < right.',
      why: 'Combines fast O(1) flexibility of linked lists with O(log n) search capability of arrays.',
      how: 'Traversals: Inorder (Left, Root, Right -> sorted in BST), Preorder, Postorder.',
      when: 'Use for hierarchical file systems, syntax parsing trees, and sorted dynamic data.',
      recognize: 'Keywords: "binary search tree", "inorder traversal", "maximum depth", "LCA".',
    });

    drawAsciiBox('Binary Search Tree Invariant (Left < Root < Right)',
      '           [ 10 ]\n' +
      '          /      \\\n' +
      '      [ 5 ]      [ 15 ]     Inorder Traversal: 3, 5, 8, 10, 12, 15, 20\n' +
      '     /    \\     /    \\     (Strictly sorted ascending order!)\n' +
      '   [3]    [8] [12]   [20]'
    );

    drawPracticeCard({
      title: 'Validate Binary Search Tree (LeetCode 98)',
      question: 'Determine if binary tree is valid BST. Left subtree < node.val < Right subtree everywhere.',
      hint: 'Pass valid allowable range [min, max] down the recursion tree.',
      answer: 'validate(node, min, max). If node == null return true. If node.val <= min || >= max return false.',
      explanation: 'Ensures every node obeys constraints set by all ancestors, not just direct parent.',
      timeComplexity: 'O(n) visits every node once',
      spaceComplexity: 'O(h) tree height stack memory',
    });

    drawAlertRow(
      'Checking only immediate children (left < root and right > root is NOT enough for global BST!).',
      'Inorder traversal of a valid BST always produces strictly sorted ascending elements.'
    );

    // Part 10 Code Lab
    drawMultiLangCodePage('PART 10', 'Trees', 'Maximum Depth of Binary Tree (LeetCode 104)', {
      java: {
        code: [
          'public static int maxDepth(TreeNode root) {',
          '    if (root == null) return 0;',
          '    int leftDepth = maxDepth(root.left);',
          '    int rightDepth = maxDepth(root.right);',
          '    return 1 + Math.max(leftDepth, rightDepth);',
          '}',
        ],
        note: 'Base case returns 0 for null. Height equals 1 plus max of children subtrees.',
      },
      cpp: {
        code: [
          'int maxDepth(TreeNode* root) {',
          '    if (!root) return 0;',
          '    return 1 + max(maxDepth(root->left), maxDepth(root->right));',
          '}',
        ],
        note: 'Concise recursive formulation leverages call stack naturally.',
      },
      python: {
        code: [
          'def max_depth(root: Optional[TreeNode]) -> int:',
          '    if not root: return 0',
          '    return 1 + max(max_depth(root.left), max_depth(root.right))',
        ],
        note: 'Python elegant single-line recursion handles null checks gracefully.',
      },
    }, {
      time: 'O(n) Node Count',
      space: 'O(h) Tree Height Call Stack',
      takeaway: 'Divide and conquer on trees: solve left child, solve right child, combine at root.',
    });

    // =========================================================================
    // PART 11: HEAPS & PRIORITY QUEUES
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 11', 'Heaps & Priority Queues');

    drawFiveQuestionsCard({
      what: 'Complete binary tree where root is minimum (Min-Heap) or maximum (Max-Heap).',
      why: 'Finds and extracts minimum/maximum element in O(1) peek and O(log n) removal.',
      how: 'Stored in compact array: parent = (i - 1) / 2; left = 2i + 1; right = 2i + 2.',
      when: 'Use for Top-K problems, running stream median, and Dijkstra\'s shortest path algorithm.',
      recognize: 'Keywords: "kth largest", "top k frequent", "merge k sorted lists", "running median".',
    });

    drawAsciiBox('Min-Heap of Size K = 3 (Finding 3rd Largest)',
      'Stream: [ 10, 20, 5, 80, 50 ]   k = 3\n' +
      'Insert 10, 20, 5 -> Heap: [ 5, 10, 20 ]\n' +
      'Insert 80 -> size 4 -> poll min (5)  -> Heap: [ 10, 20, 80 ]\n' +
      'Insert 50 -> size 4 -> poll min (10) -> Heap: [ 20, 50, 80 ] (Top = 20!)'
    );

    drawPracticeCard({
      title: 'Top K Frequent Elements (LeetCode 347)',
      question: 'Given an integer array nums and integer k, return the k most frequent elements.',
      hint: 'Count frequencies with HashMap, then use Min-Heap of size k comparing frequency counts.',
      answer: 'Store entries in Min-Heap based on frequency. When heap size > k, poll. Remaining k are top elements.',
      explanation: 'Maintaining size k heap bounds runtime to O(n log k), far faster than sorting whole array.',
      timeComplexity: 'O(n log k) bounded heap',
      spaceComplexity: 'O(n) hash map storage',
    });

    drawAlertRow(
      'Sorting entire array taking O(n log n) when only Top-K elements are requested.',
      'A Min-Heap of size k finds Kth largest; a Max-Heap of size k finds Kth smallest!'
    );

    // Part 11 Code Lab
    drawMultiLangCodePage('PART 11', 'Heaps', 'Kth Largest Element (LeetCode 215)', {
      java: {
        code: [
          'public static int findKthLargest(int[] nums, int k) {',
          '    PriorityQueue<Integer> minHeap = new PriorityQueue<>();',
          '    for (int num : nums) {',
          '        minHeap.offer(num);',
          '        if (minHeap.size() > k) minHeap.poll();',
          '    }',
          '    return minHeap.peek();',
          '}',
        ],
        note: 'Java PriorityQueue is Min-Heap by default. Top of heap is kth largest.',
      },
      cpp: {
        code: [
          'int findKthLargest(const vector<int>& nums, int k) {',
          '    priority_queue<int, vector<int>, greater<int>> minHeap;',
          '    for (int num : nums) {',
          '        minHeap.push(num);',
          '        if (minHeap.size() > k) minHeap.pop();',
          '    }',
          '    return minHeap.top();',
          '}',
        ],
        note: 'Use greater<int> comparator in C++ std::priority_queue to make it a Min-Heap.',
      },
      python: {
        code: [
          'def find_kth_largest(nums: list[int], k: int) -> int:',
          '    min_heap = []',
          '    for num in nums:',
          '        heapq.heappush(min_heap, num)',
          '        if len(min_heap) > k:',
          '            heapq.heappop(min_heap)',
          '    return min_heap[0]',
        ],
        note: 'Python heapq module turns standard list into a Min-Heap in-place.',
      },
    }, {
      time: 'O(n log k) Fast Bounded',
      space: 'O(k) Bounded Heap Size',
      takeaway: 'Maintaining heap size at k evicts smaller candidates and guarantees log k operations.',
    });

    // =========================================================================
    // PART 12: GRAPHS & NETWORKS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 12', 'Graphs & Networks');

    drawFiveQuestionsCard({
      what: 'Network of vertices (nodes) connected by edges. Can be directed/undirected, weighted/unweighted.',
      why: 'Models real-world relationships: social networks, road routes, dependency trees, internet web.',
      how: 'Represent via Adjacency List Map<Node, List<Node>>. Traverse via BFS (Queue) or DFS (Stack/Recursion).',
      when: 'Use BFS for shortest path in unweighted graphs; use DFS for connectivity, cycles, and islands.',
      recognize: 'Keywords: "number of islands", "course schedule", "shortest path", "connected components".',
    });

    drawAsciiBox('Grid Graph Modeling (4-Directional DFS)',
      'Grid:               Adjacency: (r, c) connects to:\n' +
      '[ 1,  1,  0 ]       * (r + 1, c) Down\n' +
      '[ 1,  0,  0 ]       * (r - 1, c) Up\n' +
      '[ 0,  0,  1 ]       * (r, c + 1) Right\n' +
      'Island 1: size 3    * (r, c - 1) Left'
    );

    drawPracticeCard({
      title: 'Course Schedule (LeetCode 207)',
      question: 'Determine if you can finish all courses given prerequisite pairings (Cycle Detection in Directed Graph).',
      hint: 'Topological Sort (Kahn\'s Algorithm via In-Degree Queue) or DFS with 3-color node visited states.',
      answer: 'Compute in-degrees. Enqueue nodes with in-degree 0. While queue not empty, decrement neighbor in-degrees.',
      explanation: 'If total visited courses equals n, graph is a DAG (no cycle); otherwise cycle prevents graduation.',
      timeComplexity: 'O(V + E) linear graph scan',
      spaceComplexity: 'O(V + E) adjacency list',
    });

    drawAlertRow(
      'Infinite recursion loop in graph DFS (forgotten visited set or in-place island sinking!).',
      'For shortest path in unweighted graphs, BFS is guaranteed to reach target in minimum steps.'
    );

    // Part 12 Code Lab
    drawMultiLangCodePage('PART 12', 'Graphs', 'Number of Islands (LeetCode 200)', {
      java: {
        code: [
          'public static int numIslands(char[][] grid) {',
          '    if (grid == null || grid.length == 0) return 0;',
          '    int count = 0;',
          '    for (int r = 0; r < grid.length; r++) {',
          '        for (int c = 0; c < grid[0].length; c++) {',
          '            if (grid[r][c] == \'1\') { count++; dfs(grid, r, c); }',
          '        }',
          '    }',
          '    return count;',
          '}',
          'private static void dfs(char[][] g, int r, int c) {',
          '    if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != \'1\') return;',
          '    g[r][c] = \'0\'; // Sink island in-place',
          '    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);',
          '}',
        ],
        note: 'Mutating \'1\' to \'0\' eliminates visited set memory allocation.',
      },
      cpp: {
        code: [
          'void dfs(vector<vector<char>>& g, int r, int c) {',
          '    if (r < 0 || r >= g.size() || c < 0 || c >= g[0].size() || g[r][c] != \'1\') return;',
          '    g[r][c] = \'0\'; // Sink',
          '    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);',
          '}',
          'int numIslands(vector<vector<char>>& grid) {',
          '    int count = 0;',
          '    for (int r = 0; r < grid.size(); r++) {',
          '        for (int c = 0; c < grid[0].size(); c++) {',
          '            if (grid[r][c] == \'1\') { count++; dfs(grid, r, c); }',
          '        }',
          '    }',
          '    return count;',
          '}',
        ],
        note: 'Pass grid by reference vector<vector<char>>& to prevent copying the whole 2D grid.',
      },
      python: {
        code: [
          'def num_islands(grid: list[list[str]]) -> int:',
          '    if not grid: return 0',
          '    rows, cols, count = len(grid), len(grid[0]), 0',
          '    def dfs(r: int, c: int):',
          '        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != \'1\': return',
          '        grid[r][c] = \'0\' # Sink',
          '        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)',
          '    for r in range(rows):',
          '        for c in range(cols):',
          '            if grid[r][c] == \'1\': count += 1; dfs(r, c)',
          '    return count',
        ],
        note: 'Nested helper function captures outer scope rows and cols cleanly.',
      },
    }, {
      time: 'O(M * N) Total Grid Cells',
      space: 'O(M * N) Worst Case DFS Stack',
      takeaway: 'In-place sinking of visited nodes avoids allocating separate visited sets.',
    });

    // =========================================================================
    // PART 13: DYNAMIC PROGRAMMING
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 13', 'Dynamic Programming');

    drawFiveQuestionsCard({
      what: 'Optimization technique breaking problem into overlapping subproblems, storing results.',
      why: 'Turns exponential brute-force O(2^n) recursion into blazing fast linear O(n) runtime.',
      how: '1. Top-Down (Memoization with Map). 2. Bottom-Up (Tabulation array). 3. Space optimization.',
      when: 'Use when problem has overlapping subproblems AND optimal substructure property.',
      recognize: 'Keywords: "maximum profit", "minimum cost", "ways to climb", "longest common subsequence".',
    });

    drawAsciiBox('Overlapping Subproblems in Fibonacci Tree',
      '                     fib(5)\n' +
      '              /                 \\\n' +
      '         fib(4)                  fib(3)  <-- Duplicate compute!\n' +
      '        /      \\                /      \\\n' +
      '    fib(3)    fib(2)        fib(2)    fib(1)\n' +
      'Store answers in table -> Every subproblem solved exactly once!'
    );

    drawPracticeCard({
      title: 'Coin Change (LeetCode 322)',
      question: 'Find fewest number of coins needed to make up a given amount.',
      hint: 'dp[i] = minimum coins to make amount i. Initialize array with amount + 1.',
      answer: 'dp[0] = 0. For a = 1 to amount: for each coin: if (a >= coin) dp[a] = min(dp[a], dp[a - coin] + 1);',
      explanation: 'Builds optimal minimum coin combination iteratively from 0 up to target amount.',
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount) 1D dp table',
    });

    drawAlertRow(
      'Greedy choice fails for arbitrary coin systems (e.g. amount 6 with coins [1, 3, 4] needs DP).',
      'After writing a 1D dp[n] solution, check if you only need the past 2 variables to get O(1) space.'
    );

    // Part 13 Code Lab
    drawMultiLangCodePage('PART 13', 'Dynamic Programming', 'Climbing Stairs (LeetCode 70)', {
      java: {
        code: [
          'public static int climbStairs(int n) {',
          '    if (n <= 2) return n;',
          '    int prev2 = 1, prev1 = 2;',
          '    for (int i = 3; i <= n; i++) {',
          '        int current = prev1 + prev2;',
          '        prev2 = prev1;',
          '        prev1 = current;',
          '    }',
          '    return prev1;',
          '}',
        ],
        note: 'Space optimized from O(n) array to O(1) by storing only past 2 subproblem states.',
      },
      cpp: {
        code: [
          'int climbStairs(int n) {',
          '    if (n <= 2) return n;',
          '    int prev2 = 1, prev1 = 2;',
          '    for (int i = 3; i <= n; i++) {',
          '        int current = prev1 + prev2;',
          '        prev2 = prev1;',
          '        prev1 = current;',
          '    }',
          '    return prev1;',
          '}',
        ],
        note: 'Optimal recurrence matches Fibonacci: ways(n) = ways(n-1) + ways(n-2).',
      },
      python: {
        code: [
          'def climb_stairs(n: int) -> int:',
          '    if n <= 2: return n',
          '    prev2, prev1 = 1, 2',
          '    for _ in range(3, n + 1):',
          '        prev2, prev1 = prev1, prev1 + prev2',
          '    return prev1',
        ],
        note: 'Python tuple unpacking prev2, prev1 = prev1, prev1 + prev2 updates simultaneously.',
      },
    }, {
      time: 'O(n) Single Linear Pass',
      space: 'O(1) Constant Variables',
      takeaway: 'Identify recurrence relation, then optimize memory by retaining only necessary state.',
    });

    // =========================================================================
    // PART 14: 14 MASTER INTERVIEW PATTERNS
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 14', '14 Master Interview Patterns');

    doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(7.5)
       .text('Recognize problem traits instantly and apply the proven master template:', 24, 60);

    const patterns = [
      ['1. Two Pointers', 'Sorted arrays, pairs with target sum, palindrome validation, in-place partitions.'],
      ['2. Fast & Slow Pointers', 'Cycle detection in linked list/array, finding middle node, happy number loops.'],
      ['3. Sliding Window', 'Contiguous subarray/substring problems with min, max, or target sum constraints.'],
      ['4. Merge Intervals', 'Overlapping schedules, meeting room bookings, calendar conflict resolution.'],
      ['5. Cyclic Sort', 'Arrays with numbers in fixed bounded range 1..n or 0..n (find missing/duplicate).'],
      ['6. In-Place Reversal', 'Reversing sublists of a linked list without allocating new node objects.'],
      ['7. Tree BFS', 'Level-order traversal, zigzag order, minimum depth, shortest path in tree.'],
      ['8. Tree DFS', 'Root-to-leaf path sums, tree diameter, lowest common ancestor, subtree checks.'],
      ['9. Two Heaps', 'Finding running median of a data stream, balancing lower and upper halves.'],
      ['10. Subsets & Backtracking', 'Power sets, permutations, combinations, N-Queens, word search grid exploration.'],
      ['11. Modified Binary Search', 'Rotated sorted arrays, boundary checks, search insert, peak element finding.'],
      ['12. Top K Elements', 'Min-Heap of size k for kth largest; Max-Heap of size k for kth smallest.'],
      ['13. K-Way Merge', 'Merging k sorted lists, streams, or matrices using a PriorityQueue.'],
      ['14. 0/1 Knapsack & DP', 'Choosing items with weight and value constraints to maximize total value.'],
    ];

    let patY = 76;
    patterns.forEach(([pat, desc]) => {
      doc.roundedRect(24, patY, contentWidth, 36, 4).fillAndStroke('#F8FAFC', '#E2E8F0');
      doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(7.5)
         .text(pat, 32, patY + 5);
      doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(6.8)
         .text(desc, 32, patY + 16, { width: contentWidth - 20, lineGap: 1 });
      patY += 40;
    });

    // =========================================================================
    // PART 15: ROADMAPS & TECHNICAL PLAYBOOK
    // =========================================================================
    doc.addPage();
    drawChapterHeader('PART 15', '90-Day Roadmap & Playbook');

    // -- MY 90-DAY DSA ROADMAP (Pristine Visual Timeline) --
    const roadmapY = 56;
    const roadmapH = 175;
    doc.roundedRect(24, roadmapY, contentWidth, roadmapH, 6).fillAndStroke(CARD_BG_BLUE, CARD_BORDER_BLUE);

    // Title banner
    doc.fillColor(ROYAL_BLUE).font('Helvetica-Bold').fontSize(9)
       .text('MY 90-DAY DSA ROADMAP', 34, roadmapY + 8);
    doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(6.8)
       .text('A structured journey from DSA Beginner -> Problem Solver -> Interview Ready', 34, roadmapY + 20);

    const roadmapSteps = [
      ['DAY 1 -> 30', 'Core Foundations: Big-O, Arrays, Strings, Two Pointers & 26-Bucket Array.'],
      ['DAY 31 -> 60', 'Core Data Structures: Binary Search, Sorting, Linked Lists, Stacks, Queues & HashMaps.'],
      ['DAY 61 [ACHIEVED]', 'MILESTONE 1: Complete DSA Foundation Completed!'],
      ['DAY 62 -> 66 [IN PROGRESS]', 'Trees, BST, Heaps & Graphs (Actual Progress: 27 LeetCode Problems Solved!)'],
      ['DAY 67 -> 75', 'Dynamic Programming, Monotonic Stacks & 14 Master Patterns (Target: 60 Problems).'],
      ['DAY 76 -> 90', 'Mixed FAANG Company Sets, Live Timed Mocks & Edge-Case Drills (Target: 100 Problems).'],
    ];

    let rmY = roadmapY + 34;
    roadmapSteps.forEach(([timeline, desc]) => {
      const isMilestone = timeline.includes('ACHIEVED') || timeline.includes('IN PROGRESS');
      doc.fillColor(isMilestone ? '#166534' : ROYAL_BLUE).font('Helvetica-Bold').fontSize(6.8)
         .text(timeline, 34, rmY);
      doc.fillColor(TEXT_MAIN).font(isMilestone ? 'Helvetica-Bold' : 'Helvetica').fontSize(6.5)
         .text(desc, 34, rmY + 9, { width: contentWidth - 20, lineBreak: false });
      rmY += 19;
    });

    // Final Milestone Banner
    const bannerY = roadmapY + roadmapH - 24;
    doc.roundedRect(32, bannerY, contentWidth - 16, 17, 3).fill(ROYAL_BLUE);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(6.3)
       .text('90 DAYS COMPLETE * 100 LEETCODE PROBLEMS * DSA -> PATTERN RECOGNITION -> INTERVIEW READY', 36, bannerY + 5, { align: 'center', width: contentWidth - 24, lineBreak: false });

    // -- 6-Step Technical Strategy Box --
    const stratY = 238;
    const stratH = 175;
    doc.roundedRect(24, stratY, contentWidth, stratH, 6).fillAndStroke(CARD_BG_GREEN, CARD_BORDER_GREEN);
    doc.fillColor('#166534').font('Helvetica-Bold').fontSize(8.5)
       .text('THE 6-STEP LIVE TECHNICAL INTERVIEW STRATEGY', 34, stratY + 8);

    const steps = [
      ['Step 1 (1 min): Clarify Constraints', 'Ask about input size, negative numbers, duplicates, memory limits.'],
      ['Step 2 (2 min): State Brute Force', 'Propose obvious O(n^2) solution first. Establishes baseline confidence!'],
      ['Step 3 (2 min): State the Pattern', 'Explain why a specific structure (e.g. Two Pointers, HashMap) drops time.'],
      ['Step 4 (2 min): Dry Run on Example', 'Trace indices and pointers on scratchpad before touching the keyboard.'],
      ['Step 5 (12 min): Write Clean Code', 'Use meaningful variable names, modular helpers, and handle edge cases.'],
      ['Step 6 (3 min): Verify Edge Cases', 'Test empty input, single element, negative numbers, and all duplicates.'],
    ];

    let stepY = stratY + 24;
    steps.forEach(([st, desc]) => {
      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7.2).text(st, 34, stepY);
      doc.fillColor(TEXT_MAIN).font('Helvetica').fontSize(6.8).text(desc, 34, stepY + 9, { width: contentWidth - 24 });
      stepY += 24;
    });

    // -- Closing Personal Note Card --
    const noteY = 420;
    doc.roundedRect(24, noteY, contentWidth, 75, 6).fill('#1E293B');
    doc.fillColor('#38BDF8').font('Helvetica-Bold').fontSize(8.5)
       .text('A PERSONAL CLOSING NOTE FROM SOWMYA', 34, noteY + 9);
    doc.fillColor('#F8FAFC').font('Helvetica').fontSize(7.5)
       .text('DSA is not a test of raw IQ; it is purely a skill of pattern recognition and deliberate practice.\n' +
             'Do not just memorize solutions. Trace pointers on paper, understand the underlying trade-offs, and celebrate every concept you conquer.\n' +
             'You have everything it takes to succeed in your coding journey. Keep coding and keep moving forward!', 34, noteY + 24, { width: contentWidth - 20, lineGap: 2.5 });

    // =========================================================================
    // FOOTER & HEADER (ACROSS ALL PAGES)
    // =========================================================================
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      if (i > 0) { // Don't print header/footer on cover
        const savedBottom = doc.page.margins.bottom;
        doc.page.margins.bottom = 0;

        // Running Top Header
        doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(7)
           .text('SOWMYA.KCODE  |  DSA DEMYSTIFIED (PHONE-FIRST MASTER EDITION)', 24, 12, { width: contentWidth, align: 'left', lineBreak: false });

        // Running Bottom Footer with exact page count & copyright notice
        doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(6.5)
           .text(`SowmyaKCode * DSA Demystified * (c) 2026 Personal Use Only * Page ${i + 1} of ${range.count}`, 24, 730, { width: contentWidth, align: 'center', lineBreak: false });

        doc.page.margins.bottom = savedBottom;
      }
    }

    doc.end();
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', (err) => reject(err));
  });
};
