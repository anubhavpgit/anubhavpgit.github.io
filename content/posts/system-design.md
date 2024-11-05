---
title: 'System Design & Architecture for cbrtl'
date: "01-05-2024"
description: "Things to consider while building a system"
draft: false
index: false
tag: "#tech"
---

Considering scalability, fault tolerance, security, and monitoring, you could broadly think about the following:

## Scalability

1. A Microservice Architecture: This is where you split your application into multiple services, each handling a specific task. Each service is independent of the other and communicates with the other services. This is a good way to scale your application and make it fault-tolerant.

	 This architecture helps you scale your application horizontally, and make it fault-tolerant. You could have multiple instances of the same service running, and if one fails, the other takes over.

2. A Monolithic Architecture: This is where you build your entire application in a single service. This is easier to build, and deploy, but harder to scale.

 	This helps you scale vertically and is easier and quicker to build. You could have a single instance of the service running, and if it fails, you could restart it.

	| Aspect            | Monolithic Architecture | Microservices Architecture |
	|-------------------|-------------------------|----------------------------|
	| Structure         | Single, large application with all components tightly integrated | Multiple small services, each responsible for specific business functions |
	| Deployment       | Entire application deployed as a single unit | Services can be independently deployed, updated, and scaled |
	| Scalability      | Scaling requires replicating the entire application | Scaling can be done selectively for individual services |
	| Development      | One team typically works on the entire application | Different teams can work on separate services, allowing for faster development |
	| Technology Stack | Typically limited to a single technology stack | Each service can use different technology stacks, chosen based on requirements |
	| Fault Tolerance  | Failure in one module can bring down the entire application | Failures are isolated to specific services, reducing the impact on the overall system |
	| Complexity        | Simpler to understand and develop initially | Higher complexity due to distributed nature and inter-service communication |
	| Dependency       | Tight coupling between modules | Loose coupling between services, allowing for easier maintenance and updates |
	| Testing            | Testing the entire application can be complex | Services can be tested independently, facilitating easier testing and debugging |

	The best solution often is a combination of both architectures. You could have a monolithic application and then split it into multiple services as you grow. This is what most companies do.

3. A Message Queue: This is a queue[⏎](/blog/dsa.html) of messages (just like standing in a queue at Comicon), and each service reads from the queue, processes the message, and then sends it to the next service(the folks at the front would go from one booth to the other). Message queues are a good way to handle asynchronous communication between services.

- Use Cases: Asynchronous communication between distributed systems, reliable message delivery, load levelling, and buffering.
- Examples: RabbitMQ, Apache ActiveMQ, Amazon SQS (Simple Queue Service).
- Suitable for: Task scheduling, job queues, order processing, workflow management, and ensuring message delivery.

4. A Pub-Sub System: A publisher sends messages to a topic( like a radio station broadcasting messages), and multiple subscribers( like people tuning in to the radio station) receive messages from the topic. This is a good way to handle real-time communication between services.

- Use Cases: Real-time event-driven architectures, decoupling of components, broadcasting messages to multiple subscribers.
- Examples: Apache Kafka, RabbitMQ, Amazon SNS (Simple Notification Service).
- Suitable for: Event sourcing, logging and monitoring, real-time analytics, microservices communication, IoT data ingestion.

 A brief overview:

- Pub-Sub systems are designed for broadcasting messages to multiple subscribers (one-to-many), where subscribers express interest in specific topics or channels. They're often used in scenarios requiring real-time event-driven communication and are highly scalable.
- Message Queues, on the other hand, facilitate point-to-point (one-to-one) communication, where messages are sent to specific queues and consumed by exactly one consumer. They're focused on ensuring reliable message delivery and are commonly used for asynchronous communication, load levelling, and decoupling( separating) components.

It would all start making sense once you start building your application.

## Databases

5. A Database: This is where you store the data. There are broadly two kinds:  SQL-based and NOSQL database. The choice of a database is hugely dependent on the use case.

 	You could use a SQL database, a NoSQL database, a relational database, or a non-relational database, a database that is optimized for reads(just wanting to read data), writes(just wanting to store data), or both based on what you need.

	Internal Memory or RAM has a very high speed and is used for caching, while the disk (storage device, SSD etc.) has a lower speed, and is used for storing data.

	Caching is when you store the data in memory so that you can access it quickly. This is a good way to improve the performance of your application. But, you need to be careful, as the data in memory is volatile, and can be lost if the system crashes, also it is limited by the amount of memory you have, RAM is expensive; they are usually 8Gb or 16 GB, while disk storage is usually 1TB or 2TB.
	
	Here's a brief overview:

