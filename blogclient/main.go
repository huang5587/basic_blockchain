/*
blogclient/main.go
	This file contains the code for a REST API that interfaces with the blockchain.
	A route is defined for each operation (create, delete, update, and list all blogs)
	When a route recieves a HTTP request, it calls its corresponding handler function which will
	create and send a transaction to the blockchain for execution.

	A user can send requests to this API by using the frontend client contained in blogclient/frontend.

	If there are no existing posts in the chain, the welcome posts will be created.
*/

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	// Importing the general-purpose Cosmos blockchain client
	"github.com/ignite/cli/ignite/pkg/cosmosaccount"
	"github.com/ignite/cli/ignite/pkg/cosmosclient"

	// Importing the types package from blockchain
	"blog/x/blog/types"
)

var (
	accountName = "alice"
)

/*Create Post */
func createPostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix("cosmos"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Get account from the keyring
	account, err := client.Account(accountName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	title := r.FormValue("title")
	body := r.FormValue("body")

	err = createPost(ctx, client, account, title, body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Post created successfully")
}

func createPost(ctx context.Context, client cosmosclient.Client, account cosmosaccount.Account, title string, body string) error {
	addr, err := account.Address("cosmos")
	if err != nil {
		log.Fatal(err)
	}

	msg := &types.MsgCreatePost{
		Creator: addr,
		Title:   title,
		Body:    body,
	}
	_, err = client.BroadcastTx(ctx, account, msg)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

/*Update Post*/
func updatePostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix("cosmos"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Get account from the keyring
	account, err := client.Account(accountName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	title := r.FormValue("title")
	body := r.FormValue("body")
	strId := r.FormValue("id")

	intId, err := strconv.ParseUint(strId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid uint64 value", http.StatusBadRequest)
		return
	}

	err = updatePost(ctx, client, account, title, body, intId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Post updated successfully")
}

func updatePost(ctx context.Context, client cosmosclient.Client,
	account cosmosaccount.Account, title string, body string, id uint64) error {

	addr, err := account.Address("cosmos")
	if err != nil {
		log.Fatal(err)
	}

	msg := &types.MsgUpdatePost{
		Creator: addr,
		Id:      id,
		Title:   title,
		Body:    body,
	}

	_, err = client.BroadcastTx(ctx, account, msg)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

/*Delete Post*/
func deletePostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	// Create a Cosmos client instance
	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix("cosmos"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	account, err := client.Account(accountName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	strId := r.FormValue("id")
	intId, err := strconv.ParseUint(strId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid uint64 value", http.StatusBadRequest)
		return
	}

	err = deletePost(ctx, client, account, intId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Post deleted successfully")
}

func deletePost(ctx context.Context, client cosmosclient.Client, account cosmosaccount.Account, id uint64) error {
	addr, err := account.Address("cosmos")
	if err != nil {
		log.Fatal(err)
	}

	msg := &types.MsgDeletePost{
		Creator: addr,
		Id:      id,
	}

	_, err = client.BroadcastTx(ctx, account, msg)
	if err != nil {
		log.Fatal("Post doesnt exist", err)
		return err
	}
	return nil
}

/*List Posts*/
func listPostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Create a Cosmos client instance
	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix("cosmos"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Call listPost() to retrieve the posts
	queryResp, err := listPost(ctx, client)
	if err != nil {
		log.Fatal("Posts doesnt exist", err)
		return
	}
	// Serialize the response to JSON and send it in the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(queryResp)
}

func listPost(ctx context.Context, client cosmosclient.Client) (*types.QueryAllPostResponse, error) {
	queryClient := types.NewQueryClient(client.Context())
	// Query the blockchain using the client's `PostAll` method
	// to get all posts store all posts in queryResp
	queryResp, err := queryClient.PostAll(ctx, &types.QueryAllPostRequest{})
	if err != nil {
		return nil, err
	}
	return queryResp, nil
}

// initalizePosts() populates the blockchain with a welcome message post. It is called when there are no existing posts in the blockchain.
func initializePosts(ctx context.Context, client cosmosclient.Client, account cosmosaccount.Account) {
	defaultPosts := []struct {
		Title string
		Body  string
	}{
		{"Welcome to Blockchain of Blogs!", "This website serves as an interface to create, update and delete blog posts upon the blockchain."},
		{"Usage", "Each field connects to a dedicated route on the backend API. Pressing its button will send the input data to the API, which will execute the desired operation upon the blockchain."},
		{"Motivations", "This project was completed to gain experience and familiarity with the unique architecture and mechanics of Cosmos ecosystem blockchains. In doing so I was able to better prepare myself for an upcoming internship at a Cosmos blockchain startup."},
		{"Please go to my github repositry for further information:", "https://github.com/huang5587/basic_blockchain"},
		//add additional default posts here if desired.
	}

	//create default posts on blockchain.
	for _, post := range defaultPosts {
		err := createPost(ctx, client, account, post.Title, post.Body)
		if err != nil {
			log.Printf("Error creating post: %v", err)
		}
	}
}

func main() {
	r := mux.NewRouter()

	// Define API route for CRUD functions
	r.HandleFunc("/posts/list", listPostHandler)
	r.HandleFunc("/posts/create", createPostHandler)
	r.HandleFunc("/posts/update", updatePostHandler)
	r.HandleFunc("/posts/delete", deletePostHandler)

	// Create a Cosmos client instance
	client, err := cosmosclient.New(context.Background(), cosmosclient.WithAddressPrefix("cosmos"))
	if err != nil {
		log.Fatalf("Error creating Cosmos client: %v", err)
	}
	// Get account from the keyring
	account, err := client.Account(accountName)
	if err != nil {
		log.Fatalf("Error getting account: %v", err)
	}

	//if there are no exisiting posts then initialize posts before serving API.
	allPosts, _ := listPost(context.Background(), client)
	if allPosts.Post == nil {
		fmt.Println("No existing posts on chain: creating default posts ...")
		initializePosts(context.Background(), client, account)
	}

	//Host API on localhost:8080
	fmt.Println("Blockchain API is listening on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(r)))
}
