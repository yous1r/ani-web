import { createSignal } from "solid-js"

import { showNotification } from "../../utils"
import { store } from "../../store"
import { api } from "../../api"

function SettingsPage() {
    const [config, setConfig] = createSignal(store.config);

    const handleSave = async () => {
        try {
            await api.updateConfig(config());
            showNotification('设置已保存', 'success');
        } catch (error) {
            showNotification('保存失败', 'error');
        }
    };

    return (
        <>
            <div class="page-header">
                <h1 class="page-title">系统设置</h1>
                <p class="page-subtitle">配置系统参数</p>
            </div>

            <div style="background: white; border-radius: 16px; padding: 2rem;">
                <div class="form-group">
                    <label class="form-label">RSS更新间隔（分钟）</label>
                    <input
                        class="form-input"
                        type="number"
                        value={config().rssInterval}
                        onInput={e => setConfig({ ...config(), rssInterval: parseInt(e.target.value) })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">下载目录</label>
                    <input
                        class="form-input"
                        type="text"
                        value={config().downloadPath}
                        onInput={e => setConfig({ ...config(), downloadPath: e.target.value })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">qBittorrent 地址</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="http://localhost:8080"
                        value={config().qbittorrentUrl || ''}
                        onInput={e => setConfig({ ...config(), qbittorrentUrl: e.target.value })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">启用的RSS源</label>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <For each={['mikan', 'dmhy', 'nyaa', 'acgrip']}>
                            {source => (
                                <div class="form-switch">
                                    <div
                                        class={`switch ${config().enabledSources?.includes(source) ? 'active' : ''}`}
                                        onClick={() => {
                                            const sources = config().enabledSources || [];
                                            if (sources.includes(source)) {
                                                setConfig({
                                                    ...config(),
                                                    enabledSources: sources.filter(s => s !== source)
                                                });
                                            } else {
                                                setConfig({
                                                    ...config(),
                                                    enabledSources: [...sources, source]
                                                });
                                            }
                                        }}
                                    >
                                        <div class="switch-handle"></div>
                                    </div>
                                    <span>{source.toUpperCase()}</span>
                                </div>
                            )}
                        </For>
                    </div>
                </div>

                <button class="btn btn-primary" onClick={handleSave}>
                    保存设置
                </button>
            </div>
        </>
    );
};

export default SettingsPage;