ANSWERS_6_TO_40 = {}

# Question 6
ANSWERS_6_TO_40[6] = """# Question
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
For any function of the form $y = e^{\alpha x}(C_1 \cos \beta x + C_2 \sin \beta x)$, the characteristic equation is $(m - \alpha)^2 + \beta^2 = 0 \implies m^2 - 2\alpha m + (\alpha^2 + \beta^2) = 0$.
Here, $\alpha = 1, \beta = 1$.
The differential equation is: $y'' - 2y' + 2y = 0$, which is of order 2.

---

# Step-by-Step Solution
1. Start with the given equation:
   $$y = e^x(a\cos x + b\sin x)$$  --- (1)
2. Differentiate with respect to $x$:
   $$y' = e^x(a\cos x + b\sin x) + e^x(-a\sin x + b\cos x)$$
   $$y' = y + e^x(-a\sin x + b\cos x)$$  --- (2)
3. Differentiate again with respect to $x$:
   $$y'' = y' + e^x(-a\sin x + b\cos x) + e^x(-a\cos x - b\sin x)$$
4. Substitute equation (2) and (1) into the expression for $y''$:
   $$y'' = y' + (y' - y) - y$$
   $$y'' = 2y' - 2y \implies y'' - 2y' + 2y = 0$$
5. Order: The highest derivative is $y''$, so the order is 2.

---

# Why This Step Works
* Differentiating twice is necessary to generate enough independent equations to eliminate the two arbitrary constants $a$ and $b$.

---

# Formula Used
* Product Rule: $\\frac{d}{dx}(uv) = u'v + uv'$
* derivatives: $\\frac{d}{dx}(\\cos x) = -\\sin x$, $\\frac{d}{dx}(\\sin x) = \\cos x$

---

# Similar Patterns to Remember
* $y = e^{2x}(a\\cos 3x + b\\sin 3x) \\implies y'' - 4y' + 13y = 0$ (Order 2)

---

# Common Mistakes
* Guessing order 1 because of a single exponential term.
* Forgetting to apply the product rule when differentiating $e^x(a\cos x + b\sin x)$.

---

# Final Answer
$$\\boxed{\\text{Order: } 2. \\text{ The resulting differential equation is } y'' - 2y' + 2y = 0.}$$

---

# 10-Second Revision Notes
✓ Count arbitrary constants: $a, b \implies 2$ constants.
✓ Therefore, the order of the resulting differential equation must be exactly 2.

---

# Memory Trick
"Number of arbitrary constants = Order of the differential equation."

---

# Exam Confidence Booster
Instantly count independent parameters. If you see $a$ and $b$ multiplying linearly independent functions, order is 2. No differentiation needed to determine order!"""

# Question 7
ANSWERS_6_TO_40[7] = """# Question
A sensor cools from $90^\\circ C$ to $70^\\circ C$ in 8 minutes in a $20^\\circ C$ room. Find the cooling constant $k$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Newton's Law of Cooling
* **Why Applicable**: The rate of change of temperature is proportional to the difference between the object's temperature and the surrounding medium's temperature.

---

# Pattern Recognition Trick
Look for temperature change over time in a medium of constant temperature:
* $T(0) = T_0 = 90$
* $T(8) = 70$
* Surrounding Temperature $T_s = 20$

---

# Shortcut / Exam Trick
Use the integrated form:
$$k = \\frac{1}{t} \\ln\\left(\\frac{T_0 - T_s}{T(t) - T_s}\\right)$$
Substitute the values directly:
$$k = \\frac{1}{8} \\ln\\left(\\frac{90 - 20}{70 - 20}\\right) = \\frac{1}{8} \\ln(1.4)$$

---

# Step-by-Step Solution
1. Set up the differential equation:
   $$\\frac{dT}{dt} = -k(T - T_s)$$
2. Separate variables and integrate:
   $$\\ln(T - T_s) = -kt + C \\implies T(t) = T_s + (T_0 - T_s)e^{-kt}$$
3. Substitute $T_s = 20$ and $T_0 = 90$:
   $$T(t) = 20 + 70e^{-kt}$$
4. Use the boundary condition $T(8) = 70$:
   $$70 = 20 + 70e^{-8k} \\implies 50 = 70e^{-8k}$$
   $$e^{-8k} = \\frac{5}{7} \\implies -8k = \\ln(5/7)$$
   $$k = \\frac{1}{8} \\ln(7/5) = \\frac{1}{8} \\ln(1.4) \\approx 0.042 \\text{ min}^{-1}$$

---

# Why This Step Works
* Separating variables converts the physical rate equation into an algebraic relation between temperature and time.

---

# Formula Used
* $T(t) = T_s + (T_0 - T_s)e^{-kt}$
* $\\ln(a/b) = -\\ln(b/a)$

---

# Similar Patterns to Remember
* Cooling from $80^\\circ C$ to $60^\\circ C$ in $10^\circ C$ environment: $k = \\frac{1}{t} \\ln(\\frac{70}{50})$.

---

# Common Mistakes
* Using $T_0$ instead of $T_0 - T_s$ in the denominator.
* Forgetting to subtract room temperature $T_s$.

---

# Final Answer
$$\\boxed{k = \\frac{1}{8}\\ln(1.4) \\approx 0.042 \\text{ min}^{-1}}$$

---

# 10-Second Revision Notes
✓ $T(t) = T_s + A e^{-kt}$
✓ $70 = 20 + 70e^{-8k} \\implies e^{-8k} = 5/7$
✓ $k = \\frac{1}{8}\\ln(1.4)$

---

# Memory Trick
"Cooling is proportional to the excess temperature $(T - T_s)$."

---

# Exam Confidence Booster
Check if $k > 0$. If you get a negative value, you flipped the numerator and denominator in the log!"""

# Question 8
ANSWERS_6_TO_40[8] = """# Question
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
1. Set up the Newton's second law equation:
   $$m\\frac{dv}{dt} = mg \\implies \\frac{dv}{dt} = g$$
2. Integrate with respect to $t$:
   $$v(t) = gt + C$$
3. Apply initial condition "dropped from rest": $v(0) = 0$:
   $$0 = g(0) + C \\implies C = 0$$
4. Obtain the final velocity function:
   $$v(t) = gt$$

---

# Why This Step Works
* Integrating the constant acceleration of gravity yields a linear velocity function over time.

---

# Formula Used
* $\\int g \\, dt = gt + C$

---

# Similar Patterns to Remember
* Constant deceleration $a$: $v(t) = v_0 - at$.

---

# Common Mistakes
* Leaving the integration constant $C$ without applying the initial condition.
* Confusing distance with velocity.

---

# Final Answer
$$\\boxed{\\frac{dv}{dt} = g \\text{ and } v(t) = gt}$$

---

# 10-Second Revision Notes
✓ $v' = g \implies v = gt + C$
✓ Rest $\implies C = 0 \implies v = gt$.

---

# Memory Trick
"Velocity starts at zero and grows by $g$ every second."

---

# Exam Confidence Booster
Free fall without air resistance always yields $v = gt$. Use this to write down the solution in seconds."""

# Question 9
ANSWERS_6_TO_40[9] = """# Question
In an electric vehicle battery cooling system, the temperature $T$ satisfies $\\frac{dT}{dt} = -k(T - T_a)$ where $T_a$ is ambient temperature. Solve using separation of variables and evaluate the time required for the battery to reach a safe temperature given initial conditions.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Variables Separable Method
* **Why Applicable**: The temperature terms and time terms can be completely separated onto opposite sides of the equation.

---

# Pattern Recognition Trick
Equation is of the form: $\\frac{dT}{dt} = f(T)$. Move all $T$ terms to LHS and $dt$ to RHS.

---

# Shortcut / Exam Trick
The solution for any cooling system is:
$$t = \\frac{1}{k} \\ln\\left(\\frac{T_0 - T_a}{T_{safe} - T_a}\\right)$$

---

# Step-by-Step Solution
1. Start with the differential equation:
   $$\\frac{dT}{dt} = -k(T - T_a)$$
2. Separate variables:
   $$\\frac{dT}{T - T_a} = -k \\, dt$$
3. Integrate both sides:
   $$\\ln|T - T_a| = -kt + C \\implies T - T_a = A e^{-kt}$$
4. Apply initial condition $T(0) = T_0$:
   $$A = T_0 - T_a \\implies T(t) = T_a + (T_0 - T_a)e^{-kt}$$
5. To find the time $t_{safe}$ to reach $T_{safe}$:
   $$T_{safe} - T_a = (T_0 - T_a)e^{-k t_{safe}}$$
   $$e^{-k t_{safe}} = \\frac{T_{safe} - T_a}{T_0 - T_a} \\implies -k t_{safe} = \\ln\\left(\\frac{T_{safe} - T_a}{T_0 - T_a}\\right)$$
   $$t_{safe} = \\frac{1}{k} \\ln\\left(\\frac{T_0 - T_a}{T_{safe} - T_a}\\right)$$

---

# Why This Step Works
* Separation of variables allows us to integrate each side independently with respect to its own variable.

---

# Formula Used
* $\\int \\frac{1}{x} \\, dx = \\ln|x|$
* $\\int k \\, dt = kt$

---

# Similar Patterns to Remember
* Radioactive decay $\\frac{dN}{dt} = -kN \\implies N(t) = N_0 e^{-kt}$.

---

# Common Mistakes
* Writing $T(t) = T_0 e^{-kt}$ and forgetting the offset ambient temperature $T_a$.
* Flipping the numerator and denominator in the final logarithm.

---

# Final Answer
$$\\boxed{T(t) = T_a + (T_0 - T_a)e^{-kt} \\quad \\text{and} \\quad t = \\frac{1}{k} \\ln\\left(\\frac{T_0 - T_a}{T_{safe} - T_a}\\right)}$$

---

# 10-Second Revision Notes
✓ Separated: $\\frac{dT}{T - T_a} = -k \\, dt$
✓ Integrate: $\\ln(T-T_a) = -kt + C$
✓ Solve for $t$: $t = \\frac{1}{k}\\ln(\\frac{\\Delta T_{initial}}{\\Delta T_{final}})$

---

# Memory Trick
"Time taken is proportional to log of ratio of initial to final temperature difference."

---

# Exam Confidence Booster
Check dimensions: the argument of the natural logarithm must be dimensionless (ratio of temperatures). This ensures your formula is set up correctly."""

# Question 10
ANSWERS_6_TO_40[10] = """# Question
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
   $$\\frac{dv}{dt} = -kv$$
2. Separate variables and integrate:
   $$\\frac{dv}{v} = -k \\, dt \\implies \\ln v = -kt + C \\implies v(t) = v_0 e^{-kt}$$
3. Substitute initial velocity $v_0 = 20$:
   $$v(t) = 20e^{-kt}$$
4. Use condition $v(5) = 10$:
   $$10 = 20e^{-5k} \\implies e^{-5k} = 0.5 \\implies -5k = \\ln(0.5) \\implies k = \\frac{\\ln 2}{5} \\approx 0.1386$$
5. Find velocity at $t = 10$:
   $$v(10) = 20 e^{-10k} = 20 (e^{-5k})^2 = 20 (0.5)^2 = 20 \\times 0.25 = 5 \\text{ m/s}$$

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
$$\\boxed{\\frac{dv}{dt} = -kv, \\quad v(t) = 20e^{-0.1386t}, \\quad v(10) = 5 \\text{ m/s}}$$

---

# 10-Second Revision Notes
✓ $v' = -kv \implies v = v_0 e^{-kt}$
✓ $v(5) = 10 \implies e^{-5k} = 1/2$
✓ $v(10) = 20 (e^{-5k})^2 = 20(1/4) = 5$ m/s.

---

# Memory Trick
"In exponential decay, equal time intervals result in equal factor reductions."

---

# Exam Confidence Booster
Recognize half-lives. If it goes from 20 to 10 in 5s, it will go from 10 to 5 in another 5s (total 10s). You can write the answer instantly!"""

