// Signup Form.
(function() {

	// Vars.
		var $form = document.querySelectorAll('#signup-form')[0],
			$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
			$message,
			$price = {'audi': 40000, 'toyota':10000, 'bmw':45000},
			$audi_message = document.getElementById('audi'),
			$toyota_message = document.getElementById('toyota'),
			$bmw_message = document.getElementById('bmw'),
			$clicked_price,
			$clicked_car,
			$salt = "0a826b911644afd93bc23858c13e53";

	// Bail if addEventListener isn't supported.
		if (!('addEventListener' in $form))
			return;

	// Message.
		$message = document.createElement('span');
			$message.classList.add('message');
			$form.appendChild($message);

		$message._show = function(type, text) {

			$message.innerHTML = text;
			$message.classList.add(type);
			$message.classList.add('visible');

			window.setTimeout(function() {
				$message._hide();
				$message.classList.remove(type);
			}, 3000);

		};

		$message._hide = function() {
			$message.classList.remove('visible');
		};

	// Events.
	// Note: If you're *not* using AJAX, get rid of this event listener.
		$form.addEventListener('submit', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Hide message.
			$message._hide();

			// Disable submit.
			$submit.disabled = true;
			

			// Enable submit.
			$submit.disabled = false;

			if($audi_message.checked){
				$clicked_car = "audi"
				$clicked_price = $price.audi
			}else if ($toyota_message.checked){
				$clicked_car = "toyota"
				$clicked_price = $price.toyota
			}else{
				$clicked_car = "bmw"
				$clicked_price = $price.bmw
			}

			$.post("/difficult", {
				'checksum': md5($clicked_car+$clicked_price+$salt),
				'car': $clicked_car,
				'price': $clicked_price
			}, function(data){

				$message._show(data.status, data.message)
			});

		});

		$audi_message.addEventListener('click', function(event) {
			document.getElementById('price').value = $price.audi

		});
		$toyota_message.addEventListener('click', function(event) {
			document.getElementById('price').value = $price.toyota

		});
		$bmw_message.addEventListener('click', function(event) {
			document.getElementById('price').value = $price.bmw

		});

})();