
export default class BootState extends Phaser.State {
    preload() {
        this.load.baseURL = "./assets/";
    }

    create() {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.isDesktop = this.game.device.desktop;

        if (this.game.isDesktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
        this.game.stage.backgroundColor = '#1f1f1f';

        this.game.state.start("Preload");
    }
}