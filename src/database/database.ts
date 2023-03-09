import { connect } from "mongoose";
// TODO change to production url when frontend ends
connect(process.env.ATLAS_URL_TEST || "").catch((err) => console.log(err));
