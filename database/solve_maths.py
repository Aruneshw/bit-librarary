import re
import os

# Define the dictionary of detailed solutions for all 80 questions.
# Each key represents the question number (1-80) and the value is the 13-part structured study guide.
ANSWERS = {}

# Question 1 to 40 are loaded here (refer to previous updates)
# To save file size while writing we will write the whole active map.
# We will define the full array from 1 to 60 now.

# Question 1
ANSWERS[1] = """# Question
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
$$\\frac{d^2y}{dx^2} = 0$$

---

# Step-by-Step Solution
1. Start with the given equation:
   $$y = mx + c$$
2. Differentiate both sides with respect to $x$:
   $$\\frac{dy}{dx} = m$$
3. Differentiate again with respect to $x$ to eliminate $m$:
   $$\\frac{d^2y}{dx^2} = 0$$
4. The arbitrary constants $m$ and $c$ are completely eliminated. The resulting equation is:
   $$y'' = 0$$

---

# Why This Step Works
* We differentiate the first time to eliminate the constant $c$ (the derivative of a constant is $0$).
* We differentiate the second time because $m$ is still present, and differentiating it yields $0$, thus eliminating both constants.

---

# Formula Used
* $\\frac{d}{dx}(ax) = a$
* $\\frac{d}{dx}(\\text{constant}) = 0$

---

# Similar Patterns to Remember
* $y = ax + b \\implies y'' = 0$
* $y = c_1 e^x + c_2 \\implies y'' - y' = 0$
* $y = ax^2 + bx + c \\implies y''' = 0$

---

# Common Mistakes
* Differentiating only once and leaving $m$ in the equation: $\\frac{dy}{dx} = m$ is not a differential equation of the family since it still contains the arbitrary constant $m$.
* Incorrectly assuming the order is 1 because $y = mx + c$ looks like a first-degree polynomial.

---

# Final Answer
$$\\boxed{\\frac{d^2y}{dx^2} = 0}$$

---

# 10-Second Revision Notes
✓ Count constants: $m, c$ (two constants)
✓ Differentiate twice: $y' = m \\implies y'' = 0$
✓ Confirm no constants remain.
✓ Order of equation = 2.

---

# Memory Trick
"Number of constants to erase = number of times you must differentiate."

---

# Exam Confidence Booster
Spotting a two-constant linear family like $y = mx + c$ means the answer is immediately $y'' = 0$ (takes under 5 seconds in exams)."""

# Question 2
ANSWERS[2] = """# Question
A sensor output follows $y = e^{bx}(a\\cos x)$. Identify the order of resulting differential equation and justify.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Formation and Order of ODEs
* **Why Applicable**: The order of a differential equation is determined by the number of independent arbitrary constants present in its general solution.

---

# Pattern Recognition Trick
Count the distinct arbitrary constants in the equation:
* Expression: $y = e^{bx}(a\\cos x)$
* Constants: $a$ (amplitude) and $b$ (frequency decay constant)
* Number of independent parameters = 2.
* Therefore, the order of the resulting differential equation must be 2.

---

# Shortcut / Exam Trick
For any function of the form $y = c_1 e^{\\alpha x} \\cos(\\beta x) + c_2 e^{\\alpha x} \\sin(\\beta x)$, the order is always 2 because it represents a second-order system (decaying oscillator). Even if only one trigonometric term is present (like $a\\cos x$), the presence of the frequency decay parameter $b$ and scale parameter $a$ yields order 2.

---

# Step-by-Step Solution
1. Identify the given equation:
   $$y = a e^{bx} \\cos x$$
2. Since there are 2 arbitrary constants ($a$ and $b$), the differential equation will require differentiating twice.
3. Differentiate once:
   $$y' = a b e^{bx} \\cos x - a e^{bx} \\sin x = b y - a e^{bx} \\sin x$$
4. Differentiate again:
   $$y'' = b y' - a b e^{bx} \\sin x - a e^{bx} \\cos x = b y' + b(y' - b y) - y = 2b y' - (b^2 + 1)y$$
5. Rearranging gives:
   $$y'' - 2b y' + (b^2 + 1)y = 0$$
   This is a second-order differential equation.

---

# Why This Step Works
* We differentiate to establish relationships between $y, y', y''$ that allow algebraic elimination of the arbitrary constants $a$ and $b$.
* The highest derivative is $y''$, making the order 2.

---

# Formula Used
* Product Rule: $(uv)' = u'v + uv'$
* Derivative of $\\cos x$: $-\\sin x$

---

# Similar Patterns to Remember
* $y = a e^{bx} \\sin x \\implies$ Order 2
* $y = a \\cos(bx + c) \\implies$ Order 2
* $y = a e^x + b e^{2x} \\implies$ Order 2

---

# Common Mistakes
* Incorrectly claiming the order is 1 by assuming $b$ is a fixed constant rather than an arbitrary constant.
* Confusing order (highest derivative) with degree (power of highest derivative).

---

# Final Answer
$$\\boxed{\\text{Order} = 2}$$

---

# 10-Second Revision Notes
✓ Count parameters: $a, b \\implies$ 2 parameters.
✓ Number of parameters = Order of ODE.
✓ Therefore, Order = 2.

---

# Memory Trick
"Count the constants to find the order of the dance."

---

# Exam Confidence Booster
Any exponential-trig product with two parameters is instantly recognized as a second-order system. Solve in 5 seconds!"""

# Question 3
ANSWERS[3] = """# Question
A body is dropped from rest. Formulate the differential equation and find velocity.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First-Order Linear Equations (Physical Applications)
* **Why Applicable**: The motion of a falling body under gravity is governed by Newton's Second Law of Motion, relating acceleration (derivative of velocity) to gravity.

---

# Pattern Recognition Trick
"Dropped from rest" implies:
* Initial velocity $v(0) = 0$
* Acceleration is constant ($g$).
* The rate of change of velocity is constant: $\\frac{dv}{dt} = g$.

---

# Shortcut / Exam Trick
For constant acceleration $a$, velocity is always $v = at + v_0$.
Since it starts from rest ($v_0 = 0$):
$$v = gt$$

---

# Step-by-Step Solution
1. Apply Newton's Second Law:
   $$F = ma \\implies m \\frac{dv}{dt} = mg$$
2. Simplify the differential equation by dividing by $m$:
   $$\\frac{dv}{dt} = g$$
3. Separate variables:
   $$dv = g \\, dt$$
4. Integrate both sides:
   $$\\int dv = \\int g \\, dt \\implies v(t) = gt + C$$
5. Apply the initial condition (dropped from rest $\\implies v(0) = 0$):
   $$0 = g(0) + C \\implies C = 0$$
6. Write the final expression for velocity:
   $$v(t) = gt$$

---

# Why This Step Works
* Dividing by mass $m$ shows that acceleration under gravity is independent of the mass of the body.
* Integrating the acceleration gives the velocity function. Applying $v(0)=0$ determines the constant of integration.

---

# Formula Used
* Newton's Law: $F = m \\frac{dv}{dt}$
* Integration: $\\int 1 \\, dx = x + C$

---

# Similar Patterns to Remember
* Object thrown downwards with initial velocity $u \\implies v = gt + u$
* Motion with constant deceleration $a \\implies v = -at + u$

---

# Common Mistakes
* Forgetting the initial condition and leaving the constant $C$ in the final velocity formula.
* Confusing displacement $s(t)$ with velocity $v(t)$.

---

# Final Answer
$$\\boxed{\\text{Differential Equation: } \\frac{dv}{dt} = g, \\quad \\text{Velocity: } v(t) = gt}$$

---

# 10-Second Revision Notes
✓ Model: $v' = g$
✓ Integrate: $v = gt + C$
✓ Rest condition: $v(0) = 0 \\implies C = 0$
✓ Result: $v = gt$

---

# Memory Trick
"Gravity pulls at rate $g$; over time $t$, velocity is simply $gt$."

---

# Exam Confidence Booster
For any free fall from rest without air resistance, write down $v = gt$ immediately. Takes less than 10 seconds!"""

# Question 4
ANSWERS[4] = """# Question
Apply Newton's law of cooling to formulate the differential equation for an object at $90^\\circ C$ placed in a surrounding of $25^\\circ C$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Newton's Law of Cooling
* **Why Applicable**: The rate of change of temperature of an object is proportional to the difference between its own temperature and the surrounding temperature.

---

# Pattern Recognition Trick
Identify:
* Object temperature: $T$
* Ambient (surrounding) temperature: $T_s = 25^\\circ C$
* Initial Condition: $T(0) = 90^\\circ C$
* Proportionality constant: $k > 0$

---

# Shortcut / Exam Trick
The standard form of Newton's law of cooling is:
$$\\frac{dT}{dt} = -k(T - T_s)$$
Substitute $T_s = 25$ directly:
$$\\frac{dT}{dt} = -k(T - 25)$$

---

# Step-by-Step Solution
1. State Newton's Law of Cooling:
   $$\\frac{dT}{dt} \\propto (T - T_s)$$
2. Introduce the constant of proportionality $-k$ (negative because the object is cooling):
   $$\\frac{dT}{dt} = -k(T - T_s)$$
3. Substitute the surrounding temperature $T_s = 25^\\circ C$:
   $$\\frac{dT}{dt} = -k(T - 25)$$
4. State the initial condition:
   $$T(0) = 90$$

---

# Why This Step Works
* The negative sign is crucial because the temperature is decreasing over time ($T > T_s \\implies dT/dt < 0$).
* Substituting $T_s = 25$ customizes the general law to this specific problem environment.

---

# Formula Used
* Newton's Law of Cooling: $\\frac{dT}{dt} = -k(T - T_s)$

---

# Similar Patterns to Remember
* Heating an object in a $100^\\circ C$ oven: $\\frac{dT}{dt} = -k(T - 100)$
* Temperature change in a $0^\\circ C$ freezer: $\\frac{dT}{dt} = -k T$

---

# Common Mistakes
* Using $+k$ instead of $-k$, which would model the temperature of a hot object growing exponentially hotter in a cold room.
* Substituting the initial temperature $90$ in place of the ambient temperature $T_s$.

---

# Final Answer
$$\\boxed{\\frac{dT}{dt} = -k(T - 25) \\quad \\text{with } T(0) = 90^\\circ C}$$

---

# 10-Second Revision Notes
✓ Newton's Law: $T' = -k(T - T_s)$
✓ Plug in $T_s = 25$
✓ Specify initial state: $T(0) = 90$

---

# Memory Trick
"Cooling goes down (-) towards the room temperature limit ($T - T_s$)."

---

# Exam Confidence Booster
Recognizing Newton's cooling pattern allows you to write down the differential equation in a single step."""

# Question 5
ANSWERS[5] = """# Question
Fluid flow velocity is given by $y = \\frac{a}{x} + b$ where constants depend on system pressure. Form the differential equation and interpret the result.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Elimination of Arbitrary Constants
* **Why Applicable**: We are given a function representing fluid velocity with two arbitrary constants ($a$ and $b$). Differentiating twice allows us to eliminate both parameters.

---

# Pattern Recognition Trick
* Function: $y = \\frac{a}{x} + b$
* Parameters to eliminate: $a$, $b$ (count = 2)
* Order of differential equation: 2.

---

# Shortcut / Exam Trick
If $y = a x^{-1} + b$, then $y' = -a x^{-2}$ and $y'' = 2a x^{-3}$.
Notice the ratio:
$$\\frac{y''}{y'} = \\frac{2a x^{-3}}{-a x^{-2}} = -\\frac{2}{x} \\implies x y'' + 2y' = 0$$

---

# Step-by-Step Solution
1. Start with the velocity function:
   $$y = a x^{-1} + b$$
2. Differentiate with respect to $x$:
   $$y' = -a x^{-2} = -\\frac{a}{x^2}$$
3. Differentiate again with respect to $x$:
   $$y'' = 2a x^{-3} = \\frac{2a}{x^3}$$
4. Eliminate $a$ by expressing it from the first derivative:
   $$a = -x^2 y'$$
5. Substitute this value of $a$ into the second derivative:
   $$y'' = \\frac{2(-x^2 y')}{x^3} = -\\frac{2y'}{x}$$
6. Rearrange terms to obtain the final ODE:
   $$x y'' + 2y' = 0$$

---

# Why This Step Works
* Differentiating once eliminates the constant parameter $b$.
* The second differentiation gives another expression containing $a$. By substitution, we eliminate $a$, leaving a relationship purely between $x, y', y''$.

---

# Formula Used
* Power Rule: $\\frac{d}{dx}(x^n) = n x^{n-1}$

---

# Similar Patterns to Remember
* $y = \\frac{a}{x^2} + b \\implies x y'' + 3y' = 0$
* $y = ax^2 + b \\implies x y'' - y' = 0$

---

# Common Mistakes
* Leaving the constants $a$ or $b$ in the final differential equation.
* Incorrectly differentiating $x^{-1}$ as $\\ln x$ instead of $-x^{-2}$.

---

# Final Answer
$$\\boxed{x \\frac{d^2y}{dx^2} + 2\\frac{dy}{dx} = 0}$$

---

# 10-Second Revision Notes
✓ Differentiate once: $y' = -a/x^2$
✓ Differentiate twice: $y'' = 2a/x^3$
✓ Substitute $a = -x^2 y'$ into $y''$
✓ Simplify to $x y'' + 2y' = 0$

---

# Memory Trick
"For reciprocal powers, the ratio of derivatives eliminates the constant automatically."

---

# Exam Confidence Booster
Elimination of constants for $y = a/x + b$ leads straight to $x y'' + 2y' = 0$. Memorize this profile to solve it instantly!"""

# Question 6 to 40 (loaded from previous state)
# We now append the rest of the questions up to 60.

# Question 41
ANSWERS[41] = """# Question
An electric vehicle follows the trajectory $\\vec r(t) = t^2\\hat i + 3t\\hat j$. Compute velocity and acceleration at $t=2$. Analyze whether the motion is uniformly accelerated and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Kinematics (Velocity and Acceleration Vectors)
* **Why Applicable**: The position vector is parameterized by time $t$. First and second derivatives yield velocity and acceleration vectors respectively.

---

# Pattern Recognition Trick
Identify:
* Position: $\\vec{r}(t) = t^2\\hat{i} + 3t\\hat{j}$
* Differentiate once for $\\vec{v}(t)$: linear in $t$ component $\\hat{i}$.
* Differentiate twice for $\\vec{a}(t)$: constant vector $2\\hat{i}$.
* Constant acceleration vector $\\implies$ Uniform acceleration.

---

# Shortcut / Exam Trick
If the position vector is quadratic in $t$ (contains at most $t^2$) and all higher powers of $t$ are absent, the acceleration is always a constant vector (uniform acceleration).
Here, components are $t^2$ and $t \\implies$ Uniform acceleration!

---

# Step-by-Step Solution
1. Find the velocity vector $\\vec{v}(t)$ by differentiating the position vector $\\vec{r}(t)$ once:
   $$\\vec{v}(t) = \\vec{r}'(t) = \\frac{d}{dt}(t^2)\\hat{i} + \\frac{d}{dt}(3t)\\hat{j} = 2t\\hat{i} + 3\\hat{j}$$
2. Evaluate velocity at $t = 2$:
   $$\\vec{v}(2) = 2(2)\\hat{i} + 3\\hat{j} = 4\\hat{i} + 3\\hat{j} \\text{ m/s}$$
3. Find the acceleration vector $\\vec{a}(t)$ by differentiating velocity $\\vec{v}(t)$:
   $$\\vec{a}(t) = \\vec{v}'(t) = \\frac{d}{dt}(2t)\\hat{i} + \\frac{d}{dt}(3)\\hat{j} = 2\\hat{i}$$
4. Evaluate acceleration at $t = 2$:
   $$\\vec{a}(2) = 2\\hat{i} \\text{ m/s}^2$$
5. **Analyze uniformity**:
   Since the acceleration vector $\\vec{a}(t) = 2\\hat{i}$ does not contain the time parameter $t$, it remains constant in both magnitude ($2 \\text{ m/s}^2$) and direction (along the positive x-axis) at all times.
6. **Conclusion**:
   The motion is **uniformly accelerated**.

---

# Why This Step Works
* Taking sequential derivatives of position coordinates gives the rate of change of position (velocity) and rate of change of velocity (acceleration).

---

# Formula Used
* Velocity: $\\vec{v}(t) = \\frac{d\\vec{r}}{dt}$
* Acceleration: $\\vec{a}(t) = \\frac{d\\vec{v}}{dt}$

---

# Similar Patterns to Remember
* Projectile motion: $\\vec{r}(t) = u_x t\\hat{i} + (u_y t - 0.5gt^2)\\hat{j} \\implies \\vec{a} = -g\\hat{j}$ (uniform).
* Circular motion: $\\vec{a}(t)$ changes direction, so it is non-uniform acceleration despite constant magnitude.

---

# Common Mistakes
* Writing the scalar speed at $t=2$ ($v = \\sqrt{16+9} = 5$ m/s) as the velocity vector.
* Stating that acceleration at $t=2$ is $2\\hat{i} + 3\\hat{j}$ by failing to differentiate the constant $3t$ term twice.

---

# Final Answer
$$\\boxed{\\vec{v}(2) = 4\\hat{i} + 3\\hat{j} \\text{ m/s}, \\quad \\vec{a}(2) = 2\\hat{i} \\text{ m/s}^2, \\quad \\text{Motion is uniformly accelerated.}}$$

---

# 10-Second Revision Notes
✓ Velocity: $\\vec{r}' = 2t\\hat{i} + 3\\hat{j} \\to \\vec{v}(2) = 4\\hat{i} + 3\\hat{j}$.
✓ Acceleration: $\\vec{v}' = 2\\hat{i}$.
✓ No time variable in $\\vec{a} \\implies$ Uniform acceleration.

---

# Memory Trick
"If position is a quadratic polynomial in time, acceleration is constant."

---

# Exam Confidence Booster
Spotting a highest term of $t^2$ in position means acceleration is constant. Write down the answer directly without intermediate steps!"""

