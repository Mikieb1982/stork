document.addEventListener('DOMContentLoaded', function() {
    addRippleEffect();
    changeBackgroundColor();
    addMorphingContent();
    addFluidContentRearrangement();
    addCursorTrails();
    addSoundCues();
});

function addRippleEffect() {
    const rippleEffects = document.querySelectorAll('.ripple-effect');
    rippleEffects.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600); // Match the animation duration
        });
    });
}

function changeBackgroundColor() {
    const body = document.body;
    body.addEventListener('click', function() {
        const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        body.style.backgroundColor = randomColor;
    });
}

function addMorphingContent(){
    const blogTeasers = document.querySelectorAll('.blog-teaser');
    const morphingSound = document.getElementById('morphingSound');
    blogTeasers.forEach(teaser => {
        teaser.addEventListener('click', function() {
            // In a real scenario, you would load the blog post content here
            console.log("Morphing content for blog teaser");
            morphingSound.currentTime = 0;
            morphingSound.play();
            // Example: Morphing the teaser to reveal the blog content
            this.style.transition = "transform 0.5s ease-out";
            this.style.transform = "scale(0.95)"; // Slight scale down

            // Simulate content loading
            setTimeout(() => {
                this.style.transform = "scale(1)";
                // Load and display blog post content here
            }, 500); // Match the transition time
        });
    });
}

function addFluidContentRearrangement() {
    const dynamicSections = document.querySelectorAll('.dynamic-section');
    dynamicSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            const randomRotation = Math.random() * 10 - 5; // -5 to 5

            section.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            section.style.zIndex = "10";
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translate(0, 0) rotate(0)';
            section.style.zIndex = "1";
        });
    });

    // Content-Aware Interaction
    const images = document.querySelectorAll('.dynamic-section img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            // Find nearby text elements (e.g., p elements)
            const textElements = this.closest('.dynamic-section').querySelectorAll('p');
            textElements.forEach(text => {
                // Apply a translation to move the text away from the image
                text.style.transition = "transform 0.3s ease";
                text.style.transform = "translateX(15px)"; // Move text to the right
            });
        });

        img.addEventListener('mouseleave', function() {
            // Reset the text positions
            const textElements = this.closest('.dynamic-section').querySelectorAll('p');
            textElements.forEach(text => {
                text.style.transform = "translateX(0)"; // Reset to original position
            });
        });
    });
}

function addCursorTrails() {
    const body = document.body;
    let previousTrailColor = '#00d9d9';

    body.addEventListener('mousemove', function(e) {
        const trail = document.createElement('span');
        trail.classList.add('trail');
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;

        // Synesthetic Effect: Map the color to a frequency value
        let trailColor = previousTrailColor;
        const hsv = rgbToHsv(trailColor);
        const hue = hsv.h;
        const frequency = 100 + (hue / 360) * 300;

        trail.style.backgroundColor = trailColor;

        trail.addEventListener('transitionend', () => {
            trail.remove();
        });

        body.appendChild(trail);

        // Check for collisions and update trail color
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        let collided = false;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element !== body && element !== trail) {
                collided = true;
                break;
            }
        }
        if (collided) {
            trailColor = '#ccff00';
            trail.style.backgroundColor = trailColor;
        } else{
            trailColor = previousTrailColor;
            trail.style.backgroundColor = trailColor;
        }
        previousTrailColor = trailColor;
    });
}

function addSoundCues() {
    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');

    const dynamicSections = document.querySelectorAll('.dynamic-section');

    dynamicSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
        section.addEventListener('mouseleave', () => {
        });
    });

    const rippleEffects = document.querySelectorAll('.ripple-effect');
    rippleEffects.forEach(element => {
        element.addEventListener('click', (e) => {
            const trail = document.querySelector(".trail");
            const trailColor = trail.style.backgroundColor;

            const hsv = rgbToHsv(trailColor);
            const hue = hsv.h;

            const frequency = 100 + (hue / 360) * 300;
            const playbackRate = 0.5 + (frequency / 400);
            clickSound.playbackRate = playbackRate;
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
}
function rgbToHsv(rgbColor) {
  // Split the RGB color string into its components
  const rgbValues = rgbColor.match(/\d+/g);

  // Check if the color is valid
  if (!rgbValues || rgbValues.length !== 3) {
    return {h: 0, s: 0, v: 0};
  }
  const r = parseInt(rgbValues[0]) / 255;
  const g = parseInt(rgbValues[1]) / 255;
  const b = parseInt(rgbValues[2]) / 255;

  // Find the maximum and minimum values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate the hue
  let h;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / (max - min)) % 360;
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120;
  } else {
    h = 60 * ((r - g) / (max - min)) + 240;
  }

  // Ensure hue is positive
  if (h < 0) {
    h += 360;
  }

  // Calculate the saturation
  const s = max === 0 ? 0 : (max - min) / max;

  // Calculate the value
  const v = max;

  return { h: Math.round(h), s: s, v: v };
}
