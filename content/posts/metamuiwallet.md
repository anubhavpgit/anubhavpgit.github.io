---
title:  'Decentralization in MetaMUI Wallet'
date:  "31-08-2022"
description: "A case study on how MetaMUI wallet claims to be decentralized and how it actully works."
tag: "#tech"
---

I am working with [Squbix Digital](https://squbix.com/) to build a decentralized, secure and scalable solution using blockchain technology for [Sovereign Wallet](https://swnglobal.com/). The solution is to build a platform to exchange digital assets such as cryptocurrencies and digital currencies across a country/ organization and a cross-border payments system. Here is the [metamui whitepaper](https://sovereignwallet-network.github.io/whitepaper/MetaMUI-Blockchain-White-Paper.pdf) and here are some of the things that I couldn't digest well.

- [Metablockchain-core](#metablockchain-core)
  - [Robust, decentralized, and secure?](#robust-decentralized-and-secure)
  - [Issues with the current infrastructure](#issues-with-the-current-infrastructure)
  - [Ideological challenges](#ideological-challenges)
- [A better direction](#a-better-direction)
  - [Improving the current infrastructure](#improving-the-current-infrastructure)

## Metablockchain-core

Metablockchain: The blockchain that lets you regulate digital currencies and cryptocurrencies across the nation. The platform is built on Polkadot protocol that has significantly better runtime efficiency, is cost-effective, and supports parallel faster transactions when compared to other traditional blockchains. The Polkadot protocol is designed to allow unrelated blockchains to securely talk to each other, so that value or data can flow between, say, the Ethereum and Bitcoin blockchains without any intermediary. It’s also designed to be speedy and scalable, via the use of many parallel blockchains (or “parachains”) that take much of the processing demand off of the main blockchain. The Polkadot network can process more than 1,000 transactions per second, compared to about 7 for Bitcoin and 30 for Ethereum. As the network grows and more parachains are added, Polkadot should get even faster, with speeds that could hit a million transactions per second.

### Robust, decentralized, and secure?

The product is built in such a way that a country/ government/central banking authority can adopt this platform and make it run parallel with the currently existing infrastructure. Users can send and receive money across the country and it takes significantly less time to handle international transactions. It seems great, an easier way to handle transactions, without having to pay taxes to the government for making international exchanges! But the reality may not be as exciting.

> MetaMUI is claimed to solve the blockchain trilemma by having a hybrid architecture. For micropayment, we
 used centralized architecture to achieve high performance and high security. For higher volume payment, we
 used decentralized architecture to achieve high security and decentralization.

The current infrastructure is easy to use but is not as secure as claimed. The primary goal of the infrastructure is to make it easier for users to send and receive (traditional banking) money across the country and, it is not secure because it is **not decentralized**, and **well-developed** . Introducing a blockchain as a means of a runtime to carry out transactions as opposed to a traditional banking system is to make sure that all the transactions are handled in a decentralized manner and anyone when wanted, can query and view the source, and all the states of the transactions but it is not the case here.

### Issues with the current infrastructure

1. **The usage of a private blockchain**.

 The banks are responsible for running validator nodes that run on the private blockchain and are responsible for validating the transactions and the states of the system. The claims as said were to improve security and transparency but this approach opposes the purpose of the claims. A private blockchain to carry out transactions makes it a kind of database and a runtime that is not public and not accessible to anyone. The banks are servers and the blockchains act as databases. The clients are the users. Seem familiar? This is a client-server architecture with a blockchain running as a database.

 > Bank Node is a publisher of anonymous tokenized cash. Users can choose Bank Node service providers and
  have a token contract to issue digital cash. Based on the contract, it can be a debit card or credit card type.
  When the user pays the merchant with digital cash, the merchant can claim the digital currency to the issuing
  Bank Node. "The performance of this payment process should be equal to or better than normal credit card
  payments."

 > For high-volume money transfer, MetaMUI utilizes a normal blockchain consensus protocol. All Bank Nodes are
  involved in the consensus of multiple digital currencies. Since this a transfer between identities, it is a kind of
  digital cheque payment. Also since we are using blockchain consensus to do so instead of a centralized server
  for cheque clearance, this is a decentralized cheque system. This payment process is slower than the
  conventional credit card payment but it is much faster and costs less than an account-based international bank
  transfer.

  Building a platform for carrying out transactions is perfectly okay but introducing blockchains as a means of a just database doesn't make sense. It feels like a gimmick, a buzzword to secure seed & money from investors. Also, there is nothing wrong with a client-server architecture but the speed of current infrastructure relies on implementing a blockchain as a runtime for transactions, which, as always, is **slow**. Blockchains are supposed to be secure and transparent but they are not efficient and fast. The transaction data when accessible publicly make the network secure, which it is not, here. Whereas a more traditional client-server architecture is equally secure and more efficient. Look at the current banking and payment gateway scenario in India. UPI payments, net banking, and debit card payments, are all carried out in a secure environment and are blazing fast.
 > A blockchain-style data store is secure but it is not efficient in terms of computation, communication, and data point of view.

1. **The Consensus mechanism**
 > Consesnus Protocol
 > MetaMUI’s consensus protocol is a combination of PBFT(Practical Byzantine Fault Tolerance) and PoS(Proof of
  Stake). Only Bank Nodes participate in the consensus of built-in blockchains. Bank Node can be a block
  proposer and endorser of both built-in blockchains and all digital currency blockchains. The mobile node can
  participate in the consensus of newly created digital currencies as an endorser. In the case of digital currency
  consensus, **only a Bank Node can be a leader or the block proposer**.

 Bank nodes have the authority to govern, validate transactions and decide the fate of the entire system, which makes the bank a central authority here. This gives authority to the bank nodes to validate any transactions. The bank may decide to invalidate valid transactions or validate invalid transactions and no one would know cause it would be there "on the blockchain". (Not saying that this would be done, because a banking sector obviously wouldn't carry out fraudulent transactions.) This does raise a question about the prorposed solution that claims to have solved the blockchain trilemma.
  
 > The leader node also acts as a serializer to serialize transactions. The leader node receives block rewards and
  transaction fees. Endorser also receives the endorsing rewards when the node’s endorsement is included in the
  majority vote.

 The endorser and leader nodes receive rewards based on the node’s endorsement. The endorser node receives the
 endorsement rewards when the node’s endorsement is included in the majority vote. The leader node receives the
 block rewards when the node’s block is included in the majority vote. How does a network with an nPOS consensus protocol pay or reward nodes if there are no gas fees involved?

1. **ACB (Algorithmic central bank)**

 The current platform runs a single and private blockchain without any overhead of the AI mechanism that will fuel the infrastructure.
 Implementing the Algorithmic Central Bank can be a key player in the industry. The current platform is inefficient when run using a single private blockchain and no centralized banking establishment to control inflation and deflation. The product can be improved when the existing mechanism as proposed in the whitepaper come to play. The current platform might not be a very good solution for the industry unless the stated propositions come to play.

 > MetaMUI is just the starting point. We suggested fundamental solutions for Algorithmic Central Bank and a
  decentralized, but expandable ecosystem based on mobile nodes. But we believe the current development of
  artificial intelligence technologies such as deep learning and reinforcement learning will be the key game changers of the blockchain platform. MetaMUI was designed to take care of these technologies. In near future,
  we can see the powerful coordination of more flexibilities based on artificial intelligence and robustness/
  stability for transactions based on the blockchain platform.

 > The digitalization of currency opens up new opportunities for digitalized monetary decision-making. Bank node
  is an early form of Algorithmic Central Bank that makes monetary decisions based on financial big data. It is
  possible to apply a federated learning algorithm at the central bank node and collect and learn a decentralized
  model on many mobile nodes.

### Ideological challenges

MetaMUI wallet also lets you regulate digital currencies and crypto-currencies across the world and carry out transactions without having to pay conversion fees. This current implementation of the ideology may become an issue because of the following reasons:

1. **Governments of countries do not generally allow cryptocurrencies to be legal tender.** There are two countries as of now that currently allow cryptocurrencies to be traded and accepted as legal tender and both of them are not the most developed or developing nations in the world. Targeting these countries to sell the platform might not be wise.

  Governments usually have a means of regulating easier banking methods and exchange methods. Let us take the example of India. India doesn't allow cryptocurrencies to be legal tender. Digital payments are very popular and online payments being carried out in India follow traditional banking and government norms and are very fast. I don't think anyone in the current generation nowadays goes to the bank to deposit or withdraw money. Let us take another example of the UID system followed in India, **Adhaar** system. The system is encrypted using military-grade encryption. The system is very secure and the government is very responsible for the security of the system. The current implementation of encryption used at MetaMUI Wallet is SHA-256 which although a very secure algorithm would seem like legacy software for the Indian government to integrate and work with. The task is tedious and unnecessary.

 There seems no solid revolutionary reason for a bank/government to introduce a new platform to run which regulates and carries out transactions and exchanges for free. Excellent existing platforms are already available and our infrastructure is not a new platform. *(Paytm, Gpay, Paypal, CoinDCX etc.)*

1. **Conversion fees are a means of generating tax for a government.** International exchanges or cryptocurrency exchanges are a means of generating tax for a government. When you convert INR to USD or vice versa, you are generating tax for the government. Current conversion from ETH, BTC to INR is a very low fee but there does exist a fee.
 > MetaMUI Network is an Internet-based cross-border payment network. In MetaMUI Network, each user’s DID is
 a universal accounting address that user can send or receive digital currencies. Utilizing collateral asset feature
 and meta-blockchain feature of MetaMUI Blockchain, it is possible to dynamically create meta-coin on the fly to
 facilitate cross-border payment between the currencies those are not on the MetaMUI Network. Similar to the
 stable coin issuance, central bank or commercial bank of each country can create stable meta-coin on the
 MetaMUI Network and perform international fund transfer

 The platform introduced doesn't have gas fees. Gas fees are the fees in a blockchain that you need to pay to make a transaction or carry out a smart contract. A miner validates your transaction by spending its computation power and in return is awarded the gas money. Gas fees are a means of generating revenue for a miner, but having no gas fees in a private blockchain implies that the bank and the infrastructure have to spend money on electricity and computing resources to validate transactions. It doesn't make sense to have a platform that makes you spend money on electricity and computing resources just to validate transactions.

 >When users are trading digital stocks or assets in a peer-to-peer way, MetaMUI provides an atomic swap of
 digital stock and digital currency. Since digital stock is bind to the user’s identity, ownership transfer notification
 and tax payment can happen at the same time as the stock trade. This eliminates the need for separate
 shareholder registration, issuance of shareholder certificates, tax reports to the government, and tax payments.

 Let us again take the example of India. Cryptocurrencies when made legal in India would have a 30% conversion fee, you'd have to pay a 30% tax to the government for converting the cryptocurrency. It wouldn't make sense for India to allow the platform to run without a conversion fee. Also, there are a lot of other, well-established platforms playing in the same field and pitching and hitting hard in these areas. *(CoinDCX, Coinbase, etc)*

1. **Present operating scenario in foreign exchange platforms.**

 >Cheaper, faster, and efficient cross-border payments are the need of the hour in today’s digital world. The
  MetaMUI Network is designed to host multiple blockchains concurrently. Each of these blockchains can run
  independently of each other and communicate (transact) with each other. The currency exchange is made
  possible through atomic swaps and multi-currency transfer is possible with an exchange service provider
  (Master Node) making it excellent for direct sovereign currency to sovereign currency cross-border payments

 The existing exchange platforms are extremely secure, well-established, and highly efficient. The working and operation of these platforms are governed by international laws. The current implementation of MetaMUI Wallet doesn't include any gas fees for transactions. It'd either have to tie up with an exchange platform or would have to come up with some other way to convince a country to let it handle all of its transactions. Either way, it would be both cost ineffective solutions. With private blockchains and 0 gas fees, MetaMUI Wallet will be having a hard time trying to carry out free transactions across the globe. The organization, at first, would have to pay for the mining and electricity and on top of that would have to pay the cross-border payment fees too.

## A better direction  

There might exist better, more efficient solutions to the above problems but two of them may have these similar approaches:

1. **Introduce a public blockchain** This solves the problem of spending money on validating transactions. Miners can validate transactions and the government/ bank can verify the transactions. This would be a huge bump in security, transparency, and cost efficiency.

 It still doesn't solve the problem of introducing a new platform just to do this. The tax play still becomes an issue here. How does the platform plan on managing taxes? Why would a bank allow a platform to run which would not benefit it in any manner? The government levies taxes to exchange international currencies. Why would it stop doing that? Even if it is allowed, how would it compete with other platforms working towards a similar strategy?

1. **Following traditional client-server architecture using a distributed database** This would solve the problem of efficiency. Traditional architectures have been here for a very long time and a lot of research has been done on optimizing the existing infrastructure. Horizontal slicing, vertical slicing, and many other optimization techniques may be used to improve the efficiency of the platform. The platform would be faster, equally secure, and more efficient.

 The issue with this approach is that what problem is it really trying to solve. Don't there exist platforms that are already doing everything this infrastructure is trying to solve? How would it be able to compete with the existing giants? Isn't the solution building a redundant, regular, exchange banking platform that the world has no less of?  How would the platform differentiate itself? What is MVP, the USP of the platform? If it decides to work together with the government, what ensures that other existing strong infrastructures do not also decide to do this and do it better?

### Improving the current infrastructure

The approaches may be justified once some of the important issues are addressed. Other than the mentioned problems, a lot of other factors need to make sense in order to improve and make the platform more a feasible good product to be sold. The product being built is excellent, no doubt. The deep learning models in the ACB mechanism, the tech being used, the next generation Polkadot blockchains which are much, much faster (1000 transactions per second as compared to 7-10 transactions in traditional blockchain networks) and allow a huge no. of queries in a much faster time, the faster and more efficient transaction mechanisms, interoperability, the economic scalability, user-driven governance, the forkless upgrades, and the claimed security and transparency, are a step in the right direction, but there are grave issues those still need to be addressed before the product is introduced and launched.

*Ref: [Whitepaper](https://sovereignwallet-network.github.io/whitepaper/MetaMUI-Blockchain-White-Paper.pdf)*
