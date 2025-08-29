/* eslint-disable no-unused-vars */
// Import the scenes
import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import GameScene from './scenes/GameScene.js';
import DialogScene from './scenes/DialogScene.js';

import { RESOLUTIONS } from './consts.js';

/**
 * Basic config – feel free to tweak width/height or add more scenes.
 * The key part for responsiveness is the `scale` object.
 */
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: RESOLUTIONS[0].width,
  height: RESOLUTIONS[0].height,
  pixelArt: true,
  scene: [
    BootScene, 
    PreloaderScene, 
    GameScene,
    DialogScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,          // Fit the entire game into the window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center on both axes
    // If you prefer to let the canvas resize with the window, use RESIZE instead.
  },

  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

const game = new Phaser.Game(config);