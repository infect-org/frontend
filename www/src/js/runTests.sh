#https://stackoverflow.com/questions/4638874/how-to-loop-through-a-directory-recursively-to-delete-files-with-certain-extensi
BASEDIR=$(pwd);
for f in $(find . -name "*.unit.js" -or -name "*.integration.js"); do
	export FOLDER=$(dirname "$f");
	export FILE=$(basename "$f");
	# Change to the test's directory to make sure all includes have the correct relative path
	cd $FOLDER;
	echo "### Compiling and testing $FILE, folder is $FOLDER";
	# Exclusions: See https://github.com/monounity/karma-typescript/issues/54
	browserify -x react/addons -x react/lib/ExecutionEnvironment -x react/lib/ReactContext $FILE | tape-run; 
	cd $BASEDIR;
done