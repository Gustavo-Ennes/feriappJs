import { searchResolver } from "./resolver";

const searchResolvers = {
  Query: { search: searchResolver },
};

export { searchResolvers };
