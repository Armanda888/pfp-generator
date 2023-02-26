# HackaOne 2023 Spring Workshop Lab - dApp 101 - Algorand Auction Demo

This is for unlimited PFP generator, to create your own avatar.

## Usage

### Step 1: Start Algorand Blockchain local Environment
```
./sandbox up
```

### Step 2: Start backend service
This service will serve as the blockchain client and call the blockchain functionalities via sandbox shell scripts or python library.
In a seperate window, run the following:
```
pipenv shell
pipenv install
flask run
```
The service will be serving on 
```
http://127.0.0.1:5000
```


### Step  3 - Start the local Web-app (written in React)
In a seperate window, run the following:
```
cd web
npm install
npm start
```
The web-app will start a browser to access the web-app at: http://localhost:3000
