# Basic Blockchain

## Overview
In this project I used CosmosSDK to build a blockchain that allows for the transaction and monitoring of blog posts. Ontop of this I also built a blockchain indexer with a front end client to allow for users to query and view blogs that are stored on the chain. 
#### blog
blog contains the blockchain itself. The blockchain leverages CosmosSDK and Ignite CLI extensively to conduct the manipulation of blog posts and the maintenance of transactions across nodes in the blockchain. 
#### blogclient
blogclient written in golang, is the backend API for the blockchain. It recieves CRUD requests from the frontend and executes the command upon the blockchain accordingly.
#### blogclient/frontend
blogclient/frontend contains a react frontend interface to allow the user to more easily manipulate the blockchain. A list of all posts is also displayed.

## Dependencies
IgniteCLI v0.25.1 and Golang are required to run the blockchain. IgniteCLI can be installed with the following commands.

```
curl https://get.ignite.com/cli@v0.25.1 | bash

sudo mv ignite /usr/local/bin/

```
The frontend is made with react and deployed using vite. 
#### blogclient
Requires golang. Backend API can be run by executing the following from the blogclient directory:
```
go run main.go
```
### frontend
The frontend is made with react and deployed using Vite. This requires a NodeJS version of 18 or higher.

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



