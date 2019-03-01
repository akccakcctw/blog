#!/usr/bin/env bash

function new_post() {
  hugo new "${1}"/"${2}".md
}

function demo() {
  hugo server --buildDrafts
}
