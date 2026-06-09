import { type Subject, type Question } from '@/types';

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Engineering Mathematics II',
    icon: '∑',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Electromagnetism and Modern Physics',
    icon: '⚛',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Engineering Chemistry II',
    icon: '🧪',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Computational Problem Solving',
    icon: '<>',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    department: ['CS', 'IT', 'AL', 'AD'],
    subject_name: 'Digital Computer Electronics',
    icon: '🖥',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    department: ['CS', 'IT', 'AL', 'AD', 'AG', 'BT'],
    subject_name: 'Tamils and Technology',
    icon: '🏛',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Basics of Electrical Engineering',
    icon: '⚡',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    department: ['EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Basics of Electronics Engineering',
    icon: '🔌',
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    "id": "b1000000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A retail chain observes frequent stock-outs in their stores despite regular inventory audits. Store managers report delayed deliveries, inaccurate stock records, and lack of demand forecasting.\n\n**Break down the stock-out issue using scenario decomposition, identify two sub-problems, and explain how solving them individually improves efficiency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q1",
    "order_index": 1
  },
  {
    "id": "b1000000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A school is organizing its annual sports day with 500 students participating. Teachers face challenges in scheduling events, assigning referees, allocating equipment, and arranging different sports venues. Students and parents often get confused about timings, locations, and participation criteria.\n\n**Decompose this problem into three sub-problems that can be addressed individually.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q2",
    "order_index": 2
  },
  {
    "id": "b1000000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A program is designed to find the sum of digits of a number. However, an incorrect operator is used.\n\n```\nBEGIN\nn ← 123\nsum ← 0\nWHILE n > 0 DO\ndigit ← n / 10\nsum ← sum + digit\nn ← n / 10\nEND WHILE\nPRINT sum\nEND\n```\n\n**Identify the incorrect operator(s) and replace them with the correct ones.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q3",
    "order_index": 3
  },
  {
    "id": "b1000000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A program is designed to print numbers starting from 1 using a loop. The loop continues as long as the value of the variable is less than or equal to 5.\n\n```\nBEGIN\ni ← 1\nWHILE i ≤ 5 DO\nPRINT i\ni ← i + 1\nEND WHILE\nEND\n```\n\n**Identify the loop termination condition. When will the loop stop executing?**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q4",
    "order_index": 4
  },
  {
    "id": "b1000000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A software development team struggles to deliver a mobile application on time. Issues include unclear client requirements, team miscommunication, and inefficient task allocation.\n\n**Decompose the project delays into sub-problems, select one sub-problem as priority, and suggest a method to resolve it.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q5",
    "order_index": 5
  },
  {
    "id": "b1000000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A food delivery company notices that orders are frequently delivered late. Customers complain about delayed deliveries, while delivery personnel report unclear route assignments and long waiting times at restaurants.\n\n**Using scenario decomposition, identify the main root cause of delays and one sub-problem that should be addressed first.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q6",
    "order_index": 6
  },
  {
    "id": "b1000000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A school system records the marks obtained by a student in an exam. The system needs to evaluate whether the student has passed or failed based on the marks entered. If the marks are 50 or above, the student passes; otherwise, the student fails.\n\n**Write a pseudocode for the above scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q7",
    "order_index": 7
  },
  {
    "id": "b1000000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A pseudocode to multiply a number in a loop is given below.\n\n```\nBEGIN\nresult ← 1\nFOR i ← 1 TO 5 DO\nresult ← result × 2\nEND FOR\nPRINT result\nEND\n```\n\n**Predict the output.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q8",
    "order_index": 8
  },
  {
    "id": "b1000000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A digital library system stores book IDs in a sorted list for fast searching. When a user searches for a specific book ID, the system does not check each ID one by one. Instead, it repeatedly checks the middle element of the list and decides whether to search in the left half or right half. This process continues until the required book ID is found or the search space becomes empty.\n\nGiven sorted book IDs:\n\n`[101, 115, 128, 134, 146, 159, 172, 185, 193, 207]`\n\n**Apply decomposition to solve the problem. Break the process into steps and find the position of the book ID 172 by showing the steps clearly.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q9",
    "order_index": 9
  },
  {
    "id": "b1000000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An algorithm to find the factorial of a given number is given below:\n\nStep 1: Start the algorithm.\nStep 2: Read the given number n.\nStep 3: Set the value of fact to 1.\nStep 4: Set the value of i to 1.\nStep 5: Check whether i is less than or equal to n.\nStep 6: Multiply fact by i and store the result in fact.\nStep 7: Increase the value of i by 1.\nStep 8: Repeat Steps 5 to 7 until i becomes greater than n.\nStep 9: Display the value of fact.\nStep 10: Stop the algorithm.\n\n**Draw an equivalent flowchart for the above algorithm.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q10",
    "order_index": 10
  },
  {
    "id": "b1000000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A program is required to sort a list of 10 numbers in ascending order. The developer finds it difficult to directly write the solution due to multiple steps involved in sorting. To solve this efficiently, the problem needs to be broken down into smaller manageable steps.\n\n**Apply the steps of decomposition to the above scenario and explain how each step can be used to sort the numbers.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q11",
    "order_index": 11
  },
  {
    "id": "b1000000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A digital display system generates a special number sequence for a light pattern. The sequence is defined as follows:\n\n* The first two numbers are 0 and 1.\n* Each next number is the sum of the previous two numbers.\n* The system asks the user to enter the number of terms (n).\n* If n ≤ 0, display \"Invalid Input\".\n* Otherwise, generate and display the sequence up to n terms.\n* Also calculate and display the sum of all generated numbers.\n\n**Draw a flowchart to represent the above system using a loop, clearly showing:**\n\n* Input and validation\n* Initialization of first two terms\n* Loop to generate the sequence\n* Calculation of sum\n* Output of sequence and total sum",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q12",
    "order_index": 12
  },
  {
    "id": "b1000000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A fitness app tracks the daily steps of a user for 10 days:\n\n`[7500, 10200, 8400, 12000, 9800, 15000, 11000, 7000, 9000, 13000]`\n\nThe app needs to:\n\n* Calculate the total steps.\n* Find the average steps.\n* Count the number of days the user crossed 10,000 steps.\n* Identify the maximum steps taken in a day.\n\n**Write an algorithm using a for loop to perform all the above operations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q13",
    "order_index": 13
  },
  {
    "id": "b1000000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An online examination system manages student login, verification, monitoring, and result evaluation. The system performs the following steps:\n\n* The user logs in and undergoes identity verification.\n* If verification fails, the exam session is terminated.\n* If successful, the exam starts and the system monitors for suspicious activity.\n* If suspicious activity is detected, the system checks its severity:\n\n  * Low severity → Warning is given, and the exam continues.\n  * High severity → Exam is paused and the administrator is notified.\n* If no suspicious activity occurs, the student continues the exam.\n* When time ends, the exam is automatically submitted and evaluated.\n* If marks are above the passing criteria → Display \"Pass\"\n* Otherwise → Display \"Fail\"\n\n**Draw a flowchart for the above scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q14",
    "order_index": 14
  },
  {
    "id": "b1000000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A mobile app developer wants to display a list of 12 contact names in alphabetical order in the app's contact list. Currently, the names are unsorted, making it difficult for users to locate a contact quickly.\n\n**Write a step-by-step algorithm using the Bubble Sort technique to sort the contact names alphabetically. Include comparisons, swaps, and iterations until the list is fully sorted.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q15",
    "order_index": 15
  },
  {
    "id": "b1000000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A delivery company tracks daily parcel deliveries for a week (7 days). For each day, the system asks the user to input the number of parcels delivered and time (in minutes) spent delivering. The system calculates:\n\n* Total parcels delivered in the week\n* Average delivery time per valid day\n* Highest single-day parcel delivery\n\nIt also categorizes weekly performance based on total parcels delivered:\n\n* Less than 200 → Low\n* 200 to 499 → Medium\n* 500 to 799 → High\n* 800 and above → Very High\n\nIf the user enters negative parcels or time, the program should print **\"Invalid Input\"** and skip that day in calculations.\n\n**Write an algorithm to implement the above weekly tracking and calculations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q16",
    "order_index": 16
  },
  {
    "id": "b1000000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A hospital management system is designed to assign the nearest available ambulance to an emergency location. The system maintains a list of ambulances and checks their current positions to determine the closest one for faster response time.\n\nGiven the pseudocode to find the nearest ambulance, identify the key operation that influences the time complexity of the algorithm and justify your answer.\n\n```text\nfunction find_nearest_ambulance(ambulances, emergency_location):\nnearest_distance = INFINITY\nnearest_ambulance = null\n\nfor each ambulance in ambulances:\n    distance = calculate_distance(ambulance.location, emergency_location)\n\n    if distance < nearest_distance:\n        nearest_distance = distance\n        nearest_ambulance = ambulance\n\nreturn nearest_ambulance\n```\n\n**Identify the key operation that influences the time complexity of the algorithm and justify your answer.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q17",
    "order_index": 17
  },
  {
    "id": "b1000000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A university system processes student records where the number of operations increases exactly in proportion to the number of students entered. For example, if 100 students are processed, about 100 operations are performed; if 1000 students are processed, about 1000 operations are performed.\n\n**Analyze the scenario and determine the time complexity of the algorithm. Justify your answer based on order of growth.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q18",
    "order_index": 18
  },
  {
    "id": "b1000000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A software company needs to find the maximum sales value from a large list of daily sales for the past week.\n\nDaily Sales (in $):\n\n`[250, 420, 180, 560, 300, 410, 150]`\n\nThe team decides to use a divide and conquer approach to find the maximum efficiently.\n\n**Identify the maximum sales value using divide and conquer.**\n\n**Indicate how the original list can be divided into sublists for the first step.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q19",
    "order_index": 19
  },
  {
    "id": "b1000000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A search engine needs to quickly locate a specific page number from a sorted list of page IDs containing millions of entries. To improve efficiency, the system repeatedly divides the list into halves and searches only the relevant part.\n\n**Identify the algorithmic approach used and indicate why it is suitable for this application.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q20",
    "order_index": 20
  },
  {
    "id": "b1000000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A data processing system uses different algorithms to handle increasing input sizes. Some algorithms execute in constant time, while others show linear, quadratic, or exponential growth in the number of steps as the input size increases.\n\nFor a given input size of `N = 100`, select any three types of time complexities from:\n\n* O(1)\n* O(log N)\n* O(N)\n* O(N²)\n* O(2ⁿ)\n\n**Estimate the approximate number of steps involved for each and compare their performance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q21",
    "order_index": 21
  },
  {
    "id": "b1000000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "In a data processing application, Algorithm A has time complexity O(1), and Algorithm B has time complexity O(log n). However, Algorithm A involves a large constant number of operations, while Algorithm B has a very small constant factor.\n\n**Evaluate whether Algorithm A will always perform better than Algorithm B for all input sizes. Justify your answer using asymptotic analysis and practical performance considerations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q22",
    "order_index": 22
  },
  {
    "id": "b1000000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A fitness tracking app records the number of steps walked each day over a period of time:\n\n`[3000, 4500, 5200, 2800, 6100, 4000, 3500, 4800]`\n\nTo quickly calculate the total number of steps, the app uses a divide and conquer approach by splitting the list into smaller parts, computing partial sums, and combining them.\n\n**Identify the sum of elements in the left and right sublists after the first division.**\n\n**Identify the final total number of steps.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q23",
    "order_index": 23
  },
  {
    "id": "b1000000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A data processing system handles a large list of elements using a divide and conquer strategy. The system repeatedly splits the list into two equal parts at each step until smaller sublists are formed for processing.\n\nDuring execution, the system reaches a stage where there are exactly 4 sublists, each representing a portion of the original data.\n\n**Indicate the original number of elements in the list.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q24",
    "order_index": 24
  },
  {
    "id": "b1000000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company is developing a program to place flags on a square grid for a display competition. The rules are:\n\n* No two flags can be in the same row.\n* No two flags can be in the same column.\n* No two flags can be on the same diagonal.\n\nThe program tries all possible arrangements one by one to find a valid placement.\n\nCurrently, it works on an 8×8 grid, but the company is considering larger grids, such as 10×10.\n\n**Analyze the program in terms of:**\n\n* Maximum number of arrangements it may need to check.\n* Average number of arrangements it will check before finding a solution.\n* How increasing the grid size affects time and space required.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q25",
    "order_index": 25
  },
  {
    "id": "b1000000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A cargo ship is loading high-priority containers with a maximum carrying capacity of 12 kg. Each container has a specific weight and profit value. The goal is to maximize the total profit using the Fractional Knapsack approach.\n\n| Item        | 1  | 2  | 3  | 4  | 5  |\n| ----------- | -- | -- | -- | -- | -- |\n| Weight (kg) | 4  | 2  | 3  | 6  | 1  |\n| Profit      | 20 | 12 | 18 | 24 | 10 |\n\nStep 1 is done for you.\n\n**Complete:**\n\n**Step 2:** Arrange items in descending order of Pi/Wi\n\n**Step 3:** Select items without exceeding capacity to maximize profit\n\n**Step 1: Calculate Pi/Wi**\n\n| Item  | 1 | 2 | 3 | 4 | 5  |\n| ----- | - | - | - | - | -- |\n| Pi/Wi | 5 | 6 | 6 | 4 | 10 |",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q26",
    "order_index": 26
  },
  {
    "id": "b1000000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A text processing program searches for a pattern `p` of length `m` within a text `t` of length `n` using a nested loop approach.\n\nAnalyze the algorithm to determine its worst-case time complexity, space complexity, and how changing the outer loop to:\n\n```c\nfor (int i = 0; i < n; i++)\n```\n\naffects its performance.\n\n```c\nfor (int i = 0; i <= n - m; i++) {\n    int j = 0;\n    while (j < m && t[i+j] == p[j]) {\n        j++;\n    }\n    if (j == m) return i;\n}\n\nSystem.out.println(\"No match found\");\nreturn -1;\n```\n\n**Analyze the algorithm to determine its worst-case time complexity, space complexity, and how changing the outer loop affects its performance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q27",
    "order_index": 27
  },
  {
    "id": "b1000000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A fuel transportation company has a tanker with a limited capacity of 1000 liters. The company needs to transport different types of fuel, each with a specific volume and value per liter.\n\nThe goal is to maximize the total value of fuel transported without exceeding the tanker's capacity. This is a classic example of the Fractional Knapsack Problem, where fractions of items can be included.\n\n**Formulate an algorithm to fill the tanker with the maximum value of fuel without exceeding its capacity by considering the following conditions:**\n\na) Fractions of fuel can be included (e.g., 50% of a fuel type).\n\nb) The total volume of the selected fuels must not exceed the tanker's capacity.\n\nc) The goal is to maximize the total value of the selected fuels.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q28",
    "order_index": 28
  },
  {
    "id": "b1000000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A delivery service needs to deliver parcels to four locations: A, B, C, and D. The distances (in km) between the locations are shown in the graph.\n\nThe delivery person wants to start from location A, visit each location exactly once, and return to A.\n\n**Using the brute force approach:**\n\n* Determine all possible routes starting and ending at A.\n* Calculate the total distance for each route.\n* Identify the route(s) with the minimum total distance.\n* Explain why this approach guarantees finding the shortest route.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q29",
    "order_index": 29
  },
  {
    "id": "b1000000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider designing a wireless network system where multiple transmitters must be placed in a grid layout. Each transmitter is represented by a queen, and each grid position is represented by a cell on a chessboard.\n\nThe goal is to place the transmitters such that no two interfere with each other (i.e., no two are in the same row, column, or diagonal).\n\nGiven the visual representation of a solution for a 4-transmitter setup in the figure titled **4-Queens**,\n\n**Provide any one valid arrangement for a 5-transmitter system without interference.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q30",
    "order_index": 30
  },
  {
    "id": "b1000000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A security firm is testing the strength of a high-security briefcase that uses a 3-digit combination lock. Each digit can be any number from 0 to 5.\n\nA **Brute Force Attack** involves a specialized machine trying every single possible combination until the lock opens.\n\nThe machine takes **2 seconds** to attempt a single combination.\n\n**Analyze the brute force process and determine the effort required to test all possible combinations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q31",
    "order_index": 31
  },
  {
    "id": "b1000000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A network administrator is assigning different communication channels to a set of interconnected devices. Each device is represented as a vertex in the graph shown, and an edge between two vertices indicates that the devices are directly connected and cannot share the same channel due to interference.\n\nThe graph consists of **7 vertices (1 to 7)** connected as shown in the figure.\n\n**Using a graph colouring technique:**\n\n* Assign colours (channels) to all the vertices such that no two adjacent vertices share the same colour.\n* Determine the minimum number of colours required.\n* Provide a valid colouring for the graph.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q32",
    "order_index": 32
  },
  {
    "id": "b1000000-0000-0000-0000-000000000033",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A sales application stores customer information as comma-separated strings. Minor formatting changes cause runtime errors during string splitting and indexing. Developers propose reorganizing the data using structured records to eliminate dependency on string formats.\n\n**Assess how reorganizing program logic from delimiter-based strings to record-based data reduces errors and improves robustness.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q33",
    "order_index": 33
  },
  {
    "id": "b1000000-0000-0000-0000-000000000034",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A social networking platform has millions of users. Each user can have multiple friends, and the platform needs to perform tasks like:\n\n* Suggesting new friends based on mutual connections\n* Quickly identifying friends of friends\n* Displaying a network of connections for a user\n* Finding communities or clusters of connected users\n\nEach user is connected to other users in a complex network that doesn’t follow a simple sequential order. The number of connections varies per user, and relationships are dynamic – new friendships are added and old ones removed regularly.\n\n**Identify the category of data structure suitable for representing these user relationships and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q34",
    "order_index": 34
  },
  {
    "id": "b1000000-0000-0000-0000-000000000035",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A bus stop maintains a queue for passengers waiting to board. Initially, the queue contains the following passenger IDs in order of arrival (front → rear):\n\n`[201, 202, 203, 204]`\n\nThe following actions occur:\n\n* A new passenger with ID 205 arrives and joins the queue.\n* The first passenger in the queue boards the bus and leaves.\n\n**Determine the passenger at the front of the queue and list all passenger IDs in the queue after performing the above operations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q35",
    "order_index": 35
  },
  {
    "id": "b1000000-0000-0000-0000-000000000036",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A library uses a stack to manage returned books. The most recently returned book is placed on top of the stack.\n\n**State which stack operation is performed when a librarian adds a newly returned book and briefly describe its effect.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q36",
    "order_index": 36
  },
  {
    "id": "b1000000-0000-0000-0000-000000000037",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A report-generation algorithm remains unchanged, yet its execution time drops significantly after reorganizing input data into structured records with logical grouping. This improvement surprises junior developers.\n\n**Assess how data organization alone can enhance algorithm performance without modifying algorithmic steps.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q37",
    "order_index": 37
  },
  {
    "id": "b1000000-0000-0000-0000-000000000038",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A weather monitoring system collects daily readings for temperature, humidity, wind speed, and rainfall at multiple locations. Each reading is a single value recorded in the system’s memory for further analysis and reporting.\n\n**Identify the most suitable type of data used to store these individual measurements.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q38",
    "order_index": 38
  },
  {
    "id": "b1000000-0000-0000-0000-000000000039",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider four different real-world situations where tasks or items need to be processed in a sequence.\n\n**Predict which type of queue would be most suitable and justify briefly.**\n\n**Situation 1:**\nIn a fast-food restaurant drive-thru, cars line up to place their orders. The first car to arrive is the first car to be served, and cars move forward as orders are completed.\n\n**Situation 2:**\nIn a library book drop-off system, books can be returned either at the main entrance or at the back entrance, depending on where the librarian is stationed.\n\n**Situation 3:**\nIn a video streaming service, multiple videos are queued to pre-load. When the last video finishes pre-loading, the system cycles back to the first video to continue buffering, ensuring smooth playback.\n\n**Situation 4:**\nIn a fire station emergency call system, calls are attended based on the urgency of the situation rather than the time the call was received. The most critical emergencies are handled first.\n\nExample:\n**Simple Queue:** Cars are served in the order they arrive, following the FIFO principle.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q39",
    "order_index": 39
  },
  {
    "id": "b1000000-0000-0000-0000-000000000040",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A hostel maintains a singly linked list of room numbers to track occupied rooms. When a new student checks in, their room number is added to the end of the list.\n\n**State which linked list operation is performed when a new room number is added at the end and briefly describe what it does.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q40",
    "order_index": 40
  },
  {
    "id": "b1000000-0000-0000-0000-000000000041",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider an Abstract Data Type (ADT) representing a function to compute the square of a non-negative integer.\n\n**Implementation in C:**\n\n```c\n#include <stdio.h>\n\nint square(int n) {\n    // Precondition: n >= 0\n    return n * n;\n    // Postcondition: Returns the square of n\n}\n\nint main() {\n    printf(\"%d\\n\", square(-4));\n    printf(\"%d\\n\", square(0));\n    printf(\"%d\\n\", square(6));\n    return 0;\n}\n```\n\n**Identify which function calls in main() satisfy the precondition and which violate it. Explain the postcondition for the function square and what it guarantees if the precondition is satisfied.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q41",
    "order_index": 41
  },
  {
    "id": "b1000000-0000-0000-0000-000000000042",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Imagine a company’s organizational chart, where the CEO is at the root of the hierarchy.\n\nThe CEO oversees multiple Department Heads (Level 1). Each Department Head manages several Managers (Level 2), and each Manager supervises a team of Employees (Level 3). The structure helps visualize the reporting relationships within the company.\n\nConsider the following tree representing an organizational chart with dummy alphabet representation.\n\n**Infer the following from the given Tree:**\n\n1. Child Node of “D”\n2. Sibling of node “E” & “F”\n3. Leaf nodes\n4. Nodes at Level 2\n5. Number of Edges in the tree",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q42",
    "order_index": 42
  },
  {
    "id": "b1000000-0000-0000-0000-000000000043",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider an Abstract Data Type (ADT) representing a digital music playlist, where each song has a title, artist, and duration.\n\nThe ADT supports operations such as:\n\n* Creating a playlist\n* Adding new songs\n* Deleting songs\n* Updating song details\n* Checking information about songs\n\n**Tasks:**\n\ni) Identify and classify the operations described above into:\n\n* Create operations\n* Copy operations\n* Destroy operations\n* Modification operations\n* Inquiry operations\n\nii) Explain the importance of inquiry operations in this ADT and why they do not change the playlist.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q43",
    "order_index": 43
  },
  {
    "id": "b1000000-0000-0000-0000-000000000044",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider a company’s organizational hierarchy represented as a tree, where the CEO is at the root, and each subsequent level of employees is arranged as branches.\n\nThe root (CEO) has direct reports (like department heads), and each department head manages a set of employees.\n\n**Construct a similar tree to represent a university’s academic structure in a proper hierarchy.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q44",
    "order_index": 44
  },
  {
    "id": "b1000000-0000-0000-0000-000000000045",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A library system keeps track of borrowed books using a linked list.\n\nEach node contains the book ID and student ID.\n\nThe current list of borrowed books is:\n\n```text\n[BookID: 201, StudentID: 11]\n→ [BookID: 202, StudentID: 12]\n→ [BookID: 203, StudentID: 13]\n```\n\nOperations performed:\n\n* A new book BookID: 204 borrowed by StudentID: 14 is added at the end.\n* The book with BookID: 202 is returned and removed from the list.\n\nDisplay the list of currently borrowed books.\n\n**Tasks:**\n\ni) Draw or write the linked list after performing the operations.\n\nii) State the final sequence of Book IDs in order.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q45",
    "order_index": 45
  },
  {
    "id": "b1000000-0000-0000-0000-000000000046",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider a delivery network where different cities are connected by various transportation routes, such as highways, railways, or flights.\n\nEach city is represented as a node, and each direct route between two cities is represented as an edge.\n\nThe weight of each edge represents the time (in hours) required to travel between two cities.\n\n**Cities:**\n\n* A – Delhi\n* B – Mumbai\n* C – Bangalore\n* D – Chennai\n* E – Kolkata\n\nA graph and an adjacency-list representation are provided.\n\n**Spot the error and correct it in the given figure titled \"Adjacency List\".**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q46",
    "order_index": 46
  },
  {
    "id": "b1000000-0000-0000-0000-000000000047",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider an application:\n\n**Music Playlist – Storing the names of songs in a playlist.**\n\nThe choice of array for the above application can be a **One-Dimensional Array** as it stores a sequential list of song names.\n\nRepresentation:\n\n```text\nsongs = [\"Song A\", \"Song B\", \"Song C\", \"Song D\"]\n```\n\n**Justify with reasoning the choice of array type and its representation that is required for the following application scenarios:**\n\n**Application 1:** Cinema Seat Booking System – Storing seat availability in a cinema hall.\n\n**Application 2:** Weather Simulation Model – Storing temperature, humidity, and wind speed at different altitudes, locations, and times.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q47",
    "order_index": 47
  },
  {
    "id": "b1000000-0000-0000-0000-000000000048",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider a flight network where airports are connected by direct flights.\n\nEach airport is represented as a node, and each direct flight between two airports is represented as an edge.\n\nThe network can be represented as a graph where the adjacency matrix provides a convenient way to store and analyze the connections between airports.\n\n**Airports:**\n\n* A – Delhi Indira Gandhi Airport\n* B – Mumbai Chhatrapati Shivaji Airport\n* C – Bangalore Kempegowda Airport\n* D – Chennai International Airport\n* E – Kolkata Subhas Chandra Bose International Airport\n\nThe figure titled **\"Graph Representation of Flight Network\"** represents the graph of the flight network.\n\n**Tasks:**\n\ni) Complete the respective adjacency matrix of the flight network given in the figure titled **\"Adjacency Matrix of Flight Network\"**.\n\nii) If suppose the adjacency matrix value for C turns as:\n\n```text\nC: 0 1 0 1 0\n```\n\n**Redraw the corresponding graph representation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-I Q48",
    "order_index": 48
  },
  {
    "id": "b1000000-0000-0000-0000-000000000049",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A school stores student data in a flat-file database. The system allows only basic search operations and does not support advanced queries. Duplicate records are often entered without any validation.\n\n**Examine the characteristics of the system and explain how they affect data management.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q1",
    "order_index": 49
  },
  {
    "id": "b1000000-0000-0000-0000-000000000050",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A small library maintains a list of books with details like title, author, and price in a single file. The system handles only a small amount of data and does not require linking between different records.\n\n**Explain why a flat-file database is an appropriate choice for this scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q2",
    "order_index": 50
  },
  {
    "id": "b1000000-0000-0000-0000-000000000051",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Determine the appropriate cloud storage type used in each application with suitable justification.\n\n* A startup company stores its website data and backups using services like AWS and Google Cloud to reduce infrastructure cost and improve scalability.\n* A bank maintains its customer transaction data in a dedicated storage environment that is not shared with other organizations due to strict security requirements.\n* A multinational company stores sensitive employee records in a private environment while keeping general application data in a public cloud for better scalability.\n\n**Determine the appropriate cloud storage type used in each application with suitable justification.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q3",
    "order_index": 51
  },
  {
    "id": "b1000000-0000-0000-0000-000000000052",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A media company needs cloud storage to manage large video files and backups, while another organization requires secure cloud storage with collaboration and compliance features for enterprise use.\n\n**Determine the suitable cloud storage providers for these requirements with justification.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q4",
    "order_index": 52
  },
  {
    "id": "b1000000-0000-0000-0000-000000000053",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An organization manages different types of data for its operations. Sales records are stored in tables, web data is collected in XML format, and emails and images are stored separately. These data types are used for reporting, communication, and content management.\n\n**Classify the data given in the scenario into appropriate type with justification.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q5",
    "order_index": 53
  },
  {
    "id": "b1000000-0000-0000-0000-000000000054",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A small tuition center maintains student details like name, phone number, and marks in a single Excel sheet. There are no separate tables or relationships.\n\n**Identify the type of database used and mention one key characteristic.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q6",
    "order_index": 54
  },
  {
    "id": "b1000000-0000-0000-0000-000000000055",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An employee stores important project files in a cloud storage service and accesses them from different locations using the internet. The employee logs into the cloud platform, retrieves the required file, and uses it for further processing. The system ensures secure and reliable access to stored data.\n\n**Write the steps involved in reading data from cloud storage in the above scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q7",
    "order_index": 55
  },
  {
    "id": "b1000000-0000-0000-0000-000000000056",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company uses cloud storage to access data from different devices, increase storage capacity when needed, and recover important files during system failures.\n\n**Outline any two benefits of cloud storage highlighted in the above scenario with suitable justification.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q8",
    "order_index": 56
  },
  {
    "id": "b1000000-0000-0000-0000-000000000057",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A college maintains student details in one table and department information with HOD details in another table. The administration needs to combine and analyze data from both tables to manage academic records effectively.\n\n(Student Table and Department Table provided)\n\n**Using the given Students and Departments tables, determine the output of the following relational algebra operations:**\n\na) Retrieve the HOD name of the MECH department by applying a selection operation on the Departments table.\n\nb) Display only the names of students from the Students table using a projection operation.\n\nc) Using the DeptName values from both tables, determine the resulting tables for the union, intersection, and difference operations.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q9",
    "order_index": 57
  },
  {
    "id": "b1000000-0000-0000-0000-000000000058",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider the employee table provided.\n\n**a)** Drop the column phone number from the Employee table and display the output.\n\n**b)** Modify the datatype of salary column to integer in the employee table and display the output.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q10",
    "order_index": 58
  },
  {
    "id": "b1000000-0000-0000-0000-000000000059",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A hospital database manages patient, doctor, and insurance information using various constraints. Each patient is assigned a unique ID to avoid duplication. The system enforces valid ranges for attributes such as age and restricts deletion of doctor records that are linked to patients. It also applies specific rules to determine insurance eligibility based on predefined conditions.\n\n**Illustrate how different types of data integrity are applied in this system and discuss their impact on data accuracy.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q11",
    "order_index": 59
  },
  {
    "id": "b1000000-0000-0000-0000-000000000060",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A college database administrator needs to manage the structure of a student database system. The administrator creates new tables for storing student details, modifies existing table structures to add new attributes, removes unnecessary tables, and renames tables when required.\n\n**Illustrate how DDL (Data Definition Language) commands are used in the above scenario and discuss the role of commands such as CREATE, ALTER, DROP, and RENAME in database management.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q12",
    "order_index": 60
  },
  {
    "id": "b1000000-0000-0000-0000-000000000061",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An organization uses different servers to support its operations. Employees access websites through a system that delivers web pages, store and retrieve data from a centralized system, share files within the office network, send and receive emails, and resolve domain names while browsing. Some systems also act as intermediaries to filter content and improve security.\n\n**Classify any five types of servers used in the given scenario and explain the function of each in supporting organizational activities.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q13",
    "order_index": 61
  },
  {
    "id": "b1000000-0000-0000-0000-000000000062",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "Consider the student table provided.\n\n**a)** Insert two rows into the student table. After entering value, the new table should appear as shown.\n\n**b)** Write an SQL query to perform the following operations:\n\ni) Update the address of student named Mani to Mumbai.\n\nii) Delete the student from the student table whose ID is 5.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q14",
    "order_index": 62
  },
  {
    "id": "b1000000-0000-0000-0000-000000000063",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "An organization plans to upgrade its storage infrastructure to handle increasing data demands. It needs a solution that provides both high performance and protection against data loss. Different RAID configurations are being evaluated to meet these requirements. The goal is to choose the most suitable RAID level based on speed and reliability.\n\n**Compare RAID 0, RAID 1, RAID 5, and RAID 10 in terms of performance and data reliability. Also evaluate the RAID levels and determine which configuration provides the highest data reliability.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q15",
    "order_index": 63
  },
  {
    "id": "b1000000-0000-0000-0000-000000000064",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A banking system stores confidential customer account details in a database. Managers are given permission to view and update customer information for banking operations. Unauthorized employees should not be allowed to modify sensitive records. The database administrator manages these permissions to maintain data security and controlled access.\n\n**Illustrate how GRANT and REVOKE commands can be applied to control user privileges in this system with an example query.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q16",
    "order_index": 64
  },
  {
    "id": "b1000000-0000-0000-0000-000000000065",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A user sends a video file from a laptop to a smart TV through a network. The data travels through a fiber optic cable, and both devices follow a common set of communication rules to successfully exchange information.\n\n**Identify the components of the data communication system involved in this scenario and explain their roles.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q17",
    "order_index": 65
  },
  {
    "id": "b1000000-0000-0000-0000-000000000066",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A university connects multiple departments using a wired network to enable communication between students and faculty. During file transfer, a student sends a project file intended for a professor, but the file is incorrectly received by another student in a different department.\n\n**Identify the issue in the communication system and indicate the characteristic of data communication that has been violated in this scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q18",
    "order_index": 66
  },
  {
    "id": "b1000000-0000-0000-0000-000000000067",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company assigns subnets A, B, C, and D from the network 192.168.12.0. Each subnet must support communication within its range without overlap.\n\n**Identify the network addresses of all four subnets.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q19",
    "order_index": 67
  },
  {
    "id": "b1000000-0000-0000-0000-000000000068",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "In a small office network, the administrator manually assigns IP addresses to printers and servers, while user devices automatically receive IP addresses from a central system.\n\n**Identify which devices use static IP assignment and which devices use dynamic IP assignment.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q20",
    "order_index": 68
  },
  {
    "id": "b1000000-0000-0000-0000-000000000069",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "In a data communication system, different types of data flow are used to control the direction of data transmission between devices. Consider a scenario where two devices are connected in such a way that both can transmit and receive data at the same time without waiting for each other.\n\n**Identify the type of data flow used in this system and differentiate it clearly from the other types of data flow used in data communication.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q21",
    "order_index": 69
  },
  {
    "id": "b1000000-0000-0000-0000-000000000070",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company uses a network to transfer important documents between two offices. During transmission, some parts of the document are altered, resulting in incorrect information at the receiving end.\n\n**Identify the issue in the communication system and indicate the characteristic of data communication that has been violated in this scenario.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q22",
    "order_index": 70
  },
  {
    "id": "b1000000-0000-0000-0000-000000000071",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A network administrator divides the network 192.168.12.0 into four equal subnets (A, B, C, and D) to allocate IP addresses efficiently across different departments. Each subnet has a defined network address and broadcast address.\n\n**Based on the given subnetting, identify the network address of subnet B, the broadcast address of subnet C, and determine the subnet in which the IP address 192.168.12.200 belongs.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q23",
    "order_index": 71
  },
  {
    "id": "b1000000-0000-0000-0000-000000000072",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "In an organization, network devices that require constant connectivity are configured manually, while temporary devices are assigned IP addresses by a network service.\n\n**Indicate the type of IP assignment used for permanent devices and temporary devices.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q24",
    "order_index": 72
  },
  {
    "id": "b1000000-0000-0000-0000-000000000073",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A network diagram shows four nodes (Node 1, Node 2, Node 3, Node 4) where each node is directly connected to every other node, forming multiple communication links between devices.\n\n**Analyze how data communication occurs in this network structure and explain how the connectivity between nodes affects reliability and data transmission. Also evaluate how the network behaves if one connection fails.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q25",
    "order_index": 73
  },
  {
    "id": "b1000000-0000-0000-0000-000000000074",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A university is designing a campus network that connects multiple buildings such as academic blocks, administration offices, and hostels. The network is structured using core, distribution, and access layers to ensure efficient communication and scalability. During operation, issues such as data congestion, uneven traffic distribution, and slow communication between departments are observed.\n\n**Explain how the core, distribution, and access layers function in this campus network. Also describe how data flows between different LANs and discuss the role of load balancing in improving network performance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q26",
    "order_index": 74
  },
  {
    "id": "b1000000-0000-0000-0000-000000000075",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company plans to design a network for its office where communication between devices should be easy to manage, and adding or removing devices should not affect the overall network structure.\n\n**Analyze the requirement and explain which network topology is most suitable. Also describe how this topology supports communication and network management.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q27",
    "order_index": 75
  },
  {
    "id": "b1000000-0000-0000-0000-000000000076",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A student attempts to access the website [www.campus.edu](http://www.campus.edu) from a campus network. The system must resolve the domain name into an IP address using the DNS hierarchy. During this process, multiple DNS servers are involved before the final IP address is obtained.\n\n**Explain the step-by-step process of domain name resolution, clearly describing the role of root servers, TLD servers, and authoritative servers. Also, distinguish between forward and reverse domain name services.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q28",
    "order_index": 76
  },
  {
    "id": "b1000000-0000-0000-0000-000000000077",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A network administrator is designing networks for different organizations such as a multinational company, a large organization, and a small business. The administrator must assign suitable IPv4 address classes based on the size and requirement of each network.\n\n**Analyze how IPv4 address classification supports this requirement and explain how different classes are suitable for networks of varying sizes and purposes.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q29",
    "order_index": 77
  },
  {
    "id": "b1000000-0000-0000-0000-000000000078",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A university is designing a campus network to connect multiple departments located in different buildings. The network must support high-speed data transfer, apply routing policies between departments, and provide reliable access to end-user devices like computers and printers.\n\n**Analyze how the core layer, distribution layer, and access layer contribute to the efficient configuration and management of the campus network.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q30",
    "order_index": 78
  },
  {
    "id": "b1000000-0000-0000-0000-000000000079",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A company is assigned the IP address 192.168.10.25 with subnet mask 255.255.255.0.\n\n**Identify the network address and host address, and indicate how the given IP address is divided into network and host portions using the subnet mask.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q31",
    "order_index": 79
  },
  {
    "id": "b1000000-0000-0000-0000-000000000080",
    "subject_id": "a1000000-0000-0000-0000-000000000004",
    "question": "A multinational company operates offices in different cities and countries. The head office needs to communicate with two remote branches using a dedicated communication link for secure data transfer. At the same time, multiple other branch offices are interconnected through a shared network infrastructure that allows data exchange between many locations.\n\n**Based on this scenario, identify and differentiate the types of WAN connections used for:**\n\n* Communication between the head office and two specific branches.\n* Communication among multiple branch offices.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22GE002 - Computational Problem Solving",
    "notes": "Module Test-II Q32",
    "order_index": 80
  },
  {
    "id": "c1000000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A student studies electric field lines around isolated positive and negative charges and observes distinct patterns in diagrams. The patterns differ significantly when multiple charges are introduced close to each other. The student attempts to relate these patterns to force interactions. The environment is ideal with no external disturbances.\n\n**Integrate the observed field line patterns with the concept of electric force and infer how these visual representations indicate interaction behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q1",
    "order_index": 1
  },
  {
    "id": "c1000000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineering team must choose between representing electric interactions using force vectors or electric field concepts for system design. The system involves multiple charges and requires scalability. The team evaluates which approach provides better clarity and efficiency.\n\n**Assess which representation is more effective and justify the reasoning based on system requirements.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q2",
    "order_index": 2
  },
  {
    "id": "c1000000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A timing circuit in an electronic device depends on predictable charging and discharging of a capacitor. Engineers must ensure consistent timing intervals despite environmental changes. The capacitor interacts with resistive elements to control signal delays. Material properties influence overall timing stability.\n\n**Integrate the role of capacitance and material properties to infer how timing consistency is achieved and maintained in such circuits.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q3",
    "order_index": 3
  },
  {
    "id": "c1000000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An electronics company selects capacitors for consumer devices requiring reliability and safety. The choice must consider dielectric strength, durability, and cost. Performance under varying voltages is critical. Engineers must balance technical and practical constraints.\n\n**Assess how capacitor selection influences reliability and justify the professional considerations involved.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q4",
    "order_index": 4
  },
  {
    "id": "c1000000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A computational model is being developed to simulate electric field distribution for multiple charges. The system must calculate field intensity at various points in space. The charges are fixed and their positions are known. The model must follow a logical sequence to ensure accurate results.\n\n**Formulate a logical procedure to compute electric field intensity at any point and justify the sequence of steps involved.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q5",
    "order_index": 5
  },
  {
    "id": "c1000000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A system initially uses discrete charge calculations to determine electric field but plans to extend to continuous charge distributions. The complexity increases as the number of charges grows significantly. The designers must evaluate computational efficiency.\n\n**Analyze the trade-off between discrete summation and continuous distribution methods and infer which approach is more efficient for large systems.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q6",
    "order_index": 6
  },
  {
    "id": "c1000000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A student assembles a circuit requiring a specific equivalent capacitance using multiple available capacitors. The available units vary in capacitance values. The student must logically combine them to achieve the desired outcome. Incorrect arrangement leads to mismatch in expected results.\n\n**Construct a logical procedure to achieve the required equivalent capacitance using series and parallel combinations while ensuring correctness of arrangement.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q7",
    "order_index": 7
  },
  {
    "id": "c1000000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A power system incorporates capacitors for energy buffering but faces limitations in size and heat dissipation. Increasing capacitance improves performance but adds bulk. Designers must evaluate efficiency versus scalability. Trade-offs are necessary for optimal system performance.\n\n**Evaluate the trade-offs involved in increasing capacitance and infer how system efficiency is impacted.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q8",
    "order_index": 8
  },
  {
    "id": "c1000000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A charged spherical shell produces an electric field in surrounding space. A physicist models the flux through a closed surface enclosing the shell and attempts to relate it to the enclosed charge using integral expressions. They aim to verify whether the flux remains constant irrespective of surface radius. The situation requires linking surface integral formulation with charge distribution.\n\n**Formulate the relationship between electric flux and enclosed charge and analyze how changing the Gaussian surface radius affects the computed flux.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q9",
    "order_index": 9
  },
  {
    "id": "c1000000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research team observes unexpected electric field readings inside a supposedly shielded conducting chamber. The chamber is grounded, but sensors indicate non-zero field values at certain points. The chamber walls are made of conducting material but have minor imperfections and joints. External charged objects are placed near the chamber during testing. The team must identify the cause of shielding failure.\n\n**Diagnose the possible reasons for the presence of electric field inside the chamber and infer how imperfections in conductor properties or grounding influence electrostatic equilibrium conditions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q10",
    "order_index": 10
  },
  {
    "id": "c1000000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A laboratory setup measures electric flux through a tilted flat surface placed in a uniform electric field. The recorded flux values fluctuate unexpectedly when the surface orientation is changed slightly. The researchers suspect errors in interpreting angle dependence and projection of area vectors. They must diagnose whether the issue arises from incorrect mathematical formulation or conceptual misunderstanding of flux directionality.\n\n**Analyze the inconsistency in measured flux values and infer the underlying conceptual or computational error related to surface orientation and field interaction.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q11",
    "order_index": 11
  },
  {
    "id": "c1000000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A dipole consisting of charges +q and −q separated by a small distance is placed in a uniform electric field. The system is free to rotate about its center. The angle between the dipole axis and the electric field varies during motion. Engineers are studying how torque depends on orientation for micro-actuator applications. They must model rotational behavior based on electric parameters.\n\n**Formulate the relationship governing torque on the dipole and determine how angular variation influences the rotational tendency, integrating the concept of dipole moment into the analysis.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q12",
    "order_index": 12
  },
  {
    "id": "c1000000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An electrostatic sensor system is being designed in a research lab where point charges are arranged along a straight axis to generate a controlled electric environment. The design team observes that varying the spacing between charges significantly alters the work required to move a test charge between two points. They also note that maintaining a uniform electric field is critical for accurate sensing. The system must minimize energy consumption while ensuring measurable potential differences. The engineer must decide the optimal configuration using relationships between electric field and potential.\n\n**Determine an optimal configuration strategy that minimizes energy expenditure while maintaining measurable potential difference, and justify how electric field–potential relationships guide this design decision.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q13",
    "order_index": 13
  },
  {
    "id": "c1000000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A copper wire of uniform cross-section is connected to a battery in a laboratory setup where the length of the wire is doubled while keeping the applied potential difference constant; simultaneously, temperature rises slightly due to prolonged current flow, altering charge carrier mobility; experimental readings show a reduction in current despite unchanged voltage; microscopic observations indicate variations in drift velocity; the system is analyzed to understand how geometry and temperature influence conduction; additional data suggests resistivity variation with temperature; the circuit is otherwise stable and free from external disturbances.\n\n**Determine how the current changes quantitatively and infer the combined impact of length and temperature variation on drift velocity and resistance; integrate the relationships between resistivity, geometry, and microscopic charge motion to justify the observed reduction in current under constant voltage conditions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q14",
    "order_index": 14
  },
  {
    "id": "c1000000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A high-voltage experimental setup exhibits unexpected variations in electric potential across a region where equipotential surfaces were assumed to be evenly spaced. Measurements reveal that the potential gradient is inconsistent, and charged particles deviate from predicted paths. The system includes both discrete charges and a continuous charge distribution. Engineers suspect an error in modeling the potential field. The inconsistency affects the calculated electrical energy stored in the system.\n\n**Analyze the possible causes of the observed inconsistencies in potential gradient and particle motion, and infer how modeling errors in charge distribution affect system energy interpretation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q15",
    "order_index": 15
  },
  {
    "id": "c1000000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineer designs a long-distance power transmission system using wires of varying materials where conductivity differs significantly; increasing wire thickness improves current capacity but raises cost and weight; environmental temperature variations affect resistivity across regions; the system must maintain efficient energy transfer with minimal power loss; alternative materials offer higher conductivity but lower mechanical durability; trade-offs between efficiency, cost, and reliability must be evaluated before final implementation.\n\n**Evaluate the trade-offs involved in selecting conductor material and dimensions; prioritize design decisions that optimize power efficiency while balancing cost and environmental constraints, and justify the final selection using conductivity and resistance principles.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q16",
    "order_index": 16
  },
  {
    "id": "c1000000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A science communicator explains magnetism using a crowd analogy where each person represents a small magnetic region. Initially, people face random directions, representing an unmagnetized state. When music plays, people align in one direction, and when the music stops, the alignment disappears. This analogy is used to explain the behavior of magnetic materials.\n\n**Map each element of the analogy to actual physical concepts such as domains, magnetization, and external field. Also, explain what causes the loss of alignment when the external influence is removed.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q17",
    "order_index": 17
  },
  {
    "id": "c1000000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A physics textbook states that magnetic fields are produced only when electric charges move through a conductor. A researcher questions this by pointing out that some materials exhibit magnetism even without visible current flow.\n\n**Identify the hidden assumption in the textbook statement and explain how atomic-level motion provides a more complete explanation of magnetism.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q18",
    "order_index": 18
  },
  {
    "id": "c1000000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An embedded systems engineer is designing a circuit that requires a specific equivalent capacitance using multiple capacitors of known values. The available components include capacitors of varying ratings, and the final design must meet strict space and performance constraints. The engineer must logically determine the arrangement strategy before implementation.\n\n**Formulate the logical sequence required to achieve the desired equivalent capacitance using the available components while ensuring design constraints are satisfied.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q19",
    "order_index": 19
  },
  {
    "id": "c1000000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A robotics system requires stable voltage supply during sudden load variations. Engineers consider adding capacitors to mitigate voltage drops but must decide specifications under limited design space and cost constraints.\n\n**Recommend a strategic approach to selecting capacitor specifications to ensure voltage stability under the given constraints.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q20",
    "order_index": 20
  },
  {
    "id": "c1000000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "During a classroom discussion, a student argues that since isolated electric charges exist and produce electric fields, isolated magnetic charges (monopoles) should also exist. The student supports this by explaining that even when a charged object is divided, charge still exists independently. Another student responds by cutting a bar magnet into smaller pieces and observing that each piece still has both north and south poles.\n\n**Explain why the first argument appears logically correct based on electrostatics. Then, using experimental and theoretical reasoning, explain why isolated magnetic poles are not observed.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q21",
    "order_index": 21
  },
  {
    "id": "c1000000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineer claims that magnetic fields can exist independently in space even without current or motion. Another engineer disagrees, stating that magnetic fields always originate from charge motion or intrinsic properties of particles.\n\n**Evaluate the correctness of the first claim using principles of magnetic field generation and justify your answer.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q22",
    "order_index": 22
  },
  {
    "id": "c1000000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A communication circuit uses capacitors to filter noise and stabilize voltage signals in a data transmission system. Engineers integrate capacitors at multiple stages, observing that certain placements improve signal clarity while others cause unintended delays. The behavior is linked to charging and discharging cycles interacting with signal frequency.\n\n**Integrate the concepts of charging and discharging processes with signal behavior to infer how capacitor placement affects system performance in the given circuit.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q23",
    "order_index": 23
  },
  {
    "id": "c1000000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A consumer electronics company must choose between using capacitors or batteries for a wearable device that requires quick bursts of energy but minimal long-term storage. The decision impacts cost, reliability, and user experience.\n\n**Assess the suitability of capacitors for this application and justify the decision considering professional design priorities.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q24",
    "order_index": 24
  },
  {
    "id": "c1000000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A charged particle moves through a uniform magnetic field with velocity perpendicular to the field. Engineers observe that the particle follows a curved path instead of moving in a straight line. The radius of curvature changes when either the magnetic field strength or particle velocity is altered. The system is used in particle beam steering applications.\n\n**Analyze how magnetic field strength and particle velocity influence the trajectory of the particle and determine the relationship governing the radius of curvature.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q25",
    "order_index": 25
  },
  {
    "id": "c1000000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research laboratory is designing a cyclotron to accelerate charged particles for material analysis. Engineers must select appropriate magnetic field strength and operating frequency to ensure resonance conditions are maintained. Increasing particle energy introduces practical limitations related to relativistic effects and machine size.\n\n**Evaluate the trade-offs involved in cyclotron design and determine the factors that limit maximum particle energy.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q26",
    "order_index": 26
  },
  {
    "id": "c1000000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A current-carrying conductor is placed in a magnetic field and experiences a force. Engineers observe that changing the direction of current reverses the direction of motion. Similarly, reversing the magnetic field also changes the force direction. The system is being used in an electromechanical actuator.\n\n**Formulate the relationship between current, magnetic field, and force, and determine how directional changes influence actuator motion.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q27",
    "order_index": 27
  },
  {
    "id": "c1000000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A loudspeaker uses a voice coil placed inside a magnetic field. Audio signals produce alternating currents through the coil, causing vibrations that generate sound. Engineers must optimize magnetic field strength and coil design to improve efficiency while minimizing power consumption.\n\n**Analyze how magnetic force generation contributes to sound production and evaluate design factors affecting efficiency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q28",
    "order_index": 28
  },
  {
    "id": "c1000000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A moving coil galvanometer is used to detect small currents in a measurement system. The instrument relies on torque generated by a current-carrying coil placed in a magnetic field. Engineers notice calibration errors due to changes in magnetic field strength and spring characteristics.\n\n**Determine how magnetic field strength and restoring torque influence instrument sensitivity and accuracy.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q29",
    "order_index": 29
  },
  {
    "id": "c1000000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A measurement laboratory considers replacing traditional analog galvanometers with digital sensing systems. While digital systems provide higher accuracy and automation, analog instruments remain useful for visualizing trends and transient behavior.\n\n**Assess the advantages and limitations of analog galvanometers compared with digital measurement systems.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q30",
    "order_index": 30
  },
  {
    "id": "c1000000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An electron beam enters a region containing both electric and magnetic fields arranged perpendicular to each other. Engineers observe that under specific conditions the beam travels undeflected. This principle is used in velocity selection devices.\n\n**Determine the condition for undeflected motion and explain how electric and magnetic forces balance each other.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q31",
    "order_index": 31
  },
  {
    "id": "c1000000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A mass spectrometer separates ions according to their charge-to-mass ratio. The instrument uses magnetic fields to bend particle trajectories and detectors to identify ion species. Engineers aim to improve resolution while maintaining throughput.\n\n**Analyze how magnetic deflection enables ion separation and evaluate factors affecting measurement resolution.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q32",
    "order_index": 32
  },
  {
    "id": "c1000000-0000-0000-0000-000000000033",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A semiconductor research team investigates the behavior of electrons emitted from a metal surface when illuminated by light of varying frequencies. They observe that increasing intensity increases the number of emitted electrons, while increasing frequency affects their kinetic energy. The experiment is conducted to verify quantum models of light.\n\n**Analyze the observations and determine how frequency and intensity independently influence the photoelectric effect.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q33",
    "order_index": 33
  },
  {
    "id": "c1000000-0000-0000-0000-000000000034",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A solar energy company develops photovoltaic devices using materials with different work functions. Engineers must maximize electron emission efficiency while minimizing energy losses. The design depends strongly on incident light characteristics and material properties.\n\n**Evaluate the factors influencing photoelectric emission efficiency and recommend a suitable design strategy.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q34",
    "order_index": 34
  },
  {
    "id": "c1000000-0000-0000-0000-000000000035",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A scientist performs a photoelectric experiment using monochromatic light. Below a certain frequency no electrons are emitted regardless of intensity. Above this threshold, emission occurs immediately.\n\n**Interpret the significance of threshold frequency and explain why intensity alone cannot initiate emission below the threshold.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q35",
    "order_index": 35
  },
  {
    "id": "c1000000-0000-0000-0000-000000000036",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research laboratory compares classical wave theory with quantum theory to explain photoelectric observations. Classical predictions fail to account for certain experimental results.\n\n**Analyze the limitations of classical theory and justify how quantum theory resolves the discrepancies.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q36",
    "order_index": 36
  },
  {
    "id": "c1000000-0000-0000-0000-000000000037",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An X-ray tube accelerates electrons toward a metal target. Engineers observe that increasing accelerating voltage produces X-rays with shorter wavelengths. Material selection influences characteristic spectral lines.\n\n**Determine how accelerating voltage affects X-ray wavelength and analyze the role of target material in spectrum formation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q37",
    "order_index": 37
  },
  {
    "id": "c1000000-0000-0000-0000-000000000038",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A medical imaging facility uses X-rays for diagnostic purposes. Higher-energy X-rays improve penetration but may increase biological risks. Engineers must balance image quality, patient safety, and equipment efficiency.\n\n**Evaluate the trade-offs involved in selecting X-ray operating conditions for medical imaging applications.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q38",
    "order_index": 38
  },
  {
    "id": "c1000000-0000-0000-0000-000000000039",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A physicist studies the scattering of X-rays by electrons and observes an increase in wavelength after scattering. The wavelength shift depends on scattering angle but not on incident wavelength. Experimental results support the particle nature of radiation.\n\n**Analyze the observations and explain how Compton scattering supports the photon model of light.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q39",
    "order_index": 39
  },
  {
    "id": "c1000000-0000-0000-0000-000000000040",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A radiation detection system is designed using principles of photon–electron interaction. Engineers must determine which interaction mechanism dominates under different energy conditions.\n\n**Assess how photon energy influences scattering behavior and identify conditions under which Compton scattering becomes significant.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q40",
    "order_index": 40
  },
  {
    "id": "c1000000-0000-0000-0000-000000000041",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A quantum system confines particles within a finite region of space. Measurements reveal discrete energy levels instead of a continuous spectrum. Engineers compare the system with classical predictions and note major differences in particle behavior.\n\n**Analyze why energy quantization occurs and determine how confinement influences allowable energy states.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q41",
    "order_index": 41
  },
  {
    "id": "c1000000-0000-0000-0000-000000000042",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A nanotechnology device uses quantum confinement to control electron behavior. As device dimensions shrink, quantum effects become increasingly important. Engineers must understand how confinement affects energy levels and electronic properties.\n\n**Evaluate the influence of quantum confinement on particle energy and device performance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q42",
    "order_index": 42
  },
  {
    "id": "c1000000-0000-0000-0000-000000000043",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A particle is confined in a one-dimensional infinite potential well. The wave function must satisfy boundary conditions at the walls. Researchers seek to determine allowable energy states and probability distributions.\n\n**Formulate the conditions governing the wave function and analyze how boundary constraints lead to quantized energy levels.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q43",
    "order_index": 43
  },
  {
    "id": "c1000000-0000-0000-0000-000000000044",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A quantum computing research group studies probability distributions associated with particle wave functions. The interpretation of measurement outcomes depends on the square of the wave function magnitude.\n\n**Analyze the physical significance of the wave function and explain how probability density is obtained.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q44",
    "order_index": 44
  },
  {
    "id": "c1000000-0000-0000-0000-000000000045",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A material science laboratory investigates electron diffraction using crystalline samples. Experimental observations reveal interference patterns similar to those produced by waves. Researchers compare results with de Broglie predictions.\n\n**Analyze how diffraction experiments support wave–particle duality and determine the relationship between momentum and wavelength.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q45",
    "order_index": 45
  },
  {
    "id": "c1000000-0000-0000-0000-000000000046",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An electron microscope relies on the wave nature of electrons to achieve high resolution. Engineers increase electron momentum to improve imaging performance while considering practical constraints.\n\n**Evaluate how electron wavelength influences resolution and determine the effect of increasing momentum on imaging capability.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q46",
    "order_index": 46
  },
  {
    "id": "c1000000-0000-0000-0000-000000000047",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A quantum particle is described by a wave packet with uncertainty in both position and momentum. Measurements indicate that reducing uncertainty in position increases uncertainty in momentum. Engineers must account for this limitation in nanoscale devices.\n\n**Analyze the relationship between position and momentum uncertainties and explain its significance in quantum measurements.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q47",
    "order_index": 47
  },
  {
    "id": "c1000000-0000-0000-0000-000000000048",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A semiconductor nanodevice requires precise control of electron localization. Designers attempt to confine electrons to very small regions while maintaining predictable momentum characteristics. Quantum mechanical limitations affect achievable performance.\n\n**Evaluate how the uncertainty principle constrains electron confinement and justify its impact on nanoscale device design.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-I Q48",
    "order_index": 48
  },
  {
    "id": "dce00000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A telemetry system converts decimal data into binary and then into octal for transmission. Engineers observe incorrect outputs when fractional values are processed. The system uses standard conversion techniques but suffers from truncation and grouping inconsistencies, affecting final transmission accuracy.\n   Diagnose the cause of incorrect outputs and infer how binary conversion errors impact octal representation.",
    "answer": "The incorrect outputs in processing fractional decimal values during decimal-to-binary-to-octal conversion are caused by two primary issues:\n\n1. **Truncation and Rounding Errors (Precision Limits)**: Many decimal fractions (e.g., $0.1_{10}$ or $0.2_{10}$) do not have a finite representation in binary. They become repeating/periodic binary fractions:\n   $$0.1_{10} = 0.00011001100110011..._2$$\n   When a telemetry system truncates this sequence to a fixed bit-width (e.g., 8 or 16 bits) instead of rounding, it introduces a significant truncation error.\n\n2. **Grouping Inconsistencies**: To convert binary to octal, bits must be grouped into triads (sets of 3).\n   * **For the integer portion**: Grouping must start from the binary point and move **leftwards** (padding with leading zeros if necessary).\n   * **For the fractional portion**: Grouping must start from the binary point and move **rightwards** (padding with trailing zeros if necessary).\n   \n   If engineers incorrectly group the fractional bits from right-to-left, or fail to pad the last group with trailing zeros, it completely alters the resulting octal representation.\n\n**Example of Grouping Inconsistency**:\nFor binary fraction $0.00011_2$:\n* **Correct (Left-to-Right)**: $.000 | 110_2 \\rightarrow 0.06_8$ (padding with $0$ on the right)\n* **Incorrect (Right-to-Left / Shifted)**: $.000 | 011_2 \\rightarrow 0.03_8$ (shifting the group value)\n\n```mermaid\ngraph TD\n    A[\"Decimal Fraction: 0.1\"] --> B[\"Infinite Binary: 0.000110011...\"]\n    B --> C{\"Correct Grouping?\"}\n    C -->|Yes: Left-to-Right| D[\"$.000 | 110 | 011..._2 \\rightarrow 0.063..._8\"]\n    C -->|No: Right-to-Left| E[\"$.000 | 011..._2 \\rightarrow 0.03..._8 Grouping Error\"]\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q1",
    "order_index": 1
  },
  {
    "id": "dce00000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A calculator device internally processes numbers in binary but must display outputs in a user-friendly format. The display has limited space, and binary representation appears lengthy. The system designer must choose between octal and hexadecimal formats for output representation while ensuring accuracy and minimal processing overhead.\n   Determine the most appropriate number system for display and justify the decision based on efficiency and usability.",
    "answer": "Hexadecimal representation is the most appropriate number system for the calculator display.\n\n### Justification:\n\n1. **Space Efficiency (Compression Ratio)**:\n   * **Binary** requires 8 characters for a byte (e.g., $11011011_2$).\n   * **Octal** ($2^3 = 8$) groups bits into 3s, requiring 3 characters for a byte (e.g., $333_8$), but does not align with byte boundaries ($8 \\text{ bits} \\bmod 3 \\neq 0$).\n   * **Hexadecimal** ($2^4 = 16$) groups bits into 4s, requiring exactly 2 characters for a byte (e.g., $DB_{16}$). It provides a 4:1 compression ratio, saving valuable display space.\n\n2. **Perfect Alignment with Byte Boundaries**:\n   Modern computer architectures are byte-oriented (8, 16, 32, 64 bits). Hexadecimal fits these boundaries perfectly since 1 byte = 2 hex digits. Octal requires spanning digits across byte boundaries, creating processing overhead in conversion logic.\n\n| Bit Width | Binary Representation | Octal Representation (3-bit groups) | Hexadecimal Representation (4-bit groups) |\n|---|---|---|---|\n| 8-bit | `11111111` | `377` (3 digits) | `FF` (2 digits) |\n| 16-bit | `1111111111111111` | `177777` (6 digits) | `FFFF` (4 digits) |",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q2",
    "order_index": 2
  },
  {
    "id": "dce00000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system processes signals through encoder, comparator, and decoder modules. Incorrect sequencing leads to wrong outputs.\n   Formulate the correct processing sequence and infer the impact of improper sequencing.",
    "answer": "The correct processing sequence for signal conversion and evaluation is:\n\n```mermaid\ngraph LR\n    Input[Analog/Request Signal] --> Encoder[Encoder Module]\n    Encoder -->|Binary Code| Comparator[Comparator Module]\n    Comparator -->|Comparison Result| Decoder[Decoder Module]\n    Decoder --> Output[Controlled Device Output]\n```\n\n1. **Encoder**: Converts the multiple physical request/input lines into a compact binary representation.\n2. **Comparator**: Evaluates the binary representation against a reference state (e.g., checking priority or set limits).\n3. **Decoder**: Decodes the output of the comparison to select and activate the corresponding output device/actuator.\n\n### Impact of Improper Sequencing:\nIf this sequence is violated (e.g., routing raw signals to the comparator before encoding), the comparator would require a massive number of input lines ($N$ instead of $\\log_2 N$), leading to excessive logic gate overhead. If decoding occurs before comparison, the system cannot perform conditional logic on the active signals, resulting in wrong system outputs or race conditions.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q3",
    "order_index": 3
  },
  {
    "id": "dce00000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A control system receives multiple request signals and must encode them into binary form for processing. When multiple requests occur simultaneously, the system produces incorrect outputs due to lack of priority handling. The designer must improve the encoding mechanism.\n   Determine the appropriate encoder type and justify the decision based on handling multiple inputs efficiently.",
    "answer": "The system must use a **Priority Encoder** (such as the 74LS148 8-to-3 Priority Encoder).\n\n### Justification:\nA standard binary encoder assumes that only one input line is active at any given time. If multiple request lines are activated simultaneously (e.g., inputs $D_2$ and $D_4$ are both 1), a standard encoder produces an invalid, combined output (e.g., $110_2$, representing input 6, which was not requested).\n\nA **Priority Encoder** resolves this concurrency by assigning a priority level to each input. If multiple inputs are active, it outputs the binary code of the input with the highest priority, ignoring lower-priority requests. It also provides a \"Valid\" ($V$) status output to indicate whether any request is active.\n\n```\nInputs: D3=1, D2=1, D1=0, D0=1\nPriority Encoder (D3 has highest priority)\nOutput Y1 Y0 = 11 (Binary 3)\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q4",
    "order_index": 4
  },
  {
    "id": "dce00000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processing unit converts inputs from multiple number systems into binary, performs operations, and converts results back into original formats. Improper sequencing has caused incorrect outputs in previous tests. The system must ensure proper data flow and accuracy.\n   Formulate a correct sequence for number system conversion and infer the impact of incorrect sequencing.",
    "answer": "The correct sequence for a conversion-processing unit is:\n\n```mermaid\ngraph TD\n    A[Inputs: Octal / Hex / Decimal] --> B[Input Converter: Convert all to Binary]\n    B --> C[Processing Unit: Execute arithmetic in Binary/2's Complement]\n    C --> D[Output Converter: Convert Binary result back to target system]\n```\n\n1. **Normalize to Binary**: Translate all heterogeneous inputs (Octal, Hex, BCD) into standard Binary.\n2. **Execute Operations**: Perform arithmetic and logic operations in the binary domain (utilizing 2's complement for uniform addition/subtraction).\n3. **Format Output**: Convert the binary result back to the desired output format (e.g., BCD for displays, Hex for registers).\n\n### Impact of Incorrect Sequencing:\nPerforming arithmetic operations directly between different number formats (e.g., adding an octal number directly to a hexadecimal representation without normalizing to a common base) leads to positional weight mismatches, rounding propagation, and incorrect intermediate carry generation.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q5",
    "order_index": 5
  },
  {
    "id": "dce00000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A program converts binary values into decimal but fails when fractional values are present, producing incomplete results. The integer portion is processed correctly using positional weights, but the fractional portion is ignored. The developer must identify missing logic affecting correctness.\n   Identify the error in the program and determine its effect on output accuracy.",
    "answer": "The error lies in the **fractional conversion algorithm**, which fails to apply negative powers of 2 for bits to the right of the radix point. \n\nThe developer likely used integer divisions (`/ 10` and `% 10`) instead of the correct fractional weighting technique:\n$$d = \\sum_{i=1}^{n} b_{-i} \\times 2^{-i}$$\n\n### Effect on Output Accuracy:\nIgnoring the fractional portion results in a severe truncation error. For example, the binary value $11.01_2$ represents:\n$$(1 \\times 2^1) + (1 \\times 2^0) + (0 \\times 2^{-1}) + (1 \\times 2^{-2}) = 2 + 1 + 0 + 0.25 = 3.25_{10}$$\nWithout fractional processing, the output is truncated to $3_{10}$, losing $0.25$ ($7.7\\%$ error rate). The error grows exponentially for high-precision telemetry data.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q6",
    "order_index": 6
  },
  {
    "id": "dce00000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A comparator circuit incorrectly indicates equality for unequal inputs due to improper handling of higher-order bits and cascading logic errors.\n   Diagnose the issue and infer how it affects comparison accuracy.",
    "answer": "The issue is a **cascading logic error** in the multi-bit comparator, where lower-order bit comparisons are allowed to override higher-order bit comparisons.\n\nIn a cascaded comparator, the comparison starts from the Most Significant Bit (MSB). The cascading inputs from a lower-order stage ($A > B$, $A < B$, $A = B$) must only be evaluated if all higher-order bits are equal. If the MSB stage fails to lock the output when $A_{MSB} \\neq B_{MSB}$, the LSB stage's output propagates and falsely indicates equality.\n\n### Impact on Comparison Accuracy:\nIf the system compares $A = 10_2$ and $B = 01_2$:\n* $A_1 = 1, B_1 = 0 \\implies A > B$ (MSB level)\n* $A_0 = 0, B_0 = 1 \\implies A < B$ (LSB level)\nIf LSB cascading logic takes priority, the system will incorrectly output $A < B$ or $A = B$, causing control path failures.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q7",
    "order_index": 7
  },
  {
    "id": "dce00000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A decoder used in a display system activates more than one output for a given input due to incorrect logic design, causing display errors.\n   Identify the fault and determine its effect on system functionality.",
    "answer": "The fault is a **logic hazard (race condition)** or an **address line decoder fault** where the inputs transition asynchronously, or selection lines lack active-low/high gate isolation.\n\nWhen selection line inputs change (e.g., from $01_2$ to $10_2$), one gate may turn ON faster than another turns OFF due to differences in propagation delays ($t_{pd}$). This creates a transient state where both output lines are active simultaneously.\n\n### Effect on System Functionality:\nIn a display driver (e.g., BCD-to-7-segment decoder), activating multiple outputs simultaneously illuminates incorrect segments, causing garbled digits. In memory systems, activating multiple word lines causes a bus conflict (multiple memory cells driving the data bus at once), which can permanently damage components due to high short-circuit currents.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q8",
    "order_index": 8
  },
  {
    "id": "dce00000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital system integrates signed number representation into arithmetic operations and must ensure consistency and accuracy across all computations.\n   Design a consistent model for signed number representation and justify its effectiveness.",
    "answer": "The most consistent and robust model for signed number representation in computer arithmetic is the **2's Complement** representation.\n\n```mermaid\ngraph TD\n    A[Signed Number Models] --> B[Sign-Magnitude: Simple but has +0 and -0]\n    A --> C[1's Complement: Has +0 and -0, complex subtraction]\n    A --> D[2's Complement: Single 0, subtraction via addition. PREFERRED]\n```\n\n### Justification:\n1. **Single Representation of Zero**: Unlike Sign-Magnitude and 1's Complement (which have $+0$ and $-0$), 2's Complement has a unique representation for zero ($0000_2$ in 4-bit), preventing logical ambiguities.\n2. **Simplified ALU Design**: Subtraction is performed using the same hardware as addition. To compute $A - B$, the ALU simply adds $A$ to the 2's complement of $B$:\n   $$A - B = A + (\\bar{B} + 1)$$\n   This eliminates the need for separate subtraction circuitry.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q9",
    "order_index": 9
  },
  {
    "id": "dce00000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system designer evaluates multiplexers and demultiplexers for scalable data routing applications.\n    Assess trade-offs and recommend an optimal design approach.",
    "answer": "Multiplexers (MUX) and Demultiplexers (DEMUX) serve opposite routing functions.\n\n### Trade-offs:\n* **Multiplexer (Many-to-One)**: Selects one of $2^n$ inputs using $n$ select lines and routes it to a single output.\n* **Demultiplexer (One-to-Many)**: Takes a single input and routes it to one of $2^n$ outputs based on $n$ select lines.\n\n```\nMUX:   [I0, I1, I2, I3] ---> [ Select Lines ] ---> [ Output Y ]\nDEMUX: [ Input D ] --------> [ Select Lines ] ---> [ Y0, Y1, Y2, Y3 ]\n```\n\n### Recommendation:\nFor scalable data routing, a combined **Bus Architecture** utilizing tri-state buffers and decoders is optimal. Instead of using massive multiplexers which increase routing trace congestion exponentially, a shared bus where transmitters use tri-state buffers (controlled by a decoder) ensures simple $O(N)$ scalability.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q10",
    "order_index": 10
  },
  {
    "id": "dce00000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system computes (-4) + (-2) using 4-bit 2’s complement representation and must verify the correctness of the result within range limits.\n    Determine the result using 2’s complement and justify the steps logically.",
    "answer": "We compute $(-4) + (-2)$ using 4-bit 2's complement representation:\n\n1. **Represent -4**:\n   * $+4_{10} = 0100_2$\n   * 1's complement = $1011_2$\n   * 2's complement = $1011 + 1 = 1100_2$\n\n2. **Represent -2**:\n   * $+2_{10} = 0010_2$\n   * 1's complement = $1101_2$\n   * 2's complement = $1101 + 1 = 1110_2$\n\n3. **Perform Addition**:\n   ```\n     1100  (-4)\n   + 1110  (-2)\n   -------\n    (1)1010  (Discard the carry-out bit)\n   ```\n   The 4-bit result is $1010_2$.\n\n4. **Justification**:\n   The MSB of $1010_2$ is $1$, indicating a negative number.\n   * Subtract 1: $1010 - 1 = 1001_2$\n   * Invert bits: $0110_2 = 6_{10}$\n   * Thus, $1010_2 = -6_{10}$.\n   This is correct, and falls within the 4-bit signed range of $[-8, +7]$.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q11",
    "order_index": 11
  },
  {
    "id": "dce00000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A 4:1 multiplexer must be implemented using Boolean logic to correctly select one input based on select lines.\n    Analyse the Boolean expression and justify logic.",
    "answer": "A 4:1 Multiplexer selects one of four inputs ($I_0, I_1, I_2, I_3$) using two select lines ($S_1, S_0$).\n\n### Boolean Expression:\n$$Y = \\bar{S_1}\\bar{S_0}I_0 + \\bar{S_1}S_0I_1 + S_1\\bar{S_0}I_2 + S_1S_0I_3$$\n\n### Logic Justification:\nEach product term represents a unique minterm of the select lines. Since $S_1$ and $S_0$ can only form one active minterm (logic '1') at any time, only one AND gate is enabled. \n* If $S_1S_0 = 00$, the first term simplifies to $1 \\cdot I_0$, while others are $0$. Hence, $Y = I_0$.\n* The output OR gate combines these terms, guaranteeing that only the selected input is propagated to the output.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q12",
    "order_index": 12
  },
  {
    "id": "dce00000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system designer evaluates using basic gates versus standard combinational modules for building scalable circuits.\n    Assess trade-offs and recommend an optimal design approach.",
    "answer": "### Trade-off Assessment:\n* **Basic Gates (AND, OR, NOT)**:\n  * *Pros*: Maximum customizability; logic can be fully minimized.\n  * *Cons*: High chip count, complex routing, increased propagation delays, and higher power consumption.\n* **Standard Combinational Modules (Adders, MUX, Decoders)**:\n  * *Pros*: Integrated design, optimized internal propagation path, reduced board space, and simplified testing.\n  * *Cons*: Less flexible for non-standard logic.\n\n### Recommendation:\nFor scalable circuit designs, **Standard Combinational Modules** are highly recommended. They reduce design complexity, lower propagation delay, and allow hierarchical design which is essential for scaling complex systems.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q13",
    "order_index": 13
  },
  {
    "id": "dce00000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system designer evaluates ALU architectures for efficient and scalable processing.\n    Assess trade-offs and recommend optimal design.",
    "answer": "### ALU Architecture Trade-offs:\n1. **Accumulator-based ALU**: Uses a single register (Accumulator) for one operand and the result. Highly silicon-efficient but limits throughput since every operation must cycle through the accumulator.\n2. **Register-to-Register (Load-Store) ALU**: Operands are fetched from a general-purpose register file. High throughput and supports pipelining, but requires more control logic and register file area.\n3. **Carry-Lookahead (CLA) vs. Ripple Carry Adder (RCA)**: RCA has $O(N)$ delay due to carry propagation. CLA generates carries in parallel ($O(1)$ delay) but requires significant gate area.\n\n### Recommendation:\nFor scalable and efficient processing, a **Register-to-Register ALU with a Carry-Lookahead Adder** is optimal. This design supports pipelining and avoids the accumulator bottleneck.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q14",
    "order_index": 14
  },
  {
    "id": "dce00000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A Boolean function F = A'B + AB' must be implemented and verified for correctness using logic gates and truth table analysis.\n    Determine the circuit implementation and justify its behavior logically.",
    "answer": "The Boolean function $F = \\bar{A}B + A\\bar{B}$ represents a 2-input **XOR (Exclusive-OR) gate**.\n\n### Truth Table:\n| A | B | $\\bar{A}$ | $\\bar{B}$ | $\\bar{A}B$ | $A\\bar{B}$ | $F$ |\n|---|---|---|---|---|---|---|\n| 0 | 0 | 1 | 1 | 0 | 0 | **0** |\n| 0 | 1 | 1 | 0 | 1 | 0 | **1** |\n| 1 | 0 | 0 | 1 | 0 | 1 | **1** |\n| 1 | 1 | 0 | 0 | 0 | 0 | **0** |\n\n### Circuit Implementation:\nImplemented using two NOT gates, two AND gates, and one OR gate.\n* Output is high ($1$) if and only if the inputs $A$ and $B$ are different.\n* If both inputs are equal, the output is low ($0$).",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q15",
    "order_index": 15
  },
  {
    "id": "dce00000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor integrates an ALU combining arithmetic and logical units controlled by instruction signals.\n    Design a coherent ALU model and justify effectiveness.",
    "answer": "An Arithmetic Logic Unit (ALU) combines arithmetic (Addition, Subtraction) and logical (AND, OR, XOR) operations.\n\n```mermaid\ngraph TD\n    A[Input A] --> C[Arithmetic Unit: Add/Sub]\n    B[Input B] --> C\n    A --> D[Logic Unit: AND/OR/XOR]\n    B --> D\n    C --> E[4:1 Multiplexer]\n    D --> E\n    S[Select Signals: S1, S0] --> E\n    E --> F[ALU Output]\n```\n\n### Justification of Effectiveness:\nBy using a central multiplexer at the output stage, both units can process the inputs in parallel, and the control unit simply selects the active output based on the instruction opcode. This modularity ensures that adding new logical operations does not affect the arithmetic paths, maximizing performance and ease of debugging.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q16",
    "order_index": 16
  },
  {
    "id": "dce00000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital circuit designer is selecting between a latch and a flip flop for a system that requires controlled data storage only at specific time intervals. The system operates in a noisy environment where inputs may fluctuate frequently.\n    Establish why a flip flop is preferred over a latch in this case.",
    "answer": "A **Flip-Flop** is preferred over a Latch in noisy environments.\n\n### Reason:\n* **Latch (Level-Triggered)**: Open and transparent for the entire duration of the clock pulse. If the input fluctuates or contains noise while the clock is high, the noise passes directly to the output, risking system instability.\n* **Flip-Flop (Edge-Triggered)**: Samples the input only at the precise transition edge of the clock (positive or negative transition). Since this window is extremely narrow (picoseconds), any noise occurring before or after the clock edge is completely ignored, ensuring stable state transitions.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q17",
    "order_index": 17
  },
  {
    "id": "dce00000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A D flip flop receives a data input that changes continuously, but the output updates only when a clock pulse arrives.\n    Determine the reason for this controlled behavior.",
    "answer": "The controlled behavior of a D flip-flop is due to **edge-triggering circuitry**. \n\nInternally, an edge-triggered D flip-flop uses a **Master-Slave configuration** (or a narrow pulse-generator circuit using propagation delays). \n* When the clock is low, the Master latch is open, sampling the input, while the Slave latch is locked.\n* At the rising edge of the clock, the Master latch locks its state, and the Slave latch opens, transferring the locked state to the output $Q$.\nThis design ensures that output transitions occur only during the clock transition, preventing any direct path from input to output.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q18",
    "order_index": 18
  },
  {
    "id": "dce00000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A counter circuit used in a system begins to produce incorrect outputs due to delay in signal propagation between flip flops in a ripple configuration.\n    Relate this issue to the type of counter used and suggest the improvement.",
    "answer": "The issue of propagation delay in a ripple counter is known as **clock skew / carry propagation delay**.\n\n* **Root Cause**: In an asynchronous (ripple) counter, the clock input of each flip-flop is driven by the output of the preceding flip-flop. As a result, the delay of each flip-flop accumulates:\n  $$t_{total} = N \\times t_{pd}$$\n  During transitions (e.g., from $0111_2$ to $1000_2$), the counter passes through incorrect intermediate states (glitches), causing errors in high-speed circuits.\n* **Improvement**: Replace the ripple counter with a **Synchronous Counter**. In a synchronous counter, all flip-flops share the same clock signal and update their states simultaneously, reducing the total delay to a single flip-flop propagation delay ($t_{pd}$).",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q19",
    "order_index": 19
  },
  {
    "id": "dce00000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A 4-bit binary counter is used to count pulses from a sensor in an automated system.\n    Identify the maximum count value before it resets.",
    "answer": "A 4-bit binary counter has 4 flip-flops and can represent $2^4 = 16$ distinct states.\n\n* **Maximum Count Value**: The maximum value it can hold is $2^4 - 1 = 15_{10}$, which is represented in binary as:\n  $$1111_2$$\n* **Reset Behavior**: On receiving the 16th clock pulse, the counter rolls over and resets back to:\n  $$0000_2$$",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q20",
    "order_index": 20
  },
  {
    "id": "dce00000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A latch changes output whenever the input changes, causing instability in a noisy environment.\n    Relate this behavior to the need for flip flops.",
    "answer": "A latch is **level-sensitive**, meaning its output tracks its input continuously as long as the clock enable signal is high.\n\n### Relation to the Need for Flip-Flops:\nIn sequential logic feedback loops (like counters or shift registers), the output of a storage element is processed and fed back as its input. If a level-sensitive latch is used, the data can loop multiple times within a single clock pulse, causing uncontrollable oscillations. \n\nFlip-flops, being **edge-triggered**, break this loop by capturing the state only at the clock edge, allowing the output to change only once per clock cycle, stabilizing the feedback loop.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q21",
    "order_index": 21
  },
  {
    "id": "dce00000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "An SR latch receives inputs S = 1 and R = 1 simultaneously.\n    Identify the condition produced.",
    "answer": "When inputs $S = 1$ and $R = 1$ are applied simultaneously to an SR latch, it produces an **invalid (forbidden) state**.\n\n### Logic Analysis:\n* **NOR Latch**: Both outputs $Q$ and $\\bar{Q}$ are forced to $0$ simultaneously. This violates the fundamental complementation rule ($Q = \\bar{\\bar{Q}}$).\n* **NAND Latch**: Both outputs $Q$ and $\\bar{Q}$ are forced to $1$.\n* **Metastability**: When $S$ and $R$ transition back to $0$ at the same time, the latch enters a race condition. The output will oscillate or settle in an unpredictable state depending on minor gate propagation mismatches, leading to metastability.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q22",
    "order_index": 22
  },
  {
    "id": "dce00000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital communication system requires conversion of parallel data into serial form for transmission over a single communication line. A shift register is used, where data bits are shifted one by one with each clock pulse until the entire data is transmitted.\n    Establish how shift registers enable efficient data transmission in such systems.",
    "answer": "Shift registers enable efficient data transmission by converting parallel data to serial data (PISO).\n\n```mermaid\ngraph LR\n    P[Parallel Inputs: D0-D3] -->|Load| SR[Shift Register]\n    CLK[Clock Pulse] --> SR\n    SR -->|Shift Out| S[Serial Out Line]\n```\n\n### Explanation:\nInstead of running $N$ parallel wires over long distances, which increases cost, weight, and crosstalk, a **Parallel-In Serial-Out (PISO)** shift register loads the data in parallel and shifts it out bit-by-bit over a single line. At the receiving end, a **Serial-In Parallel-Out (SIPO)** shift register reconstructs the parallel word. This reduces transmission line requirements to a single wire.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q23",
    "order_index": 23
  },
  {
    "id": "dce00000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A shift register initially contains the data 1011. With each clock pulse, the bits shift one position to the right, and a 0 is introduced at the leftmost position.\n    Determine the output after one clock pulse.",
    "answer": "* **Initial State**: $1011_2$\n* **Shift Operation**: Shift right by 1 position.\n  * The LSB ($1$) is shifted out and lost.\n  * The remaining bits shift right: $101 \\rightarrow \\_101$\n  * A $0$ is introduced at the MSB position.\n* **Output after 1 Clock Pulse**: $0101_2$",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q24",
    "order_index": 24
  },
  {
    "id": "dce00000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital system controlling an automated assembly line uses multiple flip flops to coordinate operations such as material feeding, processing, and packaging. Initially, the system faced issues where outputs changed at unpredictable times due to asynchronous input changes. To resolve this, a clock signal is introduced so that all flip flops update their states simultaneously at defined time intervals. Engineers also ensure that the clock frequency is chosen carefully to balance speed and reliability.\n    Analyze how the introduction of a clock signal ensures synchronized operation in sequential circuits and prevents timing-related errors.",
    "answer": "The introduction of a **global clock signal** transforms the circuit from asynchronous to synchronous.\n\n```mermaid\ngraph TD\n    A[Asynchronous Changes] --> B[Glitches & Race Conditions]\n    C[Clock Signal Introduced] --> D[Edge-Triggered State Capture]\n    D --> E[All states update simultaneously]\n    E --> F[Stable Operation & No Hazards]\n```\n\n### Analysis:\nIn an asynchronous system, input signals arrive at different times due to differing wire lengths and gate delays, leading to race conditions. By clocking all flip-flops on a common edge:\n1. Inputs are allowed to settle before the clock edge arrives.\n2. The flip-flops sample the settled inputs at the exact same instant.\n3. This prevents race conditions and glitches from propagating, ensuring predictable state transitions.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q25",
    "order_index": 25
  },
  {
    "id": "dce00000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "In a microprocessor-based system, registers are used to temporarily store binary data during execution of instructions. Consider a system where a 4-bit register stores the value 1101. During the next clock cycle, this data is transferred to another register for further processing. Engineers ensure that proper control signals are applied so that data is retrieved from the first register and loaded into the second register without loss or corruption. The system uses a common bus architecture to facilitate data transfer between registers.\n    Analyze the process of storing and retrieving binary data between registers and explain the role of control signals and clock in ensuring accurate data transfer.",
    "answer": "Register-to-register transfer relies on a shared **system bus** controlled by tri-state buffers and clock signals.\n\n### Transfer Process:\n1. **Source Enable**: The control unit asserts the read control signal for Register A, enabling its tri-state buffers to place the data (`1101`) onto the common bus.\n2. **Destination Select**: The control unit asserts the load control signal for Register B.\n3. **Clock Edge**: On the next rising clock edge, Register B samples the bus lines and stores the data.\n4. **Synchronization**: The clock ensures that data is only sampled after it has stabilized on the bus, preventing data corruption.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q26",
    "order_index": 26
  },
  {
    "id": "dce00000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital communication system uses edge-triggered flip flops to store incoming data. The system is designed such that data is captured only at the rising edge of the clock signal. Engineers observe that even when input signals fluctuate between clock pulses, the stored data remains stable and unaffected.\n    Evaluate how edge triggering improves data stability compared to level triggering in clocked circuits.",
    "answer": "### Evaluation:\n* **Level Triggering**: The storage element is transparent for the entire active clock level (e.g., $1 \\mu\\text{s}$). Any input fluctuation during this time affects the stored value.\n* **Edge Triggering**: The storage element only samples input during the transition edge (typically $< 1 \\text{ ns}$). \n\nBecause the sensitivity window is reduced by several orders of magnitude, edge-triggered flip-flops are immune to input glitches that occur outside the clock transition, ensuring much higher data stability.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q27",
    "order_index": 27
  },
  {
    "id": "dce00000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital system consists of two 3-bit registers, Register A and Register B. Initially, Register A contains the binary value 101, and Register B contains 000. On a control signal, the content of Register A is transferred to Register B during the next clock pulse. Engineers verify that the transfer occurs simultaneously for all bits.\n    Determine the contents of Register B after the transfer and explain how simultaneous data retrieval and storage occur.",
    "answer": "* **Contents of Register B after transfer**: $101_2$.\n\n### Retrieval and Storage Mechanism:\nThe transfer is achieved in parallel using a common clock line. Each flip-flop in Register B has its input connected to the output of the corresponding flip-flop in Register A. On the rising edge of the control clock pulse, all three flip-flops in Register B load the value of their respective inputs simultaneously, ensuring instant, single-cycle data transfer.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q28",
    "order_index": 28
  },
  {
    "id": "dce00000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "In a microprocessor system, registers are used to temporarily store intermediate results during arithmetic operations. A register receives binary data from an ALU and holds it until the next operation is performed. The system relies on clock signals to control when data is stored and transferred.\n    Assess the importance of registers in data storage and processing within digital systems.",
    "answer": "Registers are the fastest storage elements in a computer hierarchy, located directly inside the CPU.\n\n### Importance:\n1. **Elimination of the Memory Bottleneck**: Accessing system RAM requires bus operations that take multiple CPU clock cycles. Registers provide single-cycle access.\n2. **Operand Storage for ALU**: The ALU fetches operands directly from registers and writes results back to registers, enabling high-speed execution.\n3. **Control Flow**: Special registers like the Program Counter (PC) and Instruction Register (IR) track and direct execution flow.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q29",
    "order_index": 29
  },
  {
    "id": "dce00000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computer system is designed with a memory unit of 16 words, each word consisting of 8 bits. Engineers use address lines to uniquely select each memory location and a decoder circuit to activate the corresponding memory cell. When a specific binary address is applied, the decoder selects one memory location for read or write operation. The system must ensure that only one memory location is accessed at a time to avoid data corruption.\n    Analyze how address decoding enables proper selection of memory locations in RAM and explain its role in read/write operations.",
    "answer": "Address decoding uses a binary decoder to select a unique memory location while keeping all others isolated.\n\n### Analysis:\nFor a 16-word memory, we need 4 address lines ($2^4 = 16$). A 4-to-16 decoder is connected to these lines.\n* When an address (e.g., $0011_2$) is applied, only the 3rd word line is activated.\n* This activates the transmission gates for only that memory cell.\n* **Read**: The selected cell drives the data bus.\n* **Write**: The data bus writes into the selected cell.\nThis one-hot selection prevents multiple memory cells from driving the data bus simultaneously, preventing data corruption.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q30",
    "order_index": 30
  },
  {
    "id": "dce00000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A 4-bit register initially contains the binary value 1010. On the next clock pulse, the input data 0111 is applied to the register. The system is designed such that the register loads new data at every clock pulse.\n    Determine the contents of the register after the clock pulse and explain the data loading process.",
    "answer": "* **Contents after the clock pulse**: $0111_2$.\n\n### Data Loading Process:\nA register uses a load control input connected to a 2:1 multiplexer at the input of each D flip-flop:\n* When `Load = 0`, the flip-flop output is fed back to its input, preserving the data (`1010`).\n* When `Load = 1`, the new input (`0111`) is routed to the D input. On the rising edge of the clock, the flip-flops capture and store this new value.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q31",
    "order_index": 31
  },
  {
    "id": "dce00000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "In a microprocessor system, RAM is used to store instructions and data temporarily. During execution, the processor sends an address to the memory unit, and the corresponding data is retrieved. Engineers ensure that the memory is organized efficiently so that data access is fast and accurate.\n    Assess the working of RAM in terms of storage, addressing, and data retrieval.",
    "answer": "RAM (Random Access Memory) provides high-speed, volatile read/write storage.\n\n### Working Principles:\n1. **Storage**: Data is stored in an array of memory cells. SRAM uses 6-transistor latch circuits (fast, expensive), while DRAM uses a single transistor and capacitor (dense, requires refreshing).\n2. **Addressing**: The CPU places the target address on the address bus. Row and column decoders activate the specific cell.\n3. **Data Retrieval**: Sense amplifiers detect the tiny charge (DRAM) or state (SRAM) of the selected cell, amplify it, and place it on the data bus.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q32",
    "order_index": 32
  },
  {
    "id": "dce00000-0000-0000-0000-000000000033",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A basic processor follows a structured instruction cycle where each instruction is processed in sequential steps controlled by clock pulses. The system includes registers, ALU, and memory interacting through control signals generated by the control unit. Each phase must occur in the correct order to avoid execution errors. The designer is analyzing how instruction flow is logically structured from start to completion.\n\nDetermine the logical flow of instruction processing by interpreting the sequence of control steps, and justify how ordered execution ensures correct system behavior.",
    "answer": "The instruction cycle consists of four sequential phases:\n\n```mermaid\nsequenceDiagram\n    participant PC as Program Counter\n    participant MAR as Memory Addr Reg\n    participant MEM as Main Memory\n    participant MDR as Memory Data Reg\n    participant IR as Instruction Reg\n    participant CU as Control Unit\n\n    Note over PC,IR: 1. FETCH\n    PC->>MAR: Move Address\n    MAR->>MEM: Assert Address\n    MEM->>MDR: Read Instruction\n    MDR->>IR: Load Instruction\n    Note over PC: Increment PC\n\n    Note over IR,CU: 2. DECODE\n    IR->>CU: Opcode Bits\n\n    Note over CU: 3. EXECUTE / WRITEBACK\n    CU->>MEM: Control Signals\n```\n\n### Justification of Ordered Execution:\nEach step produces data required by the next step. For example, the execution phase cannot start until the instruction opcode is decoded, and decoding cannot occur until the instruction is fetched into the IR. Violating this sequence leads to the CPU executing random noise as instructions.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q33",
    "order_index": 33
  },
  {
    "id": "dce00000-0000-0000-0000-000000000034",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executes instructions where each instruction requires a fixed number of clock cycles for completion. A given program consists of multiple instructions with varying cycle counts depending on operation type. The designer is analyzing execution time based on clock cycle distribution. The goal is to model total execution duration.\n\nFormulate the relationship between instruction count, clock cycles, and execution time, and determine how variations in cycle count affect total processing duration.",
    "answer": "The total execution time ($T_{exec}$) of a program is defined by the classic CPU performance equation:\n$$T_{exec} = IC \\times CPI \\times T_c$$\nWhere:\n* $IC$ = Instruction Count (total instructions in program)\n* $CPI$ = Clock Cycles Per Instruction\n* $T_c$ = Clock Cycle Time ($1 / \\text{Frequency}$)\n\n### Impact of CPI Variations:\nIf a program has many memory-based instructions (which require 4–5 cycles to fetch operands from RAM) compared to register-based instructions (which take 1 cycle), the average CPI increases. This increases the total execution time linearly.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q34",
    "order_index": 34
  },
  {
    "id": "dce00000-0000-0000-0000-000000000035",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executes an instruction where the opcode specifies an arithmetic operation and the operand fields indicate register-based inputs. During decoding, the control unit must interpret the instruction and generate appropriate signals for ALU execution. However, timing constraints require precise sequencing of decoding and signal activation. The system uses a hardwired control unit with direct signal mapping. Engineers must outline the logical flow from instruction decoding to execution signal generation.\n\nDetermine the logical sequence of operations from opcode interpretation to ALU control signal activation ensuring correct execution timing.",
    "answer": "In a hardwired control unit, the sequence from opcode to ALU signal is:\n\n```mermaid\ngraph TD\n    A[Instruction Register: Opcode Bits] --> B[Opcode Decoder: 1-of-N lines]\n    C[Timing Generator: Ring Counter / Step T0, T1...] --> D[Control Logic Gate Array]\n    B --> D\n    D --> E[ALU Control Line: Add/Sub/AND]\n```\n\n1. **Opcode Decoding**: The opcode bits from the IR are decoded into a single active control line.\n2. **Timing Signals**: A ring counter generates sequential timing pulses ($T_0, T_1, T_2...$).\n3. **Combinational Gate Array**: The active opcode line and the active timing pulse are combined in an AND gate matrix to generate the target control signal (e.g., $ADD = Opcode_{ADD} \\cdot T_3$).\n4. **Execution**: The control line activates the add circuit in the ALU.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q35",
    "order_index": 35
  },
  {
    "id": "dce00000-0000-0000-0000-000000000036",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A simple processor simulator requires implementation of an instruction decoding module that interprets opcode values and triggers corresponding micro-operations. The system currently lacks structured logic for distinguishing instruction categories. Developers must design a decoding routine that maps opcodes to control actions.\n\nFormulate a pseudocode logic that ensures correct mapping of opcode values to corresponding control signals for execution.",
    "answer": "A simple instruction decoding routine in pseudocode:\n\n```text\n// Decode Opcode and Execute Micro-operations\nFUNCTION decode_and_execute(instruction):\n    opcode = (instruction & 0xF000) >> 12 // Extract top 4 bits\n    reg_src = (instruction & 0x0F00) >> 8  // Extract source register\n    reg_dest = (instruction & 0x00F0) >> 4 // Extract destination register\n\n    SWITCH opcode:\n        CASE 0x1: // ADD Instruction\n            ALU_Control = 0b000 // Set ALU to ADD mode\n            Reg_Write_Enable = 1\n            Bus_Select = reg_src\n        CASE 0x2: // SUB Instruction\n            ALU_Control = 0b001 // Set ALU to SUB mode\n            Reg_Write_Enable = 1\n            Bus_Select = reg_src\n        CASE 0x3: // LOAD Instruction\n            MAR_Load = 1\n            Memory_Read = 1\n        DEFAULT:\n            Trigger_Invalid_Opcode_Exception()\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q36",
    "order_index": 36
  },
  {
    "id": "dce00000-0000-0000-0000-000000000037",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system architect is evaluating processor performance under increasing workload where instruction complexity grows over time. The control unit must manage additional instruction formats and extended operation codes. The system must scale without significantly increasing execution time or control complexity. Trade-offs between simplicity and scalability become critical.\n\nAnalyze the scalability challenges of the control unit under increasing instruction complexity, and recommend how control design choices influence system efficiency.",
    "answer": "As instruction sets grow, control units face significant scalability challenges:\n\n### Control Unit Architectures:\n* **Hardwired Control Unit**: Uses combinational logic gates.\n  * *Pros*: Extremely fast.\n  * *Cons*: Poor scalability. Adding a new instruction requires redesigning the entire logic gate matrix, making it highly complex.\n* **Microprogrammed Control Unit**: Stores control signals as microinstructions in a Control ROM.\n  * *Pros*: Excellent scalability. Adding an instruction only requires writing a new microprogram to ROM.\n  * *Cons*: Slower because it requires a ROM access for each microstep.\n\n### Recommendation:\nFor complex instruction sets, a **Microprogrammed Control Unit** is preferred. For high-speed, simplified instruction sets (RISC), a **Hardwired Control Unit** is optimal.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q37",
    "order_index": 37
  },
  {
    "id": "dce00000-0000-0000-0000-000000000038",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor integrates memory, registers, ALU, and control unit to execute instructions. The control unit generates signals that coordinate operations among these components. Efficient execution depends on proper interaction and timing of these elements. The system is being evaluated for operational coherence.\n\nAssess how the control unit ensures coordinated operation among system components and infer its impact on overall execution reliability.",
    "answer": "The control unit coordinates system components using synchronized **control words** asserted during specific clock cycles ($T_i$).\n\n```mermaid\ngraph TD\n    CU[Control Unit] -->|Read Enable| RegA[Register A]\n    CU -->|Write Enable| RegB[Register B]\n    CU -->|Select Lines| Bus[Common Bus]\n    CU -->|Opcode Select| ALU[Arithmetic Logic Unit]\n```\n\n### Impact on Reliability:\nIf control signals are out of sync by even a fraction of a nanosecond (due to clock skew), data will be read before it stabilizes, or multiple registers will drive the bus simultaneously. The control unit maintains timing margins, ensuring high system reliability.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q38",
    "order_index": 38
  },
  {
    "id": "dce00000-0000-0000-0000-000000000039",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A microprocessor designed for IoT devices must balance decoding efficiency with limited hardware resources. The current combinational decoder is fast but consumes significant logic gates when supporting multiple instruction formats. Alternatively, a microprogrammed approach reduces hardware complexity but introduces execution delay. The system operates under strict energy and performance constraints. Engineers must evaluate the trade-offs between both decoding techniques.\n\nAnalyze the trade-offs between combinational and microprogrammed decoding in this constrained system and infer the most efficient approach.",
    "answer": "For low-power IoT devices, we evaluate:\n\n### Comparison:\n1. **Hardwired (Combinational) Decoding**:\n   * *Pros*: Minimal silicon area for small instruction sets, zero microprogram ROM overhead, and fast single-cycle decoding.\n   * *Cons*: Complex to modify.\n2. **Microprogrammed Decoding**:\n   * *Pros*: Flexible.\n   * *Cons*: Requires a Control ROM which consumes continuous static leakage power and board space.\n\n### Inference:\nFor IoT devices with fixed, simple instruction sets, **Hardwired Decoding** is the most efficient choice. It eliminates the ROM power overhead and minimizes clock cycles.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q39",
    "order_index": 39
  },
  {
    "id": "dce00000-0000-0000-0000-000000000040",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computing system processes diverse workloads including arithmetic computations and I/O operations, but experiences inefficiencies due to generalized decoding logic. The instruction decoder does not differentiate execution paths effectively. Engineers consider restructuring the decoding unit to improve specialization.\n\nAssess how specialized decoding based on instruction types improves system performance and operational clarity.",
    "answer": "Specialized decoding categorizes instructions into groups (Memory-Reference, Register-Reference, I/O) before full decoding.\n\n### Advantages:\n1. **Parallel Execution Paths**: By identifying the instruction type early, the control unit can disable unused paths (e.g., turning off memory decoders for register operations), saving power.\n2. **Reduced Propagation Delay**: The decoding tree depth is reduced, allowing the control unit to operate at higher clock frequencies, improving system performance.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q40",
    "order_index": 40
  },
  {
    "id": "dce00000-0000-0000-0000-000000000041",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "An industrial automation controller intermittently executes wrong instructions during operation. The system uses a sequential instruction flow where the PC increments after every fetch. However, during certain operations, the PC appears to skip addresses unexpectedly. Investigation shows that MAR receives correct addresses, but MDR occasionally loads outdated data. The control unit generates memory read signals without verifying memory readiness. Logs indicate that instruction alignment issues occur when accessing multi-byte instructions.\n\nInvestigate the root causes of incorrect instruction execution by correlating PC behavior, MAR-MDR data transfer, and instruction alignment constraints, and determine the primary fault in the fetch mechanism.",
    "answer": "The root cause of the intermittent execution failures is a **memory synchronization/timing hazard** combined with **unaligned instruction accesses**.\n\n### Detailed Analysis of the Faults:\n1. **MAR-MDR Timing Mismatch**: The CPU asserts a memory read signal but does not wait for the memory's `READY` signal. Since memory access is slower than CPU cycle time, the CPU loads data from the MDR before the memory has finished driving the bus. This results in the CPU reading outdated data.\n2. **Instruction Alignment Violations**: Multi-byte instructions must be aligned to word boundaries. If the PC increments sequentially by 1 on a byte-addressable machine when fetching a 2-byte or 4-byte instruction, it will fetch a misaligned split-word, causing the control unit to decode invalid opcodes.\n\n### Corrective Measures:\n* Implement **wait states** (inserting a `READY` line check) in the control unit's fetch state machine.\n* Ensure the PC increments by the instruction width (e.g., $+2$ or $+4$) rather than $+1$.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q41",
    "order_index": 41
  },
  {
    "id": "dce00000-0000-0000-0000-000000000042",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A 32-bit processor executes a sequence of arithmetic and branch instructions where operands are fetched from general-purpose registers and results are written back after ALU processing, while the control unit issues timed signals across clock cycles to coordinate register transfers, and a conditional branch depends on status flags generated during execution, and a temporary register is used to hold intermediate results for a multi-cycle multiplication, while instruction flow may alter based on branch resolution within the same execution window.\n\nAnalyze the execution sequencing by determining the ordered micro-operations required to complete both the arithmetic and conditional branch instruction while reconciling how control signals synchronize data movement and influence control flow changes.",
    "answer": "The execution of an arithmetic instruction followed by a conditional branch consists of the following micro-operations:\n\n### 1. Arithmetic Instruction (e.g., ADD R1, R2)\n* **$T_0$**: $MAR \\leftarrow PC$\n* **$T_1$**: $MDR \\leftarrow Memory[MAR]$, $PC \\leftarrow PC + 1$\n* **$T_2$**: $IR \\leftarrow MDR$\n* **$T_3$**: $ALU \\leftarrow R1 + R2$, update status flags ($S, Z, C, V$)\n* **$T_4$**: $R1 \\leftarrow ALU\\_Output$\n\n### 2. Conditional Branch Instruction (e.g., JZ Offset)\n* **$T_0$**: $MAR \\leftarrow PC$\n* **$T_1$**: $MDR \\leftarrow Memory[MAR]$, $PC \\leftarrow PC + 1$\n* **$T_2$**: $IR \\leftarrow MDR$\n* **$T_3$**: Decode branch condition. Check Zero ($Z$) flag.\n  * If $Z = 1$: $PC \\leftarrow PC + Offset$\n  * If $Z = 0$: No operation (continue sequentially).\n\nThe clock ensures that register contents are only written during stable setup/hold times.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q42",
    "order_index": 42
  },
  {
    "id": "dce00000-0000-0000-0000-000000000043",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-performance computing system processes large datasets and relies on deep memory hierarchies. During execution, instruction fetch delays increase significantly when instructions are not present in cache. The PC continues sequential updates, but MAR requests frequently go to slower main memory. MDR loading time increases, delaying IR updates. Engineers consider introducing prefetching or modifying bus organization. However, these changes may impact system complexity and resource utilization.\n\nEvaluate the trade-offs between improving instruction fetch performance using prefetching mechanisms and optimizing bus organization, considering their impact on PC sequencing, MAR-MDR operations, and overall system scalability.",
    "answer": "### Trade-off Evaluation:\n\n1. **Instruction Prefetching**:\n   * *Mechanism*: Fetches the next instruction into a queue while the current instruction is executing.\n   * *Pros*: Hides memory latency; CPU rarely stalls for sequential code.\n   * *Cons*: If a branch is taken, the prefetched instructions are discarded (pipeline flush), wasting bus bandwidth.\n\n2. **Harvard Bus Organization (Separate Instruction and Data Buses)**:\n   * *Mechanism*: Implements separate memory paths and buses for instructions and data.\n   * *Pros*: Eliminates bus conflicts (structural hazards) when an instruction needs to read/write memory during a fetch cycle.\n   * *Cons*: Double the pin count and routing complexity on the CPU package.\n\n### Recommendation:\nFor high-performance systems, a **combined approach** is optimal: a Harvard-style L1 Cache (separate I-cache and D-cache) to prevent bus conflicts, coupled with a branch predictor to optimize prefetching efficiency.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q43",
    "order_index": 43
  },
  {
    "id": "dce00000-0000-0000-0000-000000000044",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-performance processor pipeline executes arithmetic, logical, and branch instructions with overlapping stages, where execution latency increases due to multi-cycle instructions occupying ALU resources, and branch instructions introduce control hazards requiring pipeline stalls, while temporary registers are heavily utilized for intermediate storage, and design engineers must balance throughput against execution accuracy under varying workloads.\n\nEvaluate the execution mechanism by prioritizing trade-offs between pipeline efficiency and execution correctness while recommending strategies to optimize micro-operation sequencing under these constraints.",
    "answer": "### Trade-offs & Pipeline Challenges:\n1. **Data Hazards (Read-After-Write)**: Occurs when an instruction requires the result of a preceding instruction that has not yet completed its write-back stage.\n2. **Control Hazards (Branch Latency)**: Branch instructions alter the PC, invalidating the instructions fetched in the pipeline stages behind them, requiring stalls (bubbles).\n\n### Recommended Optimization Strategies:\n* **Operand Forwarding**: Bypass the write-back stage. Route the ALU output directly back to the ALU input for the next instruction, eliminating data hazard stalls.\n* **Delayed Branching / Branch Prediction**: Use hardware branch predictors to guess the branch direction, minimizing stalls.\n\n```mermaid\ngraph TD\n    A[Instruction Fetch] --> B[Decode]\n    B --> C[Execute]\n    C -->|Forward Result| B\n    C --> D[Memory]\n    D --> E[Write-Back]\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q44",
    "order_index": 44
  },
  {
    "id": "dce00000-0000-0000-0000-000000000045",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor is executing an instruction that requires fetching an operand using indexed addressing where the base register contains 4000 and index register contains 120 while the offset is 30, and the system uses a unified bus for communication between ALU and memory. The control unit must coordinate address computation before initiating a memory read, while cache is checked prior to accessing main memory. Due to a recent workload spike, occasional wait states are introduced during memory access. The instruction involves a single operand stored in memory rather than registers. The processor must ensure correct sequencing of MAR, MDR, and IR during the operation.\n\nAnalyze the sequence of operations required to determine how the effective address is computed and how the operand is fetched from memory while ensuring proper synchronization between components.",
    "answer": "### 1. Effective Address (EA) Computation:\nUsing Indexed Addressing:\n$$EA = \\text{Base Register} + \\text{Index Register} + \\text{Offset}$$\n$$EA = 4000 + 120 + 30 = 4150$$\n\n### 2. Fetch Sequence (Micro-operations):\n* **$T_0$**: $MAR \\leftarrow 4150$ (calculated EA placed in MAR)\n* **$T_1$**: $MDR \\leftarrow Memory[MAR]$ (assert memory read; wait state introduced if memory is busy)\n* **$T_2$**: $Temp \\leftarrow MDR$ (load data into a temporary ALU register)\n* **$T_3$**: Execute operation using $Temp$ and write back results.\n\nWait states halt the CPU control unit state machine until the memory's `READY` line goes high, ensuring synchronization.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q45",
    "order_index": 45
  },
  {
    "id": "dce00000-0000-0000-0000-000000000046",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-performance processor pipeline performs multiple instruction executions concurrently, but the write-back stage becomes a bottleneck when multiple instructions complete simultaneously. The system supports both register and memory write-back paths, and priority must be assigned dynamically. Increasing hardware resources can reduce delay but increases cost and power consumption. Designers must decide on an optimal approach.\n\nEvaluate the trade-offs involved in optimizing the write-back stage and recommend an efficient design strategy.",
    "answer": "The write-back stage becomes a bottleneck when multiple execution units (e.g., integer ALU, floating-point unit, load unit) attempt to write their results to the register file in the same clock cycle.\n\n### Design Strategies:\n* **Multi-Port Register File**: Implement multiple write ports. This allows simultaneous writes but increases silicon area and power consumption.\n* **Write Buffering**: Implement a temporary write buffer. Results are queued in the buffer and written to the register file sequentially during idle cycles.\n\n### Recommendation:\nA **Write Buffer** is the most cost-effective solution for power-constrained systems, while a **Multi-Port Register File** is necessary for high-performance superscalar designs.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q46",
    "order_index": 46
  },
  {
    "id": "dce00000-0000-0000-0000-000000000047",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-performance computing system must choose between register addressing and memory addressing for frequently executed arithmetic instructions. Register addressing provides faster access but limited storage, while memory addressing supports larger datasets but introduces latency due to cache and main memory interactions. The system executes multiple operand instructions requiring frequent data access. The control unit must balance speed and resource utilization under varying workloads. Engineers are evaluating which addressing mode yields better throughput under constrained conditions.\n\nEvaluate the trade-offs between register addressing and memory addressing in terms of performance, scalability, and system efficiency under these conditions.",
    "answer": "### Trade-off Assessment:\n\n1. **Register Addressing**:\n   * *Pros*: Zero memory access latency (single cycle), short instruction encoding (requires only 3–4 bits to specify a register).\n   * *Cons*: Extremely limited storage (typically 8 to 32 registers).\n2. **Memory Addressing**:\n   * *Pros*: Can access the entire memory space (gigabytes of data).\n   * *Cons*: Requires multiple clock cycles (cache hit/miss penalties), and larger instruction encoding.\n\n### Recommendation:\nFor maximum throughput, a **Register-to-Register (RISC) architecture** is optimal. Load operands into registers, perform computations in registers, and store results back to memory once, minimizing memory bus traffic.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q47",
    "order_index": 47
  },
  {
    "id": "dce00000-0000-0000-0000-000000000048",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor completes an arithmetic instruction where the ALU produces a result that must be stored back into a destination register while also updating condition flags. The control unit activates specific write-enable signals, and the memory system remains idle during this phase. The system uses a synchronous clock to coordinate operations, and the next instruction fetch must only begin after write completion. A delay is observed when flag updates overlap with register writes.\n\nAnalyze how the processor should coordinate the write-back sequence and infer how synchronization ensures correct completion of the instruction cycle.",
    "answer": "The coordination of the write-back sequence requires precise clock edge synchronization.\n\n```mermaid\nsequenceDiagram\n    participant CLK as System Clock\n    participant ALU as ALU Output\n    participant REG as Register File\n    participant FLG as Status Flags\n\n    Note over CLK: Rising Edge\n    ALU->>REG: Enable Write Line\n    ALU->>FLG: Update Flags\n    Note over REG,FLG: Data captured simultaneously\n    Note over CLK: Falling Edge\n    Note over REG,FLG: Lines stabilized for next Fetch\n```\n\n### Synchronization Mechanism:\n* The write-enable signal to the destination register and the flag update clock are tied to the same rising edge of the system clock.\n* By using edge-triggered registers, the write-back is completed within the hold-time window of the clock edge. This ensures that the next fetch cycle starts with updated data and flags, preventing read-after-write errors.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-I Q48",
    "order_index": 48
  },
  {
    "id": "dce00000-0000-0000-0000-000000000049",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "An embedded controller calculates net weight by subtracting container weight from total weight. Engineers observe incorrect display outputs when negative values occur. The system depends on sign and zero flags for result validation but misinterprets them. This leads to faulty decisions during operation.\n\nDetermine how status flag misinterpretation affects arithmetic computation outcomes and recommend a method to ensure correct evaluation of subtraction results.",
    "answer": "### Flag Misinterpretation Analysis:\nWhen performing subtraction $A - B$:\n* If $A < B$, the result is negative. In 2's complement, the Sign flag ($S$) is set to 1.\n* If the control system only evaluates the Zero flag ($Z$) or misinterprets the Sign flag as an unsigned value, it will treat the negative weight value as a large positive value (e.g., $-1$ as $255$ in 8-bit).\n\n### Recommendation for Correct Evaluation:\nFor signed comparisons, evaluate the relationship using both the **Sign ($S$)** and **Overflow ($V$)** flags:\n* $A < B$ is true if $(S \\oplus V) = 1$.\n* For unsigned values, evaluate the **Carry ($C$)** flag (where a carry/borrow of 1 indicates a negative result).",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q1",
    "order_index": 49
  },
  {
    "id": "dce00000-0000-0000-0000-000000000050",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital energy meter calculates total consumption by adding power readings stored in memory. Engineers observe delays and occasional incorrect totals during rapid updates. The instruction format requires more cycles for memory-based operands. The system must maintain accuracy while improving speed.\n\nEvaluate how operand selection affects arithmetic instruction performance and determine its impact on execution speed and accuracy in the given system.",
    "answer": "### Performance Impact of Operand Selection:\n* **Register-based Operands**: Operands are fetched directly from CPU registers. Access takes a single clock cycle, maximizing speed.\n* **Memory-based Operands**: Requires the CPU to place the operand address on the address bus, wait for memory read latency, and load the data. This adds at least 2–3 execution cycles.\n\n### Impact in Rapid Update Systems:\nUsing memory operands for rapid updates causes bus saturation and CPU stalls. To maintain accuracy and speed, operands should be loaded into registers, accumulated, and only the final sum written back to memory.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q2",
    "order_index": 50
  },
  {
    "id": "dce00000-0000-0000-0000-000000000051",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A microcontroller uses NOT operations to invert signal bits for control purposes. Engineers observe unexpected behavior when inversion is applied repeatedly without tracking original values. The system does not maintain reference states for comparison. This leads to incorrect control decisions.\n\nAnalyze how repeated NOT operations affect signal interpretation and determine a method to maintain correct control logic.",
    "answer": "### Inversion Behavior:\nApplying the NOT operation repeatedly on a binary bit produces an oscillating sequence:\n$$A \\rightarrow \\bar{A} \\rightarrow A \\rightarrow \\bar{A}$$\nWithout tracking the initial reference state, the system cannot determine if the current state is the original state or the inverted state.\n\n### Corrective Method:\nImplement a **toggle state tracker** in software or a hardware flip-flop. Alternatively, read the current status register bit before applying the operation to verify the active state.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q3",
    "order_index": 51
  },
  {
    "id": "dce00000-0000-0000-0000-000000000052",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A sensor interface circuit uses AND operations to filter unwanted noise bits from incoming data. Engineers observe that some valid signals are also being removed during processing. The system applies masking without carefully selecting mask values. Accurate signal extraction is required for proper system operation.\n\nAnalyze how improper masking using AND operations affects data filtering and determine how correct mask selection ensures accurate signal extraction.",
    "answer": "### Improper AND Masking Effect:\nAn `AND` operation is used to clear specific bits to 0 while keeping others unchanged. If the mask is chosen poorly (e.g., using a mask of $11110000_2$ when the lower nibble contains valid signal bits), valid data is permanently lost (overwritten with $0$s).\n\n### Correct Mask Selection:\nIdentify the exact bit positions of interest. \n* To filter out noise on bits 0 and 1 while preserving bits 2–7, use the mask $11111100_2$.\n* Operation: $Output = Input \\text{ AND } Mask$\n\n| Input Bit | Mask Bit | Output Bit |\n|:---:|:---:|:---:|\n| $0$ (Noise) | $0$ | **$0$ (Filtered)** |\n| $1$ (Noise) | $0$ | **$0$ (Filtered)** |\n| $D$ (Data) | $1$ | **$D$ (Preserved)** |",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q4",
    "order_index": 52
  },
  {
    "id": "dce00000-0000-0000-0000-000000000053",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A robotic control system calculates displacement using sequential additions and subtractions continuously. Engineers notice cumulative errors when multiple operations are executed continuously. The system does not verify carry and overflow conditions consistently. This leads to propagation of incorrect values over time.\n\nAnalyze how ignoring carry and overflow conditions affects sequential arithmetic operations and determine a strategy to maintain computational accuracy.",
    "answer": "### Impact of Ignoring Carry and Overflow:\n* **Carry (Unsigned Arithmetic)**: When the sum of two numbers exceeds the register limit (e.g., $> 255$ in 8-bit), the extra bit is lost. Over multiple additions, this causes cumulative rounding errors.\n* **Overflow (Signed Arithmetic)**: Occurs when adding two numbers of the same sign produces a result with the opposite sign (e.g., $127 + 1 = -128$), leading to incorrect displacements.\n\n### Corrective Strategy:\nAfter each arithmetic operation, check the Carry ($C$) and Overflow ($V$) flags using conditional jumps:\n```text\nADD Accumulator, Sensor_Data\nJC Carry_Handler  // Jump if Carry is set\nJO Overflow_Handler // Jump if Overflow is set\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q5",
    "order_index": 53
  },
  {
    "id": "dce00000-0000-0000-0000-000000000054",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A microcontroller in a temperature monitoring system adds incoming sensor readings using an accumulator. During testing, incorrect results appear when large values are processed continuously. The system relies on status flags to detect abnormal conditions but fails to respond correctly. Engineers suspect issues in arithmetic execution and flag handling.\n\nAnalyze how improper handling of arithmetic instructions and status flags leads to incorrect results, and determine the role of operand type in influencing execution accuracy.",
    "answer": "### Failure Analysis:\nWhen a temperature sensor continuously feeds large values to the accumulator, the sum eventually exceeds the maximum register capacity. \n* If the microcontroller's logic ignores the **Carry ($C$)** or **Overflow ($V$)** flags, the accumulator silently wraps around (e.g., from $255$ to $0$), interpreting a high temperature as extremely cold.\n\n### Role of Operand Type:\n* **Signed Operands**: Overflow occurs at lower values ($+127$ for 8-bit).\n* **Unsigned Operands**: Allows double the range ($255$), but still requires carry-bit checking to trigger alarm routines when capacity is exceeded.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q6",
    "order_index": 54
  },
  {
    "id": "dce00000-0000-0000-0000-000000000055",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "An embedded encryption system uses XOR operations to encode and decode data. Engineers notice incorrect outputs when the same key is not consistently applied. The system relies on XOR properties for reversible transformations. Inconsistent key usage disrupts the encoding process.\n\nDetermine how XOR operation properties influence data encoding and recommend a method to ensure consistent and reversible transformations.",
    "answer": "### XOR Properties in Encryption:\nThe XOR operation ($\\oplus$) is uniquely suited for encryption because of its self-reversible property:\n$$(P \\oplus K) \\oplus K = P$$\nWhere $P$ is plain text, $K$ is the key, and $C = P \\oplus K$ is cipher text.\n\n### Inconsistent Key Impact:\nIf the encryption key $K_e$ differs from the decryption key $K_d$ by even a single bit, the original data is lost:\n$$C \\oplus K_d = P \\oplus K_e \\oplus K_d \\neq P$$\n\n### Recommendation:\nImplement a key handshake protocol (such as Diffie-Hellman) or verify key integrity using a cryptographic checksum (e.g., HMAC) before starting decryption.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q7",
    "order_index": 55
  },
  {
    "id": "dce00000-0000-0000-0000-000000000056",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A digital control system uses OR operations to combine multiple control signals into a single output. Engineers observe unintended activation of certain functions due to overlapping signal conditions. The system does not properly evaluate input combinations before applying logic operations. Reliable control output must be ensured.\n\nEvaluate how improper use of OR operations affects control signal integrity and determine how logical conditions should be structured to avoid unintended outputs.",
    "answer": "The OR operation combines inputs:\n$$Y = A + B + C$$\nIf any input is $1$, the output $Y$ is $1$.\n\n### Signal Integrity Hazard:\nBecause multiple active signals are merged into a single line, the receiver cannot distinguish which specific input caused the activation. This causes unintended functions to trigger when overlapping conditions occur.\n\n### Correct Structure:\nUse a **Priority Encoder** or a **Multiplexer** instead of OR gates. This ensures each input is routed to a distinct addressable state, allowing the control system to resolve conflicts.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q8",
    "order_index": 56
  },
  {
    "id": "dce00000-0000-0000-0000-000000000057",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A data buffering system uses increment operations to move through memory locations and decrement operations to release processed data. Engineers observe data inconsistencies when buffer limits are reached. The system does not properly handle boundary conditions and flag states during these operations. This leads to overwriting or skipping data. The system must maintain data integrity while ensuring efficient buffer management.\n\nAnalyze how improper handling of increment and decrement instructions affects buffer management and propose a strategy to ensure reliable and efficient operation.",
    "answer": "Increment (INC) and Decrement (DEC) instructions modify memory pointers but do not update all status flags in some architectures (e.g., INC/DEC does not affect the Carry flag in x86).\n\n### Buffer Inconsistencies:\n* **Overflow**: Incrementing the write pointer beyond the buffer limit without checking if it matches the read pointer overwrites unread data.\n* **Underflow**: Decrementing the read pointer below zero wraps the pointer to $255$ (in 8-bit), reading garbage data.\n\n### Corrective Strategy:\nAlways compare the pointer value against the boundary limit using a compare (`CMP`) instruction before executing INC or DEC, and branch accordingly:\n```text\nCMP Pointer, Buffer_Max\nJGE Buffer_Full_Handler\nINC Pointer\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q9",
    "order_index": 57
  },
  {
    "id": "dce00000-0000-0000-0000-000000000058",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "An embedded automation system integrates arithmetic and logic instructions to control multiple processes. Engineers observe inconsistent behavior due to improper handling of data dependencies and instruction order. The system processes operations without ensuring correct data flow between steps. This results in incorrect outputs and reduced efficiency.\n\nEvaluate how improper handling of data dependencies and instruction sequencing affects system behavior and develop a strategy to ensure consistent and efficient operation.",
    "answer": "Data dependency (e.g., a Read-After-Write hazard) occurs when an instruction depends on the output of a previous instruction that has not yet completed.\n\n### Impact on System Behavior:\nExecuting instructions out of order or without introducing delays causes the second instruction to read stale data, leading to incorrect outputs and system instability.\n\n### Strategy to Ensure Correct Flow:\n* **Software Interlocking**: Insert `NOP` (No Operation) instructions to allow the first operation to complete.\n* **Hardware Interlocking**: Implement hazard detection units in the CPU to stall the pipeline automatically.\n* **Register Forwarding**: Direct the ALU result back to the ALU input in the next clock cycle.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q10",
    "order_index": 58
  },
  {
    "id": "dce00000-0000-0000-0000-000000000059",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A control system in an industrial machine uses counters to manage task execution cycles. Increment instructions increase cycle count, while decrement instructions track remaining operations. Engineers notice incorrect cycle completion detection due to improper flag usage. The system occasionally terminates tasks prematurely or continues beyond required cycles. The design must ensure precise control over execution cycles.\n\nEvaluate how improper use of increment and decrement instructions affects cycle control and develop a method to ensure accurate task execution management.",
    "answer": "The root cause is the failure to check the **Zero ($Z$) flag** immediately after decrementing the counter.\n\nWhen a loop counts down, the loop termination condition must depend on the counter reaching $0$. If the loop control logic checks the wrong flag (e.g., the Carry flag, which is not modified by DEC in some microcontrollers), the loop will not stop, leading to buffer overflows.\n\n### Correct Method:\n```text\nLoop_Start:\n  // Perform Task\n  DEC Counter\n  JNZ Loop_Start // Jump if Zero Flag is NOT set (Counter > 0)\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q11",
    "order_index": 59
  },
  {
    "id": "dce00000-0000-0000-0000-000000000060",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A signal processing unit performs arithmetic transformations on data and uses logic operations for filtering and condition checking. Engineers observe incorrect outputs due to improper interaction between operations. The system does not validate intermediate values and executes instructions inefficiently. This leads to increased processing time and inaccurate results.\n\nAnalyze how improper interaction between arithmetic and logic instructions affects system performance and propose a method to improve both accuracy and efficiency.",
    "answer": "Improper interaction occurs when logic instructions (which reset the Carry flag) are executed between consecutive multi-byte arithmetic operations (which rely on the Carry flag to propagate values).\n\n### Performance and Accuracy Projections:\n* **Incorrect Interaction**: Executing an AND operation between the addition of the lower byte and the upper byte of a 16-bit number clears the Carry flag, leading to an incorrect sum.\n* **Optimization Method**: Group arithmetic operations sequentially, or save the status register to a temporary register/stack before executing logic instructions.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q12",
    "order_index": 60
  },
  {
    "id": "dce00000-0000-0000-0000-000000000061",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A low-level embedded system performs bit manipulation for device interfacing using rotate instructions. Engineers observe inconsistent device responses due to incorrect bit positioning. The system performs multiple rotations without validating intermediate register values. Lack of proper control over rotation direction and carry flag leads to unpredictable outputs.\n\nEvaluate how improper control of rotate operations affects device interfacing and develop a method to ensure consistent and accurate bit manipulation.",
    "answer": "In low-level interfacing, bit manipulation via rotate instructions is used to shift bits into specific control positions.\n\n### Impact on Interfacing:\n* **Rotate-through-Carry (RAL/RAR)**: Shifts the carry flag into the MSB/LSB. If the carry flag state is unknown, it introduces random bits into the device control byte, causing unpredictable responses.\n* **Rotate-without-Carry (RLC/RRC)**: Shifts bits in a circular loop, bypassing the carry flag.\n\n### Interfacing Rules:\n1. Clear or set the Carry flag explicitly (using `CLC` or `STC`) before executing a rotate-through-carry instruction.\n2. Use masking (AND/OR) to isolate only the target bit after rotation.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q13",
    "order_index": 61
  },
  {
    "id": "dce00000-0000-0000-0000-000000000062",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A real-time embedded system executes complex operations using arithmetic and logic instructions. Engineers observe performance degradation due to inefficient use of instruction cycles, poor resource utilization, and lack of optimization. The system frequently accesses memory and does not effectively use registers. Instruction dependencies also cause delays. The system must improve throughput while maintaining accuracy.\n\nFormulate an optimized execution strategy that improves instruction efficiency, reduces latency, and enhances throughput in the system.",
    "answer": "To optimize instruction efficiency and maximize throughput:\n\n1. **Minimize Memory Operations**: Keep intermediate variables in general-purpose registers instead of writing to and reading from RAM continuously.\n2. **Instruction Reordering**: Reorder instructions to place independent operations between dependent ones, preventing pipeline stalls.\n3. **Use Register Indirect Addressing**: Use index registers for array processing to avoid calculating addresses from scratch in every loop.\n\n```\nUnoptimized: Load R1, [Addr1] -> Add R1, [Addr2] -> Store [Addr3], R1\nOptimized:   Load R1, [Addr1] -> Load R2, [Addr2] -> Add R1, R2\n             // Keep result in R1 for next calculation\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q14",
    "order_index": 62
  },
  {
    "id": "dce00000-0000-0000-0000-000000000063",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A data transmission unit rotates data bits before sending them to match protocol requirements. Engineers notice incorrect outputs when repeated rotations are applied. The system does not distinguish between logical shift and rotate operations and fails to track carry flag changes. This leads to data corruption during transmission.\n\nAnalyze how improper distinction between rotate and shift operations affects data integrity and propose a strategy to ensure correct transmission.",
    "answer": "The difference between shift and rotate operations is critical for data integrity:\n\n* **Logical Shift (SHL/SHR)**: Discards the shifted-out bit and fills the vacant position with $0$. This is destructive and causes data loss.\n* **Rotate (ROL/ROR)**: Cycles the shifted-out bit back into the vacant position. No data is lost.\n\n```\nInitial: 11001101\nSHR:     01100110 (LSB 1 is lost)\nROR:     11100110 (LSB 1 moves to MSB)\n```\n\n### Recommendation:\nWhen sending data over serial protocols that require bit-by-bit transmission without losing the original word structure, always use **Rotate** operations.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q15",
    "order_index": 63
  },
  {
    "id": "dce00000-0000-0000-0000-000000000064",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A microprocessor-based system processes continuous data streams using arithmetic and logic instructions. Engineers observe reduced responsiveness due to high latency and inefficient instruction scheduling. The system does not balance workload effectively across available resources. This leads to bottlenecks in execution.\n\nAnalyze how poor instruction scheduling affects system responsiveness and propose a strategy to improve execution efficiency and scalability.",
    "answer": "Poor instruction scheduling causes pipeline stalls (bubbles) when the CPU must wait for operands or branch resolutions.\n\n### Analysis & Strategy:\nIn a pipelined processor, if an instruction uses the result of the immediately preceding instruction, the pipeline stalls for 1–2 cycles.\n* **Reordering**: A compiler or hardware scheduler reorders instructions so that independent instructions execute during these delay cycles. This maximizes pipeline throughput, improving system responsiveness.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q16",
    "order_index": 64
  },
  {
    "id": "dce00000-0000-0000-0000-000000000065",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executing memory reference instructions in a real-time monitoring system begins to produce inconsistent outputs during load and store operations. The system uses indirect addressing to handle large datasets, but engineers notice that incorrect values are being fetched intermittently. Detailed analysis reveals that the issue may stem from improper address resolution, timing mismatches between CPU and memory, or incorrect sequencing of instruction execution stages. Since the system is used in critical infrastructure, identifying the exact fault is essential to prevent data corruption and ensure reliable operation.\n\nIdentify the possible causes of incorrect data retrieval in memory reference instructions and recommend corrective measures.",
    "answer": "### Causes of Inconsistent Memory Retrieval:\n1. **Timing Mismatches**: The memory read pulse ($RD$) is too short, or the address setup time is violated, meaning the memory chip is deselected before data stabilizes.\n2. **Address Bus Noise/Crosstalk**: High-frequency signals on parallel address lines couple capacitively, causing the memory to read from a different address.\n3. **Improper Page Boundary Crossing**: When executing indirect address calculations, the pointer may cross a memory page boundary, requiring additional cycles that the control unit fails to wait for.\n\n### Corrective Measures:\n* Introduce **wait states** in the memory interface.\n* Implement physical decoupling capacitors to minimize address line noise.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q17",
    "order_index": 65
  },
  {
    "id": "dce00000-0000-0000-0000-000000000066",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-performance embedded controller is being designed for an industrial automation system where multiple sensors continuously generate data that must be accessed from memory with minimal delay. The instruction format is constrained by limited word size, forcing the designer to carefully choose between direct and indirect addressing modes. Direct addressing allows faster execution but restricts addressable memory range, whereas indirect addressing introduces additional memory access cycles but enables flexible data handling across a larger memory space. The system must maintain real-time responsiveness while supporting scalability for future expansion. The designer must evaluate performance, hardware complexity, and execution latency before finalizing the addressing mechanism.\n\nFormulate a strategic approach to select an addressing mode that optimizes performance while ensuring scalability and flexibility in memory access.",
    "answer": "### Addressing Mode Selection:\n* **Direct Addressing**:\n  * *Pros*: Faster execution (only 1 memory access to fetch the operand).\n  * *Cons*: The address space is limited by the instruction word size (e.g., an 8-bit address field can only access 256 bytes).\n* **Indirect Addressing**:\n  * *Pros*: Can access the entire memory space using pointer registers.\n  * *Cons*: Requires 2 memory accesses (one to fetch the effective address, one to fetch the operand), increasing latency.\n\n### Strategy:\nUse **Direct Addressing** for local variables and loop counters, and **Indirect Addressing** for arrays and dynamic data structures.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q18",
    "order_index": 66
  },
  {
    "id": "dce00000-0000-0000-0000-000000000067",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system integrates arithmetic operations and flag-based decision-making to control execution flow. The engineer must connect how computation results affect flags and how flags influence program behavior. The system depends on accurate coordination between flag updates to program execution behavior.\n\nRelate flag updates to program execution behavior.",
    "answer": "Status flags (Sign, Zero, Carry, Overflow) bridge the gap between ALU operations and control flow.\n\n```mermaid\ngraph TD\n    ALU[ALU Operation] -->|Updates| Flags[Status Register Flags: S, Z, C, V]\n    Flags -->|Evaluated by| Branch[Branch Logic: JZ, JC, JS]\n    Branch -->|Modifies| PC[Program Counter]\n```\n\n### Explanation:\nEvery arithmetic/logic operation updates the status flags. Conditional branch instructions read these flags to determine whether to update the Program Counter ($PC \\leftarrow PC + Offset$) or continue sequentially. This creates conditional branch paths.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q19",
    "order_index": 67
  },
  {
    "id": "dce00000-0000-0000-0000-000000000068",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor fails to correctly execute conditional instructions due to incorrect flag values stored in the status register. Engineers observe that flags are not updated properly after arithmetic operations, leading to incorrect execution paths. The system must be analyzed to identify the issue and restore proper functionality.\n\nExamine the issue and identify causes of incorrect flag behavior.",
    "answer": "### Diagnosing Faulty Flag Updates:\n1. **Control Signal Failure**: The write-enable line to the status register fails to assert after logical/arithmetic instructions, leaving flags in their previous states.\n2. **ALU Flag Logic Fault**: The logic gates that detect zero (a massive NOR gate across all output bits) or sign (which copies the MSB) have design faults.\n3. **Interrupt Contention**: An interrupt service routine modifies the flag register without saving and restoring it, corrupting the main program's flags.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q20",
    "order_index": 68
  },
  {
    "id": "dce00000-0000-0000-0000-000000000069",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computing system executes a memory reference instruction using indirect addressing where the address field of the instruction does not directly point to the operand but instead points to a memory location that stores the effective address. The engineer must analyze the sequence of operations required to resolve the final operand address. The process involves multiple memory accesses and intermediate address retrieval steps. Accurate computation of the effective address is critical to ensure correct execution of arithmetic and data transfer instructions within the processor.\n\nDetermine the sequence of operations involved in calculating the effective address in indirect addressing and justify each step logically.",
    "answer": "In Indirect Addressing, the address field of the instruction contains the memory address of the effective address.\n\n### Calculation Steps:\n1. **Instruction Fetch**: Fetch the instruction opcode and address field $ADR_1$ from memory.\n2. **First Memory Read**: Access memory at address $ADR_1$ to retrieve the value $ADR_2$ (the Effective Address).\n3. **Second Memory Read**: Access memory at address $ADR_2$ to retrieve the actual operand.\n\n```text\nInstruction Register -> ADR1 -> Memory[ADR1] -> ADR2 -> Memory[ADR2] -> Operand\n```",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q21",
    "order_index": 69
  },
  {
    "id": "dce00000-0000-0000-0000-000000000070",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computer architecture researcher is analyzing how memory reference instructions are executed within a CPU pipeline involving registers, ALU, control unit, and memory modules. Each instruction consists of an opcode and an address field, and execution involves sequential stages such as fetch, decode, and execute. The researcher must understand how these components interact dynamically to perform operations like load, store, and arithmetic computations using memory operands. The system behavior depends on correct coordination between instruction fields and hardware units. The researcher must integrate these elements to model the complete execution flow of memory-based operations.\n\nIntegrate the roles of instruction format and CPU components to infer how memory reference instructions are executed in a system.",
    "answer": "During a memory reference instruction (e.g., LOAD Address):\n\n```mermaid\nsequenceDiagram\n    participant PC as Program Counter\n    participant MAR as Memory Addr Reg\n    participant MEM as Memory\n    participant MDR as Memory Data Reg\n    participant IR as Instruction Reg\n    participant AC as Accumulator\n\n    PC->>MAR: Move Address\n    MAR->>MEM: Address asserted\n    MEM->>MDR: Read opcode\n    MDR->>IR: Load Instruction\n    Note over IR: Decode Opcode (LOAD)\n    IR->>MAR: Move operand address field\n    MAR->>MEM: Address asserted\n    MEM->>MDR: Read operand data\n    MDR->>AC: Load data into Accumulator\n```\n\nThe control unit coordinates these steps by asserting the appropriate register enable and write-enable lines in sync with the clock.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q22",
    "order_index": 70
  },
  {
    "id": "dce00000-0000-0000-0000-000000000071",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor design team must decide which flags to include in the status register for efficient decision-making in control systems. Including more flags increases flexibility but adds complexity. The system must support accurate branching while maintaining performance. Engineers must evaluate which flags are essential for system operation.\n\nFormulate a strategy for selecting flags in processor design.",
    "answer": "### Flag Selection Strategy:\nStatus flags should be selected based on the requirements of the instruction set:\n1. **Zero ($Z$)**: Required for loop termination checks.\n2. **Sign ($S$)**: Required for signed number comparisons.\n3. **Carry ($C$)**: Required for multi-byte arithmetic and unsigned comparisons.\n4. **Overflow ($V$)**: Required to detect errors in signed arithmetic.\n\n### Recommendation:\nInclude these four primary flags as a unified **Processor Status Word (PSW)**, which provides enough information for standard control logic without excessive hardware cost.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q23",
    "order_index": 71
  },
  {
    "id": "dce00000-0000-0000-0000-000000000072",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A high-speed data processing unit uses status flags to monitor arithmetic results and guide execution decisions. Increasing the number of flags improves condition tracking but may slow down processing due to additional hardware complexity. The system must balance performance with accurate condition monitoring. Engineers must evaluate how flag usage affects scalability and efficiency in large-scale systems.\n\nAnalyze how the number of flags influences system performance and scalability.",
    "answer": "### Performance Impact of Flags:\nIncreasing the number of flags (e.g., adding Parity, Auxiliary Carry, Zero-detect for specific registers) improves debugging and condition tracking but increases hardware complexity.\n* **Control Path Delays**: The ALU must compute and write to more flag registers on every clock cycle. This increases routing congestion and setup times, limiting maximum clock frequencies.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q24",
    "order_index": 72
  },
  {
    "id": "dce00000-0000-0000-0000-000000000073",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computing system performs operations using register reference instructions where data is manipulated directly within CPU registers without accessing memory. The system uses accumulator and general-purpose registers to perform arithmetic and logical operations efficiently. Engineers must evaluate how these instructions improve system performance and reduce execution time.\n\nEvaluate the effectiveness of register reference instructions.",
    "answer": "### Effectiveness of Register Reference Instructions:\nRegister reference instructions (e.g., `CMA` - Complement Accumulator, `INC REG`) perform operations on operands stored within the CPU registers.\n* **Pros**: \n  * They do not access memory, bypassing the memory bus bottleneck.\n  * They execute in a single clock cycle.\n  * The instruction word does not need an address field, leaving more bits for the opcode.\n* **Cons**: Limited by the number of CPU registers.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q25",
    "order_index": 73
  },
  {
    "id": "dce00000-0000-0000-0000-000000000074",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A computing system processes large datasets using both direct and indirect addressing mechanisms. Direct addressing is faster but limited, while indirect addressing supports complex data structures with additional overhead. Engineers must evaluate trade-offs to design an efficient system.\n\nAnalyze the trade-offs between addressing modes.",
    "answer": "### Trade-off Comparison:\n* **Direct Addressing**:\n  * *Speed*: High (1 memory cycle).\n  * *Flexibility*: Low (addresses are hardcoded in the instruction).\n* **Indirect Addressing**:\n  * *Speed*: Low (2 memory cycles).\n  * *Flexibility*: High (allows pointers and dynamic memory allocation).\n\n### Recommendation:\nFor high-performance applications, use **Register Indirect Addressing** (using a CPU register to hold the address), which combines the speed of register access with the flexibility of indirect addressing.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q26",
    "order_index": 74
  },
  {
    "id": "dce00000-0000-0000-0000-000000000075",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executes register instructions involving multiple steps controlled by the control unit. The engineer must outline the sequence of execution.\n\nConstruct the execution flow.",
    "answer": "The execution flow of a Register Reference instruction:\n\n```mermaid\ngraph TD\n    A[Fetch: PC -> MAR -> Memory -> MDR -> IR] --> B[Decode: Identify as Register Reference]\n    B --> C[Execute: ALU operates directly on target register]\n    C --> D[Writeback: Save result to target register]\n```\n\n1. **Fetch**: The instruction is loaded into the IR.\n2. **Decode**: The control unit identifies that the instruction does not access memory (e.g., MSB bits specify register mode).\n3. **Execute**: The ALU performs the operation (e.g., complement) directly on the target register. No memory read/write cycles occur.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q27",
    "order_index": 75
  },
  {
    "id": "dce00000-0000-0000-0000-000000000076",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system combines extended register operations with indirect addressing to handle dynamic data structures efficiently. The engineer must relate these concepts to system functionality.\n\nRelate the concepts.",
    "answer": "Combining extended register operations with indirect addressing enables efficient data structure traversal.\n\n### Integration:\nPointer registers (e.g., $HL$ in 8085, index registers in modern CPUs) hold the effective address of the data. \n* By combining this with register instructions like auto-increment (e.g., `LD A, (HL+)`), the CPU can read the data and increment the memory pointer in a single instruction, minimizing code size and execution time.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q28",
    "order_index": 76
  },
  {
    "id": "dce00000-0000-0000-0000-000000000077",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A system uses multiple jump and call instructions to manage execution flow in complex applications. While these provide flexibility, they may introduce overhead and reduce readability. Engineers must evaluate trade-offs.\n\nAnalyze the trade-offs.",
    "answer": "### Jump and Call Trade-offs:\n* **Jump (Unconditional/Conditional)**: Alters execution flow by writing a new address to the PC.\n  * *Pros*: Simple, low overhead.\n  * *Cons*: Breaks sequential execution, flushing the instruction pipeline (branch penalty).\n* **Call**: Saves the return address on the stack before branching.\n  * *Pros*: Enables reusable subroutines.\n  * *Cons*: Requires memory writes (pushing the PC to stack), which increases latency.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q29",
    "order_index": 77
  },
  {
    "id": "dce00000-0000-0000-0000-000000000078",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A large-scale application uses stack organization to manage function calls, recursion, and interrupt handling. While stacks provide structured execution flow, they consume memory and may cause overflow in deep recursive calls. The system must balance efficient execution with memory constraints. Engineers must evaluate trade-offs between stack usage, performance, and scalability.\n\nAnalyze the impact of stack organization on system performance and scalability.",
    "answer": "Stack organization (LIFO - Last In First Out) is essential for nesting function calls and handling interrupts.\n\n### Impact on Performance:\n* **Stack Pointer (SP)**: Tracks the top of the stack in RAM.\n* **Overhead**: Every function call requires pushing parameters and the return address to the stack, increasing memory bus traffic.\n* **Scalability Limitations**: Deep recursion can exceed the allocated stack space, causing a **Stack Overflow** which crashes the application.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q30",
    "order_index": 78
  },
  {
    "id": "dce00000-0000-0000-0000-000000000079",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executes call and return instructions requiring saving and restoring execution addresses using stack memory. The engineer must outline the execution process.\n\nDevelop the sequence of operations.",
    "answer": "The sequence of operations for Call and Return:\n\n```mermaid\ngraph TD\n    subgraph CALL Sequence\n    A1[\"SP <- SP - 1\"] --> A2[\"Memory[SP] <- PC\"]\n    A2 --> A3[\"PC <- Target Subroutine Address\"]\n    end\n    subgraph RETURN Sequence\n    B1[\"PC <- Memory[SP]\"] --> B2[\"SP <- SP + 1\"]\n    end\n```\n\n### 1. CALL Target Address\n* **$T_3$**: $SP \\leftarrow SP - 1$\n* **$T_4$**: $Memory[SP] \\leftarrow PC$ (push return address to stack)\n* **$T_5$**: $PC \\leftarrow \\text{Target Address}$ (branch to subroutine)\n\n### 2. RET (Return from Subroutine)\n* **$T_3$**: $PC \\leftarrow Memory[SP]$ (pop return address)\n* **$T_4$**: $SP \\leftarrow SP + 1$ (increment stack pointer)",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q31",
    "order_index": 79
  },
  {
    "id": "dce00000-0000-0000-0000-000000000080",
    "subject_id": "a1000000-0000-0000-0000-000000000005",
    "question": "A processor executes a sequence of push and pop operations where multiple data values are stored and retrieved from the stack. The engineer must model how the stack pointer changes and how data is managed during execution. Accurate modeling ensures correct execution flow.\n\nDetermine how stack operations affect stack pointer movement.",
    "answer": "Stack operations modify the Stack Pointer ($SP$) as follows:\n\n### 1. PUSH Operation\nThe SP is decremented first (assuming stack grows downward), then the data is written:\n$$SP \\leftarrow SP - 1$$\n$$Memory[SP] \\leftarrow \\text{Data}$$\n\n### 2. POP Operation\nThe data is read from the current SP address, then the SP is incremented:\n$$\\text{Data} \\leftarrow Memory[SP]$$\n$$SP \\leftarrow SP + 1$$\n\nThis ensures that the SP always points to the top of the stack, preventing data corruption.",
    "image_url": null,
    "references": "22AM206 - Digital Computer Electronics",
    "notes": "Module Test-II Q32",
    "order_index": 80
  },
  {
    "id": "e1000000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A robot moves in straight lines described by $y = mx + c$ where slope varies with terrain.\n\n**Form differential equation when both m and c are arbitrary and justify order.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q1",
    "order_index": 1
  },
  {
    "id": "e1000000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A sensor output follows\n\n$$\ny=e^{bx}(a\\cos x)\n$$\n**Identify the order of resulting differential equation and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q2",
    "order_index": 2
  },
  {
    "id": "e1000000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A body is dropped from rest.\n\n**Formulate the differential equation and find velocity.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q3",
    "order_index": 3
  },
  {
    "id": "e1000000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Apply Newton's law of cooling to formulate the differential equation for an object at $90^\\circ C$ placed in a surrounding of $25^\\circ C$.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q4",
    "order_index": 4
  },
  {
    "id": "e1000000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Fluid flow velocity is given by\n\n$$\ny=\\frac{a}{x}+b\n$$\nwhere constants depend on system pressure.\n\n**Form the differential equation and interpret the result.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q5",
    "order_index": 5
  },
  {
    "id": "e1000000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A sensor output follows\n\n$$\ny=e^x(a\\cos x+b\\sin x)\n$$\n**Identify the order of resulting differential equation and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q6",
    "order_index": 6
  },
  {
    "id": "e1000000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A sensor cools from $90^\\circ C$ to $70^\\circ C$ in 8 minutes in a $20^\\circ C$ room.\n\n**Find the cooling constant k.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q7",
    "order_index": 7
  },
  {
    "id": "e1000000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Apply the concept of free fall to construct the differential equation and determine the velocity of a body dropped from rest.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q8",
    "order_index": 8
  },
  {
    "id": "e1000000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electric vehicle battery cooling system, the temperature $T$ satisfies\n\n$$\n\\frac{dT}{dt}=-k(T-T_a)\n$$\nwhere $T_a$ is ambient temperature.\n\n**Solve using separation of variables and evaluate the time required for the battery to reach a safe temperature given initial conditions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q9",
    "order_index": 9
  },
  {
    "id": "e1000000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A vehicle slows down in water where deceleration is proportional to velocity. Initial velocity is 20 m/s. After 5 seconds, velocity becomes 10 m/s.\n\n**Formulate, solve, and interpret velocity after 10 seconds.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q10",
    "order_index": 10
  },
  {
    "id": "e1000000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a wireless sensor system, signal strength $S$ decays as\n\n$$\n\\frac{dh}{dt}=-k\\sqrt{h}\n$$\n**Solve the equation using separation of variables and analyze how initial signal strength influences transmission range.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q11",
    "order_index": 11
  },
  {
    "id": "e1000000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A bacterial culture grows from 500 to 1500 in 4 hours.\n\n**Develop the model and predict population after 6 hours.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q12",
    "order_index": 12
  },
  {
    "id": "e1000000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A damping system in machinery follows\n\n$$\n\\frac{dy}{dx}-\\frac{2y}{x+1}=(x+1)^3\n$$\nAn engineer incorrectly assumes integrating factor $e^{-2x}$, leading to wrong results.\n\n**Identify the mistake, compute correct integrating factor, and solve the equation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q13",
    "order_index": 13
  },
  {
    "id": "e1000000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A viral infection spreads in a closed campus of 5000 students. Initially, 5 students are infected and after 4 days, 50 students are infected.\n\n**Formulate the logistic model, determine constants, and evaluate infected population after 10 days.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q14",
    "order_index": 14
  },
  {
    "id": "e1000000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electric vehicle, the battery pack experiences non-uniform heating during fast charging. The temperature rise is influenced by internal resistance and external cooling, leading to the model\n\n$$\n\\frac{dy}{dx}+3y=2x-1\n$$\nwhere $y$ represents temperature deviation and $x$ represents time.\n\n**Find the temperature distribution using Leibnitz method and analyze whether the system reaches thermal stability.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q15",
    "order_index": 15
  },
  {
    "id": "e1000000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A chemical reactor produces a substance limited by capacity 1000 units. Initially 50 units exist and after 2 hours it becomes 200 units.\n\n**Formulate the logistic equation and analyze production after 6 hours.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q16",
    "order_index": 16
  },
  {
    "id": "e1000000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Classify and justify the equation:\n\n$$\n\\frac{d^2y}{dx^2}+3y=\\sin x\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q17",
    "order_index": 17
  },
  {
    "id": "e1000000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Interpret the role of particular integral in second order systems in physical and engineering contexts.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q18",
    "order_index": 18
  },
  {
    "id": "e1000000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A mass-spring system satisfies\n\n$$\nx''+25x=0\n$$\n**Analyze and interpret amplitude, frequency, and nature of motion.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q19",
    "order_index": 19
  },
  {
    "id": "e1000000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A mechanical oscillator completes 50 cycles in 10 seconds.\n\n**Determine its frequency and interpret its engineering significance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q20",
    "order_index": 20
  },
  {
    "id": "e1000000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A system follows\n\n$$\n\\frac{d^2y}{dx^2}+4y=0,\\quad y(0)=2,\\quad y'(0)=-4\n$$\nThe complementary function is\n\n$$\ny=C_1\\cos 2x+C_2\\sin 2x\n$$\n**Determine the constants and interpret system behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q21",
    "order_index": 21
  },
  {
    "id": "e1000000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Explain the role of initial conditions in second order systems.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q22",
    "order_index": 22
  },
  {
    "id": "e1000000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An LC circuit has equation\n\n$$\n\\frac{d^2q}{dt^2}+\\frac{k}{m}q=0\n$$\n**Evaluate the effect of increasing k on frequency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q23",
    "order_index": 23
  },
  {
    "id": "e1000000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A spring-mass system in vibration analysis is modeled by\n\n$$\n\\frac{d^2x}{dt^2}+\\omega^2x=0\n$$\n**Interpret the type of motion.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q24",
    "order_index": 24
  },
  {
    "id": "e1000000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An RLC circuit satisfies\n\n$$\n\\frac{d^2i}{dt^2}+4\\frac{di}{dt}+4i=0\n$$\n**Determine complementary function and evaluate system response.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q25",
    "order_index": 25
  },
  {
    "id": "e1000000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A vibration system satisfies\n\n$$\n\\frac{d^2x}{dt^2}+8\\frac{dx}{dt}+16x=0\n$$\n**Analyze the damping condition and evaluate system response.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q26",
    "order_index": 26
  },
  {
    "id": "e1000000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A spring-mass system is governed by\n\n$$\n\\frac{d^2y}{dt^2}+5\\frac{dy}{dt}+6y=0\n$$\n**Formulate the auxiliary equation, determine the complementary function, and analyze system behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q27",
    "order_index": 27
  },
  {
    "id": "e1000000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A vehicle suspension system is modeled by\n\n$$\nm\\frac{d^2x}{dt^2}+c\\frac{dx}{dt}+kx=0\n$$\nwith $m=2$ kg, $c=6$ Ns/m, $k=5$ N/m.\n\n**Formulate the differential equation, determine the nature of damping, and interpret system response.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q28",
    "order_index": 28
  },
  {
    "id": "e1000000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A vibration system is governed by\n\n$$\n\\frac{d^2y}{dt^2}+4y=t^2\n$$\n**Determine particular integral using undetermined coefficients and evaluate complete response.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q29",
    "order_index": 29
  },
  {
    "id": "e1000000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A structure vibrates under external force\n\n$$\nF(t)=8\\cos\\omega t\n$$\n**Analyze and determine the condition for resonance and evaluate its effect.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q30",
    "order_index": 30
  },
  {
    "id": "e1000000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A control system is described by\n\n$$\n\\frac{d^2y}{dx^2}+y=\\cos 2x\n$$\n**Determine the particular integral using another method.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q31",
    "order_index": 31
  },
  {
    "id": "e1000000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A spring-mass-damper system is subjected to an external force\n\n$$\nF(t)=10\\cos 2t\n$$\nGiven $m=1$ kg, $c=4$ Ns/m, $k=5$ N/m.\n\n**Formulate the differential equation, determine steady-state solution, and interpret system behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q32",
    "order_index": 32
  },
  {
    "id": "e1000000-0000-0000-0000-000000000033",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An engineer models position as a scalar\n\n$$\nx(t)=t^2\n$$\ninstead of a vector.\n\n**Identify the error and correct it.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q33",
    "order_index": 33
  },
  {
    "id": "e1000000-0000-0000-0000-000000000034",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Temperature is given by\n\n$$\nT(x,y)=5x+3y\n$$\n**Identify the type of field.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q34",
    "order_index": 34
  },
  {
    "id": "e1000000-0000-0000-0000-000000000035",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a conveyor system, path\n\n$$\n\\vec r(t)=t\\hat i+t^2\\hat j\n$$\n**Identify if motion is straight or curved using tangent direction.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q35",
    "order_index": 35
  },
  {
    "id": "e1000000-0000-0000-0000-000000000036",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A particle moves in a circle.\n\n**Identify curvature nature.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q36",
    "order_index": 36
  },
  {
    "id": "e1000000-0000-0000-0000-000000000037",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A fluid velocity field is given by\n\n$$\n\\vec v(t)=3t\\hat i+2t^2\\hat j\n$$\n**Identify whether acceleration is constant.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q37",
    "order_index": 37
  },
  {
    "id": "e1000000-0000-0000-0000-000000000038",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Given\n\n$$\n\\vec r(t)=3t\\hat i+2t^2\\hat j\n$$\n**Identify the type and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q38",
    "order_index": 38
  },
  {
    "id": "e1000000-0000-0000-0000-000000000039",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An engineer assumes tangent and normal vectors are parallel.\n\n**Identify and correct the error.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q39",
    "order_index": 39
  },
  {
    "id": "e1000000-0000-0000-0000-000000000040",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Identify role of unit tangent vector in motion analysis.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q40",
    "order_index": 40
  },
  {
    "id": "e1000000-0000-0000-0000-000000000041",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An electric vehicle follows the trajectory\n\n$$\n\\vec r(t)=t^2\\hat i+3t\\hat j\n$$\n**Compute velocity and acceleration at $t=2$. Analyze whether the motion is uniformly accelerated and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q41",
    "order_index": 41
  },
  {
    "id": "e1000000-0000-0000-0000-000000000042",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A pipe flow system is modeled by\n\n$$\n\\vec F=yz\\hat i+xz\\hat j+xy\\hat k\n$$\n**Compute divergence and analyze whether the system satisfies incompressibility.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q42",
    "order_index": 42
  },
  {
    "id": "e1000000-0000-0000-0000-000000000043",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A drone path is\n\n$$\n\\vec r(t)=t^3\\hat i+2t^2\\hat j+t\\hat k\n$$\n**Compute velocity, acceleration, and evaluate tangential component at $t=1$.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q43",
    "order_index": 43
  },
  {
    "id": "e1000000-0000-0000-0000-000000000044",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electromagnetic field, the vector field is\n\n$$\n\\vec F=2x\\hat i+3y\\hat j\n$$\n**Compute divergence and evaluate whether the field conserves flux. Interpret physically.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q44",
    "order_index": 44
  },
  {
    "id": "e1000000-0000-0000-0000-000000000045",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electrostatic field, potential\n\n$$\nV(x,y,z)=xyz\n$$\n**Compute gradient and evaluate directional derivative at ($1,1,1$) along $\\hat i+\\hat j+\\hat k$. Interpret physical meaning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q45",
    "order_index": 45
  },
  {
    "id": "e1000000-0000-0000-0000-000000000046",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid mixing system, velocity field is\n\n$$\n\\vec F=y\\hat i-x\\hat j\n$$\n**Compute curl and analyze whether the flow is rotational. Interpret its impact on mixing efficiency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q46",
    "order_index": 46
  },
  {
    "id": "e1000000-0000-0000-0000-000000000047",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electric vehicle battery system, temperature distribution is modeled by\n\n$$\nT(x,y,z)=x^2+y^2+z^2\n$$\n**Compute the gradient and evaluate the direction of maximum temperature rise at point ($1,1,1$). Interpret its physical significance for thermal management and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q47",
    "order_index": 47
  },
  {
    "id": "e1000000-0000-0000-0000-000000000048",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electromagnetic system, field\n\n$$\n\\vec F=2x\\hat i+3y\\hat j+4z\\hat k\n$$\n**Compute curl and evaluate whether the field is conservative. Justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-I Q48",
    "order_index": 48
  },
  {
    "id": "e1000000-0000-0000-0000-000000000049",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A robot follows path $r$t$=t\\hat{i}+t^2\\hat{j}$.\n\n**Determine velocity vector and interpret motion.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q1",
    "order_index": 49
  },
  {
    "id": "e1000000-0000-0000-0000-000000000050",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "**Differentiate scalar and vector line integrals.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q2",
    "order_index": 50
  },
  {
    "id": "e1000000-0000-0000-0000-000000000051",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a heat flow system,\n\n$$\n\\vec F=(x+y)\\hat i+(x-y)\\hat j\n$$\n**Analyze the integrand in Green's theorem.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q3",
    "order_index": 51
  },
  {
    "id": "e1000000-0000-0000-0000-000000000052",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a circulation model, what does a positive value of\n\n$$\n\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\n$$\nindicate?",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q4",
    "order_index": 52
  },
  {
    "id": "e1000000-0000-0000-0000-000000000053",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A force field acts on a particle moving along a curve.\n\n**Analyze and interpret the physical meaning of the line integral.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q5",
    "order_index": 53
  },
  {
    "id": "e1000000-0000-0000-0000-000000000054",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "**Define path independence in engineering systems.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q6",
    "order_index": 54
  },
  {
    "id": "e1000000-0000-0000-0000-000000000055",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid flow model,\n\n$$\n\\vec F=y\\hat i+x\\hat j\n$$\n**Use Green's theorem to compute**\n\n$$\n\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\n$$\n**and interpret its meaning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q7",
    "order_index": 55
  },
  {
    "id": "e1000000-0000-0000-0000-000000000056",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid flow system,\n\n$$\n\\vec F=(x+y)\\hat i+(2x-y)\\hat j\n$$\n**Compute**\n\n$$\n\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q8",
    "order_index": 56
  },
  {
    "id": "e1000000-0000-0000-0000-000000000057",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Evaluate\n\n$$\n\\iint_S \\vec F\\cdot \\hat n , ds\n$$\nfor the heat flux field\n\n$$\n\\vec F=x^2\\hat i+yz\\hat j+z^2\\hat k\n$$\nwhere $\\hat n=\\hat j$ and the surface is\n\n$$\ny=1,\\quad 0\\le x\\le2,\\quad 0\\le z\\le1.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q9",
    "order_index": 57
  },
  {
    "id": "e1000000-0000-0000-0000-000000000058",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electromagnetic field, the vector field is\n\n$$\n\\vec F=z\\hat i+x\\hat j+y\\hat k.\n$$\n**Determine the circulation around the boundary of the region in the yz-plane $$x=0$$ bounded by $0\\le y\\le1,;0\\le z\\le1$ using Stokes' theorem.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q10",
    "order_index": 58
  },
  {
    "id": "e1000000-0000-0000-0000-000000000059",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Evaluate\n\n$$\n\\iint_S \\vec F\\cdot \\hat n , ds\n$$\nfor the fluid velocity field\n\n$$\n\\vec F=2xy\\hat i+yz\\hat j+xz\\hat k\n$$\nwhere $\\hat n=\\hat i$ and the surface is\n\n$$\nx=2,\\quad 0\\le y\\le1,\\quad 0\\le z\\le2.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q11",
    "order_index": 59
  },
  {
    "id": "e1000000-0000-0000-0000-000000000060",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a heat transfer system, the flux field is\n\n$$\n\\vec F=xy\\hat i+yz\\hat j+xz\\hat k.\n$$\n**Compute the circulation of heat flow around the boundary of the region in the xz-plane $$y=0$$ bounded by**\n\n$$\n0\\le x\\le1,\\quad 0\\le z\\le1\n$$\n**using Stokes' theorem.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q12",
    "order_index": 60
  },
  {
    "id": "e1000000-0000-0000-0000-000000000061",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electrical field,\n\n$$\n\\vec F=(y)\\hat i+(x)\\hat j.\n$$\n**Use a line integral to determine the work done along the boundary of the square defined by**\n\n$$\n0\\le x\\le1,\\quad 0\\le y\\le1.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q13",
    "order_index": 61
  },
  {
    "id": "e1000000-0000-0000-0000-000000000062",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Evaluate and interpret the total outward heat flux using divergence theorem for\n\n$$\n\\vec F=(x^2-yz)\\hat i+(y^2-xz)\\hat j+(z^2-xy)\\hat k\n$$\nover a rectangular domain\n\n$$\n0\\le x\\le a,\\quad 0\\le y\\le b,\\quad 0\\le z\\le c.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q14",
    "order_index": 62
  },
  {
    "id": "e1000000-0000-0000-0000-000000000063",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid transport system, the velocity field is\n\n$$\n\\vec F=(2x)\\hat i+(y)\\hat j+(z)\\hat k.\n$$\n**Use a surface integral to compute the total flux through the surface**\n\n$$\nx=1\n$$\nbounded by\n\n$$\n0\\le y\\le2,\\quad 0\\le z\\le1.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q15",
    "order_index": 63
  },
  {
    "id": "e1000000-0000-0000-0000-000000000064",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "Evaluate and interpret the total outward heat flux using divergence theorem for\n\n$$\n\\vec F=4xz\\hat i-y^2\\hat j+yz\\hat k\n$$\nover a unit cubic control volume\n\n$$\n0\\le x,y,z\\le1.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q16",
    "order_index": 64
  },
  {
    "id": "e1000000-0000-0000-0000-000000000065",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A control response is modeled by\n\n$$\nf(z)=z^2.\n$$\n**Analyze whether the function is differentiable at**\n\n$$\nz=1+i.\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q17",
    "order_index": 65
  },
  {
    "id": "e1000000-0000-0000-0000-000000000066",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A signal transformation is defined by\n\n$$\nw=z^2.\n$$\n**Identify whether the function is single-valued or multi-valued and justify.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q18",
    "order_index": 66
  },
  {
    "id": "e1000000-0000-0000-0000-000000000067",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid transport system, the stream function is given by\n\n$$\nv(x,y)=2xy.\n$$\n**Determine the harmonic conjugate using the Milne–Thomson method.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q19",
    "order_index": 67
  },
  {
    "id": "e1000000-0000-0000-0000-000000000068",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electrical field application, the real part of an analytic function is\n\n$$\nu(x,y)=x^2+2xy.\n$$\n**Find $f'$z$$ using Milne–Thomson method.**\n\nHint:\n\n$$\nf'(z)=u_x(z,0)-iu_y(z,0)\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q20",
    "order_index": 68
  },
  {
    "id": "e1000000-0000-0000-0000-000000000069",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A communication signal is represented by a complex function $f$z$$.\n\n**Evaluate the relationship between differentiability and continuity in complex systems.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q21",
    "order_index": 69
  },
  {
    "id": "e1000000-0000-0000-0000-000000000070",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An impedance transformation is represented by\n\n$$\nw=\\sqrt z.\n$$\n**Analyze whether the function is single-valued or multi-valued.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q22",
    "order_index": 70
  },
  {
    "id": "e1000000-0000-0000-0000-000000000071",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An electric field potential is represented by\n\n$$\nu(x,y)=e^x\\cos y.\n$$\n**Construct the analytic function using the Milne–Thomson method.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q23",
    "order_index": 71
  },
  {
    "id": "e1000000-0000-0000-0000-000000000072",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a fluid flow model, the imaginary part of an analytic function is\n\n$$\nv(x,y)=x^2-y^2.\n$$\nUsing Milne–Thomson method,\n\n**find $f'$z$$.**\n\nHint:\n\n$$\nf'(z)=v_y(z,0)+iv_x(z,0)\n$$",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q24",
    "order_index": 72
  },
  {
    "id": "e1000000-0000-0000-0000-000000000073",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A communication signal is modeled by\n\n$$\nf(z)=e^z.\n$$\n**Analyze whether the function is analytic and interpret its significance in signal amplification.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q25",
    "order_index": 73
  },
  {
    "id": "e1000000-0000-0000-0000-000000000074",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A signal transformation system uses the mapping\n\n$$\nw=(1+i)z.\n$$\n**Determine the image of the region $y>2$ in the w-plane and analyze the transformation characteristics.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q26",
    "order_index": 74
  },
  {
    "id": "e1000000-0000-0000-0000-000000000075",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a thermal distribution model, the temperature potential is represented by\n\n$$\nf(z)=(x^2-y^2+2x)+i(2xy+2y).\n$$\n**Verify whether the function is analytic using the Cauchy–Riemann equations and interpret the physical meaning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q27",
    "order_index": 75
  },
  {
    "id": "e1000000-0000-0000-0000-000000000076",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "An electrostatic field boundary represented by\n\n$$\n|z|=2\n$$\nis transformed under\n\n$$\nw=z+1+4i.\n$$\n**Determine the image of the boundary and interpret the transformation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q28",
    "order_index": 76
  },
  {
    "id": "e1000000-0000-0000-0000-000000000077",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In an electrical field system, the imaginary part is\n\n$$\nv(x,y)=2xy.\n$$\n**Construct the analytic function $f$z$$.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q29",
    "order_index": 77
  },
  {
    "id": "e1000000-0000-0000-0000-000000000078",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A control transformation maps the points\n\n$$\nz_1=1,\\quad z_2=i,\\quad z_3=-1\n$$\nonto\n\n$$\nw_1=0,\\quad w_2=1,\\quad w_3=-1.\n$$\n**Determine the bilinear transformation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q30",
    "order_index": 78
  },
  {
    "id": "e1000000-0000-0000-0000-000000000079",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "In a heat transfer application, determine whether\n\n$$\nu(x,y)=x^2-y^2\n$$\nis harmonic and construct its harmonic conjugate.",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q31",
    "order_index": 79
  },
  {
    "id": "e1000000-0000-0000-0000-000000000080",
    "subject_id": "a1000000-0000-0000-0000-000000000001",
    "question": "A signal transformation system maps the points\n\n$$\nz_1=0,\\quad z_2=i,\\quad z_3=-i\n$$\nonto\n\n$$\nw_1=1,\\quad w_2=-1,\\quad w_3=0.\n$$\n**Determine the bilinear transformation and interpret the engineering significance.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22MA201 - Engineering Mathematics II",
    "notes": "Module Test-II Q32",
    "order_index": 80
  },
  {
    "id": "c2000000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A basic physics program calculates positions of objects in different frames but fails when objects move close to light speed. The program must be updated to correctly transform coordinates between frames.\n\n**Construct the logical steps required to update the transformation process for high-speed conditions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q1",
    "order_index": 49
  },
  {
    "id": "c2000000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A simulation tool must choose between using simple classical equations or more complex relativistic equations when modeling motion. The system is limited in processing power.\n\n**Analyze the trade-off and determine when relativistic equations should be used.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q2",
    "order_index": 50
  },
  {
    "id": "c2000000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineering team evaluates two models for predicting particle energy: one uses invariant mass while another uses relativistic mass. The system must scale for extremely high velocities. Computational efficiency is critical. The invariant mass model simplifies equations but requires additional transformations. The relativistic mass model directly incorporates velocity but increases complexity. The team must choose the optimal model.\n\n**Assess the trade-offs between invariant mass and relativistic mass approaches and determine which model is more efficient for high-velocity scalability.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q3",
    "order_index": 51
  },
  {
    "id": "c2000000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A nuclear scientist evaluates energy released during a nuclear reaction. The measured mass before and after reaction differs slightly. The system records significant energy output. The scientist must interpret the relationship between mass loss and energy produced. The assessment must align with modern physics principles.\n\n**Interpret the observed mass difference and justify its relation to energy release using appropriate physical reasoning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q4",
    "order_index": 52
  },
  {
    "id": "c2000000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A classroom demonstration shows two lightning strikes occurring at equal distances from a stationary observer but appearing at different times to a moving observer. Students must interpret how motion affects the perception of simultaneity.\n\n**Integrate the concept of spacetime with observer motion to infer why simultaneity differs between observers.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q5",
    "order_index": 53
  },
  {
    "id": "c2000000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineering instructor evaluates whether introductory physics courses should include topics beyond Newtonian mechanics when discussing fast-moving systems like satellites.\n\n**Assess the need for including relativistic concepts and recommend a teaching approach.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q6",
    "order_index": 54
  },
  {
    "id": "c2000000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A student calculates kinetic energy of a fast-moving particle using classical formula and obtains a lower value than expected. The particle is moving near light speed. Experimental instruments indicate significantly higher energy. The student suspects an error in calculation. The system parameters are correct. The discrepancy persists across multiple trials.\n\n**Analyze the calculation approach and infer the source of error by evaluating the applicability of classical and relativistic energy relations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q7",
    "order_index": 55
  },
  {
    "id": "c2000000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A simulation program calculates total energy of a particle by combining rest mass and velocity inputs. The program must follow a logical sequence to ensure correct output. Inputs include rest mass and velocity close to light speed. The system must compute relativistic energy. The output should reflect total energy accurately.\n\n**Formulate the logical sequence required to compute total relativistic energy from given inputs.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q8",
    "order_index": 56
  },
  {
    "id": "c2000000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "Two observers are analyzing lightning strikes occurring at two distant points along a railway track. One observer is standing on the platform, while the other is moving at high speed on a train passing through the station. Both observers attempt to determine whether the two lightning strikes occurred simultaneously, but their observations differ due to their relative motion and signal reception.\n\n**Analyze how differing frames of reference influence the determination of simultaneity and integrate this reasoning to infer whether simultaneity is an absolute or relative concept under relativistic conditions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q9",
    "order_index": 57
  },
  {
    "id": "c2000000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research team is attempting to design an experiment to observe wave behavior in microscopic particles using an electron beam setup. They initially tried using classical particle assumptions but failed to detect any interference patterns. The team now considers incorporating wave-based principles into their design. They must determine whether treating particles as waves will improve experimental success and how momentum influences the design parameters.\n\n**Determine the design modifications required to successfully observe wave behavior in particles and justify how the de-Broglie hypothesis guides these decisions in the experimental setup.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q10",
    "order_index": 58
  },
  {
    "id": "c2000000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A spacecraft carries a light clock where a photon bounces vertically between two mirrors. The spacecraft moves at a significant fraction of the speed of light relative to an external observer who sees the light follow a diagonal path instead of a vertical one.\n\n**Formulate the mathematical relationship between proper time and dilated time using the observed light path and determine how velocity influences time measurement.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q11",
    "order_index": 59
  },
  {
    "id": "c2000000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A physics student compares the behavior of a moving tennis ball and an electron traveling at similar speeds. While both have momentum, only the electron shows diffraction in experiments. The student attempts to link classical and quantum descriptions using theoretical models and known constants.\n\n**Integrate the concepts of wavelength, momentum, and observability to reconcile why only microscopic particles exhibit wave characteristics in practical scenarios.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q12",
    "order_index": 60
  },
  {
    "id": "c2000000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A spacecraft moves at a significant fraction of light speed relative to an observer on Earth, carrying a rigid rod aligned along its direction of motion. The astronaut measures the rod's length at rest inside the spacecraft, while the Earth observer measures it as the spacecraft passes by. The relative velocity is known and relativistic effects are expected to be noticeable.\n\n**Determine how the observed length differs between the two frames and formulate the relationship connecting proper length and contracted length using relativistic principles, while justifying the dependence on velocity.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q13",
    "order_index": 61
  },
  {
    "id": "c2000000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A physicist is analyzing electrons accelerated through a known potential difference and wants to determine their associated wavelength for experimental validation. The momentum of electrons is inferred using kinetic energy relations. The physicist uses fundamental constants and seeks a relationship connecting measurable quantities.\n\n**Formulate and derive the mathematical expression connecting wavelength and momentum for the electron system and infer how measurable quantities can be substituted into the relation.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q14",
    "order_index": 62
  },
  {
    "id": "c2000000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research team is designing an experiment to measure relativistic effects using fast-moving particles in a linear accelerator. They must decide how to orient measurement instruments relative to particle motion. Instruments can be aligned either parallel or perpendicular to motion. The design must ensure that relativistic contraction is detectable and not masked by experimental noise.\n\n**Recommend an optimal experimental configuration to detect length contraction and justify the orientation choice using relativistic reasoning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q15",
    "order_index": 63
  },
  {
    "id": "c2000000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A research team is evaluating why classical particle theory fails when applied to electrons moving inside a crystal lattice under controlled laboratory conditions. They observe diffraction-like patterns even when particles are fired individually. The team compares predictions from classical mechanics and experimental outcomes.\n\n**Determine and justify the most appropriate theoretical framework the research team should adopt by analyzing inconsistencies between classical predictions and observed electron behavior, and recommend how this shift resolves the experimental contradictions.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q16",
    "order_index": 64
  },
  {
    "id": "c2000000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A student incorrectly concludes that all solids conduct electricity because they contain electrons. Upon further observation, it is noted that some solids do not allow electron movement despite having many electrons. The instructor asks the student to reconcile the role of energy levels and accessibility of states.\n\n**Analyze the reasoning flaw and infer why electron presence alone does not guarantee electrical conduction in solids.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q17",
    "order_index": 65
  },
  {
    "id": "c2000000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An industry evaluator assesses whether a newly synthesized material can be classified as a semiconductor based on its electronic structure observations. The material shows partial occupancy in lower energy levels and requires small energy input for electron excitation.\n\n**Formulate a justified classification of the material based on its band structure characteristics.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q18",
    "order_index": 66
  },
  {
    "id": "c2000000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A fabricated semiconductor device unexpectedly shows higher conductivity than expected under equilibrium conditions. The engineer suspects unintended impurity incorporation during manufacturing. Measurements indicate imbalance between electron and hole concentration. The device was originally designed to behave as an intrinsic material.\n\n**Analyze the scenario and infer the likely cause of increased conductivity by evaluating carrier imbalance and impurity effects.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q19",
    "order_index": 67
  },
  {
    "id": "c2000000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A semiconductor designer evaluates whether increasing dopant concentration improves device performance but notices that excessive doping may introduce unwanted effects. The system requires efficient conductivity without degrading material properties.\n\n**Assess the trade-off involved in increasing dopant concentration and determine its impact on semiconductor efficiency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q20",
    "order_index": 68
  },
  {
    "id": "c2000000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A physicist models the distribution of electronic states in a solid using a function that varies with energy. It is observed that the number of available states increases in certain energy ranges while remaining zero in others.\n\n**Interpret how the density of states function influences electron occupancy and infer its role in determining material properties.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q21",
    "order_index": 69
  },
  {
    "id": "c2000000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A teaching assistant explains the stepwise formation of energy bands starting from isolated atoms to a fully formed crystal lattice. The explanation includes orbital overlap, splitting of levels, and formation of continuous bands.\n\n**Infer the logical sequence of steps leading to energy band formation in solids.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q22",
    "order_index": 70
  },
  {
    "id": "c2000000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A student is tasked with determining carrier concentration in a semiconductor under equilibrium conditions using known relationships between electrons and holes. The system maintains thermal equilibrium with no external excitation.\n\n**Formulate the logical steps required to determine electron and hole concentrations at equilibrium and infer their interdependence.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q23",
    "order_index": 71
  },
  {
    "id": "c2000000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineer compares n-type and p-type semiconductors for use in a circuit requiring majority carriers to dominate conduction. The system must maintain predictable current flow direction and magnitude.\n\n**Evaluate and determine how the choice between n-type and p-type materials influences current conduction behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q24",
    "order_index": 72
  },
  {
    "id": "c2000000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineer must select a theoretical model to predict electrical behavior of a new crystalline material with moderate electron mobility. Experimental data shows partial localization and slight deviations from free electron predictions.\n\n**Recommend an appropriate theoretical framework for analyzing the material and justify the selection based on electron behavior and band formation characteristics.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q25",
    "order_index": 73
  },
  {
    "id": "c2000000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "An engineering team is designing a light-emitting device for high-speed optical communication systems. They must select a semiconductor material that maximizes light emission efficiency while minimizing energy loss. The team is comparing two materials: one with a direct band gap and another with an indirect band gap.\n\n**Determine and justify which semiconductor type should be selected for the device by analyzing transition mechanisms, recombination efficiency, and momentum considerations.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q26",
    "order_index": 74
  },
  {
    "id": "c2000000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A solid material is analyzed using both tight-binding and nearly free electron approaches to understand electron motion. In one case electrons are strongly localized around atoms, while in the other they move almost freely through the lattice.\n\n**Integrate the principles of tight-binding and nearly free electron models to infer how band formation differs and justify which model better explains localized versus delocalized electron behavior.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q27",
    "order_index": 75
  },
  {
    "id": "c2000000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A researcher studies transition rates in two semiconductors under identical excitation conditions. In one material, electron transitions occur directly between conduction and valence bands, while in the other, transitions require phonon interaction.\n\n**Formulate and analyze the relationship between transition mechanism and emission probability to infer which material exhibits higher radiative efficiency.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q28",
    "order_index": 76
  },
  {
    "id": "c2000000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A device initially designed with a narrow band gap semiconductor begins to malfunction at elevated temperatures. The conductivity increases uncontrollably, leading to leakage currents. The Fermi level appears to shift due to temperature influence.\n\n**Analyze the root cause of the malfunction by interpreting energy band behavior and infer how temperature affects carrier distribution and Fermi level positioning.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q29",
    "order_index": 77
  },
  {
    "id": "c2000000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A semiconductor sample is doped lightly with donor atoms, resulting in an electron concentration of (10^{16},\\text{cm}^{-3}) while hole concentration is negligible. The mobility of electrons is measured as (1400,\\text{cm}^2/\\text{V·s}).\n\n**Determine the electrical conductivity of the semiconductor by formulating the appropriate relation and integrating the given parameters while justifying the dominance of the contributing charge carriers.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q30",
    "order_index": 78
  },
  {
    "id": "c2000000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A materials engineer is selecting materials for three components in an electronic system: a wire for current flow, a switching element, and an insulating cover. The engineer evaluates band gap values and electron mobility characteristics.\n\n**Determine and justify the appropriate classification of materials for each component by analyzing their energy band structures and recommend suitable choices based on operational requirements.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q31",
    "order_index": 79
  },
  {
    "id": "c2000000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000002",
    "question": "A semiconductor device shows reduced conductivity at low temperatures despite being doped with acceptor impurities. Experimental observation reveals limited carrier movement and increased resistivity.\n\n**Analyze the underlying cause for reduced conductivity by interpreting the temperature dependence and infer the dominant limiting mechanism affecting carrier transport.**",
    "answer": "Answer not provided in source text.",
    "image_url": null,
    "references": "22PH202 - Electromagnetism and Modern Physics",
    "notes": "Module Test-II Q32",
    "order_index": 80
  },
  {
    "id": "faca0000-0000-0000-0000-000000000001",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who is Paruthi Pendir?",
    "answer": "Paruthi Pendir were women engaged in cotton processing and spinning during the Sangam age. They played an important role in the textile industry.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 1
  },
  {
    "id": "faca0000-0000-0000-0000-000000000002",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is \"Paa\" or \"Paavottuthal\"?",
    "answer": "Paavottuthal is the process of arranging warp threads before weaving. It is an important preparatory stage in textile production.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 2
  },
  {
    "id": "faca0000-0000-0000-0000-000000000003",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the types of weaving?",
    "answer": "The main types of weaving are:\n```mermaid\nmindmap\n  root((Weaving))\n    Plain weaving\n    Twill weaving\n    Satin weaving\n```",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 3
  },
  {
    "id": "faca0000-0000-0000-0000-000000000004",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write the names of any two parts of a loom.",
    "answer": "Any two parts of a loom are:\n\nShuttle\nReed",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 4
  },
  {
    "id": "faca0000-0000-0000-0000-000000000005",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How were the woven garments sold during the Sangam period?",
    "answer": "Garments were sold in local markets and exported through ports to foreign countries.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 5
  },
  {
    "id": "faca0000-0000-0000-0000-000000000006",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Where were dye vats discovered?",
    "answer": "Dye vats were discovered at Arikamedu near Puducherry.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 6
  },
  {
    "id": "faca0000-0000-0000-0000-000000000007",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which type of pottery was popular in Madurai?",
    "answer": "Glossy black pottery was popular in Madurai.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 7
  },
  {
    "id": "faca0000-0000-0000-0000-000000000008",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is the specialty of Velloor Karigiri pottery?",
    "answer": "Velloor Karigiri pottery is famous for its fine finish, durability and artistic beauty.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 8
  },
  {
    "id": "faca0000-0000-0000-0000-000000000009",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the two divisions of pottery?",
    "answer": "The two divisions are:\n\nGlossy pottery\nUnglossed pottery",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 9
  },
  {
    "id": "faca0000-0000-0000-0000-000000000010",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is meant by craft work on pottery?",
    "answer": "Decorative artistic designs made on pottery are called pottery craft work.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 10
  },
  {
    "id": "faca0000-0000-0000-0000-000000000011",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the uses of pottery in educational art?",
    "answer": "Pottery is used for:\n\nTeaching art and creativity\nDeveloping practical skills\nCraft training",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 11
  },
  {
    "id": "faca0000-0000-0000-0000-000000000012",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the uses of pottery in medical science?",
    "answer": "Pottery is used to prepare medical containers, storage vessels and laboratory equipment.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 12
  },
  {
    "id": "faca0000-0000-0000-0000-000000000013",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What materials are found in black and red ware?",
    "answer": "Black and red ware contains:\n\nBowls\nPots\nPlates\nStorage vessels",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 13
  },
  {
    "id": "faca0000-0000-0000-0000-000000000014",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What symbols are found on pottery?",
    "answer": "Common symbols include:\n\nSwastika\nSun\nMoon\nFish\nGeometric marks",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 14
  },
  {
    "id": "faca0000-0000-0000-0000-000000000015",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "In which part of Tamil Nadu were pots with the Swastika symbol found?",
    "answer": "Such pottery was found at Kodumanal and Keeladi excavation sites.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 15
  },
  {
    "id": "faca0000-0000-0000-0000-000000000016",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "During which period did people use symbols to express their thoughts?",
    "answer": "People used symbols during the Prehistoric Period before the development of writing.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 2-Mark",
    "order_index": 16
  },
  {
    "id": "faca0000-0000-0000-0000-000000000017",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How was the weaving industry during the Sangam period? Explain the various stages involved in making clothing.",
    "answer": "The weaving industry was one of the most important occupations during the Sangam age. Tamil weavers produced fine cotton and silk fabrics that were famous throughout India and abroad.\n\nStages of Cloth Production:\nCollection of cotton.\nCleaning and separating fibers.\nSpinning fibers into thread.\nDyeing the yarn.\nPreparing warp and weft threads.\nWeaving on looms.\nFinishing and polishing cloth.\nMarketing and export.\nImportance:\nProvided employment.\nSupported foreign trade.\nEnhanced economic prosperity.\nDemonstrated advanced technological skills.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 16-Mark",
    "order_index": 17
  },
  {
    "id": "faca0000-0000-0000-0000-000000000018",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are glossy and unpolished pottery? Explain the process of making pottery.",
    "answer": "Glossy Pottery\n\nPottery with a smooth polished surface.\n\nUnpolished Pottery\n\nPottery without polishing and having a rough surface.\n\nPottery-Making Process:\nCollection of clay.\nCleaning impurities.\nMixing clay with water.\nShaping on potter's wheel.\nDrying.\nDecorating.\nFiring in kiln.\nPolishing if required.\nImportance:\n\nPottery was used for storage, cooking, trade and rituals.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 16-Mark",
    "order_index": 18
  },
  {
    "id": "faca0000-0000-0000-0000-000000000019",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain in detail about Black and Red Ware.",
    "answer": "Black and Red Ware is one of the most important archaeological findings in South India.\n\nCharacteristics:\nInterior black color.\nExterior red color.\nStrong and durable.\nMade using controlled firing techniques.\nUses:\nCooking\nStorage\nReligious activities\nTrade\nSignificance:\nIndicates advanced ceramic technology.\nHelps archaeologists determine historical periods.\nFound in many Sangam-age sites.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 16-Mark",
    "order_index": 19
  },
  {
    "id": "faca0000-0000-0000-0000-000000000020",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write in detail about the incised marks and symbols engraved on ancient Indian pottery.",
    "answer": "Ancient pottery contains many symbols and incised marks.\n\nCommon Symbols:\n```mermaid\nmindmap\n  root((Ancient Symbols))\n    Nature\n      Sun\n      Moon\n      Star\n    Animals\n      Fish\n    Patterns\n      Swastika\n      Geometric\n```\nPurpose:\nIdentification of owners.\nIndication of clans.\nTrade marks.\nReligious beliefs.\nHistorical Importance:\n\nThese symbols help researchers understand ancient culture, language and social organization.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 16-Mark",
    "order_index": 20
  },
  {
    "id": "faca0000-0000-0000-0000-000000000021",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the efforts taken to preserve ancient weaving and pottery technologies.",
    "answer": "Ancient weaving and pottery technologies are important cultural heritages.\n\nPreservation Efforts:\nArchaeological excavations.\nMuseum conservation.\nGovernment support schemes.\nTraining centers for artisans.\nHandloom development programs.\nDocumentation and research.\nCultural exhibitions.\nEducational awareness programs.\nConclusion:\n\nPreserving these technologies helps protect Tamil heritage and traditional craftsmanship for future generations.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 1 - 16-Mark",
    "order_index": 21
  },
  {
    "id": "faca0000-0000-0000-0000-000000000022",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is Architecture?",
    "answer": "Architecture is the art and science of designing and constructing buildings, monuments, temples, and other structures.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 22
  },
  {
    "id": "faca0000-0000-0000-0000-000000000023",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Name some construction materials used during the Sangam period.",
    "answer": "Stone\nBrick\nWood\nClay\nLime mortar",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 23
  },
  {
    "id": "faca0000-0000-0000-0000-000000000024",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which script is predominantly found on hero stones discovered in Tamil Nadu?",
    "answer": "Most hero stones contain inscriptions written in Tamil-Brahmi and later Vatteluttu scripts.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 24
  },
  {
    "id": "faca0000-0000-0000-0000-000000000025",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are moats?",
    "answer": "Moats are deep trenches filled with water surrounding forts and palaces for protection from enemies.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 25
  },
  {
    "id": "faca0000-0000-0000-0000-000000000026",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the types of temples built in India?",
    "answer": "Dravidian Style\nNagara Style\nVesara Style",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 26
  },
  {
    "id": "faca0000-0000-0000-0000-000000000027",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which is considered the tallest temple gopuram in Tamil Nadu?",
    "answer": "The Rajagopuram of Srirangam Ranganathaswamy Temple is considered the tallest temple gopuram in Tamil Nadu.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 27
  },
  {
    "id": "faca0000-0000-0000-0000-000000000028",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the six stages of hero stones mentioned by Tholkappiyar?",
    "answer": "Katchi\nKalkol\nNeerppadai\nNaduthal\nPerumpadai\nVaazhththal",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 28
  },
  {
    "id": "faca0000-0000-0000-0000-000000000029",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Name some grand temples built by the Cholas.",
    "answer": "Brihadeeswarar Temple, Thanjavur\nGangaikonda Cholapuram Temple\nAiravatesvara Temple",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 29
  },
  {
    "id": "faca0000-0000-0000-0000-000000000030",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a brief note on Thirumalai Nayakkar Palace.",
    "answer": "It was built by King Thirumalai Nayak in Madurai in the 17th century and is famous for its large pillars and Indo-Dravidian architecture.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 30
  },
  {
    "id": "faca0000-0000-0000-0000-000000000031",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who built the Shore Temple at Mahabalipuram?",
    "answer": "The Shore Temple was built by Narasimhavarman II (Rajasimha Pallava).",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 31
  },
  {
    "id": "faca0000-0000-0000-0000-000000000032",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the other names of Mahabalipuram?",
    "answer": "Mamallapuram\nMahabalipuram",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 32
  },
  {
    "id": "faca0000-0000-0000-0000-000000000033",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is the Pancha Pandava Rathas?",
    "answer": "They are five monolithic rock-cut temples built during the Pallava period at Mahabalipuram.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 33
  },
  {
    "id": "faca0000-0000-0000-0000-000000000034",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is a rock-cut cave temple?",
    "answer": "A temple carved directly into a rock hill or mountain is called a rock-cut cave temple.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 34
  },
  {
    "id": "faca0000-0000-0000-0000-000000000035",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who built the Aayiram Kaal Mandapam in Madurai Meenakshi Temple?",
    "answer": "It was built by Ariyanatha Mudaliyar, the minister of the Madurai Nayak rulers.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 35
  },
  {
    "id": "faca0000-0000-0000-0000-000000000036",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a short note on Indo-Saracenic Architecture.",
    "answer": "Indo-Saracenic architecture combines Indian, Islamic, Mughal, Gothic, and European architectural styles. It became popular during British rule.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 2-Mark",
    "order_index": 36
  },
  {
    "id": "faca0000-0000-0000-0000-000000000037",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Architectural Styles of the Pallava Period.",
    "answer": "Introduction\n\nThe Pallavas ruled South India between the 4th and 9th centuries CE. They were pioneers in temple architecture and introduced many innovative construction techniques.\n\nEvolution of Pallava Architecture\n```mermaid\ngraph TD\n  RockcutCaves[\"Rock-cut Caves\"] --> MonolithicRathas[\"Monolithic Rathas\"]\n  MonolithicRathas[\"Monolithic Rathas\"] --> StructuralTemples[\"Structural Temples\"]\n```\nA. Rock-Cut Cave Temples\nIntroduced by Mahendravarman I.\nCarved directly into hills.\nPillars decorated with lion motifs.\nExample: Mandagapattu Cave Temple.\nB. Monolithic Rathas\nBuilt during Narasimhavarman I.\nEntire temples carved from a single rock.\nLocated at Mahabalipuram.\nFamous Pancha Rathas.\nC. Structural Temples\nBuilt using granite blocks.\nRepresent mature Pallava architecture.\nExample: Shore Temple.\nFeatures\nFeature\tDescription\nLion Pillars\tSymbol of Pallava power\nSculptures\tDetailed mythological carvings\nVimanas\tMulti-tier temple towers\nStone Construction\tDurable structures\nImportance\nFoundation of Dravidian architecture.\nInfluenced Chola and Vijayanagara architecture.\nUNESCO-recognized monuments.\nConclusion\n\nThe Pallavas transformed South Indian architecture from cave temples to magnificent stone temples.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 37
  },
  {
    "id": "faca0000-0000-0000-0000-000000000038",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Hero Stone Worship Tradition (Nadukkal Worship System).",
    "answer": "Introduction\n\nHero stones (Nadukkal) were memorial stones erected in honor of warriors who died in battle.\n\nSix Stages Mentioned in Tholkappiyam\n```mermaid\ngraph TD\n  Katchi[\"Katchi\"] --> Kalkol[\"Kalkol\"]\n  Kalkol[\"Kalkol\"] --> Neerppadai[\"Neerppadai\"]\n  Neerppadai[\"Neerppadai\"] --> Naduthal[\"Naduthal\"]\n  Naduthal[\"Naduthal\"] --> Perumpadai[\"Perumpadai\"]\n  Perumpadai[\"Perumpadai\"] --> Vaazhththal[\"Vaazhththal\"]\n```\nExplanation",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 38
  },
  {
    "id": "faca0000-0000-0000-0000-000000000039",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Discuss the Stage Construction Methods Mentioned in Silappadikaram.",
    "answer": "Introduction\n\nSilappadikaram provides valuable information about ancient Tamil theatre and stage construction.\n\nComponents of a Stage\n```mermaid\ngraph TD\n  StagePlatform[\"Stage Platform\"] --> Pillars[\"Pillars\"]\n  Pillars[\"Pillars\"] --> Decorations[\"Decorations\"]\n  Decorations[\"Decorations\"] --> Lighting[\"Lighting\"]\n  Lighting[\"Lighting\"] --> AudienceArea[\"Audience Area\"]\n```\nFeatures\nStage Design\nElevated platform.\nStrong wooden support.\nDecorations\nFloral arrangements.\nCloth curtains.\nLighting\nOil lamps used.\nStrategic placement for visibility.\nAcoustics\nDesigned for voice projection.\nAudience Arrangement\nSeparate seating based on status.\nImportance\nPromoted performing arts.\nReflected advanced engineering skills.\nSupported cultural development.\nConclusion\n\nAncient Tamils possessed sophisticated knowledge of theatre architecture.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 39
  },
  {
    "id": "faca0000-0000-0000-0000-000000000040",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Grand Temples and Other Worship Sites of the Chola Period.",
    "answer": "Introduction\n\nThe Cholas built some of the finest temples in Indian history.\n\nMajor Temples\nBrihadeeswarar Temple\nBuilt by Rajaraja Chola I.\nUNESCO World Heritage Site.\nMassive granite structure.\nGangaikonda Cholapuram\nBuilt by Rajendra Chola I.\nSymbol of imperial power.\nAiravatesvara Temple\nBuilt by Rajaraja II.\nKnown for artistic sculptures.\nTemple Layout\n```mermaid\ngraph TD\n  Gopuram[\"Gopuram\"] --> Mandapam[\"Mandapam\"]\n  Mandapam[\"Mandapam\"] --> Sanctum[\"Sanctum\"]\n  Sanctum[\"Sanctum\"] --> Prakaram[\"Prakaram\"]\n```\nFunctions of Temples\nReligious center.\nEducational center.\nCultural center.\nEconomic center.\nImportance\n\nThe temples demonstrate the engineering, artistic, and administrative excellence of the Cholas.\n\nConclusion\n\nChola temples remain masterpieces of world architecture.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 40
  },
  {
    "id": "faca0000-0000-0000-0000-000000000041",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Distinctive Features of Chettinad House Architecture.",
    "answer": "Introduction\n\nChettinad houses were built by the Nagarathar community and are famous for luxury and craftsmanship.\n\nLayout\n```mermaid\ngraph TD\n  Entrance[\"Entrance\"] --> ReceptionHall[\"Reception Hall\"]\n  ReceptionHall[\"Reception Hall\"] --> CentralCourtyard[\"Central Courtyard\"]\n  CentralCourtyard[\"Central Courtyard\"] --> LivingRooms[\"Living Rooms\"]\n  LivingRooms[\"Living Rooms\"] --> Kitchen[\"Kitchen\"]\n```\nFeatures\nSpacious Courtyards\nNatural ventilation.\nSunlight circulation.\nImported Materials\nBurmese teak.\nItalian marble.\nBelgian glass.\nArtistic Work\nWooden carvings.\nDecorative pillars.\nClimate Adaptation\nThick walls reduce heat.\nLarge windows improve airflow.\nImportance\nEnvironment-friendly design.\nSymbol of Tamil heritage.\nArchitectural excellence.\nConclusion\n\nChettinad houses represent a perfect blend of beauty, functionality, and sustainability.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 41
  },
  {
    "id": "faca0000-0000-0000-0000-000000000042",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Key Features of Indo-Saracenic Architecture During British Rule.",
    "answer": "Introduction\n\nIndo-Saracenic architecture emerged during British rule by combining Indian and European styles.\n\nArchitectural Fusion\n```mermaid\ngraph TD\n  Indian[\"Indian\"] --> IndoSaracenic[\"Indo-Saracenic\"]\n  Islamic[\"Islamic\"] --> IndoSaracenic[\"Indo-Saracenic\"]\n  Mughal[\"Mughal\"] --> IndoSaracenic[\"Indo-Saracenic\"]\n  Gothic[\"Gothic\"] --> IndoSaracenic[\"Indo-Saracenic\"]\n  European[\"European\"] --> IndoSaracenic[\"Indo-Saracenic\"]\n```\nFeatures\nLarge domes\nPointed arches\nMinarets\nDecorative balconies\nSymmetrical layouts\nFamous Examples\nMadras High Court\nChennai Central Railway Station\nMysore Palace\nSignificance\nCultural integration.\nUnique colonial architecture.\nHistorical landmarks.\nConclusion\n\nIndo-Saracenic architecture symbolizes the blending of Eastern and Western architectural traditions.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 42
  },
  {
    "id": "faca0000-0000-0000-0000-000000000043",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Shore Temple and Cave Temples of Mahabalipuram.",
    "answer": "Introduction\n\nMahabalipuram is a UNESCO World Heritage Site and a masterpiece of Pallava architecture.\n\nShore Temple\nBuilder\n\nNarasimhavarman II (Rajasimha)\n\nFeatures\nBuilt with granite.\nDedicated to Shiva and Vishnu.\nLocated on the Bay of Bengal coast.\nOne of the earliest structural temples.\nCave Temples\nExamples\nVaraha Cave\nMahishasuramardini Cave\nKrishna Cave\nFeatures\nRock-cut architecture.\nMythological sculptures.\nDecorative pillars.\nComparison\nShore Temple\tCave Temples\nStructural Temple\tRock-cut Temple\nGranite Blocks\tCarved from rock\nOpen Architecture\tExcavated Architecture\nImportance\nMajor Contributions of Mahabalipuram Monuments\n\n```mermaid\nxychart-beta\n    title \"Major Contributions\"\n    x-axis [\"Architecture\", \"Sculpture\", \"Tourism\", \"Heritage\"]\n    y-axis \"Importance\" 0 --> 120\n    bar [100, 90, 80, 110]\n```\nConclusion\n\nThe Shore Temple and Cave Temples showcase the highest achievements of Pallava engineering, sculpture, and temple architecture.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 2 - 16-Mark",
    "order_index": 43
  },
  {
    "id": "faca0000-0000-0000-0000-000000000044",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the other names for rafters (construction beams)?",
    "answer": "Rafters are also called:\n\nRoof beams\nWooden support beams\nStructural timbers",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 44
  },
  {
    "id": "faca0000-0000-0000-0000-000000000045",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How many types of boats are mentioned in Sangam literature?",
    "answer": "Sangam literature mentions several types of boats such as:\n\nKappal\nNavai\nThoni\nAmbi\nOdam",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 45
  },
  {
    "id": "faca0000-0000-0000-0000-000000000046",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a brief note about the Parathavar.",
    "answer": "The Parathavar were ancient Tamil maritime people engaged in fishing, pearl diving, and overseas trade.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 46
  },
  {
    "id": "faca0000-0000-0000-0000-000000000047",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is bipolar electric discharge?",
    "answer": "It is a discharge of electricity between two opposite poles, producing heat and light.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 47
  },
  {
    "id": "faca0000-0000-0000-0000-000000000048",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write about ancient smelting furnaces.",
    "answer": "Ancient smelting furnaces were used to extract metals from ores through heating and reduction processes.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 48
  },
  {
    "id": "faca0000-0000-0000-0000-000000000049",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How is iron mentioned in Sangam literature?",
    "answer": "Iron is mentioned as an important metal used for weapons, agricultural tools, and daily necessities.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 49
  },
  {
    "id": "faca0000-0000-0000-0000-000000000050",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a brief note about ancient coins.",
    "answer": "Ancient coins were used for trade and administration and often contained symbols of rulers and kingdoms.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 50
  },
  {
    "id": "faca0000-0000-0000-0000-000000000051",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "List the names of the nine gemstones (Navaratnas).",
    "answer": "Ruby\nPearl\nCoral\nEmerald\nYellow Sapphire\nDiamond\nBlue Sapphire\nHessonite\nCat's Eye",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 51
  },
  {
    "id": "faca0000-0000-0000-0000-000000000052",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who are the Kammiyar?",
    "answer": "Kammiyar were skilled metalworkers and blacksmiths who manufactured tools, weapons, and ornaments.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 52
  },
  {
    "id": "faca0000-0000-0000-0000-000000000053",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who are the Kuyinar?",
    "answer": "Kuyinar were artisans associated with pottery and ceramic production.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 53
  },
  {
    "id": "faca0000-0000-0000-0000-000000000054",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Name the different shapes of beads.",
    "answer": "Spherical\nCylindrical\nBarrel-shaped\nDisc-shaped\nOval",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 54
  },
  {
    "id": "faca0000-0000-0000-0000-000000000055",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a brief note about colored glass beads.",
    "answer": "Colored glass beads were decorative objects used in ornaments and trade and were produced using advanced manufacturing techniques.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 55
  },
  {
    "id": "faca0000-0000-0000-0000-000000000056",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How many shapes of beads are there? What are they?",
    "answer": "Common bead shapes include:\n\nRound\nOval\nCylindrical\nBarrel\nDisc",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 56
  },
  {
    "id": "faca0000-0000-0000-0000-000000000057",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which beads are mentioned in Silappathikaram?",
    "answer": "Silappathikaram mentions pearl beads, gemstone beads, coral beads, and gold beads.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 57
  },
  {
    "id": "faca0000-0000-0000-0000-000000000058",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What kinds of objects were made from beads?",
    "answer": "Beads were used to make:\n\nNecklaces\nBracelets\nEarrings\nDecorative ornaments",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 2-Mark",
    "order_index": 58
  },
  {
    "id": "faca0000-0000-0000-0000-000000000059",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Ancient Tamil Shipbuilding Technology",
    "answer": "Introduction\n\nAncient Tamils were among the greatest maritime traders of the Indian Ocean. Their shipbuilding technology enabled trade with Southeast Asia, Rome, Egypt, Sri Lanka, and Arabia.\n\nEvolution of Tamil Maritime Technology\n```mermaid\ngraph TD\n  FishingRafts[\"Fishing Rafts\"] --> WoodenBoats[\"Wooden Boats\"]\n  WoodenBoats[\"Wooden Boats\"] --> LargeTradingVessels[\"Large Trading Vessels\"]\n  LargeTradingVessels[\"Large Trading Vessels\"] --> OceangoingShips[\"Ocean-going Ships\"]\n```\nTypes of Ships\nType\tPurpose\nThoni\tRiver transport\nOdam\tCoastal trade\nNavai\tCargo transport\nKappal\tLong-distance trade\nAmbi\tFishing and transport\nShip Construction Process\n```mermaid\ngraph TD\n  SelectionofTimber[\"Selection of Timber\"] --> WoodCutting[\"Wood Cutting\"]\n  WoodCutting[\"Wood Cutting\"] --> HullConstruction[\"Hull Construction\"]\n  HullConstruction[\"Hull Construction\"] --> MastInstallation[\"Mast Installation\"]\n  MastInstallation[\"Mast Installation\"] --> SailAttachment[\"Sail Attachment\"]\n  SailAttachment[\"Sail Attachment\"] --> Waterproofing[\"Waterproofing\"]\n  Waterproofing[\"Waterproofing\"] --> SeaTesting[\"Sea Testing\"]\n```\nMaritime Trade Network\nAncient Tamil Maritime Connections\n\n```mermaid\nxychart-beta\n    title \"Maritime Connections\"\n    x-axis [\"Sri Lanka\", \"Rome\", \"Arabia\", \"Southeast Asia\", \"Egypt\"]\n    y-axis \"Trade Importance\" 0 --> 120\n    bar [60, 90, 80, 70, 50]\n```\nMajor Ports\nPoompuhar\nKorkai\nMusiri\nArikamedu\nSignificance\nEncouraged international trade\nIncreased wealth of Tamil kingdoms\nPromoted cultural exchange\nDemonstrated engineering excellence\nConclusion\n\nTamil shipbuilding technology was among the most advanced maritime technologies of the ancient world.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 16-Mark",
    "order_index": 59
  },
  {
    "id": "faca0000-0000-0000-0000-000000000060",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Metallurgical Skills of Ancient Tamils with Supporting Evidence",
    "answer": "Introduction\n\nAncient Tamils possessed remarkable knowledge of metallurgy, including iron extraction, steel production, copper working, and goldsmithing.\n\nMetallurgical Process\n```mermaid\ngraph TD\n  Mining[\"Mining\"] --> OreCollection[\"Ore Collection\"]\n  OreCollection[\"Ore Collection\"] --> Smelting[\"Smelting\"]\n  Smelting[\"Smelting\"] --> Purification[\"Purification\"]\n  Purification[\"Purification\"] --> Forging[\"Forging\"]\n  Forging[\"Forging\"] --> FinishedProducts[\"Finished Products\"]\n```\nMetals Used\nMetal\tUsage\nIron\tWeapons, tools\nCopper\tUtensils\nBronze\tStatues\nGold\tOrnaments\nSilver\tCoins\nEvidence\nArchaeological Evidence\nAdichanallur excavations\nKodumanal excavations\nKeeladi findings\nLiterary Evidence\nPurananuru\nAkananuru\nSilappathikaram\nFamous Achievement: Wootz Steel\n\nAncient Tamil blacksmiths produced Wootz Steel, one of the finest steels in the world.\n\nFeatures\nHigh carbon content\nExceptional strength\nExported internationally\nApplications\n```mermaid\ngraph TD\n  Agriculture[\"Agriculture\"] --> Ploughs[\"Ploughs\"]\n```\n```mermaid\ngraph TD\n  Weapons[\"Weapons\"] --> SwordsSpears[\"Swords & Spears\"]\n```\n```mermaid\ngraph TD\n  Trade[\"Trade\"] --> MetalGoods[\"Metal Goods\"]\n```\nConclusion\n\nThe metallurgical knowledge of ancient Tamils laid the foundation for advanced manufacturing and international trade.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 16-Mark",
    "order_index": 60
  },
  {
    "id": "faca0000-0000-0000-0000-000000000061",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a Note on Ancient Coins and Their Historical Significance",
    "answer": "Introduction\n\nCoins are valuable historical sources that reveal economic, political, and cultural developments.\n\nTypes of Ancient Coins\nTamil Kingdom Coins\nChola Coins\nChera Coins\nPandya Coins\nForeign Coins\nRoman Coins\nGreek Coins\nInformation Derived from Coins\n```mermaid\ngraph TD\n  Coins[\"Coins\"] --> Rulers[\"Rulers\"]\n  Rulers[\"Rulers\"] --> Economy[\"Economy\"]\n  Economy[\"Economy\"] --> Religion[\"Religion\"]\n  Religion[\"Religion\"] --> Trade[\"Trade\"]\n  Trade[\"Trade\"] --> Chronology[\"Chronology\"]\n```\nMaterials Used\nMaterial\tPurpose\nGold\tHigh-value trade\nSilver\tCommerce\nCopper\tDaily transactions\nBronze\tRegional circulation\nHistorical Importance\nEvidence of foreign trade\nHelps date historical events\nShows political authority\nReveals economic prosperity\nConclusion\n\nAncient coins serve as miniature historical documents preserving valuable information about civilization.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 16-Mark",
    "order_index": 61
  },
  {
    "id": "faca0000-0000-0000-0000-000000000062",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Shapes and Types of Beads with Archaeological Evidence",
    "answer": "Introduction\n\nBeads are among the earliest manufactured products of human civilization.\n\nManufacturing Process\n```mermaid\ngraph TD\n  RawMaterial[\"Raw Material\"] --> Cutting[\"Cutting\"]\n  Cutting[\"Cutting\"] --> Shaping[\"Shaping\"]\n  Shaping[\"Shaping\"] --> Drilling[\"Drilling\"]\n  Drilling[\"Drilling\"] --> Polishing[\"Polishing\"]\n  Polishing[\"Polishing\"] --> FinishedBead[\"Finished Bead\"]\n```\nTypes of Beads\nType\tMaterial\nGlass Beads\tGlass\nStone Beads\tAgate, Carnelian\nShell Beads\tShell\nMetal Beads\tGold, Copper\nPearl Beads\tPearls\nShapes\nRound\nOval\nBarrel\nCylindrical\nDisc\nTubular\nArchaeological Sites\nSite\tDiscovery\nArikamedu\tGlass beads\nKodumanal\tGemstone beads\nKeeladi\tOrnament beads\nAdichanallur\tDecorative beads\nUses\nJewellery\nTrade\nReligious activities\nSocial status symbols\nConclusion\n\nBeads provide important evidence of technological advancement and trade relations.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 16-Mark",
    "order_index": 62
  },
  {
    "id": "faca0000-0000-0000-0000-000000000063",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Details About Beads Mentioned by Ilango Adigal in Silappathikaram",
    "answer": "Introduction\n\nSilappathikaram contains detailed references to precious gems and beads, reflecting the prosperity of ancient Tamil society.\n\nGems Mentioned\nPearl\nCoral\nRuby\nEmerald\nSapphire\nDiamond\nRelationship with Trade\n```mermaid\ngraph TD\n  GemMining[\"Gem Mining\"] --> Processing[\"Processing\"]\n  Processing[\"Processing\"] --> JewelleryProduction[\"Jewellery Production\"]\n  JewelleryProduction[\"Jewellery Production\"] --> DomesticTrade[\"Domestic Trade\"]\n  DomesticTrade[\"Domestic Trade\"] --> InternationalTrade[\"International Trade\"]\n```\nCultural Importance\nEconomic Value\nMajor trade commodity.\nSocial Status\nWorn by royalty and wealthy merchants.\nReligious Importance\nUsed in temple ornaments.\nClassification of Beads\nTypes of Beads Mentioned in Literary Sources\n\n```mermaid\npie title \"Types of Beads\"\n    \"Pearl\" : 30\n    \"Glass\" : 25\n    \"Gemstone\" : 20\n    \"Gold\" : 15\n    \"Coral\" : 10\n```\nLiterary Importance\n\nSilappathikaram provides evidence for:\n\nAdvanced jewellery industry\nGemstone trade\nInternational commerce\nCraft specialization\nConclusion\n\nThe references to beads in Silappathikaram demonstrate the technological skill, economic prosperity, and artistic excellence of ancient Tamil society.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 3 - 16-Mark",
    "order_index": 63
  },
  {
    "id": "faca0000-0000-0000-0000-000000000064",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about Kallanai (Grand Anicut).",
    "answer": "Kallanai is one of the world's oldest water-regulating dams built across the Cauvery River by Karikala Chola around the 2nd century CE.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 64
  },
  {
    "id": "faca0000-0000-0000-0000-000000000065",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who were the Neer Vettiyar?",
    "answer": "Neer Vettiyar were officials responsible for distributing irrigation water fairly among farmers.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 65
  },
  {
    "id": "faca0000-0000-0000-0000-000000000066",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about Kumizhi Thoombu.",
    "answer": "Kumizhi Thoombu was an ancient water-lifting device used to draw water from wells and tanks for irrigation.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 66
  },
  {
    "id": "faca0000-0000-0000-0000-000000000067",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who constructed the Thiraiyan Eri?",
    "answer": "Thiraiyan Eri was constructed by King Thiraiyan for irrigation and water storage.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 67
  },
  {
    "id": "faca0000-0000-0000-0000-000000000068",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which kings ruled by establishing the Seven Committees (Ezhu Variyams)?",
    "answer": "The Chola kings established and maintained the Ezhu Variyam administrative system.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 68
  },
  {
    "id": "faca0000-0000-0000-0000-000000000069",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Who were the Neeranikkararkal?",
    "answer": "Neeranikkararkal were officials who supervised water storage, distribution, and irrigation management.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 69
  },
  {
    "id": "faca0000-0000-0000-0000-000000000070",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about Madai.",
    "answer": "Madai is a sluice gate used to regulate water flow from tanks and reservoirs to agricultural fields.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 70
  },
  {
    "id": "faca0000-0000-0000-0000-000000000071",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about water resources in ancient Tamil society.",
    "answer": "Water resources included rivers, tanks, ponds, lakes, canals, wells, and reservoirs.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 71
  },
  {
    "id": "faca0000-0000-0000-0000-000000000072",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about Muraipanai.",
    "answer": "Muraipanai was a rotational water-sharing system ensuring fair distribution among farmers.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 72
  },
  {
    "id": "faca0000-0000-0000-0000-000000000073",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Which water bodies are mentioned in Tamil literature?",
    "answer": "Rivers\nLakes\nTanks\nPonds\nCanals\nWells",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 73
  },
  {
    "id": "faca0000-0000-0000-0000-000000000074",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about pastoral occupations.",
    "answer": "Pastoral occupations involved cattle rearing, goat herding, sheep farming, and dairy production.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 74
  },
  {
    "id": "faca0000-0000-0000-0000-000000000075",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What were the water sources for cattle?",
    "answer": "Rivers\nPonds\nLakes\nWells\nReservoirs",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 75
  },
  {
    "id": "faca0000-0000-0000-0000-000000000076",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain Vanpulam and Menpulam.",
    "answer": "Vanpulam – Dry, hard land suitable for millets.\nMenpulam – Fertile land suitable for wet cultivation like paddy.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 76
  },
  {
    "id": "faca0000-0000-0000-0000-000000000077",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Name some sea birds mentioned in ancient texts.",
    "answer": "Seagulls\nPelicans\nHerons\nCormorants",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 77
  },
  {
    "id": "faca0000-0000-0000-0000-000000000078",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note about pearl diving.",
    "answer": "Pearl diving involved collecting pearl oysters from the sea and extracting pearls for trade and ornamentation.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 78
  },
  {
    "id": "faca0000-0000-0000-0000-000000000079",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "List four benefits of ponds.",
    "answer": "Irrigation\nDrinking water\nGroundwater recharge\nLivestock usage",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 2-Mark",
    "order_index": 79
  },
  {
    "id": "faca0000-0000-0000-0000-000000000080",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write in Detail About Water Management and Irrigation Systems During the Sangam Period",
    "answer": "Introduction\n\nWater management was the backbone of Sangam-age civilization. Ancient Tamils developed sophisticated systems to collect, store, regulate, and distribute water.\n\nWater Management Structure\n```mermaid\ngraph TD\n  Rainfall[\"Rainfall\"] --> Rivers[\"Rivers\"]\n  Rivers[\"Rivers\"] --> ReservoirsTanks[\"Reservoirs - Tanks\"]\n  ReservoirsTanks[\"Reservoirs - Tanks\"] --> Canals[\"Canals\"]\n  Canals[\"Canals\"] --> AgriculturalFields[\"Agricultural Fields\"]\n  AgriculturalFields[\"Agricultural Fields\"] --> FoodProduction[\"Food Production\"]\n```\nMajor Water Sources\nSource\tPurpose\nRivers\tIrrigation\nTanks (Eri)\tWater storage\nPonds (Kulam)\tDomestic use\nWells\tDrinking water\nCanals\tDistribution\nIrrigation Methods\nTank Irrigation\nMost common system.\nStored monsoon water.\nCanal Irrigation\nTransported river water.\nWell Irrigation\nUsed during dry seasons.\nReservoir Irrigation\nLarge-scale water storage.\nWater Administration\n```mermaid\ngraph TD\n  King[\"King\"] --> VillageAssembly[\"Village Assembly\"]\n  VillageAssembly[\"Village Assembly\"] --> Neeranikkararkal[\"Neeranikkararkal\"]\n  Neeranikkararkal[\"Neeranikkararkal\"] --> NeerVettiyar[\"Neer Vettiyar\"]\n  NeerVettiyar[\"Neer Vettiyar\"] --> Farmers[\"Farmers\"]\n```\nImportance\nIncreased agricultural production.\nReduced drought impact.\nSupported population growth.\nImproved food security.\nKey Features\n\n✔ Community participation\n\n✔ Water-sharing regulations\n\n✔ Seasonal planning\n\n✔ Maintenance systems\n\n✔ Sustainable resource use\n\nConclusion\n\nThe Sangam-period irrigation system represents one of the earliest examples of scientific water resource management in the world.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 16-Mark",
    "order_index": 80
  },
  {
    "id": "faca0000-0000-0000-0000-000000000081",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain the Kallanai Dam – Construction, Purpose, and Historical Significance",
    "answer": "Introduction\n\nKallanai (Grand Anicut) is one of the oldest functioning dams in the world and a remarkable engineering achievement of ancient Tamil civilization.\n\nBuilder\n\nKarikala Chola\n\nApproximate period: 2nd Century CE\n\nConstruction\nMaterials Used\nMassive stone blocks\nGranite rocks\nNatural river foundation\nStructure\n```mermaid\ngraph TD\n  CauveryRiver[\"Cauvery River\"] --> StoneDamKallanai[\"Stone Dam Kallanai\"]\n  StoneDamKallanai[\"Stone Dam Kallanai\"] --> WaterDiversion[\"Water Diversion\"]\n  WaterDiversion[\"Water Diversion\"] --> Canals[\"Canals\"]\n  Canals[\"Canals\"] --> AgriculturalFields[\"Agricultural Fields\"]\n```\nObjectives\nWater conservation\nIrrigation expansion\nFlood control\nAgricultural development\nEngineering Excellence\nFeature\tImportance\nStone Construction\tDurability\nWater Diversion\tEfficient irrigation\nWide Structure\tFlood control\nNatural Foundation\tStability\nHistorical Importance\nEconomic Impact\nIncreased rice production.\nImproved trade.\nSocial Impact\nEnhanced rural development.\nImproved livelihoods.\nEngineering Impact\nInspiration for modern dams.\nGlobal Significance\nMajor Contributions of Kallanai\n\n```mermaid\nxychart-beta\n    title \"Benefits of Kallanai\"\n    x-axis [\"Irrigation\", \"Agriculture\", \"Flood Control\", \"Storage\", \"Economy\"]\n    y-axis \"Impact\" 0 --> 120\n    bar [110, 100, 85, 90, 75]\n```\nConclusion\n\nKallanai stands as a symbol of ancient Tamil engineering brilliance and continues to serve farmers even today.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 16-Mark",
    "order_index": 81
  },
  {
    "id": "faca0000-0000-0000-0000-000000000082",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Agricultural Practices of Ancient Tamils During the Sangam Period",
    "answer": "Introduction\n\nAgriculture was the primary occupation of Sangam-age Tamil society.\n\nAgricultural Cycle\n```mermaid\ngraph TD\n  LandPreparation[\"Land Preparation\"] --> Ploughing[\"Ploughing\"]\n  Ploughing[\"Ploughing\"] --> Sowing[\"Sowing\"]\n  Sowing[\"Sowing\"] --> Irrigation[\"Irrigation\"]\n  Irrigation[\"Irrigation\"] --> CropProtection[\"Crop Protection\"]\n  CropProtection[\"Crop Protection\"] --> Harvesting[\"Harvesting\"]\n  Harvesting[\"Harvesting\"] --> Storage[\"Storage\"]\n```\nMajor Crops\nCrop\tRegion\nPaddy\tMenpulam\nMillet\tVanpulam\nSugarcane\tRiver Basins\nPulses\tDry Areas\nCotton\tSemi-Arid Regions\nAgricultural Tools\nIron ploughs\nSickles\nHoes\nWater-lifting devices\nFarming Methods\nWet Cultivation\n\nUsed for paddy cultivation.\n\nDry Cultivation\n\nUsed for millets and pulses.\n\nMixed Farming\n\nCombination of crops and livestock.\n\nImportance\nFood security\nEconomic prosperity\nTrade development\nSocial stability\nConclusion\n\nAncient Tamil agriculture was scientifically planned and supported by effective irrigation systems.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 16-Mark",
    "order_index": 82
  },
  {
    "id": "faca0000-0000-0000-0000-000000000083",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain Pearl Harvesting and Pearl Diving in Ancient Times",
    "answer": "Introduction\n\nPearl diving was one of the most profitable maritime industries of ancient Tamilakam.\n\nMajor Pearl Centers\nKorkai\nGulf of Mannar\nCoastal Pandya Kingdom\nPearl Harvesting Process\n```mermaid\ngraph TD\n  PearlOysterBeds[\"Pearl Oyster Beds\"] --> DiversEnterSea[\"Divers Enter Sea\"]\n  DiversEnterSea[\"Divers Enter Sea\"] --> CollectionofOysters[\"Collection of Oysters\"]\n  CollectionofOysters[\"Collection of Oysters\"] --> Sorting[\"Sorting\"]\n  Sorting[\"Sorting\"] --> OpeningShells[\"Opening Shells\"]\n  OpeningShells[\"Opening Shells\"] --> PearlExtraction[\"Pearl Extraction\"]\n  PearlExtraction[\"Pearl Extraction\"] --> TradeExport[\"Trade & Export\"]\n```\nDivers\nSkills Required\nBreath control\nSwimming expertise\nUnderwater navigation\nEconomic Importance\nExport commodity\nInternational trade\nRoyal revenue\nForeign Trade\n\nPearls were exported to:\n\nRome\nEgypt\nArabia\nSoutheast Asia\nSignificance\nMajor Uses of Ancient Tamil Pearls\n\n```mermaid\npie title \"Uses of Ancient Pearls\"\n    \"Jewellery\" : 40\n    \"Trade\" : 30\n    \"Royal Gifts\" : 20\n    \"Religious Use\" : 10\n```\nConclusion\n\nPearl diving contributed significantly to the wealth and global trade reputation of ancient Tamil kingdoms.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 16-Mark",
    "order_index": 83
  },
  {
    "id": "faca0000-0000-0000-0000-000000000084",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write About Cattle Rearing, Livestock Management, and Animal Husbandry During the Sangam Period",
    "answer": "Introduction\n\nLivestock formed an essential component of the Sangam economy and agricultural system.\n\nTypes of Livestock\nAnimal\tPurpose\nCattle\tFarming and milk\nBuffaloes\tPloughing\nGoats\tMeat and milk\nSheep\tWool and meat\nHorses\tTransport\nLivestock Management System\n```mermaid\ngraph TD\n  Breeding[\"Breeding\"] --> Feeding[\"Feeding\"]\n  Feeding[\"Feeding\"] --> WaterSupply[\"Water Supply\"]\n  WaterSupply[\"Water Supply\"] --> HealthCare[\"Health Care\"]\n  HealthCare[\"Health Care\"] --> Protection[\"Protection\"]\n  Protection[\"Protection\"] --> ProductUtilization[\"Product Utilization\"]\n```\nUses of Livestock\nAgricultural Use\nPloughing\nTransportation\nEconomic Use\nDairy products\nTrade\nSocial Use\nWealth indicator\nCultural importance\nPastoral Communities\nAayar\nIdaiyar\nKonar\nBenefits\n\n✔ Organic manure\n\n✔ Milk production\n\n✔ Agricultural support\n\n✔ Rural economy\n\n✔ Trade opportunities\n\nConclusion\n\nLivestock management was a highly organized and economically significant activity in Sangam society, supporting both agriculture and trade.\n\nExam Topper Formula for Unit IV\n\nFor every 16-mark answer:\n\n```mermaid\ngraph TD\n  Introduction[\"Introduction\"] --> Definition[\"Definition\"]\n  Definition[\"Definition\"] --> HistoricalBackground[\"Historical Background\"]\n  HistoricalBackground[\"Historical Background\"] --> FlowDiagram[\"Flow Diagram\"]\n  FlowDiagram[\"Flow Diagram\"] --> ClassificationTable[\"Classification Table\"]\n  ClassificationTable[\"Classification Table\"] --> ProcessExplanation[\"Process Explanation\"]\n  ProcessExplanation[\"Process Explanation\"] --> Importance[\"Importance\"]\n  Importance[\"Importance\"] --> ModernRelevance[\"Modern Relevance\"]\n  ModernRelevance[\"Modern Relevance\"] --> Conclusion[\"Conclusion\"]\n```\n\nUsing this structure consistently can make long answers more complete, organized, and easier for examiners to evaluate.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 4 - 16-Mark",
    "order_index": 84
  },
  {
    "id": "faca0000-0000-0000-0000-000000000085",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note on Computational Tamil (Kanithamizh).",
    "answer": "Kanithamizh refers to the use of Tamil language in computers, digital devices, software, and information technology systems.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 85
  },
  {
    "id": "faca0000-0000-0000-0000-000000000086",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "In which year was the Tamil Virtual Academy established?",
    "answer": "The Tamil Virtual Academy was established in 2001 by the Government of Tamil Nadu.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 86
  },
  {
    "id": "faca0000-0000-0000-0000-000000000087",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Name three e-learning systems.",
    "answer": "E-books\nOnline Learning Platforms\nVirtual Classrooms",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 87
  },
  {
    "id": "faca0000-0000-0000-0000-000000000088",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "List the institutions where Tamil software is developed.",
    "answer": "Tamil Virtual Academy\nAnna University\nTamil University\nOpen Source Tamil Computing Communities",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 88
  },
  {
    "id": "faca0000-0000-0000-0000-000000000089",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note on Digital Libraries.",
    "answer": "Digital libraries are online repositories that store books, journals, manuscripts, and research materials in electronic form.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 89
  },
  {
    "id": "faca0000-0000-0000-0000-000000000090",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write about Online Dictionaries.",
    "answer": "Online dictionaries provide meanings, pronunciation, synonyms, and translations through internet-based platforms.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 90
  },
  {
    "id": "faca0000-0000-0000-0000-000000000091",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "How many components are there in the Madhuram Online Dictionary?",
    "answer": "The Madhuram Online Dictionary consists of multiple lexical components including meanings, grammar, synonyms, and usage information.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 91
  },
  {
    "id": "faca0000-0000-0000-0000-000000000092",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note on Tamil Wiktionary.",
    "answer": "Tamil Wiktionary is a free online collaborative dictionary containing Tamil words, meanings, pronunciations, and etymologies.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 92
  },
  {
    "id": "faca0000-0000-0000-0000-000000000093",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What is Sorkuvai Thittam?",
    "answer": "Sorkuvai Thittam is a project aimed at collecting, organizing, and standardizing Tamil technical and scientific terminology.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 93
  },
  {
    "id": "faca0000-0000-0000-0000-000000000094",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the primary objectives of a Sorkuvai?",
    "answer": "Develop Tamil terminology.\nStandardize scientific words.\nPromote Tamil in education and technology.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 94
  },
  {
    "id": "faca0000-0000-0000-0000-000000000095",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What was the previous name of Tamil Virtual Academy?",
    "answer": "It was previously known as the Tamil Virtual University (TVU).",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 95
  },
  {
    "id": "faca0000-0000-0000-0000-000000000096",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a note on Blogs.",
    "answer": "Blogs are websites or online journals where individuals share information, opinions, and articles regularly.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 96
  },
  {
    "id": "faca0000-0000-0000-0000-000000000097",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write about the development of Tamil in Blogs.",
    "answer": "Blogs have increased Tamil content on the internet and promoted digital literacy among Tamil-speaking communities.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 97
  },
  {
    "id": "faca0000-0000-0000-0000-000000000098",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write a brief note on Online Tamil Dictionaries.",
    "answer": "Online Tamil dictionaries provide quick access to vocabulary, meanings, grammar, and translations.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 98
  },
  {
    "id": "faca0000-0000-0000-0000-000000000099",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "What are the benefits of Tamil software development?",
    "answer": "Promotes Tamil computing.\nEnhances accessibility.\nSupports education.\nPreserves language digitally.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 2-Mark",
    "order_index": 99
  },
  {
    "id": "faca0000-0000-0000-0000-000000000100",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain in Detail the Development of Computer Tamil (Kanithamizh)",
    "answer": "Introduction\n\nComputer Tamil (Kanithamizh) refers to the integration of Tamil language with modern computing technologies. It enables Tamil users to access computers, mobile devices, software, and internet resources in their native language.\n\nEvolution of Tamil Computing\n```mermaid\ngraph TD\n  TraditionalTamilWriting[\"Traditional Tamil Writing\"] --> Typewriters[\"Typewriters\"]\n  Typewriters[\"Typewriters\"] --> TamilFonts[\"Tamil Fonts\"]\n  TamilFonts[\"Tamil Fonts\"] --> UnicodeStandard[\"Unicode Standard\"]\n  UnicodeStandard[\"Unicode Standard\"] --> TamilSoftware[\"Tamil Software\"]\n  TamilSoftware[\"Tamil Software\"] --> InternetTamil[\"Internet Tamil\"]\n  InternetTamil[\"Internet Tamil\"] --> AIDigitalTamil[\"AI & Digital Tamil\"]\n```\nMajor Milestones\nPeriod\tDevelopment\n1980s\tTamil font creation\n1990s\tTamil word processors\n2000s\tUnicode implementation\n2010s\tMobile Tamil applications\nPresent\tAI-based Tamil computing\nComponents of Tamil Computing\n```mermaid\nmindmap\n  root((Tamil Computing))\n    Input Systems\n      Tamil Keyboard\n      Transliteration Tools\n      Speech Input\n    Processing Systems\n      Spell Checkers\n      Grammar Tools\n      Translation Software\n    Output Systems\n      Websites\n      Mobile Apps\n      Digital Documents\n```\nBenefits\nPreserves Tamil language.\nPromotes digital inclusion.\nSupports education and research.\nEnables global communication.\nGrowth Areas\nGrowth Areas in Tamil Computing\n\n```mermaid\nxychart-beta\n    title \"Growth Areas in Tamil Computing\"\n    x-axis [\"Education\", \"Mobile Apps\", \"AI Tools\", \"Translation\", \"Publishing\"]\n    y-axis \"Growth\" 0 --> 120\n    bar [100, 90, 85, 75, 65]\n```\nChallenges\nTechnical terminology creation.\nSoftware localization.\nNLP resource development.\nConclusion\n\nComputer Tamil has transformed Tamil from a traditional language into a globally accessible digital language.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 16-Mark",
    "order_index": 100
  },
  {
    "id": "faca0000-0000-0000-0000-000000000101",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain About E-Books",
    "answer": "Introduction\n\nE-books (Electronic Books) are digital versions of printed books that can be read using computers, smartphones, tablets, and e-readers.\n\nE-Book Lifecycle\n```mermaid\ngraph TD\n  Author[\"Author\"] --> DigitalCreation[\"Digital Creation\"]\n  DigitalCreation[\"Digital Creation\"] --> Editing[\"Editing\"]\n  Editing[\"Editing\"] --> Publishing[\"Publishing\"]\n  Publishing[\"Publishing\"] --> OnlineDistribution[\"Online Distribution\"]\n  OnlineDistribution[\"Online Distribution\"] --> ReaderAccess[\"Reader Access\"]\n```\nFeatures of E-Books\nAccessibility\nAvailable anytime.\nAccessible worldwide.\nStorage\nThousands of books in one device.\nSearchability\nQuick keyword search.\nMultimedia Integration\nImages\nAudio\nVideo\nAdvantages\nFeature\tBenefit\nPortability\tEasy to carry\nCost-effective\tLower production cost\nEco-friendly\tSaves paper\nInstant Access\tImmediate download\nImportance in Education\nDistance learning.\nResearch support.\nDigital classrooms.\nConclusion\n\nE-books have revolutionized learning by making knowledge accessible anytime and anywhere.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 16-Mark",
    "order_index": 101
  },
  {
    "id": "faca0000-0000-0000-0000-000000000102",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Explain About Online Dictionaries or E-Dictionaries",
    "answer": "Introduction\n\nAn online dictionary is a digital platform that provides word meanings, pronunciations, grammar, and translations through the internet.\n\nWorking Process\n```mermaid\ngraph TD\n  UserQuery[\"User Query\"] --> DatabaseSearch[\"Database Search\"]\n  DatabaseSearch[\"Database Search\"] --> MeaningRetrieval[\"Meaning Retrieval\"]\n  MeaningRetrieval[\"Meaning Retrieval\"] --> GrammarInformation[\"Grammar Information\"]\n  GrammarInformation[\"Grammar Information\"] --> DisplayResults[\"Display Results\"]\n```\nComponents\nVocabulary Database\n\nStores thousands of words.\n\nGrammar Module\n\nProvides grammatical information.\n\nPronunciation System\n\nGuides correct pronunciation.\n\nTranslation Module\n\nProvides multilingual support.\n\nExamples\nTamil Wiktionary\nMadhuram Dictionary\nOnline Tamil Lexicon\nAdvantages\nFast access\nUpdated information\nEasy search\nGlobal accessibility\nApplications\nEducation\nTranslation\nResearch\nContent Creation\nConclusion\n\nOnline dictionaries play a crucial role in modern language learning and digital communication.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 16-Mark",
    "order_index": 102
  },
  {
    "id": "faca0000-0000-0000-0000-000000000103",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Describe the Sorkuvai Thittam and Its Objectives",
    "answer": "Introduction\n\nSorkuvai Thittam is a language development initiative designed to create and standardize Tamil terminology, especially in science and technology.\n\nProcess of Sorkuvai Development\n```mermaid\ngraph TD\n  NewConcept[\"New Concept\"] --> Research[\"Research\"]\n  Research[\"Research\"] --> TamilEquivalentCreation[\"Tamil Equivalent Creation\"]\n  TamilEquivalentCreation[\"Tamil Equivalent Creation\"] --> ExpertReview[\"Expert Review\"]\n  ExpertReview[\"Expert Review\"] --> Standardization[\"Standardization\"]\n  Standardization[\"Standardization\"] --> PublicUsage[\"Public Usage\"]\n```\nObjectives\nLanguage Development\n\nExpand Tamil vocabulary.\n\nScientific Advancement\n\nEnable scientific education in Tamil.\n\nStandardization\n\nEnsure consistent terminology.\n\nTechnology Integration\n\nSupport Tamil computing.\n\nAreas Covered\nField\tExample\nScience\tScientific terms\nEngineering\tTechnical vocabulary\nMedicine\tMedical terminology\nComputing\tDigital terminology\nImportance\nStrengthens Tamil language.\nSupports higher education.\nEnhances technical communication.\nConclusion\n\nSorkuvai Thittam is essential for making Tamil a modern scientific and technological language.",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 16-Mark",
    "order_index": 103
  },
  {
    "id": "faca0000-0000-0000-0000-000000000104",
    "subject_id": "a1000000-0000-0000-0000-000000000006",
    "question": "Write an Essay on Scientific Tamil",
    "answer": "Introduction\n\nScientific Tamil refers to the use of Scientific Tamil language for expressing scientific, technological, engineering, and medical concepts accurately.\n\nNeed for Scientific Tamil\n```mermaid\ngraph TD\n  ScienceGrowth[\"Science Growth\"] --> NeedforNativeLanguage[\"Need for Native Language\"]\n  NeedforNativeLanguage[\"Need for Native Language\"] --> ScientificTamil[\"Scientific Tamil\"]\n  ScientificTamil[\"Scientific Tamil\"] --> EducationResearch[\"Education & Research\"]\n  EducationResearch[\"Education & Research\"] --> KnowledgeDissemination[\"Knowledge Dissemination\"]\n```\nCharacteristics\nPrecision\n\nScientific concepts are expressed clearly.\n\nStandardization\n\nUniform terminology is used.\n\nAccessibility\n\nKnowledge becomes available to Tamil speakers.\n\nAdaptability\n\nNew terms are continuously created.\n\nMajor Contributors\nTamil Scholars\nLinguists\nTamil Virtual Academy\nUniversities\nGovernment Agencies\nFields of Application\nField\tUsage\nPhysics\tScientific concepts\nChemistry\tTechnical terms\nBiology\tMedical vocabulary\nEngineering\tTechnical education\nComputing\tDigital terminology\nContribution of Digital Technology\nInternet\n   +\nUnicode\n   +\nTamil Software\n   +\n```mermaid\ngraph TD\n  AITools[\"AI Tools\"] --> ScientificTamilExpansion[\"Scientific Tamil Expansion\"]\n```\nImpact of Scientific Tamil\nImpact Areas of Scientific Tamil\n\nMajor sectors benefited by scientific Tamil development.\n\nEducation\nGovernment\nPublishing\nResearch\nTechnology\nFuture Scope\nArtificial Intelligence in Tamil\nNatural Language Processing (NLP)\nVoice Assistants\nMachine Translation\nSmart Educational Systems\nConclusion\n\nScientific Tamil serves as a bridge between modern scientific knowledge and Tamil-speaking society. It ensures that Tamil remains relevant, dynamic, and capable of expressing the most advanced concepts of the modern world.\n\nFINAL EXAM REVISION MAP (ALL 5 UNITS)\n```mermaid\ngraph TD\n  UnitI[\"Unit I\"] --> WeavingPottery[\"Weaving & Pottery\"]\n```\n\n```mermaid\ngraph TD\n  UnitII[\"Unit II\"] --> ArchitectureConstruction[\"Architecture & Construction\"]\n```\n\n```mermaid\ngraph TD\n  UnitIII[\"Unit III\"] --> ManufacturingTechnology[\"Manufacturing Technology\"]\n```\n\n```mermaid\ngraph TD\n  UnitIV[\"Unit IV\"] --> AgricultureIrrigation[\"Agriculture & Irrigation\"]\n```\n\n```mermaid\ngraph TD\n  UnitV[\"Unit V\"] --> ScientificTamilComputing[\"Scientific Tamil & Computing\"]\n```",
    "image_url": null,
    "references": "22GE201 - Tamils and Technology",
    "notes": "Unit 5 - 16-Mark",
    "order_index": 104
  }
];
