<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { AppBar, Avatar, drawerStore, LightSwitch, menu, toastStore, type DrawerSettings, type ToastSettings } from "@skeletonlabs/skeleton";
	import type { SubmitFunction } from "@sveltejs/kit";
	$: loggedIn = $page.data.session!==null;

    function openHamburger(): void {
        const settings: DrawerSettings = {
            position: 'right',
            width: 'w-[min(25rem,65vw)]',
            blur: 'backdrop-blur-sm'
        };
        drawerStore.open(settings);
	}

    const submitLogout: SubmitFunction = () => {
        return async ({ result }) => {        
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Successfully logged you out!',
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
                    message: result.data.message,
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
<AppBar class="px-[5vw] h-16">
    <svelte:fragment slot="lead">
        <nav class="flex items-center gap-4">
            <a class="text-2xl" href="/home">
                <svg class="inline w-12 h-12" viewBox="0 0 32 32"><path fill="currentColor" d="M16.52 23.44c-1 0-2-0.6-2.88-1.68-0.040 0-0.040 0-0.080 0-4.16 0-7.56-3.4-7.56-7.56s3.4-7.56 7.56-7.56 7.56 3.4 7.56 7.56c0 2.040-0.8 3.96-2.24 5.36 0.16 1.24-0.040 2.32-0.6 3.040-0.44 0.52-1.080 0.84-1.76 0.84v0zM14.080 20.040c0.28 0 0.52 0.12 0.68 0.36 0.72 1 1.36 1.36 1.76 1.36 0.2 0 0.32-0.080 0.44-0.2 0.32-0.4 0.4-1.2 0.2-2.080-0.080-0.32 0.040-0.64 0.28-0.84 1.28-1.12 2-2.72 2-4.4 0-3.24-2.64-5.88-5.88-5.88s-5.88 2.64-5.88 5.88 2.64 5.88 5.88 5.88c0.12 0 0.28 0 0.4 0 0.040-0.080 0.12-0.080 0.12-0.080zM3.84 25.36c-0.2 0-0.44-0.040-0.6-0.12-0.96-0.32-1.72-1.48-1.48-3.36-1.12-1.12-1.76-2.68-1.76-4.28 0-2.56 1.52-4.8 3.88-5.72 0.44-0.16 0.92 0.040 1.080 0.48s-0.040 0.92-0.48 1.080c-1.68 0.68-2.8 2.32-2.8 4.16 0 1.28 0.56 2.52 1.52 3.36 0.040 0.040 0.080 0.080 0.12 0.12 0.16 0.2 0.24 0.44 0.16 0.72-0.24 1.24 0.12 1.8 0.32 1.88 0.24 0.080 0.76-0.24 1.2-1.16 0.16-0.32 0.48-0.48 0.8-0.48 0.84 0.040 1.72-0.12 2.48-0.56 0.4-0.24 0.92-0.080 1.16 0.32s0.080 0.92-0.32 1.16c-0.88 0.48-1.88 0.76-2.88 0.76-0.76 1.2-1.68 1.64-2.4 1.64z"></path></svg>
                Blugo
            </a>
            {#if loggedIn}
                <a class="px-4 hidden md:block" href="/blog">Blog</a>
            {/if}
        </nav>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <nav class="flex items-center gap-4">
            {#if loggedIn}
                <span class="relative hidden md:block">
                    <button class="flex justify-center items-center" use:menu={{ menu: 'account' }}>
                        <Avatar on border="on" class="w-10" initials="{$page.data.session?.user.email?.at(0)}" />
                    </button>
                    <div class="p-4 bg-surface-300-600-token rounded-[var(--theme-rounded-base)] flex flex-col" data-menu="account">
                        <a class="btn btn-ghost-secondary" href="/account">Account</a>
                        <form class="p-0" action="/logout" method="post" use:enhance={submitLogout}>
                            <button type="submit" class="w-full h-full btn btn-ghost-error">Logout</button>
                        </form>
                    </div>
                </span>
            {:else if !($page.route.id==='home')}
                <a class="btn bg-primary-400-500-token hidden md:block" href="/login">Login</a>
                <a class="btn bg-tertiary-400-500-token hidden md:block" href="/register">Join us!</a>
            {/if}
            <span class="h-8 w-0.5 bg-surface-300-600-token hidden md:block" />
            <span class="hidden md:block">
                <LightSwitch />
            </span>
            <button class="btn md:hidden" on:click={openHamburger}>
                <svg class="w-8 h-8" viewBox="0 0 100 100">
                    <rect fill="currentColor" width="80" height="10" x="20" y="15"></rect>
                    <rect fill="currentColor" width="75" height="10" x="25" y="45"></rect>
                    <rect fill="currentColor" width="90" height="10" x="10" y="75"></rect>
                </svg>
            </button>
        </nav>
    </svelte:fragment>
</AppBar>