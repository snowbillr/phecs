import Phaser from 'phaser';

import { EntityManager } from './entity-manager';
import { SystemsManager } from './systems-manager';

import { PhecsRegistry } from './phecs-registry';
import { PhecsFactory } from './phecs-factory';

export class PhecsPlugin extends Phaser.Plugins.ScenePlugin {
  private phEntities: EntityManager;
  private phSystems: SystemsManager;

  public register: PhecsRegistry;
  public add: PhecsFactory;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.phEntities = new EntityManager(scene);
    this.phSystems = new SystemsManager(scene);

    this.register = new PhecsRegistry(this.phEntities, this.phSystems);
    this.add = new PhecsFactory(this.phEntities);

    this.scene.events.once(Phaser.Scenes.Events.CREATE, this.start, this);
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  update() {
    this.phSystems.update(this.phEntities);
  }

  start() {
    this.phSystems.start(this.phEntities);
    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
  }

  private shutdown() {
    this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.update, this);

    this.phSystems.stop(this.phEntities);

    this.phEntities.destroy();
    this.phSystems.destroy();
  }
}
