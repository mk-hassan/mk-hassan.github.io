---
tags:
  - operating-systems
  - sec2
type: permanent
date: 25-05-2026
time: 02:57
parent:
childs:
folgezettel:
reference: "Udemy :: Hussein Nasser course"
---
One of the components that the Operating system operates

It comes with its own instruction set, that your code is compiled into to be run latter on that specific architecture. so CPUs are executing machine level instructions. So cpus are executing machine code which you code is compiled into and that machine code can't run on any other architecture.

Remember those days at school when you with your friends build C based applications, you use M1 and you friend uses intel based processor both where have totally different instruction set. so you share the source code not the compiled ones and you each one of you will need to recompile the app for his specific CPU's instruction set (Machine Code).

In the old days each cpu has a single core (processing unit) but now there're cpus with 2, 4, 8, ... cores where each core can handle a different process at the same time.

each core has clock speed, this describes how many instructions a core handle in one clock cycle. For simple instructions like **RISC (Reduced Instruction Set Computer)** each instruction is executed in one clock cycle that's what ARM architecture uses, while complex instruction set like **Cisc** like ones come with intel processors need more cycles and hence more power.

Data the processor operating into need to be close to the CPU, there's different level of caching makes the data close to the cpu. L1, L2 caches which is core specific and L3 which is shared between cores.

