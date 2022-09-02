import {
  NotifiClient,
  NotifiEnvironment,
  createAxiosInstance,
} from "@notifi-network/notifi-node";
import axios from "axios";
import logger from "./logger";

import { config } from "dotenv";
import { NodeFetcher } from "./validator-fetch";
import { countNearTokens } from "./utils";

config({ path: ".env" });

const { SID, SECRET, TOPIC, NODE_IP, POOL_ID } = process.env;

const env: NotifiEnvironment = "Development";
const axiosInstance = createAxiosInstance(axios, env);
const client = new NotifiClient(axiosInstance);

/**callback to find my pool id in different arrays*/
const findMyPoolId = (pool: any) => pool.account_id === POOL_ID;
const nodeFetcher = new NodeFetcher(NODE_IP);

const main = async () => {
  try {
    const { token } = await client.logIn({
      sid: SID as string,
      secret: SECRET as string,
    });

    const { result } = await nodeFetcher.checkValidators();

    const validatorsState = result.current_validators?.find(findMyPoolId);
    const nextEpochSeatPrice = result.current_validators?.reduce(
      (lowerValue: number, pool: any) => {
        if (Number(pool.stake) < Number(lowerValue)) return pool.stake;
        else return lowerValue;
      },
      result.next_validators?.[0]?.stake
    );

    await client.sendBroadcastMessage(token, {
      topicName: TOPIC as string,
      variables: [
        {
          key: "subject",
          value: `👷‍♂️ Validator ${POOL_ID} stake: ${countNearTokens(
            validatorsState?.stake
          )} Ⓝ`,
        },
        {
          key: "message",
          value: `Next epoch seat price: ${countNearTokens(
            nextEpochSeatPrice
          )} Ⓝ`,
        },
      ],
    });
  } catch (error: any) {
    logger.error(error);
  }
};

main();
