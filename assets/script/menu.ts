const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    // 开始按钮
    public startButtonCallback(): void {
        cc.director.loadScene("tiledMap");
    }
}
