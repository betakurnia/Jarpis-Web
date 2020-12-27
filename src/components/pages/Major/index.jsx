import React from "react";
import Topic from "../../organisms/Topic";
import { useParams } from "react-router-dom";
import axios from "axios";
import proxy from "../../../utils/proxy";

function Major() {
  const { id } = useParams();

  const [major, setMajor] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/majors/view/${id}`)
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Topic id={id} major={major} />
    </div>
  );
}

export default Major;
