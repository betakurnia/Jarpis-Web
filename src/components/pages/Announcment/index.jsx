import React, { useEffect } from "react";

import Headers from "../../atoms/Headers";
import NotFound from "../../atoms/NotFound";
import CardAnnouncement from "../../molecules/CardAnnouncement";

import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import isEmpty from "../../../utils/is-empty";
import { viewAnnouncement } from "../../../redux/actions/announcementAction";

function Announcement({ announcements, viewAnnouncement }) {
  useEffect(() => {
    viewAnnouncement();
  }, []);

  const cardAnnouncements = announcements.announcement.map(
    ({ _id, title, description, date }) => (
      <CardAnnouncement
        id={_id}
        title={title}
        description={description}
        date={date}
      />
    )
  );
  return (
    <div>
      <Headers title="Pengumuman" />
      <Grid container spacing={2}>
        {!isEmpty(announcements.announcement) ? (
          cardAnnouncements
        ) : (
          <NotFound />
        )}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  announcements: state.announcements,
});

export default connect(mapStateToProps, { viewAnnouncement })(Announcement);
