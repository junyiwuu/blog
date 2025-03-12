---
title: tiny-cuda-nn
---

## Download
```
$ git clone --recursive https://github.com/nvlabs/tiny-cuda-nn
$ cd tiny-cuda-nn

$ git clone --recursive https://github.com/nvlabs/tiny-cuda-nn
$ cd tiny-cuda-nn
```

**add cuda to the $PATH:**
`export PATH="/usr/local/cuda-11.8/bin:$PATH"`

**and $LD_LIBRSRY_PATH:**
`export LD_LIBRARY_PATH="/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH"`


THEN
```
tiny-cuda-nn$ cmake . -B build -DCMAKE_BUILD_TYPE=RelWithDebInfo
tiny-cuda-nn$ cmake --build build --config RelWithDebInfo -j
```

**The first line will ask about compute_architecture**
1. check my GPU compute compability
	`nvidia-smi --query-gpu=compute_cap --format=csv`
2. input the command :
	`cmake . -B build -DCMAKE_BUILD_TYPE=RelWithDebInfo -DCMAKE_CUDA_ARCHITECTURES=86`

**fmt issue:**
seems like fmt version (check in the fmt cmake file) doesn't support my cmake version, therefore download the latest fmt into dependencies folder



**FINAL**
install it into your enviornment

```
tiny-cuda-nn$ cd bindings/torch
tiny-cuda-nn/bindings/torch$ python setup.py install
```

Pytorch version should support CUDA
for example now my pytorch version is  2.6.0+cu124
(How to check? in the terminal, use python, `import torch)` --> `print(torch.__version__)`
But now the CUDA version  that I used for compile is 11.8




---
