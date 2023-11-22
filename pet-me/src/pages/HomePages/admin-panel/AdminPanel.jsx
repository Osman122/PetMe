import "./AdminPanel.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/config";
import Dashboard from "../../../components/Admin/Dashboard";
import "bootstrap-icons/font/bootstrap-icons.css";


const AdminPanel = () => {
  const [users, setUsers] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [reports, setReports] = useState(0);
  const [reportsList, setReportsList] = useState([]);
  const [posts, setPosts] = useState(0);
  const [pets, setPets] = useState(0);

  const getUsers = () => {
    axiosInstance
      .get("/accounts/users/list/")
      .then((res) => {
        // console.log(res.data.count)
        setUsers(res.data.count);
        setUsersList(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  const getReports = () => {
    axiosInstance
      .get(`/posts/reports/`)
      .then((res) => {
        // console.log(res.data)
        setReports(res.data.count);
        setReportsList(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  const getPosts = () => {
    axiosInstance
      .get(`/posts/`)
      .then((res) => {
        // console.log(res.data.count)
        setPosts(res.data.count);
      })
      .catch((err) => console.log(err));
  };

  const getPets = () => {
    axiosInstance
      .get(`/pets/`)
      .then((res) => {
        // console.log(res.data.count)
        setPets(res.data.count);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
    getReports();
    getPosts();
    getPets();
  }, []);

  return (
    <div className="bg-dark container">
        <Dashboard users={users} usersList={usersList} reports={reports} reportsList={reportsList} pets={pets} posts={posts} /> 
    </div>
  );
};

export default AdminPanel;
