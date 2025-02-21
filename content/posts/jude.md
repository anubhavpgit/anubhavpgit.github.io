---
title: 'Hey, Jude! A product journey roadmap'	
date: "26-02-2025"
description: "Not a tribute to the Beatles' song. This is a product journey roadmap of Jude; why and how I decided to build an AI assisted nutrition tracker, and what it might look like as a full-fledged product."
draft: true
tag: "#tech, #product"
---

The most annoying part of my day is deciding what and how much to eat. And, like all of you, I too rely on ChatGPT to help me with every little decision I make. From figuring out why this piece of code isn’t working and why Israel attacked Palestine to what to and how much to eat, ChatGPT has been my go-to. Let’s be honest here: ChatGPT is the new Google. It has answers to everything and is accurate if you use the better models. Google's AI is just… well, shit. But I wanted something more robust—something faster and more organized. Thus, I said, *Hey, Jude!*

Before I go ahead and rant, keep in mind that I built Jude specifically **for me**. Thus, although it does technically support multiple users etc, currently it is engineered to work only for me; a couple of things have been hard-coded. Enabling multi-user support is just a click away. If you fancy this, ping me and I'll send you the beta version (*if I'd have built it by then*). This article is just a simple product journey roadmap; how I solved my issue with Jude, and how as a full-fledged product it might cater to a bigger audience. 

## The Why

Jude is an AI-powered nutritionist that helps me make healthier life choices. Now now, if you zoom out a little and not take everything into perspective, you will and should point out that Jude is nothing but a glorified calorie counter—an Excel/ Google sheet with a GPT to be crude. Hell, there exist, if not a thousand, different apps that do exactly the same thing. Well, you’re not all wrong, but let me implore of you this: put aside your skepticism and let me explain why Jude is different and significant, and why I built it.

### Any other ChatGPT + sheet?

***“I could literally keep a Google/Excel sheet handy and ask ChatGPT to analyze.”***

Well, yes, but no. Any Excel sheet or any other textual or tabular form of information storage gets the job done but 

1. It is **not readable enough**.

Reading and understanding data in sheets/ written format is a huge pain. It's all text, and you would have to scroll through the data to find the information you need, and sometimes it’s not easy to make sense of the data and do the math. That's why we have data analysts. They make sense of the data and provide insights.

And say even if you decide to give up on having a readable format and are happy in the low-life, messy, unorganized data, and mediocre data storage platform, you still would have to send it to ChatGPT each time you start to use it, and that’s bad because: 

2. Storing, maintaining, and updating the data **is a hassle**, & ChatGPT gets **slower and slower** as the data/ chat history increases.

I have been using ChatGPT for a while now to track my daily intake. I gave it a system prompt, and it gets slower and slower every day upon using the same chat history. Using `Gpt4o`, at times the calorie math doesn’t add up, and I have to manually recheck everything. 

And then there’s the process of adding, removing data, and updating the new data; whether you would do it manually three-four times a day or you would want ChatGPT to do it for you and confirm the data, and for that, you would keep on sending the data to ChatGPT, downloading and updating it wherever you want to store it, it’s a hassle.

Jude solves this problem. It tracks your daily intake, analyzes the data, and provides you with insights into your daily intake based on **your goals**. You can ask the AI to add any data and it will. But it cannot mess up the existing data and this is by design; it has an `upsert-only` mechanism that **adds only new data**. It **doesn’t store the chat history**, and it doesn’t get slower as the data increases. It’s a simple, easy-to-use, and intuitive tool that helps you make healthier life choices.

Now, as a product, if there is no history stored, what if you wanted to store a particular diet information or regular food item that you consume every day but didn’t want to type it in every day? What about food preferences, dietary restrictions, and other information that you would want to store and use later? I mentioned goals. How can you set goals and track them? 

Jude saves all of your personal, dietary, and food preferences in the beginning while creating the account. This is used in the “system prompt” to provide you with personalized recommendations and insights. It lets you save your regular food items, and you can simply type in the name of the food item to add it to your daily log. Jude also makes it easy for you to glance at your current information and make sense of what has happened and what needs to be done to achieve your goals. It does what is needed and nothing more.

### The competition (or lack thereof)

***"Probably a billion different apps out there would achieve the same. Why choose a new app? Pftt!"***
 
Yes, you are right; to name a few, HealthifyMe, MyFitnessPal, LoseIt, Cronometer, and the list goes on. I have tried these apps too. There are three main issues I see with something like this:

1. Most of them have a terrible design. 

