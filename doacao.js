var canvas = document.querySelector('canvas');
var _txt = document.createElement('h2');
var box = document.querySelector('.jd__letter');
var hour = document.getElementById("hour");
var min = document.getElementById("min");
var sec = document.getElementById("sec");
var ctx = canvas.getContext('2d');

var text = [
    'Bem Vindos ao mais antigo xat de doacao de Days, mais de 8 anos ativo.',
    'Entre, divirta-se e faça amizades é de graça. By Damm'
];
var objs = [];
var maxObj = 70;
var size = 20;
var count = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

box.appendChild(_txt);

function initText(elem){
    var objs = elem.innerHTML.split('');
    elem.innerHTML = '';
    objs.forEach(function(obj, i){
        setTimeout(function(){
            elem.innerHTML += obj;
        }, 175 * i);
    });
}

function reading(){
    text.forEach(function(txt, j){
        setTimeout(function(){
            _txt.innerHTML = txt;
            initText(_txt);
            count++;
            
            if(count === text.length){
                setTimeout(function(){
                    count = 0;
                    this.reading();
                }, 15000);
            }
        }, 15000 * j);
    });
}

var img = new Image();
img.src = 'https://i.postimg.cc/WNBLtwKd/mint-big-2.png';
img.onLoad = function(){
    console.log('carregando imagem');
}
var objs = [];

function init(){
    objs = [];
    for(var i = 0; i < 20; i++){
        var px = Math.random() * (innerWidth - 192);
        var vx = (Math.random() * 1);
        var vy = (Math.random() * 1);
        
        objs.push(new Sprites(img, px, vx, vy));
    }
}

function loop(){
    requestAnimationFrame(loop, canvas);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(var i in objs){
        var obj = objs[i];
        obj.draw(ctx);
        obj.update();
    }
}

function Sprites(img, px, vx, vy){
    this.cordX = 0;
    this.cordY = 0;
    this.width = 99.6;
    this.height = 100;
    this.posX = px;
    this.posY = innerHeight + this.height;
    this.img = img;
    this.count = 0;
    this.vx = vx;
    this.vy = vy;
    
    this.draw = function(ctx){
        ctx.drawImage(this.img, this.cordX, this.cordY, this.width, this.height, this.posX, this.posY, this.width, this.height);
        
        this.mov();
    }
    
    this.update = function (){
        if(this.posX + this.width > innerWidth || this.posX < 0){
            this.vx = - this.vx;
        }
        if(this.posY + this.height > innerHeight){
            this.vy = + this.vy;
        }else if(this.posY + this.height < 0){
            this.posY = innerHeight + this.height;
            this.posY += this.vy;
        }
        this.posX += this.vx;
        this.posY -= this.vy;
    }
    
    this.mov = function(){
        this.count++;
        if(this.count >= (72*5)){
            this.count = 0;
        }
        this.cordX = Math.floor(this.count / 5) * this.width;
    }
}

function initClock(){
    var d = new Date(),
        h = new Date().getHours(),
        mi = new Date().getMinutes(),
        sc = new Date().getSeconds();
        
    if(h < 10){h = '0' + h}else{h = h};
    if(mi < 10){mi = '0' + mi}else{mi = mi};
    if(sc < 10){sc = '0' + sc}else{sc = sc};
    
    hour.innerHTML = h;
    min.innerHTML = mi;
    sec.innerHTML = sc;
}

 window.setInterval(initClock, 1000);

loop();
init();
reading();