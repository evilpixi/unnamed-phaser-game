import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player_idle');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Animations
    this.anims.play('player_idle');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const speed = 160;
    let moving = false;

    if (this.cursors.left.isDown) {
      this.setVelocityX(-speed);
      this.setFlipX(true);
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(speed);
      this.setFlipX(false);
      moving = true;
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-speed);
      moving = true;
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(speed);
      moving = true;
    } else {
      this.setVelocityY(0);
    }

    // Animation switching
    if (moving) {
      if (this.anims.currentAnim?.key !== 'player_walk') {
        this.anims.play('player_walk', true);
      }
    } else {
      if (this.anims.currentAnim?.key !== 'player_idle') {
        this.anims.play('player_idle', true);
      }
    }
  }
}