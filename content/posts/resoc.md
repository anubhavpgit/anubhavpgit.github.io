---
title: 'Resoc, a gift to my alma mater'
date: "17-03-2023"
description: "RESOC; short for Resources + Community, is the ABD of notes - the coolest academic notes-sharing platform around, built by a bunch of tech-savvy students at Silicon Institute, and it's totally free!"
tag: "#tech"
showImg: true

---
<style>
 .resoc {
 justify-content: center;
 align-items: center;
 display: flex;
 flex-direction: column;
 }
 </style>

RESOC, a free and open-source platform that primarily lets you share notes, question papers, and other academic resources with your friends and classmates.

## How it all started

The idea came to me in the first year of my undergrad, when I found myself scouring the internet for notes, and calling up friends in the middle of the night. I have a terrible habit of studying just before the exam( and I am sure, you do too ), and at the end of the day, I always find myself having nothing to read from. This led me to build a Google Drive collection that became an instant hit among my peers. Everybody wanted the link! I didn't bother to put much effort into it, and it was just a bunch of notes that I had collected over the years. Later, I built a static html page and hosted it on GitHub pages.

Cut to the end of 2022, in my final year, I decided to join together bits and pieces from other projects to build RESOC. Resoc is a community-driven platform that lets you share notes, question papers, and other academic resources with friends and classmates. It also helps you stay organized with a personal task board, and a community chat page to interact with other users. The platform is built using React and Firebase and is hosted in Firebase Hosting. The notes are stored in Google Drive, and the user data is stored in Cloud Firestore. The platform is open-source and can be found [here](https://github.com/fuzzymf/resoc).

### The open-source codebase

Going forward, I would want to make the platform more user-friendly and add more features. It has bugs and lacks a lot of implementations for the features we have added. Since it is primarily made for my alma mater, I would want a silicon student to pick this up, fix the issues, and maintain it. To get started, here's a brief overview of the codebase:

- **Frontend**:
	- React
	- React Router
	- Bootstrap
	- Undraw + Storyset for illustrations
	- React - Firebase for Firebase integration
	- Context API for state management
- **Backend**:
	- Firebase
	- Google Drive for storing and fetching notes
	- Firebase Authentication for user **authentication**: Google OAuth and email/password are used for authentication using Firebase Authentication.

- **Database**:  
	The notes are in Google Drive, and Cloud Firestore is used for authentication and storing user data, tasks, and chat messages. Firebase storage is used to store files uploaded by users and contributions. 

- **Hosting**:
	- Firebase **Hosting** for hosting the platform. 
	- A GitHub action is used to **deploy** the codebase to Firebase Hosting.


### Features

The primary features of RESOC are sharing Notes, Question Papers, and other academic resources. Other than this, users can have a personal *Kanan board* to manage their tasks. The *community chat page* is a place where users can interact with each other. Resoc also includes community contributions, where users can contribute to the platform. The platform also includes a team page, where the team members are listed, and there are specific community guidelines that need to be followed.

### Deep Dive into the codebase

The major components and routes are:

- /team  - The team page
- /notes  - Collection of notes arranged by year and branch. The structure is terribly simple. The IDs are hardcoded and the notes are stored in a JSON file.
- /previewnotes - The page that renders the notes. The notes are stored in a JSON file and the links are hardcoded.
- /community-guidelines - The community guidelines page, lists a couple of rules on public contributions of notes, and the chat.
- /community - The community chat page is built using Firebase Firestore. The chat is real-time and uses WebSockets under the hood.
- /taskboard - The task board page has the bare minimum features. 
- /login - The login page, uses Google OAuth for authentication; the user needs to login to access the chat and task board.
- /signup - Basic signup page
- /forgot-password - Basic forgot password page
- /contributions - The contributions page, where users can contribute to the platform. The contributions are stored in Firebase Storage.

### Getting Started

The best way to get started would be to clone the repository and try running and exploring all sections of the web app to become familiar with the codebase. The codebase is open-source and can be found [here](https://github.com/fuzzymf/resoc). The codebase is a Nodejs project, so you would need to have Nodejs installed on your system. You can install the dependencies by running `npm install` in the root directory. You can run the project by running `npm start`.

The React codebase is in the `src` folder. The `components` folder contains all the components used in the project. The `context` folder contains the context APIs used in the project. The root folder contains the Firebase configuration.

The control starts with the `index.js` file that renders the App component. It contains the routes and the context providers. The `App` component is the home page. `contexts/authContext.js` contains the context API for authentication. Components are lazy-loaded using React Lazy, and the routes are protected using the `PrivateRoute` component.

Each page is a separate file in the `components` folder. The `utils` folder contains the utility functions used in the project.

#### Notes

The notes are rendered from a metadata file: `data.JSON`, that contains two types of elements in the list. One specifies the header: the **year** or the **branch**, and the other is the actual notes. The `notes` component renders a list of links using this data. Each link is a button that opens the new `preview_notes` component. The reason behind using a JSON file is to make it easier for the maintainers to add notes, and to enable a search feature using the tags. This isn't a traditional search feature, but a filter feature that filters the notes based on the tags. It was a simple solution, so I didn't bother to put much effort and used a simple filter function.

#### Community Chat

The community chat is built using Firebase Firestore. The chat is real-time and uses WebSockets under the hood. The chat is stored in the `chats` collection in Firestore. It  includes a button to load more messages and sign out. The ChatRoom component, memoized for performance, fetches and displays messages from Firestore, and allows users to send new messages. The ChatMessage component, also memoized, formats and displays individual messages, including handling URLs within the message text. 

#### Task Board

The task management interface integrates with Firebase Firestore to store and manage tasks. The tasks are fetched from Firestore and displayed in a list, with options to mark tasks as done or delete them. It includes form elements for adding new tasks and buttons for marking tasks as done or deleting them.

#### Contributions

Contributions, allows users to upload files to a Firebase storage and submit their contributions. It includes form elements for displaying the user's name and email and input for file selection. It handles file uploads, displays upload progress and shows success or error messages based on the upload status. It also provides a download link for the uploaded file and instructions for further actions. It uses Firebase for authentication, Firestore for storing metadata, and Firebase Storage for file uploads.

#### Authentication( Login/ Signup )

Here's why there was **a need for authentication**:  

There are various actions that would need to distinguish individual users. From uploading notes to maintaining personal task list and communicating with the community, authentication is a must. RESOC uses Google OAuth for authentication. The login/ signup page handles basic authentication using Firebase Authentication. The email verification is deliberately not implemented. We don't users to feel violated by the platform. The signup page is a simple form that takes the user's email and password and creates a new user account using Firebase Authentication. The login page is a simple form that takes the user's email and password, and signs in the user using Firebase Authentication. The forgot password page is a simple form that takes the user's email and sends a password reset email using Firebase Authentication.

Other features include a team page, community guidelines, and a login page. The team page lists the team members and their roles and includes links to their profiles. The community guidelines page lists a couple of rules on public contributions of notes and the chat. The login page uses Google OAuth for authentication; user needs to login to access the chat and task board.

## Next?

There are a ton of features and fixes we are looking to implement in the platform. A couple of bugs that we are looking to fix are:

- The structure of the notes page is terrible. We want to refactor the notes page to make it more readable and uniform. It needs to handle dynamic updates to the notes like adding a subject in the middle of the list. Right now, the IDs are serialized and hardcoded.
- The community chat loading page is too slow; we want to store the chats in cache before lazy loading them to make the page load faster.
- The contributions page needs to have a github service trigger that would automatically create a pull request to the repository with the new contributions. It also needs to be able to handle new subject additions.
- The router fails when a page needs authentication and the user is not logged in. When the user logs in, he should be redirected to the page he was trying to access, not the default profile page.

### Metrics

<figure class="resoc">
<img alt="analytics" src ="https://anubhavp.dev/assets/img/resoc/resoc-traffic.jpeg" class="h-100 w-100" />
<figcaption>
RESOC Traffic during exam time!
</figcaption>


<figure class="resoc">
<img alt="analytics" src ="../assets/img/resoc/24traffic.png" class="h-100 w-100" />
<figcaption>
RESOC Traffic in 2024!
</figcaption>




</figure>