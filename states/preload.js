
export default class PreloadState extends Phaser.State {
    preload() {
        this.load.baseURL = "./assets/";

        this.load.image('red', 'red.png');
        this.load.image('yellow', 'yellow.png');
        this.load.image('green', 'green.png');
        this.load.image('blue', 'blue.png');
    }

    create() {
        this.game.state.start("Gameplay");
    }
}