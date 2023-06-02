import { connect } from "mongoose";

connect(
  (process.env.NODE_ENV === "test"
    ? process.env.ATLAS_URL_TEST
    : process.env.ATLAS_URL) ?? ""
).catch((err) => console.log(err));
