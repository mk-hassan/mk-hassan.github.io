---
tags:
  - spring-start-here
  - spring
type: permanent
date: 27-06-2026
time: 01:00
parent:
childs:
reference: spring start here book
---
framework is a set of tools and functionalities (software components) that has been written and tested previously and are ready to use directly.

The idea is you have a bunch of tools between your hands and depending on your test case you choose the specific tools that may be beneficial for your specific case.

So if you need caching you choose the existing tool that supports caching, if you need to persist data you then need the functionality that meant to store your data effectively and so on. So you don't need to use the whole collection of the provided tools.

Using tools provided by a framework instead of creating your own is beneficial, there's a supporting community (ones who understand it well), bug fixing, security issues are handled in more reliable way and the tool is used any where to identifying bugs becomes much more easier than if you are developing your internal tool.

---

```
It turns out that the business logic code implemented in an app is significantly smaller than the wheels and belts that make the engine of the application (also often referred to as “the plumbing”)
```

Now you can focus better on the business logic the code than makes value for your application, instead of building bunch of tools that don't bring lots of values for your business.
**Logging** is great thing but what if there's a package that can handle it for me out of the box without implementing it on every single project.

even if I have an internal logger, how can I trust it that it's not vulnerable or has hidden issues to identify easily, so using a widely used package is much better for me!

spring is just an example of `application framework` that is part of Java ecosystem, but you can use it also with Kotlin (JVM based language).

### Summary
- Application framework is bunch of tools and technologies.
- you need to choose the functionality you need for your application.
- by using a framework you can focus more on the business code what makes value for your application.
- plumbing is done for you
