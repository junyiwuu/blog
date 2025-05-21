---
title: functions
---


## ctx
也就是forward和backward的中间结果
解释：在forward里算过的一些中间结果，如果在backward里还需要用到，就把他存到ctx中

```python
class SquareFn(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x):
        ctx.save_for_backward(x)  # 把 x 暂存起来
        return x * x

    @staticmethod
    def backward(ctx, grad_output):
        x, = ctx.saved_tensors
        return 2 * x * grad_output
```
**说明**：
* `x * x` 是前向计算的结果
* 但反向传播的时候我们要用 `∂(x²)/∂x = 2x`
* 所以我们 **在 forward 里把 x 存进 ctx**
* 在 backward 里通过 `ctx.saved_tensors` 取出来用
 **如果不存呢？**
那你在 backward 就得重新计算，或者根本得不到想要的数据（比如 `x` 已经丢了）
**前向过程中产生的、但反向传播时还要用的变量**，为了避免重算、节省内存、保持梯度正确，要临时保存下来 —— 用的就是 ctx。

---