# Question 11
ANSWERS_6_TO_40[11] = """# Question
In a wireless sensor system, signal strength $S$ (written as $h$ in the formula $\\frac{dh}{dt} = -k\\sqrt{h}$) decays as $\\frac{dh}{dt} = -k\\sqrt{h}$. Solve the equation using separation of variables and analyze how initial signal strength influences transmission range.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Variables Separable Method
* **Why Applicable**: The variables $h$ and $t$ can be separated onto opposite sides of the equation.

---

# Pattern Recognition Trick
Separate $h$ terms: $\\frac{dh}{\\sqrt{h}} = -k \\, dt$.

---

# Shortcut / Exam Trick
Integrating $h^{-1/2}$ yields $2\\sqrt{h}$. The relation is:
$$t_{range} = \\frac{2\\sqrt{h_0}}{k}$$

---

# Step-by-Step Solution
1. Start with the differential equation:
   $$\\frac{dh}{dt} = -k\\sqrt{h}$$
2. Separate variables:
   $$h^{-1/2} \\, dh = -k \\, dt$$
3. Integrate both sides:
   $$2\\sqrt{h} = -kt + C$$
4. Apply initial condition $h(0) = h_0$:
   $$2\\sqrt{h_0} = C \\implies 2\\sqrt{h(t)} = 2\\sqrt{h_0} - kt$$
5. Solve for $h(t)$:
   $$h(t) = \\left(\\sqrt{h_0} - \\frac{kt}{2}\\right)^2$$
6. Range Analysis: The transmission range terminates when signal strength $h(t) = 0$:
   $$\\sqrt{h_0} - \\frac{kt_{range}}{2} = 0 \\implies t_{range} = \\frac{2\\sqrt{h_0}}{k}$$
   Thus, the transmission range is proportional to the square root of the initial signal strength $\\sqrt{h_0}$.

---

# Why This Step Works
* Integration converts the rate of decay into a relationship mapping signal strength to elapsed time.

---

# Formula Used
* $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1}$ for $n = -1/2$.

---

# Similar Patterns to Remember
* Torricelli's Law for draining a tank: $\\frac{dh}{dt} = -c\\sqrt{h}$.

---

# Common Mistakes
* Integrating $\\frac{1}{\\sqrt{h}}$ as $\\ln(\\sqrt{h})$.
* Assuming signal strength decays exponentially instead of quadratically.

---

# Final Answer
$$\\boxed{h(t) = \\left(\\sqrt{h_0} - \\frac{kt}{2}\\right)^2 \\quad \\text{and} \\quad t_{range} = \\frac{2\\sqrt{h_0}}{k}}$$

---

# 10-Second Revision Notes
✓ $h^{-1/2}dh = -kdt \implies 2\\sqrt{h} = -kt + 2\\sqrt{h_0}$
✓ $h(t) = 0 \implies t = \\frac{2\\sqrt{h_0}}{k}$
✓ Range scales as $\\sqrt{h_0}$.

---

# Memory Trick
"Square root decay means the range depends on the square root of the starting value."

---

# Exam Confidence Booster
If asked about range dependency, remember: for $\\frac{dh}{dt} = -k h^n$, the range scales with $h_0^{1-n}$. For $n=0.5$, $1-0.5 = 0.5$ (square root). Save time!"""

# Question 12
ANSWERS_6_TO_40[12] = """# Question
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
$$N(t) = 500 \\times 3^{t/4}$$
For $t = 6$:
$$N(6) = 500 \\times 3^{6/4} = 500 \\times 3^{1.5} = 500 \\times 3\\sqrt{3} = 1500\\sqrt{3} \\approx 2598$$

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$\\frac{dN}{dt} = kN \\implies N(t) = N_0 e^{-kt}$$
2. Substitute $N_0 = 500$:
   $$N(t) = 500e^{-kt}$$
3. Use condition $N(4) = 1500$:
   $$1500 = 500e^{4k} \\implies e^{4k} = 3 \\implies k = \\frac{\\ln 3}{4} \\approx 0.2747$$
4. Predict population at $t = 6$:
   $$N(6) = 500 e^{6k} = 500 e^{6 \\frac{\\ln 3}{4}} = 500 e^{1.5 \\ln 3} = 500 \\times 3^{1.5}$$
   $$N(6) = 500 \\times 3\\sqrt{3} = 1500\\sqrt{3} \\approx 2598 \\text{ bacteria}$$

---

# Why This Step Works
* Unlimited resources lead to growth rate proportional to the population size, giving an exponential curve.

---

# Formula Used
* $N(t) = N_0 e^{-kt}$
* $e^{a \\ln b} = b^a$

---

# Similar Patterns to Remember
* Doubling time model: $N(t) = N_0 2^{t/t_{double}}$.

---

# Common Mistakes
* Assuming linear growth (e.g., adding 1000 bacteria every 4 hours, which would give $500 + 1500 = 2000$ at 6 hours).
* Incorrectly evaluating $3^{1.5}$ as $4.5$.

---

# Final Answer
$$\\boxed{N(t) = 500 e^{0.2747t} \\quad \\text{and} \\quad N(6) = 1500\\sqrt{3} \\approx 2598}$$

---

# 10-Second Revision Notes
✓ $N = N_0 e^{kt} \implies N(4) = 500 e^{4k} = 1500 \implies e^{4k} = 3$
✓ $N(6) = 500 (e^{4k})^{1.5} = 500(3^{1.5}) = 1500\\sqrt{3}$.

---

# Memory Trick
"Growth factor is $3^{t/4}$. Plug in $t=6$ to get factor $3^{1.5}$."

---

# Exam Confidence Booster
Expressing the base in terms of the growth multiplier (3) instead of $e$ makes the calculation much easier to evaluate without a scientific calculator."""

# Question 13
ANSWERS_6_TO_40[13] = """# Question
A damping system in machinery follows $\\frac{dy}{dx} - \\frac{2y}{x+1} = (x+1)^3$. An engineer incorrectly assumes integrating factor $e^{-2x}$, leading to wrong results. Identify the mistake, compute correct integrating factor, and solve the equation.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Linear ODE (Leibnitz Method)
* **Why Applicable**: The equation is in the standard first-order linear form: $\\frac{dy}{dx} + P(x)y = Q(x)$.

---

# Pattern Recognition Trick
Identify $P(x)$ and $Q(x)$ from $\\frac{dy}{dx} - \\frac{2}{x+1}y = (x+1)^3$:
* $P(x) = -\\frac{2}{x+1}$
* $Q(x) = (x+1)^3$

---

# Shortcut / Exam Trick
For $P(x) = \\frac{n}{x+a}$, the integrating factor is:
$$IF = e^{\\int \\frac{n}{x+a} \\, dx} = e^{n\\ln(x+a)} = (x+a)^n$$
Here, $n = -2, a = 1 \\implies IF = (x+1)^{-2} = \\frac{1}{(x+1)^2}$.

---

# Step-by-Step Solution
1. Identify the engineer's mistake:
   * The engineer assumed $P(x) = -2$ (a constant), ignoring the variable denominator $(x+1)$. Thus, they computed $IF = e^{\\int -2 \\, dx} = e^{-2x}$. This is incorrect because $P(x)$ is a function of $x$, i.e., $-\\frac{2}{x+1}$.
2. Compute the correct Integrating Factor (IF):
   $$IF = e^{\\int P(x)\\,dx} = e^{\\int -\\frac{2}{x+1}\\,dx} = e^{-2\\ln|x+1|} = (x+1)^{-2} = \\frac{1}{(x+1)^2}$$
3. Set up the solution format:
   $$y \\cdot IF = \\int Q(x) \\cdot IF \\, dx$$
4. Substitute the values:
   $$y \\frac{1}{(x+1)^2} = \\int (x+1)^3 \\frac{1}{(x+1)^2} \\, dx$$
   $$\\frac{y}{(x+1)^2} = \\int (x+1) \\, dx = \\frac{(x+1)^2}{2} + C$$
5. Solve for $y$:
   $$y(x) = \\frac{(x+1)^4}{2} + C(x+1)^2$$

---

# Why This Step Works
* The integrating factor transforms the left side of the equation into the derivative of a product: $\\frac{d}{dx}[y \\cdot IF]$.

---

# Formula Used
* $IF = e^{\\int P(x) \\, dx}$
* $e^{\\ln f(x)} = f(x)$

---

# Similar Patterns to Remember
* $y' + \\frac{y}{x} = x \\implies IF = x$.

---

# Common Mistakes
* Forgetting the negative sign in $P(x) = -\\frac{2}{x+1}$.
* Integrating $\\ln(x+1)$ incorrectly.

---

# Final Answer
$$\\boxed{\\text{Mistake: Assumed } P(x) = -2; \\quad IF = \\frac{1}{(x+1)^2}; \\quad y(x) = \\frac{(x+1)^4}{2} + C(x+1)^2}$$

---

# 10-Second Revision Notes
✓ $P(x) = -2/(x+1) \\implies IF = e^{-2\\ln(x+1)} = (x+1)^{-2}$
✓ $y (x+1)^{-2} = \\int (x+1) dx = \\frac{1}{2}(x+1)^2 + C$
✓ Multiply: $y = \\frac{1}{2}(x+1)^4 + C(x+1)^2$.

---

# Memory Trick
"Integrate the coefficient of $y$ in the exponent. Don't omit the denominator!"

---

# Exam Confidence Booster
Check the final answer by differentiating: $y' = 2(x+1)^3 + 2C(x+1)$. Plug it back in to confirm it matches the original differential equation. That ensures $100\%$ accuracy!"""

# Question 14
ANSWERS_6_TO_40[14] = """# Question
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
$$P(t) = \\frac{M}{1 + Ae^{-kt}}$$
where $A = \\frac{M - P_0}{P_0} = \\frac{5000-5}{5} = 999$.

---

# Step-by-Step Solution
1. Formulate the logistic differential equation:
   $$\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{5000}\\right)$$
2. Write the general solution:
   $$P(t) = \\frac{5000}{1 + Ae^{-kt}}$$
3. Determine constant $A$ using $P(0) = 5$:
   $$5 = \\frac{5000}{1 + A} \\implies 1 + A = 1000 \\implies A = 999$$
4. Determine constant $k$ using $P(4) = 50$:
   $$50 = \\frac{5000}{1 + 999e^{-4k}} \\implies 1 + 999e^{-4k} = 100$$
   $$999e^{-4k} = 99 \\implies e^{-4k} = \\frac{99}{999} = \\frac{11}{111} \\approx 0.0991$$
   $$-4k = \\ln(0.0991) \\implies k \\approx 0.5786 \\text{ day}^{-1}$$
5. Evaluate population at $t = 10$:
   $$e^{-10k} = (e^{-4k})^{2.5} \\approx (0.0991)^{2.5} \\approx 0.00306$$
   $$P(10) = \\frac{5000}{1 + 999(0.00306)} = \\frac{5000}{1 + 3.057} = \\frac{5000}{4.057} \\approx 1232 \\text{ students}$$

---

# Why This Step Works
* The logistic model combines exponential growth at low numbers with an asymptotic slowing down as carrying capacity is approached.

---

# Formula Used
* $P(t) = \\frac{M}{1 + Ae^{-kt}}$
* $A = \\frac{M - P_0}{P_0}$

---

# Similar Patterns to Remember
* Market adoption of a technology in a population of size $N$.

---

# Common Mistakes
* Assuming simple exponential growth, which leads to values larger than the population of 5000.
* Forgetting to solve for $A$ before attempting to calculate $k$.

---

# Final Answer
$$\\boxed{\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{5000}\\right), \\quad P(10) \\approx 1232 \\text{ students}}$$

---

# 10-Second Revision Notes
✓ $A = (5000-5)/5 = 999$
✓ $e^{-4k} = 99/999 = 11/111$
✓ $P(10) = 5000 / (1 + 999 \\times (11/111)^{2.5}) \\approx 1232$.

---

# Memory Trick
"Logistic curves shape like an 'S': fast in the middle, slow at the top."

---

# Exam Confidence Booster
Always check that your computed population is less than the carrying capacity $M$. Here $1232 < 5000$, validating the result."""

