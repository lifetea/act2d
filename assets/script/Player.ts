import { _decorator, Component, Node, Animation, Vec3, input, Input, EventKeyboard, KeyCode, tween, v3, RigidBody2D, v2, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;
import { playerFsm } from './playerFsm';

// playerFsm.init();
// console.log(playerFsm.state)
// playerFsm.walk();
// console.log(playerFsm.state)          // 'liquid'
//   palyerFsm.vaporize();
//   console.log(palyerFsm.state)       // 'gas'

@ccclass('Player')
export class Player extends Component {

    @property
    moveSpeed: number = 1
    @property
    jumpHeigt: number = 1

    playerPos:Vec3 = null

    accLeft:boolean = false
    accRight:boolean = false

    anim: Animation = null;

    @property({type:AudioClip})
    attackClip1: AudioClip = null;

    @property({type:AudioClip})
    attackClip2: AudioClip = null;

    @property({type:AudioClip})
    attackClip3: AudioClip = null;

    audio: AudioSource = null;

    onLoad() {
        this.anim = this.node.getComponent(Animation)
        this.audio = this.node.getComponent(AudioSource)
        playerFsm.player = this;
        // playerFsm.vaporize()
        // this.anim.resume()
        // console.log(palyerFsm.state)

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
                playerFsm.walk()
                break;
            case KeyCode.KEY_D:
                this.accRight = true
                playerFsm.walk()
                break;
            case KeyCode.KEY_W:
                this.jump()
                break;
            case KeyCode.KEY_J:
                console.log(playerFsm.state, 'HHHHH')
                if(playerFsm.state == 'attack3'){
                    console.log('攻击3')
                }else{
                    playerFsm.attack()
                }
                let state =  this.anim.getState('player-attack1')
                console.log(state, '动画状态')

                break;
        }
    }
    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = false
                playerFsm.idle()
                break;
            case KeyCode.KEY_D:
                this.accRight = false
                playerFsm.idle()
                break;
            case KeyCode.KEY_J:
                // palyerFsm.onStand()
                break;
        }
    }

    resetAnim(){
        this.anim.play('player-stand')
    }

    jump(){
        let pos = this.playerPos
        let rigdid = this.node.getComponent(RigidBody2D)
        rigdid.applyForceToCenter (v2(0,1500), true)
        //   tween(this.node).to(0.4, {position:v3(pos.x, pos.y+ 150)}, {easing:'sineOut'}).start();
        // tween(this.node).to(0.4,{position:v3(pos.x, pos.y+120, pos.z)}, {easing:'sineOut'}).start()
    }

    start() {
        this.playerPos = this.node.position
        this.anim.getState('player-stand')
        playerFsm.idle();
    }

    //攻击完成
    attackEnd(params){
        playerFsm.idle()
        console.log('攻击完成', params)
        // this.anim.play('player-attack')
    }
    //攻击结束  


    update(deltaTime: number) {
        if (this.accLeft) {
            this.node.scale.set(-2,2,2)
            this.playerPos.x -= this.moveSpeed * deltaTime
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
        if(this.accRight){
            this.node.scale.set(2,2,2)
            this.playerPos.x += this.moveSpeed * deltaTime
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
    }
}

