import { ref, onUnmounted } from 'vue';
export default function useWebSocket(options: {
  url: string;
  onConnect: (ev?: Event) => void;
  onMessage: (data: any) => void;
  onError: (ev?: Event) => void;
}) {
  const { url, onMessage, onConnect, onError } = options;
  const ws = ref<WebSocket>();
  onUnmounted(() => {
    ws.value!.close();
  });
  const connect = () => {
    ws.value = new WebSocket(url);
    ws.value.onopen = onConnect;
    ws.value.onerror = onError;
    ws.value.onmessage = (event: MessageEvent) => {
      onMessage(event.data);
    };
  };
  return {
    ws,
    connect,
  };
}
