import PostCard from './PostCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { serverURL } from '../config';

const RecentPost = () => {
  const fetchRecentPosts = async () => {
    const response = await axios.get(`${serverURL}/post`);
    return response.data;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: fetchRecentPosts,
    config: {
      refetchInterval: 1000, 
      cacheTime: 6000,
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Skeleton count={6} height={150} />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Data is loaded
  if (data && data.length > 0) {
    const sortedPosts = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const latestSixPosts = sortedPosts.slice(0, 6);

    return (
      <div className='container mx-auto'>
        <PostCard titleCard="Latest Posts: " data={latestSixPosts} />
      </div>
    );
  }

  return <div>No recent posts available</div>;
};

export default RecentPost;
