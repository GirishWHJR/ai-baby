status="";
objects = [];
song = "";

function preload()
{
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center()
    video= createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}



function draw()
{
    image(video, 0, 0, 380, 380);
 
if(status != ""){
    r= random(255);
    g= random(255);
    b= random(255);
    objectDetector.detect(video, gotResults);
    for(i =0; i < objects.length;  i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML ="Baby found!";
        song.stop();

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r,b,g);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

}
else{
    document.getElementById("status").innerHTML = "Status : Objects Not Detected";
        document.getElementById("number_of_objects").innerHTML ="Baby missing";
        song.play();
}
}

function modelLoaded()
    {
     console.log("Model Loaded!");
     status= true;
     
    }

    function gotResults(error, results){
        if(error){
            console.log(error);
        }
        else
        console.log(results);
        objects = results;
    }
