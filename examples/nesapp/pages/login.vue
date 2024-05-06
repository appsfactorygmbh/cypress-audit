<script setup lang="ts">
import userState from '../store/user'
const router = useRouter()
const errorMessage = ref<string | null>(null)

const onSubmit = async (data: any) => {
  $fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => {
      errorMessage.value = null
      userState.value.user = { username: data.username }
      router.push('/')
    })
    .catch((err) => {
      errorMessage.value = 'Login failed'
    })
}
</script>

<template>
  <div>
    <Container title="Login">
      <LoginForm @submit="onSubmit" :errorMessage="errorMessage" />
    </Container>
  </div>
</template>
