---
title: 'c++'
date: "01-05-2024"
description: "Starting with c++ in cbrtl"
draft: false
index: false
tag: "#tech"
---

Before starting with this, I wanted to ensure that if at any point you feel that you're not able to undetstand or grasp what is written in this page, that is **totally understandable**. These concepts are better understood when practiced, not theoretically. So, if you're not able to understand something, don't worry, once you start writing code, you'd get a hang of it.

#### C++

You can use any IDE (playgrounds to experiment with your code in your machine), or any online compiler (online playground) you're comfortable with. I'd recommend using [Repl.it](https://repl.it) for the time being. It's free, and you can run your code without any hassle.

```cpp
#include <iostream>

int main() {
  std::cout << "Hello, World!\n";
}
```

#### Getting started

C++ is a statically typed, compiled, general-purpose, case-sensitive, free-form programming language that supports procedural, object-oriented, and generic programming. C++ is regarded as a middle-level language, as it comprises a combination of both high-level and low-level language features.

- Statically typed: data types are checked at compile time
- Compiled: code is translated into machine code before execution
- *Interpreted: code is translated into machine code during execution. Eg: Python, JavaScript, Ruby, etc. **C++ is not an interpreted language***
- General-purpose: can be used to develop a wide range of applications, such as operating systems, games, and software applications
- Case-sensitive: variable names are case-sensitive, e.g. x and X are different variables
- Free-form: does not require the use of specific indentation or spacing, e.g. Python requires indentation
- Object-oriented: supports classes and objects, but also supports procedural programming
- Generic programming: supports features such as templates
- *Functional programming: supports features, such as lambda expressions, but C++ is **not** a functional programming language. Eg: Haskell, Lisp, etc.*

All of this would start making more sense as we move on. Like Inception.

#### Syntax

The syntax of C++ is this set of magical rules that tells the compiler what to do. Computers understand only 0's and 1's, and the syntax is the set of rules that tells the compiler how to convert the code you write into 0's and 1's.

Here's an example:

```cpp
#include <iostream> // Preprocessor directive: This is a header file that contains the definition for the input/output stream objects
#include <string> // There can be multiple header files in a program
// Comments: Comments are used to explain the code. They are ignored by the compiler

// This is a single-line comment

/*
This is a multi-line comment
*/

int main() { // The main function that runs when the program is executed
 /* In C++, the main() function serves as the entry point, and it's always called when the program starts executing.
 The int before the main() function indicates that the function returns an integer value. */
 std::cout << "Hello, World!\n"; // This is a statement
 return 0; // This is also a statement
}

```

Having a defined boundary of rules makes it possible for the compiler to have a clear understanding of what you're trying to do. This is why we cannot write code in plain English and expect the compiler to understand it. C++ requires you to end the statement with a semicolon `;`, this tells the compiler that the statement has ended.

#### Variables

Variables are used to store data. In C++, you need to declare a variable before you can use it. Here's an example:

```cpp
int x = 5; // Declaring a variable named x and assigning it the value 5
// x is an integer variable of size 4 bytes
```

#### Data Types

Each data in C++ has a type which determines the size and layout of the data stored in memory, the range of values that can be stored, and the set of operations that can be applied to the data. The basic data types in C++ are:

- `int`: Integer (whole number) e.g. 5, 10, 15 etc.: 4 bytes
- `char`: Character e.g. 'a', 'b', 'c' etc.: 1 byte
- `float`: Floating point e.g. 1.2, 3.4, 5.6 etc.: 4 bytes
- `double`: Double precision floating point e.g. 1.234, 5.678 etc.: 8 bytes
- `bool`: Boolean e.g. true, false: 1 byte
- `void`: Valueless: 1 byte

These are called primitive data types. The non-primitive data types in C++ are:

- Arrays: A collection of elements of the same data type
- Strings: A collection of characters
- Pointers: A variable that stores the memory address of another variable
- References: An alias for a variable
- Structures: A user-defined data type that can store multiple data types
- Classes: A user-defined data type that can store data and functions
- Enumerations: A user-defined data type that consists of a set of named integer constants

#### Constants

Constants are like variables, except that their values cannot be changed after they are defined. Constants can be used to make your code more readable and maintainable. In C++, you can define a constant using the `const` keyword. Here's an example:

```cpp
const int x = 5; // Declaring a constant named x and assigning it the value 5
```

#### Operators

Operators are used to perform operations on variables and values. C++ has the following types of operators:

- Arithmetic operators: +, -, *, /, %
- Assignment operators: =, +=, -=, *=, /=, %=
- Comparison operators: ==, !=, >, <, >=, <=
- Logical operators: &&, ||, !
- Bitwise operators: &, |, ^, ~, <<, >>

#### Control Structures

Control structures are used to control the flow of a program. C++ has the following control structures:

- `if` statement: Used to execute a block of code if a condition is true
- `else` statement: Used to execute a block of code if the same condition is false
- `else if` statement: Used to specify a new condition if the first condition is false
- `switch` statement: Used to select one of many code blocks to be executed
- `for` loop: Used to execute a block of code a specified number of times
- `while` loop: Used to execute a block of code as long as a condition is true
- `do...while` loop: Used to execute a block of code once, and then repeat the loop as long as a condition is true (it's like a while loop, but the condition is checked after the block of code is executed, so the block of code is always executed at least once) (not used much)
- `break` statement: Used to break out of a loop
- `continue` statement: Used to skip the current iteration of a loop
- `goto` statement: Used to jump to a specific label
- `return` statement: Used to return a value from a function
- `try`, `catch`, `throw`: Used to handle exceptions
- `using namespace` statement: Used to include a namespace in the program

#### Functions

Functions are used to perform a specific task. You can define a function to perform a task and then call that function whenever you need to perform the task. Here's an example:

```cpp
void myFunction() { // Defining a function named myFunction
 std::cout << "Hello, World!\n"; // This is a statement
}

int main() {
 myFunction(); // Calling the function named myFunction
 return 0;
}
```

#### Memory Management

When the program executes, it requires memory to store data and execute code. The memory is divided into two parts: the **stack** and the **heap**. The stack is used to store variables that are declared inside functions, and the heap is used to store variables that are declared using `new`.

The `stack` is a region of memory that is used to store variables that are declared inside functions. The stack is a LIFO (Last In First Out) data structure. Imagine a stack of PS5 CDs. The last CD that was put on the stack is the first one to be removed. The `heap` is a region of memory that is used to store variables that are declared using `new`. The heap is like a glob of memory that can be used to store variables that are not declared inside functions.

When a function is called, a block of memory is allocated on the stack for the function's variables. When the function returns, the block of memory is deallocated by the compiler. This is done automatically by the compiler, and you don't have to worry about it.

Unlike Python and JavaScript, C++ requires you to manually manage memory that is allocated on the heap. This is done using `new` and `delete` operators. The `new` operator is used to allocate memory, and the `delete` operator is used to deallocate memory.

We are not going to be using the `new` and `delete` operators in our code. Mostly because it is unnecessary. For the code we write, this would not be coming up much. While we move on and build applications, we'd be using libraries that handle memory management for us. There might be instances where we'd have to manually manage memory, but that would be rare.

Also, we'd not be extensively using C++ for building applications. We'd be using Python, JavaScript, or TypeScript. C++ is just a way to get the hang of programming, to understand the basics, and to write clean, efficient code.

#### Object Oriented Programming

Object-oriented programming (OOP) is a programming paradigm that uses "objects" to design applications and computer programs. It is based on the concept of "objects," which can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods).

In C++, classes are used to define objects. A class is a user-defined data type that contains data members (variables) and member functions (methods). Here's an example:

```cpp
class Animal { // Defining a class named MyClass
public: // Access specifier
 std::string name; // Data member (variable)
 void bark() { // Member function (method)
  std::cout << "Woof!\n"; // This is a statement
 }
};

int main() {
 Animal myDog; // Creating an object of the class MyClass
 myDog.name = "Buddy"; // Accessing the data member name of the object myDog
 myDog.bark(); // Calling the member function bark() on the object myDog
 return 0;
}
```

This might be confusing now, but it'd make sense when we start writing code.

#### Standard Library

The C++ Standard Library is a collection of classes and functions that are part of the C++ ISO Standard. The Standard Library is divided into two parts: the Standard Library and the Standard Template Library (STL). The Standard Library contains classes and functions that are used to perform common tasks, such as input/output, string manipulation, and memory management. The STL contains classes and functions that are used to perform more complex tasks, such as sorting, searching, and using data structures.

We'll come across this while writing code. We'd be using the `iostream` library to print stuff to the console, and the `string` library to work with strings. We'd also be using the `vector` library to work with arrays, and the `map` library to work with key-value pairs.

While it's true that languages like Python and JavaScript are often preferred for certain types of applications like web development and data science, C++ remains widely used in many domains, including systems programming, game development, and high-performance computing. Learning C++ can open up a wide range of opportunities for you as a software engineer.


#### Next?

Again, I would like to make this known that it is totaly fine if you get stuck somewhere, do not understand *classes*, *objects*, *pointers*, *references*, etc. You'll start getting a hang of it as you start writing code.
