// src/store.js
import { createStore } from 'solid-js/store';

// 全局状态管理
const [store, setStore] = createStore({
    animes: [],
    episodes: {},
    tasks: [],
    config: {
        rssInterval: 30,
        downloadPath: './downloads',
        enabledSources: ['mikan', 'dmhy', 'nyaa']
    },
    currentPage: 'dashboard',
    isLoading: false,
    notification: null,
    ws: null
});

export { store, setStore }