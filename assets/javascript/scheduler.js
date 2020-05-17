var firebaseConfig = {
    apiKey: "AIzaSyDV2m1rQXDivzw2lzH4DTenn8L_tF81FpQ",
    authDomain: "first-project-80182.firebaseapp.com",
    databaseURL: "https://first-project-80182.firebaseio.com",
    projectId: "first-project-80182",
    storageBucket: "first-project-80182.appspot.com",
    messagingSenderId: "1037573735494",
    appId: "1:1037573735494:web:cf79eeff2d496b0d9bb647"
};
 
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0; 


$("#submit-button").on("click", function(event) {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        train: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    })
})