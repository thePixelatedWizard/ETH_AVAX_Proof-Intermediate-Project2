# ETH+AJAX Proof Intermediate Project 2
This projects implements a simple smart contract and uses a frontend to interact with those
functions.

## Description
In this project a ethereum smart contract is deployed on a locally hosted blockchain using hardhat.
The contract implements a simple token with 3 functions to mint tokens, burn tokens and get the 
total amount of minted tokens. Next up a simple frontend is created using `react` (A frontend javascript
framework). Furthermore with the use of `ethers` javascript module the functions from the smart contract
are accessible from the frontend.


## Getting Started
To run this project first you need to clone this project locally. After cloning the github repository,
you will want to do the following to get the code running.

**Required Software**
+ `git`
+ `NodeJS`
+ `Metamask Browser Extension`

**Steps**
1. Inside the project folder open a terminal window and install the dependencies using
`npm install` or `npm i`
2. Open 2 additional terminal in the same folder. In the second terminal run the hardhat node using
`npx hardhat node`
3. In the 3rd terminal deploy the smart contract uisng the command
`npx hardhat run --network localhost scripts/deploy.js`
4. Finally run the frontend using the command
`npm run dev`
5. Open the browser and navigate to http://localhost:3000
6. Enable the metamask extension and connect the wallet with the frontend. Next you can use the functions
to test the smart contract.

## LICENSE
This project is unlicensed.
