---
title: Conway's Game of Life
date: 5-11-2024
description: Understanding and implementing Conway's Game of Life using simple rules that mimic real-life population dynamics.
draft: true
tag: "#tech, #game"
---
<script type="module" src="/assets/js/gameoflife/index.js" ></script>


Cellular automata (CA) are computational systems that are used to model complex systems and nonlinear dynamics. They are made up of simple, identical units, called cells, that evolve in parallel at discrete time steps. The state of each cell is determined by the states of its neighboring cells, and the cells update their states based on a set of rules. Cellular automata have been used to study a wide range of phenomena, including biological systems, physical processes, and social dynamics.

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

The aim is to observe how the configuration of cells evolves over time, leading to various patterns and structures.

## The Game of Life in Action

<canvas id="game"  style="border: 1px solid black;">
</canvas>

The Game of Life serves as a fascinating model of how complexity can arise from simplicity, providing insight into topics such as self-organization, emergence, and cellular automata theory.