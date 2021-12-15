var s = Snap("#svg");
const WIDTH = 360;
const HEIGHT = 640;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2 - 80;
const RADIUS = 154;
const MAJOR_RADIUS = (RADIUS / 16) * 13;
const MINOR_RADIUS = (RADIUS / 16) * 10;
const DIMINISH_RADIUS = (RADIUS / 16) * 7;
const TITLE_RADIUS = (RADIUS / 16) * 4;
const KEY_SIGNATURES = ['♮', '♭1', '♭2', '♭3', '♭4', '♭5', '♭6', '♯5', '♯4', '♯3', '♯2', '♯1']
const MAJOR_KEYS = ['C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'B', 'E', 'A', 'D', 'G'];
const MINOR_KEYS = ['A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'G', 'C♯', 'F♯', 'B', 'E'];
//const DIMINISH_KEYS = ['B◯', 'E◯', 'A◯', 'D◯', 'G◯', 'C◯', 'F◯', 'A♯◯', 'D♯◯', 'G♯◯', 'C♯◯', 'F♯◯'];
const DIMINISH_KEYS = ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'A♯', 'D♯', 'G♯', 'C♯', 'F♯'];
//var group = s.g();
// ♯
// ♭
// ♮
// ◯
// Signature: ♭×6/♯×6'
// Major: G♭/F♯
// Minor: e♭/d♯

// 下地となる円の描画
var keyCircle = s.circle(CENTER_X, CENTER_Y, RADIUS);
keyCircle.attr({
    fill: "#fff",
    //stroke: "#d6d8db",
    stroke: "#6c757d",
    //strokeWidth: 2,
    //fill: "white",
    //stroke: "white",
    strokeWidth: 20
});
//group.add(keyCircle);

var majorCircle = s.circle(CENTER_X, CENTER_Y, MAJOR_RADIUS-10);
majorCircle.attr({
    fill: "#fff",
    stroke: "#b8daff",
    strokeWidth: 2
});
// group.add(majorCircle);

var minorCircle = s.circle(CENTER_X, CENTER_Y, MINOR_RADIUS-10);
minorCircle.attr({
    fill: "#FFF",
    stroke: "#f5c6cb",
    strokeWidth: 2
});
// group.add(minorCircle);

/*
var diminishCircle = s.circle(CENTER_X, CENTER_Y, DIMINISH_RADIUS-10);
diminishCircle.attr({
    fill: "white",
    stroke: "white",
    strokeWidth: 2
});
*/
//group.add(diminishCircle);

/*
var titleCircle = s.circle(CENTER_X, CENTER_Y, TITLE_RADIUS);
titleCircle.attr({
    //fill: "#bee5eb",
    //stroke: "#fff",
    //fill: "#ffeeba",
    //stroke: "#ffeeba",
    fill: "#6c757d",
    //stroke: "white",
    //strokeWidth: 2
});
*/

// titleCircle は groupには入れない

// ダイアトニックを示す円の表示
var diatonics = [
    // 0
    null,
    // 1
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(0, CENTER_X, CENTER_Y).translate(0, -MAJOR_RADIUS))),
    // 2
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(30, CENTER_X, CENTER_Y).translate(0, -MINOR_RADIUS))),
    // 3
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(-30, CENTER_X, CENTER_Y).translate(0, -MINOR_RADIUS))),
    // 4
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(30, CENTER_X, CENTER_Y).translate(0, -MAJOR_RADIUS))),
    // 5
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(-30, CENTER_X, CENTER_Y).translate(0, -MAJOR_RADIUS))),
    // 6
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(0, CENTER_X, CENTER_Y).translate(0, -MINOR_RADIUS))),
    // 7
    s.circle(CENTER_X, CENTER_Y, 15)
        .attr({opacity: 0, fill: "#EEE",})
        .transform((Snap.matrix().rotate(0, CENTER_X, CENTER_Y).translate(0, -DIMINISH_RADIUS))),
];


// 記号の表示
var group = s.g();
var matrix;
var degree = 0;

