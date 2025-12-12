$file = $args[0]
$start = Get-Date
npx tsx "$file.ts"
$end = Get-Date
$duration = $end - $start
$duration.TotalMilliseconds