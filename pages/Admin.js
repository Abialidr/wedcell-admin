import React, { useEffect, useState, useRef } from "react";
import Styles from "../styles/custom.module.css";
import TextField from "@mui/material/TextField";
import ThemeProvider from "../theme";
import Page from "../components/Page";
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";
import Layout from "../layouts/dashboard";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Iconify from "../components/Iconify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Label from "../components/Label";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useS3Upload } from "next-s3-upload";
import VendorSelect from "../components/vendorSelect/vendorSelect";
import { PROXY } from "../config";
import { GetReadWedding } from "../redux/actions/HomeActions";
import { useDispatch, useSelector } from "react-redux";
import SearchNotFound from "../components/SearchNotFound";
import { filter } from "lodash";
import { GetVendors } from "../redux/actions/HomeActions";
import compressAndAppendFiles from "components/compressAndAppendFiles";

const TABLE_HEAD = [
  { id: "realWeddingId", label: "realWedding Id", alignRight: false },
  { id: "Bride Name", label: "Bride Name", alignRight: false },
  { id: "Groom Name", label: "Groom Name", alignRight: false },
  { id: "City Name", label: "City Name", alignRight: false },
  { id: "Date", label: "Date", alignRight: false },
  { id: "popular", label: "Popular", alignRight: false },
  { id: "Top10", label: "Top 10", alignRight: false },
  { id: "Albums", label: "Albums", alignRight: false },
  { id: "Vendors", label: "vendors", alignRight: false },
  { id: "" },
];

const TABLE_HEADV = [
  { id: "vendorId", label: "Vendot Id", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "popular", label: "Popular", alignRight: false },
  { id: "Top10", label: "Top 10", alignRight: false },
  { id: "contactEmail", label: "Email", alignRight: false },
  { id: "contactPhone", label: "Phone", alignRight: false },
  { id: "" },
];

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

