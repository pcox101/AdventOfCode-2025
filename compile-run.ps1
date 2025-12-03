$file = $args[0]
tsc "$file.ts" --outDir "out"
$start = Get-Date
node "out/$file.js"
$end = Get-Date
$duration = $end - $start
$duration.TotalMilliseconds