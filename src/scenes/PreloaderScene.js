export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  preload() {
    // Example: Load a sprite sheet or an image.
    // Add more assets as your game grows.
    this.load.image("bg", "assets/bg.jpg");
    this.load.spritesheet("player_idle", "assets/player_idle.png", { 
      frameWidth: 24, 
      frameHeight: 24
    });

    this.load.spritesheet("player_walk", "assets/player_walk.png", { 
      frameWidth: 24, 
      frameHeight: 24
    });

    this.load.text("sayaka_dialog", "assets/dialogs/sayaka_dialog.csv");

    this.load.image("Sayaka_angry1", "assets/sayaka/Sayaka_angry1.png");
    this.load.image("Sayaka_idle1", "assets/sayaka/Sayaka_idle1.png");
    this.load.image("Sayaka_idle2", "assets/sayaka/Sayaka_idle2.png");
    this.load.image("Sayaka_thinking1", "assets/sayaka/Sayaka_thinking1.png");
    this.load.image("Sayaka_thinking2", "assets/sayaka/Sayaka_thinking2.png");
  }

  create() {
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    // All assets loaded – move to main game scene
    this.scene.start('GameScene');
  }
}