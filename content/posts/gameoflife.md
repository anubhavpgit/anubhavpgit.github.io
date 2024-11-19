---
title: Conway's Game of Life
date: 12-11-2024
description: Understanding computational models and implementing Conway's Game of Life using simple rules that mimic real-life population dynamics.
draft: false
tag: "#tech, #game"
---
<script type="module" src="/assets/js/gameoflife/main.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

# Computational Universe

Automata theory is a branch of theoretical computer science that deals with abstract machines and the computational problems that can be solved using these machines. Automata are **fundamental units of computation**, mathematical models of a machine that can perform certain computations. Essentialy, they can process input and produce output based on a set of rules. They are used to model and analyze computational systems, study the limits of computation, and explore the properties of formal languages.

Languages are strings of symbols that can be recognized by automata. A language is said to be recognized by an automaton if the automaton accepts all strings in the language and rejects all strings not in the language.

For example, this automaton can be thought of a machine that processes input strings of 0s and 1s and produces an output based on a set of rules, such as:

$f: \{0, 1\}^* \rightarrow \{0, 1\}^*$ 

where $f$ is a function that takes an input string of $0$s and $1$s and produces an output string of $0$s and $1$s, based on the following rules:

- If the input string contains an odd number of 1s, the output string should be 1.
- If the input string contains an even number of 1s, the output string should be 0.

Think of it as the smallest part of a machine, that can operate independently and perform a specific task. Breaking this unit further would lead us nowhere, as it is the smallest indivisible part of a machine that can perform a computation. 

# Conway's Game of Life

Building on automata theory, cellular automata are computational systems used to model complex systems and nonlinear dynamics. They are made up of simple, identical units called cells that evolve in parallel at discrete time steps. The state of each cell is determined by the states of its neighbouring cells, and the cells update their states based on a set of rules. Cellular automata have been used to study a wide range of phenomena, including biological systems, physical processes, and social dynamics.

One of the most fascinating aspects of cellular automata is their ability to exhibit complex and unpredictable behaviour from simple rules. Conway's Game of Life is a simple cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

The main aim of the Game of Life is to simulate the evolution of cells on a grid through simple rules that mimic real-life population dynamics, leading to complex and often surprising behaviours. Specifically, the game explores how simple rules governing individual cells can lead to emergent complexity and patterns over time, including stable structures, oscillating patterns, and even patterns that exhibit motion.

A few rules govern the evolution of the game are as follows:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <canvas id="lessthantwo"  style="border: 1px solid black;"  >
    </canvas>
    <span style="padding: 10px; color: black !important;">
 -->
    </span>
    <canvas id="lessthantwodead"  style="border: 1px solid black;"  >
    </canvas>
</div>

2. Any live cell with two or three live neighbours lives on to the next generation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <canvas id="twoorthree"  style="border: 1px solid black;"   >
    </canvas>
    <span style="padding: 10px; color: black !important;">
 -->
    </span>
    <canvas id="twoorthreelive"  style="border: 1px solid black;"   >
    </canvas>
</div>

3. Any live cell with more than three live neighbours dies, as if by overpopulation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <canvas id="morethanthree"  style="border: 1px solid black;"    >
    </canvas>
    <span style="padding: 10px; color: black !important;">
 -->
    </span>
    <canvas id="morethanthreedead"  style="border: 1px solid black;"    >
    </canvas>
</div>

4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <canvas id="three"  style="border: 1px solid black;">
    </canvas>
    <span style="padding: 10px; color: black !important;">
 -->
    </span>
    <canvas id="threelive"  style="border: 1px solid black;">
    </canvas>
</div>
<br>

The game is played on a two-dimensional grid of cells, each of which can be in one of two states: alive or dead. The game proceeds in discrete steps, with each step representing a generation of cells. At each step, the game applies the rules to each cell in the grid simultaneously, updating the grid to reflect the new state of each cell based on its current state and the states of its neighbours.

## The Game of Life in Action

<div style="text-align: start; width: 100%;">
    <button id="reset">Reset</button>
</div>
<br>
<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
<canvas id="game-of-life"  style="border: 1px solid black;">
</canvas>
</div>
<div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 20px;">
    <input type="range" id="grid-slider" name="speed" min="5" max="15" value="10">
    <label for="speed" style="margin-top: 10px;">Grid</label>
    <span id="time" style="margin-top: 10px;"></span>
    <span id="population" style="margin-top: 10px;"></span>
</div>

<div class="container" style="display: flex; align-items: center; justify-content: start; margin-top: 20px;">
    <label for="speed" style="margin-right: 10px;">Speed </label>
    <input type="range" id="speed-slider" name="speed" min="1" max="10" value="1">
</div>

<br>
<div>
    <button id="start-stop" style="margin-right: 10px;">Start</button>
</div>
<br>

**Generations**: <span id="generation">0</span>

