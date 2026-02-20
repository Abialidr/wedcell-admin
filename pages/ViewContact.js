import { filter, update } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROXY } from "../config";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";

import ThemeProvider from "../theme";

import Layout from "../layouts/dashboard";
import axios from "axios";

// ---------------------------------------------------------------------

function createData(
  customer_name,
  customer_mobile,
  vendor_name,
  vendor_mobile,
  date
) {
  return {
    customer_name,
    customer_mobile,
    vendor_name,
    vendor_mobile,
    date,
  };
}

const USERLIST = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "customer_name", label: "Customer Name", alignRight: false },
  { id: "customer_mobile", label: "Customer Phone", alignRight: false },
  { id: "vendor_name", label: "Vendor Name", alignRight: false },
  { id: "vendor_mobile", label: "Vendor Mobile", alignRight: false },
  { id: "vendor_mobile", label: "Source", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (_user) =>
//         _user.customer_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function User() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [update, setUpdate] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [uSERLIST, setUSERLIST] = useState([]);
  const [total, setTotal] = useState();
  useEffect(() => {
    const getContact = async () => {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const result = await axios.get(
        `${PROXY}/contacts/getforVendor?page=${page}&search=${filterName}`,
        config
      );
      setUSERLIST(result.data.data);
      setTotal(result.data.total);
      console.log("🚀 ~ file: contact.js:133 ~ getContact ~ result :", result);
    };
    getContact();
  }, [page, update]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = uSERLIST?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleFilterByName = (event) => {
    if (event.target.value === "") {
      setUpdate(!update);
    }
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - uSERLIST?.length) : 0;

  const filteredUsers = uSERLIST ? uSERLIST : "";

  const isUserNotFound = filteredUsers.length === 0;
  console.log("object", uSERLIST);
  return (
    <ThemeProvider>
      <Layout>
        <Page title="User">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}>
              <Typography variant="h4" gutterBottom>
                Contacts
              </Typography>
            </Stack>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
                applySearch={() => setUpdate(!update)}
              />

              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={uSERLIST?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    type={"Users"}
                  />
                  <TableBody>
                    {uSERLIST?.map((row, key) => {
                      const {
                        id,
                        customer_name,
                        prospectName,
                        prospectContact,
                        Source,
                        vendorName,
                        vendorContact,
                        createdAt,
                        date,
                      } = row;
                      const isItemSelected =
                        selected.indexOf(prospectName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}>
                          {/* <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, customer_name)} />
                          </TableCell> */}
                          {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                          <TableCell align="left">{prospectName}</TableCell>
                          <TableCell align="left">{prospectContact}</TableCell>
                          <TableCell align="left">{vendorName}</TableCell>
                          <TableCell align="left">{vendorContact}</TableCell>
                          <TableCell align="left">{Source}</TableCell>
                          <TableCell align="left">{createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={total}
                rowsPerPage={5}
                page={page - 1}
                onPageChange={handleChangePage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
