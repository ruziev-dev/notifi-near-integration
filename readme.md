Created by Timur Ruziev (participant of [**stakewars-iii**](https://github.com/near/stakewars-iii))

You can see my challenge report here: https://github.com/ruziev-dev/near-stakewars-iii


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
```

Set your settings to `config.env`

```bash
nano config.env

# set your values
POOL_ID="xx.factory.shardnet.near"
NODE_IP=127.0.0.1
SID=******************************
SECRET='****************************************'
TOPIC=*******************************
```

## Run

```
node index.js
```

## To automate running script find path to Node.js
```bash
which node

# use this path to in crontask
> /usr/bin/node

```

Add chron task every minute

```
crontab -e
```

Add this row with setting path to Node.js and script

```bash
# set your path
0 0 * * * cd /home/<USERNAME>/notifi-near-integration/ && /usr/bin/node index.js > /dev/null 2>&1
```

Reload cron service to start execute script

```bash
sudo service cron reload
```
