"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhecsFactory = /** @class */ (function () {
    function PhecsFactory(phEntities) {
        this.phEntities = phEntities;
    }
    PhecsFactory.prototype.prefab = function (type, properties, x, y) {
        return this.phEntities.createPrefab(type, properties, x, y);
    };
    PhecsFactory.prototype.entity = function (components, x, y) {
        return this.phEntities.createEntity(components, x, y);
    };
    return PhecsFactory;
}());
exports.PhecsFactory = PhecsFactory;
//# sourceMappingURL=phecs-factory.js.map