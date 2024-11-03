---
title: "Docking Compilers at Hacktoberfest'24"
date: "02-11-2024"
description: "Compilers and interpreters for C/C++ and machine code for RISC-V at Hacktoberfest, a month-long celebration of open source software."
tag: "tech"
draft: false
---
Hacktoberfest is a fantastic opportunity to dive into the world of open source, make meaningful contributions, and sharpen your dev skills. This year, I'm most excited about these two projects:

1. [Ferry](#current-ferry): A simple C/C++ cross-compiler for RISC-V, written in Rust.

 The aim here is to learn more about compilers, the workings of CPUs, and computer systems architecture. This a great project to get started with if you're keen to learn about low-level programming. I'd love to collaborate with others who share similar interests. 

Usually, folks reaching out to me look out for Python and JavaScript projects, and most contributors gravitate towards these high-level languages, but I encourage you to explore Rust. It offers a new programming paradigm, especially in terms of memory and type safety, areas where Python and JavaScript typically fall short.

For those uncomfortable with Rust, I've also thought of a lighter alternative called. 

2. [Yatch](#current-yatch): a machine code interpreter for RISC-V written in C++. 

 This project is a bit more beginner-friendly, and you can get started with it even if you're not familiar with Rust. It's a great way to learn about machine code, and how CPUs execute instructions.

### RISC-V ISA 

RISC-V is an open-source instruction set architecture (ISA) based on established reduced instruction set computing (RISC) principles. Here is the ISA: [RISC-V IS Table](https://five-embeddev.com/riscv-user-isa-manual/Priv-v1.12/instr-table.html).

The base ISA consists of approximately 40 instructions, and our project aims to implement most of them. These instructions are broadly classified into the following categories:

- **RV32I**: Base Integer Instruction Set
- **RV32M**: Integer Multiplication and Division
- **RV32A**: Atomic Instructions
- **RV32F**: Single-Precision Floating-Point
- **RV32D**: Double-Precision Floating-Point
- **RV32C**: Compressed Instructions
- **RV32S**: Supervisor-Level Instructions
- **RV32B**: Bit Manipulation Instructions
- **RV32V**: Vector Extension
- **RV32Zicsr**: Control and Status Register Instructions
- **RV32Zifencei**: Instruction-Fetch Fence Instructions

Instruction Formats:

- **R**: Register-Register Operations
- **I**: Immediate Operations
- **S**: Store Operations
- **B**: Branch Operations
- **U**: Upper Immediate Operations
- **J**: Jump Operations

## Yatch

[Yatch](https://github.com/fuzzymfx/yatch.git) is a machine code interpreter for RISC-V written in C++. It is a simpler interpretation of how RISC-V CPUs execute instructions.

The current implementation follows a single-stage pipeline and supports RV32I instructions. The process for all the other Instruction Types will be similar, and I'm working on adding support for more instructions and implementing a five-stage pipeline.

To get started with Yatch, you need a C++ compiler. You can use `g++` or `clang++` to compile the code. 

Compile and run the code using the following commands:

```bash
$ g++ -std=c++20 -o yatch src/main.cpp
$ ./yatch src/io
```

### Walkthrough

The process of executing instructions is divided into five stages:
- IF: Instruction Fetch
- ID: Instruction Decode
- EX: Execution
- MEM: Memory Access
- WB: Write Back

The main code runs in a loop, it keeps processing instructions until either it encounters a `HALT` instruction or reaches the end of the program. The interpreter has two main "pipelines" for executing instructions:

1. Single Stage Pipeline: One instruction is executed at a time. The interpreter fetches the instruction, decodes it, executes it, accesses memory, and writes back the result in a single cycle, repeats the process for the next instruction. 
 Example: (instruction in memory)
    ```txt
 00000000
 00000000
 00000000
 10000011
    ```

 (data in memory)
    ```txt
 01010101
 01010101
 01010101
 01010101
    ```

 This instruction translates to `lb x1, 0(x0)` in RISC-V assembly. It loads a byte from memory into register `x1`. 

    - **Instruction Fetch (IF)**: The interpreter fetches the instruction from memory. A program counter (PC) keeps track of the current instruction. An instruction in RISC-V is 32 bits long. Yatch stores the instructions in memory as an array of 8-bit integers.
    ```cpp
    while (getline(imem, line)){
     IMem[i] = bitset<8>(line);
     i++;
        }
    ....
    bitset<32> instruction;
    for (int i = 0; i < 4; ++i){
     instruction <<= 8; // Shift left by 8 bits to make room for the next byte
     instruction |= bitset<32>(IMem[address + i].to_ulong()); // Combine the next byte
     // 00000000 00000000 00000000 10000011
    }

    return instruction;
    ....
    ```
    
 The reason why Yatch stores instructions in memory as an array of 8-bit integers and not 32-bit integers is that the instructions are read from a file, and each line in the file is 8-bits long. However, future implementations might change this.
    
 The program counter (PC) increases by 4 bytes (32 bits) after each instruction.

    - **Instruction Decode (ID)**: The instruction is decoded and the opcode and operands are extracted. Now, based on the opcode, the interpreter knows which instruction to execute.
    - Opcode (bits 0-6): 0000011 - This is a Load instruction.
    - Funct3 (bits 12-14): 000 - Specifies the type of load, which is LB (Load Byte).
    - Destination Register (rd) (bits 7-11): 00001 - Register x1.
    - Source Register (rs1) (bits 15-19): 00000 - Register x0.
    - Immediate (bits 20-31): 000000000000 - Immediate value 0.  
    <br>

    - **Execution (EX)**: Straightforward. The instruction is executed according to the specific case. For the `lb` instruction, the interpreter reads the byte from memory and stores it in the destination register.

    ```cpp
    switch (opcode){
        case 0x33:{ // R-type instructions
        switch (funct3){
            case 0x0:
            if (funct7 == 0x00){
     result = bitset<32>(myRF.readRF(rs1).to_ulong() + myRF.readRF(rs2).to_ulong()); // ADD
                } else if (funct7 == 0x20){
     // SUB
    .....
    
        case 0x03:{ // I-type instructions
        switch (funct3){
            case 0x0:
     // LB
     result = bitset<32>(myRF.readRF(rs1).to_ulong() + imm.to_ulong());
            break;
        }
    }
    ```

    - **Memory Access (MEM)**: The interpreter reads the byte from memory and stores it in the destination register. Yatch reads the memory from a file and uses an 8-bit array to store the memory. Once all the instructions are executed, the memory is written back to a file. It further uses specific functions to read specific memory locations.

    ```cpp
    while (getline(dmem, line)){
     DMem[i] = bitset<8>(line);
     i++;
    }
    ....
    bitset<8> readByte(uint32_t address){
        if (address < DMem.size())
        return DMem[address];
        else {
            throw runtime_error("Read Byte Error: Address out of bounds."); // Handle out-of-bounds access
            return bitset<8>(0);
        }
    }
    ```

 The opcode in the example is **0000011**, I type the instruction, which corresponds to the `load` instruction. Funct3 is **000**, corresponding to the `lb` instruction. The `lb` instruction **loads a byte** from memory into a register. Similarly, a different funct3, for ex. *010* would correspond to the `lw` instruction, which loads a word from memory into a register. The primary step is to switch on the opcode and execute the corresponding instruction.


 Memory is handled using registers. Yatch uses a 32-bit vector to store 32 registers. The registers are read and written depending on the instruction. The memory is stored in an array of 8-bit integers. The instruction loads a byte from memory at the address calculated by adding the immediate offset 0 to the value in register x0 (always 0 as x0 is hardwired to 0 in RISC-V). The data in the 0th memory location(01010101) is read and stored in the destination register. 

    - **Write Back (WB)**: The result of the operation is written back to the register file.

    ```cpp
    Registers. resize(32); // 32 registers in total, each 32 bits wide
    Registers[0] = bitset<32>(0); // Register x0 is always 0 in RISC-V

    bitset<32> readRF(bitset<5> Reg_addr){
        uint32_t reg_index = Reg_addr.to_ulong(); // Converts Reg_addr to integer for indexing
        return Registers[reg_index]; // Returns the register value at the given index
    }   

    void writeRF(bitset<5> Reg_addr, bitset<32> Wrt_reg_data){
        uint32_t reg_index = Reg_addr.to_ulong(); // Converts Reg_addr to integer for indexing
        if (reg_index != 0) Registers[reg_index] = Wrt_reg_data; // Write the data to the register
    
        else throw runtime_error("Cannot write to register x0.");   
    }
    ```
This entire journey is completed in a single cycle. This serves as a good simulator for understanding how CPUs execute instructions, but the real-world compute requires a more complex pipeline, parallel processing; and multiple instructions executed simultaneously.

2. Five-Stage Pipeline: The interpreter fetches the instruction, decodes it, executes it, accesses memory, and writes back the result in five cycles. Each cycle is dedicated to a specific stage of the process, and the interpreter processes multiple instructions simultaneously. This is a more realistic representation of how modern CPUs execute instructions. (*Work in progress*)

## Ferry

Ferry is a simple C/C++ cross-compiler for RISC-V, written in Rust. The project is still in its early stages, and I'm working on setting up the project structure and writing the lexer. (*Work in progress*)
