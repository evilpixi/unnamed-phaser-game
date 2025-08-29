export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load anything that needs to be available immediately,
    // like a loading bar or basic assets.
  }

  create() {
    // Fast forward to the Preloader
    this.scene.start('PreloaderScene');
  }
}