---
title: 'Housekeeping'
date: "10-11-2024"
description: "A breakdown of various in-house caching systems at organizations like Uber and Meta."
draft: true
tag: "#tech"
---

Redis, Memcached are well known, simple, in-memory caching solutions. This article is a simple breakdown of how Uber and Meta use similar systems to improve performance and reduce load.

## Memcached

## CacheFront

[Docstore](https://www.uber.com/en-IN/blog/schemaless-sql-database/?uclick_id=5dc20f5a-0284-4d95-a008-9d9a5eeac388) is Uber's in-house, distributed database built on top of MySQL®. New business verticals and aplications demand improved performance and lower latency while maintaining high availability and fault tolerance.

## What's next ?

I always wanted to create a simple distributed file system in Rust [⏎](https://anubhavp.dev/current.html#distributed-file-system). This now changes to building a simple in-memory cache system.

*References:*

[Uber Engineering](https://eng.uber.com/)

- [How Uber Serves Over 40 Million Reads Per Second from Online Storage Using an Integrated Cache](https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/)

[Meta Engineering](https://engineering.fb.com/)

- [Scaling Memcache at Facebook](https://research.facebook.com/publications/scaling-memcache-at-facebook/)
