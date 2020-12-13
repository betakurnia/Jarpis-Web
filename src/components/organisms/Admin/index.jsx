import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CKEditor from "../../atoms/CKEditor";
import Register from "../../molecules/Register";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import CreateTemplate from "../../molecules/CreateTemplate";

function Admin() {
  const [isRegister, setIsRegister] = React.useState(true);
  const [isAnnouncement, setIsAnnouncement] = React.useState(false);
  const [isMajor, setIsMajor] = React.useState(false);

  const handleRegister = () => {
    setIsRegister(true);
    setIsAnnouncement(false);
    setIsMajor(false);
  };

  const handleAnnouncement = () => {
    setIsRegister(false);
    setIsAnnouncement(true);
    setIsMajor(false);
  };

  const handleIsMajor = () => {
    setIsMajor(true);
    setIsAnnouncement(false);
    setIsMajor(false);
  };

  const useStyles = makeStyles({
    active: {
      color: color.primary,
      borderBottom: `4px solid ${color.primary}`,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper square>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab
            label="Daftar"
            onClick={handleRegister}
            className={isRegister && classes.active}
          />
          <Tab
            label="Pengumuman"
            onClick={handleAnnouncement}
            className={isAnnouncement && classes.active}
          />
        </Tabs>
      </Paper>
      <div style={{ marginTop: "4rem" }}></div>
      {isRegister && <Register />}
      {isAnnouncement && (
        <CreateTemplate title="Buat Pengumuman">
          <CKEditor titles="Buat" />{" "}
        </CreateTemplate>
      )}
      {isMajor && (
        <CreateTemplate title="Buat mata pelajaran">
          <CKEditor titles="Buat" />{" "}
        </CreateTemplate>
      )}
    </React.Fragment>
  );
}

export default Admin;