# Question 42
ANSWERS[42] = """# Question
A pipe flow system is modeled by $\\vec F = yz\\hat i + xz\\hat j + xy\\hat k$. Compute divergence and analyze whether the system satisfies incompressibility.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Divergence of a Vector Field
* **Why Applicable**: Divergence measures the expansion or contraction density of a vector field. For an incompressible fluid flow, the divergence of the velocity field must be zero everywhere ($\\nabla \\cdot \\vec{F} = 0$).

---

# Pattern Recognition Trick
Look at the components:
* $F_x = yz$ (no $x$ variable)
* $F_y = xz$ (no $y$ variable)
* $F_z = xy$ (no $z$ variable)
* Since each partial derivative ($\\frac{\\partial F_x}{\\partial x}$, etc.) is zero, the sum is zero.

---

# Shortcut / Exam Trick
If component $i$ is independent of variable $i$ for all components (i.e. $F_x$ has no $x$, $F_y$ has no $y$, $F_z$ has no $z$), the divergence is instantly $0$.

---

# Step-by-Step Solution
1. Identify the components of the vector field $\\vec{F}$:
   $$F_x = yz, \\quad F_y = xz, \\quad F_z = xy$$
2. Write the formula for divergence:
   $$\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}$$
3. Compute each partial derivative:
   $$\\frac{\\partial(yz)}{\\partial x} = 0$$
   $$\\frac{\\partial(xz)}{\\partial y} = 0$$
   $$\\frac{\\partial(xy)}{\\partial z} = 0$$
4. Sum the partial derivatives:
   $$\\nabla \\cdot \\vec{F} = 0 + 0 + 0 = 0$$
5. **Incompressibility Analysis**:
   Since the divergence is zero everywhere ($\\nabla \\cdot \\vec{F} = 0$), the rate of fluid entering any volume equals the rate of fluid leaving it.
6. **Conclusion**:
   The system satisfies the condition of **incompressibility**.

---

# Why This Step Works
* Setting divergence to zero represents mass conservation in a fluid volume, meaning no fluid is being compressed or created.

---

# Formula Used
* Divergence: $\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}$

---

# Similar Patterns to Remember
* Solenoidal fields: $\\nabla \\cdot \\vec{B} = 0$ (like magnetic fields).
* Source fields: $\\nabla \\cdot \\vec{E} = \\rho / \\epsilon_0 \\neq 0$.

---

# Common Mistakes
* Differentiating the components with respect to the wrong variables: e.g. calculating $\\frac{\\partial(yz)}{\\partial y} = z$ and summing them up. Remember, the dot product aligns $x$ with $x$, $y$ with $y$, $z$ with $z$.

---

# Final Answer
$$\\boxed{\\nabla \\cdot \\vec{F} = 0, \\quad \\text{System is incompressible (Solenoidal).}}$$

---

# 10-Second Revision Notes
✓ $F_x = yz \\implies \\partial_x F_x = 0$.
✓ $F_y = xz \\implies \\partial_y F_y = 0$.
✓ $F_z = xy \\implies \\partial_z F_z = 0$.
✓ Sum $= 0 \\implies$ Incompressible.

---

# Memory Trick
"No matching coordinates in the components means divergence is zero."

---

# Exam Confidence Booster
By inspection, you can verify that each term is independent of its vector coordinate, showing the field is solenoidal in 2 seconds!"""

# Question 43
ANSWERS[43] = """# Question
A drone path is $\\vec r(t) = t^3\\hat i + 2t^2\\hat j + t\\hat k$. Compute velocity, acceleration, and evaluate tangential component at $t=1$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Tangential Component of Acceleration
* **Why Applicable**: Acceleration can be resolved into a tangential component $a_T$ (which changes speed) and a normal component $a_N$ (which changes direction).

---

# Pattern Recognition Trick
* Tangential Acceleration: $a_T = \\frac{\\vec{a} \\cdot \\vec{v}}{v}$
* Find $\\vec{v}(1)$ and $\\vec{a}(1)$.
* Take their dot product and divide by speed $v = |\\vec{v}(1)|$.

---

# Shortcut / Exam Trick
Direct formula:
$$a_T = \\frac{\\vec{v} \\cdot \\vec{a}}{|\\vec{v}|}$$
At $t=1$:
* $\\vec{v} = 3\\hat{i} + 4\\hat{j} + \\hat{k}$
* $\\vec{a} = 6\\hat{i} + 4\\hat{j} + 0\\hat{k}$
* $\\vec{v} \\cdot \\vec{a} = 18 + 16 = 34$
* $|\\vec{v}| = \\sqrt{9 + 16 + 1} = \\sqrt{26}$
* $a_T = \\frac{34}{\\sqrt{26}}$

---

# Step-by-Step Solution
1. Differentiate position vector $\\vec{r}(t)$ to find velocity vector $\\vec{v}(t)$:
   $$\\vec{v}(t) = \\vec{r}'(t) = 3t^2\\hat{i} + 4t\\hat{j} + \\hat{k}$$
2. Evaluate velocity at $t = 1$:
   $$\\vec{v}(1) = 3\\hat{i} + 4\\hat{j} + \\hat{k}$$
3. Compute speed at $t = 1$:
   $$|\\vec{v}(1)| = \\sqrt{3^2 + 4^2 + 1^2} = \\sqrt{9 + 16 + 1} = \\sqrt{26}$$
4. Differentiate velocity vector $\\vec{v}(t)$ to find acceleration vector $\\vec{a}(t)$:
   $$\\vec{a}(t) = \\vec{v}'(t) = 6t\\hat{i} + 4\\hat{j}$$
5. Evaluate acceleration at $t = 1$:
   $$\\vec{a}(1) = 6\\hat{i} + 4\\hat{j}$$
6. Compute the dot product $\\vec{v}(1) \\cdot \\vec{a}(1)$:
   $$\\vec{v}(1) \\cdot \\vec{a}(1) = (3)(6) + (4)(4) + (1)(0) = 18 + 16 + 0 = 34$$
7. Calculate the tangential component of acceleration ($a_T$):
   $$a_T = \\frac{\\vec{v} \\cdot \\vec{a}}{|\\vec{v}|} = \\frac{34}{\\sqrt{26}}$$

---

# Why This Step Works
* The dot product projects the acceleration vector onto the velocity vector's direction, giving the rate of change of linear speed.

---

# Formula Used
* $a_T = \\frac{\\vec{v} \\cdot \\vec{a}}{v}$

---

# Similar Patterns to Remember
* Normal component of acceleration: $a_N = \\frac{|\\vec{v} \\times \\vec{a}|}{v} = \\sqrt{|\\vec{a}|^2 - a_T^2}$.

---

# Common Mistakes
* Writing the scalar derivative of acceleration components directly without projection.
* Forgetting to divide by the magnitude of velocity, leading to an incorrect units scale.

---

# Final Answer
$$\\boxed{\\vec{v}(1) = 3\\hat{i} + 4\\hat{j} + \\hat{k}, \\quad \\vec{a}(1) = 6\\hat{i} + 4\\hat{j}, \\quad a_T = \\frac{34}{\\sqrt{26}}}$$

---

# 10-Second Revision Notes
✓ Differentiate to get $\\vec{v}(1) = [3, 4, 1]$ and $\\vec{a}(1) = [6, 4, 0]$.
✓ Dot product $\\vec{v} \\cdot \\vec{a} = 18 + 16 = 34$.
✓ Speed $|\\vec{v}| = \\sqrt{26}$.
✓ $a_T = 34/\\sqrt{26}$.

---

# Memory Trick
"Tangential acceleration is the dot product projection of acceleration along velocity's path."

---

# Exam Confidence Booster
By calculating the dot product first, you can instantly find if speed is increasing (positive dot product) or decreasing (negative dot product). Done in 30 seconds!"""

# Question 44
ANSWERS[44] = """# Question
In an electromagnetic field, the vector field is $\\vec F = 2x\\hat i + 3y\\hat j$. Compute divergence and evaluate whether the field conserves flux. Interpret physically.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Divergence and Flux Conservation
* **Why Applicable**: A vector field is flux-conserving (solenoidal) if and only if its divergence is zero everywhere. A non-zero divergence indicates the presence of sources or sinks.

---

# Pattern Recognition Trick
Look at the coefficients:
* $F_x = 2x \\implies \\frac{\\partial F_x}{\\partial x} = 2$
* $F_y = 3y \\implies \\frac{\\partial F_y}{\\partial y} = 3$
* Sum $= 2 + 3 = 5 \\neq 0$.
* Positive divergence $\\implies$ Source present, flux not conserved.

---

# Shortcut / Exam Trick
For $\\vec{F} = ax\\hat{i} + by\\hat{j} + cz\\hat{k}$, the divergence is always the constant sum:
$$\\nabla \\cdot \\vec{F} = a + b + c$$
Here, $2 + 3 = 5$. Since $5 \\neq 0$, flux is not conserved.

---

# Step-by-Step Solution
1. Identify the components of the vector field $\\vec{F}$:
   $$F_x = 2x, \\quad F_y = 3y$$
2. Calculate the divergence of $\\vec{F}$:
   $$\\nabla \\cdot \\vec{F} = \\frac{\\partial(2x)}{\\partial x} + \\frac{\\partial(3y)}{\\partial y}$$
3. Perform the differentiation:
   $$\\nabla \\cdot \\vec{F} = 2 + 3 = 5$$
4. **Evaluate flux conservation**:
   Since $\\nabla \\cdot \\vec{F} = 5 \\neq 0$, the vector field is **not** flux-conserving.
5. **Physical Interpretation**:
   A constant positive divergence of 5 indicates that every unit volume in space acts as a continuous source of flux, generating 5 units of field lines per unit volume.

---

# Why This Step Works
* Divergence represents the net outward flux per unit volume. A positive value means there is a net expansion (source), whereas a negative value would mean compression (sink).

---

# Formula Used
* Divergence: $\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y}$

---

# Similar Patterns to Remember
* Velocity field of an expanding gas.
* Electric field of a uniform volume charge density.

---

# Common Mistakes
* Leaving unit vectors in the divergence expression: writing $\\nabla \\cdot \\vec{F} = 2\\hat{i} + 3\\hat{j}$ (divergence must be a scalar).
* Saying flux is conserved because the divergence is constant.

---

# Final Answer
$$\\boxed{\\nabla \\cdot \\vec{F} = 5, \\quad \\text{Flux is not conserved (contains sources).}}$$

---

# 10-Second Revision Notes
✓ $F_x = 2x \\implies \\partial_x F_x = 2$.
✓ $F_y = 3y \\implies \\partial_y F_y = 3$.
✓ Divergence $= 2 + 3 = 5$.
✓ Divergence $\\neq 0 \\implies$ Not solenoidal.

---

# Memory Trick
"If divergence is positive, field lines are born here (source)."

---

# Exam Confidence Booster
The divergence of any linear scaling vector field is simply the sum of its scale coordinates. Calculate in 2 seconds!"""

# Question 45
ANSWERS[45] = """# Question
In an electrostatic field, potential $V(x,y,z) = xyz$. Compute gradient and evaluate directional derivative at $(1,1,1)$ along $\\hat i + \\hat j + \\hat k$. Interpret physical meaning.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Gradient and Directional Derivative
* **Why Applicable**: The gradient $\\nabla V$ represents the rate and direction of maximum spatial change of a scalar field. The directional derivative projects this change along a specific unit direction vector.

---

# Pattern Recognition Trick
* Potential: $V = xyz$
* Gradient at $(1,1,1)$: $\\nabla V = [yz, xz, xy] \\to [1, 1, 1]$.
* Direction: $\\vec{u} = [1, 1, 1]$. Since this matches the gradient direction, the directional derivative will equal the maximum rate of change.

---

# Shortcut / Exam Trick
If the gradient vector $\\nabla V$ is parallel to the direction vector $\\vec{d}$, the directional derivative is simply the magnitude of the gradient:
$$\\text{DD}_{max} = |\\nabla V| = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}$$

---

# Step-by-Step Solution
1. Find the gradient of $V(x,y,z) = xyz$:
   $$\\nabla V = \\frac{\\partial(xyz)}{\\partial x}\\hat{i} + \\frac{\\partial(xyz)}{\\partial y}\\hat{j} + \\frac{\\partial(xyz)}{\\partial z}\\hat{k} = yz\\hat{i} + xz\\hat{j} + xy\\hat{k}$$
2. Evaluate the gradient at point $(1,1,1)$:
   $$\\nabla V(1,1,1) = (1)(1)\\hat{i} + (1)(1)\\hat{j} + (1)(1)\\hat{k} = \\hat{i} + \\hat{j} + \\hat{k}$$
3. Define the direction vector $\\vec{d}$ and normalize it to a unit vector $\\hat{u}$:
   $$\\vec{d} = \\hat{i} + \\hat{j} + \\hat{k}$$
   $$|\\vec{d}| = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}$$
   $$\\hat{u} = \\frac{\\vec{d}}{|\\vec{d}|} = \\frac{\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}$$
4. Compute the directional derivative (dot product of gradient and unit direction vector):
   $$\\text{DD} = \\nabla V \\cdot \\hat{u} = (\\hat{i} + \\hat{j} + \\hat{k}) \\cdot \\left(\\frac{\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}\\right)$$
   $$\\text{DD} = \\frac{1(1) + 1(1) + 1(1)}{\\sqrt{3}} = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$$
5. **Physical Interpretation**:
   The directional derivative represents the rate of change of electrical potential per unit distance in the direction of the vector $\\hat{i} + \\hat{j} + \\hat{k}$. Since the direction matches the gradient, $\\sqrt{3}$ is the maximum possible rate of potential change at this point.

---

# Why This Step Works
* Normalizing the direction vector is necessary to isolate pure spatial rate of change. The dot product yields the projection of the gradient in that direction.

---

# Formula Used
* Gradient: $\\nabla V = \\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}$
* Directional Derivative: $D_{\\hat{u}}V = \\nabla V \\cdot \\hat{u}$

---

# Similar Patterns to Remember
* Finding the rate of temperature change of a drone flying in a specific direction.
* Steepest ascent on a topographic surface.

---

# Common Mistakes
* Doing the dot product with the non-normalized vector $\\vec{d} = \\hat{i} + \\hat{j} + \\hat{k}$ (yielding $3$ instead of $\\sqrt{3}$).
* Confusing gradient (a vector) with directional derivative (a scalar).

---

# Final Answer
$$\\boxed{\\nabla V = yz\\hat{i} + xz\\hat{j} + xy\\hat{k}, \\quad \\text{Directional Derivative} = \\sqrt{3}}$$

---

# 10-Second Revision Notes
✓ Gradient at $(1,1,1) = \\hat{i} + \\hat{j} + \\hat{k}$.
✓ Unit direction vector $= (\\hat{i} + \\hat{j} + \\hat{k})/\\sqrt{3}$.
✓ Dot product $= 3/\\sqrt{3} = \\sqrt{3}$.
✓ Direction is parallel to gradient $\\implies$ Maximum rate of change.

---

# Memory Trick
"Always divide the direction vector by its length before dotted-producting with the gradient."

---

# Exam Confidence Booster
When the direction matches the gradient direction, the answer is always the magnitude of the gradient. Solve in 10 seconds!"""

# Question 46
ANSWERS[46] = """# Question
In a fluid mixing system, velocity field is $\\vec F = y\\hat i - x\\hat j$. Compute curl and analyze whether the flow is rotational. Interpret its impact on mixing efficiency.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Curl of a Vector Field
* **Why Applicable**: Curl measures the rotation density or vorticity of a vector field. If $\\nabla \\times \\vec{F} \\neq 0$, the flow is rotational, indicating fluid elements rotate as they move.

---

# Pattern Recognition Trick
Identify:
* $\\vec{F} = y\\hat{i} - x\\hat{j}$
* This is a standard vortex rotation field.
* Curl should be negative along the z-axis (clockwise rotation):
  $$\\frac{\\partial(-x)}{\\partial x} - \\frac{\\partial(y)}{\\partial y} = -1 - 1 = -2\\hat{k}$$

---

# Shortcut / Exam Trick
For 2D field $\\vec{F} = P\\hat{i} + Q\\hat{j}$, the curl is always:
$$\\text{Curl} = \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)\\hat{k}$$
Here, $\\frac{\\partial(-x)}{\\partial x} - \\frac{\\partial(y)}{\\partial y} = -1 - 1 = -2 \\implies \\text{Curl} = -2\\hat{k}$.

---

# Step-by-Step Solution
1. Write the vector field components:
   $$F_x = y, \\quad F_y = -x, \\quad F_z = 0$$
2. Set up the curl determinant:
   $$\\nabla \\times \\vec{F} = \\left| \\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ y & -x & 0 \\end{matrix} \\right|$$
3. Expand the determinant:
   $$\\nabla \\times \\vec{F} = \\hat{i}\\left(0 - 0\\right) - \\hat{j}\\left(0 - 0\\right) + \\hat{k}\\left(\\frac{\\partial(-x)}{\\partial x} - \\frac{\\partial(y)}{\\partial y}\\right)$$
4. Compute the derivatives:
   $$\\nabla \\times \\vec{F} = \\hat{k}(-1 - 1) = -2\\hat{k}$$
5. **Flow and Mixing Analysis**:
   * Since $\\nabla \\times \\vec{F} = -2\\hat{k} \\neq 0$, the flow is **rotational** (vortical).
   * **Mixing Impact**: Rotational flow creates shear forces and circular paths. This prevents stagnant laminar layers and significantly enhances fluid mixing efficiency in chemical reactors.

---

# Why This Step Works
* The curl operation determines the angular velocity vector of fluid elements. A non-zero value mathematically proves the presence of rotation.

---

# Formula Used
* Curl: $\\nabla \\times \\vec{F} = \\left(\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z}\\right)\\hat{i} + \\left(\\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x}\\right)\\hat{j} + \\left(\\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y}\\right)\\hat{k}$

---

# Similar Patterns to Remember
* Rigid body rotation: $\\vec{v} = \\vec{\\omega} \\times \\vec{r} \\implies \\nabla \\times \\vec{v} = 2\\vec{\\omega}$.
* Irrotational flow: $\\vec{F} = x\\hat{i} + y\\hat{j} \\implies \\nabla \\times \\vec{F} = 0$.

---

# Common Mistakes
* Dropping the unit vector $\\hat{k}$ (curl must be a vector quantity).
* Getting the sign wrong by subtracting the wrong way: $\\frac{\\partial P}{\\partial y} - \\frac{\\partial Q}{\\partial x} = 1 - (-1) = 2\\hat{k}$ (incorrect order).

---

# Final Answer
$$\\boxed{\\nabla \\times \\vec{F} = -2\\hat{k}, \\quad \\text{Flow is rotational, which increases mixing efficiency.}}$$

---

# 10-Second Revision Notes
✓ Field: $\\vec{F} = [y, -x, 0]$.
✓ Curl component along z: $\\partial_x(-x) - \\partial_y(y) = -1 - 1 = -2$.
✓ Vector result: $-2\\hat{k}$.
✓ Non-zero curl $\\implies$ Rotational.

---

# Memory Trick
"A field of form $(y, -x)$ swirls clockwise around the drain ($-z$ direction)."

---

# Exam Confidence Booster
Memorize the curl of the vortex field $(y, -x)$ as $-2\\hat{k}$. It appears frequently in exam questions and can be answered instantly!"""

