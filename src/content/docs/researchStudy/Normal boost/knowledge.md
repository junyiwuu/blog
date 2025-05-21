---
title: knowledge
---


---


## 强制注入grad
original code:
```
class SpecifyGradient(torch.autograd.Function):
    @staticmethod
    def forward(ctx, input_tensor, gt_grad):
        ctx.save_for_backward(gt_grad)
        return torch.ones([1], device=input_tensor.device, dtype=input_tensor.dtype)

    @staticmethod
    def backward(ctx, grad_scale):
        gt_grad, = ctx.saved_tensors
        gt_grad = gt_grad * grad_scale
        return gt_grad, None
```

例子：
```
x = torch.tensor(2.0, requires_grad=True)
y = x * 3
z = y ** 2
loss = z.mean()
loss.backward()
```
现在 PyTorch 会这样反向传播：
1. 最终目标是：对 `loss` 求 `x` 的导数
2. PyTorch 会依次求：
$$
\frac{d \text{loss}}{dz} \cdot \frac{dz}{dy} \cdot \frac{dy}{dx}
$$  
* `dy/dx = 3`
* `dz/dy = 2y`
* `dloss/dz = 1`

  **✅ 回到original code：**
你定义了：
```python
dummy = SpecifyGradient.apply(input_tensor, gt_grad)
```

这个 `dummy` 会被放入下游的计算图中，比如说：
```python
loss = dummy * 5
```
那 PyTorch 反向时就会从 `loss` → `dummy`，调用你的：
```python
SpecifyGradient.backward(grad_scale)
```
这个 `grad_scale` 就是：
$$
\frac{\partial \text{loss}}{\partial \text{dummy}} = 5
$$
也就是链式法则中上一层传下来的 ∂L/∂y。

## ✅ 所以你图里这段话：

  

> 这个就是 `grad_scale`，是上层传下来的梯度

  

非常准确，就是链式法则中的 ∂L/∂y。

  

你只要记住：

  

> backward 的参数，就是 loss 对你 **output** 的导数，

> 你需要乘上你这个模块对 input 的导数，才得到最终要传回去的梯度。

  

这样你就理解 PyTorch 自定义 backward 的机制了。你说的 “这个 chain 的上层吗？” 说得完全正确。