# Question 15
ANSWERS_6_TO_40[15] = """# Question
In an electric vehicle, the battery pack experiences non-uniform heating during fast charging. The temperature rise is influenced by internal resistance and external cooling, leading to the model $\\frac{dy}{dx} + 3y = 2x - 1$ where $y$ represents temperature deviation and $x$ represents time. Find the temperature distribution using Leibnitz method and analyze whether the system reaches thermal stability.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: First Order Linear ODE (Leibnitz Method)
* **Why Applicable**: The model has the form $y' + Py = Q$ where $P = 3$ (constant) and $Q = 2x - 1$ (function of $x$).

---

# Pattern Recognition Trick
Identify $P$ and $Q$:
* $P = 3$
* $Q = 2x - 1$

---

# Shortcut / Exam Trick
For $y' + ay = px + q$, the particular solution is of the form $y_p = Ax + B$.
Differentiate and substitute:
$$A + 3(Ax + B) = 2x - 1 \\implies 3Ax + (A + 3B) = 2x - 1$$
* $3A = 2 \\implies A = 2/3$
* $A + 3B = -1 \\implies 2/3 + 3B = -1 \\implies 3B = -5/3 \\implies B = -5/9$
So $y_p = \\frac{2x}{3} - \\frac{5}{9}$.
The complete solution is $y = C e^{-3x} + \\frac{2x}{3} - \\frac{5}{9}$.

---

# Step-by-Step Solution
1. Identify coefficients: $P = 3, Q = 2x - 1$.
2. Compute Integrating Factor:
   $$IF = e^{\\int 3 \\, dx} = e^{3x}$$
3. Apply general solution formula:
   $$y \\cdot e^{3x} = \\int (2x - 1)e^{3x} \\, dx$$
4. Integrate using integration by parts (Bernoulli's rule):
   $$\\int (2x - 1)e^{3x} \\, dx = (2x - 1)\\frac{e^{3x}}{3} - (2)\\frac{e^{3x}}{9} + C$$
   $$y \\cdot e^{3x} = \\left(\\frac{2x}{3} - \\frac{1}{3} - \\frac{2}{9}\\right)e^{3x} + C = \\left(\\frac{2x}{3} - \\frac{5}{9}\\right)e^{3x} + C$$
5. Divide by $e^{3x}$:
   $$y(x) = \\frac{2x}{3} - \\frac{5}{9} + Ce^{-3x}$$
6. **Thermal Stability Analysis**:
   * As $x \\to \\infty$ (long time): the transient term $Ce^{-3x} \\to 0$.
   * However, $y(x) \\approx \\frac{2x}{3} - \\frac{5}{9}$, which grows linearly without bound as $x \\to \\infty$.
   * Thus, the system does not reach a constant thermal stability.

---

# Why This Step Works
* Multiplying by $e^{3x}$ bundles $y' + 3y$ into a single derivative term, which is directly integrable.

---

# Formula Used
* $\\int u \\, dv = uv - \\int v \\, du$
* $\\lim_{x \\to \\infty} e^{-3x} = 0$

---

# Similar Patterns to Remember
* Heating with constant power input: $y' + ay = b \\implies y = C e^{-ay} + b/a$ (this system *does* stabilize since the RHS is constant).

---

# Common Mistakes
* Forgetting to multiply the constant of integration $C$ by $e^{-3x}$ when dividing.
* Incorrectly concluding the system is stable because $e^{-3x}$ decays.

---

# Final Answer
$$\\boxed{y(x) = \\frac{2x}{3} - \\frac{5}{9} + Ce^{-3x} \\quad \\text{and} \\quad \\text{System is unstable (grows linearly).}}$$

---

# 10-Second Revision Notes
✓ $IF = e^{3x}$
✓ $y e^{3x} = \\int (2x-1)e^{3x} dx = \\frac{1}{9}(6x-5)e^{3x} + C$
✓ $y = \\frac{6x-5}{9} + Ce^{-3x}$.
✓ Growth is linear $\\implies$ not stable.

---

# Memory Trick
"Linear forcing ($2x-1$) yields linear steady-state response. Constant values are needed for stability."

---

# Exam Confidence Booster
For $y' + ay = px + q$, check the steady-state limit. If the power input term has an $x$ term, the final temperature will always diverge linearly."""

# Question 16
ANSWERS_6_TO_40[16] = """# Question
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
$$P(t) = \\frac{M}{1 + Ae^{-kt}}$$
where $A = \\frac{1000-50}{50} = 19$.

---

# Step-by-Step Solution
1. Set up the logistic model:
   $$P(t) = \\frac{1000}{1 + 19e^{-kt}}$$
2. Find $k$ using $P(2) = 200$:
   $$200 = \\frac{1000}{1 + 19e^{-2k}} \\implies 1 + 19e^{-2k} = 5$$
   $$19e^{-2k} = 4 \\implies e^{-2k} = \\frac{4}{19} \\approx 0.2105$$
   $$-2k = \\ln(4/19) \\implies k \\approx 0.7791 \\text{ hour}^{-1}$$
3. Predict population at $t = 6$:
   $$e^{-6k} = (e^{-2k})^3 = \\left(\\frac{4}{19}\\right)^3 = \\frac{64}{6859} \\approx 0.00933$$
   $$P(6) = \\frac{1000}{1 + 19(0.00933)} = \\frac{1000}{1 + 0.1773} = \\frac{1000}{1.1773} \\approx 849.4 \\text{ units}$$

---

# Why This Step Works
* Substituting $e^{-6k}$ as $(e^{-2k})^3$ avoids calculating $k$ explicitly, preventing rounding errors.

---

# Formula Used
* $P(t) = \\frac{M}{1 + Ae^{-kt}}$

---

# Similar Patterns to Remember
* Population growth in a finite space.

---

# Common Mistakes
* Rounding $k$ too early, which leads to large errors when computing $e^{-6k}$.
* Assuming growth is exponential forever.

---

# Final Answer
$$\\boxed{\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{1000}\\right) \\quad \\text{and} \\quad P(6) \\approx 849.4 \\text{ units}}$$

---

# 10-Second Revision Notes
✓ $A = 19$
✓ $e^{-2k} = 4/19$
✓ $P(6) = 1000 / (1 + 19 \\times (4/19)^3) \\approx 849.4$.

---

# Memory Trick
"Replace $e^{-2k}$ with its fraction value and raise it to the appropriate power for easy calculation."

---

# Exam Confidence Booster
Compute $(e^{-2k})^3$ directly instead of finding $k$ first. This saves time and keeps the calculation highly accurate."""

# Question 17
ANSWERS_6_TO_40[17] = """# Question
Classify and justify the equation: $\\frac{d^2y}{dx^2} + 3y = \\sin x$.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Classification of Ordinary Differential Equations
* **Why Applicable**: We evaluate the order, degree, linearity, and homogeneity of the differential equation using standard math definitions.

---

# Pattern Recognition Trick
Identify components of $y'' + 3y = \sin x$:
* Highest derivative: 2
* Power of highest derivative: 1
* Linearity check: no terms like $y^2$, $yy'$, etc.
* RHS is non-zero function of $x$: $\sin x$

---

# Shortcut / Exam Trick
Quick check:
* $y'' \implies$ Second-order.
* No non-linear terms in $y \implies$ Linear.
* Constant multipliers of $y \implies$ Constant coefficients.
* RHS $\neq 0 \implies$ Non-homogeneous.

---

# Step-by-Step Solution
1. **Determine Order**: The highest derivative appearing in the equation is $\\frac{d^2y}{dx^2}$, which is of order 2.
2. **Determine Degree**: The exponent of the highest derivative is 1, so the degree is 1.
3. **Determine Linearity**: The dependent variable $y$ and its derivative $y''$ appear only to the first power and are not multiplied together. Thus, the equation is **linear**.
4. **Determine Coefficients**: The coefficients of $y''$ (which is 1) and $y$ (which is 3) are constants.
5. **Determine Homogeneity**: The right-hand side is $\\sin x \\neq 0$, so the equation is **non-homogeneous**.

---

# Why This Step Works
* Classification helps select the appropriate solving method (e.g., complementary function + particular integral).

---

# Formula Used
* Linear ODE format: $a_n(x)y^{(n)} + \\dots + a_0(x)y = f(x)$

---

# Similar Patterns to Remember
* $y'' + 2y' + 5y = 0$ (Second-order, linear, homogeneous).

---

# Common Mistakes
* Classifying the equation as non-linear because of the $\sin x$ term. Linearity only applies to the dependent variable $y$ and its derivatives, not the independent variable $x$.

---

# Final Answer
$$\\boxed{\\text{Second-order, linear, ordinary differential equation with constant coefficients, non-homogeneous.}}$$

---

# 10-Second Revision Notes
✓ $y'' \implies$ Order 2.
✓ linear in $y$ and $y'' \implies$ Linear.
✓ RHS $= \\sin x \\implies$ Non-homogeneous.

---

# Memory Trick
"Linearity is about $y$, not $x$. $\sin x$ doesn't break linearity!"

---

# Exam Confidence Booster
Always check the RHS first. If it has a function of $x$, it is immediately classified as non-homogeneous. That's a quick point in exams."""

# Question 18
ANSWERS_6_TO_40[18] = """# Question
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
   * In physical systems with damping, $\\lim_{t \\to \\infty} y_c(t) = 0$.
3. **Steady-State Response ($y_p(t)$)**:
   * Solves the non-homogeneous equation $L(y) = f(t)$.
   * Represents the system's behavior forced by the external input $f(t)$.
   * It is independent of the initial conditions and persists as long as the force remains.

---

# Why This Step Works
* Linear superposition allows separating the free response (initial energy) from the forced response (external energy).

---

# Formula Used
* $y(t) = y_{\\text{transient}}(t) + y_{\\text{steady-state}}(t)$

---

# Similar Patterns to Remember
* AC electrical circuits where transient currents die out, leaving the steady-state sinusoidal current.

---

# Common Mistakes
* Assuming that $y_p$ is dependent on initial conditions. Initial conditions only affect the constants in $y_c$.

---

# Final Answer
$$\\boxed{\\text{The particular integral represents the steady-state response of the system forced by the external input.}}$$

---

# 10-Second Revision Notes
✓ $y_c \to$ transient (decays)
✓ $y_p \to$ steady-state (persists)
✓ $y_p$ depends only on the forcing function and system properties, not initial conditions.

---

# Memory Trick
"Transient passes, Particular stays."

---

# Exam Confidence Booster
If asked to find the steady-state solution of a forced system, only calculate the Particular Integral ($y_p$). You do not need to calculate the Complementary Function ($y_c$) at all!"""

