import { store } from "../../store"

function TasksPage() {
    return (
        <>
            <div class="page-header">
                <h1 class="page-title">下载任务</h1>
                <p class="page-subtitle">查看和管理下载任务</p>
            </div>

            <Show when={store.tasks.length > 0} fallback={
                <div class="empty-state">
                    <div class="empty-icon">📥</div>
                    <div class="empty-text">暂无下载任务</div>
                </div>
            }>
                <For each={store.tasks}>
                    {task => (
                        <div class="task-item">
                            <div class="task-header">
                                <div class="task-title">
                                    {store.animes.find(a => a.id === task.animeId)?.title || '未知番剧'} - 第 {task.episode} 集
                                </div>
                                <span class={`task-status ${task.status}`}>
                                    {task.status === 'pending' && '等待中'}
                                    {task.status === 'downloading' && '下载中'}
                                    {task.status === 'completed' && '已完成'}
                                    {task.status === 'failed' && '失败'}
                                </span>
                            </div>
                            <Show when={task.status === 'downloading'}>
                                <div class="progress-bar">
                                    <div class="progress-fill" style={`width: ${task.progress}%`}></div>
                                </div>
                                <div class="task-meta">
                                    <span>进度: {task.progress.toFixed(1)}%</span>
                                    <span>速度: {task.speed || '计算中'}</span>
                                    <span>剩余: {task.eta || '计算中'}</span>
                                </div>
                            </Show>
                        </div>
                    )}
                </For>
            </Show>
        </>
    );
};

export default TasksPage;