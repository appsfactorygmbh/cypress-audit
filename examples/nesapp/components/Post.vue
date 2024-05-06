<script setup lang="ts">
import type { Post } from '@/server/store/posts'
import { iconClassForUsername } from '@/utils/user-icon'

const props = defineProps<{
  post: Post
  isMyPost: boolean
}>()

const emit = defineEmits(['edit'])

const postElement = ref<HTMLElement | null>(null)
const textareaElement = ref<HTMLTextAreaElement | null>(null)
const editMode = ref(false)

const newText = ref(props.post.text)

const enableEditMode = async () => {
  editMode.value = true
  await nextTick()
  postElement.value?.scrollIntoView()
  textareaElement.value?.focus()
}

const submitEdit = () => {
  emit('edit', newText.value)
  editMode.value = false
}

// TODO test?
</script>

<template>
  <section
    ref="postElement"
    class="flex gap-4"
    :class="{
      'flex-row-reverse': isMyPost,
    }"
    :key="post.id"
  >
    <i
      class="nes-bcrikko shrink-0 mt-auto"
      :class="[iconClassForUsername(post.username)]"
    ></i>
    <div
      class="nes-balloon max-w-[40%]"
      :class="{
        'from-left': !isMyPost,
        'from-right': isMyPost,
      }"
    >
      <div class="absolute -top-2 text-xs bg-white">
        {{ formatDate(post.createdAt) }}
      </div>
      <div v-if="editMode">
        <textarea
          ref="textareaElement"
          v-model="newText"
          class="nes-textarea"
          rows="3"
          @keydown.enter="submitEdit"
        ></textarea>
        <button class="nes-btn is-success" @click="submitEdit">Save</button>
      </div>
      <p v-else>
        <span class="capitalize">{{ post.username }}:</span>
        {{ post.text }}
        <button v-if="isMyPost" class="hover:underline" @click="enableEditMode">
          [edit]
        </button>
      </p>
    </div>
  </section>
</template>
