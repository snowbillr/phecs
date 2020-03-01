import { generateUuid } from "./uuid-util";

export class Entity implements Entity {
  public type: string;
  public id: string;
  public components: Component[];

  constructor(type: string) {
    this.type = type;
    this.id = generateUuid();
    this.components = [];
  }

  getComponent<T extends ComponentConstructor>(componentKlass: T): InstanceType<T> {
    const foundComponent = this.components.find(component => {
      return component instanceof componentKlass;
    });

    if (foundComponent) {
      return foundComponent as InstanceType<T>;
    }

    throw new Error(`Entity::NO_COMPONENT_${typeof componentKlass}`);
  }

  hasComponent<T extends ComponentConstructor>(componentKlass: T): boolean {
    return this.components.some(component => component instanceof componentKlass);
  }
}
