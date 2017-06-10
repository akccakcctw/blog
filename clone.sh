#!/bin/sh

# clone source branch and submodules(themes)
git clone --recursive https://github.com/akccakcctw/akccakcctw.github.io.git --branch source

cd akccakcctw.github.io

# clone master branch
git clone https://github.com/akccakcctw/akccakcctw.github.io.git --branch master public/

# create folders if not exist
folders=( "archetypes" "data" "layouts" "static" )
for i in "${folders[@]}"
do
  if [ ! -d "$i" ] ; then
    mkdir "$i"
  fi
done

