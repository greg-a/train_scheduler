// add ability to edit and delete existing train schedules

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

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function(childSnapshot) {
    
    var trainName = $("<td>").text(childSnapshot.val().train);
    var destination = $("<td>").text(childSnapshot.val().destination);
    var frequency = $("<td>").text(childSnapshot.val().frequency);
    var nextArrival = $("<td>");
    var minutesAway = $("<td>");

    var newRow = $("<tr>");
    
    var tFrequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().first;
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainConverted),"minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    nextArrival.text(moment(nextTrain).format("hh:mm"));
    minutesAway.text(tMinutesTillTrain);

    newRow.append(trainName, destination, frequency, nextArrival, minutesAway);
    $(".table-rows").append(newRow);
    
})