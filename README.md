# So-peckoko
BACK-END

Node.js MongoDB

FRONT-END

[Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

HOW TO START THE PROJECT

Clone the repository
Go to MongoDB website and register for free account. Once you have access to your dashboard, create a cluster and then configure it with the AWS option and only the free options so that you can develop for free.

While starting your cluster, you can access the Database Access tab. First, you will need to add a user with the ability to read and write to any database. Choose the username and password you want and write them down, as you will need them to connect your API to your cluster.
You will also need to go to the Network Access tab, click on Add IP Address and allow access from anywhere (Add access from Anywhere).

create a file .env to cash your DB_URL, PASS_WORD for hash. the DB_URL is the SRV address  and the string <PASSWORD> is your MongoDB user password

Launch the back-end server by typing "npm install" then "nodemon serve" in your command terminal with CD : projet-6\backend

Launch the front-end server by typing "npm install" then "ng serve" in your command terminal with CD : projet-6\reseau-groupomania


Go to `http: // localhost: 4200 /`



