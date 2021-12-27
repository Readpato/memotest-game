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

After the colors are randomized, the game starts.
That means that we need a function that handles the game round.

There is going to be several steps guiding this process:

- The user selects(click) a random color box
  - The input will be adressed as an event because of the onclick event handler.
  - We will verify that the click has been made correctly on a color box.
- The selected color box will light itself up and it will stay that way.
  - The box will change it's opacity to 1 once it has been clicked upon. (A function will take care of this task)
  - If there's no first input, we will save it and run the handling again.
- The user then selects(click) another color box.
  - If the selected boxes are exactly the same, we are not going to do anything!
- The color box will light itself up and will stay that way.

- Then the process divides itself
- Two identical color boxes where selected. - The element will remove itself and not be allowed to be selected again - The first selected box variable will be emptied. - The game has to asses if it's the ends game or not. (Look below) - The next round begins.
  - Two different color boxes where selected.
  - The color boxes will revert back to its original hidden color
  - The next round begins.
- All the boxes are correctly matched.
  - The game board will dissapear and a message display a victory message will appear.
