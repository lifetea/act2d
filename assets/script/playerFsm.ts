import StateMachine from './state-machine.js';

var playerFsm = new StateMachine({
    data: { player: null },
    init: 'stand',
    transitions: [
        { name: 'walk',     from: '*',  to: 'move'},
        { name: 'idle',   from: '*', to: 'stand'},  //liquid
        { name: 'attack',  from: 'stand', to: 'attack1' },
        { name: 'attack',  from: 'attack1', to: 'attack2' },
        { name: 'attack',  from: '*', to: 'attack3' },
        { name: 'condense', from: ['attack1', 'attack2', 'attack3'],    to: 'stand' }
    ],
    methods: {
        onIdle: function() {
            if(this.player) {
                this.player.anim.play('player-stand')
            }
        },
        onWalk: function() {
            if(this.player) {
                this.player.anim.play('player-move')
            }
            console.log(`move state: ${this.state}`);
        },
        onAttack: function(lifecycle) {
            console.log(`生命周期  trans: ${lifecycle.transition} 来自: ${lifecycle.from} 现在: ${lifecycle.to}`);
            const that = this
            switch(this.state) {
                case 'attack1':
                    this.player.anim.play('player-attack1')
                    this.player.audio.playOneShot(this.player.attackClip1)
                    console.log(`一段斩: ${this.state}`);
                    break;
                case 'attack2':
                    // let aimiState = this.player.aimi.getState();
                    // console.log(`动画状态: ${this.aimiState}`);
                    this.player.anim.play('player-attack2')
                    this.player.audio.playOneShot(this.player.attackClip2)
                    console.log(`二段斩: ${this.state}`);
                    break;
                case 'attack3':
                    this.player.anim.play('player-attack3')
                    this.player.audio.playOneShot(this.player.attackClip3)
                    console.log(`三段斩: ${this.state}`);
                    break;
            }
            // if(this.player) {
            //     this.player.anim.play('player-stand')
            // }
            
        },
        onBeforeAttack: function() {
            console.log(`before attack state: ${this.state}`);
        },
        onAfterAttack: function() {
            const that = this
            // if(this.state == 'attack3') {
            //     setTimeout(() => {
            //         that.init()
            //     }, 0)
            // }
            console.log(`after attack state: ${this.state}`);
        },
        onLeaveState: function() {
            console.log(`leave state: ${this.state}`);
        }   

    }
  });



  export { playerFsm };