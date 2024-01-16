import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [updateTitle, setUpdateTitle] = useState(''); 
  const [updateBody, setUpdateBody] = useState(''); 
  const [id, setPostId] = useState(''); 

  const [deleteId, setDeleteId] = useState(''); 

  const [posts, setPosts] = useState([]); 

  const fetchPosts = useEffect(() => {
      fetch('http://127.0.0.1:8080/posts/list')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received from API:', data.Post); 
        setPosts(data.Post)
      })
      //.then((data) => setPosts(data.title))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [title, body, deleteId, updateTitle, updateBody, id]);

  const validateInputs = () => {

    /**
     * 1. createPost, updatePost needs body, id, title
     * 2. cannot deletePost if ID doesnt exist. 
     * 3. IDs can only be numbers?
     * 4. Max length for title and body. 
     */
    // Validate title, body, id, etc.
    if (!title || !body) {
      console.error('Title and body are required.');
      return false;
    }
  }
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
    // POST request to delete a post
    fetch(`http://127.0.0.1:8080/posts/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${deleteId}`,
    })
      .then((response) => {
        if (response.ok) {
          setDeleteId(''); // Clear the delete ID input
          fetchPosts();
        } else {
          console.error('Error deleting post:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  const handleUpdatePost = () => {
    // POST request to update a post
    fetch(`http://127.0.0.1:8080/posts/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: `id=${id}&title=${updateTitle}&body=${updateBody}`, // Include ID in the request
    })
      .then((response) => {
        if (response.ok) {
          setUpdateTitle('');
          setUpdateBody('');
          setPostId(''); // Clear the ID input
          fetchPosts();
        } else {
          console.error('Error updating post:', response.statusText);
        }
      })
      .catch((error) => console.error('Error updating post:', error));
  };

  return (
    <div className="App">
      <h1>A Blockchain of Blog Posts</h1>
      <div className="container">

         {/* Actions Container */}
         <div className="actions-container">
          <h2>All Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <p>Title: {post.title}</p>
                <p>Body: {post.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="posts-container">
        <h2>Create a New Post</h2>
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
            <label>ID:</label>
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
            <label>Delete ID:</label>
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
