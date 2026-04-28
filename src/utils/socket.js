import { io } from "socket.io-client";

export default const socket = io("https://backend-multi-vendor-ecommerce-xa4b.onrender.com", {
  withCredentials: true,
  transports: ["websocket"]  
});