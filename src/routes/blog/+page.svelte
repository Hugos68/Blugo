<script lang="ts">
    let title: string = "";
    let description: string = "";
    $: startedBlog = (title || description);

    // TODO: Only show description once title gets typed in (smooth transition in height for e.g)
</script>

<main class="flex flex-col items-center">
    <h1 class="text-4xl">Blog</h1>
    <div class="flex flex-col flex-nowrap">
        <input class="font-2xl" type="text" placeholder="Title" bind:value={title}>
    </div>
    
</main>
