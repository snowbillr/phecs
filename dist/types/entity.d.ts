export declare class Entity implements Entity {
    type: string;
    id: string;
    components: Component[];
    constructor(type: string);
    getComponent<T extends ComponentConstructor>(componentKlass: T): InstanceType<T>;
    hasComponent<T extends ComponentConstructor>(componentKlass: T): boolean;
}
