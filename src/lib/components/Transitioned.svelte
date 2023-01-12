<script>
    import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    let mounted = false;
    onMount(() => {mounted=true})
</script>

{#if mounted}
    <main in:fly={{y: 25, duration: 500}}>
        <slot />
    </main>
{/if}
