---
title: Concept Notes
---
## Torch

* torch是pytorch的主体库，提供了tensor操作，autograd(自动求导)，optim(优化)等基本功能
* torchvision，是pytorch官方的一部分，专门面向image processing , computer vision任务

|             |                                |
| ----------- | ------------------------------ |
| torch       | 侧重于通用的深度学习框架功能<br>             |
| torchvision | 提供图像相关的工具function，预训练模型和常用数据集等 |
|             |                                |
|             |                                |
#### torch.utils
*  `torch.utils` 是 PyTorch 中的一个工具包集合，里面按子模块划分，提供各种辅助功能。
- 最常用的子模块是 `torch.utils.data`，主要负责数据集和数据加载器（`Dataset`、`DataLoader`）等。

- `Dataset`：自定义数据集的基类，需要实现 `__len__` 和 `__getitem__` 两个方法。
- `DataLoader`：负责批量加载数据，常见参数有 `batch_size`、`shuffle`、`num_workers` 等。

### PyTorch compatible with sm-120 (RTX 5090)

LOGIC: PyTorch的GPU加速是基于CUDA， 所以首先要确保CUDA支持目标arch(sm-120)



---
#### Examples:
```python
import torch
import torch.utils.data.dataloader

class mydataset (torch.utils.data.Dataset):
    def __init__(self, data_list):
        self.data = data_list
    def __len__(self):
        return len(self.data)
    def __getitem__(self, idx):
        return self.data[idx]
    
dataset = mydataset([1,2,3,4,5])
dataloader = torch.utils.data.DataLoader(dataset, batch_size=2, shuffle = True)
for a in dataloader:
    print(a)
```
`__getitem__` is a iter, using next(iter(dataloader)) to show the contents


---

#### Others
* tensor是pytorch中最基本的数据结构，用于存储数值，并支持运算，相当于多维数组
* torch.size:当调用tensor的size方法，返回的是torch.size对象，本质上是不可变的tuple,来描述该tensor的个个维度的大小

|           |                               |
| --------- | ----------------------------- |
| squeeze   | 删除tensor中所有大小为1的维度（或指定维度）<br> |
| unsqueeze | 在指定位置添加一个大小为1的新维度             |


* LongTensor通常指的是torch.int64类型的tensor
* permute : `permute(0, 2, 3, 1)` 会将维度从 `[batch, channels, height, width]` 变为 `[batch, height, width, channels]`。

---
## Scheduler

在 Hugging Face Diffusers 中，**Scheduler**（如 `DDPMScheduler`）的主要作用是定义“扩散过程”里**在每个时间步如何向图像添加或移除噪声**。
- 可以把它理解成一个“噪声调度器”，并不是一个有学习能力的模型，而是一个固定的算 法，用来实现扩散模型的前向或反向过程。
- 当你做前向扩散（`add_noise`）时，它会按照预先设计好的公式，给原图混入不同比例的噪声。
- 在反向扩散时（推理阶段），它也根据相同或对应的公式帮助你一步步去噪，直到得到清晰的图像。  
换句话说，**Scheduler** 并不会自己“变聪明”，它只是一个“公式”或“流程”的实现。





---

## Accelerator



---

## epoch
指模型遍历整个训练数据集一次的过程。epoch参数相当于当前训练到第几轮