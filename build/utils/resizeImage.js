"use strict";
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
exports.imageResize = exports.newFile = exports.createThumb = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const thumb = './thumbnail';
const createThumb = () => {
    if (!fs_1.default.existsSync(thumb)) {
        fs_1.default.mkdirSync(thumb);
    }
};
exports.createThumb = createThumb;
const newFile = (req) => {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    const newFilePath = `${thumb}/${filename}_${width}x${height}.jpg`;
    if (fs_1.default.existsSync(newFilePath)) {
        return [newFilePath, true];
    }
    else {
        return [newFilePath, false];
    }
};
exports.newFile = newFile;
const imageResize = (imagePath, width, height, thumbPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(imagePath).resize(width, height).toFile(thumbPath);
        console.log('Image resized');
        return 'Image resized';
    }
    catch (error) {
        console.log('error');
        return 'error';
    }
});
exports.imageResize = imageResize;
