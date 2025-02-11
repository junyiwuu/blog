---
title: Compile cpp file
description: how to compile c++ file
---


## when conflict happen

like cmakecache doesnt match: remove *build* file , start again
`rm -rf build`

  

**add_executable how to include all c++ file**:

1. `file(GLOB SOURCES "*.cpp")` searching for current folder, adding all c++ file into SOURCES variable and then `add_executable(vulkanTest ${SOURCES})`. Therefore collect all c++ under current directory
	* but if add more c++ files later, need to cmake again
2. manually add all c++ files name here

  
