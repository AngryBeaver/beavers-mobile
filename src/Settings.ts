export class Settings {

    static NAMESPACE = "beavers-mobile";
    static ADD_COMBAT_TRACKER_TARGET = "addCombatTrackerTarget"
    static HIDE_CANVAS = "hideCanvas"

    static init() {
        if (game instanceof Game) {
            game.settings.register(this.NAMESPACE, this.ADD_COMBAT_TRACKER_TARGET, {
                name: game.i18n.localize('beaversMobile.settings.addCombatTrackerTarget.name'),
                hint: game.i18n.localize('beaversMobile.settings.addCombatTrackerTarget.hint'),
                scope: "world",
                config: true,
                default: true,
                type: Boolean,
            });
            game.settings.register(this.NAMESPACE, this.HIDE_CANVAS, {
                name: game.i18n.localize('beaversMobile.settings.hideCanvas.name'),
                hint: game.i18n.localize('beaversMobile.settings.hideCanvas.hint'),
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange:(value)=>{
                    if(value){
                        $("canvas").hide();
                    }else{
                        $("canvas").show();
                    }
                }
            });
        }

    }


    static get(key){
        if (game instanceof Game) {
            return game.settings.get(this.NAMESPACE, key);
        }
    };

}