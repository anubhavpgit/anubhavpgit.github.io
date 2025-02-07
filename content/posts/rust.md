---
title: 'Rust: the future C++?'
date: "14-10-2022"
description: "Rust is a multi-paradigm systems programming language created to ensure high performance similar to that offered by C and C++ but with emphasis on code safety. Will it replace C++ anytime soon?"
tag: "#tech"
---
While choosing the next language to learn, or to use for building a high-performing, memory-efficient application, you might have come across Rust. Here's a breakdown of what I found about Rust and how it compares to the already existing compiled language king, C++.

Rust is a multi-paradigm systems programming language created to ensure high performance similar to that offered by C and C++, but with emphasis on code safety, the lack of which is probably why C and C++ are painful to deal with. It accomplishes memory safety without using a dedicated garbage collector. Rust is also an ahead-of-time compiled language, which means that you can compile a rust program, give it to someone else, and they can run it even without having Rust installed. However, Rust has more than just memory safety on its side. High performance while processing large amounts of data, support for concurrent programming, and an effective compiler are other reasons why well-known software heavyweights such as Firefox, Dropbox, Cloudflare, and many web-3 startups and large corporations use Rust in production.

Some questions that may come to your mind are:

1. If Rust is created to achieve performance similar to that offered by C++, then why not use C++ instead?
2. I know Java, JavaScript, and Python to be more popular choices amongst peers. Why not use those languages instead?
3. What about new languages like Go, Kotlin, Swift, etc.?

To answer these questions, let us first go through how a programming language works.

