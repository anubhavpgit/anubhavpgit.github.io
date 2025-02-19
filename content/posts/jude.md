---
title: 'Hey, Jude: A product journey roadmap'
date: "26-02-2025"
description: "Not a tribute to the Beatles' song. This is a product journey roadmap of Jude; an AI-powered nutritionist that helps you make healthier life choices"
draft: true
tag: "#tech, #product"
---

The most annoying part of my day is deciding what and how much to eat. And, like all of you, I too rely on ChatGPT to help me with every little decision I make. From figuring out why this piece of code isn’t working and why Israel attacked Palestine to what to and how much to eat, ChatGPT has been my go-to. Let’s be honest here: ChatGPT is the new Google. It has answers to everything and is accurate if you use the better models. Google's AI is just… well, shit. But I wanted something more robust—something faster and more organized for tracking my daily calorie intakes and managing my daily nutrition and fitness goals. Thus, I sang, *Hey, Jude!*

## The Why

Jude is an AI-powered nutritionist that helps you make healthier life choices. Now now, if you zoom out a little and not take everything into perspective, you will and should point out that Jude is nothing but a glorified calorie counter—an Excel sheet with a GPT to be crude. Hell, there exist, if not a thousand, different apps that do exactly the same thing. Well, you’re not all wrong, but let me implore of you this: put aside your skepticism and let me explain why Jude is different and significant, and why I built it.

### Any other ChatGPT + sheet ?

***“I could literally keep an Excel sheet handy and ask any AI to analyze the data for me or add data to the sheet. It would be just as effective a tool to store data, let alone all the other notes and calorie-tracking apps out there. Pftt!”***

Well, yes, but no. Any Excel sheet or any other textual or tabular form of information storage gets the job done but 

1. It is **not readable enough**.

Reading and understanding data in sheets/ written format is a hassle. It's all text, and you would have to scroll through the data to find the information you need, and sometimes it’s not easy to make sense of the data and do the math. That's why we have data analysts. They make sense of the data and provide insights.

And say even if you decide to give up on having a readable format and are happy in the low-life, messy, unorganized data, and mediocre data storage platform, you still would have to send it to ChatGPT. It would analyze it, return suggestions, and update the new data, and that’s bad because: 

2. Storing, maintaining, and updating the data **is a hassle**.

An anecdote: I have been using ChatGPT for a while now to track my daily intake. I gave it a system prompt, and it gets slower and slower every day upon using the same chat history. Using `Gpt4o`, at times the calorie math doesn’t add up, and I have to manually recheck everything.

3. ChatGPT gets **slower and slower** as the data/ chat history increases.

And then there’s the process of adding, removing data, and updating the new data; whether you would do it manually three-four times a day or you would want ChatGPT to do it for you and confirm the data, and for that, you would keep on sending the data to ChatGPT, downloading and updating it wherever you want to store it, it’s a hassle.

Jude solves this problem. It is built using first principles and focuses on the separation of concerns. It tracks your daily intake, analyzes the data, and provides you with insights into your daily intake based on **your goals**. You can ask the AI to add any data and it will. But it cannot mess up the existing data and this is by design; it has an `upsert only` mechanism that **adds only new data**. It doesn’t store the chat history, and it doesn’t get slower as the data increases. It’s a simple, easy-to-use, and intuitive tool that helps you make healthier life choices.

Now, if there is no history stored, what if you wanted to store a particular diet information or regular food item that you consume every day but didn’t want to type it in every day? What about food preferences, dietary restrictions, and other information that you would want to store and use later? I mentioned goals. How can you set goals and track them? 

Jude saves all of your personal, dietary, and food preferences in the beginning while creating the account. This is used in the “system prompt” to provide you with personalized recommendations and insights. It lets you save your regular food items, and you can simply type in the name of the food item to add it to your daily log. You can also ask Jude to add the food item to your daily log for you. This way, you don’t have to type in the same food item every day. A separate list exists for you to save your regular food items.

Jude makes it easy for you to glance at your current information and make sense of what has happened and what needs to be done to achieve your goals. It does what is needed and nothing more. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask it to do that for you.

### The competition

***"Probably a billion different apps out there that would achieve the same. Why would I even choose a new app?"***
 
 Yes, you are right; to name a few, HealthifyMe, MyFitnessPal, LoseIt, Cronometer, and the list goes on. I have tried these apps too. There are three main issues I see with something like this:


1. Most of them have a terrible design. 

They are just **not user-friendly**. I just genuinely hate the UI/UX of most of these apps. These apps just make everything more and more complicated. They clutter too much information in a screen and have a shitton of features that are either too complicated to use or are not intuitive enough for you to use them on a daily basis.

Jude has a simple and intuitive interface that makes it easy to track your daily intake. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask Jude to do it for you. It has three sections in the home page: 

- **Today's intake**
- **The current week**
- **The current month**

Each section has an analysis tab that just analyzes the data and provides you with insights on your daily intake according to your goals.

2. The **information provided is usually not accurate**. 

They are based on a mix—a mix of data provided by the users and data from the backend AI, and the data is either not accurate or there is too much data for you to make sense of. Like, there might be 8-9 "Dosa"’s with different calories and nutrition written around them, or if you search for a burger, there would be tens of burgers with hundred different calories and nutrition values, and you are left to choose which one to pick. Some of them do actually have a pretty neat way of taking in images of what you eat and then providing you with the nutritional information, but that’s not always accurate, and you would have to manually enter the data if you want to be sure.

Jude uses a custom GPT model that is fine-tuned on a large dataset of food items and their nutritional values. This ensures that the information provided by Jude is accurate and up-to-date. Or, you do also have the option of clicking a picture of the food item and asking Jude to provide you with the nutritional information. GPT is powerful enough to handle most of the heavy lifting, and you can rely on the information provided by Jude.

3. The privacy concerns.

***"How do I know that my data is secure and not being shared with third-party companies? Who's to say that the data you provide is not being sold to third-party companies?"*** Jude doesn’t store any of your personal information. Your personal data is encrypted and is not sent to the AI. The layer in between abstracts the data and sends only the necessary information to the AI. The data is stored in a secure database and is not shared with any third-party companies. This is why Jude uses your own AI `API Key` to make sure that the data is not being shared with any third-party companies. You won’t have to pay anything in that case. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key. In any case, your data is secure and not shared with any third-party companies. 

The business plan never includes sharing your data with third-party companies for advertising or any other purposes. Even if you see ads on the platform, they are not based on your personal data. The ads are based on the content of the platform and are not targeted at you.

4. The **cost**.

Most of these apps are either too expensive or have a freemium model that is too restrictive. Jude is in the early stages, and thus entirely free for now, and is looking for early adopters to provide feedback and help improve the platform. As an early adopter, you will have access to all the features of the platform for free. The platform is now and will always be free for use for you guys.

If the platform grows and the costs increase, there might be a recurring cost to use the platform. But, as opposed to others, either it will be the bare minimum, lower than what iCloud charges you, or we might use ads to cover the costs. But, as of now, the platform is **entirely free** for you to use.
<!-- 

## The How

### The nitty-grittiess: designing Jude


### Coming up to speed


### The AI behind the backend


### Next?


## The Future -->

