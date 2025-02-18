---
title: 'Hey, Jude!: A product journey roadmap'
date: "26-02-2025"
description: "Not a tribute to the Beatles' song. This is a product journey roadmap of Jude; an AI-powered nutritionist that helps you make healthier life choices"
draft: true
tag: "#tech, #product"
---

The most annoying part of my day is deciding what and how much to eat. And, like all of you, I too rely on ChatGPT to help me with every little decision I make. From figuring out why this piece of code isn’t working and why Israel attacked Palestine to what to and how much to eat, ChatGPT has been my go-to. Let’s be honest here: ChatGPT is the new Google. It has answers to everything and is accurate if you use the better models. But I wanted something more robust—something faster, more accurate, and with a precise tracking mechanism to analyze my daily intake. Thus, I sang, Hey Jude!

I built Jude, an AI-powered nutritionist that helps you make healthier life choices. Now now, if you zoom out a little and not take everything into perspective, you will and should point out that Jude is nothing but a glorified calorie counter—an Excel sheet with a custom GPT to be crude. Well, you’re not wrong, but let me ask of you this: put aside your skepticism and let me explain why Jude is different, significant, and why I built it.

## The Why

- ***“An Excel sheet is just as effective a tool to store data, let alone all the other notes and tracking apps out there. I could literally keep an Excel sheet handy and ask any AI to analyze the data for me or add data to the sheet. ChatGPT can solve this! Pftt!”*** Well, yes, but no. Any Excel sheet, notes app, or any other textual or tabular form of information storage gets the job done but is **not readable enough**. And, even if you decide to give up on having a readable format and are happy in the low-life, messy, unorganized data, and mediocre data storage and analysis platform, you still would have to send it to ChatGPT. It would analyze it, return suggestions, and update the new data. Here’s why that’s bad: ChatGPT gets **slower and slower** as the data increases, or the chat history increases. It’s not efficient enough to handle large datasets or remember the context of the conversation.

	An anecdote: I have been using ChatGPT for a while now to track my daily intake. I gave it a system prompt, and it gets slower and slower every day upon using the same chat history. Using `Gpt4o`, at times the math doesn’t add up, and I have to manually recheck everything. And then there’s the process of adding, removing data, and updating the new data; whether you would do it manually three—four times a day or you would want ChatGPT to do it for you and confirm the data, it’s a hassle.

	Jude solves this problem. It is built using first principles and implements separation of concerns. It tracks your daily intake, analyzes the data, and provides you with insights on your daily intake and goals. You can ask the AI to add any data, but it cannot mess up the existing data; by design, it has an `upsert` mechanism that **adds only new data**. It doesn’t store the chat history, and it doesn’t get slower as the data increases. It’s a simple, easy-to-use, and intuitive tool that helps you make healthier life choices.

	Now, if there is no history stored, what if you wanted to store a particular diet information or regular food item that you consume every day but didn’t want to type it in every day? What about food preferences, dietary restrictions, and other information that you would want to store and use later?

	Jude saves all of your personal, dietary, and food preferences in the beginning. This is used in the “system prompt” to provide you with personalized recommendations and insights. It lets you save your regular food items, and you can simply type in the name of the food item to add it to your daily log. You can also ask Jude to add the food item to your daily log for you. This way, you don’t have to type in the same food item every day. A separate list exists for you to save your regular food items.

Jude makes it easy for you to glance at your current information and make sense of what has happened and what needs to be done to achieve your goals. It does what is needed and nothing more. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask it to do that for you.

- ***"Probably a billion different apps out there that would achieve the same"***: Yes, you are right to say so; to name a few, Healthifyme, MyFitnessPal, LoseIt, Cronometer, and the list goes on. And I have tried these apps too. There are three main issues I see with something like this:
	- The **information provided is usually not accurate**. They are based on a mix—a mix of data provided by the users and data from the backend AI, and the data is either not accurate or there is too much data for you to make sense of. Like, there might be 8-9 "Dosa"’s with different calories and nutrition written around them, and you are left to choose which one to pick.

		
	Jude uses a custom GPT model that is fine-tuned on a large dataset of food items and their nutritional values. This ensures that the information provided by Jude is accurate and up-to-date.

	- They are **not user-friendly**. I just genuinely hate the UX. These apps just make everything more and more complicated. They stuff too much information and features in a screen, and they are either too complicated to use or they are not intuitive enough for you to use them on a daily basis. And the shitload of features they have—half of them you would never need or want to use.

		Jude has a simple and intuitive interface that makes it easy to track your daily intake. You can simply type in the food items you have consumed, and Jude will provide you with the nutritional information. You can decide to add the food to your daily log yourself, or you can ask Jude to do it for you. It has three sections in the home page: 
		- **Today's intake**
		- **The current week**
		- **The current month**

		Each section has an analysis tab that just analyzes the data and provides you with insights on your daily intake and goals.

- ***"How do I know that my data is secure and not being shared with third-party companies? Who's to say that the data you provide is not being sold to third-party companies?"*** Jude doesn’t store any of your personal information. Your personal data is encrypted and is not sent to the AI. The layer in between abstracts the data and sends only the necessary information to the AI. The data is stored in a secure database and is not shared with any third-party companies. This is why Jude uses your own AI API Key to make sure that the data is not being shared with any third-party companies. You won’t have to pay anything in that case. You can still rely on the default setting (using Jude’s default API key) if you don’t want to use your own API key. In any case, your data is secure and not shared with any third-party companies. 

The business plan never includes sharing your data with third-party companies for advertising or any other purposes. Even if you saw ads on the platform, they are not based on your personal data. The ads are based on the content of the platform and are not targeted at you.


<!-- 

## The How

### The nitty-grittiess: designing Jude


### Coming up to speed


### The AI behind the backend


### Next?


## The Future -->