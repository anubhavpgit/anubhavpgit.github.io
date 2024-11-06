---
title: Conway's Game of Life
date: 1-12-2024
description: Understanding and implementing Conway's Game of Life using simple rules that mimic real-life population dynamics.
draft: false
tag: "#tech, #game"
---
<script type="module" src="/assets/js/gameoflife/main.js" ></script>

Cellular automata are computational systems that are used to model complex systems and nonlinear dynamics. They are made up of simple, identical units, called cells, that evolve in parallel at discrete time steps. The state of each cell is determined by the states of its neighboring cells, and the cells update their states based on a set of rules. Cellular automata have been used to study a wide range of phenomena, including biological systems, physical processes, and social dynamics.

One of the most fascinating aspects of cellular automata is their ability to exhibit complex and unpredictable behavior from simple rules. Conway's Game of Life is a simple cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

The main aim of the Game of Life is to simulate the evolution of cells on a grid through simple rules that mimic real-life population dynamics, leading to complex and often surprising behaviors. Specifically, the game explores how simple rules governing individual cells can lead to emergent complexity and patterns over time, including stable structures, oscillating patterns, and even patterns that exhibit motion.

A few rules govern the evolution of the game are as follows:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
	<canvas id="lessthantwo"  style="border: 1px solid black;"	>
	</canvas>
    <span style="padding: 10px; color: black !important;">
    -->
    </span>
    <canvas id="lessthantwodead"  style="border: 1px solid black;"	>
	</canvas>
</div>


2. Any live cell with two or three live neighbours lives on to the next generation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
	<canvas id="twoorthree"  style="border: 1px solid black;"	>
	</canvas>
    <span style="padding: 10px; color: black !important;">
        -->
    </span>
    <canvas id="twoorthreelive"  style="border: 1px solid black;"	>
    </canvas>
</div>

3. Any live cell with more than three live neighbours dies, as if by overpopulation.

<div class="container" style="display: flex; align-items: center; justify-content: center; text-align: center;">
	<canvas id="morethanthree"  style="border: 1px solid black;"	>
	</canvas>
    <span style="padding: 10px; color: black !important;">
    -->
    </span>
    <canvas id="morethanthreedead"  style="border: 1px solid black;"	>
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

The game is played on a two-dimensional grid of cells, each of which can be in one of two states: alive or dead. The game proceeds in discrete steps, with each step representing a generation of cells. At each step, the game applies the rules to each cell in the grid simultaneously, updating the grid to reflect the new state of each cell based on its current state and the states of its neighbors.

## The Game of Life in Action

<div style="text-align: start; width: 100%;">
    <button id="reset">Reset</button>
</div>

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

To start, design your intial configuration by clicking on the cells to toggle their state. Once you're ready, click the "Start/Stop" button to watch the game evolve. You can pause the game at any time by clicking the "Stop" button, and clear the grid by clicking the "Clear" button.

The speed of the game can be adjusted by changing the `speed` slider. The game will evolve at a faster pace as the slider is moved to the right. The `grid` slider can be used to adjust the size of the grid, allowing for larger or smaller configurations.

The Game of Life serves as a fascinating model of how complexity can arise from simplicity, providing insight into topics such as self-organization, emergence, and cellular automata theory.


## A Turing Complete Machine

Formal languages and automata theory is a fundamental area of computer science that deals with the abstract machines (automata) and the computational problems that can be solved using these machines. It provides the theoretical underpinnings for designing compilers, interpreters, and for understanding the limits of what computers can compute.

John Conway's Game of Life is fascinating example of a cellular automaton, with infinite possibilities for configurations and patterns. It has been studied extensively by computer scientists, mathematicians, and physicists, and has been used to explore a wide range of topics, including complexity theory, artificial life, and emergent behavior.

The Game of Life has been shown to be Turing complete, meaning it can simulate any computation that a Turing machine can perform, given the right initial conditions. This means it shares a theoretical connection with formal automata and can be thought of as a computational system. Research indicates that certain configurations in the Game of Life can be used to simulate logic gates, memory, and other components of a computer, demonstrating its computational universality and can perform universal computation, making it a fascinating area of study for computer scientists and mathematicians alike.

*If you choose carefully enough, you can make a entire computer inside the game, powered entirely by little things running around based only on those same simple rules of what lives and what dies in the next generation. An entire computer that could, in theory, perform any calculation that your computer could. It's an interesting mathematical diversion depicting Turing-completeness, the chaos that arises from simple rules, and it just looks pretty.*" 
- Reddit

Also, someone built a [Game of Life inside a computer built on top of THE GAME OF LIFE!!](https://www.youtube.com/watch?v=xP5-iIeKXE8)