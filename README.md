# Bot CC2 Excercise

> Facebook messenger bot for Wizeline Academy - Bots Crash Course

This course is Facebok Messenger quick start based, you can find more information and advanced examples [here.](https://developers.facebook.com/docs/messenger-platform)

#### Pre-requisites

- Latest node.js version

#### How to start

- Clone repository

```
git clone https://github.com/wizeline/bots-cc-2-exercise.git
```

or

```
git clone git@github.com:wizeline/bots-cc-2-exercise.git
```

#### Install dependencies

```
npm install
```

#### Setting up configuration

Repository contains a `.env.example` file which is mentioning all the ENV variables Crawler needs to work suchs as

```
# Set port where your application server will be running
PORT=3000

FB_VERIFY_TOKEN=""
FB_PAGE_ACCESS_TOKEN=""

# FB URL where you will make requests
FB_GRAPH_API="https://graph.facebook.com/v2.6"
# Your internal accessible ngrok|localtunnel domain
BACKEND_URL=""
```

To get your access token go to 
[FB Messenger Getting Started](https://developers.facebook.com/docs/messenger-platform/guides/setup)

Once you have setted all the values, just save as `.env` a new file at the root of repository

**NOTE:**  For security reasons `.env` file will be ignored, to prevent sharing tokens on this repo

#### Lectures

The course is divided in sections that we are going to handle as branch stages

- Build your own ECHO Bot

```
git checkout stage/echo
```

- Facebook Messenger sample outputs

```
git checkout stage/sample-outputs
```

- Deep dive on making API requests

```
git checkout stage/api-requests
```

- Guided - Add NLP

```
git checkout stage/nlp
```


#### Running the bot

- Run project as develop

```
npm run develop
```

**NOTE:** Requires `nodemon` installed globally.


- Start application

```
npm start
```

#### CONTRIBUTING

Lint before create a Pull Request to ensure that there's no issues that may cause major troubles.

- List lint issues

```
npm run lint
```

Additionally you can fix minor lint issues running the next command

```
npm run lint-fix
```

#### WizelineTeam

**Developers**

- [@a-rmz](https://github.com/a-rmz)
- [@angel-mu](https://github.com/angel-mu)
- [@emmanueldiaz](https://github.com/emmanueldiaz)
- [@juanitodread](https://github.com/juanitodread)
- [@oryws](https://github.com/oryws)

**UX**

- [@monteonjoel](https://github.com/monteonjoel)