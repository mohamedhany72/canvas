var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse ={
    x: undefined,
    y: undefined,
};

var maxRadius = Math.random() * 8 + 30;

window.addEventListener('mousemove', function(event){
       mouse.x = event.x;
       mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
var colorArray = ['#0477BF', '#7AB3BF', '#F29422', '#D90404', '#590202'];

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    // this.color = '#'+Math.random().toString(16).substr(2,6);  // this code to randomize the colors 
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = this.color;
        c.stroke();
    };
    this.update = function(){
        if (this.x > innerWidth - this.radius || this.x < this.radius){
            this.dx = -this.dx;
        }; 
        this.x += this.dx;
        if (this.y > innerHeight - this.radius || this.y < this.radius){
            this.dy = -this.dy;
        };
        this.y += this.dy;
        this.draw();


        // add interaction with the mouse
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.radius < maxRadius && window.innerHeight - mouse.y > maxRadius && mouse.y > maxRadius &&
                     window.innerWidth - mouse.x > maxRadius && mouse.x > maxRadius){
                         // the above piece of code to not stuck with the borders when the mouse leave the canvas
                this.radius += 1; 
            };
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        };
    };

};

/*
// uncomment this code and comment the one below to not create new circles when resizing the canvas

var circleArray = [];
for (let i = 0; i < 800 ; i++){
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius *2 ) + radius;
    var y = Math.random() * (innerHeight - radius *2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}; 
*/



// uncomment this code and comment the one above to create new circles when resizing the canvas

var circleArray = [];
function init(){
    circleArray = [];
    for (let i = 0; i < 800 ; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius *2 ) + radius;
        var y = Math.random() * (innerHeight - radius *2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));

    };
};









function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    };
};
animate();
init();