---
title: 'Resoc, a gift to my alma mater'
date: "17-03-2023"
description: "RESOC; short for Resources + Community, is the coolest academic notes-sharing platform around, built by a bunch of tech-savvy students at Silicon Institute, and it's totally free. The metrics below show the traffic :P"
tag: "#tech"
index: true

---
<style>
 .resoc {
 justify-content: center;
 align-items: center;
 display: flex;
 flex-direction: column;
 }
 </style>
RESOC lets you share notes, question papers, and other academic resources with your friends and classmates. It's a free and open-source platform, built by a bunch of tech-savvy students at Silicon Institute, Bhubaneswar.

## How it all started

The idea came to me in the first year of my undergrad, when I found myself scouring the internet for notes, and calling up friends in the middle of the night. I have a terrible habit of studying just before the exam, and at the end of the day, I always find myself having nothing to read from. This led me to build a Google Drive collection that became an instant hit among my peers. Everybody wanted the link! I didn't bother to put much effort into it, and it was just a bunch of collection of notes that I had collected over the years. I built a static html page and hosted it in GitHub pages.

### The open-source codebase

This aims at being a starting point for your journey in contributing to RESOC. This article attempts at explaining the working of this project. Resoc is built using the React and Firebase, majorly. The codebase is open-source and can be found [here](httpsL//github.com/fuzzymfx/resoc).

Frontend tools in use:

- React
- Bootstrap
- Undraw + Storyset for illustrations

The backend is built using:

- Firebase
- Cloud Firestore
- Firebase Storage for storing files uploaded by users for contributions
- Google Drive for storing and fetching notes

Other libraries and tools used:

- React Router
- React Bootstrap
- React Firebase Hooks
- Context APIs to manange authentication state

### Features

The primary features of RESOC is sharing Notes, Question Papers, and other academic resources. Other than this, users can have a personal *Kanan board* to manage their tasks. The *community chat page* is a place where users can interact with each other. Resoc also includes community contributions, where users can contribute to the platform. The platform also includes a team page, where the team members are listed, and there are specific community guidelines that need to be followed.

### Deep Dive into the codebase

The major components and routes are:

/team  
/notes  
/previewnotes  
/community-guidelines  
/update-profile  
/community  
/taskboard  
/login  
/profile  
/signup  
/forgot-password  
/contributions  

### Getting Started

The best way to get started would be to clone the repository and try running and exploring all seciton of the web app to become familiar with the codebase. The codebase is open-source and can be found [here](https://github.com/fuzzymfx/resoc). The codebase is a Nodejs project, so you would need to have Nodejs installed on your system. You can install the dependencies by running `npm install` in the root directory. You can run the project by running `npm start`.

The React codebase is in the `src` folder. The `components` folder contains all the components used in the project. The `context` folder contains the context APIs used in the project. The root folder contains the firebase configuration.

The control starts with the `index.js` file that renders the App component. It contains the routes and the context providers. The `App` component is the home page. `contexts/authContext.js` contains the context API for authentication. Components are lazy loaded using React Lazy, and the routes are protected using the `PrivateRoute` component.


### Notes

The notes are rendered from a metadata file: `data.json`, that looks like this:
```
[
  {
    "year": true,
    "id": 0,
    "name": "1st Year",
    "shortName": "",
    "description": "",
    "links": [],
    "contributors": [],
    "tags": []
  },
  {
    "id": 1,
    "name": "Engineering Maths I",
    "shortName": "Maths I",
    "description": "",
    "links": [
      [
        "Notes",
        "https://drive.google.com/file/d/1WP4f6yaKsc7D9lAe5iMceKQBJC1pHBwA/view?usp=sharing"
      ],
      [
        "Notes- End Sem",
        "https://drive.google.com/file/d/1SJoTOviij3hJ-_kqmtQkWXCPiZXTUxZo/view?usp=sharing"
      ],
      [
        "Important Questions",
        "/under-construction"
      ],
      [
        "Previous Year Papers",
        "https://drive.google.com/file/d/1oXeD2zeLtA-9V4WH9UQiKE3mKZtRjrLf/view?usp=share_link"
      ]
    ],
    "contributors": [
      [
        "Anubhab",
        "https://anubhavp.dev/"
      ],
      [
        "Smruti",
        "https://linkedin.com/in/smruti-dash-1210/"
      ]
    ],
    "tags": [
      "Maths",
      "Engineering Maths",
      "Maths I",
      "Maths 1"
    ]
  },
	......
```

There are two types of elements in the list. One that specifies the header: the year, and the other is the actual notes. The `notes` component renderes a list of links using this data. Each link is a button that opens the a new `preview_notes` component. The reason behind using a json file is to make it easier for the maintainers to add notes, and to enable a search feature using the tags. THis isn't a traditional search feature, but a filter feature that filters the notes based on the tags. It was a simple solution, so I didn't bother to put much effort and used a simple filter function.

### Community Chat

A real-time chat application that leverages Firebase Firestore's real-time capabilities to listen for updates to the chat messages. Firebase Firestore uses WebSockets under the hood to provide real-time data synchronization, but this is abstracted away in the code. The chat is straightforward and doesn't have any fancy features. The messages are stored in Cloud Firestore.

### Task Board

A simple Kanban board that allows users to manage their tasks. The tasks are stored in Cloud Firestore.

### Community Contributions

A page where users can contribute to the platform. The contributions are stored in Firebase Storage.

### Authentication( Login/ Signup )

Here's why there was **a need for authentication**:  

There are various actions that would need to distinguish individual users. From uploading notes to maintaing personal task list and communicating with the community, authentication is a must. RESOC uses Google OAuth for authentication.

Other significant components include:

- **Hosting**: Resoc is hosted in Firebase Hosting.
- **Database**: The notes are in Google Drive, and Cloud Firestore is used for authentication and storing user data, tasks, and chat messages. Firebase storage is used to store files uploaded by users.
- **Authentication**: Google OAuth and email/password is used for authentication using Firebase Authentication.

The deployment and CI/CD pipeline is managed using GitHub Actions. A github action is responsible for deploying the codebase to Firebase Hosting.

Other pages are self-explanatory and can be explored by running the project.

## Next?

There are a ton of features and fixes we are looking to add, and we would love to have you on board!

A couple of bugs that we are looking to fix are:

- The community chat loading page is too slow; we want to store the chats in cache before lazy loading them to make the page load faster.
- The contributions page has an expired email link that we use to notify the maintainers. We want to fix this and make it more user-friendly.
- The router fails when a page needs authentication and the user is not logged in. When the user logs in, he should be redirected to the page he was trying to access, not the profile page.

### Metrics

<figure class="resoc">
<img alt="analytics" src ="https://anubhavp.dev/assets/img/resoc/resoc-traffic.jpeg" class="h-75 w-75">
<figcaption>
RESOC Traffic during exam time!
</figcaption>

</figure>
