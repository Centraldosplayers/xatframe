let canvas = document.querySelector('canvas');
let box = document.getElementById('box');
let h1 = document.createElement('h1');
let ctx = canvas.getContext('2d');
let txtArr = [
    'Já tem um xatFrame? O que está esperando pra adquirir um.',
    'Jason Códigos e Gráficos',
    'xatSpace 4 mil xats',
    'Vendas de Player Flash suspensa',
    'Player HTML5 disponível vários Modelos'
];
let objs = [];
let color = [
    '#34343F',
    '#FFF',
    '#F991B3',
    '#FFCF31',
    '#31B9FF',
    '#DB5252'
];
let count = 0;
let img = new Image();
img.src = 'https://i.postimg.cc/GmyFnFSj/flower-21.png';

box.appendChild(h1);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function initTxt(item){
    let text = item.innerHTML.split('');
    item.innerHTML = '';
    text.forEach(function(txt, i){
        setTimeout(function(){
            item.innerHTML += txt;
        }, 200 * i);
    });
}

function reading(){
    txtArr.forEach(function(_txt, j){
        setTimeout(function(){
            h1.innerHTML = _txt;
            initTxt(h1);
            count++;
            
            if(count === txtArr.length){
                setTimeout(function(){
                    count = 0;
                    this.reading();
                }, 15000);
            }
        }, 15000 * j);
    });
}

function Cubo(y, vy){
    this.size = Math.floor(30 + Math.random() * 50);
	this.w = this.size;
    this.h = this.size;
    this.x = Math.random() * canvas.width;
    this.y = y;
    this.vy = vy;
    this.rot = 0;
    this.vel = 1;
    this.line = Math.floor(0.25 + Math.random() * 20);
    this.color = color[(Math.floor(Math.random() * color.length))];
    this.framex = Math.floor(Math.random() * 3);
    this.framey = Math.floor(Math.random() * 3);
    this.spriteSize = 750/3;
    
    this.draw = function(){
    	ctx.save();
        //ctx.lineWidth = this.line;
        //ctx.strokeStyle = this.color;
        ctx.translate(this.x + this.spriteSize, this.y + this.spriteSize);
        ctx.rotate(this.rot);
        //ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.drawImage(img,this.framex * this.spriteSize, this.framey * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.w, 0 - this.h, this.w, this.h);
        ctx.stroke();
        ctx.restore();
    }
    
    
    this.update = function(){
    	this.rot += Math.PI / 180 * this.vel;
        
        if(this.y + (this.spriteSize * 2) < 0){
            this.y = innerHeight + this.h;
            this.y -= this.vy;
        }
        
        this.y -= this.vy;
        this.draw();
    }
}

function mult(){
    objs = [];
    for(var i = 0; i < 20; i++){
        var y = 100;
        var vy = (Math.random() + 1);
        objs.push(new Cubo(y, vy));
    }
}

function init(){
    requestAnimationFrame(init);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i in objs){
        var obj = objs[i];
        obj.update();
    }
    
}
reading();
mult();
init();