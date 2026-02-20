import { filter } from "lodash";
import { useEffect, useRef, useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Alert,
  Snackbar,
} from "@mui/material";
// components
import Page from "../components/Page";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThemeProvider from "../theme";
import Layout from "../layouts/dashboard";
import axios from "axios";
import { PROXY } from "../config";
import Label from "../components/Label";
const TABLE_HEAD = [
  { id: "userId", label: "Customer Id", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "Deleted", label: "Deleted", alignRight: false },
  { id: "contactEmail", label: "Email", alignRight: false },
  { id: "contactPhone", label: "Phone", alignRight: false },
  { id: "" },
];
export default function User() {
  const USERLIST = [];

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [update, setupdate] = useState();

  const [users, setUsers] = useState();
  console.log("🚀 ~ file: Customer.js:224 ~ User ~ users:", users);
  const getUsers = async (page) => {
    setPage(page);
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    if (filterName) {
      const response = await axios.get(
        `${PROXY}/shopnowuser/fullTextSearch/${filterName}?page=${page + 1}`,
        config
      );
      setUsers(response.data);
    } else {
      const response = await axios.get(
        `${PROXY}/shopnowuser/getall/${page + 1}?isAdmin=true`,
        config
      );
      setUsers(response.data);
    }
  };
  const applySearch = () => {
    getUsers(0);
  };
  useEffect(() => {
    getUsers(page);
  }, [update]);

  if (users) {
    users?.data?.map((user) => {
      USERLIST.push({
        ...user,
      });
    });
  }

  const filteredUsers = USERLIST;

  const isUserNotFound = filteredUsers.length === 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const [form, setForm] = useState({ type: "Venue" });
  const [error, setError] = useState({});
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const snackBarHandler = (message, type) => {
    if (type === "success") handleClickClose();
    setSnackBarType(type);
    setSnackBarMessage(message);
    setTimeout(() => {
      setSnackBarMessage("");
      setSnackBarType("");
    }, 4000);
  };

 
  const onDelete = (id, is_delete) => {
  
    axios
      .put(
        `${PROXY}/shopnowuser/update`,
        {
          _id: id,
          is_delete: !is_delete,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
              ?.token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setupdate(!update);
          snackBarHandler("Successfully Deleted!", "success");
        } else {
          snackBarHandler("Failed to Delete!", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [vendorIdforpass, setVendorIdforpass] = useState();
  const [password, setPassword] = useState();
  const onEdit = (id) => {
    setVendorIdforpass(id);
    setOpen(true);
  };

  const onPopularUpdate = async (text) => {
    const token = JSON.parse(localStorage.getItem("wedcell")).token;
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate(text, item, token);
      }
      location.reload(true);
    } catch (error) {
      alert("Error");
    }
  };

  const doUpdate = async (text, item, token) => {
  };

  return (
    <ThemeProvider>
      <Layout>
        <Page title="Venues">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}>
              <Typography variant="h4" gutterBottom>
                Shop Now Users
              </Typography>
              <Button
                onClick={handleClickOpen()}
                id="basic-button"
                startIcon={<Iconify icon="eva:plus-fill" />}>
                New Customers
              </Button>
            </Stack>

            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={"paper"}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description">
              <DialogTitle id="scroll-dialog-title">Password</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}>
                  <div>
                    <Grid>
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={12} item>
                          <TextField
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            placeholder="Change Password"
                            label="Change Password"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      {/* </form> */}
                    </Grid>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>Cancel</Button>
                <Button
                  onClick={async () => {
                    const config = {
                      headers: {
                        authorization: JSON.parse(
                          localStorage.getItem("wedcell")
                        )?.data?.token,
                      },
                    };
                    if (password) {
                      const data = await axios.patch(
                        `${PROXY}/users/updatepassbyadmin`,
                        {
                          password: password,
                          _id: vendorIdforpass,
                        },
                        config
                      );
                      alert("Password Changed");
                      setOpen(false);
                    } else {
                      alert("Please Enter Password");
                    }
                  }}>
                  Change
                </Button>
              </DialogActions>
            </Dialog>

            {snackBarMessage && snackBarType && snackBarMessage.length && (
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={true}>
                <Alert
                  color={snackBarType}
                  severity={snackBarType}
                  sx={{ width: "100%" }}>
                  {snackBarMessage}
                </Alert>
              </Snackbar>
            )}

            <Card>
              <UserListToolbar
                applySearch={applySearch}
                onClick={(e) => {
                  onPopularUpdate(e.target.innerText);
                }}
                type={"Users"}
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
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    type={"Users"}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, key) => {
                        const {
                          _id,
                          vendorId,
                          name,
                          category,
                          price,
                          city,
                          popular,
                          contactEmail,
                          contactPhone,
                        } = row;
                        const isItemSelected = selected.indexOf(_id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={key}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}>
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, _id)}
                              />
                            </TableCell> */}
                            {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                            <TableCell align="left">{_id}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{row?.role}</TableCell>
                            <TableCell align="left">{row?.country}</TableCell>
                            <TableCell align="left">{city}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (row?.is_delete && "success") || "error"
                                }>
                                {row?.is_delete ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            {/* <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(popular && "success") || "error"}
                              >
                                {popular ? "Yes" : "No"}
                              </Label>
                            </TableCell> */}
                            {/* <TableCell align="left">
                              <Label>
                                <Checkbox />
                              </Label>
                            </TableCell> */}
                            <TableCell align="left">{row?.email}</TableCell>
                            <TableCell align="left">{row?.mobile}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu
                                onDelete={() => onDelete(_id, row?.is_delete)}
                                onEdit={() => onEdit(row?._id)}
                                type={"User"}
                              />
                            </TableCell>
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
                rowsPerPageOptions={[20]}
                component="div"
                count={users?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
