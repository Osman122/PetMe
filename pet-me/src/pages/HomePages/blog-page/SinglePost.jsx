import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../api/config';
import { useParams } from 'react-router-dom';
import Post from "../../../components/home/Post";
import PostContext from '../../../Context/PostContext'
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const [postsList, setPostsList] = useState([])
    const { id } = useParams();
    const { currentUser, synced } = useSelector((state) => state.currentUser);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/posts/${id}/`);
                setPost(response.data);
                console.log(response.data)
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
        <div className='container py-5' style={{maxWidth:"800px"}}>
            <PostContext.Provider value={{ postsList, setPostsList }}>
                {post.visible?<>
                    <Post post={post} single={true}/>
                </>:<>
                    <Alert variant="secondary" className='text-center'>
                        This post is hidden due to frequent reports. Contact Admin for resolution
                    </Alert>
                    {currentUser.id == post.user.user_id?<>
                        <Post post={post} single={true}/>
                    </>:<></>}
                </>}
                
            </PostContext.Provider>
        </div>
    );
};

export default SinglePost;
