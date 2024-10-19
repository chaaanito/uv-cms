<script>
  import Router from "svelte-spa-router";
  import { pb } from "./main";
  import Dashboard from "./routes/Dashboard.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Login from "./lib/Login.svelte";
  import ConcernForm from "./routes/ConcernForm.svelte";
  import View from "./routes/View.svelte";
    import NavAdmin from "./lib/NavAdmin.svelte";
    import DashAdmin from "./routes/DashAdmin.svelte";
    import ViewAdmin from "./routes/ViewAdmin.svelte";


  let admin_routes = {
    '/' : DashAdmin,
    '/View/:id' : ViewAdmin,
    '*' : NotFound
  }

  let student_routes = {
    '/' : Dashboard,
    '/addConcern/' : ConcernForm,
    '/View/:id' : View,
    '*' : NotFound
  }

  let user_data = JSON.parse(localStorage.getItem('user_data'))

</script>

{#if pb.authStore.isValid}
     {#if user_data.record.type === 'admin'}
      <NavAdmin/>
      <Router routes = {admin_routes}/>
     {/if}
     {#if user_data.record.type === 'student'}
      <Navbar/>
      <Router routes = {student_routes}/>
     {/if}
    {:else}
    <Login/>
{/if}
