echo "Generating dist files …"
npm run build
echo "… Done"
echo "Adding minified files to commit …"
git add www/dist/*
echo "… Done"