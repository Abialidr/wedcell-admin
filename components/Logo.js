import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = true, sx }) {
  const theme = useTheme();

  // OR

  const logo = <Box component="img" src="https://media-exp1.licdn.com/dms/image/C4E1BAQEGMWlDTAKgzA/company-background_10000/0/1628457664980?e=2147483647&v=beta&t=P3GBXoRQQzOFsA1AMTX2hPxlAUZrS4h7uEpPpf2LiLA" sx={{ height: 40, ...sx }} />

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <>{logo}</>;

}
