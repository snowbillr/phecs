"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhecsRegistry = /** @class */ (function () {
    function PhecsRegistry(phEntities, phSystems) {
        this.phEntities = phEntities;
        this.phSystems = phSystems;
    }
    PhecsRegistry.prototype.system = function (systemClass) {
        this.phSystems.registerSystems([systemClass]);
    };
    PhecsRegistry.prototype.prefab = function (key, prefab) {
        this.phEntities.registerPrefab(key, prefab);
    };
    return PhecsRegistry;
}());
exports.PhecsRegistry = PhecsRegistry;
//# sourceMappingURL=phecs-registry.js.map