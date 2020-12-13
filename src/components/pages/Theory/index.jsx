import React from "react";
import CKEditor from "../../atoms/CKEditor";
import CreateTemplate from "../../molecules/CreateTemplate";
import TheoryTemplate from "../../molecules/TheoryTemplate";
import { useParams } from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AssignmentIcon from "@material-ui/icons/Assignment";

function Pengumuman() {
  const [role, setRole] = React.useState("tugas");

  const { i } = useParams();

  const handleMenu = (e) => {
    setRole(e.target.value);
  };

  const [tipes, setTipes] = React.useState([]);

  const handleTipe = (e, val) => {
    tipes.push({
      tipe: val,
    });
    setTipes([...tipes]);
  };

  return (
    <CreateTemplate title={`Materi ke ${i}`}>
      <div
        style={{
          paddingBottom: "2rem",
          borderBottom: `0.05px solid #bdbdbd`,
        }}
      ></div>
      <TheoryTemplate title="Tugas" icon={<AssignmentIcon />}></TheoryTemplate>
      <TheoryTemplate title="Materi"></TheoryTemplate>
      {tipes.map(({ tipe }) => (
        <React.Fragment>
          <TheoryTemplate title={tipe}></TheoryTemplate>
        </React.Fragment>
      ))}

      <FormLabel component="legend" style={{ marginTop: "2rem" }}></FormLabel>
      <RadioGroup
        aria-label="gender"
        name="Role"
        value={role}
        onChange={handleMenu}
        row
      >
        <Typography variant="h5" component="p" style={{ paddingRight: "2rem" }}>
          Tipe
        </Typography>
        <FormControlLabel value="tugas" control={<Radio />} label={`Tugas`} />
        <FormControlLabel value="materi" control={<Radio />} label="Materi" />

        <FormControlLabel value="ujian" control={<Radio />} label="Ujian" />
      </RadioGroup>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginTop: "0.5rem" }}
            fullWidth
            onClick={(e) => {
              handleTipe(e, role);
            }}
          >
            Tambah {role}
          </Button>
        </Grid>
      </Grid>
    </CreateTemplate>
  );
}

export default Pengumuman;
