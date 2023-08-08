import {VirtualGamepad as VG} from "./VirtualGamepad.js";

export class VirtualGamepadApp extends Application{

    touchNow:Touch;
    touchStart:Touch
    isDragged:boolean;
    virtualGamepad:VirtualGamepad;
    startAxes:number;

    static for(id:string){
        const vg = new VG(id);
        return new VirtualGamepadApp(vg);
    }

    constructor(virtualGamepad:VirtualGamepad,startAxes:number=0) {
        super({id:virtualGamepad.id});
        this.virtualGamepad = virtualGamepad;
        this.startAxes = startAxes;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            // @ts-ignore
            template: "modules/beavers-mobile/templates/gamepad-overlay.hbs",
            classes: ["beavers-mobile"],
            popOut: false,
        });
    }

    async getData(options: any): Promise<any> {

    }

    activateListeners(html: JQuery){

        $(html).find(".drag").on("touchstart", (e: Event)=>{
            this.isDragged = true;
            this.touchStart = this._getTouchFrom(e);
        });

        $(html).find(".drag").on("touchmove",(e:Event)=>{
            if(this.isDragged) {
                this.touchNow = this._getTouchFrom(e);
                const x = Math.max(0,Math.min(50+this.touchNow.clientX-this.touchStart.clientX,100));
                const y = Math.max(0,Math.min(50+this.touchNow.clientY-this.touchStart.clientY,100));
                $(html).find(".drag").css({"top": y, "left": x});
                this.virtualGamepad.setAxes(this.startAxes,(x-50)/50);
                this.virtualGamepad.setAxes(this.startAxes+1,(y-50)/50);
            }
        });

        $(html).find(".drag").on("touchend", (e: Event)=>{
            this.isDragged = false;
            $(html).find(".drag").css({"top": 50, "left": 50});
            this.virtualGamepad.setAxes(this.startAxes,0);
            this.virtualGamepad.setAxes(this.startAxes+1,0);
        });

    }
    private  _getTouchFrom(e: Event):Touch{
        // @ts-ignore
        const te: TouchEvent = e.originalEvent;
        return te.touches[0];
    }


}