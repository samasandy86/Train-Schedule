'use strict'


// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCCrnvrz0BNHzsbnWl9vMvNJEtfNxtqk4",
    authDomain: "train-schedule-67ced.firebaseapp.com",
    databaseURL: "https://train-schedule-67ced.firebaseio.com",
    projectId: "train-schedule-67ced",
    storageBucket: "",
    messagingSenderId: "25744501377"
};
firebase.initializeApp(config);

//On click function
const database = firebase.database()

// let trainName = '';
// let trainDestination = '';
// let frequencyTime = '';
// let trainTime = '';
// const trainETA = '';
let tFrequency = 3;
let firstTime = "03:30";





// $(document).ready(function (event) {

    $("#submitButton").on('click', function (event) {
        event.preventDefault();

        //Input box for variables 
        let trainName = $("#trainName").val().trim()
        let trainDestination = $("#trainDestination").val().trim()
        let trainTime = $("#trainTime").val().trim()
        let frequencyTime = $("#frequencyTime").val().trim()

        let data = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: frequencyTime,
            //dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(data)

        //Logs database information in the console
        console.log(data.name);
        console.log(data.destination);
        console.log(data.time);
        console.log(data.frequency);


        //Clears all of the text-boxes
        $('#trainName').val("");
        $('#trainDestination').val("");
        $('#trainTime').val("");
        $('#frequencyTime').val("");
    });

        // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        database.ref().on("child_added", function(snapshot, prevChildKey) {


        // console.log(childSnapshot.val());

        let trainName = snapshot.val().name;
        let trainDestination = snapshot.val().destination;
        let trainTime = snapshot.val().time;
        let frequencyTime = snapshot.val().frequency;

        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(frequencyTime);


        // var tFrequency = 3;
        // First Time (pushed back 1 year to make sure it comes before current time)

        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequencyTime;
        console.log(tRemainder);

        var tMinutesTillTrain = frequencyTime - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("h:mm");
        console.log("ARRIVAL TIME: " + nextTrain);


        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
            frequencyTime + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

        // let info = snapshot.val()
        // // console.log(snapshot.val());
    });

// });







