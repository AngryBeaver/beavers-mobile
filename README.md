# Beaver's Mobile
![Foundry Core Compatible Version](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dflat%26url%3Dhttps%3A%2F%2Fgithub.com%2FAngryBeaver%2Fbeavers-mobile%2Freleases%2Flatest%2Fdownload%2Fmodule.json)
![Foundry System](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fsystem%3FnameType%3Draw%26showVersion%3D1%26style%3Dflat%26url%3Dhttps%3A%2F%2Fgithub.com%2FAngryBeaver%2Fbeavers-mobile%2Freleases%2Flatest%2Fdownload%2Fmodule.json)
![Latest Release Download Count](https://img.shields.io/github/downloads/AngryBeaver/beavers-mobile/total?color=bright-green)
![Lint & Test](https://github.com/AngryBeaver/beavers-mobile/actions/workflows/lint.yml/badge.svg)

The **dnd5e character sheet in a mobile edition**: one column, as wide as a phone.

dnd5e's character sheet needs a window of at least 800px. A phone has 360 to 430. This module adds a second
character sheet that is dnd5e's own sheet (same data, same buttons, same rolls) laid out for that width:

- **Full screen** on a phone, a 400px window everywhere else.
- **One column** that scrolls as a whole: character card (portrait beside armor class, initiative, speed, hit points,
  hit dice), ability scores, favorites, then skills, saving throws and traits.
- **Tabs along the bottom**, under your thumb, instead of outside the window's right edge.
- Inventory, features, spells and effects use the full width. dnd5e's item lists drop columns by themselves when
  they are narrow.

  <img width="409" height="668" alt="image" src="https://github.com/user-attachments/assets/73146502-ae19-4f5c-b828-35615578f01c" />


## How it works

- **On a phone** (a screen up to 600px wide) every character opens in the mobile sheet, and the character assigned
  to your user opens right after login. Nothing is changed on the actor: the same character opens in its normal
  sheet on a desktop at the same time.
- **Per device** you can change that in *Game Settings -> Module Settings -> Character sheet on this device*:
  on phones only (default), always, or never.
- **Per character** the sheet is also in Foundry's sheet configuration as *Mobile Character Sheet*, for any device.

The size of the mobile sheet is never stored, so it does not change the size your desktop sheet opens in.

## Compatibility

- Foundry v13 and v14.
- dnd5e 5.x and 6.x, checked against 5.3.3 and 6.0.5. Both versions build the character sheet from the same parts
  and class names, the module relies on nothing else.

Only the character sheet has a mobile edition. NPC, vehicle, group and item sheets stay as dnd5e makes them.

Version 3 is a new module: the virtual gamepad, targeting without canvas, hiding the canvas and blocking item
drags of version 2 are gone. For in-person play with the map on a table screen see
[Beaver's Mobile Pawn](https://github.com/AngryBeaver/beavers-mobile-pawn), it shows whatever sheet the character
opens, so also this one.

## Development

```
pnpm install
pnpm test          # unit tests
pnpm typecheck
pnpm devwatch      # builds into devDir from package.json
pnpm release       # zip in package/
```

The layout is `css/mobile-sheet.css` alone. `src/sheet.ts` is dnd5e's sheet with one more class and the ability
scores moved into the scrolling column.
