---
title: 'Hey, Jude!'
date: "26-02-2025"
description: "Not a tribute to the Beatles' song. This is a product journey roadmap of Jude; why and how I would decide to build an AI-assisted nutrition tracker, and what it might look like as a full-fledged product. A case-study in product management, design, and engineering."
showImg: true
draft: true
tag: "#tech, #product, #fitness" 
---

The most annoying part of my day is deciding what and how much to eat. And, like all of you, I too rely on ChatGPT to help me with every little decision I make. From figuring out why this piece of code isn’t working and why Israel attacked Palestine to what to and how much to eat, ChatGPT had been my go-to, and now Claude. Let’s be honest here: LLM Chatbots are the new Google. They have answers to everything and are mostly accurate if you use better models. But I wanted something more robust—something faster and more organized. Thus, I said, *Hey, Jude!*

> **Note:** Jude is not an *actual* product but rather a conceptual exercise in product thinking. This article outlines my product journey roadmap—how I'd approach building an AI-assisted nutrition tracker from ideation to execution. The design and features described represent the first draft of what such a product might look like, subject to iterations and refinements through the product development process.

## The Why

Jude is an AI-powered nutritionist that helps me make healthier life choices. Now now, if you zoom out a little and not take everything into perspective, you will and should point out that Jude is nothing but a glorified AI-powered fitness app, an Excel/ Google sheet with a custom GPT to be crude. Hell, there exist, if not a thousand, different apps that do exactly the same thing. Well, you’re not all wrong, but let me implore of you this: put aside your skepticism and let me explain why Jude is different and significant, and why I built it.

### Any other ChatGPT + sheet?

***“I could literally keep a Google/Excel sheet/note/log handy and ask ChatGPT to analyze.”***

Well, yes, but no. Any Excel sheet or any other textual or tabular form of information storage gets the job done but 

1. It is **not readable enough**.

Reading and understanding data in sheets/ written format is a huge pain. It's all text, and you would have to scroll through the data to find the information you need, and sometimes it’s not easy to make sense of the data and do the math. That's why we have data analysts. They make sense of the data and provide insights.

And say even if you decide to give up on having a readable format and are happy in the low-life, messy, unorganized data, and mediocre data storage platform, you still would have to send it to ChatGPT each time you start to use it, and that’s bad because: 

2. Storing, maintaining, and updating the data **is a hassle**, & LLM Chatbots are **not efficient and fast enough**.

I have been using ChatGPT and Claude for a while now to track my daily intake. I give them a system prompt, and they get slower and slower every day upon using the same chat history. Some small nuanced differences are:

- ChatGPT has to go through the entire chat history or employs a "sliding window" mechanism to keep the context. This is why it gets slower and slower as the chat history increases. `Gpt4o`, at times the calorie math doesn’t add up, and I have to manually recheck everything. Claude focuses on the current chat history and has to go through the entire chat history. It is equally painstaking to use since as the chat grows, it gets slower and your context increases, leading to quick exhaustion of the limited context window.

And then there’s the process of adding, removing data, and updating the new data; whether you would do it manually three-four times a day or you would want ChatGPT to do it for you and confirm the data, and for that, you would keep on sending the data to ChatGPT, downloading and updating it wherever you want to store it, it’s a hassle.

#### How Jude solves this

Jude solves this problem. It tracks your daily intake, analyzes the data, and provides you with insights into your daily intake based on **your goals**. You can ask the AI to add any data and it will. But it cannot mess up the existing data and this is by design; it has an `upsert-only` mechanism that **adds only new data** after confirming with. It **doesn’t store the entire chat history**, and it doesn’t get slower as the data increases. It’s a simple, easy-to-use, and intuitive tool that helps you make healthier life choices. Jude will be designed to sync up with Apple Health, Samsung Health, and Google Fit, so you can track your daily intake and exercise in one place. It is fast, efficient, and easy to use.

Now, **what if you wanted to store** a particular diet information or regular food item that you consume every day but didn’t want to type it in every day? **What about food preferences, dietary restrictions, and other information** that you would want to store and use later? I mentioned goals. How can you set goals and track them? 

Jude saves all of your personal, dietary, and food preferences initially while creating the account. This is used tactfully in the “system prompt” to provide you with personalized recommendations and insights. Don't think technical- don't worry about prompting and maintaining the token limit and context. Let us worry about the engineering.

