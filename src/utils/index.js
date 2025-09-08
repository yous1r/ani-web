import { setStore } from "../store"
import { api } from "../api"

// 通知系统
export function showNotification(message, type = 'info') {
    setStore('notification', { message, type });
    setTimeout(() => setStore('notification', null), 3000);
}

// 加载数据
export async function loadAnimes() {
    setStore('isLoading', true);
    try {
        const animes = await api.getAnimes();
        setStore('animes', animes);
    } catch (error) {
        showNotification('加载失败', 'error');
    } finally {
        setStore('isLoading', false);
    }
}

export async function loadTasks() {
    try {
        const tasks = await api.getTasks();
        setStore('tasks', tasks);
    } catch (error) {
        console.error('Failed to load tasks:', error);
    }
}
