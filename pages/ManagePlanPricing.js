import { useEffect, useState } from "react";
// material
import {
  Button,
  Container,
  Typography,
  FormControl,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Page from "../components/Page";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Styles from "../styles/adminEsentials.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ThemeProvider from "../theme";
import Layout from "../layouts/dashboard";
import axios from "axios";
import { PROXY, S3PROXY } from "../config";
import { PlusOutlined } from "@ant-design/icons";
import Makeupdata from "../components/InhouseDatas/Makeupdata";
import DecorData from "../components/InhouseDatas/DecorData";
import WeddingData from "../components/InhouseDatas/WeddingData";
import MehendiData from "../components/InhouseDatas/MehendiData";
import PhotographData from "../components/InhouseDatas/PhotographData";
import InHouseDataGeneral from "../components/InhouseDatas/InHouseDataGeneral";
import compressAndAppendFiles from "components/compressAndAppendFiles";
import { a11yProps, CustomTabPanel } from "../components/MuiTabsCommon";
import compressAndAppendFilesSingle from "components/compressAndAppendFilesSingle";

export default function Test() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeAlbum = ({ fileList: newFileList, file }, key, type) => {
    switch (type) {
      case "desktop":
        fileListAlbum[key].desktop = newFileList;
        break;
      case "laptop":
        fileListAlbum[key].laptop = newFileList;
        break;
      case "tablet":
        fileListAlbum[key].tablet = newFileList;
        break;
      case "mobile":
        fileListAlbum[key].mobile = newFileList;
        break;
    }
    setFileListAlbum([...fileListAlbum]);
  };

  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].link = e.target.value;
    setFileListAlbum(newArr);
  };
  const onChangeAlbumH1Handler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].h1 = e.target.value;
    setFileListAlbum(newArr);
  };
  const onChangeAlbumH2Handler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].h2 = e.target.value;
    setFileListAlbum(newArr);
  };
  const onChangeAlbumYLHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].youtubelink = e.target.value;
    setFileListAlbum(newArr);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const [form1, setForm1] = useState({
    // _id: getadmin?._id,
    DesktopImage: "",
    venuesDescruption: "",
    decoreDescruption: "",
    photographerDescruption: "",
    makeupDescruption: "",
    weddingpannerDescruption: "",
    mehendiDescruption: "",
  });
  const [fileListAlbum, setFileListAlbum] = useState([
    {
      link: "",
      h1: "",
      h2: "",
      youtubelink: "",
      mobile: [],
      desktop: [],
      laptop: [],
      tablet: [],
    },
  ]);
  const getAdminEssen = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const result = await axios.get(`${PROXY}/adminessentials`, config);
    // const result1 = await axios.get(`${PROXY}/inviteImg/getAdmin`);
    // if (result1?.data?.data?.length) {
    //   console.log(
    //     `🚀 ~ file: ManagePlanPricing.js:102 ~ getAdminEssen ~ result1:`,
    //     result1?.data?.data
    //   );
    //   const data = result1?.data?.data?.map((url, uid) => {
    //     return url.dataurl;
    //   });
    //   setImages3(data);
    //   setImagesLink3(setDefaultImages1(data));
    // }
    // setgetAdmin(result.data.data);
    setForm1({
      ...form1,
      venuesDescruption: result.data.data?.venuesDescruption,
      decoreDescruption: result.data.data?.decoreDescruption,
      photographerDescruption: result.data.data?.photographerDescruption,
      makeupDescruption: result.data.data?.makeupDescruption,
      weddingpannerDescruption: result.data.data?.weddingpannerDescruption,
      mehendiDescruption: result.data.data?.mehendiDescruption,
    });
    console.log(
      `🚀 ~ file: Test.js:93 ~ getAdminEssen ~ result.data.data.DesktopImage:`,
      result.data.data.DesktopImage
    );
    const files = result.data.data.DesktopImage.map((files) => {
      files.mobile = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${S3PROXY}${files.mobile}`,
        },
      ];
      files.tablet = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${S3PROXY}${files.tablet}`,
        },
      ];
      files.laptop = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${S3PROXY}${files.laptop}`,
        },
      ];
      files.desktop = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${S3PROXY}${files.desktop}`,
        },
      ];
      return files;
    });
    setFileListAlbum([...files]);
  };
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    getAdminEssen();
  }, [isUpdated]);

  const updateEssen = async () => {
    const formdata = new FormData();

    const checkAlbum = 0;
    fileListAlbum.forEach((data) => {
      if (
        !data.link ||
        !data.desktop ||
        !data.mobile ||
        !data.tablet ||
        !data.laptop
      ) {
        checkAlbum = 1;
      }
    });

    if (checkAlbum) {
      alert("Check all albums are filled");
    }
    const images = await Promise.all(
      fileListAlbum.map(async (data, key) => {
        console.log(
          "🚀 ~ file: ManagePlanPricing.js:208 ~ fileListAlbum.map ~ data:",
          data
        );
        if (data.desktop[0].url) {
          data.desktop = data.desktop[0].url;
        } else {
          const CompressImg = await compressAndAppendFilesSingle(
            data.desktop[0].originFileObj
          );
          formdata.append(`desktop${key}`, CompressImg);
          data.desktop = "";
        }

        if (data.laptop[0].url) {
          data.laptop = data.laptop[0].url;
        } else {
          const CompressImg = await compressAndAppendFilesSingle(
            data.laptop[0].originFileObj
          );
          formdata.append(`laptop${key}`, CompressImg);
          data.laptop = "";
        }

        if (data.tablet[0].url) {
          data.tablet = data.tablet[0].url;
        } else {
          const CompressImg = await compressAndAppendFilesSingle(
            data.tablet[0].originFileObj
          );
          formdata.append(`tablet${key}`, CompressImg);
          data.tablet = "";
        }

        if (data.mobile[0].url) {
          data.mobile = data.mobile[0].url;
        } else {
          const CompressImg = await compressAndAppendFilesSingle(
            data.mobile[0].originFileObj
          );
          formdata.append(`mobile${key}`, CompressImg);
          data.mobile = "";
        }

        return data;
      })
    );
    formdata.append("images", JSON.stringify(images));
    form1.venuesDescruption &&
      formdata.append("venuesDescruption", form1.venuesDescruption);
    form1.decoreDescruption &&
      formdata.append("decoreDescruption", form1.decoreDescruption);
    form1.photographerDescruption &&
      formdata.append("photographerDescruption", form1.photographerDescruption);
    form1.makeupDescruption &&
      formdata.append("makeupDescruption", form1.makeupDescruption);
    form1.weddingpannerDescruption &&
      formdata.append(
        "weddingpannerDescruption",
        form1.weddingpannerDescruption
      );
    form1.mehendiDescruption &&
      formdata.append("mehendiDescruption", form1.mehendiDescruption);
    const formData1 = new FormData();
    // form1._id && formdata.append('_id', form1._id);

    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const resu = await axios.put(`${PROXY}/inviteImg/uploadAdmin`, formData1);
    console.log(
      `🚀 ~ file: ManagePlanPricing.js:249 ~ updateEssen ~ resu:`,
      resu
    );
    if (
      !form1.venuesDescruption ||
      !form1.decoreDescruption ||
      !form1.photographerDescruption ||
      !form1.makeupDescruption ||
      !form1.weddingpannerDescruption ||
      !form1.mehendiDescruption
    ) {
      alert("Fill All Data");
    } else {
      const resu = await axios.put(
        `${PROXY}/adminessentials`,
        formdata,
        config
      );
      if (resu.data.success) {
        // window.location.reload();
      }
    }
  };
  useEffect(() => {
    console.log(
      `🚀 ~ file: Test.js:169 ~ Test ~ fileListAlbum:`,
      fileListAlbum.length
    );
  }, [fileListAlbum]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  return (
    <ThemeProvider>
      <Layout>
        <Page title="Venues">
          <Container>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginBottom: "10px" }}
            >
              Manage Plan Pricing
            </Typography>
            <hr style={{ marginBottom: "40px" }} />
            <FormControl fullWidth>
              {/* <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "15px",
                }}>
                <Typography
                  style={{
                    display: "flex",
                    width: "23%",
                    // paddingLeft: '18px',
                  }}>
                  Upload Invites Images
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "30px",
                }}>
                <div className="row">
                  <ImgCrop rotationSlider aspect={1 / 1}>
                    <Upload
                      multiple
                      listType="picture-card"
                      fileList={images3}
                      onChange={handleChangeImages3}>
                      {uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>
              </div> */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "0px",
                }}
              >
                <Typography
                  style={{
                    display: "flex",
                    width: "23%",
                    // paddingLeft: '18px',
                  }}
                >
                  Upload Main Images
                  {fileListAlbum.length < 10 ? (
                    <span
                      onClick={() => {
                        const newitem = {
                          link: "",
                          desktop: [],
                          laptop: [],
                          tablet: [],
                          mobile: [],
                        };
                        setFileListAlbum((old) => [...old, newitem]);
                      }}
                      className="fs-5 cursor-pointer"
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      +
                    </span>
                  ) : (
                    <></>
                  )}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div className="row">
                  {fileListAlbum.map((album, key) => (
                    <div key={key}>
                      <div className="row mt-3 mb-3" style={{ width: "500px" }}>
                        <div className="col-md-8">
                          <label>Link</label>
                          <input
                            type="text"
                            onChange={onChangeAlbumHandler(key)}
                            placeholder="Album Link"
                            className={Styles.phone_tag}
                            value={album.link}
                          />
                        </div>
                        <div className="col-md-8">
                          <label>Header 1</label>

                          <input
                            type="text"
                            onChange={onChangeAlbumH1Handler(key)}
                            placeholder="Header 1"
                            className={Styles.phone_tag}
                            value={album.h1}
                          />
                        </div>
                        <div className="col-md-8">
                          <label>Header 2</label>

                          <input
                            type="text"
                            onChange={onChangeAlbumH2Handler(key)}
                            placeholder="Header 2"
                            className={Styles.phone_tag}
                            value={album.h2}
                          />
                        </div>
                        <div className="col-md-8">
                          <label>Youtube Link</label>

                          <input
                            type="text"
                            onChange={onChangeAlbumYLHandler(key)}
                            placeholder="Youtube Link"
                            className={Styles.phone_tag}
                            value={album.youtubelink}
                          />
                        </div>
                        <div className="col-md-4" style={{ marginTop: 10 }}>
                          {fileListAlbum.length > 1 ? (
                            <span
                              onClick={() => {
                                const newarr = [...fileListAlbum];
                                const newarr2 = [...albumImageDefault];
                                newarr.splice(key, 1);
                                newarr2.splice(key, 1);
                                setFileListAlbum(newarr);
                                setAlbumdefault(newarr2);
                              }}
                              className="fs-5 cursor-pointer"
                            >
                              <DeleteIcon />
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{
                            display: "flex",
                            width: "23%",
                          }}
                        >
                          Desktop
                        </Typography>
                        <ImgCrop rotationSlider aspect={21 / 5}>
                          <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileListAlbum[key]?.desktop}
                            onChange={(e) =>
                              handleChangeAlbum(e, key, "desktop")
                            }
                          >
                            {fileListAlbum[key]?.desktop.length === 0 &&
                              uploadButton}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{
                            display: "flex",
                            width: "23%",
                          }}
                        >
                          Laptop
                        </Typography>
                        <ImgCrop rotationSlider aspect={21 / 7}>
                          <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileListAlbum[key]?.laptop}
                            onChange={(e) =>
                              handleChangeAlbum(e, key, "laptop")
                            }
                          >
                            {fileListAlbum[key]?.laptop.length === 0 &&
                              uploadButton}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{
                            display: "flex",
                            width: "23%",
                          }}
                        >
                          Tablet
                        </Typography>
                        <ImgCrop rotationSlider aspect={21 / 9}>
                          <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileListAlbum[key]?.tablet}
                            onChange={(e) =>
                              handleChangeAlbum(e, key, "tablet")
                            }
                          >
                            {fileListAlbum[key]?.tablet.length === 0 &&
                              uploadButton}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{
                            display: "flex",
                            width: "23%",
                          }}
                        >
                          Mobile
                        </Typography>
                        <ImgCrop rotationSlider aspect={21 / 11}>
                          <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileListAlbum[key]?.mobile}
                            onChange={(e) =>
                              handleChangeAlbum(e, key, "mobile")
                            }
                          >
                            {fileListAlbum[key]?.mobile.length === 0 &&
                              uploadButton}
                          </Upload>
                        </ImgCrop>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <Grid container spacing={3}> */}

              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Venue</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.venuesDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          venuesDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Decor</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.decoreDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          decoreDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Photography</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.photographerDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          photographerDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Makeup</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.makeupDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          makeupDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Wedding Planner</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.weddingpannerDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          weddingpannerDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Typography>Mehandi</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <TextField
                      value={form1?.mehendiDescruption}
                      onChange={(e) =>
                        setForm1({
                          ...form1,
                          mehendiDescruption: e.target.value,
                        })
                      }
                      label="Description"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                      padding: "20px",
                      width: "30%",
                    }}
                    onClick={updateEssen}
                  >
                    <Typography>Submit</Typography>
                  </Button>
                </div>
                <hr />

                {/* <Makeupdata></Makeupdata>
                <DecorData></DecorData>
                <WeddingData></WeddingData>
                <MehendiData></MehendiData>
                <PhotographData></PhotographData> */}

                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    {[
                      {
                        name: "Photography",
                        type: "photography",
                      },
                      {
                        name: "Mehendi",
                        type: "mehendi",
                      },
                      // {
                      //   name: "Wedding Planner",
                      //   type: "wedding",
                      // },
                      // {
                      //   name: "Decore",
                      //   type: "decore",
                      // },
                      {
                        name: "Make-up",
                        type: "makeup",
                      },
                      {
                        name: "Dhol",
                        type: "dhol",
                      },
                    ].map(({ name, type }, key) => {
                      return <Tab label={name} {...a11yProps(key)} />;
                    })}
                  </Tabs>
                </Box>
                {[
                  {
                    name: "Photography",
                    type: "photography",
                  },
                  {
                    name: "Mehendi",
                    type: "mehendi",
                  },
                  // {
                  //   name: "Wedding Planner",
                  //   type: "wedding",
                  // },
                  // {
                  //   name: "Decore",
                  //   type: "decore",
                  // },
                  {
                    name: "Make-up",
                    type: "makeup",
                  },
                  {
                    name: "Dhol",
                    type: "dhol",
                  },
                ].map(({ name, type }, key) => {
                  return (
                    <CustomTabPanel value={value} index={key}>
                      <InHouseDataGeneral name={name} type={type} />;
                    </CustomTabPanel>
                  );
                })}
              </Container>
            </FormControl>
            {/* </Grid> */}
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}

