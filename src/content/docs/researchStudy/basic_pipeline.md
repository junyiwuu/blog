---
title: Basic Pipeline
description: follow the tutorial to understand how to construct a basic pipeline
---
Start: 

```python
from diffusers import DDPMPipeline

ddpm = DDPMPipeline.from_pretrained("google/ddpm-cat-256", use_safetensors=False).to("cuda")
image = ddpm(num_inference_steps=100).images[0]
image
```
Then we need to understand how pipeline do that 

This pipeline contains:
* UNet2DModel
* DDPMScheduler


___
## Denoising process
ref with the [tutorial](https://huggingface.co/docs/diffusers/en/using-diffusers/write_own_pipeline)


tensor : reflect how "noisy" the image should be at each step. like on step 1, the image should be 98% noisy ... noise strength.
> In most diffusion models, the noise scale is relative and is often normalized between 0 and 1000 (clean and maximum noise)
> This range is a design choice made by the model creators

`scheduler.set_timesteps(50))`: through 50 checkpoints from completely noisy to completely clean


---
### Deconstruct basic pipeline
1. import model, scheduler (change mode to  using gpu)
	* Model contains neural network parameters that need to be moved to GPU for faster computation
	* Scheduler contains mathematical functions and hyper parameters that don't require GPU acceleration
2. Set up the `timesteps` in Scheduler
3. Initial random noise
4. Inference: 
5. Modify the range of image , (-1, 1)-->(0,1 ) -->(0, 255)

A single image might have shape: \[1, 3, 224, 224] 
* 1 : batch size (single image) 
* 3: RGB channels 
* 224, 224: height and width
 From \[channels, height, width] which is (0, 1, 2)--> \[height, width, channels] by (1, 2, 0)

```python
 from diffusers import DDPMScheduler, UNet2DModel

scheduler = DDPMScheduler.from_pretrained("google/ddpm-cat-256")
model = UNet2DModel.from_pretrained("google/ddpm-cat-256", use_safetensors=False)
model.to("cuda")

scheduler.set_timesteps(100)
scheduler.timesteps

import torch
sample_size = model.config.sample_size
noise = torch.randn((1, 3, sample_size, sample_size), device = "cuda")


input = noise
for t in scheduler.timesteps: # go through denoising steps
	with torch.no_grad():
	noisy_residual = model(input, t).sample #the UNet model predicts what noise was added at this timestep
	previous_noisy_sample = scheduler.step(noisy_residual, t, input).prev_sample #use the noise prediction to remove some noise from the current sample
	input = previous_noisy_sample	#update image


from PIL import Image
import numpy as np

image = (input / 2 + 0.5).clamp(0, 1).squeeze()
image = (image.permute(1, 2, 0) * 255).round()
image = image.to(torch.uint8).cpu().numpy() # move tensor from gpu back tp cpu because numpy arrays needs to be in cpu

image = Image.fromarray(image)
image

```


---

### Deconstruct stable diffusion pipeline

#### Concept
**UNet2DModel** : 
1. Basic UNet architecture for unconditional image generation/processing
2. only noisy image and timestep as input
3. no additional condition info
4. Used when you want to generate images without any specific guidance

**UNet2DConditionModel** :
1. extended version that supports conditional generation
2. takes additional conditioning input (like text embeddings, class lables etc)
3. cross-attention layers to process the conditioning information
4. Used in like Stable Diffusion where you want to control generation with  text prompts


```python
# Basic UNet
unet = UNet2DModel()
noise_pred = unet(noisy_image, timestep)  # Only image and timestep

# Conditional UNet
unet = UNet2DConditionModel()
noise_pred = unet(
    noisy_image, 
    timestep,
    encoder_hidden_states=text_embeddings  # Additional conditioning
)
```

**Cross Attention**

[relative article](https://medium.com/@sachinsoni600517/cross-attention-in-transformer-f37ce7129d78)

![cross attention](https://miro.medium.com/v2/resize:fit:720/format:webp/1*xzvpKDgLm2A-D9C04V4rOw.png)


forward process/ diffusion process :  adding noise 