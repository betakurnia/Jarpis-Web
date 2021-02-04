import React, { useState, useEffect } from "react";

import Headers from "../../atoms/Headers";
import NotFound from "../../atoms/NotFound";
import CardAnnouncement from "../../molecules/CardAnnouncement";

import Grid from "@material-ui/core/Grid";

import isEmpty from "../../../utils/is-empty";
import { viewAnnouncements } from "../../../api";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const announcements = await viewAnnouncements();

      setAnnouncements([...announcements]);
    }
    fetchApi();
  }, []);

  const cardAnnouncements = announcements.map(
    ({ _id, title, description, date }) => (
      <CardAnnouncement
        id={_id}
        title={title}
        description={description}
        date={date}
        setAnnouncements={setAnnouncements}
      />
    )
  );
  return (
    <div>
      <Headers title="Pengumuman" />
      <Grid container spacing={2}>
        {!isEmpty(announcements) ? cardAnnouncements : <NotFound />}
      </Grid>
    </div>
  );
}

export default Announcement;
