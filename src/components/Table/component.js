import React, { useCallback, useEffect, useState } from "react";
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
import Loader from "../Backdrop/component";

const StickyHeadTable = (props) => {
  const { isLoading, hasError, currentPage, tableData, columns, onPageChange } = props;
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => {
    getData();
  }, [controller]);

  const getData = async () => {
    try {
      await onPageChange(controller.page+1, controller.rowsPerPage);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
      {isLoading ? <Loader isOpen={isLoading} /> : null}
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns && columns.map(
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
            {tableData && tableData // maping data to each custom row
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.code}-${i}`}
                  >
                    {columns && columns.map((column) => {
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
              })}
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
    </Paper>
  );
};

export default StickyHeadTable;
