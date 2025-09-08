import { connectWebSocket as ws } from "./ws"

// API 配置
const API_BASE = 'http://localhost:8080/api';


// API 方法
export const api = {
    async getAnimes() {
        const res = await fetch(`${API_BASE}/animes`);
        return res.json();
    },
    async addAnime(anime) {
        const res = await fetch(`${API_BASE}/animes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(anime)
        });
        return res.json();
    },
    async updateAnime(id, updates) {
        const res = await fetch(`${API_BASE}/animes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return res.json();
    },
    async deleteAnime(id) {
        await fetch(`${API_BASE}/animes/${id}`, {
            method: 'DELETE'
        });
    },
    async getEpisodes(animeId) {
        const res = await fetch(`${API_BASE}/animes/${animeId}/episodes`);
        return res.json();
    },
    async downloadEpisode(episodeId) {
        const res = await fetch(`${API_BASE}/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ episodeId })
        });
        return res.json();
    },
    async getTasks() {
        const res = await fetch(`${API_BASE}/tasks`);
        return res.json();
    },
    async getConfig() {
        const res = await fetch(`${API_BASE}/config`);
        return res.json();
    },
    async updateConfig(config) {
        const res = await fetch(`${API_BASE}/config`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        return res.json();
    }
};

export const connectWebSocket = ws

