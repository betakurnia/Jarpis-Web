import React from "react";
import CreateTemplate from "../../molecules/CreateTemplate";
import CKEditor from "../../atoms/CKEditor";
import { useParams } from "react-router-dom";

function AnnouncementUpdate() {
  const { id } = useParams();

  return (
    <CreateTemplate title="Update Pengumuman">
      <CKEditor id={id} titles="Update"></CKEditor>
    </CreateTemplate>
  );
}

export default AnnouncementUpdate;
