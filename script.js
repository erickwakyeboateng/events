document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;

    // Show the first image initially
    images[currentIndex].classList.add('active');

    // Function to change the image
    function changeImage() {
        // Hide the current image
        images[currentIndex].classList.remove('active');

        // Move to the next image
        currentIndex = (currentIndex + 1) % images.length;

        // Show the next image
        images[currentIndex].classList.add('active');
    }

    // Change image every 5 seconds (5000 milliseconds)
    setInterval(changeImage, 5000);

    const leadershipBtn = document.getElementById('leadership-btn');
    const adultBtn = document.getElementById('adult-btn');
    const generalBtn = document.getElementById('general-btn');
    const message = document.getElementById('message');
    const countdownElement = document.getElementById('countdown');
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Initialize the background music
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.5; // Set volume to a reasonable level

    // Event times in milliseconds
    const leadershipTime = new Date('September 28, 2024 10:00:00').getTime();
    const adultTime = new Date('September 28, 2024 12:00:00').getTime();
    const countdownResumeTime = new Date('September 28, 2024 15:00:00').getTime();
    const generalTime = new Date('September 29, 2024 10:00:00').getTime();

    // Update every second
    const updateUI = setInterval(function() {
        const now = new Date().getTime();

        // Countdown to Leadership Training Program
        if (now < leadershipTime) {
            countdownElement.style.display = 'flex'; // Show countdown
            leadershipBtn.style.display = 'none';
            message.textContent = 'Counting down to the Leadership Training Program';
            showCountdown(leadershipTime);

            // Play music when countdown is active, but only if it's not already playing
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.log("Playback prevented:", error);
                });
            }
        }

        // At Leadership Time, show Leadership button
        else if (now >= leadershipTime && now < adultTime) {
            countdownElement.style.display = 'none'; // Hide countdown
            leadershipBtn.style.display = 'block'; // Show Leadership button
            message.textContent = 'Download Leadership Training Program';
            backgroundMusic.pause(); // Pause music when countdown is not active
        }

        // At Adult Time, show Adult Session Program button
        else if (now >= adultTime && now < countdownResumeTime) {
            leadershipBtn.style.display = 'none'; // Hide Leadership button
            adultBtn.style.display = 'block'; // Show Adult button
            message.textContent = 'Download Adult Session Program';
            backgroundMusic.pause(); // Pause music when countdown is not active
        }

        // At Countdown Resume Time, show countdown for General Sunday Session
        else if (now >= countdownResumeTime && now < generalTime) {
            adultBtn.style.display = 'none'; // Hide Adult button
            countdownElement.style.display = 'flex'; // Show countdown again
            message.textContent = 'Countdown to General Sunday Session';
            showCountdown(generalTime);

            // Play music when countdown is active, but only if it's not already playing
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.log("Playback prevented:", error);
                });
            }
        }

        // At General Time, show General Sunday Session button
        else if (now >= generalTime) {
            countdownElement.style.display = 'none'; // Hide countdown
            generalBtn.style.display = 'block'; // Show General Session button
            message.textContent = 'Download General Sunday Session Program';
            clearInterval(updateUI); // Stop the interval once the final button is displayed
            backgroundMusic.pause(); // Pause music when countdown ends
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

            // Update countdown display
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


document.getElementById('play-music').addEventListener('click', function() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play().catch(error => {
        console.log("Playback prevented:", error);
    });
});
