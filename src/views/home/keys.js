export default (ctx) => ({
  q: {
    canvasDraw(canvas) {
      const startX = ctx.pataTapWidth * 0.2 / 2
      const startY = (ctx.pataTapHeight - 200) / 2
      let width = 0
      canvas.fillStyle = '#FFF'
      const time = setInterval(() => {
        if (width < ctx.pataTapWidth * 0.8) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          width += 20
          canvas.fillRect(startX, startY, width, 200)
        } else {
          clearInterval(time)
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
        }
      }, 1)
    }
  },
  w: {

  },
  e: {

  },
  r: {

  },
  t:{

  },
  y: {

  },
  u: {

  },
  i: {

  },
  o: {

  },
  p: {

  },
  a: {

  },
  s: {

  },
  d: {

  },
  f: {

  },
  g: {

  },
  h: {

  },
  j: {

  },
  k: {

  },
  l: {

  },
  z: {

  },
  x: {

  },
  c: {

  },
  v: {

  },
  b: {

  }
})