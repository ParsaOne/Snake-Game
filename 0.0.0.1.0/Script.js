const GameBoard = document.querySelector('.GBody');
const GCanvas = GameBoard.querySelector('#GCanvas');
const CTX = GCanvas.getContext('2d');

// Start Place
let Snake=[
    { X:150 , Y:150 },
    { X:140 , Y:150 },
    { X:130 , Y:150 },
    { X:120 , Y:150 },
    { X:110 , Y:150 }
];

// Food Location
let Food = { X : 160 , Y : 150 };

// Snake Direction Of The Route
let SDR = { X : 10 , Y : 0 };
let Score = 0;
let Speed = 300;

///////////////////////////////////////////////////////////////////
// StartGame
Start();

function Start() {
    if (GameOver())return;

    setTimeout(() => {
        ChangeableDirection = true;
        CreateClearCanvas();
        DrawFood();
        AdvanceSnake();
        DrawSnak();
        // More
        Start();
    }, Speed);
};

///////////////////////////////////////////////////////////////////
function CreateClearCanvas() {
    CTX.fillStyle = 'white';
    CTX.strokeStyle = 'black';
    CTX.fillRect( 0 , 0 , GCanvas.width , GCanvas.height );
    CTX.strokeRect( 0 , 0 , GCanvas.width , GCanvas.height );
};
function DrawFood() {
    CTX.fillStyle = 'red';
    CTX.strokeStyle = 'darkred';
    CTX.fillRect(Food.X , Food.Y , 10 , 10);
    CTX.strokeRect(Food.X , Food.Y , 10 , 10);
};
function CreateFood() {
    Food.X = randomNumber(0 , GCanvas.width - 10);
    Food.Y = randomNumber(0 , GCanvas.height - 10);
    Snake.forEach(SParts => {
        // Checking Food Place
        if(SParts.X === Food.X && SParts.Y === Food.Y) {CreateFood();};
    });
};
function randomNumber(max , min) {
     return (Math.round((Math.random() * (max - min) + min) / 10) * 10)
};
function AdvanceSnake() {
    const SHead = { X : Snake[0].X + SDR.X , Y : Snake[0].Y + SDR.Y} 

    Snake.unshift(SHead);
    if(SHead.X === Food.X && SHead.Y === Food.Y) {
        Score += 10;
        document.querySelector('.GScore').innerHTML = Score;
        if (Speed >= 50) {
            Speed -=10 ;
        };
        CreateFood();
    } else {
        Snake.pop();
    };
};
function DrawSnak() {return Snake.forEach(DSParts)};
function DSParts(SPart) {
    CTX.fillStyle = 'lightgreen';
    CTX.strokeStyle = 'black'
    CTX.fillRect(SPart.X , SPart.Y , 10 , 10);
    CTX.strokeRect(SPart.X , SPart.Y , 10 , 10);
};

///////////////////////////////////////////////////////////////////
// Controls
let ChangeableDirection = true;
document.addEventListener("keydown", function(e) {
    if (ChangeableDirection===false){
        return;
    }
    ChangeableDirection = false;
    if (  (e.code==("ArrowLeft")||e.code==("KeyA"))  &&  (SDR.X!==10)  ){
        SDR = { X : -10 , Y : 0 };
    };
    if (  (e.code==("ArrowRight")||e.code==("KeyD"))  &&  (SDR.X!==-10)  ){
        SDR = { X : 10 , Y : 0 };
    };
    if (  (e.code==("ArrowUp")||e.code==("KeyW"))  &&  (SDR.Y!==10)  ){
        SDR = { X : 0 , Y : -10 };
    };
    if (  (e.code==("ArrowDown")||e.code==("KeyS"))  &&  (SDR.Y!==-10)  ){
        SDR = { X : 0 , Y : 10 };
    };
});

///////////////////////////////////////////////////////////////////
// GameOver :(
function GameOver() {
    for (let i = 1; i < Snake.length; i++) {
        if ((Snake[0].X === Snake[i].X) && (Snake[0].Y === Snake[i].Y))return true;
    };
    const HitLWall = Snake[0].X < 0;
    const HitRWall = Snake[0].X > GCanvas.width - 10;
    const HitTWall = Snake[0].Y < 0;
    const HitBWall = Snake[0].Y > GCanvas.height - 10;
    return HitLWall || HitRWall || HitTWall || HitBWall ;
};