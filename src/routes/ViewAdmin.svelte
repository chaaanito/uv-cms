<script>
    import { onMount } from "svelte";
    import { pb } from "../main";
    import Quill from 'quill';
    import { fade , fly , blur} from 'svelte/transition'
    import { quintOut } from "svelte/easing";
    

    export let params = []

    let getData = async () => {
        const record = await pb.collection('concerns').getOne(params.id);
        return record
    }

    let updates = async (id) => {
        const records = await pb.collection('concern_updates').getFullList({
            sort: '-created', filter: `concern = "${id}"`
        });
        return records
    }
    
</script>


{#await getData()}
<div class="container" in:fade>
    <div class="card" aria-hidden="true">
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
      </div>
</div>
{:then data} 
<div class="container" in:fly={{ y: 100, duration: 1000 }} out:fade>
<div class="card">
    <div class="card-header">
        <h5><span class="badge text-bg-primary">main</span> {data.id}</h5>
        <div>{new Date(data.created).toLocaleDateString()}</div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{data.subject}</h5>
      <p class="card-text" id="card-text">{@html data.editor_html}</p>
    </div>
  </div>
</div>
<br>
<div class="container" in:fade>
<button class="btn btn-primary add-update" type="button" data-bs-toggle="collapse" data-bs-target="#update-from">+ Update</button>
<div class="collapse" id="update-from">
    <div class="card card-body">
      Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
    </div>
  </div>
</div>
<br>
{#await updates(data.id)}
    <div class="container" in:fade>
        <div class="card" aria-hidden="true">
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
            </div>
          </div>
    </div>
{:then items}

{#if items.length === 0}
<div class="container" in:fade={{ y: 200, duration: 1000 }} out:fade>
  <h1>No Updates yet.</h1>
</div>
  {:else}
  <div class="container" in:fade={{ y: 200, duration: 1000 }} out:fade>
    {#each items as item}
     <div class="card card-updates">
         <div class="card-header">
             <h6><span class="badge text-bg-success">Update</span> {item.id}</h6>
             <small>{Date(item.created).toLocaleString()}</small>
         </div>
         <div class="card-body">
           <p class="card-text" id="card-text">{@html item.html}</p>
         </div>
       </div>
    {/each}
 </div>
{/if}

{/await}
{/await}


<style>
    .card {
        max-width: 100%;
    }

    .card-updates {
        margin-top: 20px;
    }

    .container {
        margin-top: 20px;
    }

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .add-update {
        width: 100%;
    }
</style>