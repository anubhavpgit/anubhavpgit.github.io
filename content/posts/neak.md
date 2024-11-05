---
title: 'Neak: Natural Language --> SQL'
date: "10-12-2023"
description: "Neak is a natural language to SQL engine that uses the RAG pipeline to generate SQL queries from natural language questions."
tag: "#tech"
---

In the realm of AI, it is evident that for those without technical expertise, the desire to steer away from coding or constructing intricate queries has intensified. The advent of large language models has conditioned us to prioritize results. We do not want to do the manual labor of writing code or queries. Instead, we now tend to present a cluster of questions, offer contextual details, and allow GPT and similar tools to handle the rest. From writing a letter to building scalable applications, LLMs like Chat-GPT, Bard, Llama etc. have become the go-to tools for all our needs. The most complex of tasks, such as writing code or constructing queries have become a breeze. 

However, a challenge arises when we seek to safeguard our data from direct interaction with the LLM layer. Neak expands upon the RAG framework by specializing in generating SQL queries from natural language inquiries without letting LLM touch the actual data.

*Caveat: This is a work in progress. The code is not yet available for public use. Below is a brief overview of the project.*

## Prompt Engineering

*"Prompt engineering is the process of structuring text that can be interpreted and understood by a generative AI model. A prompt is natural language text describing the task that an AI should perform".* (Source: [Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering))

In the realm of AI, SQL query generation utilizes prompt engineering: a prompt, essentially a natural language query, is inputted into the AI model, which in turn generates the SQL query. For accurate query generation, the model necessitates training on an extensive dataset containing questions paired with their respective SQL queries.

Some of the popular models for SQL query generation are:

### Lang Chain SQL Generator

Lang Chain has a dedicated module for SQL query generation. The module is called `langchain.chat_models.ChatOpenAI`. To generate a SQL query from a DB, a short Python code may look like this:

