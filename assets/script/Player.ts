import { _decorator, Component, Node, Animation, Vec3, input, Input, EventKeyboard, KeyCode, tween, v3 } from 'cc';
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
            case KeyCode.KEY_W:
                this.jump()
                break;
            case KeyCode.KEY_J:
                this.attack()
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
            case KeyCode.KEY_J:
                // this.anim.play('player-normal')
                break;
        }
    }

    resetAnim(){
        this.anim.play('player-normal')
    }

    jump(){
        let pos = this.playerPos
        //   tween(this.node).to(0.4, {position:v3(pos.x, pos.y+ 150)}, {easing:'sineOut'}).start();
        tween(this.node).to(0.4,{position:v3(pos.x, pos.y+120, pos.z)}, {easing:'sineOut'}).start()
    }

    start() {
        this.playerPos = this.node.position
    }

    //攻击
    attack(){
        console.log('攻击')
        this.anim.play('player-attack')
    }


    update(deltaTime: number) {
        if (this.accLeft) {
            this.node.scale.set(-2,2,2)
            this.playerPos.x -= this.speed * deltaTime
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
        if(this.accRight){
            this.node.scale.set(2,2,2)
            this.playerPos.x += this.speed * deltaTime
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
    }
}

