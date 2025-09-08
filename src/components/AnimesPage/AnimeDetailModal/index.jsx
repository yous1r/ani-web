import { createSignal } from "solid-js"

import { api } from "../../../api"
import { showNotification, loadAnimes } from "../../../utils"

function AnimeDetailModal(props) {
    const [episodes, setEpisodes] = createSignal([]);

    onMount(async () => {
        const eps = await api.getEpisodes(props.anime.id);
        setEpisodes(eps);
    });

    return (
        <div class="modal" onClick={props.onClose}>
            <div class="modal-content" onClick={e => e.stopPropagation()} style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">{props.anime.title}</h2>
                </div>

                <div class="episodes-list">
                    <Show when={episodes().length > 0} fallback={
                        <div class="empty-state">
                            <div class="empty-text">暂无剧集</div>
                        </div>
                    }>
                        <For each={episodes()}>
                            {episode => (
                                <div class="episode-item">
                                    <div class="episode-info">
                                        <div class="episode-number">第 {episode.number} 集</div>
                                        <div class="episode-meta">
                                            {episode.size} · {new Date(episode.publishAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <Show when={episode.downloaded} fallback={
                                        <button
                                            class="btn btn-primary"
                                            onClick={() => api.downloadEpisode(episode.id)}
                                        >
                                            下载
                                        </button>
                                    }>
                                        <span class="episode-status downloaded">已下载</span>
                                    </Show>
                                </div>
                            )}
                        </For>
                    </Show>
                </div>

                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button class="btn btn-danger" onClick={async () => {
                        await api.deleteAnime(props.anime.id);
                        props.onClose();
                        loadAnimes();
                        showNotification('删除成功', 'success');
                    }}>删除番剧</button>
                    <button class="btn" onClick={props.onClose}>关闭</button>
                </div>
            </div>
        </div>
    );
}

export default AnimeDetailModal;