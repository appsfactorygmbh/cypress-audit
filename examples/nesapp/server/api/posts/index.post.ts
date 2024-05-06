import { z } from "zod";
import { zh } from "h3-zod";
import { addPost } from "@/server/store/posts";

export default defineEventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      text: z.string(),
      username: z.string(),
    })
  );

  const id = Math.random().toString(36).slice(2);
  const post = { id, ...body, createdAt: new Date().toISOString() };
  addPost(post);

  return {
    message: "Post added!",
    post,
  };
});
