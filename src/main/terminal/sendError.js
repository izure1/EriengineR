export default function sendError(e, msg) {

  e.sender.send('send-error', msg)
  
}