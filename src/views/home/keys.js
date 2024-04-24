export default (ctx) => ({
  q: {
    
  },
  w: {

  },
  e: {

  },
  r: {
    canvasDraw(canvas) {
      let type = Math.ceil(Math.random() * 10) % 2 ? 'toLeft' : 'toRight'
      let width = 0
      const startX = type === 'toRight' ? ctx.pataTapWidth * .1 : ctx.pataTapWidth * .9
      const startY = (ctx.pataTapHeight - 300) / 2
      
      canvas.fillStyle = '#FFF'
      const time = setInterval(() => {
        if (Math.abs(width) < ctx.pataTapWidth * .8) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          if (type === 'toRight') {
            width += 25
          } else {
            width -= 25
          }
          canvas.fillRect(startX, startY, width, 300)
        } else {
          clearInterval(time)
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
        }
      }, 1)
    }
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