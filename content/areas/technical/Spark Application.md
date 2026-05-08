---
tags:
  - spark
type: permanent
date: 07-05-2026
time: 14:39
parent:
childs:
aliases:
folgezettel:
reference:
---
Spark application is any application that distribute data processing using spark

It consists of:
- Spark Driver (Runs main function / starts the application)
- Cluster Manager
- Spark Executors (Execute the tasks)
The application is meant to split the large processing task on the data into smaller tasks where each can be handled on different executors

written in:
- Java
- Scala
- Python
- R

Application like spark sql, tarnsforming some data, ML , Graph processing ; spark components must be there the Driver is where the code is understood and executed