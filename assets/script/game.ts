import tiledMap from "./tiled/tiledMap";
import eventScokoban from "./eventTarget";
import audioContainer from "./audio/audioContainer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Boolean)
    protected Debug: boolean = false;

    @property({
        displayName: "乌龟",
        type: cc.Prefab,
    })
    public tortoisePrefab: cc.Prefab = null;

    @property({
        displayName: "蘑菇",
        type: cc.Prefab,
    })
    public mushroomPrefab: cc.Prefab = null;

    @property({
        displayName: "花朵",
        type: cc.Prefab,
    })
    public flowerPrefab: cc.Prefab = null;

    @property({
        displayName: "变大蘑菇",
        type: cc.Prefab,
    })
    public mushRoomRewardPrefab: cc.Prefab = null;

    @property({
        displayName: "加血蘑菇",
        type: cc.Prefab,
    })
    public mushRoomAddlifePrefab: cc.Prefab = null;

    @property({
        displayName: "玩家",
        type: cc.Prefab,
    })
    public heroPrefab: cc.Prefab = null;

    @property({
        displayName: "背景音乐",
        type: cc.AudioClip,
    })
    public audioClip: cc.AudioClip = null;

    @property({
        displayName: "地图",
        type: tiledMap,
    })
    public tiledMap: tiledMap = null;
    
    // @property({
    //     displayName: "死亡",
    //     type: cc.Node,
    // })
    // protected dieViewNode: cc.Node = null;

    onLoad() {
        eventScokoban.release();
        audioContainer.stopAllAudio();

        this.tiledMap.config(
            this.tortoisePrefab,
            this.mushroomPrefab,
            this.flowerPrefab,
            this.heroPrefab,
            this.mushRoomRewardPrefab,
            this.mushRoomAddlifePrefab
        );
        // audioContainer.play(this.audioClip, true, 0.2);

        eventScokoban.on(
            "GameOver",
            (bool: Boolean) => {
                if (bool || !this.Debug) {
                    // this._gameOver(); 
                }
            },
            this
        );

        eventScokoban.on(
            "DieViewOn",
            () => {
                // this.dieViewNode.active = true;
            },
            this
        );
    }

    // private _gameOver(): void {
    //     const data: LabelData = {
    //         type: "Hp",
    //         value: -1,
    //     };

    //     eventScokoban.emit("changeLabel", data);
    //     eventScokoban.emit("PlayerDie");
    // }
}
