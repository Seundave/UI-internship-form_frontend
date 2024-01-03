import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useState, useEffect } from "react"; //or use your library of choice here
import { useMemo } from "react";
import axios from "axios";
import { PageviewRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  internFailure,
  internStart,
  internSuccess,
} from "../../../redux/interns/interns";
import ShowInternDetails from "./ShowInternDetails";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Table = () => {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeIntern, setActiveIntern] = useState(null);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const { loading, allInterns } = useSelector((state) => state.interns);
  
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(dummyData);
    download(csvConfig)(csv);
  };

  console.log(showDetails);

  //   useEffect(() => {
  //     const fetchInterns = async () => {
  //       dispatch(internStart())
  //       try {
  //         const response = await axios.get("http://localhost:5000/user");
  //         console.log(response);
  //         const fetchedInterns = response.data;
  //         dispatch(internSuccess(response.data))
  //         setData(fetchedInterns);
  //         // setLoading(false);
  //       } catch (error) {
  //         console.log("Error fetching admins", error);
  // dispatch(internFailure(error))

  //         // setLoading(false);
  //       }
  //     };

  //     fetchInterns();
  //   }, []);

  //this func will show the details of the intern clicked on
  const handleViewIntern = (intern) => {
    setActiveIntern(intern);
    setShowDetails(true);
    console.log(intern);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "surname",
        header: "Surname",
        size: 50,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 50,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 50,
      },
      {
        accessorKey: "course",
        header: "Course",
        size: 50,
      },
      {
        accessorKey: "institution",
        header: "Institution",
        size: 50,
      },
      {
        accessorKey: "interest",
        header: "Interest",
        Cell: ({ cell }) => cell.getValue().join(", "),
        size: 50,
      },
    ],

    []
  );

  const table = useMaterialReactTable({
    columns,
    data: allInterns,
    enableRowSelection: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: { density: "compact" },
    renderRowActions: ({ row }) => {
      return (
        <Stack
          direction={"row"}
          sx={{
            boxSizing: "border-box",
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={1}
        >
          <Tooltip title="View Intern">
            <IconButton onClick={() => handleViewIntern(row.original)}>
              <PageviewRounded />
            </IconButton>
          </Tooltip>{" "}
        </Stack>
      );
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{
            fontSize: "12px",
          }}
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>

        <Button
          sx={{
            fontSize: "12px",
          }}
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  // if(loading){
  //   return <p>Loading...</p>
  // }

  return (
    <>
      {showDetails && (
        <ShowInternDetails
          showDetails={showDetails}
          handleClose={() => setShowDetails(false)}
          handleViewIntern={handleViewIntern}
          activeIntern={activeIntern}
        />
      )}
      <MaterialReactTable table={table} />;
    </>
  );
};

export default Table;

const dummyData = [
  {
    _id: "6582eccd009fe902933e033d",
    surname: "Olaleye",
    firstName: "David",
    middleName: "Olayinka",
    gender: "male",
    dateofbirth: "2018-12-04T23:00:00.000Z",
    stateoforigin: "Niger",
    address: "Area 4, behind Saw Mill, Bida, Niger State",
    email: "abc@gmail.com",
    institution: "Obafemi Awolowo University",
    course: "Civil engineering",
    level: 200,
    firstInternship: "no",
    internshipDetails: {
      year: "1889",
      organization: "OAU",
      duration: "2weeks",
      _id: "6582ecce009fe902933e033e",
    },
    reasonitems: "ccccccccccccccccccccc",
    interest: ["Hardware", "Software", "Graphic Design"],
    explainInterest: "ccccccccccccccccccccc",
    skills: "ccccccccccccccccccccc",
    expectations: "ccccccccccccccccccccc",
  },
  {
    _id: "6582eccd009fe902933e033d",
    surname: "Olaleye",
    firstName: "David",
    middleName: "Olayinka",
    gender: "male",
    dateofbirth: "2018-12-04T23:00:00.000Z",
    stateoforigin: "Niger",
    address: "Area 4, behind Saw Mill, Bida, Niger State",
    email: "abc@gmail.com",
    institution: "Obafemi Awolowo University",
    course: "Civil engineering",
    level: 200,
    firstInternship: "no",
    internshipDetails: {
      year: "1889",
      organization: "OAU",
      duration: "2weeks",
      _id: "6582ecce009fe902933e033e",
    },
    reasonitems: "ccccccccccccccccccccc",
    interest: ["Hardware", "Software", "Graphic Design"],
    explainInterest: "ccccccccccccccccccccc",
    skills: "ccccccccccccccccccccc",
    expectations: "ccccccccccccccccccccc",
  },
];
