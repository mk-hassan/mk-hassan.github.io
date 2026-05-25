---
tags:
  - operating-systems
  - sec2
type: permanent
date: 23-05-2026
time: 15:50
parent:
childs:
folgezettel:
reference:
---
The short answer, No but you have to deal with the difference hardware components yourself.

OS is a software manages the hardware for you, it abstracts the hardware and gives you a simple api to talk to the components you want.

Remember the early days at college when you were required to build calculator using Arduino kit, you connects the LED and the number pad, read the specifications of each device and learns how to deal with it at very low level. not only that but your application may not work on any other kit or any other LED using different port standards.

Here's where the OS comes into consideration, it's a general purpose software (Most of them) that makes your application to be hardware independent, it can run on different devices and different CPU architectures with ease. by different devices I mean screens VGA and HDMI, what versions of HDMI, also sth like USBs how to read and write to them ? USB2.0 or USB3.0 ?  if there's no OS you will need to handle these differences yourself.

Of course if your application is only dedicated to be run on a specific HW configs, writing the code dealing with these components without OS will be 10x efficient but now you are limited to what you wrote.

In larger computer the OS handles different CPU architectures and RAMs, Storage, file system, networks, ports, and lots of things become available for you out of the box.

More than that using Arduino you can't run different processes at the same time, you need something that can replace the processes on the cores and control them for you which is the OS. It schedules the process execution and switching them on the different cores.

> [!NOTE]
> scheduling is a very sophisticated thing to deal with, It's a general purpose scheduling the OS doesn't know in advance how each process will run and how long does it need to run.
> 
