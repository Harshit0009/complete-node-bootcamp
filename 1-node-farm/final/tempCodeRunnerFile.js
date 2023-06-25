const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);
