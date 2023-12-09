import { Carousel } from 'flowbite-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { serverURL } from '../config';

const Slidder = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/post`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
    config: {
      refetchInterval: 1000,
      cacheTime: 60000,
    },
  });

  if (isLoading) {
    return <Skeleton count={5} height={300} />;
  }

  if (isError) {
    return <p>Error fetching posts</p>;
  }

  const getRandomPosts = () => {
    if (data) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5); // Displaying 5 random posts
    }
    return [];
  };

  const randomPosts = getRandomPosts();

  const postImages = randomPosts.map((post) => (
    <img key={post._id} src={post.postImage} alt={post.postTitle} />
  ));

  const openPost = (postId) => {
    console.log(`Opening post with ID: ${postId}`);
    // Replace the console.log with your functionality to open a specific post
  };

  return (
    <div className="w-full">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>{postImages}</Carousel>
        <div>
          {randomPosts.length > 0 ? (
            randomPosts.map((post) => (
              <div key={post._id} onClick={() => openPost(post._id)}>
                {/* Add your post details or content here */}
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slidder;
