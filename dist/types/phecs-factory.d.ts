import { EntityManager } from './entity-manager';
export declare class PhecsFactory {
    private phEntities;
    constructor(phEntities: EntityManager);
    prefab(type: string, properties: Record<string, any>, x: number, y: number): import("./entity").Entity;
    entity(components: any[], x: number, y: number): import("./entity").Entity;
}
