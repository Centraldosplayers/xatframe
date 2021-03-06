var canvas = document.querySelector('canvas');
var text = document.querySelector('h1');
var ctx = canvas.getContext("2d"),
    opacit = Math.floor(1 + Math.random() * 3),
    color = [
        'rgba(255,255,255,0.'+opacit+')',
        'rgba(0,0,0,0.'+opacit+')',
    ],
    maxRadius = 20,
    multObj = [],
    maxBall = 200;




canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function itemObj(x, y, radius, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color[Math.floor(Math.random() * color.length)];
    
    this.drawCircle = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    this.update = function (){
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = - this.dy;
        }
        if(this.x > innerWidth + this.radius){
            this.dx = - this.dx;
        }else if(this.x + this.radius < 0){
            this.x = innerWidth + this.radius;
            this.dx = - this.dx;
        }
        
        this.y += this.dy;
        this.x -= this.dx;
        
        this.drawCircle();
    }
}

function init(){
    multObj = [];
    for(var i = 0; i < maxBall; i++){
        var radius = Math.random() * maxRadius,
            x = innerWidth + radius,
            y = Math.random() * (innerHeight - radius * 2) + radius,
            dx = (Math.random() - 0.5),
            dy = (Math.random() - 0.5);
        
        multObj.push(new itemObj(x, y, radius, dx, dy));
    }
}
//var circle = new itemObj(innerWidth + 30, 100, 30, 1, 1);

function animate(){
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < multObj.length; i++){
        multObj[i].update();
    }
    //circle.update();

}

init();
animate();