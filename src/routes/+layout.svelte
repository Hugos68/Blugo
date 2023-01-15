<script lang="ts">
	import '../theme.css';
	
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, Toast} from '@skeletonlabs/skeleton';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Main from '$lib/components/layout/Main.svelte';

	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';

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


	// Everything below is to fix the annoying scroll that doesnt reset on navigation
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import type { NavigationTarget } from '@sveltejs/kit';

	let scrollHistory: {
		to: NavigationTarget | null;
		from: NavigationTarget | null;
		scrollY: number;
	}[] = [];

	beforeNavigate((navigation) => {
		// I have everything wrapped in a `main` tag so that's the part I need to scroll
		const main = document.querySelector('#page');
		scrollHistory.push({
			to: navigation.to,
			from: navigation.from,
			scrollY: main?.scrollTop || 0
		});
	});

	afterNavigate((navigation) => {
		const main = document.querySelector('#page');
		const routeHistory = scrollHistory.find((history) => {
			return history.from?.url.pathname === navigation.to?.url.pathname;
		});

		// I only want to revert the scroll when going back in the history
		if (routeHistory && navigation.type == 'popstate') {
			main?.scrollTo(0, routeHistory.scrollY);
			// I reset the scrollHistory here so that the array doesn't store lots of unneeded values, but could also just add and remove the necessary ones if the page structure is more complex
			scrollHistory = [];
		} else {
			// if it's a page that isn't in the scrollHistory, simply scroll to the top of the page
			main?.scrollTo(0, 0);
		}
	});
	
</script>

<!-- This key block fixes the scroll bug where the scroll to top isnt applied when navigating client side -->
<Toast />
<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<svelte:fragment slot="sidebarRight"><Sidebar /></svelte:fragment>
	<Main><slot /></Main>
</AppShell>





