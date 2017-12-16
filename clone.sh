#!/bin/sh

# clone source branch and submodules (themes)
git clone --recursive https://github.com/akccakcctw/blog.git --branch source

cd blog

# clone master branch to public/
git clone https://github.com/akccakcctw/blog.git --branch master public/

# create folders if not exist
for folder in {archetypes,data,layouts,static}; do
  [ ! -d "$folder" ] && mkdir "$folder"
done
unset folder

