import React from "react";

import { useParams } from "react-router-dom";

import Create from "../../atoms/Create";
import CKEditor from "../../molecules/CKEditor";

function AnnouncementUpdate() {
  const { id } = useParams();

  return (
    <Create title="Pengumuman">
      <CKEditor id={id} titles="Submit"></CKEditor>
    </Create>
  );
}

export default AnnouncementUpdate;
