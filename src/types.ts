interface Touch{
    x: number;
    y: number;
}

interface VirtualGamepad extends Gamepad{
    destroy:()=>void;
    setAxes:(index:number, value:number)=>void;
    setButton:(index:number, button:GamepadButton)=>void;
}