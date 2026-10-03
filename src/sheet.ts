/** The window on a screen that is no phone. On a phone css/mobile-sheet.css makes it the whole screen. */
const WIDTH = 400;
const HEIGHT = 800;

/**
 * dnd5e's character sheet in one column. It is dnd5e's own sheet (same parts, same templates, same behaviour) with
 * the class "beavers-mobile"; css/mobile-sheet.css does the layout. dnd5e 5 and 6 share the parts and class names
 * this relies on.
 * @param Base dnd5e.applications.actor.CharacterActorSheet
 */
export function createMobileSheet(Base: any) {
  return class MobileCharacterSheet extends Base {
    static DEFAULT_OPTIONS = {
      classes: ["beavers-mobile"],
      position: { width: WIDTH, height: HEIGHT },
      // A double tap on the header would minimize the sheet
      window: { resizable: false, minimizable: false },
    };

    constructor(options: any = {}) {
      // dnd5e opens a sheet in the size the user last gave the desktop sheet, unless a size is passed
      super({ ...options, position: { width: WIDTH, height: HEIGHT, ...options.position } });
    }

    /** dnd5e stores the sheet's size per user, not per device: the phone's size must not become the desktop's. */
    _saveSheetPosition() {}

    async _onFirstRender(context: any, options: any) {
      await super._onFirstRender(context, options);
      // dnd5e lays the ability scores over the header, outside of what scrolls. Put them into the column.
      // Foundry replaces a part where it stands, so they stay there on every later render.
      const scores = this.element.querySelector(".ability-scores");
      const tabs = this.element.querySelector(".main-content > .tab-body");
      if (scores && tabs) tabs.before(scores);
    }
  };
}
