import React from "react";

import Create from "../../atoms/Create";
import CKEditor from "../../molecules/CKEditor";

function Pengumuman() {
  return (
    <Create title="Pengumuman">
      <CKEditor titles="Submit" />{" "}
    </Create>
  );
}

export default Pengumuman;
