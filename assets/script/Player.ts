import { _decorator, Component, Node, Animation, Vec3, input, Input, EventKeyboard, KeyCode, tween, v3, RigidBody2D, v2, AudioSource, AudioClip, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider2D, Size, math } from 'cc';
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

    //操作方向
    accLeft:boolean = false
    
    accRight:boolean = false

    // 攻击间隔
    attackInterval:number = 300
    atacckEnable:boolean = true

    anim: Animation = null;

    @property({type:AudioClip})
    attackClip1: AudioClip = null;

    @property({type:AudioClip})
    attackClip2: AudioClip = null;

    @property({type:AudioClip})
    attackClip3: AudioClip = null;

    audio: AudioSource = null;

    box2: BoxCollider2D = null;

    onLoad() {
        this.anim = this.node.getComponent(Animation)
        this.audio = this.node.getComponent(AudioSource)
        this.box2 = this.node.getComponent(BoxCollider2D)
        console.log(this.box2)  
        playerFsm.player = this;
        // playerFsm.vaporize()
        // this.anim.resume()
        // console.log(palyerFsm.state)

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        //注册单个碰撞回调  
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.tag == 1 || otherCollider.tag == 3){
            // console.log("通过管道");
            contact.disabled = true;
            // this.node.destroy();
        }
        // if(otherCollider.tag == 2 ){
        //     console.log("碰到敌人", selfCollider.tag, otherCollider.tag );
            
        //     // this.die()
        //     // this.node.destroy();
        // }
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = true
                this.box2.offset = new math.Vec2(-8, 15)
                playerFsm.walk()
                break;
            case KeyCode.KEY_D:
                this.accRight = true
                this.box2.offset = new math.Vec2(8, 15)
                playerFsm.walk()
                break;
            case KeyCode.KEY_W:
                this.jump()
                break;
            case KeyCode.KEY_J:
                if(!this.atacckEnable){
                    // console.log('攻击太快了')
                    break;
                }
                if(playerFsm.state == 'attack3'){
                    // console.log('完成三段攻击')
                }else{
                    this.box2.size = new math.Size(18, 28)
                    this.box2.tag = 2
                    playerFsm.attack()
                    this.atacckEnable = false
                    setTimeout(() => { this.atacckEnable = true }, this.attackInterval)
                }
                // console.log(state.current, '动画状态',state.length)

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
                this.box2.size = new math.Size(1, 1)
                this.box2.tag = 3
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
        rigdid.applyForceToCenter (v2(0,50), true)
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
        switch(playerFsm.lastState){
            case 'move':
                playerFsm.walk()
                break;
            case 'stand':
                playerFsm.idle()
                break;
            default:
                playerFsm.idle()
                break;
        }
        // console.log('攻击完成', params)
        // this.anim.play('player-attack')
    }
    //攻击结束  


    update(deltaTime: number) {
        if(!this.atacckEnable){
            // this.box2.apply()
        }
        // console.log(this.box2.size)
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
        this.box2.apply()

    }
}

