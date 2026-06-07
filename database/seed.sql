-- ═══════════════════════════════════════════
-- ARC_OS Seed Data
-- Run AFTER schema.sql
-- ═══════════════════════════════════════════

-- Insert subjects with department mapping
INSERT INTO subjects (id, department, subject_name, icon) VALUES
  ('a1000000-0000-0000-0000-000000000001', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Engineering Mathematics II', '∑'),
  ('a1000000-0000-0000-0000-000000000002', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Electromagnetism and Modern Physics', '⚛'),
  ('a1000000-0000-0000-0000-000000000003', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Engineering Chemistry II', '🧪'),
  ('a1000000-0000-0000-0000-000000000004', ARRAY['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'], 'Computational Problem Solving', '<>'),
  ('a1000000-0000-0000-0000-000000000005', ARRAY['CS','IT','AL','AD'], 'Digital Computer Electronics', '🖥'),
  ('a1000000-0000-0000-0000-000000000006', ARRAY['CS','IT','AL','AD','AG','BT'], 'Tamils and Technology', '🏛'),
  ('a1000000-0000-0000-0000-000000000007', ARRAY[]::TEXT[], 'Basics of Electrical Engineering', '⚡'),
  ('a1000000-0000-0000-0000-000000000008', ARRAY['EEE','EIE','ME','MZ','AG','BT'], 'Basics of Electronics Engineering', '🔌')
ON CONFLICT (id) DO UPDATE SET
  department = EXCLUDED.department,
  subject_name = EXCLUDED.subject_name,
  icon = EXCLUDED.icon;

-- ═══════════════════════════════════════════
-- Computational Problem Solving question bank
-- Source: 22GE002 Module Test-I and Module Test-II pasted question lists
-- ═══════════════════════════════════════════
INSERT INTO questions (id, subject_id, question, answer, image_url, "references", notes, order_index) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 'A retail chain observes frequent stock-outs in their stores despite regular inventory audits. Store managers report delayed deliveries, inaccurate stock records, and lack of demand forecasting.

**Break down the stock-out issue using scenario decomposition, identify two sub-problems, and explain how solving them individually improves efficiency.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q1', 1),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004', 'A school is organizing its annual sports day with 500 students participating. Teachers face challenges in scheduling events, assigning referees, allocating equipment, and arranging different sports venues. Students and parents often get confused about timings, locations, and participation criteria.

**Decompose this problem into three sub-problems that can be addressed individually.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q2', 2),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000004', 'A program is designed to find the sum of digits of a number. However, an incorrect operator is used.

```
BEGIN
n ← 123
sum ← 0
WHILE n > 0 DO
digit ← n / 10
sum ← sum + digit
n ← n / 10
END WHILE
PRINT sum
END
```

**Identify the incorrect operator(s) and replace them with the correct ones.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q3', 3),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', 'A program is designed to print numbers starting from 1 using a loop. The loop continues as long as the value of the variable is less than or equal to 5.

```
BEGIN
i ← 1
WHILE i ≤ 5 DO
PRINT i
i ← i + 1
END WHILE
END
```

**Identify the loop termination condition. When will the loop stop executing?**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q4', 4),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000004', 'A software development team struggles to deliver a mobile application on time. Issues include unclear client requirements, team miscommunication, and inefficient task allocation.

**Decompose the project delays into sub-problems, select one sub-problem as priority, and suggest a method to resolve it.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q5', 5),
  ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000004', 'A food delivery company notices that orders are frequently delivered late. Customers complain about delayed deliveries, while delivery personnel report unclear route assignments and long waiting times at restaurants.

**Using scenario decomposition, identify the main root cause of delays and one sub-problem that should be addressed first.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q6', 6),
  ('b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000004', 'A school system records the marks obtained by a student in an exam. The system needs to evaluate whether the student has passed or failed based on the marks entered. If the marks are 50 or above, the student passes; otherwise, the student fails.

**Write a pseudocode for the above scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q7', 7),
  ('b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000004', 'A pseudocode to multiply a number in a loop is given below.

```
BEGIN
result ← 1
FOR i ← 1 TO 5 DO
result ← result × 2
END FOR
PRINT result
END
```

**Predict the output.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q8', 8),
  ('b1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000004', 'A digital library system stores book IDs in a sorted list for fast searching. When a user searches for a specific book ID, the system does not check each ID one by one. Instead, it repeatedly checks the middle element of the list and decides whether to search in the left half or right half. This process continues until the required book ID is found or the search space becomes empty.

Given sorted book IDs:

`[101, 115, 128, 134, 146, 159, 172, 185, 193, 207]`

**Apply decomposition to solve the problem. Break the process into steps and find the position of the book ID 172 by showing the steps clearly.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q9', 9),
  ('b1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000004', 'An algorithm to find the factorial of a given number is given below:

Step 1: Start the algorithm.
Step 2: Read the given number n.
Step 3: Set the value of fact to 1.
Step 4: Set the value of i to 1.
Step 5: Check whether i is less than or equal to n.
Step 6: Multiply fact by i and store the result in fact.
Step 7: Increase the value of i by 1.
Step 8: Repeat Steps 5 to 7 until i becomes greater than n.
Step 9: Display the value of fact.
Step 10: Stop the algorithm.

**Draw an equivalent flowchart for the above algorithm.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q10', 10),
  ('b1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000004', 'A program is required to sort a list of 10 numbers in ascending order. The developer finds it difficult to directly write the solution due to multiple steps involved in sorting. To solve this efficiently, the problem needs to be broken down into smaller manageable steps.

**Apply the steps of decomposition to the above scenario and explain how each step can be used to sort the numbers.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q11', 11),
  ('b1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000004', 'A digital display system generates a special number sequence for a light pattern. The sequence is defined as follows:

* The first two numbers are 0 and 1.
* Each next number is the sum of the previous two numbers.
* The system asks the user to enter the number of terms (n).
* If n ≤ 0, display "Invalid Input".
* Otherwise, generate and display the sequence up to n terms.
* Also calculate and display the sum of all generated numbers.

**Draw a flowchart to represent the above system using a loop, clearly showing:**

* Input and validation
* Initialization of first two terms
* Loop to generate the sequence
* Calculation of sum
* Output of sequence and total sum', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q12', 12),
  ('b1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000004', 'A fitness app tracks the daily steps of a user for 10 days:

`[7500, 10200, 8400, 12000, 9800, 15000, 11000, 7000, 9000, 13000]`

The app needs to:

* Calculate the total steps.
* Find the average steps.
* Count the number of days the user crossed 10,000 steps.
* Identify the maximum steps taken in a day.

**Write an algorithm using a for loop to perform all the above operations.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q13', 13),
  ('b1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000004', 'An online examination system manages student login, verification, monitoring, and result evaluation. The system performs the following steps:

* The user logs in and undergoes identity verification.
* If verification fails, the exam session is terminated.
* If successful, the exam starts and the system monitors for suspicious activity.
* If suspicious activity is detected, the system checks its severity:

  * Low severity → Warning is given, and the exam continues.
  * High severity → Exam is paused and the administrator is notified.
* If no suspicious activity occurs, the student continues the exam.
* When time ends, the exam is automatically submitted and evaluated.
* If marks are above the passing criteria → Display "Pass"
* Otherwise → Display "Fail"

**Draw a flowchart for the above scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q14', 14),
  ('b1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000004', 'A mobile app developer wants to display a list of 12 contact names in alphabetical order in the app''s contact list. Currently, the names are unsorted, making it difficult for users to locate a contact quickly.

**Write a step-by-step algorithm using the Bubble Sort technique to sort the contact names alphabetically. Include comparisons, swaps, and iterations until the list is fully sorted.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q15', 15),
  ('b1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000004', 'A delivery company tracks daily parcel deliveries for a week (7 days). For each day, the system asks the user to input the number of parcels delivered and time (in minutes) spent delivering. The system calculates:

* Total parcels delivered in the week
* Average delivery time per valid day
* Highest single-day parcel delivery

It also categorizes weekly performance based on total parcels delivered:

* Less than 200 → Low
* 200 to 499 → Medium
* 500 to 799 → High
* 800 and above → Very High

If the user enters negative parcels or time, the program should print **"Invalid Input"** and skip that day in calculations.

**Write an algorithm to implement the above weekly tracking and calculations.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q16', 16),
  ('b1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000004', 'A hospital management system is designed to assign the nearest available ambulance to an emergency location. The system maintains a list of ambulances and checks their current positions to determine the closest one for faster response time.

Given the pseudocode to find the nearest ambulance, identify the key operation that influences the time complexity of the algorithm and justify your answer.

```text
function find_nearest_ambulance(ambulances, emergency_location):
nearest_distance = INFINITY
nearest_ambulance = null

for each ambulance in ambulances:
    distance = calculate_distance(ambulance.location, emergency_location)

    if distance < nearest_distance:
        nearest_distance = distance
        nearest_ambulance = ambulance

return nearest_ambulance
```

**Identify the key operation that influences the time complexity of the algorithm and justify your answer.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q17', 17),
  ('b1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000004', 'A university system processes student records where the number of operations increases exactly in proportion to the number of students entered. For example, if 100 students are processed, about 100 operations are performed; if 1000 students are processed, about 1000 operations are performed.

**Analyze the scenario and determine the time complexity of the algorithm. Justify your answer based on order of growth.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q18', 18),
  ('b1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000004', 'A software company needs to find the maximum sales value from a large list of daily sales for the past week.

Daily Sales (in $):

`[250, 420, 180, 560, 300, 410, 150]`

The team decides to use a divide and conquer approach to find the maximum efficiently.

**Identify the maximum sales value using divide and conquer.**

**Indicate how the original list can be divided into sublists for the first step.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q19', 19),
  ('b1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000004', 'A search engine needs to quickly locate a specific page number from a sorted list of page IDs containing millions of entries. To improve efficiency, the system repeatedly divides the list into halves and searches only the relevant part.

**Identify the algorithmic approach used and indicate why it is suitable for this application.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q20', 20),
  ('b1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000004', 'A data processing system uses different algorithms to handle increasing input sizes. Some algorithms execute in constant time, while others show linear, quadratic, or exponential growth in the number of steps as the input size increases.

For a given input size of `N = 100`, select any three types of time complexities from:

* O(1)
* O(log N)
* O(N)
* O(N²)
* O(2ⁿ)

**Estimate the approximate number of steps involved for each and compare their performance.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q21', 21),
  ('b1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000004', 'In a data processing application, Algorithm A has time complexity O(1), and Algorithm B has time complexity O(log n). However, Algorithm A involves a large constant number of operations, while Algorithm B has a very small constant factor.

**Evaluate whether Algorithm A will always perform better than Algorithm B for all input sizes. Justify your answer using asymptotic analysis and practical performance considerations.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q22', 22),
  ('b1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000004', 'A fitness tracking app records the number of steps walked each day over a period of time:

`[3000, 4500, 5200, 2800, 6100, 4000, 3500, 4800]`

To quickly calculate the total number of steps, the app uses a divide and conquer approach by splitting the list into smaller parts, computing partial sums, and combining them.

**Identify the sum of elements in the left and right sublists after the first division.**

**Identify the final total number of steps.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q23', 23),
  ('b1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000004', 'A data processing system handles a large list of elements using a divide and conquer strategy. The system repeatedly splits the list into two equal parts at each step until smaller sublists are formed for processing.

During execution, the system reaches a stage where there are exactly 4 sublists, each representing a portion of the original data.

**Indicate the original number of elements in the list.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q24', 24),
  ('b1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000004', 'A company is developing a program to place flags on a square grid for a display competition. The rules are:

* No two flags can be in the same row.
* No two flags can be in the same column.
* No two flags can be on the same diagonal.

The program tries all possible arrangements one by one to find a valid placement.

Currently, it works on an 8×8 grid, but the company is considering larger grids, such as 10×10.

**Analyze the program in terms of:**

* Maximum number of arrangements it may need to check.
* Average number of arrangements it will check before finding a solution.
* How increasing the grid size affects time and space required.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q25', 25),
  ('b1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000004', 'A cargo ship is loading high-priority containers with a maximum carrying capacity of 12 kg. Each container has a specific weight and profit value. The goal is to maximize the total profit using the Fractional Knapsack approach.

| Item        | 1  | 2  | 3  | 4  | 5  |
| ----------- | -- | -- | -- | -- | -- |
| Weight (kg) | 4  | 2  | 3  | 6  | 1  |
| Profit      | 20 | 12 | 18 | 24 | 10 |

Step 1 is done for you.

**Complete:**

**Step 2:** Arrange items in descending order of Pi/Wi

**Step 3:** Select items without exceeding capacity to maximize profit

**Step 1: Calculate Pi/Wi**

| Item  | 1 | 2 | 3 | 4 | 5  |
| ----- | - | - | - | - | -- |
| Pi/Wi | 5 | 6 | 6 | 4 | 10 |', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q26', 26),
  ('b1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000004', 'A text processing program searches for a pattern `p` of length `m` within a text `t` of length `n` using a nested loop approach.

Analyze the algorithm to determine its worst-case time complexity, space complexity, and how changing the outer loop to:

```c
for (int i = 0; i < n; i++)
```

affects its performance.

```c
for (int i = 0; i <= n - m; i++) {
    int j = 0;
    while (j < m && t[i+j] == p[j]) {
        j++;
    }
    if (j == m) return i;
}

System.out.println("No match found");
return -1;
```

**Analyze the algorithm to determine its worst-case time complexity, space complexity, and how changing the outer loop affects its performance.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q27', 27),
  ('b1000000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000004', 'A fuel transportation company has a tanker with a limited capacity of 1000 liters. The company needs to transport different types of fuel, each with a specific volume and value per liter.

The goal is to maximize the total value of fuel transported without exceeding the tanker''s capacity. This is a classic example of the Fractional Knapsack Problem, where fractions of items can be included.

**Formulate an algorithm to fill the tanker with the maximum value of fuel without exceeding its capacity by considering the following conditions:**

a) Fractions of fuel can be included (e.g., 50% of a fuel type).

b) The total volume of the selected fuels must not exceed the tanker''s capacity.

c) The goal is to maximize the total value of the selected fuels.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q28', 28),
  ('b1000000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000004', 'A delivery service needs to deliver parcels to four locations: A, B, C, and D. The distances (in km) between the locations are shown in the graph.

The delivery person wants to start from location A, visit each location exactly once, and return to A.

**Using the brute force approach:**

* Determine all possible routes starting and ending at A.
* Calculate the total distance for each route.
* Identify the route(s) with the minimum total distance.
* Explain why this approach guarantees finding the shortest route.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q29', 29),
  ('b1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000004', 'Consider designing a wireless network system where multiple transmitters must be placed in a grid layout. Each transmitter is represented by a queen, and each grid position is represented by a cell on a chessboard.

The goal is to place the transmitters such that no two interfere with each other (i.e., no two are in the same row, column, or diagonal).

Given the visual representation of a solution for a 4-transmitter setup in the figure titled **4-Queens**,

**Provide any one valid arrangement for a 5-transmitter system without interference.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q30', 30),
  ('b1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000004', 'A security firm is testing the strength of a high-security briefcase that uses a 3-digit combination lock. Each digit can be any number from 0 to 5.

A **Brute Force Attack** involves a specialized machine trying every single possible combination until the lock opens.

The machine takes **2 seconds** to attempt a single combination.

**Analyze the brute force process and determine the effort required to test all possible combinations.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q31', 31),
  ('b1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000004', 'A network administrator is assigning different communication channels to a set of interconnected devices. Each device is represented as a vertex in the graph shown, and an edge between two vertices indicates that the devices are directly connected and cannot share the same channel due to interference.

The graph consists of **7 vertices (1 to 7)** connected as shown in the figure.

**Using a graph colouring technique:**

* Assign colours (channels) to all the vertices such that no two adjacent vertices share the same colour.
* Determine the minimum number of colours required.
* Provide a valid colouring for the graph.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q32', 32),
  ('b1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000004', 'A sales application stores customer information as comma-separated strings. Minor formatting changes cause runtime errors during string splitting and indexing. Developers propose reorganizing the data using structured records to eliminate dependency on string formats.

**Assess how reorganizing program logic from delimiter-based strings to record-based data reduces errors and improves robustness.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q33', 33),
  ('b1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000004', 'A social networking platform has millions of users. Each user can have multiple friends, and the platform needs to perform tasks like:

* Suggesting new friends based on mutual connections
* Quickly identifying friends of friends
* Displaying a network of connections for a user
* Finding communities or clusters of connected users

Each user is connected to other users in a complex network that doesn’t follow a simple sequential order. The number of connections varies per user, and relationships are dynamic – new friendships are added and old ones removed regularly.

**Identify the category of data structure suitable for representing these user relationships and justify.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q34', 34),
  ('b1000000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000004', 'A bus stop maintains a queue for passengers waiting to board. Initially, the queue contains the following passenger IDs in order of arrival (front → rear):

`[201, 202, 203, 204]`

The following actions occur:

* A new passenger with ID 205 arrives and joins the queue.
* The first passenger in the queue boards the bus and leaves.

**Determine the passenger at the front of the queue and list all passenger IDs in the queue after performing the above operations.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q35', 35),
  ('b1000000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000004', 'A library uses a stack to manage returned books. The most recently returned book is placed on top of the stack.

**State which stack operation is performed when a librarian adds a newly returned book and briefly describe its effect.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q36', 36),
  ('b1000000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000004', 'A report-generation algorithm remains unchanged, yet its execution time drops significantly after reorganizing input data into structured records with logical grouping. This improvement surprises junior developers.

**Assess how data organization alone can enhance algorithm performance without modifying algorithmic steps.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q37', 37),
  ('b1000000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000004', 'A weather monitoring system collects daily readings for temperature, humidity, wind speed, and rainfall at multiple locations. Each reading is a single value recorded in the system’s memory for further analysis and reporting.

**Identify the most suitable type of data used to store these individual measurements.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q38', 38),
  ('b1000000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000004', 'Consider four different real-world situations where tasks or items need to be processed in a sequence.

**Predict which type of queue would be most suitable and justify briefly.**

**Situation 1:**
In a fast-food restaurant drive-thru, cars line up to place their orders. The first car to arrive is the first car to be served, and cars move forward as orders are completed.

**Situation 2:**
In a library book drop-off system, books can be returned either at the main entrance or at the back entrance, depending on where the librarian is stationed.

**Situation 3:**
In a video streaming service, multiple videos are queued to pre-load. When the last video finishes pre-loading, the system cycles back to the first video to continue buffering, ensuring smooth playback.

**Situation 4:**
In a fire station emergency call system, calls are attended based on the urgency of the situation rather than the time the call was received. The most critical emergencies are handled first.

Example:
**Simple Queue:** Cars are served in the order they arrive, following the FIFO principle.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q39', 39),
  ('b1000000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000004', 'A hostel maintains a singly linked list of room numbers to track occupied rooms. When a new student checks in, their room number is added to the end of the list.

**State which linked list operation is performed when a new room number is added at the end and briefly describe what it does.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q40', 40),
  ('b1000000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000004', 'Consider an Abstract Data Type (ADT) representing a function to compute the square of a non-negative integer.

**Implementation in C:**

```c
#include <stdio.h>

int square(int n) {
    // Precondition: n >= 0
    return n * n;
    // Postcondition: Returns the square of n
}

int main() {
    printf("%d\n", square(-4));
    printf("%d\n", square(0));
    printf("%d\n", square(6));
    return 0;
}
```

**Identify which function calls in main() satisfy the precondition and which violate it. Explain the postcondition for the function square and what it guarantees if the precondition is satisfied.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q41', 41),
  ('b1000000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000004', 'Imagine a company’s organizational chart, where the CEO is at the root of the hierarchy.

The CEO oversees multiple Department Heads (Level 1). Each Department Head manages several Managers (Level 2), and each Manager supervises a team of Employees (Level 3). The structure helps visualize the reporting relationships within the company.

Consider the following tree representing an organizational chart with dummy alphabet representation.

**Infer the following from the given Tree:**

1. Child Node of “D”
2. Sibling of node “E” & “F”
3. Leaf nodes
4. Nodes at Level 2
5. Number of Edges in the tree', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q42', 42),
  ('b1000000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000004', 'Consider an Abstract Data Type (ADT) representing a digital music playlist, where each song has a title, artist, and duration.

The ADT supports operations such as:

* Creating a playlist
* Adding new songs
* Deleting songs
* Updating song details
* Checking information about songs

**Tasks:**

i) Identify and classify the operations described above into:

* Create operations
* Copy operations
* Destroy operations
* Modification operations
* Inquiry operations

ii) Explain the importance of inquiry operations in this ADT and why they do not change the playlist.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q43', 43),
  ('b1000000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000004', 'Consider a company’s organizational hierarchy represented as a tree, where the CEO is at the root, and each subsequent level of employees is arranged as branches.

The root (CEO) has direct reports (like department heads), and each department head manages a set of employees.

**Construct a similar tree to represent a university’s academic structure in a proper hierarchy.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q44', 44),
  ('b1000000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000004', 'A library system keeps track of borrowed books using a linked list.

Each node contains the book ID and student ID.

The current list of borrowed books is:

```text
[BookID: 201, StudentID: 11]
→ [BookID: 202, StudentID: 12]
→ [BookID: 203, StudentID: 13]
```

Operations performed:

* A new book BookID: 204 borrowed by StudentID: 14 is added at the end.
* The book with BookID: 202 is returned and removed from the list.

Display the list of currently borrowed books.

**Tasks:**

i) Draw or write the linked list after performing the operations.

ii) State the final sequence of Book IDs in order.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q45', 45),
  ('b1000000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000004', 'Consider a delivery network where different cities are connected by various transportation routes, such as highways, railways, or flights.

Each city is represented as a node, and each direct route between two cities is represented as an edge.

The weight of each edge represents the time (in hours) required to travel between two cities.

**Cities:**

* A – Delhi
* B – Mumbai
* C – Bangalore
* D – Chennai
* E – Kolkata

A graph and an adjacency-list representation are provided.

**Spot the error and correct it in the given figure titled "Adjacency List".**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q46', 46),
  ('b1000000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000004', 'Consider an application:

**Music Playlist – Storing the names of songs in a playlist.**

The choice of array for the above application can be a **One-Dimensional Array** as it stores a sequential list of song names.

Representation:

```text
songs = ["Song A", "Song B", "Song C", "Song D"]
```

**Justify with reasoning the choice of array type and its representation that is required for the following application scenarios:**

**Application 1:** Cinema Seat Booking System – Storing seat availability in a cinema hall.

**Application 2:** Weather Simulation Model – Storing temperature, humidity, and wind speed at different altitudes, locations, and times.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q47', 47),
  ('b1000000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000004', 'Consider a flight network where airports are connected by direct flights.

Each airport is represented as a node, and each direct flight between two airports is represented as an edge.

The network can be represented as a graph where the adjacency matrix provides a convenient way to store and analyze the connections between airports.

**Airports:**

* A – Delhi Indira Gandhi Airport
* B – Mumbai Chhatrapati Shivaji Airport
* C – Bangalore Kempegowda Airport
* D – Chennai International Airport
* E – Kolkata Subhas Chandra Bose International Airport

The figure titled **"Graph Representation of Flight Network"** represents the graph of the flight network.

**Tasks:**

i) Complete the respective adjacency matrix of the flight network given in the figure titled **"Adjacency Matrix of Flight Network"**.

ii) If suppose the adjacency matrix value for C turns as:

```text
C: 0 1 0 1 0
```

**Redraw the corresponding graph representation.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-I Q48', 48),
  ('b1000000-0000-0000-0000-000000000049', 'a1000000-0000-0000-0000-000000000004', 'A school stores student data in a flat-file database. The system allows only basic search operations and does not support advanced queries. Duplicate records are often entered without any validation.

**Examine the characteristics of the system and explain how they affect data management.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q1', 49),
  ('b1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000004', 'A small library maintains a list of books with details like title, author, and price in a single file. The system handles only a small amount of data and does not require linking between different records.

**Explain why a flat-file database is an appropriate choice for this scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q2', 50),
  ('b1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000004', 'Determine the appropriate cloud storage type used in each application with suitable justification.

* A startup company stores its website data and backups using services like AWS and Google Cloud to reduce infrastructure cost and improve scalability.
* A bank maintains its customer transaction data in a dedicated storage environment that is not shared with other organizations due to strict security requirements.
* A multinational company stores sensitive employee records in a private environment while keeping general application data in a public cloud for better scalability.

**Determine the appropriate cloud storage type used in each application with suitable justification.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q3', 51),
  ('b1000000-0000-0000-0000-000000000052', 'a1000000-0000-0000-0000-000000000004', 'A media company needs cloud storage to manage large video files and backups, while another organization requires secure cloud storage with collaboration and compliance features for enterprise use.

**Determine the suitable cloud storage providers for these requirements with justification.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q4', 52),
  ('b1000000-0000-0000-0000-000000000053', 'a1000000-0000-0000-0000-000000000004', 'An organization manages different types of data for its operations. Sales records are stored in tables, web data is collected in XML format, and emails and images are stored separately. These data types are used for reporting, communication, and content management.

**Classify the data given in the scenario into appropriate type with justification.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q5', 53),
  ('b1000000-0000-0000-0000-000000000054', 'a1000000-0000-0000-0000-000000000004', 'A small tuition center maintains student details like name, phone number, and marks in a single Excel sheet. There are no separate tables or relationships.

**Identify the type of database used and mention one key characteristic.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q6', 54),
  ('b1000000-0000-0000-0000-000000000055', 'a1000000-0000-0000-0000-000000000004', 'An employee stores important project files in a cloud storage service and accesses them from different locations using the internet. The employee logs into the cloud platform, retrieves the required file, and uses it for further processing. The system ensures secure and reliable access to stored data.

**Write the steps involved in reading data from cloud storage in the above scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q7', 55),
  ('b1000000-0000-0000-0000-000000000056', 'a1000000-0000-0000-0000-000000000004', 'A company uses cloud storage to access data from different devices, increase storage capacity when needed, and recover important files during system failures.

**Outline any two benefits of cloud storage highlighted in the above scenario with suitable justification.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q8', 56),
  ('b1000000-0000-0000-0000-000000000057', 'a1000000-0000-0000-0000-000000000004', 'A college maintains student details in one table and department information with HOD details in another table. The administration needs to combine and analyze data from both tables to manage academic records effectively.

(Student Table and Department Table provided)

**Using the given Students and Departments tables, determine the output of the following relational algebra operations:**

a) Retrieve the HOD name of the MECH department by applying a selection operation on the Departments table.

b) Display only the names of students from the Students table using a projection operation.

c) Using the DeptName values from both tables, determine the resulting tables for the union, intersection, and difference operations.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q9', 57),
  ('b1000000-0000-0000-0000-000000000058', 'a1000000-0000-0000-0000-000000000004', 'Consider the employee table provided.

**a)** Drop the column phone number from the Employee table and display the output.

**b)** Modify the datatype of salary column to integer in the employee table and display the output.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q10', 58),
  ('b1000000-0000-0000-0000-000000000059', 'a1000000-0000-0000-0000-000000000004', 'A hospital database manages patient, doctor, and insurance information using various constraints. Each patient is assigned a unique ID to avoid duplication. The system enforces valid ranges for attributes such as age and restricts deletion of doctor records that are linked to patients. It also applies specific rules to determine insurance eligibility based on predefined conditions.

**Illustrate how different types of data integrity are applied in this system and discuss their impact on data accuracy.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q11', 59),
  ('b1000000-0000-0000-0000-000000000060', 'a1000000-0000-0000-0000-000000000004', 'A college database administrator needs to manage the structure of a student database system. The administrator creates new tables for storing student details, modifies existing table structures to add new attributes, removes unnecessary tables, and renames tables when required.

**Illustrate how DDL (Data Definition Language) commands are used in the above scenario and discuss the role of commands such as CREATE, ALTER, DROP, and RENAME in database management.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q12', 60),
  ('b1000000-0000-0000-0000-000000000061', 'a1000000-0000-0000-0000-000000000004', 'An organization uses different servers to support its operations. Employees access websites through a system that delivers web pages, store and retrieve data from a centralized system, share files within the office network, send and receive emails, and resolve domain names while browsing. Some systems also act as intermediaries to filter content and improve security.

**Classify any five types of servers used in the given scenario and explain the function of each in supporting organizational activities.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q13', 61),
  ('b1000000-0000-0000-0000-000000000062', 'a1000000-0000-0000-0000-000000000004', 'Consider the student table provided.

**a)** Insert two rows into the student table. After entering value, the new table should appear as shown.

**b)** Write an SQL query to perform the following operations:

i) Update the address of student named Mani to Mumbai.

ii) Delete the student from the student table whose ID is 5.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q14', 62),
  ('b1000000-0000-0000-0000-000000000063', 'a1000000-0000-0000-0000-000000000004', 'An organization plans to upgrade its storage infrastructure to handle increasing data demands. It needs a solution that provides both high performance and protection against data loss. Different RAID configurations are being evaluated to meet these requirements. The goal is to choose the most suitable RAID level based on speed and reliability.

**Compare RAID 0, RAID 1, RAID 5, and RAID 10 in terms of performance and data reliability. Also evaluate the RAID levels and determine which configuration provides the highest data reliability.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q15', 63),
  ('b1000000-0000-0000-0000-000000000064', 'a1000000-0000-0000-0000-000000000004', 'A banking system stores confidential customer account details in a database. Managers are given permission to view and update customer information for banking operations. Unauthorized employees should not be allowed to modify sensitive records. The database administrator manages these permissions to maintain data security and controlled access.

**Illustrate how GRANT and REVOKE commands can be applied to control user privileges in this system with an example query.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q16', 64),
  ('b1000000-0000-0000-0000-000000000065', 'a1000000-0000-0000-0000-000000000004', 'A user sends a video file from a laptop to a smart TV through a network. The data travels through a fiber optic cable, and both devices follow a common set of communication rules to successfully exchange information.

**Identify the components of the data communication system involved in this scenario and explain their roles.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q17', 65),
  ('b1000000-0000-0000-0000-000000000066', 'a1000000-0000-0000-0000-000000000004', 'A university connects multiple departments using a wired network to enable communication between students and faculty. During file transfer, a student sends a project file intended for a professor, but the file is incorrectly received by another student in a different department.

**Identify the issue in the communication system and indicate the characteristic of data communication that has been violated in this scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q18', 66),
  ('b1000000-0000-0000-0000-000000000067', 'a1000000-0000-0000-0000-000000000004', 'A company assigns subnets A, B, C, and D from the network 192.168.12.0. Each subnet must support communication within its range without overlap.

**Identify the network addresses of all four subnets.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q19', 67),
  ('b1000000-0000-0000-0000-000000000068', 'a1000000-0000-0000-0000-000000000004', 'In a small office network, the administrator manually assigns IP addresses to printers and servers, while user devices automatically receive IP addresses from a central system.

**Identify which devices use static IP assignment and which devices use dynamic IP assignment.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q20', 68),
  ('b1000000-0000-0000-0000-000000000069', 'a1000000-0000-0000-0000-000000000004', 'In a data communication system, different types of data flow are used to control the direction of data transmission between devices. Consider a scenario where two devices are connected in such a way that both can transmit and receive data at the same time without waiting for each other.

**Identify the type of data flow used in this system and differentiate it clearly from the other types of data flow used in data communication.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q21', 69),
  ('b1000000-0000-0000-0000-000000000070', 'a1000000-0000-0000-0000-000000000004', 'A company uses a network to transfer important documents between two offices. During transmission, some parts of the document are altered, resulting in incorrect information at the receiving end.

**Identify the issue in the communication system and indicate the characteristic of data communication that has been violated in this scenario.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q22', 70),
  ('b1000000-0000-0000-0000-000000000071', 'a1000000-0000-0000-0000-000000000004', 'A network administrator divides the network 192.168.12.0 into four equal subnets (A, B, C, and D) to allocate IP addresses efficiently across different departments. Each subnet has a defined network address and broadcast address.

**Based on the given subnetting, identify the network address of subnet B, the broadcast address of subnet C, and determine the subnet in which the IP address 192.168.12.200 belongs.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q23', 71),
  ('b1000000-0000-0000-0000-000000000072', 'a1000000-0000-0000-0000-000000000004', 'In an organization, network devices that require constant connectivity are configured manually, while temporary devices are assigned IP addresses by a network service.

**Indicate the type of IP assignment used for permanent devices and temporary devices.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q24', 72),
  ('b1000000-0000-0000-0000-000000000073', 'a1000000-0000-0000-0000-000000000004', 'A network diagram shows four nodes (Node 1, Node 2, Node 3, Node 4) where each node is directly connected to every other node, forming multiple communication links between devices.

**Analyze how data communication occurs in this network structure and explain how the connectivity between nodes affects reliability and data transmission. Also evaluate how the network behaves if one connection fails.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q25', 73),
  ('b1000000-0000-0000-0000-000000000074', 'a1000000-0000-0000-0000-000000000004', 'A university is designing a campus network that connects multiple buildings such as academic blocks, administration offices, and hostels. The network is structured using core, distribution, and access layers to ensure efficient communication and scalability. During operation, issues such as data congestion, uneven traffic distribution, and slow communication between departments are observed.

**Explain how the core, distribution, and access layers function in this campus network. Also describe how data flows between different LANs and discuss the role of load balancing in improving network performance.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q26', 74),
  ('b1000000-0000-0000-0000-000000000075', 'a1000000-0000-0000-0000-000000000004', 'A company plans to design a network for its office where communication between devices should be easy to manage, and adding or removing devices should not affect the overall network structure.

**Analyze the requirement and explain which network topology is most suitable. Also describe how this topology supports communication and network management.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q27', 75),
  ('b1000000-0000-0000-0000-000000000076', 'a1000000-0000-0000-0000-000000000004', 'A student attempts to access the website [www.campus.edu](http://www.campus.edu) from a campus network. The system must resolve the domain name into an IP address using the DNS hierarchy. During this process, multiple DNS servers are involved before the final IP address is obtained.

**Explain the step-by-step process of domain name resolution, clearly describing the role of root servers, TLD servers, and authoritative servers. Also, distinguish between forward and reverse domain name services.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q28', 76),
  ('b1000000-0000-0000-0000-000000000077', 'a1000000-0000-0000-0000-000000000004', 'A network administrator is designing networks for different organizations such as a multinational company, a large organization, and a small business. The administrator must assign suitable IPv4 address classes based on the size and requirement of each network.

**Analyze how IPv4 address classification supports this requirement and explain how different classes are suitable for networks of varying sizes and purposes.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q29', 77),
  ('b1000000-0000-0000-0000-000000000078', 'a1000000-0000-0000-0000-000000000004', 'A university is designing a campus network to connect multiple departments located in different buildings. The network must support high-speed data transfer, apply routing policies between departments, and provide reliable access to end-user devices like computers and printers.

**Analyze how the core layer, distribution layer, and access layer contribute to the efficient configuration and management of the campus network.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q30', 78),
  ('b1000000-0000-0000-0000-000000000079', 'a1000000-0000-0000-0000-000000000004', 'A company is assigned the IP address 192.168.10.25 with subnet mask 255.255.255.0.

**Identify the network address and host address, and indicate how the given IP address is divided into network and host portions using the subnet mask.**', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q31', 79),
  ('b1000000-0000-0000-0000-000000000080', 'a1000000-0000-0000-0000-000000000004', 'A multinational company operates offices in different cities and countries. The head office needs to communicate with two remote branches using a dedicated communication link for secure data transfer. At the same time, multiple other branch offices are interconnected through a shared network infrastructure that allows data exchange between many locations.

**Based on this scenario, identify and differentiate the types of WAN connections used for:**

* Communication between the head office and two specific branches.
* Communication among multiple branch offices.', 'Answer not provided in source text.', NULL, '22GE002 - Computational Problem Solving', 'Module Test-II Q32', 80),
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 'A student studies electric field lines around isolated positive and negative charges and observes distinct patterns in diagrams. The patterns differ significantly when multiple charges are introduced close to each other. The student attempts to relate these patterns to force interactions. The environment is ideal with no external disturbances.

**Integrate the observed field line patterns with the concept of electric force and infer how these visual representations indicate interaction behavior.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q1', 1),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'An engineering team must choose between representing electric interactions using force vectors or electric field concepts for system design. The system involves multiple charges and requires scalability. The team evaluates which approach provides better clarity and efficiency.

**Assess which representation is more effective and justify the reasoning based on system requirements.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q2', 2),
  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'A timing circuit in an electronic device depends on predictable charging and discharging of a capacitor. Engineers must ensure consistent timing intervals despite environmental changes. The capacitor interacts with resistive elements to control signal delays. Material properties influence overall timing stability.

**Integrate the role of capacitance and material properties to infer how timing consistency is achieved and maintained in such circuits.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q3', 3),
  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'An electronics company selects capacitors for consumer devices requiring reliability and safety. The choice must consider dielectric strength, durability, and cost. Performance under varying voltages is critical. Engineers must balance technical and practical constraints.

**Assess how capacitor selection influences reliability and justify the professional considerations involved.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q4', 4),
  ('c1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'A computational model is being developed to simulate electric field distribution for multiple charges. The system must calculate field intensity at various points in space. The charges are fixed and their positions are known. The model must follow a logical sequence to ensure accurate results.

**Formulate a logical procedure to compute electric field intensity at any point and justify the sequence of steps involved.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q5', 5),
  ('c1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000002', 'A system initially uses discrete charge calculations to determine electric field but plans to extend to continuous charge distributions. The complexity increases as the number of charges grows significantly. The designers must evaluate computational efficiency.

**Analyze the trade-off between discrete summation and continuous distribution methods and infer which approach is more efficient for large systems.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q6', 6),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 'A student assembles a circuit requiring a specific equivalent capacitance using multiple available capacitors. The available units vary in capacitance values. The student must logically combine them to achieve the desired outcome. Incorrect arrangement leads to mismatch in expected results.

**Construct a logical procedure to achieve the required equivalent capacitance using series and parallel combinations while ensuring correctness of arrangement.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q7', 7),
  ('c1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 'A power system incorporates capacitors for energy buffering but faces limitations in size and heat dissipation. Increasing capacitance improves performance but adds bulk. Designers must evaluate efficiency versus scalability. Trade-offs are necessary for optimal system performance.

**Evaluate the trade-offs involved in increasing capacitance and infer how system efficiency is impacted.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q8', 8),
  ('c1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000002', 'A charged spherical shell produces an electric field in surrounding space. A physicist models the flux through a closed surface enclosing the shell and attempts to relate it to the enclosed charge using integral expressions. They aim to verify whether the flux remains constant irrespective of surface radius. The situation requires linking surface integral formulation with charge distribution.

**Formulate the relationship between electric flux and enclosed charge and analyze how changing the Gaussian surface radius affects the computed flux.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q9', 9),
  ('c1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000002', 'A research team observes unexpected electric field readings inside a supposedly shielded conducting chamber. The chamber is grounded, but sensors indicate non-zero field values at certain points. The chamber walls are made of conducting material but have minor imperfections and joints. External charged objects are placed near the chamber during testing. The team must identify the cause of shielding failure.

**Diagnose the possible reasons for the presence of electric field inside the chamber and infer how imperfections in conductor properties or grounding influence electrostatic equilibrium conditions.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q10', 10),
  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000002', 'A laboratory setup measures electric flux through a tilted flat surface placed in a uniform electric field. The recorded flux values fluctuate unexpectedly when the surface orientation is changed slightly. The researchers suspect errors in interpreting angle dependence and projection of area vectors. They must diagnose whether the issue arises from incorrect mathematical formulation or conceptual misunderstanding of flux directionality.

**Analyze the inconsistency in measured flux values and infer the underlying conceptual or computational error related to surface orientation and field interaction.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q11', 11),
  ('c1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000002', 'A dipole consisting of charges +q and −q separated by a small distance is placed in a uniform electric field. The system is free to rotate about its center. The angle between the dipole axis and the electric field varies during motion. Engineers are studying how torque depends on orientation for micro-actuator applications. They must model rotational behavior based on electric parameters.

**Formulate the relationship governing torque on the dipole and determine how angular variation influences the rotational tendency, integrating the concept of dipole moment into the analysis.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q12', 12),
  ('c1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000002', 'An electrostatic sensor system is being designed in a research lab where point charges are arranged along a straight axis to generate a controlled electric environment. The design team observes that varying the spacing between charges significantly alters the work required to move a test charge between two points. They also note that maintaining a uniform electric field is critical for accurate sensing. The system must minimize energy consumption while ensuring measurable potential differences. The engineer must decide the optimal configuration using relationships between electric field and potential.

**Determine an optimal configuration strategy that minimizes energy expenditure while maintaining measurable potential difference, and justify how electric field–potential relationships guide this design decision.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q13', 13),
  ('c1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000002', 'A copper wire of uniform cross-section is connected to a battery in a laboratory setup where the length of the wire is doubled while keeping the applied potential difference constant; simultaneously, temperature rises slightly due to prolonged current flow, altering charge carrier mobility; experimental readings show a reduction in current despite unchanged voltage; microscopic observations indicate variations in drift velocity; the system is analyzed to understand how geometry and temperature influence conduction; additional data suggests resistivity variation with temperature; the circuit is otherwise stable and free from external disturbances.

**Determine how the current changes quantitatively and infer the combined impact of length and temperature variation on drift velocity and resistance; integrate the relationships between resistivity, geometry, and microscopic charge motion to justify the observed reduction in current under constant voltage conditions.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q14', 14),
  ('c1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000002', 'A high-voltage experimental setup exhibits unexpected variations in electric potential across a region where equipotential surfaces were assumed to be evenly spaced. Measurements reveal that the potential gradient is inconsistent, and charged particles deviate from predicted paths. The system includes both discrete charges and a continuous charge distribution. Engineers suspect an error in modeling the potential field. The inconsistency affects the calculated electrical energy stored in the system.

**Analyze the possible causes of the observed inconsistencies in potential gradient and particle motion, and infer how modeling errors in charge distribution affect system energy interpretation.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q15', 15),
  ('c1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000002', 'An engineer designs a long-distance power transmission system using wires of varying materials where conductivity differs significantly; increasing wire thickness improves current capacity but raises cost and weight; environmental temperature variations affect resistivity across regions; the system must maintain efficient energy transfer with minimal power loss; alternative materials offer higher conductivity but lower mechanical durability; trade-offs between efficiency, cost, and reliability must be evaluated before final implementation.

**Evaluate the trade-offs involved in selecting conductor material and dimensions; prioritize design decisions that optimize power efficiency while balancing cost and environmental constraints, and justify the final selection using conductivity and resistance principles.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q16', 16),
  ('c1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000002', 'A science communicator explains magnetism using a crowd analogy where each person represents a small magnetic region. Initially, people face random directions, representing an unmagnetized state. When music plays, people align in one direction, and when the music stops, the alignment disappears. This analogy is used to explain the behavior of magnetic materials.

**Map each element of the analogy to actual physical concepts such as domains, magnetization, and external field. Also, explain what causes the loss of alignment when the external influence is removed.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q17', 17),
  ('c1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000002', 'A physics textbook states that magnetic fields are produced only when electric charges move through a conductor. A researcher questions this by pointing out that some materials exhibit magnetism even without visible current flow.

**Identify the hidden assumption in the textbook statement and explain how atomic-level motion provides a more complete explanation of magnetism.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q18', 18),
  ('c1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000002', 'An embedded systems engineer is designing a circuit that requires a specific equivalent capacitance using multiple capacitors of known values. The available components include capacitors of varying ratings, and the final design must meet strict space and performance constraints. The engineer must logically determine the arrangement strategy before implementation.

**Formulate the logical sequence required to achieve the desired equivalent capacitance using the available components while ensuring design constraints are satisfied.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q19', 19),
  ('c1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000002', 'A robotics system requires stable voltage supply during sudden load variations. Engineers consider adding capacitors to mitigate voltage drops but must decide specifications under limited design space and cost constraints.

**Recommend a strategic approach to selecting capacitor specifications to ensure voltage stability under the given constraints.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q20', 20),
  ('c1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000002', 'During a classroom discussion, a student argues that since isolated electric charges exist and produce electric fields, isolated magnetic charges (monopoles) should also exist. The student supports this by explaining that even when a charged object is divided, charge still exists independently. Another student responds by cutting a bar magnet into smaller pieces and observing that each piece still has both north and south poles.

**Explain why the first argument appears logically correct based on electrostatics. Then, using experimental and theoretical reasoning, explain why isolated magnetic poles are not observed.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q21', 21),
  ('c1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000002', 'An engineer claims that magnetic fields can exist independently in space even without current or motion. Another engineer disagrees, stating that magnetic fields always originate from charge motion or intrinsic properties of particles.

**Evaluate the correctness of the first claim using principles of magnetic field generation and justify your answer.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q22', 22),
  ('c1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000002', 'A communication circuit uses capacitors to filter noise and stabilize voltage signals in a data transmission system. Engineers integrate capacitors at multiple stages, observing that certain placements improve signal clarity while others cause unintended delays. The behavior is linked to charging and discharging cycles interacting with signal frequency.

**Integrate the concepts of charging and discharging processes with signal behavior to infer how capacitor placement affects system performance in the given circuit.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q23', 23),
  ('c1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000002', 'A consumer electronics company must choose between using capacitors or batteries for a wearable device that requires quick bursts of energy but minimal long-term storage. The decision impacts cost, reliability, and user experience.

**Assess the suitability of capacitors for this application and justify the decision considering professional design priorities.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q24', 24),
  ('c1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000002', 'A charged particle moves through a uniform magnetic field with velocity perpendicular to the field. Engineers observe that the particle follows a curved path instead of moving in a straight line. The radius of curvature changes when either the magnetic field strength or particle velocity is altered. The system is used in particle beam steering applications.

**Analyze how magnetic field strength and particle velocity influence the trajectory of the particle and determine the relationship governing the radius of curvature.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q25', 25),
  ('c1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000002', 'A research laboratory is designing a cyclotron to accelerate charged particles for material analysis. Engineers must select appropriate magnetic field strength and operating frequency to ensure resonance conditions are maintained. Increasing particle energy introduces practical limitations related to relativistic effects and machine size.

**Evaluate the trade-offs involved in cyclotron design and determine the factors that limit maximum particle energy.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q26', 26),
  ('c1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000002', 'A current-carrying conductor is placed in a magnetic field and experiences a force. Engineers observe that changing the direction of current reverses the direction of motion. Similarly, reversing the magnetic field also changes the force direction. The system is being used in an electromechanical actuator.

**Formulate the relationship between current, magnetic field, and force, and determine how directional changes influence actuator motion.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q27', 27),
  ('c1000000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000002', 'A loudspeaker uses a voice coil placed inside a magnetic field. Audio signals produce alternating currents through the coil, causing vibrations that generate sound. Engineers must optimize magnetic field strength and coil design to improve efficiency while minimizing power consumption.

**Analyze how magnetic force generation contributes to sound production and evaluate design factors affecting efficiency.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q28', 28),
  ('c1000000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000002', 'A moving coil galvanometer is used to detect small currents in a measurement system. The instrument relies on torque generated by a current-carrying coil placed in a magnetic field. Engineers notice calibration errors due to changes in magnetic field strength and spring characteristics.

**Determine how magnetic field strength and restoring torque influence instrument sensitivity and accuracy.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q29', 29),
  ('c1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000002', 'A measurement laboratory considers replacing traditional analog galvanometers with digital sensing systems. While digital systems provide higher accuracy and automation, analog instruments remain useful for visualizing trends and transient behavior.

**Assess the advantages and limitations of analog galvanometers compared with digital measurement systems.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q30', 30),
  ('c1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000002', 'An electron beam enters a region containing both electric and magnetic fields arranged perpendicular to each other. Engineers observe that under specific conditions the beam travels undeflected. This principle is used in velocity selection devices.

**Determine the condition for undeflected motion and explain how electric and magnetic forces balance each other.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q31', 31),
  ('c1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000002', 'A mass spectrometer separates ions according to their charge-to-mass ratio. The instrument uses magnetic fields to bend particle trajectories and detectors to identify ion species. Engineers aim to improve resolution while maintaining throughput.

**Analyze how magnetic deflection enables ion separation and evaluate factors affecting measurement resolution.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q32', 32),
  ('c1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000002', 'A semiconductor research team investigates the behavior of electrons emitted from a metal surface when illuminated by light of varying frequencies. They observe that increasing intensity increases the number of emitted electrons, while increasing frequency affects their kinetic energy. The experiment is conducted to verify quantum models of light.

**Analyze the observations and determine how frequency and intensity independently influence the photoelectric effect.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q33', 33),
  ('c1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000002', 'A solar energy company develops photovoltaic devices using materials with different work functions. Engineers must maximize electron emission efficiency while minimizing energy losses. The design depends strongly on incident light characteristics and material properties.

**Evaluate the factors influencing photoelectric emission efficiency and recommend a suitable design strategy.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q34', 34),
  ('c1000000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000002', 'A scientist performs a photoelectric experiment using monochromatic light. Below a certain frequency no electrons are emitted regardless of intensity. Above this threshold, emission occurs immediately.

**Interpret the significance of threshold frequency and explain why intensity alone cannot initiate emission below the threshold.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q35', 35),
  ('c1000000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000002', 'A research laboratory compares classical wave theory with quantum theory to explain photoelectric observations. Classical predictions fail to account for certain experimental results.

**Analyze the limitations of classical theory and justify how quantum theory resolves the discrepancies.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q36', 36),
  ('c1000000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000002', 'An X-ray tube accelerates electrons toward a metal target. Engineers observe that increasing accelerating voltage produces X-rays with shorter wavelengths. Material selection influences characteristic spectral lines.

**Determine how accelerating voltage affects X-ray wavelength and analyze the role of target material in spectrum formation.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q37', 37),
  ('c1000000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000002', 'A medical imaging facility uses X-rays for diagnostic purposes. Higher-energy X-rays improve penetration but may increase biological risks. Engineers must balance image quality, patient safety, and equipment efficiency.

**Evaluate the trade-offs involved in selecting X-ray operating conditions for medical imaging applications.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q38', 38),
  ('c1000000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000002', 'A physicist studies the scattering of X-rays by electrons and observes an increase in wavelength after scattering. The wavelength shift depends on scattering angle but not on incident wavelength. Experimental results support the particle nature of radiation.

**Analyze the observations and explain how Compton scattering supports the photon model of light.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q39', 39),
  ('c1000000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000002', 'A radiation detection system is designed using principles of photon–electron interaction. Engineers must determine which interaction mechanism dominates under different energy conditions.

**Assess how photon energy influences scattering behavior and identify conditions under which Compton scattering becomes significant.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q40', 40),
  ('c1000000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000002', 'A quantum system confines particles within a finite region of space. Measurements reveal discrete energy levels instead of a continuous spectrum. Engineers compare the system with classical predictions and note major differences in particle behavior.

**Analyze why energy quantization occurs and determine how confinement influences allowable energy states.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q41', 41),
  ('c1000000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000002', 'A nanotechnology device uses quantum confinement to control electron behavior. As device dimensions shrink, quantum effects become increasingly important. Engineers must understand how confinement affects energy levels and electronic properties.

**Evaluate the influence of quantum confinement on particle energy and device performance.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q42', 42),
  ('c1000000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000002', 'A particle is confined in a one-dimensional infinite potential well. The wave function must satisfy boundary conditions at the walls. Researchers seek to determine allowable energy states and probability distributions.

**Formulate the conditions governing the wave function and analyze how boundary constraints lead to quantized energy levels.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q43', 43),
  ('c1000000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000002', 'A quantum computing research group studies probability distributions associated with particle wave functions. The interpretation of measurement outcomes depends on the square of the wave function magnitude.

**Analyze the physical significance of the wave function and explain how probability density is obtained.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q44', 44),
  ('c1000000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000002', 'A material science laboratory investigates electron diffraction using crystalline samples. Experimental observations reveal interference patterns similar to those produced by waves. Researchers compare results with de Broglie predictions.

**Analyze how diffraction experiments support wave–particle duality and determine the relationship between momentum and wavelength.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q45', 45),
  ('c1000000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000002', 'An electron microscope relies on the wave nature of electrons to achieve high resolution. Engineers increase electron momentum to improve imaging performance while considering practical constraints.

**Evaluate how electron wavelength influences resolution and determine the effect of increasing momentum on imaging capability.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q46', 46),
  ('c1000000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000002', 'A quantum particle is described by a wave packet with uncertainty in both position and momentum. Measurements indicate that reducing uncertainty in position increases uncertainty in momentum. Engineers must account for this limitation in nanoscale devices.

**Analyze the relationship between position and momentum uncertainties and explain its significance in quantum measurements.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q47', 47),
  ('c1000000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000002', 'A semiconductor nanodevice requires precise control of electron localization. Designers attempt to confine electrons to very small regions while maintaining predictable momentum characteristics. Quantum mechanical limitations affect achievable performance.

**Evaluate how the uncertainty principle constrains electron confinement and justify its impact on nanoscale device design.**', 'Answer not provided in source text.', NULL, '22PH202 - Electromagnetism and Modern Physics', 'Module Test-I Q48', 48)

ON CONFLICT (id) DO UPDATE SET
  subject_id = EXCLUDED.subject_id,
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  image_url = EXCLUDED.image_url,
  "references" = EXCLUDED."references",
  notes = EXCLUDED.notes,
  order_index = EXCLUDED.order_index;
