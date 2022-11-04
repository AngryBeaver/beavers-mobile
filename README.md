# Beaver's Mobile Enhancements
![Foundry Core Compatible Version](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FAngryBeaver%2Fbeavers-mobile%2Fmain%2Fmodule.json)
![Foundry System](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fsystem%3FnameType%3Draw%26showVersion%3D1%26style%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FAngryBeaver%2Fbeavers-mobile%2Fmain%2Fmodule.json)
![Latest Release Download Count](https://img.shields.io/github/downloads/AngryBeaver/beavers-mobile/total?color=bright-green)

Beavers-mobile is a module to enhance playing locally with foundry on a map screen while players join with tablets.
The aim is that the players play on the screen while using their devices to interact.

I do not want a lan party so best would be if they do not have any canvas at all rendered on their devices.
The Map is shown on a table screen and that is the place where communication should happen.

players view on tablet
![img.png](pictures/main.png)


## Features
- targeting without canvas 

![img.png](pictures/img.png)
- slim mobile sheet 500px that works good on 90 degrees rotated tablets
- token movement via sheet on click or touch on char-image and using it like a 
  - ! gamepad control-stick

![img.png](img.png)
## Similar Modules
### Overall
[DDB-GameLog](https://github.com/IamWarHead/ddb-game-log)
- has a gamesheet that can interact with foundry.
- has limitations as you are not able to target and thus using automation modules or move. 
### Targeting
[midi-qol](https://gitlab.com/tposney/midi-qol)
- Can enable late targeting that would allow targeting without canvas but it is currently broken.
### Moving
[mobile-token-movement-controls](https://gitlab.com/MatthijsKok/mobile-token-movement/-/blob/main/scripts/mobile-token-movement-controls.js)
- Allow moving your token but not on char-sheet and collision is not detected correctly.


## Troubleshooting
### Disable canvas CoreSetting
Disable canvas will break mostly all interaction with tokens e.g. attacking,targeting etc. 
that is why this module comes with a hide canvas option.
### Black Screen on mobile devices
if you have a blackbox covering your screen or parts of it try to disable all 3d modules like dice so nice.
You need to disable them for the mobile devicecs if possible then you can turn it on again for the main screen.
### Messed up styles
it is not that good in combination with [mobile improvements](https://gitlab.com/fvtt-modules-lab/mobile-improvements)
which is a way better mobile module than mine but it just did not fit me.
### Can't login on mobile
Sometime mobile devices have problem when logging into foundry. The trick is do not hit enter after password. While the keyboard popup is still up press the login button. That at least helped me on some devices. 

# Credits
project structure is copied from midi-qol (gulpfile,package.json,tsconcig.json)
