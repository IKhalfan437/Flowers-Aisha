// Select the flower container
const flower = document.querySelector('.flower');

// Function to make the flower grow and shrink
function animateFlower() {
    flower.style.transform = 'scale(1.2)';
    setTimeout(() => {
        flower.style.transform = 'scale(1)';
    }, 500); // Reset after 0.5 seconds
}

// Function to change the flower's color randomly
function changeFlowerColor() {
    const petals = document.querySelectorAll('.petal');
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    petals.forEach(petal => {
        petal.style.backgroundColor = randomColor;
    });
}

// Function to add a new petal to the flower
function addPetal() {
    const petalsContainer = document.querySelector('.petals');
    const newPetal = document.createElement('div');
    newPetal.classList.add('petal');
    petalsContainer.appendChild(newPetal);

    // Update the rotation of all petals
    const petals = document.querySelectorAll('.petal');
    const angle = 360 / petals.length;
    petals.forEach((petal, index) => {
        petal.style.transform = `rotate(${angle * index}deg) translateY(-20px)`;
    });
}

// Event Listeners
flower.addEventListener('click', animateFlower); // Grow and shrink on click
flower.addEventListener('dblclick', changeFlowerColor); // Change color on double-click
flower.addEventListener('mouseenter', () => {
    flower.style.cursor = 'pointer'; // Change cursor on hover
});

// Add a new petal every 3 seconds (for demonstration)
setInterval(addPetal, 3000);
