var dog, happyDog, dIMG, hpIMG;
var database;
var foodS;

var fedTime, lastFed;
var feedPet, addFood;

var foodObj;

function preload(){

  dIMG = loadImage("images/dogImg.png");
  hpIMG = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);

    foodObj = new Food();

    database = firebase.database();
    
    dog = createSprite(400,250,30,30);
    dog.addImage(dIMG);
    dog.scale = 0.1;

    //var foodStock = database.ref('Food');
   // foodStock.on("value", readStock, showError);

    feedPet = createButton("Feed The Dog");
    feedPet.position(500,75);
    feedPet.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(600,75);
    addFood.mousePressed(addFoods);

}


function draw() {  
  background(rgb(46, 139, 87));

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){

    lastFed = data.val();

  })

    fill("white");
    stroke("black");
    textSize(10);

  if (lastFed >= 12){

        text("Last Fed: " + lastFed % 12 + "PM", 200, 10);
      
    } else if (lastFed == 0) {

        text("Last Fed: 12 AM ", 200, 10);

    } else {

        text("Last Fed: " + lastFed + "AM", 200, 10);

    }

  drawSprites();

}

//function writeStock(x){

 // if(x <= 0){

  //  x = 0;

 // } else {

 //   x = x-1;

 // }

 // database.ref('/').update({

  //  Food: x

 // })

//}

//function showError(){

 // console.log("Not Working");

//}

function addFoods(){

  foodS++;
  database.ref('/').update({

    Food: foodS

  })

}

function feedDog(){

  dog.addImage(hpIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({

    Food: foodObj.getFoodStock(),
    FeedTime: hour()

  })

}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}