// 調号の表示
/*
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
*/

function initKeys(keys, keyStrings, radius, superCap, color="black", size=16) {
    let degree = 0;
    for (const key of keyStrings) {
        let k = s.text(CENTER_X, CENTER_Y, key.split(''));
        k.attr({
            textAnchor: "middle",
            //dominantBaseline: "middle",
            dy: "0.5em",
            letterSpacing: 0,
            fill: color,
            fontSize: size

        });
        if (superCap) {
            // let isSpacing = false;
            k.selectAll("tspan").forEach(function (tspan, i) {
                //console.log(tspan.innerSVG());
                if (tspan.innerSVG() == '♯' || tspan.innerSVG() == '♭') {
                    tspan.attr({
                        // fill: "red",
                        fontSize: size-4,
                        baselineShift: "super"
                        //verticalAlign: "top"
                    });
                    isSpacing = true;
                } else if (tspan.innerSVG() == 'm'){
                    tspan.attr({
                        // fill: "red",
                        fontSize: size-4,
                        baselineShift: "sub"
                    });
                    /*
                    if(isSpacing == true){
                        tspan.attr({
                            fill: "red",
                            letterSpacing: -100,
                        });
                        isSpacing = false;
                    }
                    */
                } else if(tspan.innerSVG() == '◯'){
                    tspan.attr({
                        // fill: "red",
                        fontSize: size-8,
                        baselineShift: "sub"
                    });
                    
                    //isSpacing = false;
                }
            })
        }
        // matrix = Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -RADIUS);
        k.transform(Snap.matrix().rotate(-degree, CENTER_X, CENTER_Y));
        keys.push(k);

        let g = s.group(k);
        g.transform(Snap.matrix().rotate(degree, CENTER_X, CENTER_Y).translate(0, -radius))
        group.add(g);

        degree = degree + 360 / 12;
    }

}
// 調号の表示
var keys = [];
initKeys(keys, KEY_SIGNATURES, RADIUS, false, "white", 12);

// Majorスケールのキー表示
var majors = [];
initKeys(majors, MAJOR_KEYS, MAJOR_RADIUS, true, "black", 18);

// Minorスケールのキー表示
var minors = [];
initKeys(minors, MINOR_KEYS, MINOR_RADIUS, true, "black", 16);

// Diminishスケールのキー表示
var diminishes = [];
initKeys(diminishes, DIMINISH_KEYS, DIMINISH_RADIUS, true, "#6c757d", 12);

// タイトルの表示
var main = s.text(CENTER_X, 40, "Circle of Fifths for Jazz Player");
main.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fontStyle: "italic",
    fontSize: "20px",
    fill: "#000"
});

// 円盤文字の表示
/*
var title = s.text(CENTER_X, CENTER_Y, "C");
title.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    //fontStyle: "italic",
    fontSize: 36,
    fill: "#fff"
});
*/

//
// イベント処理
//

//
// 回転処理
//
var sharpRect = s.rect(WIDTH * 3/4 - 60, HEIGHT * 7/10 - 30, 120, 60, 10, 10);
sharpRect.attr({
    fill: "#007bff"
});

var sharpText = s.text(WIDTH * 3/4, HEIGHT * 7/10, "♯");
sharpText.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: "#FFF",
    fontSize: 30
});

var sharpButton = s.group(sharpRect, sharpText);

var flatRect = s.rect(WIDTH * 1/4 - 60, HEIGHT * 7/10 - 30, 120, 60, 10, 10);
flatRect.attr({
    fill: "#007bff"
});

var flatText = s.text(WIDTH * 1/4, HEIGHT * 7/10, "♭");
flatText.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: "#FFF",
    fontSize: 30
});

var flatButton = s.group(flatRect, flatText);

