// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import ThemeProvider from '../theme';

import Layout from '../layouts/dashboard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetVendors, GetVenues } from '../redux/actions/HomeActions';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useRouter } from 'next/router';
import { PlusOneOutlined } from '@mui/icons-material';
import axios from 'axios';
import { PROXY } from '../config';

// ----------------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  let [fileList, setFileList] = useState([]);

  const { vendors, venues } = useSelector((state) => state.homeReducer);
  const router = useRouter();
  useEffect(() => {
    dispatch(GetVendors());
    dispatch(GetVenues());
  }, []);

  let user = true;
  useEffect(() => {
    user = localStorage.getItem('wedcell');
    console.log('wedcell', user);
    if (user === 'undefined' || user === null || user === undefined || !user) {
      localStorage.removeItem('wedcell');
      router.push('/Login');
    }
  }, [router, user]);
  const uploadButton = (
    <div>
      <PlusOneOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const [dashData, setDashdata] = useState();
  const getDashboarddata = async () => {
    const response = await axios.get(`${PROXY}/admin/adminreports`, {});

    setDashdata(response.data);
  };
  useEffect(() => {
    getDashboarddata();
  }, []);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ThemeProvider>
      <Layout>
        <Page title='Dashboard'>
          <Container maxWidth='xl'>
            <Typography
              variant='h4'
              sx={{ mb: 5 }}
            >
              Hi, Welcome back
            </Typography>

            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Listing'
                  total={dashData?.totalListing}
                  icon={'eva:list-fill'}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Venues'
                  total={dashData?.totalvenue}
                  color='info'
                  link=''
                  icon={'eva:home-outline'}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Vendors'
                  total={dashData?.totalvendor}
                  color='error'
                  icon={'eva:people-fill'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Shopnow Users'
                  total={dashData?.totalshopnow}
                  color='warning'
                  icon={'clarity:group-solid'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Users'
                  total={dashData?.totaluser}
                  color='info'
                  icon={'clarity:group-solid'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Students'
                  total={dashData?.totalstudent}
                  color='error'
                  icon={'clarity:group-solid'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Inhouse-Other Services'
                  total={dashData?.totalotherser}
                  color='warning'
                  icon={'eva:question-mark-circle-outline'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Inhouse-Venues Services'
                  total={dashData?.totalvenuerser}
                  icon={'eva:question-mark-circle-outline'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Blogs'
                  total={dashData?.totalblog}
                  color='error'
                  icon={'eva:menu-2-outline'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Real Weddings'
                  total={dashData?.totalrealwed}
                  color='warning'
                  icon={'eva:star-outline'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Subscriptions'
                  total={dashData?.totalListing}
                  icon={'eva:credit-card-outline'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <AppWidgetSummary
                  title='Total Orders'
                  total={dashData?.totalorder}
                  color='info'
                  icon={'eva:shopping-cart-outline'}
                />
              </Grid>
            </Grid>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
