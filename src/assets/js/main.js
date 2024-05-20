// main.js
import '../css/main.scss';
import Alpine from 'alpinejs';
import Audiolibro from './components/Audiolibro.js';
import Audio from './components/Audio.js';
import Gsap from './components/Gsap.js';


Alpine.data('Audiolibro', Audiolibro);
Alpine.data('Audio', Audio);
Alpine.data('Gsap', Gsap);
window.Alpine = Alpine;

// Alpine.start();