# Question 19
ANSWERS_6_TO_40[19] = """# Question
A mass-spring system satisfies $x'' + 25x = 0$. Analyze and interpret amplitude, frequency, and nature of motion.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Spring-Mass Systems
* **Why Applicable**: The system is modeled by a second-order homogeneous ODE representing undamped free vibration.

---

# Pattern Recognition Trick
Identify the coefficient of $x$:
* $\\omega_0^2 = 25$
* No damping term ($x'$) present.

---

# Shortcut / Exam Trick
For $x'' + \omega_0^2 x = 0$:
* Natural angular frequency: $\\omega_0 = \\sqrt{25} = 5$ rad/s.
* Motion is Simple Harmonic Motion (SHM).

---

# Step-by-Step Solution
1. Identify the standard form:
   $$x'' + \\omega_0^2 x = 0$$
   Here, $\\omega_0^2 = 25 \\implies \\omega_0 = 5$ rad/s.
2. Determine frequency:
   * Angular frequency: $\\omega_0 = 5$ rad/s.
   * Cyclic frequency: $f = \\frac{\\omega_0}{2\\pi} = \\frac{5}{2\\pi}$ Hz.
   * Period: $T = \\frac{1}{f} = \\frac{2\\pi}{5}$ seconds.
3. Write the general solution:
   $$x(t) = C_1 \\cos 5t + C_2 \\sin 5t = A \\cos(5t - \\phi)$$
4. Determine Amplitude $A$:
   * $A = \\sqrt{C_1^2 + C_2^2}$, determined by initial displacement $x(0)$ and velocity $x'(0)$:
     $$A = \\sqrt{x(0)^2 + \\left(\\frac{x'(0)}{5}\\right)^2}$$
5. Interpret Nature of Motion:
   * Since there is no damping term ($c x'$), the system undergoes **Simple Harmonic Motion (SHM)** (undamped free oscillation) with constant amplitude indefinitely.

---

# Why This Step Works
* The roots of the auxiliary equation $m^2 + 25 = 0$ are purely imaginary ($m = \\pm 5i$), leading to pure sine and cosine solutions.

---

# Formula Used
* $\\omega_0 = \\sqrt{k/m}$
* $f = \\frac{\\omega_0}{2\\pi}$

---

# Similar Patterns to Remember
* Pendulum oscillations for small angles: $\\theta'' + \\omega^2 \\theta = 0$.

---

# Common Mistakes
* Stating the angular frequency is 25 instead of taking the square root to get 5.
* Assuming the motion decays (there is no damping coefficient, so it oscillates forever).

---

# Final Answer
$$\\boxed{\\omega_0 = 5 \\text{ rad/s}, \\quad f = \\frac{5}{2\\pi} \\text{ Hz}, \\quad \\text{Nature: Simple Harmonic Motion (SHM).}}$$

---

# 10-Second Revision Notes
✓ $\\omega_0^2 = 25 \\implies \\omega_0 = 5$ rad/s.
✓ No $x'$ term $\implies$ Undamped SHM.
✓ Amplitude depends on initial conditions.

---

# Memory Trick
"The square root of the coefficient of $x$ is the natural frequency."

---

# Exam Confidence Booster
Check the damping term. If there is no $x'$ term, the motion is always simple harmonic (pure oscillation). Save time classifying it!"""

# Question 20
ANSWERS_6_TO_40[20] = """# Question
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
* Frequency $f = \\frac{\\text{Cycles}}{\\text{Time}} = \\frac{50}{10} = 5$ Hz.
* Angular frequency $\\omega = 2\\pi f = 10\\pi$ rad/s.

---

# Step-by-Step Solution
1. Calculate cyclic frequency $f$:
   $$f = \\frac{\\text{Number of Cycles}}{\\text{Total Time}} = \\frac{50}{10} = 5 \\text{ Hz (cycles per second)}$$
2. Calculate angular frequency $\\omega$:
   $$\\omega = 2\\pi f = 2\\pi(5) = 10\\pi \\approx 31.42 \\text{ rad/s}$$
3. Calculate time period $T$:
   $$T = \\frac{1}{f} = \\frac{1}{5} = 0.2 \\text{ seconds}$$
4. **Engineering Significance**:
   * Frequency determines the dynamic behavior of the oscillator.
   * If an external force is applied at or near $5$ Hz, the system will experience **resonance**, resulting in extremely large vibration amplitudes and potential structural failure.
   * Used to design vibration isolators or dampening systems.

---

# Why This Step Works
* Frequency is the rate of oscillation, defined as cycles per unit time.

---

# Formula Used
* $f = \\frac{N}{t}$
* $\\omega = 2\\pi f$

---

# Similar Patterns to Remember
* Grid frequency (e.g., 50 Hz power supply).

---

# Common Mistakes
* Confusing cyclic frequency $f$ (Hz) with angular frequency $\\omega$ (rad/s).
* Calculating period instead of frequency ($10/50 = 0.2$ is the period, not frequency).

---

# Final Answer
$$\\boxed{f = 5 \\text{ Hz}, \\quad \\omega = 10\\pi \\approx 31.42 \\text{ rad/s}. \\text{ Significance: Resonance danger at } 5 \\text{ Hz}.}$$

---

# 10-Second Revision Notes
✓ $f = 50/10 = 5$ Hz.
✓ $\\omega = 2\\pi(5) = 10\\pi$ rad/s.
✓ Resonance occurs if excitation frequency equals natural frequency.

---

# Memory Trick
"Hertz is cycles per second. Rad/s is Hertz times $2\\pi$."

---

# Exam Confidence Booster
Always check the units requested: "frequency" can refer to either cyclic frequency $f$ in Hz or angular frequency $\\omega$ in rad/s. Write both to guarantee full credit!"""

# Question 21
ANSWERS_6_TO_40[21] = """# Question
A system follows $\\frac{d^2y}{dx^2} + 4y = 0$, $y(0) = 2$, $y'(0) = -4$. The complementary function is $y = C_1\\cos 2x + C_2\\sin 2x$. Determine the constants and interpret system behavior.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Initial Value Problems
* **Why Applicable**: We are given the general solution and two initial conditions ($y(0)$ and $y'(0)$) to solve for the two arbitrary constants.

---

# Pattern Recognition Trick
Use initial conditions at $x = 0$ to solve for $C_1$ and $C_2$ directly.

---

# Shortcut / Exam Trick
* At $x = 0$, the sine term is 0. So $y(0) = C_1 \\implies C_1 = 2$.
* The derivative of the sine term at $0$ is $2 C_2$. So $y'(0) = 2 C_2 \\implies 2 C_2 = -4 \\implies C_2 = -2$.

---

# Step-by-Step Solution
1. Start with the given solution:
   $$y(x) = C_1\\cos 2x + C_2\\sin 2x$$
2. Apply first initial condition $y(0) = 2$:
   $$y(0) = C_1\\cos(0) + C_2\\sin(0) = 2 \\implies C_1(1) + C_2(0) = 2 \\implies C_1 = 2$$
3. Differentiate $y(x)$:
   $$y'(x) = -2C_1\\sin 2x + 2C_2\\cos 2x$$
4. Apply second initial condition $y'(0) = -4$:
   $$y'(0) = -2(2)\\sin(0) + 2C_2\\cos(0) = -4$$
   $$0 + 2C_2(1) = -4 \\implies 2C_2 = -4 \\implies C_2 = -2$$
5. Write the final solution:
   $$y(x) = 2\\cos 2x - 2\\sin 2x$$
6. Interpret system behavior:
   * The system oscillates as an undamped harmonic oscillator.
   * Amplitude: $A = \\sqrt{C_1^2 + C_2^2} = \\sqrt{2^2 + (-2)^2} = \\sqrt{8} = 2\\sqrt{2} \\approx 2.828$.
   * Angular frequency: $\\omega = 2$ rad/s.

---

# Why This Step Works
* Evaluating at $x = 0$ simplifies the trigonometric terms, decouples the constants, and allows direct solution.

---

# Formula Used
* $y(0) = C_1$ (for $y = C_1 \\cos \\omega x + C_2 \\sin \\omega x$)
* $y'(0) = \\omega C_2$

---

# Similar Patterns to Remember
* Spring-mass system initial release: $x(0) = x_0$, $x'(0) = v_0$.

---

# Common Mistakes
* Forgetting the factor of $\omega = 2$ when differentiating the sine and cosine terms.
* Swapping the values of $C_1$ and $C_2$.

---

# Final Answer
$$\\boxed{C_1 = 2, \\quad C_2 = -2, \\quad y(x) = 2\\cos 2x - 2\\sin 2x. \\text{ Behavior: Undamped oscillation with amplitude } 2\\sqrt{2}.}$$

---

# 10-Second Revision Notes
✓ $y(0) = C_1 = 2$
✓ $y' = -2C_1\\sin 2x + 2C_2\\cos 2x \\implies y'(0) = 2C_2 = -4 \\implies C_2 = -2$.
✓ $y = 2\\cos 2x - 2\\sin 2x$.

---

# Memory Trick
"Cos controls initial position, Sin controls initial velocity (divided by natural frequency)."

---

# Exam Confidence Booster
Check: $y(0) = 2\\cos(0) - 2\\sin(0) = 2$ (correct). $y'(0) = -4\\sin(0) - 4\\cos(0) = -4$ (correct). Fast verification guarantees marks!"""

# Question 22
ANSWERS_6_TO_40[22] = """# Question
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
   * In mechanical systems: initial conditions represent initial position $x(0)$ and initial velocity $x'(0)$.
   * In electrical systems: they represent initial charge $q(0)$ and initial current $i(0) = q'(0)$.
   * These conditions define the starting energy stored in the system (potential energy in the spring/capacitor, kinetic energy in the mass/inductor).
3. **Effect on Solution**:
   * They determine the amplitude $A$ and phase angle $\\phi$ of the transient response.

---

# Why This Step Works
* Without initial conditions, we only have a family of infinite possible curves. Initial conditions lock in the single real physical trajectory.

---

# Formula Used
* $y(t) = y_c(t) + y_p(t)$
* $y(0) = y_0$, $y'(0) = v_0$

---

# Similar Patterns to Remember
* First-order systems (like cooling) only require one initial condition (initial temperature).

---

# Common Mistakes
* Thinking that initial conditions affect the steady-state particular integral $y_p$. They only determine the constants in the complementary function $y_c$.

---

# Final Answer
$$\\boxed{\\text{Initial conditions specify the starting state (position and velocity) to uniquely determine the two integration constants.}}$$

---

# 10-Second Revision Notes
✓ Second-order ODE $\implies$ 2 integration constants.
✓ Requires 2 initial conditions (typically $y(0)$ and $y'(0)$) to solve.
✓ Determines the transient phase and amplitude.

---

# Memory Trick
"Two derivatives require two integrations, which need two initial coordinates to resolve."

---

# Exam Confidence Booster
Remember that initial conditions are evaluated at a single point in time (usually $t=0$), whereas boundary conditions are evaluated at two different points (e.g., $x=0$ and $x=L$). Don't confuse them!"""

