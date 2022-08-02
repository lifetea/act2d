import { _decorator, Component, Node, Vec3, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property
    speed: number = 1

    playerPos:Vec3 = null

    accLeft:boolean = false
    accRight:boolean = false

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = true
                break;
            case KeyCode.KEY_D:
                this.accRight = true
                break;
        }
    }
    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = false
                break;
            case KeyCode.KEY_D:
                this.accRight = false
                break;
        }
    }
    start() {
        this.playerPos = this.node.position
    }

    update(deltaTime: number) {
        if (this.accLeft) {
            this.playerPos.x -= this.speed * deltaTime
        }
        if(this.accRight){
            this.playerPos.x += this.speed * deltaTime
        }
        this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
    }
}

