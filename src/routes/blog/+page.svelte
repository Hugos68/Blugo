<script lang="ts">
	import { fade } from "svelte/transition";
    import autosize from "svelte-autosize";

    let title: string = "";
    let description: string = "";
    $: startedBlog = (title || description);

    const discardBlog = () => {
        title = "";
        description = "";
    }
</script>

<main class="flex flex-col items-center">
    <h1 class="text-4xl">Blog</h1>
    <form class="flex flex-col mt-[12.5vh] items-start w-full max-w-[min(30rem,90vw)] gap-4">
        <input class="text-lg font-semibold px-5 py-4 focus:[outline:none] max-w-[min(20rem,90vw)]" type="text" placeholder="Title" bind:value={title}>
        {#if startedBlog}
            <textarea use:autosize class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" contenteditable bind:textContent={description} placeholder="Write your blog" transition:fade />
            <div class="w-full flex justify-between">
                <button on:click={discardBlog} class="btn btn-ringed-error" transition:fade>Discard</button>
                <button type="submit" class="btn btn-ringed-success" transition:fade>Post</button>
            </div>
        {/if}
    </form>
</main>
