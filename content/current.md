---
title: "Current odyssey"
description: "Here's what I am upto these days"
showdate: true
---

##### Current, 2025

[Reading/ Watching](/reading.html)  |   [Mementos](/mementos.html)  

<span class="update-date-time"></span>


###### March

The [internet is going crazy](https://www.reddit.com/r/ClaudeAI/comments/1ixisq1/just_tried_claude_37_sonnet_what_the_actual_fuck/) since the launch of Claude 3.7 sonnet and for the right reasons. Claude 3.7 destroyed benchmarks and is a significant improvement over other models. I tried out Claude, and it's just insane. For instance, I asked it to review an article I wrote earlier with the default prompt provided by Anthropic (look for the *polish your prose* suggestion in Claude), and it just nailed it.

Now the question is, do I replace my ChatGPT+ subscription with Claude? I am not sure yet. There are a couple of nuances as to why I am sticking with ChatGPT+ for now:

1. ChatGPT has a better UX. It feels a little cleaner, and more intuitive, or maybe because I am used to it, but it's not a big deal. 
2. I am not sure if this reason works, but Claude's mobile app doesn't let you switch between different models. ChatGPT lets me switch between models, which is a big plus. I use o1 for research and heavy lifting, o3-mini-high for coding, and the good old gpt-4o for everything else. But, here's the thing, the reason why I need to switch to gpt-4o is because, 1. o1 and o3 have rate limits (50 requests per week or something), and 2. o1 and o3 are slower, which is understandable since they are heavier.
 Here's where Claude shines, the default model is 3.7 sonnet now and it's blazing fast, even with all the heavy lifting. It beats `o1`, and `o3-mini-high` in response speed, and thus, there wouldn't be any need to switch to `3.5 sonnet` for speed when needed. So, the default setting; `3.7 sonnet`, is good enough for everything.

3. This is a big one and probably the main reason: Claude **doesn't have a web-search feature**. It's not that they haven't built it, but that they purposefully chose not to, citing security and privacy concerns. Although, that does make sense since giving internet access to the model lets it learn from the internet, and thus, can potentially mislead or misinform the user. I believe this is one of the factors that make the 3.7 sonnet faster than o1 and o3 at code generation or even research tasks. I am not sure if this is a good or bad decision, but I am not ready to give up on this feature yet.
    > *"It's a huge drawback indeed. From what I've read though, this feature is intentional. Anthropic prioritizes safety over anything else. Giving internet access to the model immediately exposes it to potentially harmful content or misinformation. On the other hand, keeping it 'offline', allows devs to cherry-pick the training data and the knowledge base, in a way that both comply with their moral standards."*
    >
    > *"Allowing the model to browse the web directly implies they should implement a mechanism that not only cross-validates web-search results but also filters any harmful traces in them."* -- [Reddit thread](https://www.reddit.com/r/ClaudeAI/comments/1er1osa/comment/lhvomy8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

I am sticking with ChatGPT for now, until Claude gets a web-search feature. It can be a separate entity, like a web search model, or maybe a separate tab in the app, or something. This would solve all my problems and would be a game-changer for me. I use ChatGPT for every single thing; from research, and coding to analysing nutritional values of food. For example, every day, I ask ChatGPT to find the nutritional values of a food item, like say a particular branded milk/ oat milk or a coffee from Starbucks, and it does a great job at it. To switch to Claude, I need a web-search feature that could look up exact information from the internet for such cases. 

The other solution could be using Google as usual (I do not like Perplexity's UI and for web-search tasks, Google does a better job than Perplexity at **finding relevant sources**, **BUT**, for summarizing and paraphrasing & "how to" queries, an LLM based search engine is better, which is why I was using ChatGPT + Google for my entire task set. Refer [here](https://medium.com/codex/perplexity-vs-google-search-a-totally-unscientific-comparison-9a58837d7a69)), and then copy-pasting the results to Claude. Claude at least should have a human-like process. It should let us cherry-pick the sources to scan. This is a lot of work.

Is it March yet? I remember going back home, to India for a break, like it was yesterday and now two months are already over? Strange. On this side of the world, I am currently building a compiler for a subset of C language to RISC-V assembly language. It’s a fun project that helps me understand how compilers work. I also joined the SSL (Secure Systems Lab) at NYU, and am involved in a project aimed at building a secure system that aims to isolate processes in a single process sandbox. This helps limit the damage caused by bugs or security flaws in the application. Also, involved in some research about [Meta's Orion Glasses](https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/) because I found the hand-gestured controllers fascinating. I am planning to work this semester on a controller as such, and I am excited to see how this unfolds in the coming months.

###### February

The highlight has to be HackNYU, a 48-hour hackathon that I participated in last weekend. We built **[Neighborly](https://github.com/mewtyunjay/neighborly/)**, A Hyperlocal community inventory management app for you to donate, borrow, or exchange food and essentials with those in need. We didn't win, but, I am proud of what we accomplished in the given timeframe. Here's the gist of the project on [Devpost](https://devpost.com/software/neighbourly-r7fjz4?ref_content=my-projects-tab&ref_feature=my_projects). We built the skeleton in a few minutes using tools like [v0.dev](https://v0.dev), [blot.new](https://blot.new), [rollout.site](https://rollout.site), and [presentations.ai](https://presentations.ai/). It's crazy how AI has changed the landscape of today's development. 

Tech is a commodity now, anyone with a slight sense of what they are doing can build something. I don't see the point in hiring a lot of developers to build something that can be done by a few now. I get what FAANG companies mean when they lay off a lot of devs. Not that I support that, but, it just makes more fiscal sense.

The real challenge is to build something that people want. I am currently reading *Hooked: How to Build Habit-Forming Products* by Nir Eyal. It's a great book that talks about how to build products that people can't stop using. It's a must-read for anyone interested in building products that people love.

I just finished watching Paatal Lok - Season 2 this weekend. It's a gripping tale of crime, corruption, and power, a must-watch for anyone who enjoys Indie crime dramas, and it's really good. On the other hand, also currently watching a heartfelt, light-hearted show called Ted Lasso. It's a comedy-drama series that follows an American football coach who is hired to manage an English football team. The sheer optimism and relentless positivity in the show are infectious. This show is so good! If you're more interested in watching shows about the journey of building yourself, try watching Marvelous Mrs. Maisel. It's a comedy-drama series about a housewife who becomes a stand-up comedian in the 1950s. The writing is sharp, the characters are well-developed, and the acting is top-notch. Running parallels, Midge's wins feel personal here, well-deserved, like building something, a startup, from 0 to 1.

Here's what else is brewing: [reads/shows](/reading.html). Looking forward to an exciting month ahead! 🍿 🍺

###### January

Back in action: January was like an amazing much-needed magical vacation back home, and now I am back and it feels good. I met my cousins, family and relatives, ate a bunch of good Indian food, and spent a lot of time with my friends, still unsure how a month went by and if I was ready to get back to work. My sister got married, and I can't stop digesting this. She is just six months older than me, and we grew up together, inseparable. I am happy for her, but it feels like a part of me is missing. I can't wait to finish things here and rush back home.

My LinkedIn is filled with how Deepseek, an open-source LLM just killed it in the LLM space, and did it at less than 20-40 times the cost of OpenAI. The company has attracted attention in global AI circles after writing in a paper last month that the training of DeepSeek-V3 (ChatGpt 4o alternative) required less than $6 million worth of computing power with Nvidia H800 chips, which is 20 to 50 times cheaper than the cost of training similar models by OpenAI and Anthropic. This had a significant impact on the AI community, financial markets, and the world at large. On Monday, January 27, 2025, the stock closed at $118.42, marking a 17% drop from the previous close. This decline erased nearly $600 billion from NVIDIA's market capitalization, setting a record for the largest single-day loss in U.S. stock market history. Several models of DeepSeek like R1 (ChatGpt O1 alternative) are open-source. This democratization of AI is a big win for the community. It has unlocked a new era of AI-powered development with unparalleled potential to innovate solutions to the most pressing problems.

To understand why this is revolutionary, consider the following:

*By being extremely close to the hardware and by layering together a handful of distinct, very clever optimizations, DeepSeek was able to train these incredible models using GPUs in a dramatically more efficient way. By some measurements, over ~45x more efficient than other leading-edge models. DeepSeek claims that the complete cost to train DeepSeek-V3 was just over $5mm. That is absolutely nothing by the standards of OpenAI, Anthropic, etc., which were well into the $100mm+ level for training costs for a single model as early as 2024.*

*With R1, DeepSeek essentially cracked one of the holy grails of AI: getting models to reason step-by-step without relying on massive supervised datasets. Their DeepSeek-R1-Zero experiment showed something remarkable: using pure reinforcement learning with carefully crafted reward functions, they managed to get models to develop sophisticated reasoning capabilities completely autonomously. This wasn't just about solving problems— the model organically learned to generate long chains of thought, self-verify its work, and allocate more computation time to harder problems.*

These excerpts are from the [The Short Case for Nvidia Stock](https://youtubetranscriptoptimizer.com/blog/05_the_short_case_for_nvda) blog post by Jeffrey Emanuel. Give this a read to understand how DeepSeek was able to achieve this and its impact on the AI community and the world at large. I am excited to see how all this unfolds in the coming months.

This year, I plan on building fewer projects and spending more time solving Leetcode and preparing for interviews, as I am graduating by the end of this year. Currently, I am mostly involved in finishing up an old torrent project, fixing up a couple of bugs, and starting with Ferry, a C compiler for RISC-V written in Rust. This helps me learn more about computers and how they work at a lower level. 

Taking a break:

I am going back home, this month. If you're curious, I will be spending more time on my books, PS5, and Netflix in the next few weeks. Red Dead Redemption, Spiderman 2, Pulp Fiction, Godfather, and a long list await this new year. Hoping to gobble up good food for the rest of the year in this one-month break.

Here’s to new beginnings, and new adventures! 🥂 I hope you have a great year ahead. Merry Christmas, and a happy New Year, everyone! Promise to be back soon. Keep checking :)

---
[2024](/blog/24.html)  
[2023](/blog/23.html)  
