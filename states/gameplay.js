
export default class GameplayState extends Phaser.State {
    init() {

    }

    preload() {

    }

    create() {
        this.blue = this.game.add.sprite(300, 300, 'blue');
        this.blue.anchor.set(0.5, 0.5);
        this.blue.colorID = 1;

        this.yellow = this.game.add.sprite(300 + 350, 300, 'yellow');
        this.yellow.anchor.set(0.5, 0.5);
        this.yellow.colorID = 2;

        this.green = this.game.add.sprite(300, 300 + 350, 'green');
        this.green.anchor.set(0.5, 0.5);
        this.green.colorID = 3;

        this.red = this.game.add.sprite(300 + 350, 300 + 350, 'red');
        this.red.anchor.set(0.5, 0.5);
        this.red.colorID = 4;

        this.blocks = [this.blue, this.yellow, this.green, this.red];

        this.addInput();

        this.round = 1;
        this.game.time.events.add(1000, this.showPattern, this);
    }

    showPattern() {
        this.crntSequence = [];
        for (let i = 0; i < this.round; i++) {
            this.crntSequence.push(this.findColor());
        }

        this.crntSequence.forEach(block => {
            console.log(block.colorID);
        });
    }

    findColor() {
        return Phaser.ArrayUtils.getRandomItem(this.blocks);
    }

    addInput() {
        this.blocks.forEach(block => {
            block.inputEnabled = true;
            block.events.onInputDown.add(this.onBlockTap, this);
        });
    }

    onBlockTap(block, pointer) {
        console.log('block tapped');
    }

    update() {

    }
}