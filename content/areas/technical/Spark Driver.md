---
tags:
  - spark
type: permanent
date: 07-05-2026
time: 14:53
parent:
childs:
folgezettel:
reference:
---
is the process at the driver seat . If the driver goes down the whole application will be down also

It's a physical process responsible for the application state

Functionalities:
1. Creates SparkSession object
2. Requests executors and resources from the cluster manager and then it starts to communicate with them directly
3. Convert Operations into DAG and schedule the DAG tasks (Scheduler) and distribute them across the cluster executors

> [!TIP]
> The Driver creates the Session then the session is responsible for :
> - communicating with application code
> - acquiring the resources and scheduling the DAG tasks.

> [!NOTE] 
> Spark driver doesn't allocate or launch the executors but Request and Communicate with them

