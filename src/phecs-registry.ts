import { EntityManager } from './entity-manager';
import { SystemsManager } from './systems-manager';

export class PhecsRegistry {
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
