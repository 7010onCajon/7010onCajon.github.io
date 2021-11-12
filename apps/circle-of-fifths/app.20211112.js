var s = Snap("#svg");
const CENTER_X = 160;
const CENTER_Y = 320;
const RADIUS = 148;
const MAJOR_RADIUS = (RADIUS / 8) * 6;
const MINOR_RADIUS = (RADIUS / 8) * 5;
const DIMINISH_RADIUS = (RADIUS / 8) * 4;
const TITLE_RADIUS = (RADIUS / 8) * 2;
const KEY_SIGNATURES = ['♮', '♭×1', '♭×2', '♭×3', '♭×4', '♭×5', '♭×6/♯×6', '♯×5', '♯×4', '♯×3', '♯×2', '♯×1']
const MAJOR_KEYS = ['C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭/F♯', 'B', 'E', 'A', 'D', 'G'];
const MINOR_KEYS = ['a', 'd', 'g', 'c', 'f', 'b♭', 'e♭/d♯', 'g♯', 'c♯', 'f♯', 'b', 'e'];
const DIMINISH_KEYS = ['b', 'e', 'a', 'd', 'g', 'c', 'f', 'a♯', 'd♯', 'g♯', 'c♯', 'f♯'];
var group = s.g();
// ♯
// ♭
// ♮

// 下地となる円の描画
var keyCircle = s.circle(CENTER_X, CENTER_Y, RADIUS);
keyCircle.attr({
    fill: "#fff",
    stroke: "#d6d8db",
    strokeWidth: 20
});
group.add(keyCircle);

var majorCircle = s.circle(CENTER_X, CENTER_Y, MAJOR_RADIUS);
majorCircle.attr({
    fill: "#fff",
    stroke: "#b8daff",
    strokeWidth: 5
});
group.add(majorCircle);

var minorCircle = s.circle(CENTER_X, CENTER_Y, MINOR_RADIUS);
minorCircle.attr({
    fill: "#FFF",
    stroke: "#f5c6cb",
    strokeWidth: 5
});
group.add(minorCircle);

var diminishCircle = s.circle(CENTER_X, CENTER_Y, DIMINISH_RADIUS);
diminishCircle.attr({
    fill: "#FFF",
    stroke: "#FFF",
    strokeWidth: 5
});
group.add(diminishCircle);

var titleCircle = s.circle(CENTER_X, CENTER_Y, TITLE_RADIUS);
titleCircle.attr({
    fill: "#d6d8db",
    stroke: "#d6d8db",
    //strokeWidth: 5
});
// titleCircle は groupには入れない

// 記号の表示
var matrix;
var degree = 0;
// 調号の表示
degree = 0;
for (const key of KEY_SIGNATURES) {
    k = s.text(CENTER_X, CENTER_Y, key);
    k.attr({
        textAnchor: "middle",
        dominantBaseline: "central"
    });
    matrix = Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -RADIUS);
    k.transform(matrix);
    group.add(k);
    degree = degree + 360 / 12;
}

// Majorスケールのキー表示
degree = 0;
for (const key of MAJOR_KEYS) {
    k = s.text(CENTER_X, CENTER_Y, key);
    k.attr({
        textAnchor: "middle",
        dominantBaseline: "central"
    });
    matrix = Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -MAJOR_RADIUS - 10);
    k.transform(matrix);
    
    group.add(k);
    degree = degree + 360 / 12;
}
// Minorスケールのキー表示
degree = 0;
for (const key of MINOR_KEYS) {
    k = s.text(CENTER_X, CENTER_Y, key);
    k.attr({
        textAnchor: "middle",
        dominantBaseline: "central"
    });
    matrix = Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -MINOR_RADIUS - 10);
    k.transform(matrix);
    group.add(k);
    degree = degree + 360 / 12;
}

// Diminishスケールのキー表示
degree = 0;
for (const key of DIMINISH_KEYS) {
    k = s.text(CENTER_X, CENTER_Y, key);
    k.attr({
        textAnchor: "middle",
        dominantBaseline: "central",
        fontStyle: "italic",
        //fontSize: "12px",
        //fill: "#d6d8db"
        fill: "#888"
    });
    matrix = Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -DIMINISH_RADIUS - 10);
    k.transform(matrix);
    group.add(k);
    degree = degree + 360 / 12;
}

// タイトルの表示
var main = s.text(CENTER_X, 40, "Circle of Fifth for Jazz Player");
main.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    //fontStyle: "italic",
    fontSize: "20px",
    fill: "#000"
});

// 円盤文字の表示
var title = s.text(CENTER_X, CENTER_Y, "Circle of Fifth");
title.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fontStyle: "italic",
    //fontSize: "12px",
    fill: "#000"
});

// イベント処理
/*
var sharpButton = s.rect(500, 50, 50, 50)
sharpButton.attr({
    fill: "blue"
});

var flatButton = s.rect(50, 50, 50, 50)
flatButton.attr({
    fill: "red"
});

var matrix = Snap.matrix();
sharpButton.click(function(e){
    console.log("sharp");
    //matrix = matrix.add(m);
    matrix.rotate(360/12, CENTER_X, CENTER_Y);    
    //group.transform(matrix);
    group.animate({transform: matrix}, 100, mina.backin);
    title.animate({transform: matrix}, 1000, mina.backin);
});

flatButton.click(function(e){
    console.log("sharp");
    group.transform('');
    //matrix = matrix.add(m);
    matrix.rotate(-360/12, CENTER_X, CENTER_Y);    
    //group.transform(matrix);
    group.stop().animate({transform: matrix}, 100, mina.linear);
    title.stop().animate({transform: matrix}, 1000, mina.backin);
});
*/

// Dragイベント
group.drag(
    dragRotate,
    dragRotateStart
);

function dragRotate(dx, dy, x, y) {
    var angleDiff = Snap.angle(this.getBBox().cx, this.getBBox().cy, x, y) - this.data('startingAngle')
    var newRotation = angleDiff + +this.data('startingRotation');
    this.data('rotation', newRotation)
    this.transform('r' + newRotation);
}

function dragRotateStart(x, y) {
    this.data('startingAngle', Snap.angle(this.getBBox().cx, this.getBBox().cy, x, y));
    this.data('startingRotation', this.data('rotation') || 10)
}



/*
//
var org_x;
var org_y;
dragCircle.drag(
    function (dx, dy, x, y) {
        console.log(x, y);
        x1 = org_x;
        y1 = org_y;
        x2 = x - CENTER_X;
        y2 = y - CENTER_Y;
        var a = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        group.transform(Snap.matrix().rotate(a, CENTER_X, CENTER_Y))
        org_x = x2;
        org_y = y2;

        //group.attr({fill: "orange"});
        //group.attr({x: 10,y: orig_y+dy, fillOpacity: 1.0});
        //dragCircle.attr({cx: orig_x+dx,cy: orig_y+dy, fillOpacity: 1.0});
    }, function (x, y) {
        org_x = x - CENTER_X;
        org_y = y - CENTER_Y;
        //dragCircle.attr({fillOpacity: 1.0});
    }, function () {
        //dragCircle.attr({fillOpacity: 0.0});
    }
);
* /

/*
var key = s.text(CENTER_X, CENTER_Y, "ホゲホゲ")
key.attr({
    textAnchor: "middle",
    dominantBaseline: "central"
});

var matrix = Snap.matrix().rotate(90, CENTER_X, CENTER_Y).translate(0, -MAJOR_RADIUS-10);
key.transform(matrix);
*/