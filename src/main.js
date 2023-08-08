import {Settings} from "./Settings.js";
import {CombatTrackerEnhancements} from "./CombatTrackerEnhancements.js";
import {Mobile5eSheet} from "./Mobile5eSheet.js";
import {VirtualGamepad} from "./VirtualGamepad.js";
import {VirtualGamepadApp} from "./VirtualGamepadApp.js";
import {GamepadSimulator} from "./GamepadSimulator.js";


export const NAMESPACE = "beavers-mobile";

navigator.getGamepads = function(){
    return GamepadSimulator.getAllGamepads();
}

Hooks.on("ready", async function(){
    if(game.system.id === "dnd5e"){
        Actors.registerSheet("dnd5e", Mobile5eSheet, {
            types: ["character"],
            makeDefault: false,
        });
    }
    game[NAMESPACE].Settings.ready();
})

Hooks.once('init', async function () {
    if(!game[NAMESPACE]){
        game[NAMESPACE] ={};
    }
    game[NAMESPACE].VirtualGamepadApp = VirtualGamepadApp;
    game[NAMESPACE].VirtualGamepad = VirtualGamepad;
    game[NAMESPACE].Settings = new Settings();
    game[NAMESPACE].Settings.init();
});


Hooks.on('renderCombatTracker', async (app, html, options) => {
    CombatTrackerEnhancements.bind(app,html,options);
});

Hooks.on('targetToken', (user, token, targeted) => {
    if(game.combat && game.combat.combatants.find(c=>c.tokenId,token.id)){
        ui.combat.render();
    }
});





