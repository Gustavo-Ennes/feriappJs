import { connect } from "mongoose";

connect(process.env.ATLAS_URL_TEST || "").catch((err) => console.log(err));
