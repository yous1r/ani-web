// import logo from './logo.svg';
// import styles from './App.module.css';

// function App() {
//   return (
//     <div class={styles.App}>
//       <header class={styles.header}>
//         <img src={logo} class={styles.logo} alt="logo" />
//         <p>
//           Edit <code>src/App.jsx</code> and save to reload.
//         </p>
//         <a
//           class={styles.link}
//           href="https://github.com/solidjs/solid"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn Solid
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// 组件
import { onMount } from "solid-js"
import Dashboard from "./layout/Dashboard";
import Sidebar from "./layout/Sidebar";
import AnimesPage from "./components/AnimesPage";
import TasksPage from "./components/TasksPage";
import SettingsPage from "./components/SettingsPage";
import Notification from "./components/Notification";

import { connectWebSocket } from "./api"
import { store } from "./store"
import { loadAnimes, loadTasks } from "./utils"


function App() {
  onMount(() => {
    connectWebSocket();
    loadAnimes();
    loadTasks();
  });

  return (
    <div class="app">
      <Sidebar />
      <div class="main-content">
        <div class="content-wrapper">
          <Switch>
            <Match when={store.currentPage === 'dashboard'}>
              <Dashboard />
            </Match>
            <Match when={store.currentPage === 'animes'}>
              <AnimesPage />
            </Match>
            <Match when={store.currentPage === 'tasks'}>
              <TasksPage />
            </Match>
            <Match when={store.currentPage === 'settings'}>
              <SettingsPage />
            </Match>
          </Switch>
        </div>
      </div>
      <Show when={store.notification}>
        <Notification />
      </Show>
    </div>
  );
}

export default App;