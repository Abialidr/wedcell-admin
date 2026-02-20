import ReviewsIcon from '@mui/icons-material/Reviews';
import { useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// material
import {
  Card,
  Table,
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
} from '@mui/material';
// components
import Page from '../components/Page';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from '../sections/@dashboard/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import ThemeProvider from '../theme';
import Layout from '../layouts/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { GetVendors, GetSearchForVendors } from '../redux/actions/HomeActions';
import axios from 'axios';
import { PROXY } from '../config';
import Label from '../components/Label';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'vendorId', label: 'Vendor Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'priority', label: 'Priority', alignRight: false },
  { id: '' },
  { id: 'popular', label: 'Popular', alignRight: false },
  { id: 'exclusive', label: 'Exclusive', alignRight: false },

  { id: 'is_allowed', label: 'Allowed', alignRight: false },
  { id: 'awarded', label: 'Awarded', alignRight: false },
  { id: 'is_delete', label: 'Enabled', alignRight: false },
  { id: 'Top10', label: 'Top 10', alignRight: false },
  { id: 'contactEmail', label: 'Email', alignRight: false },
  { id: 'contactPhone', label: 'Phone', alignRight: false },
];

export default function User() {
  const USERLIST = [];

  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const applySearch = () => {
    setPage(1);
    if (filterName) {
      dispatch(GetSearchForVendors({ page: 1, searchTerm: filterName }));
    } else {
      dispatch(GetVendors(1));
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST?.map((n) => n._id);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const handleClickClose1 = () => {
    setOpen1(false);
    handleCloseMenu();
  };

  const descriptionElementRef = useRef(null);
  const descriptionElementRef1 = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (open1) {
      const { current: descriptionElement1 } = descriptionElementRef1;
      if (descriptionElement1 !== null) {
        descriptionElement1.focus();
      }
    }
  }, [open, open1]);

  const [myImage, setMyImage] = useState('');
  const [myImageName, setMyImageName] = useState('');

  const [myFile, setMyFile] = useState('');
  const [myFileName, setMyFileName] = useState('');

  const imageInput = useRef();
  const fileInput = useRef();

  const handleUploadChange = (e) => {
    setMyImageName(e.target.files[0].name);
    setMyImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadClick = () => {
    imageInput.current.click();
  };

  const handleUploadChange1 = (e) => {
    setMyFileName(e.target.files[0].name);
    setMyFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadClick1 = () => {
    fileInput.current.click();
  };
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.homeReducer);
  const [isupdated, setIsupdated] = useState(false);
  const handleChangePage = (event, value) => {
    setPage(value + 1);
  };
  useEffect(() => {
    if (!filterName) {
      dispatch(GetVendors(page));
    } else {
      dispatch(GetSearchForVendors({ page, searchTerm: filterName }));
    }
  }, [isupdated, page]);

  if (vendors?.data) {
    vendors?.data.map((vendor) => {
      USERLIST?.push({
        ...vendor,
      });
    });
  }
  const isUserNotFound = false;
  const [form, setForm] = useState({ type: 'Vendor' });
  const [error, setError] = useState({});
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState('');

  const snackBarHandler = (message, type) => {
    if (type === 'success') handleClickClose();
    setSnackBarType(type);
    setSnackBarMessage(message);
    setTimeout(() => {
      setSnackBarMessage('');
      setSnackBarType('');
    }, 4000);
  };

  const onDelete = (id) => {
    confirmAlert({
      title: `Delete Vendor User`,
      message: `Are you sure you want to Delete this User ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const token = JSON.parse(localStorage.getItem('wedcell'))?.data
              ?.token;
            axios
              .delete(`${PROXY}/vendoruser/delete/${id}`, {
                headers: {
                  authorization: token,
                },
              })
              .then((res) => {
                if (res.data.success) {
                  dispatch(GetVendors());
                  snackBarHandler('Successfully Deleted!', 'success');
                } else {
                  snackBarHandler('Failed to Delete!', 'error');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const onEdit = (id) => {
    router.push({
      pathname: `/edititem`,
      query: { name: 'edit', id: id, type: 'Vendors' },
    });
  };

  const onAdd = () => {
    if (form.name && form.name.length && form.vendorId && form.vendorId.name) {
      const token = JSON.parse(localStorage.getItem('wedcell')).token;

      axios
        .post(`${PROXY}/item/create`, form, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(GetVendors());
            handleCloseMenu();
            snackBarHandler('Successfully Added!', 'success');
          } else {
            snackBarHandler('Failed to add!', 'error');
          }
        })
        .catch((err) => {
          // redirect
          console.log('err');
        });
    } else {
      setError({
        ...error,
        name: 'Please enter valid Name',
        vendorId: 'Please enter valid Vendor Id',
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onPopularUpdate = async (text) => {
    const token = JSON.parse(localStorage.getItem('wedcell')).data.token;
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const onIsAllowedUpdate = async (text) => {
    const token = JSON.parse(localStorage.getItem('wedcell')).data.token;
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate1(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const onStateChange = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate7(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const onIsDeleted = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      confirmAlert({
        title: `Delete Vendor Users`,
        message: `Are you sure you want to Delete this Users ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              for (let item of selected) {
                if (item && item.length) await doUpdate2(text, item, token);
              }
            },
          },
          {
            label: 'No',
          },
        ],
      });
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const onExclusiveUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate3(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const onAwardUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate4(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const RatingUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate6(text, item, token);
      }
      setIsupdated(!isupdated);
    } catch (error) {
      alert('Error');
    }
  };
  const doUpdate = async (text, item, token) => {
    console.log(`🚀 ~ file: Vendors.js:1055 ~ doUpdate ~ token:`, token);
    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          popular: text == 'Add' ? true : false,
          isAdmin: true,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate1 = async (text, item, token) => {
    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          is_approved: text == 'Add' ? true : false,
          isAdmin: true,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate2 = async (text, item) => {
    const token = JSON.parse(localStorage.getItem('wedcell')).data.token;
    axios
      .delete(`${PROXY}/vendoruser/delete/${item}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(GetVendors());
          snackBarHandler('Successfully Deleted!', 'success');
        } else {
          snackBarHandler('Failed to Delete!', 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };
  const doUpdate3 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          exclusive: text == 'Add' ? true : false,
          isAdmin: true,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate4 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          awarded: text == 'Add' ? true : false,
          isAdmin: true,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate6 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          priority: text ? parseInt(text) : 10,
          isAdmin: true,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate7 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };

    await axios
      .put(
        `${PROXY}/vendoruser/update`,
        {
          _id: item,
          is_delete: text == 'Disable' ? true : false,
          isAdmin: true,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const router = useRouter();

  const cities = [
    'Mumbai',
    'Pune',
    'Delhi',
    'Jaipur',
    'Goa',
    'Udaipur',
    'Agra',
    'Noida',
    'Gurgaon',
    'Ranchi',
    'Patna',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
    'Nashik',
    'Meerut',
    'Rajkot',
    'Varanasi',
    'Srinagar',
    'Aurangabad',
    'Dhanbad',
    'Amritsar',
    'Allahabad',
    'Gwalior',
    'Jabalpur',
    'Coimbatore',
    'Vijayawada',
    'Jodhpur',
    'Raipur',
    'Kota',
    'Chandigarh',
    'Guwahati',
    'Mysore',
    'Bareilly',
    'Aligarh',
    'Moradabad',
    'Jalandhar',
    'Bhuba',
    'Gorakhpur',
    'Bikaner',
    'Saharanpur',
    'Jamshedpur',
    'Bhilai',
    'Cuttack',
    'Firozabad',
    'Kochi',
    'Dehradun',
    'Durgapur',
    'Ajmer',
    'Siliguri',
    'Gaya',
    'Tirupati',
    'Mathura',
    'Bilaspur',
    'Haridwar',
    'Gandhinagar',
    'Shimla',
    'Gangtok',
    'Nainital',
    'Jaisalmer',
    'Indor',
    'Rishikesh',
    'kaushali',
    'Pushkar',
    'Kerala',
    'Jim Corbet',
    'Mussoorie',
    'Dubai',
    'Thailand',
    'Canada',
    'Srilanka',
    'South Africa',
    'Singapore',
    'Bali',
    'Italy',
    'UK',
    'Autralia',
    'Bokaro',
    'Faridabad',
    'South Delhi',
    'Kolkata',
  ];

  const CategotiesList = [
    {
      name: 'Bridal Wear',
      subCategories: [],
    },
    {
      name: 'Groom Wear',
      subCategories: [],
    },
    {
      name: 'Food',
      subCategories: [
        'Chaat Counter',
        'Fruit Counter',
        'Catering services',
        'Pan Counter',
        'Cake',
        'Bar Tenders',
      ],
    },
    {
      name: 'Invites & Gifts',
      subCategories: ['invitation card', 'invitation gift'],
    },
    {
      name: 'Jwellery And Accessories',
      subCategories: [
        'FLOWER JEWELLERY ',
        'BRIDAL JEWELLERYON RENT',
        'Artificial',
        'Accessories',
      ],
    },
    {
      name: 'Music & Dance',
      subCategories: [
        'Anchor',
        'Artist management services',
        'Choreographer',
        'Singer',
        'DJ',
        'Ghodi & Baggi',
        'Band Baja',
        'Dhol',

        'Live band',
        'DJ based Band',
        'Male & Female Singer',
        'Dance Troupe',
      ],
    },
    {
      name: 'Pandit Jee',
      subCategories: [],
    },
    {
      name: 'Makeup',
      subCategories: ['bridal makeup', 'Groom Makeup', 'Family Makeup'],
    },
    {
      name: 'Mehndi',
      subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
    },
    {
      name: 'Photographers',
      subCategories: [
        'Cinema/Video',
        'Album',
        'Collage Maker',
        'Drone',
        'Pre Wedding Shoot',
      ],
    },
    {
      name: 'Planning & Decor',
      subCategories: [
        'Wedding Decor',
        'Wedding Planners',
        'Celebrities Management',
        'Hospitality Service',
      ],
    },
  ];
  return (
    <ThemeProvider>
      <Layout>
        <Page title='Vendors'>
          <Container>
            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={'paper'}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'
            >
              <DialogTitle id='scroll-dialog-title'>Add Vendors</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id='scroll-dialog-description'
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
                            height: 'auto',
                            margin: 'auto',
                            marginBottom: 3,
                          }}
                        >
                          <>
                            <Image
                              src={myImage}
                              style={{
                                width: 200,
                                height: 150,
                                cursor: 'pointer',
                              }}
                            />
                            <>
                              <Typography
                                style={{
                                  textAlign: 'center',
                                }}
                              >
                                {myImageName}
                              </Typography>
                              <IconButton
                                onClick={() => {
                                  setMyImage('');
                                  setMyImageName('');
                                }}
                                style={{
                                  color: 'red',
                                  left: 85,
                                }}
                                aria-label='delete'
                                size='small'
                              >
                                <DeleteIcon fontSize='small' />
                              </IconButton>
                            </>
                          </>
                        </Card>
                      ) : (
                        <Grid
                          xs={12}
                          sx={{
                            backgroundColor: '#f7f7f7',
                            padding: 1,
                            margin: 'auto',
                            width: 200,
                            height: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            marginBottom: 3,
                            borderWidth: 1,
                            borderStyle: 'dashed',
                          }}
                          onClick={handleUploadClick}
                        >
                          <input
                            id='file'
                            ref={imageInput}
                            onChange={handleUploadChange}
                            type={'file'}
                            accept='image/*'
                            style={{
                              display: 'none',
                            }}
                          />
                          <Iconify
                            sx={{
                              color: '#2065D1',
                            }}
                            icon='entypo:upload-to-cloud'
                            width={50}
                            height={50}
                          />
                          <Typography sx={{ color: 'text.secondary' }}>
                            Upload image
                          </Typography>
                        </Grid>
                      )}
                      <Grid
                        container
                        spacing={2}
                      >
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, vendorId: e.target.value });
                              setError({ ...error, vendorId: '' });
                            }}
                            placeholder='Enter Vendor Id'
                            label='Vendor Id'
                            variant='outlined'
                            fullWidth
                            required
                          />
                          {error.vendorId && error.vendorId.length && (
                            <Alert severity='error'>{error.vendorId}</Alert>
                          )}
                        </Grid>
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, name: e.target.value });
                              setError({ ...error, name: '' });
                            }}
                            placeholder='Enter Name'
                            label='Name'
                            variant='outlined'
                            fullWidth
                            required
                          />
                          {error.name && error.name.length && (
                            <Alert severity='error'>{error.name}</Alert>
                          )}
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                            <TextField onChange={(e) => {
                              setForm({ ...form, title: e.target.value })
                            }} placeholder="Enter Title" label="Title" variant="outlined" fullWidth />
                          </Grid> */}
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            select
                            label='Category'
                            value={form.category || ''}
                            onChange={(e) => {
                              setForm({ ...form, category: e.target.value });
                            }}
                            placeholder='Select Category'
                            sx={{
                              width: '100%',
                            }}
                          >
                            {CategotiesList.map((item, key) => (
                              <MenuItem
                                key={key}
                                value={item.name}
                              >
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
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, price: e.target.value });
                            }}
                            placeholder='Price'
                            label='Price'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            select
                            label='City'
                            value={form.city || ''}
                            onChange={(e) => {
                              setForm({ ...form, city: e.target.value });
                            }}
                            placeholder='Select City'
                            sx={{
                              width: '100%',
                            }}
                          >
                            {cities.map((item, key) => (
                              <MenuItem
                                key={key}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, state: e.target.value });
                            }}
                            placeholder='State'
                            label='State'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({
                                ...form,
                                contactEmail: e.target.value,
                              });
                            }}
                            placeholder='Contact Email'
                            label='Contact Email'
                            variant='outlined'
                            fullWidth
                          />
                        </Grid>
                        <Grid
                          xs={12}
                          sm={6}
                          item
                        >
                          <TextField
                            onChange={(e) => {
                              setForm({
                                ...form,
                                contactPhone: e.target.value,
                              });
                            }}
                            placeholder='Contact Phone'
                            label='Contact Phone'
                            variant='outlined'
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

            <Dialog
              open={open1}
              onClose={handleClickClose1}
              scroll={'paper'}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'
            >
              <DialogTitle id='scroll-dialog-title'>Add Venues</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id='scroll-dialog-description1'
                  ref={descriptionElementRef1}
                  tabIndex={-1}
                >
                  <div>
                    <form>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            marginBottom: 20,
                          }}
                        >
                          <Button
                            onClick={handleUploadClick1}
                            variant='contained'
                          >
                            UPLOAD
                          </Button>
                          {myFileName && (
                            <Typography
                              style={{
                                paddingLeft: 10,
                                fontWeight: '700',
                              }}
                            >
                              {myFileName}
                            </Typography>
                          )}
                        </div>
                        <input
                          ref={fileInput}
                          onChange={handleUploadChange1}
                          style={{
                            display: 'none',
                          }}
                          type={'file'}
                        />
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                          }}
                        >
                          <Typography
                            style={{
                              paddingLeft: 10,
                              color: 'black',
                              fontWeight: '700',
                            }}
                          >
                            Download Sample Excel File
                          </Typography>
                          <Button>DOWNLOAD</Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose1}>Cancel</Button>
                <Button onClick={handleClickClose1}>Save</Button>
              </DialogActions>
            </Dialog>

            {snackBarMessage && snackBarMessage.length && (
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={true}
              >
                <Alert
                  color={snackBarType}
                  severity={snackBarType}
                  sx={{ width: '100%' }}
                >
                  {snackBarMessage}
                </Alert>
              </Snackbar>
            )}

            <Card>
              <UserListToolbar
                applySearch={applySearch}
                onClick={(e) => {
                  console.log(
                    '🚀 ~ file: Vendors.js:1721 ~ User ~ e.target.innerText:',
                    e.target.innerText
                  );
                  onPopularUpdate(e.target.innerText);
                }}
                onClick1={(e) => {
                  onIsAllowedUpdate(e.target.innerText);
                  console.log(
                    '🚀 ~ file: Vendors.js:1721 ~ User ~ e.target.innerText:',
                    e.target.innerText
                  );
                }}
                onClick2={(e) => {
                  onIsDeleted(e.target.innerText);
                }}
                onClick3={(e) => {
                  onExclusiveUpdate(e.target.innerText);
                }}
                onClick4={(e) => {
                  onAwardUpdate(e.target.innerText);
                }}
                onClick6={(e) => {
                  RatingUpdate(e.target.innerText);
                }}
                onClick7={(e) => {
                  onStateChange(e.target.innerText);
                }}
                type={'Vendor'}
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
                    rowCount={USERLIST?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {USERLIST?.map((row, key) => {
                      const {
                        _id,
                        vendorId,
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
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
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
                          <TableCell align='left'>{_id}</TableCell>
                          <TableCell align='left'>{name}</TableCell>
                          <TableCell align='left'>{category}</TableCell>
                          <TableCell align='left'>{price}</TableCell>
                          <TableCell align='left'>{city}</TableCell>
                          <TableCell align='left'>{row?.priority}</TableCell>
                          <TableCell>
                            <div
                              onClick={() => router.push(`reviews1/${row._id}`)}
                              style={{
                                marginTop: '9px',
                                marginRight: '3px',
                              }}
                            >
                              <ReviewsIcon color='primary' />
                            </div>
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant='ghost'
                              color={(popular && 'success') || 'error'}
                            >
                              {popular ? 'Yes' : 'No'}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant='ghost'
                              color={(exclusive && 'success') || 'error'}
                            >
                              {exclusive ? 'Yes' : 'No'}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant='ghost'
                              color={(row?.is_approved && 'success') || 'error'}
                            >
                              {row?.is_approved ? 'Yes' : 'No'}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant='ghost'
                              color={(row?.awarded && 'success') || 'error'}
                            >
                              {row?.awarded ? 'Yes' : 'No'}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant='ghost'
                              color={(row?.is_delete && 'error') || 'success'}
                            >
                              {row?.is_delete ? 'No' : 'Yes'}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>
                            <Label>
                              <Checkbox />
                            </Label>
                          </TableCell>
                          <TableCell align='left'>{contactEmail}</TableCell>
                          <TableCell align='left'>{contactPhone}</TableCell>

                          <TableCell align='right'>
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
                    )} */}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align='center'
                          colSpan={6}
                          sx={{ py: 3 }}
                        >
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 20]}
                component='div'
                count={vendors?.total}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
          {/* {console.log("🚀 ~ file: Vendors.js:1975 ~ User ~ page:", page)} */}
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
