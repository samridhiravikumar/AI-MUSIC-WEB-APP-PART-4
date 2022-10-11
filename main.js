high_hopes_song = "";
harry_potter_theme_song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
high_hopes = "";


function preload() {
    high_hopes_song = loadSound("High-hopes.mp3");
    harry_potter_theme_song = loadSound("harry-potter.mp3");
}

function setup() {
    canvas = createCanvas(700, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}


function draw() {
    image(video, 0, 0, 800, 700);
    fill("#FF0000");
    stroke("#FF0000");
    high_hopes = high_hopes_song.isPlaying();
    console.log(high_hopes);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        harry_potter_theme_song.stop();
        if (high_hopes == false) {
            high_hopes_song.play();
        }
        else {
            document.getElementById("name").innerHTML = "Song Name : High hopes";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
