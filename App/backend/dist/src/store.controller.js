"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async getItems() {
        return this.storeService.getItems();
    }
    async purchase(req, itemId) {
        return this.storeService.purchaseItem(req.user.userId, itemId);
    }
    async getInventory(req) {
        return this.storeService.getInventory(req.user.userId);
    }
    async equip(req, itemId) {
        return this.storeService.equipItem(req.user.userId, itemId);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Get)('items'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getItems", null);
__decorate([
    (0, common_1.Post)('purchase'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "purchase", null);
__decorate([
    (0, common_1.Get)('inventory'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Post)('equip'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "equip", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map