They are just **not user-friendly**. I just genuinely hate the UI/UX of most of these apps. They just make everything more and more complicated. They clutter too much information in one screen and have a shitton of features that are either too complicated, useless, or not intuitive enough for me to use them on a daily basis.

2. The **information provided is usually not accurate**. 

They are based on a mix—a mix of data provided by the users and data from the backend AI (if there is one), and the data is either not accurate or there is too much data for you to make sense of. Like, there might be 8-9 "*Indian Dosas*" with different calories and nutrition written around them, or if you search for a burger, there would be tens of burgers with hundred different calories and nutritional values, and you are left to choose which one to pick. Some of them do actually have a pretty neat way of taking in images of what you eat and then providing you with the nutritional information, but that’s not always accurate, and you would have to manually enter the data if you want to be sure.

Jude simply uses OpenAI's most powerful model, `o1`, to provide you with the most accurate information. Most of the time, the data is accurate and you can rely on it. If you are not sure about the data, you can always ask Jude to provide you with the source of the data. It supports image recognition as well.

3. The **cost**.

Most of these apps are either too expensive or have a freemium model that is too restrictive. Jude, *if ever built as a complete product*, will be entirely free for you to use. It is in the early stages and would be looking for early adopters to provide feedback and help improve the platform. As an early adopter, you will have access to all the features of the platform for free. 

If there are users, who love this and start using it and the platform grows and the costs increase, there might be a small recurring cost to use the platform. But, as opposed to others, either it will be the bare minimum, lower than what iCloud charges you, or we might use ads to cover the costs. But, as of now, the platform is **entirely free** for you to use.

For the AI part, it isn't free or cheap. Jude if made available to the public, will be using your own API key to make sure that the data is not being shared with any third-party companies. You won’t have to pay anything in that case. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key and pay a small recurring fee. 

## The How

Building Jude, my primary concern was design, speed, organization and accuracy. I spent the most amount of my time designing the platform and crafting the prompt-engineering behind it. I wanted to make sure that the platform looks great, is easy to use, and is fast and accurate.

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
			<img src="../assets/img/jude/setEdit_true.jpeg" alt="Chat" class="h-50 w-75	 p-1" />
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

The final versions, however, will look entirely different, with a much better interface, and more user-friendly. I have designed and re-designed this over a thousand times now, and the final one looks like this:

(*The screenshot of the latest build is not deployed, yet. Fixing some final nuances.*)

The bottom drawer pulls up the chat section. The chat UI is heavily inspired by ChatGPT. If it ain't broke, don't fix it. The saved food section is pretty simple. It has a search bar where you can search for the food items you have saved, and you can add them to your daily log. The profile section is where you can update your personal information, dietary preferences, and goals. And, the initial design of the landing segment with the weekly and monthly analysis looks somewhat like this:

<div align="center">
  <figure>
		<img src="../assets/img/jude/monthly_weekly.jpeg" alt="Chat" class="h-75 w-100	 p-1" />
		<figcaption>The initial design of the monthly and weekly sections</figcaption>
	</figure>
</div>

<div align="center">
	<figure>
		<img src="../assets/img/jude/saved_food.jpeg" alt="Chat" class="h-75 w-100 p-1" />
		<figcaption>The saved food section </figcaption>
	</figure>
</div>

And, the latest version of these turned out to be a lot better than the scribbled drafts, which look like this:

(*Yet to update this part*)

### Coding up to speed: TypeScript + NextJs + MongoDB + GPT = Jude

I did not want to spend a lot of time in code. It's a pretty straightforward thing to build. Thus, the initial version was built by [v0.dev](https://v0.dev) with a basic prompt. From there, I took the code and built upon it. It's as simple as it goes:

- NextJs for the frontend & backend [written in TypeScript]:
	- Has `home`, `chat`, `saved_food`, `profile`, and pages with respective components.
	- The backend similarly has respective API routes. I am not going deep into this; pretty standard stuff.
	- TailwindCSS for the styling
  
  The intial version of the code looked like this:

  ```typescript
  <div className="max-w-4xl mx-auto">
    {/* Todo:
      - Implement a horizontal caraousel for the following components
      - 1. Monthly Stats
      - 2. Weekly Stats
      - 3. Landing Page
    */}

    {/* The default entry point:  Landing Page */}

    {/* Todo- Import:
      - Saved Food - Swipe Left from home
      - Profile - Upper right corner
    */}

    <Home isDark={isDark} setIsDark={setIsDark} />
        {/* Jude Chat component */}
    <Drawer open={open} setOpen={setOpen} isDark={isDark}>
        <Chat isDark={isDark} isOpen={open} setOpen={setOpen} />
    </Drawer>
  </div>
  ```
