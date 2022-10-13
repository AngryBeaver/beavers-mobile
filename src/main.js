import {Settings} from "./Settings.js";
import {CombatTrackerEnhancements} from "./CombatTrackerEnhancements.js";
import {Mobile5eSheet} from "./Mobile5eSheet.js";

Hooks.once('init', async function () {
    Settings.init();
    if(!game[Settings.NAMESPACE])game[Settings.NAMESPACE]={};
});


Hooks.on('renderCombatTracker', async (app, html, options) => {
    CombatTrackerEnhancements.bind(app,html,options);
});

Hooks.on('targetToken', (user, token, targeted) => {
    if(game.combat && game.combat.combatants.find(c=>c.tokenId,token.id)){
        ui.combat.render();
    }
});

Hooks.on('canvasInit', () => {
    if(Settings.get(Settings.HIDE_CANVAS)){
        $("canvas").hide();
    }
});

Actors.registerSheet("dnd5e", Mobile5eSheet, {
    types: ["character"],
    makeDefault: false,
});
