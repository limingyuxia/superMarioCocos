/**
 *  订阅：
 *  eventScokoban.on(EventType.USER_INFO,this.userInfo,this);
 *  触发：
 *  eventScokoban.emit(EventType.USER_INFO,{userName:'test'});
 *  取消订阅：
 *  eventScokoban.off(EventType.USER_INFO,this.userInfo,this);
 */

interface eventCallBack {
    target?: cc.Component;
    callBack: Function;
    force?: boolean; //组件未激活状态 是否推送消息
    once: boolean;   //调用一次
}

export default class eventScokoban {

    private static _eventMap: Map<string, eventCallBack[]> 
        = new Map<string, eventCallBack[]>();

    static on(type: string, callBack: Function, target: any, 
        force: boolean = false, once: boolean = false) {

        if (!this._eventMap.has(type)) {
            this._eventMap.set(type, []);
        }

        this._eventMap.get(type).push({callBack, target, force, once});
    }

    static once(type: string, callBack: Function, target: any, force: boolean = false) {

        if (!this._eventMap.has(type)) {
            this._eventMap.set(type, []);
        }

        this._eventMap.get(type).push({callBack, target, force, once: true});
    }

    static emit(type: string, customeData: any = type) {

        if (!this._eventMap.has(type)) 
            return;
            
        let events    = this._eventMap.get(type);
        let offEvents = [];

        events.forEach((event) => {
            let { callBack, target, force, once } = event;

            if (force && target.isValid) {
                callBack.call(target, customeData);
            } else if (!force && target.enabledInHierarchy && target.isValid) {
                callBack.call(target, customeData);
            }

            if (once) 
                offEvents.push(event);
        });

        offEvents.forEach((event) => {
            let { callBack, target } = event;
            this.off(type, callBack, target);
        });
    }

    static off(type: string, callBack: Function, target: any) {

        if (!this._eventMap.has(type)) 
        return;

        let events = this._eventMap.get(type);
        let len    = events.length;
        for (let i = len - 1; i >= 0; i--) {
            let event = events[i];

            if (event && event.callBack === callBack && event.target === target) {
                events.splice(i, 1);
            }
        }
    }

    static offEventType(type: string) {
        if (this._eventMap.has(type)) {
            this._eventMap.delete(type);
        }
    }

    static release() {
        this._eventMap.clear();
    }

}
  