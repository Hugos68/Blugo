<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, Drawer } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type {DrawerSettings} from '@skeletonlabs/skeleton/utilities/Drawer/types';

	import Transitioned from '$lib/components/Transitioned.svelte';
	
	function openHamburger(): void {
	const settings: DrawerSettings = {
		position: 'right',
		width: 'w-[min(25rem,65vw)]',
		blur: 'backdrop-blur-sm'
	};
	drawerStore.open(settings);
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="px-[5vw]">
			<svelte:fragment slot="lead">
				<a class="text-2xl" href="/home">Blugo</a>
			</svelte:fragment>
				<nav class="flex px-4 gap-4">
					<a class="hidden md:block" href="/blog">Blog</a>
				</nav>
			<svelte:fragment slot="trail">
				<a class="btn btn-ghost-secondary hidden md:block" href="/login">Login</a>
				<a class="btn btn-ghost-secondary hidden md:block" href="/register">Join us!</a>
				<span class="hidden md:block">
					<LightSwitch />
				</span>
				<button class="btn btn-ghost-secondary btn-sm md:hidden" on:click={openHamburger}>
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
	<Transitioned>
		<slot />
	</Transitioned>
	


	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>


