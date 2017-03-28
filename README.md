# Sample Flourish template: data circles

This sample template demonstrates how to use data tables.

Use the [Flourish SDK](https://www.npmjs.com/package/@flourish/sdk) to try it out.

The main code file for the template is [`src/index.js`](src/index.js).

## Sample data
The [sample data](data/Circles.csv) was generated with the following code:

```js
const words = require("fs").readFileSync("/usr/share/dict/words").toString("utf-8").split("\n");
for (let i=0; i < 25; i++) {
	const x = Math.random(),
	      y = Math.random(),
	      size = Math.random() * 10000,
	      word = words[Math.floor(Math.random()*words.length)];

	console.log(`${x},${y},${size},${word}`);
}
```
