

light做积分，不适合实时，所以这里用的是近似+lookup的方法

**真实物理中的光线传播是积分**
比如一个表面的出射 radiance：

$$
L_o(p, \omega_o) = \int_{\Omega} f_r(p, \omega_i, \omega_o) \cdot L_i(p, \omega_i) \cdot \cos\theta_i \, d\omega_i
$$

你要：

* 遍历所有入射方向 $\omega_i$
* 对每个方向：
  * 乘 BSDF
  * 乘入射光
  * 乘角度因子
* 最后积分

**所以这里使用近似+lookup**
> 对于diffuse：
* 对环境贴图做一次 cosine-weighted convolution
* 得到一张 diffuse 环境贴图（全方向模糊版）
* 渲染时直接查表就行，不需要实时积分！

> 对于specular：
* 构建多级 mipmap，模拟不同粗糙度下的模糊反射
* roughness 越大 → 查越模糊的 mip 层
* 用 `mip_level = roughness_to_lod(roughness)` 决定查哪层