/*
SnapSVGのanimate（というか、回転行列）にバグがあり 270° でアニメーションが上手くいかない
具体的には、270° = -90° と認識されるため
　* シャープボタン（右回り）：240°から270°の時にアニメーションがおかしくなる
　* フラットボタン（左回り）：-90°から-120°の時にアニメーションがおかしくなる
そこで微調整の角度(DELTA)を導入し、上手くいくように小細工を行う
*/
const DELTA = 0.1;
function rotateCircle(isFlat) {
    // Circleの回転(groupに適用)
    let matrix = Snap.matrix();
    matrix.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    let animation = Snap.matrix();
    if(isFlat == false){
        // 右回りの時
        animation.rotate((360 / 12) * currentKey - DELTA, CENTER_X, CENTER_Y); 
    }else{
        // 左回りの時
        animation.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    }
    // animation.rotate((360 / 12) * currentKey + delta, CENTER_X, CENTER_Y);
    console.log(matrix.split().rotate)
    group.animate({ transform: animation }, 100, null, function(){
        group.transform(matrix);
        if(isFlat == true && matrix.split().rotate == -90){
            // 左回りの時 かつ -90°に達した時に事前調整を行う
            // console.log("NG");
            let temp = Snap.matrix().rotate(270 - DELTA, CENTER_X, CENTER_Y)
            group.transform(temp);
            // console.log(temp.split().rotate);
        }
    });
}

// keyの上下固定処理
function rotateKeys(keys, currentKey) {
    // keyの文字列の逆回転
    let degree = (360 / 12) * currentKey;
    for (const key of keys) {
        key.transform(Snap.matrix().rotate(-degree, CENTER_X, CENTER_Y));
        degree = degree + 360 / 12;
    }
}

// ボタン押下時のアニメーション
function animateButton(buttonText, width, height){
    let matrix = Snap.matrix().scale(1.6, 1.6, width, height);
    //buttonText.transform(matrix);
    buttonText.animate({ transform: matrix }, 100, null, function(){
        buttonText.transform(Snap.matrix().scale(1.0, 1.0, WIDTH * 3/4, HEIGHT * 7/10));
    });
    /*
    buttonText.animate(0, 1, function(value){
        this.attr({ 'font-size': value * 100,  opacity: value });      // Animate by font-size ?
    }, 750, mina.bounce, function() { this.remove() } );
    */
}

var currentKey = 120;
var prevDegree = 0;

sharpButton.click(function (e) {
    currentKey = currentKey + 1;
    animateButton(sharpText, WIDTH * 3/4, HEIGHT * 7/10);
    
    /*
    // Circleの回転(groupに適用)
    let matrix = Snap.matrix();
    matrix.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    let currentDegree = matrix.split().rotate
    if (Math.abs(currentDegree - prevDegree) < 180){
        console.log("OK(p):" + prevDegree);
        console.log("OK(c):" + currentDegree);
        group.animate({ transform: matrix }, 100);
    }else{
        let temp = Snap.matrix();
        temp.rotate((360 / 12) * currentKey - 3, CENTER_X, CENTER_Y);
        console.log("NG:(p)" + temp.split().rotate);
        console.log("NG:(c)" + currentDegree);
        group.animate({ transform: temp }, 100, null, function(){
            group.transform(matrix);
        });
    }
    prevDegree = currentDegree;
    */
    rotateCircle(false);
    //console.log(matrix.split().rotate);
    /*
    if (currentKey % 12 == 9) {
        // 270度に到達する時に animate のバグがあるためアニメなしのなしの回転とする
        group.transform(matrix);
    } else {
        group.animate({ transform: matrix }, 100);
    }
    */
    

    // keyの上下固定処理
    rotateKeys(keys, currentKey);
    rotateKeys(majors, currentKey);
    rotateKeys(minors, currentKey);
    rotateKeys(diminishes, currentKey);
});



