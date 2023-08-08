import {GamepadSimulator} from "./GamepadSimulator.js";

export class VirtualGamepad implements Gamepad {

    static _index = 0;

    _id:string;
    _index:number;
    _axes:number[] = [0,0,0,0];
    _buttons:GamepadButton[]=[
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
        {
            pressed: false,
            touched: false,
            value: 0,
        },
    ];

    constructor(id:string){
        this._id = id;
        this._index = GamepadSimulator.addVirtualGamepad(this);
        const event = new Event("gamepadconnected");
        event["gamepad"] = this;
        window.dispatchEvent(event);
    }

    get axes(){
        return [...this._axes];
    }
    get buttons(){
        return this._buttons;
    }

    get connected(){
        return true;
    }
    get hapticActuators(){
        return [];
    }
    get id(){
        return this._id;
    }
    get index(){
        return this._index;
    }
    get mapping():GamepadMappingType{
        return "";
    }
    get timestamp():DOMHighResTimeStamp{
        return Math.floor(Date.now() / 1000);
    }

    destroy(){
        const event = new Event("gamepaddisconnected");
        event["gamepad"] = this;
        window.dispatchEvent(event);
        GamepadSimulator.removeVirtualGamepad(this);
    }

    setAxes(index:number, value:number){
        this._axes[index] = value;
    }

    setButton(index:number, button:GamepadButton){
        this._buttons[index] = button;
    }
}