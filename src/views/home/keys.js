export default (ctx) => ({
  q: {
    audio: require('@/assets/musics/clay.mp3'),
    canvasDraw(canvas) {
      const circleX = ctx.pataTapWidth / 2
      const circleY = ctx.pataTapHeight / 2
      const R = ctx.pataTapHeight / 3
      const fillColor = [
        'rgba(255, 74, 63, 0.6)',
        'rgba(255, 74, 63, 0.2)',
        'rgba(255, 74, 63, 0.8)',
        'rgba(255, 74, 63, 0.4)',
        'rgba(255, 74, 63, 1)'
      ]
      let step = 0
      let translate = 0
      let globalAlpha = 1
      let rotate = Math.ceil(Math.random() * 360)

      canvas.save()
      // 移动坐标系统到半圆的中心
      canvas.translate(circleX, circleY)
      // 旋转90度
      canvas.rotate(rotate * Math.PI / 180)
      // 回到半圆的中心左边的位置
      canvas.translate(-circleX, -circleY)

      const time = setInterval(() => {
        if (step < fillColor.length) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)

          canvas.beginPath()
          canvas.fillStyle = fillColor[Math.floor(step)]
          canvas.arc(circleX, circleY, R, 0, Math.PI * 2)
          canvas.fill()

          step += 0.2
        } else if (step < 20) {
          step += 0.5
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          canvas.beginPath()
          canvas.fillStyle = fillColor.at(-1)
          canvas.arc(circleX, circleY, R, 0, Math.PI * 2)
          canvas.fill()
        } else if (step < 40) {
          step++
          translate += 7
          globalAlpha -= 0.06

          canvas.globalAlpha = globalAlpha

          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)

          canvas.save()
          canvas.beginPath()
          canvas.fillStyle = fillColor.at(-1)
          canvas.translate(0, translate)
          canvas.arc(circleX, circleY, R, 0, Math.PI)
          canvas.fill()
          canvas.restore()

          canvas.save()
          canvas.beginPath()
          canvas.translate(0, -translate)
          canvas.arc(circleX, circleY, R, 0, Math.PI, true)
          canvas.fill()
          canvas.restore()
        } else {
          canvas.restore()
          clearInterval(time)
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          rotate = null
        }
      }, 10)
    }
  },
  w: {
    audio: require('@/assets/musics/confetti.mp3'),
    canvasDraw(canvas) {
      let step = 0
      const globalAlpha = [1, 0, 1, 0, 1]

      canvas.save()
      canvas.fillStyle = '#000000'

      const time = setInterval(() => {
        if (step < globalAlpha.length) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)

          canvas.globalAlpha = globalAlpha[step]
          canvas.fillRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          step ++
        } else {
          clearInterval(time)
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          canvas.restore()
        }
      }, 40)
    }
  },
  e: {
    audio: require('@/assets/musics/corona.mp3'),
    canvasDraw(canvas) {
      let type = Math.ceil(Math.random() * 10) % 2 ? 'toLeft' : 'toRight'
      let width = 0
      const startX = type === 'toRight' ? ctx.pataTapWidth * 0.1 : ctx.pataTapWidth * 0.9
      const startY = (ctx.pataTapHeight - ctx.pataTapHeight * 0.25) / 2

      canvas.save()
      const time = setInterval(() => {
        if (Math.abs(width) < ctx.pataTapWidth * 0.8) {
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)

          if (type === 'toRight') {
            width += 25
          } else {
            width -= 25
          }

          canvas.beginPath()
          canvas.fillStyle = '#FFF'
          canvas.globalAlpha = 1
          canvas.fillRect(startX, startY, width, ctx.pataTapHeight * 0.25)
        } else {
          clearInterval(time)
          canvas.clearRect(0, 0, ctx.pataTapWidth, ctx.pataTapHeight)
          canvas.restore()
        }
      }, 1)
    }
  },
  r: {
    audio: require('@/assets/musics/bubbles.mp3')
  },
  t: {
    audio: require('@/assets/musics/dotted-spiral.mp3')
  },
  y: {
    audio: require('@/assets/musics/flash-1.mp3')
  },
  u: {
    audio: require('@/assets/musics/flash-2.mp3')
  },
  i: {
    audio: require('@/assets/musics/flash-3.mp3')
  },
  o: {
    audio: require('@/assets/musics/glimmer.mp3')
  },
  p: {
    audio: require('@/assets/musics/moon.mp3')
  },
  a: {
    audio: require('@/assets/musics/pinwheel.mp3')
  },
  s: {
    audio: require('@/assets/musics/piston-1.mp3')
  },
  d: {
    audio: require('@/assets/musics/piston-2.mp3')
  },
  f: {
    audio: require('@/assets/musics/piston-3.mp3')
  },
  g: {
    audio: require('@/assets/musics/prism-1.mp3')
  },
  h: {
    audio: require('@/assets/musics/prism-2.mp3')
  },
  j: {
    audio: require('@/assets/musics/prism-3.mp3')
  },
  k: {
    audio: require('@/assets/musics/splits.mp3')
  },
  l: {
    audio: require('@/assets/musics/squiggle.mp3')
  },
  z: {
    audio: require('@/assets/musics/strike.mp3')
  },
  x: {
    audio: require('@/assets/musics/suspension.mp3')
  },
  c: {
    audio: require('@/assets/musics/timer.mp3')
  },
  v: {
    audio: require('@/assets/musics/ufo.mp3')
  },
  b: {
    audio: require('@/assets/musics/veil.mp3')
  },
  n: {
    audio: require('@/assets/musics/wipe.mp3')
  },
  m: {
    audio: require('@/assets/musics/zig-zag.mp3')
  }
})
