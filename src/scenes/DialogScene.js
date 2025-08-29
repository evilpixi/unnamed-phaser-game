import DialogParser from "../components/DialogParser";
let WIDTH, HEIGHT = 0;
let CHARPOS_X = {
  left: 100,
  center: 400,
  right: 700
}

export default class DialogScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogScene' });
  }

  init(data) {
    this.dialogKey = data.dialogKey;
    this.parentScene = data.parentScene;

    this.currentPosition = 0;
    this.currentCharacter = null;
  }

  create() {
    WIDTH = this.scale.width;
    console.log("dialog!", this.dialogKey);
    HEIGHT = this.scale.height;

    CHARPOS_X.left = WIDTH * 0.25;
    CHARPOS_X.mid = WIDTH * 0.5;
    CHARPOS_X.right = WIDTH * 0.75;

    const dialogData = this.cache.text.get(this.dialogKey);
    this.dialog = DialogParser.parse(dialogData);
    console.log(this.dialog);

    const bgGraphics = this.add.graphics();
    bgGraphics.fillGradientStyle(0, 0, 0, 0, 0.2, 0.2, 1, 1);
    bgGraphics.fillRect(0, HEIGHT * 0, WIDTH, HEIGHT * 1);
    bgGraphics.depth = -2;

    // Dialog box background with gradient
    const boxBg = this.add.graphics();
    boxBg.fillGradientStyle(0x222244, 0x222244, 0x444488, 0x444488, 1, 1, 1, 1);
    boxBg.fillRoundedRect(WIDTH * 0.05, HEIGHT * 0.7, WIDTH * 0.9, HEIGHT * 0.25, 20);

    // Border for dialog box
    boxBg.lineStyle(4, 0xffffff, 0.8);
    boxBg.strokeRoundedRect(WIDTH * 0.05, HEIGHT * 0.7, WIDTH * 0.9, HEIGHT * 0.25, 20);

    // Decorative corner circles
    boxBg.fillStyle(0xffffff, 0.2);
    boxBg.fillCircle(WIDTH * 0.05 + 20, HEIGHT * 0.7 + 20, 10);
    boxBg.fillCircle(WIDTH * 0.95 - 20, HEIGHT * 0.7 + 20, 10);
    boxBg.fillCircle(WIDTH * 0.05 + 20, HEIGHT * 0.95 - 20, 10);
    boxBg.fillCircle(WIDTH * 0.95 - 20, HEIGHT * 0.95 - 20, 10);

    // Character name label background
    const nameBg = this.add.graphics();
    nameBg.fillStyle(0x333366, 0.9);
    nameBg.fillRoundedRect(WIDTH * 0.07, HEIGHT * 0.645, WIDTH * 0.3, HEIGHT * 0.06, 10);

    // Character name label text (replace 'Character Name' with actual name if available)
    this.nameLabel = this.add.text(WIDTH * 0.085, HEIGHT * 0.65, 'Character Name', {
      fontFamily: 'Arial',
      fontSize: Math.floor(HEIGHT * 0.045),
      color: '#fff',
      fontStyle: 'bold'
    });

    // Dialog text placeholder
    this.dialogText = this.add.text(WIDTH * 0.1, HEIGHT * 0.73, '', {
      fontFamily: 'Arial',
      fontSize: Math.floor(HEIGHT * 0.04),
      color: '#fff',
      wordWrap: { width: WIDTH * 0.8 }
    });

    this.input.on('pointerdown', () => {
      this.interpretDialog();
    });

    // Show the first dialog line initially
    this.interpretDialog();
  }

  interpretDialog() {
    const currentLine = this.dialog[this.currentPosition];
    if (currentLine) {
      this.showDialog(currentLine);
    } else {
      this.endDialog();
    }
  }

  showDialog(line) {
    console.log(line)
    this.dialogText.setText(line.text);
    this.currentPosition++;

    this.updateCharacter(line);
  }

  endDialog() {
    this.scene.stop();
    this.parentScene.scene.resume();
  }

  updateCharacter(line) {
    if (line.name) {
      this.nameLabel.setText(line.name);
    }

    if (this.currentCharacter) {
      this.currentCharacter.destroy();
    }

    console.log(line.name + "_" + line.variant)
    const x = CHARPOS_X[line.position];
    this.currentCharacter = this.add.sprite(x, HEIGHT * 0.8, line.name + "_" + line.variant);
    this.currentCharacter.setOrigin(0.5, 0.5);
    this.currentCharacter.scale = 0.13;
    this.currentCharacter.depth = -1;
  }
}