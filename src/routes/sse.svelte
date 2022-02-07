<script>
  import { onMount } from 'svelte';

  let data = 'data...';
  let state = 'state...';

  onMount(()=>{
    // client side only

    var source = new window.EventSource('/countdown')
 
    source.addEventListener('message', function(e) {
      data = e.data;
    }, false);

    source.addEventListener('open', function(e) {
      state = "Connected"
    }, false)

    source.addEventListener('error', function(e) {
      if (e.eventPhase == window.EventSource.CLOSED) source.close();
      if (e.target.readyState == window.EventSource.CLOSED) {
        state = 'Disconnected'
      }
      else if (e.target.readyState == window.EventSource.CONNECTING) {
        state = "Connecting";
      }
    }, false)
  });

</script>


<h1>SSE: <span id="state">{state}</span></h1>
<h3>Data: <span id="data">{data}</span></h3>
