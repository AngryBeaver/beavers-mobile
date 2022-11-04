
// @ts-ignore
export class Mobile5eSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {

    actor:Actor;
    canvas;
    touchStart?:Touch
    touchNow?:Touch
    interval?:number


    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["beavers-mobile","dnd5e", "sheet", "actor", "character"],
            width: 500,
            height: 1040
        });
    }

    async getData() {
        const context = await super.getData();
        this.canvas = canvas;
        return context;
    }

    activateListeners(html){
        super.activateListeners(html);
        this._rerender(html);
        this._addMovementListener(html);
    }

    _rerender(html){
        this._moveRest(html);
        this._moveCurrency(html);
        this._addMovement(html);
    }

    _moveRest(html){
        const rest = $(html).find(".hit-dice .attribute-footer");
        $(html).find(".attributes .movement .attribute-footer").remove();
        $(html).find(".attributes .movement ").append(rest);
    }

    _moveCurrency(html){
        $(html).find(".currency .pp").text("pp");
        $(html).find(".currency .gp").text("gp");
        $(html).find(".currency .ep").text("ep");
        $(html).find(".currency .sp").text("sp");
        $(html).find(".currency .cp").text("cp");
    }

    _addMovement(html){
        const upLeft = "<a class='moving up left'><i class='fa-light fa-up-left'></i></a>";
        const up = "<a class='moving up'><i class='fa-light fa-up'></i></a>";
        const upRight = "<a class='moving up right'><i class='fa-light fa-up-right'></i></a>";
        const right = "<a class='moving right'><i class='fa-light fa-right'></i></a>";
        const left = "<a class='moving left'><i class='fa-light fa-left'></i></a>";
        const downLeft = "<a class='moving down left'><i class='fa-light fa-down-left'></i></a>";
        const down = "<a class='moving down'><i class='fa-light fa-down'></i></a>";
        const downRight = "<a class='moving down right'><i class='fa-light fa-down-right'></i></a>";
        const image = $("<div class='image'/>");
        const img = $(html).find(".sheet-header img");
        $(html).find(".sheet-header").prepend(image);
        image.append(img);
        image.append(downRight);
        image.append(down);
        image.append(downLeft);
        image.append(right);
        image.append(left);
        image.append(upRight);
        image.append(up);
        image.append(upLeft);
    }

    _addMovementListener(html){
        $(html).find(".sheet-header .image").on("touchstart",(e: Event)=>{
            this.touchStart = this._getTouchFrom(e);
            this.interval = window.setInterval(()=>{
                if(this.touchNow && this.touchStart){

                    const diffX = this.touchNow.clientX-this.touchStart.clientX;
                    const diffY = this.touchNow.clientY-this.touchStart.clientY;
                    let x = 0;
                    let y = 0;
                    if(Math.abs(diffX) > 30){
                        x = Math.sign(diffX);
                    }
                    if(Math.abs(diffY) > 30){
                        y = Math.sign(diffY);
                    }
                    this._move(x,y);
                }
            },500)
        });

        $(html).find(".sheet-header .image").on("touchmove",(e:Event)=>{
            this.touchNow = this._getTouchFrom(e);

        });

        $(html).find(".sheet-header .image").on("touchend",(e:Event)=>{
            window.clearInterval(this.interval);
            this.touchStart = undefined;
            this.touchNow = undefined;
        });

        $(html).find(".sheet-header .image .fa-up-left").on("click",(e)=>{
            this._move(-1, -1)
        });
        $(html).find(".sheet-header .image .fa-up").on("click",(e)=>{
            this._move(0, -1)
        });
        $(html).find(".sheet-header .image .fa-up-right").on("click",(e)=>{
            this._move(1, -1)
        });
        $(html).find(".sheet-header .image .fa-left").on("click",(e)=>{
            this._move(-1, 0)
        });
        $(html).find(".sheet-header .image .fa-right").on("click",(e)=>{
            this._move(1, 0)
        });
        $(html).find(".sheet-header .image .fa-down-left").on("click",(e)=>{
            this._move(-1, 1)
        });
        $(html).find(".sheet-header .image .fa-down").on("click",(e)=>{
            this._move(0, 1)
        });
        $(html).find(".sheet-header .image .fa-down-right").on("click",(e)=>{
            this._move(1, 1)
        });
    }

    _getTouchFrom(e: Event):Touch{
        // @ts-ignore
        const te: TouchEvent = e.originalEvent;
        return te.touches[0];
    }

    _getToken():Token{
        return this.canvas.tokens?.objects?.children.find(token => token?.actor.id === this.actor.id);
    }

    _move(x, y) {
        if(!(game instanceof Game) || game.paused){
            return;
        }
        const token = this._getToken();
        // @ts-ignore
        const center = token.getCenter(token.x, token.y);
        // @ts-ignore
        const collisionPoint = token.getMovementAdjustedPoint(center);
        collisionPoint.x = collisionPoint.x + this.canvas.scene.dimensions.size * x;
        collisionPoint.y = collisionPoint.y + this.canvas.scene.dimensions.size * y;

        const movePoint = {
            x : token.x + this.canvas.scene.dimensions.size * x,
            y : token.y + this.canvas.scene.dimensions.size * y
        }
        if (!token.checkCollision(collisionPoint) && this._checkSceneCollision(collisionPoint)) {
            token.document.update(movePoint);
        }
    }

    _checkSceneCollision(collisionPoint){
        return !(collisionPoint.x < this.canvas.scene.x
            && collisionPoint.x > 0
            && collisionPoint.y < this.canvas.scene.y
            && collisionPoint.y > 0);
    }
}


