INSERT INTO questions (id, subject_id, question, answer, image_url, "references", notes, order_index) VALUES
  ('beee0000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000007', 'During a classroom experiment, two plastic rods are rubbed with wool and then brought close to each other. Instead of attracting, the rods move away from each other when placed nearby. Relate this observation to the property of electric charge.

*(3 Marks - [U/C, 2])*', '### Topic: Electrostatics & Properties of Charge
**Difficulty Level**: Easy (Conceptual)

#### 1. Core Principle Illustrated
This observation directly illustrates the **fundamental law of electrostatics**:
$$\text{Like charges repel each other, while unlike charges attract each other.}$$

#### 2. Explanation of the Mechanism
1. **Triboelectric Charging (Friction)**: When two plastic rods are rubbed with wool, electrons are transferred from the wool to the plastic rods. 
2. **Acquiring Identical Charges**: Since both rods are made of the same plastic material and rubbed with the same wool material, they both acquire the **same type of charge** (specifically, a net negative charge).
3. **Electrostatic Repulsion**: When they are brought close together, the electrostatic fields of the two like-charged rods interact, generating a repulsive force that pushes them apart.

```mermaid
graph LR
    A[Rod A: Negative Charge] <--- Repulsion ---> B[Rod B: Negative Charge]
    style A fill:#ff9999,stroke:#333,stroke-width:2px
    style B fill:#ff9999,stroke:#333,stroke-width:2px
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q1', 1),
  ('beee0000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007', 'While studying electrostatics, students observe that some materials become positively charged while others become negatively charged after friction. Identify the basic classification of electric charges.

*(2 Marks - [U/C, 1])*', '### Topic: Classification of Electric Charges
**Difficulty Level**: Easy (Recall)

#### 1. Classification of Electric Charges
Electric charges are fundamentally classified into two distinct types:
1. **Positive Charge ($+$)**: Acquired by a material that loses electrons (e.g., glass rod rubbed with silk).
2. **Negative Charge ($-$)**: Acquired by a material that gains electrons (e.g., plastic rod rubbed with wool).

#### 2. Underlying Mechanism
* All matter is composed of atoms containing positive protons in the nucleus and negative electrons orbiting around them.
* **Friction** provides thermal energy to overcome the binding energy of surface electrons, resulting in charge transfer.
* An excess of electrons creates a **negative charge**, whereas a deficit of electrons creates a **positive charge**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q2', 2),
  ('beee0000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000007', 'In an electrostatic demonstration, a teacher charges a metal sphere and then brings it into contact with another neutral sphere. After contact, the charge spreads between the two spheres. When students measure the charges afterward, they find that the combined charge of the two spheres equals the original charge that was present on the first sphere. Even though the charge distribution has changed, the total charge remains unchanged. Establish the law that explains why the total charge remains constant in this interaction.

*(3 Marks - [U/C, 2])*', '### Topic: Law of Conservation of Charge
**Difficulty Level**: Easy (Conceptual)

#### 1. Physical Law
The physical law that explains this behavior is the **Law of Conservation of Electric Charge**.

#### 2. Statement of the Law
$$\text{The total electric charge in an isolated system remains constant over time.}$$
Charges can neither be created nor destroyed; they can only be transferred from one body to another.

#### 3. Application to the Scenario
* Let $Q_{\text{total}}$ be the initial charge on the first sphere.
* When contact is established, free electrons flow from the charged sphere to the neutral sphere (or vice versa) until their electrical potentials equalize.
* If $q_1$ and $q_2$ are the final charges on the spheres after contact:
$$Q_{\text{total}} = q_1 + q_2$$
* No charge is created or destroyed during contact; the total charge remains exactly conserved.

```mermaid
graph TD
    subgraph Before Contact
    A[Sphere 1: Charge Q] --- B[Sphere 2: Neutral 0]
    end
    subgraph After Contact
    C[Sphere 1: Charge q1] --- D[Sphere 2: Charge q2]
    end
    A -->|Redistribution| C
    B -->|Redistribution| D
    Note["Total Charge: Q = q1 + q2"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q3', 3),
  ('beee0000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000007', 'In a classroom demonstration, a teacher shows that when several charged bodies interact and exchange electrons, the charges on individual objects may change. However, when all the charges are added together after the interaction, the total value remains exactly the same as before the interaction occurred. This observation helps students understand a fundamental rule governing electric charge in nature. Determine the physical law illustrated in this situation.

*(2 Marks - [U/C, 1])*', '### Topic: Conservation of Charge
**Difficulty Level**: Easy (Recall)

#### 1. Identified Physical Law
The physical law illustrated is the **Law of Conservation of Electric Charge**.

#### 2. Detailed Explanation
* An isolated system contains a fixed total algebraic sum of charges:
$$\sum Q_{\text{initial}} = \sum Q_{\text{final}}$$
* When individual objects interact (e.g., through friction, conduction, or induction), electrons are transferred.
* While the charge on any individual object ($q_i$) changes, the net charge of the system ($Q_{\text{net}}$) remains constant because electrons are merely relocated, not created or destroyed.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q4', 4),
  ('beee0000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000007', 'In a school physics laboratory, students perform an experiment using a plastic comb and small pieces of paper placed on a table. The comb is first rubbed against dry hair and then brought close to the paper pieces without touching them. The students observe that the paper pieces immediately jump toward the comb and stick to its surface. Even after some pieces fall back to the table, the comb continues to attract other nearby paper fragments. The teacher explains that this behavior occurs because the comb acquires electric charge through friction and produces a force that acts on nearby objects. Establish the role of electric charge in producing forces between objects.

*(3 Marks - [U/C, 2])*', '### Topic: Electrostatic Force and Polarization
**Difficulty Level**: Medium (Conceptual)

#### 1. Role of Electric Charge in Force Generation
Electric charge is a fundamental physical property of matter that gives rise to **electrostatic forces** (described by Coulomb''s Law). 
* A charged object creates an **electric field** in the space surrounding it.
* This electric field exerts a force on any other charged or polarizable objects placed within it.

#### 2. Step-by-Step Mechanism of Attraction
1. **Triboelectric Charging**: The plastic comb gains negative charge by rubbing against dry hair.
2. **Electrostatic Induction (Polarization)**: When the negatively charged comb is brought near the neutral paper, it repels the electrons in the paper away from the comb, leaving a temporary positive charge on the surface facing the comb.
3. **Attractive Force**: The attractive force between the negative comb and the induced positive charge on the paper is stronger than the repulsive force on the distant negative charges, causing the paper to jump up.

```mermaid
graph TD
    Comb[Negative Comb] -->|Creates Electric Field| Paper[Neutral Paper]
    Paper -->|Polarization| Polarized["Surface: Positive (+)<br/>Bottom: Negative (-)"]
    Polarized -->|Resultant Attraction| Attraction[Paper jumps to Comb]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q5', 5),
  ('beee0000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000007', 'During a classroom demonstration on electrostatics, a teacher rubs a plastic scale with a dry cloth and then slowly brings it close to tiny bits of thermocol and paper placed on a desk. Students observe that even without touching the pieces, the scale attracts them from a small distance and the particles move toward it. Some pieces briefly stick to the scale before falling off and being attracted again. This repeated interaction helps students understand that a charged body can influence nearby objects through electrostatic forces. Determine the physical property responsible for this electrostatic interaction.

*(2 Marks - [U/C, 1])*', '### Topic: Electric Charge and Fields
**Difficulty Level**: Easy (Conceptual)

#### 1. Responsible Physical Property
The fundamental physical property responsible for this interaction is **electric charge** and the resulting **electric field**.

#### 2. Dynamic Interaction Explanation
* **Initial Attraction**: The charged scale polarizes the neutral thermocol/paper bits, inducing opposite charges on their nearest surfaces and causing attraction.
* **Charge Transfer & Repulsion (Falling Off)**: When a thermocol bit touches the scale, charge conducts from the scale to the bit. Now, both have the **same charge**, causing repulsion so the bit falls off.
* **Re-attraction**: Once the bit touches the grounded desk, it loses its acquired charge, becomes neutral, and is attracted by the scale again.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q6', 6),
  ('beee0000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000007', 'Two metal plates initially carry different amounts of electric charge. When they are connected with a conducting wire, charge flows between them until equilibrium is reached. Relate this observation to the conservation of electric charge.

*(3 Marks - [U/C, 2])*', '### Topic: Charge Flow & Conservation
**Difficulty Level**: Easy (Conceptual)

#### 1. Relation to Conservation of Charge
This observation demonstrates that the total charge remains conserved during charge transfer between conductors.
$$Q_{\text{total}} = Q_1 + Q_2 = Q_1'' + Q_2''$$

#### 2. Step-by-Step Explanation
1. **Initial State**: Plate 1 has charge $Q_1$, Plate 2 has charge $Q_2$.
2. **Charge Transfer**: Due to potential difference, free electrons flow through the conducting wire from the plate at lower potential to the plate at higher potential.
3. **Equilibrium State**: Flow stops when potentials equalize. The plates now have charges $Q_1''$ and $Q_2''$.
4. **Conservation**: The total net charge is unchanged because no electrons are lost to the environment or created in the wire; they are merely redistributed.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q7', 7),
  ('beee0000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000007', 'During a laboratory experiment, students observe that when electrons move from one conductor to another, the charge on each conductor changes but the overall charge of the system remains unchanged. Identify the law governing this behavior.

*(2 Marks - [U/C, 1])*', '### Topic: Law of Conservation of Charge
**Difficulty Level**: Easy (Recall)

#### 1. Identified Law
The law governing this behavior is the **Law of Conservation of Electric Charge**.

#### 2. Explanation
* In any closed system, the net electric charge is constant.
* When electrons (which carry a fundamental negative charge $e = -1.6 \times 10^{-19}\text{ C}$) move from Conductor A to Conductor B:
  * Conductor A becomes more positive (deficit of electrons).
  * Conductor B becomes more negative (excess of electrons).
  * The sum of charges $\Delta q_A + \Delta q_B = 0$ ensures the net system charge remains constant.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q8', 8),
  ('beee0000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000007', 'During a laboratory investigation of electric charge, scientists observe that whenever an object becomes charged, the charge always appears in fixed discrete amounts rather than any arbitrary value. Even when very small charges are measured, they always appear as multiples of a fundamental unit. This observation leads researchers to study the concept that electric charge exists in discrete packets rather than continuous values. Assess the concept of quantization of electric charge and its significance in electrostatics.

*(5 Marks - [Ap/P, 2])*', '### Topic: Quantization of Electric Charge
**Difficulty Level**: Medium (Analytical)

#### 1. Introduction & Concept of Quantization
**Quantization of electric charge** is the principle that the net charge ($q$) on any physical body is always an integral multiple of the basic fundamental unit of charge ($e$), which is the charge of a single electron or proton.
$$q = \pm n e$$
Where:
* $q$ = Total net charge on the body
* $n$ = Any integer ($1, 2, 3, \dots$)
* $e$ = Fundamental unit of charge $\approx 1.602 \times 10^{-19}\text{ C}$

No body can possess a charge like $1.5e$, $2.75e$, or any fractional value of the electron charge.

#### 2. Physical Basis
* Charge transfer occurs through the physical movement of individual electrons. 
* Since electrons cannot be split into fractions during everyday physical or chemical processes, the transferred charge must be in integer quantities of electrons.

#### 3. Mathematical Analysis & Example
Suppose an object has a charge of $q = 8.0 \times 10^{-19}\text{ C}$. We can find the number of missing electrons:
$$n = \frac{q}{e} = \frac{8.0 \times 10^{-19}\text{ C}}{1.6 \times 10^{-19}\text{ C}} = 5\text{ electrons}$$
Since $5$ is an integer, this charge is physically possible. A charge of $5.5 \times 10^{-19}\text{ C}$ would not be possible as it requires a non-integer number of electrons ($3.43$).

#### 4. Significance in Electrostatics
1. **Microscopic vs. Macroscopic Scale**: At the atomic level, quantization is crucial for analyzing atomic structures, chemical bonds, and semiconductor operations. 
2. **Macroscopic Approximation**: At a macroscopic level (e.g., microcoulombs of charge), the number of electrons is so massive ($1\ \mu\text{C} \approx 6.25 \times 10^{12}$ electrons) that the discrete steps are imperceptible, and charge can be treated as a continuous distribution.

```mermaid
graph TD
    Micro[Microscopic Scale] -->|Individual Electrons| Quant[Quantized Steps q = n*e]
    Macro[Macroscopic Scale] -->|Massive Electron Count| Cont[Continuous Charge Approximation]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q9', 9),
  ('beee0000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000007', 'In an electronics experiment, a long metallic wire is connected to a battery and a small bulb. When the circuit is completed, the bulb immediately glows, indicating that electric current is flowing through the wire. Scientists explain that inside the wire, millions of electrons move slowly under the influence of the electric field produced by the battery. This gradual movement of electrons in a preferred direction is responsible for current flow. Analyze the role of electron drift in the conduction of electric current in metallic conductors.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electron Drift and Current Conduction
**Difficulty Level**: Medium (Analytical)

#### 1. Concept of Electron Drift
In a metallic conductor, free valence electrons move randomly in all directions due to thermal energy. Their average thermal velocity is high ($\approx 10^5\text{ m/s}$), but because the motion is random, the net current is zero.
When an external electric field ($E$) is applied by a battery:
* Electrons experience an electrostatic force:
$$F = -e E$$
* This force accelerates electrons in a direction opposite to the electric field.
* Due to continuous collisions with positive lattice ions, electrons lose their kinetic energy and acquire a slow, average net velocity in the direction of the force. This is called **drift velocity** ($v_d$).

#### 2. Mathematical Derivation of Current ($I$)
Let a conductor have:
* Cross-sectional area = $A$
* Length = $L$
* Number of free electrons per unit volume (charge density) = $n$

```
          <--- Drift Velocity (vd)
  +-------------------------------------+
  |  .e-      .e-      .e-      .e-     |  Area A
  +-------------------------------------+
   -------------------------------------> Applied Electric Field (E)
```

The total number of free electrons in volume $V = A L$ is:
$$N = n A L$$
Total charge contained in this volume:
$$Q = N e = n A L e$$
The time ($t$) taken for this charge to drift across the length $L$ of the conductor is:
$$t = \frac{L}{v_d}$$
By definition, electric current ($I$) is:
$$I = \frac{Q}{t} = \frac{n A L e}{\frac{L}{v_d}}$$
$$I = n A e v_d$$

#### 3. Why the Bulb Glows Immediately
Although the drift velocity of electrons is extremely slow (usually a fraction of a millimeter per second, e.g., $10^{-4}\text{ m/s}$), the bulb glows instantly because:
* The applied electric field propagates through the conductor at nearly the **speed of light** ($\approx 3 \times 10^8\text{ m/s}$).
* Electrons throughout the entire circuit begin to drift simultaneously. The bulb does not wait for electrons from the battery to reach it; the local electrons inside the bulb''s filament immediately start moving.

#### 4. Summary of Key Factors
* **Drift velocity ($v_d$)**:
$$v_d = \frac{e E \tau}{m}$$
Where $\tau$ is the mean free time between collisions and $m$ is the mass of an electron.
* **Direct Proportion**: Current is directly proportional to drift velocity ($I \propto v_d$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q10', 10),
  ('beee0000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000007', 'In an electrostatics experiment, students charge several small metal spheres by rubbing them with different materials. After charging, they bring the spheres into contact with each other and measure the resulting charge using an electrometer. They observe that the final charge on the combined system equals the sum of the individual charges originally present on each sphere. This observation leads them to analyze the principle that electric charges combine algebraically when multiple charged bodies interact. Examine the principle of additivity of electric charges and explain how total charge is determined when several charged bodies interact.

*(5 Marks - [Ap/P, 2])*', '### Topic: Additivity of Electric Charges
**Difficulty Level**: Easy (Conceptual)

#### 1. Definition of Additivity of Charge
The **additivity of electric charge** is the property by which the total charge of a system containing multiple charges is equal to the algebraic sum of the individual charges.
$$Q_{\text{total}} = q_1 + q_2 + q_3 + \dots + q_n = \sum_{i=1}^{n} q_i$$

#### 2. Key Characteristics
* **Algebraic Summation**: Unlike mass, which is always positive, electric charges can be positive or negative. Therefore, when summing charges, their signs ($+$ or $-$) must be taken into account.
* **Scalar Property**: Charge is a scalar quantity, meaning it has magnitude and sign but no direction. Adding charges is equivalent to adding real numbers.

#### 3. Mathematical Example
Consider an isolated system consisting of four charged spheres with the following charges:
* $q_1 = +5\ \mu\text{C}$
* $q_2 = -3\ \mu\text{C}$
* $q_3 = +8\ \mu\text{C}$
* $q_4 = -2\ \mu\text{C}$

The total charge ($Q_{\text{total}}$) of the system is:
$$Q_{\text{total}} = q_1 + q_2 + q_3 + q_4$$
$$Q_{\text{total}} = (+5) + (-3) + (+8) + (-2)\ \mu\text{C}$$
$$Q_{\text{total}} = (5 - 3 + 8 - 2)\ \mu\text{C} = +8\ \mu\text{C}$$

#### 4. Behavior During Interaction (Contact)
When the spheres are brought into contact, charge redistribution occurs due to potential differences. 
* Electrons flow between the spheres.
* Although individual charges change ($q_1 \rightarrow q_1''$), the total final charge is still conserved and equals the original algebraic sum:
$$q_1'' + q_2'' + q_3'' + q_4'' = Q_{\text{total}} = +8\ \mu\text{C}$$

```mermaid
graph TD
    A["Initial State:<br/>q1=+5, q2=-3, q3=+8, q4=-2<br/>Sum = +8 μC"] --> B["Interaction (Contact):<br/>Electrons flow to equalize potentials"]
    B --> C["Final State:<br/>q1''=+2, q2''=+2, q3''=+2, q4''=+2<br/>Sum = +8 μC"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q11', 11),
  ('beee0000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000007', 'During the design of electrical wiring systems in buildings, engineers select materials such as copper and aluminum for conducting electricity. These materials allow electric charges to move easily through them when a voltage is applied. Engineers study the internal structure of these materials to understand why electrons can move freely and how this property allows the conductor to carry electric current efficiently. Assess the behavior of electric charges in conductors and explain why conductors allow the flow of electric current.

*(5 Marks - [Ap/P, 2])*', '### Topic: Behavior of Charges in Conductors
**Difficulty Level**: Medium (Conceptual)

#### 1. Internal Structure of Conductors
Conductors (like copper, aluminum, and silver) are materials that allow electric charges to move freely within them.
* **Metallic Bonding**: In metals, atoms share their outer valence electrons in a crystalline lattice.
* **Electron Sea Model**: The valence electrons are weakly bound to their parent nuclei. They detach easily, forming a "sea of free electrons" that move throughout the volume of the conductor, leaving behind fixed positive ions.

```
       [+]  e-  [+]  e-  [+]  e-  [+]
       e-  [+]  e-  [+]  e-  [+]  e-
       [+]  e-  [+]  e-  [+]  e-  [+]
   (Fixed Positive Ions in a Sea of Free Electrons)
```

#### 2. Behavior of Charges Under Different Conditions
* **Without External Electric Field ($E = 0$)**: Free electrons undergo random thermal motion, colliding with lattice ions. The average velocity is zero; hence, no net current flows.
* **With External Electric Field ($E \neq 0$)**: When a potential difference is applied across the conductor:
  1. The electric field propagates instantly through the material.
  2. Free electrons experience an electrostatic force ($F = -eE$) directing them toward the positive terminal.
  3. This directed drift of electrons produces a net electric current.

#### 3. Why Conductors are Efficient
The efficiency of a conductor is determined by its **conductivity** ($\sigma$):
$$\sigma = \frac{n e^2 \tau}{m}$$
Where:
* $n$ = Density of free electrons (very high in metals: $\approx 10^{28}\text{ electrons/m}^3$).
* $\tau$ = Relaxation time (average time between collisions).
* $m$ = Mass of electron.

Copper and aluminum have low resistivity (high $\sigma$) due to their exceptionally high free electron density ($n$), making them the materials of choice for electrical wiring.

#### 4. Characteristics of Ideal Conductors
1. Net electric field inside a static conductor is zero.
2. Any excess charge resides entirely on the outer surface of the conductor.
3. The surface of a conductor is an equipotential surface.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q12', 12),
  ('beee0000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000007', 'In a physics laboratory, students perform an experiment using two metal spheres placed on insulating stands. One sphere is positively charged while the other is neutral. When the two spheres are connected with a conducting wire, charge flows between them and eventually distributes evenly. After disconnecting the wire, the students measure the charges on both spheres and notice that although the distribution of charge has changed, the total amount of charge present in the system remains the same as before the interaction. This observation leads them to examine a fundamental law governing electric charge in physical systems. Examine the principle of conservation of electric charge and explain how it applies to the redistribution of charge in a system.

*(5 Marks - [Ap/P, 2])*', '### Topic: Law of Conservation of Charge
**Difficulty Level**: Medium (Conceptual)

#### 1. The Principle of Conservation of Charge
The **Law of Conservation of Electric Charge** states that:
* The net electric charge of an isolated system remains constant.
* Charges cannot be created or destroyed; they can only be transferred from one part of a system to another.

#### 2. Detailed Application to the Metal Spheres
Let:
* Sphere A be initially charged with positive charge $Q_A = +Q$.
* Sphere B be initially neutral, so $Q_B = 0$.
* The total initial charge of the isolated system is:
$$Q_{\text{initial}} = Q_A + Q_B = Q + 0 = Q$$

When connected by a conducting wire:
1. Since Sphere A is positive (low electron concentration) and Sphere B is neutral (higher relative electron concentration), electrons flow from Sphere B to Sphere A.
2. The transfer of negative electrons leaves Sphere B with a net positive charge.
3. The flow continues until both spheres reach the same electric potential.
4. After disconnecting, let the new charges be $Q_A''$ and $Q_B''$.
5. For two identical spheres, the charge divides equally:
$$Q_A'' = Q_B'' = \frac{Q}{2}$$
6. Summing the final charges:
$$Q_{\text{final}} = Q_A'' + Q_B'' = \frac{Q}{2} + \frac{Q}{2} = Q$$

This matches $Q_{\text{initial}}$ exactly, proving that the net charge was conserved.

```mermaid
graph TD
    A["Initial:<br/>Sphere A = +Q<br/>Sphere B = 0"] -->|Conduction| B["Connecting Wire:<br/>Electrons flow B to A"]
    B --> C["Final:<br/>Sphere A = +Q/2<br/>Sphere B = +Q/2"]
    C -->|Verification| D["Total Charge:<br/>Q_initial = Q_final = Q"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q13', 13),
  ('beee0000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000007', 'In meteorology research centers, scientists investigate the electrical nature of thunderclouds. They observe that ice crystals and water droplets move at different speeds within clouds due to air currents. These movements lead to repeated collisions between particles, causing charge transfer and separation within the cloud. As the cloud grows larger, the accumulation of charges increases the electric potential difference between the cloud and nearby objects such as tall buildings or trees. Analyze how particle collisions inside clouds contribute to the formation of atmospheric electric charges.

*(5 Marks - [Ap/P, 2])*', '### Topic: Atmospheric Electricity & Electrostatic Charging
**Difficulty Level**: Hard (Analytical)

#### 1. Mechanisms of Charge Generation (Collisional Charging)
Atmospheric charge separation in thunderclouds (cumulonimbus clouds) primarily occurs through a process called **non-inductive charging** due to collisions between different states of water:
* **Graupel** (soft hail particles, larger and heavier).
* **Ice crystals** (smaller and lighter).

#### 2. Step-by-Step Atmospheric Charge Separation
1. **Updrafts and Downdrafts**: Powerful convective air currents push lighter ice crystals upward, while gravity pulls heavier graupel downward.
2. **Friction and Collisions**: As these particles move in opposite directions, they collide repeatedly.
3. **Electron Transfer**: During collisions in the presence of supercooled water droplets (at temperatures below $0^{\circ}\text{C}$):
   * Lighter ice crystals lose electrons and become **positively charged**.
   * Heavier graupel particles gain electrons and become **negatively charged**.
4. **Gravitational Separation**:
   * The positive ice crystals accumulate at the **top** of the cloud.
   * The negative graupel particles accumulate at the **middle and bottom** of the cloud.

```mermaid
graph TD
    subgraph Thundercloud Structure
    Top["Cloud Top (+ Positive Charge)<br/>Lighter Ice Crystals"]
    Middle["Cloud Base (- Negative Charge)<br/>Heavier Graupel Particles"]
    end
    Earth["Ground Surface (+ Induced Positive Charge)<br/>Trees, Buildings"]
    Top -.->|Air Currents| Middle
    Middle -->|Creates Electric Field| Earth
```

#### 3. Resultant Electric Potential Difference
This spatial separation creates a massive dipole structure. The bottom of the cloud (negative) induces a positive charge on the Earth''s surface directly below it. When the potential difference exceeds the dielectric breakdown strength of air ($\approx 3 \times 10^6\text{ V/m}$), ionization occurs, leading to a **lightning discharge**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q14', 14),
  ('beee0000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000007', 'In particle physics experiments, scientists observe interactions between electrons and protons inside controlled environments. During collisions or interactions, particles may exchange charge or produce other particles, but careful measurements show that the total electric charge before and after the interaction always remains constant. This experimental evidence supports a fundamental conservation principle in physics. Analyze how particle interactions demonstrate the conservation of electric charge.

*(5 Marks - [Ap/P, 2])*', '### Topic: Conservation of Charge in Particle Physics
**Difficulty Level**: Hard (Analytical)

#### 1. Fundamental Principle
In particle physics, **charge conservation** is an absolute conservation law. It is mathematically associated with global $U(1)$ gauge invariance (according to Noether''s Theorem). In any subatomic reaction, the net electric charge must remain constant.

#### 2. Representative Particle Interactions
We can demonstrate charge conservation through three key types of particle interactions:

##### A. Pair Production
A high-energy gamma-ray photon ($\gamma$) interacts with a nucleus to produce an electron ($e^-$) and a positron ($e^+$):
$$\gamma \rightarrow e^- + e^+$$
* **Before**: Charge of photon = $0$
* **After**: Charge of electron + positron = $(-1) + (+1) = 0$
* **Status**: Conserved.

##### B. Beta Decay (Neutron Decay)
A free neutron ($n$) decays into a proton ($p$), an electron ($e^-$), and an electron antineutrino ($\bar{\nu}_e$):
$$n \rightarrow p + e^- + \bar{\nu}_e$$
* **Before**: Charge of neutron = $0$
* **After**: Charge of proton + electron + antineutrino = $(+1) + (-1) + 0 = 0$
* **Status**: Conserved.

##### C. Electron-Positron Annihilation
An electron and a positron collide to destroy each other, producing gamma photons:
$$e^- + e^+ \rightarrow 2\gamma$$
* **Before**: $(-1) + (+1) = 0$
* **After**: $0$
* **Status**: Conserved.

#### 3. Analytical Conclusion
These microscopic interactions prove that while individual particles can be created or annihilated, they must always be produced or destroyed in **oppositely charged pairs** to preserve the net charge of the universe.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q15', 15),
  ('beee0000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000007', 'Atmospheric scientists studying thunderstorms use weather balloons and sensors to monitor electrical activity inside clouds. Their observations show that powerful air currents move charged particles upward and downward within the cloud. As these particles collide and separate, large quantities of electric charge accumulate. When the electric field becomes sufficiently strong, a rapid discharge occurs either within the cloud or between the cloud and the Earth’s surface. Assess the process by which charge separation in clouds leads to lightning formation.

*(5 Marks - [Ap/P, 2])*', '### Topic: Lightning Formation Mechanics
**Difficulty Level**: Hard (Analytical)

#### 1. The Separation Stage
Inside a storm cloud, convection currents cause rising ice crystals (which charge positively) and falling graupel (which charge negatively) to separate. This creates a strong positive field at the top of the cloud and a negative field at the base.

#### 2. Polarization of the Ground
The massive negative charge at the cloud base repels free electrons in the Earth''s surface deeper into the ground, leaving the ground surface directly beneath the cloud **positively polarized**.

```
  [ Cloud Base: Negative Charges - - - - - - ]
                     |
                     | Electric Field (E) exceeds 3x10^6 V/m
                     v
  [ Ground Surface: Positive Charges + + + + ]
```

#### 3. Step-by-Step Discharge Process (Lightning Strike)
1. **Stepped Leader**: The negative charge at the base of the cloud begins to ionize the surrounding air, creating a path of plasma that branches downward in steps (moves at $\approx 200\text{ km/s}$).
2. **Upward Streamer**: As the stepped leader nears the ground, the intense electric field pulls positive charges up from tall ground objects (like trees, buildings, or lightning rods) in the form of upward-reaching streamers.
3. **Return Stroke**: When the stepped leader and upward streamer meet, a highly conducting channel is completed. Electrons rapidly dump into the ground, creating the bright, high-current **return stroke** (currents up to $100,000\text{ A}$, temperature $\approx 30,000\text{ K}$).
4. **Dart Leader**: If residual charge remains in the cloud, a secondary continuous discharge path called a dart leader can descend along the same path, producing subsequent strokes.

#### 4. Summary of Energy Conversions
During this electrostatic discharge, the stored electrostatic potential energy of the cloud is instantly converted into thermal, light (optical radiation), acoustic (thunder), and electromagnetic energy.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q16', 16),
  ('beee0000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000007', 'A teaching laboratory places three charges around a measurement point forming a triangular arrangement. Students notice that when one charge is removed, the measured electric field direction changes noticeably even though the remaining two charges remain unchanged. This observation leads them to analyze how individual electric field contributions affect the resultant field. Assess how the principle of superposition explains the change in resultant electric field when one of the charges is removed.

*(3 Marks - [U/P, 2])*', '### Topic: Principle of Superposition
**Difficulty Level**: Medium (Conceptual)

#### 1. Principle of Superposition Statement
The principle states that:
$$\text{The net electric field } \vec{E} \text{ at a point due to a system of point charges is the vector sum of}$$
$$\text{the electric fields produced by each individual charge at that point:}$$
$$\vec{E}_{\text{net}} = \vec{E}_1 + \vec{E}_2 + \vec{E}_3 + \dots$$

#### 2. Explanation of the Observed Behavior
* **Initial State (Three Charges)**: The resultant electric field $\vec{E}_{\text{initial}}$ is:
$$\vec{E}_{\text{initial}} = \vec{E}_1 + \vec{E}_2 + \vec{E}_3$$
* **Final State (One Charge Removed)**: If charge 3 is removed, its contribution $\vec{E}_3$ becomes zero:
$$\vec{E}_{\text{final}} = \vec{E}_1 + \vec{E}_2$$
* **Analysis**: Since the vector sum of two vectors $(\vec{E}_1 + \vec{E}_2)$ is generally different in both magnitude and direction compared to three vectors $(\vec{E}_1 + \vec{E}_2 + \vec{E}_3)$, removing charge 3 alters the net vector''s direction, explaining the change noticed by the students.

```mermaid
graph TD
    A["E_initial = E1 + E2 + E3"] -->|Remove Q3| B["E_final = E1 + E2"]
    B --> C["Resultant direction and magnitude change"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q17', 17),
  ('beee0000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000007', 'A charged particle detector is placed near an isolated positive charge. Engineers observe that whenever a small positive test charge is released near the detector it always moves away from the source charge rather than toward it. Infer the cause of this motion using the concept of electric field direction around a point charge.

*(2 Marks - [U/C, 1])*', '### Topic: Electric Field Direction
**Difficulty Level**: Easy (Conceptual)

#### 1. Inference and Cause
The motion is caused by the **repulsive electrostatic force** exerted by the positive source charge on the positive test charge.

#### 2. Electric Field Concept
* The electric field ($ec{E}$) around an isolated positive charge is directed **radially outwards** from the charge.
* By definition, the force ($ec{F}$) on a charge $q$ in an electric field is:
$$ec{F} = q ec{E}$$
* Since the test charge is positive ($q > 0$), the force acts in the **same direction** as the electric field (radially outwards). Therefore, the test charge accelerates away from the positive source charge.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q18', 18),
  ('beee0000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000007', 'A square conducting plate carries a total charge of 8 microC distributed uniformly across its surface. The area of the plate is 2 square meters. Students are asked to determine the surface charge density of the plate in order to analyze the electric field generated by the charged surface. Evaluate the surface charge density using the relation sigma = Q / A.

*(3 Marks - [Ap/P, 2])*', '### Topic: Surface Charge Density Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Parameters
* Total Charge, $Q = 8\ \mu\text{C} = 8 \times 10^{-6}\text{ C}$
* Area of the Plate, $A = 2\text{ m}^2$

#### 2. Formula
The surface charge density ($\sigma$) is defined as charge per unit area:
$$\sigma = \frac{Q}{A}$$

#### 3. Calculation
$$\sigma = \frac{8 \times 10^{-6}\text{ C}}{2\text{ m}^2}$$
$$\sigma = 4 \times 10^{-6}\text{ C/m}^2 = 4\ \mu\text{C/m}^2$$

#### 4. Conclusion
The surface charge density of the plate is **$4 \times 10^{-6}\text{ C/m}^2$** (or $4\ \mu\text{C/m}^2$). This value represents the charge distribution per unit area, which can be used to calculate the electric field near the plate using Gauss''s Law ($E = \sigma / (2\epsilon_0)$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q19', 19),
  ('beee0000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000007', 'During a classroom experiment a long conducting rod is uniformly charged along its entire length. Students are asked to express the distribution of charge along the rod using a suitable physical quantity. Infer why linear charge density is used to describe this distribution.

*(2 Marks - [U/C, 1])*', '### Topic: Linear Charge Density Concept
**Difficulty Level**: Easy (Conceptual)

#### 1. Identified Physical Quantity
The physical quantity used is **linear charge density** (represented by $\lambda$).
$$\lambda = \frac{Q}{L}$$
Where $Q$ is the total charge and $L$ is the length of the rod.

#### 2. Rationale for Selection
* A rod is a one-dimensional (1D) geometry where the length ($L$) is significantly greater than the cross-sectional radius ($r \ll L$).
* Since the charge is distributed almost entirely along the length, treating the cross-section as negligible simplifies electric field derivations (such as using Gauss''s Law) by reduction to a 1D charge line density.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q20', 20),
  ('beee0000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000007', 'During an electrostatic experiment, a charged particle produces an electric field of 12000 N/C at a distance of 1 m from the charge. When the observation point is moved to 2 m away from the same charge, researchers observe that the field intensity decreases significantly. Students are asked to interpret this change based on the mathematical relationship governing electric fields. Determine how the electric field changes with distance and evaluate the new field value at 2 m.

*(3 Marks - [U/P, 2])*', '### Topic: Electric Field and Inverse Square Law
**Difficulty Level**: Medium (Numerical)

#### 1. Mathematical Relationship
The electric field ($E$) of a point charge is governed by the **Inverse Square Law**:
$$E = \frac{1}{4 \pi \epsilon_0} \frac{q}{r^2}$$
Hence, the electric field is inversely proportional to the square of the distance ($r$) from the charge:
$$E \propto \frac{1}{r^2}$$

#### 2. Evaluating the New Field Value
Let:
* Initial distance $r_1 = 1\text{ m}$, Initial field $E_1 = 12000\text{ N/C}$
* Final distance $r_2 = 2\text{ m}$, Final field = $E_2$

From the proportionality relationship:
$$\frac{E_2}{E_1} = \left(\frac{r_1}{r_2}\right)^2$$
$$E_2 = E_1 \times \left(\frac{r_1}{r_2}\right)^2$$
$$E_2 = 12000 \times \left(\frac{1}{2}\right)^2$$
$$E_2 = 12000 \times \frac{1}{4} = 3000\text{ N/C}$$

#### 3. Conclusion
Doubling the distance reduces the electric field intensity by a factor of 4. The new field value at 2 m is **$3000\text{ N/C}$**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q21', 21),
  ('beee0000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000007', 'In a microelectronics laboratory two equal positive charges are placed very close to each other while engineers attempt to find a point between them where the electric field becomes zero. When a third nearby charge is introduced the field at that point no longer cancels. Determine why the electric field cancellation fails.

*(2 Marks - [U/C, 1])*', '### Topic: Superposition of Electric Fields
**Difficulty Level**: Easy (Conceptual)

#### 1. Cause of Failure
The electric field cancellation fails because the electric field of the newly introduced third charge is not balanced, violating the conditions for zero net field.

#### 2. Vector Explanation
* **Initial State**: For two equal positive charges, the electric fields they produce at the exact midpoint are equal in magnitude but opposite in direction ($\vec{E}_1 = -\vec{E}_2$), so they cancel out completely:
$$\vec{E}_{\text{net}} = \vec{E}_1 + \vec{E}_2 = 0$$
* **Final State**: When a third charge ($Q_3$) is introduced, it produces its own electric field $\vec{E}_3$ at that midpoint. The new net field becomes:
$$\vec{E}_{\text{net}} = \vec{E}_1 + \vec{E}_2 + \vec{E}_3 = 0 + \vec{E}_3 = \vec{E}_3 \neq 0$$
Since $\vec{E}_3 \neq 0$, the net electric field is no longer zero.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q22', 22),
  ('beee0000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000007', 'A simulation program visualizes the electric field produced by a long uniformly charged wire. Students observe that the electric field around the wire forms circular symmetry around the wire and its magnitude decreases as the distance from the wire increases. Researchers explain that the electric field at a point results from the combined contribution of all small charge elements along the wire. Assess why continuous charge distribution requires considering contributions from many small charge elements instead of treating the wire as a single point charge.

*(3 Marks - [U/P, 2])*', '### Topic: Continuous Charge Distributions
**Difficulty Level**: Medium (Conceptual)

#### 1. Why Continuous Distributions Require Element Integration
A physical object like a wire has real spatial dimensions. Treating it as a single point charge fails because:
1. **Varying Distances**: Different parts of the wire are at different distances from the observation point.
2. **Varying Directions**: The electric field vectors contributed by different parts of the wire point in different directions.

#### 2. Vector Superposition via Integration
To find the correct net field:
* The wire is divided into infinitely small charge elements ($dq = \lambda \cdot dl$).
* Each element is treated as a point charge producing an infinitesimal field vector $d\vec{E}$:
$$d\vec{E} = \frac{1}{4\pi\epsilon_0}\frac{dq}{r^2}\hat{r}$$
* The total field is the vector sum (integral) of all these elements:
$$\vec{E} = \int d\vec{E}$$
Integration automatically accounts for the geometry, distance variations, and direction changes of the field vectors.

```mermaid
graph LR
    Wire["Charged Wire (dq elements)"] -->|dE1 vector| Point[Observation Point]
    Wire -->|dE2 vector| Point
    Wire -->|dE3 vector| Point
    Point -->|Vector Integration| Net[Resultant Field E]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q23', 23),
  ('beee0000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000007', 'Researchers studying electrostatic systems observe that many real objects such as wires plates and insulating materials contain charges spread over their geometry instead of concentrated at one point. Scientists therefore model these systems using continuous charge distributions. Determine why continuous charge distribution models are important for analyzing electric fields in real systems.

*(2 Marks - [U/C, 1])*', '### Topic: Continuous Charge Models
**Difficulty Level**: Easy (Conceptual)

#### 1. Importance of Continuous Charge Models
Real-world physical objects have spatial extensions (1D lines, 2D surfaces, 3D volumes) rather than being point-like.
* **Accuracy**: Modelling them as point charges is a poor approximation that leads to large mathematical errors when close to the object''s surface.
* **Solvability (Gauss''s Law)**: Continuous models allow the use of mathematical tools like calculus and Gauss''s Law, utilizing system symmetry (cylindrical, spherical, planar) to calculate complex electric fields efficiently.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q24', 24),
  ('beee0000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000007', 'A physics research laboratory is studying electric field visualization using charged metallic spheres. During an experiment, a positively charged sphere is placed in the center of an insulating platform and fine electric field mapping sensors are arranged around it. The sensors record that the electric field appears to spread outward uniformly from the surface of the sphere. When the same experiment is repeated with a negatively charged sphere, the sensors show that the field pattern appears reversed in direction but maintains a similar symmetrical distribution. Researchers use this observation to represent electric fields using field line diagrams. Analyze how the direction and arrangement of electric field lines represent the nature of positive and negative charges and infer why these lines are useful in visualizing electric field behavior.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electric Field Lines Representation
**Difficulty Level**: Medium (Conceptual)

#### 1. Concept of Electric Field Lines
Electric field lines are imaginary curves drawn in space such that the tangent at any point gives the direction of the electric field vector ($\vec{E}$) at that point.

#### 2. Representation of Positive vs. Negative Charges
* **Positive Charge (Source)**: Field lines originate from a positive charge and extend radially outwards to infinity. This represents that a positive test charge placed near it would be repelled outwards.
* **Negative Charge (Sink)**: Field lines originate from infinity and terminate radially inwards onto the negative charge. This represents that a positive test charge would be attracted inwards.
* **Symmetry**: For isolated spheres, both show spherical symmetry because the charge is distributed uniformly, making the field magnitude dependent only on radial distance $r$.

```mermaid
graph TD
    subgraph Positive Charge
    P((+)) -->|Outward| PO1(( ))
    P -->|Outward| PO2(( ))
    P -->|Outward| PO3(( ))
    end
    subgraph Negative Charge
    N1(( )) -->|Inward| N((-))
    N2(( )) -->|Inward| N
    N3(( )) -->|Inward| N
    end
```

#### 3. Properties and Visual Utility of Field Lines
1. **Field Strength Representation**: The density of field lines (number of lines passing through a unit area perpendicular to the lines) represents the electric field magnitude. Closer lines indicate a stronger field; widely separated lines indicate a weaker field.
2. **Direction of Force**: The tangent to a field line at any point gives the direction of force on a positive charge.
3. **No Crossing**: Two electric field lines can never cross. If they did, there would be two tangents at the intersection point, representing two different directions for the net electric field vector at a single point, which is physically impossible.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q25', 25),
  ('beee0000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000007', 'In an electrostatic experiment a very long charged wire carries a uniform linear charge density of lambda = 5 × 10^-6 C/m. Researchers want to determine the electric field at a point located 0.5 m from the wire. The electric field due to an infinite line charge is given by E = lambda / (2 × pi × epsilon0 × r) where epsilon0 = 8.85 × 10^-12 C²/N·m². Determine the magnitude of the electric field at the observation point.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electric Field of an Infinite Line Charge
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Linear charge density, $\lambda = 5 \times 10^{-6}\text{ C/m}$
* Radial distance, $r = 0.5\text{ m}$
* Permittivity of free space, $\epsilon_0 = 8.85 \times 10^{-12}\text{ C}^2/\text{N}\cdot\text{m}^2$

#### 2. Formula
$$E = \frac{\lambda}{2 \pi \epsilon_0 r}$$

*Trick for calculation*: We know that $\frac{1}{4 \pi \epsilon_0} = 9 \times 10^9\text{ N}\cdot\text{m}^2/\text{C}^2$. We can rewrite the formula by multiplying the numerator and denominator by 2:
$$E = \frac{2 \lambda}{4 \pi \epsilon_0 r} = 2 \left(\frac{1}{4 \pi \epsilon_0}\right) \frac{\lambda}{r}$$

#### 3. Step-by-Step Calculation
Substitute the values:
$$E = 2 \times (9 \times 10^9) \times \frac{5 \times 10^{-6}}{0.5}$$
$$E = 18 \times 10^9 \times 10^{-5}$$
$$E = 1.8 \times 10^5\text{ N/C}$$

#### 4. Conclusion
The magnitude of the electric field at the observation point is **$1.8 \times 10^5\text{ N/C}$** (directed radially outwards from the wire).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q26', 26),
  ('beee0000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000007', 'An electrostatic simulation system is used to study the interaction between two identical positive charges placed close to each other. When the electric field pattern is generated, students observe that the electric field lines originating from each charge curve away from the region between them rather than crossing directly toward the other charge. The space between the charges shows a region where the lines appear to repel each other. Evaluate why electric field lines behave in this manner and determine what this pattern indicates about the interaction between the two positive charges.

*(5 Marks - [Ap/P, 2])*', '### Topic: Interaction of Identical Charges
**Difficulty Level**: Medium (Conceptual)

#### 1. Why Field Lines Curve Away
* **Superposition Principle**: At any point between the two positive charges, the net electric field vector is the vector sum of individual fields: $\vec{E}_{\text{net}} = \vec{E}_1 + \vec{E}_2$.
* **Vector Opposition**: In the region between two positive charges, their fields point in opposite directions. As we approach the exact midpoint, the opposing fields reduce the net electric field magnitude.
* **Neutral Point**: At the exact midpoint between two identical charges, the fields are equal and opposite, cancelling out to zero. No field lines can pass through this **neutral point (null point)**.
* **Curving**: Because field lines represent the path of net force and cannot cross, they curve away to avoid the neutral point, creating the appearance of lateral repulsion.

```mermaid
graph TD
    subgraph Field Pattern
    Q1((+)) -->|Curves Away| Up1(( ))
    Q1 -->|Curves Away| Down1(( ))
    Q2((+)) -->|Curves Away| Up2(( ))
    Q2 -->|Curves Away| Down2(( ))
    Mid[Midpoint: E=0]
    end
```

#### 2. What the Pattern Indicates
1. **Electrostatic Repulsion**: The lateral pressure and curving away of field lines visually represent the repulsive force between the two like charges.
2. **Existence of a Null Point**: The clear gap in the middle signifies a region of zero field intensity ($E = 0$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q27', 27),
  ('beee0000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000007', 'An electrostatics laboratory studies the electric field produced by very long charged conductors. In one experiment, researchers place a very long straight wire carrying uniform positive charge and measure the electric field at different points around it using sensors. They observe that the electric field magnitude depends only on the radial distance from the wire and remains the same at all points located at the same distance around it. Scientists explain that the symmetry of the charge distribution plays an important role in determining the electric field pattern. Analyze how the symmetry of an infinitely long charged wire influences the electric field distribution and evaluate why the electric field depends only on the perpendicular distance from the wire.

*(5 Marks - [Ap/P, 2])*', '### Topic: Cylindrical Symmetry and Gauss''s Law
**Difficulty Level**: Hard (Analytical)

#### 1. Influence of Cylindrical Symmetry
An infinitely long charged wire has two main symmetries:
1. **Translational Symmetry**: Moving along the length of the wire (parallel to it) does not change the charge distribution. Thus, the electric field cannot have a component parallel to the wire, and its magnitude cannot change with position along the wire.
2. **Rotational Symmetry**: Rotating the wire around its axis does not alter its appearance. Thus, the electric field must point radially outwards (or inwards) and must be identical at all points on a cylinder concentric with the wire.

These symmetries dictate that the electric field vector $\vec{E}$ must be **purely radial** and its magnitude $E(r)$ can only depend on the perpendicular radial distance $r$.

#### 2. Derivation Using Gauss''s Law
To find the field at distance $r$, we choose a coaxial cylinder of radius $r$ and length $L$ as our Gaussian surface.

```
       +-------------------------------+
======|=======( + + + + + + )=========|====== Wire
       +-------------------------------+
       <----------- Length L ---------->
```

* **Flux through flat end caps**: Since $\vec{E}$ is radial, it is parallel to the end caps, meaning the angle between $\vec{E}$ and the area vector $\vec{dA}$ is $90^{\circ}$. Thus, flux through ends is zero:
$$\Phi_{\text{ends}} = \int \vec{E} \cdot \vec{dA} = 0$$
* **Flux through curved surface**: $\vec{E}$ is perpendicular to the curved surface at all points (angle = $0^{\circ}$) and constant in magnitude:
$$\Phi_{\text{curved}} = E \cdot (2\pi r L)$$
* **Total Flux**:
$$\Phi_{\text{total}} = E(2\pi r L)$$
* **Enclosed Charge**:
$$q_{\text{enclosed}} = \lambda L$$

Applying Gauss''s Law ($\Phi = q_{\text{enc}} / \epsilon_0$):
$$E(2\pi r L) = \frac{\lambda L}{\epsilon_0}$$
$$E = \frac{\lambda}{2\pi\epsilon_0 r}$$

This mathematical proof confirms that the electric field magnitude $E$ is inversely proportional to $r$ ($E \propto 1/r$), depending solely on the perpendicular distance.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q28', 28),
  ('beee0000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000007', 'In an electrostatic experiment two point charges of equal magnitude but opposite sign are placed 4 cm apart forming an electric dipole. Each charge has a magnitude of 3 microC. Researchers want to calculate the electric dipole moment of this system in order to understand the strength of the dipole. Determine the electric dipole moment using the relation p=q×d

*(5 Marks - [Ap/P, 2])*', '### Topic: Electric Dipole Moment Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Charge magnitude, $q = 3\ \mu\text{C} = 3 \times 10^{-6}\text{ C}$
* Distance of separation, $d = 4\text{ cm} = 0.04\text{ m} = 4 \times 10^{-2}\text{ m}$

#### 2. Formula
The electric dipole moment ($p$) is a vector quantity directed from the negative charge to the positive charge, with a magnitude given by:
$$p = q \times d$$

#### 3. Calculation
$$p = (3 \times 10^{-6}\text{ C}) \times (4 \times 10^{-2}\text{ m})$$
$$p = 12 \times 10^{-8}\text{ C}\cdot\text{m}$$
$$p = 1.2 \times 10^{-7}\text{ C}\cdot\text{m}$$

#### 4. Conclusion
The magnitude of the electric dipole moment of the system is **$1.2 \times 10^{-7}\text{ C}\cdot\text{m}$** (Coulomb-meters).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q29', 29),
  ('beee0000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000007', 'Scientists analyze the electric field produced by a hollow spherical shell carrying uniform positive charge on its surface. They place electric field probes at three regions: inside the hollow cavity, on the surface of the shell, and at points outside the shell. Measurements show that the electric field is zero inside the cavity, reaches a certain value at the surface, and decreases as the distance from the sphere increases. Analyze why the electric field behaves differently in these three regions and infer how the spherical symmetry influences the field distribution.

*(5 Marks - [Ap/P, 2])*', '### Topic: Gauss''s Law & Spherical Shell Field
**Difficulty Level**: Hard (Analytical)

#### 1. Spherical Symmetry Influence
Due to uniform spherical charge distribution, the electric field must be radial and its magnitude must depend only on the radial distance $r$ from the center of the shell. We can analyze the three regions using Gauss''s Law by selecting a concentric spherical Gaussian surface of radius $r$.

#### 2. Analysis of the Three Regions

```mermaid
graph TD
    A[Region 1: r < R Inside] -->|No enclosed charge| B[E = 0]
    C[Region 2: r = R Surface] -->|Max charge density| D["E = Q / (4πε0 R²)"]
    E[Region 3: r > R Outside] -->|Acts as Point Charge| F["E = Q / (4πε0 r²)"]
```

##### A. Inside the Cavity ($r < R$)
* We choose a Gaussian sphere of radius $r < R$ inside the shell.
* Since the entire charge resides on the outer surface of the shell, the enclosed charge is zero ($q_{\text{enclosed}} = 0$).
* Applying Gauss''s Law:
$$E \cdot (4\pi r^2) = \frac{0}{\epsilon_0} \implies E = 0$$

##### B. On the Surface ($r = R$)
* The radius of the Gaussian surface equals the shell radius $R$.
* The total charge enclosed is $Q$. The field reaches its maximum value:
$$E = \frac{1}{4\pi\epsilon_0}\frac{Q}{R^2}$$

##### C. Outside the Shell ($r > R$)
* We choose a Gaussian sphere of radius $r > R$ surrounding the shell.
* The total enclosed charge is $Q$.
* Applying Gauss''s Law:
$$E \cdot (4\pi r^2) = \frac{Q}{\epsilon_0} \implies E = \frac{1}{4\pi\epsilon_0}\frac{Q}{r^2}$$
* **Inference**: Outside the shell, the electric field behaves exactly as if the entire charge $Q$ were concentrated at the center of the sphere ($E \propto 1/r^2$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q30', 30),
  ('beee0000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000007', 'A nanotechnology laboratory is studying the behavior of molecular systems that exhibit electric dipole characteristics. In one experiment, scientists place two equal but opposite charges separated by a small fixed distance on an insulating platform to simulate a dipole. Sensors placed around the setup detect that the electric field distribution in the surrounding space differs significantly from that produced by a single charge. The field pattern shows strong directional variation, and the effect becomes more pronounced when the separation distance between the charges increases while maintaining the same charge magnitude. Analyze how the presence of two equal and opposite charges forms an electric dipole and evaluate how the separation distance influences the dipole’s electric field behavior.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electric Dipole Physics
**Difficulty Level**: Medium (Conceptual)

#### 1. Formation of an Electric Dipole
An **electric dipole** is formed by two equal and opposite point charges ($+q$ and $-q$) separated by a small distance ($2a$). 
* Although the net charge of the system is zero ($q - q = 0$), the electric field is not zero because the charges are separated in space, meaning their fields do not cancel out at all points.
* The strength of the dipole is quantified by the dipole moment:
$$\vec{p} = q \cdot (2\vec{a})$$

#### 2. Influence of Separation Distance on Electric Field
The electric field of a dipole falls off much faster than that of a point charge:
* **Point Charge Field**: $E \propto \frac{1}{r^2}$
* **Dipole Field**: $E \propto \frac{1}{r^3}$ (at large distances, $r \gg 2a$)

##### Effect of Increasing Separation Distance ($2a$)
1. **Increase in Dipole Moment**: For a fixed charge $q$, increasing $2a$ directly increases the dipole moment ($p = q \cdot 2a$). This strengthens the electric field at nearby points.
2. **Breakdown of Dipole Approximation**: When the separation distance $2a$ becomes comparable to the distance to the observation point $r$, the field no longer drops off as $1/r^3$. Instead, it behaves as two distinct individual point charge fields, showing strong directional variation and asymmetry.

```mermaid
graph LR
    A["Far Away (r >> 2a)"] -->|Field decays rapidly| B["E ∝ 1/r³"]
    C["Close Up (r ≈ 2a)"] -->|Asymmetric Fields| D["Individual Point Fields 1/r²"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q31', 31),
  ('beee0000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000007', 'A uniformly charged spherical shell carries a total charge of Q = 6 × 10⁻⁶ C and has a radius of R = 0.5 m. Researchers want to calculate the electric field at a point located r=1m from the center of the shell. The electric field outside a spherical shell is given by E = (1 / (4 × pi × epsilon0)) × (Q / r²) where epsilon0 = 8.85 × 10⁻¹² C²/N·m². Determine the electric field magnitude at the observation point.

*(5 Marks - [Ap/P, 2])*', '### Topic: Spherical Shell Field Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Total Charge, $Q = 6 \times 10^{-6}\text{ C}$
* Radius of shell, $R = 0.5\text{ m}$
* Distance of observation point, $r = 1\text{ m}$ (Since $r > R$, the point lies outside the shell)
* $\frac{1}{4 \pi \epsilon_0} \approx 9 \times 10^9\text{ N}\cdot\text{m}^2/\text{C}^2$

#### 2. Formula
For a point outside the shell:
$$E = \frac{1}{4\pi\epsilon_0} \frac{Q}{r^2}$$

#### 3. Calculation
$$E = (9 \times 10^9) \times \frac{6 \times 10^{-6}}{1^2}$$
$$E = 9 \times 6 \times 10^3$$
$$E = 54 \times 10^3\text{ N/C} = 5.4 \times 10^4\text{ N/C}$$

#### 4. Conclusion
The electric field magnitude at the observation point (1 m away) is **$5.4 \times 10^4\text{ N/C}$**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q32', 32),
  ('beee0000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000007', 'An engineer testing an electromagnet observes that increasing current in the coil significantly strengthens the magnetic field produced by the device. The electromagnet is connected to a DC supply and the current flowing through the coil increases from 2 A to 6 A while the coil geometry remains unchanged. The engineer investigates the relationship between electric current and magnetic field generation around the conductor. Formula Hint: B∝I Analyze why increasing current increases magnetic field strength in the electromagnet. Infer how current variation influences electromagnetic device performance.

*(3 Marks - [An/C, 2])*', '### Topic: Electromagnetism & Magnetic Fields
**Difficulty Level**: Easy (Conceptual)

#### 1. Magnetic Field vs. Current
The magnetic field ($B$) generated by a current-carrying coil is directly proportional to the current ($I$) flowing through it:
$$B \propto I$$
According to the Biot-Savart Law and Ampere''s Law, electric current represents moving charges, which are the source of magnetic fields. Increasing the current increases the rate of charge flow, strengthening the magnetic field lines.

#### 2. Analysis of the Scenario
When current increases from $2\text{ A}$ to $6\text{ A}$ (a $3\times$ increase):
* The magnetic field strength $B$ increases by $3$ times (since geometry is unchanged):
$$B_{\text{final}} = 3 \times B_{\text{initial}}$$

#### 3. Performance Inference
* **Lifting Capacity**: In devices like electromagnets, magnetic force is proportional to $B^2$, meaning higher current greatly boosts holding force.
* **Control**: Adjusting current allows precise control of the magnetic force, which is essential for relays, magnetic locks, and motors.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q33', 33),
  ('beee0000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000007', 'A designer working on electromagnetic lifting equipment studies the magnetic field produced by current-carrying coils. The designer notes that stronger magnetic fields improve lifting capacity and considers increasing the coil current in the electromagnet. Determine how current variation affects magnetic field generation around the coil. Infer how this principle supports the design of electromagnetic lifting systems.

*(2 Marks - [An/C, 2])*', '### Topic: Current and Magnetic Fields
**Difficulty Level**: Easy (Conceptual)

#### 1. Effect of Current Variation
* Raising the current ($I$) increases the magnetic field strength ($B$) linearly ($B \propto I$) because more moving charge carriers generate denser magnetic flux lines around the coil.

#### 2. Design Support for Lifting Systems
* **High Lifting Capacity**: High current allows the lifting magnet to generate the strong fields required to lift heavy ferrous metals.
* **Selectivity**: Turning the current ON or OFF allows the operator to pick up and release loads instantly, which is a key advantage over permanent magnets.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q34', 34),
  ('beee0000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000007', 'An atomic model shows an electron revolving in a circular orbit around the nucleus. The direction of the resulting magnetic dipole moment depends on the direction of the electron’s motion. Scientists use a rule similar to the right-hand rule to determine the direction of the magnetic dipole moment generated by the moving charge. Determine how the direction of the magnetic dipole moment is related to the electron’s orbital motion.

*(3 Marks - [An/C, 2])*', '### Topic: Orbital Magnetic Dipole Moment
**Difficulty Level**: Medium (Conceptual)

#### 1. Directional Relationship
The direction of the magnetic dipole moment ($\vec{\mu}$) of a revolving electron is **opposite** to the direction of its angular momentum ($\vec{L}$), which is defined by the right-hand rule for its physical motion.

#### 2. Detailed Rationale
1. **Conventional Current Direction**: Electric current direction is defined as the flow of positive charge. Since an electron is negatively charged, its orbital current ($I$) flows in the **opposite direction** to its physical velocity ($v$).
2. **Right-Hand Rule Application**:
   * Curl the fingers of your right hand in the direction of the **conventional current** (opposite to electron motion).
   * Your extended thumb points in the direction of the magnetic dipole moment ($\vec{\mu}$).
3. **Result**: The magnetic dipole moment points perpendicular to the orbit plane, pointing opposite to the vector representing the electron''s physical orbital rotation.

```
       Electron Motion (Counter-Clockwise)
              =======> 
            /          \
           |     (+)    |   ===> Magnetic Dipole Moment points DOWNWARDS
            \          /
              <=======
       Conventional Current (Clockwise)
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q35', 35),
  ('beee0000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000007', 'A circular electron orbit has radius 4 × 10⁻¹¹ m and carries an effective current of 2 × 10⁻³ A. Formula Hint: Magnetic Dipole Moment µ = I × A, Area A = πr² Determine the magnetic dipole moment of the orbiting electron.

*(2 Marks - [Ap/P, 2])*', '### Topic: Magnetic Moment Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Radius of orbit, $r = 4 \times 10^{-11}\text{ m}$
* Effective current, $I = 2 \times 10^{-3}\text{ A}$

#### 2. Formula
* Area of orbit, $A = \pi r^2$
* Magnetic Moment, $\mu = I \times A = I \times \pi r^2$

#### 3. Calculation
$$A = \pi \times (4 \times 10^{-11})^2 = 16\pi \times 10^{-22}\text{ m}^2$$
$$\mu = (2 \times 10^{-3}) \times (16\pi \times 10^{-22})$$
$$\mu = 32\pi \times 10^{-25}\text{ A}\cdot\text{m}^2$$
$$\mu \approx 32 \times 3.1416 \times 10^{-25} \approx 1.005 \times 10^{-23}\text{ A}\cdot\text{m}^2$$

#### 4. Conclusion
The orbital magnetic dipole moment of the electron is **$1.005 \times 10^{-23}\text{ A}\cdot\text{m}^2$** (or $\text{J/T}$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q36', 36),
  ('beee0000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000007', 'A student observes magnetic field lines around a bar magnet placed near iron filings on a laboratory table. The filings arrange themselves along curved patterns extending from the north pole to the south pole of the magnet. The student notes that these patterns visually represent the direction and strength of the magnetic field around the magnet. Determine how magnetic field lines represent the direction of magnetic forces around a magnet. Evaluate how the density of field lines indicates the strength of the magnetic field.

*(3 Marks - [An/C, 2])*', '### Topic: Magnetic Field Lines
**Difficulty Level**: Easy (Conceptual)

#### 1. Representation of Force Direction
* **Outside the magnet**: Magnetic field lines emerge from the **North Pole** and enter the **South Pole**, forming closed loops.
* The tangent to a magnetic field line at any point indicates the direction of the magnetic field vector ($\vec{B}$) and the force direction acting on a hypothetical isolated north pole placed there.

#### 2. Field Strength and Line Density
* The **density of field lines** (closeness of the lines) represents the field strength.
* **High Density**: Near the poles, the lines are tightly packed, indicating the magnetic field is strongest.
* **Low Density**: Further from the poles, the lines spread out, indicating a weaker magnetic field.

```mermaid
graph LR
    NP[North Pole: High density] -->|Lines spread out| Mid[Mid-section: Low density]
    Mid -->|Lines converge| SP[South Pole: High density]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q37', 37),
  ('beee0000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000007', 'A magnetic core inside a transformer experiences a magnetic flux of 0.02 Weber passing through a cross-sectional area of 0.01 m². Engineers need to determine the magnetic flux density inside the core to evaluate the performance of the transformer core material. Formula Hint: B=Φ/A Determine the magnetic flux density in the transformer core.

*(2 Marks - [Ap/C, 2])*', '### Topic: Magnetic Flux Density
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Magnetic Flux, $\Phi = 0.02\text{ Weber (Wb)}$
* Area, $A = 0.01\text{ m}^2$

#### 2. Formula
Magnetic flux density ($B$), which is flux per unit area, is given by:
$$B = \frac{\Phi}{A}$$

#### 3. Calculation
$$B = \frac{0.02\text{ Wb}}{0.01\text{ m}^2} = 2\text{ Wb/m}^2 = 2\text{ Tesla (T)}$$

#### 4. Conclusion
The magnetic flux density inside the transformer core is **$2\text{ Tesla}$** (or $2\text{ Wb/m}^2$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q38', 38),
  ('beee0000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000007', 'A student observes that atoms containing unpaired electrons often exhibit magnetic behavior, while atoms with paired electrons usually show weak or no magnetism. This observation relates to the way magnetic dipole moments of electrons combine within an atom. Determine why paired electrons cancel magnetic effects while unpaired electrons contribute to atomic magnetism.

*(3 Marks - [An/C, 2])*', '### Topic: Atomic Magnetism
**Difficulty Level**: Medium (Conceptual)

#### 1. Paired Electrons (Magnetic Cancellation)
* According to the Pauli Exclusion Principle, paired electrons in the same orbital must have **opposite spins** (one spin-up $\uparrow$, one spin-down $\downarrow$).
* The magnetic dipole moment generated by the spin of one electron is equal and opposite to the magnetic dipole moment of the other. Their vector sum is zero, cancelling out the net spin magnetic moment.

#### 2. Unpaired Electrons (Magnetic Contribution)
* Unpaired electrons do not have a partner to cancel their spin magnetic moment.
* The net spin moment of these unpaired electrons combines constructively, creating a net atomic magnetic dipole moment, which makes the atom exhibit magnetic properties (paramagnetic or ferromagnetic behavior).

```mermaid
graph TD
    subgraph Paired Electrons
    Up[Spin Up: +μ] + Down[Spin Down: -μ] --> Zero[Net Spin Moment = 0]
    end
    subgraph Unpaired Electron
    Un[Single Spin: +μ] --> Net[Net Spin Moment ≠ 0]
    end
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q39', 39),
  ('beee0000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000007', 'In atomic magnetism, the magnetic dipole moment is directly proportional to the current and the area of the orbit. Formula Hint: µ=I×A Determine how increasing the radius of the electron orbit affects the magnetic dipole moment.

*(2 Marks - [An/C, 2])*', '### Topic: Magnetic Dipole Moment dependence on Orbit Radius
**Difficulty Level**: Easy (Analytical)

#### 1. Analysis of Proportionality
* Magnetic dipole moment is given by:
$$\mu = I \times A$$
* The area of a circular orbit is:
$$A = \pi r^2$$
* Therefore, the moment is:
$$\mu = I \times \pi r^2$$

#### 2. Effect of Orbit Radius
For a constant orbital current ($I$), the magnetic dipole moment $\mu$ is directly proportional to the **square of the radius** ($r^2$):
$$\mu \propto r^2$$
Increasing the radius ($r$) increases the orbital area exponentially, resulting in a larger magnetic dipole moment.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q40', 40),
  ('beee0000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000007', 'A laboratory experiment measures the magnetic field produced around a long straight copper conductor carrying a steady current of 12 A. The measurement probe is placed at a distance of 0.03 m from the wire. Engineers want to determine the magnetic field intensity at this point using the theoretical formula derived from Ampere’s Circuital Law. Formula Hint: B = (µ0 × I) / (2 × π × r) µ0 = 4 × π × 10^-7 Determine the magnetic field intensity at the specified point and analyze how reducing the distance from the conductor would affect the magnetic field strength.

*(5 Marks - [Ap/P, 2])*', '### Topic: Ampere''s Circuital Law Calculation
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Current, $I = 12\text{ A}$
* Distance, $r = 0.03\text{ m}$
* Permeability of free space, $\mu_0 = 4\pi \times 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculation
Using the formula:
$$B = \frac{\mu_0 I}{2 \pi r}$$
Substitute the given values:
$$B = \frac{(4\pi \times 10^{-7}) \times 12}{2 \pi \times 0.03}$$
Divide $4\pi$ by $2\pi$ to simplify:
$$B = \frac{2 \times 10^{-7} \times 12}{0.03}$$
$$B = \frac{2.4 \times 10^{-6}}{0.03} = 8 \times 10^{-5}\text{ Tesla (T)}$$

#### 3. Distance Analysis
The magnetic field strength ($B$) is inversely proportional to the distance ($r$):
$$B \propto \frac{1}{r}$$
* **Effect of reducing distance**: If the distance is decreased, the magnetic field strength increases. For example, halving the distance ($r \rightarrow r/2$) doubles the magnetic field intensity ($B \rightarrow 2B$).

```mermaid
graph LR
    A[Reduce Distance r] --> B[Increase Magnetic Field B]
    C[Increase Current I] --> B
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q41', 41),
  ('beee0000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000007', 'A small bar magnet used in a laboratory experiment behaves like a magnetic dipole. The magnetic moment of the magnet is 0.5 A·m², and a measurement probe is placed 0.10 m away from the center of the magnet along its axial line. Engineers studying magnetic field distribution want to determine the magnetic field intensity at this point. Understanding the axial magnetic field helps in designing magnetic sensors and analyzing magnetic material behavior. Formula Hint: Magnetic field on axial line of dipole: B_axial = (µ0 / 4π) × (2M / r³) µ0 / 4π = 10^-7 Determine the magnetic field intensity along the axial line and analyze how increasing the distance affects the field strength.

*(5 Marks - [Ap/P, 2])*', '### Topic: Axial Field of a Magnetic Dipole
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Magnetic moment of dipole, $M = 0.5\text{ A}\cdot\text{m}^2$
* Distance from center, $r = 0.10\text{ m}$
* constant factor, $\frac{\mu_0}{4\pi} = 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculation
Using the axial line formula:
$$B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2M}{r^3}$$
Substitute the values:
$$B_{\text{axial}} = 10^{-7} \times \frac{2 \times 0.5}{(0.10)^3}$$
$$B_{\text{axial}} = 10^{-7} \times \frac{1.0}{10^{-3}}$$
$$B_{\text{axial}} = 10^{-7} \times 10^3 = 10^{-4}\text{ Tesla (T)}$$

#### 3. Distance Analysis
* The magnetic field along the axial line of a dipole is inversely proportional to the **cube of the distance**:
$$B_{\text{axial}} \propto \frac{1}{r^3}$$
* **Effect of increasing distance**: The field strength decays rapidly compared to a single magnetic pole ($1/r^2$). For example, doubling the distance ($r \rightarrow 2r$) decreases the field strength by a factor of 8 ($2^3 = 8$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q42', 42),
  ('beee0000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000007', 'An engineering student writes a program to calculate the magnetic field around a currentcarrying wire but forgets to complete some statements. The program should calculate the magnetic field intensity at a point located a certain distance from the wire using Ampere’s law. The program structure is partially written as shown below. Program Snippet: Input: Current I, Distance r Constant µ0 = 4 × π × 10^-7 Step1: ________ Step2: B = (µ0 × I) / (2 × π × r) Step3: ________ Formula Hint: B = (µ0 × I) / (2 × π × r) Determine the missing steps in the program so that the system correctly calculates and displays the magnetic field.

*(5 Marks - [Ap/P, 2])*', '### Topic: Algorithm Design for Magnetic Field Calculation
**Difficulty Level**: Easy (Conceptual)

#### 1. Program Logic Analysis
To write a complete functional program, we must follow a logical sequence:
1. **Input Validation**: Check that inputs like distance $r$ are positive and non-zero to avoid division-by-zero errors.
2. **Calculation**: Apply the physics formula (Step 2).
3. **Output/Display**: Output the calculated result with appropriate physical units (Tesla).

#### 2. Missing Steps Formulation
* **Step 1 (Pre-computation / Validation Check)**: 
  * *Purpose*: Read inputs and ensure distance $r$ is greater than zero.
  * *Code/Statement*: `Verify that r > 0. If not, output error "Distance must be positive."`
* **Step 3 (Output Display)**:
  * *Purpose*: Display the calculated magnetic field $B$ to the user.
  * *Code/Statement*: `Print/Display calculated Magnetic Field intensity B in Tesla.`

```mermaid
graph TD
    In[Input: I, r] --> Step1["Step 1: Check if r > 0"]
    Step1 --> Step2["Step 2: Calculate B = (μ0 * I) / (2 * π * r)"]
    Step2 --> Step3["Step 3: Output B in Tesla"]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q43', 43),
  ('beee0000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000007', 'A magnetic dipole with magnetic moment 0.4 A·m² is placed in a laboratory setup for studying magnetic field distribution. A magnetic field sensor is placed at a point 0.08 m from the center of the magnet along the equatorial line, which is perpendicular to the magnet’s axis. Engineers need to determine the magnetic field intensity at this location to compare axial and equatorial magnetic field strengths. Formula Hint: Magnetic field on equatorial line: B_equatorial = (µ0 / 4π) × (M / r³) µ0 / 4π = 10^-7 Determine the magnetic field intensity along the equatorial line and interpret how it compares with the axial field.

*(5 Marks - [Ap/P, 2])*', '### Topic: Equatorial Field of a Magnetic Dipole
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Magnetic moment, $M = 0.4\text{ A}\cdot\text{m}^2$
* Distance, $r = 0.08\text{ m} = 8 \times 10^{-2}\text{ m}$
* constant factor, $\frac{\mu_0}{4\pi} = 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculation
Using the equatorial line formula:
$$B_{\text{equatorial}} = \frac{\mu_0}{4\pi} \frac{M}{r^3}$$
Substitute the values:
$$B_{\text{equatorial}} = 10^{-7} \times \frac{0.4}{(8 \times 10^{-2})^3}$$
$$B_{\text{equatorial}} = 10^{-7} \times \frac{0.4}{512 \times 10^{-6}}$$
$$B_{\text{equatorial}} = 10^{-7} \times 781.25 \approx 7.81 \times 10^{-5}\text{ Tesla (T)}$$

#### 3. Comparison with Axial Field
For a given distance $r$ from the center of a short dipole:
* Axial field: $B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2M}{r^3}$
* Equatorial field: $B_{\text{equatorial}} = \frac{\mu_0}{4\pi} \frac{M}{r^3}$

$$\text{Relation: } B_{\text{axial}} = 2 \times B_{\text{equatorial}}$$
* **Interpretation**: The magnetic field strength at any point on the axial line is twice the field strength at a point on the equatorial line at the same distance.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q44', 44),
  ('beee0000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000007', 'Two solenoids operate with the same current 2 A. Solenoid X has 1500 turns/m, while Solenoid Y has 2500 turns/m. Formula Hint: B = µ0 × n × I Determine the magnetic fields of both solenoids and identify which produces the stronger magnetic field.

*(5 Marks - [Ap/P, 2])*', '### Topic: Solenoids & Magnetic Fields
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Current, $I = 2\text{ A}$
* Solenoid X: $n_X = 1500\text{ turns/m}$
* Solenoid Y: $n_Y = 2500\text{ turns/m}$
* $\mu_0 = 4\pi \times 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculations
Using the formula for the magnetic field inside a solenoid:
$$B = \mu_0 n I$$

##### Solenoid X
$$B_X = (4\pi \times 10^{-7}) \times 1500 \times 2$$
$$B_X = 12\pi \times 10^{-4} \approx 3.77 \times 10^{-3}\text{ Tesla (T)}$$

##### Solenoid Y
$$B_Y = (4\pi \times 10^{-7}) \times 2500 \times 2$$
$$B_Y = 20\pi \times 10^{-4} \approx 6.28 \times 10^{-3}\text{ Tesla (T)}$$

#### 3. Comparison and Conclusion
* Since $B_Y > B_X$, **Solenoid Y produces the stronger magnetic field**.
* **Reasoning**: The magnetic field is directly proportional to turn density ($B \propto n$). Since Solenoid Y has a higher turn density, it generates a stronger magnetic field for the same current.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q45', 45),
  ('beee0000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000007', 'A coil with 120 turns experiences a decrease in magnetic flux from 0.03 Weber to 0.01 Weber in 0.02 seconds due to movement of a magnet away from the coil. Formula Hint: E = - N × (ΔΦ / Δt) Determine the induced EMF in the coil.

*(5 Marks - [Ap/P, 2])*', '### Topic: Faraday''s Law of Electromagnetic Induction
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Number of turns, $N = 120$
* Initial flux, $\Phi_{\text{initial}} = 0.03\text{ Wb}$
* Final flux, $\Phi_{\text{final}} = 0.01\text{ Wb}$
* Time interval, $\Delta t = 0.02\text{ seconds}$

#### 2. Formula
According to Faraday''s Law:
$$E = -N \frac{\Delta\Phi}{\Delta t}$$
Where $\Delta\Phi = \Phi_{\text{final}} - \Phi_{\text{initial}}$.

#### 3. Calculation
$$\Delta\Phi = 0.01 - 0.03 = -0.02\text{ Wb}$$
$$E = -120 \times \left(\frac{-0.02\text{ Wb}}{0.02\text{ s}}\right)$$
$$E = -120 \times (-1) = 120\text{ Volts (V)}$$

#### 4. Conclusion
The magnitude of the induced electromotive force (EMF) in the coil is **$120\text{ Volts}$** (the negative sign in Lenz''s law indicates the direction opposes the flux change).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q46', 46),
  ('beee0000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000007', 'A solenoid with 1000 turns is wound uniformly over a length of 0.50 m. The coil carries 1.8 A current. Engineers need to calculate the magnetic field generated inside the solenoid. Formula Hint: B = µ0 × n × I, n=N/L, µ0 = 4π × 10^-7 Determine the magnetic field strength inside the solenoid.

*(5 Marks - [Ap/P, 2])*', '### Topic: Magnetic Field of a Solenoid
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Number of turns, $N = 1000$
* Length of solenoid, $L = 0.50\text{ m}$
* Current, $I = 1.8\text{ A}$
* $\mu_0 = 4\pi \times 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculations
First, calculate the turn density ($n$):
$$n = \frac{N}{L} = \frac{1000}{0.50} = 2000\text{ turns/meter}$$

Now, calculate the magnetic field ($B$):
$$B = \mu_0 n I$$
$$B = (4\pi \times 10^{-7}) \times 2000 \times 1.8$$
$$B = (4\pi \times 10^{-7}) \times 3600$$
$$B = 1.44\pi \times 10^{-3}\text{ T}$$
$$B \approx 1.44 \times 3.1416 \times 10^{-3} \approx 4.52 \times 10^{-3}\text{ Tesla (T)}$$

#### 3. Conclusion
The magnetic field strength inside the solenoid is **$4.52 \times 10^{-3}\text{ Tesla}$** (or $4.52\text{ mT}$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q47', 47),
  ('beee0000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000007', 'Two coils experience identical magnetic flux change rate of 0.02 Wb/s. Coil X has 150 turns, while Coil Y has 300 turns. Formula Hint: E = - N × (dΦ / dt) Determine the induced EMF in both coils.

*(5 Marks - [Ap/P, 2])*', '### Topic: Induced EMF Dependency on Turns
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Rate of change of flux, $\frac{d\Phi}{dt} = 0.02\text{ Wb/s}$ (identical for both)
* Turns in Coil X: $N_X = 150$
* Turns in Coil Y: $N_Y = 300$

#### 2. Calculations
Using Faraday''s Law:
$$E = -N \frac{d\Phi}{dt}$$

##### Coil X
$$E_X = -150 \times 0.02 = -3\text{ Volts (V)}$$

##### Coil Y
$$E_Y = -300 \times 0.02 = -6\text{ Volts (V)}$$

#### 3. Conclusion
* The magnitude of induced EMF in Coil X is **$3\text{ V}$**.
* The magnitude of induced EMF in Coil Y is **$6\text{ V}$**.
* **Reasoning**: Induced EMF is directly proportional to the number of turns ($E \propto N$) for a given rate of flux change. Thus, Coil Y has twice the turns and twice the induced EMF of Coil X.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-I Q48', 48),
  ('beee0000-0000-0000-0000-000000000049', 'a1000000-0000-0000-0000-000000000007', '(i) A proton moves in a region where both electric and magnetic fields are present. Engineers analyze how each field affects the motion of the particle. Determine why electric fields can change the speed of a charged particle while magnetic fields mainly change the direction of motion.

*(3 Marks - [U/P, 1])*', '### Topic: Charged Particle Motion in Electric and Magnetic Fields
**Difficulty Level**: Medium (Conceptual)

#### 1. Electric Field Action (Changing Speed)
The force exerted by an electric field ($\vec{E}$) on a charge ($q$) is:
$$\vec{F}_E = q\vec{E}$$
* This force is always **parallel** (or anti-parallel) to the electric field lines, regardless of the particle''s velocity.
* Since the force is parallel to the direction of motion (or has a component along it), the work done ($W$) is non-zero:
$$W = \int \vec{F}_E \cdot d\vec{r} \neq 0$$
By the Work-Energy Theorem, this work changes the kinetic energy and hence the **speed** of the particle.

#### 2. Magnetic Field Action (Changing Direction)
The force exerted by a magnetic field ($\vec{B}$) on a moving charge ($q$) with velocity ($\vec{v}$) is given by the Lorentz force:
$$\vec{F}_B = q(\vec{v} \times \vec{B})$$
* By definition of the cross product, the magnetic force $\vec{F}_B$ is always **perpendicular** to the velocity vector $\vec{v}$ ($\vec{F}_B \perp \vec{v}$).
* Since the force is perpendicular to displacement, the power ($P$) and work done ($W$) by the magnetic field are always zero:
$$P = \vec{F}_B \cdot \vec{v} = 0 \implies W = \int P\, dt = 0$$
* Since no work is done, the kinetic energy remains constant, meaning the **speed** is unchanged. The force acts strictly as a centripetal force, altering only the **direction** of motion.

```mermaid
graph LR
    EField[Electric Field E] -->|Force parallel to path| WorkE[Work Done != 0] -->|Changes| Speed[Speed & KE]
    MField[Magnetic Field B] -->|Force perpendicular to path| WorkM[Work Done = 0] -->|Changes| Dir[Only Direction]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q1', 49),
  ('beee0000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000007', '(ii) A charged particle moves perpendicular to a magnetic field. Formula Hint F = q x v x B. Determine how doubling the magnetic field affects the magnetic force.

*(2 Marks - [U/C, 1])*', '### Topic: Magnetic Force Dependency
**Difficulty Level**: Easy (Conceptual / Mathematical)

#### 1. Mathematical Relationship
The magnitude of the magnetic force ($F$) on a charged particle moving perpendicular ($\theta = 90^\circ$) to a magnetic field is given by:
$$F = q v B \sin(90^\circ) = q v B$$
Where:
* $q$ = Charge of the particle
* $v$ = Velocity of the particle
* $B$ = Magnetic field strength

#### 2. Effect of Doubling B
If the magnetic field strength is doubled ($B'' = 2B$):
$$F'' = q v B'' = q v (2B) = 2(q v B) = 2F$$
* **Conclusion**: Doubling the magnetic field strength **doubles** the magnetic force acting on the particle, due to the direct linear relationship between $F$ and $B$.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q2', 50),
  ('beee0000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000007', '(i) Scientists use crossed electric and magnetic fields in instruments such as mass spectrometers to control particle motion. Determine why velocity selectors are important in such instruments.

*(3 Marks - [U/P, 1])*', '### Topic: Role of Velocity Selectors in Mass Spectrometry
**Difficulty Level**: Medium (Conceptual)

#### 1. What is a Velocity Selector?
A **velocity selector** consists of crossed electric ($\vec{E}$) and magnetic ($\vec{B}$) fields. It filters a beam of charged particles so that only those with a specific velocity ($v = E/B$) pass straight through undeflected.

```mermaid
graph LR
    Source[Ion Source: Varied Velocities] --> Sel[Velocity Selector v = E/B]
    Sel --> Filtered[Mono-energetic Beam: Single Velocity]
    Filtered --> Spec[Mass Analyzer: Separates by m/z]
```

#### 2. Rationale for Importance in Mass Spectrometers
1. **Eliminating Velocity Dispersion**: Ion sources emit particles with a wide range of velocities due to thermal energy. In the mass analyzer, deflection depends on both mass-to-charge ratio ($m/z$) and velocity ($v$). If velocities vary, ions of the same mass would hit different spots, blurring the output.
2. **Ensuring Precise Mass Separation**: By ensuring all entering ions have the exact same velocity, the subsequent magnetic deflection becomes purely a function of mass-to-charge ratio ($r = mv/qB$). This enables high-resolution mass identification.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q3', 51),
  ('beee0000-0000-0000-0000-000000000052', 'a1000000-0000-0000-0000-000000000007', '(ii) A velocity selector has electric field 2000 N/C and magnetic field 0.02 Tesla. Formula Hint v = E / B. Determine the velocity of particles that pass through undeflected.

*(2 Marks - [U/C, 1])*', '### Topic: Velocity Selector Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Electric Field, $E = 2000\text{ N/C}$
* Magnetic Field, $B = 0.02\text{ T}$

#### 2. Formula
For a particle to pass through crossed fields undeflected, the electric force ($F_E = qE$) must balance the magnetic force ($F_B = qvB$), which gives:
$$v = \frac{E}{B}$$

#### 3. Step-by-Step Calculation
$$v = \frac{2000}{0.02} = \frac{2000}{2 \times 10^{-2}} = 1000 \times 10^2 = 1 \times 10^5\text{ m/s}$$

#### 4. Conclusion
* The velocity of the particles that pass through undeflected is **$10^5\text{ m/s}$** (or $100\text{ km/s}$$$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q4', 52),
  ('beee0000-0000-0000-0000-000000000053', 'a1000000-0000-0000-0000-000000000007', '(i) A charged particle enters a magnetic field with its velocity parallel to the direction of the magnetic field. Engineers studying electromagnetic forces analyze the resulting magnetic force acting on the particle. Formula Hint F = q x v x B x sinθ. Determine the magnetic force acting on the particle and explain the result.

*(3 Marks - [U/P, 1])*', '### Topic: Parallel Motion in a Magnetic Field
**Difficulty Level**: Easy (Conceptual)

#### 1. Mathematical Calculation
The force ($F$) on a charged particle in a magnetic field is given by:
$$F = q v B \sin(\theta)$$
Where $\theta$ is the angle between the velocity vector ($\vec{v}$) and the magnetic field vector ($\vec{B}$).
* Since the velocity is parallel to the magnetic field, the angle $\theta = 0^\circ$.
* Substituting this into the equation:
$$F = q v B \sin(0^\circ) = q v B \times 0 = 0\text{ N}$$

#### 2. Physical Explanation
* A magnetic field only exerts force on charge components moving **perpendicular** to the field lines.
* When moving parallel, the particle does not cut across any magnetic flux lines. Consequently, no Lorentz force is generated, and the particle continues its motion in a straight line at constant velocity, unaffected by the field.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q5', 53),
  ('beee0000-0000-0000-0000-000000000054', 'a1000000-0000-0000-0000-000000000007', '(ii) A charge 4 × 10⁻⁶ C is placed in an electric field of 2500 N/C. Formula Hint F = q x E. Determine the electric force acting on the charge.

*(2 Marks - [U/C, 1])*', '### Topic: Electric Force Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Charge, $q = 4 \times 10^{-6}\text{ C}$
* Electric Field, $E = 2500\text{ N/C}$

#### 2. Formula
The magnitude of the force ($F$) exerted on a charge in an electric field is:
$$F = q \cdot E$$

#### 3. Step-by-Step Calculation
$$F = (4 \times 10^{-6}\text{ C}) \times (2500\text{ N/C})$$
$$F = 4 \times 2500 \times 10^{-6} = 10000 \times 10^{-6}\text{ N} = 0.01\text{ N}$$

#### 4. Conclusion
* The electric force acting on the charge is **$0.01\text{ N}$** (or $10\text{ mN}$).', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q6', 54),
  ('beee0000-0000-0000-0000-000000000055', 'a1000000-0000-0000-0000-000000000007', '(i) In a velocity selector experiment, charged particles enter a region where electric and magnetic fields are perpendicular to each other. Some particles pass straight through the device without deflection while others deviate from the path. Determine why only particles with a specific velocity pass through the selector without deflection.

*(3 Marks - [U/P, 1])*', '### Topic: Balance of Forces in Velocity Selector
**Difficulty Level**: Medium (Conceptual)

#### 1. Forces Acting on the Particle
When a charged particle of charge $q$ and velocity $v$ enters the crossed fields:
1. **Electric Force ($F_E$)**: $F_E = qE$ (independent of velocity).
2. **Magnetic Force ($F_B$)**: $F_B = qvB$ (directly proportional to velocity).

These fields are arranged so that $F_E$ and $F_B$ act in **opposite directions**.

```
             F_E = qE (Upward)
                 ^
                 |
     O ---------> [q] (Velocity v)
                 |
                 v
             F_B = qvB (Downward)
```

#### 2. Condition for Zero Deflection
For a particle to travel in a straight line without deflecting, the net force must be zero ($F_{\text{net}} = 0$):
$$F_E = F_B \implies qE = qvB \implies v = \frac{E}{B}$$
* **If $v > E/B$**: The magnetic force dominates ($F_B > F_E$), deflecting the particle downward.
* **If $v < E/B$**: The electric force dominates ($F_E > F_B$), deflecting the particle upward.
* **If $v = E/B$**: The forces balance out exactly, allowing the particle to pass undeflected. Thus, the selector acts as a velocity filter.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q7', 55),
  ('beee0000-0000-0000-0000-000000000056', 'a1000000-0000-0000-0000-000000000007', '(ii) A velocity selector uses crossed electric and magnetic fields. Formula Hint v ∝ E, v ∝ 1/B. Determine how doubling the magnetic field affects the selected velocity.

*(2 Marks - [U/C, 1])*', '### Topic: Parameter Tuning in Velocity Selector
**Difficulty Level**: Easy (Conceptual)

#### 1. Formula Relationship
The selected velocity ($v$) is inversely proportional to the magnetic field ($B$):
$$v = \frac{E}{B}$$

#### 2. Effect of Doubling B
If the magnetic field is doubled ($B'' = 2B$) while keeping the electric field ($E$) constant:
$$v'' = \frac{E}{B''} = \frac{E}{2B} = \frac{1}{2} v$$
* **Conclusion**: Doubling the magnetic field **halves** the selected velocity ($v$). Only particles with half the original speed will now pass through undeflected.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q8', 56),
  ('beee0000-0000-0000-0000-000000000057', 'a1000000-0000-0000-0000-000000000007', '(i) A particle with charge 4 × 10⁻⁶ C is placed in a uniform electric field of 5 × 10³ N/C between two conducting plates. Engineers analyzing electrostatic forces must determine the magnitude of the force acting on the particle and understand how the electric field controls particle motion. Formula Hint F = q x E. Determine the electric force acting on the charge and analyze how increasing the charge would affect the force.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electrostatic Force Analysis
**Difficulty Level**: Medium (Numerical / Analytical)

#### 1. Given Data
* Charge, $q = 4 \times 10^{-6}\text{ C}$
* Electric Field, $E = 5 \times 10^3\text{ N/C}$

#### 2. Calculation of Electric Force ($F$)
Using the relation:
$$F = q \cdot E$$
$$F = (4 \times 10^{-6}\text{ C}) \times (5 \times 10^3\text{ N/C})$$
$$F = 20 \times 10^{-3}\text{ N} = 0.02\text{ N}$$

#### 3. Influence of Increasing Charge on the Force
* **Linear Dependency**: The electric force $F$ is directly proportional to the magnitude of the charge $q$ ($F \propto q$) for a constant electric field.
* **Proportional Scaling**: If the charge is doubled, the force doubles. 
* **Directional Control**: If the sign of the charge changes (e.g. from positive to negative), the magnitude remains the same but the direction of the force reverses, enabling precise control of particle trajectories in CRT displays or ink-jet printers.

```mermaid
graph LR
    Charge[Increase Charge q] -->|Linear Proportionality| Force[Increase Force F]
    Sign[Change Charge Sign] -->|Vector Property| Dir[Reverse Direction of Force]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q9', 57),
  ('beee0000-0000-0000-0000-000000000058', 'a1000000-0000-0000-0000-000000000007', '(i) A conductor of length 0.30 m carrying a current of 5 A is placed in a uniform magnetic field of 0.40 Tesla. The conductor is positioned perpendicular to the magnetic field. Engineers studying electromagnetic devices must determine the force on the conductor and understand how magnetic fields produce mechanical motion in electric motors. Formula Hint F = B x I x L. Determine the force acting on the conductor and analyze how increasing the magnetic field strength affects the force.

*(5 Marks - [Ap/P, 2])*', '### Topic: Magnetic Force on a Current-Carrying Conductor
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Length of conductor, $L = 0.30\text{ m}$
* Current, $I = 5\text{ A}$
* Magnetic Field, $B = 0.40\text{ T}$
* Angle, $\theta = 90^\circ$ (Perpendicular)

#### 2. Calculation of Force ($F$)
The formula for magnetic force on a conductor is:
$$F = B I L \sin(\theta)$$
Since the conductor is perpendicular:
$$F = B I L \sin(90^\circ) = B I L$$
$$F = 0.40\text{ T} \times 5\text{ A} \times 0.30\text{ m}$$
$$F = 2.0 \times 0.30 = 0.60\text{ N}$$

#### 3. Influence of Increasing Magnetic Field ($B$)
* **Linear Proportionality**: The magnetic force is directly proportional to the magnetic field strength ($F \propto B$).
* **Mechanism in Motors**: In an electric motor, increasing the magnetic field (e.g., using stronger permanent magnets or electromagnets) increases the force on the rotor windings, thereby increasing torque output.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q10', 58),
  ('beee0000-0000-0000-0000-000000000059', 'a1000000-0000-0000-0000-000000000007', '(i) An electron moves inside a region where a uniform electric field of 3 × 10⁴ N/C exists between two plates. Engineers analyzing particle accelerators must determine the electric force acting on the electron. Charge of electron = 1.6 × 10⁻¹⁹ C. Formula Hint F = q x E. Determine the magnitude of the electric force acting on the electron.

*(5 Marks - [Ap/P, 2])*', '### Topic: Electric Force on Subatomic Particles
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Electric Field, $E = 3 \times 10^4\text{ N/C}$
* Charge of an electron, $q = e = 1.6 \times 10^{-19}\text{ C}$

#### 2. Calculation of Magnitude of Force ($F$)
Using the relation:
$$F = q \cdot E$$
$$F = (1.6 \times 10^{-19}\text{ C}) \times (3 \times 10^4\text{ N/C})$$
$$F = 4.8 \times 10^{-15}\text{ N}$$

#### 3. Physical Significance in Accelerators
* This force, though small in absolute magnitude, acts on a very tiny electron mass ($m_e \approx 9.11 \times 10^{-31}\text{ kg}$), producing an enormous acceleration:
$$a = \frac{F}{m} = \frac{4.8 \times 10^{-15}}{9.11 \times 10^{-31}} \approx 5.27 \times 10^{15}\text{ m/s}^2$$
This principle is fundamental to accelerating electrons in cathode ray tubes (CRTs), X-ray machines, and synchrotron light sources.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q11', 59),
  ('beee0000-0000-0000-0000-000000000060', 'a1000000-0000-0000-0000-000000000007', '(i) A straight conductor carrying current is placed in a magnetic field and experiences a force due to the interaction between moving charges and the magnetic field. This phenomenon is widely used in electric motors where electrical energy is converted into mechanical motion. Formula Hint F = B x I x L. Explain how the interaction between current and magnetic field produces a force on the conductor and how this principle enables the operation of electric motors.

*(5 Marks - [Ap/C, 2])*', '### Topic: Force on a Conductor & Motor Principle
**Difficulty Level**: Hard (Conceptual)

#### 1. Physical Mechanism: Microscopic to Macroscopic
An electric current in a conductor is a drift of free electrons.
1. **Microscopic Lorentz Force**: When the conductor is placed in a magnetic field ($B$), each moving electron experiences a microscopic magnetic force:
$$\vec{f} = q(\vec{v}_d \times \vec{B})$$
2. **Macroscopic Force**: These forces are transmitted to the lattice of the conductor through collisions, resulting in a net macroscopic force on the entire wire:
$$\vec{F} = I(\vec{L} \times \vec{B})$$

#### 2. Application in Electric Motors

```mermaid
graph LR
    Current[Electric Current I] -->|Flows through| Rotor[Rotor Coil in Magnetic Field B]
    Rotor -->|Creates opposite forces on sides| Torque[Lorentz Torque F = BIL]
    Torque -->|Rotates| Shaft[Mechanical Rotation]
```

* In a simple DC motor, a rectangular coil is placed in a magnetic field.
* Current flows in opposite directions along the two sides of the coil perpendicular to the magnetic field.
* Consequently, the magnetic forces ($F = B I L$) acting on the two sides are equal and opposite, creating a **torque** ($T = F \cdot w$, where $w$ is coil width) that rotates the shaft, converting electrical energy to mechanical work.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q12', 60),
  ('beee0000-0000-0000-0000-000000000061', 'a1000000-0000-0000-0000-000000000007', '(i) A proton with charge 1.6 × 10⁻¹⁹ C enters a uniform magnetic field of 0.03 Tesla with velocity 3 × 10⁶ m/s perpendicular to the field direction. The magnetic field exerts a force that causes the proton to move in a circular path. Engineers studying cyclotron devices must determine the magnetic force acting on the proton. Formula Hint Magnetic Force F = q x v x B. Determine the magnetic force acting on the proton and interpret how increasing the magnetic field strength affects the force.

*(5 Marks - [Ap/P, 2])*', '### Topic: Lorentz Force in a Cyclotron
**Difficulty Level**: Medium (Numerical / Analytical)

#### 1. Given Data
* Charge of proton, $q = 1.6 \times 10^{-19}\text{ C}$
* Magnetic Field, $B = 0.03\text{ T}$
* Velocity, $v = 3 \times 10^6\text{ m/s}$

#### 2. Calculation of Magnetic Force ($F$)
Since velocity is perpendicular to the field ($\theta = 90^\circ$):
$$F = q v B$$
$$F = (1.6 \times 10^{-19}\text{ C}) \times (3 \times 10^6\text{ m/s}) \times 0.03\text{ T}$$
$$F = 4.8 \times 10^{-13} \times 0.03 = 1.44 \times 10^{-14}\text{ N}$$

#### 3. Interpretation of Increasing B
* **Force Scaling**: $F \propto B$. Stronger fields produce greater centripetal forces.
* **Path Curvature**: The radius of the circular path is given by $r = mv / qB$. Increasing $B$ reduces the radius $r$, constraining the path. In cyclotrons, this allows for more compact accelerator designs and higher frequency acceleration cycles.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q13', 61),
  ('beee0000-0000-0000-0000-000000000062', 'a1000000-0000-0000-0000-000000000007', '(i) Two long parallel conductors are placed 0.05 m apart in a laboratory setup used to study electromagnetic interaction between current carrying wires. The first conductor carries a current of 8 A, while the second conductor carries 6 A. A segment of length 0.50 m of the conductors is considered for analysis. Engineers analyzing electrostatic forces must determine the magnitude of the force between the conductors in order to understand the magnetic interaction between current carrying wires used in power transmission systems. Formula Hint Force between parallel conductors F = (μ0 × I1 × I2 × L) / (2π × d), μ0 = 4π × 10^-7. Determine the force between the conductors and interpret whether the conductors attract or repel if both currents flow in the same direction.

*(5 Marks - [Ap/P, 2])*', '### Topic: Force Between Parallel Currents
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Distance, $d = 0.05\text{ m}$
* Current 1, $I_1 = 8\text{ A}$
* Current 2, $I_2 = 6\text{ A}$
* Length, $L = 0.50\text{ m}$
* Permeability of free space, $\mu_0 = 4\pi \times 10^{-7}\text{ T}\cdot\text{m/A}$

#### 2. Calculation of Force ($F$)
Using the formula:
$$F = \frac{\mu_0 I_1 I_2 L}{2\pi d}$$
$$F = \frac{(4\pi \times 10^{-7}) \times 8 \times 6 \times 0.50}{2\pi \times 0.05}$$
Simplify the factor $\frac{4\pi}{2\pi} = 2$:
$$F = \frac{2 \times 10^{-7} \times 48 \times 0.50}{0.05}$$
$$F = \frac{48 \times 10^{-7}}{0.05} = 960 \times 10^{-7}\text{ N} = 9.6 \times 10^{-5}\text{ N}$$

#### 3. Interpretation of Force Direction
* **Parallel Currents (Same direction)**: The magnetic fields between the wires oppose each other, while the fields outside reinforce, resulting in a net **attractive force**.
* **Antiparallel Currents (Opposite directions)**: Result in a **repulsive force**.

```
    Currents in Same Direction:           Currents in Opposite Directions:
       I1 (Up)       I2 (Up)                 I1 (Up)       I2 (Down)
         |             |                       |             |
         |  -->   <--  |  (Attract)            |  <--     -->|  (Repel)
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q14', 62),
  ('beee0000-0000-0000-0000-000000000063', 'a1000000-0000-0000-0000-000000000007', '(i) A charged particle enters a magnetic field at an angle to the field direction. Because the velocity has components both perpendicular and parallel to the magnetic field, the particle follows a helical trajectory in the magnetic field. Engineers analyzing magnetic confinement systems must understand the relationship between particle motion and magnetic force. Formula Hint F = q x v x B x sinθ. Explain how the magnetic force influences the motion of the particle and why the particle follows a helical path.

*(5 Marks - [Ap/C, 2])*', '### Topic: Helical Motion in Magnetic Fields
**Difficulty Level**: Hard (Analytical)

#### 1. Resolution of Velocity Components
When a particle enters a magnetic field at an angle $\theta$ (where $0 < \theta < 90^\circ$), its velocity $\vec{v}$ can be resolved into two orthogonal components:
1. **Parallel Component ($v_{\parallel} = v \cos\theta$)**: Parallel to the magnetic field.
2. **Perpendicular Component ($v_{\perp} = v \sin\theta$)**: Perpendicular to the magnetic field.

```
                  ^ Magnetic Field B
                  |     / v (velocity)
                  |    / 
                  |  θ/ 
                  |  /___ v_perp = v sinθ
                  | /
                  |/______ v_para = v cosθ
```

#### 2. Individual Motion Dynamics
* **Parallel Motion**: The magnetic force due to $v_{\parallel}$ is zero ($F_{\parallel} = q v_{\parallel} B \sin 0^\circ = 0$). Thus, the particle continues at a constant speed along the field lines.
* **Perpendicular Motion**: The perpendicular component experiences a constant magnetic force ($F_{\perp} = q v_{\perp} B$) acting perpendicular to both velocity and field. This acts as a centripetal force, causing uniform circular motion in the plane perpendicular to the field.

#### 3. Superposition: The Helical Path
The combination of continuous linear translation along the field lines and circular motion in the perpendicular plane forms a **helical trajectory** (corkscrew path). This principle is utilized in magnetic confinement fusion devices (tokamaks) and explains the trapping of solar wind in Earth''s Van Allen radiation belts.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q15', 63),
  ('beee0000-0000-0000-0000-000000000064', 'a1000000-0000-0000-0000-000000000007', '(i) In an experiment involving two long parallel conductors carrying electric currents, each conductor produces a magnetic field around it. This magnetic field interacts with the current in the other conductor and produces a force between them. Engineers must analyze the physical mechanism responsible for this interaction. Formula Hint Magnetic interaction principle F ∝ I1 x I2, F ∝ 1/d. Explain how the magnetic field produced by one conductor exerts a force on the other conductor and why the direction of current determines whether the wires attract or repel.

*(5 Marks - [Ap/C, 2])*', '### Topic: Mechanism of Magnetic Interaction Between Wires
**Difficulty Level**: Hard (Analytical)

#### 1. Step-by-Step Interaction Mechanism
The force between two parallel current-carrying conductors arises via a two-step magnetic field coupling:

```mermaid
graph TD
    I1[Current I1 in Wire 1] -->|Generates| B1[Magnetic Field B1 = μ0 I1 / 2πd]
    B1 -->|Interacts with| I2[Current I2 in Wire 2]
    I2 -->|Experiences Force| F2[Force F2 = B1 I2 L]
```

1. **Field Generation**: Wire 1 carrying current $I_1$ produces a circular magnetic field ($B_1$) around itself. According to Ampere''s Law, the field strength at distance $d$ is:
$$B_1 = \frac{\mu_0 I_1}{2\pi d}$$
2. **Lorentz Force**: Wire 2 carrying current $I_2$ lies inside this magnetic field $B_1$. The moving charges in Wire 2 experience a Lorentz force:
$$F = B_1 I_2 L = \left(\frac{\mu_0 I_1}{2\pi d}\right) I_2 L = \frac{\mu_0 I_1 I_2 L}{2\pi d}$$

#### 2. Determining Attraction vs. Repulsion (Right-Hand Rules)
* **Same Direction**: Using the Right-Hand Grip Rule, the magnetic field $B_1$ of Wire 1 at Wire 2 points into/out of the page. Applying Fleming''s Left-Hand Rule, the force on Wire 2 points toward Wire 1. By symmetry, the force on Wire 1 points toward Wire 2, causing **attraction**.
* **Opposite Directions**: Reversing one current direction reverses the direction of the cross-product ($I \vec{L} \times \vec{B}$), resulting in a force pointing away from the other wire, causing **repulsion**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q16', 64),
  ('beee0000-0000-0000-0000-000000000065', 'a1000000-0000-0000-0000-000000000007', '(i) In a laboratory demonstration, a transmitter produces electromagnetic waves that propagate through space and reach a detector placed at some distance. The detector records the arrival of energy even though there is no direct electrical connection between the transmitter and the detector. Establish how energy is transferred between the transmitter and detector.

*(3 Marks - [U/P, 2])*', '### Topic: Electromagnetic Wave Propagation & Energy Transfer
**Difficulty Level**: Medium (Conceptual)

#### 1. Mechanism of Energy Transfer
1. **Source Generation**: An alternating current in the transmitter antenna accelerates electric charges, creating a time-varying electric field ($\vec{E}$).
2. **Mutual Induction**: According to Maxwell''s equations, a changing electric field induces a changing magnetic field ($\vec{B}$), which in turn induces another changing electric field. This self-sustaining disturbance propagates through space as an **electromagnetic (EM) wave**.
3. **Propagation and Detection**: The EM wave carries energy, quantified by the **Poynting Vector** ($\vec{S} = \frac{1}{\mu_0} \vec{E} \times \vec{B}$). When the wave reaches the detector antenna, its oscillating electric field exerts forces on the free electrons in the detector wire, generating an AC voltage that is registered as received signal/energy.

```mermaid
graph LR
    Transmitter[AC Current in Antenna] -->|Generates| EField[Oscillating E Field]
    EField -->|Induces| BField[Oscillating B Field]
    BField -->|Propagates through space| EM[EM Wave]
    EM -->|Oscillates electrons in| Detector[Detector Antenna]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q17', 65),
  ('beee0000-0000-0000-0000-000000000066', 'a1000000-0000-0000-0000-000000000007', '(ii) Solar energy travels from the Sun to Earth through empty space. Identify the mechanism responsible for this energy transfer.

*(2 Marks - [U/C, 1])*', '### Topic: Solar Energy Transmission
**Difficulty Level**: Easy (Conceptual)

#### 1. Identification of the Mechanism
The mechanism responsible for this energy transfer is **electromagnetic radiation** (specifically through electromagnetic waves).

#### 2. Rationale
* Unlike conduction or convection, electromagnetic waves do not require a material medium (like air or water) to propagate.
* They travel through the vacuum of space at the speed of light ($c \approx 3 \times 10^8\text{ m/s}$) as self-sustaining transverse oscillations of electric and magnetic fields, transporting thermal and light energy from the Sun to the Earth.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q18', 66),
  ('beee0000-0000-0000-0000-000000000067', 'a1000000-0000-0000-0000-000000000007', '(i) A metal plate moving between the poles of a magnet experiences resistance to its motion. Relate this effect to the formation of eddy currents.

*(3 Marks - [U/P, 2])*', '### Topic: Eddy Current Damping
**Difficulty Level**: Medium (Conceptual)

#### 1. Formation of Eddy Currents
When a solid metal plate moves between the magnetic poles, the magnetic flux ($\Phi$) passing through different portions of the plate changes over time.
* By Faraday''s Law of Induction, this changing flux induces circulating loops of electric current inside the body of the conductor, known as **eddy currents**.

#### 2. Resistance to Motion (Lenz''s Law)
* According to Lenz''s Law, these induced eddy currents create their own magnetic fields that **oppose** the change that produced them (the plate''s motion).
* The magnetic force between the magnet''s field and the field of the eddy currents acts opposite to the direction of motion:
$$\vec{F} = \int (d\vec{I} \times \vec{B})$$
This results in electromagnetic braking (damping), which resists the motion of the plate and converts kinetic energy into thermal energy ($I^2R$ loss).

```mermaid
graph TD
    Motion[Metal Plate Moves] -->|Changes| Flux[Magnetic Flux Φ]
    Flux -->|Induces| Eddy[Circulating Eddy Currents]
    Eddy -->|Generates| OpposingB[Opposing Magnetic Field]
    OpposingB -->|Creates| BrakingForce[Electromagnetic Braking Force]
```', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q19', 67),
  ('beee0000-0000-0000-0000-000000000068', 'a1000000-0000-0000-0000-000000000007', '(ii) A metallic conductor placed in a changing magnetic field develops circulating electric currents within it. Identify these currents.

*(2 Marks - [U/C, 1])*', '### Topic: Induced Currents
**Difficulty Level**: Easy (Conceptual)

#### 1. Identification
These circulating currents are called **eddy currents** (or Foucault currents).

#### 2. Explanation
* They are loops of electrical current induced within bulk conductors by a changing magnetic field, due to Faraday''s law of induction.
* They flow in closed loops within planes perpendicular to the magnetic field.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q20', 68),
  ('beee0000-0000-0000-0000-000000000069', 'a1000000-0000-0000-0000-000000000007', '(i) During a microwave transmission experiment, energy generated by a transmitter travels through space and is detected by a receiver placed several meters away. Relate this observation to energy transfer in electromagnetic fields.

*(3 Marks - [U/P, 2])*', '### Topic: Energy Transfer in EM Fields
**Difficulty Level**: Medium (Conceptual)

#### 1. Energy Density of EM Fields
Electromagnetic waves (microwaves) carry energy in both their electric and magnetic fields. The total energy density ($u$) in a vacuum is:
$$u = u_E + u_B = \frac{1}{2}\epsilon_0 E^2 + \frac{1}{2\mu_0} B^2$$

#### 2. Energy Propagation (Poynting Vector)
* The rate of energy flow per unit area is given by the **Poynting Vector**:
$$\vec{S} = \frac{1}{\mu_0} (\vec{E} \times \vec{B})$$
* During transmission, the microwave source excites electromagnetic fields that propagate outward, carrying energy density $u$ through space. The receiver absorbs a fraction of this field energy, converting it back into electrical currents for detection.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q21', 69),
  ('beee0000-0000-0000-0000-000000000070', 'a1000000-0000-0000-0000-000000000007', '(ii) During an experiment on wireless communication, a transmitter generates electromagnetic waves that propagate through space and reach a receiver placed several meters away. Even though there is no physical conductor connecting the transmitter and receiver, the receiver successfully detects the signal energy carried by the wave. Determine the phenomenon responsible for this energy transfer.

*(2 Marks - [U/C, 1])*', '### Topic: Wireless Propagation
**Difficulty Level**: Easy (Conceptual)

#### 1. Phenomenon Identification
The phenomenon is **electromagnetic wave propagation** (or wireless electromagnetic transmission).

#### 2. Explanation
* Accelerating charges in the transmitter''s circuitry generate self-sustaining transverse electromagnetic waves.
* These waves travel through the vacuum or air at the speed of light, carrying electromagnetic energy that is captured by the receiver antenna and converted back to a readable signal, requiring no physical wires.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q22', 70),
  ('beee0000-0000-0000-0000-000000000071', 'a1000000-0000-0000-0000-000000000007', '(i) During a laboratory demonstration, a copper disc rotates between the poles of a magnet. Students observe that the disc gradually slows down even though no mechanical friction is applied. The instructor explains that the magnetic field induces circulating currents inside the metal disc which oppose its motion. Establish how eddy currents influence the motion of conductors in magnetic fields.

*(3 Marks - [U/P, 2])*', '### Topic: Electromagnetic Braking in Rotating Discs
**Difficulty Level**: Medium (Conceptual / Analytical)

#### 1. Generation of Damping Forces
* As the copper disc rotates through the localized magnetic field, sections of the disc enter and leave the field, causing the magnetic flux through those sections to change.
* This induces **eddy currents** within the disc.
* According to Lenz''s law, these eddy currents circulate in directions such that the magnetic forces they experience (Lorentz forces $F = I L B$) oppose the rotation of the disc.

#### 2. Dynamic Influence (Deceleration)
* Since the force is always opposing the velocity ($F \propto -v$), it behaves as a velocity-dependent frictional force (damping).
* This electromagnetic torque slows down the rotation, converting the mechanical kinetic energy of the disc into heat via Joule heating ($P = I^2 R$). This principle is utilized in train brakes and electricity meters.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q23', 71),
  ('beee0000-0000-0000-0000-000000000072', 'a1000000-0000-0000-0000-000000000007', '(ii) In a classroom experiment, a teacher moves a strong magnet close to a thick aluminum plate. Students notice that the plate slightly resists the motion of the magnet. The teacher explains that this happens because changing magnetic fields induce circular electric currents inside the conductor. Determine the phenomenon responsible for this effect.

*(2 Marks - [U/C, 1])*', '### Topic: Electromagnetic Induction in Solid Conductors
**Difficulty Level**: Easy (Conceptual)

#### 1. Phenomenon Identification
The phenomenon is **electromagnetic induction**, specifically resulting in the formation of **eddy currents** and the subsequent **Lenz''s Law repulsion/drag**.

#### 2. Explanation
* The relative motion between the magnet and the aluminum plate causes a changing magnetic flux in the plate.
* This induces circular eddy currents in the plate, which produce an opposing magnetic field that exerts a repulsive or drag force on the moving magnet, resisting the motion.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q24', 72),
  ('beee0000-0000-0000-0000-000000000073', 'a1000000-0000-0000-0000-000000000007', '(i) In power electronic systems, inductors are commonly used to store energy temporarily in magnetic fields. Engineers design inductors so that when current passes through them, energy is stored in the magnetic field created around the coil. This stored energy can later be released when the current changes, helping regulate electrical circuits. Evaluate the role of magnetic fields in storing electrical energy in inductors.

*(5 Marks - [Ap/P, 2])*', '### Topic: Energy Storage in Inductors
**Difficulty Level**: Medium (Analytical)

#### 1. Energy Storage Mechanism
An inductor stores electrical energy in the form of a magnetic field.
1. **Building the Field**: When a current $I$ flows through an inductor, it establishes a magnetic flux $\Phi = L I$, where $L$ is the self-inductance.
2. **Work Done Against Induced EMF**: As the current increases, a back electromotive force (EMF) $e = -L \frac{dI}{dt}$ is induced in the coil. To maintain the flow, the power source must do work against this induced back-EMF.

#### 2. Mathematical Derivation
The work ($dW$) done in a small time interval $dt$ is:
$$dW = P\, dt = (-e) I\, dt = \left(L \frac{dI}{dt}\right) I\, dt = L I\, dI$$
Integrating this from zero current to a final steady-state current $I$:
$$W = \int_{0}^{I} L I''\, dI'' = \frac{1}{2} L I^2$$
Thus, the stored energy ($U$) is:
$$U = \frac{1}{2} L I^2$$

#### 3. Magnetic Field Energy Density
For a solenoid of volume $V = A l$ and magnetic field $B = \mu_0 n I$:
$$U = \frac{B^2}{2\mu_0} (A l)$$
The energy density ($u_B$) within the magnetic field is:
$$u_B = \frac{U}{V} = \frac{B^2}{2\mu_0}$$
This is the fundamental energy storage mechanism used in switch-mode power supplies (SMPS) and filters.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q25', 73),
  ('beee0000-0000-0000-0000-000000000074', 'a1000000-0000-0000-0000-000000000007', '(i) In an electrical laboratory, a coil connected to a power supply produces a magnetic field around it when current flows. When the current in the coil suddenly changes, the magnetic field around it also changes. This change in the magnetic field induces an electromotive force within the same coil that opposes the change in current. Engineers recognize this behavior as an important property of coils used in electrical circuits. Analyze the concept of self inductance in an electrical coil.

*(5 Marks - [An/P, 2])*', '### Topic: Self-Inductance in Coils
**Difficulty Level**: Hard (Analytical)

#### 1. Definition and Physical Origin
**Self-inductance ($L$)** is the property of a coil by which it opposes any change in the current flowing through it.
* When current flows, it generates a magnetic flux ($\Phi$) linked with the coil itself.
* The total flux linkage is proportional to the current:
$$N\Phi = L I$$
Where $N$ is the number of turns, and $L$ is the coefficient of self-inductance (measured in Henries, H).

```mermaid
graph LR
    CurrentChange[Current I changes] -->|Alters| Flux[Magnetic Flux Φ]
    Flux -->|Induces| BackEMF[Back-EMF e = -L dI/dt]
    BackEMF -->|Opposes| CurrentChange
```

#### 2. Mathematical formulation
By Faraday''s Law of Electromagnetic Induction:
$$e = -\frac{d(N\Phi)}{dt} = -L \frac{dI}{dt}$$
* **Lenz''s Law (Negative Sign)**: The negative sign indicates that the induced voltage (back-EMF) acts in a direction that opposes the rate of change of current ($dI/dt$).

#### 3. Circuit Analysis
* **Current Rise**: If current is increasing ($dI/dt > 0$), the back-EMF is negative, opposing the growth of current.
* **Current Fall**: If current is decreasing ($dI/dt < 0$), the induced EMF is positive, attempting to sustain the falling current.
* This property is analogous to electrical inertia, behaving exactly like mass in mechanical systems.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q26', 74),
  ('beee0000-0000-0000-0000-000000000075', 'a1000000-0000-0000-0000-000000000007', '(i) In an electrical engineering laboratory, students connect a coil to a power supply and observe the behavior of the magnetic field produced around the coil. As current flows through the coil, a magnetic field develops around it and energy becomes stored within that magnetic field. When the power supply is switched off, the magnetic field collapses and releases the stored energy back into the circuit. Analyze how energy is stored in a magnetic field produced by an electric current.

*(5 Marks - [Ap/P, 2])*', '### Topic: Magnetic Field Energy Storage Analysis
**Difficulty Level**: Hard (Analytical)

#### 1. Energy Storage Mechanism
* When an electric current is initiated in a coil, it creates a magnetic field. 
* To establish this magnetic field, work must be done by the electrical source against the self-induced back-EMF of the coil:
$$e = -L \frac{dI}{dt}$$
* The energy is stored in the space surrounding the conductor where the magnetic field resides.

#### 2. Derivation of Energy Stored
The instantaneous power $P$ delivered to the inductor during the transient state is:
$$P = v(t) I(t) = \left(L \frac{dI}{dt}\right) I = L I \frac{dI}{dt}$$
The energy stored $E$ is the integral of power over time:
$$E = \int_{0}^{\infty} P\, dt = \int_{0}^{I} L I''\, dI'' = \frac{1}{2} L I^2$$

#### 3. Energy Release During Collapse
* When the power supply is disconnected, the current drops to zero.
* The collapsing magnetic field induces a large forward voltage (EMF) to try and maintain the current.
* If a discharge path exists (like a freewheeling diode), the energy is dissipated safely. Otherwise, the collapsing field can produce high-voltage sparks across open switch contacts, demonstrating the physical release of stored magnetic energy.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q27', 75),
  ('beee0000-0000-0000-0000-000000000076', 'a1000000-0000-0000-0000-000000000007', '(i) During a circuit experiment, a student observes that when the current through a coil is suddenly increased, the coil briefly resists the change in current. This happens because the magnetic field associated with the coil changes and produces an induced electromotive force that opposes the change. Assess how self inductance affects current changes in electrical circuits.

*(5 Marks - [Ap/P, 2])*', '### Topic: Transient Response & Self-Inductance
**Difficulty Level**: Medium (Conceptual / Analytical)

#### 1. Transient Behavior in LR Circuits
When a DC voltage $V$ is applied to a series combination of a resistor $R$ and an inductor $L$ (an LR circuit), the current $I(t)$ does not instantly jump to its maximum value ($I_{\text{max}} = V/R$) due to self-inductance.

#### 2. Mathematical Description of Current Growth
The Kirchhoff''s Voltage Law (KVL) for the circuit is:
$$V - L \frac{dI}{dt} - I R = 0$$
Solving this differential equation yields the current as a function of time:
$$I(t) = \frac{V}{R} \left(1 - e^{-t / \tau}\right)$$
Where $\tau = \frac{L}{R}$ is the **inductive time constant** of the circuit.

```
  Current I(t)
    ^
V/R |                  ----------------
    |               .-''
    |            .-''
    |         .-''
    |      .-''
    |   .-''
  0 +----------------------------------> Time t
    0         τ        2τ       3τ
```

#### 3. Assessment of Inductive Opposition
1. **At $t=0$**: The term $e^{0} = 1$, giving $I(0) = 0$. The inductor behaves as an **open circuit**, completely blocking current changes.
2. **At $t = \tau$**: $I(\tau) = \frac{V}{R}(1 - e^{-1}) \approx 0.632 \frac{V}{R}$ ($63.2\%$ of maximum).
3. **At steady state ($t \to \infty$)**: $I(t) \to \frac{V}{R}$. The inductor acts as a **short circuit** (ideal wire).
* **Summary**: Larger self-inductance $L$ increases the time constant $\tau$, meaning the circuit takes longer to respond to current changes, smoothing out current spikes and transients.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q28', 76),
  ('beee0000-0000-0000-0000-000000000077', 'a1000000-0000-0000-0000-000000000007', '(i) In electrical power generators, mechanical rotation of coils within magnetic fields produces electric current that is supplied to homes and industries. As the coil rotates, the magnetic field linking the coil continuously changes. This changing magnetic field produces an induced electromotive force that drives current through the external circuit. Evaluate how electromagnetic induction enables electricity generation in generators.

*(5 Marks - [Ap/P, 2])*', '### Topic: AC Generator & Electromagnetic Induction
**Difficulty Level**: Medium (Conceptual / Analytical)

#### 1. Principle of Operation
An electric generator operates on the principle of **Faraday''s Law of Electromagnetic Induction**. It converts mechanical energy (rotation of a rotor) into electrical energy.

#### 2. Mathematical Model of EMF Generation
Consider a coil of $N$ turns and area $A$ rotating with constant angular velocity $\omega$ in a uniform magnetic field $B$.
* The magnetic flux linked with the coil at any angle $\theta = \omega t$ is:
$$\Phi(t) = B A \cos(\omega t)$$
* By Faraday''s Law, the induced EMF $e$ is:
$$e = -N \frac{d\Phi}{dt} = -N \frac{d}{dt}(B A \cos(\omega t)) = N B A \omega \sin(\omega t)$$
* This results in an alternating voltage output:
$$e(t) = E_m \sin(\omega t)$$
where $E_m = N B A \omega$ is the peak EMF.

```mermaid
graph LR
    Mechanical[Mechanical Rotation ω] -->|Rotates Coil| FluxChange[Flux Change dΦ/dt]
    FluxChange -->|Faraday''s Law| InducedEMF[Induced EMF e = Em sinωt]
    InducedEMF -->|Drives| ACCurrent[AC Current in Load]
```

#### 3. Evaluation of Key Factors
* **Rotor Speed ($\omega$)**: Faster rotation increases both the output voltage and frequency.
* **Magnetic Field ($B$) and Coil Geometry ($N, A$)**: Increasing the field strength or number of turns increases the amplitude of the generated electricity. This forms the foundation of modern grid power generation.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q29', 77),
  ('beee0000-0000-0000-0000-000000000078', 'a1000000-0000-0000-0000-000000000007', '(i) In space research experiments, scientists use powerful laser beams to manipulate tiny particles. When the laser beam strikes a microscopic particle, it pushes the particle slightly in the direction of the beam. This happens because the electromagnetic field of the laser carries momentum that is transferred to the particle upon interaction. Evaluate how electromagnetic radiation transfers momentum to matter.

*(5 Marks - [Ap/P, 2])*', '### Topic: Radiation Pressure & Momentum Transfer
**Difficulty Level**: Hard (Analytical)

#### 1. Relativistic Relationship
According to Maxwell''s electromagnetic theory and Einstein''s special relativity, electromagnetic waves carry momentum along with energy. The relationship between momentum ($p$) and energy ($U$) of electromagnetic radiation is:
$$p = \frac{U}{c}$$
where $c$ is the speed of light.

#### 2. Mechanism of Force Transfer (Radiation Pressure)
When radiation strikes a surface, it is either absorbed, reflected, or scattered.
* **Complete Absorption**: The momentum transferred to the particle is:
$$\Delta p = \frac{U}{c}$$
* **Complete Reflection**: The wave bounces back with equal momentum in the opposite direction. The change in momentum is doubled:
$$\Delta p = \frac{2U}{c}$$

The force ($F$) exerted on the particle is the rate of change of momentum:
$$F = \frac{dp}{dt} = \frac{1}{c} \frac{dU}{dt} = \frac{P}{c}$$
where $P$ is the power of the incident radiation.

#### 3. Physical Application: Optical Tweezers
* Since $c$ is very large ($3 \times 10^8\text{ m/s}$), the force exerted by everyday light is negligible.
* However, highly focused laser beams (with high power density) can exert forces in the pico-Newton range. This allows scientists to hold and manipulate microscopic objects (cells, DNA strands) in three dimensions without physical contact, a technique known as **optical trapping** or **optical tweezers**.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q30', 78),
  ('beee0000-0000-0000-0000-000000000079', 'a1000000-0000-0000-0000-000000000007', '(i) In transformer systems used in power distribution, alternating current flowing through one coil produces a changing magnetic field. This varying magnetic field interacts with a nearby coil and induces an electromotive force in it. As a result, electric energy is transferred between the two coils without direct electrical contact. Assess how changing magnetic fields produce induced emf in nearby conductors.

*(5 Marks - [Ap/P, 2])*', '### Topic: Mutual Induction in Transformers
**Difficulty Level**: Hard (Analytical)

#### 1. Physical Principle: Mutual Inductive Coupling
The transfer of energy between separate circuits without electrical contact is called **mutual induction**.

```mermaid
graph TD
    Primary[AC Current Ip in Primary] -->|Creates| ChangingB[Changing Magnetic Field in Core]
    ChangingB -->|Couples to| Secondary[Secondary Coil Linkage]
    Secondary -->|Faraday''s Law| InducedEMF[Induced EMF Es = -M dIp/dt]
```

#### 2. Mathematical Formulation
1. **Flux Linkage**: The current $I_p$ in the primary coil generates a magnetic field. A fraction of the resulting flux $\Phi_s$ links the secondary coil:
$$N_s \Phi_s = M I_p$$
where $M$ is the coefficient of mutual inductance (in Henries, H).
2. **Induced EMF**: If the primary current varies ($dI_p/dt$), the flux linked with the secondary changes, inducing an EMF:
$$e_s = -N_s \frac{d\Phi_s}{dt} = -M \frac{dI_p}{dt}$$

#### 3. Assessment of Transformer Efficiency
* In an ideal transformer, the magnetic flux is confined entirely within a high-permeability ferromagnetic core, ensuring that the flux per turn is identical in both coils:
$$\frac{V_p}{V_s} = \frac{N_p}{N_s}$$
This enables efficient voltage stepping (up or down) for long-distance electrical power transmission with minimal losses.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q31', 79),
  ('beee0000-0000-0000-0000-000000000080', 'a1000000-0000-0000-0000-000000000007', '(i) Scientists studying solar radiation observe that sunlight not only carries energy but also exerts a small pressure on surfaces it strikes. Sensitive instruments detect that when electromagnetic waves from the Sun hit a reflective surface, a tiny force is produced. This force indicates that electromagnetic radiation carries momentum even though it consists only of electric and magnetic fields traveling through space. Analyze how electromagnetic fields can carry linear momentum.

*(5 Marks - [An/P, 2])*', '### Topic: Electromagnetic Momentum Analysis
**Difficulty Level**: Hard (Analytical)

#### 1. Classical Electrodynamic Analysis
A classical way to understand electromagnetic momentum is by analyzing the Lorentz force on charges within the surface:
* Consider an EM wave incident on a surface containing free charges.
* The electric field $\vec{E}$ exerts a force and causes the charges to move with velocity $\vec{v}$ in the direction of $\vec{E}$.
* The magnetic field $\vec{B}$ (which is perpendicular to $\vec{E}$) then exerts a Lorentz force on the moving charge:
$$\vec{F}_B = q(\vec{v} \times \vec{B})$$
* By the right-hand rule, this force $\vec{F}_B$ points in the **direction of propagation** of the wave.
* This classical mechanism shows that electromagnetic waves exert a forward pressure, directly demonstrating that they carry linear momentum.

#### 2. Momentum Density of Fields
The momentum density $\vec{g}$ (momentum per unit volume) stored in the electromagnetic fields is related to the Poynting vector $\vec{S}$:
$$\vec{g} = \frac{\vec{S}}{c^2} = \epsilon_0 (\vec{E} \times \vec{B})$$
* Even in the absence of physical particles, the electric and magnetic fields themselves carry momentum through space. This momentum is transferred to any matter that absorbs, reflects, or scatters the fields, resulting in radiation pressure.', NULL, '22GE003 - Basics of Electrical Engineering', 'Module Test-II Q32', 80);
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;
