import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Section from "../../atoms/Section";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import color from "../../../utils/color";
import { Alert } from "@material-ui/lab";

function Sections({ id, isStudent }) {
  const useStyles = makeStyles({
    root: {
      padding: "1rem 0 2rem",
      borderBottom: `0.05px solid #bdbdbd`,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!isStudent && (
        <Alert
          severity="warning"
          style={{ marginTop: "0", marginBottom: "1.5rem" }}
        >
          Presensi hanya tersedia untuk siswa
        </Alert>
      )}
      <Grid container spacing={2}>
        <Section
          icon={<PeopleIcon style={{ width: "100%", height: 160 }} />}
          title="Presensi Murid "
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          isLink={true}
          id={id}
          isStudent={isStudent}
        />
      </Grid>
    </div>
  );
}

export default Sections;
