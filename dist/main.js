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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable simple-import-sort/imports */
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const gateway_runtime_1 = require("@graphql-hive/gateway-runtime");
const gateway_config_1 = require("./gateway.config");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
            bufferLogs: false,
        });
        const config = app.get(config_1.ConfigService);
        const serveRuntime = (0, gateway_runtime_1.createGatewayRuntime)((0, gateway_config_1.gatewayConfigSupergraph)());
        app.use(serveRuntime);
        const port = config.get('HTTP_PORT');
        yield app.listen(port, '0.0.0.0');
        process.env.NODE_ENV === 'development' &&
            console.log('App running on PORT:' + port);
    });
}
bootstrap();
