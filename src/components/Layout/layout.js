import React, { useState } from "react";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import SideMenu from "../SideMenu";
import styles from "./styles.module.css";

export default function Layout({ children, setStartProgress }) {
  return (
    <div>
      <Header />
      <Grid container lg={12}>
        <Grid
          item
          lg={1.5}
          md={2}
          sm={3}
          xs={3}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            backgroundColor: "rgb(12, 52, 110)",
            height: "100vh",
            boxShadow: "2px 3px 6px 0px #000",
          }}
          className={styles.sideMenuContainer}
        >
          <SideMenu setStartProgress={setStartProgress} />
        </Grid>
        <Grid item lg={10.5} md={10} sm={9} xs={12}>
          {children}
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}
