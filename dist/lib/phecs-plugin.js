"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = require("phaser");
var entity_manager_1 = require("./entity-manager");
var systems_manager_1 = require("./systems-manager");
var phecs_registry_1 = require("./phecs-registry");
var phecs_factory_1 = require("./phecs-factory");
var PhecsPlugin = /** @class */ (function (_super) {
    __extends(PhecsPlugin, _super);
    function PhecsPlugin(scene, pluginManager) {
        var _this = _super.call(this, scene, pluginManager) || this;
        _this.phEntities = new entity_manager_1.EntityManager(scene);
        _this.phSystems = new systems_manager_1.SystemsManager(scene);
        _this.register = new phecs_registry_1.PhecsRegistry(_this.phEntities, _this.phSystems);
        _this.add = new phecs_factory_1.PhecsFactory(_this.phEntities);
        _this.scene.events.once(phaser_1.default.Scenes.Events.CREATE, _this.start, _this);
        _this.scene.events.once(phaser_1.default.Scenes.Events.SHUTDOWN, _this.shutdown, _this);
        return _this;
    }
    PhecsPlugin.prototype.update = function () {
        this.phSystems.update(this.phEntities);
    };
    PhecsPlugin.prototype.start = function () {
        this.phSystems.start(this.phEntities);
        this.scene.events.on(phaser_1.default.Scenes.Events.POST_UPDATE, this.update, this);
    };
    PhecsPlugin.prototype.shutdown = function () {
        this.scene.events.off(phaser_1.default.Scenes.Events.POST_UPDATE, this.update, this);
        this.phSystems.stop(this.phEntities);
        this.phEntities.destroy();
        this.phSystems.destroy();
    };
    return PhecsPlugin;
}(phaser_1.default.Plugins.ScenePlugin));
exports.PhecsPlugin = PhecsPlugin;
//# sourceMappingURL=phecs-plugin.js.map