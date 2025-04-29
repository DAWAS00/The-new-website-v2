document.addEventListener('DOMContentLoaded', function() {
    const myCarousel = document.getElementById('carouselExampleCaptions');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000,  // Changes slide every 3 seconds
        ride: 'carousel',  // Starts sliding automatically
        wrap: true,  // Continues from last to first slide
        pause: 'hover'  // Pauses on mouse hover
    });
});