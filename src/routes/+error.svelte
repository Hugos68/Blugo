<script>
    import {page} from "$app/stores"
</script>

<main>
    <h1>{$page.status}</h1>
    <p>{$page.error ? $page.error.message : 'Something went wrong...'}</p>
</main>

<style>

</style>

