// Initialize Firebase
var config = {
    apiKey: "AIzaSyDkCZYUVnKjE9CJFxPdTZwxAsZokSMLtqM",
    authDomain: "trainsched-12762.firebaseapp.com",
    databaseURL: "https://trainsched-12762.firebaseio.com",
    storageBucket: "trainsched-12762.appspot.com",
    messagingSenderId: "578961635809"
};
firebase.initializeApp(config);

/////////// VARIABLES

// get reference to database service 
var database = firebase.database();

//////////// FUNCTIONS & EVENTs

$("#addTrain").on("click", function(event) {
  	// prevent form from refreshing page
  	event.preventDefault();

  	var name = $("#tname").val().trim();
  	var dest = $("#destination").val().trim();
  	var firstTrain = $("#firstTrain").val().trim();
  	var freq = $("#frequency").val().trim();

  	database.ref().push({
  		name: name,
  		dest: dest,
  		first_t: firstTrain,
  		freq: freq
	});
});

// function nextArrival(train) {
// 	var currentTime = moment().format("HH:mm");
// 	var temp = 
// }

// function minutesAway() {

// }

database.ref().on("child_added", function(childSnapshot) {

	// console log everything coming from snapshot
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().dest);
	console.log(childSnapshot.val().first_t);
	console.log(childSnapshot.val().freq);

	// variable to hold all childsnapshots (making it easier to type)
	var train = childSnapshot.val();


	var firstTimeConverted = moment(train.first_t, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// current time 
	var currentTime = moment().format("HH:mm");
	console.log(currentTime);

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log(diffTime);

	var tRemainder = diffTime % train.freq;
	console.log(tRemainder);

	// minutes until train
	var minToTrain = train.freq - tRemainder;
	console.log(minToTrain);

	// next train
	var nextTrain = moment().add(minToTrain, "minutes").format("hh:mm");
	console.log(nextTrain);

	$("#schedule").append("<tr><td>" + train.name + "</td><td>" + train.dest + "</td><td>" + train.freq + "</td><td>" + nextTrain + "</td><td>" + minToTrain + "</td></tr>");
});