Jude lets you save your regular food items, and you can simply type in the name of the food item to add it to your daily log. Jude also makes it easy for you to glance at your current information and make sense of what has happened and what needs to be done to achieve your goals. It does what is needed and nothing more.

### The competition (or lack thereof)

***"Probably a billion different apps out there that do the same. Why choose a new app? Pftt!"***
 
Yes, you are right; to name a few, HealthifyMe, MyFitnessPal, LoseIt, Cronometer, and the list goes on. I have tried these apps too. There are four main issues I see with something like this:

#### 1. Terrible design

They are just **not user-friendly**. I just genuinely hate the UI/UX of most of these apps. They just make everything more and more complicated. They clutter too much information in one screen and have a shitton of features that are either too complicated, useless, or not intuitive enough for me to use them daily. It is almost impossible to track your entire journey meticulously. You have to scroll through the app to find the information you need, and sometimes it’s not easy to make sense of the data.

The primary reason for building Jude was to make it simpler and intuitive. The process of tracking nutrition, and mapping out your journey doesn't have to be riddled with unnecessary features and cluttered UI. It should be simple, easy and with an amazing UI to make you want to use it. 

#### 2. Inaccuracy

They are based on a mix—a mix of data provided by the users and data from the backend, and the data is either not accurate or there is too much data for you to make sense of. Like, there might be 8-9 "*Indian Dosas*" with different calories and nutrition written around them, or if you search for a burger, there would be tens of burgers with hundred different calories and nutritional values, and you are left to choose which one to pick. Some of them do actually have a pretty neat way of taking in images of what you eat and then providing you with the nutritional information, but that’s not always accurate, and you would have to manually enter the data if you want to be sure.

Jude simply uses multiple AI agents to provide accurate information. It uses Anthropic's most powerful `Claude 3.7sonnet` and OpenAI's most powerful model, `o1`, to provide you with the most accurate information. Most of the time, the data is accurate and you can rely on it. If you are not sure about the data, you can always ask Jude to provide you with the source of the data, or you could attach a link/ image of the nutritional information, and Jude will use that to provide you with the most accurate information.

And, it's not a simple *"AI would solve it!"*. Jude is built by keeping in mind- specific instances of **how** AI would solve it.

- Get accurate data from the most reliable sources (like USDA, etc.) and use LLMs like Claude and OpenAI to provide you with the most accurate information and Analysis.
- Use multiple AI agents that work together, delegate tasks and process each vertical of your journey parallelly. o1 is used to provide you with the most accurate information for nutrition and weight tracking. Claude can be optimised to help manage your exercise and fitness goals. 
- Effectively use `pinecone` and `mongodb` to ensure costs do not skyrocket and CAC is low with ads (based on your chat context and not personal data) to cover the costs. Or you could use your own API key to make sure that the data is not being shared with any third-party companies and not see ads. Or simply pay a small recurring fee to use the platform.
- Use a simple and intuitive interface that makes it easy to track your daily intake. A "no bullshit" markdown table for everyday and a graph-based analysis of your data.

#### 3. The cost

Most of these apps are either too expensive or have a freemium model that is too restrictive. Jude will be entirely free for you to use. It is in the early stages and would be looking for early adopters to provide feedback and help improve the platform. As an early adopter, you will have access to all the features of the platform for free. 

If there are users, who love this and start using it and the platform grows and the costs increase, there might be a small recurring cost to use the platform. But, as opposed to others, either it will be the bare minimum, probably lower than what iCloud charges you, or we might use ads to cover the costs. But, as of now, the platform will be **entirely free** for you to use. Later, you'd have options to pay for the ad-free version, but the free version will be available for you to use and will be "aesthetic enough" and have amazing UI to not be annoying. The ads will be based on the content of the platform and not on your personal data. This brings me to the next point.

For the AI part, it isn't free or cheap. Jude if made available to the public, will have the option of using your own API key to make sure that the data is not being shared with any third-party companies. You won’t have to pay anything in that case. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key and pay a small recurring fee. 

#### 4. The differentiating factor

