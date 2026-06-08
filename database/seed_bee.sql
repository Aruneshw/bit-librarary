INSERT INTO questions (id, subject_id, question, answer, image_url, "references", notes, order_index) VALUES
  ('bee00000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000008', 'A factory production line uses an electrically powered conveyor system to move heavy materials between processing stations. Over time the conveyor motor begins consuming higher electrical power while producing the same mechanical output speed. Maintenance engineers suspect inefficiencies in the energy transfer process within the system. Electrical measurements show increased current while mechanical output remains constant. The team must diagnose the underlying cause affecting energy flow. Analyze the situation and infer the most plausible energy transfer issues causing the observed increase in power consumption.

*(3 Marks - [U/C, 2])*', '### Topic: Energy Transfer & Inefficiencies in Motors
**Difficulty Level**: Medium (Conceptual / Diagnostic)

#### 1. Analysis of the Symptoms
* **Constant speed**: Mechanical output power ($P_{\text{mech}} = T \omega$) remains constant.
* **Increased current ($I$)**: Electrical input power ($P_{\text{elect}} = V I \cos\phi$) has increased.
* **Result**: The system efficiency ($\eta = P_{\text{mech}} / P_{\text{elect}}$) has dropped.

#### 2. Plausible Causes of Energy Losses

```mermaid
graph TD
    In[Electrical Power Input] --> Loss1[I²R Copper Losses]
    In --> Loss2[Mechanical Friction]
    In --> Loss3[Core Iron Losses]
    Loss1 --> Out[Reduced Motor Efficiency]
    Loss2 --> Out
    Loss3 --> Out
```

1. **Mechanical Loss (Friction)**: Over time, bearings and gears degrade due to wear, lack of lubrication, or misalignment. This increases the load torque ($T_{\text{loss}}$) the motor must overcome. To maintain the same speed, the motor must draw more current, leading to higher electrical power consumption.
2. **Electrical Loss ($I^2R$ Copper Losses)**: Winding resistance ($R$) can increase due to thermal stress and insulation degradation. This increases copper losses ($P_{\text{loss}} = I^2 R$) which are dissipated as heat rather than useful mechanical work.
3. **Magnetic/Core Loss**: Degradation of the motor''s core lamination can increase eddy currents and hysteresis losses, requiring more input power to maintain the magnetic field.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q1', 1),
  ('bee00000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000008', 'An automated irrigation system uses solar panels to power a small electric pump that lifts water from a reservoir to agricultural fields. Solar radiation generates electrical energy in the panels which is then transmitted through wires to operate the pump motor. The motor converts this electrical energy into mechanical motion that drives the pumping mechanism. The system therefore involves multiple stages of energy transformation before water is delivered to the crops. Infer the logical sequence of energy transformations occurring within the irrigation system architecture.

*(2 Marks - [U/C, 1])*', '### Topic: Energy Transformation Sequence
**Difficulty Level**: Easy (Conceptual)

#### 1. Logical Sequence of Energy Transformations
The solar-powered irrigation system operates through the following energy conversion stages:

$$\text{Solar (Radiant) Energy} \xrightarrow{\text{Solar Panels}} \text{Electrical Energy} \xrightarrow{\text{Pump Motor}} \text{Mechanical Energy} \xrightarrow{\text{Pumping Mechanism}} \text{Hydraulic Energy}$$

#### 2. Description of Stages
1. **Solar to Electrical**: Solar panels convert sunlight (photons) into DC electrical energy via the photovoltaic effect.
2. **Electrical to Mechanical**: The DC current flows through conductors to the motor, where electromagnetic forces convert electrical energy into rotation of the motor shaft.
3. **Mechanical to Hydraulic**: The rotating shaft drives the pump impeller, transferring mechanical energy into the water as pressure and velocity (hydraulic energy) to lift it.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q2', 2),
  ('bee00000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000008', 'An industrial automation company installs sensors across a manufacturing line to monitor pressure, temperature, and machine vibration levels. Engineers realize that raw sensor outputs differ widely in voltage level, impedance, and noise characteristics. Without proper signal conditioning, the measurement system could misinterpret these signals and trigger incorrect control actions in the production line. Therefore, the engineering team must evaluate the overall importance of signal conditioning within the measurement architecture before deploying the system in a real industrial environment. Assess the professional significance of signal conditioning in industrial measurement systems and recommend the critical functions it performs to ensure reliable monitoring and control.

*(3 Marks - [U/C, 2])*', '### Topic: Signal Conditioning in Instrumentation
**Difficulty Level**: Medium (Conceptual)

#### 1. Importance of Signal Conditioning
Raw outputs from sensors (e.g., thermocouples, strain gauges) are typically weak (millivolt range), high impedance, and contaminated with industrial electromagnetic noise. **Signal conditioning** is the process of modifying these raw analog signals to meet the input requirements of data acquisition systems and microcontrollers, ensuring system accuracy and preventing false alarms.

#### 2. Critical Functions of Signal Conditioning

```mermaid
graph LR
    Raw[Raw Sensor Signal] --> Amp[Amplification]
    Amp --> Filter[Filtering]
    Filter --> ISO[Isolation/Linearization]
    ISO --> DAQ[DAQ / Microcontroller]
```

1. **Amplification (Gain)**: Increases signal-to-noise ratio (SNR) by boosting low-amplitude sensor signals (e.g., mV from thermocouple) to standard system levels (e.g., 0-5 V or 4-20 mA).
2. **Filtering (Noise Elimination)**: Attenuates high-frequency electromagnetic interference (EMI) and power line hum (50/60 Hz) using low-pass filters to prevent signal distortion.
3. **Electrical Isolation**: Prevents high-voltage surges from the field from damaging sensitive digital control units, typically using optocouplers.
4. **Linearization**: Converts non-linear sensor outputs into linear relationships to simplify processing.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q3', 3),
  ('bee00000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000008', 'A communication system processes signals from multiple transmitters using a centralized receiver module. Engineers must determine whether adding dedicated signal conditioning circuits for each transmitter improves performance or increases system complexity unnecessarily. The design decision must balance signal quality, circuit efficiency, and scalability when expanding the communication network. Infer how signal conditioning improves communication reliability while reconciling the efficiency trade-offs associated with adding conditioning circuits in large signal processing systems.

*(2 Marks - [R/F, 1])*', '### Topic: Signal Conditioning Trade-offs
**Difficulty Level**: Medium (Conceptual)

#### 1. Reliability Improvements
Dedicated signal conditioning at each transmitter (source-side conditioning):
* Filters out local noise before it is amplified during transmission.
* Matches impedance, reducing signal reflection and attenuation over long lines.
* Maximizes the signal-to-noise ratio (SNR) for the centralized receiver.

#### 2. Reconciling Trade-offs (Complexity vs. Efficiency)
* **Cost and Complexity**: Adding conditioning circuits to every channel increases component count, space, power consumption, and cost.
* **Design Solution**: In large systems, engineers use a hybrid approach:
  * Place **critical conditioning** (e.g., amplification, basic filtering) locally at the transmitter.
  * Use **multiplexers** to route signals to a single, high-performance conditioning unit at the centralized receiver, balancing cost, space, and signal quality.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q4', 4),
  ('bee00000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000008', 'A smart grid project integrates multiple renewable energy sources such as solar panels and micro wind turbines into a local power distribution network. Energy from these sources must travel through transmission lines before reaching residential consumers. Engineers must determine how energy carriers and transmission pathways influence system efficiency. Increasing transmission distance improves grid coverage but introduces energy losses. The planning team must analyze this trade-off before expanding the system. Evaluate how transmission pathways influence energy efficiency in the smart grid and determine the critical engineering considerations.

*(3 Marks - [U/C, 2])*', '### Topic: Smart Grid Transmission Efficiency
**Difficulty Level**: Medium (Conceptual)

#### 1. Influence of Transmission Pathways
Energy transmission over long distances experiences resistance losses ($P_{\text{loss}} = I^2 R$) in the conductors. 
* **Resistance ($R = \rho L / A$)**: Longer distance ($L$) increases line resistance.
* **Current ($I$)**: Higher current exponentially increases losses.

#### 2. Critical Engineering Considerations

```mermaid
graph TD
    Grid[Smart Grid Generation] --> StepUp[Step-up Transformer: Raise V, Lower I]
    StepUp --> Trans[HV Transmission Line]
    Trans --> StepDown[Step-down Transformer: Lower V, Raise I]
    StepDown --> Consumers[Residential Load]
```

1. **Voltage Optimization (High-Voltage Transmission)**: Stepping up the transmission voltage ($V$) reduces the current ($I$) required for the same power ($P = V I$). This dramatically minimizes $I^2 R$ copper losses.
2. **Conductor Material & Area**: Using high-conductivity materials (like ACSR - Aluminum Conductor Steel Reinforced) with optimal cross-sectional areas ($A$) reduces line resistance.
3. **Decentralized Generation**: Integrating local micro-grids and smart storage systems near consumer hubs reduces the required transmission distance ($L$), improving overall grid efficiency.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q5', 5),
  ('bee00000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000008', 'A technology company is designing next-generation wearable electronic devices that rely on compact batteries and miniature circuits to operate continuously throughout the day. Engineers must ensure that the limited stored energy inside the device is transmitted efficiently to sensors, processors, and wireless transmitters. Any inefficiency in the internal energy pathways will reduce battery life and device reliability. The development team therefore evaluates the role of energy transfer principles in system design. Assess why efficient energy transfer is a critical engineering requirement in such compact technological systems.

*(2 Marks - [U/C, 1])*', '### Topic: Wearable Device Energy Efficiency
**Difficulty Level**: Easy (Conceptual)

#### 1. Rationale for Efficient Energy Transfer
Efficient energy transfer is crucial in compact wearable electronics for two key reasons:
1. **Battery Life Extension**: Compact wearables have tiny batteries with limited energy capacity ($100-300\text{ mAh}$). Any energy wasted as heat in power rails directly reduces operating runtime.
2. **Thermal Management**: In miniature, sealed packages, wasted energy turns into heat. Because there are no fans or heatsinks, this heat raises the device temperature, which degrades battery chemistry, compromises user comfort, and reduces reliability of components like the CPU.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q6', 6),
  ('bee00000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000008', 'A wireless communication laboratory compares three electromagnetic signal transmission technologies: radio communication used in broadcasting, microwave transmission used in radar systems and optical signals used in fiber-optic internet infrastructure. Researchers analyze differences in wavelength, frequency and propagation mechanisms to determine how each technology supports distinct communication functions. The evaluation aims to understand how electromagnetic signal characteristics influence transmission applications. Integrate electromagnetic wave characteristics with communication technology requirements and determine how wavelength and frequency relationships guide the selection of radio, microwave or optical signal transmission methods.

*(3 Marks - [U/C, 2])*', '### Topic: Electromagnetic Wave Selection in Communication
**Difficulty Level**: Medium (Conceptual)

#### 1. Relationship Between Frequency and Wavelength
All electromagnetic waves travel at the speed of light ($c \approx 3 \times 10^8\text{ m/s}$). Wavelength ($\lambda$) and frequency ($f$) are inversely related:
$$c = f \cdot \lambda$$

#### 2. Characteristics and Selection of Transmission Technologies

| Technology | Frequency Range | Wavelength Range | Propagation Mechanism | Selection Rationale |
|---|---|---|---|---|
| **Radio Waves** | $30\text{ kHz} - 300\text{ MHz}$ | $1\text{ m} - 10\text{ km}$ | Ground/Sky Wave (Diffraction around obstacles) | Excellent for long-range, omnidirectional broadcasting (AM/FM radio, TV). |
| **Microwaves** | $300\text{ MHz} - 300\text{ GHz}$ | $1\text{ mm} - 1\text{ m}$ | Line-of-Sight (Requires directional antennas) | High bandwidth, suitable for point-to-point links, satellite communications, and radar. |
| **Optical Signals** | $100\text{ THz} - 1000\text{ THz}$ | $300\text{ nm} - 3\ \mu\text{m}$ | Total Internal Reflection in glass fibers | Ultra-high frequency provides massive bandwidth. Immune to electromagnetic interference, ideal for high-speed fiber-optic internet. |

```mermaid
graph LR
    Radio[Radio: Low f, High λ] -->|Long Range Broadcasting| Broadcast[Omnidirectional]
    Micro[Micro: Medium f, Medium λ] -->|Point-to-Point/Satellite| LoS[Line-of-Sight]
    Optical[Optical: High f, Low λ] -->|Total Internal Reflection| Fiber[Ultra-High Bandwidth]
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q7', 7),
  ('bee00000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000008', 'A technology firm compares microwave satellite communication with optical fiber transmission for delivering high-speed internet between two cities. Microwave links require antennas and free-space propagation while optical systems require fiber infrastructure but provide higher bandwidth. Engineers analyze scalability and efficiency of electromagnetic signal transport under these conditions. Analyze the scalability trade-offs between microwave and optical electromagnetic transmission methods and infer which system offers higher long-term data capacity.

*(2 Marks - [U/C, 1])*', '### Topic: Microwave vs. Optical Fiber Scalability
**Difficulty Level**: Easy (Conceptual)

#### 1. Scalability Trade-offs
* **Microwave Satellite (Wireless)**: Low initial infrastructure cost (no physical cables between cities), but limited by free-space path loss, atmospheric interference (rain fade), and restricted frequency spectrum.
* **Optical Fiber (Wired)**: High installation cost (trenching cables), but offers nearly unlimited bandwidth through technologies like Wavelength Division Multiplexing (WDM) and is immune to weather.

#### 2. Long-Term Data Capacity Inference
* **Optical Fiber** offers significantly higher long-term data capacity. Its high-frequency carrier wave (infrared light) supports much wider bandwidths than microwave frequencies. Additionally, multiple fibers can be added to the same cable duct to scale capacity easily without spectrum interference.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q8', 8),
  ('bee00000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000008', 'A rotating steel shaft in a processing plant transmits mechanical power from a turbine to a milling machine. The shaft rotates at 600 rpm while delivering a torque of 200 N·m. Engineers must evaluate the mechanical power transmitted through the shaft to ensure the machine operates within design limits. The evaluation also determines whether structural reinforcement is required for the shaft assembly. Determine the mechanical power transmitted through the shaft and interpret the result to assess the effectiveness of the energy transfer mechanism.

*(5 Marks - [Ap/P, 3])*', '### Topic: Mechanical Power Transmission in Rotating Shafts
**Difficulty Level**: Medium (Numerical)

#### 1. Given Data
* Rotational speed, $N = 600\text{ rpm (rotations per minute)}$
* Torque, $T = 200\text{ N}\cdot\text{m}$

#### 2. Formula
The mechanical power ($P$) transmitted by a rotating shaft is given by:
$$P = T \cdot \omega$$
Where:
* $T$ = Torque in $\text{N}\cdot\text{m}$
* $\omega$ = Angular velocity in $\text{rad/s}$

The relation between angular velocity ($\omega$) and rotational speed ($N$) is:
$$\omega = \frac{2 \pi N}{60}$$

#### 3. Step-by-Step Calculation
First, calculate the angular velocity ($\omega$):
$$\omega = \frac{2 \pi \times 600}{60} = 20 \pi\text{ rad/s}$$
$$\omega \approx 20 \times 3.14159 \approx 62.83\text{ rad/s}$$

Now, calculate the power ($P$):
$$P = 200\text{ N}\cdot\text{m} \times 20 \pi\text{ rad/s}$$
$$P = 4000 \pi\text{ Watts}$$
$$P \approx 4000 \times 3.14159 \approx 12566.37\text{ Watts} = 12.57\text{ kW}$$

#### 4. Conclusion & Interpretation
* The mechanical power transmitted through the shaft is **$12.57\text{ kW}$** (or $16.85\text{ HP}$).
* **Interpretation**: This calculation helps engineers verify if the shaft can withstand the torsion stress without shearing. If the shaft''s power rating is below $13\text{ kW}$, structural reinforcement or a larger diameter shaft is required to prevent fatigue failure.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q9', 9),
  ('bee00000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000008', 'A biomedical monitoring device measures human heartbeat activity and converts the mechanical vibration of the chest into an electrical signal for digital analysis. Engineers observe that the signal amplitude varies periodically with each heartbeat, and the system records the signal both in the time domain and frequency domain to identify abnormal rhythms. The analysis software detects frequency components corresponding to periodic cardiac activity. Engineers want to understand how signal representation enables both energy transmission and information interpretation within the monitoring system. Formulate how the heartbeat signal can be interpreted through time-domain and frequency-domain representations to extract physiological information. Analyze how these signal representations assist engineers in recognizing periodic patterns and interpreting energy variations associated with cardiac activity.

*(5 Marks - [Ap/P, 3])*', '### Topic: Time-Domain and Frequency-Domain Representations
**Difficulty Level**: Hard (Analytical)

#### 1. Time-Domain Representation (ECG/Seismocardiogram)
* **Definition**: Represents the signal amplitude varying over time: $s(t) = f(t)$.
* **Physiological Information**:
  * Visualizes the sequence of cardiac events (P-wave, QRS complex, T-wave).
  * Direct measurement of heart rate (R-to-R interval time, $\Delta t$).
  * Detects acute changes like arrhythmias, premature beats, or pauses in real time.

```
Amplitude (V)
  ^
  |        _/\_             _/\_
  |  _/\__/    \__/\_  _/\__/    \__/\_
  +-------------------------------------> Time (s)
```

#### 2. Frequency-Domain Representation (Fourier Spectrum)
* **Definition**: Shows the component frequencies of the signal: $S(f) = \mathcal{F}\{s(t)\}$.
* **Physiological Information**:
  * Identifies the primary heart rate frequency ($f_0 = 1 / \Delta t$).
  * Differentiates baseline wander (low-frequency noise from breathing, $< 0.5\text{ Hz}$) from muscle noise (high-frequency interference, $> 40\text{ Hz}$).
  * Spectral analysis (Heart Rate Variability, HRV) provides information on autonomic nervous system balance.

```
Power Spectrum
  ^
  |      | Primary Heart Rate (f0)
  |      |
  |    | | | Noise
  +-------------------------------------> Frequency (Hz)
```

#### 3. Energy and Information Interpretation
1. **Energy Transmission**: The transducer converts the physical energy of the chest''s mechanical vibration into electrical potential energy.
2. **Information Analysis**:
   * **Time-domain** tracks the chronological progression of cardiac mechanics.
   * **Frequency-domain** breaks the complex signal down into its components, enabling digital filters to remove noise and isolate the true cardiac rhythm.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q10', 10),
  ('bee00000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000008', 'A conveyor system in a mining facility uses a gear transmission to transfer power between shafts. After several months of operation, engineers observe overheating near the gearbox and a gradual drop in mechanical efficiency. Inspection reveals increased vibration and metallic noise during operation. The maintenance team suspects energy losses caused by mechanical resistance within the transmission system. Analyze the operational symptoms and determine the most probable mechanical causes of energy loss in the gear transmission system. Infer corrective measures based on mechanical transmission principles.

*(5 Marks - [Ap/P, 3])*', '### Topic: Mechanical Transmission Loss & Troubleshooting
**Difficulty Level**: Hard (Analytical)

#### 1. Analysis of Symptoms
* **Overheating**: Indicates that kinetic energy is being dissipated as thermal energy due to friction.
* **Drop in efficiency**: The output torque or speed is decreasing relative to input power.
* **Increased vibration and metallic noise**: Indicates component wear, misalignment, or structural degradation.

#### 2. Probable Mechanical Causes of Energy Loss

```mermaid
graph TD
    Symp[Overheating, Noise, Vibration] --> Cause1[Lubrication Failure: Boundary Friction]
    Symp --> Cause2[Gear Misalignment: High contact stress]
    Symp --> Cause3[Bearing Wear: High rotational resistance]
    Cause1 --> Loss[Frictional Thermal Energy Loss]
    Cause2 --> Loss
    Cause3 --> Loss
```

1. **Lubrication Failure**: Degraded or insufficient gear oil leads to boundary lubrication, causing direct metal-to-metal contact. This increases the friction coefficient, generating heat and wear.
2. **Gear Misalignment**: If the input and output shafts are slightly misaligned, gear teeth do not mesh correctly. This creates uneven load distribution, high contact stress, sliding friction, and vibration.
3. **Bearing Wear**: Damaged bearings increase rotational resistance and produce high-frequency vibration and metallic noise.

#### 3. Inferred Corrective Measures
1. **Restore Lubrication**: Flush the gearbox and replace the oil with high-grade synthetic gear oil of correct viscosity to restore hydrodynamic lubrication.
2. **Realignment**: Use laser alignment tools to check and correct shaft alignment, minimizing sliding friction.
3. **Component Replacement**: Replace worn gears and bearings to restore smooth rolling contact.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q11', 11),
  ('bee00000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000008', 'An automated irrigation system in a large agricultural field uses soil moisture sensors connected to a central monitoring unit. The sensors produce electrical signals whose amplitude changes according to soil moisture levels. The monitoring unit continuously interprets these signals to decide when irrigation pumps must be activated. Engineers observe that although electrical power reaches the monitoring unit correctly, incorrect irrigation decisions sometimes occur due to fluctuations in the transmitted signal. The design team is analyzing how signals simultaneously carry energy and information within this sensing network. Analyze how the electrical signal in the irrigation monitoring network simultaneously functions as a carrier of energy and encoded information. Determine how variations in signal amplitude enable the monitoring system to interpret soil conditions and justify the role of signal integrity in ensuring accurate irrigation decisions.

*(5 Marks - [Ap/P, 3])*', '### Topic: Signal Dualism: Energy and Information Carrier
**Difficulty Level**: Hard (Analytical)

#### 1. Dual Role of the Electrical Signal
Every electrical signal in a control network consists of two components:
1. **Energy Carrier**: The physical voltage ($V$) and current ($I$) represent a flow of electrical power:
$$P = V \cdot I$$
This energy powers the sensor''s internal circuitry and drives the signal propagation through transmission lines.
2. **Information Carrier**: The signal carries data encoded in its physical characteristics (e.g., amplitude, frequency, or pulse width). In this analog setup, the data is **amplitude-modulated** ($V_{\text{out}} \propto \text{moisture}$).

#### 2. Amplitude Variations and Moisture Interpretation
* **Wet Soil**: High moisture increases soil conductivity, lowering the resistance between sensor probes. This produces a **low voltage output** (e.g., $1\text{ V}$).
* **Dry Soil**: Dry soil has high resistance, producing a **high voltage output** (e.g., $4.5\text{ V}$).
* The central monitoring unit compares this voltage against preset thresholds to determine when to trigger the pumps.

```mermaid
graph LR
    Moisture[Soil Moisture] -->|Changes Resistance| Sensor[Sensor Probe]
    Sensor -->|Output Voltage V_out| ADC[ADC in Monitor]
    ADC -->|Digital Threshold| Decision{Trigger Pump?}
```

#### 3. Importance of Signal Integrity
**Signal integrity** is the preservation of the signal''s original waveform from transmitter to receiver.
* **The Problem**: Electromagnetic interference (EMI) or voltage drops across long lines introduce noise fluctuations ($\Delta V$).
* **Consequence**: If the dry-soil threshold is $4.0\text{ V}$ and a noise spike adds $+0.5\text{ V}$ to a wet-soil signal of $3.6\text{ V}$, the monitor misinterprets the voltage as $4.1\text{ V}$ (dry soil) and activates the pump unnecessarily, wasting water and potentially damaging crops.
* **Solution**: Implementing shielded cables, low-pass filters, or differential signaling is critical to maintain signal integrity and ensure accurate decisions.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q12', 12),
  ('bee00000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000008', 'A manufacturing plant distributes electrical energy through long transmission cables to robotic assembly stations. Recently, several stations intermittently fail to respond to digital control signals transmitted as small voltage variations along the same electrical lines. Measurements reveal higher than expected resistance in certain cable segments due to aging insulation and conductor corrosion. Engineers must diagnose why both electrical power delivery and signal communication are degrading within the network. A systematic electrical transmission analysis is required before replacing equipment. Investigate the electrical transmission network and infer the mechanism by which increased conductor resistance simultaneously disrupts energy delivery and signal transport. Justify a technically reasoned corrective approach that restores efficient electrical transmission within the plant.

*(5 Marks - [Ap/P, 3])*', '### Topic: Electrical Transmission Degradation Analysis
**Difficulty Level**: Hard (Analytical)

#### 1. Mechanism of Dual Degradation by High Resistance ($R$)
When conductor resistance increases due to corrosion or aging:

##### A. Disruption of Energy (Power) Delivery
Power transmission experiences an internal voltage drop ($V_{\text{drop}} = I \cdot R$).
* As $R$ increases, the voltage reaching the robotic station drops below its minimum operating threshold:
$$V_{\text{station}} = V_{\text{source}} - I \cdot R$$
* High resistance also increases power dissipation as heat ($P_{\text{loss}} = I^2 R$) within the cables, reducing power delivery efficiency.

##### B. Disruption of Signal Communication
Digital control signals are transmitted as high/low voltage levels (e.g., $5\text{ V}$ for Logic 1, $0\text{ V}$ for Logic 0).
* **Signal Attenuation**: The increased resistance forms a voltage divider with the receiver''s input impedance, severely attenuating the signal amplitude.
* **RC Delay**: Cable resistance ($R$) combined with line capacitance ($C$) increases the time constant ($\tau = R \cdot C$). This slows down the signal rise and fall times, distorting square pulses and causing communication errors.

```
   Ideal Digital Pulse:   |‾‾‾|   -->  RC Distorted Pulse:   /‾‾\
```

#### 2. Technically Reasoned Corrective Approach
1. **Immediate Cable Replacement**: Replace degraded segments with high-grade, corrosion-resistant copper cables (preferably shielded twisted pair for signal lines).
2. **Separate Power and Signal Lines**: Running high-current power and high-frequency digital signals on the same physical line is prone to interference. Separating power cables from signal lines prevents noise injection.
3. **Use Differential Signaling**: Transition to protocols like CAN bus or RS-485 that use differential voltage signaling, which is highly immune to line resistance and noise.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q13', 13),
  ('bee00000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000008', 'A coastal weather station sends atmospheric data to a research center using an electromagnetic radio communication system. Recently the system has experienced delayed signal reception and reduced signal strength during data transmission, particularly when large datasets are transmitted at high frequency intervals. Engineers suspect that bandwidth limitations and environmental interference are affecting the signal propagation and transmission reliability across the long communication path. Diagnose the probable technical factors responsible for the observed signal degradation and transmission delays in the communication system. Interpret how bandwidth constraints, attenuation and propagation distance collectively influence signal transmission performance in this scenario.

*(5 Marks - [Ap/P, 3])*', '### Topic: Wireless Signal Degradation Factors
**Difficulty Level**: Hard (Analytical)

#### 1. Diagnosis of Technical Factors

##### A. Attenuation (Signal Strength Loss)
* As radio waves propagate through the atmosphere, they experience **attenuation** (signal strength loss) due to free-space path loss (inverse square law: $P_r \propto 1/d^2$) and absorption/scattering by coastal humidity, fog, and rain.
* This reduces the signal-to-noise ratio (SNR) at the receiver, making it difficult to decode the signal without error.

##### B. Bandwidth Constraints & Transmission Delays
* **Shannon-Hartley Theorem**:
$$C = B \log_2\left(1 + \text{SNR}\right)$$
Where $C$ is channel capacity (bps) and $B$ is bandwidth (Hz).
* When sending large datasets at high frequency intervals, if the data rate exceeds the channel capacity ($C$), packets must be queued, resulting in **transmission delays** (latency).
* Low SNR due to attenuation forcing the system to fall back to simpler, slower modulation schemes to maintain reliability, further reducing data throughput.

```mermaid
graph TD
    Rain[Rain / Humidity / Distance] -->|Increases| Att[Attenuation]
    Att -->|Lowers| SNR[Signal-to-Noise Ratio]
    SNR -->|Lowers| Cap[Channel Capacity C]
    Cap -->|Causes| Delay[Queueing & Transmission Delays]
```

#### 2. Combined Impact Interpretation
The combination of long propagation distance, atmospheric attenuation, and high data rates overwhelms the limited channel bandwidth. Low signal power forces retransmissions of corrupted packets, compounding the transmission delay and degrading reliability.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q14', 14),
  ('bee00000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000008', 'An automated greenhouse complex distributes electrical energy from a central solar inverter to multiple climate-control subsystems using copper conductors arranged in radial circuits. Engineers observe that distant irrigation controllers receive lower voltage compared with units closer to the inverter because of resistance along the conductors. Sensors also transmit control signals as voltage variations across the same network. The design team must decide whether to redesign the conductor layout to maintain reliable power and signal transport. The objective is to ensure stable electrical energy transmission and accurate signal propagation across the entire facility. Analyze the electrical transmission situation and determine how the interaction of current, voltage, and resistance influences both power delivery and signal transport in the greenhouse network. Formulate a technically justified redesign strategy that improves transmission reliability while preserving signal integrity across distant subsystems.

*(5 Marks - [Ap/P, 3])*', '### Topic: Network Redesign for Power & Signal Distribution
**Difficulty Level**: Hard (Analytical)

#### 1. Analysis of Current, Voltage, and Resistance Interactions
1. **Ohm''s Law ($V = I \cdot R$)**: The copper conductors have a finite resistance per unit length ($R = \rho L / A$). For distant subsystems (large $L$), the resistance $R$ is significant.
2. **Voltage Drop**: When current ($I$) flows to power the climate controllers, it creates a voltage drop along the cable:
$$V_{\text{drop}} = I_{\text{load}} \cdot R_{\text{cable}}$$
As a result, the voltage at the end of the radial circuit is lower than the source voltage ($V_{\text{load}} = V_{\text{source}} - V_{\text{drop}}$).
3. **Signal Distortion**: Using the same conductors for power and analog signals causes **cross-talk** and ground-loop noise. Fluctuations in the power load current alter the reference ground voltage, distorting the signal voltage and causing reading errors.

```
  Inverter [V_source] ===== (R_cable) ===== [V_load] Distant Controller
                                               |
                                               v (Draws current I, causing drop)
```

#### 2. Technically Justified Redesign Strategy
* **Separate Power and Signal Routing**:
  * Run separate, dedicated heavy-gauge wires for power distribution and shielded twisted-pair cables for signal lines. This prevents power fluctuations from affecting signals.
* **Increase Conductor Cross-Sectional Area ($A$)**:
  * Use thicker copper wire (lower AWG) for the power lines to reduce $R_{\text{cable}}$ ($R = \rho L / A$), reducing voltage drop.
* **Transition to Current Loop (4-20 mA) Signaling**:
  * For analog sensors, replace voltage signaling with a **4-20 mA current loop**. Current loops are immune to line resistance and voltage drops over long distances, preserving signal integrity.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q15', 15),
  ('bee00000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000008', 'A robotic manufacturing line uses mechanical motion sensors attached to rotating shafts to detect equipment vibrations. The mechanical signals generated by these sensors must be transmitted to a digital control system that analyzes machine health in real time. Engineers install transducers that convert mechanical vibrations into electrical signals before sending them through electronic circuits to the monitoring computer. Determine the engineering rationale behind introducing transducers in the robotic monitoring system and recommend how mechanical-to-electrical signal conversion improves transmission efficiency and data processing capability in this industrial setup.

*(5 Marks - [Ap/P, 3])*', '### Topic: Role of Transducers in Industrial Automation
**Difficulty Level**: Medium (Conceptual)

#### 1. Rationale for Transducers
A **transducer** is a device that converts physical energy (e.g., mechanical vibration, pressure, temperature) into electrical energy (voltage, current, or frequency).
* **The Problem**: Mechanical vibrations cannot be transmitted over distances, nor can they be processed by digital microprocessors directly.
* **The Solution**: Converting vibrations into electrical signals makes them compatible with modern electronic and computer architectures.

#### 2. Improvements in Transmission Efficiency and Processing

```mermaid
graph LR
    Vib[Vibration] -->|Mechanical Force| Trans[Piezoelectric Transducer]
    Trans -->|Electrical Signal| Amp[Amplifier / Filter]
    Amp -->|Analog Voltage| ADC[Analog-to-Digital Converter]
    ADC -->|Digital Signal| PC[Monitoring Computer]
```

1. **Transmission Efficiency**: Electrical signals (especially when converted to current loops or digital packets) can travel long distances through wires or wireless links with minimal attenuation and high immunity to physical interference.
2. **Filtering and Conditioning**: Once converted to an electrical signal, the vibration data can be easily filtered to remove unwanted noise (such as building vibrations) using electronic band-pass filters.
3. **Digital Processing Capability**: An electrical analog signal can be sampled by an Analog-to-Digital Converter (ADC). The digital system can then perform advanced real-time analysis, such as Fast Fourier Transforms (FFT), to detect bearing wear and predict failures before they occur.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q16', 16),
  ('bee00000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000008', 'Engineers testing early audio amplifiers noticed that diode-based rectifiers produced signal distortion during high-frequency oscillations. They needed to adjust the circuit to minimize waveform alteration while maintaining voltage rectification efficiency. Question: Infer how the engineers should modify the vacuum tube configuration to reduce distortion.

*(3 Marks - [U/C, 2])*', '### Topic: Vacuum Tube Rectifier Modification
**Difficulty Level**: Hard (Historical / Analytical)

#### 1. Cause of High-Frequency Distortion
In early diode-based rectifiers (both vacuum tube and early semiconductor), high-frequency signal distortion was caused by **junction capacitance** (in semiconductors) or **interelectrode capacitance** and **space charge effects** (in vacuum tubes). 
During high frequencies, the tube''s anode-cathode capacitance ($C_{ac}$) acts as a low-impedance path, allowing AC leakage during the reverse-bias cycle, degrading rectification.

#### 2. Recommended Configuration Modification
To reduce distortion at high frequencies:
1. **Reduce Plate (Anode) Surface Area**: Minimizing the physical size of the anode reduces the interelectrode capacitance:
$$C = \frac{\epsilon A}{d}$$
2. **Increase Interelectrode Spacing ($d$)**: Placing the anode further from the cathode reduces capacitance, though it requires a higher operating voltage.
3. **Use a Shield Grid (Transition to Tetrode/Pentode Configuration)**: Introducing a grounded screen grid between the control grid and the anode isolates the input from the output, reducing capacitance and eliminating high-frequency distortion.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q17', 17),
  ('bee00000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000008', 'A telegraph system experienced signal fading due to insufficient electron flow in its vacuum tube amplifiers. Engineers needed a simple adjustment to enhance conduction without redesigning circuits. Question: Recommend a quick operational adjustment to improve signal strength.

*(2 Marks - [U/C, 1])*', '### Topic: Vacuum Tube Conduction Optimization
**Difficulty Level**: Easy (Conceptual)

#### 1. Recommended Operational Adjustment
To quickly increase electron flow (thermionic emission) and boost amplifier gain without modifying the circuit layout:
* **Increase the Filament Heating Voltage / Current**:
$$\text{Filament Temperature (T)} \propto I_{\text{filament}}^2$$

#### 2. Physical Rationale (Richardson-Dushman Equation)
According to the Richardson-Dushman law, the emission current density ($J$) from a metal cathode depends exponentially on temperature ($T$):
$$J = A T^2 e^{-\frac{\Phi}{k T}}$$
Raising the filament voltage increases the cathode temperature. This provides more thermal energy to the electrons, allowing them to overcome the cathode''s work function ($\Phi$) and significantly increasing electron flow (anode current), which restores signal amplification.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q18', 18),
  ('bee00000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000008', 'A designer used a PN junction diode in a signal demodulation circuit and needed to ensure that forward conduction occurred efficiently while reverse bias prevented backflow. Question: Prioritize design considerations to optimize diode operation in signal processing.

*(3 Marks - [U/C, 2])*', '### Topic: Demodulation Diode Optimization
**Difficulty Level**: Medium (Conceptual)

#### 1. Design Priorities for Demodulation Diodes
In signal demodulation (e.g., AM radio envelope detection), a diode must switch rapidly and have a sharp conduction transition. The design considerations should be prioritized as follows:

```mermaid
graph TD
    P1[Priority 1: Reverse Recovery Time trr] -->|Determines| HighFreq[High-Frequency Switching Capability]
    P2[Priority 2: Barrier Potential Vγ] -->|Determines| Sens[Low-Amplitude Signal Sensitivity]
    P3[Priority 3: Junction Capacitance Cj] -->|Prevents| Leak[High-Frequency AC Leakage]
```

1. **Reverse Recovery Time ($t_{rr}$)**: *High Priority*. The diode must turn OFF instantly when the carrier wave reverses bias. A long $t_{rr}$ causes reverse leakage, smoothing out and distorting the recovered audio envelope.
2. **Cut-in / Barrier Voltage ($V_{\gamma}$)**: *Medium Priority*. For low-power RF signals, a Germanium diode ($V_{\gamma} \approx 0.2-0.3\text{ V}$) is preferred over Silicon ($0.7\text{ V}$) to prevent clipping of weak signals.
3. **Junction Capacitance ($C_j$)**: *Low Priority*. Must be minimized to prevent high-frequency RF carrier signals from bypassing the diode through capacitive leakage.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q19', 19),
  ('bee00000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000008', 'A rectifier circuit experienced inefficient energy conversion due to improper diode selection. Engineers had to adjust diode choice to improve AC to DC conversion efficiency. Formulate a method to enhance rectification efficiency using diode characteristics.

*(2 Marks - [U/C, 1])*', '### Topic: Diode Rectification Efficiency
**Difficulty Level**: Easy (Conceptual)

#### 1. Method to Enhance Rectification Efficiency
To optimize AC-to-DC conversion, engineers must choose diodes based on these key electrical characteristics:
1. **Low Forward Voltage Drop ($V_F$)**: Select a diode with minimal $V_F$ (e.g., a **Schottky Diode** with $V_F \approx 0.15-0.3\text{ V}$ instead of standard Silicon with $0.7\text{ V}$). This minimizes power dissipation ($P_{\text{loss}} = I \cdot V_F$) as heat, boosting efficiency.
2. **Low Reverse Leakage Current ($I_R$)**: Choose a diode with high reverse resistance to prevent power backflow during the negative half-cycle.
3. **Fast Reverse Recovery Time ($t_{rr}$)**: Minimizes conduction overlap during switching, reducing switching energy losses.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q20', 20),
  ('bee00000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000008', 'During a power regulation study, technicians observed that electron emission from vacuum tube cathodes varied with ambient temperature, affecting amplifier stability. They needed a method to maintain consistent current flow despite environmental changes. Question: Prioritize design adjustments to stabilize vacuum tube operation under varying temperatures.

*(3 Marks - [U/C, 2])*', '### Topic: Vacuum Tube Thermal Stabilization
**Difficulty Level**: Hard (Analytical)

#### 1. Cause of Instability
Cathode thermionic emission is highly sensitive to filament temperature. Changes in ambient temperature alter the heat dissipation rate of the tube envelope, causing fluctuations in cathode temperature and tube gain.

#### 2. Prioritized Design Adjustments
To stabilize operation:
1. **Constant Current Filament Supply**: *Top Priority*. Power the filament using a regulated constant-current source rather than constant-voltage. This ensures the filament power ($P = I^2 R$) and temperature remain constant even as filament resistance changes with temperature.
2. **Negative Feedback**: *High Priority*. Introduce negative feedback in the amplifier biasing circuit (e.g., cathode self-biasing using a resistor). If tube current increases due to temperature, the voltage drop across the cathode resistor increases, making the grid more negative and limiting current.
3. **Thermal Shielding/Enclosures**: *Medium Priority*. Use metal shielding cans to shield the tubes from draft and ambient temperature fluctuations.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q21', 21),
  ('bee00000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000008', 'Early experimental amplifiers suffered from inconsistent gain due to uncontrolled electron flow across the triode vacuum tubes. Technicians had to improve circuit stability with minimal component changes. Question: Formulate a method to stabilize triode operation efficiently.

*(2 Marks - [U/C, 1])*', '### Topic: Triode Gain Stabilization
**Difficulty Level**: Medium (Conceptual)

#### 1. Method: Cathode Self-Biasing (Degenerative Feedback)
The most efficient method to stabilize a triode amplifier with minimal components is to introduce **Cathode Self-Biasing** by adding a resistor ($R_k$) and bypass capacitor ($C_k$) in series with the cathode.

```
       Anode (Plate)
            |
         --[ ]-- (Triode Tube)
       g ---|
         ---o--- Cathode
            |
            +---[ Rk ]---+
            |            |
            +---[ Ck ]---+
            |
           GND
```

#### 2. Stabilization Mechanism
* If the anode current ($I_a$) increases due to temperature or supply voltage drift:
* The voltage at the cathode ($V_k = I_a \cdot R_k$) increases.
* Since the grid voltage is held near ground, this makes the grid-to-cathode voltage ($V_{gk}$) **more negative**.
* A more negative grid repels electrons, reducing the anode current back to the set operating point, stabilizing the gain.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q22', 22),
  ('bee00000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000008', 'During a protective circuit test, engineers noticed that applying a reverse voltage across a PN junction diode resulted in very small leakage current. They needed to quantify how built-in potential and minority carriers limited current under reverse bias. Infer the reasons for minimal current flow under reverse voltage.

*(3 Marks - [U/C, 2])*', '### Topic: PN Junction Reverse Bias Physics
**Difficulty Level**: Medium (Conceptual)

#### 1. Depletion Region Expansion
When a reverse bias voltage ($V_R$) is applied:
* The positive terminal of the source pulls free electrons in the n-region away from the junction.
* The negative terminal pulls holes in the p-region away from the junction.
* This widens the **depletion region**, increasing the built-in potential barrier ($V_0 + V_R$). The majority carriers (electrons in n, holes in p) cannot overcome this barrier, stopping majority current flow.

#### 2. Source of Reverse Leakage Current ($I_0$)
The small remaining leakage current (nanoamperes for Silicon) is carried by **minority carriers**:
* Thermally generated minority electrons in the p-region and minority holes in the n-region.
* Because the reverse electric field points from n to p, it acts as an **accelerating field** for these minority carriers, pushing them across the junction.
* Because minority carrier density is limited by temperature and is very small under normal conditions, the resulting leakage current is tiny and independent of the reverse voltage magnitude until breakdown is reached.

```mermaid
graph LR
    subgraph Reverse Bias
    P[P-Region] -->|Holes pulled away| Left[Left]
    N[N-Region] -->|Electrons pulled away| Right[Right]
    Dep[Widen Depletion Region] -->|Blocks| Maj[Majority Carriers]
    Therm[Thermal Generation] -->|Minority Carriers| Leak[Small Leakage Current I0]
    end
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q23', 23),
  ('bee00000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000008', 'Engineers noted that in a protection circuit, a PN junction diode prevented voltage spikes from damaging sensitive components. Recommend a practical method to implement the diode for unidirectional protection.

*(2 Marks - [U/C, 1])*', '### Topic: Diode Protection Circuits
**Difficulty Level**: Easy (Conceptual)

#### 1. Recommended Method: Flyback / Free-Wheeling Diode
To protect sensitive components (like microcontrollers or driving transistors) from high inductive voltage spikes (back EMF) generated when switching inductive loads (such as relays, motors, or solenoids):
* Connect the PN junction diode in **reverse-parallel (anti-parallel)** across the inductive load.

```
       VCC
        |
        +-------+--------+
        |       |        |
       [D]     ( ) Inductive Load
      Diode     |  (Relay/Motor)
      Reverse   |        |
      Biased    +--------+
        |       |
        +-------+
                |
             [Transistor Switch]
                |
               GND
```

#### 2. Protection Mechanism
* **Normal Operation**: The diode is reverse-biased and behaves like an open circuit.
* **Switch Turn-Off**: When the switch turns OFF, the inductor''s magnetic field collapses, generating a high-voltage spike ($V = -L \frac{di}{dt}$) of reverse polarity. The diode becomes **forward-biased**, providing a safe path to dissipate the current, protecting the transistor switch.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q24', 24),
  ('bee00000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000008', 'Early computer processors used vacuum tubes to control electricity but faced operational limits because tubes were bulky and slow. The transition to solid-state semiconductors changed computer design. Determine the limits of vacuum tubes and justify the transition to semiconductors.

*(5 Marks - [An/C, 2])*', '### Topic: Vacuum Tubes vs. Semiconductors
**Difficulty Level**: Medium (Conceptual)

#### 1. Limitations of Vacuum Tubes
1. **Size and Weight**: Tubes are bulky glass envelopes requiring significant physical space.
2. **High Power Consumption & Heat**: They require high filament power to heat the cathode (thermionic emission), generating massive waste heat.
3. **Low Reliability & Short Lifespan**: Filaments burn out over time (like light bulbs).
4. **Slow Switching Speed**: Transit time of electrons in vacuum and high interelectrode capacitance limit operation speed to kilohertz/low megahertz.

```mermaid
graph TD
    subgraph Vacuum Tube Limits
    Bulky[Bulky & Heavy]
    Hot[High Heat / Wasted Energy]
    Fail[Burn-outs / Low Reliability]
    end
    subgraph Semiconductor Advantages
    Micro[Microscopic Scale]
    Cool[Low Power / No Filament]
    Solid[Solid-State / High Lifespan]
    end
    Vacuum Tube Limits -->|Justifies Transition| Semiconductor Advantages
```

#### 2. Justification for the Semiconductor Transition
1. **No Filament / Low Power**: Semiconductors operate without thermal heating, saving energy and producing negligible heat.
2. **Extreme Miniaturization**: Transistors can be fabricated at microscopic scales, enabling billions of switches on a single chip.
3. **Solid-State Durability**: No moving parts or filaments, resulting in near-infinite lifespans under normal conditions.
4. **High Speed**: Carrier transport in solid state is extremely fast, supporting gigahertz switching speeds.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q25', 25),
  ('bee00000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000008', 'A designer makes a diode network for waveform control. The goal is to limit peak voltages and shift reference levels. Determine the diode configurations needed to accomplish this.

*(5 Marks - [Ap/C, 2])*', '### Topic: Diode Clipper and Clamper Circuits
**Difficulty Level**: Medium (Analytical)

#### 1. Peak Voltage Limiting: Diode Clippers
* **Goal**: Chop off portions of the input signal above or below a certain reference level.
* **Configuration**: Place diodes in series or parallel with the load, often combined with DC reference bias voltages.
  * **Positive Clipper**: When input voltage exceeds bias ($V_{in} > V_{\text{ref}} + 0.7\text{ V}$), the diode conducts, clipping the positive peak.

```
       Input (AC) --------[ Resistor ]-------+-------- Output
                                             |
                                            [D] Diode (cathode pointing up)
                                             |
                                          [V_ref] DC Bias
                                             |
                                            GND
```

#### 2. Reference Level Shifting: Diode Clampers
* **Goal**: Shift the AC signal''s DC reference level (offset) without changing the waveform shape.
* **Configuration**: A capacitor in series, with a diode and resistor in parallel with the load.
  * **Positive Clamper**: Shifts the entire signal upwards so the negative peaks are clamped to $0\text{ V}$ or a reference level. The capacitor charges to the peak AC voltage during the negative half-cycle and acts as a DC series source.

```mermaid
graph LR
    AC[AC Waveform] --> Clipper[Clipper Circuit] --> Clipped[Peaks Limited / Chopped]
    AC --> Clamper[Clamper Circuit] --> Clamped[Waveform shifted up or down]
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q26', 26),
  ('bee00000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000008', 'Early satellite communication systems faced problems with vacuum tube amplifiers due to weight, power, and high-voltage requirements. The switch to semiconductor diodes and transistors solved these problems. Analyze the impact of semiconductors in space systems.

*(5 Marks - [An/C, 2])*', '### Topic: Semiconductors in Space Applications
**Difficulty Level**: Hard (Analytical)

#### 1. Vacuum Tube Problems in Satellites
* **Weight**: Heavy power transformers are needed to step up voltages (kilovolts) for tube plates.
* **Power Constraints**: Solar panels must be massive to supply power to cathode filaments.
* **High Voltage Risk**: High voltages in vacuum increase the risk of electrical arcing and corona discharge in space.

#### 2. Semiconductor Solution Impact

```mermaid
graph TD
    Weight[Weight Reduction] --> Space[Lower Launch Cost]
    LowV[Low-Voltage Operation] --> Arc[No Electrical Arcing Risk]
    Reliable[Radiation-Hardened Solid-State] --> Life[Extended Satellite Lifespan]
```

1. **Mass Reduction**: Semiconductor components are extremely lightweight, reducing launch costs.
2. **Low Voltage Operation**: Diodes and transistors operate at low voltages ($1.2 - 12\text{ V}$), eliminating high-voltage safety hazards.
3. **Power Efficiency**: Minimal power consumption allows smaller solar panel configurations.
4. **Reliability**: Radiation-hardened solid-state components can survive the harsh environment of space for decades without filament degradation.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q27', 27),
  ('bee00000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000008', 'A communication receiver needs to shift AC signals to positive voltage levels. The designer uses a diode clamping circuit. Formulate the circuit behavior and explain the shift.

*(5 Marks - [Ap/C, 2])*', '### Topic: Diode Clamping Circuit Operation
**Difficulty Level**: Hard (Analytical)

#### 1. Clamping Circuit Design (Positive Clamper)
The circuit consists of:
* A series capacitor ($C$)
* A parallel diode ($D$) connected to ground (pointing upwards)
* A high-resistance discharge resistor ($R_L$) in parallel with the diode.

```
       In ------[ Capacitor C ]------+------ Out
                                     |
                                    /\  Diode D (pointing up)
                                   /  \
                                     |
                                    GND
```

#### 2. Detailed Circuit Behavior (Transient & Steady State)
1. **Negative Half-Cycle**: When $V_{\text{in}}$ goes negative, the diode is forward-biased, acting as a short circuit. The capacitor charges rapidly to the peak input voltage ($V_p$):
$$V_C = V_p$$
2. **Positive Half-Cycle**: When $V_{\text{in}}$ goes positive, the diode is reverse-biased, acting as an open circuit. The capacitor cannot discharge quickly due to the high resistance of $R_L$.
3. **The Shift**: The output voltage is the sum of the input voltage and the stored capacitor voltage:
$$V_{\text{out}} = V_{\text{in}} + V_C = V_{\text{in}} + V_p$$
This shifts the entire waveform upwards by $+V_p$, making the minimum value $0\text{ V}$ and the maximum value $2V_p$, successfully shifting the AC signal into positive territory.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q28', 28),
  ('bee00000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000008', 'A temperature sensor uses a thermistor made of doped semiconductor material. The resistance decreases as temperature rises. Formulate the relationship between doping, temperature, and conductivity.

*(5 Marks - [Ap/C, 2])*', '### Topic: Semiconductor Thermal Behavior & Thermistors
**Difficulty Level**: Hard (Analytical)

#### 1. Energy Band Explanation (Negative Temperature Coefficient - NTC)
In semiconductors, the valence band (VB) and conduction band (CB) are separated by a small band gap ($E_g$).
* As temperature ($T$) increases, thermal energy excites electrons across the gap from the VB to the CB.
* This dramatically increases the carrier concentration ($n$ and $p$), which exponentially increases the conductivity ($\sigma$) and reduces resistivity:
$$\sigma = e(n\mu_n + p\mu_p)$$
$$\rho(T) = \rho_0 e^{\beta \left(\frac{1}{T} - \frac{1}{T_0}\right)}$$

#### 2. Role of Doping
* **Doping** (adding impurities) introduces donor/acceptor energy levels near the CB/VB.
* Doping allows tuning of the initial carrier concentration and temperature sensitivity ($\beta$). It ensures the thermistor operates reliably in specific temperature ranges, providing linear temperature-resistance feedback.

```mermaid
graph TD
    Temp[Temperature Rises] -->|Thermal Energy| Exc[Electrons jump Valence to Conduction Band]
    Exc -->|Exponential Increase| Carr[Carrier Concentration n, p]
    Carr -->|Increases| Cond[Conductivity σ]
    Cond -->|Decreases| Res[Resistance R]
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q29', 29),
  ('bee00000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000008', 'A high-frequency rectifier experiences power losses at megahertz frequencies. Engineers find the diode does not switch off fast enough due to stored charge. Suggest a method to reduce stored charge effects.

*(5 Marks - [Ap/C, 2])*', '### Topic: High-Frequency Rectification & Stored Charge
**Difficulty Level**: Hard (Analytical)

#### 1. The Problem: Diffusion Capacitance and Reverse Recovery
In a standard PN junction diode, when forward-biased, minority carriers accumulate near the junction (stored charge).
* When bias reverses, these stored charges must be swept back before the diode can turn off.
* This causes a transient reverse current during the **reverse recovery time** ($t_{rr}$), leading to high switching power losses ($P = V_R \cdot I_{\text{reverse}}$) at high frequencies.

#### 2. Methods to Reduce Stored Charge Effects

```mermaid
graph LR
    A[Reduce trr] --> B[Dope with Gold/Platinum: Recombination centers]
    A --> C[Use Schottky Diode: Metal-semiconductor junction, zero minority carriers]
```

1. **Use a Schottky Diode**: Schottky diodes use a metal-semiconductor junction instead of a PN junction. Because conduction relies solely on majority carriers, there is **zero stored minority charge**. This reduces $t_{rr}$ to picoseconds, virtually eliminating switching losses.
2. **Gold Doping**: Doping the silicon with gold or platinum introduces recombination centers in the band gap, accelerating the recombination of stored minority carriers during turn-off.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q30', 30),
  ('bee00000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000008', 'A semiconductor manufacturing process creates p-type and n-type regions in a silicon wafer to form diodes. Explain the roles of trivalent and pentavalent impurities in doping.

*(5 Marks - [Ap/C, 2])*', '### Topic: Semiconductor Doping & Impurities
**Difficulty Level**: Medium (Conceptual)

#### 1. Pentavalent Impurities (n-type Doping)
* **Impurities**: Phosphorus (P), Arsenic (As), Antimony (Sb).
* **Role**: These atoms have 5 valence electrons. When they substitute for a Silicon atom (4 valence electrons) in the lattice:
  * 4 electrons form covalent bonds with adjacent Si atoms.
  * The **5th electron** is weakly bound and easily detached by thermal energy, becoming a free electron in the conduction band.
  * **Result**: Increases free electron concentration ($n \gg p$), creating an **n-type semiconductor**.

```
       Si       Si
        \       /
    Si = [ P ] = Si  <-- Free 5th electron
        /       \
       Si       Si
```

#### 2. Trivalent Impurities (p-type Doping)
* **Impurities**: Boron (B), Aluminum (Al), Gallium (Ga).
* **Role**: These atoms have 3 valence electrons. When they substitute in the Si lattice:
  * They can only form 3 covalent bonds.
  * The missing bond creates a **vacancy (hole)** in the valence band that can accept an electron.
  * **Result**: Increases hole concentration ($p \gg n$), creating a **p-type semiconductor**.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q31', 31),
  ('bee00000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000008', 'A diode in a power supply breaks down under peak inverse voltage. Suggest a method to prevent breakdown and enhance diode stability.

*(5 Marks - [Ap/C, 2])*', '### Topic: Diode Breakdown Mitigation
**Difficulty Level**: Hard (Analytical)

#### 1. Mechanism of Breakdown
Under high reverse voltage, the electric field across the depletion region accelerates free carriers to high velocities, triggering **Avalanche Breakdown** through collision ionization, which can destroy the diode.

#### 2. Methods to Prevent Breakdown
1. **Series Diode Stacking**: Connect two or more diodes in series. This divides the peak inverse voltage (PIV) across multiple junctions:
$$V_{\text{PIV, total}} = V_{\text{PIV, 1}} + V_{\text{PIV, 2}}$$

```
       AC Line -----[ Diode 1 ]-----[ Diode 2 ]-----+----- Load
```

2. **Transient Voltage Suppressor (TVS) / Varistor**: Place a TVS diode or varistor in parallel with the rectifier diode to clamp high-voltage spikes before they reach the diode.
3. **Select High Peak Inverse Voltage (PIV) Diodes**: Ensure the diode''s PIV rating is at least $1.5 \times - 2\times$ the peak AC voltage of the circuit.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q32', 32),
  ('bee00000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000008', 'An industrial temperature sensor outputs a noisy millivolt signal. Formulate the signal conditioning stages to amplify, filter, and route the signal.

*(3 Marks - [Ap/C, 2])*', '### Topic: Signal Conditioning Stages
**Difficulty Level**: Medium (Conceptual)

#### 1. Recommended Signal Conditioning Flow
To process a noisy, low-voltage (mV) temperature signal (e.g., from a thermocouple):

```mermaid
graph LR
    Noisy[Noisy mV Signal] --> Amp[1. Instrumentation Amplifier]
    Amp --> Filter[2. Low-Pass Filter]
    Filter --> Mux[3. Multiplexer/Routing]
    Mux --> ADC[ADC / Monitor]
```

1. **Stage 1: Amplification (Instrumentation Amplifier)**: Boosts the millivolt signal to a standard range (e.g., 0-5 V) using a high Common-Mode Rejection Ratio (CMRR) amplifier to eliminate common-mode noise.
2. **Stage 2: Filtering (Active Low-Pass Filter)**: Attenuates high-frequency electromagnetic noise and power line interference ($50/60\text{ Hz}$), allowing only the slow temperature changes to pass.
3. **Stage 3: Routing (Multiplexer/Buffer)**: Buffers and routes the clean signal to the microcontroller''s Analog-to-Digital Converter (ADC) for digitization.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q33', 33),
  ('bee00000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000008', 'A digital control system receives fluctuating temperature readings. The sensor output is unconditioned. Infer the consequences of not conditioning the sensor signal.

*(2 Marks - [An/C, 2])*', '### Topic: Unconditioned Signal Consequences
**Difficulty Level**: Easy (Conceptual)

#### 1. Consequences of Lack of Conditioning
1. **Inaccurate Data**: Noisy signals lead to unstable digital readings (jitter), which can cause the controller to make incorrect or erratic decisions.
2. **Aliasing Errors**: If the signal is not passed through an anti-aliasing low-pass filter before digitization, high-frequency noise will be folded back into the lower frequency spectrum, corrupting the temperature data.
3. **Damage/Overload**: Large voltage surges can directly damage the ADC inputs without overvoltage protection and isolation.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q34', 34),
  ('bee00000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000008', 'A transistor amplifier experiences signal distortion at high frequencies. Formulate the relationship between gain, frequency, and capacitance in the transistor.

*(3 Marks - [An/C, 2])*', '### Topic: Transistor High-Frequency Response
**Difficulty Level**: Hard (Analytical)

#### 1. Gain-Frequency-Capacitance Relationship
In a BJT amplifier, the high-frequency response and gain drop-off are dominated by internal **junction capacitances**:
* **Base-emitter junction capacitance ($C_{be}$)**.
* **Collector-base junction capacitance ($C_{cb}$)**.

```mermaid
graph TD
    Freq[High Frequencies] -->|Lowers Impedance| Cap[Junction Capacitances Cbe, Ccb]
    Cap -->|Bypasses / Shunts| Sig[Input Signal to GND]
    Cap -->|Miller Effect| Boost[Amplifies Feedback Capacitance]
    Boost -->|Reduces| Gain[Voltage Gain Av]
```

#### 2. The Miller Effect
According to Miller''s Theorem, the effective input capacitance is boosted by the voltage gain ($A_v$) of the stage:
$$C_{\text{in(Miller)}} = C_{cb}(1 - A_v)$$
This large capacitance forms a low-pass filter with the source resistance ($R_s$), rolling off high frequencies and reducing the amplifier gain ($A_v$) at high frequencies while introducing phase distortion.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q35', 35),
  ('bee00000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000008', 'A common-emitter amplifier shows clipping in the output waveform. The transistor operates in the saturation region at peak input signals. Explain the cause of clipping.

*(2 Marks - [An/C, 2])*', '### Topic: Amplifier Clipping & Saturation
**Difficulty Level**: Easy (Conceptual)

#### 1. Cause of Clipping in Saturation
* **Normal Active Region**: The collector-emitter voltage ($V_{CE}$) varies linearly with the base current ($I_B$): $V_{CE} = V_{CC} - I_C R_C$.
* **Saturation Region**: When the input signal is too large, the base current ($I_B$) pushes the transistor into saturation.
  * In saturation, the collector current reaches its maximum limit:
$$I_{C(\text{sat})} \approx \frac{V_{CC} - V_{CE(\text{sat})}}{R_C}$$
  * $V_{CE}$ drops to its minimum value ($V_{CE(\text{sat})} \approx 0.2\text{ V}$).
  * Even if the input increases further, $V_{CE}$ cannot drop below this limit. The bottom of the output AC wave is flat-lined (clipped) at $V_{CE(\text{sat})}$, causing harmonic distortion.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q36', 36),
  ('bee00000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000008', 'An industrial automation company installs sensors across a manufacturing line to monitor pressure, temperature, and machine vibration levels. Engineers realize that raw sensor outputs differ widely in voltage level, impedance, and noise characteristics. Without proper signal conditioning, the measurement system could misinterpret these signals and trigger incorrect control actions in the production line. Therefore, the engineering team must evaluate the overall importance of signal conditioning within the measurement architecture before deploying the system in a real industrial environment. Assess the professional significance of signal conditioning in industrial measurement systems and recommend the critical functions it performs to ensure reliable monitoring and control.

*(3 Marks - [U/C, 2])*', '### Topic: Signal Conditioning in Instrumentation (Duplicate)
**Difficulty Level**: Medium (Conceptual)

#### 1. Importance of Signal Conditioning
Raw outputs from sensors (e.g., thermocouples, strain gauges) are typically weak (millivolt range), high impedance, and contaminated with industrial electromagnetic noise. **Signal conditioning** is the process of modifying these raw analog signals to meet the input requirements of data acquisition systems and microcontrollers, ensuring system accuracy and preventing false alarms.

#### 2. Critical Functions of Signal Conditioning

```mermaid
graph LR
    Raw[Raw Sensor Signal] --> Amp[Amplification]
    Amp --> Filter[Filtering]
    Filter --> ISO[Isolation/Linearization]
    ISO --> DAQ[DAQ / Microcontroller]
```

1. **Amplification (Gain)**: Increases signal-to-noise ratio (SNR) by boosting low-amplitude sensor signals (e.g., mV from thermocouple) to standard system levels (e.g., 0-5 V or 4-20 mA).
2. **Filtering (Noise Elimination)**: Attenuates high-frequency electromagnetic interference (EMI) and power line hum (50/60 Hz) using low-pass filters to prevent signal distortion.
3. **Electrical Isolation**: Prevents high-voltage surges from the field from damaging sensitive digital control units, typically using optocouplers.
4. **Linearization**: Converts non-linear sensor outputs into linear relationships to simplify processing.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q37', 37),
  ('bee00000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000008', 'A communication system processes signals from multiple transmitters using a centralized receiver module. Engineers must determine whether adding dedicated signal conditioning circuits for each transmitter improves performance or increases system complexity unnecessarily. The design decision must balance signal quality, circuit efficiency, and scalability when expanding the communication network. Infer how signal conditioning improves communication reliability while reconciling the efficiency trade-offs associated with adding conditioning circuits in large signal processing systems.

*(2 Marks - [R/F, 1])*', '### Topic: Signal Conditioning Trade-offs (Duplicate)
**Difficulty Level**: Medium (Conceptual)

#### 1. Reliability Improvements
Dedicated signal conditioning at each transmitter (source-side conditioning):
* Filters out local noise before it is amplified during transmission.
* Matches impedance, reducing signal reflection and attenuation over long lines.
* Maximizes the signal-to-noise ratio (SNR) for the centralized receiver.

#### 2. Reconciling Trade-offs (Complexity vs. Efficiency)
* **Cost and Complexity**: Adding conditioning circuits to every channel increases component count, space, power consumption, and cost.
* **Design Solution**: In large systems, engineers use a hybrid approach:
  * Place **critical conditioning** (e.g., amplification, basic filtering) locally at the transmitter.
  * Use **multiplexers** to route signals to a single, high-performance conditioning unit at the centralized receiver, balancing cost, space, and signal quality.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q38', 38),
  ('bee00000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000008', 'A transistor amplifier shows gain variations when temperature changes. Explain how biasing networks can stabilize gain.

*(3 Marks - [An/C, 2])*', '### Topic: Transistor Biasing & Stability
**Difficulty Level**: Medium (Conceptual)

#### 1. Temperature Dependency of BJT
A BJT''s operating point (Q-point) is highly dependent on temperature due to:
* **Collector leakage current ($I_{CBO}$)**: Doubles every $10^{\circ}\text{C}$ rise.
* **Base-emitter voltage ($V_{BE}$)**: Decreases by $2\text{ mV/}^{\circ}\text{C}$.
* **Current gain ($\beta$)**: Increases with temperature.
These factors cause the collector current ($I_C$) to drift, potentially driving the transistor into saturation or cutoff and altering amplifier gain.

#### 2. Stabilization using Voltage Divider Biasing
The **Voltage Divider Biasing network** with an emitter resistor ($R_E$) stabilizes the Q-point:

```
        VCC
         |
      +--+-- [ RC ] --+
      |               |
    [ R1 ]         Collector (C)
      |          --[   ]-- (BJT)
      +--- Base ---[   ]
      |          --[   ]--
    [ R2 ]         Emitter (E)
      |               |
      +---------------+--- [ RE ] --- GND
```

* **Feedback Mechanism**: If $I_C$ attempts to rise due to temperature:
  * The voltage across the emitter resistor ($V_E = I_E R_E \approx I_C R_E$) increases.
  * Since the base voltage $V_B$ is fixed by R1 and R2, the base-emitter voltage decreases:
$$V_{BE} = V_B - V_E$$
  * This reduction in $V_{BE}$ lowers the base current ($I_B$), limiting the increase in $I_C$, maintaining gain stability.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q39', 39),
  ('bee00000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000008', 'A communication amplifier has low efficiency because of improper bias selection. Recommend a bias class to improve efficiency.

*(2 Marks - [An/C, 2])*', '### Topic: Amplifier Classes and Efficiency
**Difficulty Level**: Easy (Conceptual)

#### 1. Recommended Class: Class C (or Class B / Push-Pull)
To improve power efficiency in RF communication transmitters:
* **Class C** is recommended for high-frequency, narrow-band RF circuits. Class C transistors conduct for less than $180^{\circ}$ of the input cycle. The remaining waveform is reconstructed by a resonant LC tank circuit, achieving up to **$85\%$ efficiency**.
* **Class B** (or Class AB push-pull configuration) is recommended for audio and wider band applications, conducting for exactly $180^{\circ}$ (or slightly more) of the input cycle and achieving up to **$78.5\%$ efficiency**, far exceeding Class A ($25\% - 50\%$).', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q40', 40),
  ('bee00000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000008', 'A BJT operates under varying base currents. Formulate the conditions that place the transistor in cutoff, active, and saturation regions.

*(5 Marks - [Ap/C, 2])*', '### Topic: BJT Operating Regions
**Difficulty Level**: Medium (Conceptual)

#### 1. The Three Operating Regions of a BJT
A BJT''s operating region is determined by the biasing state of its two junctions: the **Base-Emitter (BE) Junction** and the **Collector-Base (CB) Junction**.

```mermaid
graph TD
    BE{BE Junction Bias?}
    BE -->|Reverse| Cutoff[Cutoff Region: Switch OFF]
    BE -->|Forward| CB{CB Junction Bias?}
    CB -->|Reverse| Active[Active Region: Linear Amp]
    CB -->|Forward| Sat[Saturation Region: Switch ON]
```

##### A. Cutoff Region (Switch OFF)
* **Conditions**: Both junctions are reverse-biased.
  * $V_{BE} < 0.7\text{ V}$ (for Silicon BJT).
  * Base current $I_B = 0$.
* **Consequences**: Collector current $I_C \approx 0$. The transistor behaves as an open switch.

##### B. Active Region (Linear Amplifier)
* **Conditions**: BE junction is forward-biased, and CB junction is reverse-biased.
  * $V_{BE} \approx 0.7\text{ V}$ and $V_{CE} > V_{CE(\text{sat})}$.
* **Consequences**: Collector current is proportional to base current:
$$I_C = \beta I_B$$
The transistor operates as a linear amplifier.

##### C. Saturation Region (Switch ON)
* **Conditions**: Both junctions are forward-biased.
  * $I_B \ge I_{B(\text{min})} = I_{C(\text{sat})} / \beta$.
  * $V_{CE} \approx V_{CE(\text{sat})} \approx 0.2\text{ V}$.
* **Consequences**: Collector current is limited by the external load and independent of $I_B$. The transistor behaves as a closed switch.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q41', 41),
  ('bee00000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000008', 'A power transistor fails due to thermal runaway when driving a heavy load. Explain the cause of thermal runaway and suggest mitigation methods.

*(5 Marks - [An/C, 2])*', '### Topic: Thermal Runaway in BJTs
**Difficulty Level**: Hard (Analytical)

#### 1. Mechanism of Thermal Runaway
Thermal runaway is a self-destructive feedback loop in a BJT:
1. **Heat Generation**: Current flow ($I_C$) and voltage drop ($V_{CE}$) dissipate power as heat ($P_D = I_C V_{CE}$), raising junction temperature ($T_j$).
2. **Leakage Increase**: The collector leakage current ($I_{CBO}$) increases exponentially with $T_j$.
3. **Current Boost**: The total collector current is:
$$I_C = \beta I_B + (\beta + 1)I_{CBO}$$
As $I_{CBO}$ increases, it raises $I_C$.
4. **Positive Feedback**: A higher $I_C$ increases $P_D$, raising temperature further, which increases leakage, starting the cycle again until the transistor burns out.

```mermaid
graph TD
    IC[IC rises] --> Heat[Temp Tj rises]
    Heat --> ICBO[ICBO leakage rises]
    ICBO --> IC
```

#### 2. Mitigation Methods
1. **Use Emitter Resistance ($R_E$)**: Adding $R_E$ provides negative feedback. As $I_C$ rises, the voltage drop $I_E R_E$ rises, reducing $V_{BE}$ and limiting the current increase.
2. **Heat Sinks**: Physically mount the BJT on a metal heat sink to dissipate heat into the air, keeping $T_j$ within safe limits.
3. **Use Thermistor/Diode Compensation**: Use temperature-sensitive components in the bias network to reduce the base current as temperature rises.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q42', 42),
  ('bee00000-0000-0000-0000-000000000043', 'a1000000-0000-0000-0000-000000000008', 'A BJT is used in a circuit where the emitter current is measured as 5.0 mA and the base current is 50 microA. Determine the collector current and current gain beta.

*(5 Marks - [Ap/P, 2])*', '### Topic: BJT Currents and Gain Calculation
**Difficulty Level**: Easy (Numerical)

#### 1. Given Data
* Emitter current, $I_E = 5.0\text{ mA}$
* Base current, $I_B = 50\ \mu\text{A} = 0.05\text{ mA}$

#### 2. Formulas
1. **Current Conservation**:
$$I_E = I_B + I_C \implies I_C = I_E - I_B$$
2. **Current Gain ($\beta$)**:
$$\beta = \frac{I_C}{I_B}$$

#### 3. Step-by-Step Calculation
Find the collector current ($I_C$):
$$I_C = 5.0\text{ mA} - 0.05\text{ mA} = 4.95\text{ mA}$$

Find the current gain ($\beta$):
$$\beta = \frac{4.95\text{ mA}}{0.05\text{ mA}} = 99$$

#### 4. Conclusion
* The collector current is **$4.95\text{ mA}$**.
* The current gain ($\beta$) of the BJT is **$99$**.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q43', 43),
  ('bee00000-0000-0000-0000-000000000044', 'a1000000-0000-0000-0000-000000000008', 'A high-frequency amplifier circuit experiences gain degradation above 50 MHz. The BJT junction capacitances shunted high-frequency signals. Suggest a method to reduce capacitive shunting.

*(5 Marks - [Ap/C, 2])*', '### Topic: High-Frequency Amplifiers & Cascode Configuration
**Difficulty Level**: Hard (Analytical)

#### 1. The Problem: Miller Effect on C_cb
At high frequencies ($>50\text{ MHz}$), the collector-base junction capacitance ($C_{cb}$) of a common-emitter (CE) amplifier feedback paths from output to input, shunting the input signal due to the Miller effect:
$$C_{\text{in(Miller)}} = C_{cb}(1 - A_v)$$

#### 2. Solution: Cascode Amplifier Configuration
To eliminate this capacitive shunting, use a **Cascode Amplifier** configuration, which consists of a **Common-Emitter (CE)** stage driving a **Common-Base (CB)** stage.

```mermaid
graph TD
    In[Input Signal] --> CE[CE Stage: High Current Gain]
    CE -->|Low Input Impedance| CB[CB Stage: High Voltage Gain]
    CB --> Out[Output Signal]
```

* **Why it works**:
  1. The CE stage has a very low load resistance (the low input impedance of the CB stage). Its voltage gain is very small ($A_{v1} \approx -1$).
  2. Because $A_{v1} \approx -1$, the Miller multiplication of $C_{cb}$ in the input stage is minimized ($C_{\text{in}} \approx 2 C_{cb}$), preventing shunting.
  3. The CB stage provides the voltage gain but has no Miller effect because its base is grounded, shielding input from output.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q44', 44),
  ('bee00000-0000-0000-0000-000000000045', 'a1000000-0000-0000-0000-000000000008', 'A digital circuit uses a transistor as a switch. During transition between ON and OFF states, propagation delay occurs. Explain the factors causing delay times.

*(5 Marks - [An/C, 2])*', '### Topic: Transistor Switching Dynamics
**Difficulty Level**: Hard (Analytical)

#### 1. Switching Phase Times
The total propagation delay during BJT switching is divided into turn-on time ($t_{\text{on}}$) and turn-off time ($t_{\text{off}}$).

```
   Input Signal:    |‾‾‾‾‾‾‾‾|           Output Signal (V_CE):   |‾‾‾‾                   _|_                                            \__\___
                  t_on                                            t_off
```

#### 2. Key Factors Causing Delays
1. **Delay Time ($t_d$)**: Time to charge the BE junction capacitance to $0.7\text{ V}$ when switching from cutoff.
2. **Rise Time ($t_r$)**: Time for the collector current to rise from $10\%$ to $90\%$ of its maximum value. Limited by carrier transit time across the base.
3. **Storage Time ($t_s$)**: *Longest delay*. When saturated, the base is flooded with excess minority carriers. When input drops to $0\text{ V}$, these carriers must diffuse out before the transistor can turn off.
4. **Fall Time ($t_f$)**: Time for the collector current to fall from $90\%$ to $10\%$ as junction capacitance discharges.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q45', 45),
  ('bee00000-0000-0000-0000-000000000046', 'a1000000-0000-0000-0000-000000000008', 'An engineer compares BJT and FET for a high-impedance voltage sensor circuit. Explain the difference in input impedance and control mechanisms between BJT and FET.

*(5 Marks - [An/C, 2])*', '### Topic: BJT vs. FET Comparison
**Difficulty Level**: Medium (Conceptual)

#### 1. Control Mechanisms
* **BJT (Bipolar Junction Transistor)**: A **current-controlled** device. A small base current ($I_B$) controls a larger collector current ($I_C$):
$$I_C = \beta I_B$$
* **FET (Field Effect Transistor)**: A **voltage-controlled** device. An electric field generated by the gate-source voltage ($V_{GS}$) controls the drain current ($I_D$):
$$I_D = I_{DSS} \left(1 - \frac{V_{GS}}{V_P}\right)^2$$

#### 2. Input Impedance Comparison

| Characteristic | BJT | FET |
|---|---|---|
| **Control Parameter** | Current ($I_B$) | Voltage ($V_{GS}$) |
| **Input Impedance** | Low to Medium ($1\text{ k}\Omega - 10\text{ k}\Omega$) | Extremely High ($10^9\ \Omega - 10^{12}\ \Omega$) |
| **Current Draw** | Draws continuous base current | Zero gate current (insulated gate) |

#### 3. Rationale for High-Impedance Sensor
* The **FET** is ideal for a high-impedance voltage sensor. Its insulated gate (in MOSFETs) draws negligible current, preventing loading effects and measurement errors in the sensor circuit.', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q46', 46),
  ('bee00000-0000-0000-0000-000000000047', 'a1000000-0000-0000-0000-000000000008', 'A common-emitter BJT circuit operates as an electronic switch. Determine the conditions for saturation and cutoff, and calculate output voltage in both states.

*(5 Marks - [Ap/P, 2])*', '### Topic: BJT as a Switch
**Difficulty Level**: Medium (Analytical)

#### 1. Cutoff State (Switch OPEN)
* **Conditions**: $V_{\text{in}} < 0.7\text{ V}$, so base current $I_B = 0$ and $I_C = 0$.
* **Output Voltage ($V_{\text{out}}$)**:
$$V_{\text{out}} = V_{CE} = V_{CC} - I_C R_C = V_{CC} - 0 = V_{CC}$$
The switch is open, and the output is pulled up to the supply voltage ($V_{CC}$).

#### 2. Saturation State (Switch CLOSED)
* **Conditions**: $V_{\text{in}}$ is high, forcing $I_B \ge I_{C(\text{sat})} / \beta$.
* **Output Voltage ($V_{\text{out}}$)**:
$$V_{\text{out}} = V_{CE(\text{sat})} \approx 0.2\text{ V}$$
The transistor is fully ON, pulling the output voltage to near ground.

```mermaid
graph LR
    Cutoff[Input Low V_in < 0.7V] -->|Open Switch| HighOut[Output = VCC]
    Sat[Input High V_in > 2V] -->|Closed Switch| LowOut[Output = V_CE_sat ≈ 0.2V]
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q47', 47),
  ('bee00000-0000-0000-0000-000000000048', 'a1000000-0000-0000-0000-000000000008', 'A Field Effect Transistor (FET) operates in a voltage sensor circuit. Explain the role of the gate-source voltage in controlling the conduction channel.

*(5 Marks - [An/C, 2])*', '### Topic: FET Operation Principle
**Difficulty Level**: Medium (Conceptual)

#### 1. Electric Field and Conduction Channel (n-channel JFET Example)
* An n-channel JFET consists of an n-type semiconductor channel with p-type regions forming the Gate on either side.
* **V_GS = 0 V**: The channel is wide open, allowing maximum electron flow (drain current $I_{DSS}$) from Source to Drain under a drain-source voltage ($V_{DS}$).
* **V_GS < 0 V (Reverse Bias)**: Applying a negative voltage to the Gate expands the depletion regions around the p-n junctions.
* **Depletion Expansion**: Because the depletion regions contain no free carriers, they compress the conductive n-channel width.
* **Pinch-Off ($V_{GS} = V_P$)**: When the negative gate voltage reaches the pinch-off voltage ($V_P$), the depletion regions meet, pinching off the channel completely and reducing the drain current ($I_D$) to zero.

```
          Source  [ n-channel ]  Drain
                   |   |   |
              [p-Gate] | [p-Gate]  <-- Depletion region expands when V_GS is negative
```', NULL, '22GE004 - Basics of Electronics Engineering', 'Module Test-I Q48', 48)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;
