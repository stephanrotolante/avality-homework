"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
var cors = require('cors');
var _a = process.env.PORT, PORT = _a === void 0 ? 3333 : _a;
var app = express_1.default();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
var validateString = function (text) {
    var cleanString = text.replace(/([a-z]|[0-9]|[!@#$%^&*_+-={[\]|\\,.'"<>/?}])/g, '');
    var count = 0;
    cleanString.split('').forEach(function (char) {
        switch (char) {
            case '(':
                ++count;
                break;
            case ')':
                --count;
                break;
            default:
                break;
        }
        if (count < 0)
            return false;
    });
    return true;
};
app.post('/validate-file', function (req, res) {
    try {
        var image = req.body.file.split(",")[1];
        var buff = Buffer.from(image, 'base64');
        var valid = validateString(buff.toString());
        res.send({ valid: valid });
    }
    catch (_a) {
        res.end();
    }
});
app.post('/validate-text', function (req, res) {
    var text = req.body.text;
    var valid = validateString(text);
    res.send({ valid: valid });
});
app.listen(PORT, function () { return console.log("Server up at " + PORT); });
