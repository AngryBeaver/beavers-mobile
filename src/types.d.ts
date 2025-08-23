declare global {
    namespace ClientSettings {
        type Namespace = "beavers-mobile";
        interface Settings {
            "beavers-mobile": {
                "virtualGamepad": string; // Define the type for specific keys here
            };
        }
    }

    interface Touch{
        x: number;
        y: number;
    }

    interface VirtualGamepadI extends Partial<Gamepad>{
        destroy:()=>void;
        setAxes:(index:number, value:number)=>void;
        setButton:(index:number, button:GamepadButton)=>void;
    }
    interface SelectData {

    }
}

export {};

