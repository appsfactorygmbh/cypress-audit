<script setup lang="ts">
import userState from "../store/user";
import type { Post } from "~/server/store/posts";

const router = useRouter();
if (!userState.value.user) {
  router.push("/login");
}

const postList = ref<HTMLElement | null>(null);
const { data } = await useFetch<{ posts: Post[] }>("/api/posts");

const onClickLogout = () => {
  userState.value.user = null;
  router.push("/login");
};

const onSubmit = async (text: string) => {
  const response = await $fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      username: userState.value.user?.username,
      text,
    }),
  });

  const { post } = response;
  if (post) {
    data.value?.posts.push(post);
    scrollToBottom();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (!postList.value) return;
  postList.value.children[postList.value.children.length - 1].scrollIntoView();
};

const onEditPost = async (id: string, text: string) => {
  if (!data.value) return;

  const response = await $fetch(`/api/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ text }),
  });

  const index = data.value.posts.findIndex((post) => post.id === id);
  if (index) {
    data.value.posts[index] = response.post;
  }
};

onMounted(async () => {
  scrollToBottom();
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <Container v-if="userState.user" class="flex justify-between items-center">
      <h1>Hello {{ userState.user.username }}</h1>
      <button @click="onClickLogout" class="nes-btn is-warning" type="button">
        Logout
      </button>
    </Container>
    <Container title="Posts">
      <div class="max-h-[40vh] overflow-scroll">
        <div v-if="!data">
          <i class="nes-octocat animate"></i>
        </div>
        <div v-else-if="data.posts.length === 0">
          <p>No posts yet</p>
        </div>
        <section v-else ref="postList" class="flex flex-col gap-4">
          <Post
            v-for="post in data.posts"
            :post="post"
            :isMyPost="userState.user?.username === post.username"
            :key="post.id"
            @edit="onEditPost(post.id, $event)"
          >
          </Post>
        </section>
      </div>
    </Container>
    <Container title="Create a post">
      <PostForm @submit="onSubmit" />
    </Container>
  </div>
</template>
