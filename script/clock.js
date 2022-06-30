/*
File: auth.js

Authors: Tynan Hollyer, Damian Oakes

tynan_hollyer@student.uml.edu

Description: JBR3 JS file to create and
run the clock on the main page.

Credit:
Proper Documentation copied from
HW 1, Part 2, Author: Wenjin Zhou
*/

function clock() {
    morning = "AM"
    const date = new Date()
    var hours = date.getHours()
    if (hours > 12) {
        hours = hours - 12;
        morning = "PM"
    }
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()

    minutes = checkTime(minutes)
    seconds = checkTime(seconds)

    $("#clock").html(hours + ":" + minutes + ":" + seconds + " " + morning);
    setTimeout(clock, 1000)
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}