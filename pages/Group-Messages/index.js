import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROXY } from "../../config";

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
import Page from "../../components/Page";
import SearchNotFound from "../../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../sections/@dashboard/user";

import ThemeProvider from "../../theme";

import Layout from "../../layouts/dashboard";
import axios from "axios";
import { useRouter } from "next/router";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

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
  { id: "group_name", label: "Group Name", alignRight: false },
  { id: "customer_name", label: "Customer Name", alignRight: false },
  { id: "customer_mobile", label: "Customer Phone", alignRight: false },
  { id: "vendor_name", label: "Vendor Names", alignRight: false },
  // { id: 'vendor_mobile', label: 'Vendor Mobile', alignRight: false },
  { id: "createdat", label: "Created at", alignRight: false },
  { id: "updatedat", label: "Last message at", alignRight: false },
  { id: "lastmessage", label: "Last message", alignRight: false },
  { id: "action", label: "ACTION", alignRight: false },
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
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [uSERLIST, setUSERLIST] = useState([]);
  useEffect(() => {
    const getContact = async () => {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const result = await axios.post(
        `${PROXY}/contacts/admingetmsg`,
        {
          type: "grpmsg",
          skip: page * 10,
          limit: 10,
        },
        config
      );
      console.log(
        "🚀 ~ file: ViewContact.js:151 ~ getContact ~ result:",
        result
      );
      setUSERLIST(result.data.data);
      setTotal(result.data.total);
      console.log("🚀 ~ file: contact.js:133 ~ getContact ~ result :", result);
    };
    getContact();
  }, [page]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = uSERLIST?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    console.log(
      "🚀 ~ file: ViewContact.js:169 ~ handleFilterByName ~ event:",
      event.target.value
    );
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - uSERLIST?.length) : 0;

  const filteredUsers = uSERLIST ? uSERLIST : "";

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <ThemeProvider>
      <Layout>
        <Page title="User">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Messages
              </Typography>
            </Stack>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
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
                      console.log("ROWOWOW", row);
                      const {
                        _id,
                        prospectName,
                        prospectContact,
                        vendorName,
                        vendorContact,
                        lastMessage,
                        createdAt,
                        updatedAt,
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
                          aria-checked={isItemSelected}
                        >
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
                          <TableCell align="left">{row.groupName}</TableCell>
                          <TableCell align="left">{prospectName}</TableCell>
                          <TableCell align="left">{prospectContact}</TableCell>
                          <TableCell align="left">
                            <ul>
                              {row.vendorInfo.map((e) => (
                                <li>{e.vendorName}</li>
                              ))}
                            </ul>
                          </TableCell>
                          {/* <TableCell align='left'>{vendorContact}</TableCell> */}
                          <TableCell align="left">{createdAt}</TableCell>
                          <TableCell align="left">{updatedAt}</TableCell>
                          <TableCell align="left">
                            {lastMessage ? lastMessage?.message : ""}
                          </TableCell>
                          <TableCell align="left">
                            <button
                              style={{ background: "none", border: "none" }}
                              onClick={() => {
                                router.push(`/Group-Messages/${_id}`);
                              }}
                            >
                              <MailOutlineIcon
                                sx={{ fontSize: "20px" }}
                              ></MailOutlineIcon>
                            </button>
                          </TableCell>
                          {/* <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
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
                rowsPerPageOptions={1}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
