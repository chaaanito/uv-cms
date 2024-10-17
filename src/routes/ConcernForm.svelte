<script>
  import { pb } from "../main";
  import { fade } from 'svelte/transition'

let types = ['Accounting','Teacher','Admin']
</script>

<div class="concern-form shadow" in:fade>
    <h1>+ Concern</h1>
    <div class="col-md-6 mb-3">
        <label for="type" class="form-label">Concern Type</label>
        <select id="type" class="form-select">
          {#each types as type}
          <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
      <div class="col-md-12 mb-3">
        <label for="concern" class="form-label">Concern Details</label>
        <textarea class="form-control" id="concern" rows="10"></textarea>
      </div>
      <button class="btn btn-dark btn-sm">Submit</button>
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
</style>