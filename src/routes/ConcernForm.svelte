<script>
  import { pb } from "../main";
  import { fade } from 'svelte/transition'
  import Quill from 'quill';
  import { onMount } from "svelte";
  
let user_data = JSON.parse(localStorage.getItem('user_data'))

let types = ['Accounting','Teacher','Admin']

let department = ''
let type = ''
let status = ''
let editor = {}



onMount(() => {

    const options = {
        modules: {
            toolbar: true,
        },
        placeholder: 'Your concern details...',
        theme: 'snow'
        };

    const quill = new Quill('#editor', options)

})

async function save() {
    
    editor = quill.getContents();

    const data = {
            "user": user_data.record.id,
            "department": department,
            "type": type,
            "editor": text,
        }

    try {

    const record = await pb.collection('concerns').create(data);

    }catch(e) {
        status = e.message
    }

}


</script>

<div class="concern-form shadow row g-3" in:fade>
    <h1>+ Concern</h1>
    <div class="col-md-6 mb-3">
        <label for="type" class="form-label">Concern Type</label>
        <select id="type" class="form-select">
          {#each types as type}
          <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="department" class="form-label">Department</label>
        <input type="text" class="form-control" id="department" disabled bind:value={user_data.record.department}>
      </div>
      
      <div id="toolbar"></div>
      <div id="editor"></div>
      <br>
      <div class="status">{status}</div>
      <br>
      <button class="btn btn-dark btn-sm" on:click={save}>Submit</button>
</div>

<style>


    h1 {
        text-align: right;
    }

    .concern-form {
        max-width: 700px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 20px;
        margin-top: 10px;
    }

    #editor {
        border: 1px solid;
    }
</style>