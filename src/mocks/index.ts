const initMocks = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
    return
  }

  const { worker } = await import('./browser')
  worker.start()
}

export default initMocks
