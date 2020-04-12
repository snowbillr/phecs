import { Entity, EntityData, EntityIdentifier } from './entity';

type PrefabMap = { [key: string]: Prefab };

type PrefabComponentDefinition = {
  component: ComponentConstructor,
  data?: {
    [key: string]: any,
  }
}

export type Prefab = {
  components: (PrefabComponentDefinition | ComponentConstructor)[];
}

export interface Component {
  [key: string]: any;
  onAdd?(): void;
  destroy(): void;
}

export interface ComponentConstructor {
  new(scene: Phaser.Scene, data: EntityData, entity: Entity): Component;
}

export class EntityManager {
  private scene: Phaser.Scene;

  private prefabs: PrefabMap;
  private entities: Entity[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.prefabs = {};

    this.entities = [];
  }

  registerPrefab(key: string, prefab: Prefab) {
    this.prefabs[key] = prefab;
  }

  createPrefab(type: string, properties: any, x: number = 0, y: number = 0): Entity {
    const prefab = this.prefabs[type];
    return this.createEntity(prefab.components, x, y, properties, type);
  }

  createEntity(components: (PrefabComponentDefinition | ComponentConstructor)[], x: number, y: number, properties?: Record<string, any>, type?: string): Entity {
    const entity = new Entity(this.scene, type ?? 'custom');
    const componentDefinitions = this.getComponentDefinitions(components);

    componentDefinitions.forEach((componentDefinition: PrefabComponentDefinition) => {
      entity.addComponent(componentDefinition.component, {
        ...properties,
        ...componentDefinition.data,
        x,
        y
      });
    });

    this.entities.push(entity);

    return entity;
  }

  // by id
  // by component
  // by prefab type
  /*
  query() {

  }
  */

  getEntityById(id: string) {
    return this.entities.find(entity => entity.id === id);
  }

  getEntities(identifier: EntityIdentifier) {
    if (typeof identifier === 'string') {
      return this.getEntitiesByType(identifier);
    } else if (typeof identifier === 'function') {
      return this.getEntitiesByComponent(identifier);
    } else {
      throw new Error(`Phecs.EntityManager::BAD_ENTITY_IDENTIFIER::${identifier}`);
    }
  }

  destroy() {
    this.entities.forEach(entity => {
      entity.components.forEach(component => component.destroy());
    });

    this.entities = [];
  }

  private getComponentDefinitions(rawComponentList: (PrefabComponentDefinition | ComponentConstructor)[]): PrefabComponentDefinition[] {
    return rawComponentList.map(componentDefinition => {
      if (typeof componentDefinition === 'function') {
        return {
          component: componentDefinition,
        };
      }
      else {
        return componentDefinition;
      }
    });
  }

  private getEntitiesByComponent(component: ComponentConstructor) {
    return this.entities.filter(entity => {
      return entity.hasComponent(component);
    });
  }

  private getEntitiesByType(type: string) {
    return this.entities.filter(entity => entity.type === type);
  }

}
