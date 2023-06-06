import { Grid } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { Space_Grotesk } from "next/font/google";
import styles from "./styles.module.css";

const spaceFont = Space_Grotesk({
  weight: "700",
  subsets: ["latin-ext"],
});

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Grid container lg={12}>
        <Grid
          lg={1.5}
          md={2}
          sm={3}
          xs={3}
          display={"flex"}
          flexDirection={"column"}
          sx={{ backgroundColor: "rgb(35, 48, 68)", height: "100vh" }}
          className={styles.sideMenuContainer}
        >
          <SideMenu />
        </Grid>
        <Grid lg={10.5} md={10} sm={9} xs={12}>
          {children}
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}
