import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { serverURL } from '../config';
import { AuthContext } from '../providers/AuthProvider';
import CommentComponent from './CommentComponent';
import SidebarComponent from './SidebarComponent';



const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [blogPost, setblogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = user.email;

 

  useEffect(() => {
    // Fetch product data based on the id from the URL
    fetch(`${serverURL}/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setblogPost(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="flex">
    <div className="hidden md:block lg:block">
    <SidebarComponent></SidebarComponent>
    </div>
    <div className="container mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : blogPost ? (
        <div className="">
  <div className="bg-white flex-row md:flex-row rounded-lg shadow-md overflow-hidden">
<div className='px-5 py-5'>
<h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{blogPost.postTitle}</h2>
        <p className="text-gray-700"><span className="font-bold">Category: </span>{blogPost.postCategory}</p>
        <p className="text-gray-700"><span className="font-bold">Author: </span>{blogPost.author}</p>
        <p></p>
       { blogPost.authorEmail == userEmail &&(
    <div>
<Link to={{
  pathname: `/update/${blogPost?._id}`,
  state: { blogPost: blogPost }
}}>
  <button className="w-28 bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Update</button>
</Link>
    </div>
  )}
</div>
   <div className="flex justify-center items-center">
   <img
      src={blogPost.postImage}
      alt={blogPost.postTitle}
      className="w-full px-5 h-96 sm:h-96  md:h-96 lg:h-96  object-cover"
     
    />
   </div>
 
    <div className="flex flex-row flex-shrink flex-grow h-full p-4">
      <div>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: blogPost?.SortDescription }}></div>
      </div>
    </div>
  </div>
  <div className="mt-5 md:mt-10 lg:mt-10 px-5">
  <span className="font-bold text-lg md:text-xl lg:text-2xl">Description: </span><hr></hr><br></br>
  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: blogPost.LongDescription }}></div>
  </div>
  <CommentComponent AuthorEmail={blogPost.authorEmail} postID={blogPost._id}></CommentComponent>

</div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
    </div>
  );
};

export default BlogDetails;