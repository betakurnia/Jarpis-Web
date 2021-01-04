import React from "react";
import Grid from "@material-ui/core/Grid";

import CardAnnouncement from "../../molecules/CardAnnouncement";
import { connect } from "react-redux";

import { viewAnnouncement } from "../../../redux/actions/announcementAction";

function Announcement({ announcements, viewAnnouncement }) {
  React.useEffect(() => {
    viewAnnouncement();
  }, []);

  return (
    <Grid container spacing={2}>
      {announcements.announcement.map((announcement) => (
        <CardAnnouncement
          id={announcement._id}
          title={announcement.title}
          description={announcement.description}
        />
      ))}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  announcements: state.announcements,
});

export default connect(mapStateToProps, { viewAnnouncement })(Announcement);
