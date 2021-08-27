export default {
  playAudio: function (mp3src, oggsrc) {
    if (!Audio) {
      console.log('This browser does not support audio')
      return
    }
    var src = ''
    var audio = new Audio()

    if (audio.canPlayType('audio/mp3')) {
      src = mp3src || ('/audio/message_come2.mp3')
    } else if (audio.canPlayType('audio/ogg')) {
      src = oggsrc || ('/audio/message_come2.ogg')
    }

    if (!src) {
      console.log('This browser does not support mp3 or ogg')
      return
    }

    audio.src = src
    audio.play()
  }
}