To start, design your initial configuration by clicking on the cells to toggle their state. Once you're ready, click the "Start/Stop" button to watch the game evolve. You can pause the game at any time by clicking the "Stop" button, and clear the grid by clicking the "Clear" button.

The speed of the game can be adjusted by changing the `speed` slider. The game will evolve at a faster pace as the slider is moved to the right. The `grid` slider can be used to adjust the size of the grid, allowing for larger or smaller configurations.

The Game of Life serves as a fascinating model of how complexity can arise from simplicity, providing insight into topics such as self-organization, emergence, and cellular automata theory.


## A Turing Complete Machine

John Conway's Game of Life is a fascinating example of a cellular automaton, with infinite possibilities for configurations and patterns. It has been studied extensively by computer scientists, mathematicians, and physicists, and has been used to explore a wide range of topics, including complexity theory, artificial life, and emergent behaviour.

Automata can be classified into two main categories: finite automata and infinite automata. Finite automata are machines with a finite number of states that can process input strings of finite length. For example, a finite automaton can be used to recognize whether a given input string is a valid email address or a phone number.

Infinte automata, on the other hand, are machines with an infinite number of states that can process input strings of infinite length. Infinite automata are more complex and powerful than finite automata, allowing them to solve more complex computational problems. For example, an infinite automaton can be used to recognize whether a given input string is a valid programming language statement or a mathematical expression. (Compilers and interpreters are examples of infinite automata). Game of Life is a prime example of an infinite automaton, as it can simulate complex systems and exhibit infinte states from a fixed configuration. 

Finite automata can be further classified into:
1. Deterministic Finite Automata (DFA): A determined outcome for a given input.
2. Non-Deterministic Finite Automata (NFA): Various outcomes for a given input.

However, both DFA and NFA:
- Operate on a finite amount of memory (the states).
- Can only make decisions based on the current state and the immediate input.
- Cannot handle languages that require unbounded memory, like those involving nested structures or long-term dependencies.

To solve these issues, a Pushdown Automaton (PDA) was introduced. A PDA is an automaton with a stack that can store an unbounded amount of memory. It can push and pop symbols onto the stack, allowing it to handle languages that require more complex memory access. 

However, a PDA still has limitations:
- The stack provides memory, but it's limited in structure (LIFO- Last in First Out).
- It can't handle languages requiring more general or unbounded memory access.

This led to the development of the Turing Machine, a theoretical model of computation that can simulate any algorithm or computation that can be performed by a digital computer. A Turing machine consists of an infinite tape divided into cells, a read/write head that can move left or right along the tape, and a finite set of states. The machine can read the symbol on the current cell, write a new symbol, move the tape left or right, and change its state based on a set of rules.

Turing Machine is the pinnacle of computation, as it laid the foundation for modern computers and computational theory. It can, in theory, solve any computational problem that can be solved by a digital computer, making it a universal model of computation.

The Game of Life has been shown to be Turing complete, meaning it can simulate any computation that a Turing machine can perform, given the right initial conditions. Certain configurations in the Game of Life can be used to simulate logic gates, memory, and other components of a computer, demonstrating its computational universality and performing universal computation, making it a fascinating area of study for computer scientists and mathematicians alike.

### Building A CPU in the Game of Life

A CPU essentially is built up of three main components:
1. ALU (Arithmetic Logic Unit)
2. Memory
3. Control Unit

#### Arithmetic Logic Unit

The **ALU** is the heart of the CPU, responsible for performing arithmetic and logical operations on data. It consists of a number of logic gates that can perform operations such as addition, subtraction, AND, OR, and NOT. 

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <div style="margin: 10px;">
        <canvas id="alu-addition" style="border: 1px solid black;"></canvas>
        <div>Adder Circuit</div>
    </div>
    <div style="margin: 10px;">
        <canvas id="alu-andgate" style="border: 1px solid black;"></canvas>
        <div>AND Gate</div>
    </div>
</div>

In addition, you can set up a glider collision that represents the addition of two binary values. The gliders in this pattern are designed to approach each other from opposite directions. Each glider can be thought of as representing a binary input (either 0 or 1). When two gliders collide, they interact to produce an output, which can be interpreted as the sum of the two inputs. This collision represents the addition of two binary values, with the output glider moving in a different direction depending on the inputs.

- If only one glider is present (input 1 + 0 or 0 + 1), it moves through without a collision, representing a result of 1.
- If two gliders collide (input 1 + 1), they create a predictable pattern that can represent the sum of these inputs, often leaving behind a specific "output" glider that can represent the result.

Similarly, An AND gate can be created by positioning still-life patterns (static configurations that do not change) to manipulate gliders. If both inputs are "1" (represented by gliders arriving at the same time), they will interact to produce an output.

- If both gliders arrive at the interaction point simultaneously, they will interact in a way that produces a specific pattern, representing the output 1 for an AND operation.
- If only one glider arrives, it will pass through or interact with other cells without producing the 1 pattern, representing an output of 0.

#### Memory Unit

