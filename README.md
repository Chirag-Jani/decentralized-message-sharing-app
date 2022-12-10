# Blockchain Based Message Sharing Application

## How it is implemented? and How it Works?

Please read the paper: []() to understand.

## Instructions to run

1. Install Prerequisites

- Download and install NodeJS from [Download](https://nodejs.org/en/download/)

- Install Visual Studio Code from [Download](https://code.visualstudio.com/download)

2. Clone the Project

```
$ git clone git@github.com:Chirag-Jani/decentralized-message-sharing-app.git
```

3. Install all the Dependencies

```
$ cd decentralized-message-sharing-app

$ npm install
```

4. Run the local blockchain using ganache (run the given command)

```
$ ganache
```

5. Compile and deploy the smart contracts on the local blockchain

- Compile using,

```
$ cd ganache

$ node compile
```

- Deploy using,

```
$ node deoloyAuth.js

$ node deoloyAuth.js

$ node deoloyAuth.js
```

- You will see addresses of the deployed contracts on the terminal

- Open the 'Contract.js' file in 'ganache' folder and update the old addressed with the new

6. Run the front-end environment

- open terminal pointed to '/decentralized-message-sharing-app' and run command

```
$ npm start
```

7. Log in your MetaMask and import the demo accounts to interact with the App.

- As we ran the 'ganache' blockchain locally, ganache provides us 10 account with 1000 ETH in each.

- Addresses and Private Keys will be provided.

- Copy the private key and import the account in your MetaMask.

- For more information, [click here](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/)

8. Now, your environment is set to run the app and interact with it.


Note: Here, we have assumed that users with type "Dean" are registered by the government bodies initially. Though for the sake of testing we have kept them as a normal user but instead of waiting for approval, these user will directly be able to post on the app and approve other members and requested posts.

The code containing that option is commented in the "SignUp.js" file located at "src/components/", you can remove the comment and test by yourself.
