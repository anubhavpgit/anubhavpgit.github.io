---
title: 'Hey, Jude! (Senseii)'
date: "26-02-2025"
description: "Not a tribute to the Beatles' song. This is a product journey roadmap of Jude; why and how I decided to build an AI-assisted nutrition tracker, and what it might look like as a full-fledged product."
draft: false
index: false
tag: "#tech, #product"
---

The most annoying part of my day is deciding what and how much to eat. And, like all of you, I too rely on ChatGPT to help me with every little decision I make. From figuring out why this piece of code isn’t working and why Israel attacked Palestine to what to and how much to eat, ChatGPT had been my go-to, and now Claude. Let’s be honest here: LLM Chatbots are the new Google. They have answers to everything and are mostly accurate if you use better models. But I wanted something more robust—something faster and more organized. Thus, I said, *Hey, Jude!*

> Before I go ahead and rant, keep in mind that right now, Jude is in its *Alpha* build. Also, **Jude is [Senseii](https://senseii.in) now!** [Prateek](https://www.prateeksingh.tech/) was also building something similar to Jude, and we decided to build this together. Senseii as a product was exactly what I had imagined Jude to be, and Senseii is the name we decided to stick with. This article is a product journey roadmap of Jude, and how I am deciding to build it in public.

> This article is based on what I wanted Jude to be and is the first *draft journey roadmap. There will be multiple iterations, hundreds of feature changes and architectural changes and thus, this article might not reflect what Jude turns out to be. The current version may vastly differ from this design.

## The Why

Jude is an AI-powered nutritionist that helps me make healthier life choices. Now now, if you zoom out a little and not take everything into perspective, you will and should point out that Jude is nothing but a glorified AI-powered fitness app, an Excel/ Google sheet with a custom GPT to be crude. Hell, there exist, if not a thousand, different apps that do exactly the same thing. Well, you’re not all wrong, but let me implore of you this: put aside your skepticism and let me explain why Jude is different and significant, and why I built it.

### Any other ChatGPT + sheet?

***“I could literally keep a Google/Excel sheet handy and ask ChatGPT to analyze.”***

Well, yes, but no. Any Excel sheet or any other textual or tabular form of information storage gets the job done but 

1. It is **not readable enough**.

Reading and understanding data in sheets/ written format is a huge pain. It's all text, and you would have to scroll through the data to find the information you need, and sometimes it’s not easy to make sense of the data and do the math. That's why we have data analysts. They make sense of the data and provide insights.

And say even if you decide to give up on having a readable format and are happy in the low-life, messy, unorganized data, and mediocre data storage platform, you still would have to send it to ChatGPT each time you start to use it, and that’s bad because: 

2. Storing, maintaining, and updating the data **is a hassle**, & LLM Chatbots are **not efficient and fast enough**.

I have been using ChatGPT and Claude for a while now to track my daily intake. I give them a system prompt, and they get slower and slower every day upon using the same chat history. Some small nuanced differences are:

- ChatGPT is based on a transformer model, and it has to go through the entire chat history or employs a "sliding window" mechanism to keep the context. This is why it gets slower and slower as the chat history increases. `Gpt4o`, at times the calorie math doesn’t add up, and I have to manually recheck everything. 

- Claude, also based on a transformer model, focuses on the current chat history and doesn't have to go through the entire chat history. It is equally painstaking to use since as the chat grows, it gets slower and your context increases, leading to quicker exhaustion of the context window. Thus, you'd have to send the same prompt again and again, every day when you start a new chat. It doesn't support web search, and thus, you have to keep on sending relevant nutritional information to it.

And then there’s the process of adding, removing data, and updating the new data; whether you would do it manually three-four times a day or you would want ChatGPT to do it for you and confirm the data, and for that, you would keep on sending the data to ChatGPT, downloading and updating it wherever you want to store it, it’s a hassle.

Jude solves this problem. It tracks your daily intake, analyzes the data, and provides you with insights into your daily intake based on **your goals**. You can ask the AI to add any data and it will. But it cannot mess up the existing data and this is by design; it has an `upsert-only` mechanism that **adds only new data** after confirming with. It **doesn’t store the entire chat history**, and it doesn’t get slower as the data increases. It’s a simple, easy-to-use, and intuitive tool that helps you make healthier life choices. Jude will be designed to sync up with Apple Health, Samsung Health, and Google Fit, so you can track your daily intake and exercise in one place. It is fast, efficient, and easy to use. You can also decide to stick to any fitness app you are using, and Jude will sync up with it, provided you have a way of exporting data from that app.

Now, as a product, if there is no history stored, **what if you wanted to store** a particular diet information or regular food item that you consume every day but didn’t want to type it in every day? **What about food preferences, dietary restrictions, and other information** that you would want to store and use later? I mentioned goals. How can you set goals and track them? 

Jude saves all of your personal, dietary, and food preferences initially while creating the account. This is used in the “system prompt” to provide you with personalized recommendations and insights. It lets you save your regular food items, and you can simply type in the name of the food item to add it to your daily log. Jude also makes it easy for you to glance at your current information and make sense of what has happened and what needs to be done to achieve your goals. It does what is needed and nothing more.

### The competition (or lack thereof)

***"Probably a billion different apps out there that do the same. Why choose a new app? Pftt!"***
 
Yes, you are right; to name a few, HealthifyMe, MyFitnessPal, LoseIt, Cronometer, and the list goes on. I have tried these apps too. There are four main issues I see with something like this:

#### 1. Terrible design

They are just **not user-friendly**. I just genuinely hate the UI/UX of most of these apps. They just make everything more and more complicated. They clutter too much information in one screen and have a shitton of features that are either too complicated, useless, or not intuitive enough for me to use them daily. It is almost impossible to track your entire journey meticulously. You have to scroll through the app to find the information you need, and sometimes it’s not easy to make sense of the data.

The primary reason for building Jude was to make it simpler and intuitive. The process of tracking nutrition, and mapping out your journey doesn't have to be riddled with unnecessary features and cluttered UI. It should be simple, easy and with an amazing UI to make you want to use it. 

#### 2. Inaccuracy

They are based on a mix—a mix of data provided by the users and data from the backend, and the data is either not accurate or there is too much data for you to make sense of. Like, there might be 8-9 "*Indian Dosas*" with different calories and nutrition written around them, or if you search for a burger, there would be tens of burgers with hundred different calories and nutritional values, and you are left to choose which one to pick. Some of them do actually have a pretty neat way of taking in images of what you eat and then providing you with the nutritional information, but that’s not always accurate, and you would have to manually enter the data if you want to be sure.

Jude simply uses multiple AI agents that work together, delegate tasks and process each vertical of your journey parallelly. It uses Anthropic's most powerful `Claude 3.7sonnet` and OpenAI's most powerful model, `o1`, to provide you with the most accurate information. Most of the time, the data is accurate and you can rely on it. If you are not sure about the data, you can always ask Jude to provide you with the source of the data, or you could attach a link/ image of the nutritional information, and Jude will use that to provide you with the most accurate information.

#### 3. The cost

Most of these apps are either too expensive or have a freemium model that is too restrictive. Jude will be entirely free for you to use. It is in the early stages and would be looking for early adopters to provide feedback and help improve the platform. As an early adopter, you will have access to all the features of the platform for free. 

If there are users, who love this and start using it and the platform grows and the costs increase, there might be a small recurring cost to use the platform. But, as opposed to others, either it will be the bare minimum, probably lower than what iCloud charges you, or we might use ads to cover the costs. But, as of now, the platform will be **entirely free** for you to use. Later, you'd have options to pay for the ad-free version, but the free version will be available for you to use and will be "aesthetic enough" and have amazing UI to not be annoying. The ads will be based on the content of the platform and not on your personal data Jude doesn't store your data or would not sell your data to any third party. This brings me to the next point.

#### 4. Privacy concerns

Jude is built with privacy in mind. You choose what data you want to share and with whom. You can choose to keep your data private; save all your data locally on your personal device and use it on that particular device or share it with Jude which would let you sync it across multiple devices. In any case, Jude does not store any of your personal information, and all personal data is encrypted. The layer in between abstracts the data and sends only the necessary information to the AI. This is also why Jude would use your own AI `API Key`.

For the AI part, it isn't free or cheap. Jude if made available to the public, will be using your own API key to make sure that the data is not being shared with any third-party companies. You won’t have to pay anything in that case. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key and pay a small recurring fee. 

<!--https://claude.ai/share/44639d08-96da-4077-ac6b-9bb16cfe9478 -->

## The How

Building Jude, my primary concern was design, accuracy and performance. I spent the most amount of my time polishing the design of the platform and crafting the AI engineering behind it. I wanted to make sure that the platform looks great, is easy to use, and is fast and accurate.

### The nitty-gritty: designing Jude

Here's the initial sketch of the landing page:

Jude has a simple and intuitive interface that makes it easy to track your daily intake. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask Jude to do it for you. It has three sections in the home page: 

- **Today's intake**
- **The current week**
- **The current month**

Each section has an analysis tab that just analyzes the data and provides you with insights on your daily intake according to your goals.

![Initial Sketch](../assets/img/jude/initial_sketch.jpeg)
\- Initial Sketch of the landing page

Here, my objective was to make the platform really attractive and easy to use. These are the initial drafts of the application, the *v0.xs*, and thus, do not yet look like the final product. They are just basic POCs. The homepage with the daily analysis looks somewhat like this for now. 

<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
    <figure>
      <img src="../assets/img/jude/setEdit_true.jpeg" alt="Chat" class="h-50 w-75  p-1" />
      <figcaption> Manually editing the meal entries v0.3 </figcaption>
    </figure>
  </div>
  <div align="center">
    <figure>
      <img src="../assets/img/jude/jude_dark.jpeg" alt="Chat" class="h-50 w-75 p-1" />
      <figcaption>Dark Mode v0.4 </figcaption>
    </figure>
  </div>
</div>

The final versions, however, will look entirely different, with a much better interface, and more user-friendly. I have designed and re-designed this over a thousand times now.

The saved food section is pretty simple. It has a search bar where you can search for the food items you have saved, and you can add them to your daily log. The profile section is where you can update your personal information, dietary preferences, and goals. And, the initial design of the landing segment with the weekly and monthly analysis looks somewhat like this:


<div style="display: flex; justify-content: center; align-items: center;">
  <div align="center">
  <figure>
    <img src="../assets/img/jude/monthly_weekly.jpeg" alt="Chat" class="h-75 w-100   p-1" />
    <figcaption>The initial design of the monthly and weekly sections</figcaption>
  </figure>
</div>
  <div align="center">
  <figure>
    <img src="../assets/img/jude/saved_food.jpeg" alt="Chat" class="h-75 w-100 p-1" />
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
- NextJs is excellent for building server-rendered applications, is absolutely production-grade for the use case for the MVP, I want to make sure that the platform is fast and efficient.
- Easy to find developers for JS/TS and React. I haven't met anyone who doesn't know React or NodeJs. 

The challenge begins here:
- R Native + Expo - While the MVP might be a web app, Jude is meant to be a mobile-first product. At some point, I will be switching primarily to a mobile app. I am leaning towards React Native for now, but I might switch to native later.

- NodeJs + ExpressJs - The backend would have to be separated out into a separate microservice as the product grows and scales. The mobile app would also be reliant on a separate backend. Limitations of Nextjs that would be solved by this solution are:
- Complex multi-agent orchestration logic
- Fine-grained control over WebSocket connections
- Multiple, separate microservices for different tasks

The other more complex parts of the platform are:
- MongoDB + Pinecone (with TTL) - MongoDB is fast, efficient, and easy to use. Pinecone, on the other hand, can scale and be expensive. Employing TTL would help keep the costs down, BUT, this is a major tradeoff. Agents might not have access to the context necessary to provide accurate information. Let's come back to this later.

- The AI orchestration engine - The current strategy is to use multiple AI agents that work together, delegate tasks and process each vertical of your journey parallelly. It uses Anthropic's most powerful `Claude 3.7sonnet` and OpenAI's most powerful model, `o1`, to provide you with the most accurate information.

<!-- work pending here -->  

All of these are theoretical at this point, and I am still working on the design and the architecture of the platform. The final product might be a lot different from what I have described here.

## Reviews, feedback, and suggestions - what next?

Building Jude is a blast. I am just in the early stages of development, and yet a long, long way to go. At the very least, I am sure it is better than whatever out there you think could compete with it. This article was a simple entry point into how my brain worked while building Jude. The final product when completed, would be a lot better than what you see here. Jude is just a personal project that actually solves my problem, and I thought would be cool to share with you all. It isn't fancy tech, and there are no blockchains, graphs, distributed systems, or low-level compilations. Just first principles.

The future of Jude is bright. The platform is in the early stages, and there are but a few features planned, such as:

- Suggest exercises based on your daily intake and goals
- Possibly provide you with a meal plan based on your goals, what you like, and what ingredients you have
- Provide you with a shopping list every month based on the meal plan and recipes
- Support analysing sleep, exercise, and other health-related data

###### The next possible update here would be user validation and feedback 
<!-- work pending here -->

And that's how you build a product- you build it for yourself. Identify a problem, ideate, strategize, and brainstorm. And then, build it. Startups can truly be summarized in these few steps. Remember, the most important part of building a product is to build something that you love, and the working prototype is always better than the perfect idea. The world is your oyster. Go build crazy!

If you do end up using it, I hope you like it too. Drop your feedback, suggestions, and reviews in the comments below. I would love to hear from you!