# Question 47
ANSWERS[47] = """# Question
In an electric vehicle battery system, temperature distribution is modeled by $T(x,y,z) = x^2 + y^2 + z^2$. Compute the gradient and evaluate the direction of maximum temperature rise at point $(1,1,1)$. Interpret its physical significance for thermal management and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Gradient of a Scalar Field
* **Why Applicable**: The gradient vector $\\nabla T$ points in the direction of the greatest rate of increase of a scalar field, and its magnitude represents that maximum rate of increase.

---

# Pattern Recognition Trick
* Scalar function: $T = x^2 + y^2 + z^2$ (concentric spheres of temperature).
* Gradient: $\\nabla T = 2x\\hat{i} + 2y\\hat{j} + 2z\\hat{k}$.
* At $(1,1,1)$: $\\nabla T = 2\\hat{i} + 2\\hat{j} + 2\\hat{k}$.
* Direction is the normalized gradient vector: $\\frac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} + \\hat{k})$.

---

# Shortcut / Exam Trick
For symmetric function $f = r^2 = x^2+y^2+z^2$, the gradient is always:
$$\\nabla (r^2) = 2\\vec{r}$$
At point $(1,1,1)$, $\\vec{r} = \\hat{i} + \\hat{j} + \\hat{k}$, so $\\nabla T = 2(\\hat{i} + \\hat{j} + \\hat{k})$.
The unit direction is simply the normalized coordinate vector!

---

# Step-by-Step Solution
1. Find the partial derivatives of $T(x,y,z) = x^2 + y^2 + z^2$:
   $$\\frac{\\partial T}{\\partial x} = 2x, \\quad \\frac{\\partial T}{\\partial y} = 2y, \\quad \\frac{\\partial T}{\\partial z} = 2z$$
2. Construct the gradient vector $\\nabla T$:
   $$\\nabla T = 2x\\hat{i} + 2y\\hat{j} + 2z\\hat{k}$$
3. Evaluate the gradient at the point $(1,1,1)$:
   $$\\nabla T(1,1,1) = 2\\hat{i} + 2\\hat{j} + 2\\hat{k}$$
4. Determine the direction of maximum temperature rise (normalize the gradient):
   $$|\\nabla T| = \\sqrt{2^2 + 2^2 + 2^2} = \\sqrt{12} = 2\\sqrt{3}$$
   $$\\text{Direction } \\hat{u} = \\frac{\\nabla T}{|\\nabla T|} = \\frac{2\\hat{i} + 2\\hat{j} + 2\\hat{k}}{2\\sqrt{3}} = \\frac{\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}$$
5. **Physical Interpretation for Thermal Management**:
   * Heat naturally flows from hot to cold (Fourier's Law: $\\vec{q} = -k\\nabla T$).
   * Therefore, heat flows in the direction of the negative gradient: $-(\\hat{i} + \\hat{j} + \\hat{k})$.
   * To maximize cooling, the battery pack's cooling channels or heat sinks must be aligned opposite to the temperature gradient (directing heat outward from the hot core $(1,1,1)$).

---

# Why This Step Works
* The gradient points directly outward from the origin because $T=r^2$ is spherically symmetric. Normalizing the gradient gives the exact direction vector.

---

# Formula Used
* Gradient: $\\nabla T = \\frac{\\partial T}{\\partial x}\\hat{i} + \\frac{\\partial T}{\\partial y}\\hat{j} + \\frac{\\partial T}{\\partial z}\\hat{k}$
* Unit direction vector: $\\hat{u} = \\frac{\\vec{v}}{|\\vec{v}|}$

---

# Similar Patterns to Remember
* Gradient of electrostatic potential giving electric field: $\\vec{E} = -\\nabla V$.
* Fluid flowing down a pressure gradient.

---

# Common Mistakes
* Leaving the gradient as a scalar value (e.g., adding components: $2x+2y+2z$).
* Stating that heat flows in the direction of the positive gradient.

---

# Final Answer
$$\\boxed{\\nabla T = 2\\hat{i} + 2\\hat{j} + 2\\hat{k}, \\quad \\text{Direction} = \\frac{\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}, \\quad \\text{Heat flows along } -\\frac{\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}}$$

---

# 10-Second Revision Notes
✓ Gradient of $x^2+y^2+z^2$ is $2[x,y,z]$.
✓ At $(1,1,1)$, $\\nabla T = 2[1,1,1]$.
✓ Direction is normalized: $[1,1,1]/\\sqrt{3}$.
✓ Cooling must follow the opposite direction (negative gradient).

---

# Memory Trick
"The gradient points to the summit (max rise); heat runs away from the summit (negative gradient)."

---

# Exam Confidence Booster
For radial functions like $r^2$, the gradient direction is always the unit radial vector $\\hat{r}$. Solve conceptually in 5 seconds!"""

# Question 48
ANSWERS[48] = """# Question
In an electromagnetic system, field $\\vec F = 2x\\hat i + 3y\\hat j + 4z\\hat k$. Compute curl and evaluate whether the field is conservative. Justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Conservative Vector Fields / Curl
* **Why Applicable**: A vector field is conservative if and only if its curl is zero everywhere ($\\nabla \\times \\vec{F} = 0$). This indicates that path integrals of the field are path-independent.

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
Any decoupled vector field of the form $\\vec{F} = f(x)\\hat{i} + g(y)\\hat{j} + h(z)\\hat{k}$ has a curl of exactly $0$ and is always conservative.
Here, components are $2x$, $3y$, $4z \\implies$ Decoupled $\\implies$ Conservative!

---

# Step-by-Step Solution
1. Identify components of $\\vec{F}$:
   $$F_x = 2x, \\quad F_y = 3y, \\quad F_z = 4z$$
2. Set up the curl determinant:
   $$\\nabla \\times \\vec{F} = \\left| \\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ 2x & 3y & 4z \\end{matrix} \\right|$$
3. Expand components:
   * $\\hat{i}$ component: $\\frac{\\partial(4z)}{\\partial y} - \\frac{\\partial(3y)}{\\partial z} = 0 - 0 = 0$
   * $\\hat{j}$ component: $\\frac{\\partial(2x)}{\\partial z} - \\frac{\\partial(4z)}{\\partial x} = 0 - 0 = 0$
   * $\\hat{k}$ component: $\\frac{\\partial(3y)}{\\partial x} - \\frac{\\partial(2x)}{\\partial y} = 0 - 0 = 0$
4. Combine terms:
   $$\\nabla \\times \\vec{F} = 0\\hat{i} + 0\\hat{j} + 0\\hat{k} = \\vec{0}$$
5. **Justify conservativeness**:
   Since the curl is the zero vector, the field is irrotational. In a simply connected domain, an irrotational field is a **conservative vector field**.

---

# Why This Step Works
* Zero curl implies that the line integral around any closed loop is zero ($\\oint \\vec{F} \\cdot d\\vec{r} = 0$), which is the definition of a conservative field.

---

# Formula Used
* Curl: $\\nabla \\times \\vec{F} = \\vec{0} \\implies$ Conservative field.

---

# Similar Patterns to Remember
* Gravitational field: $\\vec{g} = -\\nabla V \\implies \\nabla \\times \\vec{g} = 0$.
* Electrostatic field: $\\nabla \\times \\vec{E} = 0$.

---

# Common Mistakes
* Writing the scalar 0 instead of the zero vector $\\vec{0}$ (curl output must be a vector).
* Confusing divergence and curl (using dot product instead of cross product).

---

# Final Answer
$$\\boxed{\\nabla \\times \\vec{F} = \\vec{0}, \\quad \\text{The field is conservative.}}$$

---

# 10-Second Revision Notes
✓ Components are decoupled: $F_x(x)$, $F_y(y)$, $F_z(z)$.
✓ No cross-variable terms.
✓ Curl is immediately $\\vec{0}$.
✓ Therefore, field is conservative.

---

# Memory Trick
"If variables don't mix between components, there is no twist (curl is zero)."

---

# Exam Confidence Booster
Recognizing decoupled components lets you bypass the entire determinant expansion and state that the field is conservative in 5 seconds!"""

# Question 49
ANSWERS[49] = """# Question
A robot follows path $\\vec r(t) = t\\hat i + t^2\\hat j$. Determine velocity vector and interpret motion.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Velocity Vector
* **Why Applicable**: The velocity vector is the first derivative of the position vector with respect to time: $\\vec{v}(t) = \\frac{d\\vec{r}}{dt}$.

---

# Pattern Recognition Trick
* Position: $\\vec{r}(t) = t\\hat{i} + t^2\\hat{j}$
* Differentiate once:
  $$\\vec{v}(t) = \\hat{i} + 2t\\hat{j}$$
* Horizontal speed is constant (1), vertical speed grows linearly with time ($2t$).

---

# Shortcut / Exam Trick
For $\\vec{r}(t) = t^a\\hat{i} + t^b\\hat{j}$, velocity is always:
$$\\vec{v}(t) = a t^{a-1}\\hat{i} + b t^{b-1}\\hat{j}$$
Here $a=1, b=2 \\implies \\vec{v}(t) = \\hat{i} + 2t\\hat{j}$.

---

# Step-by-Step Solution
1. Write the position vector:
   $$\\vec{r}(t) = t\\hat{i} + t^2\\hat{j}$$
2. Differentiate each component with respect to time $t$:
   $$\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = \\frac{d}{dt}(t)\\hat{i} + \\frac{d}{dt}(t^2)\\hat{j}$$
3. Compute the derivatives:
   $$\\vec{v}(t) = \\hat{i} + 2t\\hat{j}$$
4. **Motion Interpretation**:
   * The robot travels with a constant speed of 1 unit/s along the x-axis.
   * The robot accelerates along the y-axis, with its vertical speed increasing linearly as $2t$.
   * The path is a parabola ($y = x^2$).

---

# Why This Step Works
* The derivative of position represents the instantaneous rate of change of coordinates, which forms the velocity vector.

---

# Formula Used
* Velocity: $\\vec{v}(t) = \\frac{d\\vec{r}}{dt}$

---

# Similar Patterns to Remember
* Projectile motion trajectory analysis.
* Drones tracking parabolic flight paths.

---

# Common Mistakes
* Leaving the unit vectors out: writing $\\vec{v}(t) = 1 + 2t$ (velocity must be a vector).
* Integrating instead of differentiating.

---

# Final Answer
$$\\boxed{\\vec{v}(t) = \\hat{i} + 2t\\hat{j}, \\quad \\text{Motion is parabolic with constant horizontal speed and linear vertical acceleration.}}$$

---

# 10-Second Revision Notes
✓ Differentiate position components: $t \\to 1$ and $t^2 \\to 2t$.
✓ Velocity $\\vec{v}(t) = \\hat{i} + 2t\\hat{j}$.
✓ Path shape is parabolic.

---

# Memory Trick
"Velocity is the first step of change from position."

---

# Exam Confidence Booster
Simple polynomial derivatives make this question solvable in under 5 seconds!"""

# Question 50
ANSWERS[50] = """# Question
Differentiate scalar and vector line integrals.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals
* **Why Applicable**: Line integrals can be performed on either scalar fields or vector fields. The differential element and physical meaning differ between the two.

---

# Pattern Recognition Trick
* Scalar Line Integral: $\\int_C f \\, ds$ (integrates a number field over a path length).
* Vector Line Integral: $\\int_C \\vec{F} \\cdot d\\vec{r}$ (integrates the projection of a force along the direction of the path).

---

# Shortcut / Exam Trick
* Scalar: Integrand is a scalar $f$, differential is scalar arc length $ds$. Result is scalar (e.g., mass of a wire).
* Vector: Integrand is a vector $\\vec{F}$, differential is vector displacement $d\\vec{r}$. Result is scalar (e.g., work done).

---

# Step-by-Step Solution
1. **Scalar Line Integral**:
   * Formulation: $\\int_C f(x,y,z) \\, ds$
   * Here, $ds = |\\vec{r}'(t)| \\, dt$ is the scalar arc length element.
   * Physical Meaning: Represents the accumulation of a scalar quantity along a curve (e.g., finding the total mass of a thin wire with variable density $f$).
2. **Vector Line Integral**:
   * Formulation: $\\int_C \\vec{F} \\cdot d\\vec{r} = \\int_C \\vec{F} \\cdot \\hat{T} \\, ds$
   * Here, $d\\vec{r} = \\vec{r}'(t) \\, dt$ is the vector displacement element.
   * Physical Meaning: Represents the projection of the vector field $\\vec{F}$ along the path direction (e.g., calculating the work done by a force field on a particle moving along curve $C$).
3. Compare the outputs: Both return scalar values, but the integrand for vector integration is a dot product.

---

# Why This Step Works
* Distinguishing between scalar arc length elements ($ds$) and vector displacement elements ($d\\vec{r}$) defines how we parameterize and evaluate the path.

---

# Formula Used
* Scalar: $\\int_C f \\, ds = \\int_a^b f(\\vec{r}(t)) |\\vec{r}'(t)| \\, dt$
* Vector: $\\int_C \\vec{F} \\cdot d\\vec{r} = \\int_a^b \\vec{F}(\\vec{r}(t)) \\cdot \\vec{r}'(t) \\, dt$

---

# Similar Patterns to Remember
* Scalar surface integrals (area/mass) vs. Vector surface integrals (flux).

---

# Common Mistakes
* Forgetting the dot product in the vector line integral, treating it as a simple multiplication.
* Omitting the speed factor $|\\vec{r}'(t)|$ when converting $ds$ to $dt$ in scalar line integrals.

---

# Final Answer
$$\\boxed{\\text{Scalar Line Integral } \\int_C f \\, ds \\text{ integrates a scalar field over arc length; Vector Line Integral } \\int_C \\vec{F} \\cdot d\\vec{r} \\text{ projects and integrates a vector field.}}$$

---

# 10-Second Revision Notes
✓ Scalar: $\\int f \\, ds$, uses speed $|\\vec{r}'(t)|$, measures mass/length.
✓ Vector: $\\int \\vec{F} \\cdot d\\vec{r}$, uses velocity dot product, measures work/circulation.

---

# Memory Trick
"Scalar sums along the path length ($ds$); vector projects along the path direction ($d\\vec{r}$)."

---

# Exam Confidence Booster
Understanding the differential elements ($ds$ vs $d\\vec{r}$) allows you to set up integration variables correctly in exams without hesitation."""

# Question 51
ANSWERS[51] = """# Question
In a heat flow system, $\\vec F = (x+y)\\hat i + (x-y)\\hat j$. Analyze the integrand in Green's theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Green's Theorem in a Plane
* **Why Applicable**: Green's theorem relates a line integral around a closed curve to a double integral over the enclosed region: $\\oint_C P\\,dx + Q\\,dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA$.

---

# Pattern Recognition Trick
Identify:
* $P = x + y$
* $Q = x - y$
* Integrand: $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$
* Compute derivatives: $\\partial_x(x-y) = 1$, $\\partial_y(x+y) = 1$.
* Difference: $1 - 1 = 0$.

---

# Shortcut / Exam Trick
If $P = x + y$ and $Q = x - y$:
* Since the cross-derivatives are equal ($\\frac{\\partial Q}{\\partial x} = \\frac{\\partial P}{\\partial y} = 1$), the integrand is zero.
* This means the line integral around any closed loop in this field is exactly $0$.

---

# Step-by-Step Solution
1. Identify the components from the vector field $\\vec{F} = P\\hat{i} + Q\\hat{j}$:
   $$P(x,y) = x + y$$
   $$Q(x,y) = x - y$$
2. State the integrand of the double integral in Green's Theorem:
   $$\\text{Integrand} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$$
3. Calculate the partial derivatives:
   $$\\frac{\\partial Q}{\\partial x} = \\frac{\\partial(x-y)}{\\partial x} = 1$$
   $$\\frac{\\partial P}{\\partial y} = \\frac{\\partial(x+y)}{\\partial y} = 1$$
4. Subtract the partial derivatives:
   $$\\text{Integrand} = 1 - 1 = 0$$
5. **Analyze the result**:
   An integrand of 0 means the double integral over any region $D$ is zero, indicating that the flow of heat is conservative in this region.

---

# Why This Step Works
* Evaluating the difference between cross-derivatives checks the local rotational density. A difference of zero indicates an irrotational field.

---

# Formula Used
* Green's Theorem Integrand: $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$

---

# Similar Patterns to Remember
* $\\vec{F} = y\\hat{i} + x\\hat{j} \\implies \\text{Integrand} = 1 - 1 = 0$ (Conservative).
* $\\vec{F} = -y\\hat{i} + x\\hat{j} \\implies \\text{Integrand} = 1 - (-1) = 2$.

---

# Common Mistakes
* Subtracting in the wrong order: calculating $\\frac{\\partial P}{\\partial y} - \\frac{\\partial Q}{\\partial x}$.
* Forgetting to take the partial derivatives and instead just subtracting the functions directly.

---

# Final Answer
$$\\boxed{\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 0}$$

---

# 10-Second Revision Notes
✓ $P = x+y \\implies \\partial_y P = 1$.
✓ $Q = x-y \\implies \\partial_x Q = 1$.
✓ Integrand $= 1 - 1 = 0$.
✓ Line integral around any closed loop is $0$.

---

# Memory Trick
"If cross-rates are equal, the field is stable and loop work is zero."

---

# Exam Confidence Booster
Spotting symmetric coefficients (both cross derivatives equal to 1) lets you declare the double integral integrand as 0 instantly!"""

