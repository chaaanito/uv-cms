<script>
  import { onMount } from "svelte";
  import { pb } from "../main";

  let username
  let password
  let status = ''

  let login = async () => {

    try {
        const authData = await pb.collection('users').authWithPassword(username,password);
        localStorage.setItem('user_data', JSON.stringify(authData))

        pb.authStore.isValid ? window.location.reload() : pb.authStore.clear()

    }catch(err) {
        status = err.message
    }
  }

  onMount(() => {
    document.getElementById('password').addEventListener('keydown', (e) => {
      e.key === 'Enter' ? login() : ''
    })
  })

</script>

<div class="login-form">
    <h1>Login.</h1>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="username" bind:value={username}>
        <label for="username">Username / E - mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" bind:value={password}>
        <label for="password">Password</label>
      </div>
      <br>
      <div class="status">{status}</div>
      <br>
      <button class="btn btn-dark shadow btn-sm" on:click={login}>Login</button>
</div>

<style>
    .login-form {
        max-width: 400px;
        padding: 20px;
        border-radius: 20px;
        margin: 10% auto;
    }

    .status {
        color: red;
        font-size: 12px;
    }
</style>