- SQL Database (Relational Database Management System - RDBMS):
  - Use Cases: Structured data with complex relationships, transactions, and strict schemas.
  -Examples: MySQL, PostgreSQL, Oracle, SQL Server.
  - Suitable for: Financial transactions, e-commerce platforms, banking systems, accounting software.
- NoSQL Database:
  - Use Cases: Handling large volumes of unstructured or semi-structured data, distributed data models. You do not have to define a schema, and you can store data in any format.
  - Examples: MongoDB, Cassandra, Redis, Couchbase.
  - Suitable for: Real-time analytics, content management systems, IoT applications, social networks, and mobile applications.
- Key-Value Stores:
  - Use Cases: Simple data models( name: string, roll number: integer), high performance, and scalability.  
  - Examples: Redis, DynamoDB.
  - Suitable for: Caching, session management, real-time bidding, gaming leaderboards.
- Document Stores:
  - Use Cases: Handling document-oriented data structures like JSON, XML, BSON.
  - Examples: MongoDB, Couchbase, CouchDB.
  - Suitable for: Content management systems, blogging platforms, user profiles, e-commerce product catalogs.
- Column-Family Stores (Wide-Column Stores):
  -Use Cases: Analytical workloads, time-series data, scalable and distributed storage.
  - Examples: Cassandra, HBase.
  - Suitable for: Big data analytics, time-series databases, recommendation systems.
- Graph Databases:
  - Use Cases: Representing and querying highly interconnected data, social networks, fraud detection, recommendation engines.
  - Examples: Neo4j, Amazon Neptune.
  - Suitable for: Social networks, recommendation engines, network and IT operations, fraud detection.

## Networking & Security

6. Load Balancers focus on distributing incoming traffic across multiple servers or instances to ensure scalability and fault tolerance. They operate at the network (Layer 4) or application (Layer 7) level and are primarily concerned with optimizing resource utilization and ensuring high availability. Essentially, they balance the load across multiple servers to prevent any single server from becoming overwhelmed.

- Use Cases: Distributing incoming network traffic across multiple servers or instances to ensure optimal resource utilization, scalability, and fault tolerance.
- Examples: NGINX, HAProxy, Amazon ELB (Elastic Load Balancer), Azure Load Balancer.
- Suitable for: Web servers, application servers, database servers, microservices architectures, high-traffic websites, and applications.

7. A Reverse Proxy is where how route the requests to the appropriate service. This is a good way to make sure that the application is secure, and fault-tolerant. It is like a bouncer at a club, who checks if you are on the list, and then lets you in. It is a good way to protect your application from direct exposure to the internet and improve performance by caching and compression. Let's say we are building a secure application, we would want to only allow requests from a certain type of client( mobile app, web app, etc.), and a reverse proxy would help us do that.

	A proxy server is an intermediary server that sits between the client and the origin server, forwarding client requests to the server and returning responses to the client. A reverse proxy, on the other hand, sits between the client and the server, intercepting incoming requests and routing them to the appropriate backend server or service.

- Use Cases: Handling incoming client requests and routing them to appropriate backend servers or services, providing an additional layer of security, and improving performance by caching and compression.
- Examples: NGINX, Apache HTTP Server (with mod_proxy), HAProxy, Envoy Proxy.
- Suitable for: Web applications, APIs, microservices architectures, protecting backend servers from direct exposure to the internet, implementing SSL termination, load balancing, and content caching.


## Deploying

9. Continuous Integration/Continuous Deployment (CI/CD):
- Use Cases: Automating the process of building, testing, and deploying applications to ensure they are always up-to-date and running smoothly. All you need to do is write code. The rest is taken care of by the CI/CD pipeline. Once set up, the pipeline will automatically build, test, and deploy your code whenever you make changes.
- Examples: Jenkins, GitLab CI/CD, CircleCI.
- Suitable for: Ensuring rapid and reliable software delivery, facilitating collaboration among development teams, maintaining code quality through automated testing and deployment pipelines.

10. Containerization:
- Use Cases: Packaging applications and their dependencies into containers to ensure consistent runtime environments across different platforms. A container is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings. Containers isolate applications from their environment, ensuring they run consistently across different platforms.
- Examples: Docker, containerd, Podman.
- Suitable for: Simplifying deployment, scaling, and management of applications, enabling portability and reproducibility, facilitating -  microservices architectures.

