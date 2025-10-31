interface CanvasSetup {
  context: CanvasRenderingContext2D | null
  dpr: number
}

export const useDprCanvas = () => {
  const setupCanvas = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): CanvasSetup => {
    const dpr = window.devicePixelRatio || 1

    // Set canvas size accounting for device pixel ratio
    canvas.width = width * dpr
    canvas.height = height * dpr

    // Scale canvas back down with CSS
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')

    if (context) {
      // Scale context to account for DPR
      context.scale(dpr, dpr)
    }

    return { context, dpr }
  }

  return { setupCanvas }
}
