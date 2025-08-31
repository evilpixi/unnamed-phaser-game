import Player from "../entities/Player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.isPlayerInZone = false;

    const RESOLUTION = {
      width: this.scale.width,
      height: this.scale.height
    }
    this.bg = this.add.image(0, 0, "bg").setOrigin(0);
    this.bg.displayWidth = RESOLUTION.width;
    this.bg.displayHeight = RESOLUTION.height;

    this.player = new Player(this, RESOLUTION.width * 0.4, RESOLUTION.height / 2);
    this.player.scale = 3
    this.player.depth = 10

    this.zone = this.add.rectangle(RESOLUTION.width * 0.7, RESOLUTION.height / 2, 200, 200, 0x00ff00, 0.5);
    this.zone.setInteractive();
    this.zone.on('pointerdown', () => {
      this.startDialog("sayaka_dialog");
    });

    this.physics.add.existing(this.zone, true);

    this.physics.add.overlap(this.player, this.zone, () => {
      this.isPlayerInZone = true;
    });

    this.debugText = this.add.text(16, 16, 'Debug Info', { fontSize: '16px', fill: '#fff' });

    this.events.on('update', () => {
      if (!this.physics.overlap(this.player, this.zone)) {
      this.isPlayerInZone = false;
      }
    });

    this.input.keyboard.on('keydown-A', () => {
      this.startDialog("sayaka_dialog");
      // if (this.isPlayerInZone) {
      //   this.startDialog();
      // }
    });

    this.add.sprite(100, 100, "gems", "gold")
    this.add.sprite(150, 100, "gems", "gold").setScale(2)
    this.add.sprite(200, 100, "gems", "gold")
    this.add.sprite(100, 170, "gems", "ruby")
    this.add.sprite(150, 170, "gems", "sapphire").setAlpha(0.5)
    this.add.sprite(200, 170, "gems", "emerald").setScale(0.5, 2)
  }

  startDialog(dialogKey) {
    console.log("passing " + dialogKey)
    this.scene.pause();
    this.scene.launch('DialogScene', { 
      dialogKey: dialogKey,
      parentScene: this
    });
  }

  update() {
    this.debugText.setText(`Debug Info\nPlayer in Zone: ${this.isPlayerInZone}`);
  }
}