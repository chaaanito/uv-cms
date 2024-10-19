import './app.css'
import App from './App.svelte'
import PocketBase from 'pocketbase';

export let pb = new PocketBase('https://alpine.risk-capella.ts.net/');

// Pocketbase admin email: uv@cms.gwyn  pw: 1584652131
<<<<<<< HEAD
=======

>>>>>>> 1d15e10 (update)
const app = new App({
  target: document.getElementById('app'),
})

export default app
