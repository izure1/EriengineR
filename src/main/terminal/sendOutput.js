export default function sendOutput(e, msg) {

  e.sender.send('send-output', msg)

}