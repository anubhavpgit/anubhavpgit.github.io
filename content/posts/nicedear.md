---
title: 'Generating avatars with Nicedear'
date: "01-04-2024"
description: "A random avatar generator for your website or app: an obvious dicebear spoof :P "
draft: false
tag: "#tech"
---

Nicedear is a dynamic open-source avatar generator that crafts unique avatars based on user input. Whether you're crafting a personal brand, spicing up your social media, or adding flair to your website, Nicedear has you covered with its mesmerizing array of features and customization options.

<div style="display: flex; justify-content: center; align-items: center;">

  ![Nicedear: how](https://anubhavp.dev/assets/img/nicedear/how.svg)
</div>

Source: [Nicedear](https://api.nicedear.vip/?seed=how), seed: "how"

## Unveiling the Magic

Behind the scenes, Nicedear uses Node and TypeScript to generate the avatar. Here's the [source](https://github.com/fuzzymf/nicedear), and here's how it works:

1. With Nicedear, every avatar starts with a seed – a tiny spark that ignites a world of creativity. Whether you provide your own or let Nicedear conjure one for you, each seed undergoes a simple hashing function, converting it into a numerical value. This hash serves as the foundation for subsequent choices in the avatar's features.
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

2. Nicedear then uses the hash to select choices for each feature in the avatar. From captivating heads to charming facial hair, each aspect of your avatar is carefully curated to reflect your style and personality.

```ts
 return features.map((feature) => {
  const index = hash % feature.choices.length;
  return feature.choices[index];
 });
```

The **Feature Array** is an array of Feature objects that contain the choices for each feature. `Head`, `Face`, `Facial-hair` are examples of features. Nicedear uses the hash to select a choice from each feature. A **feature image** (*a face*) is a choice from a set of choices(*a folder containing all the faces*) is selected based on the modulo of the hash and the number of choices in the feature.

Assuming Input = "`fuzzymf`", the hash generated using the hash function [⏎](#hashfunction) is `497870557`. The hash is then divided by the number of faces present in the folder, say `25`, to get the modulo, which is **7**. The **7th face** is then selected from the folder containing all the `25` faces.

Similarly, the hash is used to select choices for other features, such as `Facial-hair` and `Head`.

Here's an example of a feature object, `a suspicious face`, from the theme `open-peeps`, when the input is `fuzzymf`:

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">

  ![A Suspicious Face](https://anubhavp.dev/assets/img/nicedear/Suspicious.svg)
</div>

3. Nicedear then applies transformations to the selected choices, such as scaling, rotating, and mirroring, to create a unique avatar that captures your essence.

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

Nicedear's transformative powers come to life. The selected choices are then layered over and composited together to form the avatar, and a png is created. The png (image) is then transformed and converted to `SVG`. Your tailored avatar is ready to be shared with the world.

## The Transformations

Nicedear offers a plethora of transformation features to tailor the avatar according to specific preferences:

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

## Usage

Whether through command-line interface or API requests, Nicedear offers seamless integration for avatar generation, whether you're a tech-savvy developer enthusiast or a casual user looking to spice up your online presence.

```bash
node dist/index.js foo open-peeps true 45 red skinColor hairColor 1.0 10.0 20.0 face,facial-hair,head
```

And, an API request might look like this:

```bash
GET http://localhost:3000/?seed=<seed>&theme=<theme>&mirror=<mirror>&rotate=<rotate>&background=<background>&skincolor=<skincolor>&hairColor=<hairColor>&scale=<scale>&transalteX=<transalteX>&transalteY=<transalteY>&features=face,facialHair,head
```

Or, a simple API request might look like this:
  
```bash
api.nicedear.vip/?seed=asimpleone
```

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">

![Nicedear: simple](https://anubhavp.dev/assets/img/nicedear/takli.svg)
</div>

And, a complex one might look like this:

```bash
api.nicedear.vip/?seed=extreme&theme=open-peeps&mirror=true&rotate=325&scale=0.6&transalteX=10.0&transalteY=20.0&features=face,facialHair,head
```

<div style="display: flex; justify-content: center; align-items: center; height: 250px; width: 250px;">

![Nicedear: extreme](https://anubhavp.dev/assets/img/nicedear/extreme.svg)
</div>

Or, just visit [https://api.nicedear.vip](https://api.nicedear.vip) for a random avatar.



## What's Next?

But wait, the adventure doesn't end here! We're thrilled to announce that Nicedear is just getting started. In the coming days, brace yourselves for a tidal wave of new features – from multiple avatars to a kaleidoscope of themes, the future of avatar generation has never looked brighter.

Dive into the world of Nicedear today and let your imagination run wild. Your perfect avatar awaits, and the possibilities are endless!
