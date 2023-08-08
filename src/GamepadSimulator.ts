
export class GamepadSimulator {

    private static _getOriginalGamepads = navigator.getGamepads;
    private static _virtualGamepads:{
        [index:number]:VirtualGamepad;
    }={};
    private static _virtualGamepadIndex = 10;

    public static addVirtualGamepad(virtualGamepad: VirtualGamepad, index:number=this._virtualGamepadIndex++): number {
        this._virtualGamepads[index] = virtualGamepad;
        return index;
    }

    public static removeVirtualGamepad(virtualGamepad: VirtualGamepad) {
        if(this._virtualGamepads[virtualGamepad.index] == virtualGamepad){
            delete this._virtualGamepads[virtualGamepad.index];
        }
    }

    public static getAllGamepads():(Gamepad|null)[]{
        const originalGamepads =  GamepadSimulator._getOriginalGamepads.call(navigator);
        const result:(Gamepad|null)[] = GamepadSimulator._getOriginalGamepads.call(navigator)==null?[]:[...originalGamepads];
        for(const [i,virtualGamepad] of Object.entries(GamepadSimulator._virtualGamepads)){
            result[i]=virtualGamepad; //virtual gamepads starts at 10
        }
        return result;
    }
}
