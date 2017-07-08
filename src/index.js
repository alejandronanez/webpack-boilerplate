// Entry point for the bundle

import { foo } from 'foo';
import 'styles/app.scss';

const h1Element = document.querySelector('#app h1');
h1Element.innerHTML = foo('I come from js');
