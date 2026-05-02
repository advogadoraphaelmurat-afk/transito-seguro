"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const missions_controller_1 = require("./missions.controller");
const missions_service_1 = require("./missions.service");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const users_service_1 = require("./users.service");
const teacher_controller_1 = require("./teacher.controller");
const teacher_service_1 = require("./teacher.service");
const store_controller_1 = require("./store.controller");
const store_service_1 = require("./store.service");
const challenges_controller_1 = require("./challenges.controller");
const challenges_service_1 = require("./challenges.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController, missions_controller_1.MissionsController, teacher_controller_1.TeacherController, store_controller_1.StoreController, challenges_controller_1.ChallengesController],
        providers: [app_service_1.AppService, missions_service_1.MissionsService, prisma_service_1.PrismaService, users_service_1.UsersService, teacher_service_1.TeacherService, store_service_1.StoreService, challenges_service_1.ChallengesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map