# Question 23
ANSWERS_6_TO_40[23] = """# Question
An LC circuit has equation $\\frac{d^2q}{dt^2} + \\frac{k}{m}q = 0$. Evaluate the effect of increasing $k$ on frequency.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Electrical Circuit Models / LC Oscillators
* **Why Applicable**: The system is modeled as a simple harmonic oscillator of the form $q'' + \\omega_0^2 q = 0$, where natural frequency is related to coefficients.

---

# Pattern Recognition Trick
Identify $\\omega_0^2$ from the coefficient of $q$:
* $\\omega_0^2 = \\frac{k}{m} \\implies \\omega_0 = \\sqrt{\\frac{k}{m}}$

---

# Shortcut / Exam Trick
* Frequency $\\omega_0 \\propto \\sqrt{k}$.
* Increasing $k$ increases frequency.

---

# Step-by-Step Solution
1. Identify the natural angular frequency of the system:
   $$\\omega_0^2 = \\frac{k}{m} \\implies \\omega_0 = \\sqrt{\\frac{k}{m}}$$
2. Relate angular frequency to cyclic frequency $f$:
   $$f = \\frac{\\omega_0}{2\\pi} = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$$
3. Analyze the effect of increasing $k$:
   * Since $k$ is in the numerator inside the square root, any increase in $k$ will directly cause an increase in both $\\omega_0$ and $f$.
   * Specifically, if $k$ increases by a factor of $N$, the frequency increases by a factor of $\\sqrt{N}$.
4. Physical interpretation:
   * In a mechanical spring-mass system, increasing $k$ means a stiffer spring, leading to faster vibrations.
   * In an LC circuit, $k/m$ represents $1/LC$, so increasing $k$ corresponds to decreasing capacitance $C$ or inductance $L$, which reduces electrical inertia and speeds up the oscillation.

---

# Why This Step Works
* Stiffer restoring forces (higher $k$) return the system to equilibrium faster, increasing the rate of oscillation.

---

# Formula Used
* $\\omega_0 = \\sqrt{\\frac{k}{m}}$

---

# Similar Patterns to Remember
* Simple pendulum frequency: $\\omega_0 = \\sqrt{\\frac{g}{L}}$. Increasing $g$ increases frequency.

---

# Common Mistakes
* Stating that frequency increases linearly with $k$. It increases with the square root of $k$ ($\\sqrt{k}$).
* Assuming frequency decreases because $m$ is in the denominator (the question asks about increasing $k$, not $m$).

---

# Final Answer
$$\\boxed{\\text{Increasing } k \\text{ increases the natural frequency } f \\text{ proportionally to } \\sqrt{k}.}$$

---

# 10-Second Revision Notes
✓ $\\omega_0 = \\sqrt{k/m}$
✓ $k \\uparrow \\implies \\omega_0 \\uparrow$
✓ Frequency scales as the square root of $k$.

---

# Memory Trick
"Stiffer springs (higher $k$) bounce faster!"

---

# Exam Confidence Booster
If an exam question asks for a quantitative change (e.g., "What happens if $k$ is quadrupled?"), you can instantly say frequency doubles because $\\sqrt{4} = 2$. Keep this square-root relation handy!"""

# Question 24
ANSWERS_6_TO_40[24] = """# Question
A spring-mass system in vibration analysis is modeled by $\\frac{d^2x}{dt^2} + \\omega^2x = 0$. Interpret the type of motion.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Mechanical Vibrations
* **Why Applicable**: The equation matches the classic second-order linear homogeneous ODE with purely imaginary roots, indicating no damping.

---

# Pattern Recognition Trick
* Equation: $x'' + \\omega^2 x = 0$
* Damping term ($x'$) coefficient = 0
* Restoring coefficient $\\omega^2 > 0$

---

# Shortcut / Exam Trick
No $x'$ term $\implies$ Undamped free vibration $\implies$ Simple Harmonic Motion (SHM).

---

# Step-by-Step Solution
1. Identify the auxiliary equation:
   $$m^2 + \\omega^2 = 0 \\implies m = \\pm i\\omega$$
2. Write the general solution:
   $$x(t) = C_1 \\cos \\omega t + C_2 \\sin \\omega t = A \\cos(\\omega t - \\phi)$$
3. Analyze system characteristics:
   * **Amplitude**: $A$ is constant over time (no decay).
   * **Frequency**: Oscillates at natural angular frequency $\\omega$ rad/s.
   * **Phase**: Shifted by phase angle $\\phi$.
4. Interpret motion type:
   * Since the amplitude is constant and there is no damping force to dissipate energy, the system undergoes **Simple Harmonic Motion (SHM)** (undamped free oscillation) indefinitely.

---

# Why This Step Works
* Purely imaginary roots in the auxiliary equation yield trigonometric terms (sines and cosines) without decaying exponential multipliers.

---

# Formula Used
* $x(t) = A \\cos(\\omega t - \\phi)$

---

# Similar Patterns to Remember
* Undamped LC circuit oscillations.

---

# Common Mistakes
* Calling the motion "damped" or "transient". Without a first derivative term, there is no damping.
* Confusing $\omega^2$ with cyclic frequency.

---

# Final Answer
$$\\boxed{\\text{Simple Harmonic Motion (SHM) / Undamped Free Vibration.}}$$

---

# 10-Second Revision Notes
✓ $x'' + \\omega^2 x = 0 \\implies m = \\pm i\\omega$
✓ Solution is pure sinusoids $\implies$ constant amplitude.
✓ Classify as Simple Harmonic Motion (SHM).

---

# Memory Trick
"No prime ($x'$), no decay!"

---

# Exam Confidence Booster
In vibration questions, the absence of the velocity term ($x'$) always guarantees that the motion is Simple Harmonic. This is a vital diagnostic shortcut!"""

# Question 25
ANSWERS_6_TO_40[25] = """# Question
An RLC circuit satisfies $\\frac{d^2i}{dt^2} + 4\\frac{di}{dt} + 4i = 0$. Determine complementary function and evaluate system response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: RLC Circuit Analysis
* **Why Applicable**: The second-order homogeneous ODE represents the free response of an RLC circuit. The roots of the auxiliary equation determine the damping state.

---

# Pattern Recognition Trick
Identify coefficients in $i'' + 4i' + 4i = 0$:
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
   $$(m + 2)^2 = 0 \\implies m_1 = m_2 = -2 \\quad \\text{(real and equal roots)}$$
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
$$\\boxed{i(t) = (C_1 + C_2 t)e^{-2t} \\quad \\text{and} \\quad \\text{System is Critically Damped.}}$$

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
Check $b^2 - 4ac$. If it equals 0, write $(C_1 + C_2 t)e^{mt}$ and label it "critically damped" immediately. You will save valuable time!"""

# Question 26
ANSWERS_6_TO_40[26] = """# Question
A vibration system satisfies $\\frac{d^2x}{dt^2} + 8\\frac{dx}{dt} + 16x = 0$. Analyze the damping condition and evaluate system response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Damped Free Vibrations
* **Why Applicable**: The second-order homogeneous linear ODE represents a mass-spring-damper system. We evaluate the roots of the characteristic equation to classify damping.

---

# Pattern Recognition Trick
Check coefficients of $x'' + 8x' + 16x = 0$:
* $m^2 + 8m + 16 = 0 \implies (m+4)^2 = 0$
* Equal real roots.

---

# Shortcut / Exam Trick
Discriminant of auxiliary equation:
$$\\Delta = b^2 - 4ac = 8^2 - 4(1)(16) = 64 - 64 = 0 \\implies \\text{Critically Damped.}$$

---

# Step-by-Step Solution
1. Set up the auxiliary equation:
   $$m^2 + 8m + 16 = 0$$
2. Solve for roots:
   $$(m + 4)^2 = 0 \\implies m = -4, -4 \\quad \\text{(real and equal roots)}$$
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
$$\\boxed{\\text{Critically Damped; } x(t) = (C_1 + C_2 t)e^{-4t}}$$

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
Remember that for any quadratic of the form $m^2 + 2\omega_n m + \omega_n^2 = 0$, the roots are always equal ($-\omega_n$), indicating critical damping. Look for perfect square trinomials!"""

# Question 27
ANSWERS_6_TO_40[27] = """# Question
A spring-mass system is governed by $\\frac{d^2y}{dt^2} + 5\\frac{dy}{dt} + 6y = 0$. Formulate the auxiliary equation, determine the complementary function, and analyze system behavior.

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
* Roots of $m^2 + 5m + 6 = 0$ are $-2$ and $-3$ (since $-2 \\times -3 = 6$ and $-2 + -3 = -5$).
* Complementary Function: $y(t) = C_1 e^{-2t} + C_2 e^{-3t}$.

---

# Step-by-Step Solution
1. Formulate the auxiliary (characteristic) equation:
   $$m^2 + 5m + 6 = 0$$
2. Solve the quadratic equation by factoring:
   $$(m + 2)(m + 3) = 0 \\implies m_1 = -2, \\quad m_2 = -3$$
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
$$\\boxed{m^2 + 5m + 6 = 0, \\quad y(t) = C_1 e^{-2t} + C_2 e^{-3t}, \\quad \\text{System is Overdamped.}}$$

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
Check the signs of the roots. If they are both negative, the system is stable and decays. If they are complex, it oscillates. Distinct real negative roots guarantee an overdamped classification!"""

# Question 28
ANSWERS_6_TO_40[28] = """# Question
A vehicle suspension system is modeled by $m\\frac{d^2x}{dt^2} + c\\frac{dx}{dt} + kx = 0$ with $m=2$ kg, $c=6$ Ns/m, $k=5$ N/m. Formulate the differential equation, determine the nature of damping, and interpret system response.

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
* Equation: $2x'' + 6x' + 5x = 0 \\implies x'' + 3x' + 2.5x = 0$.
* Damping ratio: $\\zeta = \\frac{c}{2\\sqrt{km}} = \\frac{6}{2\\sqrt{10}} = \\frac{3}{\\sqrt{10}} \\approx 0.95 < 1 \\implies$ Underdamped.

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$2\\frac{d^2x}{dt^2} + 6\\frac{dx}{dt} + 5x = 0 \\implies \\frac{d^2x}{dt^2} + 3\\frac{dx}{dt} + 2.5x = 0$$
2. Set up the auxiliary equation:
   $$2m^2 + 6m + 5 = 0 \\implies m = \\frac{-6 \\pm \\sqrt{36 - 40}}{4} = \\frac{-6 \\pm \\sqrt{-4}}{4} = -1.5 \\pm 0.5i$$
3. Determine the nature of damping:
   * The roots are complex conjugates: $m = -1.5 \\pm 0.5i$.
   * Since the roots are complex ($\zeta < 1$), the system is **underdamped** (specifically, close to critical damping since $\zeta \approx 0.95$).
4. Write the system response:
   $$x(t) = e^{-1.5t}(C_1 \\cos 0.5t + C_2 \\sin 0.5t)$$
5. Interpret system response:
   * The vehicle suspension will exhibit a decaying oscillation.
   * The vehicle will bounce slightly but return to level quickly due to the high damping ratio ($\zeta \approx 0.95$).

---

# Why This Step Works
* Complex roots produce a combination of a decaying exponential envelope $e^{-1.5t}$ and oscillatory trigonometric terms.

---

# Formula Used
* Roots of quadratic: $m = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
* Underdamped solution: $x(t) = e^{\\alpha t}(C_1 \\cos \\beta t + C_2 \\sin \\beta t)$

---

# Similar Patterns to Remember
* Bridge vibration under load.

---

# Common Mistakes
* Forgetting to divide the discriminant by $2a = 4$.
* Incorrectly classifying the system as overdamped because $c = 6$ seems large. Always compute the discriminant $c^2 - 4mk$.

---

# Final Answer
$$\\boxed{2x'' + 6x' + 5x = 0, \\quad \\text{Nature: Underdamped}, \\quad x(t) = e^{-1.5t}(C_1\\cos 0.5t + C_2\\sin 0.5t)}$$

---

# 10-Second Revision Notes
✓ $2m^2 + 6m + 5 = 0 \\implies m = -1.5 \\pm 0.5i$
✓ Complex roots $\implies$ Underdamped system.
✓ Response decays exponentially while oscillating slowly.

---

# Memory Trick
"Complex roots = Underdamped. Exp-envelope holds the sine-wave."

---

# Exam Confidence Booster
Underdamped suspension systems are common in vehicle design to ensure passenger comfort. If you get complex roots, double-check that the real part is negative, indicating decay!"""

