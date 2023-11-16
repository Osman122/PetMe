import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/config";
import Dashboard from "../../../components/Admin/Dashboard";

const AdminPanel = () => {
    const [ users , setUsers ] = useState(0)
    const [ reports , setReports ] = useState(0)
    const [ posts , setPosts ] = useState(0)
    const [ pets , setPets ] = useState(0)


    const getUsers = () => {
        axiosInstance.get('/accounts/users/list/')
        .then((res) => {
            console.log(res.data.count)
            setUsers(res.data.count)
        })
        .catch((err) => console.log(err));
    }

    const getReports = () => {
        axiosInstance.get(`/admin/social/report/`)
        .then((res) => {
            console.log(res.data.count)
            setReports(res.data.count)
        })
        .catch((err) => console.log(err));
    }

    const getPosts = () => {
        axiosInstance.get(`/posts/`)
        .then((res) => {
            console.log(res.data.count)
            setPosts(res.data.count)
        })
        .catch((err) => console.log(err));
    }

    const getPets = () => {
        axiosInstance.get(`/pets/`)
        .then((res) => {
            console.log(res.data.count)
            setPets(res.data.count)
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
        getUsers();
        getReports();
        getPosts();
        getPets();
    },[])


    return ( 
        <Dashboard users={users} reports={reports} pets={pets} posts={posts}/>
     );
}
 
export default AdminPanel;