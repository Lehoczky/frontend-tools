export default (callback: () => void) => {
  let worker: Worker

  onMounted(() => {
    worker = createWorker(() => {
      let interval: ReturnType<typeof setInterval> | undefined = undefined

      self.addEventListener("message", (event) => {
        switch (event.data) {
          case "start":
            interval = global.setInterval(() => self.postMessage("tick"), 1000)
            break
          case "pause":
            clearInterval(interval)
            break
        }
      })
    })

    worker.addEventListener("message", callback)
  })

  const startInterval = () => worker?.postMessage("start")
  const pauseInterval = () => worker?.postMessage("pause")
  return { startInterval, pauseInterval }
}

function createWorker(fn: () => void) {
  const blobURL = URL.createObjectURL(
    new Blob(["(", fn.toString(), ")()"], {
      type: "application/javascript",
    }),
  )

  const worker = new Worker(blobURL)
  URL.revokeObjectURL(blobURL)
  return worker
}
