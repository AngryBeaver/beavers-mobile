import {Settings} from "./Settings.js";
import {CombatTrackerEnhancements} from "./CombatTrackerEnhancements.js";
import {VirtualGamepad} from "./VirtualGamepad.js";
import {VirtualGamepadApp} from "./VirtualGamepadApp.js";
import {GamepadSimulator} from "./GamepadSimulator.js";
import { DisableItemDragUsersForm } from "./DisableItemDragUsersForm.js";


export const NAMESPACE = "beavers-mobile";

navigator.getGamepads = function(){
    return GamepadSimulator.getAllGamepads();
}


Hooks.once('init', async function () {
    if(!game[NAMESPACE]){
        game[NAMESPACE] ={};
    }
    game[NAMESPACE].VirtualGamepadApp = VirtualGamepadApp;
    game[NAMESPACE].VirtualGamepad = VirtualGamepad;
    game[NAMESPACE].Settings = new Settings();
    game[NAMESPACE].Settings.init();
    // Ensure the class is available when settings.init registers the menu
    game[NAMESPACE].DisableItemDragUsersForm = DisableItemDragUsersForm;
});

function disableItemDragIn(html) {
    // Find any element that might initiate an Item drag
    const candidates = html.find('[draggable=true], .item, [data-document-type="Item"], [data-type="Item"], li.directory-item');

    candidates.each((_i, el) => {
        // Heuristic check: the element or its closest row represents an Item
        const row = el.closest('[data-document-id], [data-item-id], .item, li.directory-item');
        const looksLikeItem =
            (row?.classList?.contains('item')) ||
            (row?.classList?.contains('directory-item')) ||
            (row instanceof HTMLElement && (
                row.dataset?.documentType === 'Item' ||
                row.dataset?.type === 'Item' ||
                !!row.dataset?.itemId ||
                !!row.dataset?.documentId
            ));
        if (!looksLikeItem) return;

        // Remove draggable and actively block dragstart
        el.setAttribute('draggable', 'false');
        el.addEventListener(
            'dragstart',
            (ev) => { ev.preventDefault(); ev.stopPropagation(); },
            { capture: true }
        );
        // On some touch devices, pointer events may trigger drag; cancel early
        ['pointerdown','touchstart'].forEach(evt => {
            el.addEventListener(evt, (ev) => {
                // Allow regular clicks, but do not allow drags to start
                // We can't distinguish intent reliably; for safety, stop if this element is draggable-ish
                ev.stopPropagation();
            }, { capture: true, passive: false });
        });
        // Optional: change cursor to indicate disabled (desktop)
        if (el instanceof HTMLElement) el.style.cursor = 'not-allowed';
    });
}

Hooks.on("renderActorSheet", (app, html, data) => {
    if (Settings.isDragRestrictedForCurrentUser()) {
        disableItemDragIn(html);
    }
});

// Some systems/apps use ApplicationV2 naming for hooks as well
Hooks.on("renderActorSheetV2", (app, html, data) => {
    if (Settings.isDragRestrictedForCurrentUser()) {
        disableItemDragIn($(html));
    }
});


Hooks.on("renderItemDirectory", (app, html, data) => {
    if (Settings.isDragRestrictedForCurrentUser()) {
        disableItemDragIn(html);
    }
});

// Fallback for any sidebar tab, ensure Items tab is covered on systems where the hook name differs
Hooks.on("renderSidebarTab", (app, html, data) => {
    try {
        const id = app?.id ?? app?.options?.id ?? app?.tabName;
        if (id === 'items' && !game.user?.isGM && Settings.isDragRestrictedForCurrentUser()) {
            disableItemDragIn(html);
        }
    } catch (e) {
        // no-op
    }
});

Hooks.on('renderCombatTracker', async (app, html, options) => {
    CombatTrackerEnhancements.bind(app,html,options);
});

Hooks.on('targetToken', (user, token, targeted) => {
    if(game.combat && game.combat.combatants.find(c=>c.tokenId,token.id)){
        ui.combat.render();
    }
});





