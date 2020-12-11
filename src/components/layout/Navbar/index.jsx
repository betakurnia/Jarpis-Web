import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  Grid,
  Box,
  Drawer,
  Container,
  Hidden,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import size from "../../../utils/size";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { connect } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../../../redux/actions/userAction";
import { withRouter } from "react-router-dom";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: `${size.big}rem`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    minWidth: 300,
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  announcement: {
    padding: "0 2rem",
    display: "inline-block",
  },
}));

function MenuAppBar({ user, logoutUser, history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);

    logoutUser(history);
  };

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        /> */}
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          {user.isAuthenticated && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleToggleDrawer}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={classes.title}>
            <Link to="/">Jarpis</Link>
            <Link to="/pengumuman" className={classes.announcement}>
              <Typography className={classes.announcement}>
                Pengumuman
              </Typography>
            </Link>
          </Typography>

          {user.isAuthenticated && (
            <div>
              <span>{user.isAuthenticated.name}</span>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>
                  Log Out <ExitToAppIcon style={{ paddingLeft: "0.5rem" }} />
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleToggleDrawer}>
          <div onClick={handleToggleDrawer} onKeyDown={handleToggleDrawer}>
            <List>
              <Link to="/dashboard">
                <ListItem button key="dashboard" className={classes.menuItem}>
                  <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
              {["mapel", "mapel"].map((text, index) => (
                <ListItem button key={text} className={classes.menuItem}>
                  <ListItemIcon>{"I"}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              {user.isAuthenticated.role === "admin" && (
                <Link to="/admin">
                  <ListItem button key="Admin" className={classes.menuItem}>
                    <ListItemIcon>
                      {" "}
                      <SupervisorAccountIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Admin Panel" />
                  </ListItem>
                </Link>
              )}
            </List>
          </div>
        </Drawer>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(MenuAppBar));
