INSERT INTO questions (id, subject_id, question, answer, image_url, "references", notes, order_index) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'A robot moves in straight lines described by $y = mx + c$ where slope varies with terrain.

**Form differential equation when both m and c are arbitrary and justify order.**', '# Question
A robot moves in straight lines described by $y = mx + c$ where slope varies with terrain. Form differential equation when both $m$ and $c$ are arbitrary and justify order.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Formation of Ordinary Differential Equations
* **Why Applicable**: The relationship describes a family of curves with two arbitrary parameters ($m$ and $c$). We eliminate these parameters to find the governing differential equation.

---

# Pattern Recognition Trick
Look at the number of arbitrary constants. The number of arbitrary constants in a family of curves is equal to the order of the resulting differential equation.
* Equation: $y = mx + c$
* Arbitrary Constants: $m$, $c$ (count = 2)
* Target Order: 2

---

# Shortcut / Exam Trick
If a family of curves is linear in $x$ (i.e., of the form $y = c_1 x + c_2$), the second derivative is always zero.
$$\frac{d^2y}{dx^2} = 0$$

---

# Step-by-Step Solution
1. Start with the given equation:
   $$y = mx + c$$
2. Differentiate both sides with respect to $x$:
   $$\frac{dy}{dx} = m$$
3. Differentiate again with respect to $x$ to eliminate $m$:
   $$\frac{d^2y}{dx^2} = 0$$
4. The arbitrary constants $m$ and $c$ are completely eliminated. The resulting equation is:
   $$y'''' = 0$$

---

# Why This Step Works
* We differentiate the first time to eliminate the constant $c$ (the derivative of a constant is $0$).
* We differentiate the second time because $m$ is still present, and differentiating it yields $0$, thus eliminating both constants.

---

# Formula Used
* $\frac{d}{dx}(ax) = a$
* $\frac{d}{dx}(\text{constant}) = 0$

---

# Similar Patterns to Remember
* $y = ax + b \implies y'''' = 0$
* $y = c_1 e^x + c_2 \implies y'''' - y'' = 0$
* $y = ax^2 + bx + c \implies y'''''' = 0$

---

# Common Mistakes
* Differentiating only once and leaving $m$ in the equation: $\frac{dy}{dx} = m$ is not a differential equation of the family since it still contains the arbitrary constant $m$.
* Incorrectly assuming the order is 1 because $y = mx + c$ looks like a first-degree polynomial.

---

# Final Answer
$$\boxed{\frac{d^2y}{dx^2} = 0}$$

---

# 10-Second Revision Notes
✓ Count constants: $m, c$ (two constants)
✓ Differentiate twice: $y'' = m \implies y'''' = 0$
✓ Confirm no constants remain.
✓ Order of equation = 2.

---

# Memory Trick
"Number of constants to erase = number of times you must differentiate."

---

# Exam Confidence Booster
Spotting a two-constant linear family like $y = mx + c$ means the answer is immediately $y'''' = 0$ (takes under 5 seconds in exams).', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q1', 1),
  ('e1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'A sensor output follows

$$
y=e^{bx}(a\cos x)
$$
**Identify the order of resulting differential equation and justify.**', '# Question
A sensor output follows $y = e^{bx}(a\cos x)$. Identify the order of resulting differential equation and justify.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Formation and Order of ODEs
* **Why Applicable**: The order of a differential equation is determined by the number of independent arbitrary constants present in its general solution.

---

# Pattern Recognition Trick
Count the distinct arbitrary constants in the equation:
* Expression: $y = e^{bx}(a\cos x)$
* Constants: $a$ (amplitude) and $b$ (frequency decay constant)
* Number of independent parameters = 2.
* Therefore, the order of the resulting differential equation must be 2.

---

# Shortcut / Exam Trick
For any function of the form $y = c_1 e^{\alpha x} \cos(\beta x) + c_2 e^{\alpha x} \sin(\beta x)$, the order is always 2 because it represents a second-order system (decaying oscillator). Even if only one trigonometric term is present (like $a\cos x$), the presence of the frequency decay parameter $b$ and scale parameter $a$ yields order 2.

---

# Step-by-Step Solution
1. Identify the given equation:
   $$y = a e^{bx} \cos x$$
2. Since there are 2 arbitrary constants ($a$ and $b$), the differential equation will require differentiating twice.
3. Differentiate once:
   $$y'' = a b e^{bx} \cos x - a e^{bx} \sin x = b y - a e^{bx} \sin x$$
4. Differentiate again:
   $$y'''' = b y'' - a b e^{bx} \sin x - a e^{bx} \cos x = b y'' + b(y'' - b y) - y = 2b y'' - (b^2 + 1)y$$
