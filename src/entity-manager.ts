import { Entity } from './entity';

type PrefabMap = { [key: string]: Prefab };

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

  createPrefab(type: string, properties: any, x: number = 0, y: number = 0) {
    const entity = new Entity(type);
    const prefab = this.prefabs[type];

    const prefabProperties = {
      x,
      y,
      ...properties
    };

    this.getComponentDefinitions(prefab.components).forEach((componentDefinition: PrefabComponentDefinition) => {
      const component = new componentDefinition.component(this.scene, {
        ...componentDefinition.data,
        ...prefabProperties,
      }, entity);

      entity.components.push(component);
    });

    this.entities.push(entity);

    return entity;
  }

  createEntity(components: PrefabComponentDefinition[], x: number, y: number) {
    const entity = new Entity('custom');
    const componentDefinitions = this.getComponentDefinitions(components);

    componentDefinitions.forEach((componentDefinition: PrefabComponentDefinition) => {
      const component = new componentDefinition.component(this.scene, {
        ...componentDefinition.data,
        x,
        y,
      }, entity);

      entity.components.push(component);
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
