---
title: 'DSA'
date: "01-05-2024"
description: "A short, concise guide to starting with Data Structures and Algorithms in c++"
draft: false
index: false
tag: "#tech"
---

Before starting with this, I wanted to ensure that if at any point you feel that you're not able to understand or grasp what is written on this page, that is **totally understandable**. These concepts are better understood when practised, not theoretically. So, if you're not able to understand something, don't worry, we'll be coding using these in the next few days, and you'll get a hang of it.

This guide has been written keeping in mind that you have a basic understanding of C++ and have written some code in it. If you haven't, I would recommend you to [start with that first](/blog/c++.html). Although the language used is C++, the concepts are the same in any language, so you can follow along with any language you're comfortable with. The syntax might change, but the concepts remain the same.

Data Structures and Algorithms are the building blocks of any program. They help you write efficient code and solve complex problems. Most essential for systems programming, they are also used in other core software engineering roles.

## Time Complexity

Time complexity is a measure of the amount of time an algorithm takes to run as a function of the length of the input. It is used to analyze the efficiency of an algorithm. The time complexity of an algorithm is usually expressed using asymptotic notations, that describe bounds of a function, or how the function behaves as the input size approaches infinity.

- Big O notation describes the upper bound of the time complexity of an algorithm. 
- Big Omega notation describes the lower bound of the time complexity of an algorithm.
- Theta notation describes the average time complexity of an algorithm.

