
import {useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { serverURL } from "../config";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; 
import Skeleton from 'react-loading-skeleton';
import SidebarComponent from "./SidebarComponent";


const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [blogPost, setblogPost] = useState([]);
  
  const fetchWishlistPosts = async () => {
    try {
      const response = await axios.get(`${serverURL}/wishlist/user?userEmail=${user.email}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlistPosts,
    config: {
      refetchInterval: 1000,
      cacheTime: 60000,
    },
  });

  useEffect(() => {
    if (data) {
      setblogPost(data);
    }
  }, [data]);

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


  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverURL}/wishlist/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your wishlist post has been deleted.',
                'success'
              )
              const remaining = blogPost.filter(post => post._id !== _id);
              setblogPost(remaining);
            }
          })
      }
    })
  }

  return (
    <div className="flex">
    <div className="hidden md:block lg:block">
    <SidebarComponent></SidebarComponent>
    </div>
    <div className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
  {isLoading ? (
    <div className="text-center">
      <span className="loading loading-spinner text-center loading-xs"></span>
    </div>
  ) : blogPost.length === 0 ? (
    <p className="text-center font-extrabold text-3xl flex justify-center items-center h-full">
      Your Wishlist is empty.
    </p>
  ) : (
    <div className="flex flex-col  gap-4">
      {blogPost.map((post) => (
        <div key={post?._id} className="post-card border ">
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="post-image-container">
              <img
                src={post?.postImage}
                alt={post?.postTitle}
                className="w-full h-64 md:h-450 lg:h-600 object-cover"
              />
            </div>
            <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
              <div>
                <h2 className="text-sm md:text-xl lg:text-2xl font-semibold mb-2">
                  {post?.postTitle}
                </h2>
                <p className="font-bold text-blue-700">{post?.postCategory}</p>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.SortDescription }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <Link to={`/post/${post?.postID}`}>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mx-2 mt-2">
                    Details
                  </button>
                </Link>
              </div>
              <div>
                <button
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md mx-2 mt-2"
                  onClick={() => handleDelete(post?._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>

  );
};
export default Wishlist;