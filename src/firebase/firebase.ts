import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseApp = initializeApp({
  credential: applicationDefault()
});

const verifyToken = async (token: string): Promise<void> => {
  try {
    await getAuth().getUser(token);
  } catch {
    throw new Error("Token header is invalid.");
  }
};

export { firebaseApp, verifyToken };
