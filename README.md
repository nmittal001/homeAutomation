# Home Automation

Home Automation system to remotely control devices at home.

# Home Automation with Node.js and Cassandra

- Create home automation application using Node.js and Cassandra.

## Features

- User can Register.
- User can login.
- User can get his/her profile.
- User will get his/her devices.
- User can add new devices.
- Perform an operation on a device(like ON or OFF).
- User can also delete the device.

## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Cassandra - [Download & Install Cassandra](http://cassandra.apache.org/doc/latest/getting_started/installing.html), and make sure it's running on the default port (9042).
- Postman - You can take the collection file from postmanCollection directory which is present in backend-nitesh-kumar-mittal directory, then import that json file directly into Postman.

## Create Database and Tables

- You will get all the queries for creating Database and Table in the masterDB file which is present in backend-nitesh-kumar-mittal directory.

## Install

    $ cd backend-nitesh-kumar-mittal
    $ npm install

## Running Node.js Application

    $ node app.js

## Responses

An invalid request is submitted, or some other error occurs, it returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "success" : 0,
}
```

If a request is successfully submitted, it returns a JSON response which can be two types of Json in the following format:

```javascript
{
  "message" : string,
  "success" : 1,
}
```

```javascript
{
  "data" : array,
  "success" : 1,
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of successful or not.

The `success` attribute describes if the transaction was successful or not.

The `data` attribute contains data associated with the response.

## Usage

- All requests will be made to the Restful API and All the requests must include a content-type of application/json and the body must be valid JSON.

### 01 `POST` /register

API for adding new user: `http://localhost:7005/homeAutomation/register`.

Request body:

    {
        "user_name": "HomeAutomation",
        "password": "homePassword",
        "email": "homeAutomation@gmail.com",
        "gender":"male",
        "mobile_no":"9706323888",
        "image":"https://en.wikipedia.org/wiki/Home_automation#/media/File:Raumbedienger%C3%A4t.jpg"
    }

Response body:

    {
        "success": 1,
        "message": "User added successfully"
    }

### 02 `POST` /login

API for login: `http://localhost:7005/homeAutomation/login`

Request body:

    {
            "email": "homeAutomation@gmail.com",
            "password": "homePassword"
    }

Response body:

    {
        "success": 1,
        "message": "Authentication successful!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbWVBdXRvbjMwODdiNjM"
    }

### 03 `GET` /getUser

API for getting user informatin: `http://localhost:7005/homeAutomation/getUser`, In header add a key `x-access-token` and value you will get from login API response as token

Request body: None

Response body:

    {
        "success": 1,
        "data": [
            {
                "user_id": "9d0509b0-6f3e-11ea-ba76-3f3087b63368",
                "created_at": "2020-03-26T08:48:50.123Z",
                "email": "homeAutomation@gmail.com",
                "gender": "male",
                "image": "https://en.wikipedia.org/wiki/Home_automation#/media/File:Raumbedienger%C3%A4t.jpg",
                "mobile_no": "9706323888",
                "password": "homePassword",
                "status": 1,
                "updated_at": "2020-03-26T08:48:50.123Z",
                "user_name": "HomeAutomation"
            }
        ]
    }

### 04 `POST` /addDevice

API for adding new device: `http://localhost:7005/homeAutomation/addDevice`, In header add a key `x-access-token` and value you will get from login API response as token

Request body:

    {
        "description":"Description About Device",
        "mac_id": "01-23-45-67-89-AB-CD-EF"
    }

Response body:

    {
        "success": 1,
        "message": "Device added successfully"
    }

### 05 `GET` /getDevices

API for getting all devices that is related to the user: `http://localhost:7005/homeAutomation/getDevices`, In header add a key `x-access-token` and value you will get from login API response as token

Request body: None

Response body (If device is not present):

    {
        "success": 1,
        "data": []
    }

Response body (If device is present):

    {
        "success": 1,
        "data": [
            {
                "user_id": "9d0509b0-6f3e-11ea-ba76-3f3087b63368",
                "id": "b014e190-6f40-11ea-ba76-3f3087b63368",
                "created_at": "2020-03-26T09:03:41.097Z",
                "description": "Description About Device",
                "last_connected": "2020-03-26T09:03:41.097Z",
                "mac_id": "01-23-45-67-89-AB-CD-EF",
                "status": 1,
                "switch_status": 0,
                "user_info": {
                    "email": "homeAutomation@gmail.com",
                    "gender": "male",
                    "user_name": "HomeAutomation"
                }
            }
        ]
    }

### 06 `PUT` /deviceSwitch

API for switch ON or OFF the device: `http://localhost:7005/homeAutomation/deviceSwitch`, In header add a key `x-access-token` and value you will get from login API response as token. In body JSON a key `switch_status` has has two value 0 or 1. 0(zero) means OFF and 1(one) means ON.

Request body:

    {
        "switch_status": 0,
        "id": "b014e190-6f40-11ea-ba76-3f3087b63368",
        "created_at": "2020-03-26T09:03:41.097Z"
    }

Response body:

    {
        "success": 1,
        "message": "Updated successfully"
    }

### 07 `DELETE` /deleteDevice

API for deleting the device: `http://localhost:7005/homeAutomation/deleteDevice`, In header add a key `x-access-token` and value you will get from login API response as token

Request body:

    {
        "id": "b014e190-6f40-11ea-ba76-3f3087b63368",
        "created_at": "2020-03-26T09:03:41.097Z"
    }

Response body:

    {
        "success": 1,
        "message": "Device deleted successfully"
    }
