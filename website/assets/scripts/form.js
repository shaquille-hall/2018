ContactForm = {
	loaded: false,
	init: function() {
		this.readyModal();
	},

	readyModal: function() {
		var self = this;		
	    var contactModal = document.getElementById("contactModal");
	    $('.errors').hide();
	    $('input[type="text"]').addClass("textInput");
	    $(".contactFormButton").click(self.openContactForm(contactModal));
	    $("#contactFormCloseButton").click(function() {
	        self.closeContactForm();
	        self.clearFormInput();

	    });

	    window.onclick = function(event) {
	        if (event.target == contactModal) {
	            self.closeContactForm();
	            self.clearFormInput();
	        }
	    }
	    
	    $(".submitButton").click(function() { self.submitButtonClicked() });
	},

	openContactForm: function(contactForm) {		
		return function() {			
			contactForm.style.display = "block";	     
	     	$('.body').addClass("stopScroll");
		};
	},

	closeContactForm: function() {		
	    document.getElementById('contactModal').style.display = "none";
	    $('.body').removeClass("stopScroll");	    
	},

	clearFormInput: function() {
	    $("input[name='name']").val("");
	    $("input[name='email']").val("");
	    $("textarea[name='textarea']").val("");
	},

	submitButtonClicked: function() {		
		this.validateFormData();
	},

	validateFormData: function() {
		var self = this;		
		var name = $("input[name='name']").val();
		var email = $("input[name='email']").val();
		var content = $("textarea[name='textarea']").val();

		if (this.validateName(name) && this.validateEmail(email) && this.validateMessage(content)) {
			self.closeContactForm();
				var data = {
				names: name,
				email: email,
				message: content
			};

			self.sendFormData(data);
		} else {
			$(".errors").show();
		}
		this.clearFormInput();	
	},

	validateName: function(name) {		
		var validName = true; 
		//console.log("stuff = ", (/^[A-Za-z\s]+$/.test(name)) );
		if (name == null || name == "") {
			$("input[name='name']").addClass('error');
			validName = false;
		} else if (!(/^[A-Za-z\s]+$/.test(name))) {

			$("input[name='name']").addClass('error');
		 	validName = false;
		 } else {
			if($("input[name='name']").hasClass('error')) {
				$("input[name='name']").removeClass('error');
				validName = true;
			}
		}
		return validName;
	},

	 validateEmail: function(email) {	 	
		var validEmail = true;
		if (email == null || email == "") {
			$("input[name='email']").addClass('error');
			validEmail = false;
		} else if (email.indexOf("@") != -1 && email.indexOf(".") != -1) {
			var atPos = email.indexOf("@");
			var dotPos = email.indexOf(".");
			if (email.indexOf("@") == 0 || email.indexOf(".") <= email.indexOf("@") + 1) {
				validEmail = false;
				$("input[name='email']").addClass('error');
			} 
		 	else {
				if($("input[name='email']").hasClass('error')) {
					$("input[name='email']").removeClass('error');
					validEmail = true
				}
			}
		}
		return validEmail;  
	},

	validateMessage: function(message) {
		var validMessage = true;
		if ($.trim(message) == null || $.trim(message).length == 0) {
			$("textarea").addClass('error');
			validMessage = false;
		} else {
			if($("textarea").hasClass('error')) {
				$("textarea").removeClass('error');
				validMessage = true
			}
		}
		return validMessage;
	},

	sendFormData: function(formData) {
		$.ajax({
			type: 'POST',
			url: 'assets/scripts/email.php',
			data: formData,
			success: function() {
				alert('Your email was successfully sent.'); 
			},
			error: function() {
				alert('There was an issue. Your email was not sent.');
			}
		});
	}

}


