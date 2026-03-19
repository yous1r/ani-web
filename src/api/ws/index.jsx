import { showNotification } from "../../utils"
import { setStore } from "../../store"

const WS_URL = 'ws://localhost:8080/ws';

// WebSocket 连接
export function connectWebSocket() {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log('WebSocket connected');
        showNotification('已连接到服务器', 'success');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWSMessage(data);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        showNotification('连接错误', 'error');
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected');
        showNotification('与服务器断开连接', 'info');
        // 5秒后重连
        setTimeout(connectWebSocket, 5000);
    };

    setStore('ws', ws);
}

function handleWSMessage(data) {
    switch (data.type) {
        case 'initial':
            setStore('animes', data.animes || []);
            setStore('episodes', data.episodes || {});
            setStore('tasks', data.tasks || []);
            break;
        case 'newEpisode':
            showNotification(`新剧集: ${data.data.title}`, 'success');
            loadEpisodes(data.data.animeId);
            break;
        case 'taskUpdate':
            updateTask(data.data);
            break;
    }
}
