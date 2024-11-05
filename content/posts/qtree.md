---
title: 'QTree - Images in Quadtrees '
date: "14-02-2023"
description: "Inspired by KoalasToTheMax, QTree is a short live demonstration of image compression and decompression using Quadtrees that partition a two-dimensional image by recursively subdividing it into four quadrants."
tag: "#tech"
---

<script type="module" src="/assets/js/qtree/index.js" ></script>
<script type="module" src="/assets/js/qtree/qdtree.js" ></script>

I stumbled upon [KoalasToTheMax](https://koalastothemax.com/) while reading a blog post about the most exciting web pages built for fun, and I was blown away. [Srijan](https://injuly.in/) explained how it works, and we were inspired to create something similar.

But first, let's get into the basics of the data structures used in our project.

- [Quadtree](#quadtree)
  - [Member Functions](#member-functions)
  - [Node](#node)
- [Demonstration](#demonstration)
- [Setting up the Canvas](#setting-up-the-canvas)
  - [Image Data Compression](#image-data-compression)
  - [Bounding Box](#bounding-box)
  - [Image Data to Quadtree](#image-data-to-quadtree)

## Quadtree

A quadtree is a tree-based data structure where each node has exactly four child nodes. Our quadtree represents a partition of space in two dimensions by dividing the region into four equal quadrants. Each quadrant is then subdivided into four equal quadrants, and so on. Each node in the tree has exactly four children or no children at all, which makes it a leaf node. The height of a quadtree depends on the amount of data being decomposed.

![quadtree](https://upload.wikimedia.org/wikipedia/commons/a/a0/Quad_tree_bitmap.svg)

The root node is the image. Each node is the average value of its children's pixel values. The tree is recursively subdivided until each leaf node is a single pixel. The tree is then traversed to compress the image. To decompress the image, the tree is traversed again.


### Member Functions

Our quadtree has the following member functions:
- **compressImageData** : It takes the image data and the compression factor as the input and returns the quadtree.
- **createQTreeOfHeight** : It takes the height of the tree and the bounding box as the input and returns the quadtree.
- **populate** : It populates the quadtree with the pixel values. 
- **getRGBValuesFromCoordinates** : It takes the quadtree and the coordinates as the input and returns the pixel value at the given coordinates.


### Node

The QTNODE class represents a node in the quadtree. It has the following properties:
- **x** : x-coordinate 
- **y** : y-coordinate 
- **w** : width of the bounding box.
- **h** : height of the bounding box.
- **children** : array of four children.
- **rgb** : pixel value of the node.

Functions:

- **draw** : draws the node. Takes the canvas context as the input and returns nothing.
- **insert**: inserts a node into the quadtree. Takes the quadtree and the node as the input and returns the quadtree.
- **drawAtHeight**: draws the nodes at a given height. Takes the canvas context, the height of the tree, and the current height as the input and returns nothing.
- **draw**: draws the nodes. Takes the canvas context and the height of the tree as the input and returns nothing.
- **reveal**: reveals the nodes. Takes the canvas context and the height of the tree as the input and returns nothing.
- **computeAverageColor**: computes the average color of the node. Takes the quadtree and the image data as the input and returns the pixel value.

## Demonstration

<div class="container" style="text-align: center;">
	<canvas id="canvas-2"  style="border: 1px solid black;"	>
	</canvas>
	<br>
	
Hover over any part of the canvas to recursively divide it into four quadrants.
</div>


<div class="container" style="text-align: center;">
	<canvas id="canvas-1" style="border: 1px solid black;"> </canvas>
	<br>
	<input type="range" id="slider" min="0" max="100" value="0">
	<br>

The slider controls the depth of the tree.
</div>

 The slider is set to 0 by default, which means the entire image is compressed into a single pixel. The slider when set to 100 means the image is not compressed at all. The slider can be set to any value between 0 and 100.

## Setting up the Canvas

To start with, we need two canvases - one for you to hover over and the other for you to control the depth of the tree using a slider and render the nodes evenly. Initially, we had multiple ways of taking an image as the input form, such as uploading an image, using query parameters, etc. But for this demonstration, we'll keep it simple and use a static image.

Here's some JavaScript code that will load the image into a canvas:


```js
const image = new Image();
img.src = "/blog/assets/images/qtree/cryptopunk.jpeg";
img.onload = () => {
    initSliderCanvas(img);
    initMouseCanvas(img);
};
```

I'll go ahead and explain the working of the mouse hover canvas and you can explore the slider canvas. The code is available on [GitHub](https://github.com/cbrtl/qd-compression), and you can play around with it later if you are interested. 


```js
import { compressImageData } from "./qdtree.js";
function initMouseCanvas(img){
	const canvas = document.getElementById("canvas-2");
    const ctx = canvas.getContext("2d");

    const imageData = readImageDataUsingCanvas(canvas, ctx, image);
    const qTree = compressImageData(imageData, 1);
    qTree.draw(ctx);
	...
}
```

### Image Data Compression

Now, let's get to the fun part - compressing images. We import the `compressImageData` function from the qdtree.js file. This function takes the image data and the compression factor as the input and returns the quadtree. The **height of the tree** is calculated by taking the log of the number of pixels in the image and dividing it by the log of 4 (number of children of a node). The log of 4 is 2, and the log of the number of pixels is the height of the tree. The height of the tree is then rounded down to the nearest integer. The tree is then created using the `createQTreeOfHeight` function that takes the height of the tree and the **bounding box** as the input and returns the quadtree.

**qdtree.js**
```js
export function compressImageData(imageData, factor) {
  const { width, height } = imageData;
  const newWidth = Math.ceil(width / factor);
  const newHeight = Math.ceil(height / factor);

  const qTreeHeight = Math.floor(Math.log(newWidth * newHeight) / Math.log(4));

  const qTree = createQTreeOfHeight(qTreeHeight, {
    x: 0,
    y: 0,
    w: width,
    h: height,
  });

  populate(qTree, imageData);
  return qTree;
}
```
The `createQTreeOfHeight` function takes in the height of the tree and the bounding box as the input and returns the quadtree. 

#### Bounding Box

The bounding box is the area that the node represents. The bounding box is initially the entire image. The bounding box is then divided into four equal quadrants, and the process is repeated until the height of the tree is 0. The `populate` function takes the quadtree and the image data as the input and populates the tree with the average pixel values of the children's pixel values.

```js
 function createQTreeOfHeight(height, aabb) {
  function recursiveCreate(node, height) {
    if (height === 0) return;

    const { x, y, w, h } = node.aabb;
    const halfW = w / 2;
    const halfH = h / 2;


	//top left
    node.tl = new QTNode({
      x,
      y,
      w: halfW,
      h: halfH,
    });
		//top right
    node.tr = new QTNode({
      x: x + halfW,
      y,
      w: halfW,
      h: halfH,
    });
		//bottom left
    node.bl = new QTNode({
      x,
      y: y + halfH,
      w: halfW,
      h: halfH,
    });
		//bottom right
    node.br = new QTNode({
      x: x + halfW,
      y: y + halfH,
      w: halfW,
      h: halfH,
    });

    recursiveCreate(node.tl, height - 1);
    recursiveCreate(node.tr, height - 1);
    recursiveCreate(node.bl, height - 1);
    recursiveCreate(node.br, height - 1);
  }
 }
```

### Image data to Quadtree

Alright, let's talk about the `reveal` function, which is like a magician revealing the hidden nodes under the mouse. And then there's the `draw` function, which is like an artist sketching the nodes on the canvas. The `update` function is like your mom constantly cleaning up after you every 30 milliseconds. It clears the canvas and redraws the nodes on the canvas, all to make sure it looks neat and tidy.

```js
function initMouseCanvas(img){
	...
 const mousePos = { x: 0, y: 0 };
    let lastUpdateTime = -Infinity;
    const frameTime = 30;

    function update() {
        const currentTime = Date.now();
        const diff = currentTime - lastUpdateTime;
        if (diff < frameTime) return;

        lastUpdateTime = currentTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        qTree.reveal(mousePos.x, mousePos.y);
        qTree.draw(ctx);
    }

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePos.x = x;
        mousePos.y = y;
        update();
    });
}
```

## Conclusion

So, what's the point of all this? Well, we can use a quadtree to compress and decompress images when the mouse hovers over a specific area of the canvas. It's like a secret code that unlocks a hidden image!

If you want to explore more, check out the slider and the entire source code on [GitHub](http://github.com/cbrtl/qd-compression). And don't hesitate to ask us any questions or give suggestions. We're always happy to chat on GitHub!

*Ref: [Wikipedia](https://en.wikipedia.org/wiki/Quadtree)*
