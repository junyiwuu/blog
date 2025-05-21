---
title: notes
---
## Structure


 In differentiable rendering process, any draw call will need glctx--RasterizeCudaContext. 
- 控制 CUDA 上的 rasterizer 行为
- 提供 GPU 上的 framebuffer / depth buffer 管理   
- 所有 raster 调用都要基于这个 context 执行
I can see glctx as a low level renderer on the GPU

## Main pipeline:
输入：
* 训练集（渲染视角图像等），初始文件mesh
* RGB - NORMAL的预训练模型
* 配置参数
输出：
* 优化后的材质（包括bump和normal）
* 输出渲染图像
* 可视化视频和gif
* 最终UV展开后的mesh文件



基于nvdiffrec的完整训练流程
appearance modelling
* if there is a base mesh:
	* learn env light if there is not
	* albedo to normal -> generate a normal map 