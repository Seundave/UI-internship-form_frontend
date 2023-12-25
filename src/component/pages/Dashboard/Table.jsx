import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { data } from "./makeData";
import {
  internFailure,
  internStart,
  internSuccess,
} from "../../../redux/interns/interns";

const formatData = (data) => {
  return {
    surname: data.surname,
    firstName: data.firstName,
    email: data.email,
    institutiom: data.institution,
    course: data.course,
    level: data.level,
  };
};

const columnHelper = createMRTColumnHelper();

// const columns = [
//   columnHelper.accessor("id", {
//     header: "ID",
//     size: 40,
//   }),
//   columnHelper.accessor("firstName", {
//     header: "First Name",
//     size: 120,
//   }),
//   columnHelper.accessor("lastName", {
//     header: "Last Name",
//     size: 120,
//   }),
//   columnHelper.accessor("company", {
//     header: "Company",
//     size: 300,
//   }),
//   columnHelper.accessor("city", {
//     header: "City",
//   }),
//   columnHelper.accessor("country", {
//     header: "Country",
//     size: 220,
//   }),
// ];

const columns = [
  // columnHelper.accessor("_id", {
  //   header: "ID",
  //   size: 40,
  // }),
  columnHelper.accessor("surname", {
    header: "Surname",
    size: 120,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    size: 120,
  }),
  columnHelper.accessor("email", {
    header: "Email Address",
    size: 300,
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
  }),
  columnHelper.accessor("course", {
    header: "Course",
    size: 220,
  }),
  columnHelper.accessor("level", {
    header: "Level",
    size: 220,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function Table() {
  // const [interns, setInterns] = useState([]);
  const [formattedData, setFormattedData] = useState([])
  const dispatch = useDispatch();
  const { allInterns } = useSelector((state) => state.interns);

  useEffect(() => {
    const fetchInterns = async () => {
      dispatch(internStart());
      try {
        // dispatch(getSchedulerStart());

        const response = await axios.get("http://localhost:5000/user");
        console.log(response);
        dispatch(internSuccess(response.data.data));
        setFormattedData(formatData(response.data.data))
        // const fetchedInterns = response.data.data;
        // dispatch(getSchedulerSuccess(response.data));
        // setInterns(fetchedInterns);
        // setLoading(false);
      } catch (error) {
        dispatch(internFailure(error.message));
        // dispatch(getSchedulerFailure(error.message));
        console.log("Error fetching admins", error);
        // setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  console.log(allInterns);

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    // const csv = generateCsv(csvConfig)(formattedData);
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    allInterns,
    // formattedData,
    // data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
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
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
