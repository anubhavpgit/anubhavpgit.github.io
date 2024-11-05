---
title: 'Software Enginerering 101'
date: "01-05-2024"
description: "This is how I would go about teaching software engineering if I were to teach it; a comprehensive guide to getting started with software engineering."
draft: false
tag: "#tech"
---

I was offered to start an interesting venture: to curate a course for software engineering and to build a platform that aims at sharing my experience of getting into software engineering. Tons of platforms provide the same, but none of them are as comprehensive as I would like them to be. While fundamentally I want to impart knowledge for free, I also do not have enough time to make sit with everybody and teach them. Hence, this idea of crafting a self-sustaining curriculum capable of imparting software engineering skills to anyone keen on learning seemed apt.

This became the guiding principle behind starting [cbrtl](https://cbrtl.github.io). [Srijan](https://injuly.in) and I started cbrtl, an open-source cult that comes together as a community to build fun stuff together. Following this, I am adding my experience of getting into software engineering, and building a platform that aims at sharing this experience with each other, as a community, first-hand. 

This curriculum is designed to be self-sustaining: a collection of resources freely available on the internet. The idea is to curate these resources and present them in a structured manner. Comprehend this however you will; a guide to getting a job, or becoming a better engineer in general. **This is how I became a software engineer.**

## The Curriculum

1. **The Basics**: Familiarize yourself with the basics; programming languages, data structures, and algorithms, design patterns, etc. Not knowing how to drive, but buying a GT3 RS is a waste of money. Learning to drive in a Hyundai would be a good start. The job market is cruel, it makes you emphasize Nuxt, React, Node, Pandas, Django, Kafka, and what-not, but it wouldn't help until you know how to parse a column in *Pandas dataframe* as *Datetime* and process it, or how to push async messages in a queue and handle them in a worker thread. You could start by learning a programming language, and then move on to data structures and algorithms. 

    This can be your starting point to becoming a god-tier Python or TS dev, writing clean, efficient, and maintainable code, writing lambda functions, higher-order functions and closures while working with tech like databases, web development/ machine learning. With the basics ceared, it wouldn't be difficult to comprehend these. They start off scary but are pretty simple once you get the hang of it.

    This step also requires you to start building stuff parallelly. React may look like it's just `npx create-react-app`, `npm start`, and a bunch of useless `useStates`, `useEffects`, and `props`, but it's not. Think more on the lines of building a component library, a design system, with a bunch of hooks, a bunch of context providers, and a full-fledged application that can handle a million users.

2. **The Advanced**: After you've built your first to-do app or your first ML model that predicts movie ratings, or maybe an FPS game, you feel contempt and proud, wiping the sweat off your forehead. You'd want to post on LinkedIn, share your code, manage it on GitHub, and show it off to your friends. This is where it gets more interesting.

    This is where you start to think about the architecture of your application, and how to make it scalable, fault-tolerant, and secure. You'd want to monitor your application, and make sure it's running smoothly. You would not want anybody accessing your data, securing them, and allowing only a selected few to access it. The differences between a monolith and a microservice architecture help.

- [Languages](#languages)
- [Problem Solving/ Data Structures](#problem-solving-data-structures)
- [Building](#building)
- [System Design & Architecture](#system-design-architecture)
- [Resume](#resume)
- [Next?](#next)

Start by learning to write code. This involves you to learn the basics of a programming language, and start solving a few problems to get the hang of it.

I'd be choosing *C++* here. Despite being categorized as a high-level language, it retains a lower-level essence when compared to the likes of Python or JavaScript/TypeScript. With its manual memory management and requirement to construct everything from scratch, C++ fosters a deeper understanding of coding principles. You become less reliant on pre-existing libraries and functions, thereby honing your coding prowess.

### Languages

Pick up a language, and **stick to it**. Python, JavaScript, Java *(well, not Java, that is shit. "But, but, but....." shhhhhhh.)*, C++, Go, Rust, etc. are all good choices. It doesn't matter which language you pick. Real-world applications require you to know the basics and learn the rest on the go. You can always learn as many languages you wish.

Start by getting into the [documentation](https://devdocs.io/cpp/), learning the basics, and then moving on to practising. Now, the process of reading through documntation and can get a bit tedious and boring, but the habbit of reading and understanding documentation is extremely important. It is the fastest way. Otherwise, there are [a ton of tutorials on YouTube that help you learn C++](https://www.youtube.com/results?search_query=c%2B%2B+crash+course).

The problem with visual-based learning is that it is **inherently slow**; I am trying to make this process faster and more efficient by sharing everything you need to know to get started. Here's a comprehensive guide on `C++`, and `stdlib`:

[**C++**: a short guide to getting started with cbrtl ->](/blog/c++.html)

To get the hang of C++, let's start with HackerRank or Leetcode. Each platform has multiple levels, and each level is associated with a difficulty jump.

### Problem Solving/ Data Structures

Moving on to **problem-solving and critical thinking**, there are multiple steps to develop this.The first would be to go ahead and follow the [generic approach](https://leetcode.com), and the next is to [start building](https://github.com/fuzzymx). To solve a problem, you need to think about how to approach the problem, and then write code to solve it. This is where you'd want to learn about data structures and algorithms.

For example, if you're given a problem to find the maximum element in a given set of numbers, you'd want to think about how to approach the problem. You could start by having a variable for a maximum number, and then pick up each number from set to check if the number that you see is greater than the maximum number you've seen so far. If it is, then you'd want to update the maximum number. For this, you would want to have a **data structure** *(array)* to store the numbers, and an **algorithm** *(loop)* to iterate over the numbers.

DSA is vast and takes a lot of space. Resouces are scattered all over the internet. The ones that I have come across are either too verbose, or too concise We'd be following our in-house comprehensive guide to getting started with DSA:

[**DSA**: a comprehensive guide to getting started with most common data structures and algorithms ->](/blog/dsa.html) (*under construction*)

The best way to get started with DSA is to solve problems. There are a lot of platforms that provide you with problems to solve. Some of the most popular sought-after LeetCode problems are:

- [This 200 list of problems I found somewhere on the internet](https://github.com/fuzzymfx/LC-200/blob/main/Leetcode%20Questions%20-%20200.xlsx)
- [SDE sheet by Striver](https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/)
- [450 questions by Love Babbar](https://github.com/fuzzymfx/DSA-450/blob/main/Final-450.pdf)

There's no particular order in which you should solve these problems. You could start with the easy ones, and then move on to the hard ones. The idea is to get the hang of it, and then move on to building stuff. With the curriculum, you can follow a curated mix of all of these: solve some problems from all of these lists. The number depends on the target you set. You could cover 250+ problems, or 100, or 50. It's up to you. There's no single way to do this.

I haven't completed all, this also essentially helps me as well. Here are my repos for the same, feel free to track my progress:

- [LC200](https://github.com/fuzzymfx/LC-200/)
- [DSA450](https://github.com/fuzzymfx/DSA-450/)
- [Striver's SDE Sheet](https://github.com/fuzzymfx/SDE-sheet)

Parallelly, you could start utilizing your DSA superpowers into building stuff. This is where the fun begins.

### Building

We'd be looking at building entirely new applications from scratch, deploying them to a server, making them accessible through the internet, or maybe using a serverless architecture. We can get a domain, and host it on a server, or use a cloud provider like AWS, GCP, or Azure, if you want.

cbrtl was meant to be a hub for projects. You can have various interests and domains. You could be wanting to become a game developer, a data scientist, a web developer, or a backend developer. 

A common starting point would be getting familiar with the language you want to build your project in. You could start off with a simple project, and then move on to more complex ones. Here are a few projects that I have built:

Here are three projects that I help you run through:
- [**College Resource Sharing Platform**: a React-based platform to share resources ->](/blog/resoc.html)<span id="react-system-design"></span>
- [**Image Compression/ Decompression**: a Quadtree based image compression/ decompression algorithm ->](/blog/qtree.html)

### System Design & Architecture

While building your distributed chat server, or asocial-media applications like Facebook, a smart parking system with ANPR detection and object detection using security cameras, or a content recommendation system like Netflix, you'd want to think about the architecture of your application. You could build a single monolithic application, a distributed microservice architecture, a message queue, a pub-sub system, a database, or a cache. 

Some of the things you could think about are:

- What happens if there are tens of thousands of requests coming in every second? How do you make sure there is no downtime?
- What if the server crashes?
- How do you make sure that the user data is secure?
- What could be the schema of the database? Should you use an SQL or a NoSQL database?
- How do you make sure the data is secure? What if there is a DDoS attack?
- How do you monitor the application? What if there is a bug in the code?
- How do you deploy your application seamlessly?
- What if you do not want the entire Internet to access your data/ app?
- Do the current users like the user interface? How do you make sure that the UI is user-friendly? 

System designing is essential to build solid, production-grade applications. It makes sure that the application is equipped to handle whatever is thrown at it. We'd be deploying, scaling and building inherent architectures for all the projects that we build. For ex., the react-based college resource-sharing platform [⏎](#react-system-design) is deployed on Firebase, and the image compression/ decompression algorithm is deployed using GitHub Actions on GitHub Pages.

[**System Design**: a comprehensive guide to designing your own system ->](/blog/system-design.html) gives you a comprehensive guide on how to design your own system.

<!-- Here are two systems that I have designed for the projects that I have built: -->
<!-- - [*A distributed database system in Rust*]() -->


### Resume

Your resume/ portfolio makes you stand out in the crowd. It is the first thing that a recruiter sees. **If** you're pursuing this curriculum to get a job, you'd want to make sure that your resume is top-notch. There are a lot of varied opinions on how to build a resume. Some say it should be a single page, some say it can be two pages, and some ask you to only put in things that you have worked on and not lie on your resume. In the end, it's up to you how you want to build it.

Resumes are highly subjective, and you can choose to build them however you want. I'm sharing mine here. In the end, your projects, work experience, and skills would speak for themselves. Your resume should effectively communicate what you have done, and what you can do. Make sure you can highlight what you've done and it stands out.

[**Resume Building**: a short guide to building your resume](/blog/resume-building.html) is what I followed to build my resume. 

## Next?

I hope this series of articles was verbose enough to help you get started. The idea was to share everything I had knowledge and hands-on experience on and help you get started on your journey to becoming a software engineer.

## cbrtl

[cbrtl](https://cbrtl.github.io) was a small, tight knit group of programmers and open source sorcerers who like to craft fun projects together and build a community; a platform we started in our college days that aimed at sharing this experience with you, first-hand. The primary goal still remains the same: to empower you to build stuff and become a better engineer.