Why do we fail (*fall*)? No, not because *"so that we can learn to pick ourselves up, master Bruce!"*. But because they are not able to **accurately** track their progress and what may seem as no weight loss can be mere muscle improvement or temporary water retention. Let me be clear: we are **not solving** for fitness! We let you do that. Jude simply gives you a reality check, an honest to god analysis of your daily intake and exercise. It is not your coach; it simply tells you what you have been followin- why or what has worked out and what could it look like going forth.

A lot of fitness-apps have already solved for this. Have they, really? You wouldn't be looking for something like this, then. You, here, reading this - interested, means that there is a gap and we are ready for it!

## The How

Building Jude, my primary concern would be design, accuracy and performance. I would spend the most amount of my time (Took 30 mins with Apple notes — built with Lovable in 5 prompts, polished with GitHub Copilot.) polishing the design of the platform and crafting the AI engineering behind it. I would want to make sure that the platform looks great, is easy to use, and is fast and accurate.

### The nitty-gritty: designing Jude

Here's the initial sketch of the landing page:

Jude has a simple and intuitive interface that makes it easy to track your daily intake. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask Jude to do it for you. It has three sections in the home page: 

- **Today's intake**
- **The current week**
- **The current month**

Each section has an analysis tab that just analyzes the data and provides you with insights on your daily intake according to your goals.

![Initial Sketch](../assets/img/heyjude/initial_sketch.jpeg)
\- Initial Sketch of the landing page

Here, my objective was to make the platform really attractive and easy to use. These are the initial drafts of the application, the *v0.xs*, and thus, do not yet look like the final product. They are just basic POCs. The homepage with the daily analysis looks somewhat like this:

<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
    <figure>
      <img src="../assets/img/heyjude/setEdit_true.jpeg" alt="Chat" class="h-50 w-75  p-1" />
      <figcaption> Manually editing the meal entries v0.3 </figcaption>
    </figure>
  </div>
  <div align="center">
    <figure>
      <img src="../assets/img/heyjude/jude_dark.jpeg" alt="Chat" class="h-50 w-75 p-1" />
      <figcaption>Dark Mode v0.4 </figcaption>
    </figure>
  </div>
</div>

The saved food section is pretty simple. It has a search bar where you can search for the food items you have saved, and you can add them to your daily log. The profile section is where you can update your personal information, dietary preferences, and goals. And, the initial design of the landing segment with the weekly and monthly analysis looks somewhat like this:


<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/monthly_weekly.jpeg" alt="Chat" class="h-75 w-100   p-1" />
    <figcaption>The initial design of the monthly and weekly sections</figcaption>
  </figure>
</div>
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/saved_food.jpeg" alt="Chat" class="h-75 w-100 p-1" />
    <figcaption>The saved food section </figcaption>
  </figure>
  </div>
</div>


### Coding up to speed

Jude will likely be built on top of the following stack:
- TypeScript + NextJs 
- Shadcn + TailwindCSS

A couple of reasons for using NextJs and Shadcn are:

- Primarily because my main focus is on the design and the UI/UX of the platform. I want to make sure that the platform looks great, is easy to use, and is fast and accurate. NextJs is fast, efficient, and easy to use, and Shadcn is a really good UI component library.
- NextJs is excellent for building server-rendered applications, and is absolutely production-grade for the use case for the MVP, I want to make sure that the platform is fast and efficient.
- Easy to find developers for JS/TS and React. I haven't met anyone who doesn't know React or NodeJs. 

The challenge begins here:

- R Native + Expo - While the MVP might be a web app, Jude is meant to be a mobile-first product. At some point, I will be switching primarily to a mobile app. I am leaning towards React Native for now, but I might switch to native later.
- NodeJs + ExpressJs - The backend would have to be separated out into a separate microservice as the product grows and scales. The mobile app would also be reliant on a separate backend. Limitations of Nextjs that would be solved by this solution are:
- Agent orchestration logic
- Fine-grained control over WebSocket connections
- Multiple, separate microservices for different tasks

The other more complex parts of the platform are:

- MongoDB + Pinecone (with TTL) - MongoDB is fast, efficient, and easy to use. Pinecone, on the other hand, can scale and be expensive. Employing TTL would help keep the costs down, BUT, this is a major tradeoff. Agents might not have access to the context necessary to provide accurate information. Let's come back to this later.
- The AI orchestration engine - The current strategy is to use multiple AI agents that work together, delegate tasks and process each vertical of your journey parallelly. It uses Anthropic's most powerful `Claude 3.7sonnet` and OpenAI's most powerful model, `o1`, to provide you with the most accurate information.

