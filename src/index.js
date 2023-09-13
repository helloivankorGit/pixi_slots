import Game from './Game.js';
import * as PIXI from '../lib/pixi.mjs';
import AssetsFactory from "./AssetsFactory.js";

const pixiApp = new PIXI.Application({
    width: 350,
    height: 350,
    background: '#83d7ff'
});

await PIXI.Assets.load("./assets/atlas.json");

const assets = new AssetsFactory();

const game = new Game(pixiApp, assets);

document.body.appendChild(pixiApp.view);