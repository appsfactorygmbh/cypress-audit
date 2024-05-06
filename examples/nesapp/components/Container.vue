<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="nes-container with-title">
    <p v-if="title" class="title">{{ title }}</p>

    <slot />
  </div>
</template>
