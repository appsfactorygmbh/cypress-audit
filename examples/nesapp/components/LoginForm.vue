<script setup lang="ts">
defineProps<{
  errorMessage: string | null
}>()
const emit = defineEmits(['submit'])

const form = reactive({
  username: '',
  password: '',
})

const onSubmit = () => {
  emit('submit', form)
}

// TODO test?
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <div class="nes-field">
      <label for="username">Username</label>
      <input
        v-model="form.username"
        type="text"
        id="username"
        class="nes-input"
      />
    </div>
    <div class="nes-field">
      <label for="password">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        class="nes-input"
      />
    </div>
    <div v-if="errorMessage" class="nes-text is-error">{{ errorMessage }}</div>
    <button class="nes-btn is-primary color-black" type="submit">Login</button>
  </form>
</template>
