import { Entity } from './entity';
export declare class EntityManager {
    private scene;
    private prefabs;
    private entities;
    constructor(scene: Phaser.Scene);
    registerPrefab(key: string, prefab: Prefab): void;
    createPrefab(type: string, properties: any, x?: number, y?: number): Entity;
    createEntity(components: PrefabComponentDefinition[], x: number, y: number): Entity;
    getEntityById(id: string): Entity | undefined;
    getEntities(identifier: EntityIdentifier): Entity[];
    destroy(): void;
    private getComponentDefinitions;
    private getEntitiesByComponent;
    private getEntitiesByType;
}
