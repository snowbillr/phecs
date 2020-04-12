import { generateUuid } from "./uuid-util";
import { ComponentConstructor, Component } from 'entity-manager';

export type EntityData = {
  x: number,
  y: number,
  [key: string]: any
};

export type EntityIdentifier = ComponentConstructor | string;

export class Entity {
  private scene: Phaser.Scene;

  public type: string;
  public id: string;
  public components: Component[];

  constructor(scene: Phaser.Scene, type: string) {
    this.scene = scene;

    this.type = type;
    this.id = generateUuid();
    this.components = [];
  }

  addComponent(componentKlass: ComponentConstructor, data: EntityData): void {
    const component = new componentKlass(this.scene, data, this);

    component.onAdd?.();

    this.components.push(component);
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
