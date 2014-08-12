widgets-html5
=============

NETLab Toolkit JavaScript version

DISCLAIMER: This is an active development branch and is quite far from being "ready for primetime"

You must first install node and npm if you have not done so.

http://www.joyent.com/blog/installing-node-and-npm 

https://gist.github.com/isaacs/579814

If you are on Raspberry Pi, then you probably have an outdated version of Node. Here's a nice & easy upgrade method: https://github.com/DonaldDerek/rPi-cheat-sheet

You will also need to install command-line tools, bower, and grunt if you do not have them already as well as Compass in the current version:
```
npm install -g grunt-cli
npm install -g bower
npm install -g grunt

sudo gem update —system
sudo gem install compass
```

To install this version of NETLab Toolkit:
```
git clone https://github.com/netlabtoolkit/widgets-html5.git
cd widgets-html5
bower install
npm install
```
To run a live-reload development server after installation run grunt in that directory:
```
grunt
```
or to run it as a standard application, run:
```
node server/app.js
```

If you want to produce a version that can be installed on a Raspberry Pi (or other embedded system) you have to currently do this manually. Run (on your laptop/desktop):
```
grunt build
```

Then copy the dist directory into the server directory. Rename it to "app" and comment out the lines labeled with the comment:
```
// For distributable version, comment out the above and uncomment the line below
```
