// import Map from "../components/Map";
// import Sidebar from "../components/Sidebar";
// import User from "../components/User";

import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