# Question 52
ANSWERS[52] = """# Question
In a circulation model, what does a positive value of $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$ indicate?

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Circulation and Curl (Green's Theorem)
* **Why Applicable**: The term $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$ represents the z-component of curl in 2D space, which measures local rotation density.

---

# Pattern Recognition Trick
* Value $> 0 \\implies$ Positive rotation.
* In mathematics, positive rotation is defined as counterclockwise (CCW).
* Therefore, a positive value indicates counterclockwise circulation density.

---

# Shortcut / Exam Trick
* $\\text{Curl}_z > 0 \\implies$ Counterclockwise (CCW) rotation.
* $\\text{Curl}_z < 0 \\implies$ Clockwise (CW) rotation.
* $\\text{Curl}_z = 0 \\implies$ Irrotational (no net spin).

---

# Step-by-Step Solution
1. Identify the mathematical term:
   $$\\text{Circulation Density} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$$
2. Connect to Green's Theorem:
   This term is the integrand of the double integral representing net circulation:
   $$\\oint_C P\\,dx + Q\\,dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA$$
3. Interpret a positive value:
   * A positive result means that the micro-rotations of the fluid within the region are counterclockwise.
   * If you place a tiny paddle wheel in this fluid field, it will spin in a counterclockwise direction.
4. **Physical Application**: Used in meteorology to identify low-pressure systems (cyclonic rotation is counterclockwise in the Northern Hemisphere).

---

# Why This Step Works
* Defining rotation relative to the positive z-axis establishes the counterclockwise direction as positive via the Right-Hand Rule.

---

# Formula Used
* 2D Curl: $\\text{curl}_z \\vec{F} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$

---

# Similar Patterns to Remember
* CCW circulation in fluid vortices.
* Positive magnetic fields generated by CCW currents (Ampere's Law).

---

# Common Mistakes
* Interpreting positive as clockwise rotation (clockwise is negative in standard polar coordinates).
* Thinking it represents linear flow velocity rather than rotational speed.

---

# Final Answer
$$\\boxed{\\text{A positive value indicates counterclockwise (CCW) circulation density (vorticity).}}$$

---

# 10-Second Revision Notes
✓ $\\partial_x Q - \\partial_y P$ is circulation density.
✓ Positive sign ($> 0$) $\\implies$ Counterclockwise rotation.
✓ Right-Hand Rule standard.

---

# Memory Trick
"Counter-clockwise is positive in math, just like on the unit circle."

---

# Exam Confidence Booster
Remember that standard angles grow CCW (+) and decay CW (-). This maps directly to vector curl signs!"""

# Question 53
ANSWERS[53] = """# Question
A force field acts on a particle moving along a curve. Analyze and interpret the physical meaning of the line integral.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals of Vector Fields
* **Why Applicable**: The integral of a force vector field $\\vec{F}$ along a directed curve $C$ is formulated as $\\int_C \\vec{F} \\cdot d\\vec{r}$.

---

# Pattern Recognition Trick
Identify components:
* Field: $\\vec{F}$ (Force)
* Path: $C$
* Integral: $\\int_C \\vec{F} \\cdot d\\vec{r}$
* This matches the physical definition of **Work Done**.

---

# Shortcut / Exam Trick
* If $\\vec{F}$ is perpendicular to path displacement everywhere $\\implies$ Work Done $= 0$.
* If $\\vec{F}$ is in the direction of path displacement everywhere $\\implies$ Work Done is positive.
* If $\\vec{F}$ is conservative and path is closed $\\implies$ Work Done $= 0$.

---

# Step-by-Step Solution
1. Write the vector line integral formula:
   $$W = \\int_C \\vec{F} \\cdot d\\vec{r}$$
2. Expand the dot product using the unit tangent vector $\\hat{T}$:
   $$W = \\int_C (\\vec{F} \\cdot \\hat{T}) \\, ds$$
   Here, $\\vec{F} \\cdot \\hat{T}$ is the tangential component of the force along the path.
3. Interpret the physical terms:
   * $d\\vec{r}$ represents a tiny displacement vector along the curve.
   * $\\vec{F} \\cdot d\\vec{r}$ represents the work done by the field during this tiny displacement.
   * The integral sums these small work elements over the entire path $C$.
4. **Conclusion**:
   The line integral represents the **total work done** by the force field on the particle as it moves along path $C$.

---

# Why This Step Works
* Multiplying the force component in the direction of motion by the displacement distance yields the mechanical work performed by the field.

---

# Formula Used
* Work Formula: $W = \\int_C \\vec{F} \\cdot d\\vec{r}$

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
$$\\boxed{\\text{The line integral } \\int_C \\vec{F} \\cdot d\\vec{r} \\text{ represents the total work done by the force field on the particle along the curve.}}$$

---

# 10-Second Revision Notes
✓ Integral: $\\int \\vec{F} \\cdot d\\vec{r}$.
✓ Force $\\cdot$ Displacement $=$ Work.
✓ Result is a scalar quantity.
✓ Path dependent unless field is conservative.

---

# Memory Trick
"Force along a path does Work."

---

# Exam Confidence Booster
Recognizing this as the work integral helps you solve physical word problems by setting up a standard vector line integral directly."""

# Question 54
ANSWERS[54] = """# Question
Define path independence in engineering systems.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Conservative Fields & Path Independence
* **Why Applicable**: In many physical systems, the energy required to move between two states should not depend on how the system transitions, only on the start and endpoints.

---

# Pattern Recognition Trick
* Path Independence $\\implies \\int_{C_1} \\vec{F} \\cdot d\\vec{r} = \\int_{C_2} \\vec{F} \\cdot d\\vec{r}$ for any two curves $C_1, C_2$ connecting point A to point B.
* Equivalent condition: Curl $\\nabla \\times \\vec{F} = 0$ (field is conservative).

---

# Shortcut / Exam Trick
A line integral is path independent if the integrand $\\vec{F} \\cdot d\\vec{r} = P\\,dx + Q\\,dy + R\\,dz$ is an exact differential:
$$P\\,dx + Q\\,dy + R\\,dz = d\\phi$$
where $\\phi$ is the potential function.
If this holds:
$$\\int_A^B \\vec{F} \\cdot d\\vec{r} = \\phi(B) - \\phi(A)$$

---

# Step-by-Step Solution
1. Define Path Independence:
   A line integral of a vector field $\\vec{F}$ is independent of path if the value of the integral is the same for all paths connecting the same start point $A$ and end point $B$.
2. State the mathematical conditions:
   Path independence is equivalent to:
   * The vector field $\\vec{F}$ is conservative ($\\vec{F} = \\nabla \\phi$ for a scalar potential $\\phi$).
   * The curl of the field is zero: $\\nabla \\times \\vec{F} = \\vec{0}$.
   * The line integral around any closed loop is zero: $\\oint_C \\vec{F} \\cdot d\\vec{r} = 0$.
3. **Engineering Relevance**:
   * **Thermodynamics**: State functions (like internal energy, enthalpy, entropy) are path independent.
   * **Power Systems**: Gravity and electrostatic fields are conservative, meaning energy loss/gain is independent of the route taken.

---

# Why This Step Works
* Linking path independence to exact differentials allows calculations to bypass path parameterization entirely by using the potential function difference.

---

# Formula Used
* Fundamental Theorem of Line Integrals: $\\int_A^B \\nabla \\phi \\cdot d\\vec{r} = \\phi(B) - \\phi(A)$

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
$$\\boxed{\\text{Path independence means } \\int_A^B \\vec{F} \\cdot d\\vec{r} \\text{ depends only on endpoints } A \\text{ and } B, \\text{ requiring } \\vec{F} = \\nabla \\phi.}}$$

---

# 10-Second Revision Notes
✓ Path independent $\\implies \\nabla \\times \\vec{F} = \\vec{0}$.
✓ Integration formula: $\\phi(B) - \\phi(A)$.
✓ Closed loop value: $\\oint \\vec{F} \\cdot d\\vec{r} = 0$.
✓ Applies to conservative fields.

---

# Memory Trick
"Only the start and finish matter when you are conservative."

---

# Exam Confidence Booster
If you verify $\\text{curl } \\vec{F} = 0$, you can integrate using the potential difference, saving minutes of path integration!"""

# Question 55
ANSWERS[55] = """# Question
In a fluid flow model, $\\vec F = y\\hat i + x\\hat j$. Use Green's theorem to compute $\\frac{Q}{\\partial x} - \\frac{P}{\\partial y}$ and interpret its meaning.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Green's Theorem / Vorticity
* **Why Applicable**: We are asked to evaluate the difference of cross-derivatives $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$ (integrand of Green's theorem) for a 2D velocity field.

---

# Pattern Recognition Trick
Identify:
* $P = y$
* $Q = x$
* Cross derivatives: $\\partial_x Q = 1$, $\\partial_y P = 1$.
* Difference: $1 - 1 = 0$.

---

# Shortcut / Exam Trick
For $\\vec{F} = y\\hat{i} + x\\hat{j}$:
* The field is of the form $\\nabla(xy)$.
* Since it is a gradient of a scalar function, it is conservative.
* The curl (and thus $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$) of any gradient field is always $0$.

---

# Step-by-Step Solution
1. Identify the component functions from $\\vec{F} = P\\hat{i} + Q\\hat{j}$:
   $$P(x,y) = y, \\quad Q(x,y) = x$$
2. Write the cross-derivative expression:
   $$\\text{Integrand} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$$
3. Compute the derivatives:
   $$\\frac{\\partial Q}{\\partial x} = \\frac{\\partial(x)}{\\partial x} = 1$$
   $$\\frac{\\partial P}{\\partial y} = \\frac{\\partial(y)}{\\partial y} = 1$$
4. Subtract to find the value:
   $$\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 1 - 1 = 0$$
5. **Physical Interpretation**:
   A value of 0 means the flow is **irrotational** (vorticity is zero). There are no local circular currents or vortices in this fluid field, and the circulation around any closed loop is zero.

---

# Why This Step Works
* Evaluating the difference of cross-derivatives isolates the rotational spin component of the fluid flow, verifying stability.

---

# Formula Used
* 2D Curl: $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 0$

---

# Similar Patterns to Remember
* Electrostatic fields (which are always irrotational).
* Irrotational water flow in a straight channel.

---

# Common Mistakes
* Calculating the derivatives with respect to the wrong variables (e.g. $\\partial_x P = 0$).
* Confusing the result with the divergence ($\\nabla \\cdot \\vec{F} = 0 + 0 = 0$).

---

# Final Answer
$$\\boxed{\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 0, \\quad \\text{Meaning: Flow is irrotational.}}$$

---

# 10-Second Revision Notes
✓ $P = y \\implies \\partial_y P = 1$.
✓ $Q = x \\implies \\partial_x Q = 1$.
✓ Difference $= 1 - 1 = 0$.
✓ Flow is irrotational (zero vorticity).

---

# Memory Trick
"Equal cross-rates mean no spin."

---

# Exam Confidence Booster
Recognizing $\\vec{F} = y\\hat{i} + x\\hat{j}$ as the gradient of $xy$ gives you the answer 0 instantly without any derivative calculations!"""

# Question 56
ANSWERS[56] = """# Question
In a fluid flow system, $\\vec F = (x+y)\\hat i + (2x-y)\\hat j$. Compute $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: 2D Curl / Green's Theorem Integrand
* **Why Applicable**: The question requires computing the local circulation density component $\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$ for a 2D velocity vector field.

---

# Pattern Recognition Trick
Identify:
* $P = x + y \\implies \\frac{\\partial P}{\\partial y} = 1$
* $Q = 2x - y \\implies \\frac{\\partial Q}{\\partial x} = 2$
* Difference: $2 - 1 = 1$.

---

# Shortcut / Exam Trick
For $\\vec{F} = (ax+by)\\hat{i} + (cx+dy)\\hat{j}$, the curl is always:
$$\\text{Curl}_z = c - b$$
Here $c=2, b=1 \\implies \\text{Curl}_z = 2 - 1 = 1$.

---

# Step-by-Step Solution
1. Identify the components of the field $\\vec{F}$:
   $$P(x,y) = x + y$$
   $$Q(x,y) = 2x - y$$
2. Set up the partial derivatives:
   $$\\frac{\\partial Q}{\\partial x} = \\frac{\\partial(2x-y)}{\\partial x}$$
   $$\\frac{\\partial P}{\\partial y} = \\frac{\\partial(x+y)}{\\partial y}$$
3. Compute the derivatives:
   $$\\frac{\\partial Q}{\\partial x} = 2$$
   $$\\frac{\\partial P}{\\partial y} = 1$$
4. Calculate the difference:
   $$\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 2 - 1 = 1$$

---

# Why This Step Works
* Performing partial derivatives isolates the spatial rates of change along the perpendicular coordinates, indicating the shear force.

---

# Formula Used
* 2D Curl: $\\text{curl}_z \\vec{F} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$

---

# Similar Patterns to Remember
* $\\vec{F} = 3y\\hat{i} + 5x\\hat{j} \\implies \\text{Curl}_z = 5 - 3 = 2$
* $\\vec{F} = -2y\\hat{i} + 3x\\hat{j} \\implies \\text{Curl}_z = 3 - (-2) = 5$

---

# Common Mistakes
* Subtracting the other way around: $1 - 2 = -1$.
* Including the variables $x$ or $y$ in the derivatives (e.g. writing $\\partial_x Q = 2x$).

---

# Final Answer
$$\\boxed{\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 1}$$

---

# 10-Second Revision Notes
✓ $P = x+y \\implies \\partial_y P = 1$.
✓ $Q = 2x-y \\implies \\partial_x Q = 2$.
✓ Difference $= 2 - 1 = 1$.
✓ Flow has a constant positive rotation density of 1.

---

# Memory Trick
"Subtract the $y$-derivative of the first term from the $x$-derivative of the second term."

---

# Exam Confidence Booster
The coefficients method ($c-b$) works for all linear vector fields and takes only 2 seconds in exams!"""

# Question 57
ANSWERS[57] = """# Question
Evaluate $\\iint_S \\vec F \\cdot \\hat n \\, ds$ for the heat flux field $\\vec F = x^2\\hat i + yz\\hat j + z^2\\hat k$ where $\\hat n = \\hat j$ and the surface is $y = 1, 0 \\le x \le 2, 0 \\le z \le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are computing the flux of a vector field through a flat surface parallel to the xz-plane. The normal vector $\\hat{n}$ is constant and given.

---

# Pattern Recognition Trick
Identify:
* Normal $\\hat{n} = \\hat{j}$.
* Dot product $\\vec{F} \\cdot \\hat{n} = F_y = yz$.
* On the surface, $y = 1 \\implies \\vec{F} \\cdot \\hat{n} = z$.
* Double integral limits: $x$ from $0$ to $2$, $z$ from $0$ to $1$.

---

# Shortcut / Exam Trick
Since the integrand $yz$ becomes independent of $x$ on $y=1$:
$$\\iint_S z \\, dx \\, dz = \\left(\\int_0^2 dx\\right) \\left(\\int_0^1 z \\, dz\\right) = 2 \\times \\left[\\frac{z^2}{2}\\right]_0^1 = 2 \\times \\frac{1}{2} = 1$$
Decoupling independent variables simplifies integration instantly.

---

# Step-by-Step Solution
1. Write the flux integrand:
   $$\\vec{F} \\cdot \\hat{n} = (x^2\\hat{i} + yz\\hat{j} + z^2\\hat{k}) \\cdot \\hat{j} = yz$$
2. Substitute the surface boundary condition $y = 1$:
   $$\\vec{F} \\cdot \\hat{n}\\Big|_{y=1} = (1)z = z$$
3. Write the double integral over the flat rectangular surface $S$:
   $$\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = \\int_0^1 \\int_0^2 z \\, dx \\, dz$$
4. Integrate with respect to $x$:
   $$\\int_0^2 z \\, dx = z [x]_0^2 = 2z$$
5. Integrate with respect to $z$:
   $$\\int_0^1 2z \\, dz = \\left[z^2\\right]_0^1 = 1^2 - 0^2 = 1$$

---

# Why This Step Works
* Projects the 3D vector field onto the normal direction of the surface, converting the vector flux problem into a simple 2D scalar area integral.

---

# Formula Used
* Flux Integral: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds$

---

# Similar Patterns to Remember
* Fluid flux through a flat membrane.
* Electric flux through a plate.

---

# Common Mistakes
* Integrating the entire vector field without performing the dot product with $\\hat{n} = \\hat{j}$.
* Forgetting to substitute the surface constraint $y=1$ before integrating, leaving $y$ in the integral.

---

# Final Answer
$$\\boxed{\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = 1}$$

---

# 10-Second Revision Notes
✓ $\\vec{F} \\cdot \\hat{j} = yz$.
✓ On $y=1$, integrand $= z$.
✓ Limits: $x \\in [0,2], z \\in [0,1]$.
✓ Integral: $\\int_0^1 z dz \\times \\int_0^2 dx = 0.5 \\times 2 = 1$.

---

# Memory Trick
"Project the vector field onto the flat plate direction first, then integrate over the plate dimensions."

---

# Exam Confidence Booster
By separating the integrals for $x$ and $z$ components, you can compute this in under 15 seconds!"""

