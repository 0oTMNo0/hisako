'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { RestfulApiContext } from '@hooks/RestfulApiContext'
import React from "react";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  const { testContext } = React.useContext(RestfulApiContext);
  return (
    <div className={styles.page}>
      <Navbar></Navbar>
    </div>
  );
}
