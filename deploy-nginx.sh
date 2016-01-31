git fetch
git reset --hard origin/webserver/hkepc.ionic-reader.xyz;
rm -f platforms/browser/build/package.zip;
sh build.sh;
ionic build browser;
rm -rf platforms/browser/build/www;
unzip platforms/browser/build/package.zip -d platforms/browser/build/www;
sudo rm -rf /usr/share/nginx/www;
sudo cp -r platforms/browser/build/www /usr/share/nginx/www;
