import { useState, useEffect } from 'react';
import axios from 'axios';
import { serverURL } from '../config';
import { Link } from 'react-router-dom';



const PopularPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const truncateText = (text, count) => {
    const words = text.split(' ');
    if (words.length > count) {
      return words.slice(0, count).join(' ') + '...';
    }
    return text;
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${serverURL}/post`);
        const fetchedPosts = response.data;

        // Select three random posts
        const randomPosts = [];
        while (randomPosts.length < 3) {
          const post = fetchedPosts[Math.floor(Math.random() * fetchedPosts.length)];
          if (!randomPosts.find((p) => p._id === post._id)) {
            randomPosts.push(post);
          }
        }

        setPosts(randomPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post._id} className="border p-4">
          <img
            src={post.postImage}
            alt={post.postTitle}
            className="w-full h-56 object-cover mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{post.postTitle}</h3>
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: truncateText(post.SortDescription, 20) }}></div>
          <div>
            <Link to={`/post/${post?._id}`}>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">View Post</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularPosts;
