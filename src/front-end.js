import simpleParallax from 'simple-parallax-js';

  /**
   * Parallax images at layer 2
   */
  var rebelParallaxBlocks = document.querySelectorAll('.wp-block-rebel-parallax-images');

  rebelParallaxBlocks.forEach((block) => {
    new simpleParallax(block.querySelector('.wp-block-image img'), {
      overflow: block.getAttribute('data-overflow'),
      scale: block.getAttribute('data-scale'),
      orientation: block.getAttribute('data-orientation'),
      delay: block.getAttribute('data-delay'),
      maxTransition: block.getAttribute('data-maxtransition')
    });
  });
