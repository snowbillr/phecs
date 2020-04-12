import { EntityManager, Prefab } from './entity-manager';
import { SystemsManager, SystemConstructor } from './systems-manager';

export class PhecsRegistry {
  constructor(
    private phEntities: EntityManager,
    private phSystems: SystemsManager
  ) {}

  system(systemClass: SystemConstructor) {
    this.phSystems.registerSystems([systemClass]);
  }

  prefab(key: string, prefab: Prefab) {
    this.phEntities.registerPrefab(key, prefab);
  }
}
