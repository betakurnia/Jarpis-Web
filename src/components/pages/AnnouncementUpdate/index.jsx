import React from "react";

import { useParams } from "react-router-dom";

import CreateTemplate from "../../atoms/CreateTemp";
import CKEditor from "../../molecules/CKEditor";

function AnnouncementUpdate() {
  const { id } = useParams();

  return (
    <CreateTemplate title="Pengumuman">
      <CKEditor id={id} titles="Submit"></CKEditor>
    </CreateTemplate>
  );
}

export default AnnouncementUpdate;
