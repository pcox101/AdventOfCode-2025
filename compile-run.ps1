$file = $args[0]

tsc "$file.ts" --outDir "out"
node "out/$file.js"