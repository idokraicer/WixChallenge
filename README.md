# Flickr Gallery

Welcome to the Flickr Gallery application.
This app is a simple gallery application that displays images in a grid. The images are retrieved using the Flickr API to fetch images by a tag.


## Getting Started
To set up the test environment and get this app running locally all you need to do is:
1. Make sure you have a [Gitlab](https://gitlab.org) account
2. [Import this repository](https://docs.gitlab.com/ee/user/project/import/repo_by_url.html) to your Gitlab account as a private repository. Use this as the import URL: https://github.com/wix-incubator/exposure-fed-exam
3. Clone your newly created repository
4. In the created folder install the node modules `npm install`
5. Run the app `npm start`
6. Your local app should be available at `http://localhost:8000`

## Your Tasks
This project includes 3 main tasks. besides the bonus questions, all tasks are mandatory.
You can and should learn new skills during the process, you may consult with Google and friends but you will need to explain why you implemented what you implemented, so be responsible for your code. 

*Important:* Please make sure to commit after each task - for example, after finishing task 1 (flip), commmit the files with a relevant message: "task 1 - flip image", and so on.

*Important 2:* This task comes with a working set of test (run `npm test`). Make sure all the tests pass when you're done (change the tests if needed)


### Task 1 - Image Actions
Each image has three buttons that appear on mouse hover. You need to make them work.
1. Flip: clicking the flip button should flip the image horizontally (like a mirror).
2. Clone: clicking the clone button should duplicate the image. 


#### Bonus:
3. Expand: clicking an image should display this image in a larger view.

### Task 2 - Gallery Actions
1. Favorites: add functionality which enables the user to select their favorite images.  
   * should be persistent - refreshing or closing the site will not reset the favorites
   * provide UI for viewing all the favorites 
2. Infinite Scroll: currently the gallery displays only 100 images. *Create* a mechanism that loads more images from flickr when the user is scrolling past the last image. BONUS - implement the infinite scroll mechanism by yourself (no npm package).

#### Bonus:
3. Drag & Drop: let your users choose the order of the images by adding an option to drag & drop images to their new position.

### Task 3 - Add a custom feature
- This is your chance to get creative. Add a new, **cool and innovative** feature to the gallery. **Note:** All preceding tasks should still work.

### Bonus task
- Write tests for every new feature you write (tests are written with `.spec.js` suffix)

## Tips / Notes
- All the code you'll change / add will be in the `/src/components` folder.
- Think about the product you create, try innovating the user interface. Take it to the next level by customizing the looks and adding new features! **be creative, creative is good**.
- If you want to use `npm` modules for other parts, your choice - just make sure you know how they work under the hood.

#### Remember: this test is designed to see how you complete tasks that require self learning, not to test your existing knowledge.

## Submitting your project
After you've completed your tasks, and you are ready to submit it, do the following:
1. Make sure all the code is committed and pushed
2. Add "students-fed-exam@wix.com" as a user to the repo (Master permission)
3. Send us an email with your repo link
4. Profit!

## Good Luck!
![Break a leg](https://media0.giphy.com/media/aHs1EAnUAxYgU/giphy.gif)
