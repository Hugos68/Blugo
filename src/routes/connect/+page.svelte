<script lang="ts">
	import { page } from "$app/stores";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";


    import { writable, type Writable } from 'svelte/store';

    const storeTab: Writable<string> = writable($page.url.searchParams.get('type') || 'register');
</script>

<main>
    <TabGroup selected={storeTab}>
        <Tab value="register">Register</Tab>
        <Tab value="login">Login</Tab>
    </TabGroup>
</main>

<style>

</style>