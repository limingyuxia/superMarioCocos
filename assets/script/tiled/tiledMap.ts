import eventScokoban from "../eventTarget";
import tiledLayer from "./tiledLayer";
import tiledObject from "./tiledObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class tiledMap extends cc.Component {

    private _tiledLayer: tiledLayer;
    private _tiledObject: tiledObject;

    onLoad() {
        eventScokoban.on(
            "map-Move",
            (offsetX: number) => {
              this.node.x += offsetX;
            },
            this
        );
    }

    public config(
        tortoisePrefab: cc.Prefab,
        mushroomPrefab: cc.Prefab,
        flowerPrefab: cc.Prefab,
        heroPrefab: cc.Prefab,
        MushroomReward: cc.Prefab,
        MushroomAddlife: cc.Prefab
    ): void {

        this._tiledObject = this.node.getComponent(tiledObject);
        this._tiledLayer = this.node.getComponent(tiledLayer);
        this._tiledObject.config(
            tortoisePrefab,
            mushroomPrefab,
            flowerPrefab,
            heroPrefab,
            MushroomReward,
            MushroomAddlife
        );
    }

    getTiledObject(): tiledObject {
        return this._tiledObject;
    }

    getTiledLayer(): tiledLayer {
        return this._tiledLayer;
    }
    
}
