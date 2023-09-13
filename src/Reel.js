import { Sprite, Graphics, Container } from "../lib/pixi.mjs";

export default class Reel extends Container {
    #assets;
    #reelWidth = 70;
    #reelHeight = 195;
    #slotSize = 65;
    #slotsInReel = 3;
    #spinSpeed = 20;

    constructor(index, ticker, assets) {
        super();

        this.#assets = assets;
        this.ticker = ticker;
        this.spinReelHeight = 0;

        this.x = this.#reelWidth * (index - 1);

        const column = new Graphics();
        column.beginFill(0x83d7ff);
        column.drawRect(0, 2, this.#reelWidth, this.#reelHeight - 5);
        this.mask = column;

        this.reelsContainer = new Container();

        this.addChild(this.mask, this.reelsContainer);

        this.fillReelWithSlots(this.#slotsInReel);

        return this;
    }

    fillReelWithSlots(slotsAmount, top = 195) {
        for (let i = 0; i < slotsAmount; i++) {
            const newSlot = this.generateSlotSprite();
            newSlot.y = top - this.#slotSize * i;
            newSlot.x = 2;
            this.reelsContainer.addChild(newSlot)
        }
    }

    generateSlotSprite() {
        const slot = this.#assets.getRandomTexture();
        const sprite = new Sprite(slot);
        sprite.anchor.set(0, 1);
        return sprite;
    }

    spinSlots(resolve) {
        const slotsAmount = this.#assets.spritekeys.length;
        const top = -this.reelsContainer.y;

        this.fillReelWithSlots(slotsAmount, top);
        this.spinReelHeight = slotsAmount * this.#slotSize;

        const animation = () => {
            this.reelsContainer.y += this.#spinSpeed;
            this.spinReelHeight -= this.#spinSpeed;

            if (this.spinReelHeight <= 0) {
                this.reelsContainer.y += this.spinReelHeight;
                this.spinReelHeight = Math.max(0, this.spinReelHeight);
                this.ticker.remove(animation);
                this.removeExtraSlots();
                resolve();
            }
        };

        this.ticker.add(animation);
    }

    removeExtraSlots() {
        const childrenToRemove = this.reelsContainer.children.length - this.#slotsInReel;
        if (childrenToRemove > 0) {
            this.reelsContainer.removeChildren(0, childrenToRemove);
        }
    }
}