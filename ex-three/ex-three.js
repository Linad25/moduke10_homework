let butGeo = document.querySelector(".conthead__geo")
let butSend = document.querySelector(".conthead__send")
let input = document.querySelector(".conthead__message")
let messages = document.querySelector(".messages")
let notifyGeo = document.querySelector(".cont__notify-geo")
let notifyServ = document.querySelector(".cont__notify-serv")

function writeOutputMessage(contentText, boolean) {
	let contentHtml = `<div class="${boolean ? "messages__own message" : "messages__server message"}">${contentText}</div>`
	messages.innerHTML += contentHtml
}

function geoPosition() {
	

	let divGeo = document.createElement("div")
	divGeo.setAttribute("class", "messages__geo message")

	if("geolocation" in navigator) {
		let Options = {
			enableHighAccuracy: true
		}

		function locationSucces(data) {
			let link = `https://www.openstreetmap.org/#map=18/${data.coords.longitude}/${data.coords.latitude}`
			divGeo.innerHTML = `<a href="${link}">Гео-локация</a>`
			messages.appendChild(divGeo)
		}
		
		function locationError() {
			notifyGeo.textContent = `Ошибка получения гео-позиции`
		}

		navigator.geolocation.getCurrentPosition(locationSucces, locationError, Options)
	} else {
		notifyGeo.textContent = `В вашем браузере не поддерживается функция Геолокации`
	}

}

butGeo.addEventListener("click", geoPosition) 

server = new WebSocket("wss://ws.ifelse.io/")

server.onopen = () => notifyServ.textContent = 'Соединение установлено'
	
server.onerror = () => notifyServ.textContent = 'Ошибка соединения'

server.onclose = () => notifyServ.textContent = 'Соединение сброшено'

function sendMessage() {
	if (!input.value) return;
	writeOutputMessage(input.value, true)
	server.send(input.value)
	server.onmessage = function(event) {
		writeOutputMessage(event.data, false)
	}
}

butSend.addEventListener("click", sendMessage)
