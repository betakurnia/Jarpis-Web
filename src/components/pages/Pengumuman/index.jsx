import React from "react";
import CKEditor from "../../atoms/CKEditor";
import CreateTemplate from "../../molecules/CreateTemplate";

function Pengumuman() {
  return (
    <CreateTemplate title="Buat Pengumuman">
      <CKEditor titles="Buat" />{" "}
    </CreateTemplate>
  );
}

export default Pengumuman;
