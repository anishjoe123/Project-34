var dog
var dog_img
var happyDog_img
var database
var foodR = 0
var foodStock = 0

function preload()
{
	dog_img = loadImage("images/dogImg.png")
  happyDog_img = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
	createCanvas(500, 500);
  dog = createSprite(250,300,150,150)
  dog.addImage(dog_img)
  dog.scale = 0.3
  foodStock = database.ref('food')
  foodStock.on("value", readStock)
}


function draw() {  
background(46, 139, 87)
fill("lightblue")
textSize(15)
text("Food Remaining: "+foodR,170,100)
textSize(15)
text("Note: Press Up Arrow Key To Feed The Dog", 130,10,300,20)
if(keyWentDown(UP_ARROW))
{
  writeStock(foodR)
  dog.addImage(happyDog_img)
}

  drawSprites();
  //add styles here

}


function writeStock(x)
{ 
  if(x<=0)
    {
       x=0; 
    }
    else
      {
         x=x-1; 
      }
  database.ref('/').update({ food:x }) 
}
function readStock(data)
{
  foodR=data.val(); 
}