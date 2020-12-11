import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Section from "../../atoms/Section";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import color from "../../../utils/color";

function Sections() {
  const useStyles = makeStyles({
    root: {
      padding: "2rem 0",
      borderBottom: `0.3px solid ${color.black}`,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Section
          icon={<DescriptionIcon />}
          title="Deskripsi Mata Pelajaran "
          description="lorem ipsum kolor si jamet dasdadasdadasda"
        />
        <Section
          icon={<PeopleIcon />}
          title="Presnsi Murid "
          description="lorem ipsum kolor si jamet dasdasdasdasdas"
          isLink={true}
        />
      </Grid>
    </div>
  );
}

export default Sections;