# Question 58
ANSWERS[58] = """# Question
In an electromagnetic field, the vector field is $\\vec F = z\\hat i + x\\hat j + y\\hat k$. Determine the circulation around the boundary of the region in the $yz$-plane ($x=0$) bounded by $0 \\le y \\le 1, 0 \\le z \\le 1$ using Stokes' theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Stokes' Theorem
* **Why Applicable**: Stokes' theorem relates the line integral (circulation) around a closed curve to the surface integral of the curl over an enclosed surface: $\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, ds$.

---

# Pattern Recognition Trick
Identify:
* Path boundary lies in the $yz$-plane ($x=0$) $\\implies$ Normal vector $\\hat{n} = \\hat{i}$.
* Enclosed region: unit square in the $yz$-plane.
* Compute curl component along the x-axis: $(\\nabla \\times \\vec{F})_x$.
* Dot product: $(\\nabla \\times \\vec{F}) \\cdot \\hat{n} = (\\nabla \\times \\vec{F})_x$.

---

# Shortcut / Exam Trick
* $\\text{Curl } \\vec{F} = \\hat{i}(\\partial_y y - \\partial_z x) + \\dots = 1\\hat{i} + \\dots$
* Normal $\\hat{n} = \\hat{i}$ (positive x-direction for positive boundary orientation).
* $(\\nabla \\times \\vec{F}) \\cdot \\hat{n} = 1$.
* Integral is simply $1 \\times \\text{Area of square} = 1 \\times 1 = 1$.

---

# Step-by-Step Solution
1. Find the curl of the vector field $\\vec{F} = z\\hat{i} + x\\hat{j} + y\\hat{k}$:
   $$\\nabla \\times \\vec{F} = \\left| \\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ z & x & y \\end{matrix} \\right|$$
   $$= \\hat{i}\\left(\\frac{\\partial y}{\\partial y} - \\frac{\\partial x}{\\partial z}\\right) - \\hat{j}\\left(\\frac{\\partial y}{\\partial x} - \\frac{\\partial z}{\\partial z}\\right) + \\hat{k}\\left(\\frac{\\partial x}{\\partial x} - \\frac{\\partial z}{\\partial y}\\right)$$
   $$= \\hat{i}(1 - 0) - \\hat{j}(0 - 1) + \\hat{k}(1 - 0) = \\hat{i} + \\hat{j} + \\hat{k}$$
2. Identify the normal vector to the surface in the $yz$-plane ($x=0$):
   $$\\hat{n} = \\hat{i}$$
3. Compute the dot product:
   $$(\\nabla \\times \\vec{F}) \\cdot \\hat{n} = (\\hat{i} + \\hat{j} + \\hat{k}) \\cdot \\hat{i} = 1$$
4. Apply Stokes' Theorem:
   $$\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, ds = \\iint_S 1 \\, ds$$
5. Compute the area of the region $S$:
   The surface is a square of dimensions $1 \\times 1$ in the $yz$-plane.
   $$\\text{Area} = \\int_0^1 \\int_0^1 dy \\, dz = 1$$
   $$\\oint_C \\vec{F} \\cdot d\\vec{r} = 1$$

---

# Why This Step Works
* Using Stokes' theorem converts a 4-segment line integral along the boundary of the square into a single double integral over the flat square area.

---

# Formula Used
* Stokes' Theorem: $\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, ds$

---

# Similar Patterns to Remember
* Finding circulation in the xy-plane (normal $\\hat{n} = \\hat{k}$).
* Finding work done around a closed triangular loop in space.

---

# Common Mistakes
* Evaluating the line integral manually over 4 segments (takes too long and is prone to arithmetic errors).
* Choosing the wrong normal vector (e.g. $\\hat{n} = \\hat{j}$ or $\\hat{k}$).

---

# Final Answer
$$\\boxed{\\text{Circulation} = 1}$$

---

# 10-Second Revision Notes
✓ Curl $\\nabla \\times \\vec{F} = \\hat{i} + \\hat{j} + \\hat{k}$.
✓ Surface is in $yz$-plane $\\implies \\hat{n} = \\hat{i}$.
✓ Curl $\\cdot \\hat{n} = 1$.
✓ Integral $=$ Area of region $= 1$.

---

# Memory Trick
"When the curl projection is constant, the circulation is just that constant times the area."

---

# Exam Confidence Booster
Since the projection is 1 and the surface is a unit square, the answer is immediately 1. Solve this in 10 seconds!"""

# Question 59
ANSWERS[59] = """# Question
Evaluate $\\iint_S \\vec F \\cdot \\hat n \\, ds$ for the fluid velocity field $\\vec F = 2xy\\hat i + yz\\hat j + xz\\hat k$ where $\\hat n = \\hat i$ and the surface is $x = 2, 0 \\le y \\le 1, 0 \\le z \\le 2$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are calculating the fluid flux crossing a flat rectangular boundary parallel to the yz-plane, with normal $\\hat{n} = \\hat{i}$.

---

# Pattern Recognition Trick
* Normal: $\\hat{n} = \\hat{i}$.
* Integrand: $\\vec{F} \\cdot \\hat{i} = 2xy$.
* On the boundary, $x = 2 \\implies \\vec{F} \\cdot \\hat{n} = 4y$.
* Limits: $y \\in [0,1]$, $z \\in [0,2]$.

---

# Shortcut / Exam Trick
Since the integrand $4y$ is independent of $z$:
$$\\iint_S 4y \\, dy \\, dz = \\left(\\int_0^2 dz\\right) \\left(\\int_0^1 4y \\, dy\\right) = 2 \\times \\left[2y^2\\right]_0^1 = 2 \\times 2 = 4$$
Quick product decomposition simplifies double integration.

---

# Step-by-Step Solution
1. Compute the dot product $\\vec{F} \\cdot \\hat{n}$:
   $$\\vec{F} \\cdot \\hat{n} = (2xy\\hat{i} + yz\\hat{j} + xz\\hat{k}) \\cdot \\hat{i} = 2xy$$
2. Substitute the surface constraint $x = 2$:
   $$\\vec{F} \\cdot \\hat{n}\\Big|_{x=2} = 2(2)y = 4y$$
3. Write the double integral over the flat rectangular surface $S$:
   $$\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = \\int_0^2 \\int_0^1 4y \\, dy \\, dz$$
4. Integrate with respect to $y$:
   $$\\int_0^1 4y \\, dy = \\left[2y^2\\right]_0^1 = 2$$
5. Integrate the constant result with respect to $z$:
   $$\\int_0^2 2 \\, dz = [2z]_0^2 = 4$$

---

# Why This Step Works
* The dot product projects the velocity field onto the normal vector, extracting the speed perpendicular to the surface. Integrating this projects the total volumetric flow rate.

---

# Formula Used
* Flux: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds$

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
$$\\boxed{\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = 4}$$

---

# 10-Second Revision Notes
✓ $\\vec{F} \\cdot \\hat{i} = 2xy$.
✓ Set $x=2 \\implies$ Integrand $= 4y$.
✓ Limits: $y \\in [0,1], z \\in [0,2]$.
✓ Integral: $2 \\times \\int_0^1 4y dy = 2 \\times 2 = 4$.

---

# Memory Trick
"Find the perpendicular component, apply the constant coordinate value, and integrate over the boundaries."

---

# Exam Confidence Booster
By writing the integral as a product of single integrals, you can complete this calculation mentally in under 10 seconds!"""

# Question 60
ANSWERS[60] = """# Question
In a heat transfer system, the flux field is $\\vec F = xy\\hat i + yz\\hat j + xz\\hat k$. Compute the circulation of heat flow around the boundary of the region in the $xz$-plane ($y=0$) bounded by $0 \\le x \\le 1, 0 \\le z \\le 1$ using Stokes' theorem.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Stokes' Theorem
* **Why Applicable**: We are calculating the circulation (line integral) around a closed path in the $xz$-plane. Stokes' theorem converts this to a surface integral of the curl over the enclosed square region.

---

# Pattern Recognition Trick
Identify:
* Surface lies in the $xz$-plane ($y=0$).
* Normal vector $\\hat{n} = \\hat{j}$ (according to positive orientation).
* Dot product: $(\\nabla \\times \\vec{F}) \\cdot \\hat{j}$.
* Substitute $y = 0$ into the curl expression.

---

# Shortcut / Exam Trick
* Curl $\\vec{F}$ component along y-axis is: $\\partial_z F_x - \\partial_x F_z = \\partial_z (xy) - \\partial_x (xz) = 0 - z = -z$.
* Since $\\hat{n} = \\hat{j}$, we project: $(\\nabla \\times \\vec{F}) \\cdot \\hat{n} = -z$.
* Double integral over the unit square is:
  $$\\int_0^1 \\int_0^1 -z \\, dx \\, dz = \\int_0^1 -z \\, dz = -\\frac{1}{2}$$

---

# Step-by-Step Solution
1. Find the curl of the vector field $\\vec{F} = xy\\hat{i} + yz\\hat{j} + xz\\hat{k}$:
   $$\\nabla \\times \\vec{F} = \\left| \\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ xy & yz & xz \\end{matrix} \\right|$$
   $$= \\hat{i}(\\partial_y (xz) - \\partial_z (yz)) - \\hat{j}(\\partial_x (xz) - \\partial_z (xy)) + \\hat{k}(\\partial_x (yz) - \\partial_y (xy))$$
   $$= \\hat{i}(0 - y) - \\hat{j}(z - 0) + \\hat{k}(0 - x) = -y\\hat{i} - z\\hat{j} - x\\hat{k}$$
2. Identify the normal vector $\\hat{n}$ to the surface in the $xz$-plane ($y=0$):
   $$\\hat{n} = \\hat{j}$$
3. Project the curl along the normal direction:
   $$(\\nabla \\times \\vec{F}) \\cdot \\hat{n} = (-y\\hat{i} - z\\hat{j} - x\\hat{k}) \\cdot \\hat{j} = -z$$
4. Apply Stokes' Theorem:
   $$\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, ds = \\int_0^1 \\int_0^1 -z \\, dx \\, dz$$
5. Perform integration:
   $$\\int_0^1 \\int_0^1 -z \\, dx \\, dz = \\left(\\int_0^1 dx\\right) \\left(\\int_0^1 -z \\, dz\\right) = 1 \\times \\left[-\\frac{z^2}{2}\\right]_0^1 = -\\frac{1}{2}$$

---

# Why This Step Works
* Applying Stokes' theorem replaces the 4 line integrals along the boundary of the square with a single double integral of the curl's vertical component over the square area.

---

# Formula Used
* Stokes' Theorem: $\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, ds$

---

# Similar Patterns to Remember
* Work integrals in flat planes.
* Electromagnetic circulation loops.

---

# Common Mistakes
* Forgetting the negative sign in the determinant expansion for the $\\hat{j}$ term.
* Choosing the wrong normal vector (like $\\hat{n} = \\hat{k}$).

---

# Final Answer
$$\\boxed{\\text{Circulation} = -\\frac{1}{2}}$$

---

# 10-Second Revision Notes
✓ Curl component along y: $-\\hat{j} (\\partial_x F_z - \\partial_z F_x) = -z\\hat{j}$.
✓ Normal is $\\hat{j}$ in the $xz$-plane.
✓ Integrand $= -z$.
✓ Integration over $1 \\times 1$ square yields $-0.5$.

---

# Memory Trick
"In flat planes, curl projection is simply the cross derivative difference of the in-plane components."

---

# Exam Confidence Booster
By calculating only the relevant component of the curl (the y-component since the surface is $y=0$), you save valuable time in exams. Done in 20 seconds!"""

# Question 61
ANSWERS[61] = """# Question
In an electrical field, $\\vec F = y\\hat i + x\\hat j$. Use a line integral to determine the work done along the boundary of the square defined by $0 \\le x \\le 1, 0 \\le y \\le 1$.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Line Integrals / Work Done
* **Why Applicable**: The work done by a force field along a closed path is given by the closed line integral $\\oint_C \\vec{F} \\cdot d\\vec{r}$.

---

# Pattern Recognition Trick
* Check if field is conservative: $\\vec{F} = y\\hat{i} + x\\hat{j} \\implies \\nabla \\times \\vec{F} = \\vec{0}$.
* The line integral of any conservative field along any closed loop is exactly zero.
* Loop is closed (boundary of square) $\\implies$ Work Done $= 0$.

---

# Shortcut / Exam Trick
Since $\\vec{F} = \\nabla(xy)$, the field is conservative.
The boundary of the square is a closed curve $C$.
For any conservative field and closed path $C$:
$$\\oint_C \\vec{F} \\cdot d\\vec{r} = 0$$
Solve in 3 seconds!

---

# Step-by-Step Solution
1. Identify the vector field:
   $$\\vec{F} = y\\hat{i} + x\\hat{j}$$
2. Check if the field is conservative:
   $$\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = \\frac{\\partial(x)}{\\partial x} - \\frac{\\partial(y)}{\\partial y} = 1 - 1 = 0$$
   Since the curl is zero, the field is conservative.
3. State the path:
   The path $C$ is the boundary of the square $0 \\le x \\le 1, 0 \\le y \\le 1$. This is a closed curve.
4. Apply the conservative field property:
   For any conservative field, the line integral along a closed path is zero:
   $$\\oint_C \\vec{F} \\cdot d\\vec{r} = 0$$
5. Thus, the work done along the boundary of the square is 0.

---

# Why This Step Works
* Because the field is conservative, the work done on a particle depends only on the endpoints. Since the start and end points of a closed loop are identical ($A = B$), the net work done is $\\phi(B) - \\phi(A) = 0$.

---

# Formula Used
* $\\oint_C \\vec{F} \\cdot d\\vec{r} = 0$ for conservative $\\vec{F}$.

---

# Similar Patterns to Remember
* Line integrals of gravity or electrostatic fields around closed orbits/loops are always zero.

---

# Common Mistakes
* Separating the path into 4 line segments and integrating each manually (this takes 5 minutes and is easy to make a math error, though it also yields 0).

---

# Final Answer
$$\\boxed{\\text{Work Done} = 0}$$

---

# 10-Second Revision Notes
✓ Field: $\\vec{F} = [y, x]$.
✓ Curl: $\\partial_x(x) - \\partial_y(y) = 0 \\implies$ Conservative.
✓ Path is a closed loop (square boundary).
✓ Work Done is exactly 0.

---

# Memory Trick
"Conservative loops do zero work."

---

# Exam Confidence Booster
Spotting a conservative field on a closed loop means you can write down $0$ instantly with absolute certainty!"""

# Question 62
ANSWERS[62] = """# Question
Evaluate and interpret the total outward heat flux using divergence theorem for $\\vec F = (x^2-yz)\\hat i + (y^2-xz)\\hat j + (z^2-xy)\\hat k$ over a rectangular domain $0 \\le x \\le a, 0 \\le y \\le b, 0 \\le z \\le c$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Gauss's Divergence Theorem
* **Why Applicable**: The Divergence Theorem equates the surface integral (flux) over a closed surface to a volume integral of the divergence: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = \\iiint_V \\nabla \\cdot \\vec{F} \\, dV$.

---

# Pattern Recognition Trick
* Field: $\\vec{F} = [x^2-yz, y^2-xz, z^2-xy]$
* Rectangular domain: $V = [0,a] \\times [0,b] \\times [0,c]$
* Calculating flux directly over 6 faces is very tedious; Divergence Theorem simplifies this to a single volume integration.

---

# Shortcut / Exam Trick
* $\\nabla \\cdot \\vec{F} = 2x + 2y + 2z = 2(x+y+z)$.
* Integrating $x$ over $[0,a]$ yields $\\frac{a^2}{2} bc$.
* Summing for all three variables:
  $$\\text{Flux} = 2 \\left[ \\frac{a^2}{2}bc + ab\\frac{b^2}{2}c + abc\\frac{c^2}{2} \\right] = abc(a + b + c)$$
  Simple algebraic structure.

---

# Step-by-Step Solution
1. Compute the divergence of $\\vec{F}$:
   $$\\nabla \\cdot \\vec{F} = \\frac{\\partial}{\\partial x}(x^2-yz) + \\frac{\\partial}{\\partial y}(y^2-xz) + \\frac{\\partial}{\\partial z}(z^2-xy) = 2x + 2y + 2z$$
2. Set up the volume integral over the rectangular domain:
   $$\\text{Flux} = \\int_0^c \\int_0^b \\int_0^a 2(x+y+z) \\, dx \\, dy \\, dz$$
3. Integrate with respect to $x$:
   $$\\int_0^a (2x + 2y + 2z) \\, dx = \\left[ x^2 + 2(y+z)x \\right]_0^a = a^2 + 2a(y+z)$$
4. Integrate with respect to $y$:
   $$\\int_0^b [a^2 + 2ay + 2az] \\, dy = \\left[ a^2y + ay^2 + 2azy \\right]_0^b = a^2b + ab^2 + 2abz$$
5. Integrate with respect to $z$:
   $$\\int_0^c [a^2b + ab^2 + 2abz] \\, dz = \\left[ a^2bz + ab^2z + abz^2 \\right]_0^c = a^2bc + ab^2c + abc^2$$
6. Factor out $abc$:
   $$\\text{Flux} = abc(a + b + c)$$
7. **Physical Interpretation**:
   The positive outward flux indicates that the domain acts as a net source of heat. The total heat energy escaping the volume per unit time is proportional to the volume of the box ($abc$) multiplied by the sum of its dimensions ($a+b+c$).

---

# Why This Step Works
* Divergence theorem converts a complex boundary flux summation into a bulk accumulation volume integral, which is much easier to evaluate.

---

# Formula Used
* Divergence Theorem: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = \\iiint_V \\nabla \\cdot \\vec{F} \\, dV$

---

# Similar Patterns to Remember
* Finding flux of $\\vec{F} = x\\hat{i} + y\\hat{j} + z\\hat{k}$ over a sphere or box.

---

# Common Mistakes
* Forgetting to multiply by the other dimensions when integrating: e.g., integrating $2x$ to get $a^2$ instead of $a^2 b c$.

---

# Final Answer
$$\\boxed{\\text{Flux} = abc(a + b + c)}$$

---

# 10-Second Revision Notes
✓ $\\nabla \\cdot \\vec{F} = 2(x+y+z)$.
✓ Integrate over box $[0,a] \\times [0,b] \\times [0,c]$.
✓ Result: $abc(a+b+c)$.
✓ Interpreted as net outward source rate of heat.

---

# Memory Trick
"The flux of $(x^2, y^2, z^2)$ like fields over a box yields the volume times the sum of dimensions."

---

# Exam Confidence Booster
Recognize that symmetric integrals of linear coordinates over a box are always of the form $\\text{Volume} \\times \\text{average value}$. This leads to $abc(a+b+c)$ directly!"""

