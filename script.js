const socket = io('http://localhost:3000')
const messagesec = document.getElementById('send-container')
const chatsec = document.querySelector('.chat-sec')
const whole = document.querySelector('.whole')
const input = document.querySelector('#input-message')
const name = prompt("Enter your name?")
appendMessage(``, 'You joined')
socket.emit('new-user', name)
socket.on('send-chat-message', data => {
    appendMessage(`${data.name}`, `${data.message}`)
})
socket.on('user-connected', name => {
    appendMessage(``, `${name} connected`)
})
socket.on('user-disconnected', name => {
    appendMessage(``, `${name} disconnected`)
})

messagesec.addEventListener("submit", e => {
    e.preventDefault()
    const message = input.value
    socket.emit('send-chat-message', message)
    input.value = ''
    const messagebox = document.createElement('div')
    messagebox.setAttribute('class', 'message-self')
    chatsec.append(messagebox)
    const small = document.createElement('small')
    small.style.opacity = ".2"
    small.style.textAlign = "left"
    small.innerText = 'You'
    messagebox.append(small)
    const messagep = document.createElement('p')
    messagep.innerText = message
    messagebox.append(messagep)
    whole.scrollTop = whole.scrollHeight

})
function appendMessage(user, message) {
    const messagebox = document.createElement('div')
    messagebox.setAttribute('class', 'message')
    chatsec.append(messagebox)
    const small = document.createElement('small')
    small.style.opacity = ".2"
    small.style.textAlign = "left"
    small.innerText = user
    messagebox.append(small)
    const messagep = document.createElement('p')
    messagep.innerText = message
    messagebox.append(messagep)
    whole.scrollTop = whole.scrollHeight

}