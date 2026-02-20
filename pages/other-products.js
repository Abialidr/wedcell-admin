import { filter } from "lodash";
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
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Router, useRouter } from "next/router";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ThemeProvider from "../theme";

import Layout from "../layouts/dashboard";

// import JoditEditor from 'jodit-react';

import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import { GetVenues } from "../redux/actions/HomeActions";
import axios from "axios";
// import { useRouter } from "next/router";
import Image from "next/image";

import { PROXY } from "../config";
import Label from "../components/Label";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// ---------------------------------------------------------------------

function createData(
  name,
  category,
  price,
  city,
  state,
  contactEmail,
  contactPhone
) {
  return {
    name,
    category,
    price,
    city,
    state,
    contactEmail,
    contactPhone,
  };
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "productid", label: "Product Id", alignRight: false },
  { id: "name", label: "Category", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "" },
  { id: "popular", label: "Popular", alignRight: false },
  { id: "exclusive", label: "Exclusive", alignRight: false },
  { id: "is_approved", label: "Approved", alignRight: false },
  { id: "is_delete", label: "Deleted", alignRight: false },
  { id: "productPrice", label: "Price", alignRight: false },
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

export default function User() {
  const USERLIST = [];

  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);
  const [deleted, setdeleted] = useState();
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

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const [myImage, setMyImage] = useState("");
  const [myImageName, setMyImageName] = useState("");

  const imageInput = useRef();

  const handleUploadChange = (e) => {
    setMyImageName(e.target.files[0].name);
    setMyImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadClick = () => {
    imageInput.current.click();
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: "Start typings...",
  };

  const dispatch = useDispatch();

  const { venues } = useSelector((state) => state.homeReducer);
  const [products, setProduct] = useState();
  const [prod, setProd] = useState();
  //   useEffect(() => {
  //     dispatch(GetVenues());
  //   }, []);
  const getProducts = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const response = await axios.post(
      `${PROXY}/product/get-other-products-for-admin`,
      {
        page,
      },
      config
    );
    setProduct(response.data.data);
    setProd(response.data);
    console.log("🚀 ~ file: Student.js:241 ~ getStudent ~ response:", response);
  };
  const [isupdated, setIsupdated] = useState(false);

  useEffect(() => {
    getProducts();
  }, [deleted, isupdated, page]);
  const applySearch = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    setPage(1);
    if (filterName) {
      const response = await axios.get(
        `${PROXY}/product/fullTextSearch-other-products/${filterName}?page=${page}&isAdmin=true`,
        config
      );
      setProduct(response.data.data);
      setProd(response.data);
    } else {
      getProducts();
    }
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  if (products) {
    products.map((product) => {
      USERLIST.push({
        ...product,
      });
    });
  }

  const filteredUsers = USERLIST ? USERLIST : "";

  const isUserNotFound = filteredUsers.length === 0;

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
  //       (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  //     );
  //   }
  //   return stabilizedThis.map((el) => el[0]);
  // }

  const [form, setForm] = useState({ type: "Product" });
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

  const onDelete = (_id) => {
    // const config = {
    //   headers: {
    //     authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
    //   },
    // };
    // axios.post(
    //   `${PROXY}/product/delete`,
    //   {
    //     _id: _id,
    //   },
    //   config
    // );
    // setdeleted(!deleted);
  };

  const onEdit = (id) => {
    router.push({
      pathname: `/editShopItem`,
      query: { name: "edit", id: id },
    });
  };

  const onAdd = () => {
    if (form.name && form.name.length) {
      const token = JSON.parse(localStorage.getItem("wedcell")).token;
      // setForm({ token: token })

      axios
        .post(`${PROXY}/item/create`, form, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(GetVenues());
            snackBarHandler("Successfully Added!", "success");
          } else {
            snackBarHandler("Failed to add!", "error");
          }
        })
        .catch((err) => {
          // redirect
          console.log(err);
        });
    } else {
      setError({
        ...error,
        name: "Please enter valid Name",
        vendorId: "Please enter valid Vendor Id",
      });
    }
  };

  const onPopularUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate(text, item, token);
      }
      setIsupdated(!isupdated);
      setSelected([]);
    } catch (error) {
      alert("Error");
    }
  };
  const onIsAllowedUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate1(text, item, token);
      }
      setIsupdated(!isupdated);
      setSelected([]);
    } catch (error) {
      alert("Error");
    }
  };
  const onIsDeleted = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate2(text, item, token);
      }
      setIsupdated(!isupdated);
      setSelected([]);
    } catch (error) {
      alert("Error");
    }
  };
  const onExclusiveUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate3(text, item, token);
      }
      setIsupdated(!isupdated);
      setSelected([]);
    } catch (error) {
      alert("Error");
    }
  };
  const doUpdate = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    await axios.post(
      `${PROXY}/product/update-other-products`,
      {
        _id: item,
        popular: text == "Add" ? true : false,
      },
      config
    );
    return;
  };
  const doUpdate1 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    await axios
      .post(
        `${PROXY}/product/update-other-products`,
        {
          _id: item,
          is_approved: text == "Add" ? true : false,
        },
        config
      )
      .then((res) => {
        console.log("stuff", res.data, token);
      });
    return;
  };
  const doUpdate2 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };

    // await axios
    //   .post(
    //     `${PROXY}/product/update-other-products`,
    //     {
    //       _id: item,
    //       is_delete: text == "Delete" ? true : false,
    //     },
    //     config
    //   )
    //   .then((res) => {
    //     console.log("stuff", res.data, token);
    //   });

    await axios
      .delete(`${PROXY}/product/delete-other-products/${item}`, config)
      .then((res) => {
        console.log("stuff", res.data, token);
      });
    return;
  };
  const doUpdate3 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    await axios
      .post(
        `${PROXY}/product/update-other-products`,
        {
          _id: item,
          exclusive: text == "Add" ? true : false,
        },
        config
      )
      .then((res) => {
        console.log("stuff", res.data, token);
      });
    return;
  };
  const router = useRouter();

  const cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Jaipur",
    "Goa",
    "Udaipur",
    "Agra",
    "Noida",
    "Gurgaon",
    "Ranchi",
    "Patna",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Nashik",
    "Meerut",
    "Rajkot",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Allahabad",
    "Gwalior",
    "Jabalpur",
    "Coimbatore",
    "Vijayawada",
    "Jodhpur",
    "Raipur",
    "Kota",
    "Chandigarh",
    "Guwahati",
    "Mysore",
    "Bareilly",
    "Aligarh",
    "Moradabad",
    "Jalandhar",
    "Bhuba",
    "Gorakhpur",
    "Bikaner",
    "Saharanpur",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Dehradun",
    "Durgapur",
    "Ajmer",
    "Siliguri",
    "Gaya",
    "Tirupati",
    "Mathura",
    "Bilaspur",
    "Haridwar",
    "Gandhinagar",
    "Shimla",
    "Gangtok",
    "Nainital",
    "Jaisalmer",
    "Indor",
    "Rishikesh",
    "kaushali",
    "Pushkar",
    "Kerala",
    "Jim Corbet",
    "Mussoorie",
    "Dubai",
    "Thailand",
    "Canada",
    "Srilanka",
    "South Africa",
    "Singapore",
    "Bali",
    "Italy",
    "UK",
    "Autralia",
    "Bokaro",
    "Faridabad",
    "South Delhi",
    "Kolkata",
  ];

  const CategotiesListVenue = [
    {
      name: "Hotel",
      subCategories: [],
    },
    {
      name: "Resort",
      subCategories: [],
    },
    {
      name: "Farm House",
      subCategories: [],
    },
    {
      name: "Banquet Hall",
      subCategories: [],
    },
    {
      name: "Lawn",
      subCategories: [],
    },
    {
      name: "Destination Wedding",
      subCategories: [],
    },
  ];

  return (
    <ThemeProvider>
      <Layout>
        <Page title="Students">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Products
              </Typography>
              <Button
                onClick={handleClickOpen()}
                id="basic-button"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Products
              </Button>
            </Stack>

            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={"paper"}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">Add Venues</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <div>
                    <Grid>
                      {/* <form> */}
                      {myImage && myImageName ? (
                        <Card
                          sx={{
                            width: 200,
                            height: "auto",
                            margin: "auto",
                            marginBottom: 3,
                          }}
                        >
                          <>
                            <Image
                              src={myImage}
                              style={{
                                width: 200,
                                height: 150,
                                cursor: "pointer",
                              }}
                            />
                            <>
                              <Typography
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                {myImageName}
                              </Typography>
                              <IconButton
                                onClick={() => {
                                  setMyImage("");
                                  setMyImageName("");
                                }}
                                style={{
                                  color: "red",
                                  left: 85,
                                }}
                                aria-label="delete"
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </>
                          </>
                        </Card>
                      ) : (
                        <Grid
                          xs={12}
                          sx={{
                            backgroundColor: "#f7f7f7",
                            padding: 1,
                            margin: "auto",
                            width: 200,
                            height: 150,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                            marginBottom: 3,
                            borderWidth: 1,
                            borderStyle: "dashed",
                          }}
                          onClick={handleUploadClick}
                        >
                          <input
                            id="file"
                            ref={imageInput}
                            onChange={handleUploadChange}
                            type={"file"}
                            accept="image/*"
                            style={{
                              display: "none",
                            }}
                          />
                          <Iconify
                            sx={{
                              color: "#2065D1",
                            }}
                            icon="entypo:upload-to-cloud"
                            width={50}
                            height={50}
                          />
                          <Typography sx={{ color: "text.secondary" }}>
                            Upload image
                          </Typography>
                        </Grid>
                      )}
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, vendorId: e.target.value });
                              setError({ ...error, vendorId: "" });
                            }}
                            placeholder="Enter Vendor Id"
                            label="Student Id"
                            variant="outlined"
                            fullWidth
                            required
                          />
                          {error.vendorId && error.vendorId.length && (
                            <Alert severity="error">{error.vendorId}</Alert>
                          )}
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, name: e.target.value });
                              setError({ ...error, name: "" });
                            }}
                            placeholder="Enter Name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            required
                          />
                          {error.name && error.name.length && (
                            <Alert severity="error">{error.name}</Alert>
                          )}
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                            <TextField onChange={(e) => {
                              setForm({ ...form, title: e.target.value })
                            }} placeholder="Enter Title" label="Title" variant="outlined" fullWidth />
                          </Grid> */}
                        <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="Is Employed"
                            value={form.category || ""}
                            onChange={(e) => {
                              setForm({ ...form, category: e.target.value });
                            }}
                            placeholder="Select Category"
                            sx={{
                              width: "100%",
                            }}
                          >
                            {CategotiesListVenue.map((item, key) => (
                              <MenuItem key={key} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                            <TextField onChange={(e) => {
                                setForm({ ...form, rank: e.target.value })
                              }} type="number" placeholder="Enter Rank" label="Rank" variant="outlined" fullWidth />
                          </Grid> */}
                        {/* <Grid xs={12} item>
                            <TextField
                              select
                              label="Status"
                              //   value={currency}
                              //   onChange={handleChange}
                              placeholder="Select Status"
                              sx={{
                                width: '100%',
                              }}
                            >

                              <MenuItem value={"Active"}>
                                {"Active"}
                              </MenuItem>
                              <MenuItem value={"InActive"}>
                                {"InActive"}
                              </MenuItem>
                            </TextField>
                          </Grid> */}
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, price: e.target.value });
                            }}
                            placeholder="Price"
                            label="Price"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                          <TextField onChange={(e) => {
                            setForm({ ...form, city: e.target.value })
                          }} placeholder="City" label="City" variant="outlined" fullWidth />
                        </Grid> */}
                        <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="City"
                            value={form.city || ""}
                            onChange={(e) => {
                              setForm({ ...form, city: e.target.value });
                            }}
                            placeholder="Select City"
                            sx={{
                              width: "100%",
                            }}
                          >
                            {cities.map((item, key) => (
                              <MenuItem key={key} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, state: e.target.value });
                            }}
                            placeholder="State"
                            label="State"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({
                                ...form,
                                contactEmail: e.target.value,
                              });
                            }}
                            placeholder="Contact Email"
                            label="Contact Email"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({
                                ...form,
                                contactPhone: e.target.value,
                              });
                            }}
                            placeholder="Contact Phone"
                            label="Contact Phone"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                            <TextField label="Link Url" placeholder="Enter Link Url" variant="outlined" fullWidth />
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField label="Seo Title" placeholder="Enter Seo Title" variant="outlined" fullWidth />
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField label="Seo Keywords" multiline rows={3} placeholder="Enter Seo Keywords" variant="outlined" fullWidth />
                          </Grid>
                          <Grid xs={12} sm={6} item>
                            <TextField label="Seo Description" multiline rows={3} placeholder="Enter Seo Seo Description" variant="outlined" fullWidth />
                          </Grid>
                          <Grid xs={12}
                            style={{
                              marginLeft: 16,
                              marginTop: 15,
                            }}
                          >
                            <JoditEditor
                              ref={editor}
                              value={content}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {
                                console.log(newContent);
                              }}
                            />
                          </Grid> */}
                      </Grid>
                      {/* </form> */}
                    </Grid>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>Cancel</Button>
                <Button onClick={onAdd}>Save</Button>
              </DialogActions>
            </Dialog>

            {snackBarMessage && snackBarType && snackBarMessage.length && (
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={true}
              >
                <Alert
                  color={snackBarType}
                  severity={snackBarType}
                  sx={{ width: "100%" }}
                >
                  {snackBarMessage}
                </Alert>
              </Snackbar>
            )}

            <Card>
              <UserListToolbar
                onClick={(e) => {
                  onPopularUpdate(e.target.innerText);
                }}
                onClick1={(e) => {
                  onIsAllowedUpdate(e.target.innerText);
                }}
                onClick2={(e) => {
                  onIsDeleted(e.target.innerText);
                }}
                onClick3={(e) => {
                  onExclusiveUpdate(e.target.innerText);
                }}
                numSelected={selected.length}
                filterName={filterName}
                applySearch={applySearch}
                onFilterName={handleFilterByName}
                type={"Products"}
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
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      .map((row, key) => {
                        console.log(
                          "🚀 ~ file: Products.js:1002 ~ .map ~ row:",
                          row
                        );
                        const {
                          _id,
                          name,
                          category,
                          price,
                          city,
                          popular,
                          exclusive,
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
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, _id)}
                              />
                            </TableCell>
                            {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                            <TableCell align="left">{_id}</TableCell>
                            <TableCell align="left">{row?.category}</TableCell>
                            <TableCell align="left">{row?.name}</TableCell>
                            <TableCell>
                              <div
                                onClick={() =>
                                  router.push(`reviews1/${row?._id}`)
                                }
                                style={{
                                  marginTop: "9px",
                                  marginRight: "3px",
                                }}
                              >
                                <ReviewsIcon color="primary" />
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(popular && "success") || "error"}
                              >
                                {popular ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(exclusive && "success") || "error"}
                              >
                                {exclusive ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (row?.is_approved && "success") || "error"
                                }
                              >
                                {row?.is_approved ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(row?.is_delete && "success") || "error"}
                              >
                                {row?.is_delete ? "Yes" : "No"}
                              </Label>
                            </TableCell>

                            <TableCell align="left">{row?.price}</TableCell>
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
                count={prod?.total}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
