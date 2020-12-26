import React from "react";

import CreateTemplate from "../../atoms/CreateTemp";
import CKEditor from "../../molecules/CKEditor";

function Pengumuman() {
  return (
    <CreateTemplate title="Pengumuman">
      <CKEditor titles="Submit" />{" "}
    </CreateTemplate>
  );
}

export default Pengumuman;
