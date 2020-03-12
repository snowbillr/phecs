import Phaser from 'phaser';
import { PhecsRegistry } from './phecs-registry';
import { PhecsFactory } from './phecs-factory';
export declare class PhecsPlugin extends Phaser.Plugins.ScenePlugin {
    private phEntities;
    private phSystems;
    register: PhecsRegistry;
    add: PhecsFactory;
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
    update(): void;
    start(): void;
    private shutdown;
}