5. Rearranging gives:
   $$y'''' - 2b y'' + (b^2 + 1)y = 0$$
   This is a second-order differential equation.

---

# Why This Step Works
* We differentiate to establish relationships between $y, y'', y''''$ that allow algebraic elimination of the arbitrary constants $a$ and $b$.
* The highest derivative is $y''''$, making the order 2.

---

# Formula Used
* Product Rule: $(uv)'' = u''v + uv''$
* Derivative of $\cos x$: $-\sin x$

---

# Similar Patterns to Remember
* $y = a e^{bx} \sin x \implies$ Order 2
* $y = a \cos(bx + c) \implies$ Order 2
* $y = a e^x + b e^{2x} \implies$ Order 2

---

# Common Mistakes
* Incorrectly claiming the order is 1 by assuming $b$ is a fixed constant rather than an arbitrary constant.
* Confusing order (highest derivative) with degree (power of highest derivative).

---

# Final Answer
$$\boxed{\text{Order} = 2}$$

---

# 10-Second Revision Notes
✓ Count parameters: $a, b \implies$ 2 parameters.
✓ Number of parameters = Order of ODE.
✓ Therefore, Order = 2.

---

# Memory Trick
"Count the constants to find the order of the dance."

---

# Exam Confidence Booster
Any exponential-trig product with two parameters is instantly recognized as a second-order system. Solve in 5 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q2', 2),
  ('e1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'A body is dropped from rest.

**Formulate the differential equation and find velocity.**', '# Question
A body is dropped from rest. Formulate the differential equation and find velocity.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First-Order Linear Equations (Physical Applications)
* **Why Applicable**: The motion of a falling body under gravity is governed by Newton''s Second Law of Motion, relating acceleration (derivative of velocity) to gravity.

---

# Pattern Recognition Trick
"Dropped from rest" implies:
* Initial velocity $v(0) = 0$
* Acceleration is constant ($g$).
* The rate of change of velocity is constant: $\frac{dv}{dt} = g$.

---

# Shortcut / Exam Trick
For constant acceleration $a$, velocity is always $v = at + v_0$.
Since it starts from rest ($v_0 = 0$):
$$v = gt$$

---

# Step-by-Step Solution
1. Apply Newton''s Second Law:
   $$F = ma \implies m \frac{dv}{dt} = mg$$
2. Simplify the differential equation by dividing by $m$:
   $$\frac{dv}{dt} = g$$
3. Separate variables:
   $$dv = g \, dt$$
4. Integrate both sides:
   $$\int dv = \int g \, dt \implies v(t) = gt + C$$
5. Apply the initial condition (dropped from rest $\implies v(0) = 0$):
   $$0 = g(0) + C \implies C = 0$$
6. Write the final expression for velocity:
   $$v(t) = gt$$

---

# Why This Step Works
* Dividing by mass $m$ shows that acceleration under gravity is independent of the mass of the body.
* Integrating the acceleration gives the velocity function. Applying $v(0)=0$ determines the constant of integration.

---

# Formula Used
* Newton''s Law: $F = m \frac{dv}{dt}$
* Integration: $\int 1 \, dx = x + C$

---

# Similar Patterns to Remember
* Object thrown downwards with initial velocity $u \implies v = gt + u$
* Motion with constant deceleration $a \implies v = -at + u$

---

# Common Mistakes
* Forgetting the initial condition and leaving the constant $C$ in the final velocity formula.
* Confusing displacement $s(t)$ with velocity $v(t)$.

---

# Final Answer
$$\boxed{\text{Differential Equation: } \frac{dv}{dt} = g, \quad \text{Velocity: } v(t) = gt}$$

---

# 10-Second Revision Notes
✓ Model: $v'' = g$
✓ Integrate: $v = gt + C$
✓ Rest condition: $v(0) = 0 \implies C = 0$
✓ Result: $v = gt$

---

# Memory Trick
"Gravity pulls at rate $g$; over time $t$, velocity is simply $gt$."

---

# Exam Confidence Booster
For any free fall from rest without air resistance, write down $v = gt$ immediately. Takes less than 10 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q3', 3),
  ('e1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 'Apply Newton''s law of cooling to formulate the differential equation for an object at $90^\circ C$ placed in a surrounding of $25^\circ C$.', '# Question
Apply Newton''s law of cooling to formulate the differential equation for an object at $90^\circ C$ placed in a surrounding of $25^\circ C$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Newton''s Law of Cooling
* **Why Applicable**: The rate of change of temperature of an object is proportional to the difference between its own temperature and the surrounding temperature.

---

# Pattern Recognition Trick
Identify:
* Object temperature: $T$
* Ambient (surrounding) temperature: $T_s = 25^\circ C$
* Initial Condition: $T(0) = 90^\circ C$
* Proportionality constant: $k > 0$

---

# Shortcut / Exam Trick
The standard form of Newton''s law of cooling is:
$$\frac{dT}{dt} = -k(T - T_s)$$
Substitute $T_s = 25$ directly:
$$\frac{dT}{dt} = -k(T - 25)$$

---

# Step-by-Step Solution
1. State Newton''s Law of Cooling:
   $$\frac{dT}{dt} \propto (T - T_s)$$
2. Introduce the constant of proportionality $-k$ (negative because the object is cooling):
   $$\frac{dT}{dt} = -k(T - T_s)$$
3. Substitute the surrounding temperature $T_s = 25^\circ C$:
   $$\frac{dT}{dt} = -k(T - 25)$$
4. State the initial condition:
   $$T(0) = 90$$

---

# Why This Step Works
* The negative sign is crucial because the temperature is decreasing over time ($T > T_s \implies dT/dt < 0$).
* Substituting $T_s = 25$ customizes the general law to this specific problem environment.

---

# Formula Used
* Newton''s Law of Cooling: $\frac{dT}{dt} = -k(T - T_s)$

---

# Similar Patterns to Remember
* Heating an object in a $100^\circ C$ oven: $\frac{dT}{dt} = -k(T - 100)$
* Temperature change in a $0^\circ C$ freezer: $\frac{dT}{dt} = -k T$

---

# Common Mistakes
* Using $+k$ instead of $-k$, which would model the temperature of a hot object growing exponentially hotter in a cold room.
* Substituting the initial temperature $90$ in place of the ambient temperature $T_s$.

---

# Final Answer
$$\boxed{\frac{dT}{dt} = -k(T - 25) \quad \text{with } T(0) = 90^\circ C}$$

---

# 10-Second Revision Notes
✓ Newton''s Law: $T'' = -k(T - T_s)$
✓ Plug in $T_s = 25$
✓ Specify initial state: $T(0) = 90$

---

# Memory Trick
"Cooling goes down (-) towards the room temperature limit ($T - T_s$)."

---

# Exam Confidence Booster
Recognizing Newton''s cooling pattern allows you to write down the differential equation in a single step.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q4', 4),
  ('e1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001', 'Fluid flow velocity is given by

$$
y=\frac{a}{x}+b
$$
where constants depend on system pressure.

**Form the differential equation and interpret the result.**', '# Question
Fluid flow velocity is given by $y = \frac{a}{x} + b$ where constants depend on system pressure. Form the differential equation and interpret the result.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Elimination of Arbitrary Constants
* **Why Applicable**: We are given a function representing fluid velocity with two arbitrary constants ($a$ and $b$). Differentiating twice allows us to eliminate both parameters.

---

# Pattern Recognition Trick
* Function: $y = \frac{a}{x} + b$
* Parameters to eliminate: $a$, $b$ (count = 2)
* Order of differential equation: 2.

---

# Shortcut / Exam Trick
If $y = a x^{-1} + b$, then $y'' = -a x^{-2}$ and $y'''' = 2a x^{-3}$.
Notice the ratio:
$$\frac{y''''}{y''} = \frac{2a x^{-3}}{-a x^{-2}} = -\frac{2}{x} \implies x y'''' + 2y'' = 0$$

---

# Step-by-Step Solution
1. Start with the velocity function:
   $$y = a x^{-1} + b$$
2. Differentiate with respect to $x$:
   $$y'' = -a x^{-2} = -\frac{a}{x^2}$$
3. Differentiate again with respect to $x$:
   $$y'''' = 2a x^{-3} = \frac{2a}{x^3}$$
4. Eliminate $a$ by expressing it from the first derivative:
   $$a = -x^2 y''$$
5. Substitute this value of $a$ into the second derivative:
   $$y'''' = \frac{2(-x^2 y'')}{x^3} = -\frac{2y''}{x}$$
6. Rearrange terms to obtain the final ODE:
   $$x y'''' + 2y'' = 0$$

---

# Why This Step Works
* Differentiating once eliminates the constant parameter $b$.
* The second differentiation gives another expression containing $a$. By substitution, we eliminate $a$, leaving a relationship purely between $x, y'', y''''$.

---

# Formula Used
* Power Rule: $\frac{d}{dx}(x^n) = n x^{n-1}$

---

# Similar Patterns to Remember
* $y = \frac{a}{x^2} + b \implies x y'''' + 3y'' = 0$
* $y = ax^2 + b \implies x y'''' - y'' = 0$

---

# Common Mistakes
* Leaving the constants $a$ or $b$ in the final differential equation.
* Incorrectly differentiating $x^{-1}$ as $\ln x$ instead of $-x^{-2}$.

---

# Final Answer
$$\boxed{x \frac{d^2y}{dx^2} + 2\frac{dy}{dx} = 0}$$

---

# 10-Second Revision Notes
✓ Differentiate once: $y'' = -a/x^2$
✓ Differentiate twice: $y'''' = 2a/x^3$
✓ Substitute $a = -x^2 y''$ into $y''''$
✓ Simplify to $x y'''' + 2y'' = 0$

---

# Memory Trick
"For reciprocal powers, the ratio of derivatives eliminates the constant automatically."

---

# Exam Confidence Booster
Elimination of constants for $y = a/x + b$ leads straight to $x y'''' + 2y'' = 0$. Memorize this profile to solve it instantly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q5', 5),
  ('e1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001', 'A sensor output follows

$$
y=e^x(a\cos x+b\sin x)
$$
**Identify the order of resulting differential equation and justify.**', '# Question
A sensor output follows $y = e^x(a\cos x + b\sin x)$. Identify the order of resulting differential equation and justify.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Formation of Ordinary Differential Equations
* **Why Applicable**: The given equation represents a family of curves with two arbitrary constants ($a$ and $b$). The order of the governing differential equation is equal to the number of arbitrary constants.

---

# Pattern Recognition Trick
Identify the arbitrary constants.
* Equation: $y = e^x(a\cos x + b\sin x)$
* Constants: $a, b$ (count = 2)
* Target Order: 2

---

# Shortcut / Exam Trick
For any function of the form $y = e^{lpha x}(C_1 \cos eta x + C_2 \sin eta x)$, the characteristic equation is $(m - lpha)^2 + eta^2 = 0 \implies m^2 - 2lpha m + (lpha^2 + eta^2) = 0$.
Here, $lpha = 1, eta = 1$.
The differential equation is: $y'''' - 2y'' + 2y = 0$, which is of order 2.

---

# Step-by-Step Solution
1. Start with the given equation:
   $$y = e^x(a\cos x + b\sin x)$$  --- (1)
2. Differentiate with respect to $x$:
   $$y'' = e^x(a\cos x + b\sin x) + e^x(-a\sin x + b\cos x)$$
   $$y'' = y + e^x(-a\sin x + b\cos x)$$  --- (2)
3. Differentiate again with respect to $x$:
   $$y'''' = y'' + e^x(-a\sin x + b\cos x) + e^x(-a\cos x - b\sin x)$$
4. Substitute equation (2) and (1) into the expression for $y''''$:
   $$y'''' = y'' + (y'' - y) - y$$
   $$y'''' = 2y'' - 2y \implies y'''' - 2y'' + 2y = 0$$
5. Order: The highest derivative is $y''''$, so the order is 2.

---

# Why This Step Works
* Differentiating twice is necessary to generate enough independent equations to eliminate the two arbitrary constants $a$ and $b$.

---

# Formula Used
* Product Rule: $\frac{d}{dx}(uv) = u''v + uv''$
* derivatives: $\frac{d}{dx}(\cos x) = -\sin x$, $\frac{d}{dx}(\sin x) = \cos x$

---

# Similar Patterns to Remember
* $y = e^{2x}(a\cos 3x + b\sin 3x) \implies y'''' - 4y'' + 13y = 0$ (Order 2)

---

# Common Mistakes
* Guessing order 1 because of a single exponential term.
* Forgetting to apply the product rule when differentiating $e^x(a\cos x + b\sin x)$.

---

# Final Answer
$$\boxed{\text{Order: } 2. \text{ The resulting differential equation is } y'''' - 2y'' + 2y = 0.}$$

---

# 10-Second Revision Notes
✓ Count arbitrary constants: $a, b \implies 2$ constants.
✓ Therefore, the order of the resulting differential equation must be exactly 2.

---

# Memory Trick
"Number of arbitrary constants = Order of the differential equation."

---

# Exam Confidence Booster
Instantly count independent parameters. If you see $a$ and $b$ multiplying linearly independent functions, order is 2. No differentiation needed to determine order!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q6', 6),
  ('e1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 'A sensor cools from $90^\circ C$ to $70^\circ C$ in 8 minutes in a $20^\circ C$ room.

**Find the cooling constant k.**', '# Question
A sensor cools from $90^\circ C$ to $70^\circ C$ in 8 minutes in a $20^\circ C$ room. Find the cooling constant $k$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Newton''s Law of Cooling
* **Why Applicable**: The rate of change of temperature is proportional to the difference between the object''s temperature and the surrounding medium''s temperature.

---

# Pattern Recognition Trick
Look for temperature change over time in a medium of constant temperature:
* $T(0) = T_0 = 90$
* $T(8) = 70$
* Surrounding Temperature $T_s = 20$

---

# Shortcut / Exam Trick
Use the integrated form:
$$k = \frac{1}{t} \ln\left(\frac{T_0 - T_s}{T(t) - T_s}\right)$$
Substitute the values directly:
$$k = \frac{1}{8} \ln\left(\frac{90 - 20}{70 - 20}\right) = \frac{1}{8} \ln(1.4)$$

---

# Step-by-Step Solution
1. Set up the differential equation:
   $$\frac{dT}{dt} = -k(T - T_s)$$
2. Separate variables and integrate:
   $$\ln(T - T_s) = -kt + C \implies T(t) = T_s + (T_0 - T_s)e^{-kt}$$
3. Substitute $T_s = 20$ and $T_0 = 90$:
   $$T(t) = 20 + 70e^{-kt}$$
4. Use the boundary condition $T(8) = 70$:
   $$70 = 20 + 70e^{-8k} \implies 50 = 70e^{-8k}$$
   $$e^{-8k} = \frac{5}{7} \implies -8k = \ln(5/7)$$
   $$k = \frac{1}{8} \ln(7/5) = \frac{1}{8} \ln(1.4) \approx 0.042 \text{ min}^{-1}$$

---

# Why This Step Works
* Separating variables converts the physical rate equation into an algebraic relation between temperature and time.

---

# Formula Used
* $T(t) = T_s + (T_0 - T_s)e^{-kt}$
* $\ln(a/b) = -\ln(b/a)$

---

# Similar Patterns to Remember
* Cooling from $80^\circ C$ to $60^\circ C$ in $10^\circ C$ environment: $k = \frac{1}{t} \ln(\frac{70}{50})$.

---

# Common Mistakes
* Using $T_0$ instead of $T_0 - T_s$ in the denominator.
* Forgetting to subtract room temperature $T_s$.

---

# Final Answer
$$\boxed{k = \frac{1}{8}\ln(1.4) \approx 0.042 \text{ min}^{-1}}$$

---

# 10-Second Revision Notes
✓ $T(t) = T_s + A e^{-kt}$
✓ $70 = 20 + 70e^{-8k} \implies e^{-8k} = 5/7$
✓ $k = \frac{1}{8}\ln(1.4)$

---

# Memory Trick
"Cooling is proportional to the excess temperature $(T - T_s)$."

---

# Exam Confidence Booster
Check if $k > 0$. If you get a negative value, you flipped the numerator and denominator in the log!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q7', 7),
  ('e1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000001', 'Apply the concept of free fall to construct the differential equation and determine the velocity of a body dropped from rest.', '# Question
Apply the concept of free fall to construct the differential equation and determine the velocity of a body dropped from rest.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Applications (Free Fall)
* **Why Applicable**: A falling body experiences acceleration due to gravity, which is the rate of change of velocity: $dv/dt = g$.

---

# Pattern Recognition Trick
"Dropped from rest" means $v(0) = 0$ under gravity $g$.

---

# Shortcut / Exam Trick
For constant acceleration $g$, velocity is simply linear with time:
$$v = gt$$

---

# Step-by-Step Solution
1. Set up the Newton''s second law equation:
   $$m\frac{dv}{dt} = mg \implies \frac{dv}{dt} = g$$
2. Integrate with respect to $t$:
   $$v(t) = gt + C$$
3. Apply initial condition "dropped from rest": $v(0) = 0$:
   $$0 = g(0) + C \implies C = 0$$
4. Obtain the final velocity function:
   $$v(t) = gt$$

---

# Why This Step Works
* Integrating the constant acceleration of gravity yields a linear velocity function over time.

---

# Formula Used
* $\int g \, dt = gt + C$

---

# Similar Patterns to Remember
* Constant deceleration $a$: $v(t) = v_0 - at$.

---

# Common Mistakes
* Leaving the integration constant $C$ without applying the initial condition.
* Confusing distance with velocity.

---

# Final Answer
$$\boxed{\frac{dv}{dt} = g \text{ and } v(t) = gt}$$

---

# 10-Second Revision Notes
✓ $v'' = g \implies v = gt + C$
✓ Rest $\implies C = 0 \implies v = gt$.

---

# Memory Trick
"Velocity starts at zero and grows by $g$ every second."

---

# Exam Confidence Booster
Free fall without air resistance always yields $v = gt$. Use this to write down the solution in seconds.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q8', 8),
  ('e1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000001', 'In an electric vehicle battery cooling system, the temperature $T$ satisfies

$$
\frac{dT}{dt}=-k(T-T_a)
$$
where $T_a$ is ambient temperature.

**Solve using separation of variables and evaluate the time required for the battery to reach a safe temperature given initial conditions.**', '# Question
In an electric vehicle battery cooling system, the temperature $T$ satisfies $\frac{dT}{dt} = -k(T - T_a)$ where $T_a$ is ambient temperature. Solve using separation of variables and evaluate the time required for the battery to reach a safe temperature given initial conditions.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Variables Separable Method
* **Why Applicable**: The temperature terms and time terms can be completely separated onto opposite sides of the equation.

---

# Pattern Recognition Trick
Equation is of the form: $\frac{dT}{dt} = f(T)$. Move all $T$ terms to LHS and $dt$ to RHS.

---

# Shortcut / Exam Trick
The solution for any cooling system is:
$$t = \frac{1}{k} \ln\left(\frac{T_0 - T_a}{T_{safe} - T_a}\right)$$

---

# Step-by-Step Solution
1. Start with the differential equation:
   $$\frac{dT}{dt} = -k(T - T_a)$$
2. Separate variables:
   $$\frac{dT}{T - T_a} = -k \, dt$$
3. Integrate both sides:
   $$\ln|T - T_a| = -kt + C \implies T - T_a = A e^{-kt}$$
4. Apply initial condition $T(0) = T_0$:
   $$A = T_0 - T_a \implies T(t) = T_a + (T_0 - T_a)e^{-kt}$$
5. To find the time $t_{safe}$ to reach $T_{safe}$:
   $$T_{safe} - T_a = (T_0 - T_a)e^{-k t_{safe}}$$
   $$e^{-k t_{safe}} = \frac{T_{safe} - T_a}{T_0 - T_a} \implies -k t_{safe} = \ln\left(\frac{T_{safe} - T_a}{T_0 - T_a}\right)$$
   $$t_{safe} = \frac{1}{k} \ln\left(\frac{T_0 - T_a}{T_{safe} - T_a}\right)$$

---

# Why This Step Works
* Separation of variables allows us to integrate each side independently with respect to its own variable.

---

# Formula Used
* $\int \frac{1}{x} \, dx = \ln|x|$
* $\int k \, dt = kt$

---

# Similar Patterns to Remember
* Radioactive decay $\frac{dN}{dt} = -kN \implies N(t) = N_0 e^{-kt}$.

---

# Common Mistakes
* Writing $T(t) = T_0 e^{-kt}$ and forgetting the offset ambient temperature $T_a$.
* Flipping the numerator and denominator in the final logarithm.

---

# Final Answer
$$\boxed{T(t) = T_a + (T_0 - T_a)e^{-kt} \quad \text{and} \quad t = \frac{1}{k} \ln\left(\frac{T_0 - T_a}{T_{safe} - T_a}\right)}$$

---

# 10-Second Revision Notes
✓ Separated: $\frac{dT}{T - T_a} = -k \, dt$
✓ Integrate: $\ln(T-T_a) = -kt + C$
✓ Solve for $t$: $t = \frac{1}{k}\ln(\frac{\Delta T_{initial}}{\Delta T_{final}})$

---

# Memory Trick
"Time taken is proportional to log of ratio of initial to final temperature difference."

---

# Exam Confidence Booster
Check dimensions: the argument of the natural logarithm must be dimensionless (ratio of temperatures). This ensures your formula is set up correctly.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q9', 9),
  ('e1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000001', 'A vehicle slows down in water where deceleration is proportional to velocity. Initial velocity is 20 m/s. After 5 seconds, velocity becomes 10 m/s.

**Formulate, solve, and interpret velocity after 10 seconds.**', '# Question
A vehicle slows down in water where deceleration is proportional to velocity. Initial velocity is 20 m/s. After 5 seconds, velocity becomes 10 m/s. Formulate, solve, and interpret velocity after 10 seconds.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Applications (Deceleration)
* **Why Applicable**: Deceleration is $-dv/dt$, which is proportional to velocity $v$: $dv/dt = -kv$.

---

# Pattern Recognition Trick
"Deceleration proportional to velocity" means exponential decay:
* $v(0) = v_0 = 20$
* $v(5) = 10$ (half of initial)

---

# Shortcut / Exam Trick
Since velocity halves every 5 seconds (from 20 to 10):
* At $t = 0$: $v = 20$
* At $t = 5$: $v = 10$
* At $t = 10$: $v = 5$ m/s (halves again!)

---

# Step-by-Step Solution
1. Set up the differential equation:
   $$\frac{dv}{dt} = -kv$$
2. Separate variables and integrate:
   $$\frac{dv}{v} = -k \, dt \implies \ln v = -kt + C \implies v(t) = v_0 e^{-kt}$$
3. Substitute initial velocity $v_0 = 20$:
   $$v(t) = 20e^{-kt}$$
4. Use condition $v(5) = 10$:
   $$10 = 20e^{-5k} \implies e^{-5k} = 0.5 \implies -5k = \ln(0.5) \implies k = \frac{\ln 2}{5} \approx 0.1386$$
5. Find velocity at $t = 10$:
   $$v(10) = 20 e^{-10k} = 20 (e^{-5k})^2 = 20 (0.5)^2 = 20 \times 0.25 = 5 \text{ m/s}$$

---

# Why This Step Works
* The rate of decay depends on the current velocity, leading to an exponential decay profile where the half-life is constant.

---

# Formula Used
* $v(t) = v_0 e^{-kt}$

---

# Similar Patterns to Remember
* Half-life decay: $N(t) = N_0(1/2)^{t/t_{half}}$.

---

# Common Mistakes
* Assuming the velocity decreases linearly (e.g., guessing $v(10) = 0$ since it lost 10 m/s in 5s).
* Using positive sign in the exponent for decay.

---

# Final Answer
$$\boxed{\frac{dv}{dt} = -kv, \quad v(t) = 20e^{-0.1386t}, \quad v(10) = 5 \text{ m/s}}$$

---

# 10-Second Revision Notes
✓ $v'' = -kv \implies v = v_0 e^{-kt}$
✓ $v(5) = 10 \implies e^{-5k} = 1/2$
✓ $v(10) = 20 (e^{-5k})^2 = 20(1/4) = 5$ m/s.

---

# Memory Trick
"In exponential decay, equal time intervals result in equal factor reductions."

---

# Exam Confidence Booster
Recognize half-lives. If it goes from 20 to 10 in 5s, it will go from 10 to 5 in another 5s (total 10s). You can write the answer instantly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q10', 10),
  ('e1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000001', 'In a wireless sensor system, signal strength $S$ decays as

$$
\frac{dh}{dt}=-k\sqrt{h}
$$
**Solve the equation using separation of variables and analyze how initial signal strength influences transmission range.**', '# Question
In a wireless sensor system, signal strength $S$ (written as $h$ in the formula $\frac{dh}{dt} = -k\sqrt{h}$) decays as $\frac{dh}{dt} = -k\sqrt{h}$. Solve the equation using separation of variables and analyze how initial signal strength influences transmission range.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Variables Separable Method
* **Why Applicable**: The variables $h$ and $t$ can be separated onto opposite sides of the equation.

---

# Pattern Recognition Trick
Separate $h$ terms: $\frac{dh}{\sqrt{h}} = -k \, dt$.

---

# Shortcut / Exam Trick
Integrating $h^{-1/2}$ yields $2\sqrt{h}$. The relation is:
$$t_{range} = \frac{2\sqrt{h_0}}{k}$$

---

# Step-by-Step Solution
1. Start with the differential equation:
   $$\frac{dh}{dt} = -k\sqrt{h}$$
2. Separate variables:
   $$h^{-1/2} \, dh = -k \, dt$$
3. Integrate both sides:
   $$2\sqrt{h} = -kt + C$$
4. Apply initial condition $h(0) = h_0$:
   $$2\sqrt{h_0} = C \implies 2\sqrt{h(t)} = 2\sqrt{h_0} - kt$$
5. Solve for $h(t)$:
   $$h(t) = \left(\sqrt{h_0} - \frac{kt}{2}\right)^2$$
6. Range Analysis: The transmission range terminates when signal strength $h(t) = 0$:
   $$\sqrt{h_0} - \frac{kt_{range}}{2} = 0 \implies t_{range} = \frac{2\sqrt{h_0}}{k}$$
   Thus, the transmission range is proportional to the square root of the initial signal strength $\sqrt{h_0}$.

---

# Why This Step Works
* Integration converts the rate of decay into a relationship mapping signal strength to elapsed time.

---

# Formula Used
* $\int x^n \, dx = \frac{x^{n+1}}{n+1}$ for $n = -1/2$.

---

# Similar Patterns to Remember
* Torricelli''s Law for draining a tank: $\frac{dh}{dt} = -c\sqrt{h}$.

---

# Common Mistakes
* Integrating $\frac{1}{\sqrt{h}}$ as $\ln(\sqrt{h})$.
* Assuming signal strength decays exponentially instead of quadratically.

---

# Final Answer
$$\boxed{h(t) = \left(\sqrt{h_0} - \frac{kt}{2}\right)^2 \quad \text{and} \quad t_{range} = \frac{2\sqrt{h_0}}{k}}$$

---

# 10-Second Revision Notes
✓ $h^{-1/2}dh = -kdt \implies 2\sqrt{h} = -kt + 2\sqrt{h_0}$
✓ $h(t) = 0 \implies t = \frac{2\sqrt{h_0}}{k}$
✓ Range scales as $\sqrt{h_0}$.

---

# Memory Trick
"Square root decay means the range depends on the square root of the starting value."

---

# Exam Confidence Booster
If asked about range dependency, remember: for $\frac{dh}{dt} = -k h^n$, the range scales with $h_0^{1-n}$. For $n=0.5$, $1-0.5 = 0.5$ (square root). Save time!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q11', 11),
  ('e1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000001', 'A bacterial culture grows from 500 to 1500 in 4 hours.

**Develop the model and predict population after 6 hours.**', '# Question
A bacterial culture grows from 500 to 1500 in 4 hours. Develop the model and predict population after 6 hours.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Exponential Growth
* **Why Applicable**: Population growth rate is proportional to the current population: $dN/dt = kN$.

---

# Pattern Recognition Trick
"Grows from 500 to 1500 in 4 hours":
* $N_0 = 500$
* $N(4) = 1500 = 3 N_0$ (triples in 4 hours)

---

# Shortcut / Exam Trick
Since population triples every 4 hours:
$$N(t) = 500 \times 3^{t/4}$$
For $t = 6$:
$$N(6) = 500 \times 3^{6/4} = 500 \times 3^{1.5} = 500 \times 3\sqrt{3} = 1500\sqrt{3} \approx 2598$$

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$\frac{dN}{dt} = kN \implies N(t) = N_0 e^{-kt}$$
2. Substitute $N_0 = 500$:
   $$N(t) = 500e^{-kt}$$
3. Use condition $N(4) = 1500$:
   $$1500 = 500e^{4k} \implies e^{4k} = 3 \implies k = \frac{\ln 3}{4} \approx 0.2747$$
4. Predict population at $t = 6$:
   $$N(6) = 500 e^{6k} = 500 e^{6 \frac{\ln 3}{4}} = 500 e^{1.5 \ln 3} = 500 \times 3^{1.5}$$
   $$N(6) = 500 \times 3\sqrt{3} = 1500\sqrt{3} \approx 2598 \text{ bacteria}$$

---

# Why This Step Works
* Unlimited resources lead to growth rate proportional to the population size, giving an exponential curve.

---

# Formula Used
* $N(t) = N_0 e^{-kt}$
* $e^{a \ln b} = b^a$

---

# Similar Patterns to Remember
* Doubling time model: $N(t) = N_0 2^{t/t_{double}}$.

---

# Common Mistakes
* Assuming linear growth (e.g., adding 1000 bacteria every 4 hours, which would give $500 + 1500 = 2000$ at 6 hours).
* Incorrectly evaluating $3^{1.5}$ as $4.5$.

---

# Final Answer
$$\boxed{N(t) = 500 e^{0.2747t} \quad \text{and} \quad N(6) = 1500\sqrt{3} \approx 2598}$$

---

# 10-Second Revision Notes
✓ $N = N_0 e^{kt} \implies N(4) = 500 e^{4k} = 1500 \implies e^{4k} = 3$
✓ $N(6) = 500 (e^{4k})^{1.5} = 500(3^{1.5}) = 1500\sqrt{3}$.

---

# Memory Trick
"Growth factor is $3^{t/4}$. Plug in $t=6$ to get factor $3^{1.5}$."

---

# Exam Confidence Booster
Expressing the base in terms of the growth multiplier (3) instead of $e$ makes the calculation much easier to evaluate without a scientific calculator.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q12', 12),
  ('e1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000001', 'A damping system in machinery follows

$$
\frac{dy}{dx}-\frac{2y}{x+1}=(x+1)^3
$$
An engineer incorrectly assumes integrating factor $e^{-2x}$, leading to wrong results.

**Identify the mistake, compute correct integrating factor, and solve the equation.**', '# Question
A damping system in machinery follows $\frac{dy}{dx} - \frac{2y}{x+1} = (x+1)^3$. An engineer incorrectly assumes integrating factor $e^{-2x}$, leading to wrong results. Identify the mistake, compute correct integrating factor, and solve the equation.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Linear ODE (Leibnitz Method)
* **Why Applicable**: The equation is in the standard first-order linear form: $\frac{dy}{dx} + P(x)y = Q(x)$.

---

# Pattern Recognition Trick
Identify $P(x)$ and $Q(x)$ from $\frac{dy}{dx} - \frac{2}{x+1}y = (x+1)^3$:
* $P(x) = -\frac{2}{x+1}$
* $Q(x) = (x+1)^3$

---

# Shortcut / Exam Trick
For $P(x) = \frac{n}{x+a}$, the integrating factor is:
$$IF = e^{\int \frac{n}{x+a} \, dx} = e^{n\ln(x+a)} = (x+a)^n$$
Here, $n = -2, a = 1 \implies IF = (x+1)^{-2} = \frac{1}{(x+1)^2}$.

---

# Step-by-Step Solution
1. Identify the engineer''s mistake:
   * The engineer assumed $P(x) = -2$ (a constant), ignoring the variable denominator $(x+1)$. Thus, they computed $IF = e^{\int -2 \, dx} = e^{-2x}$. This is incorrect because $P(x)$ is a function of $x$, i.e., $-\frac{2}{x+1}$.
2. Compute the correct Integrating Factor (IF):
   $$IF = e^{\int P(x)\,dx} = e^{\int -\frac{2}{x+1}\,dx} = e^{-2\ln|x+1|} = (x+1)^{-2} = \frac{1}{(x+1)^2}$$
3. Set up the solution format:
   $$y \cdot IF = \int Q(x) \cdot IF \, dx$$
4. Substitute the values:
   $$y \frac{1}{(x+1)^2} = \int (x+1)^3 \frac{1}{(x+1)^2} \, dx$$
   $$\frac{y}{(x+1)^2} = \int (x+1) \, dx = \frac{(x+1)^2}{2} + C$$
5. Solve for $y$:
   $$y(x) = \frac{(x+1)^4}{2} + C(x+1)^2$$

---

# Why This Step Works
* The integrating factor transforms the left side of the equation into the derivative of a product: $\frac{d}{dx}[y \cdot IF]$.

---

# Formula Used
* $IF = e^{\int P(x) \, dx}$
* $e^{\ln f(x)} = f(x)$

---

# Similar Patterns to Remember
* $y'' + \frac{y}{x} = x \implies IF = x$.

---

# Common Mistakes
* Forgetting the negative sign in $P(x) = -\frac{2}{x+1}$.
* Integrating $\ln(x+1)$ incorrectly.

---

# Final Answer
$$\boxed{\text{Mistake: Assumed } P(x) = -2; \quad IF = \frac{1}{(x+1)^2}; \quad y(x) = \frac{(x+1)^4}{2} + C(x+1)^2}$$

---

# 10-Second Revision Notes
✓ $P(x) = -2/(x+1) \implies IF = e^{-2\ln(x+1)} = (x+1)^{-2}$
✓ $y (x+1)^{-2} = \int (x+1) dx = \frac{1}{2}(x+1)^2 + C$
✓ Multiply: $y = \frac{1}{2}(x+1)^4 + C(x+1)^2$.

---

# Memory Trick
"Integrate the coefficient of $y$ in the exponent. Don''t omit the denominator!"

---

# Exam Confidence Booster
Check the final answer by differentiating: $y'' = 2(x+1)^3 + 2C(x+1)$. Plug it back in to confirm it matches the original differential equation. That ensures $100\%$ accuracy!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q13', 13),
  ('e1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000001', 'A viral infection spreads in a closed campus of 5000 students. Initially, 5 students are infected and after 4 days, 50 students are infected.

**Formulate the logistic model, determine constants, and evaluate infected population after 10 days.**', '# Question
A viral infection spreads in a closed campus of 5000 students. Initially, 5 students are infected and after 4 days, 50 students are infected. Formulate the logistic model, determine constants, and evaluate infected population after 10 days.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Logistic Growth Model
* **Why Applicable**: The spread of infection is limited by the finite population (carrying capacity $M = 5000$). The rate of growth is proportional to both the infected population and the remaining susceptible population.

---

# Pattern Recognition Trick
Look for growth limited by a maximum capacity value:
* Carrying capacity $M = 5000$
* Initial population $P(0) = 5$
* Midpoint state $P(4) = 50$

---

# Shortcut / Exam Trick
Use the standard logistic solution:
$$P(t) = \frac{M}{1 + Ae^{-kt}}$$
where $A = \frac{M - P_0}{P_0} = \frac{5000-5}{5} = 999$.

---

# Step-by-Step Solution
1. Formulate the logistic differential equation:
   $$\frac{dP}{dt} = kP\left(1 - \frac{P}{5000}\right)$$
2. Write the general solution:
   $$P(t) = \frac{5000}{1 + Ae^{-kt}}$$
3. Determine constant $A$ using $P(0) = 5$:
   $$5 = \frac{5000}{1 + A} \implies 1 + A = 1000 \implies A = 999$$
4. Determine constant $k$ using $P(4) = 50$:
   $$50 = \frac{5000}{1 + 999e^{-4k}} \implies 1 + 999e^{-4k} = 100$$
   $$999e^{-4k} = 99 \implies e^{-4k} = \frac{99}{999} = \frac{11}{111} \approx 0.0991$$
   $$-4k = \ln(0.0991) \implies k \approx 0.5786 \text{ day}^{-1}$$
5. Evaluate population at $t = 10$:
   $$e^{-10k} = (e^{-4k})^{2.5} \approx (0.0991)^{2.5} \approx 0.00306$$
   $$P(10) = \frac{5000}{1 + 999(0.00306)} = \frac{5000}{1 + 3.057} = \frac{5000}{4.057} \approx 1232 \text{ students}$$

---

# Why This Step Works
* The logistic model combines exponential growth at low numbers with an asymptotic slowing down as carrying capacity is approached.

---

# Formula Used
* $P(t) = \frac{M}{1 + Ae^{-kt}}$
* $A = \frac{M - P_0}{P_0}$

---

# Similar Patterns to Remember
* Market adoption of a technology in a population of size $N$.

---

# Common Mistakes
* Assuming simple exponential growth, which leads to values larger than the population of 5000.
* Forgetting to solve for $A$ before attempting to calculate $k$.

---

# Final Answer
$$\boxed{\frac{dP}{dt} = kP\left(1 - \frac{P}{5000}\right), \quad P(10) \approx 1232 \text{ students}}$$

---

# 10-Second Revision Notes
✓ $A = (5000-5)/5 = 999$
✓ $e^{-4k} = 99/999 = 11/111$
✓ $P(10) = 5000 / (1 + 999 \times (11/111)^{2.5}) \approx 1232$.

---

# Memory Trick
"Logistic curves shape like an ''S'': fast in the middle, slow at the top."

---

# Exam Confidence Booster
Always check that your computed population is less than the carrying capacity $M$. Here $1232 < 5000$, validating the result.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q14', 14),
  ('e1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000001', 'In an electric vehicle, the battery pack experiences non-uniform heating during fast charging. The temperature rise is influenced by internal resistance and external cooling, leading to the model

$$
\frac{dy}{dx}+3y=2x-1
$$
where $y$ represents temperature deviation and $x$ represents time.

**Find the temperature distribution using Leibnitz method and analyze whether the system reaches thermal stability.**', '# Question
In an electric vehicle, the battery pack experiences non-uniform heating during fast charging. The temperature rise is influenced by internal resistance and external cooling, leading to the model $\frac{dy}{dx} + 3y = 2x - 1$ where $y$ represents temperature deviation and $x$ represents time. Find the temperature distribution using Leibnitz method and analyze whether the system reaches thermal stability.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Linear ODE (Leibnitz Method)
* **Why Applicable**: The model has the form $y'' + Py = Q$ where $P = 3$ (constant) and $Q = 2x - 1$ (function of $x$).

---

# Pattern Recognition Trick
Identify $P$ and $Q$:
* $P = 3$
* $Q = 2x - 1$

---

# Shortcut / Exam Trick
For $y'' + ay = px + q$, the particular solution is of the form $y_p = Ax + B$.
Differentiate and substitute:
$$A + 3(Ax + B) = 2x - 1 \implies 3Ax + (A + 3B) = 2x - 1$$
* $3A = 2 \implies A = 2/3$
* $A + 3B = -1 \implies 2/3 + 3B = -1 \implies 3B = -5/3 \implies B = -5/9$
So $y_p = \frac{2x}{3} - \frac{5}{9}$.
The complete solution is $y = C e^{-3x} + \frac{2x}{3} - \frac{5}{9}$.

---

# Step-by-Step Solution
1. Identify coefficients: $P = 3, Q = 2x - 1$.
2. Compute Integrating Factor:
   $$IF = e^{\int 3 \, dx} = e^{3x}$$
3. Apply general solution formula:
   $$y \cdot e^{3x} = \int (2x - 1)e^{3x} \, dx$$
4. Integrate using integration by parts (Bernoulli''s rule):
   $$\int (2x - 1)e^{3x} \, dx = (2x - 1)\frac{e^{3x}}{3} - (2)\frac{e^{3x}}{9} + C$$
   $$y \cdot e^{3x} = \left(\frac{2x}{3} - \frac{1}{3} - \frac{2}{9}\right)e^{3x} + C = \left(\frac{2x}{3} - \frac{5}{9}\right)e^{3x} + C$$
5. Divide by $e^{3x}$:
   $$y(x) = \frac{2x}{3} - \frac{5}{9} + Ce^{-3x}$$
6. **Thermal Stability Analysis**:
   * As $x \to \infty$ (long time): the transient term $Ce^{-3x} \to 0$.
   * However, $y(x) \approx \frac{2x}{3} - \frac{5}{9}$, which grows linearly without bound as $x \to \infty$.
   * Thus, the system does not reach a constant thermal stability.

---

# Why This Step Works
* Multiplying by $e^{3x}$ bundles $y'' + 3y$ into a single derivative term, which is directly integrable.

---

# Formula Used
* $\int u \, dv = uv - \int v \, du$
* $\lim_{x \to \infty} e^{-3x} = 0$

---

# Similar Patterns to Remember
* Heating with constant power input: $y'' + ay = b \implies y = C e^{-ay} + b/a$ (this system *does* stabilize since the RHS is constant).

---

# Common Mistakes
* Forgetting to multiply the constant of integration $C$ by $e^{-3x}$ when dividing.
* Incorrectly concluding the system is stable because $e^{-3x}$ decays.

---

# Final Answer
$$\boxed{y(x) = \frac{2x}{3} - \frac{5}{9} + Ce^{-3x} \quad \text{and} \quad \text{System is unstable (grows linearly).}}$$

---

# 10-Second Revision Notes
✓ $IF = e^{3x}$
✓ $y e^{3x} = \int (2x-1)e^{3x} dx = \frac{1}{9}(6x-5)e^{3x} + C$
✓ $y = \frac{6x-5}{9} + Ce^{-3x}$.
✓ Growth is linear $\implies$ not stable.

---

# Memory Trick
"Linear forcing ($2x-1$) yields linear steady-state response. Constant values are needed for stability."

---

# Exam Confidence Booster
For $y'' + ay = px + q$, check the steady-state limit. If the power input term has an $x$ term, the final temperature will always diverge linearly.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q15', 15),
  ('e1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000001', 'A chemical reactor produces a substance limited by capacity 1000 units. Initially 50 units exist and after 2 hours it becomes 200 units.

**Formulate the logistic equation and analyze production after 6 hours.**', '# Question
A chemical reactor produces a substance limited by capacity 1000 units. Initially 50 units exist and after 2 hours it becomes 200 units. Formulate the logistic equation and analyze production after 6 hours.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Logistic Equation
* **Why Applicable**: Production has an upper ceiling limit (carrying capacity $M = 1000$ units), and growth depends on both current quantity and remaining room.

---

# Pattern Recognition Trick
Identify limits:
* $M = 1000$
* $P(0) = 50$
* $P(2) = 200$

---

# Shortcut / Exam Trick
Use the standard formula:
$$P(t) = \frac{M}{1 + Ae^{-kt}}$$
where $A = \frac{1000-50}{50} = 19$.

---

# Step-by-Step Solution
1. Set up the logistic model:
   $$P(t) = \frac{1000}{1 + 19e^{-kt}}$$
2. Find $k$ using $P(2) = 200$:
   $$200 = \frac{1000}{1 + 19e^{-2k}} \implies 1 + 19e^{-2k} = 5$$
   $$19e^{-2k} = 4 \implies e^{-2k} = \frac{4}{19} \approx 0.2105$$
   $$-2k = \ln(4/19) \implies k \approx 0.7791 \text{ hour}^{-1}$$
3. Predict population at $t = 6$:
   $$e^{-6k} = (e^{-2k})^3 = \left(\frac{4}{19}\right)^3 = \frac{64}{6859} \approx 0.00933$$
   $$P(6) = \frac{1000}{1 + 19(0.00933)} = \frac{1000}{1 + 0.1773} = \frac{1000}{1.1773} \approx 849.4 \text{ units}$$

---

# Why This Step Works
* Substituting $e^{-6k}$ as $(e^{-2k})^3$ avoids calculating $k$ explicitly, preventing rounding errors.

---

# Formula Used
* $P(t) = \frac{M}{1 + Ae^{-kt}}$

---

# Similar Patterns to Remember
* Population growth in a finite space.

---

# Common Mistakes
* Rounding $k$ too early, which leads to large errors when computing $e^{-6k}$.
* Assuming growth is exponential forever.

---

# Final Answer
$$\boxed{\frac{dP}{dt} = kP\left(1 - \frac{P}{1000}\right) \quad \text{and} \quad P(6) \approx 849.4 \text{ units}}$$

---

# 10-Second Revision Notes
✓ $A = 19$
✓ $e^{-2k} = 4/19$
✓ $P(6) = 1000 / (1 + 19 \times (4/19)^3) \approx 849.4$.

---

# Memory Trick
"Replace $e^{-2k}$ with its fraction value and raise it to the appropriate power for easy calculation."

---

# Exam Confidence Booster
Compute $(e^{-2k})^3$ directly instead of finding $k$ first. This saves time and keeps the calculation highly accurate.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q16', 16),
  ('e1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000001', 'Classify and justify the equation:

$$
\frac{d^2y}{dx^2}+3y=\sin x
$$', '# Question
Classify and justify the equation: $\frac{d^2y}{dx^2} + 3y = \sin x$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Classification of Ordinary Differential Equations
* **Why Applicable**: We evaluate the order, degree, linearity, and homogeneity of the differential equation using standard math definitions.

---

# Pattern Recognition Trick
Identify components of $y'''' + 3y = \sin x$:
* Highest derivative: 2
* Power of highest derivative: 1
* Linearity check: no terms like $y^2$, $yy''$, etc.
* RHS is non-zero function of $x$: $\sin x$

---

# Shortcut / Exam Trick
Quick check:
* $y'''' \implies$ Second-order.
* No non-linear terms in $y \implies$ Linear.
* Constant multipliers of $y \implies$ Constant coefficients.
* RHS $
eq 0 \implies$ Non-homogeneous.

---

# Step-by-Step Solution
1. **Determine Order**: The highest derivative appearing in the equation is $\frac{d^2y}{dx^2}$, which is of order 2.
2. **Determine Degree**: The exponent of the highest derivative is 1, so the degree is 1.
3. **Determine Linearity**: The dependent variable $y$ and its derivative $y''''$ appear only to the first power and are not multiplied together. Thus, the equation is **linear**.
4. **Determine Coefficients**: The coefficients of $y''''$ (which is 1) and $y$ (which is 3) are constants.
5. **Determine Homogeneity**: The right-hand side is $\sin x \neq 0$, so the equation is **non-homogeneous**.

---

# Why This Step Works
* Classification helps select the appropriate solving method (e.g., complementary function + particular integral).

---

# Formula Used
* Linear ODE format: $a_n(x)y^{(n)} + \dots + a_0(x)y = f(x)$

---

# Similar Patterns to Remember
* $y'''' + 2y'' + 5y = 0$ (Second-order, linear, homogeneous).

---

# Common Mistakes
* Classifying the equation as non-linear because of the $\sin x$ term. Linearity only applies to the dependent variable $y$ and its derivatives, not the independent variable $x$.

---

# Final Answer
$$\boxed{\text{Second-order, linear, ordinary differential equation with constant coefficients, non-homogeneous.}}$$

---

# 10-Second Revision Notes
✓ $y'''' \implies$ Order 2.
✓ linear in $y$ and $y'''' \implies$ Linear.
✓ RHS $= \sin x \implies$ Non-homogeneous.

---

# Memory Trick
"Linearity is about $y$, not $x$. $\sin x$ doesn''t break linearity!"

---

# Exam Confidence Booster
Always check the RHS first. If it has a function of $x$, it is immediately classified as non-homogeneous. That''s a quick point in exams.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q17', 17),
  ('e1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000001', 'Interpret the role of particular integral in second order systems in physical and engineering contexts.', '# Question
Interpret the role of particular integral in second order systems in physical and engineering contexts.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Particular Integral Interpretation
* **Why Applicable**: In linear differential equations $L(y) = f(x)$, the complete solution is $y = y_c + y_p$. We interpret what $y_p$ represents in physical systems.

---

# Pattern Recognition Trick
* Complementary Function ($y_c$) = Transient Response (decays to zero over time in stable systems).
* Particular Integral ($y_p$) = Steady-State Response (persists as long as the input force is applied).

---

# Shortcut / Exam Trick
* $y_c \implies$ transient (goes away).
* $y_p \implies$ steady-state (stays).

---

# Step-by-Step Solution
1. Identify the complete solution form of a second-order system:
   $$y(t) = y_c(t) + y_p(t)$$
2. **Transient Response ($y_c(t)$)**:
   * Solves the homogeneous equation $L(y) = 0$.
   * Represents system behavior without external forcing, dependent on initial conditions.
   * In physical systems with damping, $\lim_{t \to \infty} y_c(t) = 0$.
3. **Steady-State Response ($y_p(t)$)**:
   * Solves the non-homogeneous equation $L(y) = f(t)$.
   * Represents the system''s behavior forced by the external input $f(t)$.
   * It is independent of the initial conditions and persists as long as the force remains.

---

# Why This Step Works
* Linear superposition allows separating the free response (initial energy) from the forced response (external energy).

---

# Formula Used
* $y(t) = y_{\text{transient}}(t) + y_{\text{steady-state}}(t)$

---

# Similar Patterns to Remember
* AC electrical circuits where transient currents die out, leaving the steady-state sinusoidal current.

---

# Common Mistakes
* Assuming that $y_p$ is dependent on initial conditions. Initial conditions only affect the constants in $y_c$.

---

# Final Answer
$$\boxed{\text{The particular integral represents the steady-state response of the system forced by the external input.}}$$

---

# 10-Second Revision Notes
✓ $y_c 	o$ transient (decays)
✓ $y_p 	o$ steady-state (persists)
✓ $y_p$ depends only on the forcing function and system properties, not initial conditions.

---

# Memory Trick
"Transient passes, Particular stays."

---

# Exam Confidence Booster
If asked to find the steady-state solution of a forced system, only calculate the Particular Integral ($y_p$). You do not need to calculate the Complementary Function ($y_c$) at all!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q18', 18),
  ('e1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000001', 'A mass-spring system satisfies

$$
x''''+25x=0
$$
**Analyze and interpret amplitude, frequency, and nature of motion.**', '# Question
A mass-spring system satisfies $x'''' + 25x = 0$. Analyze and interpret amplitude, frequency, and nature of motion.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Spring-Mass Systems
* **Why Applicable**: The system is modeled by a second-order homogeneous ODE representing undamped free vibration.

---

# Pattern Recognition Trick
Identify the coefficient of $x$:
* $\omega_0^2 = 25$
* No damping term ($x''$) present.

---

# Shortcut / Exam Trick
For $x'''' + \omega_0^2 x = 0$:
* Natural angular frequency: $\omega_0 = \sqrt{25} = 5$ rad/s.
* Motion is Simple Harmonic Motion (SHM).

---

# Step-by-Step Solution
1. Identify the standard form:
   $$x'''' + \omega_0^2 x = 0$$
   Here, $\omega_0^2 = 25 \implies \omega_0 = 5$ rad/s.
2. Determine frequency:
   * Angular frequency: $\omega_0 = 5$ rad/s.
   * Cyclic frequency: $f = \frac{\omega_0}{2\pi} = \frac{5}{2\pi}$ Hz.
   * Period: $T = \frac{1}{f} = \frac{2\pi}{5}$ seconds.
3. Write the general solution:
   $$x(t) = C_1 \cos 5t + C_2 \sin 5t = A \cos(5t - \phi)$$
4. Determine Amplitude $A$:
   * $A = \sqrt{C_1^2 + C_2^2}$, determined by initial displacement $x(0)$ and velocity $x''(0)$:
     $$A = \sqrt{x(0)^2 + \left(\frac{x''(0)}{5}\right)^2}$$
5. Interpret Nature of Motion:
   * Since there is no damping term ($c x''$), the system undergoes **Simple Harmonic Motion (SHM)** (undamped free oscillation) with constant amplitude indefinitely.

---

# Why This Step Works
* The roots of the auxiliary equation $m^2 + 25 = 0$ are purely imaginary ($m = \pm 5i$), leading to pure sine and cosine solutions.

---

# Formula Used
* $\omega_0 = \sqrt{k/m}$
* $f = \frac{\omega_0}{2\pi}$

---

# Similar Patterns to Remember
* Pendulum oscillations for small angles: $\theta'''' + \omega^2 \theta = 0$.

---

# Common Mistakes
* Stating the angular frequency is 25 instead of taking the square root to get 5.
* Assuming the motion decays (there is no damping coefficient, so it oscillates forever).

---

# Final Answer
$$\boxed{\omega_0 = 5 \text{ rad/s}, \quad f = \frac{5}{2\pi} \text{ Hz}, \quad \text{Nature: Simple Harmonic Motion (SHM).}}$$

---

# 10-Second Revision Notes
✓ $\omega_0^2 = 25 \implies \omega_0 = 5$ rad/s.
✓ No $x''$ term $\implies$ Undamped SHM.
✓ Amplitude depends on initial conditions.

---

# Memory Trick
"The square root of the coefficient of $x$ is the natural frequency."

---

# Exam Confidence Booster
Check the damping term. If there is no $x''$ term, the motion is always simple harmonic (pure oscillation). Save time classifying it!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q19', 19),
  ('e1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000001', 'A mechanical oscillator completes 50 cycles in 10 seconds.

**Determine its frequency and interpret its engineering significance.**', '# Question
A mechanical oscillator completes 50 cycles in 10 seconds. Determine its frequency and interpret its engineering significance.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Mechanical Vibrations
* **Why Applicable**: We calculate the fundamental parameters of a vibrating system from observed cyclic counts and elapsed time.

---

# Pattern Recognition Trick
Identify counts and duration:
* Cycles = 50
* Time = 10 s

---

# Shortcut / Exam Trick
* Frequency $f = \frac{\text{Cycles}}{\text{Time}} = \frac{50}{10} = 5$ Hz.
* Angular frequency $\omega = 2\pi f = 10\pi$ rad/s.

---

# Step-by-Step Solution
1. Calculate cyclic frequency $f$:
   $$f = \frac{\text{Number of Cycles}}{\text{Total Time}} = \frac{50}{10} = 5 \text{ Hz (cycles per second)}$$
2. Calculate angular frequency $\omega$:
   $$\omega = 2\pi f = 2\pi(5) = 10\pi \approx 31.42 \text{ rad/s}$$
3. Calculate time period $T$:
   $$T = \frac{1}{f} = \frac{1}{5} = 0.2 \text{ seconds}$$
4. **Engineering Significance**:
   * Frequency determines the dynamic behavior of the oscillator.
   * If an external force is applied at or near $5$ Hz, the system will experience **resonance**, resulting in extremely large vibration amplitudes and potential structural failure.
   * Used to design vibration isolators or dampening systems.

---

# Why This Step Works
* Frequency is the rate of oscillation, defined as cycles per unit time.

---

# Formula Used
* $f = \frac{N}{t}$
* $\omega = 2\pi f$

---

# Similar Patterns to Remember
* Grid frequency (e.g., 50 Hz power supply).

---

# Common Mistakes
* Confusing cyclic frequency $f$ (Hz) with angular frequency $\omega$ (rad/s).
* Calculating period instead of frequency ($10/50 = 0.2$ is the period, not frequency).

---

# Final Answer
$$\boxed{f = 5 \text{ Hz}, \quad \omega = 10\pi \approx 31.42 \text{ rad/s}. \text{ Significance: Resonance danger at } 5 \text{ Hz}.}$$

---

# 10-Second Revision Notes
✓ $f = 50/10 = 5$ Hz.
✓ $\omega = 2\pi(5) = 10\pi$ rad/s.
✓ Resonance occurs if excitation frequency equals natural frequency.

---

# Memory Trick
"Hertz is cycles per second. Rad/s is Hertz times $2\pi$."

---

# Exam Confidence Booster
Always check the units requested: "frequency" can refer to either cyclic frequency $f$ in Hz or angular frequency $\omega$ in rad/s. Write both to guarantee full credit!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q20', 20),
  ('e1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000001', 'A system follows

$$
\frac{d^2y}{dx^2}+4y=0,\quad y(0)=2,\quad y''(0)=-4
$$
The complementary function is

$$
y=C_1\cos 2x+C_2\sin 2x
$$
**Determine the constants and interpret system behavior.**', '# Question
A system follows $\frac{d^2y}{dx^2} + 4y = 0$, $y(0) = 2$, $y''(0) = -4$. The complementary function is $y = C_1\cos 2x + C_2\sin 2x$. Determine the constants and interpret system behavior.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Initial Value Problems
* **Why Applicable**: We are given the general solution and two initial conditions ($y(0)$ and $y''(0)$) to solve for the two arbitrary constants.

---

# Pattern Recognition Trick
Use initial conditions at $x = 0$ to solve for $C_1$ and $C_2$ directly.

---

# Shortcut / Exam Trick
* At $x = 0$, the sine term is 0. So $y(0) = C_1 \implies C_1 = 2$.
* The derivative of the sine term at $0$ is $2 C_2$. So $y''(0) = 2 C_2 \implies 2 C_2 = -4 \implies C_2 = -2$.

---

# Step-by-Step Solution
1. Start with the given solution:
   $$y(x) = C_1\cos 2x + C_2\sin 2x$$
2. Apply first initial condition $y(0) = 2$:
   $$y(0) = C_1\cos(0) + C_2\sin(0) = 2 \implies C_1(1) + C_2(0) = 2 \implies C_1 = 2$$
3. Differentiate $y(x)$:
   $$y''(x) = -2C_1\sin 2x + 2C_2\cos 2x$$
4. Apply second initial condition $y''(0) = -4$:
   $$y''(0) = -2(2)\sin(0) + 2C_2\cos(0) = -4$$
   $$0 + 2C_2(1) = -4 \implies 2C_2 = -4 \implies C_2 = -2$$
5. Write the final solution:
   $$y(x) = 2\cos 2x - 2\sin 2x$$
6. Interpret system behavior:
   * The system oscillates as an undamped harmonic oscillator.
   * Amplitude: $A = \sqrt{C_1^2 + C_2^2} = \sqrt{2^2 + (-2)^2} = \sqrt{8} = 2\sqrt{2} \approx 2.828$.
   * Angular frequency: $\omega = 2$ rad/s.

---

# Why This Step Works
* Evaluating at $x = 0$ simplifies the trigonometric terms, decouples the constants, and allows direct solution.

---

# Formula Used
* $y(0) = C_1$ (for $y = C_1 \cos \omega x + C_2 \sin \omega x$)
* $y''(0) = \omega C_2$

---

# Similar Patterns to Remember
* Spring-mass system initial release: $x(0) = x_0$, $x''(0) = v_0$.

---

# Common Mistakes
* Forgetting the factor of $\omega = 2$ when differentiating the sine and cosine terms.
* Swapping the values of $C_1$ and $C_2$.

---

# Final Answer
$$\boxed{C_1 = 2, \quad C_2 = -2, \quad y(x) = 2\cos 2x - 2\sin 2x. \text{ Behavior: Undamped oscillation with amplitude } 2\sqrt{2}.}$$

---

# 10-Second Revision Notes
✓ $y(0) = C_1 = 2$
✓ $y'' = -2C_1\sin 2x + 2C_2\cos 2x \implies y''(0) = 2C_2 = -4 \implies C_2 = -2$.
✓ $y = 2\cos 2x - 2\sin 2x$.

---

# Memory Trick
"Cos controls initial position, Sin controls initial velocity (divided by natural frequency)."

---

# Exam Confidence Booster
Check: $y(0) = 2\cos(0) - 2\sin(0) = 2$ (correct). $y''(0) = -4\sin(0) - 4\cos(0) = -4$ (correct). Fast verification guarantees marks!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q21', 21),
  ('e1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000001', 'Explain the role of initial conditions in second order systems.', '# Question
Explain the role of initial conditions in second order systems.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Initial Value Problems
* **Why Applicable**: A second-order differential equation yields a general solution containing two arbitrary constants of integration. We explain why two initial conditions are required.

---

# Pattern Recognition Trick
* Order of ODE = 2
* Number of arbitrary constants = 2
* Number of required initial conditions = 2

---

# Shortcut / Exam Trick
* 1st condition $\implies$ sets initial state (e.g., position).
* 2nd condition $\implies$ sets initial rate of change (e.g., velocity).

---

# Step-by-Step Solution
1. **Mathematical Role**:
   * A second-order ODE requires integrating twice to find the solution, producing two arbitrary constants ($C_1$ and $C_2$).
   * To find a unique, specific solution (Particular Solution) for a physical system, we need exactly two independent boundary or initial conditions.
2. **Physical Role**:
   * In mechanical systems: initial conditions represent initial position $x(0)$ and initial velocity $x''(0)$.
   * In electrical systems: they represent initial charge $q(0)$ and initial current $i(0) = q''(0)$.
   * These conditions define the starting energy stored in the system (potential energy in the spring/capacitor, kinetic energy in the mass/inductor).
3. **Effect on Solution**:
   * They determine the amplitude $A$ and phase angle $\phi$ of the transient response.

---

# Why This Step Works
* Without initial conditions, we only have a family of infinite possible curves. Initial conditions lock in the single real physical trajectory.

---

# Formula Used
* $y(t) = y_c(t) + y_p(t)$
* $y(0) = y_0$, $y''(0) = v_0$

---

# Similar Patterns to Remember
* First-order systems (like cooling) only require one initial condition (initial temperature).

---

# Common Mistakes
* Thinking that initial conditions affect the steady-state particular integral $y_p$. They only determine the constants in the complementary function $y_c$.

---

# Final Answer
$$\boxed{\text{Initial conditions specify the starting state (position and velocity) to uniquely determine the two integration constants.}}$$

---

# 10-Second Revision Notes
✓ Second-order ODE $\implies$ 2 integration constants.
✓ Requires 2 initial conditions (typically $y(0)$ and $y''(0)$) to solve.
✓ Determines the transient phase and amplitude.

---

# Memory Trick
"Two derivatives require two integrations, which need two initial coordinates to resolve."

---

# Exam Confidence Booster
Remember that initial conditions are evaluated at a single point in time (usually $t=0$), whereas boundary conditions are evaluated at two different points (e.g., $x=0$ and $x=L$). Don''t confuse them!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q22', 22),
  ('e1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000001', 'An LC circuit has equation

$$
\frac{d^2q}{dt^2}+\frac{k}{m}q=0
$$
**Evaluate the effect of increasing k on frequency.**', '# Question
An LC circuit has equation $\frac{d^2q}{dt^2} + \frac{k}{m}q = 0$. Evaluate the effect of increasing $k$ on frequency.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Electrical Circuit Models / LC Oscillators
* **Why Applicable**: The system is modeled as a simple harmonic oscillator of the form $q'''' + \omega_0^2 q = 0$, where natural frequency is related to coefficients.

---

# Pattern Recognition Trick
Identify $\omega_0^2$ from the coefficient of $q$:
* $\omega_0^2 = \frac{k}{m} \implies \omega_0 = \sqrt{\frac{k}{m}}$

---

# Shortcut / Exam Trick
* Frequency $\omega_0 \propto \sqrt{k}$.
* Increasing $k$ increases frequency.

---

# Step-by-Step Solution
1. Identify the natural angular frequency of the system:
   $$\omega_0^2 = \frac{k}{m} \implies \omega_0 = \sqrt{\frac{k}{m}}$$
2. Relate angular frequency to cyclic frequency $f$:
   $$f = \frac{\omega_0}{2\pi} = \frac{1}{2\pi}\sqrt{\frac{k}{m}}$$
3. Analyze the effect of increasing $k$:
   * Since $k$ is in the numerator inside the square root, any increase in $k$ will directly cause an increase in both $\omega_0$ and $f$.
   * Specifically, if $k$ increases by a factor of $N$, the frequency increases by a factor of $\sqrt{N}$.
4. Physical interpretation:
   * In a mechanical spring-mass system, increasing $k$ means a stiffer spring, leading to faster vibrations.
   * In an LC circuit, $k/m$ represents $1/LC$, so increasing $k$ corresponds to decreasing capacitance $C$ or inductance $L$, which reduces electrical inertia and speeds up the oscillation.

---

# Why This Step Works
* Stiffer restoring forces (higher $k$) return the system to equilibrium faster, increasing the rate of oscillation.

---

# Formula Used
* $\omega_0 = \sqrt{\frac{k}{m}}$

---

# Similar Patterns to Remember
* Simple pendulum frequency: $\omega_0 = \sqrt{\frac{g}{L}}$. Increasing $g$ increases frequency.

---

# Common Mistakes
* Stating that frequency increases linearly with $k$. It increases with the square root of $k$ ($\sqrt{k}$).
* Assuming frequency decreases because $m$ is in the denominator (the question asks about increasing $k$, not $m$).

---

# Final Answer
$$\boxed{\text{Increasing } k \text{ increases the natural frequency } f \text{ proportionally to } \sqrt{k}.}$$

---

# 10-Second Revision Notes
✓ $\omega_0 = \sqrt{k/m}$
✓ $k \uparrow \implies \omega_0 \uparrow$
✓ Frequency scales as the square root of $k$.

---

# Memory Trick
"Stiffer springs (higher $k$) bounce faster!"

---

# Exam Confidence Booster
If an exam question asks for a quantitative change (e.g., "What happens if $k$ is quadrupled?"), you can instantly say frequency doubles because $\sqrt{4} = 2$. Keep this square-root relation handy!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q23', 23),
  ('e1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000001', 'A spring-mass system in vibration analysis is modeled by

$$
\frac{d^2x}{dt^2}+\omega^2x=0
$$
**Interpret the type of motion.**', '# Question
A spring-mass system in vibration analysis is modeled by $\frac{d^2x}{dt^2} + \omega^2x = 0$. Interpret the type of motion.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Mechanical Vibrations
* **Why Applicable**: The equation matches the classic second-order linear homogeneous ODE with purely imaginary roots, indicating no damping.

---

# Pattern Recognition Trick
* Equation: $x'''' + \omega^2 x = 0$
* Damping term ($x''$) coefficient = 0
* Restoring coefficient $\omega^2 > 0$

---

# Shortcut / Exam Trick
No $x''$ term $\implies$ Undamped free vibration $\implies$ Simple Harmonic Motion (SHM).

---

# Step-by-Step Solution
1. Identify the auxiliary equation:
   $$m^2 + \omega^2 = 0 \implies m = \pm i\omega$$
2. Write the general solution:
   $$x(t) = C_1 \cos \omega t + C_2 \sin \omega t = A \cos(\omega t - \phi)$$
3. Analyze system characteristics:
   * **Amplitude**: $A$ is constant over time (no decay).
   * **Frequency**: Oscillates at natural angular frequency $\omega$ rad/s.
   * **Phase**: Shifted by phase angle $\phi$.
4. Interpret motion type:
   * Since the amplitude is constant and there is no damping force to dissipate energy, the system undergoes **Simple Harmonic Motion (SHM)** (undamped free oscillation) indefinitely.

---

# Why This Step Works
* Purely imaginary roots in the auxiliary equation yield trigonometric terms (sines and cosines) without decaying exponential multipliers.

---

# Formula Used
* $x(t) = A \cos(\omega t - \phi)$

---

# Similar Patterns to Remember
* Undamped LC circuit oscillations.

---

# Common Mistakes
* Calling the motion "damped" or "transient". Without a first derivative term, there is no damping.
* Confusing $\omega^2$ with cyclic frequency.

---

# Final Answer
$$\boxed{\text{Simple Harmonic Motion (SHM) / Undamped Free Vibration.}}$$

---

# 10-Second Revision Notes
✓ $x'''' + \omega^2 x = 0 \implies m = \pm i\omega$
✓ Solution is pure sinusoids $\implies$ constant amplitude.
✓ Classify as Simple Harmonic Motion (SHM).

---

# Memory Trick
"No prime ($x''$), no decay!"

---

# Exam Confidence Booster
In vibration questions, the absence of the velocity term ($x''$) always guarantees that the motion is Simple Harmonic. This is a vital diagnostic shortcut!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q24', 24),
  ('e1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000001', 'An RLC circuit satisfies

$$
\frac{d^2i}{dt^2}+4\frac{di}{dt}+4i=0
$$
**Determine complementary function and evaluate system response.**', '# Question
An RLC circuit satisfies $\frac{d^2i}{dt^2} + 4\frac{di}{dt} + 4i = 0$. Determine complementary function and evaluate system response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: RLC Circuit Analysis
* **Why Applicable**: The second-order homogeneous ODE represents the free response of an RLC circuit. The roots of the auxiliary equation determine the damping state.

---

# Pattern Recognition Trick
Identify coefficients in $i'''' + 4i'' + 4i = 0$:
* $a = 1, b = 4, c = 4$
* Check discriminant: $b^2 - 4ac = 16 - 16 = 0$ (equal roots).

---

# Shortcut / Exam Trick
Equal roots ($m = -2, -2$) always mean a critically damped system:
$$i(t) = (C_1 + C_2 t)e^{-2t}$$

---

# Step-by-Step Solution
1. Formulate the auxiliary equation:
   $$m^2 + 4m + 4 = 0$$
2. Solve for roots:
   $$(m + 2)^2 = 0 \implies m_1 = m_2 = -2 \quad \text{(real and equal roots)}$$
3. Write the Complementary Function:
   $$i(t) = (C_1 + C_2 t)e^{-2t}$$
4. Evaluate system response:
   * Since the roots are real and equal ($b^2 - 4ac = 0$), the system is **critically damped**.
   * The current decays to zero as fast as possible without any oscillations or overshoot.
   * This is the boundary state between oscillatory (underdamped) and slow non-oscillatory (overdamped) responses.

---

# Why This Step Works
* Real and equal roots lead to a linear term multiplying the exponential factor to maintain two independent solutions.

---

# Formula Used
* Complementary Function for equal roots: $y = (C_1 + C_2 x)e^{mx}$

---

# Similar Patterns to Remember
* Vehicle suspension system designed for critical damping to maximize comfort.

---

# Common Mistakes
* Writing the solution as $i(t) = C_1 e^{-2t} + C_2 e^{-2t}$, which simplifies to $(C_1+C_2)e^{-2t} = A e^{-2t}$ (this is incorrect because we need two independent constants).
* Incorrectly identifying the damping type as overdamped.

---

# Final Answer
$$\boxed{i(t) = (C_1 + C_2 t)e^{-2t} \quad \text{and} \quad \text{System is Critically Damped.}}$$

---

# 10-Second Revision Notes
✓ Auxiliary: $m^2+4m+4 = 0 \implies (m+2)^2 = 0 \implies m = -2, -2$
✓ Solution: $i(t) = (C_1 + C_2 t)e^{-2t}$
✓ Equal roots $\implies$ Critically damped response.

---

# Memory Trick
"Equal roots = Critical damping. Fast decay, zero bounce."

---

# Exam Confidence Booster
Check $b^2 - 4ac$. If it equals 0, write $(C_1 + C_2 t)e^{mt}$ and label it "critically damped" immediately. You will save valuable time!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q25', 25),
  ('e1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000001', 'A vibration system satisfies

$$
\frac{d^2x}{dt^2}+8\frac{dx}{dt}+16x=0
$$
**Analyze the damping condition and evaluate system response.**', '# Question
A vibration system satisfies $\frac{d^2x}{dt^2} + 8\frac{dx}{dt} + 16x = 0$. Analyze the damping condition and evaluate system response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Damped Free Vibrations
* **Why Applicable**: The second-order homogeneous linear ODE represents a mass-spring-damper system. We evaluate the roots of the characteristic equation to classify damping.

---

# Pattern Recognition Trick
Check coefficients of $x'''' + 8x'' + 16x = 0$:
* $m^2 + 8m + 16 = 0 \implies (m+4)^2 = 0$
* Equal real roots.

---

# Shortcut / Exam Trick
Discriminant of auxiliary equation:
$$\Delta = b^2 - 4ac = 8^2 - 4(1)(16) = 64 - 64 = 0 \implies \text{Critically Damped.}$$

---

# Step-by-Step Solution
1. Set up the auxiliary equation:
   $$m^2 + 8m + 16 = 0$$
2. Solve for roots:
   $$(m + 4)^2 = 0 \implies m = -4, -4 \quad \text{(real and equal roots)}$$
3. Write the general system response:
   $$x(t) = (C_1 + C_2 t)e^{-4t}$$
4. Analyze Damping Condition:
   * Since the discriminant is zero ($\zeta = 1$), the system is **critically damped**.
5. Evaluate response:
   * The mass returns to its equilibrium position in the minimum possible time without crossing the equilibrium line (no oscillation).
   * Used in car suspension struts and door closers to prevent bouncing.

---

# Why This Step Works
* Having equal roots represents the transition threshold between exponential decay (overdamped) and sinusoids (underdamped).

---

# Formula Used
* $x(t) = (C_1 + C_2 t)e^{mt}$

---

# Similar Patterns to Remember
* Critical damping in analog multimeter needles to prevent jitter.

---

# Common Mistakes
* Writing $x(t) = C_1 e^{-4t} + C_2 e^{-4t}$ (missing the factor of $t$ in the second term).
* Incorrectly classifying it as underdamped due to a sign error in the discriminant calculation.

---

# Final Answer
$$\boxed{\text{Critically Damped; } x(t) = (C_1 + C_2 t)e^{-4t}}$$

---

# 10-Second Revision Notes
✓ $m^2 + 8m + 16 = 0 \implies m = -4, -4$
✓ Equal roots $\implies$ Critical damping.
✓ Response decays rapidly without crossing $x=0$.

---

# Memory Trick
"Critical damping is the fast-lane back to zero with no overshoot."

---

# Exam Confidence Booster
Remember that for any quadratic of the form $m^2 + 2\omega_n m + \omega_n^2 = 0$, the roots are always equal ($-\omega_n$), indicating critical damping. Look for perfect square trinomials!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q26', 26),
  ('e1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000001', 'A spring-mass system is governed by

$$
\frac{d^2y}{dt^2}+5\frac{dy}{dt}+6y=0
$$
**Formulate the auxiliary equation, determine the complementary function, and analyze system behavior.**', '# Question
A spring-mass system is governed by $\frac{d^2y}{dt^2} + 5\frac{dy}{dt} + 6y = 0$. Formulate the auxiliary equation, determine the complementary function, and analyze system behavior.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Damped Vibrations / Second-Order ODEs
* **Why Applicable**: The governing equation is a second-order linear homogeneous ODE with constant coefficients.

---

# Pattern Recognition Trick
Identify coefficients:
* $a = 1, b = 5, c = 6$
* Check discriminant: $b^2 - 4ac = 25 - 24 = 1 > 0$ (real, distinct roots).

---

# Shortcut / Exam Trick
* Roots of $m^2 + 5m + 6 = 0$ are $-2$ and $-3$ (since $-2 \times -3 = 6$ and $-2 + -3 = -5$).
* Complementary Function: $y(t) = C_1 e^{-2t} + C_2 e^{-3t}$.

---

# Step-by-Step Solution
1. Formulate the auxiliary (characteristic) equation:
   $$m^2 + 5m + 6 = 0$$
2. Solve the quadratic equation by factoring:
   $$(m + 2)(m + 3) = 0 \implies m_1 = -2, \quad m_2 = -3$$
3. Write the Complementary Function:
   $$y(t) = C_1 e^{-2t} + C_2 e^{-3t}$$
4. Analyze System Behavior:
   * Since the roots are real and distinct ($b^2 - 4ac > 0$), the system is **overdamped** ($\zeta > 1$).
   * The response is non-oscillatory. The mass returns slowly to the equilibrium position due to high damping resistance.

---

# Why This Step Works
* Real and negative roots represent pure exponential decays, meaning the damping force dominates over the spring restoring force.

---

# Formula Used
* General solution for distinct roots: $y = C_1 e^{m_1 t} + C_2 e^{m_2 t}$

---

# Similar Patterns to Remember
* Overdamped door closers that close slowly to prevent slamming.

---

# Common Mistakes
* Writing roots as $+2$ and $+3$ instead of $-2$ and $-3$. Positive roots would mean exponential growth, which is physically impossible for a passive spring-mass-damper system.

---

# Final Answer
$$\boxed{m^2 + 5m + 6 = 0, \quad y(t) = C_1 e^{-2t} + C_2 e^{-3t}, \quad \text{System is Overdamped.}}$$

---

# 10-Second Revision Notes
✓ Aux: $m^2 + 5m + 6 = 0 \implies m = -2, -3$
✓ Distinct real roots $\implies$ Overdamped response.
✓ Solution: $y(t) = C_1 e^{-2t} + C_2 e^{-3t}$

---

# Memory Trick
"Distinct real roots = Overdamped. Two separate exponential paths back to zero."

---

# Exam Confidence Booster
Check the signs of the roots. If they are both negative, the system is stable and decays. If they are complex, it oscillates. Distinct real negative roots guarantee an overdamped classification!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q27', 27),
  ('e1000000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000001', 'A vehicle suspension system is modeled by

$$
m\frac{d^2x}{dt^2}+c\frac{dx}{dt}+kx=0
$$
with $m=2$ kg, $c=6$ Ns/m, $k=5$ N/m.

**Formulate the differential equation, determine the nature of damping, and interpret system response.**', '# Question
A vehicle suspension system is modeled by $m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$ with $m=2$ kg, $c=6$ Ns/m, $k=5$ N/m. Formulate the differential equation, determine the nature of damping, and interpret system response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Damped Free Vibrations / Second-Order ODEs
* **Why Applicable**: The vehicle suspension is modeled as a mass-spring-damper system, which yields a second-order homogeneous linear ODE.

---

# Pattern Recognition Trick
Identify parameters:
* $m = 2, c = 6, k = 5$
* Check discriminant: $c^2 - 4mk$

---

# Shortcut / Exam Trick
* Equation: $2x'''' + 6x'' + 5x = 0 \implies x'''' + 3x'' + 2.5x = 0$.
* Damping ratio: $\zeta = \frac{c}{2\sqrt{km}} = \frac{6}{2\sqrt{10}} = \frac{3}{\sqrt{10}} \approx 0.95 < 1 \implies$ Underdamped.

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$2\frac{d^2x}{dt^2} + 6\frac{dx}{dt} + 5x = 0 \implies \frac{d^2x}{dt^2} + 3\frac{dx}{dt} + 2.5x = 0$$
2. Set up the auxiliary equation:
   $$2m^2 + 6m + 5 = 0 \implies m = \frac{-6 \pm \sqrt{36 - 40}}{4} = \frac{-6 \pm \sqrt{-4}}{4} = -1.5 \pm 0.5i$$
3. Determine the nature of damping:
   * The roots are complex conjugates: $m = -1.5 \pm 0.5i$.
   * Since the roots are complex ($\zeta < 1$), the system is **underdamped** (specifically, close to critical damping since $\zeta pprox 0.95$).
4. Write the system response:
   $$x(t) = e^{-1.5t}(C_1 \cos 0.5t + C_2 \sin 0.5t)$$
5. Interpret system response:
   * The vehicle suspension will exhibit a decaying oscillation.
   * The vehicle will bounce slightly but return to level quickly due to the high damping ratio ($\zeta pprox 0.95$).

---

# Why This Step Works
* Complex roots produce a combination of a decaying exponential envelope $e^{-1.5t}$ and oscillatory trigonometric terms.

---

# Formula Used
* Roots of quadratic: $m = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
* Underdamped solution: $x(t) = e^{\alpha t}(C_1 \cos \beta t + C_2 \sin \beta t)$

---

# Similar Patterns to Remember
* Bridge vibration under load.

---

# Common Mistakes
* Forgetting to divide the discriminant by $2a = 4$.
* Incorrectly classifying the system as overdamped because $c = 6$ seems large. Always compute the discriminant $c^2 - 4mk$.

---

# Final Answer
$$\boxed{2x'''' + 6x'' + 5x = 0, \quad \text{Nature: Underdamped}, \quad x(t) = e^{-1.5t}(C_1\cos 0.5t + C_2\sin 0.5t)}$$

---

# 10-Second Revision Notes
✓ $2m^2 + 6m + 5 = 0 \implies m = -1.5 \pm 0.5i$
✓ Complex roots $\implies$ Underdamped system.
✓ Response decays exponentially while oscillating slowly.

---

# Memory Trick
"Complex roots = Underdamped. Exp-envelope holds the sine-wave."

---

# Exam Confidence Booster
Underdamped suspension systems are common in vehicle design to ensure passenger comfort. If you get complex roots, double-check that the real part is negative, indicating decay!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q28', 28),
  ('e1000000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000001', 'A vibration system is governed by

$$
\frac{d^2y}{dt^2}+4y=t^2
$$
**Determine particular integral using undetermined coefficients and evaluate complete response.**', '# Question
A vibration system is governed by $\frac{d^2y}{dt^2} + 4y = t^2$. Determine particular integral using undetermined coefficients and evaluate complete response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Method of Undetermined Coefficients
* **Why Applicable**: The non-homogeneous term is a polynomial $f(t) = t^2$, and the ODE is linear with constant coefficients.

---

# Pattern Recognition Trick
* Complementary roots: $m^2 + 4 = 0 \implies m = \pm 2i$.
* Forcing function: $t^2$ (degree 2 polynomial).
* No overlap between homogeneous solutions ($\cos 2t, \sin 2t$) and the polynomial $t^2$.

---

# Shortcut / Exam Trick
Guess $y_p = At^2 + Bt + C$.
Substitute and equate coefficients:
* $4A = 1 \implies A = 1/4$
* $4B = 0 \implies B = 0$
* $2A + 4C = 0 \implies 2(1/4) + 4C = 0 \implies C = -1/8$
Particular integral: $y_p = \frac{t^2}{4} - \frac{1}{8}$.

---

# Step-by-Step Solution
1. Find the Complementary Function ($y_c$):
   $$m^2 + 4 = 0 \implies m = \pm 2i \implies y_c(t) = C_1 \cos 2t + C_2 \sin 2t$$
2. Set up the trial Particular Integral ($y_p$):
   $$y_p = At^2 + Bt + C$$
3. Compute derivatives:
   $$y_p'' = 2At + B$$
   $$y_p'''' = 2A$$
4. Substitute into the ODE:
   $$y_p'''' + 4y_p = t^2 \implies 2A + 4(At^2 + Bt + C) = t^2$$
   $$4At^2 + 4Bt + (2A + 4C) = 1t^2 + 0t + 0$$
5. Equate coefficients of like powers of $t$:
   * $t^2$: $4A = 1 \implies A = \frac{1}{4}$
   * $t$: $4B = 0 \implies B = 0$
   * Constant: $2A + 4C = 0 \implies 2(1/4) + 4C = 0 \implies 4C = -\frac{1}{2} \implies C = -\frac{1}{8}$
6. Write the Particular Integral:
   $$y_p = \frac{t^2}{4} - \frac{1}{8}$$
7. Write the complete response:
   $$y(t) = y_c(t) + y_p(t) = C_1 \cos 2t + C_2 \sin 2t + \frac{t^2}{4} - \frac{1}{8}$$

---

# Why This Step Works
* The method of undetermined coefficients assumes the output polynomial has the same degree as the forcing polynomial.

---

# Formula Used
* Complete solution: $y(t) = y_c(t) + y_p(t)$

---

# Similar Patterns to Remember
* $y'''' + 9y = t^2 - 1$.

---

# Common Mistakes
* Guessing $y_p = At^2$ and omitting the linear ($Bt$) and constant ($C$) terms. This will make it impossible to satisfy the equation.
* Incorrectly solving the constant relation: $2A + 4C = 0$.

---

# Final Answer
$$\boxed{y_p = \frac{t^2}{4} - \frac{1}{8} \quad \text{and} \quad y(t) = C_1 \cos 2t + C_2 \sin 2t + \frac{t^2}{4} - \frac{1}{8}}$$

---

# 10-Second Revision Notes
✓ $y_c = C_1\cos 2t + C_2\sin 2t$
✓ $y_p = At^2 + Bt + C \implies 2A + 4(At^2+Bt+C) = t^2$
✓ $4A=1, B=0, 2A+4C=0 \implies A=1/4, C=-1/8$.

---

# Memory Trick
"Always include all lower-degree terms in your polynomial guess!"

---

# Exam Confidence Booster
Double check your particular solution by plugging $y_p = \frac{t^2}{4} - \frac{1}{8}$ back into the ODE: $y_p'''' + 4y_p = \frac{1}{2} + 4(\frac{t^2}{4} - \frac{1}{8}) = \frac{1}{2} + t^2 - \frac{1}{2} = t^2$. It matches perfectly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q29', 29),
  ('e1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000001', 'A structure vibrates under external force

$$
F(t)=8\cos\omega t
$$
**Analyze and determine the condition for resonance and evaluate its effect.**', '# Question
A structure vibrates under external force $F(t) = 8\cos\omega t$. Analyze and determine the condition for resonance and evaluate its effect.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Forced Vibrations / Resonance
* **Why Applicable**: We evaluate a forced spring-mass system $x'''' + \omega_0^2 x = F_0 \cos \omega t$. Resonance occurs when the driving frequency matches the natural frequency.

---

# Pattern Recognition Trick
* Natural frequency of system: $\omega_0$
* Forcing frequency: $\omega$
* Resonance condition: $\omega = \omega_0$

---

# Shortcut / Exam Trick
Resonance $\implies \omega = \omega_0$.
Amplitude grows linearly: $x_p(t) \propto t \sin \omega t$.

---

# Step-by-Step Solution
1. Set up the governing differential equation for the system:
   $$\frac{d^2x}{dt^2} + \omega_0^2 x = F_0 \cos \omega t$$
2. Identify the Complementary solution:
   $$x_c(t) = C_1 \cos \omega_0 t + C_2 \sin \omega_0 t$$
3. Determine the Particular Integral for $\omega \neq \omega_0$:
   $$x_p(t) = \frac{F_0}{\omega_0^2 - \omega^2}\cos \omega t$$
4. Analyze the limit as $\omega \to \omega_0$ (Resonance Condition):
   * When $\omega = \omega_0$, the denominator $(\omega_0^2 - \omega^2)$ becomes zero, making the expression infinite.
   * The trial solution must be modified by multiplying by $t$:
     $$x_p(t) = A t \sin \omega_0 t$$
   * Substituting this yields:
     $$x_p(t) = \frac{F_0}{2\omega_0} t \sin \omega_0 t$$
5. Evaluate the Effect:
   * The term $t \sin \omega_0 t$ grows linearly with time $t$.
   * As $t \to \infty$, the amplitude of oscillation goes to infinity (in the absence of damping), causing severe stress and eventual structural failure (catastrophic resonance).

---

# Why This Step Works
* When the forcing frequency matches the natural frequency, the force always acts in phase with the velocity, continuously adding energy to the system.

---

# Formula Used
* $x_p(t) = \frac{F_0}{2\omega_0} t \sin \omega_0 t$ (at resonance)

---

# Similar Patterns to Remember
* Tacoma Narrows Bridge collapse.
* Tuning a radio receiver.

---

# Common Mistakes
* Stating that the amplitude is constant at resonance. It grows linearly over time.
* Forgetting that real systems have damping, which caps the maximum amplitude at resonance but still leaves it very high.

---

# Final Answer
$$\boxed{\text{Condition: } \omega = \omega_0. \quad \text{Effect: Amplitude grows linearly over time without bound } \left(x_p \propto t \sin \omega_0 t\right).}$$

---

# 10-Second Revision Notes
✓ Resonance: Forcing frequency $\omega = \text{Natural frequency } \omega_0$.
✓ Particular integral: $x_p(t) = \frac{F_0}{2\omega_0} t \sin \omega_0 t$
✓ Result: Amplitude grows linearly, risking structural failure.

---

# Memory Trick
"Pushing a swing at its natural rate builds height. That''s resonance!"

---

# Exam Confidence Booster
In exams, if you see the forcing term matches the complementary roots, immediately write the particular integral with a $t$ multiplier: $y_p = t(A\cos \omega_0 t + B\sin \omega_0 t)$. This is the hallmark of resonance!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q30', 30),
  ('e1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000001', 'A control system is described by

$$
\frac{d^2y}{dx^2}+y=\cos 2x
$$
**Determine the particular integral using another method.**', '# Question
A control system is described by $\frac{d^2y}{dx^2} + y = \cos 2x$. Determine the particular integral using another method.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Particular Integral (Inverse Operator Method)
* **Why Applicable**: The system is a linear non-homogeneous ODE with constant coefficients. The inverse operator method provides a fast algebraic route to find $y_p$.

---

# Pattern Recognition Trick
Identify $f(D) = D^2 + 1$ and $X = \cos 2x$:
* $y_p = \frac{1}{D^2 + 1} \cos 2x$

---

# Shortcut / Exam Trick
Use the identity:
$$\frac{1}{f(D^2)} \cos ax = \frac{1}{f(-a^2)} \cos ax$$
For $a = 2$, replace $D^2$ with $-2^2 = -4$:
$$y_p = \frac{1}{-4 + 1} \cos 2x = -\frac{1}{3} \cos 2x$$

---

# Step-by-Step Solution
1. Write the differential equation in operator form:
   $$(D^2 + 1)y = \cos 2x$$
   where $D = \frac{d}{dx}$.
2. Express the Particular Integral ($y_p$) using the inverse operator:
   $$y_p = \frac{1}{D^2 + 1} \cos 2x$$
3. Apply the rule for $\cos ax$ where $a = 2$:
   * Substitute $D^2 \to -a^2 = -2^2 = -4$.
   * Since the denominator is non-zero ($-4 + 1 = -3 \neq 0$), the substitution is valid.
4. Calculate the result:
   $$y_p = \frac{1}{-4 + 1} \cos 2x = -\frac{1}{3} \cos 2x$$

---

# Why This Step Works
* Since $D^2(\cos ax) = -a^2\cos ax$, the operator $D^2$ acts like the scalar $-a^2$ when applied to sinusoidal functions.

---

# Formula Used
* $\frac{1}{D^2 + a^2} \cos bx = \frac{1}{a^2 - b^2} \cos bx$ for $a^2 \neq b^2$.

---

# Similar Patterns to Remember
* $y'''' + 9y = \sin 2x \implies y_p = \frac{1}{-4 + 9}\sin 2x = \frac{1}{5}\sin 2x$.

---

# Common Mistakes
* Substituting $D \to -2$ or $D^2 \to 4$ (forgetting the negative sign). Always substitute $D^2 \to -a^2$.
* Applying this method to functions other than sine and cosine.

---

# Final Answer
$$\boxed{y_p = -\frac{1}{3}\cos 2x}$$

---

# 10-Second Revision Notes
✓ $y_p = \frac{1}{D^2 + 1} \cos 2x$
✓ $D^2 \to -2^2 = -4$
✓ $y_p = \frac{1}{-4 + 1} \cos 2x = -\frac{1}{3}\cos 2x$.

---

# Memory Trick
"For sines and cosines, swap $D^2$ with negative square of the frequency."

---

# Exam Confidence Booster
This is the fastest method to solve particular integrals for harmonic inputs. If you see $\cos ax$ or $\sin ax$, use this operator shortcut to write down the answer in one line!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q31', 31),
  ('e1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000001', 'A spring-mass-damper system is subjected to an external force

$$
F(t)=10\cos 2t
$$
Given $m=1$ kg, $c=4$ Ns/m, $k=5$ N/m.

**Formulate the differential equation, determine steady-state solution, and interpret system behavior.**', '# Question
A spring-mass-damper system is subjected to an external force $F(t) = 10\cos 2t$. Given $m=1$ kg, $c=4$ Ns/m, $k=5$ N/m. Formulate the differential equation, determine steady-state solution, and interpret system behavior.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Forced Damped Vibrations
* **Why Applicable**: The physical system has mass ($m$), damping ($c$), spring stiffness ($k$), and an external periodic forcing function $F(t)$.

---

# Pattern Recognition Trick
* Parameters: $m = 1, c = 4, k = 5$
* Forcing: $10\cos 2t$
* Steady-state solution is the particular integral $x_p(t)$.

---

# Shortcut / Exam Trick
Solve using complex impedances or undetermined coefficients:
$$x_p = A \cos 2t + B \sin 2t$$
Substitute and equate to get:
* $A = 2/13, B = 16/13$
$$x_p(t) = \frac{2}{13}\cos 2t + \frac{16}{13}\sin 2t$$

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$m x'''' + c x'' + k x = F(t) \implies x'''' + 4x'' + 5x = 10\cos 2t$$
2. Identify steady-state solution:
   * The complementary solution $x_c(t)$ decays to zero due to damping.
   * The steady-state response is given by the Particular Integral $x_p(t)$.
3. Assume trial solution:
   $$x_p = A\cos 2t + B\sin 2t$$
4. Compute derivatives:
   $$x_p'' = -2A\sin 2t + 2B\cos 2t$$
   $$x_p'''' = -4A\cos 2t - 4B\sin 2t$$
5. Substitute into the ODE:
   $$(-4A\cos 2t - 4B\sin 2t) + 4(-2A\sin 2t + 2B\cos 2t) + 5(A\cos 2t + B\sin 2t) = 10\cos 2t$$
   Group terms by $\cos 2t$ and $\sin 2t$:
   $$(A + 8B)\cos 2t + (B - 8A)\sin 2t = 10\cos 2t$$
6. Equate coefficients:
   * $A + 8B = 10$  --- (1)
   * $B - 8A = 0 \implies B = 8A$  --- (2)
7. Substitute (2) into (1):
   $$A + 8(8A) = 10 \implies 65A = 10 \implies A = \frac{2}{13}$$
   $$B = 8\left(\frac{2}{13}\right) = \frac{16}{13}$$
8. Write steady-state solution:
   $$x_{ss}(t) = \frac{2}{13}\cos 2t + \frac{16}{13}\sin 2t$$
9. Interpret system behavior:
   * The system oscillates at the driving frequency of $\omega = 2$ rad/s.
   * Damping prevents resonance, capping the amplitude at $x_{max} = \sqrt{A^2 + B^2} = \frac{2\sqrt{65}}{13} \approx 1.24$ m.

---

# Why This Step Works
* The steady-state solution is independent of initial conditions because the damping dissipates the transient initial energy.

---

# Formula Used
* $x'''' + 2\zeta\omega_n x'' + \omega_n^2 x = F_0\cos\omega t$

---

# Similar Patterns to Remember
* RLC circuit connected to an AC voltage source.

---

# Common Mistakes
* Calculating the complementary solution and trying to apply initial conditions to the complete solution when only the steady-state solution is requested.
* Forgetting the $x''$ term when substituting $x_p$ into the ODE.

---

# Final Answer
$$\boxed{x'''' + 4x'' + 5x = 10\cos 2t \quad \text{and} \quad x_{ss}(t) = \frac{2}{13}\cos 2t + \frac{16}{13}\sin 2t}$$

---

# 10-Second Revision Notes
✓ $x'''' + 4x'' + 5x = 10\cos 2t$
✓ $x_p = A\cos 2t + B\sin 2t \implies (A+8B)\cos 2t + (B-8A)\sin 2t = 10\cos 2t$
✓ $B=8A \implies A=2/13, B=16/13$.

---

# Memory Trick
"Steady-state means transients are dead. Just solve for the Particular Integral."

---

# Exam Confidence Booster
For forced damped vibrations, express the steady-state answer in phase-amplitude form $X_0 \cos(\omega t - \phi)$ where $X_0 = \sqrt{A^2+B^2}$ and $\phi = 	an^{-1}(B/A)$ to show premium engineering understanding!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q32', 32),
  ('e1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000001', 'An engineer models position as a scalar

$$
x(t)=t^2
$$
instead of a vector.

**Identify the error and correct it.**', '# Question
An engineer models position as a scalar $x(t) = t^2$ instead of a vector. Identify the error and correct it.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector Kinematics
* **Why Applicable**: Position in space is a coordinate mapping with magnitude and direction, requiring a vector representation to specify movement correctly.

---

# Pattern Recognition Trick
"Position in space" represents a coordinate direction, which must be represented with unit direction vectors $\hat i, \hat j, \hat k$.

---

# Shortcut / Exam Trick
* Scalar: $x(t) = t^2$ (no direction).
* Vector: $\vec r(t) = t^2\hat i$ (or in general: $\vec r(t) = x(t)\hat i + y(t)\hat j + z(t)\hat k$).

---

# Step-by-Step Solution
1. Identify the error:
   * A scalar $x(t) = t^2$ only describes distance or position in a single dimension without defining the direction of movement in 2D/3D space.
   * Velocity and acceleration derived from a scalar will also be scalars, which fails to capture directional changes (like curvature).
2. Correct the representation:
   * Position in space must be modeled as a vector-valued function of time, $\vec r(t)$:
     $$\vec r(t) = x(t)\hat i + y(t)\hat j + z(t)\hat k$$
   * For one-dimensional motion along the x-axis, the correct vector representation is:
     $$\vec r(t) = t^2 \hat i$$

---

# Why This Step Works
* Vectors carry both magnitude and direction, which is necessary for physical calculations in 2D and 3D space.

---

# Formula Used
* Position Vector: $\vec r(t) = x(t)\hat i + y(t)\hat j + z(t)\hat k$

---

# Similar Patterns to Remember
* Force, velocity, and acceleration are all vectors. Temperature and pressure are scalars.

---

# Common Mistakes
* Treating vector components as independent scalars without direction tags.
* Adding a scalar directly to a vector.

---

# Final Answer
$$\boxed{\text{Error: Position is a vector containing direction. Correction: } \vec r(t) = t^2 \hat i \text{ (for 1D motion on x-axis)}}$$

---

# 10-Second Revision Notes
✓ Scalar: $t^2$ (magnitude only).
✓ Vector: $\vec r(t) = t^2 \hat i$ (has direction).
✓ Position in space must be represented by a vector.

---

# Memory Trick
"Scalars tell you ''how much'', vectors tell you ''where to''."

---

# Exam Confidence Booster
Always write vectors with an arrow symbol (like $\vec r$ or $\mathbf{r}$) and use unit vectors ($\hat i, \hat j, \hat k$) to denote direction. This shows rigour and secures full marks!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q33', 33),
  ('e1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000001', 'Temperature is given by

$$
T(x,y)=5x+3y
$$
**Identify the type of field.**', '# Question
Temperature is given by $T(x,y) = 5x + 3y$. Identify the type of field.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Scalar and Vector Fields
* **Why Applicable**: We classify the given field function based on whether its output at any point $(x,y)$ is a scalar value or a vector.

---

# Pattern Recognition Trick
Look at the output value:
* $T(x,y) = 5x + 3y$ produces a single real number (scalar) at any coordinate $(x,y)$.
* There are no direction indicators like $\hat i, \hat j, \hat k$.

---

# Shortcut / Exam Trick
No unit vectors ($\hat i, \hat j$) in output formula $\implies$ Scalar Field.

---

# Step-by-Step Solution
1. Analyze the field function:
   $$T(x,y) = 5x + 3y$$
2. Evaluate at an arbitrary point, say $(1, 2)$:
   $$T(1, 2) = 5(1) + 3(2) = 11$$
   The output is the number 11, which is a scalar value (temperature in degrees, for example).
3. Check for direction:
   * The output has magnitude only, with no directional orientation.
4. Classify the field:
   * Since the function maps coordinates to scalar outputs, it is a **scalar field**.

---

# Why This Step Works
* Scalar fields describe spatial distributions of scalar properties like temperature, pressure, or density.

---

# Formula Used
* Scalar field mapping: $f: \mathbb{R}^n \to \mathbb{R}$

---

# Similar Patterns to Remember
* Atmospheric pressure $P(x,y,z)$.
* Electrostatic potential $V(x,y,z)$.

---

# Common Mistakes
* Classifying it as a vector field because the variables $x$ and $y$ are spatial coordinates. The type of field depends on the *output*, not the inputs.

---

# Final Answer
$$\boxed{\text{Scalar Field}}$$

---

# 10-Second Revision Notes
✓ Output $T(x,y)$ is a real number $\implies$ scalar.
✓ Maps position $(x,y)$ to a scalar property (temperature).
✓ Classify: Scalar Field.

---

# Memory Trick
"If there''s no unit vector in the output, it''s a scalar field."

---

# Exam Confidence Booster
Remember: if you take the gradient of a scalar field ($
abla T$), you get a vector field (the heat flux direction). If you take divergence of a vector field, you get a scalar field. Keep these relations in mind!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q34', 34),
  ('e1000000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000001', 'In a conveyor system, path

$$
\vec r(t)=t\hat i+t^2\hat j
$$
**Identify if motion is straight or curved using tangent direction.**', '# Question
In a conveyor system, path $\vec r(t) = t\hat i + t^2\hat j$. Identify if motion is straight or curved using tangent direction.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector Tangent and Kinematics
* **Why Applicable**: The direction of the tangent vector (velocity) determines whether a path is straight or curved. If the tangent vector''s direction is constant, the path is straight; if it changes, the path is curved.

---

# Pattern Recognition Trick
* Path: $\vec r(t) = t\hat i + t^2\hat j$
* Tangent (derivative): $\vec v(t) = \hat i + 2t\hat j$
* Direction of $\vec v(t)$ depends on $t$, so it is not constant.

---

# Shortcut / Exam Trick
If any component of the path has a power of $t$ greater than 1 (and cannot be simplified), the path is non-linear (curved). Here $y = x^2$ is a parabola.

---

# Step-by-Step Solution
1. Find the velocity vector (which is tangent to the path):
   $$\vec v(t) = \frac{d\vec r}{dt} = \frac{d}{dt}(t)\hat i + \frac{d}{dt}(t^2)\hat j = \hat i + 2t\hat j$$
2. Find the unit tangent vector $\hat T(t)$:
   $$\hat T(t) = \frac{\vec v(t)}{\|\vec v(t)\|} = \frac{\hat i + 2t\hat j}{\sqrt{1 + 4t^2}}$$
3. Analyze the direction of the tangent vector:
   * At $t = 0$: $\hat T(0) = \hat i$ (pointing along x-axis).
   * At $t = 1$: $\hat T(1) = \frac{1}{\sqrt{5}}\hat i + \frac{2}{\sqrt{5}}\hat j$.
   * Since the unit tangent vector $\hat T(t)$ changes direction over time, the path is **curved**.
   * Geometrically, eliminating $t$ gives $y = x^2$, which represents a parabolic curve.

---

# Why This Step Works
* A straight line has a constant unit tangent vector. A changing tangent direction indicates curvature.

---

# Formula Used
* $\vec v(t) = \vec r''(t)$
* $\hat T(t) = \frac{\vec v(t)}{\|\vec v(t)\|}$

---

# Similar Patterns to Remember
* Circular motion $\vec r(t) = \cos t\hat i + \sin t\hat j \implies$ Curved.
* Linear motion $\vec r(t) = 2t\hat i + 3t\hat j \implies \hat T = \frac{2\hat i + 3\hat j}{\sqrt{13}}$ (constant direction, straight).

---

# Common Mistakes
* Claiming the path is straight because the derivative of the first term is a constant (1). You must check the direction of the *entire* vector.

---

# Final Answer
$$\boxed{\text{Curved Motion. The unit tangent vector direction changes with time } t.}$$

---

# 10-Second Revision Notes
✓ $\vec r'' = \hat i + 2t\hat j$
✓ Direction of tangent vector depends on $t$.
✓ Changing tangent direction $\implies$ Curved path (parabola $y=x^2$).

---

# Memory Trick
"Quadratic or higher terms in position mean curves in motion."

---

# Exam Confidence Booster
Quick check: Convert the vector equation to Cartesian coordinates by setting $x=t$ and $y=t^2 \implies y = x^2$. Since $y=x^2$ is a parabola (non-linear), the path is curved!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q35', 35),
  ('e1000000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000001', 'A particle moves in a circle.

**Identify curvature nature.**', '# Question
A particle moves in a circle. Identify curvature nature.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Curvature ($\kappa$)
* **Why Applicable**: Curvature measures how sharply a curve bends. We determine the curvature of a circle using vector calculus definitions.

---

# Pattern Recognition Trick
A circle has a constant radius $R$, meaning it bends at a uniform rate.

---

# Shortcut / Exam Trick
For a circle of radius $R$:
$$\kappa = \frac{1}{R} = \text{Constant}$$

---

# Step-by-Step Solution
1. Define the position vector of a circle of radius $R$:
   $$\vec r(t) = R\cos t\hat i + R\sin t\hat j$$
2. Compute velocity and acceleration vectors:
   $$\vec r''(t) = -R\sin t\hat i + R\cos t\hat j \implies \|\vec r''(t)\| = R$$
   $$\vec r''''(t) = -R\cos t\hat i - R\sin t\hat j$$
3. Compute cross product:
   $$\vec r''(t) \times \vec r''''(t) = (-R\sin t)(-R\sin t)\hat k - (R\cos t)(-R\cos t)(-\hat k) = R^2\hat k$$
   $$\|\vec r''(t) \times \vec r''''(t)\| = R^2$$
4. Compute curvature $\kappa$:
   $$\kappa = \frac{\|\vec r'' \times \vec r''''\|}{\|\vec r''\|^3} = \frac{R^2}{R^3} = \frac{1}{R}$$
5. Interpret the nature:
   * Since $R$ is constant, the curvature $\kappa = \frac{1}{R}$ is **constant** and **positive** at all points along the path.

---

# Why This Step Works
* Uniform bending around a central point yields a constant radius, giving a flat, constant curvature value.

---

# Formula Used
* $\kappa = \frac{\|\vec r'' \times \vec r''''\|}{\|\vec r''\|^3}$

---

# Similar Patterns to Remember
* Curvature of a straight line is 0 (radius of curvature is infinity).
* Curvature of a helix is also constant.

---

# Common Mistakes
* Stating that curvature is zero because circular motion has constant speed. Curvature depends on direction changes, not speed.
* Writing $\kappa = R$ instead of $1/R$.

---

# Final Answer
$$\boxed{\kappa = \frac{1}{R} \quad \text{(Constant and positive)}}$$

---

# 10-Second Revision Notes
✓ Circle radius $= R$
✓ Curvature $\kappa = 1/R$
✓ Nature: Constant and uniform curvature at all points.

---

# Memory Trick
"Curvature is the inverse of the radius. Smaller circles bend sharper (larger curvature)."

---

# Exam Confidence Booster
If asked for "radius of curvature" $ho$, remember it is the reciprocal of curvature: $ho = 1/\kappa$. For a circle, the radius of curvature is simply the circle''s radius $R$!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q36', 36),
  ('e1000000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000001', 'A fluid velocity field is given by

$$
\vec v(t)=3t\hat i+2t^2\hat j
$$
**Identify whether acceleration is constant.**', '# Question
A fluid velocity field is given by $\vec v(t) = 3t\hat i + 2t^2\hat j$. Identify whether acceleration is constant.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Kinematics (Acceleration Vector)
* **Why Applicable**: Acceleration is the derivative of the velocity vector with respect to time: $\vec a = d\vec v/dt$. We evaluate if the resulting vector depends on $t$.

---

# Pattern Recognition Trick
* Velocity: $\vec v(t) = 3t\hat i + 2t^2\hat j$
* Look at powers of $t$: the second term has a quadratic dependency ($t^2$), so its derivative will still contain $t$.

---

# Shortcut / Exam Trick
If velocity contains any term with power of $t$ greater than 1, acceleration is not constant. Here, $t^2 \implies$ non-constant acceleration.

---

# Step-by-Step Solution
1. Start with the given velocity vector:
   $$\vec v(t) = 3t\hat i + 2t^2\hat j$$
2. Differentiate with respect to time $t$ to find the acceleration vector $\vec a(t)$:
   $$\vec a(t) = \frac{d\vec v}{dt} = \frac{d}{dt}(3t)\hat i + \frac{d}{dt}(2t^2)\hat j$$
   $$\vec a(t) = 3\hat i + 4t\hat j$$
3. Analyze the result:
   * The x-component of acceleration is $3$ (constant).
   * The y-component of acceleration is $4t$, which depends linearly on time $t$.
   * Therefore, the total acceleration vector $\vec a(t) = 3\hat i + 4t\hat j$ is **not constant** (it varies over time).

---

# Why This Step Works
* Velocity changes non-linearly over time, which requires a time-varying force and acceleration to sustain.

---

# Formula Used
* $\vec a(t) = \frac{d\vec v}{dt}$

---

# Similar Patterns to Remember
* Constant acceleration motion (like gravity): $\vec v(t) = gt \hat j \implies \vec a = g \hat j$ (constant).

---

# Common Mistakes
* Differentiating only the first term and claiming acceleration is constant.
* Confusing speed with velocity components.

---

# Final Answer
$$\boxed{\vec a(t) = 3\hat i + 4t\hat j \quad \text{and} \quad \text{Acceleration is not constant.}}$$

---

# 10-Second Revision Notes
✓ $\vec a = \vec v'' = 3\hat i + 4t\hat j$
✓ The $4t\hat j$ term depends on time $t$.
✓ Therefore, the acceleration is time-varying (not constant).

---

# Memory Trick
"Velocity must be linear in $t$ for acceleration to be constant."

---

# Exam Confidence Booster
To confirm if any vector is constant, differentiate it with respect to its variable. If the result is a non-zero function containing the variable, it is not constant. Simple and robust!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q37', 37),
  ('e1000000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000001', 'Given

$$
\vec r(t)=3t\hat i+2t^2\hat j
$$
**Identify the type and justify.**', '# Question
Given $\vec r(t) = 3t\hat i + 2t^2\hat j$, identify the type and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector-valued Functions
* **Why Applicable**: We classify the mathematical entity represented by $\vec r(t)$ based on its inputs and output types.

---

# Pattern Recognition Trick
* Input: a single real number $t$ (scalar).
* Output: a vector with components along $\hat i$ and $\hat j$.

---

# Shortcut / Exam Trick
Maps $\mathbb{R} \to \mathbb{R}^2 \implies$ Vector-valued function of a scalar variable.

---

# Step-by-Step Solution
1. Identify the input variable:
   * The variable $t$ is a single real number representing a scalar quantity (typically time).
2. Identify the output:
   * For any value of $t$, the output is a 2D vector:
     $$\vec r(t) = x(t)\hat i + y(t)\hat j = (3t, 2t^2)$$
3. Classify:
   * This is a **vector-valued function of a single scalar variable**.
4. Justification:
   * The domain is a subset of real numbers $\mathbb{R}$ (scalars).
   * The codomain is a vector space $\mathbb{R}^2$ (vectors in a 2D plane).
   * It maps a scalar input to a vector coordinate, describing a curve (parabola) in space.

---

# Why This Step Works
* Mapping inputs (scalars) to direction-based arrays (vectors) matches the formal definition of a vector-valued function.

---

# Formula Used
* Function mapping: $\vec r: I \subset \mathbb{R} \to \mathbb{R}^2$

---

# Similar Patterns to Remember
* 3D space curves: $\vec r(t) = x(t)\hat i + y(t)\hat j + z(t)\hat k$.

---

# Common Mistakes
* Calling it a vector field. A vector field maps vectors to vectors (e.g. $\vec F(x,y) = P\hat i + Q\hat j$). Here, the input is a single scalar $t$, not coordinates $(x,y)$.

---

# Final Answer
$$\boxed{\text{Vector-valued function of a scalar variable } t.}$$

---

# 10-Second Revision Notes
✓ Input: scalar $t$
✓ Output: vector $3t\hat i + 2t^2\hat j$
✓ Definition: Vector-valued function.

---

# Memory Trick
"Inputs are numbers, outputs are vectors $\implies$ Vector-valued function."

---

# Exam Confidence Booster
Don''t confuse "vector-valued functions" with "vector fields". Vector-valued functions draw lines/paths (1D parameter $t$), while vector fields fill areas/volumes (multiple coordinates like $x,y,z$). Keep this straight!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q38', 38),
  ('e1000000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000001', 'An engineer assumes tangent and normal vectors are parallel.

**Identify and correct the error.**', '# Question
An engineer assumes tangent and normal vectors are parallel. Identify and correct the error.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Unit Tangent and Normal Vectors
* **Why Applicable**: We use the geometric definitions of the unit tangent vector $\hat T$ and principal normal vector $\hat N$ to show their relationship.

---

# Pattern Recognition Trick
* Unit tangent vector: $\hat T = \vec r''/\|\vec r''\|$ (points along velocity).
* Principal normal vector: $\hat N = \hat T''/\|\hat T''\|$ (points toward center of curvature).
* $\hat T$ and $\hat N$ are always orthogonal.

---

# Shortcut / Exam Trick
Tangent is direction of motion; normal is direction of turning. They must be perpendicular!
$$\hat T \cdot \hat N = 0$$

---

# Step-by-Step Solution
1. Identify the error:
   * The engineer assumed the unit tangent vector $\hat T$ and the principal normal vector $\hat N$ are parallel.
   * This is mathematically and physically incorrect. Along any smooth curve, these two vectors are always **orthogonal** (perpendicular) to each other, not parallel.
2. Prove orthogonality:
   * Since $\hat T(t)$ is a unit vector, its magnitude is constant:
     $$\hat T \cdot \hat T = \|\hat T\|^2 = 1$$
   * Differentiate both sides with respect to $t$:
     $$\frac{d}{dt}(\hat T \cdot \hat T) = 0 \implies 2\hat T \cdot \frac{d\hat T}{dt} = 0 \implies \hat T \cdot \hat T'' = 0$$
   * Since $\hat N$ is in the direction of $\hat T''$ ($\hat N = \hat T''/\|\hat T''\|$), we have:
     $$\hat T \cdot \hat N = 0$$
3. Correct the error:
   * State that the unit tangent and normal vectors are perpendicular:
     $$\hat T \perp \hat N \quad \text{and} \quad \hat T \cdot \hat N = 0$$

---

# Why This Step Works
* A vector of constant length is always perpendicular to its derivative vector, which leads directly to tangent-normal orthogonality.

---

# Formula Used
* $\hat T \cdot \hat N = 0$
* $\hat N = \frac{d\hat T/ds}{\|d\hat T/ds\|}$

---

# Similar Patterns to Remember
* Radial vector and tangent vector of a circle are perpendicular.

---

# Common Mistakes
* Assuming they are parallel because they both relate to the path. Tangent points *along* the path, while normal points *inside* the bend.

---

# Final Answer
$$\boxed{\text{Error: Tangent and normal vectors are orthogonal, not parallel. Correction: } \hat T \cdot \hat N = 0.}$$

---

# 10-Second Revision Notes
✓ $\hat T$ has constant magnitude $= 1$
✓ Constant magnitude vector is perpendicular to its derivative: $\hat T \cdot \hat T'' = 0$
✓ Since $\hat N \propto \hat T''$, it follows that $\hat T \cdot \hat N = 0$ (Orthogonal).

---

# Memory Trick
"Tangent goes straight, normal goes left/right. They make a $90^\circ$ angle."

---

# Exam Confidence Booster
In space curve analysis, the unit tangent vector $\hat T$, normal vector $\hat N$, and binormal vector $\hat B = \hat T \times \hat N$ form a mutually perpendicular coordinate frame (Frenet-Serret frame). Keep this orthogonal triad in mind!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q39', 39),
  ('e1000000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000001', 'Identify role of unit tangent vector in motion analysis.', '# Question
Identify role of unit tangent vector in motion analysis.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Unit Tangent Vector
* **Why Applicable**: We define the physical and geometric role of the unit tangent vector $\hat T(t)$ along a moving trajectory.

---

# Pattern Recognition Trick
* Tangent vector points in the direction of the velocity vector: $\vec v(t) = \vec r''(t)$.
* Dividing by its speed $\|\vec v(t)\|$ removes the speed factor, leaving only the direction.

---

# Shortcut / Exam Trick
$$\hat T(t) = \frac{\vec v(t)}{\|\vec v(t)\|} = \text{Direction of motion}$$

---

# Step-by-Step Solution
1. Define the unit tangent vector mathematically:
   $$\hat T(t) = \frac{\vec r''(t)}{\|\vec r''(t)\|} = \frac{\vec v(t)}{\|\vec v(t)\|} = \frac{\vec v(t)}{v(t)}$$
   where $\vec v(t)$ is the velocity vector and $v(t) = \|\vec v(t)\|$ is the speed.
2. **Physical Role**:
   * It represents the instantaneous **direction of motion** of a particle.
   * It decouples the direction of travel from the speed of the particle.
3. **Role in Acceleration Analysis**:
   * Acceleration can be decomposed into tangential and normal components:
     $$\vec a = a_T \hat T + a_N \hat N$$
   * The tangential component $a_T = \vec a \cdot \hat T = \frac{d^2s}{dt^2}$ represents the rate of change of speed along the path.
4. **Geometric Role**:
   * It defines the orientation of the osculating plane and curvature calculations.

---

# Why This Step Works
* Normalizing the velocity vector yields a vector of length 1 pointing exactly in the direction of instantaneous travel.

---

# Formula Used
* $\hat T(t) = \frac{\vec v(t)}{\|\vec v(t)\|}$
* $\vec v(t) = v(t)\hat T(t)$

---

# Similar Patterns to Remember
* Unit normal vector represents the direction of turning.

---

# Common Mistakes
* Confusing the unit tangent vector with the velocity vector. Velocity includes speed, while the unit tangent has a magnitude of exactly 1.

---

# Final Answer
$$\boxed{\text{The unit tangent vector represents the instantaneous direction of motion, scaling velocity to unit magnitude.}}$$

---

# 10-Second Revision Notes
✓ $\hat T = \vec v / \|\vec v\|$
✓ Magnitude of $\hat T$ is always 1.
✓ Tells you *where* the particle is heading, not *how fast*.

---

# Memory Trick
"The unit tangent is the compass needle of the trajectory."

---

# Exam Confidence Booster
tangential acceleration $a_T = \vec a \cdot \hat T$ is the rate of change of speed. If speed is constant (uniform motion), $a_T = 0$, and acceleration is purely normal. Remember this relation!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q40', 40),
  ('e1000000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000001', 'An electric vehicle follows the trajectory

$$
\vec r(t)=t^2\hat i+3t\hat j
$$
**Compute velocity and acceleration at $t=2$. Analyze whether the motion is uniformly accelerated and justify.**', '# Question
An electric vehicle follows the trajectory $\vec r(t) = t^2\hat i + 3t\hat j$. Compute velocity and acceleration at $t=2$. Analyze whether the motion is uniformly accelerated and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Kinematics (Velocity and Acceleration Vectors)
* **Why Applicable**: The position vector is parameterized by time $t$. First and second derivatives yield velocity and acceleration vectors respectively.

---

# Pattern Recognition Trick
Identify:
* Position: $\vec{r}(t) = t^2\hat{i} + 3t\hat{j}$
* Differentiate once for $\vec{v}(t)$: linear in $t$ component $\hat{i}$.
* Differentiate twice for $\vec{a}(t)$: constant vector $2\hat{i}$.
* Constant acceleration vector $\implies$ Uniform acceleration.

---

# Shortcut / Exam Trick
If the position vector is quadratic in $t$ (contains at most $t^2$) and all higher powers of $t$ are absent, the acceleration is always a constant vector (uniform acceleration).
Here, components are $t^2$ and $t \implies$ Uniform acceleration!

---

# Step-by-Step Solution
1. Find the velocity vector $\vec{v}(t)$ by differentiating the position vector $\vec{r}(t)$ once:
   $$\vec{v}(t) = \vec{r}''(t) = \frac{d}{dt}(t^2)\hat{i} + \frac{d}{dt}(3t)\hat{j} = 2t\hat{i} + 3\hat{j}$$
2. Evaluate velocity at $t = 2$:
   $$\vec{v}(2) = 2(2)\hat{i} + 3\hat{j} = 4\hat{i} + 3\hat{j} \text{ m/s}$$
3. Find the acceleration vector $\vec{a}(t)$ by differentiating velocity $\vec{v}(t)$:
   $$\vec{a}(t) = \vec{v}''(t) = \frac{d}{dt}(2t)\hat{i} + \frac{d}{dt}(3)\hat{j} = 2\hat{i}$$
4. Evaluate acceleration at $t = 2$:
   $$\vec{a}(2) = 2\hat{i} \text{ m/s}^2$$
5. **Analyze uniformity**:
   Since the acceleration vector $\vec{a}(t) = 2\hat{i}$ does not contain the time parameter $t$, it remains constant in both magnitude ($2 \text{ m/s}^2$) and direction (along the positive x-axis) at all times.
6. **Conclusion**:
   The motion is **uniformly accelerated**.

---

# Why This Step Works
* Taking sequential derivatives of position coordinates gives the rate of change of position (velocity) and rate of change of velocity (acceleration).

---

# Formula Used
* Velocity: $\vec{v}(t) = \frac{d\vec{r}}{dt}$
* Acceleration: $\vec{a}(t) = \frac{d\vec{v}}{dt}$

---

# Similar Patterns to Remember
* Projectile motion: $\vec{r}(t) = u_x t\hat{i} + (u_y t - 0.5gt^2)\hat{j} \implies \vec{a} = -g\hat{j}$ (uniform).
* Circular motion: $\vec{a}(t)$ changes direction, so it is non-uniform acceleration despite constant magnitude.

---

# Common Mistakes
* Writing the scalar speed at $t=2$ ($v = \sqrt{16+9} = 5$ m/s) as the velocity vector.
* Stating that acceleration at $t=2$ is $2\hat{i} + 3\hat{j}$ by failing to differentiate the constant $3t$ term twice.

---

# Final Answer
$$\boxed{\vec{v}(2) = 4\hat{i} + 3\hat{j} \text{ m/s}, \quad \vec{a}(2) = 2\hat{i} \text{ m/s}^2, \quad \text{Motion is uniformly accelerated.}}$$

---

# 10-Second Revision Notes
✓ Velocity: $\vec{r}'' = 2t\hat{i} + 3\hat{j} \to \vec{v}(2) = 4\hat{i} + 3\hat{j}$.
✓ Acceleration: $\vec{v}'' = 2\hat{i}$.
✓ No time variable in $\vec{a} \implies$ Uniform acceleration.

---

# Memory Trick
"If position is a quadratic polynomial in time, acceleration is constant."

---

# Exam Confidence Booster
Spotting a highest term of $t^2$ in position means acceleration is constant. Write down the answer directly without intermediate steps!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q41', 41),
  ('e1000000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000001', 'A pipe flow system is modeled by

$$
\vec F=yz\hat i+xz\hat j+xy\hat k
$$
**Compute divergence and analyze whether the system satisfies incompressibility.**', '# Question
A pipe flow system is modeled by $\vec F = yz\hat i + xz\hat j + xy\hat k$. Compute divergence and analyze whether the system satisfies incompressibility.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Divergence of a Vector Field
* **Why Applicable**: Divergence measures the expansion or contraction density of a vector field. For an incompressible fluid flow, the divergence of the velocity field must be zero everywhere ($\nabla \cdot \vec{F} = 0$).

---

# Pattern Recognition Trick
Look at the components:
* $F_x = yz$ (no $x$ variable)
* $F_y = xz$ (no $y$ variable)
* $F_z = xy$ (no $z$ variable)
* Since each partial derivative ($\frac{\partial F_x}{\partial x}$, etc.) is zero, the sum is zero.

---

# Shortcut / Exam Trick
If component $i$ is independent of variable $i$ for all components (i.e. $F_x$ has no $x$, $F_y$ has no $y$, $F_z$ has no $z$), the divergence is instantly $0$.

---

# Step-by-Step Solution
1. Identify the components of the vector field $\vec{F}$:
   $$F_x = yz, \quad F_y = xz, \quad F_z = xy$$
2. Write the formula for divergence:
   $$\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$$
3. Compute each partial derivative:
   $$\frac{\partial(yz)}{\partial x} = 0$$
   $$\frac{\partial(xz)}{\partial y} = 0$$
   $$\frac{\partial(xy)}{\partial z} = 0$$
4. Sum the partial derivatives:
   $$\nabla \cdot \vec{F} = 0 + 0 + 0 = 0$$
5. **Incompressibility Analysis**:
   Since the divergence is zero everywhere ($\nabla \cdot \vec{F} = 0$), the rate of fluid entering any volume equals the rate of fluid leaving it.
6. **Conclusion**:
   The system satisfies the condition of **incompressibility**.

---

# Why This Step Works
* Setting divergence to zero represents mass conservation in a fluid volume, meaning no fluid is being compressed or created.

---

# Formula Used
* Divergence: $\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$

---

# Similar Patterns to Remember
* Solenoidal fields: $\nabla \cdot \vec{B} = 0$ (like magnetic fields).
* Source fields: $\nabla \cdot \vec{E} = \rho / \epsilon_0 \neq 0$.

---

# Common Mistakes
* Differentiating the components with respect to the wrong variables: e.g. calculating $\frac{\partial(yz)}{\partial y} = z$ and summing them up. Remember, the dot product aligns $x$ with $x$, $y$ with $y$, $z$ with $z$.

---

# Final Answer
$$\boxed{\nabla \cdot \vec{F} = 0, \quad \text{System is incompressible (Solenoidal).}}$$

---

# 10-Second Revision Notes
✓ $F_x = yz \implies \partial_x F_x = 0$.
✓ $F_y = xz \implies \partial_y F_y = 0$.
✓ $F_z = xy \implies \partial_z F_z = 0$.
✓ Sum $= 0 \implies$ Incompressible.

---

# Memory Trick
"No matching coordinates in the components means divergence is zero."

---

# Exam Confidence Booster
By inspection, you can verify that each term is independent of its vector coordinate, showing the field is solenoidal in 2 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q42', 42),
  ('e1000000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000001', 'A drone path is

$$
\vec r(t)=t^3\hat i+2t^2\hat j+t\hat k
$$
**Compute velocity, acceleration, and evaluate tangential component at $t=1$.**', '# Question
A drone path is $\vec r(t) = t^3\hat i + 2t^2\hat j + t\hat k$. Compute velocity, acceleration, and evaluate tangential component at $t=1$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Tangential Component of Acceleration
* **Why Applicable**: Acceleration can be resolved into a tangential component $a_T$ (which changes speed) and a normal component $a_N$ (which changes direction).

---

# Pattern Recognition Trick
* Tangential Acceleration: $a_T = \frac{\vec{a} \cdot \vec{v}}{v}$
* Find $\vec{v}(1)$ and $\vec{a}(1)$.
* Take their dot product and divide by speed $v = |\vec{v}(1)|$.

---

# Shortcut / Exam Trick
Direct formula:
$$a_T = \frac{\vec{v} \cdot \vec{a}}{|\vec{v}|}$$
At $t=1$:
* $\vec{v} = 3\hat{i} + 4\hat{j} + \hat{k}$
* $\vec{a} = 6\hat{i} + 4\hat{j} + 0\hat{k}$
* $\vec{v} \cdot \vec{a} = 18 + 16 = 34$
* $|\vec{v}| = \sqrt{9 + 16 + 1} = \sqrt{26}$
* $a_T = \frac{34}{\sqrt{26}}$

---

# Step-by-Step Solution
1. Differentiate position vector $\vec{r}(t)$ to find velocity vector $\vec{v}(t)$:
   $$\vec{v}(t) = \vec{r}''(t) = 3t^2\hat{i} + 4t\hat{j} + \hat{k}$$
2. Evaluate velocity at $t = 1$:
   $$\vec{v}(1) = 3\hat{i} + 4\hat{j} + \hat{k}$$
3. Compute speed at $t = 1$:
   $$|\vec{v}(1)| = \sqrt{3^2 + 4^2 + 1^2} = \sqrt{9 + 16 + 1} = \sqrt{26}$$
4. Differentiate velocity vector $\vec{v}(t)$ to find acceleration vector $\vec{a}(t)$:
   $$\vec{a}(t) = \vec{v}''(t) = 6t\hat{i} + 4\hat{j}$$
5. Evaluate acceleration at $t = 1$:
   $$\vec{a}(1) = 6\hat{i} + 4\hat{j}$$
6. Compute the dot product $\vec{v}(1) \cdot \vec{a}(1)$:
   $$\vec{v}(1) \cdot \vec{a}(1) = (3)(6) + (4)(4) + (1)(0) = 18 + 16 + 0 = 34$$
7. Calculate the tangential component of acceleration ($a_T$):
   $$a_T = \frac{\vec{v} \cdot \vec{a}}{|\vec{v}|} = \frac{34}{\sqrt{26}}$$

---

# Why This Step Works
* The dot product projects the acceleration vector onto the velocity vector''s direction, giving the rate of change of linear speed.

---

# Formula Used
* $a_T = \frac{\vec{v} \cdot \vec{a}}{v}$

---

# Similar Patterns to Remember
* Normal component of acceleration: $a_N = \frac{|\vec{v} \times \vec{a}|}{v} = \sqrt{|\vec{a}|^2 - a_T^2}$.

---

# Common Mistakes
* Writing the scalar derivative of acceleration components directly without projection.
* Forgetting to divide by the magnitude of velocity, leading to an incorrect units scale.

---

# Final Answer
$$\boxed{\vec{v}(1) = 3\hat{i} + 4\hat{j} + \hat{k}, \quad \vec{a}(1) = 6\hat{i} + 4\hat{j}, \quad a_T = \frac{34}{\sqrt{26}}}$$

---

# 10-Second Revision Notes
✓ Differentiate to get $\vec{v}(1) = [3, 4, 1]$ and $\vec{a}(1) = [6, 4, 0]$.
✓ Dot product $\vec{v} \cdot \vec{a} = 18 + 16 = 34$.
✓ Speed $|\vec{v}| = \sqrt{26}$.
✓ $a_T = 34/\sqrt{26}$.

---

# Memory Trick
"Tangential acceleration is the dot product projection of acceleration along velocity''s path."

---

# Exam Confidence Booster
By calculating the dot product first, you can instantly find if speed is increasing (positive dot product) or decreasing (negative dot product). Done in 30 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q43', 43),
  ('e1000000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000001', 'In an electromagnetic field, the vector field is

$$
\vec F=2x\hat i+3y\hat j
$$
**Compute divergence and evaluate whether the field conserves flux. Interpret physically.**', '# Question
In an electromagnetic field, the vector field is $\vec F = 2x\hat i + 3y\hat j$. Compute divergence and evaluate whether the field conserves flux. Interpret physically.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Divergence and Flux Conservation
* **Why Applicable**: A vector field is flux-conserving (solenoidal) if and only if its divergence is zero everywhere. A non-zero divergence indicates the presence of sources or sinks.

---

# Pattern Recognition Trick
Look at the coefficients:
* $F_x = 2x \implies \frac{\partial F_x}{\partial x} = 2$
* $F_y = 3y \implies \frac{\partial F_y}{\partial y} = 3$
* Sum $= 2 + 3 = 5 \neq 0$.
* Positive divergence $\implies$ Source present, flux not conserved.

---

# Shortcut / Exam Trick
For $\vec{F} = ax\hat{i} + by\hat{j} + cz\hat{k}$, the divergence is always the constant sum:
$$\nabla \cdot \vec{F} = a + b + c$$
Here, $2 + 3 = 5$. Since $5 \neq 0$, flux is not conserved.

---

# Step-by-Step Solution
1. Identify the components of the vector field $\vec{F}$:
   $$F_x = 2x, \quad F_y = 3y$$
2. Calculate the divergence of $\vec{F}$:
   $$\nabla \cdot \vec{F} = \frac{\partial(2x)}{\partial x} + \frac{\partial(3y)}{\partial y}$$
3. Perform the differentiation:
   $$\nabla \cdot \vec{F} = 2 + 3 = 5$$
4. **Evaluate flux conservation**:
   Since $\nabla \cdot \vec{F} = 5 \neq 0$, the vector field is **not** flux-conserving.
5. **Physical Interpretation**:
   A constant positive divergence of 5 indicates that every unit volume in space acts as a continuous source of flux, generating 5 units of field lines per unit volume.

---

# Why This Step Works
* Divergence represents the net outward flux per unit volume. A positive value means there is a net expansion (source), whereas a negative value would mean compression (sink).

---

# Formula Used
* Divergence: $\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y}$

---

# Similar Patterns to Remember
* Velocity field of an expanding gas.
* Electric field of a uniform volume charge density.

---

# Common Mistakes
* Leaving unit vectors in the divergence expression: writing $\nabla \cdot \vec{F} = 2\hat{i} + 3\hat{j}$ (divergence must be a scalar).
* Saying flux is conserved because the divergence is constant.

---

# Final Answer
$$\boxed{\nabla \cdot \vec{F} = 5, \quad \text{Flux is not conserved (contains sources).}}$$

---

# 10-Second Revision Notes
✓ $F_x = 2x \implies \partial_x F_x = 2$.
✓ $F_y = 3y \implies \partial_y F_y = 3$.
✓ Divergence $= 2 + 3 = 5$.
✓ Divergence $\neq 0 \implies$ Not solenoidal.

---

# Memory Trick
"If divergence is positive, field lines are born here (source)."

---

# Exam Confidence Booster
The divergence of any linear scaling vector field is simply the sum of its scale coordinates. Calculate in 2 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q44', 44),
  ('e1000000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000001', 'In an electrostatic field, potential

$$
V(x,y,z)=xyz
$$
**Compute gradient and evaluate directional derivative at ($1,1,1$) along $\hat i+\hat j+\hat k$. Interpret physical meaning.**', '# Question
In an electrostatic field, potential $V(x,y,z) = xyz$. Compute gradient and evaluate directional derivative at $(1,1,1)$ along $\hat i + \hat j + \hat k$. Interpret physical meaning.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Gradient and Directional Derivative
* **Why Applicable**: The gradient $\nabla V$ represents the rate and direction of maximum spatial change of a scalar field. The directional derivative projects this change along a specific unit direction vector.

---

# Pattern Recognition Trick
* Potential: $V = xyz$
* Gradient at $(1,1,1)$: $\nabla V = [yz, xz, xy] \to [1, 1, 1]$.
* Direction: $\vec{u} = [1, 1, 1]$. Since this matches the gradient direction, the directional derivative will equal the maximum rate of change.

---

# Shortcut / Exam Trick
If the gradient vector $\nabla V$ is parallel to the direction vector $\vec{d}$, the directional derivative is simply the magnitude of the gradient:
$$\text{DD}_{max} = |\nabla V| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$$

---

# Step-by-Step Solution
1. Find the gradient of $V(x,y,z) = xyz$:
   $$\nabla V = \frac{\partial(xyz)}{\partial x}\hat{i} + \frac{\partial(xyz)}{\partial y}\hat{j} + \frac{\partial(xyz)}{\partial z}\hat{k} = yz\hat{i} + xz\hat{j} + xy\hat{k}$$
2. Evaluate the gradient at point $(1,1,1)$:
   $$\nabla V(1,1,1) = (1)(1)\hat{i} + (1)(1)\hat{j} + (1)(1)\hat{k} = \hat{i} + \hat{j} + \hat{k}$$
3. Define the direction vector $\vec{d}$ and normalize it to a unit vector $\hat{u}$:
   $$\vec{d} = \hat{i} + \hat{j} + \hat{k}$$
   $$|\vec{d}| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$$
   $$\hat{u} = \frac{\vec{d}}{|\vec{d}|} = \frac{\hat{i} + \hat{j} + \hat{k}}{\sqrt{3}}$$
4. Compute the directional derivative (dot product of gradient and unit direction vector):
   $$\text{DD} = \nabla V \cdot \hat{u} = (\hat{i} + \hat{j} + \hat{k}) \cdot \left(\frac{\hat{i} + \hat{j} + \hat{k}}{\sqrt{3}}\right)$$
   $$\text{DD} = \frac{1(1) + 1(1) + 1(1)}{\sqrt{3}} = \frac{3}{\sqrt{3}} = \sqrt{3}$$
5. **Physical Interpretation**:
   The directional derivative represents the rate of change of electrical potential per unit distance in the direction of the vector $\hat{i} + \hat{j} + \hat{k}$. Since the direction matches the gradient, $\sqrt{3}$ is the maximum possible rate of potential change at this point.

---

# Why This Step Works
* Normalizing the direction vector is necessary to isolate pure spatial rate of change. The dot product yields the projection of the gradient in that direction.

---

# Formula Used
* Gradient: $\nabla V = \frac{\partial V}{\partial x}\hat{i} + \frac{\partial V}{\partial y}\hat{j} + \frac{\partial V}{\partial z}\hat{k}$
* Directional Derivative: $D_{\hat{u}}V = \nabla V \cdot \hat{u}$

---

# Similar Patterns to Remember
* Finding the rate of temperature change of a drone flying in a specific direction.
* Steepest ascent on a topographic surface.

---

# Common Mistakes
* Doing the dot product with the non-normalized vector $\vec{d} = \hat{i} + \hat{j} + \hat{k}$ (yielding $3$ instead of $\sqrt{3}$).
* Confusing gradient (a vector) with directional derivative (a scalar).

---

# Final Answer
$$\boxed{\nabla V = yz\hat{i} + xz\hat{j} + xy\hat{k}, \quad \text{Directional Derivative} = \sqrt{3}}$$

---

# 10-Second Revision Notes
✓ Gradient at $(1,1,1) = \hat{i} + \hat{j} + \hat{k}$.
✓ Unit direction vector $= (\hat{i} + \hat{j} + \hat{k})/\sqrt{3}$.
✓ Dot product $= 3/\sqrt{3} = \sqrt{3}$.
✓ Direction is parallel to gradient $\implies$ Maximum rate of change.

---

# Memory Trick
"Always divide the direction vector by its length before dotted-producting with the gradient."

---

# Exam Confidence Booster
When the direction matches the gradient direction, the answer is always the magnitude of the gradient. Solve in 10 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q45', 45),
  ('e1000000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000001', 'In a fluid mixing system, velocity field is

$$
\vec F=y\hat i-x\hat j
$$
**Compute curl and analyze whether the flow is rotational. Interpret its impact on mixing efficiency.**', '# Question
In a fluid mixing system, velocity field is $\vec F = y\hat i - x\hat j$. Compute curl and analyze whether the flow is rotational. Interpret its impact on mixing efficiency.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Curl of a Vector Field
* **Why Applicable**: Curl measures the rotation density or vorticity of a vector field. If $\nabla \times \vec{F} \neq 0$, the flow is rotational, indicating fluid elements rotate as they move.

---

# Pattern Recognition Trick
Identify:
* $\vec{F} = y\hat{i} - x\hat{j}$
* This is a standard vortex rotation field.
* Curl should be negative along the z-axis (clockwise rotation):
  $$\frac{\partial(-x)}{\partial x} - \frac{\partial(y)}{\partial y} = -1 - 1 = -2\hat{k}$$

---

# Shortcut / Exam Trick
For 2D field $\vec{F} = P\hat{i} + Q\hat{j}$, the curl is always:
$$\text{Curl} = \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\hat{k}$$
Here, $\frac{\partial(-x)}{\partial x} - \frac{\partial(y)}{\partial y} = -1 - 1 = -2 \implies \text{Curl} = -2\hat{k}$.

---

# Step-by-Step Solution
1. Write the vector field components:
   $$F_x = y, \quad F_y = -x, \quad F_z = 0$$
2. Set up the curl determinant:
   $$\nabla \times \vec{F} = \left| \begin{matrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ y & -x & 0 \end{matrix} \right|$$
3. Expand the determinant:
   $$\nabla \times \vec{F} = \hat{i}\left(0 - 0\right) - \hat{j}\left(0 - 0\right) + \hat{k}\left(\frac{\partial(-x)}{\partial x} - \frac{\partial(y)}{\partial y}\right)$$
4. Compute the derivatives:
   $$\nabla \times \vec{F} = \hat{k}(-1 - 1) = -2\hat{k}$$
5. **Flow and Mixing Analysis**:
   * Since $\nabla \times \vec{F} = -2\hat{k} \neq 0$, the flow is **rotational** (vortical).
   * **Mixing Impact**: Rotational flow creates shear forces and circular paths. This prevents stagnant laminar layers and significantly enhances fluid mixing efficiency in chemical reactors.

---

# Why This Step Works
* The curl operation determines the angular velocity vector of fluid elements. A non-zero value mathematically proves the presence of rotation.

---

# Formula Used
* Curl: $\nabla \times \vec{F} = \left(\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z}\right)\hat{i} + \left(\frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x}\right)\hat{j} + \left(\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}\right)\hat{k}$

---

# Similar Patterns to Remember
* Rigid body rotation: $\vec{v} = \vec{\omega} \times \vec{r} \implies \nabla \times \vec{v} = 2\vec{\omega}$.
* Irrotational flow: $\vec{F} = x\hat{i} + y\hat{j} \implies \nabla \times \vec{F} = 0$.

---

# Common Mistakes
* Dropping the unit vector $\hat{k}$ (curl must be a vector quantity).
* Getting the sign wrong by subtracting the wrong way: $\frac{\partial P}{\partial y} - \frac{\partial Q}{\partial x} = 1 - (-1) = 2\hat{k}$ (incorrect order).

---

# Final Answer
$$\boxed{\nabla \times \vec{F} = -2\hat{k}, \quad \text{Flow is rotational, which increases mixing efficiency.}}$$

---

# 10-Second Revision Notes
✓ Field: $\vec{F} = [y, -x, 0]$.
✓ Curl component along z: $\partial_x(-x) - \partial_y(y) = -1 - 1 = -2$.
✓ Vector result: $-2\hat{k}$.
✓ Non-zero curl $\implies$ Rotational.

---

# Memory Trick
"A field of form $(y, -x)$ swirls clockwise around the drain ($-z$ direction)."

---

# Exam Confidence Booster
Memorize the curl of the vortex field $(y, -x)$ as $-2\hat{k}$. It appears frequently in exam questions and can be answered instantly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q46', 46),
  ('e1000000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000001', 'In an electric vehicle battery system, temperature distribution is modeled by

$$
T(x,y,z)=x^2+y^2+z^2
$$
**Compute the gradient and evaluate the direction of maximum temperature rise at point ($1,1,1$). Interpret its physical significance for thermal management and justify.**', '# Question
In an electric vehicle battery system, temperature distribution is modeled by $T(x,y,z) = x^2 + y^2 + z^2$. Compute the gradient and evaluate the direction of maximum temperature rise at point $(1,1,1)$. Interpret its physical significance for thermal management and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Gradient of a Scalar Field
* **Why Applicable**: The gradient vector $\nabla T$ points in the direction of the greatest rate of increase of a scalar field, and its magnitude represents that maximum rate of increase.

---

# Pattern Recognition Trick
* Scalar function: $T = x^2 + y^2 + z^2$ (concentric spheres of temperature).
* Gradient: $\nabla T = 2x\hat{i} + 2y\hat{j} + 2z\hat{k}$.
* At $(1,1,1)$: $\nabla T = 2\hat{i} + 2\hat{j} + 2\hat{k}$.
* Direction is the normalized gradient vector: $\frac{1}{\sqrt{3}}(\hat{i} + \hat{j} + \hat{k})$.

---

# Shortcut / Exam Trick
For symmetric function $f = r^2 = x^2+y^2+z^2$, the gradient is always:
$$\nabla (r^2) = 2\vec{r}$$
At point $(1,1,1)$, $\vec{r} = \hat{i} + \hat{j} + \hat{k}$, so $\nabla T = 2(\hat{i} + \hat{j} + \hat{k})$.
The unit direction is simply the normalized coordinate vector!

---

# Step-by-Step Solution
1. Find the partial derivatives of $T(x,y,z) = x^2 + y^2 + z^2$:
   $$\frac{\partial T}{\partial x} = 2x, \quad \frac{\partial T}{\partial y} = 2y, \quad \frac{\partial T}{\partial z} = 2z$$
2. Construct the gradient vector $\nabla T$:
   $$\nabla T = 2x\hat{i} + 2y\hat{j} + 2z\hat{k}$$
3. Evaluate the gradient at the point $(1,1,1)$:
   $$\nabla T(1,1,1) = 2\hat{i} + 2\hat{j} + 2\hat{k}$$
4. Determine the direction of maximum temperature rise (normalize the gradient):
   $$|\nabla T| = \sqrt{2^2 + 2^2 + 2^2} = \sqrt{12} = 2\sqrt{3}$$
   $$\text{Direction } \hat{u} = \frac{\nabla T}{|\nabla T|} = \frac{2\hat{i} + 2\hat{j} + 2\hat{k}}{2\sqrt{3}} = \frac{\hat{i} + \hat{j} + \hat{k}}{\sqrt{3}}$$
5. **Physical Interpretation for Thermal Management**:
   * Heat naturally flows from hot to cold (Fourier''s Law: $\vec{q} = -k\nabla T$).
   * Therefore, heat flows in the direction of the negative gradient: $-(\hat{i} + \hat{j} + \hat{k})$.
   * To maximize cooling, the battery pack''s cooling channels or heat sinks must be aligned opposite to the temperature gradient (directing heat outward from the hot core $(1,1,1)$).

---

# Why This Step Works
* The gradient points directly outward from the origin because $T=r^2$ is spherically symmetric. Normalizing the gradient gives the exact direction vector.

---

# Formula Used
* Gradient: $\nabla T = \frac{\partial T}{\partial x}\hat{i} + \frac{\partial T}{\partial y}\hat{j} + \frac{\partial T}{\partial z}\hat{k}$
* Unit direction vector: $\hat{u} = \frac{\vec{v}}{|\vec{v}|}$

---

# Similar Patterns to Remember
* Gradient of electrostatic potential giving electric field: $\vec{E} = -\nabla V$.
* Fluid flowing down a pressure gradient.

---

# Common Mistakes
* Leaving the gradient as a scalar value (e.g., adding components: $2x+2y+2z$).
* Stating that heat flows in the direction of the positive gradient.

---

# Final Answer
$$\boxed{\nabla T = 2\hat{i} + 2\hat{j} + 2\hat{k}, \quad \text{Direction} = \frac{\hat{i} + \hat{j} + \hat{k}}{\sqrt{3}}, \quad \text{Heat flows along } -\frac{\hat{i} + \hat{j} + \hat{k}}{\sqrt{3}}}$$

---

# 10-Second Revision Notes
✓ Gradient of $x^2+y^2+z^2$ is $2[x,y,z]$.
✓ At $(1,1,1)$, $\nabla T = 2[1,1,1]$.
✓ Direction is normalized: $[1,1,1]/\sqrt{3}$.
✓ Cooling must follow the opposite direction (negative gradient).

---

# Memory Trick
"The gradient points to the summit (max rise); heat runs away from the summit (negative gradient)."

---

# Exam Confidence Booster
For radial functions like $r^2$, the gradient direction is always the unit radial vector $\hat{r}$. Solve conceptually in 5 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q47', 47),
  ('e1000000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000001', 'In an electromagnetic system, field

$$
\vec F=2x\hat i+3y\hat j+4z\hat k
$$
**Compute curl and evaluate whether the field is conservative. Justify.**', '# Question
In an electromagnetic system, field $\vec F = 2x\hat i + 3y\hat j + 4z\hat k$. Compute curl and evaluate whether the field is conservative. Justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Conservative Vector Fields / Curl
* **Why Applicable**: A vector field is conservative if and only if its curl is zero everywhere ($\nabla \times \vec{F} = 0$). This indicates that path integrals of the field are path-independent.

---

# Pattern Recognition Trick
Identify components:
* $F_x = 2x$ (only dependent on $x$)
* $F_y = 3y$ (only dependent on $y$)
* $F_z = 4z$ (only dependent on $z$)
* Since there are no cross-variable dependencies (e.g. no $y$ in $F_x$), all off-diagonal derivatives in the curl determinant will be $0$.
* Therefore, Curl $= 0$.

---

# Shortcut / Exam Trick
Any decoupled vector field of the form $\vec{F} = f(x)\hat{i} + g(y)\hat{j} + h(z)\hat{k}$ has a curl of exactly $0$ and is always conservative.
Here, components are $2x$, $3y$, $4z \implies$ Decoupled $\implies$ Conservative!

---

# Step-by-Step Solution
1. Identify components of $\vec{F}$:
   $$F_x = 2x, \quad F_y = 3y, \quad F_z = 4z$$
2. Set up the curl determinant:
   $$\nabla \times \vec{F} = \left| \begin{matrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ 2x & 3y & 4z \end{matrix} \right|$$
3. Expand components:
   * $\hat{i}$ component: $\frac{\partial(4z)}{\partial y} - \frac{\partial(3y)}{\partial z} = 0 - 0 = 0$
   * $\hat{j}$ component: $\frac{\partial(2x)}{\partial z} - \frac{\partial(4z)}{\partial x} = 0 - 0 = 0$
   * $\hat{k}$ component: $\frac{\partial(3y)}{\partial x} - \frac{\partial(2x)}{\partial y} = 0 - 0 = 0$
4. Combine terms:
   $$\nabla \times \vec{F} = 0\hat{i} + 0\hat{j} + 0\hat{k} = \vec{0}$$
5. **Justify conservativeness**:
   Since the curl is the zero vector, the field is irrotational. In a simply connected domain, an irrotational field is a **conservative vector field**.

---

# Why This Step Works
* Zero curl implies that the line integral around any closed loop is zero ($\oint \vec{F} \cdot d\vec{r} = 0$), which is the definition of a conservative field.

---

# Formula Used
* Curl: $\nabla \times \vec{F} = \vec{0} \implies$ Conservative field.

---

# Similar Patterns to Remember
* Gravitational field: $\vec{g} = -\nabla V \implies \nabla \times \vec{g} = 0$.
* Electrostatic field: $\nabla \times \vec{E} = 0$.

---

# Common Mistakes
* Writing the scalar 0 instead of the zero vector $\vec{0}$ (curl output must be a vector).
* Confusing divergence and curl (using dot product instead of cross product).

---

# Final Answer
$$\boxed{\nabla \times \vec{F} = \vec{0}, \quad \text{The field is conservative.}}$$

---

# 10-Second Revision Notes
✓ Components are decoupled: $F_x(x)$, $F_y(y)$, $F_z(z)$.
✓ No cross-variable terms.
✓ Curl is immediately $\vec{0}$.
✓ Therefore, field is conservative.

---

# Memory Trick
"If variables don''t mix between components, there is no twist (curl is zero)."

---

# Exam Confidence Booster
Recognizing decoupled components lets you bypass the entire determinant expansion and state that the field is conservative in 5 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-I Q48', 48),
  ('e1000000-0000-0000-0000-000000000049', 'a1000000-0000-0000-0000-000000000001', 'A robot follows path $r$t$=t\hat{i}+t^2\hat{j}$.

**Determine velocity vector and interpret motion.**', '# Question
A robot follows path $\vec r(t) = t\hat i + t^2\hat j$. Determine velocity vector and interpret motion.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Velocity Vector
* **Why Applicable**: The velocity vector is the first derivative of the position vector with respect to time: $\vec{v}(t) = \frac{d\vec{r}}{dt}$.

---

# Pattern Recognition Trick
* Position: $\vec{r}(t) = t\hat{i} + t^2\hat{j}$
* Differentiate once:
  $$\vec{v}(t) = \hat{i} + 2t\hat{j}$$
* Horizontal speed is constant (1), vertical speed grows linearly with time ($2t$).

---

# Shortcut / Exam Trick
For $\vec{r}(t) = t^a\hat{i} + t^b\hat{j}$, velocity is always:
$$\vec{v}(t) = a t^{a-1}\hat{i} + b t^{b-1}\hat{j}$$
Here $a=1, b=2 \implies \vec{v}(t) = \hat{i} + 2t\hat{j}$.

---

# Step-by-Step Solution
1. Write the position vector:
   $$\vec{r}(t) = t\hat{i} + t^2\hat{j}$$
2. Differentiate each component with respect to time $t$:
   $$\vec{v}(t) = \frac{d\vec{r}}{dt} = \frac{d}{dt}(t)\hat{i} + \frac{d}{dt}(t^2)\hat{j}$$
3. Compute the derivatives:
   $$\vec{v}(t) = \hat{i} + 2t\hat{j}$$
4. **Motion Interpretation**:
   * The robot travels with a constant speed of 1 unit/s along the x-axis.
   * The robot accelerates along the y-axis, with its vertical speed increasing linearly as $2t$.
   * The path is a parabola ($y = x^2$).

---

# Why This Step Works
* The derivative of position represents the instantaneous rate of change of coordinates, which forms the velocity vector.

---

# Formula Used
* Velocity: $\vec{v}(t) = \frac{d\vec{r}}{dt}$

---

# Similar Patterns to Remember
* Projectile motion trajectory analysis.
* Drones tracking parabolic flight paths.

---

# Common Mistakes
* Leaving the unit vectors out: writing $\vec{v}(t) = 1 + 2t$ (velocity must be a vector).
* Integrating instead of differentiating.

---

# Final Answer
$$\boxed{\vec{v}(t) = \hat{i} + 2t\hat{j}, \quad \text{Motion is parabolic with constant horizontal speed and linear vertical acceleration.}}$$

---

# 10-Second Revision Notes
✓ Differentiate position components: $t \to 1$ and $t^2 \to 2t$.
✓ Velocity $\vec{v}(t) = \hat{i} + 2t\hat{j}$.
✓ Path shape is parabolic.

---

# Memory Trick
"Velocity is the first step of change from position."

---

# Exam Confidence Booster
Simple polynomial derivatives make this question solvable in under 5 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q1', 49),
  ('e1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000001', '**Differentiate scalar and vector line integrals.**', '# Question
Differentiate scalar and vector line integrals.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals
* **Why Applicable**: Line integrals can be performed on either scalar fields or vector fields. The differential element and physical meaning differ between the two.

---

# Pattern Recognition Trick
* Scalar Line Integral: $\int_C f \, ds$ (integrates a number field over a path length).
* Vector Line Integral: $\int_C \vec{F} \cdot d\vec{r}$ (integrates the projection of a force along the direction of the path).

---

# Shortcut / Exam Trick
* Scalar: Integrand is a scalar $f$, differential is scalar arc length $ds$. Result is scalar (e.g., mass of a wire).
* Vector: Integrand is a vector $\vec{F}$, differential is vector displacement $d\vec{r}$. Result is scalar (e.g., work done).

---

# Step-by-Step Solution
1. **Scalar Line Integral**:
   * Formulation: $\int_C f(x,y,z) \, ds$
   * Here, $ds = |\vec{r}''(t)| \, dt$ is the scalar arc length element.
   * Physical Meaning: Represents the accumulation of a scalar quantity along a curve (e.g., finding the total mass of a thin wire with variable density $f$).
2. **Vector Line Integral**:
   * Formulation: $\int_C \vec{F} \cdot d\vec{r} = \int_C \vec{F} \cdot \hat{T} \, ds$
   * Here, $d\vec{r} = \vec{r}''(t) \, dt$ is the vector displacement element.
   * Physical Meaning: Represents the projection of the vector field $\vec{F}$ along the path direction (e.g., calculating the work done by a force field on a particle moving along curve $C$).
3. Compare the outputs: Both return scalar values, but the integrand for vector integration is a dot product.

---

# Why This Step Works
* Distinguishing between scalar arc length elements ($ds$) and vector displacement elements ($d\vec{r}$) defines how we parameterize and evaluate the path.

---

# Formula Used
* Scalar: $\int_C f \, ds = \int_a^b f(\vec{r}(t)) |\vec{r}''(t)| \, dt$
* Vector: $\int_C \vec{F} \cdot d\vec{r} = \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}''(t) \, dt$

---

# Similar Patterns to Remember
* Scalar surface integrals (area/mass) vs. Vector surface integrals (flux).

---

# Common Mistakes
* Forgetting the dot product in the vector line integral, treating it as a simple multiplication.
* Omitting the speed factor $|\vec{r}''(t)|$ when converting $ds$ to $dt$ in scalar line integrals.

---

# Final Answer
$$\boxed{\text{Scalar Line Integral } \int_C f \, ds \text{ integrates a scalar field over arc length; Vector Line Integral } \int_C \vec{F} \cdot d\vec{r} \text{ projects and integrates a vector field.}}$$

---

# 10-Second Revision Notes
✓ Scalar: $\int f \, ds$, uses speed $|\vec{r}''(t)|$, measures mass/length.
✓ Vector: $\int \vec{F} \cdot d\vec{r}$, uses velocity dot product, measures work/circulation.

---

# Memory Trick
"Scalar sums along the path length ($ds$); vector projects along the path direction ($d\vec{r}$)."

---

# Exam Confidence Booster
Understanding the differential elements ($ds$ vs $d\vec{r}$) allows you to set up integration variables correctly in exams without hesitation.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q2', 50),
  ('e1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000001', 'In a heat flow system,

$$
\vec F=(x+y)\hat i+(x-y)\hat j
$$
**Analyze the integrand in Green''s theorem.**', '# Question
In a heat flow system, $\vec F = (x+y)\hat i + (x-y)\hat j$. Analyze the integrand in Green''s theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Green''s Theorem in a Plane
* **Why Applicable**: Green''s theorem relates a line integral around a closed curve to a double integral over the enclosed region: $\oint_C P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$.

---

# Pattern Recognition Trick
Identify:
* $P = x + y$
* $Q = x - y$
* Integrand: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$
* Compute derivatives: $\partial_x(x-y) = 1$, $\partial_y(x+y) = 1$.
* Difference: $1 - 1 = 0$.

---

# Shortcut / Exam Trick
If $P = x + y$ and $Q = x - y$:
* Since the cross-derivatives are equal ($\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y} = 1$), the integrand is zero.
* This means the line integral around any closed loop in this field is exactly $0$.

---

# Step-by-Step Solution
1. Identify the components from the vector field $\vec{F} = P\hat{i} + Q\hat{j}$:
   $$P(x,y) = x + y$$
   $$Q(x,y) = x - y$$
2. State the integrand of the double integral in Green''s Theorem:
   $$\text{Integrand} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$$
3. Calculate the partial derivatives:
   $$\frac{\partial Q}{\partial x} = \frac{\partial(x-y)}{\partial x} = 1$$
   $$\frac{\partial P}{\partial y} = \frac{\partial(x+y)}{\partial y} = 1$$
4. Subtract the partial derivatives:
   $$\text{Integrand} = 1 - 1 = 0$$
5. **Analyze the result**:
   An integrand of 0 means the double integral over any region $D$ is zero, indicating that the flow of heat is conservative in this region.

---

# Why This Step Works
* Evaluating the difference between cross-derivatives checks the local rotational density. A difference of zero indicates an irrotational field.

---

# Formula Used
* Green''s Theorem Integrand: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$

---

# Similar Patterns to Remember
* $\vec{F} = y\hat{i} + x\hat{j} \implies \text{Integrand} = 1 - 1 = 0$ (Conservative).
* $\vec{F} = -y\hat{i} + x\hat{j} \implies \text{Integrand} = 1 - (-1) = 2$.

---

# Common Mistakes
* Subtracting in the wrong order: calculating $\frac{\partial P}{\partial y} - \frac{\partial Q}{\partial x}$.
* Forgetting to take the partial derivatives and instead just subtracting the functions directly.

---

# Final Answer
$$\boxed{\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 0}$$

---

# 10-Second Revision Notes
✓ $P = x+y \implies \partial_y P = 1$.
✓ $Q = x-y \implies \partial_x Q = 1$.
✓ Integrand $= 1 - 1 = 0$.
✓ Line integral around any closed loop is $0$.

---

# Memory Trick
"If cross-rates are equal, the field is stable and loop work is zero."

---

# Exam Confidence Booster
Spotting symmetric coefficients (both cross derivatives equal to 1) lets you declare the double integral integrand as 0 instantly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q3', 51),
  ('e1000000-0000-0000-0000-000000000052', 'a1000000-0000-0000-0000-000000000001', 'In a circulation model, what does a positive value of

$$
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
$$
indicate?', '# Question
In a circulation model, what does a positive value of $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ indicate?

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Circulation and Curl (Green''s Theorem)
* **Why Applicable**: The term $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ represents the z-component of curl in 2D space, which measures local rotation density.

---

# Pattern Recognition Trick
* Value $> 0 \implies$ Positive rotation.
* In mathematics, positive rotation is defined as counterclockwise (CCW).
* Therefore, a positive value indicates counterclockwise circulation density.

---

# Shortcut / Exam Trick
* $\text{Curl}_z > 0 \implies$ Counterclockwise (CCW) rotation.
* $\text{Curl}_z < 0 \implies$ Clockwise (CW) rotation.
* $\text{Curl}_z = 0 \implies$ Irrotational (no net spin).

---

# Step-by-Step Solution
1. Identify the mathematical term:
   $$\text{Circulation Density} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$$
2. Connect to Green''s Theorem:
   This term is the integrand of the double integral representing net circulation:
   $$\oint_C P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$$
3. Interpret a positive value:
   * A positive result means that the micro-rotations of the fluid within the region are counterclockwise.
   * If you place a tiny paddle wheel in this fluid field, it will spin in a counterclockwise direction.
4. **Physical Application**: Used in meteorology to identify low-pressure systems (cyclonic rotation is counterclockwise in the Northern Hemisphere).

---

# Why This Step Works
* Defining rotation relative to the positive z-axis establishes the counterclockwise direction as positive via the Right-Hand Rule.

---

# Formula Used
* 2D Curl: $\text{curl}_z \vec{F} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$

---

# Similar Patterns to Remember
* CCW circulation in fluid vortices.
* Positive magnetic fields generated by CCW currents (Ampere''s Law).

---

# Common Mistakes
* Interpreting positive as clockwise rotation (clockwise is negative in standard polar coordinates).
* Thinking it represents linear flow velocity rather than rotational speed.

---

# Final Answer
$$\boxed{\text{A positive value indicates counterclockwise (CCW) circulation density (vorticity).}}$$

---

# 10-Second Revision Notes
✓ $\partial_x Q - \partial_y P$ is circulation density.
✓ Positive sign ($> 0$) $\implies$ Counterclockwise rotation.
✓ Right-Hand Rule standard.

---

# Memory Trick
"Counter-clockwise is positive in math, just like on the unit circle."

---

# Exam Confidence Booster
Remember that standard angles grow CCW (+) and decay CW (-). This maps directly to vector curl signs!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q4', 52),
  ('e1000000-0000-0000-0000-000000000053', 'a1000000-0000-0000-0000-000000000001', 'A force field acts on a particle moving along a curve.

**Analyze and interpret the physical meaning of the line integral.**', '# Question
A force field acts on a particle moving along a curve. Analyze and interpret the physical meaning of the line integral.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals of Vector Fields
* **Why Applicable**: The integral of a force vector field $\vec{F}$ along a directed curve $C$ is formulated as $\int_C \vec{F} \cdot d\vec{r}$.

---

# Pattern Recognition Trick
Identify components:
* Field: $\vec{F}$ (Force)
* Path: $C$
* Integral: $\int_C \vec{F} \cdot d\vec{r}$
* This matches the physical definition of **Work Done**.

---

# Shortcut / Exam Trick
* If $\vec{F}$ is perpendicular to path displacement everywhere $\implies$ Work Done $= 0$.
* If $\vec{F}$ is in the direction of path displacement everywhere $\implies$ Work Done is positive.
* If $\vec{F}$ is conservative and path is closed $\implies$ Work Done $= 0$.

---

# Step-by-Step Solution
1. Write the vector line integral formula:
   $$W = \int_C \vec{F} \cdot d\vec{r}$$
2. Expand the dot product using the unit tangent vector $\hat{T}$:
   $$W = \int_C (\vec{F} \cdot \hat{T}) \, ds$$
   Here, $\vec{F} \cdot \hat{T}$ is the tangential component of the force along the path.
3. Interpret the physical terms:
   * $d\vec{r}$ represents a tiny displacement vector along the curve.
   * $\vec{F} \cdot d\vec{r}$ represents the work done by the field during this tiny displacement.
   * The integral sums these small work elements over the entire path $C$.
4. **Conclusion**:
   The line integral represents the **total work done** by the force field on the particle as it moves along path $C$.

---

# Why This Step Works
* Multiplying the force component in the direction of motion by the displacement distance yields the mechanical work performed by the field.

---

# Formula Used
* Work Formula: $W = \int_C \vec{F} \cdot d\vec{r}$

---

# Similar Patterns to Remember
* Voltage drop along a wire (line integral of electric field).
* Fluid circulation along a boundary.

---

# Common Mistakes
* Calling the result a vector quantity (work is a scalar).
* Integrating the magnitude of force directly without taking the dot product with the path direction.

---

# Final Answer
$$\boxed{\text{The line integral } \int_C \vec{F} \cdot d\vec{r} \text{ represents the total work done by the force field on the particle along the curve.}}$$

---

# 10-Second Revision Notes
✓ Integral: $\int \vec{F} \cdot d\vec{r}$.
✓ Force $\cdot$ Displacement $=$ Work.
✓ Result is a scalar quantity.
✓ Path dependent unless field is conservative.

---

# Memory Trick
"Force along a path does Work."

---

# Exam Confidence Booster
Recognizing this as the work integral helps you solve physical word problems by setting up a standard vector line integral directly.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q5', 53),
  ('e1000000-0000-0000-0000-000000000054', 'a1000000-0000-0000-0000-000000000001', '**Define path independence in engineering systems.**', '# Question
Define path independence in engineering systems.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Conservative Fields & Path Independence
* **Why Applicable**: In many physical systems, the energy required to move between two states should not depend on how the system transitions, only on the start and endpoints.

---

# Pattern Recognition Trick
* Path Independence $\implies \int_{C_1} \vec{F} \cdot d\vec{r} = \int_{C_2} \vec{F} \cdot d\vec{r}$ for any two curves $C_1, C_2$ connecting point A to point B.
* Equivalent condition: Curl $\nabla \times \vec{F} = 0$ (field is conservative).

---

# Shortcut / Exam Trick
A line integral is path independent if the integrand $\vec{F} \cdot d\vec{r} = P\,dx + Q\,dy + R\,dz$ is an exact differential:
$$P\,dx + Q\,dy + R\,dz = d\phi$$
where $\phi$ is the potential function.
If this holds:
$$\int_A^B \vec{F} \cdot d\vec{r} = \phi(B) - \phi(A)$$

---

# Step-by-Step Solution
1. Define Path Independence:
   A line integral of a vector field $\vec{F}$ is independent of path if the value of the integral is the same for all paths connecting the same start point $A$ and end point $B$.
2. State the mathematical conditions:
   Path independence is equivalent to:
   * The vector field $\vec{F}$ is conservative ($\vec{F} = \nabla \phi$ for a scalar potential $\phi$).
   * The curl of the field is zero: $\nabla \times \vec{F} = \vec{0}$.
   * The line integral around any closed loop is zero: $\oint_C \vec{F} \cdot d\vec{r} = 0$.
3. **Engineering Relevance**:
   * **Thermodynamics**: State functions (like internal energy, enthalpy, entropy) are path independent.
   * **Power Systems**: Gravity and electrostatic fields are conservative, meaning energy loss/gain is independent of the route taken.

---

# Why This Step Works
* Linking path independence to exact differentials allows calculations to bypass path parameterization entirely by using the potential function difference.

---

# Formula Used
* Fundamental Theorem of Line Integrals: $\int_A^B \nabla \phi \cdot d\vec{r} = \phi(B) - \phi(A)$

---

# Similar Patterns to Remember
* Conservative force fields (gravity, ideal springs).
* Non-conservative fields (friction, drag - path dependent!).

---

# Common Mistakes
* Assuming all vector fields are path independent.
* Confusing path independence with divergence-free (solenoidal) behavior.

---

# Final Answer
$$\boxed{\text{Path independence means } \int_A^B \vec{F} \cdot d\vec{r} \text{ depends only on endpoints } A \text{ and } B, \text{ requiring } \vec{F} = \nabla \phi.}}$$

---

# 10-Second Revision Notes
✓ Path independent $\implies \nabla \times \vec{F} = \vec{0}$.
✓ Integration formula: $\phi(B) - \phi(A)$.
✓ Closed loop value: $\oint \vec{F} \cdot d\vec{r} = 0$.
✓ Applies to conservative fields.

---

# Memory Trick
"Only the start and finish matter when you are conservative."

---

# Exam Confidence Booster
If you verify $\text{curl } \vec{F} = 0$, you can integrate using the potential difference, saving minutes of path integration!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q6', 54),
  ('e1000000-0000-0000-0000-000000000055', 'a1000000-0000-0000-0000-000000000001', 'In a fluid flow model,

$$
\vec F=y\hat i+x\hat j
$$
**Use Green''s theorem to compute**

$$
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
$$
**and interpret its meaning.**', '# Question
In a fluid flow model, $\vec F = y\hat i + x\hat j$. Use Green''s theorem to compute $\frac{Q}{\partial x} - \frac{P}{\partial y}$ and interpret its meaning.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Green''s Theorem / Vorticity
* **Why Applicable**: We are asked to evaluate the difference of cross-derivatives $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ (integrand of Green''s theorem) for a 2D velocity field.

---

# Pattern Recognition Trick
Identify:
* $P = y$
* $Q = x$
* Cross derivatives: $\partial_x Q = 1$, $\partial_y P = 1$.
* Difference: $1 - 1 = 0$.

---

# Shortcut / Exam Trick
For $\vec{F} = y\hat{i} + x\hat{j}$:
* The field is of the form $\nabla(xy)$.
* Since it is a gradient of a scalar function, it is conservative.
* The curl (and thus $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$) of any gradient field is always $0$.

---

# Step-by-Step Solution
1. Identify the component functions from $\vec{F} = P\hat{i} + Q\hat{j}$:
   $$P(x,y) = y, \quad Q(x,y) = x$$
2. Write the cross-derivative expression:
   $$\text{Integrand} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$$
3. Compute the derivatives:
   $$\frac{\partial Q}{\partial x} = \frac{\partial(x)}{\partial x} = 1$$
   $$\frac{\partial P}{\partial y} = \frac{\partial(y)}{\partial y} = 1$$
4. Subtract to find the value:
   $$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1 - 1 = 0$$
5. **Physical Interpretation**:
   A value of 0 means the flow is **irrotational** (vorticity is zero). There are no local circular currents or vortices in this fluid field, and the circulation around any closed loop is zero.

---

# Why This Step Works
* Evaluating the difference of cross-derivatives isolates the rotational spin component of the fluid flow, verifying stability.

---

# Formula Used
* 2D Curl: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 0$

---

# Similar Patterns to Remember
* Electrostatic fields (which are always irrotational).
* Irrotational water flow in a straight channel.

---

# Common Mistakes
* Calculating the derivatives with respect to the wrong variables (e.g. $\partial_x P = 0$).
* Confusing the result with the divergence ($\nabla \cdot \vec{F} = 0 + 0 = 0$).

---

# Final Answer
$$\boxed{\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 0, \quad \text{Meaning: Flow is irrotational.}}$$

---

# 10-Second Revision Notes
✓ $P = y \implies \partial_y P = 1$.
✓ $Q = x \implies \partial_x Q = 1$.
✓ Difference $= 1 - 1 = 0$.
✓ Flow is irrotational (zero vorticity).

---

# Memory Trick
"Equal cross-rates mean no spin."

---

# Exam Confidence Booster
Recognizing $\vec{F} = y\hat{i} + x\hat{j}$ as the gradient of $xy$ gives you the answer 0 instantly without any derivative calculations!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q7', 55),
  ('e1000000-0000-0000-0000-000000000056', 'a1000000-0000-0000-0000-000000000001', 'In a fluid flow system,

$$
\vec F=(x+y)\hat i+(2x-y)\hat j
$$
**Compute**

$$
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
$$', '# Question
In a fluid flow system, $\vec F = (x+y)\hat i + (2x-y)\hat j$. Compute $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: 2D Curl / Green''s Theorem Integrand
* **Why Applicable**: The question requires computing the local circulation density component $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ for a 2D velocity vector field.

---

# Pattern Recognition Trick
Identify:
* $P = x + y \implies \frac{\partial P}{\partial y} = 1$
* $Q = 2x - y \implies \frac{\partial Q}{\partial x} = 2$
* Difference: $2 - 1 = 1$.

---

# Shortcut / Exam Trick
For $\vec{F} = (ax+by)\hat{i} + (cx+dy)\hat{j}$, the curl is always:
$$\text{Curl}_z = c - b$$
Here $c=2, b=1 \implies \text{Curl}_z = 2 - 1 = 1$.

---

# Step-by-Step Solution
1. Identify the components of the field $\vec{F}$:
   $$P(x,y) = x + y$$
   $$Q(x,y) = 2x - y$$
2. Set up the partial derivatives:
   $$\frac{\partial Q}{\partial x} = \frac{\partial(2x-y)}{\partial x}$$
   $$\frac{\partial P}{\partial y} = \frac{\partial(x+y)}{\partial y}$$
3. Compute the derivatives:
   $$\frac{\partial Q}{\partial x} = 2$$
   $$\frac{\partial P}{\partial y} = 1$$
4. Calculate the difference:
   $$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 2 - 1 = 1$$

---

# Why This Step Works
* Performing partial derivatives isolates the spatial rates of change along the perpendicular coordinates, indicating the shear force.

---

# Formula Used
* 2D Curl: $\text{curl}_z \vec{F} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$

---

# Similar Patterns to Remember
* $\vec{F} = 3y\hat{i} + 5x\hat{j} \implies \text{Curl}_z = 5 - 3 = 2$
* $\vec{F} = -2y\hat{i} + 3x\hat{j} \implies \text{Curl}_z = 3 - (-2) = 5$

---

# Common Mistakes
* Subtracting the other way around: $1 - 2 = -1$.
* Including the variables $x$ or $y$ in the derivatives (e.g. writing $\partial_x Q = 2x$).

---

# Final Answer
$$\boxed{\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1}$$

---

# 10-Second Revision Notes
✓ $P = x+y \implies \partial_y P = 1$.
✓ $Q = 2x-y \implies \partial_x Q = 2$.
✓ Difference $= 2 - 1 = 1$.
✓ Flow has a constant positive rotation density of 1.

---

# Memory Trick
"Subtract the $y$-derivative of the first term from the $x$-derivative of the second term."

---

# Exam Confidence Booster
The coefficients method ($c-b$) works for all linear vector fields and takes only 2 seconds in exams!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q8', 56),
  ('e1000000-0000-0000-0000-000000000057', 'a1000000-0000-0000-0000-000000000001', 'Evaluate

$$
\iint_S \vec F\cdot \hat n , ds
$$
for the heat flux field

$$
\vec F=x^2\hat i+yz\hat j+z^2\hat k
$$
where $\hat n=\hat j$ and the surface is

$$
y=1,\quad 0\le x\le2,\quad 0\le z\le1.
$$', '# Question
Evaluate $\iint_S \vec F \cdot \hat n \, ds$ for the heat flux field $\vec F = x^2\hat i + yz\hat j + z^2\hat k$ where $\hat n = \hat j$ and the surface is $y = 1, 0 \le x \le 2, 0 \le z \le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are computing the flux of a vector field through a flat surface parallel to the xz-plane. The normal vector $\hat{n}$ is constant and given.

---

# Pattern Recognition Trick
Identify:
* Normal $\hat{n} = \hat{j}$.
* Dot product $\vec{F} \cdot \hat{n} = F_y = yz$.
* On the surface, $y = 1 \implies \vec{F} \cdot \hat{n} = z$.
* Double integral limits: $x$ from $0$ to $2$, $z$ from $0$ to $1$.

---

# Shortcut / Exam Trick
Since the integrand $yz$ becomes independent of $x$ on $y=1$:
$$\iint_S z \, dx \, dz = \left(\int_0^2 dx\right) \left(\int_0^1 z \, dz\right) = 2 \times \left[\frac{z^2}{2}\right]_0^1 = 2 \times \frac{1}{2} = 1$$
Decoupling independent variables simplifies integration instantly.

---

# Step-by-Step Solution
1. Write the flux integrand:
   $$\vec{F} \cdot \hat{n} = (x^2\hat{i} + yz\hat{j} + z^2\hat{k}) \cdot \hat{j} = yz$$
2. Substitute the surface boundary condition $y = 1$:
   $$\vec{F} \cdot \hat{n}\Big|_{y=1} = (1)z = z$$
3. Write the double integral over the flat rectangular surface $S$:
   $$\iint_S \vec{F} \cdot \hat{n} \, ds = \int_0^1 \int_0^2 z \, dx \, dz$$
4. Integrate with respect to $x$:
   $$\int_0^2 z \, dx = z [x]_0^2 = 2z$$
5. Integrate with respect to $z$:
   $$\int_0^1 2z \, dz = \left[z^2\right]_0^1 = 1^2 - 0^2 = 1$$

---

# Why This Step Works
* Projects the 3D vector field onto the normal direction of the surface, converting the vector flux problem into a simple 2D scalar area integral.

---

# Formula Used
* Flux Integral: $\iint_S \vec{F} \cdot \hat{n} \, ds$

---

# Similar Patterns to Remember
* Fluid flux through a flat membrane.
* Electric flux through a plate.

---

# Common Mistakes
* Integrating the entire vector field without performing the dot product with $\hat{n} = \hat{j}$.
* Forgetting to substitute the surface constraint $y=1$ before integrating, leaving $y$ in the integral.

---

# Final Answer
$$\boxed{\iint_S \vec{F} \cdot \hat{n} \, ds = 1}$$

---

# 10-Second Revision Notes
✓ $\vec{F} \cdot \hat{j} = yz$.
✓ On $y=1$, integrand $= z$.
✓ Limits: $x \in [0,2], z \in [0,1]$.
✓ Integral: $\int_0^1 z dz \times \int_0^2 dx = 0.5 \times 2 = 1$.

---

# Memory Trick
"Project the vector field onto the flat plate direction first, then integrate over the plate dimensions."

---

# Exam Confidence Booster
By separating the integrals for $x$ and $z$ components, you can compute this in under 15 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q9', 57),
  ('e1000000-0000-0000-0000-000000000058', 'a1000000-0000-0000-0000-000000000001', 'In an electromagnetic field, the vector field is

$$
\vec F=z\hat i+x\hat j+y\hat k.
$$
**Determine the circulation around the boundary of the region in the yz-plane $$x=0$$ bounded by $0\le y\le1,;0\le z\le1$ using Stokes'' theorem.**', '# Question
In an electromagnetic field, the vector field is $\vec F = z\hat i + x\hat j + y\hat k$. Determine the circulation around the boundary of the region in the $yz$-plane ($x=0$) bounded by $0 \le y \le 1, 0 \le z \le 1$ using Stokes'' theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Stokes'' Theorem
* **Why Applicable**: Stokes'' theorem relates the line integral (circulation) around a closed curve to the surface integral of the curl over an enclosed surface: $\oint_C \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \hat{n} \, ds$.

---

# Pattern Recognition Trick
Identify:
* Path boundary lies in the $yz$-plane ($x=0$) $\implies$ Normal vector $\hat{n} = \hat{i}$.
* Enclosed region: unit square in the $yz$-plane.
* Compute curl component along the x-axis: $(\nabla \times \vec{F})_x$.
* Dot product: $(\nabla \times \vec{F}) \cdot \hat{n} = (\nabla \times \vec{F})_x$.

---

# Shortcut / Exam Trick
* $\text{Curl } \vec{F} = \hat{i}(\partial_y y - \partial_z x) + \dots = 1\hat{i} + \dots$
* Normal $\hat{n} = \hat{i}$ (positive x-direction for positive boundary orientation).
* $(\nabla \times \vec{F}) \cdot \hat{n} = 1$.
* Integral is simply $1 \times \text{Area of square} = 1 \times 1 = 1$.

---

# Step-by-Step Solution
1. Find the curl of the vector field $\vec{F} = z\hat{i} + x\hat{j} + y\hat{k}$:
   $$\nabla \times \vec{F} = \left| \begin{matrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ z & x & y \end{matrix} \right|$$
   $$= \hat{i}\left(\frac{\partial y}{\partial y} - \frac{\partial x}{\partial z}\right) - \hat{j}\left(\frac{\partial y}{\partial x} - \frac{\partial z}{\partial z}\right) + \hat{k}\left(\frac{\partial x}{\partial x} - \frac{\partial z}{\partial y}\right)$$
   $$= \hat{i}(1 - 0) - \hat{j}(0 - 1) + \hat{k}(1 - 0) = \hat{i} + \hat{j} + \hat{k}$$
2. Identify the normal vector to the surface in the $yz$-plane ($x=0$):
   $$\hat{n} = \hat{i}$$
3. Compute the dot product:
   $$(\nabla \times \vec{F}) \cdot \hat{n} = (\hat{i} + \hat{j} + \hat{k}) \cdot \hat{i} = 1$$
4. Apply Stokes'' Theorem:
   $$\oint_C \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \hat{n} \, ds = \iint_S 1 \, ds$$
5. Compute the area of the region $S$:
   The surface is a square of dimensions $1 \times 1$ in the $yz$-plane.
   $$\text{Area} = \int_0^1 \int_0^1 dy \, dz = 1$$
   $$\oint_C \vec{F} \cdot d\vec{r} = 1$$

---

# Why This Step Works
* Using Stokes'' theorem converts a 4-segment line integral along the boundary of the square into a single double integral over the flat square area.

---

# Formula Used
* Stokes'' Theorem: $\oint_C \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \hat{n} \, ds$

---

# Similar Patterns to Remember
* Finding circulation in the xy-plane (normal $\hat{n} = \hat{k}$).
* Finding work done around a closed triangular loop in space.

---

# Common Mistakes
* Evaluating the line integral manually over 4 segments (takes too long and is prone to arithmetic errors).
* Choosing the wrong normal vector (e.g. $\hat{n} = \hat{j}$ or $\hat{k}$).

---

# Final Answer
$$\boxed{\text{Circulation} = 1}$$

---

# 10-Second Revision Notes
✓ Curl $\nabla \times \vec{F} = \hat{i} + \hat{j} + \hat{k}$.
✓ Surface is in $yz$-plane $\implies \hat{n} = \hat{i}$.
✓ Curl $\cdot \hat{n} = 1$.
✓ Integral $=$ Area of region $= 1$.

---

# Memory Trick
"When the curl projection is constant, the circulation is just that constant times the area."

---

# Exam Confidence Booster
Since the projection is 1 and the surface is a unit square, the answer is immediately 1. Solve this in 10 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q10', 58),
  ('e1000000-0000-0000-0000-000000000059', 'a1000000-0000-0000-0000-000000000001', 'Evaluate

$$
\iint_S \vec F\cdot \hat n , ds
$$
for the fluid velocity field

$$
\vec F=2xy\hat i+yz\hat j+xz\hat k
$$
where $\hat n=\hat i$ and the surface is

$$
x=2,\quad 0\le y\le1,\quad 0\le z\le2.
$$', '# Question
Evaluate $\iint_S \vec F \cdot \hat n \, ds$ for the fluid velocity field $\vec F = 2xy\hat i + yz\hat j + xz\hat k$ where $\hat n = \hat i$ and the surface is $x = 2, 0 \le y \le 1, 0 \le z \le 2$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are calculating the fluid flux crossing a flat rectangular boundary parallel to the yz-plane, with normal $\hat{n} = \hat{i}$.

---

# Pattern Recognition Trick
* Normal: $\hat{n} = \hat{i}$.
* Integrand: $\vec{F} \cdot \hat{i} = 2xy$.
* On the boundary, $x = 2 \implies \vec{F} \cdot \hat{n} = 4y$.
* Limits: $y \in [0,1]$, $z \in [0,2]$.

---

# Shortcut / Exam Trick
Since the integrand $4y$ is independent of $z$:
$$\iint_S 4y \, dy \, dz = \left(\int_0^2 dz\right) \left(\int_0^1 4y \, dy\right) = 2 \times \left[2y^2\right]_0^1 = 2 \times 2 = 4$$
Quick product decomposition simplifies double integration.

---

# Step-by-Step Solution
1. Compute the dot product $\vec{F} \cdot \hat{n}$:
   $$\vec{F} \cdot \hat{n} = (2xy\hat{i} + yz\hat{j} + xz\hat{k}) \cdot \hat{i} = 2xy$$
2. Substitute the surface constraint $x = 2$:
   $$\vec{F} \cdot \hat{n}\Big|_{x=2} = 2(2)y = 4y$$
3. Write the double integral over the flat rectangular surface $S$:
   $$\iint_S \vec{F} \cdot \hat{n} \, ds = \int_0^2 \int_0^1 4y \, dy \, dz$$
4. Integrate with respect to $y$:
   $$\int_0^1 4y \, dy = \left[2y^2\right]_0^1 = 2$$
5. Integrate the constant result with respect to $z$:
   $$\int_0^2 2 \, dz = [2z]_0^2 = 4$$

---

# Why This Step Works
* The dot product projects the velocity field onto the normal vector, extracting the speed perpendicular to the surface. Integrating this projects the total volumetric flow rate.

---

# Formula Used
* Flux: $\iint_S \vec{F} \cdot \hat{n} \, ds$

---

# Similar Patterns to Remember
* Mass flux of fluid crossing a channel cross-section.
* Solar radiation flux hitting a flat collector panel.

---

# Common Mistakes
* Leaving the variable $x$ in the integrand (failing to substitute the boundary value $x=2$).
* Performing the dot product with the wrong basis vector.

---

# Final Answer
$$\boxed{\iint_S \vec{F} \cdot \hat{n} \, ds = 4}$$

---

# 10-Second Revision Notes
✓ $\vec{F} \cdot \hat{i} = 2xy$.
✓ Set $x=2 \implies$ Integrand $= 4y$.
✓ Limits: $y \in [0,1], z \in [0,2]$.
✓ Integral: $2 \times \int_0^1 4y dy = 2 \times 2 = 4$.

---

# Memory Trick
"Find the perpendicular component, apply the constant coordinate value, and integrate over the boundaries."

---

# Exam Confidence Booster
By writing the integral as a product of single integrals, you can complete this calculation mentally in under 10 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q11', 59),
  ('e1000000-0000-0000-0000-000000000060', 'a1000000-0000-0000-0000-000000000001', 'In a heat transfer system, the flux field is

$$
\vec F=xy\hat i+yz\hat j+xz\hat k.
$$
**Compute the circulation of heat flow around the boundary of the region in the xz-plane $$y=0$$ bounded by**

$$
0\le x\le1,\quad 0\le z\le1
$$
**using Stokes'' theorem.**', '# Question
In a heat transfer system, the flux field is $\vec F = xy\hat i + yz\hat j + xz\hat k$. Compute the circulation of heat flow around the boundary of the region in the $xz$-plane ($y=0$) bounded by $0 \le x \le 1, 0 \le z \le 1$ using Stokes'' theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Stokes'' Theorem
* **Why Applicable**: We are calculating the circulation (line integral) around a closed path in the $xz$-plane. Stokes'' theorem converts this to a surface integral of the curl over the enclosed square region.

---

# Pattern Recognition Trick
Identify:
* Surface lies in the $xz$-plane ($y=0$).
* Normal vector $\hat{n} = \hat{j}$ (according to positive orientation).
* Dot product: $(\nabla \times \vec{F}) \cdot \hat{j}$.
* Substitute $y = 0$ into the curl expression.

---

# Shortcut / Exam Trick
* Curl $\vec{F}$ component along y-axis is: $\partial_z F_x - \partial_x F_z = \partial_z (xy) - \partial_x (xz) = 0 - z = -z$.
* Since $\hat{n} = \hat{j}$, we project: $(\nabla \times \vec{F}) \cdot \hat{n} = -z$.
* Double integral over the unit square is:
  $$\int_0^1 \int_0^1 -z \, dx \, dz = \int_0^1 -z \, dz = -\frac{1}{2}$$

---

# Step-by-Step Solution
1. Find the curl of the vector field $\vec{F} = xy\hat{i} + yz\hat{j} + xz\hat{k}$:
   $$\nabla \times \vec{F} = \left| \begin{matrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ xy & yz & xz \end{matrix} \right|$$
   $$= \hat{i}(\partial_y (xz) - \partial_z (yz)) - \hat{j}(\partial_x (xz) - \partial_z (xy)) + \hat{k}(\partial_x (yz) - \partial_y (xy))$$
   $$= \hat{i}(0 - y) - \hat{j}(z - 0) + \hat{k}(0 - x) = -y\hat{i} - z\hat{j} - x\hat{k}$$
2. Identify the normal vector $\hat{n}$ to the surface in the $xz$-plane ($y=0$):
   $$\hat{n} = \hat{j}$$
3. Project the curl along the normal direction:
   $$(\nabla \times \vec{F}) \cdot \hat{n} = (-y\hat{i} - z\hat{j} - x\hat{k}) \cdot \hat{j} = -z$$
4. Apply Stokes'' Theorem:
   $$\oint_C \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \hat{n} \, ds = \int_0^1 \int_0^1 -z \, dx \, dz$$
5. Perform integration:
   $$\int_0^1 \int_0^1 -z \, dx \, dz = \left(\int_0^1 dx\right) \left(\int_0^1 -z \, dz\right) = 1 \times \left[-\frac{z^2}{2}\right]_0^1 = -\frac{1}{2}$$

---

# Why This Step Works
* Applying Stokes'' theorem replaces the 4 line integrals along the boundary of the square with a single double integral of the curl''s vertical component over the square area.

---

# Formula Used
* Stokes'' Theorem: $\oint_C \vec{F} \cdot d\vec{r} = \iint_S (\nabla \times \vec{F}) \cdot \hat{n} \, ds$

---

# Similar Patterns to Remember
* Work integrals in flat planes.
* Electromagnetic circulation loops.

---

# Common Mistakes
* Forgetting the negative sign in the determinant expansion for the $\hat{j}$ term.
* Choosing the wrong normal vector (like $\hat{n} = \hat{k}$).

---

# Final Answer
$$\boxed{\text{Circulation} = -\frac{1}{2}}$$

---

# 10-Second Revision Notes
✓ Curl component along y: $-\hat{j} (\partial_x F_z - \partial_z F_x) = -z\hat{j}$.
✓ Normal is $\hat{j}$ in the $xz$-plane.
✓ Integrand $= -z$.
✓ Integration over $1 \times 1$ square yields $-0.5$.

---

# Memory Trick
"In flat planes, curl projection is simply the cross derivative difference of the in-plane components."

---

# Exam Confidence Booster
By calculating only the relevant component of the curl (the y-component since the surface is $y=0$), you save valuable time in exams. Done in 20 seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q12', 60),
  ('e1000000-0000-0000-0000-000000000061', 'a1000000-0000-0000-0000-000000000001', 'In an electrical field,

$$
\vec F=(y)\hat i+(x)\hat j.
$$
**Use a line integral to determine the work done along the boundary of the square defined by**

$$
0\le x\le1,\quad 0\le y\le1.
$$', '# Question
In an electrical field, $\vec F = y\hat i + x\hat j$. Use a line integral to determine the work done along the boundary of the square defined by $0 \le x \le 1, 0 \le y \le 1$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals / Work Done
* **Why Applicable**: The work done by a force field along a closed path is given by the closed line integral $\oint_C \vec{F} \cdot d\vec{r}$.

---

# Pattern Recognition Trick
* Check if field is conservative: $\vec{F} = y\hat{i} + x\hat{j} \implies \nabla \times \vec{F} = \vec{0}$.
* The line integral of any conservative field along any closed loop is exactly zero.
* Loop is closed (boundary of square) $\implies$ Work Done $= 0$.

---

# Shortcut / Exam Trick
Since $\vec{F} = \nabla(xy)$, the field is conservative.
The boundary of the square is a closed curve $C$.
For any conservative field and closed path $C$:
$$\oint_C \vec{F} \cdot d\vec{r} = 0$$
Solve in 3 seconds!

---

# Step-by-Step Solution
1. Identify the vector field:
   $$\vec{F} = y\hat{i} + x\hat{j}$$
2. Check if the field is conservative:
   $$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = \frac{\partial(x)}{\partial x} - \frac{\partial(y)}{\partial y} = 1 - 1 = 0$$
   Since the curl is zero, the field is conservative.
3. State the path:
   The path $C$ is the boundary of the square $0 \le x \le 1, 0 \le y \le 1$. This is a closed curve.
4. Apply the conservative field property:
   For any conservative field, the line integral along a closed path is zero:
   $$\oint_C \vec{F} \cdot d\vec{r} = 0$$
5. Thus, the work done along the boundary of the square is 0.

---

# Why This Step Works
* Because the field is conservative, the work done on a particle depends only on the endpoints. Since the start and end points of a closed loop are identical ($A = B$), the net work done is $\phi(B) - \phi(A) = 0$.

---

# Formula Used
* $\oint_C \vec{F} \cdot d\vec{r} = 0$ for conservative $\vec{F}$.

---

# Similar Patterns to Remember
* Line integrals of gravity or electrostatic fields around closed orbits/loops are always zero.

---

# Common Mistakes
* Separating the path into 4 line segments and integrating each manually (this takes 5 minutes and is easy to make a math error, though it also yields 0).

---

# Final Answer
$$\boxed{\text{Work Done} = 0}$$

---

# 10-Second Revision Notes
✓ Field: $\vec{F} = [y, x]$.
✓ Curl: $\partial_x(x) - \partial_y(y) = 0 \implies$ Conservative.
✓ Path is a closed loop (square boundary).
✓ Work Done is exactly 0.

---

# Memory Trick
"Conservative loops do zero work."

---

# Exam Confidence Booster
Spotting a conservative field on a closed loop means you can write down $0$ instantly with absolute certainty!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q13', 61),
  ('e1000000-0000-0000-0000-000000000062', 'a1000000-0000-0000-0000-000000000001', 'Evaluate and interpret the total outward heat flux using divergence theorem for

$$
\vec F=(x^2-yz)\hat i+(y^2-xz)\hat j+(z^2-xy)\hat k
$$
over a rectangular domain

$$
0\le x\le a,\quad 0\le y\le b,\quad 0\le z\le c.
$$', '# Question
Evaluate and interpret the total outward heat flux using divergence theorem for $\vec F = (x^2-yz)\hat i + (y^2-xz)\hat j + (z^2-xy)\hat k$ over a rectangular domain $0 \le x \le a, 0 \le y \le b, 0 \le z \le c$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Gauss''s Divergence Theorem
* **Why Applicable**: The Divergence Theorem equates the surface integral (flux) over a closed surface to a volume integral of the divergence: $\iint_S \vec{F} \cdot \hat{n} \, ds = \iiint_V \nabla \cdot \vec{F} \, dV$.

---

# Pattern Recognition Trick
* Field: $\vec{F} = [x^2-yz, y^2-xz, z^2-xy]$
* Rectangular domain: $V = [0,a] \times [0,b] \times [0,c]$
* Calculating flux directly over 6 faces is very tedious; Divergence Theorem simplifies this to a single volume integration.

---

# Shortcut / Exam Trick
* $\nabla \cdot \vec{F} = 2x + 2y + 2z = 2(x+y+z)$.
* Integrating $x$ over $[0,a]$ yields $\frac{a^2}{2} bc$.
* Summing for all three variables:
  $$\text{Flux} = 2 \left[ \frac{a^2}{2}bc + ab\frac{b^2}{2}c + abc\frac{c^2}{2} \right] = abc(a + b + c)$$
  Simple algebraic structure.

---

# Step-by-Step Solution
1. Compute the divergence of $\vec{F}$:
   $$\nabla \cdot \vec{F} = \frac{\partial}{\partial x}(x^2-yz) + \frac{\partial}{\partial y}(y^2-xz) + \frac{\partial}{\partial z}(z^2-xy) = 2x + 2y + 2z$$
2. Set up the volume integral over the rectangular domain:
   $$\text{Flux} = \int_0^c \int_0^b \int_0^a 2(x+y+z) \, dx \, dy \, dz$$
3. Integrate with respect to $x$:
   $$\int_0^a (2x + 2y + 2z) \, dx = \left[ x^2 + 2(y+z)x \right]_0^a = a^2 + 2a(y+z)$$
4. Integrate with respect to $y$:
   $$\int_0^b [a^2 + 2ay + 2az] \, dy = \left[ a^2y + ay^2 + 2azy \right]_0^b = a^2b + ab^2 + 2abz$$
5. Integrate with respect to $z$:
   $$\int_0^c [a^2b + ab^2 + 2abz] \, dz = \left[ a^2bz + ab^2z + abz^2 \right]_0^c = a^2bc + ab^2c + abc^2$$
6. Factor out $abc$:
   $$\text{Flux} = abc(a + b + c)$$
7. **Physical Interpretation**:
   The positive outward flux indicates that the domain acts as a net source of heat. The total heat energy escaping the volume per unit time is proportional to the volume of the box ($abc$) multiplied by the sum of its dimensions ($a+b+c$).

---

# Why This Step Works
* Divergence theorem converts a complex boundary flux summation into a bulk accumulation volume integral, which is much easier to evaluate.

---

# Formula Used
* Divergence Theorem: $\iint_S \vec{F} \cdot \hat{n} \, ds = \iiint_V \nabla \cdot \vec{F} \, dV$

---

# Similar Patterns to Remember
* Finding flux of $\vec{F} = x\hat{i} + y\hat{j} + z\hat{k}$ over a sphere or box.

---

# Common Mistakes
* Forgetting to multiply by the other dimensions when integrating: e.g., integrating $2x$ to get $a^2$ instead of $a^2 b c$.

---

# Final Answer
$$\boxed{\text{Flux} = abc(a + b + c)}$$

---

# 10-Second Revision Notes
✓ $\nabla \cdot \vec{F} = 2(x+y+z)$.
✓ Integrate over box $[0,a] \times [0,b] \times [0,c]$.
✓ Result: $abc(a+b+c)$.
✓ Interpreted as net outward source rate of heat.

---

# Memory Trick
"The flux of $(x^2, y^2, z^2)$ like fields over a box yields the volume times the sum of dimensions."

---

# Exam Confidence Booster
Recognize that symmetric integrals of linear coordinates over a box are always of the form $\text{Volume} \times \text{average value}$. This leads to $abc(a+b+c)$ directly!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q14', 62),
  ('e1000000-0000-0000-0000-000000000063', 'a1000000-0000-0000-0000-000000000001', 'In a fluid transport system, the velocity field is

$$
\vec F=(2x)\hat i+(y)\hat j+(z)\hat k.
$$
**Use a surface integral to compute the total flux through the surface**

$$
x=1
$$
bounded by

$$
0\le y\le2,\quad 0\le z\le1.
$$', '# Question
In a fluid transport system, the velocity field is $\vec F = (2x)\hat i + (y)\hat j + (z)\hat k$. Use a surface integral to compute the total flux through the surface $x=1$ bounded by $0 \le y \le 2, 0 \le z \le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are computing the rate of fluid flow crossing a flat rectangular partition ($x=1$) perpendicular to the x-axis.

---

# Pattern Recognition Trick
* Surface: $x=1$.
* Normal: $\hat{n} = \hat{i}$.
* Dot product: $\vec{F} \cdot \hat{n} = 2x$.
* On the surface $x=1$, this is a constant value of 2.
* Integral is simply constant times area.

---

# Shortcut / Exam Trick
Since $\vec{F} \cdot \hat{n} = 2$ is constant on the surface:
$$\text{Flux} = \iint_S 2 \, ds = 2 \times \text{Area of Surface}$$
The surface is a rectangle in the $yz$-plane of size $2 \times 1 \implies \text{Area} = 2$.
$$\text{Flux} = 2 \times 2 = 4$$
Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Identify the normal vector $\hat{n}$ to the plane $x = 1$:
   $$\hat{n} = \hat{i}$$
2. Compute the dot product:
   $$\vec{F} \cdot \hat{n} = (2x\hat{i} + y\hat{j} + z\hat{k}) \cdot \hat{i} = 2x$$
3. Apply the surface constraint $x=1$:
   $$\vec{F} \cdot \hat{n}\Big|_{x=1} = 2(1) = 2$$
4. Set up the double integral over the region in the $yz$-plane:
   $$\text{Flux} = \iint_S 2 \, ds = \int_0^1 \int_0^2 2 \, dy \, dz$$
5. Evaluate the integral:
   $$\text{Flux} = 2 \left(\int_0^2 dy\right) \left(\int_0^1 dz\right) = 2(2)(1) = 4$$

---

# Why This Step Works
* Finding the projection of the velocity field along the surface normal gives the speed of fluid passing through the boundary. Integrating this over the boundary area gives the total flow rate.

---

# Formula Used
* Flux Integral: $\iint_S \vec{F} \cdot \hat{n} \, ds$

---

# Similar Patterns to Remember
* Flow rate through a pipe or partition window.
* Electric field flux through a capacitor plate.

---

# Common Mistakes
* Using the wrong normal vector like $\hat{n} = \hat{i} + \hat{j} + \hat{k}$.
* Integrating $2x$ and getting $x^2$ instead of substituting the boundary value $x=1$ first.

---

# Final Answer
$$\boxed{\text{Flux} = 4}$$

---

# 10-Second Revision Notes
✓ $\vec{F} \cdot \hat{i} = 2x$.
✓ Set $x=1 \implies$ Integrand $= 2$.
✓ Surface area $= 2 \times 1 = 2$.
✓ Total Flux $= 2 \times 2 = 4$.

---

# Memory Trick
"For flat planes with constant normal projection, flux is just value times area."

---

# Exam Confidence Booster
Checking if the projection is constant is the fastest way to solve surface integrals without doing actual integrations!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q15', 63),
  ('e1000000-0000-0000-0000-000000000064', 'a1000000-0000-0000-0000-000000000001', 'Evaluate and interpret the total outward heat flux using divergence theorem for

$$
\vec F=4xz\hat i-y^2\hat j+yz\hat k
$$
over a unit cubic control volume

$$
0\le x,y,z\le1.
$$', '# Question
Evaluate and interpret the total outward heat flux using divergence theorem for $\vec F = 4xz\hat i - y^2\hat j + yz\hat k$ over a unit cubic control volume $0 \le x,y,z \le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Gauss''s Divergence Theorem
* **Why Applicable**: We are asked to find the total outward flux of a vector field over a closed unit cube. The divergence theorem converts this to a volume integral.

---

# Pattern Recognition Trick
* Domain: closed unit cube $0 \le x,y,z \le 1$.
* Field: $\vec{F} = [4xz, -y^2, yz]$.
* Divergence: $\nabla \cdot \vec{F} = 4z - 2y + y = 4z - y$.

---

# Shortcut / Exam Trick
For a unit cube, integrating a linear function like $Az + By + C$ is extremely simple because the average value of $x, y, z$ in the unit cube is $1/2$:
$$\text{Flux} = \iiint_V (4z - y) \, dV = \text{Volume} \times (4z_{avg} - y_{avg}) = 1 \times \left(4(0.5) - 0.5\right) = 2 - 0.5 = 1.5$$
Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Find the divergence of $\vec{F}$:
   $$\nabla \cdot \vec{F} = \frac{\partial(4xz)}{\partial x} + \frac{\partial(-y^2)}{\partial y} + \frac{\partial(yz)}{\partial z}$$
   $$\nabla \cdot \vec{F} = 4z - 2y + y = 4z - y$$
2. Set up the volume integral over the unit cube:
   $$\text{Flux} = \int_0^1 \int_0^1 \int_0^1 (4z - y) \, dx \, dy \, dz$$
3. Integrate with respect to $x$ (integrand is independent of $x$):
   $$\int_0^1 dx = 1 \implies \text{Flux} = \int_0^1 \int_0^1 (4z - y) \, dy \, dz$$
4. Integrate with respect to $y$:
   $$\int_0^1 (4z - y) \, dy = \left[ 4zy - \frac{y^2}{2} \right]_0^1 = 4z - \frac{1}{2}$$
5. Integrate with respect to $z$:
   $$\int_0^1 \left(4z - \frac{1}{2}\right) \, dz = \left[ 2z^2 - \frac{z}{2} \right]_0^1 = 2 - \frac{1}{2} = \frac{3}{2}$$
6. **Physical Interpretation**:
   The total outward flux is positive ($1.5$), meaning the unit cube contains a net source of heat. Heat is leaving the control volume at a rate of 1.5 units per unit time.

---

# Why This Step Works
* The divergence theorem replaces the calculation of six separate surface integrals (one for each face of the cube) with a single volume integral.

---

# Formula Used
* Gauss''s Divergence Theorem: $\iint_S \vec{F} \cdot \hat{n} \, ds = \iiint_V \nabla \cdot \vec{F} \, dV$

---

# Similar Patterns to Remember
* Outward flux over control volumes in fluid mechanics.

---

# Common Mistakes
* Getting the sign of the divergence component wrong (e.g. writing $-y^2 \to -2$).
* Forgetting to integrate over all three coordinate directions.

---

# Final Answer
$$\boxed{\text{Flux} = \frac{3}{2}}$$

---

# 10-Second Revision Notes
✓ $\nabla \cdot \vec{F} = 4z - y$.
✓ Average values on unit cube: $z = 0.5, y = 0.5$.
✓ Integral $= 4(0.5) - 0.5 = 1.5$.
✓ Positive sign means net heat source.

---

# Memory Trick
"On a unit cube, the integral of any linear coordinate is $1/2$ times its coefficient."

---

# Exam Confidence Booster
Using the average-value shortcut for unit domains saves significant integration time and prevents arithmetic slip-ups!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q16', 64),
  ('e1000000-0000-0000-0000-000000000065', 'a1000000-0000-0000-0000-000000000001', 'A control response is modeled by

$$
f(z)=z^2.
$$
**Analyze whether the function is differentiable at**

$$
z=1+i.
$$', '# Question
A control response is modeled by $f(z) = z^2$. Analyze whether the function is differentiable at $z = 1+i$.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Analyticity and Differentiability
* **Why Applicable**: Differentiability in the complex plane requires the limit of the difference quotient to exist. Polynomials of $z$ are differentiable everywhere (entire functions).

---

# Pattern Recognition Trick
* The function is $f(z) = z^2$ (a pure polynomial in $z$, not involving conjugate $\bar{z}$ or absolute value $|z|$).
* Polynomials are differentiable everywhere in $\mathbb{C}$.
* Therefore, it is differentiable at $z = 1+i$.

---

# Shortcut / Exam Trick
Any function that is a finite sum of powers of $z$ (like $z^2, z^3, 5z+2$) is differentiable everywhere. You can use standard derivative rules:
$$f''(z) = 2z$$
At $z = 1+i$:
$$f''(1+i) = 2(1+i) = 2 + 2i$$

---

# Step-by-Step Solution
1. State the function:
   $$f(z) = z^2$$
2. Check for differentiability using Cauchy-Riemann equations or direct limit.
   Let''s write $f(z)$ in terms of $x$ and $y$:
   $$f(x+iy) = (x+iy)^2 = x^2 - y^2 + 2ixy$$
   $$u(x,y) = x^2 - y^2, \quad v(x,y) = 2xy$$
3. Compute partial derivatives to verify Cauchy-Riemann equations:
   $$u_x = 2x, \quad v_y = 2x \implies u_x = v_y$$
   $$u_y = -2y, \quad v_x = 2y \implies u_y = -v_x$$
   Since the partial derivatives are continuous and CR equations hold everywhere, the function is differentiable everywhere in $\mathbb{C}$.
4. Evaluate the derivative at $z = 1+i$:
   $$f''(z) = 2z \implies f''(1+i) = 2(1+i) = 2 + 2i$$

---

# Why This Step Works
* Satisfying the CR equations ensures that the rate of change is the same regardless of the direction from which you approach the point $1+i$.

---

# Formula Used
* Derivative of $z^n$: $\frac{d}{dz}(z^n) = n z^{n-1}$

---

# Similar Patterns to Remember
* Functions containing $\bar{z}$ or $|z|$ (like $|z|^2$ or $x - iy$) are generally not analytic (differentiable everywhere).

---

# Common Mistakes
* Assuming complex differentiability is the same as real differentiability of components without verifying the coupling (CR equations).

---

# Final Answer
$$\boxed{\text{The function is differentiable at } z = 1+i \text{ with derivative } f''(1+i) = 2+2i}$$

---

# 10-Second Revision Notes
✓ $f(z) = z^2$ is an entire polynomial function.
✓ Differentiable everywhere.
✓ Derivative formula: $f''(z) = 2z$.
✓ Value at $1+i$ is $2+2i$.

---

# Memory Trick
"Pure $z$ functions are always clean and differentiable; watch out for $\bar{z}$!"

---

# Exam Confidence Booster
Recognizing polynomial functions as entire means you can immediately declare differentiability and apply power rules without using CR equations.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q17', 65),
  ('e1000000-0000-0000-0000-000000000066', 'a1000000-0000-0000-0000-000000000001', 'A signal transformation is defined by

$$
w=z^2.
$$
**Identify whether the function is single-valued or multi-valued and justify.**', '# Question
A signal transformation is defined by $w = z^2$. Identify whether the function is single-valued or multi-valued and justify.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Functions of a Complex Variable
* **Why Applicable**: A function $w = f(z)$ is single-valued if for each point $z$ in the domain, there corresponds a unique value of $w$.

---

# Pattern Recognition Trick
* Map: $z \to w = z^2$.
* Input a single complex number $z$, say $2i$.
* Output is $(2i)^2 = -4$ (exactly one value).
* Since every input $z$ produces exactly one output, it is **single-valued**.

---

# Shortcut / Exam Trick
* Direct functions (like $z^2, e^z, \sin z$) are always **single-valued**.
* Inverse functions (like $\sqrt{z}, \ln z, \arcsin z$) are always **multi-valued** because they require branch cuts to isolate a single value.

---

# Step-by-Step Solution
1. Define a single-valued function:
   A complex mapping $w = f(z)$ is single-valued if each value of $z$ corresponds to exactly one value of $w$.
2. Analyze the mapping $w = z^2$:
   Let $z = r e^{i\theta}$ be in polar form.
   $$w = z^2 = (r e^{i\theta})^2 = r^2 e^{i2\theta}$$
3. Check for uniqueness:
   If we add $2\pi$ to the angle $\theta$ (which represents the same point $z$):
   $$w(r e^{i(\theta+2\pi)}) = r^2 e^{i(2\theta + 4\pi)} = r^2 e^{i2\theta} e^{i4\pi} = r^2 e^{i2\theta}$$
   Since the output value does not change, each coordinate point $z$ yields one and only one value of $w$.
4. **Conclusion**:
   The function $w = z^2$ is **single-valued**.

---

# Why This Step Works
* Proving that phase rotation of $2\pi$ in the input domain yields the identical point in the output domain verifies uniqueness of the function value.

---

# Formula Used
* Euler''s Identity: $e^{i2n\pi} = 1$ for integer $n$.

---

# Similar Patterns to Remember
* $w = z^3 + 2z$ (single-valued).
* $w = \sqrt{z}$ (multi-valued, since $\theta + 2\pi \to$ changes sign).

---

# Common Mistakes
* Confusing "single-valued" with "one-to-one". $w = z^2$ is not one-to-one (both $z$ and $-z$ map to same $w$), but it is still single-valued.

---

# Final Answer
$$\boxed{\text{The function } w = z^2 \text{ is single-valued.}}$$

---

# 10-Second Revision Notes
✓ $w = z^2$ takes one input and gives one output.
✓ Adding $2\pi$ to input phase gives same output ($e^{i4\pi} = 1$).
✓ Therefore, single-valued.

---

# Memory Trick
"Forward power mappings are single-valued; root mappings split into multiple values."

---

# Exam Confidence Booster
Any algebraic polynomial or basic transcendental function is single-valued by definition. Answer immediately!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q18', 66),
  ('e1000000-0000-0000-0000-000000000067', 'a1000000-0000-0000-0000-000000000001', 'In a fluid transport system, the stream function is given by

$$
v(x,y)=2xy.
$$
**Determine the harmonic conjugate using the Milne–Thomson method.**', '# Question
In a fluid transport system, the stream function is given by $v(x,y) = 2xy$. Determine the harmonic conjugate using the Milne-Thomson method.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Harmonic Conjugate / Milne-Thomson Method
* **Why Applicable**: The stream function $v(x,y)$ represents the imaginary part of an analytic function $f(z) = u(x,y) + iv(x,y)$. We find the real potential $u(x,y)$ (harmonic conjugate) to analyze flow.

---

# Pattern Recognition Trick
* Given: $v(x,y) = 2xy$.
* Find: $u(x,y)$.
* We can use Cauchy-Riemann equations: $u_x = v_y$, $u_y = -v_x$.
* Since $v$ is simple, direct integration is faster than Milne-Thomson, but we''ll outline the formal method.

---

# Shortcut / Exam Trick
* CR equation: $u_x = v_y = 2x \implies u = x^2 + g(y)$.
* CR equation: $u_y = -v_x = -2y \implies g''(y) = -2y \implies g(y) = -y^2$.
* So $u = x^2 - y^2 + C$.
* Notice that $f(z) = z^2 = (x^2-y^2) + i(2xy)$.
* So $u = x^2 - y^2$ is the conjugate.

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = 2xy$$
2. Write the Cauchy-Riemann equations:
   $$u_x = v_y \quad \text{and} \quad u_y = -v_x$$
3. Find the derivatives of $v$:
   $$v_x = 2y, \quad v_y = 2x$$
4. Set up the derivatives of $u$:
   $$u_x = 2x$$
   $$u_y = -2y$$
5. Integrate $u_x$ with respect to $x$:
   $$u(x,y) = \int 2x \, dx = x^2 + h(y)$$
6. Differentiate $u(x,y)$ with respect to $y$ and equate to $u_y$:
   $$u_y = h''(y) = -2y \implies h(y) = -y^2 + C$$
7. Write the harmonic conjugate $u(x,y)$:
   $$u(x,y) = x^2 - y^2 + C$$

---

# Why This Step Works
* CR equations guarantee that the resulting function $f = u + iv$ satisfies complex differentiability, meaning the grid of $u$ and $v$ curves is orthogonal.

---

# Formula Used
* Cauchy-Riemann Equations: $u_x = v_y, \quad u_y = -v_x$

---

# Similar Patterns to Remember
* Given $u = x^2 - y^2 \implies v = 2xy + C$.
* Given $u = e^x \cos y \implies v = e^x \sin y + C$.

---

# Common Mistakes
* Mixing up the signs in the CR equations (e.g. writing $u_y = v_x$).
* Forgetting the constant of integration $C$.

---

# Final Answer
$$\boxed{u(x,y) = x^2 - y^2 + C}$$

---

# 10-Second Revision Notes
✓ $v = 2xy \implies v_x = 2y, v_y = 2x$.
✓ $u_x = 2x \implies u = x^2 + h(y)$.
✓ $u_y = h''(y) = -2y \implies h(y) = -y^2$.
✓ $u = x^2 - y^2 + C$.

---

# Memory Trick
"The real part of $z^2$ is $x^2-y^2$ and the imaginary part is $2xy$."

---

# Exam Confidence Booster
Spotting $2xy$ as the stream function means you can immediately write down $x^2-y^2$ as the potential function. Saves 1 minute!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q19', 67),
  ('e1000000-0000-0000-0000-000000000068', 'a1000000-0000-0000-0000-000000000001', 'In an electrical field application, the real part of an analytic function is

$$
u(x,y)=x^2+2xy.
$$
**Find $f''$z$$ using Milne–Thomson method.**

Hint:

$$
f''(z)=u_x(z,0)-iu_y(z,0)
$$', '# Question
In an electrical field application, the real part of an analytic function is $u(x,y) = x^2 + 2xy$. Find $f''(z)$ using Milne-Thomson method.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method
* **Why Applicable**: The Milne-Thomson method allows constructing the derivative of an analytic function $f''(z)$ directly from its real part $u(x,y)$ without finding $v(x,y)$ first.

---

# Pattern Recognition Trick
* Real part $u(x,y) = x^2 + 2xy$.
* Find $f''(z)$ using:
  $$f''(z) = u_x(z,0) - i u_y(z,0)$$
* Simply differentiate $u$ with respect to $x$ and $y$, then substitute $x=z, y=0$.

---

# Shortcut / Exam Trick
* $u_x = 2x + 2y \implies u_x(z,0) = 2z$.
* $u_y = 2x \implies u_y(z,0) = 2z$.
* $f''(z) = 2z - i(2z) = 2z(1-i)$.
* Solve in under 15 seconds!

---

# Step-by-Step Solution
1. Identify the given real part:
   $$u(x,y) = x^2 + 2xy$$
2. Compute the partial derivatives:
   $$u_x = \frac{\partial}{\partial x}(x^2 + 2xy) = 2x + 2y$$
   $$u_y = \frac{\partial}{\partial y}(x^2 + 2xy) = 2x$$
3. Apply Milne-Thomson substitutions ($x = z$, $y = 0$):
   $$\phi_1(z,0) = u_x(z,0) = 2z + 2(0) = 2z$$
   $$\phi_2(z,0) = u_y(z,0) = 2z$$
4. Set up the formula for $f''(z)$:
   $$f''(z) = \phi_1(z,0) - i \phi_2(z,0)$$
5. Substitute the values:
   $$f''(z) = 2z - i(2z) = 2z(1 - i)$$

---

# Why This Step Works
* Milne-Thomson replaces variables $x$ and $y$ with $z$ and $0$ on the boundary, which isolates the analytical derivative function directly along the real axis line.

---

# Formula Used
* Milne-Thomson: $f''(z) = u_x(z,0) - i u_y(z,0)$

---

# Similar Patterns to Remember
* If given $v$, the formula is $f''(z) = v_y(z,0) + i v_x(z,0)$.

---

# Common Mistakes
* Forgetting the negative sign in front of $i u_y$ (using $+$ instead).
* Not substituting $y=0$ in the derivatives.

---

# Final Answer
$$\boxed{f''(z) = 2z(1 - i)}$$

---

# 10-Second Revision Notes
✓ $u_x = 2x+2y \implies u_x(z,0) = 2z$.
✓ $u_y = 2x \implies u_y(z,0) = 2z$.
✓ $f''(z) = u_x(z,0) - i u_y(z,0) = 2z - 2iz$.

---

# Memory Trick
"Milne-Thomson: $x$ goes to $z$, $y$ goes to $0$, and subtract $i$ times the $y$-derivative."

---

# Exam Confidence Booster
This method bypasses the integration steps of finding $v(x,y)$, letting you get $f''(z)$ directly in just two simple derivatives!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q20', 68),
  ('e1000000-0000-0000-0000-000000000069', 'a1000000-0000-0000-0000-000000000001', 'A communication signal is represented by a complex function $f$z$$.

**Evaluate the relationship between differentiability and continuity in complex systems.**', '# Question
A communication signal is represented by a complex function $f(z)$. Evaluate the relationship between differentiability and continuity in complex systems.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Differentiability and Continuity
* **Why Applicable**: Continuity and differentiability are fundamental properties of signal representations. Complex differentiability (analyticity) is a much stronger condition than real differentiability.

---

# Pattern Recognition Trick
* Differentiability in $\mathbb{C} \implies$ Continuity in $\mathbb{C}$.
* Continuity in $\mathbb{C} \centernot\implies$ Differentiability in $\mathbb{C}$ (e.g. $f(z) = \bar{z}$ is continuous everywhere but differentiable nowhere).

---

# Shortcut / Exam Trick
* Differentiable $\implies$ Continuous (Always True).
* Continuous $\implies$ Differentiable (False in general).
* If a question asks if a continuous function is differentiable, check CR equations!

---

# Step-by-Step Solution
1. **Differentiability Implies Continuity**:
   Assume $f(z)$ is differentiable at $z_0$. By definition:
   $$\lim_{z \to z_0} \frac{f(z) - f(z_0)}{z - z_0} = f''(z_0)$$
   We can write:
   $$\lim_{z \to z_0} [f(z) - f(z_0)] = \lim_{z \to z_0} \left[ \frac{f(z) - f(z_0)}{z - z_0} (z - z_0) \right] = f''(z_0) \cdot 0 = 0$$
   Therefore, $\lim_{z \to z_0} f(z) = f(z_0)$, which proves $f(z)$ is continuous at $z_0$.
2. **Continuity Does Not Imply Differentiability**:
   Consider $f(z) = \bar{z} = x - iy$.
   * $u = x \implies u_x = 1, u_y = 0$
   * $v = -y \implies v_x = 0, v_y = -1$
   Since $u_x = 1 \neq v_y = -1$, the Cauchy-Riemann equations are violated everywhere.
   Thus, $f(z) = \bar{z}$ is continuous everywhere but differentiable nowhere.
3. **Engineering Significance**:
   In communication signals, we require analytic models because they represent physically realizable, smooth waveforms (no sudden kinks or phase tears).

---

# Why This Step Works
* The limit definition proves that a finite rate of change (derivative) requires the function values to match at the limit boundary (continuity).

---

# Formula Used
* Limit definition of derivative: $f''(z) = \lim_{\Delta z \to 0} \frac{f(z+\Delta z) - f(z)}{\Delta z}$

---

# Similar Patterns to Remember
* $f(z) = |z|^2$ is continuous everywhere, but differentiable *only* at the origin $z=0$.

---

# Common Mistakes
* Assuming that because the real and imaginary parts are continuous, the complex function must be differentiable.

---

# Final Answer
$$\boxed{\text{Differentiability implies continuity, but continuity does not imply differentiability.}}$$

---

# 10-Second Revision Notes
✓ Differentiable $\implies$ Continuous.
✓ Continuous $\centernot\implies$ Differentiable.
✓ Counterexample: $f(z) = \bar{z}$ is continuous but nowhere differentiable.

---

# Memory Trick
"Differentiability is a high-class neighborhood (strict rules); continuity is just the open city."

---

# Exam Confidence Booster
Remembering the counterexample $f(z) = \bar{z}$ helps you justify why continuity is a necessary but not sufficient condition for differentiability.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q21', 69),
  ('e1000000-0000-0000-0000-000000000070', 'a1000000-0000-0000-0000-000000000001', 'An impedance transformation is represented by

$$
w=\sqrt z.
$$
**Analyze whether the function is single-valued or multi-valued.**', '# Question
An impedance transformation is represented by $w = \sqrt z$. Analyze whether the function is single-valued or multi-valued.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Multi-valued Functions / Branch Points
* **Why Applicable**: Root functions are multi-valued because polar coordinate representations of angles wrap around periodically, producing multiple distinct outputs for a single input coordinate.

---

# Pattern Recognition Trick
* Function: $w = z^{1/2}$ (square root).
* Every non-zero complex number has exactly 2 square roots.
* Since it yields two values for one input, it is **multi-valued**.

---

# Shortcut / Exam Trick
* Fractional powers like $z^{p/q}$ ($q > 1$) and logarithm $\ln z$ are always **multi-valued**.
* Square root has 2 values (differing by sign).

---

# Step-by-Step Solution
1. Express $z$ in polar form:
   $$z = r e^{i\theta}$$
2. Apply the square root operation:
   $$w = \sqrt{z} = z^{1/2} = \sqrt{r} e^{i\theta/2}$$
3. Rotate the angle by $2\pi$ (representing the same physical point $z$):
   $$z = r e^{i(\theta + 2\pi)}$$
   $$w = \sqrt{r} e^{i(\theta + 2\pi)/2} = \sqrt{r} e^{i\theta/2} e^{i\pi} = -\sqrt{r} e^{i\theta/2}$$
4. Compare values:
   We obtain two distinct values: $w_1 = \sqrt{r} e^{i\theta/2}$ and $w_2 = -\sqrt{r} e^{i\theta/2}$ depending on the branch chosen.
5. **Conclusion**:
   The impedance transformation $w = \sqrt{z}$ is **multi-valued**.

---

# Why This Step Works
* Rotating $2\pi$ in the input domain maps to a rotation of $\pi$ (a sign flip) in the square root output domain, proving the existence of multiple branches.

---

# Formula Used
* Euler''s Relation: $e^{i\pi} = -1$

---

# Similar Patterns to Remember
* $w = z^{1/3}$ has 3 values.
* $w = \ln z$ has infinitely many values ($w = \ln r + i(\theta + 2n\pi)$).

---

# Common Mistakes
* Stating that $\sqrt{z}$ is single-valued by only considering positive real numbers. In complex analysis, all roots must be accounted for.

---

# Final Answer
$$\boxed{\text{The function } w = \sqrt{z} \text{ is multi-valued.}}$$

---

# 10-Second Revision Notes
✓ $z = r e^{i\theta} \implies \sqrt{z} = \sqrt{r} e^{i\theta/2}$.
✓ Rotate input by $2\pi \implies$ Output rotates by $\pi$ (flips sign).
✓ Two values exist for each $z \neq 0 \implies$ Multi-valued.

---

# Memory Trick
"Roots divide the phase, splitting one point into many branches."

---

# Exam Confidence Booster
Instantly identify any root function as multi-valued. Branch cuts are needed to make it single-valued in system designs.', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q22', 70),
  ('e1000000-0000-0000-0000-000000000071', 'a1000000-0000-0000-0000-000000000001', 'An electric field potential is represented by

$$
u(x,y)=e^x\cos y.
$$
**Construct the analytic function using the Milne–Thomson method.**', '# Question
An electric field potential is represented by $u(x,y) = e^x\cos y$. Construct the analytic function using the Milne-Thomson method.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method
* **Why Applicable**: We are given the real potential $u(x,y)$ of an analytic function $f(z) = u + iv$ and want to find $f(z)$ directly in terms of the complex variable $z$.

---

# Pattern Recognition Trick
* Given: $u = e^x \cos y$.
* This is the classic real part of the exponential function $e^z$.
* Derivatives: $u_x = e^x \cos y$, $u_y = -e^x \sin y$.
* At $(z,0)$: $u_x = e^z$, $u_y = 0$.

---

# Shortcut / Exam Trick
* $f''(z) = u_x(z,0) - i u_y(z,0) = e^z \cos 0 - i(-e^z \sin 0) = e^z$.
* Integrate $f''(z)$:
  $$f(z) = \int e^z \, dz = e^z + C$$
* Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Identify the given real part:
   $$u(x,y) = e^x \cos y$$
2. Differentiate $u$ with respect to $x$ and $y$:
   $$u_x = \frac{\partial}{\partial x}(e^x \cos y) = e^x \cos y$$
   $$u_y = \frac{\partial}{\partial y}(e^x \cos y) = -e^x \sin y$$
3. Substitute $x = z$ and $y = 0$:
   $$\phi_1(z,0) = e^z \cos 0 = e^z$$
   $$\phi_2(z,0) = -e^z \sin 0 = 0$$
4. Set up the Milne-Thomson derivative equation:
   $$f''(z) = \phi_1(z,0) - i \phi_2(z,0) = e^z - i(0) = e^z$$
5. Integrate with respect to $z$:
   $$f(z) = \int e^z \, dz = e^z + C$$
   where $C$ is a complex constant.

---

# Why This Step Works
* Substituting $y=0$ forces the imaginary variable components to zero, aligning the function structure with its standard real-axis representation.

---

# Formula Used
* Milne-Thomson: $f''(z) = u_x(z,0) - i u_y(z,0)$

---

# Similar Patterns to Remember
* $u = e^x \sin y$ (imaginary part profile).
* $u = \cos x \cosh y$.

---

# Common Mistakes
* Forgetting the constant of integration $C$.
* Mixing up derivatives: differentiating $\cos y$ as $\sin y$ without the negative sign.

---

# Final Answer
$$\boxed{f(z) = e^z + C}$$

---

# 10-Second Revision Notes
✓ $u_x = e^x \cos y \implies \phi_1(z,0) = e^z$.
✓ $u_y = -e^x \sin y \implies \phi_2(z,0) = 0$.
✓ $f''(z) = e^z$.
✓ Integrate: $f(z) = e^z + C$.

---

# Memory Trick
"The gradient of $e^x \cos y$ along the x-axis is just $e^z$."

---

# Exam Confidence Booster
Recognizing $e^x \cos y$ as the real part of $e^z$ allows you to write down the answer immediately and verify it using Milne-Thomson in seconds!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q23', 71),
  ('e1000000-0000-0000-0000-000000000072', 'a1000000-0000-0000-0000-000000000001', 'In a fluid flow model, the imaginary part of an analytic function is

$$
v(x,y)=x^2-y^2.
$$
Using Milne–Thomson method,

**find $f''$z$$.**

Hint:

$$
f''(z)=v_y(z,0)+iv_x(z,0)
$$', '# Question
In a fluid flow model, the imaginary part of an analytic function is $v(x,y) = x^2 - y^2$. Using Milne-Thomson method, find $f''(z)$.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method (Given Imaginary Part)
* **Why Applicable**: When the imaginary part $v(x,y)$ is given, the Milne-Thomson formula is: $f''(z) = v_y(z,0) + i v_x(z,0)$.

---

# Pattern Recognition Trick
* Given: $v(x,y) = x^2 - y^2$.
* Find $f''(z)$.
* Differentiate: $v_x = 2x$, $v_y = -2y$.
* Substitute $x=z, y=0$: $v_x(z,0) = 2z$, $v_y(z,0) = 0$.
* Result: $f''(z) = 0 + i(2z) = 2iz$.

---

# Shortcut / Exam Trick
When given $v$:
$$f''(z) = v_y(z,0) + i v_x(z,0)$$
Here:
* $v_y = -2y \to 0$ at $y=0$.
* $v_x = 2x \to 2z$ at $x=z$.
* $f''(z) = 2iz$.
Solve in 10 seconds!

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = x^2 - y^2$$
2. Compute partial derivatives:
   $$v_x = \frac{\partial}{\partial x}(x^2 - y^2) = 2x$$
   $$v_y = \frac{\partial}{\partial y}(x^2 - y^2) = -2y$$
3. Substitute $x=z$ and $y=0$:
   $$\psi_1(z,0) = v_x(z,0) = 2z$$
   $$\psi_2(z,0) = v_y(z,0) = -2(0) = 0$$
4. State the Milne-Thomson formula for $f''(z)$ when given $v$:
   $$f''(z) = v_y(z,0) + i v_x(z,0)$$
5. Substitute the values:
   $$f''(z) = 0 + i(2z) = 2iz$$

---

# Why This Step Works
* Using the Cauchy-Riemann equations ($u_x = v_y$ and $u_y = -v_x$) allows rewriting $f''(z) = u_x + i v_x$ purely in terms of $v$ derivatives as $f''(z) = v_y + i v_x$.

---

# Formula Used
* $f''(z) = v_y(z,0) + i v_x(z,0)$

---

# Similar Patterns to Remember
* Milne-Thomson given real part: $f''(z) = u_x(z,0) - i u_y(z,0)$.

---

# Common Mistakes
* Using the real-part formula (subtracting $i$ times derivative) by mistake, yielding $-2iz$.
* Mixing up $v_x$ and $v_y$ terms.

---

# Final Answer
$$\boxed{f''(z) = 2iz}$$

---

# 10-Second Revision Notes
✓ $v_x = 2x \implies v_x(z,0) = 2z$.
✓ $v_y = -2y \implies v_y(z,0) = 0$.
✓ $f''(z) = v_y(z,0) + i v_x(z,0) = 2iz$.

---

# Memory Trick
"For imaginary parts, the $x$-derivative gets the $i$ multiplier, and we add."

---

# Exam Confidence Booster
Writing down the correct formula for imaginary parts ($v_y + i v_x$) is key. Memorize the sign rules to avoid easy mistakes!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q24', 72),
  ('e1000000-0000-0000-0000-000000000073', 'a1000000-0000-0000-0000-000000000001', 'A communication signal is modeled by

$$
f(z)=e^z.
$$
**Analyze whether the function is analytic and interpret its significance in signal amplification.**', '# Question
A communication signal is modeled by $f(z) = e^z$. Analyze whether the function is analytic and interpret its significance in signal amplification.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Analyticity (Cauchy-Riemann Equations)
* **Why Applicable**: For a function to be analytic, it must satisfy the Cauchy-Riemann equations and have continuous first-order partial derivatives at all points.

---

# Pattern Recognition Trick
* Function: $f(z) = e^z$.
* The derivative $f''(z) = e^z$ exists for all $z \in \mathbb{C}$.
* Therefore, the function is entire (analytic everywhere).

---

# Shortcut / Exam Trick
Any exponential function of $z$ (like $e^z, e^{2z}$) is entire.
$$f''(z) = e^z$$
Since it is differentiable everywhere, it is automatically analytic everywhere.

---

# Step-by-Step Solution
1. Express $f(z) = e^z$ in terms of real and imaginary parts ($x, y$):
   $$f(z) = e^{x+iy} = e^x(\cos y + i\sin y) = e^x\cos y + i e^x\sin y$$
   $$u(x,y) = e^x\cos y, \quad v(x,y) = e^x\sin y$$
2. Calculate the partial derivatives:
   $$u_x = e^x\cos y, \quad v_y = e^x\cos y \implies u_x = v_y$$
   $$u_y = -e^x\sin y, \quad v_x = e^x\sin y \implies u_y = -v_x$$
3. Verify the conditions:
   * The Cauchy-Riemann equations $u_x = v_y$ and $u_y = -v_x$ hold everywhere in the complex plane.
   * The partial derivatives are continuous everywhere.
   * Therefore, $f(z) = e^z$ is **analytic everywhere** (entire).
4. **Significance in Signal Amplification**:
   * Writing $e^z = e^x e^{iy}$ shows that the real part $x$ controls exponential amplification (gain) of the signal amplitude.
   * The imaginary part $y$ represents a linear phase shift ($e^{iy}$), which preserves the sinusoidal waveform shape without introducing harmonic distortion.

---

# Why This Step Works
* Satisfying the CR equations ensures that the transformation is conformal, meaning angles between crossing signal paths are preserved, preventing signal distortion.

---

# Formula Used
* Cauchy-Riemann Equations: $u_x = v_y, \quad u_y = -v_x$

---

# Similar Patterns to Remember
* Trigonometric signals: $f(z) = \sin z$ or $\cos z$ (also analytic everywhere).

---

# Common Mistakes
* Confusing real exponential behavior with complex exponential behavior.
* Claiming the function is not analytic because it grows without bound.

---

# Final Answer
$$\boxed{\text{The function } f(z) = e^z \text{ is analytic everywhere, representing distortionless amplification and phase shift.}}$$

---

# 10-Second Revision Notes
✓ $f(z) = e^x\cos y + i e^x\sin y$.
✓ $u_x = v_y = e^x\cos y$ and $u_y = -v_x = -e^x\sin y$.
✓ CR equations hold everywhere $\implies$ Analytic.
✓ Models amplitude gain ($e^x$) and phase shift ($e^{iy}$).

---

# Memory Trick
"Exponential functions are smooth, entire, and preserve angle shapes."

---

# Exam Confidence Booster
Knowing that $e^z$ is entire allows you to use standard real calculus rules directly in the complex domain without derivation. Saves time!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q25', 73),
  ('e1000000-0000-0000-0000-000000000074', 'a1000000-0000-0000-0000-000000000001', 'A signal transformation system uses the mapping

$$
w=(1+i)z.
$$
**Determine the image of the region $y>2$ in the w-plane and analyze the transformation characteristics.**', '# Question
A signal transformation system uses the mapping $w = (1+i)z$. Determine the image of the region $y > 2$ in the $w$-plane and analyze the transformation characteristics.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Conformal Mappings / Linear Transformations
* **Why Applicable**: The mapping is of the form $w = Az$, which represents a linear transformation involving rotation and scaling. We map the boundary line $y=2$ to find the transformed region.

---

# Pattern Recognition Trick
* Mapping: $w = (1+i)z$.
* Note that $1+i = \sqrt{2} e^{i\pi/4}$.
* This scales coordinates by $\sqrt{2}$ and rotates them counterclockwise by $45^\circ$ ($\pi/4$).
* Find relation between $y$ and the $w$-coordinates $u, v$.

---

# Shortcut / Exam Trick
Express $z$ in terms of $w$:
$$z = \frac{w}{1+i} = \frac{w(1-i)}{2} = \frac{(u+iv)(1-i)}{2} = \frac{(u+v) + i(v-u)}{2}$$
So:
$$x = \frac{u+v}{2}, \quad y = \frac{v-u}{2}$$
Given $y > 2$:
$$\frac{v-u}{2} > 2 \implies v - u > 4 \implies v > u + 4$$
Solve in under 20 seconds!

---

# Step-by-Step Solution
1. Identify the mapping equation:
   $$w = u + iv = (1+i)(x+iy)$$
2. Expand the right-hand side:
   $$w = x - y + i(x + y)$$
3. Equate real and imaginary parts:
   $$u = x - y$$
   $$v = x + y$$
4. Solve for $y$ by subtracting the equations:
   $$v - u = (x + y) - (x - y) = 2y \implies y = \frac{v-u}{2}$$
5. Apply the region inequality $y > 2$:
   $$\frac{v-u}{2} > 2 \implies v - u > 4 \implies v > u + 4$$
6. **Analyze Transformation Characteristics**:
   * **Scaling**: Magnification factor is $|1+i| = \sqrt{2}$.
   * **Rotation**: Rotation angle is $\arg(1+i) = \frac{\pi}{4}$ ($45^\circ$ CCW).
   * The horizontal boundary line $y=2$ is mapped to the line $v = u + 4$ in the $w$-plane. The upper half region is mapped above this line.

---

# Why This Step Works
* Expressing the input variable ($y$) in terms of output variables ($u,v$) allows direct substitution of boundaries to define the new coordinate bounds.

---

# Formula Used
* Division of complex numbers: $\frac{1}{1+i} = \frac{1-i}{2}$

---

# Similar Patterns to Remember
* Translation: $w = z + C$.
* Pure rotation: $w = e^{i\theta}z$.
* Pure scaling: $w = kz$.

---

# Common Mistakes
* Forgetting to divide by 2 when resolving $z = w/(1+i)$.
* Incorrectly orienting the inequality sign, shading the wrong side of the line.

---

# Final Answer
$$\boxed{\text{Image Region: } v > u + 4, \quad \text{Characteristics: Scale factor } \sqrt{2}, \text{ Rotation } 45^\circ \text{ CCW.}}$$

---

# 10-Second Revision Notes
✓ $w = (1+i)z \implies u=x-y, v=x+y$.
✓ Subtract: $v-u = 2y \implies y = (v-u)/2$.
✓ Substitute $y>2 \implies v-u>4 \implies v > u+4$.
✓ Map represents scaling by $\sqrt{2}$ and $45^\circ$ rotation.

---

# Memory Trick
"Express $z$ in terms of $w$, substitute the constraint, and map the boundary."

---

# Exam Confidence Booster
Isolating $y$ algebraically is a bulletproof method that works for any linear complex mapping, avoiding geometric confusion entirely!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q26', 74),
  ('e1000000-0000-0000-0000-000000000075', 'a1000000-0000-0000-0000-000000000001', 'In a thermal distribution model, the temperature potential is represented by

$$
f(z)=(x^2-y^2+2x)+i(2xy+2y).
$$
**Verify whether the function is analytic using the Cauchy–Riemann equations and interpret the physical meaning.**', '# Question
In a thermal distribution model, the temperature potential is represented by $f(z) = (x^2-y^2+2x) + i(2xy+2y)$. Verify whether the function is analytic using the Cauchy-Riemann equations and interpret the physical meaning.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Cauchy-Riemann Equations / Analyticity
* **Why Applicable**: A function $f(z) = u + iv$ is analytic if its real part $u$ and imaginary part $v$ satisfy the CR equations ($u_x = v_y$ and $u_y = -v_x$) and have continuous partial derivatives.

---

# Pattern Recognition Trick
Identify:
* $u = x^2 - y^2 + 2x$
* $v = 2xy + 2y$
* Take partial derivatives and compare.

---

# Shortcut / Exam Trick
* $u_x = 2x + 2$, $v_y = 2x + 2 \implies u_x = v_y$.
* $u_y = -2y$, $v_x = 2y \implies u_y = -v_x$.
* Both CR equations hold everywhere. Since they are polynomials, derivatives are continuous.
* Therefore, the function is analytic everywhere!

---

# Step-by-Step Solution
1. Identify the components $u$ and $v$:
   $$u(x,y) = x^2 - y^2 + 2x$$
   $$v(x,y) = 2xy + 2y$$
2. Compute the first-order partial derivatives:
   * With respect to $x$:
     $$u_x = \frac{\partial}{\partial x}(x^2 - y^2 + 2x) = 2x + 2$$
     $$v_x = \frac{\partial}{\partial x}(2xy + 2y) = 2y$$
   * With respect to $y$:
     $$u_y = \frac{\partial}{\partial y}(x^2 - y^2 + 2x) = -2y$$
     $$v_y = \frac{\partial}{\partial y}(2xy + 2y) = 2x + 2$$
3. Compare the derivatives to check Cauchy-Riemann equations:
   * Equation 1: $u_x = 2x + 2 = v_y$ (Satisfied)
   * Equation 2: $u_y = -2y = -v_x$ (Satisfied)
4. Confirm continuity: Since the partial derivatives are simple polynomial expressions, they are continuous everywhere.
5. **Physical Interpretation**:
   * In a thermal model, the real part $u(x,y)$ represents isotherms (curves of constant temperature).
   * The imaginary part $v(x,y)$ represents heat flow lines (paths along which heat energy travels).
   * Since the function is analytic, these two families of curves intersect orthogonally, indicating steady-state heat conduction.

---

# Why This Step Works
* The CR equations mathematically guarantee that the real and imaginary parts represent orthogonal grid lines, which physically models steady-state potential flow.

---

# Formula Used
* Cauchy-Riemann Equations: $u_x = v_y, \quad u_y = -v_x$

---

# Similar Patterns to Remember
* $f(z) = z^2 + 2z$ (which expands to exactly this function).

---

# Common Mistakes
* Writing the second CR equation as $u_y = v_x$, which misses the negative sign.

---

# Final Answer
$$\boxed{\text{The function satisfies } u_x=v_y=2x+2 \text{ and } u_y=-v_x=-2y, \text{ so it is analytic. Isotherms and flow lines are orthogonal.}}$$

---

# 10-Second Revision Notes
✓ $u_x = 2x+2$, $v_y = 2x+2$.
✓ $u_y = -2y$, $v_x = 2y$.
✓ CR equations hold everywhere $\implies$ Analytic.
✓ Physical meaning: Orthogonal heat isotherms and flow trajectories.

---

# Memory Trick
"Orthogonal families of lines are the signature of analytic potential fields."

---

# Exam Confidence Booster
By inspection, note that $f(z) = z^2 + 2z$. Since any polynomial in $z$ is entire, the function must be analytic everywhere, saving calculation verification!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q27', 75),
  ('e1000000-0000-0000-0000-000000000076', 'a1000000-0000-0000-0000-000000000001', 'An electrostatic field boundary represented by

$$
|z|=2
$$
is transformed under

$$
w=z+1+4i.
$$
**Determine the image of the boundary and interpret the transformation.**', '# Question
An electrostatic field boundary represented by $|z| = 2$ is transformed under $w = z + 1 + 4i$. Determine the image of the boundary and interpret the transformation.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Bilinear / Linear Mappings (Translation)
* **Why Applicable**: Mappings of the form $w = z + C$ are translations. They shift every point in the complex plane by a constant vector $C$ without changing shape, size, or orientation.

---

# Pattern Recognition Trick
* Boundary: $|z| = 2$ (circle of radius 2 centered at origin).
* Map: $w = z + (1+4i)$ (translation by $1$ along real axis, $4$ along imaginary axis).
* Center shifts from $(0,0)$ to $(1,4)$, radius remains $2$.

---

# Shortcut / Exam Trick
Solve for $z$:
$$z = w - (1+4i)$$
Substitute into the boundary condition $|z| = 2$:
$$|w - (1+4i)| = 2$$
This is the standard equation of a circle.
Center $= 1+4i$, Radius $= 2$.
Solve in 5 seconds!

---

# Step-by-Step Solution
1. Identify the given boundary equation:
   $$|z| = 2$$
   This represents a circle with center $z_0 = 0$ and radius $R = 2$.
2. Write the mapping equation:
   $$w = z + 1 + 4i$$
3. Express $z$ in terms of $w$:
   $$z = w - (1+4i)$$
4. Substitute $z$ into the boundary equation:
   $$|z| = 2 \implies |w - (1+4i)| = 2$$
5. **Interpret the Transformation**:
   * This is a translation mapping.
   * The original circle centered at $(0,0)$ with radius 2 is translated (shifted) to a new position.
   * The new boundary is a circle in the $w$-plane centered at $w_0 = 1 + 4i$ (coordinates $(1,4)$) with the same radius $R = 2$.

---

# Why This Step Works
* Substituting the inverse mapping $z = f^{-1}(w)$ directly into the geometric constraint equations preserves the boundary limits while shifting coordinates.

---

# Formula Used
* Complex Circle Equation: $|z - z_0| = R$

---

# Similar Patterns to Remember
* Magnification: $|w| = k|z| \implies$ radius scales by $k$.
* Rotation: $w = e^{i\theta}z \implies$ phase shifts by $\theta$.

---

# Common Mistakes
* Changing the radius of the circle: e.g., thinking the radius becomes $|1+4i| = \sqrt{17}$. Translation does not scale shapes.

---

# Final Answer
$$\boxed{|w - (1+4i)| = 2, \quad \text{which is a circle of radius 2 centered at } 1+4i.}$$

---

# 10-Second Revision Notes
✓ Original: $|z|=2$ (center $0$, radius $2$).
✓ Map: $w = z + (1+4i)$ (translation).
✓ Shift center: $0 + (1+4i) = 1+4i$.
✓ New circle: $|w - (1+4i)| = 2$.

---

# Memory Trick
"Addition shifts the center; multiplication changes the size and orientation."

---

# Exam Confidence Booster
Translation transforms circles to circles of the exact same size. Find the new center by simply adding the constant offset!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q28', 76),
  ('e1000000-0000-0000-0000-000000000077', 'a1000000-0000-0000-0000-000000000001', 'In an electrical field system, the imaginary part is

$$
v(x,y)=2xy.
$$
**Construct the analytic function $f$z$$.**', '# Question
In an electrical field system, the imaginary part is $v(x,y) = 2xy$. Construct the analytic function $f(z)$.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Construction of Analytic Functions
* **Why Applicable**: We are given the imaginary part $v(x,y)$ of an analytic function $f(z) = u + iv$. We can construct the function using the Milne-Thomson method.

---

# Pattern Recognition Trick
* Given: $v(x,y) = 2xy$.
* Find $f(z)$.
* Calculate derivatives: $v_x = 2y$, $v_y = 2x$.
* Substitute $x=z, y=0$: $v_x(z,0) = 0$, $v_y(z,0) = 2z$.
* Integrate $f''(z) = 2z$ to get $z^2$.

---

# Shortcut / Exam Trick
We know that $z^2 = (x^2-y^2) + i(2xy)$.
Since the imaginary part is $2xy$:
$$f(z) = z^2 + C \quad (\text{where } C \text{ is real})$$
This matches the target profile instantly.

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = 2xy$$
2. Compute the partial derivatives:
   $$v_x = \frac{\partial(2xy)}{\partial x} = 2y$$
   $$v_y = \frac{\partial(2xy)}{\partial y} = 2x$$
3. Apply Milne-Thomson substitutions ($x=z$, $y=0$):
   $$\psi_1(z,0) = v_x(z,0) = 2(0) = 0$$
   $$\psi_2(z,0) = v_y(z,0) = 2z$$
4. Set up the derivative formula for $f''(z)$ given $v$:
   $$f''(z) = \psi_2(z,0) + i \psi_1(z,0) = 2z + i(0) = 2z$$
5. Integrate with respect to $z$:
   $$f(z) = \int 2z \, dz = z^2 + C$$
   Since $v = \text{Im}(f(z)) = 2xy$, the constant $C$ must be a real constant to avoid adding imaginary components.

---

# Why This Step Works
* Integrating the analytic derivative matches the real and imaginary parts across the entire plane, establishing the unique function family.

---

# Formula Used
* $f''(z) = v_y(z,0) + i v_x(z,0)$

---

# Similar Patterns to Remember
* Given $u = x^2 - y^2 \implies f(z) = z^2 + iC$ (where $C$ is real).

---

# Common Mistakes
* Using the real-part formula by mistake: $f''(z) = u_x - i u_y$, which changes signs and gives the wrong answer.
* Writing a complex integration constant without specifying that its imaginary part must be zero.

---

# Final Answer
$$\boxed{f(z) = z^2 + C \quad (\text{where } C \text{ is a real constant})}$$

---

# 10-Second Revision Notes
✓ $v_y = 2x \implies v_y(z,0) = 2z$.
✓ $v_x = 2y \implies v_x(z,0) = 0$.
✓ $f''(z) = 2z$.
✓ Integrate: $f(z) = z^2 + C$ (C is real).

---

# Memory Trick
"Integrate the derivative along the real line to restore the complex function."

---

# Exam Confidence Booster
Recognizing standard real/imaginary parts of $z^2, z^3, e^z$ saves substantial time. Always check if the function matches a basic power of $z$!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q29', 77),
  ('e1000000-0000-0000-0000-000000000078', 'a1000000-0000-0000-0000-000000000001', 'A control transformation maps the points

$$
z_1=1,\quad z_2=i,\quad z_3=-1
$$
onto

$$
w_1=0,\quad w_2=1,\quad w_3=-1.
$$
**Determine the bilinear transformation.**', '# Question
A control transformation maps the points $z_1 = 1, z_2 = i, z_3 = -1$ onto $w_1 = 0, w_2 = 1, w_3 = -1$. Determine the bilinear transformation.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Bilinear (Mobius) Transformations
* **Why Applicable**: A bilinear transformation maps three distinct points to three distinct points uniquely. It is given by the cross-ratio preservation property.

---

# Pattern Recognition Trick
Identify:
* Inputs: $z_1 = 1, z_2 = i, z_3 = -1$
* Outputs: $w_1 = 0, w_2 = 1, w_3 = -1$
* Use the cross-ratio equation:
  $$\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$

---

# Shortcut / Exam Trick
* Substitute $w$ points: $\frac{w(1 - (-1))}{(w - (-1))(1 - 0)} = \frac{2w}{w+1}$.
* Substitute $z$ points: $\frac{(z-1)(i+1)}{(z+1)(i-1)} = \frac{z-1}{z+1} (-i)$.
* Equate: $\frac{2w}{w+1} = -i \frac{z-1}{z+1}$.
* Solve for $w$:
  $$w = \frac{-i(z-1)}{2(z+1) + i(z-1)} = \frac{(1-z)i}{(2+i)z + 2-i}$$

---

# Step-by-Step Solution
1. Write the cross-ratio preservation equation:
   $$\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$
2. Substitute the given values ($z_1=1, z_2=i, z_3=-1$ and $w_1=0, w_2=1, w_3=-1$):
   $$\frac{(w-0)(1 - (-1))}{(w - (-1))(1 - 0)} = \frac{(z-1)(i - (-1))}{(z - (-1))(i - 1)}$$
3. Simplify both sides:
   $$\text{Left Side} = \frac{2w}{w+1}$$
   $$\text{Right Side} = \frac{z-1}{z+1} \cdot \frac{i+1}{i-1}$$
   Since $\frac{i+1}{i-1} = \frac{(i+1)^2}{i^2-1} = \frac{2i}{-2} = -i$:
   $$\frac{2w}{w+1} = -i \frac{z-1}{z+1}$$
4. Solve for $w$:
   $$2w(z+1) = -i(z-1)(w+1)$$
   $$2wz + 2w = -iwz + iw - iz + i$$
   $$w(2z + 2 + iz - i) = i - iz$$
   $$w = \frac{i(1-z)}{(2+i)z + (2-i)}$$

---

# Why This Step Works
* Preservation of the cross-ratio is a fundamental property of Mobius mappings, guaranteeing a unique conformal mapping between any two sets of three points.

---

# Formula Used
* Cross-ratio formula: $\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$

---

# Similar Patterns to Remember
* Mapping upper half-plane to unit disk.

---

# Common Mistakes
* Incorrectly simplifying the complex ratio: writing $\frac{i+1}{i-1} = 1$ or $i$. Remember it evaluates to $-i$.
* Algebraic mistakes when isolating $w$.

---

# Final Answer
$$\boxed{w = \frac{(1-z)i}{(2+i)z + 2-i}}$$

---

# 10-Second Revision Notes
✓ Cross-ratio equation setup.
✓ Simplify $\frac{i+1}{i-1} = -i$.
✓ Left side: $\frac{2w}{w+1}$. Right side: $-i \frac{z-1}{z+1}$.
✓ Cross-multiply and solve: $w = \frac{(1-z)i}{(2+i)z + 2-i}$.

---

# Memory Trick
"The Mobius cross-ratio is just a system of coordinates that matches up points one-to-one."

---

# Exam Confidence Booster
You can verify your bilinear transformation by plugging in the original points: $z=1 \to w=0$; $z=-1 \to w=-1$. If they match, your answer is correct!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q30', 78),
  ('e1000000-0000-0000-0000-000000000079', 'a1000000-0000-0000-0000-000000000001', 'In a heat transfer application, determine whether

$$
u(x,y)=x^2-y^2
$$
is harmonic and construct its harmonic conjugate.', '# Question
In a heat transfer application, determine whether $u(x,y) = x^2 - y^2$ is harmonic and construct its harmonic conjugate.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Harmonic Functions and Conjugates
* **Why Applicable**: A function $u(x,y)$ is harmonic if it satisfies Laplace''s equation: $\nabla^2 u = u_{xx} + u_{yy} = 0$. Its harmonic conjugate $v(x,y)$ is found using the Cauchy-Riemann equations.

---

# Pattern Recognition Trick
* Function: $u = x^2 - y^2$.
* Second derivatives: $u_{xx} = 2$, $u_{yy} = -2$.
* Sum: $2 - 2 = 0 \implies$ Harmonic.
* Conjugate is $2xy + C$ (since this forms $z^2$).

---

# Shortcut / Exam Trick
* Any function of the form $x^2-y^2$ is the real part of $z^2 = (x^2-y^2) + i(2xy)$.
* Thus, it is automatically harmonic, and its harmonic conjugate is $2xy + C$.
* Solve in under 5 seconds!

---

# Step-by-Step Solution
1. Write the function:
   $$u(x,y) = x^2 - y^2$$
2. Compute second-order partial derivatives:
   $$u_x = 2x \implies u_{xx} = 2$$
   $$u_y = -2y \implies u_{yy} = -2$$
3. Verify Laplace''s Equation:
   $$\nabla^2 u = u_{xx} + u_{yy} = 2 + (-2) = 0$$
   Since the sum is zero, $u(x,y)$ is a **harmonic function**.
4. Set up Cauchy-Riemann equations to find the harmonic conjugate $v(x,y)$:
   $$v_y = u_x = 2x$$
   $$v_x = -u_y = 2y$$
5. Integrate $v_y = 2x$ with respect to $y$:
   $$v(x,y) = 2xy + h(x)$$
6. Differentiate $v(x,y)$ with respect to $x$ and equate to $v_x$:
   $$v_x = 2y + h''(x) = 2y \implies h''(x) = 0 \implies h(x) = C$$
7. Write the harmonic conjugate:
   $$v(x,y) = 2xy + C$$

---

# Why This Step Works
* Laplace''s equation represents physical steady-state distributions (like temperature or electric potential). The conjugate represent lines orthogonal to these potentials.

---

# Formula Used
* Laplace''s Equation: $u_{xx} + u_{yy} = 0$
* Cauchy-Riemann Equations: $v_y = u_x, \quad v_x = -u_y$

---

# Similar Patterns to Remember
* $u = xy \implies v = \frac{y^2-x^2}{2} + C$.

---

# Common Mistakes
* Stating $u(x,y)$ is not harmonic by making a sign error in the second derivative (e.g. $u_{yy} = 2$).
* Missing the constant $C$ in the harmonic conjugate.

---

# Final Answer
$$\boxed{u(x,y) \text{ is harmonic, and its harmonic conjugate is } v(x,y) = 2xy + C.}$$

---

# 10-Second Revision Notes
✓ $u_{xx} = 2, u_{yy} = -2 \implies u_{xx}+u_{yy}=0$ (Harmonic).
✓ $v_y = 2x \implies v = 2xy + h(x)$.
✓ $v_x = 2y \implies h''(x) = 0$.
✓ Conjugate is $2xy + C$.

---

# Memory Trick
"Real $z^2$ is $x^2-y^2$; imaginary $z^2$ is $2xy$. They are partners (conjugates)."

---

# Exam Confidence Booster
Spotting $x^2-y^2$ means you don''t need to do any work to find the conjugate—it is always $2xy$ plus a constant!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q31', 79),
  ('e1000000-0000-0000-0000-000000000080', 'a1000000-0000-0000-0000-000000000001', 'A signal transformation system maps the points

$$
z_1=0,\quad z_2=i,\quad z_3=-i
$$
onto

$$
w_1=1,\quad w_2=-1,\quad w_3=0.
$$
**Determine the bilinear transformation and interpret the engineering significance.**', '# Question
A signal transformation system maps the points $z_1 = 0, z_2 = i, z_3 = -i$ onto $w_1 = 1, w_2 = -1, w_3 = 0$. Determine the bilinear transformation and interpret the engineering significance.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Bilinear Transformations / Mobius Mapping
* **Why Applicable**: We map three complex coordinates to three output coordinates, establishing a unique Mobius transformation.

---

# Pattern Recognition Trick
* Inputs: $z_1 = 0, z_2 = i, z_3 = -i$
* Outputs: $w_1 = 1, w_2 = -1, w_3 = 0$
* Apply the cross-ratio relation:
  $$\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$

---

# Shortcut / Exam Trick
* Substitute $w$: $\frac{(w-1)(-1)}{(w)(-2)} = \frac{w-1}{2w}$.
* Substitute $z$: $\frac{z(2i)}{(z+i)i} = \frac{2z}{z+i}$.
* Equate: $\frac{w-1}{2w} = \frac{2z}{z+i}$.
* Solve for $w$:
  $$w(z+i) - (z+i) = 4wz \implies w(z+i - 4z) = z+i \implies w = \frac{z+i}{-3z+i}$$

---

# Step-by-Step Solution
1. State the cross-ratio preservation equation:
   $$\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$
2. Substitute the points:
   $$\frac{(w-1)(-1 - 0)}{(w - 0)(-1 - 1)} = \frac{(z-0)(i - (-i))}{(z - (-i))(i - 0)}$$
3. Simplify both sides:
   $$\frac{-(w-1)}{-2w} = \frac{2iz}{(z+i)i} \implies \frac{w-1}{2w} = \frac{2z}{z+i}$$
4. Cross-multiply and solve for $w$:
   $$(w-1)(z+i) = 4wz$$
   $$w(z+i) - (z+i) = 4wz$$
   $$w(z+i - 4z) = z+i$$
   $$w(i - 3z) = z+i$$
   $$w = \frac{z+i}{-3z+i}$$
5. **Engineering Significance**:
   * Bilinear mappings are used in digital filter design (e.g., the Bilinear Transform in DSP).
   * It maps the continuous-time s-plane (analog domain) to the discrete-time z-plane (digital domain), preserving system stability properties.

---

# Why This Step Works
* Setting up the ratio balances the scaling and translational transformations across the domains, mapping the three defined reference anchors uniquely.

---

# Formula Used
* Cross-ratio formula: $\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$

---

# Similar Patterns to Remember
* Tustin''s approximation for digital control systems: $s = \frac{2}{T} \frac{z-1}{z+1}$.

---

# Common Mistakes
* Writing the denominator as $-3z-i$ due to sign errors during expansion.
* Confusing the order of points in the cross-ratio formula.

---

# Final Answer
$$\boxed{w = \frac{z+i}{-3z+i}}$$

---

# 10-Second Revision Notes
✓ Substitute points in the cross-ratio.
✓ Left side becomes $\frac{w-1}{2w}$; right side becomes $\frac{2z}{z+i}$.
✓ Solve: $w(z+i - 4z) = z+i \implies w = \frac{z+i}{-3z+i}$.
✓ Significance: Used in s-to-z plane transformations in DSP.

---

# Memory Trick
"The cross ratio keeps the boundary points locked in place during mapping."

---

# Exam Confidence Booster
Check the edge cases: $z=0 \to w = i/i = 1$; $z=-i \to w = 0$. These quick checks guarantee your formula is correct!', NULL, '22MA201 - Engineering Mathematics II', 'Module Test-II Q32', 80)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;
