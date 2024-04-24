export default (ctx) => ({
  q: {
    audio: require('@/assets/musics/clay.mp3'),
  },
  w: {

  },
  e: {

  },
  r: {
    audio: require('@/assets/musics/bubbles.mp3'),
    canvasDraw(canvas) {
      let type = Math.ceil(Math.random() * 10) % 2 ? 'toLeft' : 'toRight'
      let width = 0
      const startX = type === 'toRight' ? ctx.pataTapWidth * .1 : ctx.pataTapWidth * .9
      const startY = (ctx.pataTapHeight -  ctx.pataTapHeight * .25) / 2
      
      canvas.fillStyle = '#FFF'
      const time = setInterval(() => {
        if (Math.abs(width) < ctx.pataTapWidth * .8) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          if (type === 'toRight') {
            width += 25
          } else {
            width -= 25
          }
          canvas.fillRect(startX, startY, width,  ctx.pataTapHeight * .25)
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