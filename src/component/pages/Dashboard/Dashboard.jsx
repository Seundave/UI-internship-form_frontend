import React, { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import "./dashboard.css";
import Table from "./Table.jsx";
import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { internFailure, internStart, internSuccess } from "../../../redux/interns/interns.js";
import axios from "axios"
// import axios from "axios"

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const { allInterns } = useSelector((state) => state.interns);
  const dispatch = useDispatch()

  console.log(allInterns)
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

  useEffect(() => {
    const fetchInterns = async () => {
      dispatch(internStart())
      try {
        const response = await axios.get("http://localhost:5000/user");
        console.log(response);
        const fetchedInterns = response.data;
        dispatch(internSuccess(response.data.data))
        // setData(fetchedInterns);
        // setLoading(false);
      } catch (error) {
        console.log("Error fetching admins", error);
dispatch(internFailure(error))

        // setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Nav />
      <div className="dashboard">
        <div className="home-container">
          <div className="header"></div>
          <h1>List of Interns</h1>

          {allInterns.length >= 1 && <Table />}

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