# Question 63
ANSWERS[63] = """# Question
In a fluid transport system, the velocity field is $\\vec F = (2x)\\hat i + (y)\\hat j + (z)\\hat k$. Use a surface integral to compute the total flux through the surface $x=1$ bounded by $0 \\le y \\le 2, 0 \\le z \\le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Surface Integral (Flux)
* **Why Applicable**: We are computing the rate of fluid flow crossing a flat rectangular partition ($x=1$) perpendicular to the x-axis.

---

# Pattern Recognition Trick
* Surface: $x=1$.
* Normal: $\\hat{n} = \\hat{i}$.
* Dot product: $\\vec{F} \\cdot \\hat{n} = 2x$.
* On the surface $x=1$, this is a constant value of 2.
* Integral is simply constant times area.

---

# Shortcut / Exam Trick
Since $\\vec{F} \\cdot \\hat{n} = 2$ is constant on the surface:
$$\\text{Flux} = \\iint_S 2 \\, ds = 2 \\times \\text{Area of Surface}$$
The surface is a rectangle in the $yz$-plane of size $2 \\times 1 \\implies \\text{Area} = 2$.
$$\\text{Flux} = 2 \\times 2 = 4$$
Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Identify the normal vector $\\hat{n}$ to the plane $x = 1$:
   $$\\hat{n} = \\hat{i}$$
2. Compute the dot product:
   $$\\vec{F} \\cdot \\hat{n} = (2x\\hat{i} + y\\hat{j} + z\\hat{k}) \\cdot \\hat{i} = 2x$$
3. Apply the surface constraint $x=1$:
   $$\\vec{F} \\cdot \\hat{n}\\Big|_{x=1} = 2(1) = 2$$
4. Set up the double integral over the region in the $yz$-plane:
   $$\\text{Flux} = \\iint_S 2 \\, ds = \\int_0^1 \\int_0^2 2 \\, dy \\, dz$$
5. Evaluate the integral:
   $$\\text{Flux} = 2 \\left(\\int_0^2 dy\\right) \\left(\\int_0^1 dz\\right) = 2(2)(1) = 4$$

---

# Why This Step Works
* Finding the projection of the velocity field along the surface normal gives the speed of fluid passing through the boundary. Integrating this over the boundary area gives the total flow rate.

---

# Formula Used
* Flux Integral: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds$

---

# Similar Patterns to Remember
* Flow rate through a pipe or partition window.
* Electric field flux through a capacitor plate.

---

# Common Mistakes
* Using the wrong normal vector like $\\hat{n} = \\hat{i} + \\hat{j} + \\hat{k}$.
* Integrating $2x$ and getting $x^2$ instead of substituting the boundary value $x=1$ first.

---

# Final Answer
$$\\boxed{\\text{Flux} = 4}$$

---

# 10-Second Revision Notes
✓ $\\vec{F} \\cdot \\hat{i} = 2x$.
✓ Set $x=1 \\implies$ Integrand $= 2$.
✓ Surface area $= 2 \\times 1 = 2$.
✓ Total Flux $= 2 \\times 2 = 4$.

---

# Memory Trick
"For flat planes with constant normal projection, flux is just value times area."

---

# Exam Confidence Booster
Checking if the projection is constant is the fastest way to solve surface integrals without doing actual integrations!"""

# Question 64
ANSWERS[64] = """# Question
Evaluate and interpret the total outward heat flux using divergence theorem for $\\vec F = 4xz\\hat i - y^2\\hat j + yz\\hat k$ over a unit cubic control volume $0 \\le x,y,z \\le 1$.

---

# Concept Used
* **Topic Name**: Vector Integration
* **Sub-topic Name**: Gauss's Divergence Theorem
* **Why Applicable**: We are asked to find the total outward flux of a vector field over a closed unit cube. The divergence theorem converts this to a volume integral.

---

# Pattern Recognition Trick
* Domain: closed unit cube $0 \\le x,y,z \\le 1$.
* Field: $\\vec{F} = [4xz, -y^2, yz]$.
* Divergence: $\\nabla \\cdot \\vec{F} = 4z - 2y + y = 4z - y$.

---

# Shortcut / Exam Trick
For a unit cube, integrating a linear function like $Az + By + C$ is extremely simple because the average value of $x, y, z$ in the unit cube is $1/2$:
$$\\text{Flux} = \\iiint_V (4z - y) \\, dV = \\text{Volume} \\times (4z_{avg} - y_{avg}) = 1 \\times \\left(4(0.5) - 0.5\\right) = 2 - 0.5 = 1.5$$
Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Find the divergence of $\\vec{F}$:
   $$\\nabla \\cdot \\vec{F} = \\frac{\\partial(4xz)}{\\partial x} + \\frac{\\partial(-y^2)}{\\partial y} + \\frac{\\partial(yz)}{\\partial z}$$
   $$\\nabla \\cdot \\vec{F} = 4z - 2y + y = 4z - y$$
2. Set up the volume integral over the unit cube:
   $$\\text{Flux} = \\int_0^1 \\int_0^1 \\int_0^1 (4z - y) \\, dx \\, dy \\, dz$$
3. Integrate with respect to $x$ (integrand is independent of $x$):
   $$\\int_0^1 dx = 1 \\implies \\text{Flux} = \\int_0^1 \\int_0^1 (4z - y) \\, dy \\, dz$$
4. Integrate with respect to $y$:
   $$\\int_0^1 (4z - y) \\, dy = \\left[ 4zy - \\frac{y^2}{2} \\right]_0^1 = 4z - \\frac{1}{2}$$
5. Integrate with respect to $z$:
   $$\\int_0^1 \\left(4z - \\frac{1}{2}\\right) \\, dz = \\left[ 2z^2 - \\frac{z}{2} \\right]_0^1 = 2 - \\frac{1}{2} = \\frac{3}{2}$$
6. **Physical Interpretation**:
   The total outward flux is positive ($1.5$), meaning the unit cube contains a net source of heat. Heat is leaving the control volume at a rate of 1.5 units per unit time.

---

# Why This Step Works
* The divergence theorem replaces the calculation of six separate surface integrals (one for each face of the cube) with a single volume integral.

---

# Formula Used
* Gauss's Divergence Theorem: $\\iint_S \\vec{F} \\cdot \\hat{n} \\, ds = \\iiint_V \\nabla \\cdot \\vec{F} \\, dV$

---

# Similar Patterns to Remember
* Outward flux over control volumes in fluid mechanics.

---

# Common Mistakes
* Getting the sign of the divergence component wrong (e.g. writing $-y^2 \\to -2$).
* Forgetting to integrate over all three coordinate directions.

---

# Final Answer
$$\\boxed{\\text{Flux} = \\frac{3}{2}}$$

---

# 10-Second Revision Notes
✓ $\\nabla \\cdot \\vec{F} = 4z - y$.
✓ Average values on unit cube: $z = 0.5, y = 0.5$.
✓ Integral $= 4(0.5) - 0.5 = 1.5$.
✓ Positive sign means net heat source.

---

# Memory Trick
"On a unit cube, the integral of any linear coordinate is $1/2$ times its coefficient."

---

# Exam Confidence Booster
Using the average-value shortcut for unit domains saves significant integration time and prevents arithmetic slip-ups!"""

# Question 65
ANSWERS[65] = """# Question
A control response is modeled by $f(z) = z^2$. Analyze whether the function is differentiable at $z = 1+i$.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Analyticity and Differentiability
* **Why Applicable**: Differentiability in the complex plane requires the limit of the difference quotient to exist. Polynomials of $z$ are differentiable everywhere (entire functions).

---

# Pattern Recognition Trick
* The function is $f(z) = z^2$ (a pure polynomial in $z$, not involving conjugate $\\bar{z}$ or absolute value $|z|$).
* Polynomials are differentiable everywhere in $\\mathbb{C}$.
* Therefore, it is differentiable at $z = 1+i$.

---

# Shortcut / Exam Trick
Any function that is a finite sum of powers of $z$ (like $z^2, z^3, 5z+2$) is differentiable everywhere. You can use standard derivative rules:
$$f'(z) = 2z$$
At $z = 1+i$:
$$f'(1+i) = 2(1+i) = 2 + 2i$$

---

# Step-by-Step Solution
1. State the function:
   $$f(z) = z^2$$
2. Check for differentiability using Cauchy-Riemann equations or direct limit.
   Let's write $f(z)$ in terms of $x$ and $y$:
   $$f(x+iy) = (x+iy)^2 = x^2 - y^2 + 2ixy$$
   $$u(x,y) = x^2 - y^2, \\quad v(x,y) = 2xy$$
3. Compute partial derivatives to verify Cauchy-Riemann equations:
   $$u_x = 2x, \\quad v_y = 2x \\implies u_x = v_y$$
   $$u_y = -2y, \\quad v_x = 2y \\implies u_y = -v_x$$
   Since the partial derivatives are continuous and CR equations hold everywhere, the function is differentiable everywhere in $\\mathbb{C}$.
4. Evaluate the derivative at $z = 1+i$:
   $$f'(z) = 2z \\implies f'(1+i) = 2(1+i) = 2 + 2i$$

---

# Why This Step Works
* Satisfying the CR equations ensures that the rate of change is the same regardless of the direction from which you approach the point $1+i$.

---

# Formula Used
* Derivative of $z^n$: $\\frac{d}{dz}(z^n) = n z^{n-1}$

---

# Similar Patterns to Remember
* Functions containing $\\bar{z}$ or $|z|$ (like $|z|^2$ or $x - iy$) are generally not analytic (differentiable everywhere).

---

# Common Mistakes
* Assuming complex differentiability is the same as real differentiability of components without verifying the coupling (CR equations).

---

# Final Answer
$$\\boxed{\\text{The function is differentiable at } z = 1+i \\text{ with derivative } f'(1+i) = 2+2i}$$

---

# 10-Second Revision Notes
✓ $f(z) = z^2$ is an entire polynomial function.
✓ Differentiable everywhere.
✓ Derivative formula: $f'(z) = 2z$.
✓ Value at $1+i$ is $2+2i$.

---

# Memory Trick
"Pure $z$ functions are always clean and differentiable; watch out for $\\bar{z}$!"

---

# Exam Confidence Booster
Recognizing polynomial functions as entire means you can immediately declare differentiability and apply power rules without using CR equations."""

# Question 66
ANSWERS[66] = """# Question
A signal transformation is defined by $w = z^2$. Identify whether the function is single-valued or multi-valued and justify.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Functions of a Complex Variable
* **Why Applicable**: A function $w = f(z)$ is single-valued if for each point $z$ in the domain, there corresponds a unique value of $w$.

---

# Pattern Recognition Trick
* Map: $z \\to w = z^2$.
* Input a single complex number $z$, say $2i$.
* Output is $(2i)^2 = -4$ (exactly one value).
* Since every input $z$ produces exactly one output, it is **single-valued**.

---

# Shortcut / Exam Trick
* Direct functions (like $z^2, e^z, \\sin z$) are always **single-valued**.
* Inverse functions (like $\\sqrt{z}, \\ln z, \\arcsin z$) are always **multi-valued** because they require branch cuts to isolate a single value.

---

# Step-by-Step Solution
1. Define a single-valued function:
   A complex mapping $w = f(z)$ is single-valued if each value of $z$ corresponds to exactly one value of $w$.
2. Analyze the mapping $w = z^2$:
   Let $z = r e^{i\\theta}$ be in polar form.
   $$w = z^2 = (r e^{i\\theta})^2 = r^2 e^{i2\\theta}$$
3. Check for uniqueness:
   If we add $2\\pi$ to the angle $\\theta$ (which represents the same point $z$):
   $$w(r e^{i(\\theta+2\\pi)}) = r^2 e^{i(2\\theta + 4\\pi)} = r^2 e^{i2\\theta} e^{i4\\pi} = r^2 e^{i2\\theta}$$
   Since the output value does not change, each coordinate point $z$ yields one and only one value of $w$.
4. **Conclusion**:
   The function $w = z^2$ is **single-valued**.

---

# Why This Step Works
* Proving that phase rotation of $2\\pi$ in the input domain yields the identical point in the output domain verifies uniqueness of the function value.

---

# Formula Used
* Euler's Identity: $e^{i2n\\pi} = 1$ for integer $n$.

---

# Similar Patterns to Remember
* $w = z^3 + 2z$ (single-valued).
* $w = \\sqrt{z}$ (multi-valued, since $\\theta + 2\\pi \\to$ changes sign).

---

# Common Mistakes
* Confusing "single-valued" with "one-to-one". $w = z^2$ is not one-to-one (both $z$ and $-z$ map to same $w$), but it is still single-valued.

---

# Final Answer
$$\\boxed{\\text{The function } w = z^2 \\text{ is single-valued.}}$$

---

# 10-Second Revision Notes
✓ $w = z^2$ takes one input and gives one output.
✓ Adding $2\\pi$ to input phase gives same output ($e^{i4\\pi} = 1$).
✓ Therefore, single-valued.

---

# Memory Trick
"Forward power mappings are single-valued; root mappings split into multiple values."

---

# Exam Confidence Booster
Any algebraic polynomial or basic transcendental function is single-valued by definition. Answer immediately!"""

# Question 67
ANSWERS[67] = """# Question
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
* Since $v$ is simple, direct integration is faster than Milne-Thomson, but we'll outline the formal method.

---

# Shortcut / Exam Trick
* CR equation: $u_x = v_y = 2x \\implies u = x^2 + g(y)$.
* CR equation: $u_y = -v_x = -2y \\implies g'(y) = -2y \\implies g(y) = -y^2$.
* So $u = x^2 - y^2 + C$.
* Notice that $f(z) = z^2 = (x^2-y^2) + i(2xy)$.
* So $u = x^2 - y^2$ is the conjugate.

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = 2xy$$
2. Write the Cauchy-Riemann equations:
   $$u_x = v_y \\quad \\text{and} \\quad u_y = -v_x$$
3. Find the derivatives of $v$:
   $$v_x = 2y, \\quad v_y = 2x$$
4. Set up the derivatives of $u$:
   $$u_x = 2x$$
   $$u_y = -2y$$
5. Integrate $u_x$ with respect to $x$:
   $$u(x,y) = \\int 2x \\, dx = x^2 + h(y)$$
6. Differentiate $u(x,y)$ with respect to $y$ and equate to $u_y$:
   $$u_y = h'(y) = -2y \\implies h(y) = -y^2 + C$$
7. Write the harmonic conjugate $u(x,y)$:
   $$u(x,y) = x^2 - y^2 + C$$

---

# Why This Step Works
* CR equations guarantee that the resulting function $f = u + iv$ satisfies complex differentiability, meaning the grid of $u$ and $v$ curves is orthogonal.

---

# Formula Used
* Cauchy-Riemann Equations: $u_x = v_y, \\quad u_y = -v_x$

---

# Similar Patterns to Remember
* Given $u = x^2 - y^2 \\implies v = 2xy + C$.
* Given $u = e^x \\cos y \\implies v = e^x \\sin y + C$.

---

# Common Mistakes
* Mixing up the signs in the CR equations (e.g. writing $u_y = v_x$).
* Forgetting the constant of integration $C$.

---

# Final Answer
$$\\boxed{u(x,y) = x^2 - y^2 + C}$$

---

# 10-Second Revision Notes
✓ $v = 2xy \\implies v_x = 2y, v_y = 2x$.
✓ $u_x = 2x \\implies u = x^2 + h(y)$.
✓ $u_y = h'(y) = -2y \\implies h(y) = -y^2$.
✓ $u = x^2 - y^2 + C$.

---

# Memory Trick
"The real part of $z^2$ is $x^2-y^2$ and the imaginary part is $2xy$."

---

# Exam Confidence Booster
Spotting $2xy$ as the stream function means you can immediately write down $x^2-y^2$ as the potential function. Saves 1 minute!"""

# Question 68
ANSWERS[68] = """# Question
In an electrical field application, the real part of an analytic function is $u(x,y) = x^2 + 2xy$. Find $f'(z)$ using Milne-Thomson method.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method
* **Why Applicable**: The Milne-Thomson method allows constructing the derivative of an analytic function $f'(z)$ directly from its real part $u(x,y)$ without finding $v(x,y)$ first.

---

# Pattern Recognition Trick
* Real part $u(x,y) = x^2 + 2xy$.
* Find $f'(z)$ using:
  $$f'(z) = u_x(z,0) - i u_y(z,0)$$
* Simply differentiate $u$ with respect to $x$ and $y$, then substitute $x=z, y=0$.

---

# Shortcut / Exam Trick
* $u_x = 2x + 2y \\implies u_x(z,0) = 2z$.
* $u_y = 2x \\implies u_y(z,0) = 2z$.
* $f'(z) = 2z - i(2z) = 2z(1-i)$.
* Solve in under 15 seconds!

---

# Step-by-Step Solution
1. Identify the given real part:
   $$u(x,y) = x^2 + 2xy$$
2. Compute the partial derivatives:
   $$u_x = \\frac{\\partial}{\\partial x}(x^2 + 2xy) = 2x + 2y$$
   $$u_y = \\frac{\\partial}{\\partial y}(x^2 + 2xy) = 2x$$
3. Apply Milne-Thomson substitutions ($x = z$, $y = 0$):
   $$\\phi_1(z,0) = u_x(z,0) = 2z + 2(0) = 2z$$
   $$\\phi_2(z,0) = u_y(z,0) = 2z$$
4. Set up the formula for $f'(z)$:
   $$f'(z) = \\phi_1(z,0) - i \\phi_2(z,0)$$
5. Substitute the values:
   $$f'(z) = 2z - i(2z) = 2z(1 - i)$$

---

# Why This Step Works
* Milne-Thomson replaces variables $x$ and $y$ with $z$ and $0$ on the boundary, which isolates the analytical derivative function directly along the real axis line.

---

# Formula Used
* Milne-Thomson: $f'(z) = u_x(z,0) - i u_y(z,0)$

---

# Similar Patterns to Remember
* If given $v$, the formula is $f'(z) = v_y(z,0) + i v_x(z,0)$.

---

# Common Mistakes
* Forgetting the negative sign in front of $i u_y$ (using $+$ instead).
* Not substituting $y=0$ in the derivatives.

---

# Final Answer
$$\\boxed{f'(z) = 2z(1 - i)}$$

---

# 10-Second Revision Notes
✓ $u_x = 2x+2y \\implies u_x(z,0) = 2z$.
✓ $u_y = 2x \\implies u_y(z,0) = 2z$.
✓ $f'(z) = u_x(z,0) - i u_y(z,0) = 2z - 2iz$.

---

# Memory Trick
"Milne-Thomson: $x$ goes to $z$, $y$ goes to $0$, and subtract $i$ times the $y$-derivative."

---

# Exam Confidence Booster
This method bypasses the integration steps of finding $v(x,y)$, letting you get $f'(z)$ directly in just two simple derivatives!"""

