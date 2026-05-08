---
tags:
  - spark
type: permanent
date: 07-05-2026
time: 15:28
parent:
childs:
folgezettel:
reference:
---
The component responsible for allocating and managing resources for the application

Spark supports several managers: 
1. Standalone
2. Yarn
3. Kubernetes
4. Mesos

Drivers and executors are the physical processes on the machine they need resources and the manager the one responsible for allocating resources for them.

The user requests the manager through the cluster manager to allocate resources for the driver and the executors.