```python
model = ChatOpenAI()

sql_response = (
    RunnablePassthrough.assign(schema=get_schema)
    | prompt
    | model.bind(stop=["\nSQLResult:"])
    | StrOutputParser()
)

sql_response.invoke({"question": "How many employees are there?"})

```
The function uses the schema of the db to generate an SQL query and then runs the query to get the result. This is part of a code section to generate SQL from plain text. The full code can be found here: [*Reference*](https://python.langchain.com/docs/expression_language/cookbook/sql_db)

### SQL Coder

Defog's SQLCoder is a state-of-the-art LLM for converting natural language questions to SQL queries. SQLCoder is a 15B parameter model that slightly outperforms GPT-3.5-turbo for natural language to SQL generation tasks on the 'sql-eval' framework and significantly outperforms all popular open-source models. It also significantly outperforms text-davinci-003, a model that's more than 10 times its size.

SQLCoder is fine-tuned on a base StarCoder model. Defog was trained on more than 20,000 human-curated questions. These questions were based on 10 different schemas. None of the schemas in the training data were included in the evaluation framework. [Reference](https://github.com/defog-ai/sqlcoder)

Picture this: you need SQL queries for your database's data. Usually, an AI or LLM needs the dataset or context to generate these queries. But here's the catch – **sharing sensitive data with the AI** layer might not be safe. The data might be leaked, and the privacy of the users might be compromised. You would not want to share your data with the AI layer.

## RAG pipelines

A recent addition to the NLP landscape is the RAG (Retrieval Augmented Generation) pipeline. This involves retrieving **relevant documents** from a large corpus and then using a generator to generate the answer. Retrieval-Augmented Generation (RAG) is the concept to provide LLMs with additional information from an external knowledge source. This allows them to generate more accurate and contextual answers while reducing hallucinations.

**Advantages of RAG pipelines:**

The retriever **only provides the relevant data** to the generator. This
- reduces the amount of data that the generator has to process,
- improves the accuracy of the generator as it hallucinates less, and
- **protects the privacy of the data**.

Some of the recent RAG pipelines are:

### Lang Chain

Lang chain also implements dedicated workflows using RAG pipelines. The data is stored in a vectorstore and the retriever is a FAISS index. The generator is a LLM. A code snippet to generate SQL from plain text using RAG pipelines looks like this:

```python
vector store = FAISS.from_texts(
    ["Harrison worked at Kensho"], embedding=OpenAIEmbeddings()
)
retriever = vectorstore.as_retriever()

template = " Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

model = ChatOpenAI()

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)

chain.invoke("where did harrison work?")
```

The code attempts to create a vector of data and then uses the vector to retrieve the answer. The generator breaks down the question into words and then generates a vector for each word. The dataset is then searched for the nearest vectors and **only** the relevant data is sent to the AI model/ LLM to generate the SQL query.

The full code can be found here: [*Reference*](https://python.langchain.com/docs/expression_language/cookbook/retrieval)

### Llama Index

Llama Index follows a similar RAG pipeline. In Llama Index, a query engine is a generic interface that allows you to ask questions about your data.

A query engine takes in a natural language query and returns a rich response. It is most often (but not always) built on one or many indexes via retrievers. You can compose multiple query engines to achieve more advanced capability.

```python
# paul_graham_essay.txt
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine()
response = query_engine.query("Who is Paul Graham.")

To stream response:

query_engine = index.as_query_engine(streaming=True)
streaming_response = query_engine.query("Who is Paul Graham.")
streaming_response.print_response_stream()
```

Here, the essay is vectorized, and then the query engine is used to generate the answer. The full code can be found here: [*Reference*](https://docs.llamaindex.ai/en/stable/getting_started/starter_example.html).

An RAG (Retriever-Generator) pipeline comprises two core components: a retriever and a generator. In this setup, the retriever functions as a vector store, while the generator is typically an AI model, often an LLM. Their collaboration involves the retriever's task of extracting pertinent data from the vector store based on the question, followed by the generator's role in crafting the answer.

Thus, you would want to use an *RAG pipeline* to generate the SQL queries instead of sharing sensitive data with the LLM layer. However, RAG pipelines tend to be **slow** and are not as accurate as **prompt engineering**. The **process of storing the data** in a vector store and then retrieving the data from the vector store is time-consuming. After that, LLMs tend to **hallucinate** a lot.

## Neak

Neak builds up on the LlamaIndex query engine and tries to solve this performance issue. It tries to reduce the time taken to generate SQL queries using RAG pipelines and reduce the hallucinations.

Neak achieves this by:
- Improving the retriever
    - Chunking only the **schema** of the database and not the actual data.
    - Setting the chunk size efficiently. A **single chunk** corresponds to a **single table** in the database. The chunk size is small enough to not leak any sensitive information. 
    - Using an **in-memory vector store** to store the schema.
- Improving the generator
    - Using a **sub-querying engine** to generate better prompts from the original query/ question.


### Chunking

Using Llama Index's chunking engine, the schema of the database is chunked. The chunk size is set to a single table. This ensures that no sensitive data is leaked.

The chunks of the Postgres database may look something like this:

```json
{
    "public": {
        "departments": [
            // chunk 1 in raw text
            {
                "columnName": "department_id",
                "dataType": "integer",
                "isNullable": "NO",
                "default": "nextval('departments_department_id_seq'::regclass)",
                "udtName": "int4",
                "udtSchema": "pg_catalog"
            },
            // chunk 2 in raw text
            {
                "columnName": "department_name",
                "dataType": "character varying",
                "isNullable": "NO",
                "default": null,
                "udtName": "varchar",
                "udtSchema": "pg_catalog"
            }
        ],
        "employees": [
            {
                "columnName": "employee_id",
                "dataType": "integer",
                "isNullable": "NO",
                "default": "nextval('employees_employee_id_seq'::regclass)",
                "udtName": "int4",
                "udtSchema": "pg_catalog"
            },
....
```

The data is chunked only while initializing the engine. Once the chunking process is complete, the chunks are stored in an in-memory vector store. The vector store is then used to retrieve the data.

### Prompt Engineering

The generator converts the query into sub-queries, answers each query asynchronously and then combines the results to generate the final SQL query.

A question like "How many active employees are there with age more than 45 and working in the education sector, and are eligible for a bonus?" is converted into sub-queries like:  
"how many active employees are there with age more than 45?"  
"how many active employees are there working in the education sector?"  
"how many active employees are there eligible for a bonus?"  

The sub queries are then answered asynchronously and the results are combined to generate the final SQL query.


## What's next?

RAG pipelines are not perfect. Neak is a fine model, but not ready for production yet. It is in a nascent stage and requires a lot of refinement. Some of the issues that I faced are:

- GPT-3.5 turbo and GPT-4  hallucinated a lot. The results were not accurate.
- The time taken to retrieve the chunks has reduced, but the query generation is still slow. Although the sub-queries are generated asynchronously, the time taken to generate the final query is still high. The overall difference in time taken to generate the query is not significant.
- there is no context stored. A chat-based approach may be better.

While better alternatives like Defog's SQLcoder, which operates locally using Huggingface's transformers, resolve data leakage concerns, their complex setup poses usability. For an average person, setting up an AI model to run locally is not easy.

Technically, the most apt way to generate SQL queries is using **RAG pipelines** with **fine-tuned models**. While this is a more challenging approach, it is also the most accurate and secure. Neak is merely a bleak attempt to solve this. It is a work in progress and requires a lot of refinement. in the future, I plan to follow an approach similar to Defog's SQL coder: fine-tuning open-source LLMs and then using them to generate SQL queries using the Llama Index based Neak's approeach: a sub-querying engine. 