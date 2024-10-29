---
title: "Docking Compilers at Hacktoberfest'24"
date: "01-10-2024"
description: "Compilers and interpreters for C/C++ and machine code for RISC-V at Hacktoberfest, a month-long celebration of open source software."
tag: "tech"
draft: true
---
Hacktoberfest is a fantastic opportunity to dive into the world of open source, make meaningful contributions, and sharpen your dev skills. This year, I'm most excited about these two projects:

1. [Ferry](#current-ferry): A simple C/C++ cross-compiler for RISC-V, written in Rust.

	The aim here is to learn more about compilers, working of CPUs, computer systems architecture, making it a great project to get started with if you're keen to learn about low-level programming. I'd love to collaborate with others who share my similar interest. 

Usually, folks reaching out to me usually look out for Python and JavaScript projects, and most contributors gravitate towards these high level languages, but I encourage you to explore Rust. It offers a new programming paradigm, especially in terms of memory and type safety, areas where Python and JavaScript typically fall short.

For those not comfortable with Rust, I've also thought of a lighter alternative called 

2. [Yatch](#current-yatch): a machine code interpreter for RISC-V written in C++. 

	This project is a bit more beginner-friendly, and you can get started with it even if you're not familiar with Rust. It's a great way to learn about machine code, and how CPUs execute instructions.

### RISC-V ISA 

RISC-V is an open-source instruction set architecture (ISA) based on established reduced instruction set computing (RISC) principles. Here is the ISA: [RISC-V IS Table](https://five-embeddev.com/riscv-user-isa-manual/Priv-v1.12/instr-table.html).

## Recent Updates

I haven't started working on these projects yet, but I'm planning to get started soon, around October 1st. I'll be updating this post with my progress here.

## Ferry

Ferry is a simple C/C++ cross-compiler for RISC-V, written in Rust. The project is still in its early stages, and I'm currently working on setting up the project structure and writing the lexer.

## Yatch

Yatch is a machine code interpreter for RISC-V written in C++. It is a simpler interpretion of how RISC-V CPUs execute instructions. I'm currently working on setting up the project structure and writing the interpreter.