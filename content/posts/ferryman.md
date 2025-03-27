---
title: "Ferry - C compiler for RISC-V"
date: "25-03-2025"
description: "The one who compiles C lang to machine code."
tag: "#tech, #compiler"
draft: false
---
<script type="module" src="/assets/js/yatch/main.js"></script>
<link rel="stylesheet" href="/assets/css/yatch/style.css">

*The ferryman is a figure in various mythologies who is responsible for carrying souls across the river that divides the world of the living from the world of the dead.*

JK. This post is the second in a series of posts that explore the world of compilers, interpreters, CPUs and low-level systems. The [previous post](/blog/hacktoberfest.html) describes how the CPU works; and how CPUs process and execute instructions. This post explains how the code you write in a high-level language is transformed into machine code that the CPU can understand and execute. 
 
### Table of Contents

- [Recap](#compiling-high-level-languages): A brief overview of how high-level languages are compiled into machine code.
  - [Machine Code](#machine-code): Compiled code that the CPU can execute.
- [Computer Architecture](#computer-architecture): Understanding the components of a computer system. Why are compilers CPU-specific, while interpreters are not?
- [Ferry](#ferry): A simple C compiler that compiles to RISC-V assembly.
  - [Walkthrough](#walkthrough): Compiling Ferry
  - [Subset of C supported](#subset-of-c-supported): The features of C that Ferry supports.
  - [Core](#core): Compiling a simple C program.
    - [Lexical Analysis](#lexical-analysis): Converting the input code into tokens.
    - [Syntax Analysis](#syntax-analysis): Checking the syntax of the input code.
      - [AST](#ast): The abstract syntax tree representation of the input code.
    - [Semantic Analysis](#semantic-analysis): Checking the semantic correctness of the input code.
    - [Intermediate Code Generation](#intermediate-code-generation): Generating an intermediate representation of the input code.
    - [Optimization](#optimization): Optimizing the intermediate code for performance.
    - [Code Generation](#code-generation): Intermediate code to assembly code.
- [Assembly and Linking](#assembly-and-linking): Using an external assembler to convert assembly code into machine code.
  - [Instruction decoder](#instruction-decoder): A tool to decode RISC-V instructions and convert them to assembly code.
- [Yatch](#yatch): A simple machine code interpreter for RISC-V.
- [Future Work](#future-work): Next?

> This next section is a quick recap from the [previous post; Docking Compilers](/blog/hacktoberfest.html). If you are already familiar with how the CPU works, feel free to skip [here](#ferry).

---

# Compiling High-Level Languages

Compilers and interpreters are tools that convert high-level programming languages into machine code instructions that the CPU can execute. Compilers translate the entire program into machine code before execution, while interpreters translate and execute the program line by line. 

For ex.
```c
x = 5;
```
Can be compiled into assembly code like this:

```assembly
li x1, 5 // load immediate 5 into register x1
sw x1, 0(x0) // store word 0 at address x0
```
This assembly code is then translated into machine code, which is a binary representation of the instructions that the CPU can execute. The CPU executes these instructions in a sequence, and the program runs.

While interpreters translate and execute the program line by line. The interpreter:

- reads the source code line by line,
- translates it into machine code (or bytecode in HLLs),
- translates bytecode into machine code and runs it in a virtual machine.

This allows for dynamic typing, interactive debugging, and easier integration with other languages. However, interpreters are generally slower than compilers because they don't optimize the entire program before execution.

## Machine Code

Binary code is run as instructions on the CPU. The CPU executes these instructions in a sequence, and the program runs. Each CPU has its own set of instructions it can execute, known as the instruction set architecture (ISA). The ISA defines the instructions the CPU can execute, the registers it uses, and the memory model it follows. For example, an instruction might look like `00000000000000000000000010000011`, which translates to `lb x1, 0(x0)` in RISC-V assembly. This instruction, specific to the RISC-V ISA, loads a byte from memory into register `x1`.

# Computer Architecture

Computer architecture is the design of computer systems, including the CPU, memory, and I/O devices. The CPU executes machine code instructions, which are specific to the CPU architecture. CPU architectures like x86, ARM, and RISC-V have different instruction sets and memory models. Each instruction set has its own assembly language and machine code format.

Here's why it is important to understand computer architecture:
Compilers generate machine code **specific** to the target CPU architecture. The machine code for x86 is different from ARM or RISC-V. Interpreters, on the other hand, are CPU-independent. They translate high-level code into bytecode or an intermediate representation that can be executed on any platform.

---

## Ferry

Ferry is a simple C compiler written in Rust that compiles to RISC-V assembly. It is not a complete implementation of the C language, but a good starting point for understanding how compilers work.

I would suggest getting a basic understanding of how Rust works, and how to set up a Rust project before diving further. Just the basics. Find the [Rust Book](https://doc.rust-lang.org/book/) here.

### Walkthrough

Compiling Ferry is a pretty straightforward process:

```bash
cargo build --release
```

and use

```bash
./target/release/ferry <input_file.c>
```
to run the compiler.

An assembly file with '`<input_file>.s` will be generated in the same directory as the input file.

The assembly code can be assembled into machine code using an external assembler like `riscv64-unknown-elf-gcc`. Or, feel free to use an online assembler like [RISC-V Online Assembler](https://riscvasm.lucasteske.dev/). 

### Subset of C supported

Before moving forward, Ferry only supports a subset of C. The following features are supported:
- Basic arithmetic operations (+, -, *, /, %)
- Variable declarations and assignment
- Basic types (int, char, float, double)
- Control flow statements (if/else, while loops)
- Function declarations and calls
- Arrays (fixed-size only initially)
- Basic I/O functions (simplified printf-like functionality)
- Comments (just for readability, your tokenizer already handles this)
- Pointers (basic pointer operations)
- Type casting (implicit and explicit)
- Structs (without unions initially)
- String manipulation (basic operations)
- Basic preprocessor (#include for essential libraries)
- For loops

### Core

A compiler is a complex program that comprises several steps to convert high-level code into machine code. Taking an example of a simple C program:

```c
#include <stdio.h>

int main() {
  printf("Hello, World!\n");
  return 0;
}
```

The compiler will perform the following steps to convert this code into machine code:

> Source Code --> Parser --> AST --> IR Generator --> IR Optimizer --> 
> Assembly Generator (**.s**) --> Assembler (**.o**) --> Linker (**executable**)

The following code is the exact implementation of the compiler with abstracted implementations of the steps.

```rs
fn compile(file: String) -> Result<bool, String> {
 // Parse the source code
    let mut ast = parse_source(&file)?; // Parse the source code into an AST
 // Perform semantic analysis
    ast = semantic::analyze_semantics(ast)?; // Perform semantic analysis on the AST
 // Generate code from the AST
    ir::generate_ir(&ast)?;
 // Assembly generation
    let assembly = codegen::generate_assembly(&ir)?;

    Ok(true) // Return true to indicate successful compilation
}
```

The assembly code is platform-dependent, meaning that the same high-level code can be compiled into different assembly codes for different architectures. The assembly code is then assembled into machine code, which is specific to the target CPU architecture. Jump to the [Assembly and Linking](#assembly-and-linking) section to see how the assembly code can be converted into machine code using an external assembler.

#### Lexical Analysis

```rs
pub fn parse_source(source: &str) -> Result<(), String> {
    let tokens = tokenize(source)?;
    let mut _ast = build_ast(&tokens)?;
    Ok(())
}
```

The compiler reads the source code and breaks it down into tokens. Tokens are the smallest units of meaning in the code, such as keywords, identifiers, literals, and operators.

`PreprocessorDirective("#include <stdio.h>")` --> header file  
`Type(Int)` --> type of variable  
`Identifier("main")` --> function name  
`LeftParen` --> opening parenthesis  
`RightParen` --> closing parenthesis  
`LeftBrace` --> opening brace  
`Identifier("printf")` --> function name  
`LeftParen` --> opening parenthesis  
`String("Hello, World!\n")` --> string literal  
`RightParen` --> closing parenthesis  
`Semicolon` --> semicolon  
`Keyword(Return)` --> return statement  
`Number(0.0)` --> return value  
`Semicolon` --> semicolon  
`RightBrace` --> closing brace  
`EOF` --> end of file  

#### Syntax Analysis

After tokenization, where the source code is broken into tokens, the syntax analyzer (parser) processes these tokens according to the language grammar rules. As it recognizes valid syntactic structures, it constructs the AST. The AST is the output or result of the syntax analysis process.

Each time the parser recognizes a valid language construct (like an expression, statement, or declaration), it creates the corresponding AST nodes.

The parser uses a recursive descent parsing approach, where each function corresponds to a grammar rule. For example, the `parse_expression` function handles expressions, while the `parse_statement` function handles statements. The root level function, `parse_program`, is responsible for parsing the entire program, which then calls the other parsing functions as needed.

The `parse_program` function might look like this:

```rs
match &self.peek().token_type { // Check the type of the next token
  TokenType::Type(_) => { // If it's a type, parse a declaration
    let declaration = self.parse_declaration()?;
    program.add_child(declaration); // Add the declaration to the program
 } 
  TokenType::PreprocessorDirective(_) => { // Else if it's a preprocessor directive, parse it
    let directive = self.parse_preprocessor()?;
    program.add_child(directive); // And the directive to the program
 }
  _ => {
    return Err(format!("Expected declaration, found {:?}.", // Error if neither
    self.peek().token_type));
 }
}
```

The `declaration_parser` function would then handle the parsing of variable declarations, function declarations, and other constructs. It would create the appropriate AST nodes for each construct and add them to the program node.

##### AST

The Abstract Syntax Tree (AST) is a tree representation of the source code. Each node in the tree represents a construct in the source code, such as a variable declaration, function call, or control flow statement. The AST is used to represent the structure of the program and is an intermediate representation that can be further processed by the compiler.

A node in the AST might look like this:

```rs
pub struct ASTNode {
    pub node_type: ASTNodeType,
    pub children: Vec<ASTNode>,
    pub value: Option<String>,
}
```
The parser generates the AST by creating nodes for each construct in the source code. For example, a function call might be represented as a node with the type `FunctionCall`, and its children would be the arguments passed to the function and the function name. 

In our example, the AST for the entire program would look something like this:

```bash
AST Structure:
└── Root
├── PreprocessorDirective: Some("#include <stdio.h>")
└── FunctionDeclaration: Some("main")
    ├── Type: Some("Int")
    └── BlockStatement: None
        ├── ExpressionStatement: None
        │   └── CallExpression: Some("printf")
        │       ├── Variable: Some("printf")
        │       └── Literal: Some("\"Hello, World!\n\"")
        └── ReturnStatement: None
            └── Literal: Some("0")
```

#### Semantic Analysis

The semantic analyzer checks the AST for semantic correctness. It verifies that the types of variables and expressions are correct, that functions are called with the correct number and types of arguments, and that variables are declared before they are used. The semantic analyzer also performs type checking and resolves any ambiguities in the code.

It checks for preprocessor directives, variable declarations, function declarations, and function calls, and removes any unnecessary nodes from the AST, like the `#include` directives.

For example, assuming there is a `#include<matlab.h>` directive in the code, and the code looks like this:

```c
#include <matlab.h>
int main() {
 Matrix m = createMatrix(3, 3); // Function declared in matlab.h
    return 0;
}
```

The semantic analyzer would check that the `createMatrix` function is declared in the `matlab.h` header file and that it is called with the correct number of arguments. It would also check that the `Matrix` type is defined in the header file and that it is used correctly.

After preprocessing, it might look like:

```c
typedef struct {...} Matrix;
Matrix createMatrix(int rows, int cols);
// ...many more declarations...
int main() {
 Matrix m = createMatrix(3, 3);
    return 0;
}
```
The linker would then resolve the references to the `createMatrix` function and the `Matrix` type, ensuring that they are defined in the correct header file.

In our original example, the semantic analyzer would check that the `printf` function is declared in the `stdio.h` header file and that it is called with the correct number of arguments. If any semantic errors are found, the compiler reports them to the user.

in the `printf("Hello, World!\n")` statement, the semantic analyzer checks that the `printf` function is called with a string argument. If the argument is not a string, it raises an error.

Two specific functions handle this case:

```rs
pub fn check_types(node: &ASTNode, symbol_table: &SymbolTable) -> Result<Type, String> {
  ...
  if value.starts_with('"') {
    Ok(Type::Pointer(Box::new(Type::Char))) // String literal
 } else if value == "true" || value == "false" {
    Ok(Type::Bool)
 } else {
    ...
 }
  ...
}
```

and

```rs
pub fn check_types(node: &ASTNode, symbol_table: &SymbolTable) -> Result<Type, String> {
  ...
  match (target_type, value_type) {
 // Basic types
 (Type::Int, Type::Int) => true,
 (Type::Float, Type::Int) => true, // Implicit conversion
    ...
 // Pointers
        
 // For box types, recursively check if the inner types are compatible
 (Type::Pointer(target_inner), Type::Pointer(value_inner)) => {
      is_type_compatible(target_inner, value_inner)
 }

 // Functions are compatible if their return types and parameter lists match
    if !is_type_compatible(target_return, value_return) {
      return false;
 }
 }
}
```
This step raises compile-time errors if the AST is not semantically correct. 

#### Intermediate Code Generation

The intermediate code generator converts the AST into an intermediate representation (IR). The IR is a low-level, usually platform-independent representation of the code that is easier to optimize and translate into machine code. 

AST represents the syntactic structure of the code (closely mirrors source code) while IR represents the semantic operations (closer to what the machine will do). IR is specifically designed for optimizations that are difficult at the AST level. Common optimizations like constant folding, dead code elimination, and loop transformations work better on IR.

IR representations are usually standardized and can be used across different compilers. LLVM IR is a widely used intermediate representation that is used by the LLVM compiler infrastructure. It is a low-level, typed assembly-like language that is designed to be easy to optimize and generate machine code from. It is often represented as a three-address code, where each instruction has at most three operands. An LLVM IR representation of the code might look like this:

```llvm
@.str = private unnamed_addr constant [14 x i8] c"Hello, World!\00", align 1
define i32 @main() {
entry:
 %call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @.str, i32 0, i32 0))
 ret i32 0
}
```

Compilers typically use multiple IR forms during compilation:
- **High-level IR**: A Tree representation of the source code, easier to analyze and optimize.
- **Low-level IR/ Linear/Three-address code IR**: Each instruction typically has one destination and up to two source operands. Closer to assembly language

Ferry uses a simple IR representation that is built for the purpose of this compiler. The IR is a tree representation of the code, where each node represents an operation or a value. I could have also used `LLVM IR` as the intermediate representation, but the learning curve is steep, and I wanted to keep it simple. Doing so would actually have made the compiler more robust and powerful. 

The IR would look something like this:

```bash
IR Structure:
└── Root
└── Function: Some("main")
    └── BasicBlock: None
        ├── Call: Some("printf")
        │   └── Constant: Some("\"Hello, World!\n\"")
        └── Return: None
            └── Constant: Some("0")
```

**Industry Practice:**  

Modern compilers like LLVM, GCC, and .NET all use sophisticated IR systems:

- LLVM IR is a portable, typed, assembly-like language
- GCC uses GIMPLE and RTL as intermediate representations
- JIT compilers typically use IR to enable fast compilation and optimization

Rust Language also uses LLVM IR as its intermediate representation. The Rust compiler (rustc) generates LLVM IR from the Rust source code, optimizes it, and then generates machine code for the target architecture.

GCC also uses a similar approach, generating an intermediate representation called GIMPLE, which is then optimized and translated into machine code.

Interpreters like Python and JavaScript engines (like V8) also use intermediate representations. For example, the V8 engine uses an intermediate representation called Ignition bytecode, which is a low-level representation of the JavaScript code that can be executed by the V8 engine.

#### Optimization

The optimization phase improves the intermediate representation to make it more efficient. This can include removing dead code, inlining functions, and optimizing loops. The goal of optimization is to improve the performance of the generated code without changing its semantics.

Ferry uses the following optimizations:

1. **Constant Folding and Propagation**: Evaluates constant expressions at compile time and propagates constant values to reduce the number of calculations performed at runtime. For example, if a variable is assigned a constant value, that value can be propagated to other parts of the code.
2. **Dead Code Elimination**: Removes code that is never executed or has no effect on the program's output. For example, if a variable is declared but never used, it can be removed from the IR.
3. **Common Subexpression Elimination**: Identifies and eliminates redundant calculations. For example, if the same expression is calculated multiple times, it can be stored in a temporary variable and reused.
4. **Loop Optimizations**: Improves the performance of loops by unrolling them, reducing the number of iterations, or optimizing the loop structure.
  
Ferry has two levels of optimizations:
1. Basic optimizations: These are simple optimizations that can be applied to the IR without changing its structure. For example, constant folding and dead code elimination.
2. Advanced optimizations: These are more complex optimizations that require a deeper understanding of the code structure. For example, loop unrolling and function inlining.

Say our `code` looks like this:

```c
int main(){
  int i = 0 + 2;
  for (i = 0; i < 10; i++)
  {
    if (i == 5)
      return 0;
  }
}
```

The optimizer should:
1. Evaluate the expression `0 + 2` at compile time and replace it with `2`.
2. Stop the loop when `i == 5` to avoid unnecessary iterations.
3. Remove the unnecessary assignment of `i` to `0` in the loop header.
4. Add a jump instruction to the loop header to avoid unnecessary iterations.
5. Optimize the loop to exit early when `i == 5` by adding a return statement.

The IR could look like this:

```bash
IR Structure:
└── Root
└── Function: Some("main")
    └── BasicBlock: None
        ├── BasicBlock: None
        │   ├── Alloca: Some("i")
        │   └── Store: None
        │       ├── BinaryOp: Some("+")
        │       │   ├── Constant: Some("0")
        │       │   └── Constant: Some("2")
        │       └── Variable: Some("i")
        └── BasicBlock: Some("for")
            ├── Store: None
            │   ├── Constant: Some("0")
            │   └── Variable: Some("i")
            ├── BasicBlock: Some("for.header")
            │   └── BinaryOp: Some("<")
            │       ├── Load: None
            │       │   └── Variable: Some("i")
            │       └── Constant: Some("10")
            └── Branch: None
                ├── BinaryOp: Some("<")
                │   ├── Load: None
                │   │   └── Variable: Some("i")
                │   └── Constant: Some("10")
                └── BasicBlock: Some("for.body")
                    ├── BasicBlock: None
                    │   └── Branch: None
                    │       ├── BinaryOp: Some("==")
                    │       │   ├── Load: None
                    │       │   │   └── Variable: Some("i")
                    │       │   └── Constant: Some("5")
                    │       └── Return: None
                    │           └── Constant: Some("0")
                    ├── BasicBlock: None
                    │   ├── Load: None
                    │   │   └── Variable: Some("i")
                    │   └── Store: None
                    │       ├── BinaryOp: Some("+")
                    │       │   ├── Load: None
                    │       │   │   └── Variable: Some("i")
                    │       │   └── Constant: Some("1")
                    │       └── Variable: Some("i")
                    └── Jump: Some("for.header")
```

The basic optimizer would then optimize the IR using the following optimizations:

```bash
---------Starting Optimization---------
Optimization iteration 1
Folded binary op to constant: 2
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
CSE: Found duplicate expression: LOAD(VAR(i))
CSE: Found duplicate expression: LOAD(VAR(i))
Optimization iteration 2
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
CSE: Found duplicate expression: LOAD(VAR(i))
CSE: Found duplicate expression: LOAD(VAR(i))
Optimization iteration 3
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
CSE: Found duplicate expression: LOAD(VAR(i))
CSE: Found duplicate expression: LOAD(VAR(i))
Optimization iteration 4
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
CSE: Found duplicate expression: LOAD(VAR(i))
CSE: Found duplicate expression: LOAD(VAR(i))
Optimization iteration 5
Replaced load of i with constant None
Replaced load of i with constant None
Replaced load of i with constant None
CSE: Found duplicate expression: LOAD(VAR(i))
CSE: Found duplicate expression: LOAD(VAR(i))
Optimization complete after 5 iterations
```

and the following IR structure:

```bash
IR Structure:
└── Root
└── Function: Some("main")
    └── BasicBlock: None
        ├── BasicBlock: None
        │   ├── Alloca: Some("i")
        │   └── Store: None
        │       ├── Constant: Some("2")
        │       └── Variable: Some("i")
        └── BasicBlock: Some("for")
            ├── Store: None
            │   ├── Constant: Some("0")
            │   └── Variable: Some("i")
            ├── BasicBlock: Some("for.header")
            └── Branch: None
                ├── BinaryOp: Some("<")
                │   ├── Load: None
                │   │   └── Variable: Some("i")
                │   └── Constant: Some("10")
                └── BasicBlock: Some("for.body")
                    ├── BasicBlock: None
                    │   └── Branch: None
                    │       ├── BinaryOp: Some("==")
                    │       │   ├── Load: None
                    │       │   │   └── Variable: Some("i")
                    │       │   └── Constant: Some("5")
                    │       └── Return: None
                    │           └── Constant: Some("0")
                    ├── BasicBlock: None
                    │   └── Store: None
                    │       ├── BinaryOp: Some("+")
                    │       │   ├── Load: None
                    │       │   │   └── Variable: Some("i")
                    │       │   └── Constant: Some("1")
                    │       └── Variable: Some("i")
                    └── Jump: Some("for.header")
```
The `0 + 2` expression has been correctly folded into just `2`. The optimizer also added a jump instruction to the loop header to avoid unnecessary iterations.

The optimizer hasn't specifically optimized for the early exit when `i==5`. While it correctly preserved the program's structure and performed some basic optimizations like constant folding `(0 + 2 → 2)`, it hasn't performed the more advanced control flow analysis that would recognize this optimization opportunity.

The advanced optimizer would then optimize the IR using the following optimizations:

```bash
---------Starting Advanced Optimization---------
Optimization iteration 1
Optimization iteration 2
Optimization complete after 2 iterations

----- Optimization Summary -----
Constants folded: 0
Dead code blocks removed: 2
Common expressions eliminated: 0
Loops optimized: 0
Functions optimized: 0
-------------------------------
```

```bash
IR Structure:
└── Root
└── Function: Some("main")
    └── BasicBlock: None
```
This optimizer has removed the dead code blocks and optimized the loops. The optimiser correctly identified that the code always returns `0` and thus removed the entire loop. 

#### Code Generation

The final step would be generating Assembly code from the IR. The assembly code is a low-level representation of the program that can be assembled into machine code and is CPU-specific.

The code generator traverses the IR and generates assembly code for each instruction. Here's a RISC-V reference for the [assembly code](https://michaeljclark.github.io/asm).

***(WIP*)***

## Assembly and Linking

The assembly code generated by Ferry is specific to the RISC-V architecture. It can be assembled into machine code using an external assembler like `riscv64-unknown-elf-gcc` or an online assembler like [RISC-V Online Assembler](https://riscvasm.lucasteske.dev/).

The process flows like this:

`.s (Assembly code)` --> **Assembler** --> `.o (Object file)` --> **Linker** --> `Executable/ Machine code/ Binary`

Once the machine code is generated, it can be executed on a RISC-V CPU or a simulator. The machine code is a binary representation of the instructions that the CPU can execute. The CPU executes these instructions in a sequence, and the program runs.

In Ferry, there is an additional module that helps with the assembly and linking process. This is a separate binary that uses the `riscv64-unknown-elf-as` and `riscv64-unknown-elf-ld` tools to assemble and link the code. It then uses quemu-riscv64 to run the code. The module is called `mac_os_runner` 

```bash
cargo run --release --bin mac_os_runner -- <input_file.s>
```

The complete process of compiling and running a C program using Ferry in an ARM64 environment is as follows:

```bash
cargo run --release --bin ferry -- <input_file.c>
cargo run --release --bin mac_os_runner -- <input_file.s>
```

Here's a simple instruction decoder for RISC-V machine code

### Instruction decoder

This tool helps you decode RISCV32I instructions and convert them to their corresponding assembly code. (for example, `00000000000000000000000010000011` to `lb x1, 0(x0)`)

<div class="container" id="input-container">
  <input type="text" class="input-box" id="input-box" placeholder="Instruction">
  <i class="icon fa-gear" id="gear"></i>
</div>
<div id="result" class="result"></div>

Here is the standalone version of the tool: [Barney- A RISC-V Instruction Decoder](https://anubhavp.dev/barney). This is going to be a handy tool to understand the instructions and their working. The tool will also include decoding assembly code to machine code in the future. (an assembler for RISC-V instructions)

## Yatch

Yatch is a simple machine code interpreter for RISC-V. It can execute RISC-V assembly code directly, allowing you to run machine code directly on a simulated RISC-V CPU. Yatch was meant to show how CPUs read and execute instructions. Read everything about Yatch [here](/blog/hacktoberfest.html#yatch).

Once you have the compiled assembly code, you can use a simulator like Yatch to simulate the execution of the code. 

## Future Work

Well, the current scope of Ferry was to understand and demonstrate the working of compilers. While I would love to finish this, there are far better, superior compilers out there. This article was a simple entry into how systems work. My next steps would be delving more into the world of compilers, optimising CPU operations, and GPU computing, and understanding the mechanics behind the scenes.

This article might seem overwhelming, but it's pretty interesting to realize how all of modern computing works and see how far we've come.