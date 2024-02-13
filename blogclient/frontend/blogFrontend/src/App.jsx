/**
 * App.jsx
 *  This file contains the code for a reactJS frontend client.
 *  Allows a user to send CRUD operations to the API contained in bloglient/main.go
 *  Changes in data should update reactively. 
 */
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  //declare states
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [updateTitle, setUpdateTitle] = useState(''); 
  const [updateBody, setUpdateBody] = useState(''); 
  const [id, setPostId] = useState(''); 
  const [deleteId, setDeleteId] = useState(''); 
  const [posts, setPosts] = useState([]); 

  //fetch posts on mounting
  useEffect(() => {
    fetchPosts();
  }, [title, body, deleteId, updateTitle, updateBody, id]);

  //fetchPosts() gets the latest list of posts from the blockchain
  // it is called after every operation so the frontend reactively displays changes as and when they happen.
  const fetchPosts = () => {
    fetch('http://127.0.0.1:8080/posts/list')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received from API:', data.Post); 
        setPosts(data.Post)
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };


  //declare handler functions for each operation. They are executed when their respective buttons are pressed by user. 
  const handleCreatePost = () => {
    fetch('http://127.0.0.1:8080/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${title}&body=${body}`,
    })
      .then((response) => {
        if (response.ok) {
          //clear input fields after updating and refetch posts.
          setTitle('');
          setBody('');
          fetchPosts();
        } else {
          console.error('Error creating post:', response.statusText);
        }
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  const handleDeletePost = () => {
    fetch(`http://127.0.0.1:8080/posts/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${deleteId}`,
    })
      .then((response) => {
        if (response.ok) {
          //clear input fields after updating and refetch posts.
          setDeleteId(''); 
          fetchPosts();
        } else {
          console.error('Error deleting post:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  const handleUpdatePost = () => {
    fetch(`http://127.0.0.1:8080/posts/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: `id=${id}&title=${updateTitle}&body=${updateBody}`,
    })
      .then((response) => {
        if (response.ok) {
          //clear input fields after updating and refetch posts.
          setUpdateTitle('');
          setUpdateBody('');
          setPostId(''); 
          fetchPosts();
        } else {
          console.error('Error updating post:', response.statusText);
        }
      })
      .catch((error) => console.error('Error updating post:', error));
  };

  return (
    <div className="App">
      <h1>Blockchain of Blog Posts</h1>
      <div className="container">
         {posts && posts.length > 0 && (  // Check if posts is not null and not empty. If unchecked, website will crash when no posts exist.
          <div className="actions-container">
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '10pt' }}>Post no.{post.id}</p>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="posts-container">
        <h2>Create New Post</h2>
          <div>
            <label>Title:</label>
            <br></br>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Body:</label>
            <br></br>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button onClick={handleCreatePost}>Create Post</button>
          </div>

          <h2>Update Post</h2>
          <div>
            <label>Post Number:</label>
            <br></br>
            <input
              type="text"
              value={id}
              onChange={(e) => setPostId(e.target.value)}
            />
          </div>
          <div>
            <label>New Title:</label>
            <br></br>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </div>
          <div>
            <label>New Body:</label>
            <br></br>
            <textarea
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button onClick={handleUpdatePost}>Update Post</button>
          </div>

          <h2>Delete Post</h2>
          <div>
            <label>Delete Post Number:</label>
            <br></br>
            <input
              type="text"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleDeletePost}>Delete Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
