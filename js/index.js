const Application = PIXI.Application, width = window.innerWidth, height = window.innerHeight;
const app = new Application({
    width,
    height,
    // transparent: true,
    antialias: true
});
document.body.appendChild(app.view);

const sprite = PIXI.Sprite.from("image/timg.jpg");
sprite.width = 30;
sprite.height = 30;
sprite.x = 100;
sprite.y = 100;
app.stage.addChild(sprite);

const canvas = document.querySelector("canvas");
let startX, startY, moveX, moveY, startX1, startY1, moveX1, moveY1;
canvas.addEventListener("touchstart", e => {
    const touch = e.changedTouches;
    if (touch.length === 1) {
        startX = touch[0].pageX;
        startY = touch[0].pageY;
    }
});
canvas.addEventListener("touchmove", e => {
    const touch = e.changedTouches;
    let resultX, resultY;
    if (touch.length === 1) {
        moveX = touch[0].pageX;
        moveY = touch[0].clientY;
        resultX = (moveX - startX) * 0.02;
        resultY = (moveY - startY) * 0.02;
        if (resultX > 0) {
            app.stage.x -= resultX;
        } else {
            app.stage.x -= resultX;
        }
        if (resultY > 0) {
            app.stage.y -= resultY;
        } else {
            app.stage.y -= resultY;
        }
    }
});