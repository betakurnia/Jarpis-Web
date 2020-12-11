import React from "react";
import { Grid } from "@material-ui/core";
import CardAnnouncement from "../../molecules/CardAnnouncement";
import axios from "axios";
import proxy from "../../../utils/proxy";

function Announcement() {
  const [announcements, setAnnouncements] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/announcement/view`)
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={2}>
      {announcements.map((announcement) => (
        <CardAnnouncement
          id={announcement._id}
          title={announcement.title}
          description={announcement.description}
        />
      ))}
    </Grid>
  );
}

export default Announcement;
