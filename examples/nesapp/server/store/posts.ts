import { faker } from "@faker-js/faker";

export type Post = {
  id: string;
  text: string;
  createdAt: string;
  username: string;
};

const posts: Post[] = [];

const usernames = ["waldi", "oliver", "denis", "lars", "pramit"];

const seedExampleData = () => {
  for (let i = 10; i > 0; i--) {
    posts.push({
      id: faker.string.uuid(),
      text: faker.lorem.sentence(),
      createdAt: new Date(
        Date.now() - i * 1000 * 60 * 60 - Math.random() * 1000 * 60 * 20
      ).toISOString(),
      username: usernames[Math.floor(Math.random() * usernames.length)],
    });
  }
};

seedExampleData();

export const addPost = (post: Post) => {
  posts.push(post);
};

export const getPosts = () => {
  return posts;
};

export const editPost = (id: string, text: string) => {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
};

export const deletePost = (id: string) => {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
};
