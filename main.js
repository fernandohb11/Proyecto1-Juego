var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval = null;
var frames = 0;
var puntos =0;
var trucks = []
var food= [ 'img/food/milkshake.png',
            'img/food/greape-juice.png',
            'img/food/red-smoothie.png',
            'img/food/chocolate-milk.png',
            'img/food/hot-chocolate.png',
            'img/food/cake.png',
            'img/food/blueberry-pie.png',
            'img/food/chocolate-cake.png',
            'img/food/chocolate-doughnut.png',
            'img/food/chocolate-icecream.png',
            'img/food/strawberry-cupcake.png',
            'img/food/strawberry-doughnut.png',
            'img/food/strawberry-icecream.png',
            'img/food/vanilla-icecream.png',
            'img/food/apple.png',
            'img/food/banana.png',
            'img/food/blueberries.png',
            'img/food/raspberry.png',
            'img/food/strawberries.png',
            'img/food/watermelon.png',
            'img/food/beef.png',
            'img/food/hamburger.png',
            'img/food/pizza.png',
            'img/food/spaghetti.png',
            'img/food/turker.png',
            'img/food/bread.png',
            'img/food/chicken.png',
            'img/food/eggs.png',
            'img/food/french-fries.png',
            'img/food/sandwich.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            'img/food/chancla.png',
            

]
var images = {
  bg: './img/bg4.png',
  sprite: './img/Character5.png'
}

function Board() {
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height = canvas.height
  this.img = new Image()
  this.img.src = images.bg
  this.img.onload = () => {
    this.draw()
  }
  this.draw = () => {
    /* movimiento del fondo */ this.x -=5
    if(this.x < -this.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height)
    ctx.drawImage(this.img, this.x+canvas.width, this.y, canvas.width, canvas.height)}
  
  this.drawScore = ()=>{
    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(puntos,50,50)
  }
}

function Hero() {
  this.position = canvas.height / 2
  this.x = 0
  this.y = 0
  this.wc=100
  this.hc=100
  this.w = 320
  this.aux = 0
  this.h = 245
  this.img = new Image()
  this.img.src = images.sprite
  this.img.onload = () => {
    this.draw()
  }
  this.draw = () => {        //empiezax, empiezay, hastadondex, hastadondey, 
    if(this.position < 500 )
     this.position +=2.02
    if(this.position <1)
       this.position =1
    ctx.drawImage(this.img, this.x,this.y,this.w, this.h, 10, this.position, 100, 100);
    if (frames % 4 === 0) {
      this.aux++
      if (this.aux === 9) this.aux = 0
      
  }
  switch (this.aux) {
    case 0:
     return this.x = 0
    case 1:
      return this.x = 555
    case 2:
      return this.x = 1100
    case 3:
      return this.x = 1600
    case 4:
      return this.x = 2100
    case 5:
      return this.x = 2600
    case 6:
      return this.x = 3130
    case 7:
      return this.x = 3670
    case 8: 
      return this.x = 4200
  }
}
this.ifTouched = function(item){
  return (10 < item.x + 70)  && 
         (10 + this.wc  > item.x+60)     &&
        (this.position < item.y + 70 )&&
        (this.position + this.hc > item.y+30)
}
}




// comida

function Truck(x,y,foodSource) {
  Board.call(this)
  this.x = x;
  this.estado = "bueno"
  this.y = y;
  this.width = 120
  this.height = 120
  this.image = new Image()
  if(foodSource ==='img/food/chancla.png') this.estado ="malo"
  this.image.src = foodSource
  this.draw = function(){
    
   this.x-=7
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//generar comida
function generateTrucks() {
if(frames%30 === 0){
  var y=Math.floor(Math.random()*((canvas.height-100)-50) +50)
  
  var x =Math.floor(Math.random()*((canvas.width+100)-1250) +1250)
 if (trucks.length) 
 if (x-trucks[trucks.length-1].x<150)x+=trucks[trucks.length-1].x
  trucks.push(new Truck(x,y,food[Math.floor(Math.random()*food.length)]))
 
  if (trucks[0].x<-50 )trucks.shift()
  
  
}
}
function gameover(){
  clearInterval(interval)
  

}
//dibujar comida
function drawTrucs() {
  generateTrucks()
  trucks.forEach(function (truck) {
      truck.draw()
  })
}
var muerto = new Image()
muerto.srcset="img/d1.png"
function checkCollision(){
    trucks.forEach(function(truck,index){
      
      if(hero.ifTouched(truck)) {
        if(truck.estado !=="malo"){
        puntos++
        console.log(puntos)
        trucks.splice(index,1)
      }else{
        
        gameover()
        ctx.clearRect(10,hero.position,100,100)
        fondo.draw()
        
        ctx.drawImage(muerto,10,hero.position,100,100)
      }
      
      }
        
        
    })
    }
//objeto 1 = hero
//objerto 2 = trucks 

  // The objects are touching
  

// update
function update() {

ctx.clearRect(0,0,canvas.width,canvas.height);
frames++
fondo.draw()
hero.draw()
checkCollision()
drawTrucs()
fondo.drawScore()

}


function start() {
 interval = setInterval(update, 1000/60)
    
  
 
}

var fondo = new Board();
var hero = new Hero();
start();


addEventListener('keydown', (e) => {
  if (e.keyCode === 32)
  hero.position -= 50
})

