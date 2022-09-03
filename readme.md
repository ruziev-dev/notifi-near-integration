Created by Timur Ruziev (participant of [**stakewars-iii**](https://github.com/near/stakewars-iii))

You can see my challenge report here: https://github.com/ruziev-dev/near-stakewars-iii

## Getting credentials to integrate service with your node

Complete form (you can find link in [# **integration-requests** in Discord channel](https://discord.com/invite/nAqR3mk3rv)) and you will get credentials for integration on e-mail.

![img](https://github.com/ruziev-dev/near-stakewars-iii/blob/main/images/monitoring/notifi-service-credentials.png?raw=true)

## Installation:

Clone repository & install dependencies

```bash
git clone https://github.com/ruziev-dev/notifi-near-integration.git

cd notifi-near-integration

npm i
```

Make your `.env` file by example `example.env`

```bash
cp example.env .env

nano .env
```

```bash
POOL_ID="xx.factory.shardnet.near"
NODE_IP=127.0.0.1
SID=******************************
SECRET='****************************************'
TOPIC=*******************************
```

```bash
npm run build
```

Run to check

```bash
node build/index.js
```

If everything is ok you will get e-mail message

![img](https://github.com/ruziev-dev/near-stakewars-iii/blob/main/images/monitoring/notifi-service.png?raw=true)

## To automate running script find path to Node.js

```bash
which node

# use this path to in crontask
> /usr/bin/node

```

Add chron task midnight

```
crontab -e
```

Add this row with setting path to Node.js and script

```bash
# set your <USERNAME> to path
0 0 * * * cd /home/<USERNAME>/notifi-near-integration && /usr/bin/node build/index.js > /dev/null 2>&1
```
