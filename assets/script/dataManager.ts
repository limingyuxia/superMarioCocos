import { dataItem } from "./utils";

const { ccclass } = cc._decorator;

@ccclass("dataManager")
export default class dataManager {
  
    private static objMgr: object = Object.create(null);

    public static addManager(name: string, obj: dataItem): void {
        if (!this.objMgr[name]) {
            this.objMgr[name] = obj;
        }
    }

    public static getManager(name: string): dataItem {
        return this.objMgr[name];
    }

    public static removeManager(name: string): void {
        delete this.objMgr[name];
    }

    public static clear(): void {
        for (let key in this.objMgr) {
            delete this.objMgr[key];
        }
    }
    
}
