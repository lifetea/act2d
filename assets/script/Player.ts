import { _decorator, Component, Node, Animation, Vec3, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property
    speed: number = 1

    playerPos:Vec3 = null

    accLeft:boolean = false
    accRight:boolean = false

    anim:Animation = null

    onLoad() {
        this.anim = this.node.getComponent(Animation)
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
                this.anim.play('player-walker')
                break;
            case KeyCode.KEY_D:
                this.accRight = true
                this.anim.play('player-walker')
                break;
        }
    }
    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = false
                this.anim.play('player-normal')
                break;
            case KeyCode.KEY_D:
                this.accRight = false
                this.anim.play('player-normal')
                break;
        }
    }
    start() {
        this.playerPos = this.node.position
    }

    update(deltaTime: number) {
        if (this.accLeft) {
            this.node.scale.set(-2,2,2)
            this.playerPos.x -= this.speed * deltaTime
        }
        if(this.accRight){
            this.node.scale.set(2,2,2)
            this.playerPos.x += this.speed * deltaTime
        }
        this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
    }
}

