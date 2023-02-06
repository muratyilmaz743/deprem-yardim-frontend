import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Container from "@mui/material/Container";
import LeafletMap from "@/components/UI/Map";
import { useState, useCallback } from "react";
import Drawer from "@/components/UI/Drawer/Drawer";
import { IMarker } from "@/components/UI/Map/utils";

export default function Home() {
  const [isOpen, setisOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<IMarker>();

  const toggleDrawer = useCallback(
    () => (event: React.KeyboardEvent | React.MouseEvent, markerData?: any) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      )
        return;

      setisOpen((prev) => !prev);

      if (markerData) {
        setDrawerData(markerData);
      }
    },
    []
  );

  return (
    <>
      <Head>
        <title>Afet Haritası | Anasayfa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container maxWidth={false} disableGutters>
          <LeafletMap onClickMarker={toggleDrawer()} />
        </Container>
        {drawerData && (
          <Drawer data={drawerData} isOpen={isOpen} toggler={toggleDrawer} />
        )}
      </main>
    </>
  );
}
