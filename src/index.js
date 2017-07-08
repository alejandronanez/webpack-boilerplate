// Entry point for the bundle

import { foo } from 'foo';
import 'styles/app.scss';

document
    .querySelector('#app')
    .innerHTML = foo(`I come from JS`);
