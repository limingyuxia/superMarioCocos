import audioContainer from "./audioContainer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioComponent extends cc.Component {
    @property({
        displayName: "on",
        type: cc.SpriteFrame,
    })
    protected onSpriteFrame: cc.SpriteFrame = null;

    @property({
        displayName: "off",
        type: cc.SpriteFrame,
    })
    protected offSpriteFrame: cc.SpriteFrame = null;

    protected isMute: boolean = false;
    protected spriteComp: cc.Sprite = null;

    onLoad(): void {
        this.spriteComp = this.getComponent(cc.Sprite);
    }

    ACT_Btn(): void {
        if (this.isMute) {
            audioContainer.onAudio();
            this.spriteComp.spriteFrame = this.onSpriteFrame;
        } else {
            audioContainer.offAudio();
            this.spriteComp.spriteFrame = this.offSpriteFrame;
        }

        this.isMute = !this.isMute;
    }
}
