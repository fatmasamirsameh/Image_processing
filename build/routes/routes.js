"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resizeImage = __importStar(require("../utils/resizeImage"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const width = req.query.width;
        const width2 = parseInt(width);
        const height = req.query.height;
        const height2 = parseInt(height);
        if (!req.query.filename) {
            res.send({ error: 'please put filename value ,ex:filename=encenadaport' });
            return;
        }
        else if (!req.query.height) {
            res.send({ error: 'please put height value ,ex:height=1273' });
            return;
        }
        else if (!req.query.width) {
            res.send({ error: 'please put width value ,ex:width=1920' });
            return;
        }
        else if (isNaN(width2)) {
            res.send({ error: 'please put width value as number' });
            return;
        }
        else if (isNaN(height2)) {
            res.send({ error: 'please put height value as number' });
            return;
        }
        else {
            const imagePath = `./images/${req.query.filename}.jpg`;
            if (fs_1.default.existsSync(imagePath)) {
                const thumbExists = resizeImage.newFile(req);
                console.log(thumbExists);
                if (thumbExists[1] == false) {
                    yield resizeImage.imageResize(imagePath, width2, height2, thumbExists[0]);
                    res.sendFile(path_1.default.resolve(thumbExists[0]));
                }
                else {
                    res.sendFile(path_1.default.resolve(thumbExists[0]));
                    console.log('not resized');
                }
            }
            else {
                res.send({
                    error: 'Image not found ,please enter valid filename',
                });
                return;
            }
        }
    }
    catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}));
exports.default = routes;
