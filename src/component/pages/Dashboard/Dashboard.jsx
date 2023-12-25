import React, { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import "./dashboard.css";
import Table from "./Table.jsx";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import axios from "axios"

function Dashboard() {
  // const { currentUser } = useSelector((state) => state.user);
  const {allInterns} = useSelector((state)=>state.interns)
  // const [isloading, setIsLoading] = useState(false)
  // const [fetchedData, setFetchedData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //     setIsLoading(true)
  //       // dispatch(getAdminStart());
  //       const response = await axios.get(
  //         "http://localhost:5000/user"
  //       );
  //       console.log(response);
  //       const fetchedInterns = response.data.data;
  //       // dispatch(getAdminSuccess(response.data));
  //       setFetchedData(fetchedInterns);
  //       setIsLoading(false);
  //     } catch (error) {
  //       // dispatch(getAdminFailure(error.message));
  //       console.log("Error fetching admins", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div>
      <Nav />
      <div className="dashboard">
        <div className="home-container">
          <div className="header"></div>
          <h1>List of Interns</h1>

          {allInterns ? 
            <Table /> : <p>No application yet</p>
          }
          

          {/* <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Surname</th>
                  <th>First name</th>
                  <th>Middle name</th>
                  <th>Email Address</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Level</th>
                  <th>Institution</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
