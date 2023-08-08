import {NAMESPACE} from "./main.js";
import {VirtualGamepadApp} from "./VirtualGamepadApp.js";

export class Settings {
    static ADD_COMBAT_TRACKER_TARGET = "addCombatTrackerTarget"
    static HIDE_CANVAS = "hideCanvas"
    static VIRTUAL_GAMEPAD = "virtualGamepad"

    interval:number;
    virtualGamepadApp:Application;

    init() {
        if (game instanceof Game) {
            game.settings.register(NAMESPACE, Settings.VIRTUAL_GAMEPAD, {
                name: game.i18n.localize('beaversMobile.settings.virtualGamepad.name'),
                hint: game.i18n.localize('beaversMobile.settings.virtualGamepad.hint'),
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange:(value)=>{
                    if(value){
                        this._showVirtualGamepad();
                    }else{
                        this._closeVirtualGamepad();
                    }
                }
            });
            game.settings.register(NAMESPACE, Settings.ADD_COMBAT_TRACKER_TARGET, {
                name: game.i18n.localize('beaversMobile.settings.addCombatTrackerTarget.name'),
                hint: game.i18n.localize('beaversMobile.settings.addCombatTrackerTarget.hint'),
                scope: "world",
                config: true,
                default: true,
                type: Boolean,
            });
            game.settings.register(NAMESPACE, Settings.HIDE_CANVAS, {
                name: game.i18n.localize('beaversMobile.settings.hideCanvas.name'),
                hint: game.i18n.localize('beaversMobile.settings.hideCanvas.hint'),
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange:(value)=>{
                    if(value){
                        this._hideCanvas();
                    }else{
                        this._showCanvas();
                    }
                }
            });
        }

    }

    static get(key){
        if (game instanceof Game) {
            return game.settings.get(NAMESPACE, key);
        }
    };

    ready(){
        if(Settings.get(Settings.HIDE_CANVAS)){
           this._hideCanvas();
        }
        if(Settings.get(Settings.VIRTUAL_GAMEPAD)){
            this._showVirtualGamepad();
        }

    }

    private _showVirtualGamepad(){
        if(!this.virtualGamepadApp) {
            this.virtualGamepadApp = VirtualGamepadApp.for("mobile");
        }
        this.virtualGamepadApp.render(true);
    }

    private _closeVirtualGamepad(){
        if(!this.virtualGamepadApp) {
            this.virtualGamepadApp = VirtualGamepadApp.for("mobile");
        }
        this.virtualGamepadApp.close();
    }


    private _hideCanvas(){
        $("canvas").hide();
        $("#ui-left").css({"visibility":"hidden"});
        this.interval = window.setInterval(()=>$("#dice-box-canvas").hide(),500);
    }

    private _showCanvas(){
        $("canvas").show();
        $("#dice-box-canvas").show();
        $("#ui-left").css({"visibility":"visible"});
         window.clearInterval(this.interval);
    }

}