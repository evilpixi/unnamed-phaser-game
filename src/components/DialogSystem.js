export default class DialogSystem {
  constructor(scene) {
    this.scene = scene;
    this.dialogBox = this.createDialogBox();
  }

  createDialogBox() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x000000, 0.8);
    graphics.fillRect(100, 100, 600, 200);
    return graphics;
  }

  showDialog(text) {
    this.dialogBox.visible = true;
    this.scene.add.text(150, 150, text, { color: '#ffffff' });
  }

  hideDialog() {
    this.dialogBox.visible = false;
  }
}
