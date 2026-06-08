INSERT INTO questions (id, subject_id, question, answer, image_url, "references", notes, order_index) VALUES
  ('dce00000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005', 'A telemetry system converts decimal data into binary and then into octal for transmission. Engineers observe incorrect outputs when fractional values are processed. The system uses standard conversion techniques but suffers from truncation and grouping inconsistencies, affecting final transmission accuracy.
   Diagnose the cause of incorrect outputs and infer how binary conversion errors impact octal representation.', 'The incorrect outputs in processing fractional decimal values during decimal-to-binary-to-octal conversion are caused by two primary issues:

1. **Truncation and Rounding Errors (Precision Limits)**: Many decimal fractions (e.g., $0.1_{10}$ or $0.2_{10}$) do not have a finite representation in binary. They become repeating/periodic binary fractions:
   $$0.1_{10} = 0.00011001100110011..._2$$
   When a telemetry system truncates this sequence to a fixed bit-width (e.g., 8 or 16 bits) instead of rounding, it introduces a significant truncation error.

2. **Grouping Inconsistencies**: To convert binary to octal, bits must be grouped into triads (sets of 3).
   * **For the integer portion**: Grouping must start from the binary point and move **leftwards** (padding with leading zeros if necessary).
   * **For the fractional portion**: Grouping must start from the binary point and move **rightwards** (padding with trailing zeros if necessary).
   
   If engineers incorrectly group the fractional bits from right-to-left, or fail to pad the last group with trailing zeros, it completely alters the resulting octal representation.

**Example of Grouping Inconsistency**:
For binary fraction $0.00011_2$:
* **Correct (Left-to-Right)**: $.000 | 110_2 \rightarrow 0.06_8$ (padding with $0$ on the right)
* **Incorrect (Right-to-Left / Shifted)**: $.000 | 011_2 \rightarrow 0.03_8$ (shifting the group value)

```mermaid
graph TD
    A["Decimal Fraction: 0.1"] --> B["Infinite Binary: 0.000110011..."]
    B --> C{"Correct Grouping?"}
    C -->|Yes: Left-to-Right| D["$.000 | 110 | 011..._2 \rightarrow 0.063..._8"]
    C -->|No: Right-to-Left| E["$.000 | 011..._2 \rightarrow 0.03..._8 Grouping Error"]
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q1', 1),
  ('dce00000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000005', 'A calculator device internally processes numbers in binary but must display outputs in a user-friendly format. The display has limited space, and binary representation appears lengthy. The system designer must choose between octal and hexadecimal formats for output representation while ensuring accuracy and minimal processing overhead.
   Determine the most appropriate number system for display and justify the decision based on efficiency and usability.', 'Hexadecimal representation is the most appropriate number system for the calculator display.

### Justification:

1. **Space Efficiency (Compression Ratio)**:
   * **Binary** requires 8 characters for a byte (e.g., $11011011_2$).
   * **Octal** ($2^3 = 8$) groups bits into 3s, requiring 3 characters for a byte (e.g., $333_8$), but does not align with byte boundaries ($8 \text{ bits} \bmod 3 \neq 0$).
   * **Hexadecimal** ($2^4 = 16$) groups bits into 4s, requiring exactly 2 characters for a byte (e.g., $DB_{16}$). It provides a 4:1 compression ratio, saving valuable display space.

2. **Perfect Alignment with Byte Boundaries**:
   Modern computer architectures are byte-oriented (8, 16, 32, 64 bits). Hexadecimal fits these boundaries perfectly since 1 byte = 2 hex digits. Octal requires spanning digits across byte boundaries, creating processing overhead in conversion logic.

| Bit Width | Binary Representation | Octal Representation (3-bit groups) | Hexadecimal Representation (4-bit groups) |
|---|---|---|---|
| 8-bit | `11111111` | `377` (3 digits) | `FF` (2 digits) |
| 16-bit | `1111111111111111` | `177777` (6 digits) | `FFFF` (4 digits) |', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q2', 2),
  ('dce00000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000005', 'A system processes signals through encoder, comparator, and decoder modules. Incorrect sequencing leads to wrong outputs.
   Formulate the correct processing sequence and infer the impact of improper sequencing.', 'The correct processing sequence for signal conversion and evaluation is:

```mermaid
graph LR
    Input[Analog/Request Signal] --> Encoder[Encoder Module]
    Encoder -->|Binary Code| Comparator[Comparator Module]
    Comparator -->|Comparison Result| Decoder[Decoder Module]
    Decoder --> Output[Controlled Device Output]
```

1. **Encoder**: Converts the multiple physical request/input lines into a compact binary representation.
2. **Comparator**: Evaluates the binary representation against a reference state (e.g., checking priority or set limits).
3. **Decoder**: Decodes the output of the comparison to select and activate the corresponding output device/actuator.

### Impact of Improper Sequencing:
If this sequence is violated (e.g., routing raw signals to the comparator before encoding), the comparator would require a massive number of input lines ($N$ instead of $\log_2 N$), leading to excessive logic gate overhead. If decoding occurs before comparison, the system cannot perform conditional logic on the active signals, resulting in wrong system outputs or race conditions.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q3', 3),
  ('dce00000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000005', 'A control system receives multiple request signals and must encode them into binary form for processing. When multiple requests occur simultaneously, the system produces incorrect outputs due to lack of priority handling. The designer must improve the encoding mechanism.
   Determine the appropriate encoder type and justify the decision based on handling multiple inputs efficiently.', 'The system must use a **Priority Encoder** (such as the 74LS148 8-to-3 Priority Encoder).

### Justification:
A standard binary encoder assumes that only one input line is active at any given time. If multiple request lines are activated simultaneously (e.g., inputs $D_2$ and $D_4$ are both 1), a standard encoder produces an invalid, combined output (e.g., $110_2$, representing input 6, which was not requested).

A **Priority Encoder** resolves this concurrency by assigning a priority level to each input. If multiple inputs are active, it outputs the binary code of the input with the highest priority, ignoring lower-priority requests. It also provides a "Valid" ($V$) status output to indicate whether any request is active.

```
Inputs: D3=1, D2=1, D1=0, D0=1
Priority Encoder (D3 has highest priority)
Output Y1 Y0 = 11 (Binary 3)
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q4', 4),
  ('dce00000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 'A processing unit converts inputs from multiple number systems into binary, performs operations, and converts results back into original formats. Improper sequencing has caused incorrect outputs in previous tests. The system must ensure proper data flow and accuracy.
   Formulate a correct sequence for number system conversion and infer the impact of incorrect sequencing.', 'The correct sequence for a conversion-processing unit is:

```mermaid
graph TD
    A[Inputs: Octal / Hex / Decimal] --> B[Input Converter: Convert all to Binary]
    B --> C[Processing Unit: Execute arithmetic in Binary/2''s Complement]
    C --> D[Output Converter: Convert Binary result back to target system]
```

1. **Normalize to Binary**: Translate all heterogeneous inputs (Octal, Hex, BCD) into standard Binary.
2. **Execute Operations**: Perform arithmetic and logic operations in the binary domain (utilizing 2''s complement for uniform addition/subtraction).
3. **Format Output**: Convert the binary result back to the desired output format (e.g., BCD for displays, Hex for registers).

### Impact of Incorrect Sequencing:
Performing arithmetic operations directly between different number formats (e.g., adding an octal number directly to a hexadecimal representation without normalizing to a common base) leads to positional weight mismatches, rounding propagation, and incorrect intermediate carry generation.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q5', 5),
  ('dce00000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000005', 'A program converts binary values into decimal but fails when fractional values are present, producing incomplete results. The integer portion is processed correctly using positional weights, but the fractional portion is ignored. The developer must identify missing logic affecting correctness.
   Identify the error in the program and determine its effect on output accuracy.', 'The error lies in the **fractional conversion algorithm**, which fails to apply negative powers of 2 for bits to the right of the radix point. 

The developer likely used integer divisions (`/ 10` and `% 10`) instead of the correct fractional weighting technique:
$$d = \sum_{i=1}^{n} b_{-i} \times 2^{-i}$$

### Effect on Output Accuracy:
Ignoring the fractional portion results in a severe truncation error. For example, the binary value $11.01_2$ represents:
$$(1 \times 2^1) + (1 \times 2^0) + (0 \times 2^{-1}) + (1 \times 2^{-2}) = 2 + 1 + 0 + 0.25 = 3.25_{10}$$
Without fractional processing, the output is truncated to $3_{10}$, losing $0.25$ ($7.7\%$ error rate). The error grows exponentially for high-precision telemetry data.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q6', 6),
  ('dce00000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000005', 'A comparator circuit incorrectly indicates equality for unequal inputs due to improper handling of higher-order bits and cascading logic errors.
   Diagnose the issue and infer how it affects comparison accuracy.', 'The issue is a **cascading logic error** in the multi-bit comparator, where lower-order bit comparisons are allowed to override higher-order bit comparisons.

In a cascaded comparator, the comparison starts from the Most Significant Bit (MSB). The cascading inputs from a lower-order stage ($A > B$, $A < B$, $A = B$) must only be evaluated if all higher-order bits are equal. If the MSB stage fails to lock the output when $A_{MSB} \neq B_{MSB}$, the LSB stage''s output propagates and falsely indicates equality.

### Impact on Comparison Accuracy:
If the system compares $A = 10_2$ and $B = 01_2$:
* $A_1 = 1, B_1 = 0 \implies A > B$ (MSB level)
* $A_0 = 0, B_0 = 1 \implies A < B$ (LSB level)
If LSB cascading logic takes priority, the system will incorrectly output $A < B$ or $A = B$, causing control path failures.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q7', 7),
  ('dce00000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000005', 'A decoder used in a display system activates more than one output for a given input due to incorrect logic design, causing display errors.
   Identify the fault and determine its effect on system functionality.', 'The fault is a **logic hazard (race condition)** or an **address line decoder fault** where the inputs transition asynchronously, or selection lines lack active-low/high gate isolation.

When selection line inputs change (e.g., from $01_2$ to $10_2$), one gate may turn ON faster than another turns OFF due to differences in propagation delays ($t_{pd}$). This creates a transient state where both output lines are active simultaneously.

### Effect on System Functionality:
In a display driver (e.g., BCD-to-7-segment decoder), activating multiple outputs simultaneously illuminates incorrect segments, causing garbled digits. In memory systems, activating multiple word lines causes a bus conflict (multiple memory cells driving the data bus at once), which can permanently damage components due to high short-circuit currents.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q8', 8),
  ('dce00000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000005', 'A digital system integrates signed number representation into arithmetic operations and must ensure consistency and accuracy across all computations.
   Design a consistent model for signed number representation and justify its effectiveness.', 'The most consistent and robust model for signed number representation in computer arithmetic is the **2''s Complement** representation.

```mermaid
graph TD
    A[Signed Number Models] --> B[Sign-Magnitude: Simple but has +0 and -0]
    A --> C[1''s Complement: Has +0 and -0, complex subtraction]
    A --> D[2''s Complement: Single 0, subtraction via addition. PREFERRED]
```

### Justification:
1. **Single Representation of Zero**: Unlike Sign-Magnitude and 1''s Complement (which have $+0$ and $-0$), 2''s Complement has a unique representation for zero ($0000_2$ in 4-bit), preventing logical ambiguities.
2. **Simplified ALU Design**: Subtraction is performed using the same hardware as addition. To compute $A - B$, the ALU simply adds $A$ to the 2''s complement of $B$:
   $$A - B = A + (\bar{B} + 1)$$
   This eliminates the need for separate subtraction circuitry.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q9', 9),
  ('dce00000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000005', 'A system designer evaluates multiplexers and demultiplexers for scalable data routing applications.
    Assess trade-offs and recommend an optimal design approach.', 'Multiplexers (MUX) and Demultiplexers (DEMUX) serve opposite routing functions.

### Trade-offs:
* **Multiplexer (Many-to-One)**: Selects one of $2^n$ inputs using $n$ select lines and routes it to a single output.
* **Demultiplexer (One-to-Many)**: Takes a single input and routes it to one of $2^n$ outputs based on $n$ select lines.

```
MUX:   [I0, I1, I2, I3] ---> [ Select Lines ] ---> [ Output Y ]
DEMUX: [ Input D ] --------> [ Select Lines ] ---> [ Y0, Y1, Y2, Y3 ]
```

### Recommendation:
For scalable data routing, a combined **Bus Architecture** utilizing tri-state buffers and decoders is optimal. Instead of using massive multiplexers which increase routing trace congestion exponentially, a shared bus where transmitters use tri-state buffers (controlled by a decoder) ensures simple $O(N)$ scalability.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q10', 10),
  ('dce00000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000005', 'A system computes (-4) + (-2) using 4-bit 2’s complement representation and must verify the correctness of the result within range limits.
    Determine the result using 2’s complement and justify the steps logically.', 'We compute $(-4) + (-2)$ using 4-bit 2''s complement representation:

1. **Represent -4**:
   * $+4_{10} = 0100_2$
   * 1''s complement = $1011_2$
   * 2''s complement = $1011 + 1 = 1100_2$

2. **Represent -2**:
   * $+2_{10} = 0010_2$
   * 1''s complement = $1101_2$
   * 2''s complement = $1101 + 1 = 1110_2$

3. **Perform Addition**:
   ```
     1100  (-4)
   + 1110  (-2)
   -------
    (1)1010  (Discard the carry-out bit)
   ```
   The 4-bit result is $1010_2$.

4. **Justification**:
   The MSB of $1010_2$ is $1$, indicating a negative number.
   * Subtract 1: $1010 - 1 = 1001_2$
   * Invert bits: $0110_2 = 6_{10}$
   * Thus, $1010_2 = -6_{10}$.
   This is correct, and falls within the 4-bit signed range of $[-8, +7]$.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q11', 11),
  ('dce00000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000005', 'A 4:1 multiplexer must be implemented using Boolean logic to correctly select one input based on select lines.
    Analyse the Boolean expression and justify logic.', 'A 4:1 Multiplexer selects one of four inputs ($I_0, I_1, I_2, I_3$) using two select lines ($S_1, S_0$).

### Boolean Expression:
$$Y = \bar{S_1}\bar{S_0}I_0 + \bar{S_1}S_0I_1 + S_1\bar{S_0}I_2 + S_1S_0I_3$$

### Logic Justification:
Each product term represents a unique minterm of the select lines. Since $S_1$ and $S_0$ can only form one active minterm (logic ''1'') at any time, only one AND gate is enabled. 
* If $S_1S_0 = 00$, the first term simplifies to $1 \cdot I_0$, while others are $0$. Hence, $Y = I_0$.
* The output OR gate combines these terms, guaranteeing that only the selected input is propagated to the output.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q12', 12),
  ('dce00000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000005', 'A system designer evaluates using basic gates versus standard combinational modules for building scalable circuits.
    Assess trade-offs and recommend an optimal design approach.', '### Trade-off Assessment:
* **Basic Gates (AND, OR, NOT)**:
  * *Pros*: Maximum customizability; logic can be fully minimized.
  * *Cons*: High chip count, complex routing, increased propagation delays, and higher power consumption.
* **Standard Combinational Modules (Adders, MUX, Decoders)**:
  * *Pros*: Integrated design, optimized internal propagation path, reduced board space, and simplified testing.
  * *Cons*: Less flexible for non-standard logic.

### Recommendation:
For scalable circuit designs, **Standard Combinational Modules** are highly recommended. They reduce design complexity, lower propagation delay, and allow hierarchical design which is essential for scaling complex systems.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q13', 13),
  ('dce00000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000005', 'A system designer evaluates ALU architectures for efficient and scalable processing.
    Assess trade-offs and recommend optimal design.', '### ALU Architecture Trade-offs:
1. **Accumulator-based ALU**: Uses a single register (Accumulator) for one operand and the result. Highly silicon-efficient but limits throughput since every operation must cycle through the accumulator.
2. **Register-to-Register (Load-Store) ALU**: Operands are fetched from a general-purpose register file. High throughput and supports pipelining, but requires more control logic and register file area.
3. **Carry-Lookahead (CLA) vs. Ripple Carry Adder (RCA)**: RCA has $O(N)$ delay due to carry propagation. CLA generates carries in parallel ($O(1)$ delay) but requires significant gate area.

### Recommendation:
For scalable and efficient processing, a **Register-to-Register ALU with a Carry-Lookahead Adder** is optimal. This design supports pipelining and avoids the accumulator bottleneck.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q14', 14),
  ('dce00000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000005', 'A Boolean function F = A''B + AB'' must be implemented and verified for correctness using logic gates and truth table analysis.
    Determine the circuit implementation and justify its behavior logically.', 'The Boolean function $F = \bar{A}B + A\bar{B}$ represents a 2-input **XOR (Exclusive-OR) gate**.

### Truth Table:
| A | B | $\bar{A}$ | $\bar{B}$ | $\bar{A}B$ | $A\bar{B}$ | $F$ |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | 1 | 0 | 0 | **0** |
| 0 | 1 | 1 | 0 | 1 | 0 | **1** |
| 1 | 0 | 0 | 1 | 0 | 1 | **1** |
| 1 | 1 | 0 | 0 | 0 | 0 | **0** |

### Circuit Implementation:
Implemented using two NOT gates, two AND gates, and one OR gate.
* Output is high ($1$) if and only if the inputs $A$ and $B$ are different.
* If both inputs are equal, the output is low ($0$).', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q15', 15),
  ('dce00000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000005', 'A processor integrates an ALU combining arithmetic and logical units controlled by instruction signals.
    Design a coherent ALU model and justify effectiveness.', 'An Arithmetic Logic Unit (ALU) combines arithmetic (Addition, Subtraction) and logical (AND, OR, XOR) operations.

```mermaid
graph TD
    A[Input A] --> C[Arithmetic Unit: Add/Sub]
    B[Input B] --> C
    A --> D[Logic Unit: AND/OR/XOR]
    B --> D
    C --> E[4:1 Multiplexer]
    D --> E
    S[Select Signals: S1, S0] --> E
    E --> F[ALU Output]
```

### Justification of Effectiveness:
By using a central multiplexer at the output stage, both units can process the inputs in parallel, and the control unit simply selects the active output based on the instruction opcode. This modularity ensures that adding new logical operations does not affect the arithmetic paths, maximizing performance and ease of debugging.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q16', 16),
  ('dce00000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000005', 'A digital circuit designer is selecting between a latch and a flip flop for a system that requires controlled data storage only at specific time intervals. The system operates in a noisy environment where inputs may fluctuate frequently.
    Establish why a flip flop is preferred over a latch in this case.', 'A **Flip-Flop** is preferred over a Latch in noisy environments.

### Reason:
* **Latch (Level-Triggered)**: Open and transparent for the entire duration of the clock pulse. If the input fluctuates or contains noise while the clock is high, the noise passes directly to the output, risking system instability.
* **Flip-Flop (Edge-Triggered)**: Samples the input only at the precise transition edge of the clock (positive or negative transition). Since this window is extremely narrow (picoseconds), any noise occurring before or after the clock edge is completely ignored, ensuring stable state transitions.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q17', 17),
  ('dce00000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000005', 'A D flip flop receives a data input that changes continuously, but the output updates only when a clock pulse arrives.
    Determine the reason for this controlled behavior.', 'The controlled behavior of a D flip-flop is due to **edge-triggering circuitry**. 

Internally, an edge-triggered D flip-flop uses a **Master-Slave configuration** (or a narrow pulse-generator circuit using propagation delays). 
* When the clock is low, the Master latch is open, sampling the input, while the Slave latch is locked.
* At the rising edge of the clock, the Master latch locks its state, and the Slave latch opens, transferring the locked state to the output $Q$.
This design ensures that output transitions occur only during the clock transition, preventing any direct path from input to output.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q18', 18),
  ('dce00000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000005', 'A counter circuit used in a system begins to produce incorrect outputs due to delay in signal propagation between flip flops in a ripple configuration.
    Relate this issue to the type of counter used and suggest the improvement.', 'The issue of propagation delay in a ripple counter is known as **clock skew / carry propagation delay**.

* **Root Cause**: In an asynchronous (ripple) counter, the clock input of each flip-flop is driven by the output of the preceding flip-flop. As a result, the delay of each flip-flop accumulates:
  $$t_{total} = N \times t_{pd}$$
  During transitions (e.g., from $0111_2$ to $1000_2$), the counter passes through incorrect intermediate states (glitches), causing errors in high-speed circuits.
* **Improvement**: Replace the ripple counter with a **Synchronous Counter**. In a synchronous counter, all flip-flops share the same clock signal and update their states simultaneously, reducing the total delay to a single flip-flop propagation delay ($t_{pd}$).', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q19', 19),
  ('dce00000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000005', 'A 4-bit binary counter is used to count pulses from a sensor in an automated system.
    Identify the maximum count value before it resets.', 'A 4-bit binary counter has 4 flip-flops and can represent $2^4 = 16$ distinct states.

* **Maximum Count Value**: The maximum value it can hold is $2^4 - 1 = 15_{10}$, which is represented in binary as:
  $$1111_2$$
* **Reset Behavior**: On receiving the 16th clock pulse, the counter rolls over and resets back to:
  $$0000_2$$', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q20', 20),
  ('dce00000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000005', 'A latch changes output whenever the input changes, causing instability in a noisy environment.
    Relate this behavior to the need for flip flops.', 'A latch is **level-sensitive**, meaning its output tracks its input continuously as long as the clock enable signal is high.

### Relation to the Need for Flip-Flops:
In sequential logic feedback loops (like counters or shift registers), the output of a storage element is processed and fed back as its input. If a level-sensitive latch is used, the data can loop multiple times within a single clock pulse, causing uncontrollable oscillations. 

Flip-flops, being **edge-triggered**, break this loop by capturing the state only at the clock edge, allowing the output to change only once per clock cycle, stabilizing the feedback loop.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q21', 21),
  ('dce00000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000005', 'An SR latch receives inputs S = 1 and R = 1 simultaneously.
    Identify the condition produced.', 'When inputs $S = 1$ and $R = 1$ are applied simultaneously to an SR latch, it produces an **invalid (forbidden) state**.

### Logic Analysis:
* **NOR Latch**: Both outputs $Q$ and $\bar{Q}$ are forced to $0$ simultaneously. This violates the fundamental complementation rule ($Q = \bar{\bar{Q}}$).
* **NAND Latch**: Both outputs $Q$ and $\bar{Q}$ are forced to $1$.
* **Metastability**: When $S$ and $R$ transition back to $0$ at the same time, the latch enters a race condition. The output will oscillate or settle in an unpredictable state depending on minor gate propagation mismatches, leading to metastability.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q22', 22),
  ('dce00000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000005', 'A digital communication system requires conversion of parallel data into serial form for transmission over a single communication line. A shift register is used, where data bits are shifted one by one with each clock pulse until the entire data is transmitted.
    Establish how shift registers enable efficient data transmission in such systems.', 'Shift registers enable efficient data transmission by converting parallel data to serial data (PISO).

```mermaid
graph LR
    P[Parallel Inputs: D0-D3] -->|Load| SR[Shift Register]
    CLK[Clock Pulse] --> SR
    SR -->|Shift Out| S[Serial Out Line]
```

### Explanation:
Instead of running $N$ parallel wires over long distances, which increases cost, weight, and crosstalk, a **Parallel-In Serial-Out (PISO)** shift register loads the data in parallel and shifts it out bit-by-bit over a single line. At the receiving end, a **Serial-In Parallel-Out (SIPO)** shift register reconstructs the parallel word. This reduces transmission line requirements to a single wire.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q23', 23),
  ('dce00000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000005', 'A shift register initially contains the data 1011. With each clock pulse, the bits shift one position to the right, and a 0 is introduced at the leftmost position.
    Determine the output after one clock pulse.', '* **Initial State**: $1011_2$
* **Shift Operation**: Shift right by 1 position.
  * The LSB ($1$) is shifted out and lost.
  * The remaining bits shift right: $101 \rightarrow \_101$
  * A $0$ is introduced at the MSB position.
* **Output after 1 Clock Pulse**: $0101_2$', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q24', 24),
  ('dce00000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000005', 'A digital system controlling an automated assembly line uses multiple flip flops to coordinate operations such as material feeding, processing, and packaging. Initially, the system faced issues where outputs changed at unpredictable times due to asynchronous input changes. To resolve this, a clock signal is introduced so that all flip flops update their states simultaneously at defined time intervals. Engineers also ensure that the clock frequency is chosen carefully to balance speed and reliability.
    Analyze how the introduction of a clock signal ensures synchronized operation in sequential circuits and prevents timing-related errors.', 'The introduction of a **global clock signal** transforms the circuit from asynchronous to synchronous.

```mermaid
graph TD
    A[Asynchronous Changes] --> B[Glitches & Race Conditions]
    C[Clock Signal Introduced] --> D[Edge-Triggered State Capture]
    D --> E[All states update simultaneously]
    E --> F[Stable Operation & No Hazards]
```

### Analysis:
In an asynchronous system, input signals arrive at different times due to differing wire lengths and gate delays, leading to race conditions. By clocking all flip-flops on a common edge:
1. Inputs are allowed to settle before the clock edge arrives.
2. The flip-flops sample the settled inputs at the exact same instant.
3. This prevents race conditions and glitches from propagating, ensuring predictable state transitions.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q25', 25),
  ('dce00000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000005', 'In a microprocessor-based system, registers are used to temporarily store binary data during execution of instructions. Consider a system where a 4-bit register stores the value 1101. During the next clock cycle, this data is transferred to another register for further processing. Engineers ensure that proper control signals are applied so that data is retrieved from the first register and loaded into the second register without loss or corruption. The system uses a common bus architecture to facilitate data transfer between registers.
    Analyze the process of storing and retrieving binary data between registers and explain the role of control signals and clock in ensuring accurate data transfer.', 'Register-to-register transfer relies on a shared **system bus** controlled by tri-state buffers and clock signals.

### Transfer Process:
1. **Source Enable**: The control unit asserts the read control signal for Register A, enabling its tri-state buffers to place the data (`1101`) onto the common bus.
2. **Destination Select**: The control unit asserts the load control signal for Register B.
3. **Clock Edge**: On the next rising clock edge, Register B samples the bus lines and stores the data.
4. **Synchronization**: The clock ensures that data is only sampled after it has stabilized on the bus, preventing data corruption.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q26', 26),
  ('dce00000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000005', 'A digital communication system uses edge-triggered flip flops to store incoming data. The system is designed such that data is captured only at the rising edge of the clock signal. Engineers observe that even when input signals fluctuate between clock pulses, the stored data remains stable and unaffected.
    Evaluate how edge triggering improves data stability compared to level triggering in clocked circuits.', '### Evaluation:
* **Level Triggering**: The storage element is transparent for the entire active clock level (e.g., $1 \mu\text{s}$). Any input fluctuation during this time affects the stored value.
* **Edge Triggering**: The storage element only samples input during the transition edge (typically $< 1 \text{ ns}$). 

Because the sensitivity window is reduced by several orders of magnitude, edge-triggered flip-flops are immune to input glitches that occur outside the clock transition, ensuring much higher data stability.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q27', 27),
  ('dce00000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000005', 'A digital system consists of two 3-bit registers, Register A and Register B. Initially, Register A contains the binary value 101, and Register B contains 000. On a control signal, the content of Register A is transferred to Register B during the next clock pulse. Engineers verify that the transfer occurs simultaneously for all bits.
    Determine the contents of Register B after the transfer and explain how simultaneous data retrieval and storage occur.', '* **Contents of Register B after transfer**: $101_2$.

### Retrieval and Storage Mechanism:
The transfer is achieved in parallel using a common clock line. Each flip-flop in Register B has its input connected to the output of the corresponding flip-flop in Register A. On the rising edge of the control clock pulse, all three flip-flops in Register B load the value of their respective inputs simultaneously, ensuring instant, single-cycle data transfer.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q28', 28),
  ('dce00000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000005', 'In a microprocessor system, registers are used to temporarily store intermediate results during arithmetic operations. A register receives binary data from an ALU and holds it until the next operation is performed. The system relies on clock signals to control when data is stored and transferred.
    Assess the importance of registers in data storage and processing within digital systems.', 'Registers are the fastest storage elements in a computer hierarchy, located directly inside the CPU.

### Importance:
1. **Elimination of the Memory Bottleneck**: Accessing system RAM requires bus operations that take multiple CPU clock cycles. Registers provide single-cycle access.
2. **Operand Storage for ALU**: The ALU fetches operands directly from registers and writes results back to registers, enabling high-speed execution.
3. **Control Flow**: Special registers like the Program Counter (PC) and Instruction Register (IR) track and direct execution flow.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q29', 29),
  ('dce00000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000005', 'A computer system is designed with a memory unit of 16 words, each word consisting of 8 bits. Engineers use address lines to uniquely select each memory location and a decoder circuit to activate the corresponding memory cell. When a specific binary address is applied, the decoder selects one memory location for read or write operation. The system must ensure that only one memory location is accessed at a time to avoid data corruption.
    Analyze how address decoding enables proper selection of memory locations in RAM and explain its role in read/write operations.', 'Address decoding uses a binary decoder to select a unique memory location while keeping all others isolated.

### Analysis:
For a 16-word memory, we need 4 address lines ($2^4 = 16$). A 4-to-16 decoder is connected to these lines.
* When an address (e.g., $0011_2$) is applied, only the 3rd word line is activated.
* This activates the transmission gates for only that memory cell.
* **Read**: The selected cell drives the data bus.
* **Write**: The data bus writes into the selected cell.
This one-hot selection prevents multiple memory cells from driving the data bus simultaneously, preventing data corruption.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q30', 30),
  ('dce00000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000005', 'A 4-bit register initially contains the binary value 1010. On the next clock pulse, the input data 0111 is applied to the register. The system is designed such that the register loads new data at every clock pulse.
    Determine the contents of the register after the clock pulse and explain the data loading process.', '* **Contents after the clock pulse**: $0111_2$.

### Data Loading Process:
A register uses a load control input connected to a 2:1 multiplexer at the input of each D flip-flop:
* When `Load = 0`, the flip-flop output is fed back to its input, preserving the data (`1010`).
* When `Load = 1`, the new input (`0111`) is routed to the D input. On the rising edge of the clock, the flip-flops capture and store this new value.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q31', 31),
  ('dce00000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000005', 'In a microprocessor system, RAM is used to store instructions and data temporarily. During execution, the processor sends an address to the memory unit, and the corresponding data is retrieved. Engineers ensure that the memory is organized efficiently so that data access is fast and accurate.
    Assess the working of RAM in terms of storage, addressing, and data retrieval.', 'RAM (Random Access Memory) provides high-speed, volatile read/write storage.

### Working Principles:
1. **Storage**: Data is stored in an array of memory cells. SRAM uses 6-transistor latch circuits (fast, expensive), while DRAM uses a single transistor and capacitor (dense, requires refreshing).
2. **Addressing**: The CPU places the target address on the address bus. Row and column decoders activate the specific cell.
3. **Data Retrieval**: Sense amplifiers detect the tiny charge (DRAM) or state (SRAM) of the selected cell, amplify it, and place it on the data bus.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q32', 32),
  ('dce00000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000005', 'A basic processor follows a structured instruction cycle where each instruction is processed in sequential steps controlled by clock pulses. The system includes registers, ALU, and memory interacting through control signals generated by the control unit. Each phase must occur in the correct order to avoid execution errors. The designer is analyzing how instruction flow is logically structured from start to completion.

Determine the logical flow of instruction processing by interpreting the sequence of control steps, and justify how ordered execution ensures correct system behavior.', 'The instruction cycle consists of four sequential phases:

```mermaid
sequenceDiagram
    participant PC as Program Counter
    participant MAR as Memory Addr Reg
    participant MEM as Main Memory
    participant MDR as Memory Data Reg
    participant IR as Instruction Reg
    participant CU as Control Unit

    Note over PC,IR: 1. FETCH
    PC->>MAR: Move Address
    MAR->>MEM: Assert Address
    MEM->>MDR: Read Instruction
    MDR->>IR: Load Instruction
    Note over PC: Increment PC

    Note over IR,CU: 2. DECODE
    IR->>CU: Opcode Bits

    Note over CU: 3. EXECUTE / WRITEBACK
    CU->>MEM: Control Signals
```

### Justification of Ordered Execution:
Each step produces data required by the next step. For example, the execution phase cannot start until the instruction opcode is decoded, and decoding cannot occur until the instruction is fetched into the IR. Violating this sequence leads to the CPU executing random noise as instructions.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q33', 33),
  ('dce00000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000005', 'A processor executes instructions where each instruction requires a fixed number of clock cycles for completion. A given program consists of multiple instructions with varying cycle counts depending on operation type. The designer is analyzing execution time based on clock cycle distribution. The goal is to model total execution duration.

Formulate the relationship between instruction count, clock cycles, and execution time, and determine how variations in cycle count affect total processing duration.', 'The total execution time ($T_{exec}$) of a program is defined by the classic CPU performance equation:
$$T_{exec} = IC \times CPI \times T_c$$
Where:
* $IC$ = Instruction Count (total instructions in program)
* $CPI$ = Clock Cycles Per Instruction
* $T_c$ = Clock Cycle Time ($1 / \text{Frequency}$)

### Impact of CPI Variations:
If a program has many memory-based instructions (which require 4–5 cycles to fetch operands from RAM) compared to register-based instructions (which take 1 cycle), the average CPI increases. This increases the total execution time linearly.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q34', 34),
  ('dce00000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000005', 'A processor executes an instruction where the opcode specifies an arithmetic operation and the operand fields indicate register-based inputs. During decoding, the control unit must interpret the instruction and generate appropriate signals for ALU execution. However, timing constraints require precise sequencing of decoding and signal activation. The system uses a hardwired control unit with direct signal mapping. Engineers must outline the logical flow from instruction decoding to execution signal generation.

Determine the logical sequence of operations from opcode interpretation to ALU control signal activation ensuring correct execution timing.', 'In a hardwired control unit, the sequence from opcode to ALU signal is:

```mermaid
graph TD
    A[Instruction Register: Opcode Bits] --> B[Opcode Decoder: 1-of-N lines]
    C[Timing Generator: Ring Counter / Step T0, T1...] --> D[Control Logic Gate Array]
    B --> D
    D --> E[ALU Control Line: Add/Sub/AND]
```

1. **Opcode Decoding**: The opcode bits from the IR are decoded into a single active control line.
2. **Timing Signals**: A ring counter generates sequential timing pulses ($T_0, T_1, T_2...$).
3. **Combinational Gate Array**: The active opcode line and the active timing pulse are combined in an AND gate matrix to generate the target control signal (e.g., $ADD = Opcode_{ADD} \cdot T_3$).
4. **Execution**: The control line activates the add circuit in the ALU.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q35', 35),
  ('dce00000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000005', 'A simple processor simulator requires implementation of an instruction decoding module that interprets opcode values and triggers corresponding micro-operations. The system currently lacks structured logic for distinguishing instruction categories. Developers must design a decoding routine that maps opcodes to control actions.

Formulate a pseudocode logic that ensures correct mapping of opcode values to corresponding control signals for execution.', 'A simple instruction decoding routine in pseudocode:

```text
// Decode Opcode and Execute Micro-operations
FUNCTION decode_and_execute(instruction):
    opcode = (instruction & 0xF000) >> 12 // Extract top 4 bits
    reg_src = (instruction & 0x0F00) >> 8  // Extract source register
    reg_dest = (instruction & 0x00F0) >> 4 // Extract destination register

    SWITCH opcode:
        CASE 0x1: // ADD Instruction
            ALU_Control = 0b000 // Set ALU to ADD mode
            Reg_Write_Enable = 1
            Bus_Select = reg_src
        CASE 0x2: // SUB Instruction
            ALU_Control = 0b001 // Set ALU to SUB mode
            Reg_Write_Enable = 1
            Bus_Select = reg_src
        CASE 0x3: // LOAD Instruction
            MAR_Load = 1
            Memory_Read = 1
        DEFAULT:
            Trigger_Invalid_Opcode_Exception()
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q36', 36),
  ('dce00000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000005', 'A system architect is evaluating processor performance under increasing workload where instruction complexity grows over time. The control unit must manage additional instruction formats and extended operation codes. The system must scale without significantly increasing execution time or control complexity. Trade-offs between simplicity and scalability become critical.

Analyze the scalability challenges of the control unit under increasing instruction complexity, and recommend how control design choices influence system efficiency.', 'As instruction sets grow, control units face significant scalability challenges:

### Control Unit Architectures:
* **Hardwired Control Unit**: Uses combinational logic gates.
  * *Pros*: Extremely fast.
  * *Cons*: Poor scalability. Adding a new instruction requires redesigning the entire logic gate matrix, making it highly complex.
* **Microprogrammed Control Unit**: Stores control signals as microinstructions in a Control ROM.
  * *Pros*: Excellent scalability. Adding an instruction only requires writing a new microprogram to ROM.
  * *Cons*: Slower because it requires a ROM access for each microstep.

### Recommendation:
For complex instruction sets, a **Microprogrammed Control Unit** is preferred. For high-speed, simplified instruction sets (RISC), a **Hardwired Control Unit** is optimal.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q37', 37),
  ('dce00000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000005', 'A processor integrates memory, registers, ALU, and control unit to execute instructions. The control unit generates signals that coordinate operations among these components. Efficient execution depends on proper interaction and timing of these elements. The system is being evaluated for operational coherence.

Assess how the control unit ensures coordinated operation among system components and infer its impact on overall execution reliability.', 'The control unit coordinates system components using synchronized **control words** asserted during specific clock cycles ($T_i$).

```mermaid
graph TD
    CU[Control Unit] -->|Read Enable| RegA[Register A]
    CU -->|Write Enable| RegB[Register B]
    CU -->|Select Lines| Bus[Common Bus]
    CU -->|Opcode Select| ALU[Arithmetic Logic Unit]
```

### Impact on Reliability:
If control signals are out of sync by even a fraction of a nanosecond (due to clock skew), data will be read before it stabilizes, or multiple registers will drive the bus simultaneously. The control unit maintains timing margins, ensuring high system reliability.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q38', 38),
  ('dce00000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000005', 'A microprocessor designed for IoT devices must balance decoding efficiency with limited hardware resources. The current combinational decoder is fast but consumes significant logic gates when supporting multiple instruction formats. Alternatively, a microprogrammed approach reduces hardware complexity but introduces execution delay. The system operates under strict energy and performance constraints. Engineers must evaluate the trade-offs between both decoding techniques.

Analyze the trade-offs between combinational and microprogrammed decoding in this constrained system and infer the most efficient approach.', 'For low-power IoT devices, we evaluate:

### Comparison:
1. **Hardwired (Combinational) Decoding**:
   * *Pros*: Minimal silicon area for small instruction sets, zero microprogram ROM overhead, and fast single-cycle decoding.
   * *Cons*: Complex to modify.
2. **Microprogrammed Decoding**:
   * *Pros*: Flexible.
   * *Cons*: Requires a Control ROM which consumes continuous static leakage power and board space.

### Inference:
For IoT devices with fixed, simple instruction sets, **Hardwired Decoding** is the most efficient choice. It eliminates the ROM power overhead and minimizes clock cycles.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q39', 39),
  ('dce00000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000005', 'A computing system processes diverse workloads including arithmetic computations and I/O operations, but experiences inefficiencies due to generalized decoding logic. The instruction decoder does not differentiate execution paths effectively. Engineers consider restructuring the decoding unit to improve specialization.

Assess how specialized decoding based on instruction types improves system performance and operational clarity.', 'Specialized decoding categorizes instructions into groups (Memory-Reference, Register-Reference, I/O) before full decoding.

### Advantages:
1. **Parallel Execution Paths**: By identifying the instruction type early, the control unit can disable unused paths (e.g., turning off memory decoders for register operations), saving power.
2. **Reduced Propagation Delay**: The decoding tree depth is reduced, allowing the control unit to operate at higher clock frequencies, improving system performance.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q40', 40),
  ('dce00000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000005', 'An industrial automation controller intermittently executes wrong instructions during operation. The system uses a sequential instruction flow where the PC increments after every fetch. However, during certain operations, the PC appears to skip addresses unexpectedly. Investigation shows that MAR receives correct addresses, but MDR occasionally loads outdated data. The control unit generates memory read signals without verifying memory readiness. Logs indicate that instruction alignment issues occur when accessing multi-byte instructions.

Investigate the root causes of incorrect instruction execution by correlating PC behavior, MAR-MDR data transfer, and instruction alignment constraints, and determine the primary fault in the fetch mechanism.', 'The root cause of the intermittent execution failures is a **memory synchronization/timing hazard** combined with **unaligned instruction accesses**.

### Detailed Analysis of the Faults:
1. **MAR-MDR Timing Mismatch**: The CPU asserts a memory read signal but does not wait for the memory''s `READY` signal. Since memory access is slower than CPU cycle time, the CPU loads data from the MDR before the memory has finished driving the bus. This results in the CPU reading outdated data.
2. **Instruction Alignment Violations**: Multi-byte instructions must be aligned to word boundaries. If the PC increments sequentially by 1 on a byte-addressable machine when fetching a 2-byte or 4-byte instruction, it will fetch a misaligned split-word, causing the control unit to decode invalid opcodes.

### Corrective Measures:
* Implement **wait states** (inserting a `READY` line check) in the control unit''s fetch state machine.
* Ensure the PC increments by the instruction width (e.g., $+2$ or $+4$) rather than $+1$.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q41', 41),
  ('dce00000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000005', 'A 32-bit processor executes a sequence of arithmetic and branch instructions where operands are fetched from general-purpose registers and results are written back after ALU processing, while the control unit issues timed signals across clock cycles to coordinate register transfers, and a conditional branch depends on status flags generated during execution, and a temporary register is used to hold intermediate results for a multi-cycle multiplication, while instruction flow may alter based on branch resolution within the same execution window.

Analyze the execution sequencing by determining the ordered micro-operations required to complete both the arithmetic and conditional branch instruction while reconciling how control signals synchronize data movement and influence control flow changes.', 'The execution of an arithmetic instruction followed by a conditional branch consists of the following micro-operations:

### 1. Arithmetic Instruction (e.g., ADD R1, R2)
* **$T_0$**: $MAR \leftarrow PC$
* **$T_1$**: $MDR \leftarrow Memory[MAR]$, $PC \leftarrow PC + 1$
* **$T_2$**: $IR \leftarrow MDR$
* **$T_3$**: $ALU \leftarrow R1 + R2$, update status flags ($S, Z, C, V$)
* **$T_4$**: $R1 \leftarrow ALU\_Output$

### 2. Conditional Branch Instruction (e.g., JZ Offset)
* **$T_0$**: $MAR \leftarrow PC$
* **$T_1$**: $MDR \leftarrow Memory[MAR]$, $PC \leftarrow PC + 1$
* **$T_2$**: $IR \leftarrow MDR$
* **$T_3$**: Decode branch condition. Check Zero ($Z$) flag.
  * If $Z = 1$: $PC \leftarrow PC + Offset$
  * If $Z = 0$: No operation (continue sequentially).

The clock ensures that register contents are only written during stable setup/hold times.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q42', 42),
  ('dce00000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000005', 'A high-performance computing system processes large datasets and relies on deep memory hierarchies. During execution, instruction fetch delays increase significantly when instructions are not present in cache. The PC continues sequential updates, but MAR requests frequently go to slower main memory. MDR loading time increases, delaying IR updates. Engineers consider introducing prefetching or modifying bus organization. However, these changes may impact system complexity and resource utilization.

Evaluate the trade-offs between improving instruction fetch performance using prefetching mechanisms and optimizing bus organization, considering their impact on PC sequencing, MAR-MDR operations, and overall system scalability.', '### Trade-off Evaluation:

1. **Instruction Prefetching**:
   * *Mechanism*: Fetches the next instruction into a queue while the current instruction is executing.
   * *Pros*: Hides memory latency; CPU rarely stalls for sequential code.
   * *Cons*: If a branch is taken, the prefetched instructions are discarded (pipeline flush), wasting bus bandwidth.

2. **Harvard Bus Organization (Separate Instruction and Data Buses)**:
   * *Mechanism*: Implements separate memory paths and buses for instructions and data.
   * *Pros*: Eliminates bus conflicts (structural hazards) when an instruction needs to read/write memory during a fetch cycle.
   * *Cons*: Double the pin count and routing complexity on the CPU package.

### Recommendation:
For high-performance systems, a **combined approach** is optimal: a Harvard-style L1 Cache (separate I-cache and D-cache) to prevent bus conflicts, coupled with a branch predictor to optimize prefetching efficiency.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q43', 43),
  ('dce00000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000005', 'A high-performance processor pipeline executes arithmetic, logical, and branch instructions with overlapping stages, where execution latency increases due to multi-cycle instructions occupying ALU resources, and branch instructions introduce control hazards requiring pipeline stalls, while temporary registers are heavily utilized for intermediate storage, and design engineers must balance throughput against execution accuracy under varying workloads.

Evaluate the execution mechanism by prioritizing trade-offs between pipeline efficiency and execution correctness while recommending strategies to optimize micro-operation sequencing under these constraints.', '### Trade-offs & Pipeline Challenges:
1. **Data Hazards (Read-After-Write)**: Occurs when an instruction requires the result of a preceding instruction that has not yet completed its write-back stage.
2. **Control Hazards (Branch Latency)**: Branch instructions alter the PC, invalidating the instructions fetched in the pipeline stages behind them, requiring stalls (bubbles).

### Recommended Optimization Strategies:
* **Operand Forwarding**: Bypass the write-back stage. Route the ALU output directly back to the ALU input for the next instruction, eliminating data hazard stalls.
* **Delayed Branching / Branch Prediction**: Use hardware branch predictors to guess the branch direction, minimizing stalls.

```mermaid
graph TD
    A[Instruction Fetch] --> B[Decode]
    B --> C[Execute]
    C -->|Forward Result| B
    C --> D[Memory]
    D --> E[Write-Back]
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q44', 44),
  ('dce00000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000005', 'A processor is executing an instruction that requires fetching an operand using indexed addressing where the base register contains 4000 and index register contains 120 while the offset is 30, and the system uses a unified bus for communication between ALU and memory. The control unit must coordinate address computation before initiating a memory read, while cache is checked prior to accessing main memory. Due to a recent workload spike, occasional wait states are introduced during memory access. The instruction involves a single operand stored in memory rather than registers. The processor must ensure correct sequencing of MAR, MDR, and IR during the operation.

Analyze the sequence of operations required to determine how the effective address is computed and how the operand is fetched from memory while ensuring proper synchronization between components.', '### 1. Effective Address (EA) Computation:
Using Indexed Addressing:
$$EA = \text{Base Register} + \text{Index Register} + \text{Offset}$$
$$EA = 4000 + 120 + 30 = 4150$$

### 2. Fetch Sequence (Micro-operations):
* **$T_0$**: $MAR \leftarrow 4150$ (calculated EA placed in MAR)
* **$T_1$**: $MDR \leftarrow Memory[MAR]$ (assert memory read; wait state introduced if memory is busy)
* **$T_2$**: $Temp \leftarrow MDR$ (load data into a temporary ALU register)
* **$T_3$**: Execute operation using $Temp$ and write back results.

Wait states halt the CPU control unit state machine until the memory''s `READY` line goes high, ensuring synchronization.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q45', 45),
  ('dce00000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000005', 'A high-performance processor pipeline performs multiple instruction executions concurrently, but the write-back stage becomes a bottleneck when multiple instructions complete simultaneously. The system supports both register and memory write-back paths, and priority must be assigned dynamically. Increasing hardware resources can reduce delay but increases cost and power consumption. Designers must decide on an optimal approach.

Evaluate the trade-offs involved in optimizing the write-back stage and recommend an efficient design strategy.', 'The write-back stage becomes a bottleneck when multiple execution units (e.g., integer ALU, floating-point unit, load unit) attempt to write their results to the register file in the same clock cycle.

### Design Strategies:
* **Multi-Port Register File**: Implement multiple write ports. This allows simultaneous writes but increases silicon area and power consumption.
* **Write Buffering**: Implement a temporary write buffer. Results are queued in the buffer and written to the register file sequentially during idle cycles.

### Recommendation:
A **Write Buffer** is the most cost-effective solution for power-constrained systems, while a **Multi-Port Register File** is necessary for high-performance superscalar designs.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q46', 46),
  ('dce00000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000005', 'A high-performance computing system must choose between register addressing and memory addressing for frequently executed arithmetic instructions. Register addressing provides faster access but limited storage, while memory addressing supports larger datasets but introduces latency due to cache and main memory interactions. The system executes multiple operand instructions requiring frequent data access. The control unit must balance speed and resource utilization under varying workloads. Engineers are evaluating which addressing mode yields better throughput under constrained conditions.

Evaluate the trade-offs between register addressing and memory addressing in terms of performance, scalability, and system efficiency under these conditions.', '### Trade-off Assessment:

1. **Register Addressing**:
   * *Pros*: Zero memory access latency (single cycle), short instruction encoding (requires only 3–4 bits to specify a register).
   * *Cons*: Extremely limited storage (typically 8 to 32 registers).
2. **Memory Addressing**:
   * *Pros*: Can access the entire memory space (gigabytes of data).
   * *Cons*: Requires multiple clock cycles (cache hit/miss penalties), and larger instruction encoding.

### Recommendation:
For maximum throughput, a **Register-to-Register (RISC) architecture** is optimal. Load operands into registers, perform computations in registers, and store results back to memory once, minimizing memory bus traffic.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q47', 47),
  ('dce00000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000005', 'A processor completes an arithmetic instruction where the ALU produces a result that must be stored back into a destination register while also updating condition flags. The control unit activates specific write-enable signals, and the memory system remains idle during this phase. The system uses a synchronous clock to coordinate operations, and the next instruction fetch must only begin after write completion. A delay is observed when flag updates overlap with register writes.

Analyze how the processor should coordinate the write-back sequence and infer how synchronization ensures correct completion of the instruction cycle.', 'The coordination of the write-back sequence requires precise clock edge synchronization.

```mermaid
sequenceDiagram
    participant CLK as System Clock
    participant ALU as ALU Output
    participant REG as Register File
    participant FLG as Status Flags

    Note over CLK: Rising Edge
    ALU->>REG: Enable Write Line
    ALU->>FLG: Update Flags
    Note over REG,FLG: Data captured simultaneously
    Note over CLK: Falling Edge
    Note over REG,FLG: Lines stabilized for next Fetch
```

### Synchronization Mechanism:
* The write-enable signal to the destination register and the flag update clock are tied to the same rising edge of the system clock.
* By using edge-triggered registers, the write-back is completed within the hold-time window of the clock edge. This ensures that the next fetch cycle starts with updated data and flags, preventing read-after-write errors.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-I Q48', 48),
  ('dce00000-0000-0000-0000-000000000049', 'a1000000-0000-0000-0000-000000000005', 'An embedded controller calculates net weight by subtracting container weight from total weight. Engineers observe incorrect display outputs when negative values occur. The system depends on sign and zero flags for result validation but misinterprets them. This leads to faulty decisions during operation.

Determine how status flag misinterpretation affects arithmetic computation outcomes and recommend a method to ensure correct evaluation of subtraction results.', '### Flag Misinterpretation Analysis:
When performing subtraction $A - B$:
* If $A < B$, the result is negative. In 2''s complement, the Sign flag ($S$) is set to 1.
* If the control system only evaluates the Zero flag ($Z$) or misinterprets the Sign flag as an unsigned value, it will treat the negative weight value as a large positive value (e.g., $-1$ as $255$ in 8-bit).

### Recommendation for Correct Evaluation:
For signed comparisons, evaluate the relationship using both the **Sign ($S$)** and **Overflow ($V$)** flags:
* $A < B$ is true if $(S \oplus V) = 1$.
* For unsigned values, evaluate the **Carry ($C$)** flag (where a carry/borrow of 1 indicates a negative result).', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q1', 49),
  ('dce00000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000005', 'A digital energy meter calculates total consumption by adding power readings stored in memory. Engineers observe delays and occasional incorrect totals during rapid updates. The instruction format requires more cycles for memory-based operands. The system must maintain accuracy while improving speed.

Evaluate how operand selection affects arithmetic instruction performance and determine its impact on execution speed and accuracy in the given system.', '### Performance Impact of Operand Selection:
* **Register-based Operands**: Operands are fetched directly from CPU registers. Access takes a single clock cycle, maximizing speed.
* **Memory-based Operands**: Requires the CPU to place the operand address on the address bus, wait for memory read latency, and load the data. This adds at least 2–3 execution cycles.

### Impact in Rapid Update Systems:
Using memory operands for rapid updates causes bus saturation and CPU stalls. To maintain accuracy and speed, operands should be loaded into registers, accumulated, and only the final sum written back to memory.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q2', 50),
  ('dce00000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000005', 'A microcontroller uses NOT operations to invert signal bits for control purposes. Engineers observe unexpected behavior when inversion is applied repeatedly without tracking original values. The system does not maintain reference states for comparison. This leads to incorrect control decisions.

Analyze how repeated NOT operations affect signal interpretation and determine a method to maintain correct control logic.', '### Inversion Behavior:
Applying the NOT operation repeatedly on a binary bit produces an oscillating sequence:
$$A \rightarrow \bar{A} \rightarrow A \rightarrow \bar{A}$$
Without tracking the initial reference state, the system cannot determine if the current state is the original state or the inverted state.

### Corrective Method:
Implement a **toggle state tracker** in software or a hardware flip-flop. Alternatively, read the current status register bit before applying the operation to verify the active state.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q3', 51),
  ('dce00000-0000-0000-0000-000000000052', 'a1000000-0000-0000-0000-000000000005', 'A sensor interface circuit uses AND operations to filter unwanted noise bits from incoming data. Engineers observe that some valid signals are also being removed during processing. The system applies masking without carefully selecting mask values. Accurate signal extraction is required for proper system operation.

Analyze how improper masking using AND operations affects data filtering and determine how correct mask selection ensures accurate signal extraction.', '### Improper AND Masking Effect:
An `AND` operation is used to clear specific bits to 0 while keeping others unchanged. If the mask is chosen poorly (e.g., using a mask of $11110000_2$ when the lower nibble contains valid signal bits), valid data is permanently lost (overwritten with $0$s).

### Correct Mask Selection:
Identify the exact bit positions of interest. 
* To filter out noise on bits 0 and 1 while preserving bits 2–7, use the mask $11111100_2$.
* Operation: $Output = Input \text{ AND } Mask$

| Input Bit | Mask Bit | Output Bit |
|:---:|:---:|:---:|
| $0$ (Noise) | $0$ | **$0$ (Filtered)** |
| $1$ (Noise) | $0$ | **$0$ (Filtered)** |
| $D$ (Data) | $1$ | **$D$ (Preserved)** |', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q4', 52),
  ('dce00000-0000-0000-0000-000000000053', 'a1000000-0000-0000-0000-000000000005', 'A robotic control system calculates displacement using sequential additions and subtractions continuously. Engineers notice cumulative errors when multiple operations are executed continuously. The system does not verify carry and overflow conditions consistently. This leads to propagation of incorrect values over time.

Analyze how ignoring carry and overflow conditions affects sequential arithmetic operations and determine a strategy to maintain computational accuracy.', '### Impact of Ignoring Carry and Overflow:
* **Carry (Unsigned Arithmetic)**: When the sum of two numbers exceeds the register limit (e.g., $> 255$ in 8-bit), the extra bit is lost. Over multiple additions, this causes cumulative rounding errors.
* **Overflow (Signed Arithmetic)**: Occurs when adding two numbers of the same sign produces a result with the opposite sign (e.g., $127 + 1 = -128$), leading to incorrect displacements.

### Corrective Strategy:
After each arithmetic operation, check the Carry ($C$) and Overflow ($V$) flags using conditional jumps:
```text
ADD Accumulator, Sensor_Data
JC Carry_Handler  // Jump if Carry is set
JO Overflow_Handler // Jump if Overflow is set
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q5', 53),
  ('dce00000-0000-0000-0000-000000000054', 'a1000000-0000-0000-0000-000000000005', 'A microcontroller in a temperature monitoring system adds incoming sensor readings using an accumulator. During testing, incorrect results appear when large values are processed continuously. The system relies on status flags to detect abnormal conditions but fails to respond correctly. Engineers suspect issues in arithmetic execution and flag handling.

Analyze how improper handling of arithmetic instructions and status flags leads to incorrect results, and determine the role of operand type in influencing execution accuracy.', '### Failure Analysis:
When a temperature sensor continuously feeds large values to the accumulator, the sum eventually exceeds the maximum register capacity. 
* If the microcontroller''s logic ignores the **Carry ($C$)** or **Overflow ($V$)** flags, the accumulator silently wraps around (e.g., from $255$ to $0$), interpreting a high temperature as extremely cold.

### Role of Operand Type:
* **Signed Operands**: Overflow occurs at lower values ($+127$ for 8-bit).
* **Unsigned Operands**: Allows double the range ($255$), but still requires carry-bit checking to trigger alarm routines when capacity is exceeded.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q6', 54),
  ('dce00000-0000-0000-0000-000000000055', 'a1000000-0000-0000-0000-000000000005', 'An embedded encryption system uses XOR operations to encode and decode data. Engineers notice incorrect outputs when the same key is not consistently applied. The system relies on XOR properties for reversible transformations. Inconsistent key usage disrupts the encoding process.

Determine how XOR operation properties influence data encoding and recommend a method to ensure consistent and reversible transformations.', '### XOR Properties in Encryption:
The XOR operation ($\oplus$) is uniquely suited for encryption because of its self-reversible property:
$$(P \oplus K) \oplus K = P$$
Where $P$ is plain text, $K$ is the key, and $C = P \oplus K$ is cipher text.

### Inconsistent Key Impact:
If the encryption key $K_e$ differs from the decryption key $K_d$ by even a single bit, the original data is lost:
$$C \oplus K_d = P \oplus K_e \oplus K_d \neq P$$

### Recommendation:
Implement a key handshake protocol (such as Diffie-Hellman) or verify key integrity using a cryptographic checksum (e.g., HMAC) before starting decryption.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q7', 55),
  ('dce00000-0000-0000-0000-000000000056', 'a1000000-0000-0000-0000-000000000005', 'A digital control system uses OR operations to combine multiple control signals into a single output. Engineers observe unintended activation of certain functions due to overlapping signal conditions. The system does not properly evaluate input combinations before applying logic operations. Reliable control output must be ensured.

Evaluate how improper use of OR operations affects control signal integrity and determine how logical conditions should be structured to avoid unintended outputs.', 'The OR operation combines inputs:
$$Y = A + B + C$$
If any input is $1$, the output $Y$ is $1$.

### Signal Integrity Hazard:
Because multiple active signals are merged into a single line, the receiver cannot distinguish which specific input caused the activation. This causes unintended functions to trigger when overlapping conditions occur.

### Correct Structure:
Use a **Priority Encoder** or a **Multiplexer** instead of OR gates. This ensures each input is routed to a distinct addressable state, allowing the control system to resolve conflicts.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q8', 56),
  ('dce00000-0000-0000-0000-000000000057', 'a1000000-0000-0000-0000-000000000005', 'A data buffering system uses increment operations to move through memory locations and decrement operations to release processed data. Engineers observe data inconsistencies when buffer limits are reached. The system does not properly handle boundary conditions and flag states during these operations. This leads to overwriting or skipping data. The system must maintain data integrity while ensuring efficient buffer management.

Analyze how improper handling of increment and decrement instructions affects buffer management and propose a strategy to ensure reliable and efficient operation.', 'Increment (INC) and Decrement (DEC) instructions modify memory pointers but do not update all status flags in some architectures (e.g., INC/DEC does not affect the Carry flag in x86).

### Buffer Inconsistencies:
* **Overflow**: Incrementing the write pointer beyond the buffer limit without checking if it matches the read pointer overwrites unread data.
* **Underflow**: Decrementing the read pointer below zero wraps the pointer to $255$ (in 8-bit), reading garbage data.

### Corrective Strategy:
Always compare the pointer value against the boundary limit using a compare (`CMP`) instruction before executing INC or DEC, and branch accordingly:
```text
CMP Pointer, Buffer_Max
JGE Buffer_Full_Handler
INC Pointer
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q9', 57),
  ('dce00000-0000-0000-0000-000000000058', 'a1000000-0000-0000-0000-000000000005', 'An embedded automation system integrates arithmetic and logic instructions to control multiple processes. Engineers observe inconsistent behavior due to improper handling of data dependencies and instruction order. The system processes operations without ensuring correct data flow between steps. This results in incorrect outputs and reduced efficiency.

Evaluate how improper handling of data dependencies and instruction sequencing affects system behavior and develop a strategy to ensure consistent and efficient operation.', 'Data dependency (e.g., a Read-After-Write hazard) occurs when an instruction depends on the output of a previous instruction that has not yet completed.

### Impact on System Behavior:
Executing instructions out of order or without introducing delays causes the second instruction to read stale data, leading to incorrect outputs and system instability.

### Strategy to Ensure Correct Flow:
* **Software Interlocking**: Insert `NOP` (No Operation) instructions to allow the first operation to complete.
* **Hardware Interlocking**: Implement hazard detection units in the CPU to stall the pipeline automatically.
* **Register Forwarding**: Direct the ALU result back to the ALU input in the next clock cycle.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q10', 58),
  ('dce00000-0000-0000-0000-000000000059', 'a1000000-0000-0000-0000-000000000005', 'A control system in an industrial machine uses counters to manage task execution cycles. Increment instructions increase cycle count, while decrement instructions track remaining operations. Engineers notice incorrect cycle completion detection due to improper flag usage. The system occasionally terminates tasks prematurely or continues beyond required cycles. The design must ensure precise control over execution cycles.

Evaluate how improper use of increment and decrement instructions affects cycle control and develop a method to ensure accurate task execution management.', 'The root cause is the failure to check the **Zero ($Z$) flag** immediately after decrementing the counter.

When a loop counts down, the loop termination condition must depend on the counter reaching $0$. If the loop control logic checks the wrong flag (e.g., the Carry flag, which is not modified by DEC in some microcontrollers), the loop will not stop, leading to buffer overflows.

### Correct Method:
```text
Loop_Start:
  // Perform Task
  DEC Counter
  JNZ Loop_Start // Jump if Zero Flag is NOT set (Counter > 0)
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q11', 59),
  ('dce00000-0000-0000-0000-000000000060', 'a1000000-0000-0000-0000-000000000005', 'A signal processing unit performs arithmetic transformations on data and uses logic operations for filtering and condition checking. Engineers observe incorrect outputs due to improper interaction between operations. The system does not validate intermediate values and executes instructions inefficiently. This leads to increased processing time and inaccurate results.

Analyze how improper interaction between arithmetic and logic instructions affects system performance and propose a method to improve both accuracy and efficiency.', 'Improper interaction occurs when logic instructions (which reset the Carry flag) are executed between consecutive multi-byte arithmetic operations (which rely on the Carry flag to propagate values).

### Performance and Accuracy Projections:
* **Incorrect Interaction**: Executing an AND operation between the addition of the lower byte and the upper byte of a 16-bit number clears the Carry flag, leading to an incorrect sum.
* **Optimization Method**: Group arithmetic operations sequentially, or save the status register to a temporary register/stack before executing logic instructions.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q12', 60),
  ('dce00000-0000-0000-0000-000000000061', 'a1000000-0000-0000-0000-000000000005', 'A low-level embedded system performs bit manipulation for device interfacing using rotate instructions. Engineers observe inconsistent device responses due to incorrect bit positioning. The system performs multiple rotations without validating intermediate register values. Lack of proper control over rotation direction and carry flag leads to unpredictable outputs.

Evaluate how improper control of rotate operations affects device interfacing and develop a method to ensure consistent and accurate bit manipulation.', 'In low-level interfacing, bit manipulation via rotate instructions is used to shift bits into specific control positions.

### Impact on Interfacing:
* **Rotate-through-Carry (RAL/RAR)**: Shifts the carry flag into the MSB/LSB. If the carry flag state is unknown, it introduces random bits into the device control byte, causing unpredictable responses.
* **Rotate-without-Carry (RLC/RRC)**: Shifts bits in a circular loop, bypassing the carry flag.

### Interfacing Rules:
1. Clear or set the Carry flag explicitly (using `CLC` or `STC`) before executing a rotate-through-carry instruction.
2. Use masking (AND/OR) to isolate only the target bit after rotation.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q13', 61),
  ('dce00000-0000-0000-0000-000000000062', 'a1000000-0000-0000-0000-000000000005', 'A real-time embedded system executes complex operations using arithmetic and logic instructions. Engineers observe performance degradation due to inefficient use of instruction cycles, poor resource utilization, and lack of optimization. The system frequently accesses memory and does not effectively use registers. Instruction dependencies also cause delays. The system must improve throughput while maintaining accuracy.

Formulate an optimized execution strategy that improves instruction efficiency, reduces latency, and enhances throughput in the system.', 'To optimize instruction efficiency and maximize throughput:

1. **Minimize Memory Operations**: Keep intermediate variables in general-purpose registers instead of writing to and reading from RAM continuously.
2. **Instruction Reordering**: Reorder instructions to place independent operations between dependent ones, preventing pipeline stalls.
3. **Use Register Indirect Addressing**: Use index registers for array processing to avoid calculating addresses from scratch in every loop.

```
Unoptimized: Load R1, [Addr1] -> Add R1, [Addr2] -> Store [Addr3], R1
Optimized:   Load R1, [Addr1] -> Load R2, [Addr2] -> Add R1, R2
             // Keep result in R1 for next calculation
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q14', 62),
  ('dce00000-0000-0000-0000-000000000063', 'a1000000-0000-0000-0000-000000000005', 'A data transmission unit rotates data bits before sending them to match protocol requirements. Engineers notice incorrect outputs when repeated rotations are applied. The system does not distinguish between logical shift and rotate operations and fails to track carry flag changes. This leads to data corruption during transmission.

Analyze how improper distinction between rotate and shift operations affects data integrity and propose a strategy to ensure correct transmission.', 'The difference between shift and rotate operations is critical for data integrity:

* **Logical Shift (SHL/SHR)**: Discards the shifted-out bit and fills the vacant position with $0$. This is destructive and causes data loss.
* **Rotate (ROL/ROR)**: Cycles the shifted-out bit back into the vacant position. No data is lost.

```
Initial: 11001101
SHR:     01100110 (LSB 1 is lost)
ROR:     11100110 (LSB 1 moves to MSB)
```

### Recommendation:
When sending data over serial protocols that require bit-by-bit transmission without losing the original word structure, always use **Rotate** operations.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q15', 63),
  ('dce00000-0000-0000-0000-000000000064', 'a1000000-0000-0000-0000-000000000005', 'A microprocessor-based system processes continuous data streams using arithmetic and logic instructions. Engineers observe reduced responsiveness due to high latency and inefficient instruction scheduling. The system does not balance workload effectively across available resources. This leads to bottlenecks in execution.

Analyze how poor instruction scheduling affects system responsiveness and propose a strategy to improve execution efficiency and scalability.', 'Poor instruction scheduling causes pipeline stalls (bubbles) when the CPU must wait for operands or branch resolutions.

### Analysis & Strategy:
In a pipelined processor, if an instruction uses the result of the immediately preceding instruction, the pipeline stalls for 1–2 cycles.
* **Reordering**: A compiler or hardware scheduler reorders instructions so that independent instructions execute during these delay cycles. This maximizes pipeline throughput, improving system responsiveness.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q16', 64),
  ('dce00000-0000-0000-0000-000000000065', 'a1000000-0000-0000-0000-000000000005', 'A processor executing memory reference instructions in a real-time monitoring system begins to produce inconsistent outputs during load and store operations. The system uses indirect addressing to handle large datasets, but engineers notice that incorrect values are being fetched intermittently. Detailed analysis reveals that the issue may stem from improper address resolution, timing mismatches between CPU and memory, or incorrect sequencing of instruction execution stages. Since the system is used in critical infrastructure, identifying the exact fault is essential to prevent data corruption and ensure reliable operation.

Identify the possible causes of incorrect data retrieval in memory reference instructions and recommend corrective measures.', '### Causes of Inconsistent Memory Retrieval:
1. **Timing Mismatches**: The memory read pulse ($RD$) is too short, or the address setup time is violated, meaning the memory chip is deselected before data stabilizes.
2. **Address Bus Noise/Crosstalk**: High-frequency signals on parallel address lines couple capacitively, causing the memory to read from a different address.
3. **Improper Page Boundary Crossing**: When executing indirect address calculations, the pointer may cross a memory page boundary, requiring additional cycles that the control unit fails to wait for.

### Corrective Measures:
* Introduce **wait states** in the memory interface.
* Implement physical decoupling capacitors to minimize address line noise.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q17', 65),
  ('dce00000-0000-0000-0000-000000000066', 'a1000000-0000-0000-0000-000000000005', 'A high-performance embedded controller is being designed for an industrial automation system where multiple sensors continuously generate data that must be accessed from memory with minimal delay. The instruction format is constrained by limited word size, forcing the designer to carefully choose between direct and indirect addressing modes. Direct addressing allows faster execution but restricts addressable memory range, whereas indirect addressing introduces additional memory access cycles but enables flexible data handling across a larger memory space. The system must maintain real-time responsiveness while supporting scalability for future expansion. The designer must evaluate performance, hardware complexity, and execution latency before finalizing the addressing mechanism.

Formulate a strategic approach to select an addressing mode that optimizes performance while ensuring scalability and flexibility in memory access.', '### Addressing Mode Selection:
* **Direct Addressing**:
  * *Pros*: Faster execution (only 1 memory access to fetch the operand).
  * *Cons*: The address space is limited by the instruction word size (e.g., an 8-bit address field can only access 256 bytes).
* **Indirect Addressing**:
  * *Pros*: Can access the entire memory space using pointer registers.
  * *Cons*: Requires 2 memory accesses (one to fetch the effective address, one to fetch the operand), increasing latency.

### Strategy:
Use **Direct Addressing** for local variables and loop counters, and **Indirect Addressing** for arrays and dynamic data structures.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q18', 66),
  ('dce00000-0000-0000-0000-000000000067', 'a1000000-0000-0000-0000-000000000005', 'A system integrates arithmetic operations and flag-based decision-making to control execution flow. The engineer must connect how computation results affect flags and how flags influence program behavior. The system depends on accurate coordination between flag updates to program execution behavior.

Relate flag updates to program execution behavior.', 'Status flags (Sign, Zero, Carry, Overflow) bridge the gap between ALU operations and control flow.

```mermaid
graph TD
    ALU[ALU Operation] -->|Updates| Flags[Status Register Flags: S, Z, C, V]
    Flags -->|Evaluated by| Branch[Branch Logic: JZ, JC, JS]
    Branch -->|Modifies| PC[Program Counter]
```

### Explanation:
Every arithmetic/logic operation updates the status flags. Conditional branch instructions read these flags to determine whether to update the Program Counter ($PC \leftarrow PC + Offset$) or continue sequentially. This creates conditional branch paths.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q19', 67),
  ('dce00000-0000-0000-0000-000000000068', 'a1000000-0000-0000-0000-000000000005', 'A processor fails to correctly execute conditional instructions due to incorrect flag values stored in the status register. Engineers observe that flags are not updated properly after arithmetic operations, leading to incorrect execution paths. The system must be analyzed to identify the issue and restore proper functionality.

Examine the issue and identify causes of incorrect flag behavior.', '### Diagnosing Faulty Flag Updates:
1. **Control Signal Failure**: The write-enable line to the status register fails to assert after logical/arithmetic instructions, leaving flags in their previous states.
2. **ALU Flag Logic Fault**: The logic gates that detect zero (a massive NOR gate across all output bits) or sign (which copies the MSB) have design faults.
3. **Interrupt Contention**: An interrupt service routine modifies the flag register without saving and restoring it, corrupting the main program''s flags.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q20', 68),
  ('dce00000-0000-0000-0000-000000000069', 'a1000000-0000-0000-0000-000000000005', 'A computing system executes a memory reference instruction using indirect addressing where the address field of the instruction does not directly point to the operand but instead points to a memory location that stores the effective address. The engineer must analyze the sequence of operations required to resolve the final operand address. The process involves multiple memory accesses and intermediate address retrieval steps. Accurate computation of the effective address is critical to ensure correct execution of arithmetic and data transfer instructions within the processor.

Determine the sequence of operations involved in calculating the effective address in indirect addressing and justify each step logically.', 'In Indirect Addressing, the address field of the instruction contains the memory address of the effective address.

### Calculation Steps:
1. **Instruction Fetch**: Fetch the instruction opcode and address field $ADR_1$ from memory.
2. **First Memory Read**: Access memory at address $ADR_1$ to retrieve the value $ADR_2$ (the Effective Address).
3. **Second Memory Read**: Access memory at address $ADR_2$ to retrieve the actual operand.

```text
Instruction Register -> ADR1 -> Memory[ADR1] -> ADR2 -> Memory[ADR2] -> Operand
```', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q21', 69),
  ('dce00000-0000-0000-0000-000000000070', 'a1000000-0000-0000-0000-000000000005', 'A computer architecture researcher is analyzing how memory reference instructions are executed within a CPU pipeline involving registers, ALU, control unit, and memory modules. Each instruction consists of an opcode and an address field, and execution involves sequential stages such as fetch, decode, and execute. The researcher must understand how these components interact dynamically to perform operations like load, store, and arithmetic computations using memory operands. The system behavior depends on correct coordination between instruction fields and hardware units. The researcher must integrate these elements to model the complete execution flow of memory-based operations.

Integrate the roles of instruction format and CPU components to infer how memory reference instructions are executed in a system.', 'During a memory reference instruction (e.g., LOAD Address):

```mermaid
sequenceDiagram
    participant PC as Program Counter
    participant MAR as Memory Addr Reg
    participant MEM as Memory
    participant MDR as Memory Data Reg
    participant IR as Instruction Reg
    participant AC as Accumulator

    PC->>MAR: Move Address
    MAR->>MEM: Address asserted
    MEM->>MDR: Read opcode
    MDR->>IR: Load Instruction
    Note over IR: Decode Opcode (LOAD)
    IR->>MAR: Move operand address field
    MAR->>MEM: Address asserted
    MEM->>MDR: Read operand data
    MDR->>AC: Load data into Accumulator
```

The control unit coordinates these steps by asserting the appropriate register enable and write-enable lines in sync with the clock.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q22', 70),
  ('dce00000-0000-0000-0000-000000000071', 'a1000000-0000-0000-0000-000000000005', 'A processor design team must decide which flags to include in the status register for efficient decision-making in control systems. Including more flags increases flexibility but adds complexity. The system must support accurate branching while maintaining performance. Engineers must evaluate which flags are essential for system operation.

Formulate a strategy for selecting flags in processor design.', '### Flag Selection Strategy:
Status flags should be selected based on the requirements of the instruction set:
1. **Zero ($Z$)**: Required for loop termination checks.
2. **Sign ($S$)**: Required for signed number comparisons.
3. **Carry ($C$)**: Required for multi-byte arithmetic and unsigned comparisons.
4. **Overflow ($V$)**: Required to detect errors in signed arithmetic.

### Recommendation:
Include these four primary flags as a unified **Processor Status Word (PSW)**, which provides enough information for standard control logic without excessive hardware cost.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q23', 71),
  ('dce00000-0000-0000-0000-000000000072', 'a1000000-0000-0000-0000-000000000005', 'A high-speed data processing unit uses status flags to monitor arithmetic results and guide execution decisions. Increasing the number of flags improves condition tracking but may slow down processing due to additional hardware complexity. The system must balance performance with accurate condition monitoring. Engineers must evaluate how flag usage affects scalability and efficiency in large-scale systems.

Analyze how the number of flags influences system performance and scalability.', '### Performance Impact of Flags:
Increasing the number of flags (e.g., adding Parity, Auxiliary Carry, Zero-detect for specific registers) improves debugging and condition tracking but increases hardware complexity.
* **Control Path Delays**: The ALU must compute and write to more flag registers on every clock cycle. This increases routing congestion and setup times, limiting maximum clock frequencies.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q24', 72),
  ('dce00000-0000-0000-0000-000000000073', 'a1000000-0000-0000-0000-000000000005', 'A computing system performs operations using register reference instructions where data is manipulated directly within CPU registers without accessing memory. The system uses accumulator and general-purpose registers to perform arithmetic and logical operations efficiently. Engineers must evaluate how these instructions improve system performance and reduce execution time.

Evaluate the effectiveness of register reference instructions.', '### Effectiveness of Register Reference Instructions:
Register reference instructions (e.g., `CMA` - Complement Accumulator, `INC REG`) perform operations on operands stored within the CPU registers.
* **Pros**: 
  * They do not access memory, bypassing the memory bus bottleneck.
  * They execute in a single clock cycle.
  * The instruction word does not need an address field, leaving more bits for the opcode.
* **Cons**: Limited by the number of CPU registers.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q25', 73),
  ('dce00000-0000-0000-0000-000000000074', 'a1000000-0000-0000-0000-000000000005', 'A computing system processes large datasets using both direct and indirect addressing mechanisms. Direct addressing is faster but limited, while indirect addressing supports complex data structures with additional overhead. Engineers must evaluate trade-offs to design an efficient system.

Analyze the trade-offs between addressing modes.', '### Trade-off Comparison:
* **Direct Addressing**:
  * *Speed*: High (1 memory cycle).
  * *Flexibility*: Low (addresses are hardcoded in the instruction).
* **Indirect Addressing**:
  * *Speed*: Low (2 memory cycles).
  * *Flexibility*: High (allows pointers and dynamic memory allocation).

### Recommendation:
For high-performance applications, use **Register Indirect Addressing** (using a CPU register to hold the address), which combines the speed of register access with the flexibility of indirect addressing.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q26', 74),
  ('dce00000-0000-0000-0000-000000000075', 'a1000000-0000-0000-0000-000000000005', 'A processor executes register instructions involving multiple steps controlled by the control unit. The engineer must outline the sequence of execution.

Construct the execution flow.', 'The execution flow of a Register Reference instruction:

```mermaid
graph TD
    A[Fetch: PC -> MAR -> Memory -> MDR -> IR] --> B[Decode: Identify as Register Reference]
    B --> C[Execute: ALU operates directly on target register]
    C --> D[Writeback: Save result to target register]
```

1. **Fetch**: The instruction is loaded into the IR.
2. **Decode**: The control unit identifies that the instruction does not access memory (e.g., MSB bits specify register mode).
3. **Execute**: The ALU performs the operation (e.g., complement) directly on the target register. No memory read/write cycles occur.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q27', 75),
  ('dce00000-0000-0000-0000-000000000076', 'a1000000-0000-0000-0000-000000000005', 'A system combines extended register operations with indirect addressing to handle dynamic data structures efficiently. The engineer must relate these concepts to system functionality.

Relate the concepts.', 'Combining extended register operations with indirect addressing enables efficient data structure traversal.

### Integration:
Pointer registers (e.g., $HL$ in 8085, index registers in modern CPUs) hold the effective address of the data. 
* By combining this with register instructions like auto-increment (e.g., `LD A, (HL+)`), the CPU can read the data and increment the memory pointer in a single instruction, minimizing code size and execution time.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q28', 76),
  ('dce00000-0000-0000-0000-000000000077', 'a1000000-0000-0000-0000-000000000005', 'A system uses multiple jump and call instructions to manage execution flow in complex applications. While these provide flexibility, they may introduce overhead and reduce readability. Engineers must evaluate trade-offs.

Analyze the trade-offs.', '### Jump and Call Trade-offs:
* **Jump (Unconditional/Conditional)**: Alters execution flow by writing a new address to the PC.
  * *Pros*: Simple, low overhead.
  * *Cons*: Breaks sequential execution, flushing the instruction pipeline (branch penalty).
* **Call**: Saves the return address on the stack before branching.
  * *Pros*: Enables reusable subroutines.
  * *Cons*: Requires memory writes (pushing the PC to stack), which increases latency.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q29', 77),
  ('dce00000-0000-0000-0000-000000000078', 'a1000000-0000-0000-0000-000000000005', 'A large-scale application uses stack organization to manage function calls, recursion, and interrupt handling. While stacks provide structured execution flow, they consume memory and may cause overflow in deep recursive calls. The system must balance efficient execution with memory constraints. Engineers must evaluate trade-offs between stack usage, performance, and scalability.

Analyze the impact of stack organization on system performance and scalability.', 'Stack organization (LIFO - Last In First Out) is essential for nesting function calls and handling interrupts.

### Impact on Performance:
* **Stack Pointer (SP)**: Tracks the top of the stack in RAM.
* **Overhead**: Every function call requires pushing parameters and the return address to the stack, increasing memory bus traffic.
* **Scalability Limitations**: Deep recursion can exceed the allocated stack space, causing a **Stack Overflow** which crashes the application.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q30', 78),
  ('dce00000-0000-0000-0000-000000000079', 'a1000000-0000-0000-0000-000000000005', 'A processor executes call and return instructions requiring saving and restoring execution addresses using stack memory. The engineer must outline the execution process.

Develop the sequence of operations.', 'The sequence of operations for Call and Return:

```mermaid
graph TD
    subgraph CALL Sequence
    A1["SP <- SP - 1"] --> A2["Memory[SP] <- PC"]
    A2 --> A3["PC <- Target Subroutine Address"]
    end
    subgraph RETURN Sequence
    B1["PC <- Memory[SP]"] --> B2["SP <- SP + 1"]
    end
```

### 1. CALL Target Address
* **$T_3$**: $SP \leftarrow SP - 1$
* **$T_4$**: $Memory[SP] \leftarrow PC$ (push return address to stack)
* **$T_5$**: $PC \leftarrow \text{Target Address}$ (branch to subroutine)

### 2. RET (Return from Subroutine)
* **$T_3$**: $PC \leftarrow Memory[SP]$ (pop return address)
* **$T_4$**: $SP \leftarrow SP + 1$ (increment stack pointer)', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q31', 79),
  ('dce00000-0000-0000-0000-000000000080', 'a1000000-0000-0000-0000-000000000005', 'A processor executes a sequence of push and pop operations where multiple data values are stored and retrieved from the stack. The engineer must model how the stack pointer changes and how data is managed during execution. Accurate modeling ensures correct execution flow.

Determine how stack operations affect stack pointer movement.', 'Stack operations modify the Stack Pointer ($SP$) as follows:

### 1. PUSH Operation
The SP is decremented first (assuming stack grows downward), then the data is written:
$$SP \leftarrow SP - 1$$
$$Memory[SP] \leftarrow \text{Data}$$

### 2. POP Operation
The data is read from the current SP address, then the SP is incremented:
$$\text{Data} \leftarrow Memory[SP]$$
$$SP \leftarrow SP + 1$$

This ensures that the SP always points to the top of the stack, preventing data corruption.', NULL, '22AM206 - Digital Computer Electronics', 'Module Test-II Q32', 80)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;
