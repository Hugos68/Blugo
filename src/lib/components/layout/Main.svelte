<script lang="ts">
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    let mounted = false;
    onMount(() => {mounted=true})
</script>

{#if mounted}
    {#key $page.route.id}
        <main class="mt-[12.5vh] min-h-[max(calc(88.5vh-4rem),100%)]" in:fly={{y: 25, duration: 500}}>
            <slot />
        </main> 
    {/key}
{:else}
    <main class="flex justify-center">
        <div style="border-top-color:transparent" class="w-16 h-16 mt-[25vh] border-4 border-surface-900-50-token border-solid rounded-full animate-spin"></div>
    </main>
{/if}


