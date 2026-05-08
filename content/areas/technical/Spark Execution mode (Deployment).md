---
tags:
  - spark
type: permanent
date: 07-05-2026
time: 15:49
parent:
childs:
folgezettel:
reference:
---
telling us where does this spark resource run ?

There're 3 modes:
1. cluster mode
2. client mode
3. local mode

## Cluster Mode:
In general there's a cluster up and running without spark 
![[cluster mode in general.png]]
This cluster can be YARN, Kubernetes or any thing. In general there'll be cluster manager that keep track of the resources, running VMs and Pods and there will be 
`master-slave` architecture these are the actual nodes that will run spark.

> master == driver
> slave == worker

The driver or worker node in a cluster is defined by its running process. The driver is running what's called `cluster driver process` and the worker is running what's called a `worker driver process`. Processes are running as demons.

when you submit a job to the cluster , you submit it to the driver node and its process responsibility is to start the `spark driver` on one of the worker nodes (starting the main function).

> spark driver is a usual process running on a worker node and initiated by the cluster driver.



