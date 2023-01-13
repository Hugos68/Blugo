<script lang="ts">
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    let mounted = false;
    onMount(() => {mounted=true})

    export let classes: string;
</script>

{#if mounted}
    {#key $page.route.id}
        <main class={classes} in:fly={{y: 25, duration: 500}}>
            <slot />
        </main>
    {/key}
{/if}

