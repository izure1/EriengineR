let reg = {}

reg.variable = /\{{2}(?!\{)\s*(.*?)\s*\}{2}/gm

reg.image = /\.(jpg|jpeg|gif|png|pneg)$/i
reg.video = /\.(mp4|webm)$/i
reg.audio = /\.(mp3|ogg)$/i
reg.media = /\.(mp3|ogg|mp4|webm)$/i


export default reg