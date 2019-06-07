#!/usr/bin/env bash
# This is an install script tested on Ubuntu 18.04

# install java
sudo apt update && sudo apt install openjdk-8-jdk -y
echo "JAVA_HOME=\"/usr/lib/jvm/java-8-openjdk-amd64/jre\"" >> /etc/environment
source /etc/environment

# install node
sudo apt update && sudo apt install npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 10.15

# clone JassTheRipper
git clone https://github.com/JoelNiklaus/JassTheRipper.git
cd JassTheRipper
git checkout tags/v1.2 # checkout the latest stable version
./gradlew classes # build project

# clone jass-server
cd ..
git clone https://github.com/JoelNiklaus/jass-server.git
cd jass-server
npm install

# install certbot
sudo apt update && sudo apt install certbot -y


# upgrade
sudo apt update && sudo apt upgrade -y

# clean
sudo apt update && sudo apt autoremove && sudo apt clean
