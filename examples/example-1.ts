import Phaser from 'phaser';

import { PhecsPlugin } from '../dist/phecs.es5'
import { PhecsPlugin as PhecsPluginType } from '../dist/types/phecs-plugin';

class DotComponent {
  private x: number;
  private y: number;

  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, data: any) {
    this.x = data.x;
    this.y = data.y;

    this.graphics = scene.add.graphics();
  }

  onAdd() {
    this.graphics.fillStyle(0x00FF00);
    this.graphics.fillCircle(this.x, this.y, 10);
  }
}

class PointDisplaySystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  start(phEntities: any) {
    /*
    const pointEntities = phEntities.getEntities(DotComponent);
    
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xFF0000, 1);

    pointEntities.forEach(pointEntity => {
      const pointComponent = pointEntity.getComponent(DotComponent);
      graphics.fillCircle(pointComponent.x, pointComponent.y, 10);
    });
    */
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
  private phecs!: PhecsPluginType;

  init() {
    this.phecs.register.system(PointDisplaySystem);

    this.phecs.register.prefab('point', {
      components: [
        {
          component: DotComponent,
        }
      ]
    });
  }

  create() {
    this.phecs.add.prefab('point', {}, 10, 20);
    this.phecs.add.prefab('point', {}, 100, 20);
    this.phecs.add.prefab('point', {}, 50, 100);

    this.phecs.add.entity([DotComponent], 100, 100);
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