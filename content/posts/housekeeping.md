---
title: 'Housekeeper - A Distributed Database'
date: "15-04-2025"
description: "A functional prototype of a high-performant, scalable, and fault-tolerant key: value store in Rust"
draft: true
tag: "#tech"
---

## Caching

Caching is a mechanism to store the frequently accessed data in memory, to reduce load on database reads and network calls. It ultimately helps you reduce the load and improve the performance of your application, and can be implemented at various levels in the application stack; the database, the application layer, or the network layer. Redis, Amazon DynamoDB, Memcached, and MariaDB are some well-known, simple, in-memory caching solutions. Popular databases like MongoDB, MySQL, and PostgreSQL have built-in caching mechanisms. While in-house caching systems like Uber's CacheFront and Meta's Memcache are built on top of these open-source solutions.

Meta uses Memcache to store frequently accessed data, reducing the need to query backend databases (such as MySQL). Since Meta's services experience high read traffic, Memcache acts as a first layer before hitting persistent storage. Facebook developed McRouter, an open-source Memcached proxy, to handle large-scale routing and load balancing of cache requests across many Memcache nodes. McRouter provides a unified interface to the client applications, abstracting the complexity of managing multiple Memcache servers which also supports advanced features like sharding, failover, and consistent hashing to ensure high availability and reliability.[^1]

CacheFront is an integrated caching solution designed to enhance the performance of Docstore, Uber's in-house distributed database. Docstore itself is built on top of MySQL. To address the need for low-latency, high-throughput read operations, Uber developed CacheFront, which integrates Redis caching directly into Docstore's query engine.[^2]

**MongoDb** employs two levels of caching: WiredTiger cache is an in-memory cache that stores **disk pages** and **indexes** in memory for faster access. This cache is used for compressed storage and indexing metadata: it caches disk pages, not for directly caching documents for fast retrieval; it operates at the page level and not on a document level, while MongoDb also relies on the operating system’s cache that stores data files and indexes in memory to reduce disk I/O. 

MySQL uses a combination of internal caches to improve performance. The InnoDB Buffer Pool is the primary caching mechanism that caches data and indexes in memory to reduce disk I/O. The buffer pool is an LRU-based cache that stores data pages and index pages in memory. When a query is executed, MySQL first checks the buffer pool for the data. If the data is not found in the buffer pool, it is read from disk and loaded into the buffer pool.

Unlike MongoDB and MySQL, PostgreSQL does not have a dedicated internal cache and it is more OS-reliant; It relies heavily on the operating system’s page cache along with some internal memory structures. Shared Buffers (Primary Cache) is PostgreSQL's equivalent of MySQL's InnoDB Buffer Pool. It caches table data and index pages for fast access and works on an LRU (Least Recently Used) policy

## Designing our in-house caching system


Combining all the available information above, 

[^1]: [Scaling Memcache at Facebook](https://research.facebook.com/publications/scaling-memcache-at-facebook/)

[^2]: [How Uber Serves Over 40 Million Reads Per Second from Online Storage Using an Integrated Cache](https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/)
