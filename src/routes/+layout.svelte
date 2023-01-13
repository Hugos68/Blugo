<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Toast} from '@skeletonlabs/skeleton';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Main from '$lib/components/layout/Main.svelte';

	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	onMount(() => {
        const {
            data: {subscription}
        } = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll();
        });
        return () => {
            subscription.unsubscribe();
        }
    });
</script>

<!-- This key block fixes the scroll bug where the scroll to top isnt applied when navigating client side -->
{#key $page.route.id}
	<Toast />
	<AppShell>
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<svelte:fragment slot="sidebarRight"><Sidebar /></svelte:fragment>
		<Main><slot /></Main>
	</AppShell>
{/key}




