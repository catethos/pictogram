README
======

The app is divided into 2 parts:
the left is the editor area and
the right is the canvas area.

There are 4 buttons in the editor area:
 1. Add Diagram - To add a pictogram with one item to the canvas.
    You can add as many as you like.  
 2. Add Data - To add more data into the selected pictogram.
 3. Save as JSON - To save the working environment into a JSON file.
 4. Upload - To upload the previously saved pictogram.

You need to serve the page with a static page server.
So if you are in *nix, the simplest way is to use:

    python -m simpleHTTPServer

 You can start to explore the app in 2 ways:
  1. Click the "Add Diagram" button and click on the new pictogram in the canvas area.
     The editor area will show all the options you can change to the
     pictogram. Click the "Add Data" button and observe there is
     a new item added to the picotgram.
     For each item, you can change its shape, color, value independently.
     Drag and move the pictogram to anywhere you like.
  2. Click the "Choose File" button and select one of the example.
     Click "upload" then you will see the new pictogram shown.
     You can now add more pictogram by clicking "Add Diagram" or
     change the attributes of the pictograms.

Main Features:
  1. Multiple independent pictograms.
  2. Move the pictogram by click and drag.
  3. Resize the pictogram by modifying the width and heigh in the editor.
  4. All the pictograms are just JSON object.
     All the app do is to render the object on the canvas.
  5. Because everything is JSON, everything can be saved
     as a JSON file. And you can restore the session afterward,
     even after you have restarted your computer.
  6. Because of the seperation of object descsription
     and object rendering, you can easily extend the app
     to render other object. For example, you can easily
     add more shapes to the icon.

TODO:
  1. Social Media Integration (A server needed to be setup).
  2. A way to delete the pictogram (Now we can only add more pictogram).
  3. Better UI (less editing on the editor area, more direct editing on the canvas).

About the source
----------------
  1. index.html : the main html file that provides the general layout.
  2. main.css : all the css rules are here.
  3. main.js : contains all the rendering logic.
  4. js/editor.js : everything about the editor area.
  5. js/handlers.js : all the event handlers.
  6. js/utilities.js : all the utilities functions.
  7. example/ : example pictograms to be loaded.
