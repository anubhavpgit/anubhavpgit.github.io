---
author: Srijan Paul
title: "Issues with NFT & Web3"
date: "19-01-2022"
description: "A short rant on the state of Web3"
tag: "#tech"
---

During my short stint as a blockchain developer, I've learned a lot and have met amazing people.
While I acknowledge the skill and reverence of some developers in this domain,
I still remain uncharmed by the zeal of web3.

If you're a blockchain enthusiast reading this, know that I understand where you stand.
I've been in your shoes,
and I draw my opinions from personal encounters with the crypto ecosystem.
What I ask of you as a peer then, is that you put your tech under a lens of scrutiny and sever any bonds that may develop into religious fanaticism.
This is true of all engineering, of course.
We cannot improve a technology if we're blind to it's limitations.
And we can't perceive limitations unless we are open to critique.
Critique such as this one.

Most engineers who build blockchains and NFT based projects recognise the technical limitations of this technology.
Yet they choose to write them off as "tradeoffs" for *web3*, or worse, turn a blind eye to them.
And then there are the social problems -
ones that are so nuanced that they can't be tackled by any number of token standards or consensus algorithms.
This post is my attempt at shedding some light on the problems that I'm aware of.

- [Social](#social)
  - [The majority of crypto is shady, even for artists.](#the-majority-of-crypto-is-shady-even-for-artists)
  - [NFT marketplaces are centralised and controlled.](#nft-marketplaces-are-centralised-and-controlled)
  - [NFTs are... worthless?](#nfts-are-worthless)
  - [Your 'get-rich-quick' chances are miniscule.](#your-get-rich-quick-chances-are-miniscule)
- [Engineering](#engineering)
  - [NFTs CAN be altered.](#nfts-can-be-altered)
  - [Web3 is not technically feasible.](#web3-is-not-technically-feasible)

## Social

### The majority of crypto is shady, even for artists

Cryptocurrency is always found in a massive web of controversy, frauds and scams.
Show me one successful crypto project that has served a real purpose,
and I'll show you 10 that were outed for being scams.

NFTs claim to be a revolution for artists and creators.
But what happens when someone makes an NFT out of stolen art?
Owing to a blockchain's immutable nature,
the thief now owns the art forever, even if they're found out.

The solution that crypto evangelists propose is that artists should mint an NFT
out of their art before someone else gets the chance.
But this is far from a realistic solution.
A creator should not be bothered with signing tokens on a myriad of different markets and blockchains just to avoid being wronged.
Why should an artist **pay** to register an NFT on Flow, Ethereum, Solana, Monero, Tezos and countless other chains under the sun?

### NFT marketplaces are centralised and controlled

The willingness to be free from institutional regulation and government censorship is at the nexus of "web3".
The idea of a government powerless to stop a citizen from owning any digital asset appeals to many.
However under this veil of liberation and freedom lies a truth that no crypto-bro will tell you -
The very marketplace you view and trade your assets on are centralised and controlled.

NFT assets **can** be removed from [objkt](https://objkt.com/) and [opensea](https://opensea.io/), you **can** be banned from [coinbase](https://www.coinbase.com).
[Opensea even admits it](https://support.opensea.io/hc/en-us/articles/1500010625362-Why-are-my-items-and-collections-delisted-) themselves!
If you violate any of the following vague "rules",
your NFT will be delisted from a supposedly "decentralised" and "uncensorable" marketplace.

> - infringe on protected intellectual property,
> - promote suicide or self-harm,
> - incite hate or violence against others,
> - degrade or dox another individual,
> - otherwise violate our [terms of service](https://opensea.io/tos).

But what constitutes "violence or hate against others"?
Will I get banned if I make fun of a political figure?
Rather, **Can** I get banned if I make fun of a political figure?
Clearly, the answer is yes.
The people moderating this website do wield that power.
"Moderating a decentralised and censor-proof website" is an oxymoron,
and how the people trading on such platforms fail to realise this eludes me.

### NFTs are... worthless?

In stark contrast with their price tags, the actual value represented by an NFT is surprisingly low.
Say you spend all the money you saved for your child's education to buy this rock NFT:

![rock-nft](https://pbs.twimg.com/profile_images/1423533825028616195/-iFC12qC_400x400.jpg)

Now you're pumped with adrenaline, because you **own** this piece of history.
The image is yours, and you claim all rights to its usage and redistribution.
This art piece is now valued as if it were a real and tangible rock, there is only one rock and only one owner - you.

Right? <br/>
Wrong. <br/>
The artist still owns the image, and they're entitled to sell it to others,
or even make yet another NFT out of it on a different blockchain and sell it there.

So if you don't own this rock, what exactly do you possess?
The ability to use this on the internet as you please?
So do I. I used it just now, to show you what it looks like.

Had the rock been real,
the owner would've been capable of sculpting it into a showpiece -
the exact physical properties of which no one else can have.
Or they could use it to assault kids on a street, something noone else could do with the same edge,
for there exists only one.
If I tried to assault children with a similar rock, I wouldn't be subject to the same acclaim as you.
Because my rock and yours have real, physical differences down to the microscopic level.

When an asset is digital, and an image at that, "ownership" comes with no priviledges.
If you can use it as your twitter avatar, I can too.
And unlike the real world, my avatar has the exact same pixel composition as yours.

Whatever you can do it with it, I can.
Except you now bear a financial loss in pursuit of this "ownership"
because people told you it means something.

### Your 'get-rich-quick' chances are miniscule

**The value of an NFT is what you believe it to be.**

Crypto evangelists would have you believe this too, except they'd word it very differently.
But you can't get the world to agree on this strange belief system
where nearly identical 32x32 pixel people are supposed to encapsulate an "idea" worth
thousands of dollars.

To most, it just won't make sense.
Why should this clump of pixels cost 1M$?

![cryptopunk](https://cryptopotato.com/wp-content/uploads/2021/03/cryptopunk.jpg)

Why should we collectively enforce this belief? <br/>What can we achieve with this new school of thought that we couldn't before?

Some crypto evangelists answer this with "[It can make you rich!](https://cryptopotato.com/this-cryptopunk-nft-was-bought-for-15k-in-2018-now-sold-for-8-million/)".
There is a nugget of truth to that,
but it's a very twisted statement that conceals more than it shows.
We've to realize that this value doesn't come from nowhere.
For you to have gained in this flaky landscape, several others had to lose.
And if general probability theory is anything to go by, you're more likely to find yourself in the losing lot.

MLM scams and pyramid schemes play a surprisingly similar game,
but enough people have already drawn this analogy so that I don't have to.

## Engineering

### NFTs CAN be altered

Unknown to most regular consumers of crypto,
the actual items represented by NFTs they own aren't actually stored on a blockchain.
i.e - the million dollar ape JPEG someone spent their life savings on is physically located somewhere outside Ethereum.
They're stored on a separate database which could be centralised (but generally isn't, like IPFS).
The blockchain itself only stores a URI to the resource in question (say `ipfs://foo/bar/orangutan.jpg`).

Look at Ethereum's [EIP-721](https://eips.ethereum.org/EIPS/eip-721) token standard.
Once you've made your way through the document, you'll realise there is **nothing** stopping a server
from serving different files at different times of the day for the same URI.
Or serving different files based on where the client requesting the resource is located.
There is even a word for this act, it starts with a **c**, ends with an **r** and rhymes with "tensor".
See [this NFT](https://moxie.org/2022/01/07/web3-first-impressions.html#making-an-nft) by Moxie Marlinspike as an example.

### Web3 is not technically feasible

Ever so often you'll cross web3 enthusiasts on twitter who claim the internet will be decentralized in the near future.
That there will be no institutional control and a governments' powers over social media will cease to exist.
And they claim this will be by virtue of a blockchain driven internet, that runs on gas fees.

It just isn't possible.
An advertisement driven web, no matter how terrible, is still far superior to one that is gas fees driven.
When texting, people will always prefer ads to paying out of their own pocket.

However, lets leave the human factors aside for a moment.
Let's imagine a world where humans willingly pay to post instagram selfies.
Even in that universe, blockchain is incapable of supporting such an infrastructure.

Blockchains are **SLOW**. <br/>
They're simply inefficient when put up against traditional databases and the decades old client-server architechture.
What's even worse is traditional scaling and optimization techniques do not apply to a blockchain.
The optimizations that do exist ([indexers](https://wiki.tezosagora.org/build/blockchain-indexers)) are centralized and beat the whole point of web3.

A blockchain is a large append-only merkle tree that needs the computing power of a suburb to confirm a group of transactions, and even then it can take minutes depending on the implementation.
For highly critical transactions,
you've to wait for 5-6 rounds of "confirmation" before gaining reasonable confidence in the operation you just performed.

Anyone who has actually studied this subject in appropriate detail would tell you it is impossible for such inefficient technology to withhold traffic on sites like reddit, discord, twitter, facebook, 4chan, youtube etc.

The more energy efficient consensus algorithms, like "Proof of Stake", have a different kind of flaw.
They favor miners (called [bakers](https://wiki.tezosagora.org/learn/baking) on the Tezos chain) who own more coin.
A classic "rich get richer" scheme.

This is not to say blockchain is completely useless.
It **might** be used for problems such as food contamination tracing, and verifying ownership of legal documents.
However the world today is in a frenzy to use it in all the places where it doesn't belong.
