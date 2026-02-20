import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
} from '@mui/material';
// components
import Page from '../components/Page';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from '../sections/@dashboard/user';
import { PROXY } from '../config/index';
import ThemeProvider from '../theme';

import Layout from '../layouts/dashboard';
import axios from 'axios';

// ---------------------------------------------------------------------

// function createData(name, email, phone, payment_id, total_amount) {
//   return {
//     name, email, phone, payment_id, total_amount
//   };
// }

// const USERLIST = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'doe', label: 'Event Date', alignRight: false },
  { id: 'toe', label: 'Event Type', alignRight: false },
  { id: 'budget', label: 'Hotel Budget', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'payment_id', label: 'Payment Id', alignRight: false },
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

export default function InHouseVenues() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [USERLIST, setUSERLIST] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST?.map((n) => n.name);
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
  const [inhouseInq, setInhouseInq] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(`${PROXY}/inhouse/venue/${page}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('wedcell'))?.data
            ?.token,
        },
      });
      if (response) {
        console.log(
          `🚀 ~ file: VenueInquiry.js:149 ~ getData ~ response:`,
          response
        );
        setInhouseInq(response?.data);
        setUSERLIST(response.data.data);
        console.log(
          '🚀 ~ file: VenueInquiry.js:161 ~ getData ~ response.data.venues:',
          response.data.venues
        );
      }
    } catch (error) {
      console.log(`🚀 ~ file: VenueInquiry.js:155 ~ getData ~ error:`, error);
    }
  };
  useEffect(() => {
    getData();
  }, [page]);
  const applySearch = async () => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem('wedcell'))?.data?.token,
      },
    };
    setPage(1);
    if (filterName) {
      const response = await axios.get(
        `${PROXY}/inhouse/venue/${filterName}/${page}`,
        config
      );
      setInhouseInq(response?.data);
      setUSERLIST(response?.data?.data);
    } else {
      getData();
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = USERLIST ? USERLIST : '';

  const isUserNotFound = USERLIST?.length === 0;

  return (
    <ThemeProvider>
      <Layout>
        <Page title='User'>
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
                In-House Inquiry
              </Typography>
            </Stack>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                applySearch={applySearch}
                onFilterName={handleFilterByName}
              />

              <TableContainer>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    type={'Users'}
                  />
                  <TableBody>
                    {USERLIST?.map((row, key) => {
                      const {
                        id,
                        name,
                        toe,
                        number,
                        city,
                        doe,
                        budgetHotel,
                        price,
                        payment_id,
                        type,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                          <TableCell align='left'>{name}</TableCell>
                          <TableCell align='left'>{number}</TableCell>
                          <TableCell align='left'>{city}</TableCell>
                          <TableCell align='left'>{doe}</TableCell>
                          <TableCell align='left'>{toe}</TableCell>
                          <TableCell align='left'>{budgetHotel}</TableCell>
                          <TableCell align='left'>{price}</TableCell>
                          <TableCell align='left'>{payment_id}</TableCell>
                          {/* <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell> */}
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
                count={inhouseInq?.total}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
              />
            </Card>
          </Container>
        </Page>
      </Layout>
    </ThemeProvider>
  );
}
