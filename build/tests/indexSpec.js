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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resizeImage = __importStar(require("../utils/resizeImage"));
const request = (0, supertest_1.default)(index_1.default);
const filename = 'fjord';
const width = 330;
const height = 230;
const thumb = './thumbnail';
const imagePath = `./images/${filename}.jpg`;
const thumbPath = `${thumb}/${filename}_${width}x${height}.jpg`;
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('gets image ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/?filename=encenadaport.jpg&height=1237&width=1920');
        expect(response.status).toBe(200);
    }));
    it('check put filename  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('');
        expect(response.text).toBe('{"error":"please put filename value ,ex:filename=encenadaport"}');
    }));
    it('check put height ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/?filename=encenadaport');
        expect(response.text).toBe('{"error":"please put height value ,ex:height=1273"}');
    }));
    it('check put width ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/?filename=encenadaport&height=1237');
        expect(response.text).toBe('{"error":"please put width value ,ex:width=1920"}');
    }));
    it('check valid filename ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/?filename=encena&height=1237&width=1920');
        expect(response.text).toBe('{"error":"Image not found ,please enter valid filename"}');
    }));
    it('check image resize ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield resizeImage.imageResize(imagePath, width, height, thumbPath);
        expect(result).toBe('Image resized');
    }));
    it('check invalid name ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield resizeImage.imageResize(`./images/fjo.jpg`, width, height, thumbPath);
        expect(result).toBe('error');
    }));
});
