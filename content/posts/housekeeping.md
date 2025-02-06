---
title: 'Housekeeping  -  In-house Caching Systems'
date: "15-02-2025"
description: "A breakdown of various in-house caching systems at organizations like Uber and Meta, and databases like MongoDB, MySQL, and PostgreSQL."
draft: true
tag: "#tech"
---

Caching is a mechanism to store frequently accessed data in memory to reduce the load on the database and network, and improve the performance of the application. Supposing in an application like Instagram, the latest posts are already always fetched from the database and shown as soon as you open up. As you go on scrolling, interacting with the application, refreshing, or navigating to different pages, new posts are fetched and displayed. Instagram caches the latest posts/ notifications/ messages in memory to reduce the load on the database. You might have noticed that when you refresh the page, the posts are displayed instantly or that when you are in a subway without internet, you can still at times check messages or view navigate to certain posts with notifications, and doom-scroll a little bit.

Redis, Amazon DynamoDB, Memcached, and MariaDB are some well-known, simple, in-memory caching solutions. In-house caching systems like Uber's CacheFront and Meta's Memcache are built on top of these open-source solutions to provide low-latency access to frequently accessed data. This article is a simple breakdown of how Uber and Meta use similar systems to improve performance and reduce load.

### Memcached

Memcached is a well known, simple, in memory caching solution. This paper describes how Facebook leverages memcached as a building block to construct and scale a distributed key-value store that supports the world’s largest social network[^1].

#### Scaling Memcache at Facebook

[^1]: [Scaling Memcache at Facebook](https://research.facebook.com/publications/scaling-memcache-at-facebook/)

### CacheFront

[Docstore](https://www.uber.com/en-IN/blog/schemaless-sql-database) is Uber's in-house, distributed database built on top of MySQL®. New business verticals and aplications demand improved performance and lower latency while maintaining high availability and fault tolerance.

CacheFront is a caching layer that sits between the application and Docstore. It is a distributed, in-memory caching system that provides low-latency access to frequently accessed data. CacheFront is designed to be horizontally scalable and fault-tolerant, and it is built on top of the open-source Memcached[^2].

[^2]: [How Uber Serves Over 40 Million Reads Per Second from Online Storage Using an Integrated Cache](https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/)


## Databases

Popular databases like MongoDB, MySQL, and PostgreSQL have built-in caching mechanisms. MongoDb uses WiredTiger cache, MySQL uses InnoDB buffer pool, and PostgreSQL uses shared buffers to cache frequently accessed data.

**MongoDb** employs two levels of caching: WiredTiger cache and the operating system cache.
- WiredTiger cache is an in-memory cache that stores **disk pages** and **indexes** in memory for faster access. This cache is used for compressed storage and indexing metadata: it caches disk pages, not for directly caching documents for fast retrieval; it operates at the page level and not on a document level. WiredTiger cache is a write-back cache that flushes data to disk periodically. 
- MongoDB heavily relies on the operating system’s cache that stores data files and indexes in memory to reduce disk I/O. It is used for caching data files and indexes, and it operates at the page level. When a document is accessed, it gets pulled from disk into the OS cache, and subsequent reads are faster if the document remains there (Works like a LRU cache). MongoDB's "working set" (frequently accessed data) should ideally fit within available RAM for optimal performance.

Unlike MongoDB, MySQL uses multiple caching mechanisms, including:

| Cache Type | Purpose | Works Like | 
| -------- | ------- | ---------- | 
| InnoDB Buffer Pool | Caches data and indexes | LRU-based cache in RAM |
| Query Cache (deprecated) | Caches full query results | Hash-based cache |
| Key Cache (for MyISAM) | Caches MyISAM index blocks | LRU-based cache |
| Table Cache | Stores metadata for opened tables | Lookup cache |
| OS Page Cache | Caches disk pages (like MongoDB’s OS cache) | LRU-based cache | 

InnoDB Buffer Pool is the primary caching mechanism that caches data and indexes in memory to reduce disk I/O. The buffer pool is an LRU-based cache that stores data pages and index pages in memory. When a query is executed, MySQL first checks the buffer pool for the data. If the data is not found in the buffer pool, it is read from disk and loaded into the buffer pool. If the buffer pool is full, MySQL evicts the least recently used pages to make space for new data.

Unlike MongoDB and MySQL, PostgreSQL does not have a dedicated internal cache and it is more OS-reliant; It relies heavily on the operating system’s page cache along with some internal memory structures.

| Cache Type | Purpose | Works Like | 
| -------- | ------- | ---------- | 
| Shared Buffers | Caches frequently accessed table data and indexes | LRU-based cache (similar to InnoDB Buffer Pool) |
| WAL Buffers | Temporary storage for transaction logs before writing to disk | Write-back cache |
| Work Memory | Stores intermediate query results (sorting, hashing, etc.) | Query execution cache |
| Temp Buffers | Caches temporary tables | Session-based cache |
| OS Page Cache | Caches disk pages and indexes in RAM | LRU-based OS memory cache |

Shared Buffers (Primary Cache) is PostgreSQL's equivalent of MySQL's InnoDB Buffer Pool.
- Caches table data and index pages for fast access.
- Works on an LRU (Least Recently Used) policy.
- Controlled by shared_buffers (default: 25-40% of total RAM).
- If data is not in shared buffers, PostgreSQL retrieves it from OS page cache or disk.


## Next?

Understanding how caching works in these systems can help you design efficient and scalable applications. You can get the best of both worlds by using a combination of in-memory caching and database caching, and can leverage in-memory caching solutions like Redis, Memcached, or build your own caching layer on top of databases like MongoDB, MySQL, or PostgreSQL to improve performance and reduce load on the database.

I'm planning to build a functional prototype of a high-performance, scalable, and fault-tolerant distributed database in Rust which can also function as a caching mechanism in your existing applications. Stay tuned!