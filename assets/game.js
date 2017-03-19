$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBs23igHLwU-NobAFbKFHbY1ruGfHOePq4",
        authDomain: "rps-multi-b4692.firebaseapp.com",
        databaseURL: "https://rps-multi-b4692.firebaseio.com",
        storageBucket: "rps-multi-b4692.appspot.com",
        messagingSenderId: "22524780383"
    };
    firebase.initializeApp(config);

    var database = firebase.database(),
        connectionsRef = database.ref("/connections"),
        connectedRef = database.ref(".info/connected");

    var name = '',
        wins = 0,
        losses = 0,
        playerKey = '',
        choice = '',
        post;

    connectedRef.on("value", function (snap) {
        // If they are connected..
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true
            );
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }


    });

    connectionsRef.on('child_added', function (snap) {
        if (snap.numChildren() === 1) {
        }
        else {
            playerKey = snap.key;
        }
    });

    $('.name').on('keyup', function (e) {
        if (e.which == 13) {
            name = $(this).val();

            connectionsRef.child(playerKey).push({
                name: name,
                wins: wins,
                losses: losses,
                choice: choice
            });
            name = $(this).val('');
        }
        connectionsRef.child(playerKey).on('child_added', function (snap) {
            post = snap.key;
        });

        connectionsRef.on('value', function (snap) {
            console.log("hi");
            console.log(snap.val());
                $('.playerOne').html(snap.child(playerKey).child(post).val().name);

        })
    })


});