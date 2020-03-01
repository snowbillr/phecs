import Phaser from 'phaser';

import { PhecsPlugin } from '../dist/phecs.es5'

class PointComponent {
  private x: number;
  private y: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.x = data.x;
    this.y = data.y;
  }
}

class PointDisplaySystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  start(phEntities: any) {
    const pointEntities = phEntities.getEntities(PointComponent);
    
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xFF0000, 1);

    pointEntities.forEach(pointEntity => {
      const pointComponent = pointEntity.getComponent(PointComponent);
      graphics.fillCircle(pointComponent.x, pointComponent.y, 10);
    });
  }

  /*
  stop() {

  }

  update() {

  }

  destroy() {

  }
  */
}

class GameScene extends Phaser.Scene {
  create() {
    this.add.text(100, 100, 'hello world');

    this.phecs.phSystems.registerSystems([PointDisplaySystem]);

    this.phecs.phEntities.registerPrefab('point', {
      components: [
        {
          component: PointComponent,
        }
      ]
    });

    this.phecs.phEntities.createPrefab('point', {}, 0, 10, 20);
    this.phecs.phEntities.createPrefab('point', {}, 0, 100, 20);
    this.phecs.phEntities.createPrefab('point', {}, 0, 50, 100);

    this.phecs.start();
  }
}

const game = new Phaser.Game({
  width: 500,
  height: 500,
  scene: [GameScene],
  plugins: {
    scene: [
      {
        key: 'Phecs',
        plugin: PhecsPlugin,
        mapping: 'phecs',
      }
    ]
  }
});