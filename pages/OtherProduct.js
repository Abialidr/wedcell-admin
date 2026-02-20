import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useMemo, useRef, useState } from "react";
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
  Modal,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// components
import Page from "../components/Page";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import { PROXY } from "../config/index";
import ThemeProvider from "../theme";

import Layout from "../layouts/dashboard";
import axios from "axios";
import { fDate } from "utils/formatTime";
import useWindowSize from "@rooks/use-window-size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";

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
  { id: "phone", label: "Type", alignRight: false },
  { id: "totalprice", label: "Total Price", alignRight: false },
  { id: "city", label: "Paid Amt", alignRight: false },
  { id: "locality", label: "Unpaid Amt", alignRight: false },
  { id: "locality", label: "city", alignRight: false },
  { id: "payment_id", label: "Payment Id", alignRight: false },
  { id: "type", label: "Event Date", alignRight: false },
  { id: "price", label: "View More Details", alignRight: false },
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

export default function InHouseVenues() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [USERLIST, setUSERLIST] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
      const response = await axios.get(`${PROXY}/opp/other/${page}?skip=20`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      });
      if (response) {
        console.log(
          `🚀 ~ file: VenueInquiry.js:149 ~ getData ~ response:`,
          response
        );
        setInhouseInq(response?.data);
        setUSERLIST(response.data.data);
        console.log(
          "🚀 ~ file: VenueInquiry.js:161 ~ getData ~ response.data.venues:",
          response.data.venues
        );
      }
    } catch (error) {
      console.log(`🚀 ~ file: VenueInquiry.js:155 ~ getData ~ error:`, error);
    }
  };
  useEffect(() => {
    getData();
  }, [page]);
  const applySearch = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    setPage(1);
    if (filterName) {
      const response = await axios.get(
        `${PROXY}/opp/other/${filterName}/${page}?skip=20`,
        config
      );
      setInhouseInq(response?.data);
      setUSERLIST(response?.data?.data);
    } else {
      getData();
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = USERLIST ? USERLIST : "";

  const isUserNotFound = USERLIST?.length === 0;
  const {
    innerWidth: windowWidth,
    innerHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [modalData, setModalData] = useState();
  console.log(
    "🚀 ~ file: OtherProduct.js:234 ~ InHouseVenues ~ modalData:",
    modalData
  );
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
                Purchased Products
              </Typography>
            </Stack>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                applySearch={applySearch}
                onFilterName={handleFilterByName}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width:
                      windowWidth >= 900
                        ? "50%"
                        : windowWidth >= 460
                        ? "95%"
                        : "95%",
                    bgcolor: "background.paper",
                    // border: "2px solid #000",
                    boxShadow: 24,
                    padding: "60px 20px 20px",
                    borderRadius: "10px",
                    height: windowWidth >= 900 ? "fit-content" : "fit-content",
                    overflow: "scroll",
                    // paddingTop: "270px",
                    zIndex: "-1",
                    maxHeight: "90%",
                  }}
                >
                  <div
                    style={{
                      background: "#B6255A",
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "100%",

                      height: "50px",
                      display: "flex",
                      justifyContent: "end",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{ fontSize: "22px", cursor: "pointer" }}
                      onClick={handleClose}
                    >
                      <FontAwesomeIcon icon={faClose} color="white" />
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      fontFamily: "inter",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        fontSize: "15px",
                      }}
                    >
                      {(() => {
                        console.log(modalData, "sasasa");
                        if (modalData?.data) {
                          let referenced, vendorDetail, productsData;
                          if (modalData?.data?.reference) {
                            referenced = JSON.parse(
                              JSON.stringify(modalData?.data?.reference)
                            );
                          }
                          if (modalData?.data?.vendorDetails) {
                            vendorDetail = JSON.parse(
                              JSON.stringify(modalData?.data?.vendorDetails)
                            );
                            delete vendorDetail.password;
                            delete vendorDetail.cover_pic;
                            delete vendorDetail.profile_pic;
                            delete vendorDetail.is_approved;
                            delete vendorDetail.is_delete;
                            delete vendorDetail.is_email_verified;
                            delete vendorDetail.is_mobile_verified;
                            delete vendorDetail._id;
                            delete vendorDetail.warehouse_address;
                            delete vendorDetail.token;
                            delete vendorDetail.id;
                            delete vendorDetail.__v;
                            delete vendorDetail.updatedAt;
                            delete vendorDetail.createdAt;
                          }

                          productsData = JSON.parse(
                            JSON.stringify(modalData?.data)
                          );

                          delete productsData.vendorDetails;
                          delete productsData.reference;
                          delete productsData.images;
                          delete productsData.vendorId;
                          delete productsData.updatedAt;
                          delete productsData.createdAt;
                          delete productsData.__v;
                          delete productsData.videos;
                          delete productsData.plans;
                          delete productsData.descrition;
                          delete productsData.exclusive;
                          delete productsData.mainImages;
                          delete productsData._id;
                          delete productsData.vidLinks;
                          delete productsData.avgRatingTotalStars;
                          delete productsData.avgRating;
                          delete productsData.is_approved;
                          delete productsData.is_delete;
                          delete productsData.popular;
                          delete productsData.avgRatingTotalRates;
                          delete productsData.bookedDate;
                          delete productsData.priority;
                          delete productsData.mainImage;
                          delete productsData.description;
                          delete productsData.secondNumbers;
                          delete productsData.termsandconditions;
                          delete productsData.brochure;
                          delete productsData.subSubCategory;
                          delete productsData.albums;
                          delete productsData.awarded;
                          delete productsData.password;
                          delete productsData.is_email_verified;
                          delete productsData.is_mobile_verified;
                          delete productsData.id;
                          delete productsData.wishlist;

                          return (
                            <>
                              {vendorDetail ? (
                                <span
                                  style={{
                                    lineHeight: "1.2",
                                    fontSize: "18px",
                                    padding: "20px",
                                    border: "2px solid rgba(0,0,0,0.3)",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <b>Vendor details</b>
                                  <pre>
                                    {JSON.stringify(vendorDetail, undefined, 1)
                                      .replace(/[{}"]/g, "")
                                      .replace(/,/g, "")}
                                  </pre>
                                </span>
                              ) : (
                                <></>
                              )}
                              {referenced ? (
                                <span
                                  style={{
                                    lineHeight: "1.2",
                                    fontSize: "18px",
                                    padding: "20px",
                                    border: "2px solid rgba(0,0,0,0.3)",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <b>reference vendor detail</b>
                                  <pre>
                                    {JSON.stringify(referenced, undefined, 1)
                                      .replace(/[{}"]/g, "")
                                      .replace(/,/g, "")}
                                  </pre>
                                </span>
                              ) : (
                                <></>
                              )}
                              {productsData ? (
                                <span
                                  style={{
                                    lineHeight: "1.2",
                                    fontSize: "18px",
                                    padding: "20px",
                                    border: "2px solid rgba(0,0,0,0.3)",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <b>Product details</b>
                                  <pre>
                                    {JSON.stringify(productsData, undefined, 1)
                                      .replace(/[{}"]/g, "")
                                      .replace(/,/g, "")}
                                  </pre>
                                </span>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        } else return <></>;
                      })()}

                      <article
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <span>
                          <b>Delivery Address</b> : {modalData?.address}
                        </span>
                        <span>
                          <b>Others Specifications</b> :{" "}
                          {modalData?.requirments}
                        </span>
                        <span>
                          <b>Payment Type</b> : {modalData?.paymentType}
                        </span>
                        <span>
                          <b>Qauntity</b> : {modalData?.qauntity}
                        </span>
                      </article>
                    </div>
                  </div>
                </Box>
              </Modal>
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
                      const {
                        id,
                        name,
                        paidPayment,
                        number,
                        paymentType,
                        remainingpayment,
                        totalPayment,
                        requirments,
                        slot,
                        payment_id,
                        type,
                        city,
                        eventDate,
                      } = row;
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
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{number}</TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">{totalPayment}</TableCell>
                          <TableCell align="left">{paidPayment}</TableCell>
                          <TableCell align="left">{remainingpayment}</TableCell>
                          <TableCell align="left">{city}</TableCell>
                          <TableCell align="left">{payment_id}</TableCell>
                          <TableCell align="left">{fDate(eventDate)}</TableCell>
                          {/* <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell> */}
                          <TableCell
                            align="left"
                            onClick={() => {
                              setOpen(true);
                              setModalData(row);
                            }}
                          >
                            <RemoveRedEyeIcon />
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