- [Programming Languages and their working](#programming-languages-and-their-working)
  - [Compilers and interpreters](#compilers-and-interpreters)
  - [Compiled Vs Interpreted languages](#compiled-vs-interpreted-languages)
- [C++: The king of programming languages](#c-the-king-of-programming-languages)
- [Memory management in programming languages](#memory-management-in-programming-languages)
  - [c++](#c)
  - [Garbage collection](#garbage-collection)
- [Rust](#rust)
  - [Rust > C++](#rust-c)



## Programming Languages and their working

A programming language is a set of instructions that can be used to interact with and control a computer. These languages can be used for a multitude of purposes, such as creating a website, analyzing data, writing a program to solve a mathematical problem, creating a game, piloting a car, building a robot, making rockets take off, controlling spacecraft and the list goes on. A computer, even though can control a rover on Mars, detect an incoming ballistic missile, and detonate it before it reaches you, cannot understand English, or anything else except **'0'** & **'1'**. Computers can be thought of to be made up of tiny switches, and can be either 'on' (1) or 'off' (0) called **'bits'**. Whatever instruction you want to execute on a computer, has to be converted into a series of '0's and '1's before it can be executed. Even a simple "Hi" is parsed as **01001000 01101001**. Yes, this is what Siri responds when you *Hey Siri*. Since the English language is vast and complicated, it is not possible to convert it into a series of '0' and '1' directly. A subset of English or any other language is created, which is called a **programming language**. High-Level Programming Languages have English-like syntax and are designed to be easy to read and write, whereas low-Level Programming Languages are designed to be easy for the computer to understand. To make things easier for us, there are tools that convert whatever we want the computer to do into a series of '0's and '1's. This series of '0's and '1's is then executed by the computer.

### Compilers and interpreters

A **compiler** or an **interpreter** is a tool that converts a program written in a programming language *(source code)* into a series of '0's and '1's that can be executed by a computer. Compilers and interpreters differ in the way they work. A compiler converts the entire program into a series of '0's and '1's *(machine code)* and then executes it. An interpreter, on the other hand, executes the program line by line.

**Why did we need interpreters?**

Compiled languages need a “build” step. You need to compile your program before you can run it. To run your program on a different computer, you will have to compile it on that computer as well. Interpreters run through a program line by line and execute each command. You can run a program without having to compile it first. This makes it easier to run programs on different computers.

Another notable disadvantage of compilers is **platform dependency** of the generated binary code. Compilers are designed to be CPU specific and run on a specific CPU architecture. This means that if you want to run a program on a different CPU architecture, you will have to compile it again.

**Why do we still make use of compilers ?**

Compilers are designed to be CPU specific, and as a result, they tend to be a lot **faster and more efficient** than interpreters. They also give the developer **more control** over hardware aspects, like memory management and CPU usage.

A compiler is faster and more efficient than an interpreter, but an interpreter is easier to write than a compiler.

### Compiled Vs Interpreted languages

Interpreted languages were once significantly slower than compiled languages. But, with the development of [just-in-time compilation](https://guide.freecodecamp.org/computer-science/just-in-time-compilation), that gap is shrinking. Modern scripting languages like Python and JavaScript are compiled to machine code at runtime using both compilers and interpreters, which makes them as fast as compiled languages. They are first compiled into an intermediate representation called **bytecode**, and then interpreted by a virtual machine which converts it to machine code.

If you're wondering what language should you choose to build your next project with, ask yourself this: what kind of platform do I want the application to run in? If you want to run your application on a web browser, you should go with JavaScript or TypeScript. If you want to run your application on a server, you may want to use Python or Go. In a mobile device, Swift or Kotlin might be the way to go. C++ is used for building complex applications and systems software, such as operating systems, browsers, and video games which require a heavy performance overhead.

*Rust*, *Go* and *C++* are popular compiled languages that are used for building high-performance applications. *Python* and *JavaScript* are popular interpreted languages that are used for building web applications.

The speed advantage of the compiled language such as Golang (Go) in comparison to an interpreted language such as Java is one of the reasons why organizations write their microservices in Go. In complex computing environments such as cloud computing environments, where users get charged for every clock cycle, it makes sense to use the most efficient deployment artifact.

## C++: The king of programming languages

C++ is a low-level, statically typed object-oriented language that allows you to have a good grasp of your computer's resources and utilize them at your convenience. Since it is a compiled language, it surpasses the performance of most of the other interpreted languages. It is an extremely powerful language and is used in many applications such as operating systems, video games, the development of compilers and interpreters, etc. It has a huge community and is one of the most popular languages in the world.

Reasons why C++'s performance is unparalleled:

1. A compiled language. C++ is extremely fast because it is a compiled language.
2. A low-level language. It allows you to cheaply use computing resources.
3. Statically typed. It allows the compiler to optimize the code.
4. Object-oriented programming. It allows you to create reusable code.
5. A general purpose language. It can be used to create any kind of application.

The issue with C++ boils down to how it **manages memory**. C++ is prone to memory leaks and dangling pointers, if not written properly.

## Memory Management in programming languages

**Variables** are named memory locations that store data. A variable is a container that holds a value. The value can be of any type, such as *integer*, *float*, *character*, etc. Example:

    int a = 10;
    float b = 10.5;
    char c = 'a';

Computer programs need to allocate memory to store variables, data values, and data structures and deallocate memory when done using them. Memory is also used to store the program itself and the run-time system needed to support it. Programming languages can be categorized as those which provide **automatic memory management** and those which ask the programmer to allocate and **free memory manually**. Requiring the programmer to manage memory manually leads to a simpler compiler and run-time but requires more work from the programmer and is more error-prone. While automatic memory management is more convenient for the programmer, it is also more complex and slower and it is achieved by the use of **garbage collection**.

### C++

C++ is a low-level language with manual memory management. C++ programs manually allocate and free memory using **pointers**.

**Pointers**
Pointers are variables that store the **address** of another variable and access the memory location of a variable. Pointers are used to pass large data structures to functions, to return multiple values from a function, to dynamically allocate memory, etc. Since there is no automatic memory management in C++, you need to be responsible for allocating and freeing memory. This process is achieved using the **malloc**, **calloc**, **new**, and **delete** keywords.

With manual memory management, a few things can go wrong like memory leaks and dangling pointers. For instance, the dangling pointer problem arises when there is an attempt to use a pointer after it has been freed. Dangling pointer errors can arise whenever there is an error in the control flow logic of a program. The use of a pointer before allocation may be a fatal run-time error. Use after deallocation is not always fatal but neither of these is a good thing.

```cpp

#include <stdio.h>
  int main()  
  {
    int *ptr=(int *)malloc(sizeof(int));  
    int a=560;  
    ptr=&a;  
    free(ptr);  
    // dangling pointer
    printf("%d",*ptr);
    return 0;  
}  

```

The above code will produce a segmentation fault since the pointer is pointing to a memory location that has been freed. To avoid this, we can set the pointer to NULL after freeing it.

```cpp

    free(ptr);
    ptr=NULL;

```

Memory leaks and dangling pointer bugs are some reasons why C++ is not preferred for applications that require a lot of memory management. To avoid such issues, languages that provide automatic memory management are preferred over C++. Scripting languages manage memory using a **garbage collector**.

### Garbage collection

Garbage is a memory that was once used by objects but will never be read or written by the program again. A garbage collector (GC) is a background process that provides automatic memory management for modern languages by taking care of the allocation and deallocation of a program’s computer memory resources. As a result, certain categories of bugs are eliminated or substantially reduced such as:-

**Dangling pointer bugs** - a piece of memory is freed, but the objects still have references – one of these references is used in the program.

**Double-free bugs** – the program attempts to free a piece of memory that has already been freed.

**Memory leaks** – if a program does not free memory that is no longer referenced by any object, it can lead to memory exhaustion over time.

Garbage collection seemed like a really good solution to the memory leak issues occurring in low-level languages such as C/C++ but, it had a few CPU issues. CPU usage increases when a significant amount of CPU time is spent in garbage collection. *Heap* is the memory that is used to allocate memory dynamically as opposed to the *stack* memory which is used to store the local variables. Local memory is quite automatic and local variables are allocated automatically. An increased allocation rate of objects on the managed heap causes garbage collection to occur more frequently.

Here are a few types of Garbage collectors:

**Mark & Sweep GC**(Tracing GC): A two-phase algorithm that first marks objects that are being referenced as “alive” and in the next phase frees the memory of objects that are not alive. JVM, C#, Ruby, JavaScript, and Golang employ this approach. JavaScript engines like V8 use a Mark & Sweep GC along with Reference counting GC to complement it. This kind of GC is also available for C & C++ as an external library.

**Reference counting GC**: Every object gets a reference count which is incremented or decremented as references to it change. Garbage is collected when the count becomes zero. This is not preferred as it cannot handle cyclic references. PHP, Perl, and Python use this kind of GC with workarounds to overcome cyclic references. This type of GC can be enabled for C++ as well.

**Automatic Reference Counting(ARC)**: Similar to Reference counting GC but instead of running a runtime process at a specific interval the retain and release instructions are inserted into the compiled code at compile-time and when an object's reference becomes zero, it is cleared automatically as a part of the code execution. It also cannot handle cyclic references and relies on the developer. ARC is a feature of the Clang compiler and provides ARC for Objective C & Swift.

**Resource Acquisition is Initialization (RAII)**: Objects and variables are *scoped*, and an object’s memory allocation is tied to its lifetime, which is from construction until destruction. It was introduced in C++ and is also used by Ada and Rust.

## Rust

Rust is a general-purpose systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. It is a multi-paradigm language that supports imperative, functional, and object-oriented programming. Rust is not only used to create low-level systems software such as operating systems, device drivers, and embedded software, but also used to create high-level applications such as web servers, command-line tools, and graphical user interfaces.

Rust builds on **RAII**( Resource Acquisition is Initialization) to provide automatic memory management. RAII is a programming technique that uses the lifetime of an object to manage the lifetime of its resources. In Rust, the compiler ensures that the memory is freed as soon as the object goes out of scope. This is achieved by the use of **smart pointers**. Rust implements borrow checking and ownership rules to ensure that memory is freed as soon as the object goes out of scope. Additionally, Rust also provides a **garbage collector** that can be used to free memory when the object goes out of scope.

>Ownership and Borrowing

```rust
#[derive(Debug)]
struct Employee {
    id : i32
}

fn main() {
    let a = Employee{id: 43} ;
    let b  = a ;
    // println!("{:?}", a) ; // error: borrow of moved value: `a`
    let c= a ;
    // println!("{:?}", a) ; // error: borrow of moved value: `a`
} 
```

>RAII

```rust
    fn main() {
        let foo = "value"; // owner is foo and is valid within this method
        // bar is not valid here 

        {
            let bar = "bar value"; // owner is bar and is valid 
            //within this block scope
            println!("value of bar is {}", bar); // bar is valid 
            //here
            println!("value of foo is {}", foo); // foo is valid 
            //here
        }

        println!("value of foo is {}", foo); // foo is valid here
        println!("value of bar is {}", bar); // bar is not valid 
        //here as its out of scope
    }
```

### Rust > C++ ?

C++ is a high-performance, general-purpose programming language that has been widely used for decades. It is known for its flexibility and ability to handle low-level tasks, making it a popular choice for systems programming and game development. C++ also has a large and active community, which means that there are many libraries and resources available for developers to use. Rust, on the other hand, is a relatively **new programming language** that was first released in 2010. It is designed to be a safe and concurrent language, with a strong focus on preventing common programming errors such as null pointer dereferences and buffer overflows.

Coming back to our questions that we were pondering upon earlier, now we get that compiled languages are preferred over interpreted languages as they are much faster and hence C++/ Go are preferred over Python/JavaScript. While C++ is extremely fast, it is also prone to memory leaks. Other languages such as Rust and Go offer better automatic memory management. Go implements a garbage collector which has a CPU usage overhead while Rust builds over RAII and implements borrow checking and ownership rules to ensure that memory is freed as soon as the object goes out of scope. Rust also provides a garbage collector that can be used to free memory when the object goes out of scope.

Will rust replace C++ anytime soon? **No**. Rust is a relatively new language and is still in its early stages of development. It is not yet widely used in production, and there are still many features that are missing. However, it is gaining popularity and is being used in many large projects, such as Firefox and Servo. C++ has been widely used for decades and has a vast amount of *legacy code*, making it difficult for Rust to replace it. C++ has a much larger community and ecosystem, with a wealth of libraries, tools, and resources, making it easier for developers to find help and resources. Rust's tooling is still evolving and may not be as mature or widely used as C++.

