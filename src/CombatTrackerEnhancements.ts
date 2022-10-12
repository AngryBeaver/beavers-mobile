import {Settings} from "./Settings.js";

export class CombatTrackerEnhancements {
    app;html;combatants;canvas;

    constructor(app,html,data){
        this.app = app;
        this.html = html;
        this.combatants = data.combat.combatants;
        // @ts-ignore
        this.canvas = canvas;
    }


    static bind(app, html, data) {
        if (Settings.get(Settings.ADD_COMBAT_TRACKER_TARGET)) {
            new CombatTrackerEnhancements(app,html,data).init();
        }
    }

    init(){
        this._addElement();
        this._handleEvents();
    }
    _addElement(){
        this.html.find(".combatant-controls").each((i,c)=> {
            const token = this._getToken($(c));
            const element = $('<a class="combatant-control" data-control="targetCombatant"><i class="fa-solid fa-crosshairs"/></a>');
            if(token?.isTargeted){
                element.addClass("active");
            }
            $(c).prepend(element);
        });
        this.combatants.get()

        this.html.find(".combatant-controls")
    }

    _handleEvents() {
        this.html.find('.combatant-control[data-control=targetCombatant]').click(e => {
            e.stopPropagation();
            const token = this._getToken($(e.currentTarget));
            this._targetToken(token);
            return false;
        });
    }

    _getToken(element){
        const combatId = element.closest(".combatant").data("combatant-id");
        const tokenId = this.combatants.get(combatId).tokenId;
        return this.canvas?.tokens?.objects?.children.find(token => token.id === tokenId);
    }

    _targetToken(token) {
        if (!token) {
            return;
        }
        if(token.isTargeted){
            token.setTarget(false, { releaseOthers: false });
        }else{
            token.setTarget(true, { releaseOthers: false });
        }
        this.canvas.animatePan(token.position);
    }

}