import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import TabIcon from "@material-ui/icons/Tab";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ClassIcon from "@material-ui/icons/Class";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import BookIcon from "@material-ui/icons/Book";
import SchoolIcon from "@material-ui/icons/School";
import TableChartIcon from "@material-ui/icons/TableChart";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { logoutUser } from "../../../redux/actions/userAction";
import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import size from "../../../utils/size";

function Navbar({ user, logoutUser, history }) {
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
      padding: "0 1.5rem",
      display: "inline-block",
      [theme.breakpoints.down("xs")]: {
        padding: "0 0.5rem",
      },
    },
    disabled: {
      cursor: "default",
      "&:hover": {
        backgroundColor: "inherit",
      },
      "&:visited": {
        backgroundColor: "inherit",
      },
      "&:active": {
        backgroundColor: "inherit",
      },
    },
    subTab: {
      paddingLeft: "2rem",
    },
    subSubTab: {
      paddingLeft: "4rem",
    },
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const [majors, setMajors] = React.useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [isShowTheory] = React.useState(true);

  const [admins] = React.useState([
    {
      name: "Register",
      link: "/admin/register",
      icon: <LockOpenIcon />,
    },
    {
      name: "Pengumuman",
      link: "/admin/pengumuman",
      icon: <AnnouncementIcon />,
    },
    {
      name: "Rekapitulasi",
      link: "/admin/rekapitulasi",
      icon: <TableChartIcon />,
    },
  ]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [recapitulation, setRecapitulation] = React.useState([]);

  const handleClose = (e, status) => {
    if (status === "profile") {
      history.push("/profile");
    }
    if (status === "nilai") {
      history.push("/nilai");
    }

    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);

    logoutUser(history);
  };

  const handleShowTheory = () => {
    setIsDrawerOpen(true);
  };

  const handleToggleDrawer = (e) => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  React.useEffect(() => {
    if (user.isAuthenticated.role === "teacher") {
      axios
        .post(`${proxy}/api/majors/viewByArray`, user.isAuthenticated.majorId)
        .then((res) => {
          setMajors(res.data);
          setRecapitulation([...res.data]);
        });
      axios
        .post(`${proxy}/api/theorys/view`, user.isAuthenticated.majorId)
        .then((res) => {})
        .catch((err) => console.log(err));
    } else {
      axios.get(`${proxy}/api/majors/view`).then((res) => {
        setMajors(res.data);
      });
    }
  }, [user.isAuthenticated.role, user.isAuthenticated.majorId]);

  return (
    <div className={classes.root}>
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
            <Link to="/">
              <SchoolIcon style={{ padding: "0 0.4rem" }} />
              Jarpis
            </Link>
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
                {user.isAuthenticated.role === "siswa" && (
                  <React.Fragment>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e, "profile");
                      }}
                    >
                      Profile
                    </MenuItem>{" "}
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e, "nilai");
                      }}
                    >
                      Nilai{" "}
                    </MenuItem>
                  </React.Fragment>
                )}
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
              {user.isAuthenticated.role === "siswa" ? (
                <ListItem
                  button
                  className={(classes.menuItem, classes.disabled)}
                >
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText> Kelas {user.user.kelas}</ListItemText>
                </ListItem>
              ) : (
                <ListItem
                  button
                  className={(classes.menuItem, classes.disabled)}
                >
                  <ListItemIcon>
                    {" "}
                    {user.isAuthenticated.role === "teacher" ? (
                      <ClassIcon />
                    ) : (
                      <TabIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    {user.isAuthenticated.role === "teacher"
                      ? "Kelas "
                      : "Mata Pelajaran"}
                    {!isEmpty(user.user.kelas) && user.user.kelas.split("")[0]}
                  </ListItemText>
                </ListItem>
              )}

              {majors.map((major) => (
                <Link to={`/mata-pelajaran/${major._id}`}>
                  <ListItem
                    button
                    key={major.majorName}
                    className={(classes.menuItem, classes.subTab)}
                  >
                    <ListItemIcon>
                      <CastForEducationIcon />
                    </ListItemIcon>
                    <ListItemText primary={major.majorName} />
                  </ListItem>
                </Link>
              ))}
              {user.isAuthenticated.role === "admin" && (
                <React.Fragment>
                  <ListItem
                    button
                    key="Admin"
                    className={(classes.menuItem, classes.disabled)}
                  >
                    <ListItemIcon>
                      {" "}
                      <TabIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Panel" />
                  </ListItem>
                  {admins.map((admin) => (
                    <Link to={`${admin.link}`}>
                      <ListItem
                        button
                        key={admin.name}
                        className={(classes.menuItem, classes.subTab)}
                      >
                        <ListItemIcon> {admin.icon}</ListItemIcon>
                        <ListItemText primary={admin.name} />
                      </ListItem>
                    </Link>
                  ))}
                </React.Fragment>
              )}

              {user.isAuthenticated.role === "teacher" && (
                <React.Fragment>
                  <ListItem
                    button
                    key="Teacher"
                    className={(classes.menuItem, classes.disabled)}
                  >
                    <ListItemIcon>
                      {" "}
                      <TabIcon />
                    </ListItemIcon>
                    <ListItemText primary="Guru Panel" />
                  </ListItem>

                  {majors.map((major) => (
                    <React.Fragment>
                      <ListItem
                        name="subTab"
                        onClick={handleShowTheory}
                        button
                        className={(classes.menuItem, classes.subTab)}
                      >
                        <ListItemIcon>
                          {" "}
                          <BookIcon />
                        </ListItemIcon>
                        <ListItemText>{major.majorName} </ListItemText>
                        <ListItemIcon>
                          {" "}
                          <ArrowDropDownIcon />
                        </ListItemIcon>
                      </ListItem>
                      {isShowTheory &&
                        [...new Array(14)].map((a, i) => (
                          <Link
                            to={`${
                              i + 1 === 7
                                ? `/guru/ujian/UTS-${major.majorName}/${major._id}`
                                : ""
                            }${
                              i + 1 === 14
                                ? `/guru/ujian/UAS-${major.majorName}/${major._id}`
                                : ""
                            }${
                              !(i + 1 === 7) && !(i + 1 === 14)
                                ? `/guru/materi/${i + 1}/${major._id}`
                                : ""
                            }`}
                          >
                            <ListItem
                              key={i}
                              button
                              className={(classes.menuItem, classes.subSubTab)}
                            >
                              <ListItemIcon>
                                {" "}
                                <LibraryAddIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {i + 1 === 7 && "UTS"} {i + 1 === 14 && "UAS"}{" "}
                                {!(i + 1 === 7) &&
                                  !(i + 1 === 14) &&
                                  `Materi ke ${i + 1}`}{" "}
                              </ListItemText>
                            </ListItem>
                          </Link>
                        ))}
                    </React.Fragment>
                  ))}
                  <ListItem button key="Rekapitulasi Nilai">
                    <ListItemIcon>
                      {" "}
                      <TableChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rekapitulasi Nilai" />
                  </ListItem>
                </React.Fragment>
              )}

              {recapitulation.map((recap) => (
                <div>
                  <Link
                    to={`/guru/rekapitulasi/UTS-${recap.majorName}/${recap._id}`}
                    style={{ marginTop: 0 }}
                  >
                    <ListItem
                      button
                      key={recap.majorName}
                      className={(classes.menuItem, classes.subTab)}
                    >
                      <ListItemIcon>
                        <CastForEducationIcon />
                      </ListItemIcon>
                      <ListItemText>UTS {recap.majorName}</ListItemText>
                    </ListItem>
                  </Link>
                  <Link
                    to={`/guru/rekapitulasi/UAS-${recap.majorName}/${recap._id}`}
                  >
                    <ListItem
                      button
                      key={recap.majorName}
                      className={(classes.menuItem, classes.subTab)}
                    >
                      <ListItemIcon>
                        <CastForEducationIcon />
                      </ListItemIcon>
                      <ListItemText>UAS {recap.majorName}</ListItemText>
                    </ListItem>
                  </Link>
                </div>
              ))}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
