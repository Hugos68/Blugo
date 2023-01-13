<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, Drawer, Avatar, menu } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type {DrawerSettings} from '@skeletonlabs/skeleton/utilities/Drawer/types';

	import Transitioned from '$lib/components/Transitioned.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	
	function openHamburger(): void {
	const settings: DrawerSettings = {
		position: 'right',
		width: 'w-[min(25rem,65vw)]',
		blur: 'backdrop-blur-sm'
	};
	drawerStore.open(settings);
	}

	$: loggedIn = $page.data.session;

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

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="px-[5vw] h-18">
			<svelte:fragment slot="lead">
				<a class="text-2xl" href="/home">Blugo</a>
			</svelte:fragment>
				{#if loggedIn}
				<nav class="flex">
					<a class="px-4 hidden md:block" href="/blog">Blog</a>
				</nav>
				{/if}
			<svelte:fragment slot="trail">
				<span class="px-4 hidden md:block">
					<LightSwitch />
				</span>
				{#if loggedIn}
				<span class="relative">
					<button use:menu={{ menu: 'account' }}>
						<Avatar class="w-8" initials="JD" />
					</button>
					<div class="p-4 bg-surface-400-500-token rounded-2xl" data-menu="account">
						<a class="btn btn-ghost-secondary" href="/account">Account</a>
						<a class="btn btn-ghost-secondary" href="/logout">Logo</a>
					</div>
				</span>
				{:else if !($page.route.id==='home')}
					<a class="btn btn-ghost-secondary hidden md:block" href="/login">Login</a>
					<a class="btn btn-ghost-secondary hidden md:block" href="/register">Join us!</a>
				{/if}

				<button class="btn md:hidden" on:click={openHamburger}>
					<svg class="h-8 w-8" viewBox="0 0 48 48"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M7.94971 11.9497H39.9497"/><path d="M7.94971 23.9497H39.9497"/><path d="M7.94971 35.9497H39.9497"/></g></svg>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarRight">
		<Drawer class="md:hidden">
			<a href="/home">Home</a>
		</Drawer>
	</svelte:fragment>

	<!-- Router Slot -->
	<Transitioned classes="mt-[12.5vh]">
		<slot />
	</Transitioned>

</AppShell>


