---
title: Push Constant
---
The minimum  push constant that Vulkan can guarantee is  128 bytes. So if you want to make sure your Vulkan engine can work on all device/platform, then don't exceed this number.

One mat4 is 16 floats, one float is 4 bytes, so one mat4 will use 64 bytes. 128 bytes = 2 * mat4
