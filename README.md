# actions-article-helper

If you write article in github issue like me, you can use this action to *check issue article grammar*.

## usage

```yaml
name: "article helper"
on:
  issues:
    types:
      - "opened"
      - "edited"

jobs:
  debug:
    runs-on: ubuntu-latest
    steps:
    - name: checkout
      uses: actions/checkout@v2
    - name: setup node.js
      uses: actions/setup-node@v2
      with:
        node-version: 16
    - name: article helper
      uses: jiangweixian/actions-article-helper@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

```

### params

|name|description|default|
|:---:|:---:|:---|
|`delimiters`|If issue body contain markdown metadata, it use [gray-matter](https://www.npmjs.com/package/gray-matter) to strip it. e.g. `"[\"<!--\", \"-->\"]"` ||


### permissions

- `GITHUB_TOKEN` - in repo `settings/actions` page, choose `Read and write permissions` or create `PAT` with `issues` scope
- `OPENAI_API_KEY` - create in https://platform.openai.com/account/api-keys