import { _decorator, Component, Animation, Node, Collider2D, Contact2DType, IPhysics2DContact, AudioSource, AudioClip, RigidBody, RigidBody2D, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    
    hitEnable:boolean = true

    maxHp:number = 10

    currentHp:number = 10
    
    //操作方向
    accLeft:boolean = false
    
    accRight:boolean = false


    anim: Animation = null;

    @property({type:AudioClip})
    hitClip: AudioClip = null;

    audio: AudioSource = null;

    rigid: RigidBody2D = null

    onLoad() {
        this.anim = this.node.getComponent(Animation)
        this.audio = this.node.getComponent(AudioSource)
        this.rigid = this.node.getComponent(RigidBody2D)
        // Your initialization goes here.
        //注册单个碰撞回调  
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(selfCollider.tag == 1 && otherCollider.tag == 2 ){
            // console.log("碰到敌人", selfCollider.tag, otherCollider.tag );
            contact.disabledOnce = true;
            if(this.hitEnable){
                this.hitEnable = false
                this.hit();
                setTimeout(() => { this.hitEnable = true }, 300)
            }
            // this.die()
            // this.node.destroy();
        }
        if(otherCollider.tag == 3 || otherCollider.tag == 1){
            contact.disabled = true;
        }
    }
    hit() {
        if(this.currentHp > 0){
            this.currentHp -= 1
            this.rigid.linearVelocity = new math.Vec2(1, 0)
            console.log("on hit", this.currentHp)
            this.audio.playOneShot(this.hitClip, 0.4)
            this.anim.play("enemy-hit")
        }else{
            this.die()
        }
    }
    die() {
        this.anim.play("enemy-die")
        // this.node.destroy()
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

