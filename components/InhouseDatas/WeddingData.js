import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  FormControl,
  Alert,
} from "@mui/material";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { PROXY } from "../../config";
import compressAndAppendFilesMultiple from "components/compressAndAppendFilesMultiple";

export default function WeddingData() {
  const [data, setdata] = useState();
  const [update, setupdate] = useState(false);

  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [imagesLink1, setImagesLink1] = useState([]);
  const [imagesLink2, setImagesLink2] = useState([]);
  const [imagesLink3, setImagesLink3] = useState([]);
  const setDefaultImages1 = (data) => data?.map((data) => data?.url);
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: "done",
      url,
    };
  };
  const handleChangeImages1 = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setImages1(newFileList);
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);
      setImagesLink1(data);
      setImages1(newFileList);
    }
  };
  const handleChangeImages2 = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setImages2(newFileList);
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);
      setImagesLink2(data);
      setImages2(newFileList);
    }
  };
  const handleChangeImages3 = ({ fileList: newFileList, file }) => {
    if (file.status !== "removed") {
      setImages3(newFileList);
    } else {
      const data = newFileList
        .filter((data) => data?.url)
        .map((data) => data?.url);
      setImagesLink3(data);
      setImages3(newFileList);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      const result = await axios.get(
        `${PROXY}/adminessentials/wedding`,
        config
      );
      setdata(result?.data?.data?.data);
      if (result?.data?.data?.data[0]?.images.length) {
        const data = result?.data?.data?.data[0]?.images?.map((url, uid) => {
          return setDefaultImages(url, uid);
        });
        setImages1(data);
        setImagesLink1(setDefaultImages1(data));
      }
      if (result?.data?.data?.data[1]?.images.length) {
        const data = result?.data?.data?.data[1]?.images?.map((url, uid) => {
          return setDefaultImages(url, uid);
        });
        setImages2(data);
        setImagesLink2(setDefaultImages1(data));
      }
      if (result?.data?.data?.data[2]?.images.length) {
        const data = result?.data?.data?.data[2]?.images?.map((url, uid) => {
          return setDefaultImages(url, uid);
        });
        setImages3(data);
        setImagesLink3(setDefaultImages1(data));
      }
    };
    fetchData();
  }, [update]);
  const handleSubmit = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const result = await axios.put(
      `${PROXY}/adminessentials/inHouses`,
      {
        data: data,
        type: "wedding",
      },
      config
    );
    const formData = new FormData();
    console.log(
      "🚀 ~ file: Makeupdata.js:158 ~ handleSubmit ~ images1:",
      images1
    );
    images1 &&
      (await compressAndAppendFilesMultiple(images1, formData, "image1"));
    // images1.forEach((item, key) => {
    //   formData.append("image1", item.originFileObj);
    // });
    formData.append("Imagelink1", JSON.stringify(imagesLink1));
    images2 &&
      (await compressAndAppendFilesMultiple(images2, formData, "image2"));
    // images2.forEach((item, key) => {
    //   formData.append("image2", item.originFileObj);
    // });
    formData.append("Imagelink2", JSON.stringify(imagesLink2));
    images3 &&
      (await compressAndAppendFilesMultiple(images3, formData, "image3"));
    // images3.forEach((item, key) => {
    //   formData.append("image3", item.originFileObj);
    // });
    formData.append("Imagelink3", JSON.stringify(imagesLink3));
    formData.append("type", "wedding");
    const result1 = await axios.put(
      `${PROXY}/adminessentials/inHouses/updateImage`,

      formData,

      config
    );
    setupdate(Math.random());
  };
  return (
    <div
      container
      spacing={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}>
      <Grid
        container
        spacing={3}
        style={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={3} sm={3} md={3}>
          <Typography>
            <h4>Wedding Data</h4>
          </Typography>
        </Grid>
        {data?.map((item, key) => {
          return (
            <Grid item xs={3} sm={3} md={3} key={key}>
              <Typography>{item.title}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5>Small any one event</h5>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Price</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sao?.price}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sao.price = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Price"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Amount</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sao?.ammount}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sao.ammount = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Quantity</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sao?.qty}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sao.qty = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Images</Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sm={9}
            md={9}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              overflow: "auto",
            }}>
            <ImgCrop rotationSlider aspect={1 / 1}>
              <Upload
                multiple
                listType="picture-card"
                fileList={images1}
                onChange={handleChangeImages1}>
                {images1.length >= 50 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Grid>
        </Grid>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5>Small any two event</h5>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Price</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sat?.price}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sat.price = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Price"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Amount</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sat?.ammount}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sat.ammount = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Quantity</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.sat?.qty}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].sat.qty = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Images</Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sm={9}
            md={9}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              overflow: "auto",
            }}>
            <ImgCrop rotationSlider aspect={1 / 1}>
              <Upload
                multiple
                listType="picture-card"
                fileList={images2}
                onChange={handleChangeImages2}>
                {images2.length >= 50 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Grid>
        </Grid>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5>Complete Wedding with all event</h5>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Price</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.cw?.price}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].cw.price = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Price"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Amount</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.cw?.ammount}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].cw.ammount = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Quantity</Typography>
          </Grid>
          {data?.map((item, key) => {
            return (
              <Grid item xs={3} sm={3} md={3} key={key}>
                <TextField
                  value={item?.cw?.qty}
                  onChange={(e) => {
                    const arr = data;
                    arr[key].cw.qty = e.target.value;
                    setdata([...arr]);
                  }}
                  label="Amount"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography>Images</Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sm={9}
            md={9}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              overflow: "auto",
            }}>
            <ImgCrop rotationSlider aspect={1 / 1}>
              <Upload
                multiple
                listType="picture-card"
                fileList={images3}
                onChange={handleChangeImages3}>
                {images3.length >= 50 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}>
        <Button
          type="submit"
          style={{
            marginTop: "20px",
            fontSize: "20px",
            padding: "20px",
            width: "30%",
          }}
          onClick={handleSubmit}>
          <Typography>Submit</Typography>
        </Button>
      </div>
      <hr></hr>
    </div>
  );
}
