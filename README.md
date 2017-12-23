# blog

My personal blog.

## Directory Structure

```
.
├── clone.sh
├── config.yaml
├── content
│   └── post
├── public
│   ├── 2015
│   ├── 2016
│   ├── 2017
│   ├── 404.html
│   ├── CNAME
│   ├── README.md
│   ├── categories
│   ├── css
│   ├── favicon.ico
│   ├── index.html
│   ├── index.xml
│   ├── page
│   ├── post
│   ├── sitemap.xml
│   ├── tags
│   └── tree.md
├── static
│   └── favicon.ico
└── themes
    └── clean
```

## Git Branch

Unlike most of other git projects, directory structure is flatten, so we can simply generate our blog in the git `source` branch, to `master` branch.

- source
    + source files, blog articles placed in the `content/` directory.
- master
    + public files, in the `public/` directory

