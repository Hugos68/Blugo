<script lang="ts">
	import { fade } from "svelte/transition";
    import autosize from "svelte-autosize";
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import type { PageData } from "./$types";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { invalidateAll } from "$app/navigation";
    import Post from "$lib/components/Post.svelte";

    export let data: PageData;

    $: posts = data.posts as Post[] || [] as Post[];

    let title: string = "";
    let body: string = "";
    $: startedBlog = (title || body);

    const discardBlog = () => {
        title = "";
        body = "";
    }

    const postBlog: SubmitFunction = () => {
        return async ({result}) => {        
            await applyAction(result);
            if (result.type==='success') {
                await invalidateAll();
                const t: ToastSettings = {
                    message: 'Success! Posted new blog',
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'success',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3500,
                };
                toastStore.trigger(t);
            }
            else if (result.type==='failure') {      
                const t: ToastSettings = {
                    message: result.data?.message,
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'error',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3500,
                };
                toastStore.trigger(t);
            }
        }
    }
</script>

<main class="flex flex-col items-center gap-10">
    <h1 class="text-4xl">Blog</h1>
    <section class="w-full flex flex-col gap-10 lg:flex-row lg:gap-0 justify-evenly">
        <div class="flex flex-col items-center gap-4">
            <h2>Write your own:</h2>
            <form class="flex flex-col items-center gap-4" action="?/postBlog" method="post" use:enhance={postBlog}>
                <input class="text-lg font-semibold px-5 py-4 mr-auto focus:[outline:none] w-max-w-[min(30rem,90vw)]" name="title" type="text" placeholder="Title" bind:value={title}>
                {#if startedBlog}
                    <textarea use:autosize class="px-5 py-2 focus:[outline:none] max-w-[min(50rem,90vw)]" name="body" contenteditable bind:textContent={body} placeholder="Write your blog" transition:fade />
                    <div class="w-full flex justify-between">
                        <button on:click={discardBlog} class="btn btn-ringed-error" transition:fade>Discard</button>
                        <button type="submit" class="btn btn-ringed-success" transition:fade>Post</button>
                    </div>
                {/if}
            </form>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2>Or read them:</h2>
            <div class="flex flex-col items-center gap-2">
                {#each posts as post}
                    <Post {post} />
                {/each}
            </div>
        </div>
    </section>
</main>
