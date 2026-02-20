import { filter } from "lodash";
import { sentenceCase } from "change-case";
import Styles from "../../styles/viewallreview.module.css";
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
import { useRouter } from "next/router";
import axios from "axios";
import { PROXY } from "../../config";
import Reviews from "../Reviews";

// ---------------------------------------------------------------------

function createData(name, phone, registered_date, status) {
  return {
    name,
    phone,
    registered_date,
    status,
  };
}

const USERLIST = [
  createData("Cupcake", 305, 3.7, 67),
  createData("Donut", 452, 25.0, 4.9),
  createData("Eclair", 262, 24, 6.0),
  createData("Frozen yoghurt", 6.0, 24, 4.0),
  createData("Gingerbread", 16.0, 49, 3.9),
  createData("Honeycomb", 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 0.0),
  createData("KitKat", 518, 65, 7.0),
  createData("Lollipop", 392, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 9, 37.0),
  createData("Oreo", 437, 63, 4.0),
];

// ----------------------------------------------------------------------
const PopupWindow = ({
  onClose,
  oneReview,
  setReplyValues,
  replyValues,
  setShowPopup,
  oneReply,
  UpdateReply,
}) => {
  console.log("🚀 ~ file: [id].js:70 ~ PopupWindow ~ oneReview:", oneReview);
  return (
    <div
      className={Styles.popupcontainer}
      // style={{
      //   position: "absolute",
      //   top: "50%",
      //   left: "50%",
      //   backgroundColor: "white",
      // }}
    >
      <div className={Styles.popupcontent}>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <div className="bg-white py-3">
            <h4 className="fw-bold text-center">Write A Reply</h4>
            <div className={Styles.ReviewContainer} style={{ padding: "20px" }}>
              <div className={Styles.ReviewUser}>
                {/* <AccountCircleIcon fontSize="large"></AccountCircleIcon> */}
                <h6>{oneReview?.name}</h6>
              </div>
              <div className={Styles.ReviewStar}>
                {/* <StarRatings
                  rating={oneReview?.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="17px"
                  starSpacing="2px"
                /> */}
              </div>
              <span className={Styles.ReviewCountryDate}>
                Reviwed on
                {/* {moment(oneReview?.createdAt).format("MMM DD YYYY")} */}
              </span>
              <div className={Styles.ReviewSpan}>
                <span>{oneReview?.reviewBody}</span>
              </div>
              {/* <div
              className={Styles.ReplyContainer}
              style={{
                display: viewReview ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <div className={Styles.ReviewUser}>
                <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
                <h6>Name</h6>
              </div>
              <span className={Styles.ReviewCountryDate}>Reply on date</span>
              <div className={Styles.ReviewSpan}>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
                  doloremque iusto blanditiis amet, odit culpa modi explicabo.
                  Dicta, inventore officiis!
                </span>
              </div>
            </div> */}
            </div>
            {/* <div className="stars-container d-flex align-items-center my-3 justify-content-center">
              <span className={`${Styles.rating_icon} me-2`}>
                <AiFillStar />
              </span>
              <span className={`${Styles.rating_icon} me-2`}>
                <AiFillStar />
              </span>
              <span className={`${Styles.rating_icon} me-2`}>
                <AiFillStar />
              </span>
              <span className={`${Styles.rating_icon} me-2`}>
                <AiFillStar />
              </span>
              <span className={`${Styles.rating_icon} `}>
                <AiFillStar />
              </span>
            </div> */}

            <div
              className="row gy-8"
              style={{
                margin: "10px",
              }}
            >
              {/* <div className="col-md-12">
                <div className="field-container mb-3">
                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Title"
                  />
                </div>
              </div> */}

              {/* <div className="col-md-6">
                        <div className="field-container mb-3">
                          <input
                            type="text"
                            className="form-control py-3"
                            placeholder="Email"
                          />
                        </div>
                      </div> */}

              <div className="field-container mb-3">
                <textarea
                  value={replyValues.replyBody}
                  onChange={(e) => {
                    setReplyValues({
                      ...replyValues,
                      replyBody: e.target.value,
                    });
                  }}
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  placeholder="Write Reply..."
                ></textarea>
              </div>

              <button
                onClick={UpdateReply}
                className="primary-btn mt-3 mx-auto d-block"
                style={{
                  backgroundColor: "#b6255a",
                  fontWeight: "500",
                  width: "80%",
                }}
              >
                Submit Reply
              </button>
            </div>
          </div>
        </div>
        <button className={Styles.popupClosebtn} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};
const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "registered_date", label: "Registered Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
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

export default function Reviews1() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const router = useRouter();
  const { id } = router.query;
  const type = router.query.type;
  const [reviewData, setReviewData] = useState([]);
  const [totalReview, setTotalReview] = useState();
  const handleViewMore = (e) => {
    setPage(page + 1);
  };

  const getreviewData = async () => {
    if (id) {
      const conditions = {};
      conditions.productid = id;
      conditions.userid = "";
      conditions.page = page;

      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const result = await axios.post(`${PROXY}/rr/reviews/all`, conditions);
      setReviewData([...reviewData, ...result.data.data]);
      console.log(
        "🚀 ~ file: [id].js:338 ~ getreviewData ~ [...reviewData, ...result.data.data]:",
        [...reviewData, ...result.data.data]
      );
      setTotalReview(result.data);
      console.log(
        "🚀 ~ file: [id].js:407 ~ getreviewData ~ result.data:",
        result.data
      );
      console.log("🚀 ~ file: [id].js:356 ~ getreviewData ~ result:", result);
    }
  };
  useEffect(() => {
    getreviewData();
    console.log("🚀 ~ file: VendorDetails.js:425 ~ handleViewMore ~ page:", id);
  }, [page, id]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    ss;
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
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  const [replyValues, setReplyValues] = useState({
    replyBody: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [oneReview, setOneReview] = useState();
  const [oneReply, setOneReply] = useState();

  const handleButtonClick = (pid, uid, rid, setIsOpen) => {
    if (rid) {
      const getOnereply = async () => {
        const resu = await axios.get(`${PROXY}/rr/replies/${rid}`);
        setOneReply(resu.data.data);
        setReplyValues({
          ...replyValues,
          replyBody: resu.data.data.replyBody,
        });
        setIsOpen(false);
      };
      getOnereply();
    }
    const getOneReview = async () => {
      const res = await axios.post(`${PROXY}/rr/reviews/one`, {
        userid: uid,
        productid: pid,
      });
      console.log("🚀 ~ file: [id].js:310 ~ getOneReview ~ res:", res);
      setOneReview(res.data.data[0]);
      console.log(
        "🚀 ~ file: [id].js:306 ~ getOneReview ~ res.data.data[0]:",
        res.data.data[0]
      );
    };

    getOneReview();
    setShowPopup(true);
  };
  const UpdateReply = async () => {
    if (replyValues.replyBody) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      if (oneReply) {
        const body = {
          replyBody: replyValues.replyBody,
          _id: oneReply._id,
        };
        const result = await axios.put(`${PROXY}/rr/replies`, body, config);
        setOneReply(null);
      } else {
        const body = {
          userid: JSON.parse(localStorage.getItem("wedcell"))?.data?._id,
          reviewid: oneReview?._id,
          replyBody: replyValues.replyBody,
          name: JSON.parse(localStorage.getItem("wedcell"))?.data?.name,
          profilePic: "",
        };
        const result = await axios.post(`${PROXY}/rr/replies`, body, config);
      }
      setShowPopup(false);
      window.location.reload();
    } else {
      alert("Write Some Reply");
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
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
                Reviews
              </Typography>
            </Stack>
            {/* <Card>
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
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, key) => {
                        const { id, name, phone, registered_date, status } =
                          row;
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
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                           
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{phone}</TableCell>
                            <TableCell align="left">
                              {registered_date}
                            </TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card> */}
            {showPopup && (
              <PopupWindow
                onClose={handleClosePopup}
                oneReview={oneReview}
                setReplyValues={setReplyValues}
                replyValues={replyValues}
                setShowPopup={setShowPopup}
                oneReply={oneReply}
                UpdateReply={UpdateReply}
              />
            )}
            {console.log(
              "🚀 ~ file: [id].js:551 ~ {reviewData?.map ~ reviewData:",
              reviewData
            )}
            {reviewData?.map((item) => {
              return (
                <div style={{ marginBottom: "30px", position: "relative" }}>
                  <Reviews
                    item={item}
                    main={true}
                    totalReview={totalReview}
                    page={page}
                    setPage={setPage}
                    handleButtonClick={handleButtonClick}
                  ></Reviews>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      gap: "10px",
                      width: "25%",
                    }}
                  >
                    <span
                      style={{
                        // position: "absolute",
                        // bottom: "50px",
                        // right: "50px",
                        // marginTop: "30px",
                        marginBottom: "10px",
                        width: "45%",
                        background: "grey",
                        padding: "10px",
                        border: "1px solid white",
                        color: "white",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        handleButtonClick(item?.productid, item?.userid)
                      }
                      className={Styles.Viewbtn}
                      // onClick={() => setViewReview(!viewReview)}
                    >
                      Add Reply
                    </span>
                    <span
                      style={{
                        // position: "absolute",
                        // bottom: "50px",
                        // right: "50px",
                        // marginTop: "30px",
                        width: "45%",
                        marginBottom: "10px",
                        background: "white",
                        color: "grey",
                        border: "1px solid grey",
                        padding: "10px",
                        // border: "1px solid white",
                        color: "grey",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={async () => {
                        const config = {
                          headers: {
                            authorization: JSON.parse(
                              localStorage.getItem("wedcell")
                            )?.data?.token,
                          },
                        };
                        const res = await axios.delete(
                          `${PROXY}/rr/reviews/${item._id}`,
                          config
                        );
                        window.location.reload();
                      }}
                      className={Styles.Viewbtn}
                      // onClick={() => setViewReview(!viewReview)}
                    >
                      Delete Review
                    </span>
                  </div>
                </div>
              );
            })}
            <span
              onClick={(e) => {
                handleViewMore();
              }}
              className={Styles.Viewbtn}
              style={{
                display: "flex",
                paddingLeft: "0px",
              }}
            >
              {totalReview?.remainingReviews
                ? `${totalReview?.remainingReviews} Remaning `
                : ""}
            </span>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
