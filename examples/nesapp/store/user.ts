import { useStorage } from "@vueuse/core";

type User = {
  username: string;
};

export default useStorage<{
  user: User | null;
}>("user", { user: null });