- Primsa + MongoDB for the database

  Schema for the DB looks like this:

  ```typescript
  model User {
    id          String      @id @default(auto()) @map("_id") @db.ObjectId
    uid         String      @unique
    name        String
    email       String      @unique
    phoneNumber String?
    // Relations
    savedFoods  SavedFood[]
    mealLogs    MealLog[]

    @@map("users")
  }
  ```

  This model would technically support multiple users. 


  ```typescript
  model Food { // The main food model
    id             String    @id @default(auto()) @map("_id") @db.ObjectId
    name           String
    proteins       Float
    fats           Float
    carbs          Float
    totalCalories  Int
    analysis       String?
    suggestions    String?
    micronutrients Json?
    // Relations
    mealLogEntries MealLogEntry[]
    savedFoods     SavedFood[]

    @@map("foods")
  }
  ```
  These are the main models. Each entry would correspond to a `mealLogEntry`, which is basically what you had in a meal. Each `mealLogEntry` would have a `food` entry. The `food` entry would have the nutritional information. And daily, you would have a `mealLog` entry that would have all the `mealLogEntries` for the day.

  ```typescript

  model MealLog { // The daily log: what you ate, how much you ate, and the total calories
    id            String         @id @default(auto()) @map("_id") @db.ObjectId
    userId        String         @db.ObjectId
    logDate       DateTime
    totalCalories Int?
    analysis      String?
    mealEntries   MealLogEntry[] // Each entry in the daily log

    user          User           @relation(fields: [userId], references: [id])

    @@map("mealLogs")
  }

  model MealLogEntry { // Each meal entry in the daily log
    id         String   @id @default(auto()) @map("_id") @db.ObjectId
    mealLogId  String   @db.ObjectId
    mealType   String   // e.g., "breakfast", "lunch", "dinner", "snack"
    foodId     String   @db.ObjectId
    servings   Float
    calories   Int

    mealLog    MealLog  @relation(fields: [mealLogId], references: [id]) // Relates to the daily log
    food       Food     @relation(fields: [foodId], references: [id])
    @@map("mealLogEntries")
  }
  ```
- ChatGPT for the AI

The source is not available as of now cause it is really messy. I did not properly spend time thinking about the architecture and the design and, thus it doesn't employ the best practices. For example, I got lazy and stuck with `prop-drilling` rather than using a global state management library, and I did not use any design patterns. Some type inferences are missing, `any` has been my saviour at times, and thus, the code is not clean. As of now, it gets the job done.

I'll share it once I am done cleaning, refactoring, and documenting it properly.

### What else?

#### Privacy Concerns

***"How do I know that my data is secure and not being shared with third-party companies?"*** 

As a complete product, I don't see Jude storing any of your personal information. All personal data would be encrypted and would not sent to the AI. The layer in between abstracts the data and sends only the necessary information to the AI. This is also why Jude would use your own AI `API Key. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key. In any case, your data is secure and not shared with any third-party companies. 

The business plan never includes sharing your data with third-party companies for advertising or any other purposes. Even if you see ads on the platform, they are not based on your personal data. The ads are based on the content of the platform and are not targeted at you.

#### The Future : Includes a couple of other stuff

The future of Jude is bright. The platform is in the early stages, and there are but a few features planned, such as:

- Suggest exercises based on your daily intake and goals
- Possibly provide you with a meal plan based on your goals, what you like, and what ingredients you have
- Provide you with a shopping list every month based on the meal plan and recipes
- Support analysing sleep, exercise, and other health-related data

### Reviews, feedback, and suggestions - what next?

Building Jude is a blast. I am just in the early stages of development, and yet a long, long way to go. At the very least, I am sure it is better than whatever out there you think could compete with it. This article was a simple entry point into how my brain worked while building Jude. The final product when completed, would be a lot better than what you see here. Jude is just a personal project that actually solves my problem, and I thought would be cool to share with you all. It isn't fancy tech, no blockchains, graphs, distributed systems or low-level compilation. Just first principles.

And that's how you build a product- you build it for yourself. Identify a problem, ideate, strategize, and brainstorm. And then, build it. Startups can truly be summarized in these few steps. Remember, the most important part of building a product is to build something that you love, and the working prototype is always better than the perfect idea. The world is your oyster. Go build crazy!

If you do end up using it, I hope you like it too. Drop your feedback, suggestions, and reviews in the comments below. I would love to hear from you!