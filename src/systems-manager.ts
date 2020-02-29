import Phaser from 'phaser';
import { EntityManager } from './entity-manager';

export class SystemsManager {
  private scene: Phaser.Scene;

  private systems: Phecs.System[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as Phaser.Scene;

    this.systems = [];
  }

  start(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.start) {
        system.start(entityManager);
      }
    })
  }

  stop(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.stop) {
        system.stop(entityManager);
      }
    })
  }

  update(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.update) {
        system.update(entityManager);
      }
    });
  }

  destroy() {
    this.systems.forEach(system => {
      if (system.destroy) {
        system.destroy();
      }
    });
    
    this.systems = [];
  }

  registerSystems(systemsList: Phecs.SystemConstructor[]) {
    systemsList.forEach((klass) => {
      this.systems.push(new klass(this.scene));
    });
  }
}
