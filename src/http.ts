import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

// Configuração para poder utilizar o html dentro das rotas
app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html")
});

app.get("/pages/admin", (req, res) => {
    return res.render("html/admin.html")
});


const http = createServer(app); // Criando o protocolo HTTP
const io = new Server(http); // Criando o protocolo WS

io.on("connection", (socket: Socket) => {
    // console.log("Se conectou", socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io }