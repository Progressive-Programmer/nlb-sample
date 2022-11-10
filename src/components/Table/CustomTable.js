import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Loader from "../Backdrop/Loader";
import CoinCard from "../CoinCard/CoinCard";

const CustomTable = (props) => {
  const { isLoading, tableData, columns, coinData, onPageChange, onRowClick } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => {
    // fetch table data on first render and
    // then on every page change
    getData();
  }, [controller]);

  const getData = async () => {
    // material ui default page count starts with zero
    // and the first page for api is one
    await onPageChange(controller.page + 1, controller.rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleClickRow = (row) => {
    onRowClick(row.id);
    setIsModalOpen(true);
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
      {isLoading ? <Loader isOpen={isLoading} /> : null}
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns &&
                columns.map(
                  (
                    column // set custom column names
                  ) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  )
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              ? tableData // maping data to each custom row
                  .map((row, i) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`${row.code}-${i}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickRow(row)}
                      >
                        {columns &&
                          columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "image") {
                              // table cell spearation for image type and text
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <ListItemAvatar>
                                    <Avatar alt={row.name} src={value} />
                                  </ListItemAvatar>
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                      </TableRow>
                    );
                  })
              : "No Data Available"}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={controller.rowsPerPage}
        page={controller.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {!isLoading && isModalOpen && (
        <CoinCard
          isLoading={isLoading}
          isOpen={isModalOpen}
          data={coinData ? coinData : {}}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Paper>
  );
};

export default CustomTable;
