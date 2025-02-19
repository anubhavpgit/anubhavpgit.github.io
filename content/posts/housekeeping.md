---
title: 'Housekeeper - A distributed cache database'
date: "15-04-2025"
description: "A functional prototype of a high-performant, scalable, and fault-tolerant key: value store in Rust"
draft: true
tag: "#tech"
---

## Why a distributed cache database?

## Designing our in-house caching system

## What works in the real world?

Meta uses Memcache to store frequently accessed data, reducing the need to query backend databases (such as MySQL). Since Meta's services experience high read traffic, Memcache acts as a first layer before hitting persistent storage. Facebook developed McRouter, an open-source Memcached proxy, to handle large-scale routing and load balancing of cache requests across many Memcache nodes. McRouter provides a unified interface to the client applications, abstracting the complexity of managing multiple Memcache servers which also supports advanced features like sharding, failover, and consistent hashing to ensure high availability and reliability.[^1]

CacheFront is an integrated caching solution designed to enhance the performance of Docstore, Uber's in-house distributed database. Docstore itself is built on top of MySQL. To address the need for low-latency, high-throughput read operations, Uber developed CacheFront, which integrates Redis caching directly into Docstore's query engine.[^2]

[^1]: [Scaling Memcache at Facebook](https://research.facebook.com/publications/scaling-memcache-at-facebook/)

[^2]: [How Uber Serves Over 40 Million Reads Per Second from Online Storage Using an Integrated Cache](https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/)
