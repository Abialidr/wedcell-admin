import { filter } from 'lodash';
import { useEffect, useRef, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
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
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Page from '../components/Page';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThemeProvider from '../theme';
import Layout from '../layouts/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { GetSearchForVenues, GetVenues } from '../redux/actions/HomeActions';
import axios from 'axios';
import Image from 'next/image';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { PROXY } from '../config';
import Label from '../components/Label';

// ----------------------------------------------------------------------

const MenuItems = ({ onDelete, onEdit, onEnable }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={ref}
        onClick={() => setIsOpen(true)}
      >
        <Iconify
          icon='eva:more-vertical-fill'
          width={20}
          height={20}
        />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            onDelete();
            setIsOpen();
          }}
        >
          <ListItemIcon>
            <Iconify
              icon='eva:trash-2-outline'
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText
            primary='Delete'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            onEdit();
            setIsOpen();
          }}
        >
          <ListItemIcon>
            <Iconify
              icon='eva:edit-fill'
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText
            primary='Edit'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const TABLE_HEAD = [
  { id: 'vendorId', label: 'Vendor Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'priority', label: 'Priority', alignRight: false },
  { id: '' },
  { id: 'popular', label: 'Popular', alignRight: false },
  { id: 'onpanel', label: 'On-Panel', alignRight: false },
  { id: 'is_approved', label: 'Aproved', alignRight: false },
  { id: 'Awarded', label: 'Awarded', alignRight: false },
  { id: 'Stars', label: 'Stars', alignRight: false },
  { id: 'is_delete', label: 'Enabled', alignRight: false },
  { id: 'Top10', label: 'Top 10', alignRight: false },
  { id: 'contactEmail', label: 'Email', alignRight: false },
  { id: 'contactPhone', label: 'Phone', alignRight: false },
];

// ----------------------------------------------------------------------

export default function User() {
  const USERLIST = [];
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
  const applySearch = () => {
    setPage(1);
    if (filterName) {
      dispatch(GetSearchForVenues({ page: 1, searchTerm: filterName }));
    } else {
      dispatch(GetVenues(1));
    }
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
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
  const [myImage, setMyImage] = useState('');
  const [myImageName, setMyImageName] = useState('');
  const imageInput = useRef();
  const handleUploadChange = (e) => {
    setMyImageName(e.target.files[0].name);
    setMyImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleUploadClick = () => {
    imageInput.current.click();
  };
  const [isupdated, setIsupdated] = useState(false);
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.homeReducer);
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };
  useEffect(() => {
    if (!filterName) {
      dispatch(GetVenues(page));
    } else {
      dispatch(GetSearchForVenues({ page, searchTerm: filterName }));
    }
  }, [isupdated, page]);

  if (venues?.data) {
    venues?.data?.map((venue) => {
      USERLIST.push({
        ...venue,
      });
    });
  }
  const filteredUsers = USERLIST;
  const isUserNotFound = filteredUsers.length === 0;
  const [form, setForm] = useState({ type: 'Venue' });
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
      title: `Delete Venue User`,
      message: `Are you sure you want to Delete this User ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const token = JSON.parse(localStorage.getItem('wedcell'))?.data
              ?.token;
            axios
              .delete(`${PROXY}/venueuser/delete/${id}`, {
                headers: {
                  authorization: token,
                },
              })
              .then((res) => {
                if (res.data.success) {
                  dispatch(GetVenues());
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
      query: { name: 'edit', id: id },
    });
    // code
  };

  const onAdd = () => {
    if (form.name && form.name.length) {
      const token = JSON.parse(localStorage.getItem('wedcell')).token;
      // setForm({ token: token })

      axios
        .put(`${PROXY}/venueuser/create`, form, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(GetVenues());
            snackBarHandler('Successfully Added!', 'success');
          } else {
            snackBarHandler('Failed to add!', 'error');
          }
        })
        .catch((err) => {
          // redirect
          console.log(err);
        });
    } else {
      setError({
        ...error,
        name: 'Please enter valid Name',
        vendorId: 'Please enter valid Vendor Id',
      });
    }
  };
  const onPopularUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
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
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
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
        title: `Delete Venue Users`,
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
  const onStarsUpdate = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate5(text, item, token);
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
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios.put(
      `${PROXY}/venueuser/update`,
      {
        _id: item,
        popular: text == 'Add' ? true : false,
        isAdmin: true,
      },
      config
    );
    return;
  };
  const doUpdate1 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios
      .put(
        `${PROXY}/venueuser/update`,
        {
          _id: item,
          is_approved: text == 'Add' ? true : false,
          isAdmin: true,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate2 = async (text, item) => {
    const token = JSON.parse(localStorage.getItem('wedcell')).data.token;
    axios
      .delete(`${PROXY}/venueuser/delete/${item}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(GetVenues());
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
        `${PROXY}/venueuser/update`,
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
        `${PROXY}/venueuser/update`,
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
  const doUpdate5 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios
      .put(
        `${PROXY}/venueuser/update`,
        {
          _id: item,
          fourStar:
            text === '4 Stars' ? true : text === '5 Stars' ? false : false,
          fiveStar:
            text === '5 Stars' ? true : text === '4 Stars' ? false : false,
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
        `${PROXY}/venueuser/update`,
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
        `${PROXY}/venueuser/update`,
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

  const CategotiesListVenue = [
    {
      name: 'Hotel',
      subCategories: [],
    },
    {
      name: 'Resort',
      subCategories: [],
    },
    {
      name: 'Farm House',
      subCategories: [],
    },
    {
      name: 'Banquet Hall',
      subCategories: [],
    },
    {
      name: 'Lawn',
      subCategories: [],
    },
    {
      name: 'Destination Wedding',
      subCategories: [],
    },
  ];

  return (
    <ThemeProvider>
      <Layout>
        <Page title='Venues'>
          <Container>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              mb={5}
            >
              <Typography
                variant='h4'
                gutterBottom
              >
                Venues
              </Typography>
              <Button
                onClick={handleClickOpen()}
                id='basic-button'
                startIcon={<Iconify icon='eva:plus-fill' />}
              >
                New Venue
              </Button>
            </Stack>

            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={'paper'}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'
            >
              <DialogTitle id='scroll-dialog-title'>Add Venues</DialogTitle>
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
                            {CategotiesListVenue.map((item, key) => (
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
                        {/* <Grid xs={12} sm={6} item>
                          <TextField onChange={(e) => {
                            setForm({ ...form, city: e.target.value })
                          }} placeholder="City" label="City" variant="outlined" fullWidth />
                        </Grid> */}
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

            {snackBarMessage && snackBarType && snackBarMessage.length && (
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
                onClick4={(e) => {
                  onAwardUpdate(e.target.innerText);
                }}
                onClick5={(e) => {
                  onStarsUpdate(e.target.innerText);
                }}
                onClick6={(e) => {
                  RatingUpdate(e.target.innerText);
                }}
                onClick7={(e) => {
                  onStateChange(e.target.innerText);
                }}
                type={'Venue'}
                numSelected={selected.length}
                filterName={filterName}
                applySearch={applySearch}
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
                    {filteredUsers.map((row, key) => {
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
                              onClick={() =>
                                router.push(`reviews1/${row?._id}`)
                              }
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
                              color={
                                row?.fourStar
                                  ? 'success'
                                  : row?.fiveStar
                                  ? 'success'
                                  : 'error'
                              }
                            >
                              {row?.fourStar
                                ? '4 Star'
                                : row?.fiveStar
                                ? '5 Star'
                                : 'No'}
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
                            <MenuItems
                              type={'VenueVendor'}
                              onDelete={() => onDelete(_id)}
                              onEdit={() => onEdit(row?._id)}
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
                count={venues?.total}
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