While building a rust-based project, you could have a dockerfile, (which is a file that contains the instructions to build a docker image) with *Linux os*, *rustup* and *cargo* installed, and then copy the source code into the container Linux image, and then build the image. This is a good way to make sure that the application runs consistently across different platforms.

11. Container Orchestration:
- Use Cases: Managing and scaling containerized applications across a cluster of machines to ensure high availability, fault tolerance, and efficient resource utilization.
- Examples: Kubernetes, Docker Swarm, Amazon ECS (Elastic Container Service).
- Suitable for: Automating deployment, scaling, and management of containerized applications, providing self-healing capabilities, optimizing resource allocation, and ensuring consistent performance.

12. Domain Name System (DNS):
- Use Cases: Mapping domain names to IP addresses to enable users to access web applications and services through human-readable addresses. An application usually listens to a port (like 8080) and is exposed via the IP address. The DNS maps the domain name to the IP address, so that the user can access the application via the domain name. (Ex. this website is a static HTML application and is hosted on a server with an IP address and the domain name [https://anubhavp.dev](https://anubhavp.dev) is mapped to the IP address( ex: 192.168.1.1 ) via the DNS)
- Examples: BIND, Google Cloud DNS, Amazon Route 53.
- Suitable for: Translating domain names to IP addresses, load-balancing traffic across multiple servers, managing domain records and configurations.

13. Content Delivery Network (CDN):
- Use Cases: Caching content and serving it from the nearest edge server to improve performance, reduce latency, and enhance the scalability of web applications. CDN sits between the user and the server and caches the content (stores it in memory) so that the user can access it quickly. Like using CSS, JS libraries, images, etc.
- Examples: Cloudflare, Akamai, Amazon CloudFront.
- Suitable for: Accelerating content delivery, mitigating DDoS attacks, optimizing bandwidth usage, improving user experience for globally distributed audiences.


## Monitoring

- Logging Framework:
- Use Cases: Capturing and recording events, errors, and activities within an application for troubleshooting, auditing, and monitoring purposes.
- Examples: Log4j, Logback, Winston (Node.js), Serilog (.NET). These logs can then accurately represent the state of your application, what issues it is facing, and how it is performing.
- Suitable for: Generating structured logs with customizable formats, levels, and destinations, facilitating centralized logging and log aggregation.

## Case Studies

Considering a real-world example, let's take a look at a scenario: 

**A content recommendation system**, where we recommend content to the user based on their preferences; Netflix.
	
Before jumping into any architecture, ask yourself the following questions:

- What problem am I trying to solve?
- Who are the users?
- What features do I want?

A breif description about the requirement would be:

A platform that users can log on to, and watch content. The platform stores the history of the shows or movies watched and the ratings of the user; what they like/dislike. It then recommends content based on that. The platform should be able to handle millions of users, and terabytes of data. 

Technically, a platform as such would have a million other services like copyright management, payment gateway, content advisory, etc. But, for the simplicity of this exercise, we would focus primarily on the content recommendation system.

Before moving on, you have the following bullet points to consider:

- Content Recommendation
- User Authentication
- Rating Management
- Load Handling

### System Design

##### Frontend

- Frontend: The user interface where users interact with the application. This could be a web application, mobile application, or smart TV application. This platform should be able to handle a lot of incoming data and display using in a video streaming service, a video player. Popular frameworks to handle this are React, Angular, Vue, etc.

	The frontend could look something like this:

```/homepage```

Displays recommended content, trending content, and user-specific recommendations.

- Recommended Content: Shows personalized content recommendations based on user preferences and viewing history.
- Trending Content: Displays popular content that is trending on the platform.
- User-Specific Recommendations: Shows content recommendations based on user preferences, ratings, and viewing history.

```/profile```

Allows users to update their profiles, change passwords, and manage preferences.

- Profile Management: Enables users to update their profiles, change passwords, and manage preferences.
- Viewing History: Displays the user's viewing history, including shows watched, ratings, and timestamps.
- Preferences: Allows users to set preferences, genres, and content types they like.


```/content?id=123```

Shows detailed information about content, including title, description, genre, duration, and ratings.

- Title and Description: Displays the title and description of the content.
- Genre and Duration: Shows the genre, duration, and other details of the content.
- Ratings: Displays the average rating and user ratings for the content.

```/video?id=123```

Streams video content to users, handles video playback, and ensures a smooth streaming experience.

- Video Streaming: Streams video content to users, handles video playback, and ensures a smooth streaming experience.
- Playback Controls: Provides playback controls like play, pause, seek, volume, and full-screen mode.
- Quality Settings: Allows users to adjust video quality settings based on their internet connection.

##### Backend

- Backend: The server-side logic that processes requests from the frontend, interacts with the database, and sends responses back to the frontend.

	The backend could look something like this:

- User Service:

	Responsible for user authentication, registration, and profile management.

	- User Authentication: Handles user registration, login, and authentication using JWT tokens.
	- User Profile Management: Allows users to update their profiles, change passwords, and manage preferences.
	- User Data Storage: Stores user profiles in a NoSQL database, including user ID, name, email, password, viewing history, and preferences.

- Content Service:

	Responsible for managing content, including fetching, updating, and deleting content. 

	- Content Management: Manages content metadata, including fetching, updating, and deleting content.
	- Homepage Display: Displays the homepage with recommended content, trending content, and user-specific recommendations.
	- User Preferences: Fetches user preferences and viewing history to personalize content recommendations.
	- Content Data Storage: Stores content metadata in a NoSQL database, including content ID, title, description, genre, duration, and other details.

- Recommendation Engine:

	Responsible for generating personalized content recommendations based on user preferences and viewing history, maybe running a ML/ DL model.

	- Personalized Recommendations: Generates personalized content recommendations based on user preferences and viewing history.
	- Machine Learning Model: Runs a machine learning model to predict user preferences and recommend relevant content.
	- Recommendation Data Storage: Stores recommendation data in a NoSQL database, including user ID, recommended content, and timestamp.

- Rating Service:

	Responsible for managing user ratings for content, updating the ratings, and calculating the average rating for each content.

	- User Ratings: Manages user ratings for content, updates ratings, and calculates the average rating for each content.
	- Rating Data Storage: Stores user ratings in a NoSQL database, including user ID, content ID, rating, and timestamp.
	- Average Rating Calculation: Calculates the average rating for each content based on user ratings.
	- Input for Recommendation Engine: Provides user ratings as input to the recommendation engine for generating personalized recommendations.

- Video Streaming Service:

	Responsible for streaming content to users, handling video playback, and ensuring a smooth streaming experience.

	- Video Streaming: Streams video content to users, handles video playback, and ensures a smooth streaming experience.
	- Content Delivery: Delivers content from the storage layer to users via a content delivery network (CDN) for faster access.
	- Video Player Integration: Integrates with video players to provide a seamless streaming experience on web and mobile applications.

##### Database

The data storage layer where user data, content data, ratings, and other information are stored. We could use a NoSQL database like MongoDB for storing user profiles, content metadata, and ratings. We could also use a caching layer like Redis for caching frequently accessed data, improving performance. We could have multiple collections for storing different types of data:

- User Collection: Stores user profiles, including user ID, name, email, password, viewing history, and preferences.
- Content Collection: Stores content metadata, including content ID, title, description, genre, duration, and other details.
- Rating Collection: Stores user ratings for content, including user ID, content ID, rating, and timestamp.

##### Load Balancer

Distributes incoming traffic across multiple instances of the backend services to ensure optimal resource utilization and high availability like NGINX or Amazon ELB for this purpose, if we are using AWS.

- Storage: The storage layer where content files are stored. A cloud storage service like Amazon S3 for storing video files, images, and other media content would be a good choice.

##### Content Delivery Network (CDN)

Caches and delivers content to users from the nearest edge server to improve performance and reduce latency. A CDN like Cloudflare or Amazon CloudFront would help in delivering content quickly to users across the globe.

##### Monitoring System

A monitoring system that tracks the performance of the application, identifies issues, and ensures the system is running smoothly. Tools like Prometheus, Grafana, and ELK Stack could be used for monitoring and logging.

---

This is a very high-level overview of the system design for a content recommendation system like Netflix. In reality, the system would be much more complex, with additional services, databases, caching layers, load balancers, and monitoring systems. But this should give you a good starting point for building a content recommendation system.

## Next?

There is a lot of information here, and it can be overwhelming. But, the key is to start small, and then grow as you need. You don't need to implement all of these at once. You could start with a monolithic application and then split it into multiple services as you grow. You could start with a SQL database, and then move to a NoSQL database as you need. It is totally understandable if you do not understand everything at once, that is also not expected. All of this will start making sense once you start building your application, and as you grow, you will learn more about what you need.
