---
title: 'Generating avatars with Nicedear'
date: "01-04-2024"
description: "A random avatar generator for websites or apps; a dicebear spoof."
draft: false
tag: "#tech"
---

Nicedear is a dynamic open-source avatar generator that crafts unique avatars based on user input. It offers a wide range of customization options, allowing users to create avatars that reflect their personality and style.

<div style="display: flex; justify-content: center; align-items: center;">

  ![Nicedear: how](https://anubhavp.dev/assets/img/nicedear/how.svg)
</div>

Source: [Nicedear](https://api.nicedear.vip/?seed=how), seed: "how"

## The Magic

Nicedear uses a simple hash function to convert a seed string into a numerical value, which is then used to select features for the avatar. The process involves choosing from a set of predefined features, such as heads, faces, and facial hair, and applying transformations like scaling, rotating, and mirroring to create a unique avatar. Here's the [source](https://github.com/fuzzymf/nicedear), and here's how it works:

1.Every avatar starts with a seed. The seed can be anything from a user name to a random word. It uses a simple hash function to convert the seed into a numerical value. This hash is then used to select features for the avatar. The hash function is designed to produce a consistent output for the same input, which ensures that the same seed will always generate the same avatar.

	
<a name="hashfunction"></a>

  ```ts
  const hashString = (s: string): number => {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    const chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
  };
  ```

2. Nicedear then uses the hash to select choices for each feature in the avatar. The **Feature Array** is an array of Feature objects that contain the choices for each feature. `Head`, `Face`, `Facial-hair` are examples of features. The has is used to select a choice from each feature. A **feature image** (*a face*) is a choice from a set of choices(*a folder containing all the faces*) is selected based on the modulo of the hash and the number of choices in the feature.

```ts
 return features.map((feature) => {
  const index = hash % feature.choices.length;
  return feature.choices[index];
 });
```

Assuming Input = "`fuzzymf`", the hash generated using the hash function [⏎](#hashfunction) is `497870557`. The hash is then divided by the number of faces present in the folder, say `25`, to get the modulo, which is **7**. The **7th face** is then selected from the folder containing all the `25` faces.

Similarly, the hash is used to select choices for other features, such as `Facial-hair` and `Head`.

Here's an example of a feature object, `a suspicious face`, from the theme `open-peeps`, when the input is `fuzzymf`:

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">

  ![A Suspicious Face](https://anubhavp.dev/assets/img/nicedear/Suspicious.svg)
</div>

3. Based on the API request or CLI input, transformations are applied to the avatar. These transformations include scaling, rotating, and mirroring the avatar. The transformations are applied based on the parameters provided by the user. For example, if the user wants to scale the avatar by `1.5`, Nicedear will apply a scaling transformation to the avatar.

```ts
 const layers: OverlayOptions[] = await Promise.all(imagePaths.map(async (imgPath, i) => {
  const feature = features[i];
  const layer: OverlayOptions = { input: imgPath };
  if (feature.top) layer.top = feature.top;
  if (feature.left) layer.left = feature.left;
  return layer;
 }));

 const transparentBackground: SharpOptions = {
  create: {
   width: 1000,
   height: 1000,
   channels: 4,
   background: { r: 255, g: 255, b: 255, alpha: 0 }
  },
 };
  await Sharp(transparentBackground).composite(layers).png().toFile(`_output/${seed}${pathHash}.png`);
  return await applyTransformations(`_output/${seed}${pathHash}.png`, params);
```

The final response is a PNG image of the avatar, which can be used in websites or applications. 

## The Transformations

There are several transformations that can be applied to the avatar, such as scaling, rotating, and mirroring. These transformations are applied based on the parameters provided by the user. The following transformations are available now:

### Parameters

- **seed**: string  
Input for the random generator, ensuring reproducibility.
- **theme**: string  
Defines the visual theme of the avatar, with options including open-peeps, female, male, and more.
- **mirror**: boolean  
When set true, flips the image horizontally when set to true.
- **rotate**: number  
Rotates the image by a specified degree. Defaults to 0.
- **background**: string  
The hex code of the background color. Defaults to #ffffff.
- **skinColor**: string (*pending*)  
The hex code of the avatar's skin color. Defaults to #ffffff.
- **hairColor**: string (*pending*)  
The hex code of the avatar's hair color. Defaults to #000000.
- **scale**: number  
Adjusts the size of the avatar. Defaults to 1.0.
- **transalteX**: number  
Fine-tunes the x-coordinate of the avatar. Defaults to 0.
- **transalteY**: number  
Fine-tunes the y-coordinate of the avatar. Defaults to 0.
- **features**: string[]  
Specifies which features to include in the avatar, such as face, facial-hair, and head.

## Usage Examples

### Simple API Call

For basic avatar generation, just provide a seed:

```
https://api.nicedear.vip/?seed=johndoe
```

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">
  <img src="https://anubhavp.dev/assets/img/nicedear/takli.svg" alt="Simple avatar example" />
</div>

### Advanced Customization

For complex avatars with multiple transformations:

```
https://api.nicedear.vip/?seed=extreme&theme=open-peeps&mirror=true&rotate=325&scale=0.6&translateX=10.0&translateY=20.0&features=face,facialHair,head
```

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">
  <img src="https://anubhavp.dev/assets/img/nicedear/extreme.svg" alt="Advanced customized avatar" />
</div>

### CLI Usage

For local development or batch processing:

```bash
node dist/index.js [seed] [theme] [mirror] [rotate] [background] [skinColor] [hairColor] [scale] [translateX] [translateY] [features]
```

Example:
```bash
node dist/index.js "myuser" "open-peeps" true 45 "#ff0000" "#fdbcb4" "#000000" 1.2 5.0 -3.0 "face,facialHair,head"
```

## Integration Examples

```javascript
// Generate avatar URL
const avatarUrl = `https://api.nicedear.vip/?seed=${username}&theme=open-peeps`;

// Use in img tag
<img src={avatarUrl} alt={`${username}'s avatar`} />
```

```javascript
const commentAvatar = `https://api.nicedear.vip/?seed=${userEmail}&scale=0.8`;
```

```javascript
const defaultAvatar = `https://api.nicedear.vip/?seed=${userId}&theme=open-peeps&background=%23f0f0f0`;
```

Nicedear provides a robust, customizable solution that scales with your needs. Its deterministic approach ensures users always see the same avatar for the same seed, creating a sense of identity and consistency that users appreciate.