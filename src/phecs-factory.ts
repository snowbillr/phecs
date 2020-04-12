import { EntityManager } from './entity-manager';

export class PhecsFactory {
  constructor(
    private phEntities: EntityManager,
  ) {}

  prefab(type: string, properties: Record<string, any>, x: number, y: number) {
    return this.phEntities.createPrefab(type, properties, x, y);
  }

  entity(components: any[], x: number, y: number) {
    return this.phEntities.createEntity(components, x, y);
  }
}
