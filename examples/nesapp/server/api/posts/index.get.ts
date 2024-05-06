import { getPosts } from "@/server/store/posts";

export default defineEventHandler(async (event) => {
  return {
    posts: getPosts(),
  };
});
