import { Entity } from './entity';

type PrefabMap = { [key: string]: Phecs.Prefab };
type EntityMap = { [name: string]: Phecs.Entity };

export class EntityManager {
  private scene: Phaser.Scene;

  private prefabs: PrefabMap;
  private entitiesById: EntityMap;
  private entities: Phecs.Entity[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.prefabs = {};

    this.entitiesById = {};
    this.entities = [];
  }

  registerPrefab(key: string, prefab: Phecs.Prefab) {
    this.prefabs[key] = prefab;
  }

  createPrefab(type: string, properties: any, depth: number = 0, x: number = 0, y: number = 0) {
    const entity = new Entity(type);
    const prefab = this.prefabs[type];

    const prefabProperties = {
      x,
      y,
      depth,
      ...properties
    };

    this.getComponentDefinitions(prefab.components).forEach((componentDefinition: Phecs.PrefabComponentDefinition) => {
      const component = new componentDefinition.component(this.scene, {
        ...componentDefinition.data,
        ...prefabProperties,
      }, entity);

      entity.components.push(component);
    });

    this.entitiesById[entity.id] = entity;
    this.entities.push(entity);

    return entity;
  }

  createEntity(components: Phecs.PrefabComponentDefinition[], x: number, y: number) {
    const entity = new Entity('custom');
    const componentDefinitions = this.getComponentDefinitions(components);

    componentDefinitions.forEach((componentDefinition: Phecs.PrefabComponentDefinition) => {
      const component = new componentDefinition.component(this.scene, {
        ...componentDefinition.data,
        x,
        y,
        depth: 0
      }, entity);

      entity.components.push(component);
    });

    this.entitiesById[entity.id] = entity;
    this.entities.push(entity);

    return entity;
  }

  getEntityById(id: string) {
    return this.entitiesById[id];
  }

  getEntities(identifier: Phecs.EntityIdentifier) {
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

    this.entitiesById = {};
    this.entities = [];
  }

  private getComponentDefinitions(rawComponentList: (Phecs.PrefabComponentDefinition | Phecs.ComponentConstructor)[]): Phecs.PrefabComponentDefinition[] {
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

  private getEntitiesByComponent(component: Phecs.ComponentConstructor) {
    return this.entities.filter(entity => {
      return entity.hasComponent(component);
    });
  }

  private getEntitiesByType(type: string) {
    return this.entities.filter(entity => entity.type === type);
  }

}
