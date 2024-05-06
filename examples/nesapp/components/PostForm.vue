<script setup lang="ts">
const emit = defineEmits(["submit"]);

const text = ref("");
const error = ref<string | null>(null);

const onSubmit = () => {
  if (!text.value) {
    error.value = "Enter some text!";
    return;
  }
  error.value = null;
  emit("submit", text.value);
};
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <div class="nes-field">
      <label for="text">Text</label>
      <input v-model="text" type="text" id="text" class="nes-input" />
    </div>
    <div v-if="error" class="nes-text is-error">{{ error }}</div>
    <button class="nes-btn is-primary" type="submit">Submit</button>
  </form>
</template>
