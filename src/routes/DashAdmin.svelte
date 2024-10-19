<script>
    import { Grid , h , html} from "gridjs";
  import { onMount } from "svelte";
  import { pb } from "../main";
  import { fade } from 'svelte/transition'

onMount(async () => {
    let user_data = JSON.parse(localStorage.getItem('user_data'))
    let table =  new Grid({
            columns: [{name: 'ID', hidden: true},'Department', 'Type','Subject',
                                                    { 
                                                        name: 'Progress',
                                                        formatter: (_, row) => html(`
                                                        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${row.cells[4].data}" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar" style="width: ${row.cells[4].data}%">${row.cells[4].data}%</div>
                                                        </div>`)
                                                    },
                                                    { 
                                                        name: 'Status',
                                                        formatter: (cell, row) => {
                                                        return h('span', {
                                                            className: row.cells[5].data === 'ongoing' ? 'badge text-bg-dark' : 'badge text-bg-success',
                                                        }, row.cells[5].data);
                                                        }
                                                    },{ 
                                                name: 'Actions',
                                                columns: [{
                                                name: 'View',
                                                formatter: (cell, row) => {
                                                return h('a', {
                                                    className: 'btn btn-warning btn-sm',
                                                    href: `#/View/${row.cells[0].data}`
                                                }, 'View');
                                                }},{
                                                name: 'Delete',
                                                formatter: (cell, row) => {
                                                return h('a', {
                                                    className: 'btn btn-danger btn-sm',
                                                    onclick:  async () => {
                                                        let updates = await pb.collection('concern_updates').getFullList({filter: `concern = '${row.cells[0].data}'`})
                                                        if (updates.length > 0){
                                                            alert('Has child updates cannot delete')
                                                        }else {
                                                            await pb.collection('concerns').delete(row.cells[0].data);
                                                            alert('Delete success!')
                                                        }
                                                       
                                                        table.updateConfig({
                                                                    data: await pb.collection('concerns').getFullList({sort: '-created', filter: `user = '${user_data.record.id}'`})
                                                                }).forceRender();
                                                    }
                                                }, 'Delete');
                                                }}
                                            ]
                                            },{ 
                                                name: 'Created',
                                                formatter: (cell) => `${new Date(cell).toLocaleDateString()}`
                                            },],
            data: await pb.collection('concerns').getFullList({sort: `-created`})
            });

        table.render(document.getElementById('grid-container'))
})
   
</script>

<div in:fade>
<div class="container">
    <div id="grid-container"></div>
</div>
</div>
