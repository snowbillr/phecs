import { EntityManager } from './entity-manager';
import { SystemsManager } from './systems-manager';
export declare class PhecsRegistry {
    private phEntities;
    private phSystems;
    constructor(phEntities: EntityManager, phSystems: SystemsManager);
    system(systemClass: SystemConstructor): void;
    prefab(key: string, prefab: Prefab): void;
}
