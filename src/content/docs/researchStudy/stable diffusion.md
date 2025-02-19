---
title: stabke diiffusiion
description: Will recording via date, since it is not technical collection anymore
---

## Feb 19
### Conda env 
create conda env (make sure things are installed under conda env, not system one, check conda note) --> make sure kernel work (not sure if i really using kernel, will revisit here) --> just using Examples on the [website](https://huggingface.co/stabilityai/stable-diffusion-2-1)


![logic](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/lora-assets/latent-diffusion.png)


### explore general diffusers
**DiffusionPipeline** is the easiest way to use pretrained diffusion system for inference


very basic:
```python
from diffusers import DiffusionPipeline

pipeline = DiffusionPipeline.from_pretrained("stable-diffusion-v1-5/stable-diffusion-v1-5", use_safetensors=True)
```

then in pipeline, it showing 
```
StableDiffusionPipeline { 
"_class_name": "StableDiffusionPipeline", 
"_diffusers_version": "0.32.2", 
"_name_or_path": "stable-diffusion-v1-5/stable-diffusion-v1-5", 

"feature_extractor": [ "transformers", "CLIPImageProcessor" ], 

"image_encoder": [ null, null ], 
"requires_safety_checker": true, 

"safety_checker": [ "stable_diffusion", "StableDiffusionSafetyChecker" ], 
"scheduler": [ "diffusers", "PNDMScheduler" ], 
"text_encoder": [ "transformers", "CLIPTextModel" ],

...

"vae": [ "diffusers", "AutoencoderKL" ] }
```

* feature extractor: `CLIPImageProcessor` for processing input image
* text encoder: `CLIPTextModel`
* VAE: `AutoencoderKL`
---

#### Schedular

controls how noise is added and removed during the diffusion process
* PNDMScheduler (default)
* EulerDiscreteScheduler

---
Move the generator to GPU or CPU
```python
pipeline.to("cuda")
pipeline.to("cpu")
```

verify that it does moved to gpu
`pipeline.unet.device`  `pipeline.vae.device`

**check if cuda available**
```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"Current device: {torch.cuda.current_device()}")
print(f"Device name: {torch.cuda.get_device_name()}")
```

**check GPU usage**
```python
import torch
print(f"GPU memory allocated: {torch.cuda.memory_allocated() / 1e9:.2f} GB")
```

---
#### Set up large git file
```
!git lfs install
!git clone https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5
```
in terminal :
```
sudo dnf install git-lfs

```