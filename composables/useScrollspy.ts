/**
 * Scrollspy allows you to watch visible headings in a specific page.
 * Useful for table of contents live style updates.
 */
export default () => {
  const observer = ref<IntersectionObserver>()
  const visibleHeadings = ref<string[]>([])
  const activeHeadings = ref<string[]>([])

  function observerCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const id = entry.target.id

      if (entry.isIntersecting) {
        visibleHeadings.value.push(id)
      } else {
        visibleHeadings.value = visibleHeadings.value.filter(
          (heading) => heading !== id,
        )
      }
    })
  }

  function updateHeadings(headings: Element[]) {
    headings.forEach((heading) => {
      observer.value.observe(heading)
    })
  }

  watch(
    visibleHeadings,
    (value, oldValue) => {
      activeHeadings.value = value.length === 0 ? oldValue : value
    },
    { deep: true },
  )

  onBeforeMount(() => {
    observer.value = new IntersectionObserver(observerCallback)
  })

  onBeforeUnmount(() => observer.value?.disconnect())

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings,
  }
}
