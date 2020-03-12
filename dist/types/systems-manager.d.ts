import Phaser from 'phaser';
import { EntityManager } from './entity-manager';
export declare class SystemsManager {
    private scene;
    private systems;
    constructor(scene: Phaser.Scene);
    start(entityManager: EntityManager): void;
    stop(entityManager: EntityManager): void;
    update(entityManager: EntityManager): void;
    destroy(): void;
    registerSystems(systemsList: SystemConstructor[]): void;
}
