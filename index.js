const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let posts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'Content for the second blog post goes here.' }
];

// Get all posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});




// Get a single post by ID
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.status(200).json(post);
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update an existing post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send('Post not found');
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.status(200).json(post);
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }
  posts.splice(postIndex, 1);
  res.status(204).send();
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Blog API running at http://localhost:${port}`);
});
