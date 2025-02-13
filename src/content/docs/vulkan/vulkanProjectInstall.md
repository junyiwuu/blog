---
title: Install dependencies
description: when doing the vulkan project, the dependencies that need to be installed. I collect all here to help to avoid future confusion
---
# Cmake

`sudo dnf install cmake`


# Vulkan

[link](https://vulkan-tutorial.com/Development_environment#page_Linux)
The most important components you'll need for developing Vulkan applications on Linux are the Vulkan loader, validation layers, and a couple of command-line utilities to test whether your machine is Vulkan-capable:

- `sudo apt install vulkan-tools` or `sudo dnf install vulkan-tools`: Command-line utilities, most importantly `vulkaninfo` and `vkcube`. Run these to confirm your machine supports Vulkan.
- `sudo apt install libvulkan-dev` or `sudo dnf install vulkan-loader-devel` : Installs Vulkan loader. The loader looks up the functions in the driver at runtime, similarly to GLEW for OpenGL - if you're familiar with that.
- `sudo apt install vulkan-validationlayers-dev spirv-tools` or `sudo dnf install mesa-vulkan-devel vulkan-validation-layers-devel`: Installs the standard validation layers and required SPIR-V tools. These are crucial when debugging Vulkan applications, and we'll discuss them in the upcoming chapter.

On Arch Linux, you can run `sudo pacman -S vulkan-devel` to install all the required tools above.

If installation was successful, you should be all set with the Vulkan portion. Remember to run `vkcube` and ensure you see the following pop up in a window:

### Validation error
official document suggest: `sudo dnf install mesa-vulkan-devel vulkan-validation-layers-devel`, but the first one will not work, also we missing another one, so the final command we should use is :
`sudo dnf install vulkan-validation-layers vulkan-validation-layers-devel`

## GLFW

```bash
sudo dnf install glfw-devel
```


## GLM

```bash
sudo dnf install glm-devel
```

## GLSL

`sudo dnf install glslc`