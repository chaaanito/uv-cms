<script>
  import Router from "svelte-spa-router";
  import { pb } from "./main";
  import Dashboard from "./routes/Dashboard.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Login from "./lib/Login.svelte";
  import ConcernForm from "./routes/ConcernForm.svelte";


  let admin_routes = {
    '/' : Dashboard,
    '*' : NotFound
  }

  let student_routes = {
    '/' : Dashboard,
    '/addConcern' : ConcernForm,
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
