import { createSignal } from "solid-js"

import { store } from "../../store"

import AddAnimeModal from "./AddAnimeModal";
import AnimeDetailModal from "./AnimeDetailModal";
import AnimeCard from "../AnimeCard";

function AnimesPage() {
    const [showAddModal, setShowAddModal] = createSignal(false);
    const [selectedAnime, setSelectedAnime] = createSignal(null);

    return (
        <>
            <div class="page-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h1 class="page-title">番剧管理</h1>
                        <p class="page-subtitle">管理你的追番列表</p>
                    </div>
                    <button class="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        + 添加番剧
                    </button>
                </div>
            </div>

            <Show when={store.animes.length === 0} fallback={
                <div class="anime-grid">
                    <For each={store.animes}>
                        {anime => <AnimeCard anime={anime} onSelect={setSelectedAnime} />}
                    </For>
                </div>
            }>
                <div class="empty-state">
                    <div class="empty-icon">📺</div>
                    <div class="empty-text">还没有添加任何番剧</div>
                    <button class="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        添加第一部番剧
                    </button>
                </div>
            </Show>

            <Show when={showAddModal()}>
                <AddAnimeModal onClose={() => setShowAddModal(false)} />
            </Show>

            <Show when={selectedAnime()}>
                <AnimeDetailModal
                    anime={selectedAnime()}
                    onClose={() => setSelectedAnime(null)}
                />
            </Show>
        </>
    );
}

export default AnimesPage;