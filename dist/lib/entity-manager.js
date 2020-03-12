"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("./entity");
var EntityManager = /** @class */ (function () {
    function EntityManager(scene) {
        this.scene = scene;
        this.prefabs = {};
        this.entities = [];
    }
    EntityManager.prototype.registerPrefab = function (key, prefab) {
        this.prefabs[key] = prefab;
    };
    EntityManager.prototype.createPrefab = function (type, properties, x, y) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var entity = new entity_1.Entity(type);
        var prefab = this.prefabs[type];
        var prefabProperties = __assign({ x: x,
            y: y }, properties);
        this.getComponentDefinitions(prefab.components).forEach(function (componentDefinition) {
            var component = new componentDefinition.component(_this.scene, __assign(__assign({}, componentDefinition.data), prefabProperties), entity);
            entity.components.push(component);
        });
        this.entities.push(entity);
        return entity;
    };
    EntityManager.prototype.createEntity = function (components, x, y) {
        var _this = this;
        var entity = new entity_1.Entity('custom');
        var componentDefinitions = this.getComponentDefinitions(components);
        componentDefinitions.forEach(function (componentDefinition) {
            var component = new componentDefinition.component(_this.scene, __assign(__assign({}, componentDefinition.data), { x: x,
                y: y }), entity);
            entity.components.push(component);
        });
        this.entities.push(entity);
        return entity;
    };
    // by id
    // by component
    // by prefab type
    /*
    query() {
  
    }
    */
    EntityManager.prototype.getEntityById = function (id) {
        return this.entities.find(function (entity) { return entity.id === id; });
    };
    EntityManager.prototype.getEntities = function (identifier) {
        if (typeof identifier === 'string') {
            return this.getEntitiesByType(identifier);
        }
        else if (typeof identifier === 'function') {
            return this.getEntitiesByComponent(identifier);
        }
        else {
            throw new Error("Phecs.EntityManager::BAD_ENTITY_IDENTIFIER::" + identifier);
        }
    };
    EntityManager.prototype.destroy = function () {
        this.entities.forEach(function (entity) {
            entity.components.forEach(function (component) { return component.destroy(); });
        });
        this.entities = [];
    };
    EntityManager.prototype.getComponentDefinitions = function (rawComponentList) {
        return rawComponentList.map(function (componentDefinition) {
            if (typeof componentDefinition === 'function') {
                return {
                    component: componentDefinition,
                };
            }
            else {
                return componentDefinition;
            }
        });
    };
    EntityManager.prototype.getEntitiesByComponent = function (component) {
        return this.entities.filter(function (entity) {
            return entity.hasComponent(component);
        });
    };
    EntityManager.prototype.getEntitiesByType = function (type) {
        return this.entities.filter(function (entity) { return entity.type === type; });
    };
    return EntityManager;
}());
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity-manager.js.map