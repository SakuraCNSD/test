let vConsole = new VConsole();
const width = window.innerWidth, height = window.innerHeight, increase = 0.1, decrease = 0.1, moveSpeed = 8;
let scaleX, scaleY;
const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xffffff
});
document.body.appendChild(app.view);

const stage = app.stage;
const container = new PIXI.Container();
const timg = PIXI.Sprite.from("image/timg.jpg");
const triger = PIXI.Sprite.from("image/triger.jpg");
stage.position.set(-width / 2, -height / 2);
scaleX = triger.width / width;
scaleY = triger.height / height;
timg.width = 30;
timg.height = 30;
timg.x = 100;
timg.y = 100;
container.interactive = true;
container.buttonMode = true;
container.addChild(triger);
container.addChild(timg);
stage.addChild(container);

const canvas = document.querySelector("canvas");
let startPoint, distance, curPoint, lastPoint, zoomPoint, zoomLastPoint, zoomCurPoint, scale, pivot;
container.on("touchstart", e => {
    const touch = e.currentTarget;
    touch.position.set();
    // lastPoint = {
    //     x: touch[0].pageX,
    //     y: touch[0].pageY
    // }
    // if (touch.length === 1) {
    //     startPoint = {
    //         x: touch[0].pageX,
    //         y: touch[0].pageY
    //     }
    // } else if (touch.length >= 2) {
    //     startPoint = {
    //         x: touch[0].pageX,
    //         y: touch[0].pageY
    //     }
    //     zoomLastPoint = {
    //         x: touch[1].pageX,
    //         y: touch[1].pageY
    //     }
    //     zoomPoint = {
    //         x: touch[1].pageX,
    //         y: touch[1].pageY
    //     }
    // }
}).on("touchmove", e => {
    console.log(e);
});
// canvas.addEventListener("touchstart", e => {
//     const touch = e.targetTouches;
//     lastPoint = {
//         x: touch[0].pageX,
//         y: touch[0].pageY
//     }
//     if (touch.length === 1) {
//         startPoint = {
//             x: touch[0].pageX,
//             y: touch[0].pageY
//         }
//     } else if (touch.length >= 2) {
//         startPoint = {
//             x: touch[0].pageX,
//             y: touch[0].pageY
//         }
//         zoomLastPoint = {
//             x: touch[1].pageX,
//             y: touch[1].pageY
//         }
//         zoomPoint = {
//             x: touch[1].pageX,
//             y: touch[1].pageY
//         }
//     }
// });
// canvas.addEventListener("touchmove", e => {
//     const touch = e.targetTouches;
//     curPoint = {
//         x: touch[0].pageX,
//         y: touch[0].pageY
//     }
//     console.log(curPoint.x === lastPoint.x && curPoint.y === lastPoint.y);
//     if (curPoint.x === lastPoint.x && curPoint.y === lastPoint.y) return;
//     if (touch.length === 1) {
//         distance = {
//             x: touch[0].pageX - startPoint.x,
//             y: touch[0].pageY - startPoint.y,
//         }
//         if (distance.x > 0) {
//             stage.x += moveSpeed;
//         } else {
//             stage.x -= moveSpeed;
//         }
//         if (distance.y > 0) {
//             stage.y += moveSpeed;
//         } else {
//             stage.y -= moveSpeed;
//         }
//     } else if (touch.length >= 2) {
//         zoomCurPoint = {
//             x: touch[1].pageX,
//             y: touch[1].pageY
//         }
//         zoomIn();
//     }
//     lastPoint.x = curPoint.x;
//     lastPoint.y = curPoint.y;
//     e.preventDefault();
// });

canvas.addEventListener("touchend", () => {
    console.log(stage.x, stage.y);
});

function zoomIn() {
    if (Math.abs(zoomCurPoint.x - curPoint.x) > Math.abs(zoomLastPoint.x - lastPoint.x)) {
        scale = {
            x: isAccord("enlarge", stage.scale.x + increase, scaleX),
            y: isAccord("enlarge", stage.scale.y + increase, scaleY)
        }
        pivot = {
            x: setCenter("x", zoomCurPoint.x, curPoint.x),
            y: setCenter("y", zoomCurPoint.y, curPoint.y)
        }
        stage.pivot.set(pivot.x, pivot.y);
        stage.scale.set(scale.x, scale.y);
    } else {
        scale = {
            x: isAccord("shrike", stage.scale.x - decrease,),
            y: isAccord("shrike", stage.scale.y - decrease,)
        }
        pivot = {
            x: Math.abs(zoomCurPoint.x - curPoint.x) / 2 + moveSpeed,
            y: Math.abs(zoomCurPoint.y - curPoint.y) / 2 + moveSpeed
        }
        stage.pivot.set(pivot.x, pivot.y);
        stage.scale.set(scale.x, scale.y);
    }
}

function isAccord(direction, value, maxValue) {
    if (direction === "enlarge") {
        if (value >= maxValue) return maxValue;
        return value;
    }
    if (direction === "shrike") {
        if (value <= maxValue) return maxValue;
        return value;
    }
}

function setCenter(type, zoomCurPoint, curPoint) {

}