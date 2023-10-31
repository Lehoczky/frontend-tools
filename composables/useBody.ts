export default function useBody() {
  const body = ref<HTMLBodyElement | undefined>()

  onMounted(() => {
    body.value = document.querySelector("body")
  })

  return { body }
}
