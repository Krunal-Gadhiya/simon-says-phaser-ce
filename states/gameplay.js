
export default class GameplayState extends Phaser.State {
    init() {
        this.round = 1;
        this.canClick = false;

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

        this.submit = this.game.add.text(450, 100, 'Sumbit', {
            font: 'Arail',
            fontSize: 50,
            fill: '#ffffff',
            align: 'center'
        });
        this.submit.anchor.set(0.5, 0.5);
        this.submit.inputEnabled = true;
        this.submit.events.onInputDown.add(this.onSubmit, this);

        this.addInput();

        this.game.time.events.add(1000, this.showPattern, this);
    }

    onSubmit() {
        console.log('submit tapped');
        console.log('crnt - ', this.crntSequence);
        console.log('recorded - ', this.recordSequence);

        let isAnswerCorrect = true;
        if (this.recordSequence.length !== this.crntSequence.length) {
            isAnswerCorrect = false;
        }

        if (isAnswerCorrect) {
            for (let i = 0; i < this.recordSequence.length; i++) {
                if (this.recordSequence[i] !== this.crntSequence[i]) {
                    isAnswerCorrect = false;
                    break;
                }
            }
        }

        if (!isAnswerCorrect) {
            console.log('failed');
        }
        else {
            console.log('correct match');
        }
    }

    showPattern() {
        this.crntSequence = [];
        this.recordSequence = [];
        for (let i = 0; i < this.round; i++) {
            const color = this.findColor();
            this.crntSequence.push(color.colorID);
            this.bounceTheBlock(color);
        }

        this.game.time.events.add(1000, () => {
            this.canClick = true;
        });

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
        if (!this.canClick) return;

        console.log('block tapped', block.colorID);
        this.recordSequence.push(block.colorID);
    }

    bounceTheBlock(block) {
        this.game.add.tween(block.scale).to({
            x: 1.2,
            y: 1.2
        }, 350, Phaser.Easing.Back.InOut, true, 0, 0, true);
    }

    update() {

    }
}