// <Container>
//   <Stack
//     direction="row"
//     alignItems="center"
//     justifyContent="space-between"
//     mb={5}
//   >
//     <Typography variant="h4" gutterBottom>
//       Venues
//     </Typography>
//     <Button
//       onClick={handleClickOpen()}
//       id="basic-button"
//       startIcon={<Iconify icon="eva:plus-fill" />}
//     >
//       New Venue
//     </Button>
//   </Stack>

//   <Dialog
//     open={open}
//     onClose={handleClickClose}
//     scroll={"paper"}
//     aria-labelledby="scroll-dialog-title"
//     aria-describedby="scroll-dialog-description"
//   >
//     <DialogTitle id="scroll-dialog-title">Add Venues</DialogTitle>
//     <DialogContent dividers={true}>
//       <DialogContentText
//         id="scroll-dialog-description"
//         ref={descriptionElementRef}
//         tabIndex={-1}
//       >
//         <div>
//           <Grid>
//             {/* <form> */}
//             {myImage && myImageName ? (
//               <Card
//                 sx={{
//                   width: 200,
//                   height: "auto",
//                   margin: "auto",
//                   marginBottom: 3,
//                 }}
//               >
//                 <>
//                   <Image
//                     src={myImage}
//                     style={{
//                       width: 200,
//                       height: 150,
//                       cursor: "pointer",
//                     }}
//                   />
//                   <>
//                     <Typography
//                       style={{
//                         textAlign: "center",
//                       }}
//                     >
//                       {myImageName}
//                     </Typography>
//                     <IconButton
//                       onClick={() => {
//                         setMyImage("");
//                         setMyImageName("");
//                       }}
//                       style={{
//                         color: "red",
//                         left: 85,
//                       }}
//                       aria-label="delete"
//                       size="small"
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </>
//                 </>
//               </Card>
//             ) : (
//               <Grid
//                 xs={12}
//                 sx={{
//                   backgroundColor: "#f7f7f7",
//                   padding: 1,
//                   margin: "auto",
//                   width: 200,
//                   height: 150,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   display: "flex",
//                   flexDirection: "column",
//                   cursor: "pointer",
//                   marginBottom: 3,
//                   borderWidth: 1,
//                   borderStyle: "dashed",
//                 }}
//                 onClick={handleUploadClick}
//               >
//                 <input
//                   id="file"
//                   ref={imageInput}
//                   onChange={handleUploadChange}
//                   type={"file"}
//                   accept="image/*"
//                   style={{
//                     display: "none",
//                   }}
//                 />
//                 <Iconify
//                   sx={{
//                     color: "#2065D1",
//                   }}
//                   icon="entypo:upload-to-cloud"
//                   width={50}
//                   height={50}
//                 />
//                 <Typography sx={{ color: "text.secondary" }}>
//                   Upload image
//                 </Typography>
//               </Grid>
//             )}
//             <Grid container spacing={2}>
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({ ...form, vendorId: e.target.value });
//                     setError({ ...error, vendorId: "" });
//                   }}
//                   placeholder="Enter Vendor Id"
//                   label="Vendor Id"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 {error.vendorId && error.vendorId.length && (
//                   <Alert severity="error">{error.vendorId}</Alert>
//                 )}
//               </Grid>
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({ ...form, name: e.target.value });
//                     setError({ ...error, name: "" });
//                   }}
//                   placeholder="Enter Name"
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 {error.name && error.name.length && (
//                   <Alert severity="error">{error.name}</Alert>
//                 )}
//               </Grid>
//               {/* <Grid xs={12} sm={6} item>
//                   <TextField onChange={(e) => {
//                     setForm({ ...form, title: e.target.value })
//                   }} placeholder="Enter Title" label="Title" variant="outlined" fullWidth />
//                 </Grid> */}
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   select
//                   label="Category"
//                   value={form.category || ""}
//                   onChange={(e) => {
//                     setForm({ ...form, category: e.target.value });
//                   }}
//                   placeholder="Select Category"
//                   sx={{
//                     width: "100%",
//                   }}
//                 >
//                   {CategotiesListVenue.map((item, key) => (
//                     <MenuItem key={key} value={item.name}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               {/* <Grid xs={12} sm={6} item>
//                   <TextField onChange={(e) => {
//                       setForm({ ...form, rank: e.target.value })
//                     }} type="number" placeholder="Enter Rank" label="Rank" variant="outlined" fullWidth />
//                 </Grid> */}
//               {/* <Grid xs={12} item>
//                   <TextField
//                     select
//                     label="Status"
//                     //   value={currency}
//                     //   onChange={handleChange}
//                     placeholder="Select Status"
//                     sx={{
//                       width: '100%',
//                     }}
//                   >

//                     <MenuItem value={"Active"}>
//                       {"Active"}
//                     </MenuItem>
//                     <MenuItem value={"InActive"}>
//                       {"InActive"}
//                     </MenuItem>
//                   </TextField>
//                 </Grid> */}
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({ ...form, price: e.target.value });
//                   }}
//                   placeholder="Price"
//                   label="Price"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               {/* <Grid xs={12} sm={6} item>
//                 <TextField onChange={(e) => {
//                   setForm({ ...form, city: e.target.value })
//                 }} placeholder="City" label="City" variant="outlined" fullWidth />
//               </Grid> */}
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   select
//                   label="City"
//                   value={form.city || ""}
//                   onChange={(e) => {
//                     setForm({ ...form, city: e.target.value });
//                   }}
//                   placeholder="Select City"
//                   sx={{
//                     width: "100%",
//                   }}
//                 >
//                   {cities.map((item, key) => (
//                     <MenuItem key={key} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({ ...form, state: e.target.value });
//                   }}
//                   placeholder="State"
//                   label="State"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({
//                       ...form,
//                       contactEmail: e.target.value,
//                     });
//                   }}
//                   placeholder="Contact Email"
//                   label="Contact Email"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid xs={12} sm={6} item>
//                 <TextField
//                   onChange={(e) => {
//                     setForm({
//                       ...form,
//                       contactPhone: e.target.value,
//                     });
//                   }}
//                   placeholder="Contact Phone"
//                   label="Contact Phone"
//                   variant="outlined"
//                   fullWidth
//                 />
//               </Grid>
//               {/* <Grid xs={12} sm={6} item>
//                   <TextField label="Link Url" placeholder="Enter Link Url" variant="outlined" fullWidth />
//                 </Grid>
//                 <Grid xs={12} sm={6} item>
//                   <TextField label="Seo Title" placeholder="Enter Seo Title" variant="outlined" fullWidth />
//                 </Grid>
//                 <Grid xs={12} sm={6} item>
//                   <TextField label="Seo Keywords" multiline rows={3} placeholder="Enter Seo Keywords" variant="outlined" fullWidth />
//                 </Grid>
//                 <Grid xs={12} sm={6} item>
//                   <TextField label="Seo Description" multiline rows={3} placeholder="Enter Seo Seo Description" variant="outlined" fullWidth />
//                 </Grid>
//                 <Grid xs={12}
//                   style={{
//                     marginLeft: 16,
//                     marginTop: 15,
//                   }}
//                 >
//                   <JoditEditor
//                     ref={editor}
//                     value={content}
//                     config={config}
//                     tabIndex={1} // tabIndex of textarea
//                     onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                     onChange={(newContent) => {
//                       console.log(newContent);
//                     }}
//                   />
//                 </Grid> */}
//             </Grid>
//             {/* </form> */}
//           </Grid>
//         </div>
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClickClose}>Cancel</Button>
//       <Button onClick={onAdd}>Save</Button>
//     </DialogActions>
//   </Dialog>

//   {snackBarMessage && snackBarType && snackBarMessage.length && (
//     <Snackbar
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={true}
//     >
//       <Alert
//         color={snackBarType}
//         severity={snackBarType}
//         sx={{ width: "100%" }}
//       >
//         {snackBarMessage}
//       </Alert>
//     </Snackbar>
//   )}

//   <Card>
//     <UserListToolbar
//       onClick={(e) => {
//         onPopularUpdate(e.target.innerText);
//       }}
//       onClick1={(e) => {
//         onIsAllowedUpdate(e.target.innerText);
//       }}
//       onClick2={(e) => {
//         onIsDeleted(e.target.innerText);
//       }}
//       onClick3={(e) => {
//         onExclusiveUpdate(e.target.innerText);
//       }}
//       numSelected={selected.length}
//       filterName={filterName}
//       onFilterName={handleFilterByName}
//     />

//     <TableContainer sx={{ minWidth: 800 }}>
//       <Table>
//         <UserListHead
//           order={order}
//           orderBy={orderBy}
//           headLabel={TABLE_HEAD}
//           rowCount={USERLIST.length}
//           numSelected={selected.length}
//           onRequestSort={handleRequestSort}
//           onSelectAllClick={handleSelectAllClick}
//         />
//         <TableBody>
//           {filteredUsers
//             .slice(
//               page * rowsPerPage,
//               page * rowsPerPage + rowsPerPage
//             )
//             .map((row, key) => {
//               const {
//                 _id,
//                 vendorId,
//                 name,
//                 category,
//                 price,
//                 city,
//                 popular,
//                 exclusive,
//                 contactEmail,
//                 contactPhone,
//               } = row;
//               const isItemSelected = selected.indexOf(_id) !== -1;

//               return (
//                 <TableRow
//                   hover
//                   key={key}
//                   tabIndex={-1}
//                   role="checkbox"
//                   selected={isItemSelected}
//                   aria-checked={isItemSelected}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       checked={isItemSelected}
//                       onChange={(event) => handleClick(event, _id)}
//                     />
//                   </TableCell>
//                   {/* <TableCell component="th" scope="row" padding="none">
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Typography variant="subtitle2" noWrap>
//                   {name}
//                 </Typography>
//               </Stack>
//             </TableCell> */}
//                   <TableCell align="left">{vendorId}</TableCell>
//                   <TableCell align="left">{name}</TableCell>
//                   <TableCell align="left">{category}</TableCell>
//                   <TableCell align="left">{price}</TableCell>
//                   <TableCell align="left">{city}</TableCell>
//                   <TableCell align="left">
//                     <Label
//                       variant="ghost"
//                       color={(popular && "success") || "error"}
//                     >
//                       {popular ? "Yes" : "No"}
//                     </Label>
//                   </TableCell>
//                   <TableCell align="left">
//                     <Label
//                       variant="ghost"
//                       color={(exclusive && "success") || "error"}
//                     >
//                       {exclusive ? "Yes" : "No"}
//                     </Label>
//                   </TableCell>
//                   <TableCell align="left">
//                     <Label
//                       variant="ghost"
//                       color={
//                         (row?.is_approved && "success") || "error"
//                       }
//                     >
//                       {row?.is_approved ? "Yes" : "No"}
//                     </Label>
//                   </TableCell>
//                   <TableCell align="left">
//                     <Label
//                       variant="ghost"
//                       color={(row?.is_delete && "success") || "error"}
//                     >
//                       {row?.is_delete ? "Yes" : "No"}
//                     </Label>
//                   </TableCell>
//                   <TableCell align="left">
//                     <Label>
//                       <Checkbox />
//                     </Label>
//                   </TableCell>
//                   <TableCell align="left">{contactEmail}</TableCell>
//                   <TableCell align="left">{contactPhone}</TableCell>
//                   {/* <TableCell align='right'>
//                     <UserMoreMenu
//                       onDelete={() => onDelete(_id)}
//                       onEdit={() => onEdit(_id)}
//                     />
//                   </TableCell> */}
//                   <TableCell>
//                     <div
//                       onClick={() =>
//                         router.push(`reviews1/${row?._id}`)
//                       }
//                       style={{
//                         marginTop: "9px",
//                         marginRight: "3px",
//                       }}
//                     >
//                       <ReviewsIcon color="primary" />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           {/* {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )} */}
//         </TableBody>

//         {isUserNotFound && (
//           <TableBody>
//             <TableRow>
//               <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                 <SearchNotFound searchQuery={filterName} />
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         )}
//       </Table>
//     </TableContainer>

//     <TablePagination
//       rowsPerPageOptions={[5, 10, 25]}
//       component="div"
//       count={USERLIST.length}
//       rowsPerPage={rowsPerPage}
//       page={page}
//       onPageChange={handleChangePage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//   </Card>
// </Container>
