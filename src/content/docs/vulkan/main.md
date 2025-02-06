---
title: Study Log
---


[Vulkan Engine tutorial](https://youtube.com/playlist?list=PL8327DO66nu9qYVKLDmdLW_84-yE4auCR&si=RmYj1OuZB_rt8zqs)

### Overview notes:

FirstApp : initialize the window, initialize the graphicPipeline(read SPRV files into buffers)


  

![vulkan_overview](../../../assets/vulkan_images/vulkan_overview.png)






### Compile notes:

**when conflict happen**:

like cmakecache doesnt match: remove build file , start again

  

rm -rf build

  

**add_executable how to include all cpp file**:

1. `file(GLOB SOURCES "*.cpp")` searching for current folder, adding all cpp file into SOURCES variable and then `add_executable(vulkanTest ${SOURCES})`. Therefore collect all cpp under current directory

> but if add more cpp files later, need to cmake again

  

2. manually add all cpp files name here

  
  

## Chapter 1 : create windows

[code](https://github.com/junyiwuu/vulkanEngine/tree/00a8953686fdff02c80504df77a1088ce2ec82bf)

### **glfwWindowHint (int hint, int value) :**

  

[glfwWindowHint link](https://www.glfw.org/docs/3.3/group__window.html#ga7d9c8c62384b1e2821c4dc48952d2033)

  

[hint](https://www.glfw.org/docs/3.3/window_guide.html#window_hints)

- Hints also including soft constraint and hard constraint

- GLFW_CLIENT_API by default set to openGL

  

Hard Constraint:

  

>A strict requirement that must be satisfied. If a hard constraint cannot be fulfilled, the associated operation will fail. In the context of the image, specific window hints like GLFW_STEREO or GLFW_CLIENT_API are examples of hard constraints. These must align exactly with the system's capabilities.

  

Soft Constraint:

  

>A flexible preference. The system will attempt to match the soft constraint as closely as possible, but it's not mandatory for success. If the exact condition isn't met, the operation can still proceed with the closest alternative available.

  

Hint:

  

>A configuration setting or guideline provided by the developer to influence how the system behaves. In the GLFW context, hints are parameters used to define the properties of a window or OpenGL context, such as whether double buffering is enabled (GLFW_DOUBLEBUFFER). These hints can be hard or soft constraints, depending on the specific functionality and context.

### **GLFWwindow:**

  

[window object](https://www.glfw.org/docs/3.3/window_guide.html#window_object)

- GLFWwindow object encapsulates both a window and a context : glfwCreateWIndow, glfwDestroyWindow, glfwTerminate.

- GLFWmonitor: spoecify whichi monitor (here not specify so using nullptr)

- GLFWwindow: share resource in the context, here is nullptr, means no share context with any window.

  
  
  
  
  
  

### **glfwWindowShouldClose:**

  

[glfwWindowShouldClose](https://www.glfw.org/docs/3.3/group__window.html#ga24e02fbfefbb81fc45320989f8140ab5)

  

What does it do: check if GLFW window required to close.

> - when the user close the window (press the close button) return **True**

> - when use glfwSetWindowShouldClose()

> - shutdown the computer, means os require to close the window, also return True

  

parameter: THE window

  

return: the value of close flag

  
  
  
  
  
  
  

### what we do in this chaper:

  

goal: create a window

  

steps:

  

define "lveWindow" class

|

|PRIVATE:

|--initWindow()

|--width, height, windowName

|--pointer: GLFWwindow *window (the pointer for the window)

|

|PUBLIC:

|--constructor and deconstructor

|--dont allow copy

|--check if window close

define "FirstApp" class

|

|PUBLIC:

|--width, hright

|--run function: when window is open, do something

|

|PRIVATE:

|initialize a LveWindow(create a glfw window)

  
  

>First app (class):

.

> - LveWindow_app(LveWindow class) is a member of FirstApp class **--->** when FirstApp object create (default constructor, here not explicit write down) **--->** LveWindow app automatically created(initialize)

.

> - put LveWindow_app in private is **Encapsulation**, no other access from outside

  
  

lveWindow_app(object) (basic) --> been used in FirstApp class, part of initialize. -->

  
  
  
  

## Chapter 2 : read spv and build pipeline

[code](https://github.com/junyiwuu/vulkanEngine/tree/b54ca5d99010c94e903fa41f704188dc7adc9ae1)

  

gl_VertextIndex: contains the index of the current vertext for each time our main function run

  
  

**`layout(location=0) out vec4 outColor;`**

  

> layout(location=0):

layout qualifier. Specifies the location index of this output variable. currently return 0, meaning this variable will be linked to the first framebuffer

  

> out:

this variable is an output of the fragment shader. fragment shader produce color values for each pixel, this is where the color will be stored

  

>outColor:

the name of output variable

  

OVERALL:

a output variable , name is "outColor"-- fragment shader, location is 0, vec4

  
  
  

----------------------------

### compile GLSL to SPIR-V

we need to compile the shader code into intermediate binary formate (SPIR-V). like compile in c++

  
  
  

-o specifiy our compiled output file's name, int his caser we use the same name

  

**compile.sh**

.sh file is the shell file, we create compile.sh:

  

`/usr/bin/glslc shaders/simple_shader.vert -o shaders/simple_shader.vert.spv`

  

`/usr/bin/glslc shaders/simple_shader.frag -o shaders/simple_shader.frag.spv`

  

`chmod +x compile.sh` make this file executable

  
  

----

pipeline build

  

std::vector

dynamic sized array

  

`static std::vector<char> readFile(const std::string& filepath);` read file content and return with formate std::vector\<char>

  

### **How to read the file**

`std::ifstream` input stream, for reading files

`file()` file function, ( filepath ,bit flags(open mode))

`std::ios::ate` at the end, this mean once the file open we seek the end immediately

`std::ios::binary` open the file in binary mode, raw stream of bytes, avoid any unwanted text transformations

`std::ios::ate | std::ios::binary` we want both gpointer o to end the file (so can use tellg()) , and read as binary

  

why {} instead of ():

1. uniform initialization. so we tell this is object definition, not function declaration.

2. strict type checking, prevent implicit type conversion

  
  

**Open file error check**

```cpp

if (!file.is_open()){

throw std::runtime_error("fail to open file: " + filepath)

//filepath is incorrect or no permission to open the file

}

```

  

**File size**

***the last of file***

file.tellg() return `std::streampos`daata, means the pointer's location in the file

```cpp

size_t filesize = static_cast<size_t>(file.tellg());

```

> other example:

> ```cpp

>double value = 3.14;

>int intValue = static_cast<int>(value); // transfer to >integer

>std::cout << intValue; // output: 3

>```

***the first of the file***

```cpp

file.seekg(0); //move the pointer to the beginning

```

**Create buffer**

  

file.read(buffer.data(), fileSize);

file.close();

return buffer;

  

**createGraphicPipeline**

  

auto vertCode = readFile(vertFilepath);

auto fragCode = readFile(fragFilepath);

we read files into buffers.

  

**lvePipeline constructor**

call createGraphicPiline function --> create buffers --> read files for buffers, store data into them.

  
  
  

**back to FirstApp**:

```cpp

namespace lve{

class FirstApp{

public:

static constexpr int width = 800;

static constexpr int height = 600;

  

void run();

  

private:

LveWindow LveWindow_app{width , height, "hello vulkan"} ;

  

lvePipeline lvePipeline_app{"../shaders/simple_shader.vert.spv", "../shaders/simple_shader.frag.spv"};

};

}

```

add the lvePipeline in FirstApp private, so when initialize the object, it also get called

  
  
  

## Chapter 3:

[code](https://github.com/junyiwuu/vulkanEngine/tree/d52a0cd4cf65d366e987f077259bbd2d5749374b)

lve_device

the first thing is creating a vulkan instance,intilize the vulkan library and the connection between our applicaton and vulkan .

  

next set up the validation layer. enable validation layer to check for errors, vulkan sensitive to errors, small errors will result crash

  
  
  

1. Initializing vulkan and picking a physical device (that capable to working vulkan api)

2. steup validation layer to debug

  
  

**typedef pointer**:

  

typedef existing_type* new_pointer_type;

  

typedef int* IntPointer; // define a pointer that point to Int

IntPointer p1, p2; // same as int* p1; int* p2;

  

using existed type and give it alias.

  
  
  
  
  
  
  

### PIPELINE

  

struct PipelineConfigInfo {};

//pipeline configuration

  
  

>LvePipeline

>|

>|PUBLIC:

>|--constructor (device, vert and frag files, config info)

>|--destroucctor

>|--protection from copy

>|--pipeline config ingo (static)(default pipeline fig info)

>|

>|PRIVATE:

>|--read file (spv into buffer)

>|--createGraphicPipeline

>|--createShaderModule (create shading module)

>|

>|

>|MEMBERS:

>|lve device

>|VkPipeline (graphic pipeline)

>|VkShaderModule (vert and frag)

  





---

  

**VkShaderModule**

GLSL container on GPU, VkShaderModule is a handle

* The whole process:

write GLSL---> compile it into SPIR-V --->using VkShaderModule tell Vulka: here is the compiled code, keep it

`VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderModule)`

  
  

----

**createShaderModule**

`void createShaderModule( const std::vector<char>& code, VkShaderModule* shaderModule);`

- code : SPIR-V code

- VkShaderModule, handle, pointer









```cpp

void LvePipeline::createShaderModule(

const std::vector<char>& code, VkShaderModule* shaderModule){

VkShaderModuleCreateInfo createInfo{};

createInfo.sType = VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO;

createInfo.codeSize = code.size();

createInfo.pCode = reinterpret_cast<const uint32_t*>(code.data());

  

if (vkCreateShaderModule( lveDevice.device() , &createInfo, nullptr, shaderModule) != VK_SUCCESS){

throw std::runtime_error("failed to create shader module");

}

  

}

```

**VkShaderModuleCreateInfo**

this is Vulkan struct

```cpp

typedef struct VkShaderModuleCreateInfo {

VkStructureType sType;

const void* pNext;

VkShaderModuleCreateFlags flags;

size_t codeSize;

const uint32_t* pCode;

} VkShaderModuleCreateInfo;

```

- sType : must be VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO

- pNexr: for extension use

- codeSize : SPIR-V code file size

- pCode : pointer point to the shader code

  

**vkCreateShaderModule**

```cpp

VKAPI_ATTR VkResult VKAPI_CALL vkCreateShaderModule(

VkDevice device,

const VkShaderModuleCreateInfo* pCreateInfo,

const VkAllocationCallbacks* pAllocator,

VkShaderModule* pShaderModule);

```

**VK_SUCCESS**

enum type, VK_SUCCESS =0

if (vkCreateShaderModule( lveDevice.device() , &createInfo, nullptr, shaderModule) != VK_SUCCESS) **----->** if creating not success

  

-----

  

`LvePipeline(const LvePipeline& ) = delete;`

删除拷贝构造函数：当我们要基于一个已有的对象创建一个新对象时，毁掉用这个函数

  

LvePipeline pipeline1(...); // 正常构造

LvePipeline pipeline2 = pipeline1; // 这里会调用拷贝构造函数

  

- const : during the copy, no change original object

- LvePipeline& : uisng referece, so no copy

  

Purpose: DONT ALLOW anyone copy this an existed pipeline object. each pipeline object will have different memory address (two individual houses)

  

ClassName(const ClassName& ) = delete

  
  




## Chapter 4:

[code](https://github.com/junyiwuu/vulkanEngine/tree/d282352785ff4ba909beed1d68cbaf0d96b6d935)

  

Try to keep the logic here, think them as folders

  

struct PipelineConfigInfo {

VkPipelineInputAssemblyStateCreateInfo inputAssemblyInfo;

};

  

PipelineConfigInfo LvePipeline::defaultPipelineConfigInfo(uint32_t width, uint32_t height){

PipelineConfigInfo configInfo{};

  

//inputAssemblyInfo is VkPipelineInputAssemblyStateCreateInfo

configInfo.inputAssemblyInfo.sType

  

configInfo : data tyoe is PipelineConfigInfo

configInfo{} : initialize -->execute `VkPipelineInputAssemblyStateCreateInfo inputAssemblyInfo;` so create a inputAssemblyInfo

  

configInfo(PipelineConfigInfo DATATYPE) is a folder, in this folder including inputAssemblyInfo also including other data type like B, C, D ...... , then we want to set configInfo.inputAssemblyInfo.sType

  
  

> `configInfo.inputAssemblyInfo.topology = VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST;`

Tell the vulkan we want it triangle, not a line(for example)

  

- By default using **Triangle List**: everu 3 vertices are grouped as a triangle

  

- Another opetion is **Triangle Strip**: for every vertices, use the previous two vertices and form a traingle , for example: v1, v2, (v3, v4, v5 ) v6, v7. Then next time become v1, v2, v3, (v4, v5, v6), v7.

  

- other option: [VkPrimitiveTopology](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPrimitiveTopology.html)

  

**VkRect2D**:

where can be draw when rendering (frag a render area)

  
  

**VkPipelineLayout**:

- This layout represents the interface layout between the graphic pipeline and shader resources.

- it describe how descriptors (like textures, uniform buffer etc) are organized and bound to the pipeline.

- is a handle, pointer or reference to GPU resources\

pipelineLayout = nullptr;

  

**VkRenderPass:**

allow you have multiple subpass. define render pass. VkRenderPass represents a rendering process definition. it describe how different phases(called subpasses) interact with framebuffers, including how color, depth, are handled

  

**Subpass:**

subpass means a render stage, for example one subpass is writing to color buffer, one is using depth buffer.

  
  

**primitiveRestartEnable:**

primtive restart allows you break a series of connected primitive (eg. a strip of triangles) using a special "restart index".

- Enable: no triangle strip

- Disable: triangle strip

  
  

**VkViewport.minDepth:**

define the depth range used during rendering, which maps the clip-space z value (from the projection transformation) to the depth buffer.

  
  

**VkPolygonMode:**

  

VK_POLYGON_MODE_FILL = 0,

VK_POLYGON_MODE_LINE = 1,

VK_POLYGON_MODE_POINT = 2,

  

**VkPipelineColorBlendStateCreateInfo**

**VkPipelineColorBlendAttachmentState** :

is used to define the blending configuration for a single color attachment.

- A framebuffer can contain multiple color attachments.

- for example when rendering to multiple render targets, each color attachment can have its own independent blending settings

  
  

**Framebuffer attachments**:

a memory location where renderinng pipeline outputs data.

These attachments are typically part of a framebuffer, is used in conjunction with a render pass

- color attachment

- depth attachment

  

Color blending. They are used to configure how graphic pipeline processes the colors of framebuffer attachments during rendering

  

ORDER:

1. VkGraphicsPipelineCreateInfo (top)

2. VkPipelineShaderStageCreateInfo (part of the above)


## Chapter 5:

  

**VkExtent2D**

When you need to create a swap chain or framebuffer, you will need to tell the size

> - It seems like just return width and height, whiy need to use this class?

This ensuresthe code type-safe, it clearly indicates that the returned values are vulkan-compatible dimensions, not arbitray integers

  

**Command Buffer**

`std::vector<VkCommandBuffer> commandBuffers` A container to hold Vulkan Command Buffers.

A command buffer that contains many functions, we call this command buffer, to execute bunch of functions

  

Record commands buffers once at initialization and the reuse for each frame.

  
  
  
  
  
  

Command Buffer lifecycle from the [tutorial](https://www.youtube.com/watch?v=_VOR6q3edig):

  

![commandbuffer](../../../assets/vulkan_images/commandBufferLifecycle.png)

  
  

LOGIC:
