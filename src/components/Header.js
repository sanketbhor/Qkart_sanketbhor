// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Avatar, Button, Stack } from "@mui/material";
// import Box from "@mui/material/Box";
// import React from "react";
// import "./Header.css";
// import { useHistory } from "react-router-dom";


// const Header = ({ children, hasHiddenAuthButtons }) => {
//   const username = localStorage.getItem("username");

//   const history = useHistory();

//   const goToProductsPage = () => {
//     history.push('/');
//   }

//   const goToLoginPage = () => {
//     history.push('/login');
//   }

//   const goToRegistrationPage = () => {
//     history.push('/register');
//   }

//   const removeItemsFromLocalStorage = (key) => {
//     localStorage.removeItem(key);
//   }

//   const logout = () => {
//     removeItemsFromLocalStorage('username');
//     removeItemsFromLocalStorage('token');
//     removeItemsFromLocalStorage('balance');

//     // Removing the items from local doesn't re render the page, so do a hard reload
//     window.location.reload();
//   }

//   return (
//     <Box className="header">
//       <Box className="header-title">
//         <img src="logo_light.svg" alt="QKart-icon"></img>
//       </Box>
//       {/* {children} */}
//       {hasHiddenAuthButtons && (
//         <Button
//           className="explore-button"
//           startIcon={<ArrowBackIcon />}
//           variant="text"
//           onClick={goToProductsPage}
//         >
//           Back to explore
//         </Button>
//       )}
//       {username && !hasHiddenAuthButtons && (
//         <Stack direction="row" spacing={2}>
//           <Stack direction='row' alignItems='center' spacing={1}>
//             <img className='avatar' src="avatar.png" alt={username} />
//             <span className="username-text">{username}</span>
//           </Stack>

//           <Button role='button' name='logout' className="logout-button" variant="text" onClick={logout}>
//             LOGOUT
//           </Button>
//         </Stack>
//       )}
//       {!username && !hasHiddenAuthButtons && (
//         <Stack direction="row">
//           <Button role='button' name='login' className="login-button" variant="text" onClick={goToLoginPage}>
//             LOGIN
//           </Button>
//           <Button role='button' name='register' className="register-button" variant="contained" onClick={goToRegistrationPage}>
//             REGISTER
//           </Button>
//         </Stack>
//       )}
//     </Box>
//   );
// };

// export default Header;

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";

import { Button, TextField, InputAdornment, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import "./Header.css";
const Header = ({ children, hasHiddenAuthButtons, setText }) => {
  const history = useHistory();
  // console.log(
  //   hasHiddenAuthButtons,
  //   localStorage.getItem("token"),
  //   localStorage.getItem("username"),
  //   localStorage.getItem("balance")
  // );
  useEffect(() => {
    if (window.location.href[window.location.href.length - 1] === "/") {
      hasHiddenAuthButtons = true;
    }
  });
  const Logout = () => {
    localStorage.clear();
    hasHiddenAuthButtons = true;
    window.location.reload(false);
  };
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children ? (
        <TextField
          className="search-desktop"
          size="small"
          onChange={(e) => {
            setText(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="search for items/categories"
          name="search"
        />
      ) : (
        <></>
      )}
      <div direction="row">
        {localStorage.getItem("username") ? (
          <Stack direction="row">
            <img
              src="public/avatar.png"
              alt={localStorage.getItem("username")}
            />
            <p className="username-text">{localStorage.getItem("username")}</p>

            <Button type="primary" onClick={() => Logout()}>
              logout
            </Button>
          </Stack>
        ) : (
          // (hasHiddenAuthButtons = true)
          // <div></div>
        
        hasHiddenAuthButtons ? (
          <>
            <Button
              className="explore-button"
              variant="text"
              onClick={() => {
                history.push("/login");
              }}
            >
              login{" "}
            </Button>
            <Button
              className="button"
              onClick={() => {
                history.push("/register");
              }}
            >
              register{" "}
            </Button>
          </>
        ) : (
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => {
              history.push("/");
            }}
          >
            back to explore
          </Button>
        ))}
      </div>
    </Box>
  );
};

export default Header;
