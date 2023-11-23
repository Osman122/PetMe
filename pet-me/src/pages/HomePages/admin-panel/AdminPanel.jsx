import "./AdminPanel.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/config";
import Dashboard from "../../../components/Admin/Dashboard";
import "bootstrap-icons/font/bootstrap-icons.css";
import error from "../../../assets/images/error.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { currentUser, synced } = useSelector((state) => state.currentUser);
  const [users, setUsers] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [reports, setReports] = useState(0);
  const [reportsList, setReportsList] = useState([]);
  const [posts, setPosts] = useState(0);
  const [pets, setPets] = useState(0);
  const navigate = useNavigate()

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
    if (!currentUser.is_superuser){
      navigate('/forbidden')
    } else {
      getUsers();
      getReports();
      getPosts();
      getPets();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#263238" }}>
      {currentUser.is_superuser ? (
        <Dashboard
          users={users}
          usersList={usersList}
          reports={reports}
          reportsList={reportsList}
          pets={pets}
          posts={posts}
        />
      ) : (
        <div className="container text-center">
          <div
            style={{
              height: "80vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              position: "absolute",
            }}
          >
            <img
              className=""
              src={error}
              alt="Error 404"
              style={{
                width: "50dvw",
                height: "30dvw",
                position: "relative",
                opacity: "80%",
              }}
            />
            <h1
              style={{
                color: "#BF7245",
                position: "absolute",
                top: "8vw",
                fontSize: "3dvw",
                fontWeight: "bold",
                zIndex: "10000000",
              }}
            >
              unauthorized {" "}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
