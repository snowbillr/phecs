import Phaser from 'phaser';

import { EntityManager } from './entity-manager';
import { SystemsManager } from './systems-manager';

class PhecsRegistry {
  constructor(
    private phEntities: EntityManager,
    private phSystems: SystemsManager
  ) {}

  system(systemClass: Phecs.SystemConstructor) {
    this.phSystems.registerSystems([systemClass]);
  }

  prefab(key: string, prefab: Phecs.Prefab) {
    this.phEntities.registerPrefab(key, prefab);
  }
}

class PhecsFactory {
  constructor(
    private phEntities: EntityManager,
  ) {}

  prefab(type: string, properties: Record<string, any>, x: number, y: number) {
    this.phEntities.createPrefab(type, properties, 0, x, y);
  }

  entity(components: any[], x: number, y: number) {
    this.phEntities.createEntity(components, x, y);
  }
}

export class PhecsPlugin extends Phaser.Plugins.ScenePlugin {
  public phEntities: EntityManager;
  public phSystems: SystemsManager;

  public register: PhecsRegistry;
  public add: PhecsFactory;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.phEntities = new EntityManager(scene);
    this.phSystems = new SystemsManager(scene);

    this.register = new PhecsRegistry(this.phEntities, this.phSystems);
    this.add = new PhecsFactory(this.phEntities);

    this.scene.events.once(Phaser.Scenes.Events.CREATE, this.start, this);
  }

  start() {
    this.phSystems.start(this.phEntities);
    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
  }

  stop() {
    this.phSystems.stop(this.phEntities);
    this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
  }

  update() {
    this.phSystems.update(this.phEntities);
  }

  destroy() {
    this.phEntities.destroy();
  }

  reset() {
    this.stop();
    this.destroy();
  }

  shutdown() {
    this.stop();
    this.destroy();
    this.phSystems.destroy();
  }
}
