

### PIL way
**PIL way will pop up the separate window**
*directly from the path*
```python
from PIL import Image

image = Image.open('path_to_your_image.jpg')
image.show()
```

*from numpy array*

```python
from PIL import Image

img_array = X_train_orig[123].astype(np.uint8)
img = Image.fromarray(img_array)
img.show()
```





### Matplotlib way


```python
plt.imshow(X_train_orig[index]) 
plt.show()
```