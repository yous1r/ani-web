import { createMemo } from "solid-js";

import AnimeCard from "../../components/AnimeCard";

import { store } from "../../store"

function Dashboard() {
    const stats = createMemo(() => ({
        total: store.animes.length,
        active: store.animes.filter(a => a.enabled).length,
        downloading: store.tasks.filter(t => t.status === 'downloading').length,
        completed: store.tasks.filter(t => t.status === 'completed').length
    }));

    return (
        <>
            <div class="page-header">
                <h1 class="page-title">仪表盘</h1>
                <p class="page-subtitle">系统概览和统计信息</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📺</div>
                    <div class="stat-value">{stats().total}</div>
                    <div class="stat-label">总番剧数</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">{stats().active}</div>
                    <div class="stat-label">追番中</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📥</div>
                    <div class="stat-value">{stats().downloading}</div>
                    <div class="stat-label">下载中</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✨</div>
                    <div class="stat-value">{stats().completed}</div>
                    <div class="stat-label">已完成</div>
                </div>
            </div>

            <h2 style="margin: 2rem 0 1rem; color: white;">最近更新</h2>
            <div class="anime-grid">
                <For each={store.animes.slice(0, 4)}>
                    {anime => <AnimeCard anime={anime} />}
                </For>
            </div>
        </>
    );
}

export default Dashboard;