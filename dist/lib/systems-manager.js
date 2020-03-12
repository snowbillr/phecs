"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SystemsManager = /** @class */ (function () {
    function SystemsManager(scene) {
        this.scene = scene;
        this.systems = [];
    }
    SystemsManager.prototype.start = function (entityManager) {
        this.systems.forEach(function (system) {
            if (system.start) {
                system.start(entityManager);
            }
        });
    };
    SystemsManager.prototype.stop = function (entityManager) {
        this.systems.forEach(function (system) {
            if (system.stop) {
                system.stop(entityManager);
            }
        });
    };
    SystemsManager.prototype.update = function (entityManager) {
        this.systems.forEach(function (system) {
            if (system.update) {
                system.update(entityManager);
            }
        });
    };
    SystemsManager.prototype.destroy = function () {
        this.systems.forEach(function (system) {
            if (system.destroy) {
                system.destroy();
            }
        });
        this.systems = [];
    };
    SystemsManager.prototype.registerSystems = function (systemsList) {
        var _this = this;
        systemsList.forEach(function (klass) {
            _this.systems.push(new klass(_this.scene));
        });
    };
    return SystemsManager;
}());
exports.SystemsManager = SystemsManager;
//# sourceMappingURL=systems-manager.js.map