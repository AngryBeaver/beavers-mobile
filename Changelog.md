# 3.0.0
- Rework of everything what this module once was.
- The dnd5e character sheet in a mobile edition: one column as wide as a phone, full screen on phones, tabs along the bottom.
- Compatible with dnd5e 5.x and 6.x on Foundry v13 and v14.
- Removed: virtual gamepad, targeting without canvas, hide canvas, disable item dragging.
- Build with esbuild and pnpm instead of gulp.
# 2.0.0
- Add Compatibility with applicationV2 
- Remove tiny dnd5e sheet the latest dnd5e is quite good for mobiles.
- New: Disable item dragging for selected users. 
  - Prevents dragging items from actor sheets (ApplicationV2 compatible) and the Items directory; helpful on mobile to avoid accidental duplication while scrolling. 
  - Configurable via world setting and a "Configure restricted users" submenu.
# 1.0.1
- fix bug in non dnd5e systems.
# 1.0.0
- module is no longer for dnd5e only. but still has a dnd5e slim sheet.
- you can add a virtual gamepad to control a token (you need a gamepad module e.g. [beavers-gamepad](https://github.com/AngryBeaver/beavers-gamepad))
  - you need to configure the virtual gamepad as usually (it is registered as if it is a real gamepad)
- uses [beavers-token-movement](https://github.com/AngryBeaver/beavers-system-interface/wiki/Beaver's-System-Interface#tokenmovementcreate-v214) to move the token around
- disable canvas now also hides unwanted canvas control items as well as if existent the dice so nice box which provides on most mobiles a black box overlapping everything.
#  0.0.7
bugfix you can no longer move your token while paused.