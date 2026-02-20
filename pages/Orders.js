import { filter } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Router, useRouter } from 'next/router';

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

// import JoditEditor from 'jodit-react';

import dynamic from 'next/dynamic';

import { useDispatch, useSelector } from 'react-redux';
import { GetVenues } from '../redux/actions/HomeActions';
import axios from 'axios';
// import { useRouter } from "next/router";
import Image from 'next/image';

import { PROXY } from '../config';
import Label from '../components/Label';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

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
  { id: 'OrderID', label: 'Order Id', alignRight: false },
  { id: 'Product Name', label: 'Product Name', alignRight: false },
  { id: 'Bought by', label: 'Bought by', alignRight: false },
  { id: 'Amount', label: 'Amount', alignRight: false },
  { id: 'Quantity', label: 'Quantity', alignRight: false },
  { id: 'Seller id', label: 'Seller', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
  { id: 'Buyer address', label: 'Buyer address', alignRight: false },
  { id: 'ContactEmail', label: 'Email', alignRight: false },
  { id: 'ContactPhone', label: 'Phone', alignRight: false },
  { id: '' },
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
  console.log(order, orderBy);
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Order() {
  const USERLIST = [];

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState();

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [deleted, setdeleted] = useState();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: 'Start typings...',
  };

  const dispatch = useDispatch();

  const { venues } = useSelector((state) => state.homeReducer);
  const [orders, setOrders] = useState();
  const [ord, setOrd] = useState();
  //   useEffect(() => {
  //     dispatch(GetVenues());
  //   }, []);
  const getOrders = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    const response = await axios.post(
      `${PROXY}/order/getorderadmin`,
      {
        page,
      },
      config
    );
    setOrders(response.data.data);
    setOrd(response.data);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      filterUserOrders(searchQuery);
    }
  };
  const filterUserOrders = async (user) => {
    console.log('HAHAHA', user);
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    const response = await axios.post(
      `${PROXY}/order/getorderadmin`,
      {
        page: page,
        user: user,
      },
      config
    );
    setOrders(response.data.data);
    setOrd(response.data);
    console.log('🚀 ~search response:', response);
  };
  const [isupdated, setIsupdated] = useState(false);

  useEffect(() => {
    getOrders();
  }, [deleted, isupdated, page]);

  if (orders) {
    orders.map((ordd) => {
      USERLIST.push({
        ...ordd,
      });
    });
  }

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

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

  const [form, setForm] = useState({ type: 'Product' });
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
      query: { name: 'edit', id: id },
    });
  };

  const onAdd = () => {
    if (form.name && form.name.length) {
      const token = JSON.parse(localStorage.getItem('wedcell')).token;
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
  const onIsDeleted = async (text) => {
    const token = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate2(text, item, token);
      }
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
  const doUpdate = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    await axios.post(
      `${PROXY}/product/update`,
      {
        _id: item,
        popular: text == 'Add' ? true : false,
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
      .post(
        `${PROXY}/product/update`,
        {
          _id: item,
          is_approved: text == 'Add' ? true : false,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
      });
    return;
  };
  const doUpdate2 = async (text, item, token) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };

    await axios
      .post(
        `${PROXY}/product/delete`,
        {
          _id: item,
          is_delete: text == 'Delete' ? true : false,
        },
        config
      )
      .then((res) => {
        console.log('stuff', res.data, token);
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
      .post(
        `${PROXY}/product/update`,
        {
          _id: item,
          exclusive: text == 'Add' ? true : false,
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
        <Page title='Students'>
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
                Orders
              </Typography>
            </Stack>
            <Card>
              <div className='search-container'>
                <input
                  type='text'
                  style={{
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px 0 0 4px',
                  }}
                  placeholder='Enter your search query...'
                  value={searchQuery}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    style={{
                      marginLeft: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '26px',
                    }}
                    onClick={() => {
                      setSearchQuery('');
                      filterUserOrders();
                    }}
                  >
                    &#10005;
                  </button>
                )}
                <button
                  style={{
                    padding: '8px 12px',
                    marginLeft: '18px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => filterUserOrders(searchQuery)}
                >
                  Search
                </button>
              </div>

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
                        const { _id, amount, productId, paymentMode } = row;
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
                            <TableCell align='left'>
                              {row?.productId?.productName}
                            </TableCell>
                            <TableCell align='left'>
                              {row?.userId?.name}
                            </TableCell>
                            <TableCell align='left'>
                              {(row?.amount + row?.shipping) / 100}
                            </TableCell>
                            <TableCell align='left'>{row?.quantity}</TableCell>
                            <TableCell align='left'>
                              {row?.productId?.companyName}
                            </TableCell>
                            <TableCell align='left'>
                              {row?.orderStatus}
                            </TableCell>

                            <TableCell align='left'>
                              {row?.shippingAddress?.address1 +
                                ',' +
                                row?.shippingAddress?.city +
                                ',' +
                                row?.shippingAddress?.pincode}
                            </TableCell>
                            <TableCell align='left'>
                              {row?.userId?.email}
                            </TableCell>
                            <TableCell align='left'>
                              {row?.userId?.mobile}
                            </TableCell>

                            <TableCell align='right'>
                              <UserMoreMenu
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

                  {/* {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )} */}
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 20]}
                component='div'
                count={ord?.total}
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
