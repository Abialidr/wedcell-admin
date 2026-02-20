import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import {
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ThemeProvider from "../../theme";
import { Upload } from "antd";
import { RiDeleteBin6Line, RiPlus } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import compressAndAppendFiles, {
  compressAndAppendFiles2,
} from "components/compressAndAppendFiles";
import axios from "axios";
import { PROXY } from "config";
import { CustomTabPanel, a11yProps } from "../MuiTabsCommon";
import { S3PROXY } from "config";
const uploadButton = (
  <div className={Styles.upload}>
    <FileUploadOutlinedIcon />
    <div>Upload</div>
  </div>
);
function InHouseDataGeneral({ name, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [form, setForm] = useState({
    Type: [{ name: "" }],
    Service: [{ name: "", type: "", price: 0, people: ["", ""] }],
    Images: [{ description: "", image: [] }],
    Video: [{ description: "", url: "" }],
    People: [""],
    IncludedService: [{ name: "", type: "", price: "" }],
    Link: {
      instagram: "",
      youtube: "",
      pintress: "",
      linkedin: "",
      facebook: "",
    },
  });
  const [fileListAlbum, setFileListAlbum] = useState([
    { name: "", images: [] },
  ]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const handleChangeAlbum = ({ fileList: newFileList, file }, key) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        fileListAlbum[key].value = newFileList;
        setFileListAlbum([...fileListAlbum]);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      fileListAlbum[key].value = newFileList;
      setFileListAlbum([...fileListAlbum]);
      albumImageDefault[key].value = data;

      setAlbumdefault([...albumImageDefault]);
    }
  };
  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url: `${S3PROXY}${url}`,
    };
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  useEffect(() => {
    (async () => {
      // .then((res) => {

      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      let resData = await axios.get(`${PROXY}/adminessentials/${type}`, config);
      resData = resData.data.data.data[0];
      let Images = [{ description: "", image: [] }];
      if (resData?.Images.length) {
        Images = resData?.Images.map((dat, key) => {
          let d = JSON.parse(JSON.stringify(dat));
          if (dat.image) {
            d.image = [
              {
                uid: key,
                status: "done",
                url: `${S3PROXY}${dat.image}`,
              },
            ];
          }
          return d;
        });
      }
      let Service = JSON.parse(JSON.stringify(resData?.Service));
      if (!resData?.People) {
        Service.forEach((data, key) => {
          const people = [["", 0]];
          Service[key].people = people;
        });
      }
      setForm({
        Images,
        Service: Service,
        Video: JSON.parse(JSON.stringify(resData?.Video)),
        Type: resData?.Type
          ? JSON.parse(JSON.stringify(resData?.Type))
          : [
              {
                name: "",
              },
            ],
        People: resData?.People
          ? JSON.parse(JSON.stringify(resData?.People))
          : [""],
        IncludedService: resData?.IncludedService
          ? JSON.parse(JSON.stringify(resData?.IncludedService))
          : [{ name: "", type: "", price: "" }],
        Link: resData?.Link
          ? JSON.parse(JSON.stringify(resData?.Link))
          : {
              instagram: "",
              youtube: "",
              pintress: "",
              linkedin: "",
              facebook: "",
            },
      });
      if (resData.albums?.length) {
        const album = [];
        const album2 = [];
        resData.albums.forEach((data) => {
          const al = {
            name: data.name,
            value: data.value.map((data2, key2) => {
              return setDefaultImages(data2, key2);
            }),
          };
          album.push(al);
          const al2 = {
            value: data.value.map((data2) => {
              return data2;
            }),
          };
          album2.push(al2);
        });
        setFileListAlbum(album);
        setAlbumdefault(album2);
      }
    })();
  }, []);

  // useEffect(() => {

  // }, [form]);

  const addHandler = async () => {
    try {
      // setUploading(true);

      const formData = new FormData();

      form.Video && formData.append("Video", JSON.stringify(form.Video));
      form.Service && formData.append("Service", JSON.stringify(form.Service));
      form.IncludedService &&
        formData.append(
          "IncludedService",
          JSON.stringify(form.IncludedService)
        );
      form.Type && formData.append("Type", JSON.stringify(form.Type));
      form.People && formData.append("People", JSON.stringify(form.People));
      form.Link && formData.append("Link", JSON.stringify(form.Link));
      // form.Album && formData.append("Album", JSON.stringify(form.Link));
      fileListAlbum && formData.append("album", JSON.stringify(fileListAlbum));
      formData.append("albumLink", JSON.stringify(albumImageDefault));

      const im = await Promise.all(
        form.Images.map(async (item, key) => {
          const i = JSON.parse(JSON.stringify(item));
          if (!item?.image[0]?.url) {
            await compressAndAppendFiles2(
              item?.image,
              formData,
              `galery${key}`,
              ""
            );
            delete i.image;
          } else {
            i.image = item.image[0].url;
          }
          return i;
        })
      );

      if (fileListAlbum) {
        await Promise.all(
          fileListAlbum.map(async (item, key) => {
            console.log(
              "🚀 ~ file: InHouseDataGeneral.js:222 ~ fileListAlbum.map ~ item:",
              item
            );
            await compressAndAppendFiles2(item.value, formData, `album${key}`);
          })
        );
      }
      im && formData.append("Images", JSON.stringify(im));
      formData.append("type", type);
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const result1 = await axios.put(
        `${PROXY}/adminessentials/inHouses/new`,
        formData,

        config
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={Styles.main}>
      <h1>{name}</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {[
            "Event type",
            "People",
            "Services",
            "Included Service",
            "Images",
            "Videos",
            "Link",
            "Albums",
          ].map((name, key) => {
            return <Tab label={name} {...a11yProps(key)} />;
          })}
        </Tabs>
      </Box>

      <div style={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Event Types
              <div
                onClick={() => {
                  const newArr = {
                    name: "",
                  };
                  const dummy = form;
                  dummy.Type.push(newArr);
                  dummy.Service;
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </div>
            </span>
            {form?.Type.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.Type[key].name = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.name}
                      label="Name"
                    />
                  </div>

                  {form?.Type.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.Type.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <>
            {" "}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              People
              <div
                onClick={() => {
                  const newArr = "";
                  const dummy = form;
                  dummy.People.push(newArr);
                  dummy.Service.forEach((data, key) => {
                    dummy.Service[key].people.push(["", 0]);
                  });
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </div>
            </span>
            {form?.People.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.People[key] = e.target.value;
                        dummy.Service.forEach((dataService, keyService) => {
                          dummy.Service[keyService].people[key][0] =
                            e.target.value;
                        });
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data}
                      label="Name"
                    />
                  </div>

                  {form?.People.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.People.splice(key, 1);
                        dummy.Service.forEach((dataService, keyService) => {
                          dummy.Service[keyService].people.splice(key, 1);
                        });
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Services
              <div
                onClick={() => {
                  const newArr = {
                    name: "",
                    price: 0,
                    type: "",
                    people: [
                      ...form.People.map((data) => {
                        return [data, 0];
                      }),
                    ],
                  };
                  const dummy = form;
                  dummy.Service.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </div>
            </span>
            {/* <div className='row mt-3 mb-3'> */}
            {form?.Service.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <TextField
                          fullWidth
                          onChange={(e) => {
                            const dummy = form;
                            dummy.Service[key].name = e.target.value;
                            setForm({ ...dummy });
                          }}
                          type="text"
                          value={data.name}
                          label="Name"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <Select
                          fullWidth
                          type="number"
                          value={data.type}
                          label="Type"
                          onChange={(e) => {
                            const dummy = form;
                            dummy.Service[key].type = e.target.value;
                            setForm({ ...dummy });
                          }}
                        >
                          {form.Type.map((data) => {
                            return (
                              <MenuItem value={data.name}>{data.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <TextField
                          fullWidth
                          onChange={(e) => {
                            const dummy = form;
                            dummy.Service[key].price = e.target.value;
                            setForm({ ...dummy });
                          }}
                          type="number"
                          value={data.price}
                          label="Price"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {data.people.map((dataPeople, keyPeople) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "50%" }}>
                              <br></br>
                              <TextField
                                fullWidth
                                onChange={(e) => {
                                  const dummy = form;
                                  dummy.Service[key].people[keyPeople][1] =
                                    e.target.value;
                                  setForm({
                                    ...dummy,
                                  });
                                }}
                                type="number"
                                value={dataPeople[1]}
                                label={dataPeople[0]}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {form?.Service.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.Service.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Included Services
              <div
                onClick={() => {
                  const newArr = {
                    name: "",
                    type: "",
                    price: "",
                  };
                  const dummy = form;
                  dummy.IncludedService.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </div>
            </span>
            {form?.IncludedService?.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <TextField
                          fullWidth
                          onChange={(e) => {
                            const dummy = form;
                            dummy.IncludedService[key].name = e.target.value;
                            setForm({ ...dummy });
                          }}
                          type="text"
                          value={data.name}
                          label="Name"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <Select
                          fullWidth
                          type="number"
                          value={data.type}
                          label="Type"
                          onChange={(e) => {
                            const dummy = form;
                            dummy.IncludedService[key].type = e.target.value;
                            setForm({ ...dummy });
                          }}
                        >
                          {form.Type.map((data) => {
                            return (
                              <MenuItem value={data.name}>{data.name}</MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                      <div style={{ width: "50%" }}>
                        <br></br>
                        <TextField
                          fullWidth
                          onChange={(e) => {
                            const dummy = form;
                            dummy.IncludedService[key].price = e.target.value;
                            setForm({ ...dummy });
                          }}
                          type="text"
                          value={data.price}
                          label="Price"
                        />
                      </div>
                    </div>
                  </div>
                  {form?.IncludedService.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.IncludedService.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Images
              <div
                className={Styles.plus}
                onClick={() => {
                  const newArr = {
                    description: "",
                    image: [],
                  };
                  const dummy = form;
                  dummy.Images.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </div>
            </span>
            {/* <div className='row mt-3 mb-3'> */}
            {form?.Images.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.Images[key].description = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.description}
                      label="description"
                    />
                  </div>
                  <div>
                    <br></br>
                    <Upload
                      listType="picture-card"
                      fileList={data.image}
                      onPreview={handlePreview}
                      onChange={({ fileList: newFileList, file }) => {
                        const dummy = form;
                        dummy.Images[key].image = newFileList;
                        setForm({ ...dummy });
                      }}
                    >
                      {data.image?.length ? null : uploadButton}
                    </Upload>
                  </div>
                  {form?.Images.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.Images.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
          <>
            {" "}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Youtube Video
              <span
                className={Styles.plus}
                onClick={() => {
                  const newArr = {
                    description: "",
                    url: "",
                  };
                  const dummy = form;
                  dummy.Video.push(newArr);
                  setForm({ ...dummy });
                }}
              >
                <CiCirclePlus />
              </span>
            </span>
            {/* <div className='row mt-3 mb-3'> */}
            {form?.Video.map((data, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.Video[key].description = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.description}
                      label="description"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <br></br>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const dummy = form;
                        dummy.Video[key].url = e.target.value;
                        setForm({ ...dummy });
                      }}
                      type="text"
                      value={data.url}
                      label="URL"
                    />
                  </div>

                  {form?.Video.length > 1 ? (
                    <span
                      onClick={() => {
                        const dummy = form;
                        dummy.Video.splice(key, 1);
                        setForm({ ...dummy });
                      }}
                      className="fs-5 cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={6}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Links
            </span>
            <TextField
              fullWidth
              onChange={(e) => {
                const dummy = form;
                dummy.Link.instagram = e.target.value;
                setForm({ ...dummy });
              }}
              type="text"
              value={form.Link.instagram}
              label="Instgram"
              style={{ paddingBottom: "10px" }}
            />{" "}
            <TextField
              fullWidth
              onChange={(e) => {
                const dummy = form;
                dummy.Link.facebook = e.target.value;
                setForm({ ...dummy });
              }}
              type="text"
              value={form.Link.facebook}
              label="Facebook"
              style={{ paddingBottom: "10px" }}
            />{" "}
            <TextField
              fullWidth
              onChange={(e) => {
                const dummy = form;
                dummy.Link.linkedin = e.target.value;
                setForm({ ...dummy });
              }}
              type="text"
              value={form.Link.linkedin}
              label="Linkedin"
              style={{ paddingBottom: "10px" }}
            />{" "}
            <TextField
              fullWidth
              onChange={(e) => {
                const dummy = form;
                dummy.Link.pintress = e.target.value;
                setForm({ ...dummy });
              }}
              type="text"
              value={form.Link.pintress}
              label="Pintress"
              style={{ paddingBottom: "10px" }}
            />{" "}
            <TextField
              fullWidth
              onChange={(e) => {
                const dummy = form;
                dummy.Link.youtube = e.target.value;
                setForm({ ...dummy });
              }}
              type="text"
              value={form.Link.youtube}
              label="Youtube"
              style={{ paddingBottom: "10px" }}
            />
          </>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className={Styles.label}
            >
              Albums
              <span
                className={Styles.plus}
                onClick={() => {
                  const newitem = { name: "", value: [] };
                  setFileListAlbum((old) => [...old, newitem]);
                }}
              >
                <CiCirclePlus />
              </span>
            </span>
            <br></br>
            <div className="row">
              {fileListAlbum.map((album, key) => (
                <div key={key}>
                  <div className="row mt-1 mb-3">
                    <div className="col-11">
                      <TextField
                        fullWidth
                        type="text"
                        onChange={onChangeAlbumHandler(key)}
                        label="Album name"
                        value={album.name}
                      />
                    </div>
                    <div className="col-1" style={{ marginTop: 10 }}>
                      {fileListAlbum.length > 1 && (
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
                          <RiDeleteBin6Line />
                        </span>
                      )}
                    </div>
                  </div>
                  <Upload
                    multiple
                    listType="picture-card"
                    fileList={fileListAlbum[key]?.value}
                    onPreview={handlePreview}
                    onChange={(e) => handleChangeAlbum(e, key)}
                  >
                    {uploadButton}
                  </Upload>
                </div>
              ))}
            </div>
          </>
        </CustomTabPanel>
      </div>
      <Button
        type="submit"
        style={{
          marginTop: "20px",
          fontSize: "20px",
          padding: "20px",
          width: "30%",
        }}
        onClick={addHandler}
      >
        <Typography>Submit</Typography>
      </Button>
    </div>
  );
}

export default InHouseDataGeneral;
