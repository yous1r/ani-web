import { store } from "../../store"

function Notification() {
    return (
        <div class={`notification ${store.notification?.type}`}>
            <span>{store.notification?.message}</span>
        </div>
    );
}

export default Notification;