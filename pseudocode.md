# Memotest Game

## HTML and CSS

To start properly building the game, we need a layout where all the Memotest game is going to appear.

We are going to have a title, and beneath it we are going to have a grid layout with 12 colors divided into
4 rows with 3 colors each. We are going to use Bootstrap to build the layout and then style it with SASS or Bootstrap classes.

## JavaScript

The scope of the game is to find out where the color pairs are located.
Then:

- The game setup starts by placing the pair of colors randomly across the board.

How do we achieve that? We need to get all the actual boxes into an array and assign to each of them a class name that gives them a specific color.

We can achieve that by:

- Putting all the base colors in an array, then duplicate that array.
- Shuffle the array within itself
- Run that array with a forEach function that will asign them the class name while it runs through the index.
