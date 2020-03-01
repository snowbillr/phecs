import { EntityManager } from './entity-manager';

export class PhecsFactory {
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
