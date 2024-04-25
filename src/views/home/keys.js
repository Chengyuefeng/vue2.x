export default (ctx) => ({
  q: {
    audio: require('@/assets/musics/clay.mp3'),
  },
  w: {
    audio: require('@/assets/musics/confetti.mp3'),
  },
  e: {
    audio: require('@/assets/musics/corona.mp3'),
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
    audio: require('@/assets/musics/dotted-spiral.mp3'),
  },
  y: {
    audio: require('@/assets/musics/flash-1.mp3'),
  },
  u: {
    audio: require('@/assets/musics/flash-2.mp3'),
  },
  i: {
    audio: require('@/assets/musics/flash-3.mp3'),
  },
  o: {
    audio: require('@/assets/musics/glimmer.mp3'),
  },
  p: {
    audio: require('@/assets/musics/moon.mp3'),
  },
  a: {
    audio: require('@/assets/musics/pinwheel.mp3'),
  },
  s: {
    audio: require('@/assets/musics/piston-1.mp3'),
  },
  d: {
    audio: require('@/assets/musics/piston-2.mp3'),
  },
  f: {
    audio: require('@/assets/musics/piston-3.mp3'),
  },
  g: {
    audio: require('@/assets/musics/prism-1.mp3'),
  },
  h: {
    audio: require('@/assets/musics/prism-2.mp3'),
  },
  j: {
    audio: require('@/assets/musics/prism-3.mp3'),
  },
  k: {
    audio: require('@/assets/musics/splits.mp3'),
  },
  l: {
    audio: require('@/assets/musics/squiggle.mp3'),
  },
  z: {
    audio: require('@/assets/musics/strike.mp3'),
  },
  x: {
    audio: require('@/assets/musics/suspension.mp3'),
  },
  c: {
    audio: require('@/assets/musics/timer.mp3'),
  },
  v: {
    audio: require('@/assets/musics/ufo.mp3'),
  },
  b: {
    audio: require('@/assets/musics/veil.mp3'),
  },
  n: {
    audio: require('@/assets/musics/wipe.mp3'),
  },
  m: {
    audio: require('@/assets/musics/zig-zag.mp3'),
  }
})