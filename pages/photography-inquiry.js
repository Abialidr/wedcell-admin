import { filter } from "lodash";
import { useEffect, useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
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
import { UserListHead } from "../sections/@dashboard/user";
import { PROXY } from "../config/index";
import ThemeProvider from "../theme";

import Layout from "../layouts/dashboard";
import axios from "axios";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import useWindowSize from "@rooks/use-window-size";
import { DeleteForever } from "@mui/icons-material";

// ---------------------------------------------------------------------

// function createData(name, email, phone, payment_id, total_amount) {
//   return {
//     name, email, phone, payment_id, total_amount
//   };
// }

// const USERLIST = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
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

export default function User() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [USERLIST, setUSERLIST] = useState();
  console.log(
    "🚀 ~ file: photography-inquiry.js:130 ~ User ~ USERLIST:",
    USERLIST
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 900 ? "50%" : windowWidth >= 460 ? "95%" : "95%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: windowWidth >= 900 ? "fit-content" : "fit-content",
    overflow: "scroll",
    // paddingTop: "270px",
    zIndex: "-1",
    maxHeight: "90%",
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST?.map((n) => n.name);
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
  const [inhouseInq, setInhouseInq] = useState();
  const getData = async () => {
    try {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const response = await axios.get(
        `${PROXY}/inquiry?page=${parseInt(page)}`,
        config
      );
      if (response) {
        setInhouseInq(response?.data);
        setUSERLIST(response?.data?.data);
      }
    } catch (error) {}
  };
  const applySearch = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    setPage(1);
    if (filterName) {
      const response = await axios.get(
        `${PROXY}/inhouse/other/${filterName}/${page}`,
        config
      );
      setInhouseInq(response?.data);
      setUSERLIST(response?.data?.data);
    } else {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST?.length) : 0;

  const filteredUsers = USERLIST;
  const isUserNotFound = USERLIST?.length === 0;
  const [modalData, setModalData] = useState();
  return (
    <ThemeProvider>
      <Layout>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "inter",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "20px" }}>{modalData?.type}</span>
                <span
                  style={{ fontSize: "22px", cursor: "pointer" }}
                  onClick={handleClose}
                >
                  X
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  fontSize: "15px",
                }}
              >
                {modalData?.data?.map((item, key) => {
                  return (
                    <article
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <b>{item.name}</b>
                      </span>
                      <span>
                        <b>Qty</b> : {item.qty}
                      </span>
                      <span>
                        <b>Price</b> : ₹{item.total}
                      </span>
                    </article>
                  );
                })}

                <article>
                  <span>
                    <b>Address</b> : {modalData?.address}
                  </span>
                </article>
                <article>
                  <span>
                    <b>Others Specifications</b> : {modalData?.requirments}
                  </span>
                </article>
                <article>
                  <span>
                    <b>Payment Type</b> : {modalData?.paymentType}
                  </span>
                </article>
              </div>
            </div>
          </Box>
        </Modal>
        <Page title="User">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                In-House Inquiry
              </Typography>
            </Stack>
            <Card>
              {/* <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                applySearch={applySearch}
                onFilterName={handleFilterByName}
              /> */}

              <TableContainer>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    type={"Users"}
                  />
                  <TableBody>
                    {USERLIST?.map((row, key) => {
                      const { city, description, mNo, pName } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                          <TableCell align="left">{pName}</TableCell>
                          <TableCell align="left">{mNo}</TableCell>
                          <TableCell align="left">{city}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          {/* <TableCell align="left" onClick={() => {
                            
                          }}>
                            <DeleteForever />
                          </TableCell> */}
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
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={inhouseInq?.total}
                rowsPerPage={rowsPerPage}
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