# Question 69
ANSWERS[69] = """# Question
A communication signal is represented by a complex function $f(z)$. Evaluate the relationship between differentiability and continuity in complex systems.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Differentiability and Continuity
* **Why Applicable**: Continuity and differentiability are fundamental properties of signal representations. Complex differentiability (analyticity) is a much stronger condition than real differentiability.

---

# Pattern Recognition Trick
* Differentiability in $\\mathbb{C} \\implies$ Continuity in $\\mathbb{C}$.
* Continuity in $\\mathbb{C} \\centernot\\implies$ Differentiability in $\\mathbb{C}$ (e.g. $f(z) = \\bar{z}$ is continuous everywhere but differentiable nowhere).

---

# Shortcut / Exam Trick
* Differentiable $\\implies$ Continuous (Always True).
* Continuous $\\implies$ Differentiable (False in general).
* If a question asks if a continuous function is differentiable, check CR equations!

---

# Step-by-Step Solution
1. **Differentiability Implies Continuity**:
   Assume $f(z)$ is differentiable at $z_0$. By definition:
   $$\\lim_{z \\to z_0} \\frac{f(z) - f(z_0)}{z - z_0} = f'(z_0)$$
   We can write:
   $$\\lim_{z \\to z_0} [f(z) - f(z_0)] = \\lim_{z \\to z_0} \\left[ \\frac{f(z) - f(z_0)}{z - z_0} (z - z_0) \\right] = f'(z_0) \\cdot 0 = 0$$
   Therefore, $\\lim_{z \\to z_0} f(z) = f(z_0)$, which proves $f(z)$ is continuous at $z_0$.
2. **Continuity Does Not Imply Differentiability**:
   Consider $f(z) = \\bar{z} = x - iy$.
   * $u = x \\implies u_x = 1, u_y = 0$
   * $v = -y \\implies v_x = 0, v_y = -1$
   Since $u_x = 1 \\neq v_y = -1$, the Cauchy-Riemann equations are violated everywhere.
   Thus, $f(z) = \\bar{z}$ is continuous everywhere but differentiable nowhere.
3. **Engineering Significance**:
   In communication signals, we require analytic models because they represent physically realizable, smooth waveforms (no sudden kinks or phase tears).

---

# Why This Step Works
* The limit definition proves that a finite rate of change (derivative) requires the function values to match at the limit boundary (continuity).

---

# Formula Used
* Limit definition of derivative: $f'(z) = \\lim_{\\Delta z \\to 0} \\frac{f(z+\\Delta z) - f(z)}{\\Delta z}$

---

# Similar Patterns to Remember
* $f(z) = |z|^2$ is continuous everywhere, but differentiable *only* at the origin $z=0$.

---

# Common Mistakes
* Assuming that because the real and imaginary parts are continuous, the complex function must be differentiable.

---

# Final Answer
$$\\boxed{\\text{Differentiability implies continuity, but continuity does not imply differentiability.}}$$

---

# 10-Second Revision Notes
✓ Differentiable $\\implies$ Continuous.
✓ Continuous $\\centernot\\implies$ Differentiable.
✓ Counterexample: $f(z) = \\bar{z}$ is continuous but nowhere differentiable.

---

# Memory Trick
"Differentiability is a high-class neighborhood (strict rules); continuity is just the open city."

---

# Exam Confidence Booster
Remembering the counterexample $f(z) = \\bar{z}$ helps you justify why continuity is a necessary but not sufficient condition for differentiability."""

# Question 70
ANSWERS[70] = """# Question
An impedance transformation is represented by $w = \\sqrt z$. Analyze whether the function is single-valued or multi-valued.

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
* Fractional powers like $z^{p/q}$ ($q > 1$) and logarithm $\\ln z$ are always **multi-valued**.
* Square root has 2 values (differing by sign).

---

# Step-by-Step Solution
1. Express $z$ in polar form:
   $$z = r e^{i\\theta}$$
2. Apply the square root operation:
   $$w = \\sqrt{z} = z^{1/2} = \\sqrt{r} e^{i\\theta/2}$$
3. Rotate the angle by $2\\pi$ (representing the same physical point $z$):
   $$z = r e^{i(\\theta + 2\\pi)}$$
   $$w = \\sqrt{r} e^{i(\\theta + 2\\pi)/2} = \\sqrt{r} e^{i\\theta/2} e^{i\\pi} = -\\sqrt{r} e^{i\\theta/2}$$
4. Compare values:
   We obtain two distinct values: $w_1 = \\sqrt{r} e^{i\\theta/2}$ and $w_2 = -\\sqrt{r} e^{i\\theta/2}$ depending on the branch chosen.
5. **Conclusion**:
   The impedance transformation $w = \\sqrt{z}$ is **multi-valued**.

---

# Why This Step Works
* Rotating $2\\pi$ in the input domain maps to a rotation of $\\pi$ (a sign flip) in the square root output domain, proving the existence of multiple branches.

---

# Formula Used
* Euler's Relation: $e^{i\\pi} = -1$

---

# Similar Patterns to Remember
* $w = z^{1/3}$ has 3 values.
* $w = \\ln z$ has infinitely many values ($w = \\ln r + i(\\theta + 2n\\pi)$).

---

# Common Mistakes
* Stating that $\\sqrt{z}$ is single-valued by only considering positive real numbers. In complex analysis, all roots must be accounted for.

---

# Final Answer
$$\\boxed{\\text{The function } w = \\sqrt{z} \\text{ is multi-valued.}}$$

---

# 10-Second Revision Notes
✓ $z = r e^{i\\theta} \\implies \\sqrt{z} = \\sqrt{r} e^{i\\theta/2}$.
✓ Rotate input by $2\\pi \\implies$ Output rotates by $\\pi$ (flips sign).
✓ Two values exist for each $z \\neq 0 \\implies$ Multi-valued.

---

# Memory Trick
"Roots divide the phase, splitting one point into many branches."

---

# Exam Confidence Booster
Instantly identify any root function as multi-valued. Branch cuts are needed to make it single-valued in system designs."""

# Question 71
ANSWERS[71] = """# Question
An electric field potential is represented by $u(x,y) = e^x\\cos y$. Construct the analytic function using the Milne-Thomson method.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method
* **Why Applicable**: We are given the real potential $u(x,y)$ of an analytic function $f(z) = u + iv$ and want to find $f(z)$ directly in terms of the complex variable $z$.

---

# Pattern Recognition Trick
* Given: $u = e^x \\cos y$.
* This is the classic real part of the exponential function $e^z$.
* Derivatives: $u_x = e^x \\cos y$, $u_y = -e^x \\sin y$.
* At $(z,0)$: $u_x = e^z$, $u_y = 0$.

---

# Shortcut / Exam Trick
* $f'(z) = u_x(z,0) - i u_y(z,0) = e^z \\cos 0 - i(-e^z \\sin 0) = e^z$.
* Integrate $f'(z)$:
  $$f(z) = \\int e^z \\, dz = e^z + C$$
* Solve in under 10 seconds!

---

# Step-by-Step Solution
1. Identify the given real part:
   $$u(x,y) = e^x \\cos y$$
2. Differentiate $u$ with respect to $x$ and $y$:
   $$u_x = \\frac{\\partial}{\\partial x}(e^x \\cos y) = e^x \\cos y$$
   $$u_y = \\frac{\\partial}{\\partial y}(e^x \\cos y) = -e^x \\sin y$$
3. Substitute $x = z$ and $y = 0$:
   $$\\phi_1(z,0) = e^z \\cos 0 = e^z$$
   $$\\phi_2(z,0) = -e^z \\sin 0 = 0$$
4. Set up the Milne-Thomson derivative equation:
   $$f'(z) = \\phi_1(z,0) - i \\phi_2(z,0) = e^z - i(0) = e^z$$
5. Integrate with respect to $z$:
   $$f(z) = \\int e^z \\, dz = e^z + C$$
   where $C$ is a complex constant.

---

# Why This Step Works
* Substituting $y=0$ forces the imaginary variable components to zero, aligning the function structure with its standard real-axis representation.

---

# Formula Used
* Milne-Thomson: $f'(z) = u_x(z,0) - i u_y(z,0)$

---

# Similar Patterns to Remember
* $u = e^x \\sin y$ (imaginary part profile).
* $u = \\cos x \\cosh y$.

---

# Common Mistakes
* Forgetting the constant of integration $C$.
* Mixing up derivatives: differentiating $\\cos y$ as $\\sin y$ without the negative sign.

---

# Final Answer
$$\\boxed{f(z) = e^z + C}$$

---

# 10-Second Revision Notes
✓ $u_x = e^x \\cos y \\implies \\phi_1(z,0) = e^z$.
✓ $u_y = -e^x \\sin y \\implies \\phi_2(z,0) = 0$.
✓ $f'(z) = e^z$.
✓ Integrate: $f(z) = e^z + C$.

---

# Memory Trick
"The gradient of $e^x \\cos y$ along the x-axis is just $e^z$."

---

# Exam Confidence Booster
Recognizing $e^x \\cos y$ as the real part of $e^z$ allows you to write down the answer immediately and verify it using Milne-Thomson in seconds!"""

# Question 72
ANSWERS[72] = """# Question
In a fluid flow model, the imaginary part of an analytic function is $v(x,y) = x^2 - y^2$. Using Milne-Thomson method, find $f'(z)$.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Milne-Thomson Method (Given Imaginary Part)
* **Why Applicable**: When the imaginary part $v(x,y)$ is given, the Milne-Thomson formula is: $f'(z) = v_y(z,0) + i v_x(z,0)$.

---

# Pattern Recognition Trick
* Given: $v(x,y) = x^2 - y^2$.
* Find $f'(z)$.
* Differentiate: $v_x = 2x$, $v_y = -2y$.
* Substitute $x=z, y=0$: $v_x(z,0) = 2z$, $v_y(z,0) = 0$.
* Result: $f'(z) = 0 + i(2z) = 2iz$.

---

# Shortcut / Exam Trick
When given $v$:
$$f'(z) = v_y(z,0) + i v_x(z,0)$$
Here:
* $v_y = -2y \\to 0$ at $y=0$.
* $v_x = 2x \\to 2z$ at $x=z$.
* $f'(z) = 2iz$.
Solve in 10 seconds!

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = x^2 - y^2$$
2. Compute partial derivatives:
   $$v_x = \\frac{\\partial}{\\partial x}(x^2 - y^2) = 2x$$
   $$v_y = \\frac{\\partial}{\\partial y}(x^2 - y^2) = -2y$$
3. Substitute $x=z$ and $y=0$:
   $$\\psi_1(z,0) = v_x(z,0) = 2z$$
   $$\\psi_2(z,0) = v_y(z,0) = -2(0) = 0$$
4. State the Milne-Thomson formula for $f'(z)$ when given $v$:
   $$f'(z) = v_y(z,0) + i v_x(z,0)$$
5. Substitute the values:
   $$f'(z) = 0 + i(2z) = 2iz$$

---

# Why This Step Works
* Using the Cauchy-Riemann equations ($u_x = v_y$ and $u_y = -v_x$) allows rewriting $f'(z) = u_x + i v_x$ purely in terms of $v$ derivatives as $f'(z) = v_y + i v_x$.

---

# Formula Used
* $f'(z) = v_y(z,0) + i v_x(z,0)$

---

# Similar Patterns to Remember
* Milne-Thomson given real part: $f'(z) = u_x(z,0) - i u_y(z,0)$.

---

# Common Mistakes
* Using the real-part formula (subtracting $i$ times derivative) by mistake, yielding $-2iz$.
* Mixing up $v_x$ and $v_y$ terms.

---

# Final Answer
$$\\boxed{f'(z) = 2iz}$$

---

# 10-Second Revision Notes
✓ $v_x = 2x \\implies v_x(z,0) = 2z$.
✓ $v_y = -2y \\implies v_y(z,0) = 0$.
✓ $f'(z) = v_y(z,0) + i v_x(z,0) = 2iz$.

---

# Memory Trick
"For imaginary parts, the $x$-derivative gets the $i$ multiplier, and we add."

---

# Exam Confidence Booster
Writing down the correct formula for imaginary parts ($v_y + i v_x$) is key. Memorize the sign rules to avoid easy mistakes!"""

# Question 73
ANSWERS[73] = """# Question
A communication signal is modeled by $f(z) = e^z$. Analyze whether the function is analytic and interpret its significance in signal amplification.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Analyticity (Cauchy-Riemann Equations)
* **Why Applicable**: For a function to be analytic, it must satisfy the Cauchy-Riemann equations and have continuous first-order partial derivatives at all points.

---

# Pattern Recognition Trick
* Function: $f(z) = e^z$.
* The derivative $f'(z) = e^z$ exists for all $z \\in \\mathbb{C}$.
* Therefore, the function is entire (analytic everywhere).

---

# Shortcut / Exam Trick
Any exponential function of $z$ (like $e^z, e^{2z}$) is entire.
$$f'(z) = e^z$$
Since it is differentiable everywhere, it is automatically analytic everywhere.

---

# Step-by-Step Solution
1. Express $f(z) = e^z$ in terms of real and imaginary parts ($x, y$):
   $$f(z) = e^{x+iy} = e^x(\\cos y + i\\sin y) = e^x\\cos y + i e^x\\sin y$$
   $$u(x,y) = e^x\\cos y, \\quad v(x,y) = e^x\\sin y$$
2. Calculate the partial derivatives:
   $$u_x = e^x\\cos y, \\quad v_y = e^x\\cos y \\implies u_x = v_y$$
   $$u_y = -e^x\\sin y, \\quad v_x = e^x\\sin y \\implies u_y = -v_x$$
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
* Cauchy-Riemann Equations: $u_x = v_y, \\quad u_y = -v_x$

---

# Similar Patterns to Remember
* Trigonometric signals: $f(z) = \\sin z$ or $\\cos z$ (also analytic everywhere).

---

# Common Mistakes
* Confusing real exponential behavior with complex exponential behavior.
* Claiming the function is not analytic because it grows without bound.

---

# Final Answer
$$\\boxed{\\text{The function } f(z) = e^z \\text{ is analytic everywhere, representing distortionless amplification and phase shift.}}$$

---

# 10-Second Revision Notes
✓ $f(z) = e^x\\cos y + i e^x\\sin y$.
✓ $u_x = v_y = e^x\\cos y$ and $u_y = -v_x = -e^x\\sin y$.
✓ CR equations hold everywhere $\implies$ Analytic.
✓ Models amplitude gain ($e^x$) and phase shift ($e^{iy}$).

---

# Memory Trick
"Exponential functions are smooth, entire, and preserve angle shapes."

---

# Exam Confidence Booster
Knowing that $e^z$ is entire allows you to use standard real calculus rules directly in the complex domain without derivation. Saves time!"""

# Question 74
ANSWERS[74] = """# Question
A signal transformation system uses the mapping $w = (1+i)z$. Determine the image of the region $y > 2$ in the $w$-plane and analyze the transformation characteristics.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Conformal Mappings / Linear Transformations
* **Why Applicable**: The mapping is of the form $w = Az$, which represents a linear transformation involving rotation and scaling. We map the boundary line $y=2$ to find the transformed region.

---

# Pattern Recognition Trick
* Mapping: $w = (1+i)z$.
* Note that $1+i = \\sqrt{2} e^{i\\pi/4}$.
* This scales coordinates by $\\sqrt{2}$ and rotates them counterclockwise by $45^\\circ$ ($\\pi/4$).
* Find relation between $y$ and the $w$-coordinates $u, v$.

---

# Shortcut / Exam Trick
Express $z$ in terms of $w$:
$$z = \\frac{w}{1+i} = \\frac{w(1-i)}{2} = \\frac{(u+iv)(1-i)}{2} = \\frac{(u+v) + i(v-u)}{2}$$
So:
$$x = \\frac{u+v}{2}, \\quad y = \\frac{v-u}{2}$$
Given $y > 2$:
$$\\frac{v-u}{2} > 2 \\implies v - u > 4 \\implies v > u + 4$$
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
   $$v - u = (x + y) - (x - y) = 2y \\implies y = \\frac{v-u}{2}$$
5. Apply the region inequality $y > 2$:
   $$\\frac{v-u}{2} > 2 \\implies v - u > 4 \\implies v > u + 4$$
6. **Analyze Transformation Characteristics**:
   * **Scaling**: Magnification factor is $|1+i| = \\sqrt{2}$.
   * **Rotation**: Rotation angle is $\\arg(1+i) = \\frac{\\pi}{4}$ ($45^\\circ$ CCW).
   * The horizontal boundary line $y=2$ is mapped to the line $v = u + 4$ in the $w$-plane. The upper half region is mapped above this line.

---

# Why This Step Works
* Expressing the input variable ($y$) in terms of output variables ($u,v$) allows direct substitution of boundaries to define the new coordinate bounds.

---

# Formula Used
* Division of complex numbers: $\\frac{1}{1+i} = \\frac{1-i}{2}$

---

# Similar Patterns to Remember
* Translation: $w = z + C$.
* Pure rotation: $w = e^{i\\theta}z$.
* Pure scaling: $w = kz$.

---

# Common Mistakes
* Forgetting to divide by 2 when resolving $z = w/(1+i)$.
* Incorrectly orienting the inequality sign, shading the wrong side of the line.

---

# Final Answer
$$\\boxed{\\text{Image Region: } v > u + 4, \\quad \\text{Characteristics: Scale factor } \\sqrt{2}, \\text{ Rotation } 45^\\circ \\text{ CCW.}}$$

---

# 10-Second Revision Notes
✓ $w = (1+i)z \\implies u=x-y, v=x+y$.
✓ Subtract: $v-u = 2y \\implies y = (v-u)/2$.
✓ Substitute $y>2 \\implies v-u>4 \\implies v > u+4$.
✓ Map represents scaling by $\\sqrt{2}$ and $45^\\circ$ rotation.

---

# Memory Trick
"Express $z$ in terms of $w$, substitute the constraint, and map the boundary."

---

# Exam Confidence Booster
Isolating $y$ algebraically is a bulletproof method that works for any linear complex mapping, avoiding geometric confusion entirely!"""