/* 20211123
sharpButton.click(function (e) {
    currentKey = currentKey + 1;
    //let currentDegree
    // animate
    animateButton(sharpText, WIDTH * 3/4, HEIGHT * 7/10);
    // テストコード
    g_matrix = g_matrix.add(Snap.matrix().rotate((360 / 12), CENTER_X, CENTER_Y));
    console.log(g_matrix.split().rotate);

    // Circleの回転(groupに適用)
    let matrix = Snap.matrix();
    matrix.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    //console.log(matrix.split().rotate);
    if (currentKey % 12 == 9) {
        // 270度に到達する時に animate のバグがあるためアニメなしのなしの回転とする
        group.transform(matrix);
    } else {
        group.animate({ transform: matrix }, 100);
    }
    

    // keyの上下固定処理
    rotateKeys(keys, currentKey);
    rotateKeys(majors, currentKey);
    rotateKeys(minors, currentKey);
    rotateKeys(diminishes, currentKey);
});
*/

flatButton.click(function (e) {
    currentKey = currentKey - 1;

    // animate
    animateButton(flatText, WIDTH * 1/4, HEIGHT * 7/10);

    rotateCircle(true);
    /*
    // Circleの回転(groupに適用)
    let matrix = Snap.matrix();
    matrix.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    console.log(matrix.split().rotate);
    if (currentKey % 12 == 8) {
        // 270度から戻る時に animate のバグがあるためアニメなしのなしの回転とする
        group.transform(matrix);
    } else {
        group.animate({ transform: matrix }, 100);
    }
    */

    // keyの上下固定処理
    rotateKeys(keys, currentKey);
    rotateKeys(majors, currentKey);
    rotateKeys(minors, currentKey);
    rotateKeys(diminishes, currentKey);
    /*
    var matrix = Snap.matrix();
    matrix.rotate((360 / 12) * currentKey, CENTER_X, CENTER_Y);
    if (currentKey % 12 == 8) {
        // 270度から戻る時に animate のバグがあるためアニメなしのなしの回転とする
        group.transform(matrix);
    } else {
        group.animate({ transform: matrix }, 100);
    }
    */
});

//
// ダイアトニックの表記
//

const onRectColor = "#007bff"
const offRectColor = "#FFF"
const onTextColor = "#FFF"
const offTextColor = "#007bff"

var majorDiatonicRect = s.rect(WIDTH * 3/4 - 45, HEIGHT * 8.5/10 - 20, 90, 40, 0, 0);
majorDiatonicRect.attr({
    fill: offRectColor,
    stroke: onRectColor,
});

var majorDiatonicText = s.text(WIDTH * 3/4, HEIGHT * 8.5/10, "MAJOR");
majorDiatonicText.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: offTextColor,
    fontSize: 15
});

var majorDiatonicButton = s.group(majorDiatonicRect, majorDiatonicText);

var noneDiatonicRect = s.rect(WIDTH * 2/4 - 45, HEIGHT * 8.5/10 - 20, 90, 40, 0, 0);
noneDiatonicRect.attr({
    fill: onRectColor,
    stroke: onRectColor,

});

var noneDiatonicText = s.text(WIDTH * 2/4, HEIGHT * 8.5/10, "(none)");
noneDiatonicText.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: onTextColor,
    fontSize: 15
});

var noneDiatonicButton = s.group(noneDiatonicRect, noneDiatonicText);

var minorDiatonicRect = s.rect(WIDTH * 1/4 - 45, HEIGHT * 8.5/10 - 20, 90, 40, 0, 0);
minorDiatonicRect.attr({
    fill: offRectColor,
    stroke: onRectColor,

});

var minorDiatonicText = s.text(WIDTH * 1/4, HEIGHT * 8.5/10, "minor");
minorDiatonicText.attr({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: offTextColor,
    fontSize: 15
});

var minorDiatonicButton = s.group(minorDiatonicRect, minorDiatonicText);

const TONIC = "#b8daff";
const SUB_DOMINANT = "#c3e6cb";
//const DOMINANT = "#ffeeba"
const DOMINANT = "#f5c6cb"

const DIATONIC_NOTICE_X = CENTER_X - 60;
const DIATONIC_NOTICE_Y = 580;
var diatonicNotice = s.group();
//
diatonicNotice.circle(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, 10)
    .attr({fill: TONIC })
    .transform((Snap.matrix().translate(0, 0)));
