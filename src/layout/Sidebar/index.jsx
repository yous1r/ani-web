import { store, setStore } from "../../store"

function Sidebar() {
    return (
        <div class="sidebar">
            <div class="logo">
                📺 AnimeTracker
            </div>
            <nav>
                <div
                    class={`nav-item ${store.currentPage === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setStore('currentPage', 'dashboard')}
                >
                    <span class="nav-icon">📊</span>
                    <span>仪表盘</span>
                </div>
                <div
                    class={`nav-item ${store.currentPage === 'animes' ? 'active' : ''}`}
                    onClick={() => setStore('currentPage', 'animes')}
                >
                    <span class="nav-icon">🎬</span>
                    <span>番剧管理</span>
                </div>
                <div
                    class={`nav-item ${store.currentPage === 'tasks' ? 'active' : ''}`}
                    onClick={() => setStore('currentPage', 'tasks')}
                >
                    <span class="nav-icon">📥</span>
                    <span>下载任务</span>
                </div>
                <div
                    class={`nav-item ${store.currentPage === 'settings' ? 'active' : ''}`}
                    onClick={() => setStore('currentPage', 'settings')}
                >
                    <span class="nav-icon">⚙️</span>
                    <span>系统设置</span>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;