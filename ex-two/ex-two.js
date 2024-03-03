let but = document.querySelector("button")
let text = document.querySelector("p")

function getSize() {
	let size = `(сайт) Высота: ${document.documentElement.clientHeight} Ширина: ${document.documentElement.clientWidth}; 
(Девайс) Высота: ${window.screen.height} Ширина: ${window.screen.width}; 
(сайт включая прокрутку) Высота: ${window.innerHeight} Ширина: ${window.innerWidth};`
	alert(size)
	// if (!(Notification in Window)) {
	// 	text.textContent = "Не поддерживатся интерфейс уведомлений"
	// } else if (Notification.permission == "granted") {
	// 	alert(size)
	// } else if (Notification.permission == "denied") {
	// 	Notification.requestPermission().then(function(permission) {
	// 		if (permission == "granted") {
	// 			alert(size)
	// 		}
	// 	})
	// }
}

but.addEventListener("click", getSize)