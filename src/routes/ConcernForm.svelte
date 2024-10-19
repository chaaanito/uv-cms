<script>
  import { pb } from "../main";
  import { fade } from 'svelte/transition'
  import Quill from 'quill';
  import { onMount } from "svelte";
  
let user_data = JSON.parse(localStorage.getItem('user_data'))

let types = ['Registrar Office','Accounting Office','Scholarship Office', 'Guidance Office', 'Administration Office', 'IT Support', 'Teacher']

let department = user_data.record.department
let type = ''
let subject = ''
let status = ''
let editor = {}
let html = ''

let quill

onMount(() => {

    const options = {
        modules: {
            toolbar: true,
        },
        placeholder: 'Your concern details...',
        theme: 'snow'
        };

    quill = new Quill('#editor', options)

})

async function save() {
    
    editor = quill.getContents();
    html = quill.getSemanticHTML();

    const data = {
            "user": user_data.record.id,
            "department": department,
            "type": type,
            "subject": subject,
            "editor": editor,
            "editor_html": html,
            "progress": 0,
            "status" : 'ongoing'
        }

    try {

    if (type !== '' && subject !== ''){
         const record = await pb.collection('concerns').create(data);
         record ? status = 'true' : 'false'
    }else {
        status = 'false'
    }

        
    }catch(e) {
        status = e.message
    }

}

</script>

<div class="concern-form shadow row g-3" in:fade>
    <h1>+ Concern</h1>
    <div class="col-md-6 mb-3">
        <label for="type" class="form-label">Concern Type</label>
        <select id="type" class="form-select" bind:value={type}>
          {#each types as type}
          <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="department" class="form-label">Department</label>
        <input type="text" class="form-control" id="department" disabled bind:value={department}>
      </div>
      <div class="col-md-12 mb-3">
        <label for="subject" class="form-label">Subject</label>
        <input type="text" class="form-control" id="subject" bind:value={subject} required>
      </div>
      <div id="toolbar"></div>
      <div id="editor"></div>
      <br>    
      {#if  status === 'true'} 
      <div class="alert alert-success" role="alert">
        Save Success! go back to <a href="#/" class="alert-link">Dashboard</a>.
      </div>
      {:else if status === 'false'}
      <div class="alert alert-danger" role="alert">
        Please input all fields.
      </div>
      {/if}
      <br>
      <button type="submit" class="btn btn-dark btn-sm" on:click={save}>Submit</button>
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