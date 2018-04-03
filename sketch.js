var saveButton;
var draw10;
var draw100;
var reset;
var intervalID = [];
var spacing;
var bh;
var bw;
var counter = 0;
var luck;
var shapes= ["Rectangle","Circle","Triangle","Random"];
function insertNew(x,y) {
    rectMode(CENTER);
    R = random(255);
    G = random(255);
    B = random(255);
    stroke(255, 200);
    //noStroke();
    fill(R, G, B, random(50, 100));

    if (luck <= 0.25)
        rect(x, y, random(100, 300), random(50, 300));
    else if (luck > 0.25 && luck <= 0.5) {
        r = random(100, 300);
        ellipse(x, y, r, r);
    }
    else if (luck > 0.5 && luck <= 0.75) {
        triangle(x, y, random(width), random(height), random(width), random(height));
    }
    else {
        luck2 = random(1);

        if (luck2 <= 1 / 3)
            rect(x, y, random(100, 300), random(50, 300));
        else if (luck2 > 1 / 3 && luck2 <= 2 / 3) {
            r = random(100, 300);
            ellipse(x, y, r, r);
        }
        else {
            triangle(x, y, random(width), random(height), random(width), random(height));

        }
    }
}

function buttonCreate(editButton, label, position) {
    editButton = createButton(label);
    editButton.size(bw, bh);
    editButton.position(spacing * position - bw / 2, height - bh);
    editButton.style('background-color', '#333333');
    editButton.style('border', '2px solid #FFFFFF');
    editButton.style('color', '#FFFFFF');
    editButton.style('fontSize', 'medium');
    editButton.style('border-radius', '4px');
    editButton.style('-webkit-transition-duration', '0.4s');
    editButton.style('transition-duration', '0.4s');
    return editButton;
}

function setup() {
    ///pixelDensity(2);
    createCanvas(windowWidth, windowHeight);
    background(0);

    luck = random(1);

    //alert("Tap/Click to generate shapes!\nShape - "+shapes[floor(luck * 4)] );
    spacing = width / 5;
    bh = 40;
    bw = (spacing * 0.75);

    // stroke(255);
    // strokeWeight(2);
    // rectMode(CENTER);
    // fill(51, 50);
    // rect(width / 2, bh, bw * 2, bh, 4, 4);
    // a = textAlign(CENTER, CENTER);
    // noStroke();
    // fill(255);
    // textSize(24);
    // b = text("Shape - " + shapes[floor(luck * 4)], width / 2, bh, bw * 2, bh);

    shape = shapes[floor(luck * 4)];
    if(shape === "Random")
    {
        shape += " Shapes";
    }
    else
        shape += "s";
    saveButton = buttonCreate(saveButton, 'Download as Image', 3);
    draw10 = buttonCreate(draw10, 'Draw 10 '+shape, 1);
    draw100 = buttonCreate(draw100, 'Draw 100 '+shape, 2);
    reset = buttonCreate(reset, 'RESET', 4);

    saveButton.mousePressed(function () {

        save('myCanvas.jpg');
    });
    draw10.mousePressed(function () {
        randomX(10)
    });
    draw100.mousePressed(function () {
        randomX(100)
    });
    reset.mousePressed(function () {
        for (var i = intervalID.length - 1; i >= 0; i--) {
            clearInterval(intervalID[i]);
            intervalID.splice(i, 1);
        }
        background(0);
        counter = 0;
    });
}

function buttonPressed(checkButton) {
    if (mouseX > checkButton.position().x && mouseX < checkButton.position().x + checkButton.width) {
        if (mouseY > checkButton.position().y && mouseY < checkButton.position().y + checkButton.height)
            return true;
        else
            return false;
    }
    else
        return false;
}

function touchEnded() {
    if (buttonPressed(saveButton) === false && buttonPressed(draw10) === false) {
        if (buttonPressed(draw100) === false && buttonPressed(reset) === false)
            insertNew(mouseX, mouseY);
    }
}


function randomX(x) {
    setIntervalX(function () {
        insertNew(random(width), random(height));
    }, 100, x);
}

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    clearInterval(intervalID);
    intervalID = (setInterval(function () {

        callback();

        if (++x === repetitions) {
            clearInterval(intervalID);
        }
    }, delay));
}

function draw() {
    //noLoop();
    buttons = [draw10, draw100, saveButton, reset];
    for (var i = 0; i < 4; i++) {
        if (buttonPressed(buttons[i]) === true) {
            buttons[i].style('background-color', '#FFFFFF');
            buttons[i].style('color', '#000000');
        }
        else {
            buttons[i].style('background-color', '#33333332');
            buttons[i].style('color', '#FFFFFF');
        }
    }

}