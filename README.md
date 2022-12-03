# Caffeine

This is my submission for Project Exam 2 in the Noroff Frontend-development program. This project is a social media platform built with the [Noroff API](https://noroff-api-docs.netlify.app/).

Visit the site live on Netlify: https://caffeine-havardsollie.netlify.app/

## Description

Caffeine is a real life social media platform, but in this project the frontend is completely new. A new user may register a profile, log in and read the feed of posts, posted by fellow users. The users are students and teachers at Noroff. A user is able to create, edit and delete a post. Personalize their profile page and visit other users profile page. The users may interact with each other in form of following each other and react and comment to each others posts.

## Resources

### Technologies

- React (18.2.0)
- React-Icons (4.6.0)
- React-Router-Dom (6.4.2)
- Bootstrap (5.1.3)
- Axios (1.1.3)
- Yup (0.32.11)
- Google Fonts

### Design

Adobe XD

### Planning and hosting

- Trello (planning)
- Netlify (hosting)

## Installation and setup

Clone or download this repository. Node and npm is essential to run the installation.
Use `npm install` to install.
Use `npm start` to run the project locally.

## Register user

Register a new account:
Username: must not use any punctuation marks except underscore.
Email: must be a @stud.noroff.no / @noroff.no address.
Password: must be at least 8 characters.

### Planning

To ensure workflow over the past seven weeks I have used a kanban board to identify tasks and order them in terms of development. A task moves from different slots depending on the status of the task. It starts in the "Open" slot, then moves to "In progress", and finally "Finished". It it very similar to Issues and Boards in GitLab.

A Gantt chart has been used for the overall time plan of the project. Week 1 for researching and inspiration, week 2,3 for design developemt, week 4,5,6 for coding and week 7 for testing and wrapping.

### Design

The requirements for this project is recognisable across the major real life social media platforms out there. Design inspiration had to be taken from Facebook, Reddit and Twitter. Especially the latter in terms of post design and linking profiles. Color choices is something entirely new to stick out from the other competitors. The real Caffeine is also something completely else, therefore I have not taken much inspiration there.


I think the UI is user friendly and up to the standards one would expect to see in a social platform today. The usage of icons is reserved for recognisable functions, like the plus sign and user account. For less obvious functions, written buttons are used. 

The overall concept of coffee drinking is the base of the colors. The background is in a darker tone to symbolize the actual color of the drink as well as feeling warm on the inside after taking a sip. The colors are supposed to stand out and display a clear tone of warmth and friendliness. The color green is associated with hope, renewal and maybe even peace, all feelings one would feel over a cup of coffee.

### Code

Connecting to an API for the first time is always an exciting process. Will it work? Of course it will. Once I got a positive response I started to plot the pages together according to the user stories and technical requirements, trying to seperate it as much as possible. I do not want too much code in a single component. In the process I stumbled upon a few hick-ups, as expected, but did not experience too much stress about ut. I had a clear plan of what to do, how to do it and the excecution of the logic. I found it a great expereience to work with contexts and hooks, playing with the "auth" state and using it around the components.

Once the technical requirements were there the styling followed with a lot of small adjustments to make it look OK across various screen sizes and ensure universal design. I got some friends to test the site and adjusted it with the feedback. I think the error messages could have been better developed, especially regarding the changing and posting of images. This was a tricky part.

Overall, I think the project was challenging, but mostly just a lot of fun. A great way to wrap up these past two years of Frontend-development.