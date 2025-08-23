import { VirtualGamepadApp } from "./VirtualGamepadApp.js";
import { DisableItemDragUsersForm } from "./DisableItemDragUsersForm.js";

export const NAMESPACE = "beavers-mobile" as const;

export class Settings {
  static ADD_COMBAT_TRACKER_TARGET = "addCombatTrackerTarget";
  static HIDE_CANVAS = "hideCanvas";
  static VIRTUAL_GAMEPAD = "virtualGamepad";
  static DISABLE_ITEM_DRAG_USERS = "disableItemDrag.users";

  interval: number | undefined;
  virtualGamepadApp: any | undefined;

  init() {
    const foundryGame = game as foundry.Game;
      // @ts-ignore
      foundryGame.settings.register(NAMESPACE, Settings.VIRTUAL_GAMEPAD, {
        name: foundryGame.i18n?.localize("beaversMobile.settings.virtualGamepad.name"),
        hint: foundryGame.i18n?.localize("beaversMobile.settings.virtualGamepad.hint"),
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: (value:any) => {
          if (value) {
            this._showVirtualGamepad();
          } else {
            this._closeVirtualGamepad();
          }
        },
      });
      // @ts-ignore
      foundryGame.settings.register(NAMESPACE, Settings.ADD_COMBAT_TRACKER_TARGET, {
        name: foundryGame.i18n?.localize("beaversMobile.settings.addCombatTrackerTarget.name"),
        hint: foundryGame.i18n?.localize("beaversMobile.settings.addCombatTrackerTarget.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
      });
      // @ts-ignore
      foundryGame.settings.register(NAMESPACE, Settings.HIDE_CANVAS, {
        name: foundryGame.i18n?.localize("beaversMobile.settings.hideCanvas.name"),
        hint: foundryGame.i18n?.localize("beaversMobile.settings.hideCanvas.hint"),
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: (value:any) => {
          if (value) {
            this._hideCanvas();
          } else {
            this._showCanvas();
          }
        },
      });
      // Settings submenu to configure restricted users
      // @ts-ignore
      foundryGame.settings.registerMenu(NAMESPACE, "disableItemDragMenu", {
          name: foundryGame.i18n?.localize("beaversMobile.settings.disableItemDrag.menu.name") ?? "Configure users to disable item dragging",
          label: foundryGame.i18n?.localize("beaversMobile.settings.disableItemDrag.menu.label") ?? "Choose users",
          hint: foundryGame.i18n?.localize("beaversMobile.settings.disableItemDrag.menu.hint") ?? "Select which users are prevented from dragging items.",
          icon: "fas fa-user-lock",
          type: DisableItemDragUsersForm as any,
          restricted: true,
      });
      // Store selected users as an array (not directly configurable via the default UI)
      // @ts-ignore
      foundryGame.settings.register(NAMESPACE, Settings.DISABLE_ITEM_DRAG_USERS, {
          name: foundryGame.i18n?.localize("beaversMobile.settings.disableItemDrag.users.name") ?? "Restricted users",
          hint: foundryGame.i18n?.localize("beaversMobile.settings.disableItemDrag.users.hint") ?? "Users who cannot drag items when the feature is enabled.",
          scope: "world",
          config: false, // managed via a menu form (see below)
          type: Array,
          default: [],
      });
  }

    static isDragRestrictedForCurrentUser(): boolean {
        const restricted = Settings.get<string[]>(Settings.DISABLE_ITEM_DRAG_USERS) ?? [];
        const me = (game as ReadyGame).user?.id;
        return !!me && restricted.includes(me);
    }

  static get<T>(key:string):T {
     // @ts-ignore
      return (game as ReadyGame).settings.get(NAMESPACE, key) as T
  };

  ready() {
    if (Settings.get(Settings.HIDE_CANVAS)) {
      this._hideCanvas();
    }
    if (Settings.get(Settings.VIRTUAL_GAMEPAD)) {
      this._showVirtualGamepad();
    }

  }

  private _showVirtualGamepad() {
    if (!this.virtualGamepadApp) {
      this.virtualGamepadApp = VirtualGamepadApp.for("mobile");
    }
    this.virtualGamepadApp.render(true);
  }

  private _closeVirtualGamepad() {
    if (!this.virtualGamepadApp) {
      this.virtualGamepadApp = VirtualGamepadApp.for("mobile");
    }
    this.virtualGamepadApp.close();
  }


  private _hideCanvas() {
    $("canvas").hide();
    $("#ui-left").css({ "visibility": "hidden" });
    this.interval = window.setInterval(() => $("#dice-box-canvas").hide(), 500);
  }

  private _showCanvas() {
    $("canvas").show();
    $("#dice-box-canvas").show();
    $("#ui-left").css({ "visibility": "visible" });
    window.clearInterval(this.interval);
  }

}