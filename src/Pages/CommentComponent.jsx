import { useState, useContext, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from "../config";
import axios from "axios";

const CommentComponent = ({postID, AuthorEmail}) => {
  console.log("post id is",postID, AuthorEmail);
  const { user } = useContext(AuthContext);
  const commentOwner = user.displayName;
  const commentOwnerPhoto = user.photoURL;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${serverURL}/comment`);
      setComments(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handalAddComment = async (e) => {
    e.preventDefault();
    if (AuthorEmail === user.email) {
      // Show an error message when the AuthorEmail is the same as the user's email
      toast.error('Can not Comment on Own blog');
      return;
    }
    const form = e.target;
    const comment = form.comment.value;
    const userComment = { postID, commentOwner, commentOwnerPhoto, comment };

    try {
      const response = await axios.post(`${serverURL}/comment`, userComment, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Add comment successfully');
        form.reset();
        fetchData();
      } else {
        toast.error('Error adding comment');
      }
    } catch (error) {
      toast.error('Error adding comment');
      console.error('There was a problem adding the comment:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const filteredComments = comments.filter(comment => comment.postID === postID);

  return (
    <Card className="max-w-7xl mx-auto mt-10 mb-10">
      <form className="flex flex-col gap-4" onSubmit={handalAddComment}>
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="4"
          name="comment"
          placeholder="Write your comment here..."
        ></textarea>
        <Button type="submit">Submit Comment</Button>
      </form>

      {filteredComments.length > 0 ? (
        <div className="mt-4">
          {filteredComments.map((comment, index) => (
            <div key={index} className="flex bg-gray-100 items-center space-x-4 mb-2">
              <img src={comment.commentOwnerPhoto} alt="User" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold">{comment.commentOwner}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No comments yet</div>
      )}

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
    </Card>
  );
};

export default CommentComponent;