const Admin = () => {
  const [open, setOpen] = useState(false);
  const descriptionElementRef = useRef(null);

  const [myImage, setMyImage] = useState([]);
  const [myImageName, setMyImageName] = useState("");

  const [myGallary, setMyGallary] = useState("");
  const [myGallaryName, setMyGallaryName] = useState("");

  const [values, setValues] = useState({ eventDate: new Date() });

  // const [urls, setUrls] = useState([]);
  const { uploadToS3 } = useS3Upload();

  const handlemyImagesUpload = async ({ target }) => {
    const files = Array.from(target.files);
    const data = [];
    for (let index = 0; index < files.length; index++) {
      const file = await compressAndAppendFiles(files[index]);
      const { url } = await uploadToS3(file);
      console.log(url);
      const a = url.replaceAll("%", "%25");
      data.push(a);
    }
    setMyImage(data);
  };

  const handlemyGallaryUpload = async ({ target }) => {
    const files = Array.from(target.files);
    const data = [];
    for (let index = 0; index < files.length; index++) {
      const file = await compressAndAppendFiles(files[index]);
      const { url } = await uploadToS3(file);
      console.log(url);
      data.push(url);
    }
    setMyGallary(data);
  };

  const handleClickOpen = () => () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { realWedding } = useSelector((state) => state.homeReducer);
  console.log(`🚀 ~ file: Admin.js:136 ~ Admin ~ realWedding:`, realWedding);

  useEffect(() => {
    dispatch(GetReadWedding());
  }, [dispatch]);

  const REALWEDDINGLIST = [];

  if (realWedding) {
    realWedding?.map((value) => {
      REALWEDDINGLIST.push({
        ...value,
      });
    });
  }
  console.log(REALWEDDINGLIST, "selectedWedding>>>");

  const [startDate, setStartDate] = useState(new Date());

  const [page, setPage] = useState(0);

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
      const newSelecteds = REALWEDDINGLIST?.map((n) => n._id);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - REALWEDDINGLIST.length)
      : 0;

  const filteredRealWedding = applySortFilter(
    REALWEDDINGLIST,
    getComparator(order, orderBy),
    filterName
  );
  console.log(
    `🚀 ~ file: Admin.js:214 ~ Admin ~ filteredRealWedding:`,
    filteredRealWedding
  );

  const isRealWeddingNotFound = filteredRealWedding.length === 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) =>
          _user.cityName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis?.map((el) => el[0]);
  }
  const onDelete = (id) => {};
  const onEdit = (id) => {
    // code
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

  const doUpdate = async (text, item, token) => {};

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

  const handleImageChange = (e) => {
    // var filenames="";
    // const val=e.target.files?.map((file)=>{
    //   filenames+=","+file.name;
    // })
    setMyImageName(e.target.files[0].name);
    setMyImage(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
  };

  const handleGallaryChange = (e) => {
    // var filenames="";
    // const val=e.target.files?.map((file)=>{
    //   filenames+=file.name;
    // })
    setMyGallaryName(e.target.files[0].name);
    setMyGallary(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
  };

  const handleChange = (e, name) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  // add extra fields for youtube videos

  //adding vendor table
  // const USERLIST = [];

  // const { vendors } = useSelector((state) => state.homeReducer);

  // useEffect(() => {
  //   dispatch(GetVendors());
  // }, []);

  // if (vendors) {
  //   vendors?.data?.map((vendor) => {
  //     USERLIST.push({
  //       ...vendor,
  //     });
  //   });
  // }

  // const filteredUsers = applySortFilterV(GetVendorsNew
  //   USERLIST,
  //   getComparator(order, orderBy),
  //   filterName
  // );

  // const isUserNotFound = filteredUsers.length === 0;

  function applySortFilterV(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
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
    return stabilizedThis?.map((el) => el[0]);
  }

  const [youtubeVideos, setVal] = useState([""]);
  const handleAdd = () => {
    const abc = [...youtubeVideos, ""];
    setVal(abc);
  };
  const handleClickChange = (onChangeValue, i) => {
    const ans = youtubeVideos?.map((value, index) => {
      if (index == i) {
        return onChangeValue.target.value;
      } else {
        return value;
      }
    });
    setVal(ans);
    // const inputdata = [...val];
    // inputdata[i] = onChangeValue.target.value;
    // setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deletVal = [...youtubeVideos];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  // console.log(val, "data-");
  // adding extra field for albums
  const [uploadAlbum, setAlbum] = useState([{ albumName: "", albumFile: [] }]);

  const handleuploadAlbum = () => {
    const abc = [...uploadAlbum, { albumName: "", albumFile: [] }];
    setAlbum(abc);
  };

  const handleClickChangeAlbum = (onChangeValue, i) => {
    const ans = uploadAlbum?.map((value, index) => {
      if (index == i) {
        return { ...value, albumName: onChangeValue.target.value };
      } else {
        return value;
      }
    });
    setAlbum(ans);
  };
  const handleAlbumChange = async ({ target }, i) => {
    const files = Array.from(target.files);
    const data = [];
    for (let index = 0; index < files.length; index++) {
      const file = await compressAndAppendFiles(files[index]);
      const { url } = await uploadToS3(file);
      console.log(url);
      data.push(url);
    }

    // var albumchange={albumName:e.target.files[0].name,albumFile:e.target.files[0]}
    // console.log(e.target.files)
    var allresult = uploadAlbum?.map((album1, index) => {
      // console.log(index,i,index==i,index===i)
      if (index == i) {
        setVendor;
        return { ...album1, albumFile: data };
      } else {
        return album1;
      }
    });
    // console.log(albumchange)
    console.log(allresult);
    setAlbum(allresult);
    // setAlbum([...uploadAlbum,e.target.files[0].name]);
    // setMyAlbum(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const handleDeleteAlbum = (i) => {
    const deleteAlbum = [...uploadAlbum];
    deleteAlbum.splice(i, 1);
    setAlbum(deleteAlbum);
  };

  // console.log(uploadAlbum, "data-");
  // adding extra field for vendors

  const [vender, setVendor] = useState([]);
  useEffect(() => {
    console.log(`🚀 ~ file: Admin.js:410 ~ useEffect ~ vender:`, vender);
  }, [vender]);
  const handleAddVendors = () => {
    const abc = [...vender, ""];
    setVendor(abc);
  };
  const handleClickChangeVendor = (onChangeValue, i) => {
    const ans = vender?.map((value, index) => {
      if (index == i) {
        return onChangeValue.target.value;
      } else {
        return value;
      }
    });
    setVendor(ans);
  };
  const handleDeleteVendor = (i) => {
    const deleteVendor = [...vender];
    deleteVendor.splice(i, 1);
    setVendor(deleteVendor);
  };
  // console.log(AddVendor, "data-");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ans = {
      ...values,
      uplodBanner: myImage,
      galaryImage: myGallary,
      youtubeVideos,
      uploadAlbum,
      vender,
    };
    // console.log(`🚀 ~ file: Admin.js:446 ~ handleSubmit ~ vender:`, vender);
    console.log("json format", ans);
    axios
      .post(`${PROXY}/admin/adminUpload`, ans)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        alert(`Real Wedding Saved`);
        dispatch(GetReadWedding());
      })
      .catch((err) => {
        console.log(err);
        alert(`${err.message}`);
        // setOpen(false);
      });
  };

  return (
    <ThemeProvider>
      <Layout>
        <Page title="Admin">
          {/* <FileInput onChange={handleImagesUpload} />
        <button onClick={openFileDialog}>Upload file</button> */}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}>
            <Typography variant="h4" gutterBottom>
              {/* <input
                  ref={images}
                  type="file"
                  onChange={handleImagesUpload}
                  accept={"image/*"}
                  multiple
                /> */}
            </Typography>
            <Button
              onClick={() => setOpen(true)}
              id="basic-button"
              startIcon={<Iconify icon="eva:plus-fill" />}>
              New Items
            </Button>
          </Stack>
          <div className="container">
            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={"paper"}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              sx={{ height: 750, marginTop: -5 }}>
              <DialogTitle id="scroll-dialog-title">Real Weddings</DialogTitle>

              <Grid sx={{ marginTop: -3 }}>
                <form onSubmit={handleSubmit}>
                  {/* <div>
              <FileInput onChange={handleFileChange} />
              <button onClick={openFileDialog}>Upload file</button>
              </div> */}
                  {/* <label className={Styles.label}> */}

                  {/* </label> */}

                  <Grid className="bannerName" container>
                    <Grid xs={12} sm={6} item>
                      <Typography
                        sx={{ marginLeft: 2, fontSize: 18, marginTop: 2 }}
                        color="text.dark"
                        variant="h5"
                        gutterBottom>
                        <p>Upload Banner</p>
                      </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      {/* <input
                          type="file"
                          name="file"
                          multiple={true}
                          onChange={handleImagesUpload}
                        />  */}

                      <TextField
                        required
                        id="outlined-required"
                        name=""
                        type="file"
                        inputProps={{
                          multiple: true,
                        }}
                        onChange={(e) => handlemyImagesUpload(e)}
                        autoFocus
                        placeholder="Banner Image"
                        sx={{ fontWeight: "fontWeightBold", width: "95%" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="details" sx={{ marginTop: 0.5 }}>
                    <Grid container>
                      <Grid xs={12} sm={6} item>
                        <TextField
                          required
                          id="outlined-required"
                          onChange={(e) => handleChange(e, "brideName")}
                          autoFocus
                          placeholder="Bride name"
                          sx={{
                            marginLeft: 2,
                            fontWeight: "fontWeightBold",
                            width: "90%",
                            height: 80,
                          }}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                        <TextField
                          required
                          id="outlined-required"
                          onChange={(e) => handleChange(e, "groomName")}
                          autoFocus
                          placeholder="Groom name"
                          sx={{
                            fontWeight: "fontWeightBold",
                            width: "95%",
                          }}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                        <TextField
                          required
                          id="outlined-required"
                          onChange={(e) => handleChange(e, "cityName")}
                          autoFocus
                          placeholder="city name"
                          sx={{
                            marginLeft: 2,
                            marginTop: -2,
                            fontWeight: "fontWeightBold",
                            width: "90%",
                          }}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        sm={5.7}
                        item
                        sx={{
                          marginTop: -2,
                          fontWeight: "fontWeightBold",
                          width: "90%",
                        }}>
                        {/* <TextField
                                required
                                id="outlined-required"
                                onChange={(e) => handleChange(e, "eventDate")}
                                autoFocus
                                
                                placeholder="Date of event"
                                sx={{ marginTop:-2, fontWeight: "fontWeightBold",width:"90%" }}
                              /> */}
                        {/* <div styles={{"height" : "100px", "width" : "100px"}}> */}
                        {/* <DatePicker renderInput={(params) => <TextField {...params} />} selected={startDate} sx={{ marginTop:-2, fontWeight: "fontWeightBold",width:"90%"  }} onChange={(date) =>{setStartDate(date);setValues({...values,["eventDate"]: date})}} /> */}
                        {/* </div> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack>
                            <DatePicker
                              disableFuture
                              // label="Responsive"
                              openTo="year"
                              views={["year", "month", "day"]}
                              value={startDate}
                              onChange={(date) => {
                                setStartDate(date);
                                setValues({ ...values, ["eventDate"]: date });
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid className="upload-video-image">
                      <Grid className="imageUpload" container>
                        <Grid xs={12} sm={6} item>
                          <Typography
                            sx={{ marginLeft: 2, fontSize: 14, marginTop: 2 }}
                            color="text.dark"
                            variant="h5"
                            gutterBottom>
                            <p>Upload Galary Images</p>
                          </Typography>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            required
                            id="outlined-required"
                            type="file"
                            inputProps={{
                              multiple: true,
                            }}
                            onChange={(e) => handlemyGallaryUpload(e)}
                            autoFocus
                            placeholder="Image Album"
                            sx={{
                              marginTop: 1,
                              fontWeight: "fontWeightBold",
                              width: "95%",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="upload-video-image">
                      <Grid container>
                        <Grid className="imageUpload" xs={12} sm={10} item>
                          <Typography
                            sx={{ marginLeft: 2, fontSize: 14, width: "90%" }}
                            color="text.dark"
                            gutterBottom>
                            Upload Album
                          </Typography>

                          <TextField
                            onChange={(e) => handleClickChangeAlbum(e, 0)}
                            required
                            placeholder="Album Name"
                            sx={{
                              marginLeft: 2,
                              marginTop: -1,
                              fontWeight: "fontWeightBold",
                              width: "95%",
                            }}
                          />
                          <TextField
                            required
                            id="outlined-required"
                            type="file"
                            inputProps={{
                              multiple: true,
                            }}
                            onChange={(e) => handleAlbumChange(e, 0)}
                            placeholder="Image Album"
                            sx={{
                              marginLeft: 2,
                              width: "95%",
                              fontWeight: "fontWeightBold",
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sm={2} item>
                          <Button onClick={() => handleuploadAlbum()}>
                            Add More Albums
                          </Button>
                        </Grid>
                      </Grid>
                      {uploadAlbum?.map((data, i) => {
                        if (i != 0) {
                          return (
                            <div key={i}>
                              <TextField
                                onChange={(e) => handleClickChangeAlbum(e, i)}
                                required
                                placeholder="Album Name"
                                sx={{
                                  marginLeft: 2,
                                  marginTop: 2,

                                  fontWeight: "fontWeightBold",
                                  width: "80%",
                                }}
                              />
                              <button
                                className={Styles.Button}
                                onClick={() => handleDeleteAlbum(i)}>
                                x
                              </button>
                              <TextField
                                required
                                id="outlined-required"
                                type="file"
                                inputProps={{
                                  multiple: true,
                                }}
                                onChange={(e) => handleAlbumChange(e, i)}
                                placeholder="Image Album"
                                sx={{
                                  marginLeft: 2,
                                  fontWeight: "fontWeightBold",
                                  width: "80%",
                                }}
                                style={{
                                  marginTop: "3%",
                                }}
                              />
                            </div>
                          );
                        }
                      })}
                    </Grid>
                    <Grid className="videoUpload">
                      <Typography
                        sx={{
                          marginLeft: 2,
                          marginTop: 1,
                          fontSize: 14,
                          width: "90%",
                        }}
                        color="text.dark"
                        gutterBottom>
                        Youtube Videos
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => handleClickChange(e, 0)}
                        type="url"
                        placeholder="https://www.youtube.com/wedcell"
                        sx={{
                          marginLeft: 2,
                          fontWeight: "fontWeightBold",
                          width: "80%",
                        }}
                      />
                      <Button onClick={() => handleAdd()}>Add More</Button>
                      {youtubeVideos?.map((data, i) => {
                        if (i != 0) {
                          return (
                            <div key={i}>
                              <TextField
                                onChange={(e) => handleClickChange(e, i)}
                                required
                                type="url"
                                placeholder="https://www.youtube.com/wedcell"
                                sx={{
                                  marginTop: 2,
                                  marginLeft: 2,
                                  fontWeight: "fontWeightBold",
                                  width: "80%",
                                }}
                              />
                              <button
                                className={Styles.Button}
                                styles={{ marginLeft: -4 }}
                                onClick={() => handleDelete(i)}>
                                x
                              </button>
                            </div>
                          );
                        }
                      })}
                    </Grid>

                    <Grid>
                      <Typography
                        sx={{
                          marginLeft: 2,
                          marginTop: 1,
                          fontSize: 14,
                          width: "90%",
                        }}
                        color="text.dark"
                        gutterBottom>
                        Vendors
                      </Typography>
                      <VendorSelect tags={vender} setTags={setVendor} />
                      {/* <p styles={{marginLeft:2}}>Vendors</p> */}
                      {/* <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => handleClickChangeVendor(e, 0)}
                        placeholder="Tag vender"
                        sx={{
                          marginLeft: 2,

                          fontWeight: "fontWeightBold",
                          width: "80%",
                        }}
                      />
                      <Button onClick={() => handleAddVendors()}>
                        Add More
                      </Button> */}
                      {/* {vender?.map((data, i) => {
                        if (i != 0) {
                          return (
                            <div key={i}>
                              <TextField
                                onChange={(e) => handleClickChangeVendor(e, i)}
                                required
                                placeholder="Tag Vendor"
                                sx={{
                                  marginTop: 2,
                                  marginLeft: 2,
                                  fontWeight: "fontWeightBold",
                                  width: "80%",
                                }}
                              />

                              <button
                                className={Styles.Button}
                                onClick={() => handleDeleteVendor(i)}
                              >
                                x
                              </button>
                            </div>
                          );
                        }
                      })} */}
                    </Grid>
                    <Button
                      className="btn"
                      variant="contained"
                      type="submit"
                      sx={{ marginTop: 2, marginLeft: 30 }}>
                      Submit New Item
                    </Button>
                  </Grid>
                </form>
              </Grid>

              <DialogActions></DialogActions>
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
                onClick={(e) => {
                  // onPopularUpdate(e.target.innerText)
                }}
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
                    rowCount={REALWEDDINGLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {filteredRealWedding
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row, key) => {
                        const {
                          _id,
                          uplodBanner,
                          brideName,
                          groomName,
                          cityName,
                          eventDate,
                          galaryImage,
                          uploadAlbum,
                          youtubeVideos,
                          vender,
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
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, _id)}
                              />
                            </TableCell>
                            <TableCell align="left">{_id}</TableCell>
                            <TableCell align="left">{brideName}</TableCell>
                            <TableCell align="left">{groomName}</TableCell>
                            <TableCell align="left">{cityName}</TableCell>
                            <TableCell align="left">{eventDate}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(true && "success") || "error"}>
                                {true ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label>
                                <Checkbox />
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              {uploadAlbum
                                ?.map((value, index) => value.albumName)
                                .join()}
                            </TableCell>
                            <TableCell align="left">
                              {vender
                                ?.map((value, index) => {
                                  // return value
                                  return value.name;
                                })
                                .join()}
                            </TableCell>
                            <TableCell align="right">
                              <UserMoreMenu
                                onDelete={() => onDelete(_id)}
                                onEdit={() => onEdit(_id)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  {isRealWeddingNotFound && (
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
                count={REALWEDDINGLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
            <br />
            <br />
            <br />
          </div>
        </Page>
      </Layout>
      <style jsx>{`
        .bannerName {
          margin-bottom: 10px;
        }
        p {
          color: blue;
        }
        .details {
          padding: 23px 2px;
        }
        #outlined-required {
          margin-bottom: 2px;
        }
        .btn {
          margin-top: 5px;
        }
        .videoUpload {
          padding-top: 10px;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default Admin;

{
  /* <Card>
              <UserListToolbar
                onClick={(e) => {
                  onPopularUpdate(e.target.innerText);
                }}
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEADV}
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
                      ?.map((row, key) => {
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
                      </TableCell> 
                            <TableCell align="left">{vendorId}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{category}</TableCell>
                            <TableCell align="left">{price}</TableCell>
                            <TableCell align="left">{city}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(popular && "success") || "error"}>
                                {popular ? "Yes" : "No"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Label>
                                <Checkbox />
                              </Label>
                            </TableCell>
                            <TableCell align="left">{contactEmail}</TableCell>
                            <TableCell align="left">{contactPhone}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu
                                onDelete={() => onDelete(_id)}
                                onEdit={() => onEdit(_id)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
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
            </Card> */
}
