<script>
  import Router from "svelte-spa-router";
  import { pb } from "./main";
  import Dashboard from "./routes/Dashboard.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Login from "./lib/Login.svelte";
  import ConcernForm from "./routes/ConcernForm.svelte";
<<<<<<< HEAD
=======
  import View from "./routes/View.svelte";
>>>>>>> 1d15e10 (update)


  let admin_routes = {
    '/' : Dashboard,
    '*' : NotFound
  }

  let student_routes = {
    '/' : Dashboard,
    '/addConcern/' : ConcernForm,
<<<<<<< HEAD
=======
    '/View/:id' : View,
>>>>>>> 1d15e10 (update)
    '*' : NotFound
  }

  let user_data = JSON.parse(localStorage.getItem('user_data'))

</script>

{#if pb.authStore.isValid}
     {#if user_data.record.type === 'admin'}
      <Navbar/>
      <Router routes = {admin_routes}/>
     {/if}
     {#if user_data.record.type === 'student'}
      <Navbar/>
      <Router routes = {student_routes}/>
     {/if}
    {:else}
    <Login/>
{/if}
