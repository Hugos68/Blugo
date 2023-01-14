<script lang="ts">
	import { fade } from "svelte/transition";
    import autosize from "svelte-autosize";
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import type { PageData } from "./$types";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { invalidateAll } from "$app/navigation";
    import Post from "$lib/components/Post.svelte";
	import { flip } from "svelte/animate";

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
                discardBlog();
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
    <section class="flex flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
            <h2>Write your own:</h2>
            <form class="flex flex-col items-center gap-4 w-[min(75vw,50rem)]" action="?/postBlog" method="post" use:enhance={postBlog}>
                <input class="text-lg font-semibold px-5 py-4 focus:[outline:none]" name="title" type="text" placeholder="Title" bind:value={title}>
                {#if startedBlog}
                    <textarea use:autosize class="px-5 py-2 focus:[outline:none]" name="body" contenteditable bind:textContent={body} placeholder="Write your blog" transition:fade />
                    <div class="w-full flex justify-between">
                        <button on:click={discardBlog} class="btn btn-ringed-error" transition:fade>Discard</button>
                        <button type="submit" class="btn btn-ringed-success" transition:fade>Post</button>
                    </div>
                {/if}
            </form>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2>Or read them:</h2>
            <div class="flex flex-col gap-2 w-[min(75vw,50rem)]">
                {#each posts as post (post.id)}
                    <div animate:flip>
                        <Post {post} /> 
                    </div>  
                {/each}
            </div>
        </div>
    </section>
</main>