# Question 29
ANSWERS_6_TO_40[29] = """# Question
A vibration system is governed by $\\frac{d^2y}{dt^2} + 4y = t^2$. Determine particular integral using undetermined coefficients and evaluate complete response.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Method of Undetermined Coefficients
* **Why Applicable**: The non-homogeneous term is a polynomial $f(t) = t^2$, and the ODE is linear with constant coefficients.

---

# Pattern Recognition Trick
* Complementary roots: $m^2 + 4 = 0 \\implies m = \\pm 2i$.
* Forcing function: $t^2$ (degree 2 polynomial).
* No overlap between homogeneous solutions ($\cos 2t, \sin 2t$) and the polynomial $t^2$.

---

# Shortcut / Exam Trick
Guess $y_p = At^2 + Bt + C$.
Substitute and equate coefficients:
* $4A = 1 \\implies A = 1/4$
* $4B = 0 \\implies B = 0$
* $2A + 4C = 0 \\implies 2(1/4) + 4C = 0 \\implies C = -1/8$
Particular integral: $y_p = \\frac{t^2}{4} - \\frac{1}{8}$.

---

# Step-by-Step Solution
1. Find the Complementary Function ($y_c$):
   $$m^2 + 4 = 0 \\implies m = \\pm 2i \\implies y_c(t) = C_1 \\cos 2t + C_2 \\sin 2t$$
2. Set up the trial Particular Integral ($y_p$):
   $$y_p = At^2 + Bt + C$$
3. Compute derivatives:
   $$y_p' = 2At + B$$
   $$y_p'' = 2A$$
4. Substitute into the ODE:
   $$y_p'' + 4y_p = t^2 \\implies 2A + 4(At^2 + Bt + C) = t^2$$
   $$4At^2 + 4Bt + (2A + 4C) = 1t^2 + 0t + 0$$
5. Equate coefficients of like powers of $t$:
   * $t^2$: $4A = 1 \\implies A = \\frac{1}{4}$
   * $t$: $4B = 0 \\implies B = 0$
   * Constant: $2A + 4C = 0 \\implies 2(1/4) + 4C = 0 \\implies 4C = -\\frac{1}{2} \\implies C = -\\frac{1}{8}$
6. Write the Particular Integral:
   $$y_p = \\frac{t^2}{4} - \\frac{1}{8}$$
7. Write the complete response:
   $$y(t) = y_c(t) + y_p(t) = C_1 \\cos 2t + C_2 \\sin 2t + \\frac{t^2}{4} - \\frac{1}{8}$$

---

# Why This Step Works
* The method of undetermined coefficients assumes the output polynomial has the same degree as the forcing polynomial.

---

# Formula Used
* Complete solution: $y(t) = y_c(t) + y_p(t)$

---

# Similar Patterns to Remember
* $y'' + 9y = t^2 - 1$.

---

# Common Mistakes
* Guessing $y_p = At^2$ and omitting the linear ($Bt$) and constant ($C$) terms. This will make it impossible to satisfy the equation.
* Incorrectly solving the constant relation: $2A + 4C = 0$.

---

# Final Answer
$$\\boxed{y_p = \\frac{t^2}{4} - \\frac{1}{8} \\quad \\text{and} \\quad y(t) = C_1 \\cos 2t + C_2 \\sin 2t + \\frac{t^2}{4} - \\frac{1}{8}}$$

---

# 10-Second Revision Notes
✓ $y_c = C_1\\cos 2t + C_2\\sin 2t$
✓ $y_p = At^2 + Bt + C \\implies 2A + 4(At^2+Bt+C) = t^2$
✓ $4A=1, B=0, 2A+4C=0 \\implies A=1/4, C=-1/8$.

---

# Memory Trick
"Always include all lower-degree terms in your polynomial guess!"

---

# Exam Confidence Booster
Double check your particular solution by plugging $y_p = \\frac{t^2}{4} - \\frac{1}{8}$ back into the ODE: $y_p'' + 4y_p = \\frac{1}{2} + 4(\\frac{t^2}{4} - \\frac{1}{8}) = \\frac{1}{2} + t^2 - \\frac{1}{2} = t^2$. It matches perfectly!"""

# Question 30
ANSWERS_6_TO_40[30] = """# Question
A structure vibrates under external force $F(t) = 8\cos\omega t$. Analyze and determine the condition for resonance and evaluate its effect.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Forced Vibrations / Resonance
* **Why Applicable**: We evaluate a forced spring-mass system $x'' + \\omega_0^2 x = F_0 \\cos \\omega t$. Resonance occurs when the driving frequency matches the natural frequency.

---

# Pattern Recognition Trick
* Natural frequency of system: $\\omega_0$
* Forcing frequency: $\\omega$
* Resonance condition: $\\omega = \\omega_0$

---

# Shortcut / Exam Trick
Resonance $\implies \\omega = \\omega_0$.
Amplitude grows linearly: $x_p(t) \\propto t \\sin \\omega t$.

---

# Step-by-Step Solution
1. Set up the governing differential equation for the system:
   $$\\frac{d^2x}{dt^2} + \\omega_0^2 x = F_0 \\cos \\omega t$$
2. Identify the Complementary solution:
   $$x_c(t) = C_1 \\cos \\omega_0 t + C_2 \\sin \\omega_0 t$$
3. Determine the Particular Integral for $\\omega \\neq \\omega_0$:
   $$x_p(t) = \\frac{F_0}{\\omega_0^2 - \\omega^2}\\cos \\omega t$$
4. Analyze the limit as $\\omega \\to \\omega_0$ (Resonance Condition):
   * When $\\omega = \\omega_0$, the denominator $(\\omega_0^2 - \\omega^2)$ becomes zero, making the expression infinite.
   * The trial solution must be modified by multiplying by $t$:
     $$x_p(t) = A t \\sin \\omega_0 t$$
   * Substituting this yields:
     $$x_p(t) = \\frac{F_0}{2\\omega_0} t \\sin \\omega_0 t$$
5. Evaluate the Effect:
   * The term $t \\sin \\omega_0 t$ grows linearly with time $t$.
   * As $t \\to \\infty$, the amplitude of oscillation goes to infinity (in the absence of damping), causing severe stress and eventual structural failure (catastrophic resonance).

---

# Why This Step Works
* When the forcing frequency matches the natural frequency, the force always acts in phase with the velocity, continuously adding energy to the system.

---

# Formula Used
* $x_p(t) = \\frac{F_0}{2\\omega_0} t \\sin \\omega_0 t$ (at resonance)

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
$$\\boxed{\\text{Condition: } \\omega = \\omega_0. \\quad \\text{Effect: Amplitude grows linearly over time without bound } \\left(x_p \\propto t \\sin \\omega_0 t\\right).}$$

---

# 10-Second Revision Notes
✓ Resonance: Forcing frequency $\\omega = \\text{Natural frequency } \\omega_0$.
✓ Particular integral: $x_p(t) = \\frac{F_0}{2\\omega_0} t \\sin \\omega_0 t$
✓ Result: Amplitude grows linearly, risking structural failure.

---

# Memory Trick
"Pushing a swing at its natural rate builds height. That's resonance!"

---

# Exam Confidence Booster
In exams, if you see the forcing term matches the complementary roots, immediately write the particular integral with a $t$ multiplier: $y_p = t(A\\cos \\omega_0 t + B\\sin \\omega_0 t)$. This is the hallmark of resonance!"""

# Question 31
ANSWERS_6_TO_40[31] = """# Question
A control system is described by $\\frac{d^2y}{dx^2} + y = \\cos 2x$. Determine the particular integral using another method.

---

# Concept Used
* **Topic Name**: Differential Equations
* **Sub-topic Name**: Particular Integral (Inverse Operator Method)
* **Why Applicable**: The system is a linear non-homogeneous ODE with constant coefficients. The inverse operator method provides a fast algebraic route to find $y_p$.

---

# Pattern Recognition Trick
Identify $f(D) = D^2 + 1$ and $X = \\cos 2x$:
* $y_p = \\frac{1}{D^2 + 1} \\cos 2x$

---

# Shortcut / Exam Trick
Use the identity:
$$\\frac{1}{f(D^2)} \\cos ax = \\frac{1}{f(-a^2)} \\cos ax$$
For $a = 2$, replace $D^2$ with $-2^2 = -4$:
$$y_p = \\frac{1}{-4 + 1} \\cos 2x = -\\frac{1}{3} \\cos 2x$$

---

# Step-by-Step Solution
1. Write the differential equation in operator form:
   $$(D^2 + 1)y = \\cos 2x$$
   where $D = \\frac{d}{dx}$.
2. Express the Particular Integral ($y_p$) using the inverse operator:
   $$y_p = \\frac{1}{D^2 + 1} \\cos 2x$$
3. Apply the rule for $\\cos ax$ where $a = 2$:
   * Substitute $D^2 \\to -a^2 = -2^2 = -4$.
   * Since the denominator is non-zero ($-4 + 1 = -3 \\neq 0$), the substitution is valid.
4. Calculate the result:
   $$y_p = \\frac{1}{-4 + 1} \\cos 2x = -\\frac{1}{3} \\cos 2x$$

---

# Why This Step Works
* Since $D^2(\\cos ax) = -a^2\\cos ax$, the operator $D^2$ acts like the scalar $-a^2$ when applied to sinusoidal functions.

---

# Formula Used
* $\\frac{1}{D^2 + a^2} \\cos bx = \\frac{1}{a^2 - b^2} \\cos bx$ for $a^2 \\neq b^2$.

---

# Similar Patterns to Remember
* $y'' + 9y = \\sin 2x \\implies y_p = \\frac{1}{-4 + 9}\\sin 2x = \\frac{1}{5}\\sin 2x$.

---

# Common Mistakes
* Substituting $D \\to -2$ or $D^2 \\to 4$ (forgetting the negative sign). Always substitute $D^2 \\to -a^2$.
* Applying this method to functions other than sine and cosine.

---

# Final Answer
$$\\boxed{y_p = -\\frac{1}{3}\\cos 2x}$$

---

# 10-Second Revision Notes
✓ $y_p = \\frac{1}{D^2 + 1} \\cos 2x$
✓ $D^2 \\to -2^2 = -4$
✓ $y_p = \\frac{1}{-4 + 1} \\cos 2x = -\\frac{1}{3}\\cos 2x$.

---

# Memory Trick
"For sines and cosines, swap $D^2$ with negative square of the frequency."

---

# Exam Confidence Booster
This is the fastest method to solve particular integrals for harmonic inputs. If you see $\cos ax$ or $\sin ax$, use this operator shortcut to write down the answer in one line!"""

