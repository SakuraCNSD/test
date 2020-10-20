//移动端调试
let vConsole = new VConsole();
const width = window.innerWidth, height = window.innerHeight, increase = 0.1, decrease = 0.1, moveSpeed = 25;
//创建一个应用
const app = new PIXI.Application({
    width,
    height,
    transparent: true
});
document.body.appendChild(app.view);
//舞台，容器
const stage = app.stage;
const container = new PIXI.Container();
const timg = PIXI.Sprite.from("image/timg.jpg");
const triger = PIXI.Sprite.from("image/triger.jpg");
timg.width = 30;
timg.height = 30;
timg.x = 100;
timg.y = 100;
container.addChild(triger);
container.addChild(timg);
stage.addChild(container);

let startPoint, //记录手指按下的位置
    distance, //记录拖动距离
    curPoint, //记录手指移动的位置
    lastPoint, //记录上一次拖动手指最后的位置
    zoomPoint, //记录缩放的手指按下的位置
    zoomCurPoint, //记录缩放的手指移动的位置
    zoomLastPoint, //记录上一次缩放手指最后的位置
    scaleX, //X轴最大缩放比
    scaleY, //Y轴最大缩放比
    oldPivot = {
        x: 0,
        y: 0
    }, //旧的中心点
    newPivot, //新的中心点
    distancePivot, //新旧中心点的距离
    pivot,
    isZoom = false; //新的中心点
//监听事件
document.addEventListener("touchstart", Start);
document.addEventListener("touchmove", Move);
document.addEventListener("touchend", End);

function Start(e) {
    const touch = e.targetTouches;
    scaleX = container.width / width;
    scaleY = container.height / height;
    lastPoint = {
        x: touch[0].pageX,
        y: touch[0].pageY
    }
    if (touch.length === 1) {
        startPoint = {
            x: touch[0].pageX,
            y: touch[0].pageY
        }
    } else if (touch.length >= 2) {
        startPoint = {
            x: touch[0].pageX,
            y: touch[0].pageY
        }
        zoomPoint = {
            x: touch[1].pageX,
            y: touch[1].pageY
        }
        zoomLastPoint = {
            x: touch[1].pageX,
            y: touch[1].pageY
        }
    }
}
function Move(e) {
    e.preventDefault();
    const touch = e.targetTouches;
    curPoint = {
        x: touch[0].pageX,
        y: touch[0].pageY
    }
    if (touch.length === 1) {
        distance = {
            x: touch[0].pageX - startPoint.x,
            y: touch[0].pageY - startPoint.y,
        }
        if (distance.x > 0) {
            stage.x = isBoundary("x", stage.x + moveSpeed);
        } else {
            stage.x = isBoundary("x", stage.x - moveSpeed);
        }
        if (distance.y > 0) {
            stage.y = isBoundary("y", stage.y + moveSpeed);
        } else {
            stage.y = isBoundary("y", stage.y - moveSpeed);
        }
    } else if (touch.length >= 2) {
        zoomCurPoint = {
            x: touch[1].pageX,
            y: touch[1].pageY
        }
        zoomIn();
    }
}
function End() {
    if (isZoom) {
        oldPivot = {
            x: newPivot.x,
            y: newPivot.y
        }
    }
    isZoom = false;
}
/**
 * 判断是否出边界
 * @param {*} direction 方向 
 * @param {*} vaule 移动后的值
 */
function isBoundary(direction, value) {
    const min = 0, maxX = - (container.width - width) * stage.scale.x, maxY = -(container.height - height) * stage.scale.y;
    if (direction === "x") {
        if (value >= 0) {
            return min;
        } else if (value < maxX) {
            return maxX;
        }
    } else if (direction === "y") {
        if (value >= 0) {
            return min;
        } else if (value < maxY) {
            return maxY;
        }
    }
    return value;
}
/**
 * 缩放
 */
function zoomIn() {
    if (Math.abs(zoomCurPoint.x - curPoint.x) > Math.abs(zoomLastPoint.x - lastPoint.x)) {
        scale = {
            // x: isAccord("enlarge", stage.scale.x + scaleX / 50, scaleX),
            // y: isAccord("enlarge", stage.scale.y + scaleY / 50, scaleY)
            x: stage.scale.x + scaleX / 50,
            y: stage.scale.y + scaleY / 50
        }
        newPivot = setCenterPivot(zoomLastPoint, lastPoint);
        distancePivot = {
            x: newPivot.x - oldPivot.x,
            y: newPivot.y - oldPivot.y
        }
        console.log(distancePivot);
        stage.pivot.set(newPivot.x, newPivot.y);
        isZoom = true;
        stage.scale.set(scale.x, scale.y);
        console.log(stage);
    } else {
        pivot = setCenterPivot(zoomCurPoint, curPoint, zoomLastPoint, lastPoint);
        // console.log(pivot);
        // scale = {
        //     x: isAccord("shrike", stage.scale.x - decrease,),
        //     y: isAccord("shrike", stage.scale.y - decrease,)
        // }
        // pivot = {
        //     x: Math.abs(zoomCurPoint.x - curPoint.x) / 2 + moveSpeed,
        //     y: Math.abs(zoomCurPoint.y - curPoint.y) / 2 + moveSpeed
        // }
        // stage.pivot.set(pivot.x, pivot.y);
        // stage.scale.set(scale.x, scale.y);
    }
}

// function isAccord(direction, value, maxValue) {
//     if (direction === "enlarge") {
//         if (value >= maxValue) return maxValue;
//     }
//     if (direction === "shrike") {
//         if (value <= maxValue) return maxValue;
//     }
//     return value;
// }

function setCenterPivot(zoomLastPoint, lastPoint) {
    let x, y;
    centerX = Math.abs((zoomLastPoint.x - lastPoint.x) / 2);
    centerY = Math.abs((zoomLastPoint.y - lastPoint.y) / 2);
    if (stage.x === 0) {
        if (zoomLastPoint.x > width / 2) {
            x = zoomLastPoint.x - centerX;
        } else {
            x = zoomLastPoint.x + centerX;
        }
    } else if (stage.x < 0) {
        zoomLastPoint.x = width - zoomLastPoint.x;
        if (zoomLastPoint.x > width / 2) {
            x = stage.x - width + zoomLastPoint.x + centerX;
        } else {
            x = stage.x - width - centerX + zoomLastPoint.x;
        }
    }
    if (stage.y === 0) {
        if (zoomLastPoint.y > height / 2) {
            y = zoomLastPoint.y - centerY;
        }
        y = zoomLastPoint.y + centerY;
    } else if (stage.y < 0) {
        zoomLastPoint.y = height - zoomLastPoint.y;
        if (zoomLastPoint.y > width / 2) {
            y = stage.y - height + zoomLastPoint.y + centerY;
        }
        y = stage.x - height - centerY + zoomLastPoint.y;
    }
    return {
        x,
        y
    }
}