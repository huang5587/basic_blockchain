# Switcheo Backend Internship - Problem 5 - CRUD Interface for Blockchain resource - Jun Han Huang

## Overview
This directory contains a full-stack CRUD implementation for blog posts. 
### blog
blog contains the blockchain itself. The blockchain leverages CosmosSDK and Ignite CLI extensively to conduct the manipulation of blog posts and the maintenance of transactions across nodes in the blockchain. 
### blogclient
blogclient written in golang, is the backend API for the blockchain. It recieves CRUD requests from the frontend and executes the command upon the blockchain accordingly.
### blogclient/frontend
blogclient/frontend contains a react frontend interface to allow the user to more easily manipulate the blockchain. A list of all posts is also displayed.

## How to Run

### blog
Requires IgniteCLI to and Golang to be installed

Blockchain can be run by executing the following while in the blog directory.
```
ignite chain serve
```
### blogclient
Requires golang. Backend API can be run by executing the following from the blogclient directory:
```
go run main.go
```
### frontend
The frontend is made with react and deployed using vite. I believe this requires NodeJS. More detailed information can be found here:

https://react.dev/learn/start-a-new-react-project

The front end is hosted by running the following from switcheo_JunHan/problem5/blogclient/frontend/blogFrontend directory:
```
npm install
npm run dev 
```

## Challenges
This was my first time ever using golang and I enjoyed the challenge of learning a new language. In particular finishing this project was very instructive for the concept of contexts in golang.

## Future Improvements
Some immediate improvements that can be made for each area given more time. 
### blog
I'd like to explore the creation and manipulation of multiple resources upon the same blockchain.
### blogclient
It would be meaningful to expand the code to enable use from multiple accounts (as opposed to just Alice).
### frontend
I would like to make the list of posts reactive meaning that changes made to any posts are reflected in real-time on the interface. 

I would also like to implemenet client + serverside validation to ensure smooth operations.



