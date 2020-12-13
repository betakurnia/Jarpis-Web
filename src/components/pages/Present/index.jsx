import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import Table from "../../atoms/Table";
import { useParams } from "react-router-dom";
import axios from "axios";
import proxy from "../../../utils/proxy";

function Present() {
  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      padding: "2rem",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    },
  });

  const classes = useStyles();

  const { id } = useParams();

  const [major, setMajor] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/majors/view/${id}`)
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1">
        Daftar hadir siswa
      </Typography>
      <Table id={id} major={major} />
    </div>
  );
}

export default Present;
