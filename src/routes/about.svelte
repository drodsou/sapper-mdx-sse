<script>
	let count = 0;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site!</h1>

<p>This is the 'about' page. There's not much here.</p>

<button on:click={()=>count++}>{count}</button>