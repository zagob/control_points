import type { NextPage } from "next";
import { useState } from "react";
import styles from "./home.module.scss";

const Home: NextPage = () => {
  const [entry, setEntry] = useState("");
  const [exitLunch, setExitLunch] = useState("");
  const [backLunch, setBackLunch] = useState("");
  const [exit, setExit] = useState("");
  console.log()
  return (
    <div className={styles.container}>
      <div>
        <input
          type="time"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
      </div>
      <div>
        <input
          type="time"
          value={exitLunch}
          onChange={(e) => setExitLunch(e.target.value)}
        />
      </div>
      <div>
        <input
          type="time"
          value={backLunch}
          onChange={(e) => setBackLunch(e.target.value)}
        />
      </div>
      <div>
        <input
          type="time"
          value={exit}
          onChange={(e) => setExit(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
