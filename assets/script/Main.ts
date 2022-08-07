import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Vec3, PhysicsSystem2D, EPhysics2DDrawFlags, TiledLayer, TiledMap, RigidBody2D, ERigidBody2DType, BoxCollider2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property({type: TiledMap })
    tiledMap: TiledMap = null;
    
    onLoad() {
        this.initMapNode()
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;
    }

    initMapNode() {
        let tileSize = this.tiledMap.getTileSize()
        let layer = this.tiledMap.getLayer('wall')
        let layerSize = layer.getLayerSize()
        for(let i = 0; i < layerSize.width; i++) {
            for(let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true)
                if(tiled.grid != 0){
                    let body = tiled.node.addComponent(RigidBody2D)
                    body.type = ERigidBody2DType.Static
                    let collider = tiled.node.addComponent(BoxCollider2D)
                    collider.size = tileSize
                    collider.offset = new Vec2(tileSize.width/2, tileSize.height/2)
                    collider.apply()
                }
            }
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

