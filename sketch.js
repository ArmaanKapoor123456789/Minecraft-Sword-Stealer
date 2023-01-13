const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,sword,ground;
var sword_con;
var sword_con_2;
var sword_con_3;
var rope3;

var bg_img;
var rsword;
var steve;

var button,button2,button3;
var minecraft_steve;
var blink,take,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var taking_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  sword = loadImage('Rainbow Sword.png');
  steve = loadImage('Steve.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
taking_sound = loadSound('taking_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("Steve.png");
  take = loadAnimation("Steve.png");
  sad = loadAnimation("Steve.png");
  
  blink.playing = true;
  take.playing = true;
  sad.playing = true;
  sad.looping= false;
  take.looping = false; 
}

function setup() 
{
  
  createCanvas(500,700);
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,690,600,20);
  blink.frameDelay = 20;
  take.frameDelay = 20;

  minecraft_steve = createSprite(170,620,100,100);
  minecraft_steve.scale = 0.5;

  minecraft_steve.addAnimation('blinking',blink);
  minecraft_steve.addAnimation('taking',take);
  minecraft_steve.addAnimation('crying',sad);
  minecraft_steve.changeAnimation('blinking');
  
  rsword = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,rsword);

  sword_con = new Link(rope,rsword);
  sword_con_2 = new Link(rope2,rsword);
  sword_con_3 = new Link(rope3,rsword);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0);

  push();
  imageMode(CENTER);
  if(rsword!=null){
    image(sword,rsword.position.x,rsword.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(rsword,minecraft_steve)==true)
  {
    minecraft_steve.changeAnimation('taking');
    taking_sound.play();
  }

  if(rsword!=null && rsword.position.y>=650)
  {
    minecraft_steve.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
  rsword=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  sword_con.detach();
  sword_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  sword_con_2.detach();
  sword_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
sword_con_3.detach();
  sword_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,rsword);
               rsword = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


