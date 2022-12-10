1. Prerequisites

- Download and install NodeJS from https://nodejs.org/en/download/

- Install Visual Studio Code from https://code.visualstudio.com/download

2. Clone the Project

```
git clone git@github.com:Chirag-Jani/decentralized-message-sharing-app.git

```

3. Install all the Dependencies

```

cd decentralized-message-sharing-app

npm install

```

4. Run the local blockchain using ganache (run the given command)

```

$ ganache

```

5. Compile and deploy the smart contracts on the local blockchain

- Compile using

```

cd ganache

node compile

```

- Deploy using,

```

node deoloyAuth.js

node deoloyAuth.js

node deoloyAuth.js

```

- You will see addresses of the deployed contracts on the terminal
- Open the 'Contract.js' file in 'ganache' folder and update the old addressed with the new

6. Run the front-end environment

- open terminal pointed to '/decentralized-message-sharing-app' and run command

```

npm start

`

7. Now, you are ready to use the platform.
```
