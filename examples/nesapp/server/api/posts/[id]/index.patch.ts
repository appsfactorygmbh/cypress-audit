import { z } from "zod";
import { zh } from "h3-zod";
import { editPost } from "@/server/store/posts";

export default defineEventHandler(async (event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      text: z.string(),
    })
  );

  const params = await zh.useValidatedParams(event, {
    id: z.string(),
  });

  const post = editPost(params.id, body.text);

  return {
    message: "Post edited!",
    post,
  };
});
