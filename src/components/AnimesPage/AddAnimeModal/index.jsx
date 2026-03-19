import { createSignal } from "solid-js"

import { showNotification, loadAnimes } from "../../../utils"
import { api } from "../../../api"

function AddAnimeModal(props) {
    const [formData, setFormData] = createSignal({
        title: '',
        rss: '',
        poster: '',
        season: '2024'
    });

    const handleSubmit = async () => {
        const data = formData();
        if (!data.title || !data.rss) {
            showNotification('请填写必要信息', 'error');
            return;
        }

        try {
            await api.addAnime(data);
            showNotification('添加成功', 'success');
            props.onClose();
            loadAnimes();
        } catch (error) {
            showNotification('添加失败', 'error');
        }
    };

    return (
        <div class="modal" onClick={props.onClose}>
            <div class="modal-content" onClick={e => e.stopPropagation()}>
                <div class="modal-header">
                    <h2 class="modal-title">添加番剧</h2>
                </div>

                <div class="form-group">
                    <label class="form-label">番剧名称</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="输入番剧名称"
                        value={formData().title}
                        onInput={e => setFormData({ ...formData(), title: e.target.value })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">RSS订阅地址</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="输入RSS地址"
                        value={formData().rss}
                        onInput={e => setFormData({ ...formData(), rss: e.target.value })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">封面图片</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="输入图片URL（可选）"
                        value={formData().poster}
                        onInput={e => setFormData({ ...formData(), poster: e.target.value })}
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">季度</label>
                    <input
                        class="form-input"
                        type="text"
                        placeholder="如：2024年1月"
                        value={formData().season}
                        onInput={e => setFormData({ ...formData(), season: e.target.value })}
                    />
                </div>

                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="btn" onClick={props.onClose}>取消</button>
                    <button class="btn btn-primary" onClick={handleSubmit}>添加</button>
                </div>
            </div>
        </div>
    );
}

export default AddAnimeModal;