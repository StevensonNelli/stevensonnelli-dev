---
title: "How to handle normal string and JSON string?"
path: blog/handling-json-string
tags: [javascript]
cover: ./json_js.jpg
date: 2021-08-22
excerpt: Reusable code snippet with example for extraction string value from JSON object. Here value can be normal string or JSON string.
---

## Example

There are two inputs, one is a normal string like "server is not down" and the second one is a JSON string like '{ "message": "server is down" }'

Now how will you write the JS code to handle it?

**My solution:** I will use JSON parser in the try-catch block.

```jsx
const data = {
  message: "server is not down",
  json: '{ "message" : "server is down" }',
}
Object.keys(data).forEach(key => {
  let str = ""
  try {
    str = JSON.parse(data?.[key]).message
  } catch (e) {
    str = data?.[key]
    console.error(`${e}`) //SyntaxError: Unexpected token s in JSON at position 0
  }
  console.log(str)
})
```

Well, I have an object with my use-case strings, looping them and parsing in a try-catch block. The _console.error_ statement will execute in the first loop and print the actual error.
