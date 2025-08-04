export function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleString('en-US', options);
}