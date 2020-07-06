// creating a variable to store the colors
var colors = ["red","blue","green","yellow"];

// stores the generated colors forming the pattern of the game
var game_pattern = [];

// stores the order of colors clicked by the user
var user_clicked_pattern = [];

// creating a variable to start the game
var started = false;

// storing the game levels
var level = 0;

// detects a keypress and starts the game
$(document).on('keypress',function() {
  if(!started){
    $("#level-title").text("Level " + level);
    next_sequence();
    started = true;
  }
});

// detects a touch from a touch screen device
$(document).on("touchstart",function() {
  if(!started){
    $("#level-title").text("Level " + level);
    next_sequence();
    started = true;
  }
});

// function to store the colors clicked by the users
$(".btn").click(function(){

  // stores the id of the button
  var user_chosen_color = $(this).attr("id");
  user_clicked_pattern.push(user_chosen_color);

  // playing the respecting audio
  play_sound(user_chosen_color);

  animate_press(user_chosen_color);

  check_answer(user_clicked_pattern.length - 1);

});

function check_answer(current_level) {

  if (game_pattern[current_level] === user_clicked_pattern[current_level]) {

    console.log("success");

    if (user_clicked_pattern.length === game_pattern.length)  {
      setTimeout(function() {
        next_sequence();
      }, 1000);
    }
  }

  else {
    console.log("wrong");
    game_over();

  }

}

// function to generate random color and audio related to it
function next_sequence()
{
  user_clicked_pattern = [];

  // icreasing the levels everytime this func is called
  level++;

  // everytime its called we change the h1
  $("#level-title").text("Level " + level);

  // creating a variable to store the randomly genrated number bw 0 and 3
  var random_number = Math.floor(Math.random() * 3);

  // using the random_number to select a random colour from the colors array.
  var random_chosen_color = colors[random_number];
  // this lines keeps the adding the colors
  game_pattern.push(random_chosen_color);

  // indicating the color generated
  $('#' + random_chosen_color).fadeIn(100).fadeOut(100).fadeIn(100);

  play_sound(random_chosen_color);

}

// events that take place when the user enters wrong answers ie game over
function game_over() {

  // changes the heading text
  $("#level-title").text("Game Over, Press any key to restart");

  // adds a class that flashes the screen from css
  $("body").addClass("game-over");

  // removes the function after 200ms
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  // plays the wrong sound
  play_sound("wrong");

  start_over();
}

// starts the game by resetting all values
function start_over() {
  level = 0;
  game_pattern = [];
  started = false;
  user_clicked_pattern = [];
}

function play_sound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// adds an animation to the clicked button
function animate_press(current_color) {
  // adds pressed class from css
  $("#" +   current_color).addClass("pressed");

  // remove the class after a dalay
  setTimeout(function() {
    $("#" + current_color).removeClass("pressed");
   }, 100);
}
