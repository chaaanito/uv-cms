<script>
    import Grid from "gridjs-svelte";


    const data = [
            { name: "John", email: "john@example.com" },
            { name: "Mark", email: "mark@gmail.com" },
        ];
</script>

<div class="container">
<Grid {data} 
search
autoWidth
sort
pagination={{ enabled: true, limit: 20 }}
/>
</div>

<style>
    .container {
        margin-top: 10px;
    }
</style>