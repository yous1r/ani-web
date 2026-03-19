import { api } from "../../api"
import { loadAnimes } from "../../utils"

function AnimeCard(props) {
    return (
        <div class="anime-card" onClick={() => props.onSelect?.(props.anime)}>
            <div class="anime-poster">
                <Show when={props.anime.poster}>
                    <img src={props.anime.poster} alt={props.anime.title} />
                </Show>
                <span class={`anime-status ${props.anime.enabled ? '' : 'paused'}`}>
                    {props.anime.status === 'ongoing' ? '连载中' : '已完结'}
                </span>
            </div>
            <div class="anime-info">
                <div class="anime-title">{props.anime.title}</div>
                <div class="anime-meta">
                    <span>📅 {props.anime.season || '2024'}</span>
                    <span>📺 第{props.anime.lastEpisode || 0}集</span>
                </div>
                <div class="anime-actions">
                    <button
                        class={`btn ${props.anime.enabled ? 'btn-success' : 'btn-danger'} btn-icon`}
                        onClick={async (e) => {
                            e.stopPropagation();
                            await api.updateAnime(props.anime.id, { enabled: !props.anime.enabled });
                            loadAnimes();
                        }}
                    >
                        {props.anime.enabled ? '✅' : '⏸️'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AnimeCard;