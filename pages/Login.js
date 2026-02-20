// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';

import ThemeProvider from '../theme';
import AuthForm from "../components/Auth/AuthForm";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <ThemeProvider>
      <Page title="Login">
        <RootStyle>
          <HeaderStyle>
            <Logo />
          </HeaderStyle>
          <Container maxWidth="sm">
            <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Sign in to WedCell
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Enter your details below.
              </Typography>

              <LoginForm />
              {/* <AuthForm form="vendorLogin" loginPagename="customer" /> */}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </ThemeProvider>
  );
}
