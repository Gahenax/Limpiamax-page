<?php
$output = shell_exec('pkill -u u314799704 node 2>&1');
echo "<pre>$output</pre>";
echo "Attempted restart.";
?>
