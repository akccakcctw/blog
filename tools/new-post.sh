#!/usr/bin/env bash

BASE_DIR="$(dirname $0)"

source "${BASE_DIR}"/helpers.sh

read -p 'Post type: [post] ' post_type
read -p 'Post title: (ex: 2018-12-01-hello-world) ' post_title
post_type="${post_type:-post}"

if [[ -z "${post_type}" || -z "${post_title}" ]]; then
  exit "Please set `post_type` and `post_title`."
  exit 1
fi

new_post "${post_type}" "${post_title}"
