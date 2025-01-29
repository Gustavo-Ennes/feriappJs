import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { getLogger } from "../logger/logger";

const firebaseApp = initializeApp({
  credential: applicationDefault()
});

const verifyToken = async (token: string): Promise<void> => {
  try {
    await getAuth().getUser(token);
  } catch (error) {
    const logger = getLogger("firebase");
    logger.error({ token }, "Error at getting firebase user: ");
  }
};

export { firebaseApp, verifyToken };
