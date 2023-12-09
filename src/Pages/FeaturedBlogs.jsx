import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { serverURL } from '../config';
import SidebarComponent from './SidebarComponent';

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${serverURL}/post`); // Replace 'your-api-url' with your actual API endpoint
        const fetchedBlogs = response.data;

        // Sort the blogs based on the word count of the long description
        const sortedBlogs = fetchedBlogs.sort((a, b) => {
          return b.LongDescription.split(' ').length - a.LongDescription.split(' ').length;
        });

        // Set the top 10 posts
        setBlogs(sortedBlogs.slice(0, 10));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const columns = [
    { name: 'Serial Number', selector: (row, index) => index + 1 },
    { name: 'Blog Title', selector: 'postTitle' },
    { name: 'Blog Owner', selector: 'author' },
    {
      name: 'Blog Owner Profile Picture',
      cell: (row) => <img src={row.postImage} alt="Profile" style={{ width: '50px' }} />,
    },
  ];

  return (
    <div className="flex">
    <div className="hidden md:block lg:block">
    <SidebarComponent></SidebarComponent>
    </div>
    <div className='flex-grow  items-center justify-center'>
      <h1 className='font-bold'>Featured Blogs</h1>
      <DataTable
        title="Top 10 Posts"
        columns={columns}
        data={blogs}
        pagination // Enable pagination if needed
      />
    </div>
    </div>
  );
};

export default FeaturedBlogs;
