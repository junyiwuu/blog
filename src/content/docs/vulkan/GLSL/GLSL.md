---
title: glsl
---
```glsl

layout (location = 0) in vec2 position;

//tell GPU to read position data from location 0 of the vertex buffer

layout (location = 1) in vec3 color;

//in : 从vertex buffer读入位置数据

  

layout (location = 0) out vec3 fragColor;

//out : 输出到fragment shader, fragment shader中会有对应的in vec3 fragColor来接收这个数据

  
  

```
