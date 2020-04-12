import Phaser from 'phaser';
import { EntityManager } from './entity-manager';

interface System {
  start?(phEntities: any): void;
  stop?(phEntities: any): void;
  update?(phEntities: any): void;
  destroy?(): void;
}

export interface SystemConstructor {
  new(scene: Phaser.Scene): System;
}

export class SystemsManager {
  private scene: Phaser.Scene;

  private systems: System[];

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

  registerSystems(systemsList: SystemConstructor[]) {
    systemsList.forEach((klass) => {
      this.systems.push(new klass(this.scene));
    });
  }
}
