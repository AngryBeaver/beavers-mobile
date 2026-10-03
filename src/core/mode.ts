export const MODULE_ID = "beavers-mobile";

/** A viewport up to this many CSS pixels wide is a phone. css/mobile-sheet.css goes full screen at the same width. */
export const PHONE_MAX_WIDTH = 600;

/** The client setting "device": which character sheet this device opens. */
export type DeviceSetting = "auto" | "always" | "never";

/** Does this device open characters in the mobile sheet? "auto" decides by the width of the viewport. */
export function useMobileSheet(setting: DeviceSetting, viewportWidth: number): boolean {
  if (setting === "always") return true;
  if (setting === "never") return false;
  return viewportWidth <= PHONE_MAX_WIDTH;
}