## Where do you fit in (*A user*)?

Jude is primarily meant to solve nutrition tracking and analysis. It is meant for people who are looking to make healthier life choices, track their daily intake, and analyze their data. The primary goals that come to mind are:
- Looking to lose/gain weight (including me- that's how I started with this journey):
  - Make realistic goals and track them
  - Track your daily intake and analyze your data
- Looking to build muscle mass and physique
  - Build physique and muscle mass
  - Information on targeting compound movements and isolation movements
  - Weights to start with, and how to progress
  - Muscle recovery and soreness/ fatigue
- Looking to track their daily intake and analyze their data to make healthier life choices
  - What kind of stuff to eat (good quality proteins, fats and carbs) and avoid (processed food, junk food, etc.)
  - Avoiding gluten is useless if you are not gluten intolerant. It is a fad that gluten is bad for you.
  - Similarly, wheat vs flour is the same as brown vs white rice, or sugar vs jaggery. Sugar isn't bad for you, the quantity matters and is important.
- Looking to build a healthy lifestyle - exercise, sleep, and other health-related data

If you're someone with similar goals, or if you're just someone who is looking to make healthier life choices, Jude is for you. 

## Reviews, feedback, timeline and suggestions - what next?

No idea. I have built out the initial version of the platform using React + lovable, and I am looking for feedback :) No backend yet, but given that it took me 30 minutes to an hour to build the initial mock-up of the platform, I am sure it won't take more than a couple of days at max.

<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/home1.png" alt="home 1" class="h-75 w-100 p-1" />
    <figcaption>The dashboard</figcaption>
  </figure>
</div>
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/home2.png" alt="Home 2" class="h-75 w-100 p-1" />
    <figcaption> Dashboard -cont.</figcaption>
  </figure>
  </div>
</div>

Further, here are what the nutrition, weight tracker and exercise analysis pages could potentially look like:

<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/weight.png" alt="home 1" class="h-75 w-100 p-1" />
    <figcaption> Weight </figcaption>
  </figure>
</div>
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/exercise.png" alt="Home 2" class="h-75 w-100 p-1" />
    <figcaption> Exercise </figcaption>
  </figure>
  </div>
  <div align="center">
  <figure>
    <img src="../assets/img/heyjude/nutrition.png" alt="Home 2" class="h-75 w-100 p-1" />
    <figcaption> Nutrition </figcaption>
  </figure>
  </div>
</div>

This article was a simple entry point into how my brain worked while building Jude. Jude is more of just a personal project that actually solves my problem, and I thought would be cool to share with you all. It isn't fancy tech, and there are no blockchains, graphs, distributed systems, or low-level compilations. Just first principles. It is not primarily built to **generate revenue**, or rather, I truly believe, *tar-pit* ideas as such could never generate enough revenue to be profitable, acquired, or even sustainable. Always has to be backed by some VC to sustain.

Jude, being brutally honest, is an absolute golden-wrapped blanket of a *tarpit* idea. Started as a weekend hack and is far from a blockbuster startup concept. But that’s exactly why it’s pure—built for one real user (me) to solve one real problem. If you’re curious to see how it works or want to shape its future, jump in—Jude is free for early adopters, and your feedback will drive the next chapters.

A couple of features that I could include are:

- Suggest exercises based on your daily intake and goals
- Possibly provide you with a meal plan based on your goals, what you like, and what ingredients you have
- Provide you with a shopping list every month based on the meal plan and recipes
- Support analysing sleep, exercise, and other health-related data

Honestly, I would want to be as direct as possible with you. This article was to show **how to think**, rather **what to build**. This is a product journey roadmap of Jude. I am not a product manager, nor do I have any experience in building products. I am just a student who is trying to **think** how to approach a problem statement. Not beating around the bush, but there is probably more chance of you being a millionaire **quicker** than Jude being a successful product.

And that's how you build a product - you build it for yourself. Identify a problem, ideate, strategize, and brainstorm. Make sure that it has a VIABLE BUSINESS NEED and can exist and sustain in the market. Build a product that you would want to use, and that solves your problem. And then, build it. Remember, the most important part of building a product is to build something that you love, and the working prototype is always better than the perfect idea. The world is your oyster. Go build crazy!