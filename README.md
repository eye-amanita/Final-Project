# Project 3 - AAA-ARS-AAL-TN-XPRAAAA

This project started as an experimentation on pushing resolution compatibility, seeing what imagery and artifacting could occur when
making low resolution shapes and blowing them up to a much much larger scale. I wanted to channel a harsh, angular, and very digital 
look, breaking from the more orderly and smooth looking aesthetics of my previous project.

The piece is interactive, with several neutral behaviors that occur when the mouse isn't being moved, of which one will be randomly 
used with each reroll. Upon moving the mouse, the behvior switches to placing the central low-res square at a scale and offset that
is randomized each time the draw loop runs. The range of values for this offset is randomized with each reroll. The colors also have
a 40% chance of deviating from just purely black and white, upon start and reroll.

The four neutral behaviors are:
- A random walk  - [Based off code sourced from this p5 sketch by Dan Schiffman/The Coding Train](https://editor.p5js.org/codingtrain/sketches/N-qqe1ExZ)
- A grid which fills in line by line
- A more spaced out pulsing grid
- Completely randomly placed

Most of these behaviors have certain factors/ranges of numbers which are randomized additionally on each reroll.

On top of the two-states with randomized factors + the interactivity of the piece, I added a function that builds up obscuring
squares of various randomized sizes as well as a 2.5% probability of the screen being wiped, leading to additional complexity
and erratic unpredictability in the imagery created.

Various scales and values across the piece are linked particularly to screen width (and to a lesser extent, screen height) so
resizing the window leads to additional variation, even within the same set of randomized parameters.

I implemented a pause on mouse click function as well as a save image function to allow users to both slow down and save the erratic
artifacting that occurs with interaction.

**[View Live](https://eye-amanita.github.io/Project-3/)**

## Controls:

**Move Mouse:** Control Interactive Drawing Feature

**Mouse Click:** Pause movement

**Spacebar:** Reroll properties (Neutral Behavior Mode, Color Mode, Interactive Offset, Mouse Invert etc.)

**S:** Save canvas .png
