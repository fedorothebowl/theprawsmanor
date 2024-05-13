// main.js
import '../css/main.scss';
import Alpine from 'alpinejs';
import Audiolibro from './components/Audiolibro.js';
import Audio from './components/Audio.js';

import AOS from 'aos';

Alpine.data('Audiolibro', Audiolibro);
Alpine.data('Audio', Audio);
window.Alpine = Alpine;

// Alpine.start();

AOS.init();
