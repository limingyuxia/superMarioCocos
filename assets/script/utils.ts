import dataManager from "./dataManager";

export const keyCodeState: Record<number, string> = {
    [68]: "Right",
    [65]: "Left",
    [87]: "Up",
    [83]: "Down",
};
  
export enum keyStateEnum {
    RIGHT = "Right",
    LEFT  = "Left",
    UP    = "Up",
    DOWN  = "Down",
}
  
export enum heroState {
    STAND = "idel",
    WALK  = "Walk",
    JUMP  = "Jump",
    DIE   = "Die",
}
  
export interface labelData {
    type: string;
    value: number;
}

export class dataItem {
    private dataObj: object = {};

    public getData(name: string): any {
        return this.dataObj[name];
    }

    public addData(name: string, data: any): void {
        this.dataObj[name] = data;
    }
}
  
export function createDtMgr(name: string, obj?: dataManager): void {
    dataManager.addManager(name, new dataItem());
}
  
export function deepClone(obj: any): any {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            result[key] = deepClone(obj[key]);
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}
