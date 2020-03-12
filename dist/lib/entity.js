"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_util_1 = require("./uuid-util");
var Entity = /** @class */ (function () {
    function Entity(type) {
        this.type = type;
        this.id = uuid_util_1.generateUuid();
        this.components = [];
    }
    Entity.prototype.getComponent = function (componentKlass) {
        var foundComponent = this.components.find(function (component) {
            return component instanceof componentKlass;
        });
        if (foundComponent) {
            return foundComponent;
        }
        throw new Error("Entity::NO_COMPONENT_" + typeof componentKlass);
    };
    Entity.prototype.hasComponent = function (componentKlass) {
        return this.components.some(function (component) { return component instanceof componentKlass; });
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map