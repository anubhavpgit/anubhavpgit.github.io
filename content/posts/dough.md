---
title: 'Dough - A Rich Presentation Tool'
date: "31-01-2024"
description: "A rich presentation tool built in Rust that uses markdown for content generation."
tag: "#tech"
showImg: true
---
Imagine a presentation tool that seamlessly blends simplicity with power. Welcome to Dough – your new favorite presentation companion. Say goodbye to clunky interfaces and hello to a tool that's as intuitive as it is efficient.

## Why Dough?

(Why, though? - *Get it? xD*)

At StackIt, the team gathers every Saturday for their weekly showcase. Each member presents their progress, showcasing the fruits of their week-long hike. Inspired by this collaborative spirit, I came to the idea of Dough - a presentation generator tool like no other. Built in Rust, [Dough](https://github.com/anubhavp-dev/dough) is a rich, modular, command-line tool to generate presentations. I found similar tools like [slidev](sli.dev) by [antfu](https://antfu.me/) and [presenterm](https://github.com/mfontanini/presenterm) that inspired me to create Dough.

## Features

- Dough's modular design allows for seamless **customization**. You can customize the color scheme, the alignment, and the syntax highlighting of the code blocks, and even the runtime of the code blocks.
- Align content both horizontally and vertically and also specify the **alignment** of individual text segments. You can decide between having a margined presentation or one without margin anywhere, in the bottom, left, or centre, of the screen.
- Code blocks have **syntax highlighting**, and also support code execution. You can run your code and the output will be displayed in the presentation. The code blocks run in a separate thread and the main thread displays the output in the terminal. The code blocks are internally ordered in the order they appear in the markdown file.
- Dough will also be supporting **images** in the terminal for the ones that have a GPU-enabled terminal like Kitty or iTerm2.
- You can choose to use templates. The optional `--template` flag is used to specify the template. The default template is used if not specified. If not, simply spawn a new folder and a markdown file, and you're good to go. Dough's intuitive navigation system lets you scroll through slides with ease. You can choose between scrolling top-down or bottom-up. Presentations start from `1` to the last slide. Dough supports arrow keys and VIM keybindings to navigate through slides. There are two modes of navigation:

1. **Highlight** a line as you scroll through the slides.
2. **Scroll** through the content of the slide.

- Dough supports **hot reloading**. You can edit your markdown file and do a `ctrl+r` to reflect in the presentation instantly. The auto hot reload is still in the works.

The default style settings are stored in a `style.yaml` file which looks like this: [style.yaml](https://github.com/anubhavp-dev/dough/blob/main/templates/default/style.yml)

## Unveiling the Core

Dough thrives on markdown, transforming simple text files into captivating slides. Leveraging the syntax of [pulldown-cmark](https://talk.commonmark.org/t/pulldown-cmark-commonmark-in-rust/1205), it effortlessly transforms your ideas into visual stories.

Projects are created by simply writing a markdown file inside a folder. The folder name is the name of the project. Just `mkdir my_folder` 
and `touch my_folder/1.md` and you're good to go. You can also use **templates** using the `new` command. The slides are presented using the `present` command. The optional `--template` flag is used to specify the template. The default template is used if not specified.

At the heart of dough lie two pivotal components:

- **Renderer**: This component takes charge of the visual rendering of slides.
- **Parser**: Responsible for dissecting markdown files and converting them into a structured format.

The **parser** parses the markdown file, prettifies it, and then passes it to the renderer to render it. The renderer then renders the slide in the `terminal` to display it.

The parser takes in the markdown text and converts it into `Nodes` of `mdast`(markdown abstract syntax tree). The tree is reccursively traversed and each node is then styled according to the `Node` ( Markdown Element ) type. After combining all the nodes, a `prettified` version of the text is returned. It then modifies the `prettified` content, applies custom alignment, styles, and spacing, and adds a margin to the content to fit the terminal.

There are two stages of **rendering**:

1. The renderer takes in the `prettified` content and renders it in the terminal.
2. The renderer then handles the navigation actions, the scrolling mechanism and the keybindings. It controls the flow of the presentation and is responsible for rendering the slides in the terminal. It switches between presentation and highlighting mode and also handles the code execution.

Here is the source code of dough - [Dough](https://github.com/anubhavp-dev/dough.git)

## Contributing

If you're eager to dive into the world of Rust and looking for a project to contribute to, Dough presents an exciting opportunity. Here's a breakdown of what's currently working and what areas could benefit from your expertise:

**What's working and what's not?**

- [ ]  Fix scrolling issue in highlight mode:
  - [ ]  *bug* Over Scroll in infinite scrolling
  - [ ]  *feat* Skip empty lines in highlight mode
- [ ]  *bug* custom aligner adds empty lines after text-block alignment
- [ ]  *feat.* Hot Module Reload
- [ ]  *feat.* Add support for the maximum width and height of the presentation. Write a word wrapper.
- [ ]  *feat.* Add comprehensive support for common Markdown elements.
- [ ]  *feat.* Enhance rendering for complex markdown elements like links within headings or lists.
  - [ ]  lists.
  - [ ]  blockquotes.
  - [ ]  tables.

Feel free to explore these areas, open new issues, or submit pull requests to contribute to Dough's evolution. Your insights and contributions are highly valued as we strive to make Dough the go-to presentation tool for Rust enthusiasts everywhere.

Let your presentations shine like never before :)

<figure style="justify-content: center; align-items: center; display: flex;flex-direction: column;">
<video controls style='height: 100%; width: 100%; object-fit: contain;'>
<source src='https://anubhavp.dev/assets/img/dough/simple-presentation.mp4' 
type='video/mp4'>
  Your browser does not support the video tag.
</video>
</figure>