# Question 32
ANSWERS_6_TO_40[32] = """# Question
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
$$x_p = A \\cos 2t + B \\sin 2t$$
Substitute and equate to get:
* $A = 2/13, B = 16/13$
$$x_p(t) = \\frac{2}{13}\\cos 2t + \\frac{16}{13}\\sin 2t$$

---

# Step-by-Step Solution
1. Formulate the differential equation:
   $$m x'' + c x' + k x = F(t) \\implies x'' + 4x' + 5x = 10\\cos 2t$$
2. Identify steady-state solution:
   * The complementary solution $x_c(t)$ decays to zero due to damping.
   * The steady-state response is given by the Particular Integral $x_p(t)$.
3. Assume trial solution:
   $$x_p = A\\cos 2t + B\\sin 2t$$
4. Compute derivatives:
   $$x_p' = -2A\\sin 2t + 2B\\cos 2t$$
   $$x_p'' = -4A\\cos 2t - 4B\\sin 2t$$
5. Substitute into the ODE:
   $$(-4A\\cos 2t - 4B\\sin 2t) + 4(-2A\\sin 2t + 2B\\cos 2t) + 5(A\\cos 2t + B\\sin 2t) = 10\\cos 2t$$
   Group terms by $\\cos 2t$ and $\\sin 2t$:
   $$(A + 8B)\\cos 2t + (B - 8A)\\sin 2t = 10\\cos 2t$$
6. Equate coefficients:
   * $A + 8B = 10$  --- (1)
   * $B - 8A = 0 \\implies B = 8A$  --- (2)
7. Substitute (2) into (1):
   $$A + 8(8A) = 10 \\implies 65A = 10 \\implies A = \\frac{2}{13}$$
   $$B = 8\\left(\\frac{2}{13}\\right) = \\frac{16}{13}$$
8. Write steady-state solution:
   $$x_{ss}(t) = \\frac{2}{13}\\cos 2t + \\frac{16}{13}\\sin 2t$$
9. Interpret system behavior:
   * The system oscillates at the driving frequency of $\\omega = 2$ rad/s.
   * Damping prevents resonance, capping the amplitude at $x_{max} = \\sqrt{A^2 + B^2} = \\frac{2\\sqrt{65}}{13} \\approx 1.24$ m.

---

# Why This Step Works
* The steady-state solution is independent of initial conditions because the damping dissipates the transient initial energy.

---

# Formula Used
* $x'' + 2\\zeta\\omega_n x' + \\omega_n^2 x = F_0\\cos\\omega t$

---

# Similar Patterns to Remember
* RLC circuit connected to an AC voltage source.

---

# Common Mistakes
* Calculating the complementary solution and trying to apply initial conditions to the complete solution when only the steady-state solution is requested.
* Forgetting the $x'$ term when substituting $x_p$ into the ODE.

---

# Final Answer
$$\\boxed{x'' + 4x' + 5x = 10\\cos 2t \\quad \\text{and} \\quad x_{ss}(t) = \\frac{2}{13}\\cos 2t + \\frac{16}{13}\\sin 2t}$$

---

# 10-Second Revision Notes
✓ $x'' + 4x' + 5x = 10\\cos 2t$
✓ $x_p = A\\cos 2t + B\\sin 2t \\implies (A+8B)\\cos 2t + (B-8A)\\sin 2t = 10\\cos 2t$
✓ $B=8A \\implies A=2/13, B=16/13$.

---

# Memory Trick
"Steady-state means transients are dead. Just solve for the Particular Integral."

---

# Exam Confidence Booster
For forced damped vibrations, express the steady-state answer in phase-amplitude form $X_0 \cos(\omega t - \phi)$ where $X_0 = \sqrt{A^2+B^2}$ and $\phi = \tan^{-1}(B/A)$ to show premium engineering understanding!"""

# Question 33
ANSWERS_6_TO_40[33] = """# Question
An engineer models position as a scalar $x(t) = t^2$ instead of a vector. Identify the error and correct it.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector Kinematics
* **Why Applicable**: Position in space is a coordinate mapping with magnitude and direction, requiring a vector representation to specify movement correctly.

---

# Pattern Recognition Trick
"Position in space" represents a coordinate direction, which must be represented with unit direction vectors $\\hat i, \\hat j, \\hat k$.

---

# Shortcut / Exam Trick
* Scalar: $x(t) = t^2$ (no direction).
* Vector: $\\vec r(t) = t^2\\hat i$ (or in general: $\\vec r(t) = x(t)\\hat i + y(t)\\hat j + z(t)\\hat k$).

---

# Step-by-Step Solution
1. Identify the error:
   * A scalar $x(t) = t^2$ only describes distance or position in a single dimension without defining the direction of movement in 2D/3D space.
   * Velocity and acceleration derived from a scalar will also be scalars, which fails to capture directional changes (like curvature).
2. Correct the representation:
   * Position in space must be modeled as a vector-valued function of time, $\\vec r(t)$:
     $$\\vec r(t) = x(t)\\hat i + y(t)\\hat j + z(t)\\hat k$$
   * For one-dimensional motion along the x-axis, the correct vector representation is:
     $$\\vec r(t) = t^2 \\hat i$$

---

# Why This Step Works
* Vectors carry both magnitude and direction, which is necessary for physical calculations in 2D and 3D space.

---

# Formula Used
* Position Vector: $\\vec r(t) = x(t)\\hat i + y(t)\\hat j + z(t)\\hat k$

---

# Similar Patterns to Remember
* Force, velocity, and acceleration are all vectors. Temperature and pressure are scalars.

---

# Common Mistakes
* Treating vector components as independent scalars without direction tags.
* Adding a scalar directly to a vector.

---

# Final Answer
$$\\boxed{\\text{Error: Position is a vector containing direction. Correction: } \\vec r(t) = t^2 \\hat i \\text{ (for 1D motion on x-axis)}}$$

---

# 10-Second Revision Notes
✓ Scalar: $t^2$ (magnitude only).
✓ Vector: $\\vec r(t) = t^2 \\hat i$ (has direction).
✓ Position in space must be represented by a vector.

---

# Memory Trick
"Scalars tell you 'how much', vectors tell you 'where to'."

---

# Exam Confidence Booster
Always write vectors with an arrow symbol (like $\\vec r$ or $\\mathbf{r}$) and use unit vectors ($\\hat i, \\hat j, \\hat k$) to denote direction. This shows rigour and secures full marks!"""

# Question 34
ANSWERS_6_TO_40[34] = """# Question
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
* There are no direction indicators like $\\hat i, \\hat j, \\hat k$.

---

# Shortcut / Exam Trick
No unit vectors ($\\hat i, \\hat j$) in output formula $\\implies$ Scalar Field.

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
* Scalar field mapping: $f: \\mathbb{R}^n \\to \\mathbb{R}$

---

# Similar Patterns to Remember
* Atmospheric pressure $P(x,y,z)$.
* Electrostatic potential $V(x,y,z)$.

---

# Common Mistakes
* Classifying it as a vector field because the variables $x$ and $y$ are spatial coordinates. The type of field depends on the *output*, not the inputs.

---

# Final Answer
$$\\boxed{\\text{Scalar Field}}$$

---

# 10-Second Revision Notes
✓ Output $T(x,y)$ is a real number $\implies$ scalar.
✓ Maps position $(x,y)$ to a scalar property (temperature).
✓ Classify: Scalar Field.

---

# Memory Trick
"If there's no unit vector in the output, it's a scalar field."

---

# Exam Confidence Booster
Remember: if you take the gradient of a scalar field ($\nabla T$), you get a vector field (the heat flux direction). If you take divergence of a vector field, you get a scalar field. Keep these relations in mind!"""

# Question 35
ANSWERS_6_TO_40[35] = """# Question
In a conveyor system, path $\\vec r(t) = t\\hat i + t^2\\hat j$. Identify if motion is straight or curved using tangent direction.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector Tangent and Kinematics
* **Why Applicable**: The direction of the tangent vector (velocity) determines whether a path is straight or curved. If the tangent vector's direction is constant, the path is straight; if it changes, the path is curved.

---

# Pattern Recognition Trick
* Path: $\\vec r(t) = t\\hat i + t^2\\hat j$
* Tangent (derivative): $\\vec v(t) = \\hat i + 2t\\hat j$
* Direction of $\\vec v(t)$ depends on $t$, so it is not constant.

---

# Shortcut / Exam Trick
If any component of the path has a power of $t$ greater than 1 (and cannot be simplified), the path is non-linear (curved). Here $y = x^2$ is a parabola.

---

# Step-by-Step Solution
1. Find the velocity vector (which is tangent to the path):
   $$\\vec v(t) = \\frac{d\\vec r}{dt} = \\frac{d}{dt}(t)\\hat i + \\frac{d}{dt}(t^2)\\hat j = \\hat i + 2t\\hat j$$
2. Find the unit tangent vector $\\hat T(t)$:
   $$\\hat T(t) = \\frac{\\vec v(t)}{\\|\\vec v(t)\\|} = \\frac{\\hat i + 2t\\hat j}{\\sqrt{1 + 4t^2}}$$
3. Analyze the direction of the tangent vector:
   * At $t = 0$: $\\hat T(0) = \\hat i$ (pointing along x-axis).
   * At $t = 1$: $\\hat T(1) = \\frac{1}{\\sqrt{5}}\\hat i + \\frac{2}{\\sqrt{5}}\\hat j$.
   * Since the unit tangent vector $\\hat T(t)$ changes direction over time, the path is **curved**.
   * Geometrically, eliminating $t$ gives $y = x^2$, which represents a parabolic curve.

---

# Why This Step Works
* A straight line has a constant unit tangent vector. A changing tangent direction indicates curvature.

---

# Formula Used
* $\\vec v(t) = \\vec r'(t)$
* $\\hat T(t) = \\frac{\\vec v(t)}{\\|\\vec v(t)\\|}$

---

# Similar Patterns to Remember
* Circular motion $\\vec r(t) = \\cos t\\hat i + \\sin t\\hat j \\implies$ Curved.
* Linear motion $\\vec r(t) = 2t\\hat i + 3t\\hat j \\implies \\hat T = \\frac{2\\hat i + 3\\hat j}{\\sqrt{13}}$ (constant direction, straight).

---

# Common Mistakes
* Claiming the path is straight because the derivative of the first term is a constant (1). You must check the direction of the *entire* vector.

---

# Final Answer
$$\\boxed{\\text{Curved Motion. The unit tangent vector direction changes with time } t.}$$

---

# 10-Second Revision Notes
✓ $\\vec r' = \\hat i + 2t\\hat j$
✓ Direction of tangent vector depends on $t$.
✓ Changing tangent direction $\implies$ Curved path (parabola $y=x^2$).

---

# Memory Trick
"Quadratic or higher terms in position mean curves in motion."

---

# Exam Confidence Booster
Quick check: Convert the vector equation to Cartesian coordinates by setting $x=t$ and $y=t^2 \implies y = x^2$. Since $y=x^2$ is a parabola (non-linear), the path is curved!"""

# Question 36
ANSWERS_6_TO_40[36] = """# Question
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
$$\\kappa = \\frac{1}{R} = \\text{Constant}$$

---

# Step-by-Step Solution
1. Define the position vector of a circle of radius $R$:
   $$\\vec r(t) = R\\cos t\\hat i + R\\sin t\\hat j$$
2. Compute velocity and acceleration vectors:
   $$\\vec r'(t) = -R\\sin t\\hat i + R\\cos t\\hat j \\implies \\|\\vec r'(t)\\| = R$$
   $$\\vec r''(t) = -R\\cos t\\hat i - R\\sin t\\hat j$$
3. Compute cross product:
   $$\\vec r'(t) \\times \\vec r''(t) = (-R\\sin t)(-R\\sin t)\\hat k - (R\\cos t)(-R\\cos t)(-\\hat k) = R^2\\hat k$$
   $$\\|\\vec r'(t) \\times \\vec r''(t)\\| = R^2$$
4. Compute curvature $\\kappa$:
   $$\\kappa = \\frac{\\|\\vec r' \\times \\vec r''\\|}{\\|\\vec r'\\|^3} = \\frac{R^2}{R^3} = \\frac{1}{R}$$
5. Interpret the nature:
   * Since $R$ is constant, the curvature $\\kappa = \\frac{1}{R}$ is **constant** and **positive** at all points along the path.

---

# Why This Step Works
* Uniform bending around a central point yields a constant radius, giving a flat, constant curvature value.

---

# Formula Used
* $\\kappa = \\frac{\\|\\vec r' \\times \\vec r''\\|}{\\|\\vec r'\\|^3}$

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
$$\\boxed{\\kappa = \\frac{1}{R} \\quad \\text{(Constant and positive)}}$$

---

# 10-Second Revision Notes
✓ Circle radius $= R$
✓ Curvature $\\kappa = 1/R$
✓ Nature: Constant and uniform curvature at all points.

---

# Memory Trick
"Curvature is the inverse of the radius. Smaller circles bend sharper (larger curvature)."

---

# Exam Confidence Booster
If asked for "radius of curvature" $\rho$, remember it is the reciprocal of curvature: $\rho = 1/\kappa$. For a circle, the radius of curvature is simply the circle's radius $R$!"""

