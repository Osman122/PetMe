import Post from "../../../components/home/Post";
import { axiosInstance } from '../../../api/config';
import { useState, useEffect } from "react";
import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator'
import CreateBlog from '../../../components/Blog/CreateBlog'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const Blog = () => {
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const [ postsList , setPostsList ] = useState([])
    const [ page , setPage ] = useState(1)
    const [ maxpages, setmaxpages ] = useState(1)

    const getPostsList = () => {
        axiosInstance.get(`/posts/?page=${page}`)
        .then((res) => {
            setPostsList(res.data.results)
            setmaxpages(res.data.total_pages)
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
        getPostsList()
    },[page])

    return ( 
        // {postsList.map((post) => {
        //     return (
        //         <div key={post.id}>
        //             <h3>{post.title}</h3>
        //             <p>{post.excerpt}</p>
        //             <Link to={`/post/${post.id}`}>Read more</Link>
        //         </div>
        //     );
        // })}


        <section style={{backgroundColor:'#eee'}}>
            <div class="container posts py-5">
                <div className="d-flex justify-content-center mb-3">
                <CreateBlog user={currentUser}/>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-10 col-xl-8">
                        {/* {postsList.map((post) => {
                                return(
                                    <Post post={post} />
                                    // <Link to={`/post/${post.id}`}>Read more</Link>
                                
                                ); 
                        })} */}
                        {postsList.map((post) => {
                            return (
                                <div key={post.id}>
                                    
                                        <Post post={post} />
                                    
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
            
            { maxpages > 1 ? <div className="paginator">
                <PageContext.Provider  value={{page,setPage}}>
                    <Paginator maxpages={maxpages}/>
                </PageContext.Provider>
            </div> : <></> }
        </section>

    );
}
 
export default Blog;