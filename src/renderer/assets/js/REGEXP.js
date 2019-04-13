let reg = {}

reg.variable = /\{{2}(?!\{)\s*(.*?)\s*\}{2}/gm

reg.image = /\.(jpg|jpeg|gif|png|pneg)$/i
reg.video = /\.(mp4)$/i
reg.audio = /\.(mp3|ogg)$/i


export default reg