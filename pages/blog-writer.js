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
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
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

// import JoditEditor from 'jodit-react';

import dynamic from 'next/dynamic';

import { useDispatch, useSelector } from 'react-redux';
import { GetBlogs } from '../redux/actions/HomeActions';
import axios from 'axios';
import Image from 'next/image';
import { PROXY } from '../config';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

import Editor from '../components/Editor/Editor';
import { useS3Upload } from 'next-s3-upload';
import { compressAndReturnFiles } from 'components/compressAndAppendFiles';
import { useRouter } from 'next/router';

// ---------------------------------------------------------------------

function createData(title, category, status, rank) {
  return {
    title,
    category,
    status,
    rank,
  };
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Blog Title', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'rank', label: 'Rank', alignRight: false },
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const router = useRouter();
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
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  const subCategories = [
    'Chaat Counter',
    'Fruit Counter',
    'Catering services',
    'Pan Counter',
    'Cake',
    'Bar Tenders',
    'Invitation Card',
    'Invitation Gift',
    'Bridal Jwellery on Rent',
    'Anchor',
    'Choreographer',
    'DJ',
    'Ghodi & Baggi',
    'Band Baja',
    'Dhol',
    'Bridal Makeup',
    'Groom Makeup',
    'Family Makeup',
    'Bride Mehndi',
    'Family Member Mehndi',
    'Cinema/Video',
    'Album',
    'Collage Maker',
    'Drone',
    'Pre Wedding Shoot',
    'Wedding Decor',
    'Wedding Planners',
    'Celebrities Management',
    'Hospitality Service',
  ];
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
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const handleClickOpen1 = () => () => {
    setOpen1(true);
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
  console.log('🚀 ~ file: Blogs.js:996 ~ User ~ myImage:', myImage);
  const [myImageName, setMyImageName] = useState('');

  const [myFile, setMyFile] = useState('');
  const [myFileName, setMyFileName] = useState('');

  const imageInput = useRef();
  const fileInput = useRef();

  const { uploadToS3 } = useS3Upload();
  const handleUploadChange = async ({ target }) => {
    try {
      let files = Array.from(target.files);
      files = await compressAndReturnFiles(files);
      const data = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const { url } = await uploadToS3(file);
        console.log(url);
        const a = url.replaceAll('%', '%25');
        data.push(a);
        setMyImageName(target.files[0].name);
        setMyImage(a);
        setForm({ ...form, mainImage: a });
      }
    } catch (e) {
      console.log(e, 'dkfbsdkfhsjdfhosdl');
    }
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

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: 'Start typings...',
  };

  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(GetBlogs());
  }, []);

  if (blogs) {
    blogs.map((blog) => {
      USERLIST.push({
        ...blog,
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
    const token = JSON.parse(localStorage.getItem('wedcell')).data.token;

    axios
      .post(
        `${PROXY}/blog/delete`,
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
          dispatch(GetBlogs());
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
    //code
  };

  const onAdd = () => {
    if (form.title && form.title.length) {
      const token = JSON.parse(localStorage.getItem('wedcell')).data.token;
      // setForm({ ...form, token: token })

      axios
        .post(`${PROXY}/blog/create`, form, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(GetBlogs());
            handleCloseMenu();
            snackBarHandler('Successfully Added!', 'success');
            setForm({});
            setContent('');
          } else {
            snackBarHandler('Failed to add!', 'error');
          }
        })
        .catch((err) => {
          // redirect
          console.log('err');
        });
    } else {
      setError({ ...error, title: 'Please enter valid Title' });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState('');

  console.log(value);

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
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Page title="Blogs">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              mb={2}>
              <Button
                onClick={() => {
                  localStorage.removeItem('wedcell');
                  localStorage.removeItem('role');
                  router.push('/Login');
                }}
                id="basic-button">
                Logout
              </Button>

              {/* <Button
                id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClickMenu}
              >
                New Blogs
              </Button> */}

              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClickOpen()}>Add Single Vendor</MenuItem>
                <MenuItem onClick={handleClickOpen1()}>Add Vendors In Bulk With Excel</MenuItem>
              </Menu> */}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}>
              <Typography variant="h4" gutterBottom>
                Blogs
              </Typography>

              <Button
                onClick={handleClickOpen()}
                id="basic-button"
                startIcon={<Iconify icon="eva:plus-fill" />}>
                New Blog
              </Button>
            </Stack>

            <Dialog
              open={open}
              onClose={handleClickClose}
              scroll={'paper'}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description">
              <DialogTitle id="scroll-dialog-title">Add Blogs</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}>
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
                          }}>
                          <>
                            <Image
                              src={myImage}
                              width={200}
                              height={150}
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
                                }}>
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
                                aria-label="delete"
                                size="small">
                                <DeleteIcon fontSize="small" />
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
                          onClick={handleUploadClick}>
                          <input
                            id="file"
                            ref={imageInput}
                            onChange={(e) => handleUploadChange(e)}
                            type={'file'}
                            accept="image/*"
                            style={{
                              display: 'none',
                            }}
                          />
                          <Iconify
                            sx={{
                              color: '#2065D1',
                            }}
                            icon="entypo:upload-to-cloud"
                            width={50}
                            height={50}
                          />
                          <Typography sx={{ color: 'text.secondary' }}>
                            Upload image
                          </Typography>
                        </Grid>
                      )}
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, title: e.target.value });
                              setError({ ...error, title: '' });
                            }}
                            placeholder="Enter Title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            required
                          />
                          {error.title && error.title.length && (
                            <Alert severity="error">{error.title}</Alert>
                          )}
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            onChange={(e) => {
                              setForm({ ...form, url: e.target.value });
                            }}
                            placeholder="URL"
                            label="URL"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        {/* <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="Type"
                            value={form.type || ""}
                            onChange={(e) => {
                              setForm({ ...form, type: e.target.value })
                            }}
                            placeholder="Select Type"
                            sx={{
                              width: '100%',
                            }}
                          >
                            <MenuItem value={"Resort"}>
                              {"Resort"}
                            </MenuItem>
                            <MenuItem value={"Lawn"}>
                              {"Lawn"}
                            </MenuItem>
                            <MenuItem value={"Banquet Hall"}>
                              {"Banquet Hall"}
                            </MenuItem>
                            <MenuItem value={"Hotel"}>
                              {"Hotel"}
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="Category"
                            value={form.category || ""}
                            onChange={(e) => {
                              setForm({ ...form, category: e.target.value })
                            }}
                            placeholder="Select Category"
                            sx={{
                              width: '100%',
                            }}
                          >
                            <MenuItem value={"Resort"}>
                              {"Resort"}
                            </MenuItem>
                            <MenuItem value={"Lawn"}>
                              {"Lawn"}
                            </MenuItem>
                            <MenuItem value={"Banquet Hall"}>
                              {"Banquet Hall"}
                            </MenuItem>
                            <MenuItem value={"Hotel"}>
                              {"Hotel"}
                            </MenuItem>
                          </TextField>
                        </Grid> */}
                        <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="Category"
                            value={form.category || ''}
                            onChange={(e) => {
                              setForm({ ...form, category: e.target.value });
                            }}
                            placeholder="Select Category"
                            sx={{
                              width: '100%',
                            }}>
                            {CategotiesListVenue.map((item, key) => (
                              <MenuItem key={key} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                            {CategotiesList.map((item, key) => (
                              <MenuItem key={key} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                          <TextField
                            select
                            label="Sub Category"
                            value={form.type || ''}
                            onChange={(e) => {
                              setForm({ ...form, type: e.target.value });
                            }}
                            placeholder="Select Type"
                            sx={{
                              width: '100%',
                            }}>
                            {subCategories.map((item, key) => (
                              <MenuItem key={key} value={item}>
                                {item}
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
                        <Grid xs={12} sm={12} item>
                          <TextField
                            multiline
                            maxRows={4}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                keywords: e.target.value.split(','),
                              });
                            }}
                            placeholder="Enter keywords with comma seperated"
                            label="Seo Keywords"
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
                           */}
                        <Grid
                          xs={12}
                          style={{
                            marginLeft: 16,
                            marginTop: 15,
                            overflow: 'scroll',
                          }}>
                          {/* <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                              setContent(newContent)
                              setForm({ ...form, description: newContent })
                            }} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {
                              console.log(newContent);
                            }}
                          /> */}
                          <Editor
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                              setForm({ ...form, description: value });
                            }}
                          />
                        </Grid>
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
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description">
              <DialogTitle id="scroll-dialog-title">Add Blogs</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText
                  id="scroll-dialog-description1"
                  ref={descriptionElementRef1}
                  tabIndex={-1}>
                  <div>
                    <form>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            marginBottom: 20,
                          }}>
                          <Button
                            onClick={handleUploadClick1}
                            variant="contained">
                            UPLOAD
                          </Button>
                          {myFileName && (
                            <Typography
                              style={{
                                paddingLeft: 10,
                                fontWeight: '700',
                              }}>
                              {myFileName}
                            </Typography>
                          )}
                        </div>
                        {/* <input
                          ref={fileInput}
                          onChange={handleUploadChange1}
                          style={{
                            display: 'none'
                          }} type={"file"} /> */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                          }}>
                          <Typography
                            style={{
                              paddingLeft: 10,
                              color: 'black',
                              fontWeight: '700',
                            }}>
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
                open={true}>
                <Alert
                  color={snackBarType}
                  severity={snackBarType}
                  sx={{ width: '100%' }}>
                  {snackBarMessage}
                </Alert>
              </Snackbar>
            )}

            <Card>
              <UserListToolbar
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
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, key) => {
                        const { _id, title, category, status, rank } = row;
                        const isItemSelected = selected.indexOf(title) !== -1;

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
                                onChange={(event) => handleClick(event, title)}
                              />
                            </TableCell>
                            {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                            <TableCell align="left">{title}</TableCell>
                            <TableCell align="left">{category}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (status === 'Active' && 'success') || 'error'
                                }>
                                {status}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{rank}</TableCell>
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      </div>
    </ThemeProvider>
  );
}
