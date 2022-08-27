
#eRace 

__Live Site:__
[eRace](https://erace-client.herokuapp.com/) 

As a runner, you become part of a global community. A running race can bring together participants from all over the world to compete with and motivate each other runners.

eRace is a web browser application where runners can find and share running races happening in the world.
We let running athletes quickly find new races and provide a platform where runners can spread and share running races happening over the world. Whether you are looking for a picturesque trail run near you, or going for a holiday and want to find a run in that specific country, you can find or add it here.

![Ami](src/api/assets/ReadME/ami.png)

## Why use our app?
The information, the recomendation is all based and comes from personal expericenes. 


## Features
### The Business Interface

#### __Sign In Page__
The login page is the first page a user will see. From here there are two ways to continue:
- Go to the sign up page to register a new account in order to sign in. 
- If already registered simply sign in to get access to the applications features.  

#### __Sign Up Page__
The sign up page is for new users where they fill in information to register a new account. After signing up, users will automatically be redirected to the login page. 


#### __"Next" Page__
Once logged in, this is the landing page. Here there are two different stages. 
- First time and before any races have been added to "my runs" a message will show with instructions. 
- After adding races to "my runs", the race closest in time will be displayed with a countdown of days, hours, minutes and seconds left  to the start of the race. 

#### __Races Page__
The race page shows a list of all races added by users. 
- This list gives users a quick overview about each race with: 
Name of the race, distance, date and country. 
- From here, user are able to go to detail page of any of the listed races. 
- Users are able to like a race by clicking the star, it will then be easy to find later on.

There are three filter features users can choose from. 
- Users can search on a country. A dropdown list of countries will appear and make it easy for users to select the correct country. 
- Users can select "liked races" and only liked races will show in the list. 
- Users can select "upcoming races" and only upcoming races will show up in the list; passed races will not show. 


#### __Detail Page__
Users who want to read more about a specific race, can click the race name on the Races or My Runs page; the detail page then shows up.
- Additional basic information such as time and official website is showed. 
- The website is a clickable link for users to visit the official website and register for the race. 
- Users can mark that they are running the race and the race will be added to "My Runs".
- Users can leave comments, add updated information about the race and add images to inspire other runners. 
- The user who added the specific race can edit and update the basic information. 

#### __Edit Race Page__
The Edit Race page is where the user who added the specific race can edit and update the basic information. The instructors on the page emphazise things that are important to think about when adding a race. 
- A user can click save or cancel and will be redirected to last visited detail page.

#### __Add Race Page__
The Add Race page is where users add races that are not already in the database. The instructors on the page emphazise things that are important to think about when adding a race. 
- A user can click create or cancel and will be redirected to latest visited page.


#### __My Runs Page__
This is the users personal page and for users to have a overview of passed and upcoming races. After marking races to run, the race will then be displayed on the My Runs Page. User can click the race name and the detail page then shows up.

### Future Features
There are many ways to extend the capabilities of the service. For instance I would like to add: 
- Users can connect with other users 
- Users can edit and update thier accounts detail
- Users can see how many other people have liked and are running a race
- Show runs on map
- Show runs on timeline

## Project Plan 
I used Git Project to plan and to follow up with my project. 

### User Stories
__Authentication__
- As a user I want to be able to sign up and to sign in with username and password so that I can access my account.
- As a user I should be logged in to access the site.

__Race__
- As a user I want to be able to add a race I’m interested in, I will attend or I want to recommend.
- As a user I want to be able to edit the race I have added.
- As a user I want to be able to search on a country to see upcoming races in that specific country.

__Comment__
- As a user I want to be able to see all information about a race and add to it.

__Like__
- As a user I want to be able to see the races I am interested in.
- As a user I want to be able to mark races so that I can easily see the ones I’m interested in or will attend.

__Run__
- As a user I want to be able to see my past and upcoming races.
- As a user I want to be able to see details about my next upcoming race so that I get an extra push.

- As a user I want a friendly interface.

## Design  
__Color Scheme__

I wanted to keep the color scheme nice and clean for this project so I chose these colors (that work nicely together).
 ![Color Scheme](src/api/assets/ReadME/colors.png)

__Favicon__ 

The favicon was supplied from the webservice icons8. 
 ![Favicon](src/api/assets/ReadME/favico.png)

__Wireframes__
I created my wireframes and the design for my project using Figma. 
 ![Wireframes](src/api/assets/ReadME/wire.png)

## Technologies Used
### Languages Used
- React 
- HTML 
- CSS
- Python 
- JavaScript (JSX)

## Frameworks, Libraries and Programmes Used
- __GitHub__
    was used to store the code for the project. 
- __GitPod__
    was used to some extent to provide the programming environment. 
-  __Visual Studio Code__ 
    was used for all coding.
-  __Heroku__ 
    is a cloud based application platform connected to GitHub, used to deploy this project.
- __React Bootstrap__
    is a component-based library and was used to build up this project. 
- __Google Fonts__
    was used to import the font Mali, Nunito Sans and Roboto as the fonts for this project.
- __Font Awesome__
    was used for some of the icons.
- __Cloudinary:__ 
    was used to store images online.
- __Git Projects__
    was used for keeping track of user stories, tasks and to manage the project. 
- __Figma__
    is a graphic design tool and helped with the design for this project. 


## Testing 
The final version was manualy tested by using each function on each page.

Sign up Page: 
- Verify that a new user can sign up. 
- Verify that an existing username can not be used.
- Verify that both password entered must match with each other. 
- Verify that the "sign in" link works. 

Sign in Page: 
- Verify that both correct sign in and incorrect sign in are handled. 
- Verify that the "sign up" link works.

Next Tab: 
- Verify that the instruction text is displayed when the user has no runs. 
- Verify that next upcoming race is displayed. 
- Verify that the remaining time is correct and continuosly updated.

Races Tab: 
- Verify that all races in the database are displayed if no filters are applied.
- Verify that filters work correctly.
- Verify that races are sorted by date ascending.
- Verify like and unlike. 
- Verify that race links to detail page. 

Detail Page: 
- Verify running and not running. 
- Verify all information is correctly displayed.
- Verify that the race can be edited by the owner only.
- Verify like and unlike.  
- Verify that comments (text and/or image) can be created. 
- Verify comments are corretly displayed. 
- Verify comments are sorted by date descending.
- Verify that comments can be deleted by the owner only. 

Edit Race Page:
- Verify that the instruction text is displayed. 
- Verify all information is correctly displayed.
- Verify that the user is notifed of empty fields.
- Verify that the race is modified correctly. 
- Verify that the cancel button works. 

Add Race Tab:
- Verify that the instruction text is displayed. 
- Verify that the user is notifed of empty fields.
- Verify that the race is created corretly. 
- Verify that the cancel button works. 

Runs Tab:
- Verify that the instruction text is displayed when the user has no runs.
- Verify that the logged in user's username is displayed. 
- Verify that passed runs are correctly displayed in descending order.
- Verify that upcoming runs are corretly displayed in ascending order. 
- Verify that races link to detail page.  

Sign Out Tab:
- Verify that the user's session ends. 
- Verify that the sign in page is displayed. 

Test were preformed using Chrome and FireFox. 

## Bugs Found
No known bugs. 

## Pre-deployment checklist
- Configured axios to use the deployed server api. 

## Deployment
This project was deployed using Github and Heroku.

__Github__

Login to Github.
- Click the green "new" button and create new repository page.
- Chose a repository name then clicked the green "create repository button" at the bottom of the page.
- Clicked the green ‘Gitpod’ button to create a workspace in Gitpod for editing.

__Heroku__

Login to Heroku.
- Create a "New App" and give it a name, it must be unique.
- Click "Create App" and this will take you to a page where you can deploy your project.

- Click on the 'Resources' tab and search for 'Heroku Postgres' in the Add-ons section to add the Heroku Postgres database to the project.
- Click on the 'Settings' tab at the top of the page. The following steps must be completed before deployment.
- Click 'Reveal Config Vars'. Here the database URL is stored, it is the connection to the database, so this must be copied and stored within env.py file within the same directory as the manage.py file.

- To deploy the project go to the deploy tab and scroll  down to the end and deploy our branch.
- View the build log to make sure that everything works okay.
- The app has been deployed to Heroku.

To get the Django framework installed and set up I followed Code Institutes Django [sheet](https://codeinstitute.s3.amazonaws.com/fst/Django%20Blog%20Cheat%20Sheet%20v1.pdf)

## Credit

- Instructions on Heruko and Django was found [here](https://docs.google.com/document/d/1P5CWvS5cYalkQOLeQiijpSViDPogtKM7ZGyqK-yehhQ/edit) 

- Formatting date methods was found [here](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/)

- [W3School](https://www.w3schools.com/) helped me out with CSS code. 

- [Slackoverflow](https://stackoverflow.com/) helped me out with code solutions throughout the project.

- [Getboostrap](https://getbootstrap.com/docs/4.1/layout/grid/)  helped out with colums and rows for the layout.