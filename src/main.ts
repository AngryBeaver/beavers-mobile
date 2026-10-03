import { DeviceSetting, MODULE_ID, useMobileSheet } from "./core/mode.js";
import { createMobileSheet } from "./sheet.js";

const onMobile = () => useMobileSheet(game.settings.get(MODULE_ID, "device") as DeviceSetting, window.innerWidth);

/**
 * Which sheet an actor opens is stored on the actor and in a world setting, the same for every device. A phone
 * needs the mobile sheet while the desktop keeps its own, so on a mobile device characters answer with the mobile
 * sheet whatever is stored.
 */
function patchSheetClass(MobileSheet: any) {
  const proto = CONFIG.Actor.documentClass.prototype;
  const original = proto._getSheetClass;
  proto._getSheetClass = function () {
    if (this.type === "character" && onMobile()) return MobileSheet;
    return original.call(this);
  };
}

Hooks.once("init", () => {
  const Base = globalThis.dnd5e?.applications?.actor?.CharacterActorSheet;
  if (!Base) return console.warn(`${MODULE_ID} | no dnd5e character sheet found, the mobile sheet is not available`);

  game.settings.register(MODULE_ID, "device", {
    name: "BEAVERS_MOBILE.device.name",
    hint: "BEAVERS_MOBILE.device.hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      auto: "BEAVERS_MOBILE.device.auto",
      always: "BEAVERS_MOBILE.device.always",
      never: "BEAVERS_MOBILE.device.never",
    },
    default: "auto",
    requiresReload: true,
  });

  const MobileSheet = createMobileSheet(Base);
  // Also a normal sheet: it can be chosen for a single character on any device
  foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, MODULE_ID, MobileSheet, {
    types: ["character"],
    makeDefault: false,
    label: "BEAVERS_MOBILE.sheet",
  });
  patchSheetClass(MobileSheet);

  // On a phone the sheet is the game: open the user's character right away
  Hooks.once("ready", () => {
    if (onMobile()) game.user.character?.sheet?.render({ force: true });
  });
});
