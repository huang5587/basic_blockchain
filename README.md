# Blockchain of Blogs

## Overview
In this project I used CosmosSDK to build a blockchain that allows for the transaction and monitoring of blog posts. Ontop of this I also built a blockchain indexer with a front end client to allow for users to query and view blogs that are stored on the chain. 
#### blog
The blog directory contains the blockchain itself. The blockchain was created with CosmosSDK and IgniteCLI to adhere to the Cosmos ecosystem conventions and practices. 
#### blogclient
blogclient is an API written in Golang. The API parses incoming HTTP requests into their appropriate blockchain functions. This API serves as a backend to the frontend interface.
#### blogclient/frontend
blogclient/frontend contains a reactJS frontend interface that allows the user to easily interface with the blockchain. A list of all posts is also displayed.

## Dependencies
IgniteCLI v0.25.1 and Golang are required to run the blockchain. IgniteCLI can be installed with the following commands. Other versions of IgniteCLI may cause compatability issues.

```
curl https://get.ignite.com/cli@v0.25.1 | bash

sudo mv ignite /usr/local/bin/

```
The frontend is deployed using Vite. This requires a NodeJS version of at least 18. 

## Usage
First, start the blockchain by navigating to inside of the blog directory and run:
```
ignite chain serve
```
Second, run the backend API by executing the following from the blogclient directory:
```
go run main.go
```
Third, run the frontend client by executing the following from ~/blogclient/frontend/blogFrontend/..
```
npm install
npm run dev 
```
Open the front-end client at http://localhost:5173/ and you can begin to interface with the blockchain.

## Motivations & Learnings

This project was undertaken to prepare myself for an internship position at a Cosmos ecosystem blockchain startup. In completing this project I gained familiarity with the unique mechanics and architecture of a Cosmos blockchain, and in blockchain development more generally. In particular, I found this extremely beneficial to gain fluency with Golang contexts and in Cosmos keepers. I found there are many unqiue Golang and Cosmos features that work in tandem to provide abstraction, security and modularity to a Cosmos blockchain. As these convetions are standardized across the Cosmos ecosystem, I found these specific areas to be immediately applicable in my subsequent work experience. 

Additionally, when creating the frontend client, I enjoyed the challenge of creating a reactive interface that automatically updated after new operations. Prior to this project I had limited exposure to Golang. Completing the blockchain and API gave me practical exposure in building and running multi module Golang apps, as well as general fluency in Golang syntax and best practices. 

