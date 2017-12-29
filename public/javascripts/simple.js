// Signup Form.
(function() {

	// Vars.
		var $form = document.querySelectorAll('#signup-form')[0],
			$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
			$message;

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

			$.post("/simple", $( "#signup-form" ).serialize(), function(data){
				$message._show(data.status, data.message)
			});

		});

})();