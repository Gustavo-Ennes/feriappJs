import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

const verifyToken = async (token: string): Promise<void> => {
  try {
    const user = await getAuth().getUser(token);
  } catch (err: any) {
    throw new Error("Token header is invalid.");
  }
};

export { firebaseApp, verifyToken };
