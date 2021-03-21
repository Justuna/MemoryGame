# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: Justin Phillips

Time spent: 5 hours spent in total

Link to project: https://glitch.com/edit/#!/watery-voltaic-homburg

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Difficulty buttons that change the amount of mistakes the player gets before a game over

## Video Walkthrough

Here's a walkthrough of implemented user stories:
(Due to recordit choppiness, sometimes the buttons do not appear to light up on press, just because I press them really fast)
- A normal game (loss) with increasing speed - https://recordit.co/1JouuX8U1V
- A normal game (win) with increasing speed - https://recordit.co/Xnp3WLYdNP
- Testing game exiting on loss or stop, as well as different difficulties - https://recordit.co/BfNkPNyRyR
- Testing lose condition by running out timer - https://recordit.co/oIIpXHp0sn
- Changing timer to 3 and testing out the bugfix from (#2) - https://recordit.co/37rc9Kfttp
Each test also shows different patterns, pictures in lit buttons, and 8 buttons


## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   Math.random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   Images in buttons: https://www.quackit.com/html/tags/html_button_tag.cfm
   Image tag: https://www.w3schools.com/tags/tag_img.asp
   Multiple function calls for onclick: https://stackoverflow.com/questions/3910736/how-to-call-multiple-javascript-functions-in-onclick-event
   setInterval guide: https://javascript.info/settimeout-setinterval

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   One challenge I encountered in creating this submission was in implementing the timer. Although adding the timer itself was not difficult - just use setInterval and clearInterval when the timer needs to start or stop -
   I ran into some trouble in deciding when to start the timer. My immediate thought was to start it right after it stopped to prepare for the next turn; however, since this approach would start the timer while the clues
   were still playing, this cut into the time the player had, which didn't seem fair. I then moved the timer start to the end of the function that plays clues, which didn't work. I realized soon after that the for loop that
   calls the clues each time also relies on setTimeout, so the clues would still be played after the function finished and the timer started. I used setTimeout to similarly sync the timer restarting to `delay`, which
   started the timer approximately on time. This still left me with one last bug, though: if the player stopped the game early enough, the game would still send a game over button at the end of the now invisible timer.
   As it turns out, clearInterval in stopGame was being run before setInterval had a chance to run, leading to an unhandled timer; in order to address this, I added a conditional that only created the timer if the game was
   running, reusing the `gamePlaying` value provided at the beginning.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   One question I have about web development is: how are the functions and other features usually split between files? Although this application was small and could reasonably fit within the default html, css, and js 
   file, it was already starting to become really crowded, especially in the javascript file. There were a lot of function calls to do things that I would have considered simple, and the global variables especially were
   beginning to take up a good chunk of the screen. I also noticed from some of the websites I used as resources that HTML allows for the integration of javascript scripts into the file itself. So is functionality better
   off divided across multiple files or wherever they’re needed, or is using a few files standard?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   One of the first things I would do given more time is to beautify the javascript file. Although it's not completely unreadable, I do think it could be better organized, and areas could be split more cleanly into chunks.
   I would also like to figure out some way to combine the two sound-playing functions.
   In terms of additional features, I feel like my difficulty selector could use more work. In its current form, it does not display the difficulty selected before the game starts, which might be nice for better readability.
   However, I was also thinking of making difficulty impact settings besides the chance count, like how much time the user had to guess or how fast the clues ramped up in playback speed - this would have required a lot of
   balancing, though.

## License

    Copyright Justin Phillips

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
