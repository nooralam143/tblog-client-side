import { useContext, useState } from "react";
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { serverURL } from "../config";
import {  useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";


const UpdateBlog = () => {
    const { user } = useContext(AuthContext);
    const userEmail =user.email;
const navigate = useNavigate();

    const {
        _id,
        authorEmail,
        postTitle,
        postImage,
        LongDescription,
        PostTag,
        SortDescription,
        postCategory,
    } = useLoaderData();

console.log("id is",typeof(_id))
    const [longDescription, setLongDescription] = useState(LongDescription);
    const [shortDescription, setShortDescription] = useState(SortDescription);
    const [tags, setTags] = useState(PostTag ? PostTag.join(', ') : '');
    const [selectedCategory, setSelectedCategory] = useState(postCategory);

    const handleLongDescriptionChange = (value) => {
        setLongDescription(value);
    };

    const handleShortDescriptionChange = (value) => {
        setShortDescription(value);
    };

    const handleTagChange = (e) => {
        setTags(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const postCategories = [
        "Technology",
        "Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Programming",
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Cybersecurity",
        "Blockchain",
        "Cloud Computing",
        "Internet of Things (IoT)",
        "Virtual Reality",
        "Augmented Reality",
        "Gaming",
        "Health-Tech",
        "Fintech",
        "E-commerce",
        "Social Media",
        "Digital Marketing",
        "Robotics",
        "Space Exploration",
        "Gadgets",
        "Software Engineering",
        "Computer Hardware",
        "Cryptocurrency",
        "AI Ethics",
        "Biotechnology",
        "Environmental Tech",
        "Tech Industry News",
        "Startup Stories"
      ];
      if (authorEmail !== userEmail) {
        return navigate(location?.state || '/');
    }
      const handalUpdateBlog = async (e) => {
        e.preventDefault();
        const form = e.target;
        const postTitle = form.postTitle.value;
        const postImage = form.postImage.value;
        const postCategory = selectedCategory;
        const PostTag = tags.split(',').map(tag => tag.trim());
        const SortDescription = shortDescription;
        const LongDescription = longDescription;

        const blogPostUpdate = {
            postTitle,
            postImage,
            postCategory,
            PostTag,
            SortDescription,
            LongDescription,
        };

        try {
            const response = await axios.put(`${serverURL}/post/${_id}`, blogPostUpdate, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Blog post updated successfully');
                navigate(`/post/${_id}`);
            } else {
                toast.error('Error updating blog post');
            }
        } catch (error) {
            toast.error('Error updating blog post');
            console.error('There was a problem updating the blog post:', error);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto mt-10 mb-10">
            <form className="flex flex-col gap-4" onSubmit={handalUpdateBlog}>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="title" value="Post Title" />
                    </div>
                    <TextInput id="postTitle" name="postTitle" type="text" defaultValue={postTitle} placeholder="Add Title" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="image" value="image URL" />
                    </div>
                    <TextInput id="postImage" name="postImage" type="text" defaultValue={postImage} placeholder="Image URL" required />
                </div>
                <div>
            <div className="mb-2 block">
                <Label className="text-lg" htmlFor="postCategory"  value="Category" />
                <select
                    id="postCategory"
                    name="postCategory"
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedCategory}
                    defaultValue={postCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="" disabled>Select a category</option>
                    {postCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
        <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="tags" value="Tags (separate by commas)" />
                    </div>
                    <TextInput id="tags" name="tags" type="text" value={tags} defaultValue={PostTag} onChange={handleTagChange} placeholder="Ex. Tag1, Tag2" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg" htmlFor="shortdescription" value="Short Description" />
                    </div>
                    <div className='bg-gray-100 border-none outline-none'>
                        <ReactQuill value={shortDescription} onChange={handleShortDescriptionChange} defaultValue={SortDescription} style={{ height: "200px", width: "100%", }} />
                    </div>
                </div>

                <div>
                    <div className="mb-2 block">
                        <div className=" ">
                            <Label className="text-lg " htmlFor="LongDescription" value="Long Description:" />
                        </div>

                    </div>
                    <div>
                        <div className='bg-gray-100'>
                            <ReactQuill value={longDescription} onChange={handleLongDescriptionChange} defaultValue={LongDescription} style={{height: '400px', width: '100%' }} />
                        </div>
                    </div>
                </div>


                <Button type="submit">Update Post</Button>
            </form>
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
        </Card>

    );
};

export default UpdateBlog;