Two other notations are also there(but we won't be using them):
- Little omega notation describes the lower bound of the time complexity of an algorithm, excluding the function itself.
- Little O notation describes the upper bound of the time complexity of an algorithm, excluding the function itself.

All of these are for information, we are only going to encounter Big O notation in the real world.

1. O(1) - Constant time complexity
2. O(log n) - Logarithmic time complexity
3. O(n) - Linear time complexity
4. O(n log n) - Linearithmic time complexity
5. O(n^2) - Quadratic time complexity
6. O(n^3) - Cubic time complexity

Algorithms with lesser time complexity are more efficient than those with higher time complexity. For example, an algorithm with O(1) time complexity is more efficient than an algorithm with O(n) time complexity. We would want our tasks to be completed quickly, like in a sec, rather than waiting for n seconds.

## Data Structures

Data structures are a way of organizing and storing data so that it can be accessed and modified efficiently. They are used to store and manipulate data in a computer program.

### Primitive Data Structures

Primitive data structures allow you to store a single data value. These include:

1. Integers
2. Floats
3. Characters
4. Booleans
5. Pointers


### Non-Primitive Data Structures

Non-primitive data structures allow you to store multiple data types. There are two types of non-primitive data structures:

1. Linear Data Structures
2. Non-Linear Data Structures

#### Linear Data Structures

As the name suggests, the linear data structures can store data in a linear dimension. There are two types of linear data structures: 

1. Static
2. Dynamic

Elements are stored sequentially. These include:

1. Arrays - *Static*
2. Vectors - *Dynamic*
3. Linked Lists - *Dynamic*
4. Stacks - *Dynamic*
5. Queues - *Dynamic*

#### Non-Linear Data Structures

Elements are stored in a non-sequential manner. These include:

1. Trees
2. Graphs
3. Hash Tables
4. Heaps
5. Tries  
etc.


##### Data Structures in C++

1. **Arrays** - [Arrays](https://en.wikipedia.org/wiki/Array_(data_structure)) are a collection of elements of the same data type. They are static in nature, meaning that the size of the array is fixed; you can't change it once declared. The elements are stored in contiguous memory locations. The index of the first element is 0.

	```cpp
	int arr[5] = {1, 2, 3, 4, 5};
	cout<<"The first element is:"<<arr[0]<<endl;

	```

	`[1, 2, 3, 4, 5]`

2. **Vectors** - Vectors are similar to arrays, but they are dynamic. You can change the size of the vector once declared. They are implemented using arrays or contiguous memory blocks. They are part of the Standard Template Library (STL) in C++.

	```cpp
	#include <vector>
	vector<int> v = {1, 2, 3, 4, 5};
	cout<<"The last element is:"<<v[v.size()-1]<<endl;

	v.push_back(6);
	```

	The benefit of using vectors is that you don't have to worry about the size of the vector, you can keep adding elements to it. Usually, the size is always doubled when the vector is full.

3. **Linked Lists** - [Linked lists](https://en.wikipedia.org/wiki/Linked_list) are a collection of elements called nodes. Each node contains data and a pointer to the next node. They are dynamic. There are three types of linked lists:

	1. Singly Linked List - Each node contains data and a pointer to the next node. The last node points to NULL. It can be traversed only in one direction.

		Here is an example of a singly linked list:

		```cpp
		struct Node {
			int data;
			Node* next;
		};
		int main() {
			//Creating a linked list
			Node* head = new Node();
			head->data = 1;
			head->next = NULL;
			//Adding elements to the linked list
			for(int i = 2; i<=5; i++) {
				Node* temp = new Node();
				temp->data = i;
				temp->next = NULL;
				Node* temp1 = head;
				while(temp1->next!=NULL) {
					temp1 = temp1->next;
				}
				temp1->next = temp;
			}
		}
		```

	2. Doubly Linked List - Each node contains data, a pointer to the next node, and a pointer to the previous node. It can be traversed in both directions.

		```cpp
		struct Node {
			int data;
			Node* next;
			Node* prev;
		};
		```

	3. Circular Linked List - The last node points to the first node. It can be traversed in both directions.

		```cpp
		struct Node {
			int data;
			Node* next;
		};
		int main(){
			//Creating a circular linked list
			Node* head = new Node();
			head->data = 1;
			head->next = head;
			//Adding elements to the circular linked list
			for(int i = 2; i<=5; i++) {
				Node* temp = new Node();
				temp->data = i;
				temp->next = head;
				Node* temp1 = head;
				while(temp1->next!=head) {
					temp1 = temp1->next;
				}
				temp1->next = temp;
			}
		}
		```

	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;">
	<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/2560px-Singly-linked-list.svg.png" alt="Linked List" class='h-50 w-100 mb2'>
	A Singly Linked List with data value as integers
	</figure>

	Linked Lists allow you to insert and delete elements at the beginning in O(1) and end in O(n) time complexity for singly linked lists and O(1) for doublt linked list with a tail pointer, whereas arrays or vectors take O(n) time complexity to insert at the beginning, and O(n) at the end if the array is full, else O(1). The disadvantage of linked lists is that you can't access elements randomly, you have to traverse the list to access an element.

	Arrays: O(1) to access an element, O(n) to insert/delete an element
	Vectors: O(1) to access an element, O(n) to insert/delete an element at an arbitrary position, amortized O(1)(*Interesting concept, google it!*) to insert/delete an element at the end,
	Linked Lists: O(n) to access an element, O(1) to insert/delete an element at the beginning/end

	In almost all cases, **vectors** are preferred over arrays and linked lists because of their dynamic nature and the ability to access elements randomly.

4. **Stacks** - [Stacks](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) are a collection of elements that follow the Last In First Out (LIFO) principle. They have two main operations: push and pop. The push operation adds an element to the top of the stack, and the pop operation removes the top element from the stack. (A stack of PS5 CDs, a stack of papers, etc.)

	```cpp
	#include <stack>
	stack<int> s;
	s.push(1);
	s.push(2);
	s.push(3);
	cout<<"The top element is:"<<s.top()<<endl;
	s.pop();
	cout<<"The top element is:"<<s.top()<<endl;
	```
	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lifo_stack.svg/1920px-Lifo_stack.svg.png" alt="Stack" class='h-100 w-100 mb2'>Simple representation of a stack runtime with push and pop operations.</figure>

	You can also use vectors/ arrays/ linked lists to implement stacks manually. Try implementing a stack using vectors.

	Stacks are used in applications where the order of elements is important, such as in compilers, browsers, etc. In compilers, the stack is used to store the operators and operands of an expression, and the order in which they are popped determines the order of evaluation. [*Refer*](https://www.geeksforgeeks.org/expression-evaluation/) to this link for more information. A function call is also implemented using a stack. When a function is called, the address of the next instruction is pushed onto the stack, and when the function returns, the address is popped from the stack. All of this becomes clear when you start coding.

	The std::stack in C++ is implemented using a deque (double-ended queue). A deque is a type of queue where elements can be added or removed from both the front and the rear. The std::stack is a wrapper around the std::deque.

	Stacks - O(1) to access the top element, O(1) to insert an element, O(1) to delete an element

5. **Queues** - [Queues](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) are a collection of elements that follow the First In First Out (FIFO) principle. They have two main operations: enqueue and dequeue. The enqueue operation adds an element to the rear of the queue, and the dequeue operation removes the front element from the queue. (A queue of people waiting at Comicon, a book signing by JKR, a queue of cars at a toll booth, etc.)

	```cpp
	#include <queue>
	queue<int> q;
	q.push(1);
	q.push(2);
	q.push(3);
	cout<<"The front element is:"<<q.front()<<endl;
	q.pop();
	cout<<"The front element is:"<<q.front()<<endl;
	```

	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/1920px-Data_Queue.svg.png" alt="Queue" class='h-50 w-50 mb2'>Representation of a FIFO (first in, first out) queue</figure>

	Try implementing a queue using vectors/ arrays/ linked lists.

	Queues are also used when the order of elements is important, such as in printers, operating systems, etc. In printers, the queue is used to store the print jobs, and the order in which they are dequeued determines the order of printing. In operating systems, the queue is used to store the processes, and the order in which they are dequeued determines the order of execution.

	The std::queue in C++ is implemented using a deque (double-ended queue). A deque is a type of queue where elements can be added or removed from both the front and the rear. The std::queue is a wrapper around the std::deque.

	Queues - O(1) to access the front element, O(1) to insert an element, O(1) to delete an element

	1. **Priority Queues** - Priority queues are a type of queue where each element has a priority associated with it. The element with the highest priority is dequeued first. They are implemented using heaps. Heaps are a type of binary tree where the parent node is greater than the child nodes. They are used in Dijkstra's algorithm, Prim's algorithm, etc.

		```cpp
		#include <queue>
		priority_queue<int> pq;
		pq.push(1);
		pq.push(2);
		pq.push(3);
		cout<<"The top element is:"<<pq.top()<<endl;
		pq.pop();
		cout<<"The top element is:"<<pq.top()<<endl;
		```

	2. **Deques** - Deques(Double-ended queues) are a type of queue where elements can be added or removed from both the front and the rear. They are used in applications where elements need to be added or removed from both ends, such as in a sliding window, etc.

		```cpp
		#include <deque>
		deque<int> dq;
		dq.push_front(1);
		dq.push_back(2);
		dq.push_front(3);
		cout<<"The front element is:"<<dq.front()<<endl;
		cout<<"The rear element is:"<<dq.back()<<endl;
		```
	3. **Circular Queues** - Circular queues are a type of queue where the rear of the queue is connected to the front of the queue. They are used in applications where the queue needs to be circular, such as in a round-robin scheduling algorithm, etc.

		```cpp
		#include <queue>
		queue<int> q;
		q.push(1);
		q.push(2);
		q.push(3);
		cout<<"The front element is:"<<q.front()<<endl;
		q.pop();
		cout<<"The front element is:"<<q.front()<<endl;
		```

6. **Hash Tables** - [Hash tables](https://en.wikipedia.org/wiki/Hash_table) are a type of data structure that stores key-value pairs. They are implemented using [hash functions](https://en.wikipedia.org/wiki/Hash_function). The key is hashed to generate a unique index, and the value is stored at that index. They are used in applications where fast access to elements is required, such as in databases, compilers, etc.

	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/1920px-Hash_table_3_1_1_0_1_0_0_SP.svg.png" alt="Hash Table" class='h-50 w-50 mb2'>A small phone book as a hash table</figure>

	1. **Unordered Map** - There is no order maintained in the keys. The keys are hashed to generate a unique index, and the value is stored at that index. The keys are unique. Internally, it uses a hash table to map keys to values, which provides average-time complexity of O(1) for insertion, deletion, and lookup.

		```cpp
		#include <unordered_map>
		unordered_map<int, string> um;
		um[1] = "one";
		um[2] = "two";
		um[3] = "three";
		cout<<"The value of key 2 is:"<<um[2]<<endl;
		```

		Hash Tables - O(1) to access an element, O(1) to insert an element, O(1) to delete an element

	2. **Ordered Map** - The keys are ordered/ sorted based on the key values. Internally, it uses a self-balancing binary search tree (typically a Red-Black Tree), which ensures that the keys are always stored in sorted order.

		```cpp
		#include <map>
		map<int, string> m;
		m[1] = "one";
		m[2] = "two";
		m[3] = "three";
		cout<<"The value of key 2 is:"<<m[2]<<endl;
		```

		Ordered Maps - O(log n) to access an element, O(log n) to insert an element, O(log n) to delete an element

	3. Unordered/ Ordered Set: A set is a collection of unique elements. Same as the other, but with unique elements.

7. **Tree** - A [tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) is a collection of nodes(vertices) connected by edges. The nodes are arranged in a hierarchical order. A tree is an undirected, connected, acyclic graph. When rooted, it can be represented as a directed graph with edges directed away from the root.

	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Tree_%28computer_science%29.svg" alt="Tree" class='h-50 w-50 mb2'>This unsorted tree has non-unique values (e.g., the value 2 existing in different nodes, not in a single node only) and is non-binary (only up to two children nodes per parent node in a binary tree). The root node at the top (with the value 2 here), has no parent as it is the highest in the tree hierarchy.</figure>

	1. **Binary Tree** - A tree where each node has at most two children.

		```cpp
		struct Node {
			int data;
			Node* left;
			Node* right;
		};
		```

	2. **Binary Search Tree** - A type of binary tree where the left child is smaller than the parent node, and the right child is greater than the parent node. The binary search tree is used to search for elements in O(log n) time complexity in balanced BST (like AVL or Red-Black Trees), and O(n) in worst case; if the tree is skewed. The binary search tree can be traversed in three ways:

	- Inorder Traversal - Left, Root, Right
	- Preorder Traversal - Root, Left, Right
	- Postorder Traversal - Left, Right, Root


	3. **AVL Tree** - A type of binary search tree where the difference in height between the left and right subtrees of each node is at most one. The AVL tree is used to maintain the balance of the tree. This balance ensures the tree's height remains O(log n). The AVL tree is used in applications where the height of the tree needs to be minimized to perform insertions, deletions, and searches in O(log n) time complexity, such as in databases, etc.

	4. **Red-Black Tree** - A type of binary search tree where each node is colored red or black. Red-black trees do not maintain a strict height balance like AVL trees but provide a "good enough" balance. This makes insertion and deletion operations faster (compared to AVL trees), which can require more rotations. As a result, red-black trees are often used in many libraries (like std::map in C++). The red-black tree is used in applications where the height of the tree needs to be minimized to perform fast insertions, deletions, and searches such as in associative containers like std::map, sets etc.

	5. B-Tree - A type of tree where each node can have more than two children. B-Trees are used in databases and filesystems due to their ability to handle multiple children where the cost of accessing data (on disk) is high, and it's important to minimize the number of disk accesses by keeping more data in each node. B-Trees are particularly good for minimizing disk reads.

	6. **Trie (Prefix Tree)** - A trie is a type of tree where each node represents a character. The trie is used to store strings. Tries are used to store strings efficiently, especially when dealing with prefix searches, like autocomplete or dictionary search. Tries take up more space than binary search trees, as each node typically represents a single character, but they are highly efficient for operations like prefix-based lookups.

	7. **Segment Tree** - A segment tree is a type of tree where each node represents a range of elements. The segment tree is used to perform range queries (like sum, minimum, maximum) efficiently. Each node represents a range of elements, and it can answer range queries in O(log n) time. They allow both point updates and range queries in O(log n) time, but the preprocessing time is O(n). Segment trees take up O(2n) space. Ideal for situations requiring dynamic range queries, such as in competitive programming, etc.

	8. Fenwick Tree( Binary Indexed Tree(BIT) ) - A Fenwick tree is a type of tree where each node represents a range of elements. Fenwick trees allow for efficient point updates and prefix sum queries in O(log n). Fenwick trees are slightly simpler to code than segment trees, but they cannot handle arbitrary range queries like a segment tree. They are better suited for problems where you only need to compute prefix sums or perform single point updates.

		
		Segment tree -
		- query in O(logN)
		- preprocessing in O(N)
		- Pros: less time complexity.
		- Cons: More amount of code compared to the other data structures.
		
		Fenwick tree -
		- query in O(logN)
		- preprocessing in O(N)
		- Pros: the shortest code, less time complexity
		- Cons: Fenwick tree can only be used for queries with L=1, so it is not applicable to many problems.

	9. Suffix Tree - A suffix tree is a type of tree where each node represents a suffix of a string. Suffix trees are specialized for string operations and allow efficient pattern matching, finding the longest common prefix, and solving other string-related problems. The space complexity of a suffix tree can be quite large (due to the number of nodes), but they allow for very fast string operations (like finding substrings in O(m) time, where m is the length of the pattern).

	10. Huffman Tree - A Huffman tree is a type of tree where each node represents a character and its frequency. Huffman trees are used in data compression algorithms like Huffman coding. They create an optimal prefix-free encoding based on character frequencies, minimizing the total number of bits required to represent a set of characters.

	11. Quad Tree - A quadtree is a type of tree where each node represents a quadrant of a 2D space. It tree is used to partition a 2D space. The quadtree is used in applications where the partitioning of a 2D space is important, such as in image processing, etc.

	12. Octree - An octree is a type of tree where each node represents an octant of a 3D space. The octree is used to partition a 3D space. The octree is used in applications where the partitioning of a 3D space is important, such as in 3D graphics, etc.

	13. **Heap** - Heaps are binary trees where the root node is either the maximum (in a max heap) or the minimum (in a min heap). Heaps are used in priority queues, where you need to quickly access the maximum or minimum element. Heaps are complete binary trees, which means they are balanced in terms of shape (completely filled except possibly for the last level, which is filled from left to right).

	Trees are used in applications where the hierarchical relationship between elements is important, such as in file systems, family trees, etc. They usually have a time complexity of O(log n) for search, insert, and delete operations.

Summary of Use Cases:
- AVL Trees: Applications requiring strict balance for fast lookups and where insertions/deletions are relatively infrequent (e.g., databases). - O(log n)
- Red-Black Trees: Applications requiring reasonably balanced trees with fast insertions and deletions (e.g., associative containers in libraries). - O(log n)
- B-Trees: Databases and file systems where minimizing disk accesses is important. - O(log n)
- Tries: Efficient string searching (e.g., auto-complete systems, dictionaries). - O(m)
- Segment Trees: Range queries (e.g., sum, minimum, maximum) in arrays, often used in competitive programming. - O(log n) for query, O(n) for preprocessing
- Fenwick Trees: Efficient prefix sums and single point updates (e.g., cumulative frequency tables). - O(log n) 
- Huffman Trees: Data compression (e.g., text file compression). - O(n log n) -construction, O(n) -encoding/decoding
- Quad Trees/Octrees: Spatial indexing and partitioning in 2D/3D spaces (e.g., image processing, video games). - O(log n)
- Heaps: Priority queues, where the minimum or maximum element is needed frequently. - O(1) to search for an element, O(log n)


8. **Graph** - A [graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) is a collection of nodes(vertices) and edges. The edges connect the nodes. There are two types of graphs:

	<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Directed.svg/1920px-Directed.svg.png" alt="Graph" class='h-50 w-50 mb2'>A directed graph with three vertices (blue circles) and three edges (black arrows).</figure>

	1. Directed Graph - The edges have a direction associated with them. The direction is from one node to another. *Tree* is a type of directed graph.
	2. Undirected Graph - The edges do not have a direction associated with them. The direction is bidirectional.

	There are two ways to represent a graph:

	1. **Adjacency Matrix** - An adjacency matrix is a 2D array where the rows represent the source nodes and the columns represent the destination nodes. The value at the intersection of the row and column represents the weight of the edge between the source and destination nodes.

		```cpp
		int adj[5][5] = {
			{0, 1, 0, 1, 0},
			{1, 0, 1, 0, 0},
			{0, 1, 0, 1, 1},
			{1, 0, 1, 0, 0},
			{0, 0, 1, 0, 0}
		};
		```

	2. **Adjacency List** - An adjacency list is a collection of linked lists where each node has a list of its adjacent nodes. The linked list can be implemented using vectors or linked lists.

		```cpp
		#include <vector>
		vector<int> adj[5];
		adj[0].push_back(1);
		adj[0].push_back(3);
		adj[1].push_back(0);
		adj[1].push_back(2);
		adj[2].push_back(1);
		adj[2].push_back(3);
		adj[2].push_back(4);
		adj[3].push_back(0);
		adj[3].push_back(2);
		adj[4].push_back(2);
		```

		Graphs are used in applications where the relationship between elements is important, such as in social networks, maps, etc.
		Graphs - O(n) to search for an element, O(1) to insert an element, O(1) to delete an element


9. **Suffix Array** - A suffix array is an array of integers that represent the starting positions of the suffixes of a given string, sorted in lexicographical order. It's widely used in string processing algorithms, particularly for problems like pattern matching, searching for substrings, and finding the longest common prefix (LCP) between strings. Suffix arrays are space-efficient compared to suffix trees but still allow efficient searching and can be constructed in O(n log n) time.

10. Bloom Filter -  A Bloom Filter is a probabilistic data structure used to test whether an element is a member of a set. It can give false positives (i.e., it might incorrectly indicate that an element is in the set when it isn't) but never gives false negatives. A Bloom Filter uses multiple hash functions to set bits in a bit array. When checking membership, it verifies whether all the relevant bits are set. If they are, the element is probably in the set, and if not, it definitely isn't.

11. Skip List - A Skip List is a probabilistic data structure that allows for fast search, insertion, and deletion by maintaining multiple layers of linked lists, each with progressively fewer elements. It's an alternative to balanced trees, offering similar time complexities, but its operations are often simpler and more efficient in practice due to its probabilistic nature. 

Summary:
- Suffix Array: Used for string processing and efficient pattern matching, lexicographically ordered suffixes of a string, with construction time of O(n log n).
- Bloom Filter: A probabilistic data structure for membership tests, space-efficient but can yield false positives. Used in applications like caching and networking. - O(1) for membership tests, O(1) for insert/query operations
- Skip List: A probabilistic data structure that supports fast search, insertion, and deletion, often simpler and more efficient than balanced trees in practice. - O(log n) for insert/delete/search operations

## Algorithms

Algorithms are a set of instructions that are used to solve a problem. There are a million algorithms out there, but the most common ones are:

- [Searching Algorithms](#searching-algorithms)
	- [Binary Search](#binary-search)
	- [Linear Search](#linear-search)
- [Sorting Algorithms](#sorting-algorithms)
	- [Bubble Sort](#bubble-sort)
	- [Selection Sort](#selection-sort)
	- [Insertion Sort](#insertion-sort)
	- [Merge Sort](#merge-sort)
	- [Quick Sort](#quick-sort)
	- [Heap Sort](#heap-sort)
	- [Counting Sort](#counting-sort)
	- [Radix Sort](#radix-sort)
- [Graph Algorithms](#graph-algorithms)
	- [Breadth-First Search (BFS)](#breadth-first-search-bfs)
	- [Depth-First Search (DFS)](#depth-first-search-dfs)
	- [Kruskal's Algorithm (for Minimum Spanning Tree)](#kruskals-algorithm-for-minimum-spanning-tree)
	- [Prim's Algorithm (for Minimum Spanning Tree)](#prims-algorithm-for-minimum-spanning-tree)
	- [Dijkstra's Algorithm (for Shortest Path)](#dijkstras-algorithm-for-shortest-path)
	- [Bellman-Ford Algorithm (for Shortest Path)](#bellman-ford-algorithm-for-shortest-path)
	- [Floyd-Warshall Algorithm (for All Pairs Shortest Path)](#floyd-warshall-algorithm-for-all-pairs-shortest-path)
	- [Topological Sorting](#topological-sorting)
- [Tree Algorithms](#tree-algorithms)
	- [Tree Traversal (Inorder, Preorder, Postorder)](#tree-traversal-inorder-preorder-postorder)
	- [Binary Search Tree (BST) operations (Insertion, Deletion, Searching)](#binary-search-tree-bst-operations-insertion-deletion-searching)
	- [AVL Tree operations (Insertion, Deletion, Searching)](#avl-tree-operations-insertion-deletion-searching)
	- [Red-Black Tree operations (Insertion, Deletion, Searching)](#red-black-tree-operations-insertion-deletion-searching)
	- [Segment Tree operations (Range queries)](#segment-tree-operations-range-queries)
- [Dynamic Programming](#dynamic-programming)
	- [Maximum Subarray Sum](#maximum-subarray-sum)
	- [Longest Common Subsequence (LCS)](#longest-common-subsequence-lcs)
	- [Longest Increasing Subsequence (LIS)](#longest-increasing-subsequence-lis)
	- [Matrix Chain Multiplication](#matrix-chain-multiplication)
	- [Edit Distance](#edit-distance)
	- [Coin Change Problem](#coin-change-problem)
	- [Rod Cutting Problem](#rod-cutting-problem)
	- [Fibonacci Series](#fibonacci-series)
	- [Knapsack Problem (0/1 Knapsack)](#knapsack-problem-01-knapsack)
- [Greedy Algorithms](#greedy-algorithms):
	- [Activity Selection](#activity-selection)
	- [Fractional Knapsack](#fractional-knapsack)
	- [Huffman Coding](#huffman-coding)
- [Backtracking](#backtracking):
	- [N-Queens Problem](#n-queens-problem)
	- [Sudoku Solver](#sudoku-solver)
- [Miscellaneous](#miscellaneous):
	- [Divide and Conquer (Merge Sort, Quick Sort)](#divide-and-conquer-merge-sort-quick-sort)
	- [Bit Manipulation Algorithms](#bit-manipulation-algorithms)
	- [Union-Find (Disjoint Set Union)](#union-find-disjoint-set-union)
- [String Algorithms](#string-algorithms):
	- [String Matching (Naive Algorithm)](#string-matching-naive-algorithm)
	- [Boyer-Moore Algorithm (for pattern matching)](#boyer-moore-algorithm-for-pattern-matching)
	- [Z Algorithm (for pattern matching)](#z-algorithm-for-pattern-matching)
	- [Suffix Array and Suffix Tree (for pattern matching)](#suffix-array-and-suffix-tree-for-pattern-matching)
	- [KMP Algorithm](#kmp-algorithm-for-substring-search)
	- [Rabin-Karp Algorithm (for substring search)](#rabin-karp-algorithm-for-substring-search)

---

### Searching Algorithms

#### Linear Search

Linear search employs a straight-forward search technique. It keeps on searching the element until found. It is not suitable for large datasets as it has a time complexity of **O(n)**.

```cpp
int linearSearch(int arr[], int n, int key) {
	for(int i = 0; i<n; i++) {
		if(arr[i] == key) {
			return i;
		}
	}
	return -1;
}
```

#### Binary Search

Binary search is a search algorithm that finds the position of a target value **within a sorted array**. It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until it is successful. It has a time complexity of **O(log n)**.

Ex. [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  
Element to search: 2

1. Compare 2 with the middle element 6. 2<6.
2. Eliminate the right half. The array becomes: [1, 2, 3, 4, 5]
3. Compare 2 with the middle element 3. 2<3. The array becomes: [1, 2]
4. Compare 2 with the middle element 2. 2=2. Element found at index 1. (*Indexing starts from 0*)

```cpp
int binarySearch(int arr[], int n, int key) {
	int low = 0, high = n-1;
	while(low<=high) {
		int mid = low + (high-low)/2;
		if(arr[mid] == key) {
			return mid;
		}
		else if(arr[mid]<key) {
			low = mid+1;
		}
		else {
			high = mid-1;
		}
	}
	return -1;
}
```

The only caveat with this is that the array needs to be sorted, else the algorithm won't work.

Using either of two depends on the size of the dataset and the order. For small datasets, linear search is preferred, and for large datasets, binary search is preferred. If the dataset is sorted, binary search is preferred. If the dataset is unsorted, linear search is preferred.

---

### Sorting Algorithms

#### Bubble Sort

Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It has a time complexity of **O(n^2)**.

Ex. [5, 3, 8, 6, 2]

1. Compare 5 and 3. 5>3. Swap them. [3, 5, 8, 6, 2]
2. Compare 5 and 8. 5<8. No swap. [3, 5, 8, 6, 2]
3. Compare 8 and 6. 8>6. Swap them. [3, 5, 6, 8, 2]
4. Compare 8 and 2. 8>2. Swap them. [3, 5, 6, 2, 8]
5. Compare 3 and 5. 3<5. No swap. [3, 5, 6, 2, 8]
6. Compare 5 and 6. 5<6. No swap. [3, 5, 6, 2, 8]
7. Compare 6 and 2. 6>2. Swap them. [3, 5, 2, 6, 8]
8. Compare 6 and 8. 6<8. No swap. [3, 5, 2, 6, 8]
9. Compare 3 and 5. 3<5. No swap. [3, 5, 2, 6, 8]
10. Compare 5 and 2. 5>2. Swap them. [3, 2, 5, 6, 8]
11. Compare 5 and 6. 5<6. No swap. [3, 2, 5, 6, 8]
12. Compare 6 and 8. 6<8. No swap. [3, 2, 5, 6, 8]
13. Compare 3 and 2. 3>2. Swap them. [2, 3, 5, 6, 8]
14. Compare 3 and 5. 3<5. No swap. [2, 3, 5, 6, 8]
15. Compare 5 and 6. 5<6. No swap. [2, 3, 5, 6, 8]
16. Compare 6 and 8. 6<8. No swap. [2, 3, 5, 6, 8]

Now the array is sorted. The number of passes is n-1, where n is the number of elements in the array.

```cpp
void bubbleSort(int arr[], int n) {
	for(int i = 0; i<n-1; i++) {
		for(int j = 0; j<n-i-1; j++) {
			if(arr[j]>arr[j+1]) {
				swap(arr[j], arr[j+1]);
			}
		}
	}
}
```

#### Selection Sort

It is the simplest sorting algorithm. It works by selecting the smallest (or largest, depending on sorting order) element from the unsorted portion of the array and swapping it with the first unsorted element. It has a time complexity of **O(n^2)**.

Ex. [5, 3, 8, 6, 2]

1. Select 2 as the minimum element. Swap it with 5. [2, 3, 8, 6, 5]
2. Select 3 as the minimum element. Swap it with 3. [2, 3, 8, 6, 5]
3. Select 5 as the minimum element. Swap it with 8. [2, 3, 5, 6, 8]
4. Select 6 as the minimum element. Swap it with 6. [2, 3, 5, 6, 8]

```cpp
void selectionSort(int arr[], int n) {
	for(int i = 0; i<n-1; i++) {
		int minIndex = i;
		for(int j = i+1; j<n; j++) {
			if(arr[j]<arr[minIndex]) {
				minIndex = j;
			}
		}
		swap(arr[i], arr[minIndex]);
	}
}
```

#### Insertion Sort

Insertion sort works by building a sorted array from the unsorted portion of the array; it iterates over the array and removes one element per iteration, finds the place the element belongs in the sorted list, and inserts it there. Insertion sort is how you arrange a deck of cards. It has a time complexity of **O(n^2)**.

Ex. [5, 3, 8, 6, 2]

1. Select 3. Insert it at the correct position. [3, 5, 8, 6, 2]
2. Select 8. Insert it at the correct position. [3, 5, 8, 6, 2]
3. Select 6. Insert it at the correct position. [3, 5, 6, 8, 2]
4. Select 2. Insert it at the correct position. [2, 3, 5, 6, 8]

```cpp
void insertionSort(int arr[], int n) {
	for(int i = 1; i<n; i++) {
		int key = arr[i];
		int j = i-1;
		while(j>=0 && arr[j]>key) {
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = key;
	}
}
```
---

Although these above algorithms are simple and easy to implement, they are not efficient for large datasets. They have an average time complexity of **O(n^2)**. For large datasets, for example if you have to sort a database of customers with more than a million records, these algorithms would take 10^12 operations, which is not feasible. 

The following algorithms are more efficient and can handle large datasets:

---

#### Merge Sort

This is a divide-and-conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. It has a time complexity of **O(n log n)**.

Ex. [5, 3, 8, 6, 2]

1. Divide the array into two halves. [5, 3, 8] [6, 2]
2. Divide the first half into two halves. \[5] [3, 8]
3. Divide the second half into two halves.\[6] \[2]
4. Merge the two halves. [3, 5, 8] [2, 6]
5. Merge the two halves. [2, 3, 5, 6, 8]

In the final case, the array is divided into single elements, which are by default sorted. The trick here is to effectively merge the sorted arrays. Two pointers( or indices ) both in the sorted arrays are used to compare and merge the arrays. When one of the arrays is exhausted, the remaining elements of the other array are directly copied to the result array.

```cpp
vector<int> sortArray(vector<int>& nums) {
  if (nums.size() == 1) return nums;   
  int mid = nums.size() / 2; 
  vector<int> leftArr = vector<int>(nums.begin(), nums.begin() + mid);
  vector<int> rightArr = vector<int>(nums.begin() + mid, nums.end());
    
  vector<int> left = sortArray(leftArr);
  vector<int> right = sortArray(rightArr);
    
  return mergeTwoSortedArrays(left, right);
}
vector<int> mergeTwoSortedArrays(vector<int>&nums1, vector<int>& nums2){
  vector<int> res;
  if(nums1.size()==0) return nums2;
  else if(nums2.size()==0) return nums1;

	int i = 0, j=0;
	// Compare the elements of the two arrays and push the smaller element into the result array
  while(i<nums1.size() && j<nums2.size()){
    if(nums1[i]<nums2[j]){
      res.push_back(nums1[i]);
      i++;
    } else{
      res.push_back(nums2[j]);
      j++;
    }
  }
	// If any of the arrays have elements left, push them into the result array
  if(i==nums1.size()){
    while(j<nums2.size()){
      res.push_back(nums2[j]);
      j++;
    }
  }else if(j==nums2.size()){
    while(i<nums1.size()){
      res.push_back(nums1[i]);
      i++;
    }
  }
  return res;
}
```

The problem with merge sort is that it requires extra space for the two halves. This can be avoided by using an in-place merge sort, which is a bit more complex.

#### Quick Sort

Quick sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. The objective here is to make sure that all the elements in the left array of the pivot element is less than the pivot element, and all the elements in the right array of the pivot element are greater than the pivot element. Essentially, the pivot element is placed in its correct position.

There are many different versions of quickSort that pick pivot in different ways. It has a time complexity of **O(n^2)** in the worst case, but **O(n log n)** in the average case.

- Case 1: Selecting Pivot as the first element, last element, or middle element.
	This is a simple approach where the pivot is selected as the first element, last element, or middle element. But, the probability of
	already sorted, or reverse sorted arrays remains same. This leads to higher chances of ending up with the worst case time complexity of O(n^2).

- Case 2: Selecting Pivot as the median of the first, middle, and last element.
	Performs well on all kinds of input data, including sorted, reverse-sorted, and random arrays. Despite improvements in average-case performance, median-of-three quicksort can still degrade to O(n²) in the worst case, especially if the array contains many duplicates or adversarial patterns.
		- Better suited for inputs that are sorted or nearly sorted because it avoids the worst-case performance of picking the first or last element.
		- Slightly faster in practice due to fewer recursive calls on highly structured data, but the median calculation adds constant overhead.

- Case 3: Selecting Pivot as a random element.
	This is a better approach where the pivot is selected as a random element. This reduces the probability of ending up with the worst case time complexity of O(n^2). The worst case occurs when the pivot divides the array into subarrays of size 0 and n - 1 repeatedly, which probabilistically occurs with a probability of 1/n!, which is very low. This basically means that the worst case is very unlikely to occur.

		- Better suited for unknown or random input distributions.
		- Ensures that no specific input can cause poor performance, making it more robust and reliable in practice.

Ex. [5, 3, 8, 6, 2]

For simplicity, let's select the pivot as the middle element.

1. **Select the pivot**: Choose the middle element of the array as the pivot. In the array [5, 3, 8, 6, 2], the middle element is 8. Swap it with the last element, so the array becomes [5, 3, 2, 6, 8].

2. Working array is [5, 3, 2, 6], and the pivot is 8.
3. **Partitioning process**: You now look for elements in the left subarray that are greater than the pivot and in the right subarray that are less than the pivot, and you swap them.

	In this case, there is no element greater than the pivot (8) in the left subarray, so the partitioning results in maxLeftIndex = 4 (end of the array).

4. **Place the pivot in its correct position**: After the partitioning is done, the pivot element (8) is placed at its correct position at nums[maxLeftIndex].

5. **Recursively sort the left and right subarrays**: Call quickSort on the left subarray [5, 3, 2, 6] and the right subarray [].

6. For the left subarray [5, 3, 2, 6], the pivot is 3. Swap it with the last element, so the array becomes [5, 6, 2, 3].

7. Working array is [5, 6, 2], and the pivot is 3. Maximum left index > pivot(3) is 0 and minimum right index < pivot(3) is 2. Swap 5 and 2. The new working array becomes [2, 6, 5].

8. **Repeat the process**: The maximum left index is 1 and the minimum right index is 0. Since 1 < 0, all elements less than pivot are on the left side of the pivot. Now replace the pivot with the element at the maximum left index, that is **1** nums[1] = 6. The array becomes [2, 3, 5, 6]. Swap 2 and 3. The array becomes [2, 3, 5, 6]

9. This process is repeated by diving the array into smaller subarrays until the array is sorted.

```cpp
 void quickSort(vector<int>& nums, int left, int right) {
	if (left >= right) return;
  int pivot = left + (right - left) / 2; // here the pivot is the middle element
  int pivotValue = nums[pivot];

  swap(nums[pivot], nums[right]);

  int maxLeftIndex = left;
  int minRightIndex = right - 1;

  while (maxLeftIndex <= minRightIndex) {
    while (maxLeftIndex <= minRightIndex && nums[maxLeftIndex] <= pivotValue)
			maxLeftIndex++;
    while (maxLeftIndex <= minRightIndex && nums[minRightIndex] >= pivotValue)
      minRightIndex--;
    if (maxLeftIndex < minRightIndex)
      swap(nums[maxLeftIndex], nums[minRightIndex]);
    }
    swap(nums[maxLeftIndex], nums[right]);

    quickSort(nums, left, maxLeftIndex - 1);
    quickSort(nums, maxLeftIndex + 1, right);
  }
```

The only caveat with quick sort is that it is not stable. This means that the relative order of equal elements is not preserved. This can be a problem when you have to sort objects based on multiple keys.

### Heap Sort

Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.

(A heap is a complete binary tree where each node has a value greater than or equal to its children. The root node is the maximum element in the heap. The heap can be a max heap or a min heap.)

Ex. [5, 3, 8, 6, 2]

1. Build a max heap. [8, 6, 5, 3, 2]. It would look like this:

```
		8
		/ \
	6		5
	/ \
3		2
```

2. Start from the last parent node.(2*n-1, where n is the number of elements in the array) and replace the root element( which is the max element now, since we built a max heap) with the last element. [2, 6, 5, 3, 8]
3. Heapify the array. [6, 3, 5, 2, 8] (Heapifying means making sure that the heap property is maintained. The change is reversed, and the new array is a max heap.)
4. Repeat the process.
`[5, 3, 6, 2, 8] -> [3, 2, 5, 6, 8] -> [2, 3, 5, 6, 8]`

```
		5(<6, thus needs to be swapped)
		/ \
	3		6
	/ \
2		*8*
```
->

```
		6(max heap)
		/ \
	3(max heap)		5(max heap)
	/ \
2(max heap)		*8*
```
->

*replace*

```
		2 (replaced)
		/ \
	3(max heap)		5(max heap)
	/ \
*6*		*8*
```
->

```
		2(<5, thus needs to be swapped)
		/ \
	3(max heap)		5(max heap)
	/ \
*6*		*8*
```
->

```

		5(max heap)
		/ \
	3(max heap)		2(max heap)
	/ \
*6*		*8*
```
->

*replace*

```
		2(replaced)
		/ \
	3(max heap)		*5*
	/ \
*6*		*8*

```
->

```
		2(<3, thus needs to be swapped)
		/ \
	3(max heap)		*5*
	/ \
*6*		*8*
```
->

```
		3(max heap)
		/ \
	2(max heap)		*5*
	/ \
*6*		*8*

```
->

*replace*

```
		2(replaced)
		/ \
	*3*		*5*
	/ \
*6*		*8*

```
->

```
		2(max heap)
		/ \
	*3*		*5*
	/ \
*6*		*8*

```

The array is now sorted.  

The best part is that the time complexity is **O(n log n)** in all cases. 

```cpp
vector<int> sortArray(vector<int>& nums) {
	buildMaxHeap(nums);
	for (int i = nums.size() - 1; i > 0; i--) {
		swap(nums[0], nums[i]);
		heapify(nums, i, 0);
		}
		return nums;
  }
	void buildMaxHeap(vector<int>& nums) {
		int n = nums.size();
		for (int i = n / 2 - 1; i >= 0; i--) {
			heapify(nums, n, i);
			}
		}

	void heapify(vector<int>& nums, int n, int i) {
		int largest = i;
		int left = 2 * i + 1;
		int right = 2 * i + 2;

		if (left < n && nums[left] > nums[largest])
		largest = left;
	
		if (right < n && nums[right] > nums[largest])
		largest = right;
	
		if (largest != i) {
			swap(nums[i], nums[largest]);
      heapify(nums, n, largest);
		}
  }
};
```

---

The above algorithms are the most common ones. It might look like Heap Sort is the best, but it is not always the case. The best sorting algorithm depends on the size of the dataset, the order of the elements, and the space complexity. Usually, Quick Sort is the best choice for large datasets, and Merge Sort is the best choice for linked lists. In real-world applications, we usually encounter with key-value pairs, or objects, and in such cases, we can use the built-in sort function in the language, which is usually built on top of these algorithms, mostly **Quick Sort**.

Quick Sort is usually preferred over Heap Sort because it's faster in practice due to better cache performance, fewer data movements, and the availability of optimizations that reduce its average runtime significantly. Heap Sort, while reliable in terms of time complexity, is often slower because of its less efficient memory access patterns and higher constant factors.

Here's a general comparison of the sorting algorithms:

| Feature/Metric           | In-Place Merge Sort                      | Randomized Quick Sort                    | Heap Sort                                  |
|--------------------------|------------------------------------------|------------------------------------------|--------------------------------------------|
| **Time Complexity (Best)**     | O(n log n)                               | O(n log n)                               | O(n log n)                                 |
| **Time Complexity (Average)**  | O(n log n)                               | O(n log n)                               | O(n log n)                                 |
| **Time Complexity (Worst)**    | O(n log n)                               | O(n²) (without randomization)            | O(n log n)                                 |
| **Space Complexity**           | O(1) (for in-place)                      | O(log n) (for recursion stack)           | O(1)                                       |
| **Stability**                  | Stable (in standard form)                | Unstable                                 | Unstable                                   |
| **In-Place**                   | Yes                                      | Yes                                      | Yes                                        |
| **Cache Efficiency**           | Poor                                     | High                                     | Poor                                       |
| **Typical Use Cases**          | Linked lists, external sorting           | General-purpose sorting, average-case fast | Predictable performance, real-time systems |
| **Practical Performance**      | Slower due to complex in-place merging   | Fastest on average                       | Slower due to more swaps and comparisons   |


---
The following are some more sorting algorithms that are used in specific cases, and they have a linear time complexity:

---

### Counting Sort

Counting Sort counts the number of occurrences of each element and stores it in an auxiliary array. It then calculates the position of each element in the sorted array. It has a time complexity of **O(n+k)**, where n is the number of elements in the array and k is the range of the input.

It is pretty straightforward and is used when the range of elements is known.

```cpp
vector<int> sortArray(vector<int>& nums) {
	vector<int> neg;
	vector<int> pos;

	for(int i=0;i<nums.size();i++){
		if(nums[i]<0) neg.push_back(-1*nums[i]);
		else pos.push_back(nums[i]);
	}

		countSortArray(neg);
		
		for (auto& num : neg)
			num = -num;

    std::reverse(neg.begin(), neg.end());
		
		countSortArray(pos);
    neg.insert(neg.end(), pos.begin(), pos.end());
        
    return neg;
  }

vector<int> countSortArray(vector<int>& nums) {
  if(nums.size()>0){
  	int max=nums[0],min=nums[0];
            
		for(auto &num: nums){
			if(num>max)
			max=num;
		if(num<min)
			min=num;
		}
		
		vector<int> counts(max-min+1);
		
		for (auto &num : nums) 
			counts[num - min]++;
		
		for (auto &num : counts) 
			cout<<num<<" ";
		
		nums.clear();
		
		for (int i = 0; i < counts.size(); i++) 
			while (counts[i] != 0){
				nums.push_back(i+min);
				counts[i]--;
				}          
      }

    return nums;
    }
};

```

Technically, the time complexity is **O(n+k)** ≈ **O(n)**, but it is not always the best choice. It is best suited for small datasets with a small range of elements. Say, if the range k is large relative to n(for example, n = 1,000 and k = 1,000,000), Counting Sort becomes less efficient both in terms of time and space complexity. Quick sort would take **O(3000)** time in such cases, but Counting Sort would take **O(1000000)** time.

### Radix Sort

Radix Sort is a non-comparative sorting algorithm that sorts the elements by first grouping the individual digits of the same place value. Then, the elements are sorted according to their increasing/decreasing order. It has a time complexity of **O(nk)**, where n is the number of elements and k is the number of digits in the largest element.

Ex. [170, 45, 75, 90, 802, 24, 2, 66]

Step 1. **Calculate number of passes**: The maximum number of digits in the elements is 3. So, we need to perform 3 passes.

Step 2. **Sort based on the least significant digit (1's place)**: [17****0**, 9**0**, 80**2**, 2**4**, 4**5**, 7**5**, 6**6**]

**Original Array**: [170, 45, 75, 90, 802, 24, 2, 66]

**Buckets** based on the 1's place:

| Bucket 0 | Bucket 1 | Bucket 2 | Bucket 3 | Bucket 4 | Bucket 5 | Bucket 6 | Bucket 7 | Bucket 8 | Bucket 9 |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| 17**0**, 9**0**  |          | 80**2**,**2**    |          | 2**4**       | 4**5**, 7**5**   | 6**6**       |          |          |          |

**Reassembled Array after 1st pass**:  
`[170, 90, 802, 2, 24, 45, 75, 66]`


Step 3: **Sort based on the 10's place**

**Array after 1st pass**: [170, 90, 802, 2, 24, 45, 75, 66]

**Buckets** based on the 10's place:

| Bucket 0 | Bucket 1 | Bucket 2 | Bucket 3 | Bucket 4 | Bucket 5 | Bucket 6 | Bucket 7 | Bucket 8 | Bucket 9 |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| 8**0**2, **0**2   |          | **2**4       |          | **4**5       |          | **6**6       | 1**7**0, **7**5  |          | **9**0       |

**Reassembled Array after 2nd pass**:  
`[802, 2, 24, 45, 66, 170, 75, 90]`


Step 4: **Sort based on the 100's place**

**Array after 2nd pass**: [802, 2, 24, 45, 66, 170, 75, 90]

**Buckets** based on the 100's place:

| Bucket 0 | Bucket 1 | Bucket 2 | Bucket 3 | Bucket 4 | Bucket 5 | Bucket 6 | Bucket 7 | Bucket 8 | Bucket 9 |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **0**02, **0**24, **0**45, **0**66, **0**75, **0**90 | **1**70      |          |          |          |          |          |          | **8**02      |          |

**Reassembled Array after 3rd pass**:  
`[2, 24, 45, 66, 75, 90, 170, 802]`


**Final Sorted Array**:  `[2, 24, 45, 66, 75, 90, 170, 802]`

The time complexity of Radix Sort is **O(nk)**, where n is the number of elements and k is the number of digits in the largest element. The space complexity is **O(n+k)**.

```cpp
vector<int> sortArray(vector<int>& nums) {
	vector<int> neg;
	vector<int> pos;
	for(int i=0;i<nums.size();i++){
		if(nums[i]<0) neg.push_back(-1*nums[i]);
		else pos.push_back(nums[i]);
	}
	radixSort(neg);
	for (auto& num : neg)
		num = -num;
	std::reverse(neg.begin(), neg.end());

	radixSort(pos);
	neg.insert(neg.end(), pos.begin(), pos.end());
	return neg;
  }

void radixSort(vector<int>& nums){
	int max=0;
	for(int i =0;i< nums.size();i++){
		int key = nums[i];
		int check = 1;
		while(key!=0){
			key = key/10;
			if(key!=0)
			check++;
		}
		if(check>max)
		max = check;
	}
		
	vector<queue<int>> buckets(10);
		
	for(int i =1;i<=max;i++){
		for(int j=0;j<nums.size();j++){
			int bucket = (nums[j] / (int)pow(10, i - 1)) % 10;
			buckets[bucket].push(nums[j]);
		}
		nums.clear();
			
		for (int k = 0; k < buckets.size(); k++) {
			while (!buckets[k].empty()) {
				nums.push_back(buckets[k].front());  // Add the front element of the queue
				buckets[k].pop();  // Remove the element from the queue
			}
    }   
  }
}
```

Usually, Radix Sort is used when the range of elements is known, and the number of elements is not very large. It is not used for general-purpose sorting because it has a time complexity of **O(nk)**, which can be very high for large datasets. Also, in case of negetive integers, we can't use Radix Sort directly. We have a workaround for that, where we sort the negetive integers separately, reverse them and then merge them with the positive integers. Similarily, for floating point numbers, we sort them based on the decimal places. We can muliply them with ao^(the highest number of decimal places), convert them to integers, and then sort them.

---

These sorting algorithms are mostly used in specific cases. Radix sort is mostly used in case of integers, and counting sort is used when the range of elements is known. For all other general-purpose sorting, we use Quick Sort, Merge Sort, or the built-in sort function in the language, which is usually built on top of these algorithms.

---

<!-- 
### Graph Algorithms

#### Breadth-First Search (BFS)

#### Depth-First Search (DFS)

#### Kruskal's Algorithm (for Minimum Spanning Tree)

#### Prim's Algorithm (for Minimum Spanning Tree)

#### Bellman-Ford Algorithm (for shortest path)

#### Floyd-Warshall Algorithm (for all-pairs shortest path)

#### Topological Sorting

### Tree Algorithms

#### Tree Traversal (Inorder, Preorder, Postorder)

#### Binary Search Tree (BST) operations (Insertion, Deletion, Searching) 

#### AVL Tree operations (Insertion, Deletion, Searching)

#### Red-Black Tree operations (Insertion, Deletion, Searching)

#### Segment Tree operations (Range queries)

### Dynamic Programming

#### Maximum Subarray Sum

#### Longest Common Subsequence (LCS)

#### Longest Increasing Subsequence (LIS)

#### Matrix Chain Multiplication

#### Edit Distance

#### Coin Change Problem

#### Rod Cutting Problem

#### Fibonacci Series

#### Knapsack Problem (0/1 Knapsack)

### Greedy Algorithms

#### Activity Selection

#### Fractional Knapsack

#### Dijkstra's Algorithm (for shortest path)

#### Huffman Coding

#### Kruskal's Algorithm (for Minimum Spanning Tree)

#### Prim's Algorithm (for Minimum Spanning Tree)

### Backtracking

#### N-Queens Problem

#### Sudoku Solver

### Miscellaneous

#### Divide and Conquer (Merge Sort, Quick Sort)

#### Bit Manipulation Algorithms

#### Union-Find (Disjoint Set Union)

### String Algorithms

#### String Matching (Naive Algorithm)

#### Boyer-Moore Algorithm

#### Z Algorithm (for pattern matching)

#### Suffix Array and Suffix Tree

#### KMP Algorithm

#### Rabin-Karp Algorithm (for substring search)
-->
## Next?

There is a lot of information in these pages, more than 70% of which you probably won't be needing in day-to day work. But, it's improtant to understand how the underlying stuff work, when for example you do `array.sort()` or `array.filter()`, you should know what's happening behind the scenes. This helps you handle edge cases and optimize your code. This would also let you build your own algorithms when required by a particular problem in your project.

The important data structures are marked with \b font-weight. The rest are just for your information. The best way to understand these is to code them. My primary advice remains the same; try building something cool, and these data structures and algorithms will come to your rescue when stuck!