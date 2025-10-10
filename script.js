document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;

    // Show the first image initially
    images[currentIndex].classList.add('active');

    // Function to change the image
    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Change image every 5 seconds
    setInterval(changeImage, 5000);

    // DOM elements
    const priesthoodBtn = document.getElementById('leadership-btn');
    const adultBtn = document.getElementById('adult-btn');
    const generalBtn = document.getElementById('general-btn');
    const message = document.getElementById('message');
    const countdownElement = document.getElementById('countdown');
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Background music
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.2;

    // Event times
    const priesthoodTime = new Date('Oct 10, 2025 13:50:00').getTime();
    const adultTime = new Date('Oct 10, 2025 13:52:00').getTime();
    const countdownResumeTime = new Date('Oct 10, 2025 13:53:00').getTime();
    const generalTime = new Date('Oct 10, 2025 13:54:00').getTime();

    // UI update every second
    const updateUI = setInterval(function () {
        const now = new Date().getTime();

        // Countdown to Priesthood Session
        if (now < priesthoodTime) {
            countdownElement.style.display = 'flex';
            priesthoodBtn.style.display = 'none';
            message.textContent = 'PRIESTHOOD SESSION PROGRAM AVAILABLE SOON';
            showCountdown(priesthoodTime);

            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.log("Playback prevented:", error);
                });
            }
        }

        // Show Priesthood Session Program
        else if (now >= priesthoodTime && now < adultTime) {
            countdownElement.style.display = 'none';
            priesthoodBtn.style.display = 'block';
            message.textContent = 'Download Program';
            backgroundMusic.pause();
        }

        // Show Adult Session Program
        else if (now >= adultTime && now < countdownResumeTime) {
            priesthoodBtn.style.display = 'none';
            adultBtn.style.display = 'block';
            message.textContent = 'Download Program';
            backgroundMusic.pause();
        }

        // Resume countdown to General Sunday Session
        else if (now >= countdownResumeTime && now < generalTime) {
            adultBtn.style.display = 'none';
            countdownElement.style.display = 'flex';
            message.textContent = 'SUNDAY SESSION PROGRAM AVAILABLE SOON';
            showCountdown(generalTime);

            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.log("Playback prevented:", error);
                });
            }
        }

        // Show General Sunday Session Program
        else if (now >= generalTime) {
            countdownElement.style.display = 'none';
            generalBtn.style.display = 'block';
            message.textContent = 'Download Program';
            clearInterval(updateUI);
            backgroundMusic.pause();
        }
    }, 1000);

    // Countdown function
    function showCountdown(endTime) {
        const now = new Date().getTime();
        const timeRemaining = endTime - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            daysElement.innerText = days;
            hoursElement.innerText = hours;
            minutesElement.innerText = minutes;
            secondsElement.innerText = seconds;
        } else {
            daysElement.innerText = 0;
            hoursElement.innerText = 0;
            minutesElement.innerText = 0;
            secondsElement.innerText = 0;
        }
    }
});

// Manual music trigger
document.getElementById('play-music').addEventListener('click', function () {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play().catch(error => {
        console.log("Playback prevented:", error);
    });
});
