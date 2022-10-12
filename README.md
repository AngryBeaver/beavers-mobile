# Beaver's Mobile Enhancements
![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FAngryBeaver%2Fbeavers-mobule%2Freleases%2Flatest)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FAngryBeaver%2Fbeavers-mobile%2Fmaster%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

Beavers-mobile is a module to enhance playing locally with foundry on a map screen while players join with lowend devices e.g. phone or tablet.
The aim is that the players play on the screen while using their devices.

I do not want a lan party so best would be if they do not have any canvas at all rendered on their devices.
The Map is shown on a table screen and that is the place where communication should happen.

## Features
- targeting without canvas

![img.png](pictures/img.png)

## Systems
- should work on every system.
  - only tested on dnd5e

## Similar Modules
### Overall
[DDB-GameLog](https://github.com/IamWarHead/ddb-game-log) has some limitations as it is not connected to foundry.
### Targeting
[midi-qol](https://gitlab.com/tposney/midi-qol) can enable late targeting that would allow targeting without canvas sadly it is currently broken.

## Note
CoreSetting: Disable canvas will break mostly all interaction with tokens e.g. attacking,targeting etc. 
that is why this module comes with a hide canvas option.


# Credits
project structur is copied from midi-qol (gulpfile,package.json,my.conf.js,tsconcig.json)