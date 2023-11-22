import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../api/config';
import { useParams } from 'react-router-dom';
import Post from "../../../components/home/Post";

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Post post={post} />
            {/* Add more details of the post here */}
        </div>
    );
};

export default SinglePost;
