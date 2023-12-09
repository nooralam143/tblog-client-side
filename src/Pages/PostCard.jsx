import { Card } from 'flowbite-react';
import { serverURL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProvider';
import { useContext, useState } from 'react'; // Import useState
import Swal from 'sweetalert2'; // Import Swal or the library you're using for sweet alerts
import { Link, useNavigate } from 'react-router-dom';

const PostCard = (props) => {
const {data, titleCard} = props;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState(data); // Initialize blogPost with data

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
        fetch(`${serverURL}/post/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your Post has been deleted.',
                'success'
              )
              const remainingPosts = blogPosts.filter(post => post._id !== _id);
              setBlogPosts(remainingPosts);
            }
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error scenarios here
          });
      }
    });
  };

  const handleclick = (post) => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    const { email: userEmail } = user;

    const { _id:postID, author, authorEmail, postTitle, postImage, SortDescription, LongDescription, postCategory, PostTag, publishDate } = post;
    const myWishlist = {postID, userEmail, author, authorEmail, postTitle, postImage, SortDescription, LongDescription, postCategory, PostTag, publishDate };
    console.log(myWishlist);

    fetch(`${serverURL}/wishlist`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(myWishlist),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        // eslint-disable-next-line react/prop-types
        if (data.insertedId) {
          toast.success('post added in your wishlist', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  console.log(data);
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className="text-2xl font-bold">{titleCard}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {data.map(post => (
          <li key={post._id}>
            <Card className="max-w-3xl mx-auto my-2">
            <div>
              <img
                src={post?.postImage}
                alt={post?.postTitle}
                className="w-full h-64 md:h-450 lg:h-600 object-cover"
              />
            </div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.postTitle}
              </h5>
              <div>
                <h5 className="text-base text-blue-500 font-bold tracking-tight dark:text-white">
                  {post.postCategory}
                </h5>
              </div>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: post.SortDescription }}></div>
              </div>
              <div className='text-center'>
                <div>
                  <button className="w-full bg-pink-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleclick(post)}>
                    Wishlist</button>
                </div>
                <div>
                  <Link to={`/post/${post?._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button></Link>
                </div>
                {
                  user && user.email === post.authorEmail && (
                    <div>
                      <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleDelete(post._id)}>
                        Delete Post
                      </button>
                    </div>
                  )
                }
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>

  );
};
export default PostCard;