**Memory Unit** stores data and instructions that are currently being executed by the CPU. It consists of registers, cache, and main memory. The memory unit is responsible for storing and retrieving data from memory locations, and it plays a crucial role in the operation of the CPU.

##### Blinker

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <div style="margin: 10px;">
        <canvas id="memory" style="border: 1px solid black;"></canvas>
        <div>Memory Cell(1 block)</div>
    </div>
</div>

This configuration is a 3x3 blinker, which oscillates between two shapes in two generations. Its oscillation does not spread or decay, so it remains contained and stable in its oscillating state.

Memory can be represented by stable patterns that remain constant unless disturbed by an external glider or oscillator. Stable patterns like blocks act as "bits" that can be toggled on or off by gliders, representing data storage. These two states can represent binary values (0 and 1) in a very simplistic way, with each state encoding one bit of information depending on its phase. This stability in position and periodic change makes it suitable for acting as a memory cell, as it reliably returns to a known state every two generations.

Similarly, an external pattern could be designed to change or "write" to the memory cell, altering its oscillation phase to represent a different binary state.

#### Control Unit

The control unit manages the CPU's operations by directing data between the ALU, memory, and I/O devices. It fetches and decodes instructions, then signals the ALU and memory to execute.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <div style="margin: 10px;">
        <canvas id="control" style="border: 1px solid black;"></canvas>
        <div>Control Unit</div>
    </div>
</div>

This pattern is designed to function as a control unit by leveraging the behavior of known oscillators and spaceships in the Game of Life to produce predictable and repeatable outcomes. The pattern includes configurations that will evolve into gliders, which are small patterns that move across the grid over successive generations. Gliders can be used to transmit information or interact with other patterns in the grid.

##### Glider gun

A glider gun is a configuration of cells that emits gliders at regular intervals. It can be used to create a clock signal that controls the timing of operations in the CPU.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
    <div style="margin: 10px;">
        <canvas id="glider" style="border: 0.2px solid black;"></canvas>
        <div>Glider Gun</div>
    </div>
</div>

A single block here can represent '1' and an empty cell can represent '0'. The glider gun emits gliders at regular intervals, which can be used to synchronize the operations of the CPU. 

These inputs can be used to work with adders, logic gates, and memory cells to perform ALU operations, store data, and control the flow of information within the CPU. 

## Next

While it is theoretically possible to build a computer within the Game of Life, it is painstakingly complex but fun! It requires a deeper understanding of logic gates, instruction sets, implementing memory, and control units. To build a fully functional computer, you would need to design and implement a wide range of components, including registers, multiplexers, and arithmetic logic units, and connect them together to form a complete system.

ALU can be constructed using:
- Adders (Half and Full- they can be used to add binary numbers) [⏎](#arithmetic-logic-unit)
- Logic Gates (AND, OR, NOT, XOR, etc.- they perform logical operations on binary inputs) [⏎](#arithmetic-logic-unit)
- Multiplexers( MUX- they select one of many inputs and route it to the output, used to handle multiple data inputs and control signals) 
- Registers( they store data temporarily during processing and can be used to store intermediate results)

Memory can be constructed using:
- Flip-Flops (they store a single bit of data using feedback) [⏎](#memory-unit)
- RAM (Random Access Memory- they store data that can be read and written to- used for storing data and instructions specific to the program)
- ROM (Read-Only Memory- they store data that can only be read from- used for storing fixed data and instructions that do not change)

Control Unit can be constructed using:
- Finite State Machines (FSM- they have a finite number of states and transition between states based on inputs) [⏎](#control-unit)
- Clock Signals (they provide a timing mechanism for the CPU, controlling the rate at which operations are performed- using glider guns) [⏎](#control-unit)
- Instruction Decoders (they interpret instructions and direct the flow of data within the CPU)


Building the CPU would take you to combine these components to carry out fully-functional operations. It would be a fun and challenging project to undertake, requiring a deep understanding of digital logic and computer architecture. The Game of Life serves as a fascinating model of how complexity can arise from simplicity, providing insight into topics such as self-organization, emergence, and cellular automata theory.

[Here's an actual CPU built in the Game of Life by Nicholas Carlini](https://nicholas.carlini.com/writing/2021/unlimited-register-machine-game-of-life.html). In this series of posts, he tries to explain how he built digital logic gates, multiplexers, and registers in the Game of Life. I would love to do this someday when NYU is not down my throat threatening to kick me out for not doing my assignments.

*If you choose carefully enough, you can make an entire computer inside the game, powered entirely by little things running around based only on those same simple rules of what lives and what dies in the next generation. An entire computer that could, in theory, perform any calculation that your computer could. It's an interesting mathematical diversion depicting Turing's completeness, the chaos that arises from simple rules, and it just looks pretty.*"  

\- Reddit

Also, someone built a [Game of Life inside a computer built on top of THE GAME OF LIFE!!](https://www.youtube.com/watch?v=xP5-iIeKXE8)