import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {

  const router = useRouter()

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("wedcell");
            localStorage.removeItem("role");
            // window.location.reload(true);
            router.push("/Login");
          }}
          variant="contained" size="small">
          LOGOUT
        </Button>

      </ToolbarStyle>
    </RootStyle>
  );
}
