import { BaseTexture, Spritesheet, Assets } from "../lib/pixi.mjs";

export default class AssetsFactory {

    spritesheet;
    spritekeys

    constructor() {
        this.spritesheet = new Spritesheet(
            BaseTexture.from("./assets/atlas.png"),
            Assets.cache.get("./assets/atlas.json").data);
        this.spritesheet.parse();
        this.spritekeys = Object.keys(this.spritesheet.textures);
    }

    getRandomTexture() {
        const randomIndex = Math.floor(Math.random() * this.spritekeys.length);
        const image = this.spritekeys[randomIndex];
        return this.spritesheet.textures[image];
    }
}