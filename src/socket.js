import io from "socket.io-client";

// const SOCKET_URL = "http://localhost:8080";
const SOCKET_URL = `https://gafuroff-backend.medme.uz/`;
const headers = { transports: ["websocket"] };
const socket = io(SOCKET_URL, headers);

export default socket;
