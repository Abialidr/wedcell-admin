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
// import { GetVenues } from "../redux/actions/HomeActions";
import {
  addSubscriptions,
  getSubscriptions,
} from '../redux/actions/SubscriptionAction';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'services', label: 'Services', alignRight: false },
  { id: 'experience', label: 'Experience', alignRight: false },
  { id: 'is_delete', label: 'is_delete', alignRight: false },
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const USERLIST = [];

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const { subscriptions } = useSelector((item) => item.subcriptionReducer);
  console.log(subscriptions, 'subscriptions');
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  if (venues) {
    venues?.map((venue) => {
      USERLIST.push({
        ...venue,
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

  const [form, setForm] = useState({ type: 'Subscription' });
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
    const token = JSON.parse(localStorage.getItem('wedcell')).token;

    axios
      .post(
        `${PROXY}/item/delete`,
        {
          _id: id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          //   dispatch(GetVenues());
          snackBarHandler('Successfully Deleted!', 'success');
        } else {
          snackBarHandler('Failed to Delete!', 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = (id) => {
    // code
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
            dispatch(GetSubscription());
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
    const token = JSON.parse(localStorage.getItem('wedcell')).token;
    try {
      for (let item of selected) {
        if (item && item.length) await doUpdate(text, item, token);
      }
      location.reload(true);
    } catch (error) {
      alert('Error');
    }
  };

  const doUpdate = async (text, item, token) => {
    await axios.post(
      `${PROXY}/item/update`,
      {
        _id: item,
        popular: text == 'Add' ? true : false,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.services = formDataObj.services.split(',');
    dispatch(addSubscriptions(formDataObj));
  };

  return (
    <ThemeProvider>
      <Layout>
        <Page title='Venues'>
          <Container>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              mb={3}
            >
              <Typography
                variant='h4'
                gutterBottom
              >
                Subscriptions
              </Typography>
              <Button
                onClick={handleClickOpen()}
                id='basic-button'
                startIcon={<Iconify icon='eva:plus-fill' />}
              >
                Subscriptions
              </Button>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              mb={2}
            >
              <a
                href='https://www.wedcell.com/makeup'
                startIcon={<Iconify icon='eva:plus-fill' />}
              >
                check view on https://www.wedcell.com/makeup
              </a>
            </Stack>

            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={'paper'}
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'
            >
              <form onSubmit={handleSubmit}>
                <DialogTitle id='scroll-dialog-title'>
                  Add Subscriptions
                </DialogTitle>
                <DialogContent dividers={true}>
                  <DialogContentText
                    id='scroll-dialog-description'
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    <div>
                      <Grid>
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
                              placeholder='Enter Name'
                              name='name'
                              label='Name'
                              variant='outlined'
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid
                            xs={12}
                            sm={6}
                            item
                          >
                            <TextField
                              placeholder='Price'
                              name='price'
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
                              placeholder='Products'
                              name='products'
                              label='Products'
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
                              placeholder='Add experience'
                              name='experience'
                              label='Experience'
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
                              placeholder='Add services, seperate each by comma '
                              name='services'
                              label='Services'
                              variant='outlined'
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>Cancel</Button>
                  <Button type='submit'>Save</Button>
                </DialogActions>
              </form>
            </Dialog>

            <Card>
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
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {subscriptions &&
                      subscriptions
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, key) => {
                          const {
                            _id,
                            name,
                            price,
                            services,
                            products,
                            experience,
                            is_delete,
                          } = row;
                          const isItemSelected = selected.indexOf(_id) !== -1;
                          // return;
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
                              <TableCell align='left'>{name}</TableCell>
                              <TableCell align='left'>{price}</TableCell>
                              <TableCell align='left'>
                                {services.toString()}
                              </TableCell>
                              <TableCell align='left'>{products}</TableCell>
                              <TableCell align='left'>{experience}</TableCell>
                              {/* <TableCell align="right">
                                                        <UserMoreMenu onDelete={() => onDelete(_id)} onEdit={() => onEdit(_id)} />
                                                    </TableCell> */}
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
