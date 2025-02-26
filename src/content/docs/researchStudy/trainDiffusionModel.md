---
title: Train a diffusion model
---
How to train a UNet2DModel from scratch on a subset of ...dataset
要对应看jupyter notebook，这篇post中只记录记忆点的code
## Dataset
[The dataset we using ](https://huggingface.co/datasets/huggan/smithsonian_butterflies_subset)

**dataclass**
configuration train 


**datasets**
load_dataset
### Configuration
利用装饰器快速生成类的初始化方法
```python
@dataclass
class TrainConfig:
    image_size = 128  #the generated image resolution
    train_batch_size =16
    eval_batch_size = 16
    num_epochs = 50
    gradient_accumulation_steps = 1
    learning_rate = 1e-4
    save_image_epochs = 10
    save_model_epochs = 30
    mixed_precision = "fp16"  # `no` for float32, `fp16` for automatic mixed precision
    output_dir = "ddpm-butterflies-128"  # the model name locally and on the HF Hub
    push_to_hub = True  # whether to upload the saved model to the HF Hub
    hub_model_id = "<your-username>/<my-awesome-model>"  # the name of the repository to create on the HF Hub
    hub_private_repo = None
    overwrite_output_dir = True  # overwrite the old model when re-running the notebook
    seed = 0

config = TrainConfig()

```
---

### Load and Visualize the data
```python
#from datasets import load_dataset
config.dataset_name = "huggan/smithsonian_butterflies_subset"
dataset = load_dataset(config.dataset_name, split="train")

fig, axs = plt.subplots(1, 4, figsize=(16, 4))
for i, image in enumerate(dataset[:4]["image"]):
    axs[i].imshow(image)
    axs[i].set_axis_off()

fig.show()
```

* 注意：`dataset[:4]["image"]`这里的后面的"image",对应的是数据集里面的类别，可以打开数据看：[The dataset](https://huggingface.co/datasets/huggan/smithsonian_butterflies_subset)
* for i, image in ....: 对应的是index and value
---
## Data pre-process 

数据预处理：使用torchvision的transforms对图像进行预处理
```python
#from torchvision import transforms
preprocess = transforms.Compose(
    [
        transforms.Resize(  (config.image_size, config.image_size)  ),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor (),
        transforms.Normalize( [0.5] , [0.5]),
    ]
)

def transform(examples):
    images = [preprocess(image.convert("RGB")) for image in examples["image"]] 
    return {"images" : images}

dataset.set_transform(transform)
train_dataloader = torch.utils.data.DataLoader(dataset, batch_size = config.train_batch_size, shuffle = True)
```
* transform.compose是把多个预处理组合起来的
* 先将图片重新整理大小，和config的image_size对上
* 随机水平翻转
* transfer image to tensor, for PyTorch to calculate
* normalize tensor, 常用于加速模型训练。这里均值和标准差都设为 0.5，将像素值范围从 \[0, 1] 映射到 \[-1, 1]。

---

## Create UNet
---
## Issues:
### When after loading matplotlib, kernel crash

sometimes the version between libraries not match, upgrade the library to solve the issue
solution:
```bash
pip install --upgrade matplotlib numpy
```