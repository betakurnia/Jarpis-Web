import React from "react";
import Card from "../../molecules/Card";
import { Grid } from "@material-ui/core";

function Dashboard() {
  return (
    <div>
      <Grid container spacing={2}>
        <Card title="title" description="description" />
        <Card title="title" description="description" />
        <Card title="title" description="description" />
        <Card title="title" description="description" />
      </Grid>
    </div>
  );
}

export default Dashboard;
