import StateMachine from './state-machine.js';

var playerFsm = new StateMachine({
    data: { player: null },
    init: 'stand',
    transitions: [
        { name: 'walk',     from: '*',  to: 'move'},
        { name: 'init',   from: '*', to: 'stand'},  //liquid
        { name: 'attack',  from: 'stand', to: 'attack1' },
        { name: 'attack',  from: 'attack1', to: 'attack2' },
        { name: 'attack',  from: '*', to: 'attack3' },
        { name: 'condense', from: ['attack1', 'attack2', 'attack3'],    to: 'stand' }
    ],
    methods: {
        onInit: function() {
            if(this.player) {
                this.player.anim.play('player-stand')
            }
            console.log(`init state: ${this.state}`);
        },
        onWalk: function() {
            if(this.player) {
                this.player.anim.play('player-move')
                // this.player.anim.on('finished', function() {
                //     console.log('walk finished')
                //     this.player.anim.play('player-stand')
                // })
            }
            console.log(`move state: ${this.state}`);
        },
        onAttack: function() {
            const that = this
            switch(this.state) {
                case 'attack1':
                    this.player.anim.play('player-attack1')
                    console.log(`一段斩: ${this.state}`);
                    break;
                case 'attack2':
                    this.player.anim.play('player-attack2')
                    console.log(`二段斩: ${this.state}`);
                    break;
                case 'attack3':
                    this.player.anim.play('player-attack3')
                    console.log(`三段斩: ${this.state}`);
                    break;
            }
            // if(this.player) {
            //     this.player.anim.play('player-stand')
            // }
            
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