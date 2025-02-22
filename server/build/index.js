"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 9000;
const one = 1;
const two = 2;
app.get('/', (req, res) => {
    res.send(`${one} + ${two} = ${one + two}`);
});
app.listen(port);
console.log(`[app] is listening on port ${port}`);
