This repository is an example of what seems to be a bug related to SCSS modules and the new [instant loading states](https://beta.nextjs.org/docs/routing/loading-ui#instant-loading-states) in Next.js 13.

# How to Execute the Bug

1. `npm install`

2. `npm run dev`

3. Open `localhost:3000` in your browser. You should see `123` print.

4. Refresh the browser. You should see this error:
   ```
   Unhandled Runtime Error
   SyntaxError: unexpected token: string literal
   ```

# How to Replicate the Bug

The setup is as follows:

1. The repo was setup using `npx create-next-app@latest --experimental-app`, and then `sass` was installed.

2. `app/page.tsx` is an `async` function which runs `import styles from "./page.module.scss";`.

3. A style from the scss module is referenced on `app/page.tsx:22`.

4. Then, a simple `app/loading.tsx` is created.

# Some Other Observations

- The bug does not occur if you run `npm run build` and `npm run start`. Only occurs for `npm run dev`.

- Inspecting the page HTML on the errant refresh shows that there is a syntax error in the last script tag:

<details>

  <summary>The First (working) Page Load (shortened)</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<!-- ... -->
	<!-- the end of the very last script tag -->
			$RR("B:0", "S:0", [
				["/_next/static/css/app_page_module_scss.css?ts=1668047186415", "high"],
			]);
		</script>
	</body>
</html>
```

</details>

<details>

  <summary>The Errant Page Load (post-refresh, shortened)</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<!-- ... -->
	<!-- the very last script tag with syntax error -->
		<script>
			B:0","S:0",[["/_next/static/css/app_page_module_scss.css?ts=1668046543925","high"]])
		</script>
	</body>
</html>
```

</details>

<details>

  <summary>The First (working) Page Load</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<link
			rel="stylesheet"
			href="/_next/static/css/app_globals_css.css?ts=1668047186414"
			data-precedence="high"
		/>
		<link
			rel="preload"
			as="style"
			href="/_next/static/css/app_page_module_scss.css?ts=1668047186415"
		/>
		<title>Create Next App</title>
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<meta name="description" content="Generated by create next app" />
		<link rel="icon" href="/favicon.ico" />
		<script src="/_next/static/chunks/polyfills.js" nomodule=""></script>
	</head>
	<body>
		<!--$?--><template id="B:0"></template><span>Loading...</span
		><!--/$-->
		<script src="/_next/static/chunks/webpack.js" async=""></script>
		<script src="/_next/static/chunks/main-app.js" async=""></script>
		<div hidden id="S:0">
			<div data-nextjs-scroll-focus-boundary="">
				<template id="P:1"></template>
			</div>
		</div>
		<script>
			(self.__next_f = self.__next_f || []).push([0]);
		</script>
		<script>
			self.__next_f.push([
				1,
				'M1:{"id":"./node_modules/next/dist/client/components/app-router.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\nM2:{"id":"./node_modules/next/dist/client/components/layout-router.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\nM3:{"id":"./node_modules/next/dist/client/components/render-from-template-context.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\n',
			]);
		</script>
		<script>
			self.__next_f.push([
				1,
				'J0:["$","@1",null,{"assetPrefix":"","initialCanonicalUrl":"/","initialTree":["",{"children":["",{}]},null,null,true],"initialHead":[["$","title",null,{"children":"Create Next App"}],["$","meta",null,{"content":"width=device-width, initial-scale=1","name":"viewport"}],["$","meta",null,{"name":"description","content":"Generated by create next app"}],["$","link",null,{"rel":"icon","href":"/favicon.ico"}]],"children":[[],[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app_globals_css.css?ts=1668047186414","precedence":"high"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{}],["$","body",null,{"children":["$","@2",null,{"parallelRouterKey":"children","segmentPath":["children"],"loading":["$","span",null,{"children":"Loading..."}],"hasLoading":true,"template":["$","@3",null,{}],"notFound":["$","div",null,{"style":{"fontFamily":"-apple-system, BlinkMacSystemFont, Roboto, \\"Segoe UI\\", \\"Fira Sans\\", Avenir, \\"Helvetica Neue\\", \\"Lucida Grande\\", sans-serif","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":[["$","head",null,{"children":["$","title",null,{"children":"404: This page could not be found."}]}],["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"\\n            body { margin: 0; color: #000; background: #fff; }\\n            .next-error-h1 {\\n              border-right: 1px solid rgba(0, 0, 0, .3);\\n            }\\n\\n            @media (prefers-color-scheme: dark) {\\n              body { color: #fff; background: #000; }\\n              .next-error-h1 {\\n                border-right: 1px solid rgba(255, 255, 255, .3);\\n              }\\n            }\\n          "}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":0,"marginRight":"20px","padding":"0 23px 0 0","fontSize":"24px","fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block","textAlign":"left","lineHeight":"49px","height":"49px","verticalAlign":"middle"},"children":["$","h2",null,{"style":{"fontSize":"14px","fontWeight":"normal","lineHeight":"49px","margin":0,"padding":0},"children":"This page could not be found."}]}]]}]]}],"childProp":{"current":[[],[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app_page_module_scss.css?ts=1668047186415","precedence":"high"}]],"@4"],"segment":""},"rootLayoutIncluded":true}]}]]}]]}]\n',
			]);
		</script>
		<script>
			self.__next_f.push([1, 'J4:["$","h1",null,{"children":123}]\n']);
		</script>
		<div hidden id="S:1"><h1>123</h1></div>
		<script>
			$RS = function (a, b) {
				a = document.getElementById(a);
				b = document.getElementById(b);
				for (a.parentNode.removeChild(a); a.firstChild; )
					b.parentNode.insertBefore(a.firstChild, b);
				b.parentNode.removeChild(b);
			};
			$RS("S:1", "P:1");
		</script>
		<script>
			$RC = function (b, c, e) {
				c = document.getElementById(c);
				c.parentNode.removeChild(c);
				var a = document.getElementById(b);
				if (a) {
					b = a.previousSibling;
					if (e) (b.data = "$!"), a.setAttribute("data-dgst", e);
					else {
						e = b.parentNode;
						a = b.nextSibling;
						var f = 0;
						do {
							if (a && 8 === a.nodeType) {
								var d = a.data;
								if ("/$" === d)
									if (0 === f) break;
									else f--;
								else ("$" !== d && "$?" !== d && "$!" !== d) || f++;
							}
							d = a.nextSibling;
							e.removeChild(a);
							a = d;
						} while (a);
						for (; c.firstChild; ) e.insertBefore(c.firstChild, a);
						b.data = "$";
					}
					b._reactRetry && b._reactRetry();
				}
			};
			$RM = new Map();
			$RR = function (p, q, v) {
				function r(l) {
					this.s = l;
				}
				for (
					var t = $RC,
						u = $RM,
						m = new Map(),
						n = document,
						g,
						e,
						f = n.querySelectorAll(
							"link[data-precedence],style[data-precedence]"
						),
						d = 0;
					(e = f[d++]);

				)
					m.set(e.dataset.precedence, (g = e));
				e = 0;
				f = [];
				for (var c, h, b, a; (c = v[e++]); ) {
					var k = 0;
					h = c[k++];
					if ((b = u.get(h))) "l" !== b.s && f.push(b);
					else {
						a = n.createElement("link");
						a.href = h;
						a.rel = "stylesheet";
						for (a.dataset.precedence = d = c[k++]; (b = c[k++]); )
							a.setAttribute(b, c[k++]);
						b = a._p = new Promise(function (l, w) {
							a.onload = l;
							a.onerror = w;
						});
						b.then(r.bind(b, "l"), r.bind(b, "e"));
						u.set(h, b);
						f.push(b);
						c = m.get(d) || g;
						c === g && (g = a);
						m.set(d, a);
						c
							? c.parentNode.insertBefore(a, c.nextSibling)
							: ((d = n.head), d.insertBefore(a, d.firstChild));
					}
				}
				Promise.all(f).then(
					t.bind(null, p, q, ""),
					t.bind(null, p, q, "Resource failed to load")
				);
			};
			$RR("B:0", "S:0", [
				["/_next/static/css/app_page_module_scss.css?ts=1668047186415", "high"],
			]);
		</script>
	</body>
</html>
```

</details>

<details>

  <summary>The Errant Page Load (post-refresh)</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<link
			rel="stylesheet"
			href="/_next/static/css/app_globals_css.css?ts=1668046543925"
			data-precedence="high"
		/>
		<link
			rel="preload"
			as="style"
			href="/_next/static/css/app_page_module_scss.css?ts=1668046543925"
		/>
		<title>Create Next App</title>
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<meta name="description" content="Generated by create next app" />
		<link rel="icon" href="/favicon.ico" />
		<script src="/_next/static/chunks/polyfills.js" nomodule=""></script>
	</head>
	<body>
		<!--$?--><template id="B:0"></template><span>Loading...</span
		><!--/$-->
		<script src="/_next/static/chunks/webpack.js" async=""></script>
		<script src="/_next/static/chunks/main-app.js" async=""></script>
		<div hidden id="S:0">
			<div data-nextjs-scroll-focus-boundary="">
				<template id="P:1"></template>
			</div>
		</div>
		<script>
			(self.__next_f = self.__next_f || []).push([0]);
		</script>
		<script>
			self.__next_f.push([
				1,
				'M1:{"id":"./node_modules/next/dist/client/components/app-router.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\nM2:{"id":"./node_modules/next/dist/client/components/layout-router.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\nM3:{"id":"./node_modules/next/dist/client/components/render-from-template-context.js","name":"default","chunks":["app-client-internals:app-client-internals"],"async":false}\n',
			]);
		</script>
		<script>
			self.__next_f.push([
				1,
				'J0:["$","@1",null,{"assetPrefix":"","initialCanonicalUrl":"/","initialTree":["",{"children":["",{}]},null,null,true],"initialHead":[["$","title",null,{"children":"Create Next App"}],["$","meta",null,{"content":"width=device-width, initial-scale=1","name":"viewport"}],["$","meta",null,{"name":"description","content":"Generated by create next app"}],["$","link",null,{"rel":"icon","href":"/favicon.ico"}]],"children":[[],[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app_globals_css.css?ts=1668046543925","precedence":"high"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{}],["$","body",null,{"children":["$","@2",null,{"parallelRouterKey":"children","segmentPath":["children"],"loading":["$","span",null,{"children":"Loading..."}],"hasLoading":true,"template":["$","@3",null,{}],"notFound":["$","div",null,{"style":{"fontFamily":"-apple-system, BlinkMacSystemFont, Roboto, \\"Segoe UI\\", \\"Fira Sans\\", Avenir, \\"Helvetica Neue\\", \\"Lucida Grande\\", sans-serif","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":[["$","head",null,{"children":["$","title",null,{"children":"404: This page could not be found."}]}],["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"\\n            body { margin: 0; color: #000; background: #fff; }\\n            .next-error-h1 {\\n              border-right: 1px solid rgba(0, 0, 0, .3);\\n            }\\n\\n            @media (prefers-color-scheme: dark) {\\n              body { color: #fff; background: #000; }\\n              .next-error-h1 {\\n                border-right: 1px solid rgba(255, 255, 255, .3);\\n              }\\n            }\\n          "}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":0,"marginRight":"20px","padding":"0 23px 0 0","fontSize":"24px","fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block","textAlign":"left","lineHeight":"49px","height":"49px","verticalAlign":"middle"},"children":["$","h2",null,{"style":{"fontSize":"14px","fontWeight":"normal","lineHeight":"49px","margin":0,"padding":0},"children":"This page could not be found."}]}]]}]]}],"childProp":{"current":[[],[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app_page_module_scss.css?ts=1668046543925","precedence":"high"}]],"@4"],"segment":""},"rootLayoutIncluded":true}]}]]}]]}]\n',
			]);
		</script>
		<script>
			self.__next_f.push([1, 'J4:["$","h1",null,{"children":123}]\n']);
		</script>
		<div hidden id="S:1"><h1>123</h1></div>
		<script>
			$RS = function (a, b) {
				a = document.getElementById(a);
				b = document.getElementById(b);
				for (a.parentNode.removeChild(a); a.firstChild; )
					b.parentNode.insertBefore(a.firstChild, b);
				b.parentNode.removeChild(b);
			};
			$RS("S:1", "P:1");
		</script>
		<script>
			B:0","S:0",[["/_next/static/css/app_page_module_scss.css?ts=1668046543925","high"]])
		</script>
	</body>
</html>
```

</details>