diatonicNotice.text(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, ": " + "Tonic")
    .attr({
        //textAnchor: "middle",
        dominantBaseline: "central"
    })
    .transform((Snap.matrix().translate(20, 0)));
//
diatonicNotice.circle(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, 10)
    .attr({fill: SUB_DOMINANT })
    .transform((Snap.matrix().translate(0, 25)));
diatonicNotice.text(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, ": " + "SubDominat")
    .attr({
        //textAnchor: "middle",
        dominantBaseline: "central"
    })
    .transform((Snap.matrix().translate(20, 25)));

//
//
diatonicNotice.circle(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, 10)
    .attr({fill: DOMINANT })
    .transform((Snap.matrix().translate(0, 50)));
diatonicNotice.text(DIATONIC_NOTICE_X, DIATONIC_NOTICE_Y, ": " + "Dominat")
    .attr({
        //textAnchor: "middle",
        dominantBaseline: "central"
    })
    .transform((Snap.matrix().translate(20, 50)));

 diatonicNotice.attr({opacity: 0});   

// ダイアトニックボタンのON/off制御
function activate(rect, text, active) {
    if(active == true){
        rect.attr({
            fill: onRectColor,
        });
        text.attr({
            fill: onTextColor,
        });
    }else if(active == false){
        rect.attr({
            fill: offRectColor,
        });
        text.attr({
            fill: offTextColor,
        });
    }

}
majorDiatonicButton.click(function (e) {
    // diatonics[0]
    diatonics[1].attr({opacity: 1.0, fill: TONIC});
    diatonics[2].attr({opacity: 1.0, fill: SUB_DOMINANT});
    diatonics[3].attr({opacity: 1.0, fill: TONIC});
    diatonics[4].attr({opacity: 1.0, fill: SUB_DOMINANT});
    diatonics[5].attr({opacity: 1.0, fill: DOMINANT});
    diatonics[6].attr({opacity: 1.0, fill: TONIC});
    diatonics[7].attr({opacity: 1.0, fill: DOMINANT});

    activate(majorDiatonicRect, majorDiatonicText, true);
    activate(noneDiatonicRect, noneDiatonicText, false);
    activate(minorDiatonicRect, minorDiatonicText, false);

    diatonicNotice.attr({opacity: 1.0});

});

noneDiatonicButton.click(function (e) {
    // diatonics[0]
    diatonics[1].attr({opacity: 0});
    diatonics[2].attr({opacity: 0});
    diatonics[3].attr({opacity: 0});
    diatonics[4].attr({opacity: 0});
    diatonics[5].attr({opacity: 0});
    diatonics[6].attr({opacity: 0});
    diatonics[7].attr({opacity: 0});

    activate(majorDiatonicRect, majorDiatonicText, false);
    activate(noneDiatonicRect, noneDiatonicText, true);
    activate(minorDiatonicRect, minorDiatonicText, false);

    diatonicNotice.attr({opacity: 0});
});

minorDiatonicButton.click(function (e) {
    // diatonics[0]
    diatonics[1].attr({opacity: 1.0, fill: TONIC});
    diatonics[2].attr({opacity: 1.0, fill: SUB_DOMINANT});
    diatonics[3].attr({opacity: 1.0, fill: DOMINANT});
    diatonics[4].attr({opacity: 1.0, fill: SUB_DOMINANT});
    diatonics[5].attr({opacity: 1.0, fill: DOMINANT});
    diatonics[6].attr({opacity: 1.0, fill: TONIC});
    diatonics[7].attr({opacity: 1.0, fill: SUB_DOMINANT});

    activate(majorDiatonicRect, majorDiatonicText, false);
    activate(noneDiatonicRect, noneDiatonicText, false);
    activate(minorDiatonicRect, minorDiatonicText, true);

    diatonicNotice.attr({opacity: 1.0});
});

// Dragイベント
/*
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
*/


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