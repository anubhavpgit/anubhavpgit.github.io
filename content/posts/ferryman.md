---
title: "The Ferryman"
date: "25-03-2025"
description: "The one who compiles high-level languages into machine code."
tag: "#tech, #compiler"
draft: true
---
<script type="module" src="/assets/js/yatch/main.js"></script>
<link rel="stylesheet" href="/assets/css/yatch/style.css">

*The ferryman is a figure in various mythologies who is responsible for carrying souls across the river that divides the world of the living from the world of the dead.*

JK. This post is the second in a series of posts that explores the world of compilers, interpreters, CPUs and low level systems. The [previous post](/blog/hacktoberfest.html) describes how the CPU works and processes and executes instructions. This post explains how the code you write in a high-level language is transformed into machine code that the CPU can understand and execute. 

### Table of Contents

- [Recap](#compiling-high-level-languages): A brief overview of how high-level languages are compiled into machine code.
  - [Machine Code](#machine-code): Compiled code that the CPU can execute.
- [Computer Architecture](#computer-architecture): Understanding the components of a computer system. Why are compilers CPU-specific, while interpreters are not?
- [Ferry](#ferry): A simple C compiler that compiles to RISC-V assembly.
  - [Walkthrough](#walkthrough): Compiling Ferry
  - [Subset of C supported](#subset-of-c-supported): The features of C that Ferry supports.
  - [Lexical Analysis](#lexical-analysis): Converting the input code into tokens.
  - [Syntax Analysis](#syntax-analysis): Checking the syntax of the input code.
  - [AST](#ast): The abstract syntax tree representation of the input code.
  - [Semantic Analysis](#semantic-analysis): Checking the semantic correctness of the input code.
  - [Intermediate Code Generation](#intermediate-code-generation): Generating an intermediate representation of the input code.
  - [Optimization](#optimization): Optimizing the intermediate code for performance.
  - [Code Generation](#code-generation): Intermediate code to assembly code.
- [Assembly and Linking](#assembly-and-linking): Using an external assembler to convert assembly code into machine code.
- [Yatch](#yatch): A simple machine code interpreter for RISC-V.
  - [Instruction decoder](#instruction-decoder): A tool to decode RISC-V instructions and convert them to assembly code.
- [Future Work](#future-work): What is next for Ferry?

> This next section is a quick recap from the [previous post; Docking Compilers](/blog/hacktoberfest.html). If you are already familiar with how the CPU works, feel free to skip [here](#ferry).

---

# Compiling High-Level Languages

Compilers and interpreters are tools that convert high-level programming languages into machine code instructions that the CPU can execute. Compilers translate the entire program into machine code before execution, while interpreters translate and execute the program line by line. 

```c
#include <stdio.h>
int main(){
  printf("Hello, World!");
  return 0;
}
```

Here's a brief overview of GCC would compile this program:

1. **Preprocessing**: The compiler processes the `#include` directive and includes the contents of the `stdio.h` header file into the program. It also handles macros and other preprocessor directives.

Preprocessed Code: 
```c
int main(){
  printf("Hello, World!");
  return 0;
}
```
2. **Lexical Analysis**: The compiler breaks the preprocessed code into tokens. It reads the program character by character and groups them into tokens like keywords, identifiers, literals, operators, and punctuation.

> Tokens: `int`, `main`, `(`, `)`, `{`, `printf`, `(`, `"Hello, World!"`, `)`, `;`, `return`, `0`, `;`, `}`

3. **Syntax Analysis**: The compiler checks if the sequence of tokens follows the grammatical rules of C. It builds a parse tree (or abstract syntax tree) representing the program's structure.

```
FunctionDefinition
├── ReturnType: int
├── FunctionName: main
├── Parameters: ( )
└── Body:
    ├── ExpressionStatement: printf("Hello, World!");
    └── ReturnStatement: return 0;
```

4. **Semantic Analysis**: The compiler checks the program for semantic correctness. This includes type checking, verifying that functions and variables are declared before use, and ensuring that operations are valid for the given data types. 

```c
printf is declared in stdio.h and is correctly used.
The string "Hello, World!" is a valid argument.
The main function correctly returns an integer.
```

5. **Intermediate Code Generation**: TThe compiler generates an intermediate representation (IR) of the program. GCC uses internal representations like GIMPLE and RTL.
```c
// This is a simplified illustration
function main()
{
  tmp0 = "Hello, World!";
  call printf(tmp0);
  return 0;
}
```

6. **Optimization**: The compiler optimizes the intermediate code to improve performance. It may remove redundant code, simplify expressions, and reorder instructions.

```c
function main()
{
  call printf("Hello, World!");
  return 0;
}
```

7. **Code Generation**: The compiler generates assembly code from the optimized intermediate code. This code is specific to the target CPU architecture.

Assembly Code (Simplified x86-64 Example):
```assembly
    .section .rodata
.LC0:
    .string "Hello, World!"

    .text
    .globl main
main:
    push    %rbp
    mov     %rsp, %rbp
    lea     .LC0(%rip), %rdi
    call    puts
    mov     $0, %eax
    pop     %rbp
    ret
```

8. **Assembly and Linking**:

**Assembly**: The assembler converts the assembly code into object code (machine code in binary form).  
**Linking**: The linker combines object code with libraries to produce the final executable.

For example, for the x86-64 architecture, the conversion in hexadecimal would look like:

```bash
# Data Section (.rodata):
01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001 00000000

# Text Section (.text):
01010101 01010101 01010101 01010101 : push %rbp
01001000 10001001 11100101 : mov %rsp, %rbp
01001000 10001101 00111101 **** **** **** **** : lea .LC0(%rip), %rdi
11101000 **** **** **** **** : call puts
10111000 00000000 00000000 00000000 00000000  : mov $0, %eax
01011101 : pop %rbp
11000011 : ret
```

GCC uses intermediate representations during compilation:

- GIMPLE: A simplified, language-independent representation that makes it easier to perform optimizations.
- RTL (Register Transfer Language): A lower-level representation closer to assembly, used for target-specific optimizations and code generation.

While, interpreters translate and execute the program line by line. The interpreter:

- reads the source code line by line,
- translates it into machine code (or bytecode in HLLs),
- translates bytecode into machine code and runs it in a virtual machine.

This allows for dynamic typing, interactive debugging, and easier integration with other languages. However, interpreters are generally slower than compilers because they don't optimize the entire program before execution.

I will finish up a [detailed post on a C compiler](https://anubhavp.dev/posts/ferryman) soon. This post is an intriduction to the next part of the series, a machine code interpreter for RISC-V.

## Machine Code

The above generated binary code is run as instructions on the CPU. The CPU executes these instructions in a sequence, and the program runs. The CPU has a set of instructions it can execute, known as the instruction set architecture (ISA). The ISA defines the instructions the CPU can execute, the registers it uses, and the memory model it follows. For example, an instruction might look like `00000000000000000000000010000011`, which translates to `lb x1, 0(x0)` in RISC-V assembly. This instruction, specific to the RISC-V ISA, loads a byte from memory into register `x1`.

# Computer Architecture

Computer architecture is the design of computer systems, including the CPU, memory, and I/O devices. The CPU executes machine code instructions, which are specific to the CPU architecture. CPU architectures like x86, ARM, and RISC-V have different instruction sets and memory models. Each instruction set has its own assembly language and machine code format.

Here's why it is important to understand computer architecture:
Compilers generate machine code **specific** to the target CPU architecture. The machine code for x86 is different from ARM or RISC-V. Interpreters, on the other hand, are CPU-independent. They translate high-level code into bytecode or an intermediate representation that can be executed on any platform.

---

## Ferry

Ferry is a simple C compiler written in Rust that compiles to RISC-V assembly. It is not a complete implementation of the C language, but it is a good starting point for understanding how compilers work.

I would suggest you to get a basic understanding of how Rust works, and how to set up a Rust project before diving further. Just the basics. You can find the [Rust Book](https://doc.rust-lang.org/book/) here.

### Walkthrough

### Subset of C supported

### Lexical Analysis

### Syntax Analysis

### AST

### Semantic Analysis

### Intermediate Code Generation

### Optimization

### Code Generation

## Assembly and Linking

The assembly code generated by Ferry is specific to the RISC-V architecture. It can be assembled into machine code using an external assembler like `riscv64-unknown-elf-gcc`. The linker combines the object code with any necessary libraries to create the final executable.

## Yatch

Yatch is a simple machine code interpreter for RISC-V. It can execute RISC-V assembly code directly, allowing you to run machine code directly on a simulated RISC-V CPU. Yatch was meant to show how CPUs read and execute instructions. Read everything about Yatch [here](/blog/hacktoberfest.html#yatch).

Here's a simple instruction decoder for RISC-V machine code

### Instruction decoder

This tool helps you decode RISCV32I instructions and convert them to their corresponding assembly code. (for example, `00000000000000000000000010000011` to `lb x1, 0(x0)`)

<div class="container" id="input-container">
  <input type="text" class="input-box" id="input-box" placeholder="Instruction">
  <i class="icon fa-gear" id="gear"></i>
</div>
<div id="result" class="result"></div>

Here is the standalone version of the tool: [Barney- A RISC-V Instruction Decoder](https://anubhavp.dev/barney). This is going to be a handy tool to understand the instructions and their working. The tool will also include decoding assembly code to machine code in the future. (an assembler for RISC-V instructions)

## Future Work

Well, the current scope of Ferry was to understand and demonstrate the working of compilers. While I would love to finish this, there are far better, superior compilers out there. This article was a simple entry into how systems work. My next steps would be delving more into the world of compilers, optimising CPU operations, GPU computing, and understanding the mechanics behind the scenes.

This article might seem overwhelming, but it's pretty interesting to realize how all of modern computing works, and see how far we've come.