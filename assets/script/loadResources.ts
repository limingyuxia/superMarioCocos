import { createDtMgr } from "./utils";
import dataManager     from "./dataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        displayName: "进度条",
        type: cc.ProgressBar,
      })
    public loadBar: cc.ProgressBar = null;

    start () {

        createDtMgr("MapDtMgr",    dataManager);
        createDtMgr("PrefabDtMgr", dataManager);
        createDtMgr("JsonDtMgr",   dataManager);


        cc.resources.loadDir(
            "./",
            (finish, total, item) => {
                this.loadBar.progress = finish / total;
            },
            (error, assets) => {
                if (error) {
                    return;
                }
                
                for (let value of assets) {
                    if (value instanceof cc.TiledMapAsset) {
                        dataManager.getManager("MapDtMgr").addData(value.name, value);
                    } else if (value instanceof cc.Prefab) {
                        dataManager.getManager("PrefabDtMgr").addData(value.name, value);
                    } else if (value instanceof cc.JsonAsset) {
                        dataManager.getManager("JsonDtMgr").addData(value.name, value.json);
                    }
                }
            }
        );
    }

}
