# R6.exe
Official R6.exe Discord Bot & Website

# How to install
 - download the repo
### Create a Discord Bot
 - You will need you own discord bot, you can create one easily by following the steps in this video : https://www.youtube.com/watch?v=TaB2UDdX5Bw (watch until 2:10)
### Get an R6 api key
 - go to the R6Stats Discord and ask kindly for an api key !
### Create your environment file
In order to keep your bot's token and api key safe, you will need a `.env` file
 - create an empty .env file (the file must have no name)
 - then write the following code into it : 
 ```
 PORT=whatever_port_you_want_your_website_to_run_on
 API_KEY=your_r6stats_api_key
 TOKEN=your_discord_bot_token
 ```
 ### Last Steps
 - run command `npm install`
 - run `deployable.bat`
 - your bot will logged in and you will be able to access your website on `http://localhost:THE_PORT_YOU_CHOSE`
