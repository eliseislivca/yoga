window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// Tabs
	const tabs = document.querySelectorAll('.info-header-tab');
	const info = document.querySelector('.info-header');
	const tabContents = document.querySelectorAll('.info-tabcontent');

	function toggleTabContent(index) {
		tabContents.forEach((content, i) => {
			if (i === index) {
				content.classList.remove('hide');
				content.classList.add('show');
			} else {
				content.classList.remove('show');
				content.classList.add('hide');
			}
		});
	}

	toggleTabContent(0); // Initialize first tab as active

	info.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			tabs.forEach((tab, i) => {
				if (target === tab) {
					toggleTabContent(i);
				}
			});
		}
	});

	// Modal
	const moreButtons = document.querySelectorAll('.more');
	const overlay = document.querySelector('.overlay');
	const close = document.querySelector('.popup-close');

	moreButtons.forEach(button => {
		button.addEventListener('click', function () {
			overlay.style.display = 'block';
			button.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		document.body.style.overflow = '';
	});

	// Slider
	let slideIndex = 1;
	const slides = document.querySelectorAll('.slider-item');
	const prev = document.querySelector('.prev');
	const next = document.querySelector('.next');
	const dotsWrap = document.querySelector('.slider-dots');
	const dots = document.querySelectorAll('.dot');

	function showSlides(n) {
		if (n > slides.length) slideIndex = 1;
		if (n < 1) slideIndex = slides.length;

		slides.forEach((slide) => slide.style.display = 'none');
		dots.forEach((dot) => dot.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	showSlides(slideIndex);

	const plusSlides = (n) => showSlides(slideIndex += n);
	const currentSlide = (n) => showSlides(slideIndex = n);

	prev.addEventListener('click', () => plusSlides(-1));
	next.addEventListener('click', () => plusSlides(1));

	dotsWrap.addEventListener('click', (event) => {
		dots.forEach((dot, i) => {
			if (event.target.classList.contains('dot') && event.target === dot) {
				currentSlide(i + 1);
			}
		});
	});

	// Timer
	const deadline = '2025-11-21';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const seconds = Math.floor((t / 1000) % 60);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			total: t,
			hours,
			minutes,
			seconds
		};
	}

	function setClock(id, endtime) {
		const timer = document.getElementById(id);
		const hours = timer.querySelector('.hours');
		const minutes = timer.querySelector('.minutes');
		const seconds = timer.querySelector('.seconds');
		const timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const t = getTimeRemaining(endtime);
			const addZero = (num) => num <= 9 ? '0' + num : num;

			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
	}

	setClock('timer', deadline);

	// Calculator
	const persons = document.querySelectorAll('.counter-block-input')[0];
	const restDays = document.querySelectorAll('.counter-block-input')[1];
	const place = document.getElementById('select');
	const totalValue = document.getElementById('total');
	let personsSum = 0;
	let daysSum = 0;
	let total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('change', function () {
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (restDays.value === '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('change', function () {
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (persons.value === '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value === '' || persons.value === '') {
			totalValue.innerHTML = 0;
		} else {
			const multiplier = +this.options[this.selectedIndex].value;
			totalValue.innerHTML = total * multiplier;
		}
	});
});
