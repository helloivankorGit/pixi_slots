import { Text, TextStyle } from "../lib/pixi.mjs";
import Reel from "./Reel.js";

export default class Game {
    #pixiApp;
    #assets;
    #reelsCount = 5;
    #reelSpinDelay = 500;
    #reels = [];

    constructor(pixiApp, assets) {
        this.#pixiApp = pixiApp;
        this.#assets = assets;

        this.startButton = this.createStartButton();

        this.createReels();

        this.#pixiApp.stage.addChild(...this.#reels, this.startButton);
    }

    createStartButton() {
        const style = new TextStyle({
            fontFamily: 'Impact',
            fontSize: 50,
            fill: [0xffffff, 0x519bed],
            stroke: 0xc7417c,
            strokeThickness: 5,
            letterSpacing: 10
        });

        const btnText = new Text("SPIN", style);
        btnText.x = this.#pixiApp.screen.width / 2 - btnText.width / 2;
        btnText.y = this.#pixiApp.screen.height - btnText.height - 30;
        btnText.cursor = 'pointer';
        btnText.eventMode = 'static';

        btnText.on('pointerdown', () => {
            this.spinReels();
        });

        return btnText;
    }

    createReels() {
        for (let i = 1; i <= this.#reelsCount; i++) {
            const reel = new Reel(i, this.#pixiApp.ticker, this.#assets);
            this.#reels.push(reel);
        }
    }

    async spinReels() {
        this.startButton.eventMode = 'none';

        try {
            await Promise.all(this.#reels.map((reel, index) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        reel.spinSlots(resolve);
                    }, this.#reelSpinDelay * index);
                });
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this.startButton.eventMode = 'static';
        }
    }
}