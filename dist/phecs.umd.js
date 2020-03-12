(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phaser')) :
    typeof define === 'function' && define.amd ? define(['exports', 'phaser'], factory) :
    (factory((global.phecs = {}),global.Phaser));
}(this, (function (exports,Phaser) { 'use strict';

    Phaser = Phaser && Phaser.hasOwnProperty('default') ? Phaser['default'] : Phaser;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:one-variable-per-declaration
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var Entity = /** @class */ (function () {
        function Entity(type) {
            this.type = type;
            this.id = generateUuid();
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
            var entity = new Entity(type);
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
            var entity = new Entity('custom');
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

    var PhecsPlugin = /** @class */ (function (_super) {
        __extends(PhecsPlugin, _super);
        function PhecsPlugin(scene, pluginManager) {
            var _this = _super.call(this, scene, pluginManager) || this;
            _this.phEntities = new EntityManager(scene);
            _this.phSystems = new SystemsManager(scene);
            _this.register = new PhecsRegistry(_this.phEntities, _this.phSystems);
            _this.add = new PhecsFactory(_this.phEntities);
            _this.scene.events.once(Phaser.Scenes.Events.CREATE, _this.start, _this);
            _this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, _this.shutdown, _this);
            return _this;
        }
        PhecsPlugin.prototype.update = function () {
            this.phSystems.update(this.phEntities);
        };
        PhecsPlugin.prototype.start = function () {
            this.phSystems.start(this.phEntities);
            this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
        };
        PhecsPlugin.prototype.shutdown = function () {
            this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
            this.phSystems.stop(this.phEntities);
            this.phEntities.destroy();
            this.phSystems.destroy();
        };
        return PhecsPlugin;
    }(Phaser.Plugins.ScenePlugin));

    // Import here Polyfills if needed. Recommended core-js (npm i -D core-js)

    exports.PhecsPlugin = PhecsPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=phecs.umd.js.map