# Question 37
ANSWERS_6_TO_40[37] = """# Question
A fluid velocity field is given by $\\vec v(t) = 3t\\hat i + 2t^2\\hat j$. Identify whether acceleration is constant.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Kinematics (Acceleration Vector)
* **Why Applicable**: Acceleration is the derivative of the velocity vector with respect to time: $\\vec a = d\\vec v/dt$. We evaluate if the resulting vector depends on $t$.

---

# Pattern Recognition Trick
* Velocity: $\\vec v(t) = 3t\\hat i + 2t^2\\hat j$
* Look at powers of $t$: the second term has a quadratic dependency ($t^2$), so its derivative will still contain $t$.

---

# Shortcut / Exam Trick
If velocity contains any term with power of $t$ greater than 1, acceleration is not constant. Here, $t^2 \\implies$ non-constant acceleration.

---

# Step-by-Step Solution
1. Start with the given velocity vector:
   $$\\vec v(t) = 3t\\hat i + 2t^2\\hat j$$
2. Differentiate with respect to time $t$ to find the acceleration vector $\\vec a(t)$:
   $$\\vec a(t) = \\frac{d\\vec v}{dt} = \\frac{d}{dt}(3t)\\hat i + \\frac{d}{dt}(2t^2)\\hat j$$
   $$\\vec a(t) = 3\\hat i + 4t\\hat j$$
3. Analyze the result:
   * The x-component of acceleration is $3$ (constant).
   * The y-component of acceleration is $4t$, which depends linearly on time $t$.
   * Therefore, the total acceleration vector $\\vec a(t) = 3\\hat i + 4t\\hat j$ is **not constant** (it varies over time).

---

# Why This Step Works
* Velocity changes non-linearly over time, which requires a time-varying force and acceleration to sustain.

---

# Formula Used
* $\\vec a(t) = \\frac{d\\vec v}{dt}$

---

# Similar Patterns to Remember
* Constant acceleration motion (like gravity): $\\vec v(t) = gt \\hat j \\implies \\vec a = g \\hat j$ (constant).

---

# Common Mistakes
* Differentiating only the first term and claiming acceleration is constant.
* Confusing speed with velocity components.

---

# Final Answer
$$\\boxed{\\vec a(t) = 3\\hat i + 4t\\hat j \\quad \\text{and} \\quad \\text{Acceleration is not constant.}}$$

---

# 10-Second Revision Notes
✓ $\\vec a = \\vec v' = 3\\hat i + 4t\\hat j$
✓ The $4t\\hat j$ term depends on time $t$.
✓ Therefore, the acceleration is time-varying (not constant).

---

# Memory Trick
"Velocity must be linear in $t$ for acceleration to be constant."

---

# Exam Confidence Booster
To confirm if any vector is constant, differentiate it with respect to its variable. If the result is a non-zero function containing the variable, it is not constant. Simple and robust!"""

# Question 38
ANSWERS_6_TO_40[38] = """# Question
Given $\\vec r(t) = 3t\\hat i + 2t^2\\hat j$, identify the type and justify.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Vector-valued Functions
* **Why Applicable**: We classify the mathematical entity represented by $\\vec r(t)$ based on its inputs and output types.

---

# Pattern Recognition Trick
* Input: a single real number $t$ (scalar).
* Output: a vector with components along $\\hat i$ and $\\hat j$.

---

# Shortcut / Exam Trick
Maps $\\mathbb{R} \\to \\mathbb{R}^2 \\implies$ Vector-valued function of a scalar variable.

---

# Step-by-Step Solution
1. Identify the input variable:
   * The variable $t$ is a single real number representing a scalar quantity (typically time).
2. Identify the output:
   * For any value of $t$, the output is a 2D vector:
     $$\\vec r(t) = x(t)\\hat i + y(t)\\hat j = (3t, 2t^2)$$
3. Classify:
   * This is a **vector-valued function of a single scalar variable**.
4. Justification:
   * The domain is a subset of real numbers $\\mathbb{R}$ (scalars).
   * The codomain is a vector space $\\mathbb{R}^2$ (vectors in a 2D plane).
   * It maps a scalar input to a vector coordinate, describing a curve (parabola) in space.

---

# Why This Step Works
* Mapping inputs (scalars) to direction-based arrays (vectors) matches the formal definition of a vector-valued function.

---

# Formula Used
* Function mapping: $\\vec r: I \\subset \\mathbb{R} \\to \\mathbb{R}^2$

---

# Similar Patterns to Remember
* 3D space curves: $\\vec r(t) = x(t)\\hat i + y(t)\\hat j + z(t)\\hat k$.

---

# Common Mistakes
* Calling it a vector field. A vector field maps vectors to vectors (e.g. $\\vec F(x,y) = P\\hat i + Q\\hat j$). Here, the input is a single scalar $t$, not coordinates $(x,y)$.

---

# Final Answer
$$\\boxed{\\text{Vector-valued function of a scalar variable } t.}$$

---

# 10-Second Revision Notes
✓ Input: scalar $t$
✓ Output: vector $3t\\hat i + 2t^2\\hat j$
✓ Definition: Vector-valued function.

---

# Memory Trick
"Inputs are numbers, outputs are vectors $\implies$ Vector-valued function."

---

# Exam Confidence Booster
Don't confuse "vector-valued functions" with "vector fields". Vector-valued functions draw lines/paths (1D parameter $t$), while vector fields fill areas/volumes (multiple coordinates like $x,y,z$). Keep this straight!"""

# Question 39
ANSWERS_6_TO_40[39] = """# Question
An engineer assumes tangent and normal vectors are parallel. Identify and correct the error.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Unit Tangent and Normal Vectors
* **Why Applicable**: We use the geometric definitions of the unit tangent vector $\\hat T$ and principal normal vector $\\hat N$ to show their relationship.

---

# Pattern Recognition Trick
* Unit tangent vector: $\\hat T = \\vec r'/\\|\\vec r'\\|$ (points along velocity).
* Principal normal vector: $\\hat N = \\hat T'/\\|\\hat T'\\|$ (points toward center of curvature).
* $\\hat T$ and $\\hat N$ are always orthogonal.

---

# Shortcut / Exam Trick
Tangent is direction of motion; normal is direction of turning. They must be perpendicular!
$$\\hat T \\cdot \\hat N = 0$$

---

# Step-by-Step Solution
1. Identify the error:
   * The engineer assumed the unit tangent vector $\\hat T$ and the principal normal vector $\\hat N$ are parallel.
   * This is mathematically and physically incorrect. Along any smooth curve, these two vectors are always **orthogonal** (perpendicular) to each other, not parallel.
2. Prove orthogonality:
   * Since $\\hat T(t)$ is a unit vector, its magnitude is constant:
     $$\\hat T \\cdot \\hat T = \\|\\hat T\\|^2 = 1$$
   * Differentiate both sides with respect to $t$:
     $$\\frac{d}{dt}(\\hat T \\cdot \\hat T) = 0 \\implies 2\\hat T \\cdot \\frac{d\\hat T}{dt} = 0 \\implies \\hat T \\cdot \\hat T' = 0$$
   * Since $\\hat N$ is in the direction of $\\hat T'$ ($\\hat N = \\hat T'/\\|\\hat T'\\|$), we have:
     $$\\hat T \\cdot \\hat N = 0$$
3. Correct the error:
   * State that the unit tangent and normal vectors are perpendicular:
     $$\\hat T \\perp \\hat N \\quad \\text{and} \\quad \\hat T \\cdot \\hat N = 0$$

---

# Why This Step Works
* A vector of constant length is always perpendicular to its derivative vector, which leads directly to tangent-normal orthogonality.

---

# Formula Used
* $\\hat T \\cdot \\hat N = 0$
* $\\hat N = \\frac{d\\hat T/ds}{\\|d\\hat T/ds\\|}$

---

# Similar Patterns to Remember
* Radial vector and tangent vector of a circle are perpendicular.

---

# Common Mistakes
* Assuming they are parallel because they both relate to the path. Tangent points *along* the path, while normal points *inside* the bend.

---

# Final Answer
$$\\boxed{\\text{Error: Tangent and normal vectors are orthogonal, not parallel. Correction: } \\hat T \\cdot \\hat N = 0.}$$

---

# 10-Second Revision Notes
✓ $\\hat T$ has constant magnitude $= 1$
✓ Constant magnitude vector is perpendicular to its derivative: $\\hat T \\cdot \\hat T' = 0$
✓ Since $\\hat N \\propto \\hat T'$, it follows that $\\hat T \\cdot \\hat N = 0$ (Orthogonal).

---

# Memory Trick
"Tangent goes straight, normal goes left/right. They make a $90^\\circ$ angle."

---

# Exam Confidence Booster
In space curve analysis, the unit tangent vector $\\hat T$, normal vector $\\hat N$, and binormal vector $\\hat B = \\hat T \\times \\hat N$ form a mutually perpendicular coordinate frame (Frenet-Serret frame). Keep this orthogonal triad in mind!"""

# Question 40
ANSWERS_6_TO_40[40] = """# Question
Identify role of unit tangent vector in motion analysis.

---

# Concept Used
* **Topic Name**: Vector Calculus
* **Sub-topic Name**: Unit Tangent Vector
* **Why Applicable**: We define the physical and geometric role of the unit tangent vector $\\hat T(t)$ along a moving trajectory.

---

# Pattern Recognition Trick
* Tangent vector points in the direction of the velocity vector: $\\vec v(t) = \\vec r'(t)$.
* Dividing by its speed $\\|\\vec v(t)\\|$ removes the speed factor, leaving only the direction.

---

# Shortcut / Exam Trick
$$\\hat T(t) = \\frac{\\vec v(t)}{\\|\\vec v(t)\\|} = \\text{Direction of motion}$$

---

# Step-by-Step Solution
1. Define the unit tangent vector mathematically:
   $$\\hat T(t) = \\frac{\\vec r'(t)}{\\|\\vec r'(t)\\|} = \\frac{\\vec v(t)}{\\|\\vec v(t)\\|} = \\frac{\\vec v(t)}{v(t)}$$
   where $\\vec v(t)$ is the velocity vector and $v(t) = \\|\\vec v(t)\\|$ is the speed.
2. **Physical Role**:
   * It represents the instantaneous **direction of motion** of a particle.
   * It decouples the direction of travel from the speed of the particle.
3. **Role in Acceleration Analysis**:
   * Acceleration can be decomposed into tangential and normal components:
     $$\\vec a = a_T \\hat T + a_N \\hat N$$
   * The tangential component $a_T = \\vec a \\cdot \\hat T = \\frac{d^2s}{dt^2}$ represents the rate of change of speed along the path.
4. **Geometric Role**:
   * It defines the orientation of the osculating plane and curvature calculations.

---

# Why This Step Works
* Normalizing the velocity vector yields a vector of length 1 pointing exactly in the direction of instantaneous travel.

---

# Formula Used
* $\\hat T(t) = \\frac{\\vec v(t)}{\\|\\vec v(t)\\|}$
* $\\vec v(t) = v(t)\\hat T(t)$

---

# Similar Patterns to Remember
* Unit normal vector represents the direction of turning.

---

# Common Mistakes
* Confusing the unit tangent vector with the velocity vector. Velocity includes speed, while the unit tangent has a magnitude of exactly 1.

---

# Final Answer
$$\\boxed{\\text{The unit tangent vector represents the instantaneous direction of motion, scaling velocity to unit magnitude.}}$$

---

# 10-Second Revision Notes
✓ $\\hat T = \\vec v / \\|\\vec v\\|$
✓ Magnitude of $\\hat T$ is always 1.
✓ Tells you *where* the particle is heading, not *how fast*.

---

# Memory Trick
"The unit tangent is the compass needle of the trajectory."

---

# Exam Confidence Booster
tangential acceleration $a_T = \\vec a \\cdot \\hat T$ is the rate of change of speed. If speed is constant (uniform motion), $a_T = 0$, and acceleration is purely normal. Remember this relation!"""
