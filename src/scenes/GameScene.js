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

    // Arrange gem sprites in a circle and set alpha from 0 to 1
    const gemData = [
      { frame: "gold", scale: 1 },
      { frame: "gold", scale: 2 },
      { frame: "gold", scale: 1 },
      { frame: "gold", scale: 1 },
      { frame: "ruby", scale: 1 },
      { frame: "sapphire", scale: 1 },
      { frame: "emerald", scale: 0.5, scaleY: 2 }
    ];

    const centerX = 200;
    const centerY = 200;
    const radius = 100;
    const total = gemData.length;
    gemData.forEach((gem, i) =>
    {
      const angle = (2 * Math.PI * i) / total;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const sprite = this.add.sprite(x, y, "gems", gem.frame);
      if (gem.scaleY)
      {
        sprite.setScale(gem.scale, gem.scaleY);
      } else
      {
        sprite.setScale(gem.scale);
      }
      sprite.setAlpha(i / (total - 1));
    });
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