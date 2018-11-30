# server


#### REST API



List of user routes: 
Route | HTTP | Description
------|------|------------
/users/signup | POST | enable user to sign up
/users/login | POST | sign in and get jwt token
/users/fSignin | POST | sign in by facebook and get jwt token
/indodax/btc/ticker | GET | get ticker data from indodax website
/indodax/btc/trades | GET | get trades data from indodax website
/indodax/btc/depth | GET | get depth data from indodax website


***

* **URL:**  
/users/signup

* **Method:**
`POST`

* **Data Params:**
`{
    username: string,
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        id: number,
        username: string,
        email: string,
        password: string, 
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from signup'
    }`

***


* **URL:**  
/users/login

* **Method:**
`POST`

* **Data Params:**
`{
    identity: string,
    password: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        accessToken: string
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from signin'
    }`

***


* **URL:**  
/users/fSignin

* **Method:**
`POST`

* **Headers:**
`{
    ftoken: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        token: string
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from signup'
    }`

***


* **URL:**  
/indodax/btc/ticker

* **Method:**
`GET`


* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        last: number,
        buy: number,
        sell: number,
        vol_btc: number,
        server_time: number
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from indodax ticker'
    }`

***


* **URL:**  
/indodax/btc/trades

* **Method:**
`GET`


* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        date: number,
        price: number,
        amount: number,
        tid: number,
        type: number
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from indodax trades'
    }`

***


* **URL:**  
/indodax/btc/depth

* **Method:**
`GET`


* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        price: number,
        size: number
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from indodax depth'
    }`

***