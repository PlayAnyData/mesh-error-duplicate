"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configModuleOptions = void 0;
const joi_1 = __importDefault(require("joi"));
exports.configModuleOptions = {
    validationSchema: joi_1.default.object({
        HTTP_PORT: joi_1.default.number()
            .min(80)
            .max(65535)
            .default(8080)
            .error(() => {
            const e = 'HTTP_PORT must be a valid port between 80 and 65535';
            console.error(e);
            return new Error(e);
        }),
        PATH_TO_SUPERGRAPH: joi_1.default.string().default('./'),
        CATALOG_URL: joi_1.default.string().default('http://localhost:8084'),
        DEBUG: joi_1.default.number().default(0)
    })
};
