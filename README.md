# AlphaDeltax

Alpha is a Spotify like music streaming application, where users can register themselves and login to explore more. Users can search for new artists, latest songs, stream songs, upload and download songs on the go.

### Key Features: ###

#### Front-end features (user) ####
* Alpha is built using latest **Angular framework** for the front-end, **Node JS** for the back-end and **MySQL** for the database.
* Implemented important Angular concepts like **Re-usable components**.
* Users can create account, login and view various artists and songs with their details.
* **MD5** hashing is used for **password storage**
* **Top 10 artists and songs** are displayed on the home page based on the **average rating calculated from all the registered users**.
* Users can **rate** individual songs and artists and also can **search** for songs and artists based on any details of a particular song or artist.
* When users click on the songs or artists, they are redirected to the **details page**, where they can view all details such as name, average rating, etc.
* In the details page users can **stream**, **download** and **alter the playback speed** of the song  as well.
* New songs can be **added** to the collection easily and if the artist for the song does not exist it can be **added dynamically** from the same page.
* **Required-field** and **DOB** validations are present.


#### Back-end Features ####
* Link to [Alpha Back-end repository](https://github.com/Abhishek-S-777/Alpha-Back-End)
* Database name for creating: **alpha**
* Link to [alpha MySQL DB generation script](https://github.com/Abhishek-S-777/Alpha-Front-End/files/9227123/alpha.zip)
* Link to [Alpha database design](https://github.com/Abhishek-S-777/Alpha-Front-End/files/9226624/Alpha-DB.Design.pdf)
* The database is built using **SQL** database, **MySQL** has been chosen as the database as it supports large database and is very much reliable and fast.
* There are a total of **7 tables**, which are **normalized (2NF)**.
* **Node JS** is used as the back-end to connect the front-end to the database using the **REST APIs**.

### Note ###
* As the **Node JS** server is not hosted, Angular does not allow to load the resources (images, audio, etc) from the *local drives, it requires it to be an HTTP URL*.
* To solve this issue, we use [Web server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en). It serves resources from a local folder over the network, using HTTP. And also runs offline.
* [XAMPP](https://www.apachefriends.org/download.html) server is used for accessing the **MySQL** database
* [PHP](https://windows.php.net/downloads/releases/php-8.0.21-Win32-vs16-x64.zip) **v8** is used.

### Instructions ###
* Clone or download the [Alpha-Front-End](https://github.com/Abhishek-S-777/Alpha-Front-End) and [Alpha-Back-End](https://github.com/Abhishek-S-777/Alpha-Back-End) repository to the local system.
* In the root of the **Alpha-Back-End** folder create a folder called `uploads` and inside it, create another folder called `audios`, in the **uploads** folder *profile and cover picture* will be uploaded and in the **audios** folder all the *songs* will be uploaded
* Run the `npm install` command in the root of the Alpha-Front-End folder to install all the required **Angular** packages
* Run the `npm install` command in the root of the Alpha-Back-End folder to install all the required **Node JS** packages
* Download and install **PHP and XAMPP** from the links in the **Note** section
* Start the **Apache** and **MySQL** in the **XAMPP** server
* Import the `alpha` DB script to MySQL DB
* Open **Web server for chrome** and choose the **uploads** folder in the root of **Alpha-Back-End** folder, it will start serving the folder
* Run the `nodemon index.js` command in the root of the Alpha-Back-End folder to start the **Node JS server** 
* Run the `ng s` command in the root of the Alpha-Front-End folder to start the **Angular web server**

### Screenshots ###

***Sign up:***

![Screenshot (623)](https://user-images.githubusercontent.com/89989890/181925555-70f200c3-55db-4259-a5f8-65ae3b2acfa3.png)

***Login:***

![Screenshot (624)](https://user-images.githubusercontent.com/89989890/181925730-bbe491dc-e4f8-4eb8-867d-2e273ea108fe.png)

***Home page (Top 10 Songs):***

![Screenshot (625)](https://user-images.githubusercontent.com/89989890/181925756-c4516b93-eb54-4314-9b53-4168f2ff5800.png)

***Home page (Top 10 Artists):***

![Screenshot (627)](https://user-images.githubusercontent.com/89989890/181925773-64583ba0-c678-47ed-b651-6b3508239942.png)

***All Songs:***

![Screenshot (637)](https://user-images.githubusercontent.com/89989890/181925794-59041765-3e06-4b44-9e4d-0dd8fc5fbe04.png)

***All Artists:***

![Screenshot (642)](https://user-images.githubusercontent.com/89989890/181925811-04235463-218f-4012-b2e7-1d5967f30eda.png)

***Details Page (Song):***

![Screenshot (640)](https://user-images.githubusercontent.com/89989890/181925823-ef2de3d6-5b12-4fb6-b1bb-b7853cc0171a.png)

***Details Page (Artist):***

![Screenshot (641)](https://user-images.githubusercontent.com/89989890/181925837-1be669da-6764-4d08-b1d8-96bdcf907511.png)

***Add Song:***

![Screenshot (638)](https://user-images.githubusercontent.com/89989890/181925885-15f6e4ae-59c3-4ed1-bd62-52cf03fa9f9e.png)

***Add Artist:***

![Screenshot (631)](https://user-images.githubusercontent.com/89989890/181925895-534d5935-60b3-4ad8-b4a5-445f7bc31bb7.png)

***Contact Us:***

![Screenshot (639)](https://user-images.githubusercontent.com/89989890/181925910-d32e26c8-f1ce-4bb5-8b89-5d056d95886d.png)