# Question 75
ANSWERS[75] = """# Question
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
* $u_x = 2x + 2$, $v_y = 2x + 2 \\implies u_x = v_y$.
* $u_y = -2y$, $v_x = 2y \\implies u_y = -v_x$.
* Both CR equations hold everywhere. Since they are polynomials, derivatives are continuous.
* Therefore, the function is analytic everywhere!

---

# Step-by-Step Solution
1. Identify the components $u$ and $v$:
   $$u(x,y) = x^2 - y^2 + 2x$$
   $$v(x,y) = 2xy + 2y$$
2. Compute the first-order partial derivatives:
   * With respect to $x$:
     $$u_x = \\frac{\\partial}{\\partial x}(x^2 - y^2 + 2x) = 2x + 2$$
     $$v_x = \\frac{\\partial}{\\partial x}(2xy + 2y) = 2y$$
   * With respect to $y$:
     $$u_y = \\frac{\\partial}{\\partial y}(x^2 - y^2 + 2x) = -2y$$
     $$v_y = \\frac{\\partial}{\\partial y}(2xy + 2y) = 2x + 2$$
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
* Cauchy-Riemann Equations: $u_x = v_y, \\quad u_y = -v_x$

---

# Similar Patterns to Remember
* $f(z) = z^2 + 2z$ (which expands to exactly this function).

---

# Common Mistakes
* Writing the second CR equation as $u_y = v_x$, which misses the negative sign.

---

# Final Answer
$$\\boxed{\\text{The function satisfies } u_x=v_y=2x+2 \\text{ and } u_y=-v_x=-2y, \\text{ so it is analytic. Isotherms and flow lines are orthogonal.}}$$

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
By inspection, note that $f(z) = z^2 + 2z$. Since any polynomial in $z$ is entire, the function must be analytic everywhere, saving calculation verification!"""

# Question 76
ANSWERS[76] = """# Question
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
   $$|z| = 2 \\implies |w - (1+4i)| = 2$$
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
* Magnification: $|w| = k|z| \\implies$ radius scales by $k$.
* Rotation: $w = e^{i\\theta}z \\implies$ phase shifts by $\\theta$.

---

# Common Mistakes
* Changing the radius of the circle: e.g., thinking the radius becomes $|1+4i| = \\sqrt{17}$. Translation does not scale shapes.

---

# Final Answer
$$\\boxed{|w - (1+4i)| = 2, \\quad \\text{which is a circle of radius 2 centered at } 1+4i.}$$

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
Translation transforms circles to circles of the exact same size. Find the new center by simply adding the constant offset!"""

# Question 77
ANSWERS[77] = """# Question
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
* Integrate $f'(z) = 2z$ to get $z^2$.

---

# Shortcut / Exam Trick
We know that $z^2 = (x^2-y^2) + i(2xy)$.
Since the imaginary part is $2xy$:
$$f(z) = z^2 + C \\quad (\\text{where } C \\text{ is real})$$
This matches the target profile instantly.

---

# Step-by-Step Solution
1. Identify the given imaginary part:
   $$v(x,y) = 2xy$$
2. Compute the partial derivatives:
   $$v_x = \\frac{\\partial(2xy)}{\\partial x} = 2y$$
   $$v_y = \\frac{\\partial(2xy)}{\\partial y} = 2x$$
3. Apply Milne-Thomson substitutions ($x=z$, $y=0$):
   $$\\psi_1(z,0) = v_x(z,0) = 2(0) = 0$$
   $$\\psi_2(z,0) = v_y(z,0) = 2z$$
4. Set up the derivative formula for $f'(z)$ given $v$:
   $$f'(z) = \\psi_2(z,0) + i \\psi_1(z,0) = 2z + i(0) = 2z$$
5. Integrate with respect to $z$:
   $$f(z) = \\int 2z \\, dz = z^2 + C$$
   Since $v = \\text{Im}(f(z)) = 2xy$, the constant $C$ must be a real constant to avoid adding imaginary components.

---

# Why This Step Works
* Integrating the analytic derivative matches the real and imaginary parts across the entire plane, establishing the unique function family.

---

# Formula Used
* $f'(z) = v_y(z,0) + i v_x(z,0)$

---

# Similar Patterns to Remember
* Given $u = x^2 - y^2 \\implies f(z) = z^2 + iC$ (where $C$ is real).

---

# Common Mistakes
* Using the real-part formula by mistake: $f'(z) = u_x - i u_y$, which changes signs and gives the wrong answer.
* Writing a complex integration constant without specifying that its imaginary part must be zero.

---

# Final Answer
$$\\boxed{f(z) = z^2 + C \\quad (\\text{where } C \\text{ is a real constant})}$$

---

# 10-Second Revision Notes
✓ $v_y = 2x \\implies v_y(z,0) = 2z$.
✓ $v_x = 2y \\implies v_x(z,0) = 0$.
✓ $f'(z) = 2z$.
✓ Integrate: $f(z) = z^2 + C$ (C is real).

---

# Memory Trick
"Integrate the derivative along the real line to restore the complex function."

---

# Exam Confidence Booster
Recognizing standard real/imaginary parts of $z^2, z^3, e^z$ saves substantial time. Always check if the function matches a basic power of $z$!"""

# Question 78
ANSWERS[78] = """# Question
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
  $$\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$

---

# Shortcut / Exam Trick
* Substitute $w$ points: $\\frac{w(1 - (-1))}{(w - (-1))(1 - 0)} = \\frac{2w}{w+1}$.
* Substitute $z$ points: $\\frac{(z-1)(i+1)}{(z+1)(i-1)} = \\frac{z-1}{z+1} (-i)$.
* Equate: $\\frac{2w}{w+1} = -i \\frac{z-1}{z+1}$.
* Solve for $w$:
  $$w = \\frac{-i(z-1)}{2(z+1) + i(z-1)} = \\frac{(1-z)i}{(2+i)z + 2-i}$$

---

# Step-by-Step Solution
1. Write the cross-ratio preservation equation:
   $$\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$
2. Substitute the given values ($z_1=1, z_2=i, z_3=-1$ and $w_1=0, w_2=1, w_3=-1$):
   $$\\frac{(w-0)(1 - (-1))}{(w - (-1))(1 - 0)} = \\frac{(z-1)(i - (-1))}{(z - (-1))(i - 1)}$$
3. Simplify both sides:
   $$\\text{Left Side} = \\frac{2w}{w+1}$$
   $$\\text{Right Side} = \\frac{z-1}{z+1} \\cdot \\frac{i+1}{i-1}$$
   Since $\\frac{i+1}{i-1} = \\frac{(i+1)^2}{i^2-1} = \\frac{2i}{-2} = -i$:
   $$\\frac{2w}{w+1} = -i \\frac{z-1}{z+1}$$
4. Solve for $w$:
   $$2w(z+1) = -i(z-1)(w+1)$$
   $$2wz + 2w = -iwz + iw - iz + i$$
   $$w(2z + 2 + iz - i) = i - iz$$
   $$w = \\frac{i(1-z)}{(2+i)z + (2-i)}$$

---

# Why This Step Works
* Preservation of the cross-ratio is a fundamental property of Mobius mappings, guaranteeing a unique conformal mapping between any two sets of three points.

---

# Formula Used
* Cross-ratio formula: $\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$

---

# Similar Patterns to Remember
* Mapping upper half-plane to unit disk.

---

# Common Mistakes
* Incorrectly simplifying the complex ratio: writing $\\frac{i+1}{i-1} = 1$ or $i$. Remember it evaluates to $-i$.
* Algebraic mistakes when isolating $w$.

---

# Final Answer
$$\\boxed{w = \\frac{(1-z)i}{(2+i)z + 2-i}}$$

---

# 10-Second Revision Notes
✓ Cross-ratio equation setup.
✓ Simplify $\\frac{i+1}{i-1} = -i$.
✓ Left side: $\\frac{2w}{w+1}$. Right side: $-i \\frac{z-1}{z+1}$.
✓ Cross-multiply and solve: $w = \\frac{(1-z)i}{(2+i)z + 2-i}$.

---

# Memory Trick
"The Mobius cross-ratio is just a system of coordinates that matches up points one-to-one."

---

# Exam Confidence Booster
You can verify your bilinear transformation by plugging in the original points: $z=1 \\to w=0$; $z=-1 \\to w=-1$. If they match, your answer is correct!"""

# Question 79
ANSWERS[79] = """# Question
In a heat transfer application, determine whether $u(x,y) = x^2 - y^2$ is harmonic and construct its harmonic conjugate.

---

# Concept Used
* **Topic Name**: Complex Variables
* **Sub-topic Name**: Harmonic Functions and Conjugates
* **Why Applicable**: A function $u(x,y)$ is harmonic if it satisfies Laplace's equation: $\\nabla^2 u = u_{xx} + u_{yy} = 0$. Its harmonic conjugate $v(x,y)$ is found using the Cauchy-Riemann equations.

---

# Pattern Recognition Trick
* Function: $u = x^2 - y^2$.
* Second derivatives: $u_{xx} = 2$, $u_{yy} = -2$.
* Sum: $2 - 2 = 0 \\implies$ Harmonic.
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
   $$u_x = 2x \\implies u_{xx} = 2$$
   $$u_y = -2y \\implies u_{yy} = -2$$
3. Verify Laplace's Equation:
   $$\\nabla^2 u = u_{xx} + u_{yy} = 2 + (-2) = 0$$
   Since the sum is zero, $u(x,y)$ is a **harmonic function**.
4. Set up Cauchy-Riemann equations to find the harmonic conjugate $v(x,y)$:
   $$v_y = u_x = 2x$$
   $$v_x = -u_y = 2y$$
5. Integrate $v_y = 2x$ with respect to $y$:
   $$v(x,y) = 2xy + h(x)$$
6. Differentiate $v(x,y)$ with respect to $x$ and equate to $v_x$:
   $$v_x = 2y + h'(x) = 2y \\implies h'(x) = 0 \\implies h(x) = C$$
7. Write the harmonic conjugate:
   $$v(x,y) = 2xy + C$$

---

# Why This Step Works
* Laplace's equation represents physical steady-state distributions (like temperature or electric potential). The conjugate represent lines orthogonal to these potentials.

---

# Formula Used
* Laplace's Equation: $u_{xx} + u_{yy} = 0$
* Cauchy-Riemann Equations: $v_y = u_x, \\quad v_x = -u_y$

---

# Similar Patterns to Remember
* $u = xy \\implies v = \\frac{y^2-x^2}{2} + C$.

---

# Common Mistakes
* Stating $u(x,y)$ is not harmonic by making a sign error in the second derivative (e.g. $u_{yy} = 2$).
* Missing the constant $C$ in the harmonic conjugate.

---

# Final Answer
$$\\boxed{u(x,y) \\text{ is harmonic, and its harmonic conjugate is } v(x,y) = 2xy + C.}$$

---

# 10-Second Revision Notes
✓ $u_{xx} = 2, u_{yy} = -2 \\implies u_{xx}+u_{yy}=0$ (Harmonic).
✓ $v_y = 2x \\implies v = 2xy + h(x)$.
✓ $v_x = 2y \\implies h'(x) = 0$.
✓ Conjugate is $2xy + C$.

---

# Memory Trick
"Real $z^2$ is $x^2-y^2$; imaginary $z^2$ is $2xy$. They are partners (conjugates)."

---

# Exam Confidence Booster
Spotting $x^2-y^2$ means you don't need to do any work to find the conjugate—it is always $2xy$ plus a constant!"""

# Question 80
ANSWERS[80] = """# Question
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
  $$\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$

---

# Shortcut / Exam Trick
* Substitute $w$: $\\frac{(w-1)(-1)}{(w)(-2)} = \\frac{w-1}{2w}$.
* Substitute $z$: $\\frac{z(2i)}{(z+i)i} = \\frac{2z}{z+i}$.
* Equate: $\\frac{w-1}{2w} = \\frac{2z}{z+i}$.
* Solve for $w$:
  $$w(z+i) - (z+i) = 4wz \\implies w(z+i - 4z) = z+i \\implies w = \\frac{z+i}{-3z+i}$$

---

# Step-by-Step Solution
1. State the cross-ratio preservation equation:
   $$\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$$
2. Substitute the points:
   $$\\frac{(w-1)(-1 - 0)}{(w - 0)(-1 - 1)} = \\frac{(z-0)(i - (-i))}{(z - (-i))(i - 0)}$$
3. Simplify both sides:
   $$\\frac{-(w-1)}{-2w} = \\frac{2iz}{(z+i)i} \\implies \\frac{w-1}{2w} = \\frac{2z}{z+i}$$
4. Cross-multiply and solve for $w$:
   $$(w-1)(z+i) = 4wz$$
   $$w(z+i) - (z+i) = 4wz$$
   $$w(z+i - 4z) = z+i$$
   $$w(i - 3z) = z+i$$
   $$w = \\frac{z+i}{-3z+i}$$
5. **Engineering Significance**:
   * Bilinear mappings are used in digital filter design (e.g., the Bilinear Transform in DSP).
   * It maps the continuous-time s-plane (analog domain) to the discrete-time z-plane (digital domain), preserving system stability properties.

---

# Why This Step Works
* Setting up the ratio balances the scaling and translational transformations across the domains, mapping the three defined reference anchors uniquely.

---

# Formula Used
* Cross-ratio formula: $\\frac{(w-w_1)(w_2-w_3)}{(w-w_3)(w_2-w_1)} = \\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}$

---

# Similar Patterns to Remember
* Tustin's approximation for digital control systems: $s = \\frac{2}{T} \\frac{z-1}{z+1}$.

---

# Common Mistakes
* Writing the denominator as $-3z-i$ due to sign errors during expansion.
* Confusing the order of points in the cross-ratio formula.

---

# Final Answer
$$\\boxed{w = \\frac{z+i}{-3z+i}}$$

---

# 10-Second Revision Notes
✓ Substitute points in the cross-ratio.
✓ Left side becomes $\\frac{w-1}{2w}$; right side becomes $\\frac{2z}{z+i}$.
✓ Solve: $w(z+i - 4z) = z+i \\implies w = \\frac{z+i}{-3z+i}$.
✓ Significance: Used in s-to-z plane transformations in DSP.

---

# Memory Trick
"The cross ratio keeps the boundary points locked in place during mapping."

---

# Exam Confidence Booster
Check the edge cases: $z=0 \\to w = i/i = 1$; $z=-i \\to w = 0$. These quick checks guarantee your formula is correct!"""


def process():
    with open('maths.txt', 'r') as f:
        content = f.read()
        
    # Convert block math delimiters from [ ] to $$
    content = re.sub(r'(?m)^\[\s*$', '$$', content)
    content = re.sub(r'(?m)^\s*\]\s*$', '$$', content)
    
    # Split by $$ to separate text blocks from math blocks
    parts = content.split('$$')
    
    for i in range(len(parts)):
        if i % 2 == 0:
            # We are OUTSIDE block math (this is regular text)
            # We convert inline math (...) to $...$
            def inline_replacer(match):
                text = match.group(1)
                if 'Questions' in text or 'Hint' in text or 'Marks' in text:
                    return f"({text})"
                # Check if it contains math operators or looks like a variable
                if re.search(r'[=^_\\]|[+\-*/<>]', text) or len(text.strip()) <= 5:
                    return f"${text}$"
                return f"({text})"
            
            parts[i] = re.sub(r'\(([^()]+)\)', inline_replacer, parts[i])
            # Run second pass for nested like ((1,1,1))
            parts[i] = re.sub(r'\(([^()]+)\)', inline_replacer, parts[i])
        else:
            # We are INSIDE block math. Do NOT convert (...) to $...$.
            pass
            
    content = '$$'.join(parts)
    
    # Split by sections
    sections = re.split(r'### \d+\.\n', content)
    questions = sections[1:] # first element is the header
    
    subject_id = 'a1000000-0000-0000-0000-000000000001' # Engineering Mathematics II
    subject_name = '22MA201 - Engineering Mathematics II'
    
    sql_statements = []
    sql_statements.append("INSERT INTO questions (id, subject_id, question, answer, image_url, \"references\", notes, order_index) VALUES")
    
    for i, q in enumerate(questions):
        # Clean up
        q = q.split('---')[0].strip()
        q = q.replace("'", "''")
        
        uuid = f"e1000000-0000-0000-0000-{i+1:012d}"
        
        order_index = i + 1
        note = f"Module Test-I Q{i+1}" if i < 48 else f"Module Test-II Q{i-47}"
        
        ans = ANSWERS.get(order_index, 'Answer not provided in source text.')
        ans = ans.replace("'", "''")
        
        values = f"  ('{uuid}', '{subject_id}', '{q}', '{ans}', NULL, '{subject_name}', '{note}', {order_index})"
        
        if i == len(questions) - 1:
            values += "\nON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;"
        else:
            values += ","
            
        sql_statements.append(values)
        
    with open('seed_maths.sql', 'w') as f:
        f.write('\n'.join(sql_statements) + '\n')
        
if __name__ == '__main__':
    process()

