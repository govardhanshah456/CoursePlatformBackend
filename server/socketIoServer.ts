import http from "http"
import { Server as SocketServer } from "socket.io"
export const initSocketServer = (server: http.Server) => {
    const io = new SocketServer(server);
    io.on("connection", (socket) => {
        socket.on("sendNotification", (data) => {
            io.emit("notification", data);
        })

        socket.on("disconnect", () => {
            console.log("Disconnected")
        })
    })
}