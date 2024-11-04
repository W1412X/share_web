<!--  
本页面提供了 ShareSdu 的文档，包括接口文档、部署指南、开发文档  
使用Makrdown编写，复用了文章部分的编辑器/阅读器   
支持在线编辑(需要token验证)   
同时通过此页面路由到开发者主页  
-->
<template>
    <v-dialog v-model="ifShowDialog" style="width: 100%; height: 100%; justify-content: center">
        <div style="display: flex; justify-content: center">
            <v-card v-if="ifShowDev" style="padding: 10px; width: 390px">
                <v-card-title class="headline">开发者主页</v-card-title>
                <v-btn prepend-icon="mdi-github" href="https://github.com/W1412X" color="#222222"
                    class="mx-2">@W1412X</v-btn>
                <v-btn prepend-icon="mdi-github" href="https://github.com/zzysssigm" color="#222222"
                    class="mx-2">@zzysssigm</v-btn>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="this.setDevState(false)">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
    <main style="height: 100%">
        <div style="
          position: fixed;
          width: 100%;
          height: 50px;
          border-bottom: 2px #9c0c13 solid;
          display: flex;
          flex-direction: row;
          background-color: #ffffff;
          z-index: 1000;
        ">
            <v-btn @click="showApiDoc" height="100%" variant="plain"
                style="font-size: 16px; font-weight: 600">接口文档</v-btn>
            <v-btn @click="showGuideDoc" height="100%" variant="plain"
                style="font-size: 16px; font-weight: 600">部署指南</v-btn>
            <v-btn @click="setDevState(true)" height="100%" variant="plain"
                style="font-size: 16px; font-weight: 600">开发文档</v-btn>
            <v-spacer></v-spacer>
            <v-card-title style="color: rgba(156, 12, 19, 0.9)">ShareSdu 文档</v-card-title>
        </div>
        <div style="display: flex; flex-direction: row;">
            <v-list
                v-if="ifShowCatagory"
                style="display: flex; width: 248px; height: 100%;flex-direction: column;position: fixed;background-color: #ffffff;padding-top: 70px;max-height: 100%;overflow-y: scroll;border-right: #8a8a8a solid 2px;">
                <v-list-item v-for="anchor in titles" :key="anchor.lineIndex"
                    :style="{ padding: `10px 0 10px ${anchor.indent * 8 + 15}px` }" @click="handleAnchorClick(anchor)">
                    <a style="cursor: pointer">{{ anchor.title }}</a>
                </v-list-item>
            </v-list>
            <div style="width: 100%; display: flex; justify-content: center;padding-left: 300px;flex-direction: column;padding-right: 300px;">
                <div style="display: flex; flex-direction: row; padding: 20px;padding-top: 70px;background-color: #ffffff;">
                    <div style="padding-left: 20px;">
                        <v-btn @click="reload" variant="tonal" icon="mdi-home" color="#9c0c13" size="30"></v-btn>
                        <span
                            style="padding-left: 20px;color: #9c0c13;padding-right: 10px;font-size: 12px;font-weight: 1000;">〉</span>
                        <v-btn variant="tonal"
                            style="height: fit-content;padding: 5px;font-size: 12px;color: #9c0c13;border-radius: 20px;">
                            {{ pageNameNow }}
                        </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn v-if="mode == 'preview'" @click="edit" variant="tonal" icon="mdi-file-edit-outline" color="#8a8a8a" size="35"></v-btn>
                    <v-btn v-else @click="submit" variant="tonal" icon="mdi-file" color="#9c0c13" size="35"></v-btn>
                </div>
                <v-md-editor v-if="mode == 'preview'" ref="preview" :mode="'preview'" :include-level="[3, 4]" :disabled-menus="[]"
                    @upload-image="handleUploadImage" v-model="nowDocument" height="100%"
                    style="max-width: 1000px"></v-md-editor>
                <v-md-editor v-if="mode == 'edit'" ref="edit" :include-level="[3, 4]" :disabled-menus="[]"
                    @upload-image="handleUploadImage" v-model="nowDocument" height="100%"
                    style="max-width: 1000px"></v-md-editor>
            </div>
        </div>
    </main>
</template>
<script>
import { ref, computed } from 'vue'

export default {
    setup() {
        const ifShowDev = ref(false)
        const ifShowDialog = computed(() => {
            return ifShowDev.value
        })
        const setDevState = state => {
            ifShowDev.value = state
        }
        return {
            ifShowDev,
            ifShowDialog,
            setDevState,
        }
    },
    data() {
        return {
            mode:"preview",//编辑器的模式，默认为preview
            ifShowCatagory: true,//控制侧边目录的显示状态，主要是在管理员编辑文档的时候设置为false  
            nowDocument:`
## 欢迎使用 ShareSdu 分享平台，本页面提供了一些开发文档  
### 项目地址  
[**ShareSdu**](https://github.com/ShareSdu)
### 开发者  
[**@W1412X**](https://github.com/W1412X)
[**@zzysssigm**](https://github.com/zzysssigm)
            `,
            document: {
                guide:`

# 计算机图形学实验9 RayBounding Valume求交和 BVH查找  
## [Github地址](https://github.com/W1412X/sdu_jt_lab/tree/main/lab9) 
## [RBV,BVH参考文章](https://blog.csdn.net/qq_35312463/article/details/108419276)
## 前言  
### 光线追踪的基本流程  
- 像素网格生成：首先，我们需要为最终的图像建立一个二维像素网格。每个像素代表屏幕上的一个点，我们的目标是计算出这个点应该显示为什么颜色。
- 发射光线：对于每个像素，从相机的位置出发，沿着该像素指向场景的方向发射一条光线。这条光线是我们想象中的从观察者的眼睛到屏幕这一段空间中的延续。
- 光线与物体的交点检测：我们计算这条光线是否与场景中的任何物体相交，以及交点的位置。在这个例子中，就是判断光线是否击中了立方体的一个面。这通常涉及到射线与几何体求交的数学运算。
- 着色计算：
- 漫反射：如果光线击中了立方体，我们会计算光线击中面后的基本颜色（比如立方体表面的颜色）。这是最简单的光照模型，假设光线均匀地散射到各个方向。
  - 光照计算：点光源对这个交点的影响。计算光线从光源到交点的入射角，使用兰伯特余弦定律来确定光照强度。简单来说，光线垂直于表面时最亮，斜射时逐渐变暗。
  - 环境光与反射
- 累积颜色：根据上述计算得到的光照信息，为当前像素分配一个颜色值。如果光线没有击中任何物体，则可能根据背景色或环境光来着色。
- 重复步骤：对图像中的每个像素重复执行上述过程，直到所有像素的颜色都被计算出来，形成最终的图像。
## 实验部分
### 修改Render
- 和之前的实验8一样，修改一些东西
  - dir为对应的像素视锥体的方向向量
  - ray光线
  - 调用scene类中的castRay来返回光线与物体交点的颜色  
cpp
void Renderer::Render(const Scene& scene)
{
    std::vector<Vector3f> framebuffer(scene.width * scene.height);

    float scale = tan(deg2rad(scene.fov * 0.5));
    float imageAspectRatio = scene.width / (float)scene.height;
    Vector3f eye_pos(-1, 5, 10);
    int m = 0;
    for (uint32_t j = 0; j < scene.height; ++j) {
        for (uint32_t i = 0; i < scene.width; ++i) {
            // generate primary ray direction
            float x = (2 * (i + 0.5) / (float)scene.width - 1) *
                      imageAspectRatio * scale;
            float y = (1 - 2 * (j + 0.5) / (float)scene.height) * scale;

            Vector3f dir = normalize(Vector3f(x, y, -1)); // Don't forget to normalize this direction!
            // ori = eye_pos
            Ray ray(eye_pos, dir, 0);
            framebuffer[m++] = scene.castRay(ray, 0);
        }
        UpdateProgress(j / (float)scene.height);
    }
    UpdateProgress(1.f);

    // save framebuffer to file
    FILE* fp = fopen("binary.ppm", "wb");
    (void)fprintf(fp, "P6\n%d %d\n255\n", scene.width, scene.height);
    for (auto i = 0; i < scene.height * scene.width; ++i) {
        static unsigned char color[3];
        color[0] = (unsigned char)(255 * clamp(0, 1, framebuffer[i].x));
        color[1] = (unsigned char)(255 * clamp(0, 1, framebuffer[i].y));
        color[2] = (unsigned char)(255 * clamp(0, 1, framebuffer[i].z));
        fwrite(color, 1, 3, fp);
    }
    fclose(fp);    
}

### 修改Traingle.cpp的getInsection函数
- 修改为返回一个insection对象，包含了交点的一些信息  
- 修改后的代码
cpp
inline Intersection Triangle::getIntersection(Ray ray)
{
    Intersection inter;//交点信息结构体

    if (dotProduct(ray.direction, normal) > 0)//两者点积大于0，光线与三角形法向量方向一致，不会有交点
        return inter;
    double u, v, t_tmp = 0;
    Vector3f pvec = crossProduct(ray.direction, e2);
    double det = dotProduct(e1, pvec);
    if (fabs(det) < EPSILON)
        return inter;

    double det_inv = 1. / det;
    Vector3f tvec = ray.origin - v0;
    u = dotProduct(tvec, pvec) * det_inv;
    if (u < 0 || u > 1)
        return inter;
    Vector3f qvec = crossProduct(tvec, e1);
    v = dotProduct(ray.direction, qvec) * det_inv;
    if (v < 0 || u + v > 1)
        return inter;
    t_tmp = dotProduct(e2, qvec) * det_inv;//交点到沿光线到摄像机的距离  
    // TODO find ray triangle intersection
    //有交点，更新inter属性  
    inter.happened=true;
    inter.coords=ray(t_tmp);//计算对应的交点坐标(Ray重载了那个()操作符)
    inter.normal=normal;//法向量  
    inter.distance=t_tmp;//距离
    inter.obj=this;//交点所在的三角形  
    inter.m=m;//材质，类的成语阿
    return inter;
}


### RayBoundding Valume  
> 上一个实验我们直接计算从射线与每个三角形的交点，这里首先在场景中生成立方体，检测光线是否与立方体有交点，如果没有的话就直接跳过。有的话按照原来的方法算  
- Bounds3.hpp  
  > 这个是对应的包围盒的类，需要实现的是其中的  IntersectP  
  - 成员变量
    - pMax,p_Min就是立方体最大和最小的点(前边的左下方的点和后边的右上方的点)
  - 函数
    - Diagonal()：返回包围盒的对角线向量
    - maxExtent()：返回包围盒最大尺寸的方向索引（0对应X轴，1对应Y轴，2对应Z轴）
    - SurfaceArea()：计算并返回包围盒的表面积
    - Centroid()：计算并返回包围盒的中心点
    - Intersect(const Bounds3& b)：返回与另一个包围盒b相交部分的新包围盒
    - Offset(const Vector3f& p)：给定一个点p，计算该点在包围盒内的归一化偏移坐标
    - Overlaps(const Bounds3& b1, const Bounds3& b2)：判断两个包围盒是否重叠
    - Inside(const Vector3f& p, const Bounds3& b)：判断点p是否在包围盒b内部
    - 括号运算符重载operator[]：允许通过索引访问pMin，pMax
    - Union(const Bounds3& b1, const Bounds3& b2)：计算并返回包含两个包围盒的最小包围盒
    - Union(const Bounds3& b, const Vector3f& p)：计算并返回同时包含包围盒b和点p的最小包围盒
- 待实现IntersectP(const Ray& ray, const Vector3f& invDir, const std::array<int, 3>& dirIsNeg)
> 判断光线是否与包围盒相交
  - 传入参数  
    - ray : 光线  
    - invDir : 光线的方向向量的到数  
    - dirIsNeg : 光线在x,y,z轴上的正负  
    - 后两者的传入都是为了加快速度的  
  - 计算步骤  
    - 首先计算从光线的源点到立方体的两个点pMin,pMax的x,y,z方向的参数，用于代表光线到立方体的两个点的时间  
    - 根据光线在各轴上的方向（正或负），调整最小和最大的t值。如果光线在某轴上的方向为负（即向量分量为负），则进入包围盒的临界时间实际上是与最大边界相交的时间，退出时间是与最小边界相交的时间，那就需要交换t_Min和t_Max(自己比划一下就比较好理解了)  
    - 然后就是计算x,y,z轴各自t_Min中的最大值就是进入立方体的时间t_enter，x,y,z轴各自的t_Max的最小值就是立方体出来立方体的时间t_exit  
    - 如果t_exit>=0 而且 t_enter< t_exit那就说明相交了  
cpp
inline bool Bounds3::IntersectP(const Ray& ray, const Vector3f& invDir,
                                const std::array<int, 3>& dirIsNeg) const
{
    // invDir: ray direction(x,y,z), invDir=(1.0/x,1.0/y,1.0/z), 
    //   use this because Multiply is faster that Division
    // dirIsNeg: ray direction(x,y,z), dirIsNeg=[int(x>0),int(y>0),int(z>0)], 
    //   use this to simplify your logic
    // TODO test if ray bound intersects
 
    float t_Min_x = (pMin.x - ray.origin.x)*invDir[0];
    float t_Min_y = (pMin.y - ray.origin.y)*invDir[1];
    float t_Min_z = (pMin.z - ray.origin.z)*invDir[2];
    float t_Max_x = (pMax.x - ray.origin.x)*invDir[0];
    float t_Max_y = (pMax.y - ray.origin.y)*invDir[1];
    float t_Max_z = (pMax.z - ray.origin.z)*invDir[2];
    
    //dirIsNeg表面光线的方向，如果是正方向则为1，pmin-O为最短路径
    //反之为负方向0，pmax-O是最短路径
    if(!dirIsNeg[0])
    {
        float t = t_Min_x;
        t_Min_x = t_Max_x;
        t_Max_x = t;
    }
    if(!dirIsNeg[1])
    {
        float t = t_Min_y;
        t_Min_y = t_Max_y;
        t_Max_y = t;
    }
    if(!dirIsNeg[2])
    {
        float t = t_Min_z;
        t_Min_z = t_Max_z;
        t_Max_z = t;
    }
 
    float t_enter = std::max(t_Min_x,std::max(t_Min_y,t_Min_z));
    float t_exit =  std::min(t_Max_x,std::min(t_Max_y,t_Max_z));
    if(t_enter<t_exit&&t_exit>=0)
        return true;
    else
        return false;
    
}

### BVH  
> 递归判断应用上面我们写的算法  
> 在参考文章中详细的解释了这一部分的原理，我就不解释了  
cpp
Intersection BVHAccel::getIntersection(BVHBuildNode* node, const Ray& ray) const
{
    // TODO Traverse the BVH to find intersection
    std::array<int, 3> dirIsNeg; // 和getInsectin一样光线在各坐标轴方向的正负
    dirIsNeg[0] = (ray.direction[0] > 0); //x
    dirIsNeg[1] = (ray.direction[1] > 0); //y方向
    dirIsNeg[2] = (ray.direction[2] > 0); //z方向

    Intersection inter; //初始化一个表示相交信息的对象，初始默认为未找到交点

    // 如果当前的节点其包围盒与光线没有交点，则直接返回
    if (!node->bounds.IntersectP(ray, ray.direction_inv, dirIsNeg)) {
        return inter;
    }

    // 如果当前节点是叶子节点
    if (node->left == nullptr && node->right == nullptr) {
        //直接看看这个节点的包围盒中的物体与光线的交点信息
        return node->object->getIntersection(ray);
    }

    //左
    Intersection leftInter = getIntersection(node->left, ray);
    //右
    Intersection rightInter = getIntersection(node->right, ray);

    //比较左右子树返回的交点信息，返回距离光线源更近的那个交点信息
    return leftInter.distance < rightInter.distance ? leftInter : rightInter;
}`

                ,
                api: `
# 计算机网络复习  
## Chapter 1 引言  
### 1. 网络协议的概念  
定义了两个或多个通信实体之间交换报文的顺序、格式以及报文的发送、接收或者其他事件所采取的操作。  
### 2. 网络边缘设备，核心设备，传输媒介  
#### 边缘设备
- 端系统(主机)
  - 个人电脑  
  - 服务器  
  - ... ...
> 接入网： 将端系统连接到边缘路由器  
#### 核心设备  
- 为了传输，将长报文分割为短的数据块进行传送(分组)  
- 每个分组都通过通信链路和交换机进行传送 
- 交换机分为  
  - 路由器  
  - 链路层交换机  
#### 传输媒介 
- 物理媒介  
  - 双绞铜线  
  - 同轴电缆  
  - 光纤  
  - 陆地无线电信道  
  - 卫星无线电信道  
### 3. 包交换与电路交换  
- 包交换(分组交换)  
  - 路由器接收所有的包后将其发往目的地  
- 电路交换  
> 端到端建立专用的连接  
  - 频分复用  
   - 将线路直接划分  
  - 时分复用  
   - 按时间，每个连接在每一秒的某个时刻传输  
   - 时隙  
   - 帧  
### 4. ISP  
- 互联网服务提供商  
- 有很多层ISP构成，顶层是内容提供网络  
- 较低层的ISP是较高层ISP的客户  
- ISP之间可以通过IXP进行交换  
### 5. 网络四类延迟的概念和计算  流量强度  网络吞吐量  
#### 网络四类延迟  
- 处理延迟（Processing Delay
  - 数据包在经过每个网络设备（如路由器、交换机）时，设备需要花费时间来分析包头，决定如何转发数据包。这个时间很短，但不可忽略，特别是在高速网络中。
- 排队延迟（Queuing Delay）
  - 数据包在进入网络设备前可能需要在缓冲区排队等待处理。当网络拥塞时，排队延迟会显著增加。
- 传输延迟（Transmission Delay
  - 数据包实际在链路上发送所需的时间，计算公式为数据包长度除以链路带宽（以位/秒为单位）。例如，一个1500字节的数据包通过100Mbps的链路传输时，传输延迟大约是12μs（1500*8 / 10^7）。
- 传播延迟（Propagation Delay
  - 信号在物理介质中传播的时间，取决于介质的物理特性（如光速在光纤中的速度约为200,000 km/s）。传播延迟计算公式为距离除以信号传播速度。
#### 流量强度  
#### 网络吞吐量  
网络吞吐量是指在给定时间内，网络成功传输数据的实际速率。它是评价网络性能的重要指标，通常以比特每秒（bps）或字节每秒（Bps）为单位  
### 6. 单位换算  
### 7. 计算机网络分层  
- 应用层  
  - 应用程序以及应用协议存留之地  
  - 位于应用层的分组称之为报文  
  - HTTP，SMTP，FTP  
- 运输层  
  - 在应用程序的端点之间传输应用层报文  
  - 分组称之为报文段  
  - TCP，UDP  
- 网络层  
  - 网络层称之为 数据报  
  - 主机到主机之间  IP  
- 链路层  
  - 每一个节点，接收上一个来自链路层的数据报上传给网络层，再传给链路层传播  
  - 链路层的分组称之为 帧  
- 物理层  
  - 将帧一个个比特传输到下一个节点   


## Chapter 2 应用层  
### HTTP协议  
- 超文本传输协议  
- 由客户程序和服务程序实现  
- HTTP协议使用TCP作为运输层协议  
- 非持续连接和持续连接  
  - 每次请求建立TCP连接，请求完成后断开
  - 建立连接一值存在(浪费资源)  
- 报文格式  
  - 请求报文  
    - 首行
      - 方法字段: GET POST HEAD PUT DELETE  
      - URL字段  
      - HTTP版本字段  
  - 响应报文  
    - ... ...  
    - 状态码  
      - 200 OK  
      - 301 Moved Permnently  
      - 400 Bad Request 无法被理解  
      - 404 Not Found 文件不再服务器上  
      - 505 版本问题  
- HTTP2成帧  
  - HOL阻塞(队首阻塞)  
    - 每个Web页面有很多不同的对象，每个对象都要被请求  
    - 如果前面的对象过大就会导致对应的Web页面后续的内容无法加载  
  - 解决  
    - 将所有的对象报文分割成帧，交替发送这些帧  
- HTTP2 允许HTTP接收一个请求返回多个对象  
- 可以设置Web中的对象优先级顺序
### Web缓存  
- Web缓存器亦称之位代理服务器，代替原始的Web来响应客户的请求  
- 浏览器会在加载网页时首先与Web缓存器建立TCP连接，如果没有请求的内容就会自动的再次请求原始服务器，并存储请求结果到Web缓存器  
- 优点是： 
  - 加快响应
  - 减缓原始服务器的压力  、
### STMP 邮件协议的流程  
- 基本流程  
  - 用户A提交邮件到A的代理  
  - A的代理上传至A的邮件服务器  
  - A的邮件服务器通过SMTP传输给B的邮件服务器  
  - B的代理通过B的邮件服务器获取得到对应的邮件  
- 一些细节  
  - STMP 一般不会经过中专的服务器  
  - B的代理会通过HTTP / IMAP 协议来获取邮件  
### DNS(域名系统)  
- 进行主机名到IP地址的转换服务  
- DNS 是
  - 一个由分层的DNS服务器实现的分布式数据库  
  - 一个使得主机可以查询分布式数据库的协议  
- DNS 运行在 UDP之上  
- DNS 提供的功能  
  - 提供利用主机名查询IP  
  - 可以通过主机别名利用DNS获得对应的规范主机名  
  - 同样可以通过邮件主机别名获得对应的规范主机名  
  - 负载分配
    - DNS 存在冗余的服务器(主机)，一些繁忙的站点会分配到多个服务器上  
    - 接收到查询请求时，DNS响应的是一个主机集合，但是每次回答会从这些集合循环依次地选择一个  
- DNS的工作机理  
  - 1、采用单个服务器作为DNS服务器  
    - 单点故障  如果这个服务器瘫痪，整个计算机网络随之瘫痪  
    - 通信容量  单个服务器的压力很大   
    - 远距离集中  对于不同的地理位置有不同的响应速度，最长甚至跨越半个地球  
    - 维护  维护的数据库及其庞大，同时需要对新增的主机不断更新   
  - 分布式，层次式数据库  
    - 有三类 DNS 服务器  
      - 根 DNS服务器 
        - 根服务器提供TLD(顶级域服务器的IP地址)  
      - 顶级域服务器  
        - 对于每个顶级域都有对应的顶级域服务器  
        - com,org,cn ... ... 
      - 权威域服务器  
        - 在因特网上有可访问的主机的组织，机构提供DNS记录  如google，腾讯  
    - 另外一个重要的DNS服务器  - 本地DNS服务器  
      - 首先展示一个DNS查询的基本流程  (以www.baidu.com为例)
        - 主机->本地DNS服务器  
        - 本地DNS服务器-> 根服务器 
        - 根服务器返回给本地DNS服务器顶级域的IP列表
        - 本地服务器查询根据IP列表查询得到顶级域服务器的IP并请求(根据顶级域com)
        - com顶级域服务器返回一个IP给本地服务器 
        - 本地服务器根据IP查询百度权威服务器(根据baidu) 
        - 权威服务器返回给本地服务器
        - 本地服务器返回给主机  
      - 一个四次查询，四次回应  
      - 即存在递归查询也存在迭代查询  
    - DNS 缓存  
      - 就是存在那个 本地DNS服务器的 玩意  
### P2P协议内容分发  
### 视频流与协议内容分发  
#### 视频流  
- 通过建立TCP连接，将视频按字节发送到客户，客户有一个缓存，缓存达到一定值后开始播放  
- 对于不同的网络情况使用不同的质量的资源  
  - 将视频分为多种不同的质量  
  - 每个质量的视频分割为视频块  
  - 每次都请求视频块  
#### CDN 内容分发网络  
- 服务器安置策略 
  - 1、 深入ISP的接入网中部署服务器集群  
    - 尽量靠近端系统
  - 2、 邀请做客  
    - 将集群放在因特网交换节点(IXP)中  
- CDN 操作  
  - CDN需要截取浏览器的对视频的请求，以便可以：
    - 确定此时适用于该用户的CDN的集群  
    - 将客户的请求重定向到这个对应的CDN集群  
  - 集群选择策略  
    - 选择地理上最近的  
    - 实时测量  
## Chapter 3 传输层  
### Socket 接口的概念  
- 它提供了一种机制，允许不同的应用程序通过网络进行通信。  
- 一些功能和特性  
  - **API抽象层：** Socket是一个抽象层，它将复杂的TCP/IP协议族细节隐藏在一套简单的编程接口之后，使得开发者无需深入了解底层网络协议的具体实现就能编写网络应用程序。
  - **网络通信基础：** Socket接口定义了一系列函数或方法，允许程序创建、监听、连接、发送和接收数据以及关闭网络连接。这些操作涵盖了网络通信的基本需求
  - **端点通信模型：** 在Socket通信模型中，每个Socket都关联了一个IP地址和端口号，这两个元素合起来唯一标识了一个网络服务。IP地址标识了网络中的主机，端口号标识了主机上的应用程序。因此，通过Socket，两个应用程序可以在网络上建立连接并交换数据。
  - **支持多种通信协议：** 虽然Socket接口常与TCP（传输控制协议）和UDP（用户数据报协议）关联，但它也支持其他传输层协议，如ICMP（互联网控制消息协议）等。TCP提供面向连接的、可靠的字节流服务，而UDP提供无连接的、尽最大努力交付的数据报服务。
  - **跨平台兼容性：** 尽管不同操作系统上的Socket实现可能有所不同，但大多数现代操作系统和编程语言（如C、Java、Python等）都支持基于TCP/IP的Socket编程，保证了基本的编程接口和行为的一致性。
  - **全双工通信：** Socket支持全双工通信，这意味着数据可以同时在两个方向上传输，允许双方互不影响地发送和接收数据。  
### 应用进程的复用与解复用  
- 多路复用
  - 在源主机中收集不同套接字的数据块，并为每个数据块封装上首部信息，从而生成报文段，将报文段传递给网络层   
- 多路分解  
  - 将运输层报文段的数据传递给正确的套接字  
- 一个例子  
  - 复用 
    - 所有要寄信的人将对应的信给邮递员，这个叫做复用  
  - 解复用
    - 快递员正确的把对应的信送给要对应的收信人  
- 分为  
  - 无链接的复用与解复用   
  - 面向连接的复用与解复用  
### UDP  
- 除了复用/分解功能之外以及少量的差错检测之外，UDP几乎没有对IP添加任何东西   
- DNS查询就是使用 UDP协议  
- UDP协议相对于TCP协议的优点   
  - 关于发送什么数据以及何时发送 对应用层的控制更加精细  
  - 无需连接建立  提升效率  
  - 无链接状态  不会占用资源  
  - 首部字段小  传输效率高  
- UDP提供差错检测 不提供差错恢复  
### TCP  
#### 可靠传输  
- rdt 1.0 经由完全可靠信道的可靠数据传输  
- rdt 2.0 经由具有比特差错信道的可靠数据传输  
  - 采用了 ARQ 协议(自动重传请求协议)  
    - 差错检测   
    - 接收方反馈  
      - 肯定确认  ACK  
      - 否定确认  NAK  
    - 重传  
      - 接收到有差错的分组会自动重传   
  - 在等待接收方反馈即ACK/NAK时，其处于等待状态，不可以接收更多的分组。称之为 **亭等** 协议  
- rdt 2.1  
  - 一个致命的缺陷是rdt2.0无法对ACK/NAK错误的情况做处理  
  - 解决  
    - 遇到模糊不清的分组，直接进行重传  引入了 **冗余分组**
    - 每个发送加上一个序号，因为是亭等的协议，所以序号只需要有0，1两个状态即可，通过判断是否有连续的 1 0 来判断是否为重传  
- rdt 2.2 VS rdt 2.1  
  - rdt 2.2 必须包含一个由ACK确认的序号  
- rdt 3.0  (亦称之为比特交替协议)
  - 实现基于时间的重传机制  
    - 需要一个倒计数定时器，当时间超过限制，可以中断发送方  
    - 发送方需要实现  
      - 每次发送启动一个定时器  
      - 可以响应计时中断  
      - 可以终止定时器  
- 流水线可靠数据传输协议  
  - rdt 3.0 协议是一个停等协议，其性能不行  
  - 一次性发送多个分组  
  - 可能带来的问题  
    - 需要增加序号的范围  
    - 在接收方添加缓存用来缓存已经接收的正确的分组  
    - 如何处理差错？
      - 选择重传或者回退N步  
  - **回退N步 GBN**  
    - 维护一个长度为n的滑动窗口  
    - 窗口中的是未被确认的分组  
      - 包含已发送未被确认和未发送的分组  
    - 如果发现接收了一个失序的分组，就会不断的返回上一个的确认成功的信息，如果上一个确认的无差错的返回信息为ACK1,接下来无论接收到什么都会返回ACK1  
    - 所有之后的失序的分组都会被丢弃并重传  
  - **选择重传 SR**  
    - 会缓存失序的分组直至所有的丢失的分组被接收到  
    - 之后发送确认并将已经传输完成的有序的分组交付  
#### 连接建立 与 关闭
- **同步请求（SYN）**：客户端首先向服务器发送一个TCP段，该段中SYN（同步序列编号，Synchronize）标志被置为1，表示这是一个连接请求。此外，客户端还会随机选择一个初始序号（Initial Sequence Number, ISN），并将这个序号放在TCP头部的序号字段中。这个报文不携带任何数据，仅用来同步连接。
- **同步确认与请求（SYN-ACK）**：服务器接收到客户端的SYN报文后，如果同意建立连接，则会发送一个确认报文给客户端。这个报文中，SYN标志也被置为1，表示服务器也在进行连接请求；ACK（Acknowledgment）标志被置为1，表示这是一个确认报文。服务器也会选择自己的ISN，并将其放在序号字段中。同时，服务器会在确认号（Acknowledgment Number）字段放入客户端的ISN加1，表示确认收到了客户端的SYN报文。这个报文同样不携带数据。
- **确认连接（ACK）**：客户端收到服务器的SYN-ACK报文后，需要发送最后一个确认报文给服务器。这个报文中ACK标志被置为1，确认号字段设置为服务器的ISN加1，表明客户端已经收到了服务器的SYN报文。此时，客户端的TCP状态变为ESTABLISHED（已建立连接）。服务器在收到这个确认报文后，也会进入ESTABLISHED状态，至此，TCP连接完全建立，双方可以开始互相发送数据。  这个阶段可以在报文段携带从客户到服务器的数据  
- **主动关闭方发送FIN**：当一个方向上的数据传输完成，该方向的发送方会发送一个包含FIN（Finish）标志的TCP段给对方。这表示该方向的数据流已经结束，但接收方仍可以继续发送数据。FIN标志位被置为1，序号为发送方的下一个期望的序号。
- **被动关闭方发送ACK**：接收方接收到FIN后，会发送一个ACK（Acknowledgment）报文给发送FIN的一方，确认收到了FIN报文。ACK报文的确认号为接收到的FIN报文的序号加1，表示已经准备好关闭这个方向的连接。此时，连接处于半关闭状态（half-closed），即发送FIN的一方不能再发送数据，但接收方仍可以继续发送数据。
- **被动关闭方发送FIN**：当被动关闭方也完成了数据传输，它也会发送一个FIN报文给主动关闭方，表示自己也准备好关闭连接了。
- **主动关闭方发送ACK**：主动关闭方接收到被动关闭方的FIN后，会回复一个ACK报文，确认收到FIN。这时，被动关闭方进入LAST_ACK状态，等待最终的ACK。主动关闭方在发送完这个ACK后，进入TIME_WAIT状态，等待足够的时间以确保最后一个ACK报文能够到达对方。这个时间通常是2MSL（Maximum Segment Lifetime，最大报文生存时间）。

当被动关闭方收到这个最终的ACK后，连接正式关闭。而主动关闭方在TIME_WAIT状态等待一段时间后，如果没有收到任何异常情况的报文，也会关闭连接。
#### RTT的估计  
- RTT 估计  
$$
EstimatedRTT= (1- \alpha)EstimatedRTT + \alpha \cdot SampleRTT
$$  
- RTT 的变化  
$$
DevRTT= (1-\beta) \cdot DevRTT + \beta \cdot |EstimatedRTT-SampleRTT|
$$
- 设置超时值  
$$
Timeout= EstimatedRTT + 4 \cdot DevRTT
$$
#### 流量控制  
- 为了消除发送方使接收方溢出的可能性  
- 是一个速度匹配服务，即发送方的速率与接收方的速率匹配  
- 核心组建为滑动窗口协议  
- 滑动窗口协议的工作原理  
  - 接收窗口通告：在TCP连接建立和数据传输过程中，接收方会通过TCP报文段中的窗口大小字段来通告其当前可以接收的数据量。这个值反映了接收方缓冲区的可用空间，即接收窗口大小。
  - 发送窗口调整：发送方根据接收窗口的大小来调整自己的发送窗口，确保不会发送超过接收方能处理的数据量。发送窗口的大小是动态变化的，永远不会超过接收窗口的值。
  - 数据发送与确认：发送方按照发送窗口的限制发送数据，并等待接收方的确认（ACK）。每个ACK通常会包含接收窗口的最新大小信息，以便发送方适时调整其发送速率。
  - 窗口滑动：当发送的数据被确认接收后，发送窗口向前滑动，释放空间用于发送新的数据。如果接收方处理了数据并有更多缓冲空间可用，它会通过ACK更新其窗口大小，允许发送方增加发送速率。
  - 零窗口情况：如果接收方暂时无法接收更多数据（例如，因为缓冲区满或处理能力达到上限），它会通告一个窗口大小为0的ACK，迫使发送方停止发送，直到接收方能够再次接收数据时发送非零窗口大小的通知。
- 通过这种机制，TCP流量控制实现了发送速率和接收能力之间的动态平衡，优化了网络资源的使用，减少了数据包丢失和重传的需要，提升了整体的网络通信质量  
#### 拥塞控制  
- 丢包 ： 一般是因为网络拥塞而导致路由器产生缓存溢出从而产生的丢包  
- 分组重传作为网络阻塞的象征，无法判断产生网络阻塞的原因  
- 产生网络拥塞的原因
  - 网络中的数据传输量接近于或者超过网络中基础设置的处理能力  
- TCP 的拥塞控制  **AIMD**(加性增，乘性减)
  - **曼开始**  
    - 连接建立初期，TCP使用慢开始算法逐步增加拥塞窗口（cwnd）的大小。初始时，cwnd设置为一个很小的值（通常是1或2个最大段大小MSS），每收到一个确认ACK，cwnd就翻倍，从而使得发送速率快速上升。当cwnd达到慢开始阈值（ssthresh）或者检测到丢包时，慢开始阶段结束，转为拥塞避免阶段。
    - 此阶段可以快速的提升发送速率  
  - **拥塞避免**  
    - TCP不再成倍增加cwnd，而是每接收到一个ACK后仅增加一个MSS，这样就可以平缓的增加数据的发送速率而不会导致网络过快到达饱和   
    - 此阶段的目的是探测网络的额外容量而不引起拥塞    
  - **(快重传)**
    - 如果接收方检测到包的丢失，会主动向发送方发送重复的ACK，而不是等待重传倒计时结束
    - 发送方如果接收到对应的三个或者更多的重复ACK，就会立即重传疑似丢失的数据，无需等带定时器触发  
  - **快速恢复**  
    - TCP在快重传后进入快速恢复状态  
    - TCP将ssthresh设置为当前cwnd的一半，然后设置cwnd为ssthresh+丢失数据段的个数(一般为3)，之后执行拥塞避免策略，线性增加cwnd。
    - 目的是快速从丢包事件中恢复，同时避免再次引发拥塞  
  - TCP CUBIC  
    - 在仅当接收到ACK时增加拥塞窗口  
- 一个  
  - W为对应窗口的长度，单位为字节  
  - RTT即为往返时间  
$$
一条连接的平均吞吐量 = \frac {0.75 \cdot W} {RTT} 
$$  
>  上边讲的是端到端的，不会接收到网络层关于网络拥塞信息的控制  
- 网络辅助的明确拥塞通告和基于时延的拥塞控制  
  - ... ... 
## 网络层  
> 网络的每一台主机和路由器中都有一个网络层  
> - 网络层可以被分解为两个部分  
>   - 数据平面  
>     - 转发  
>     - 到达路由器的输入链路之一的数据报如何转发到该路由器的输出链路之一  
>   - 控制平面  
>     - 路由选择  
>     - 协调这些本地路由器的转发操作， 使得数据报沿着源和目的地之间的路由器路径进行端到端传输  
> - 网络路由器的一个关键元素是**路由表**
### 路由和转发的概念  
#### 路由  
- 在网络中确定数据包从源到目的地的最佳路径的过程  
- 更详细的，就是根据网络拓扑，链路状态，网络政策等因素确定数据应该通过那些路由器和链路传递
- **AI补充 ：** 路由决策通常基于路由表，路由表中包含了到达各个网络或子网的下一跳信息。路由表可以通过静态配置（静态路由）或动态路由协议（如RIP、OSPF、BGP等）来生成和维护。路由选择是网络层（OSI模型中的第三层）的功能，它确保了跨网络的数据传输能找到合适的路径。
#### 转发  
- 概念 ：  转发是指数据包实际从一个网络设备（如路由器、交换机）的一个接口接收后，根据转发表（也称作交换表或MAC地址表）将其从另一个接口转发出去的过程。  
- 路由器的体系结构  
  - 输入端口  
  - 交换结构
  - 输出端口  
  - 路由选择处理器(控制平面)  
  - more  
    - 基于目的地转发 
    - 泛化转发  
### IP地址  
#### IPV4  
- IPV4数据报格式  
  - ... ...
- IPV4  
  - 主机，路由器与物理链路之间的边界称之为接口  
  - 在这里IP与一个接口相关联，而不是与包括该接口的主机和路由器相关联  
### 子网与子网掩码，最长匹配原则  
> CIDR 区别于 分类编码  
> - 在传统的分类IP地址系统中，IP地址被分为A、B、C等不同类别，每种类别的网络大小固定，这导致了IP地址空间的浪费。而CIDR抛弃了这种分类体系，采用了可变长度子网掩码(VLSM)，允许更灵活地划分IP地址空间。
> - CIDR的核心概念是“网络前缀”，它用一个斜杠“/”后面跟着一个数字来表示。这个数字代表IP地址中用作网络部分的比特数。例如，一个CIDR表示法如“192.0.2.0/24”意味着前24位是网络部分，剩下的8位用于主机标识。这使得一个CIDR块可以包含多个传统分类地址块，从而实现了地址的聚合，减少了在路由器中需要维护的独立路由条目数量。
#### 子网与子网掩码  
- 例子  
  - 一个由三个主机和一个路由器接口组成的系统就可以称之为一个子网  
  - IP编址为这个子网分配一个地址，这个地址就可以称之为 **子网掩码**
  - 对于 221.0.1.0/24 的解释  
    - /24 指示32bit的前24bit构成了子网的地址  
      - 即 221.0.0    
    - 所有连接到子网221.0.1.0/24的IP都有 221.0.1.XXX 的格式  
- 更一般的一个例子  
  - 对于 a.b.c.d/x  
    - 一共由32bit
    - 前x bit构成IP地址的网络部分
    - 后 32-x bit位可以视为对这个网络/组织内 的编码  
#### 最长匹配原则  
> 转发表 ： 类似于 IP - 接口编码  的键值对
- 就是路由器在通过转发表查询匹配项时，往往会出现无法找到完全匹配的情况  
- 此时就可以寻找最长匹配项返回  
### DHCP进行IP获取  
- 动态主机配置协议  
- 一般流程  
  - DHCP服务器发现  
    - 一台主机需要首先有一台与器进行交互的DHCP服务器  
    - 通过广播的方式，通过链路层发送给所有与本子网连接的节点  
  - DHCP服务器提共 
    - 一个子网可能有多个DHCP服务器  
    - 也是采用广播的方式，向请求的主机发送
      - 报文事务ID  
      - 推荐的DHCP服务器IP  
      - 网络掩码  
      - IP的租用期  
  - DHCP请求  
    - 从提供的DHCP服务器选择一个发送DHCP请求报文，其中包含了对应的配置参数  
  - DHCP ACK   
    - DHCP服务器返回一个ACK确认其所请求的参数  
### NAT IPV6 
#### NAT  

#### IPV6  
- 32 bit -> 128->bit  
- IPV6 向后兼容，可以接收IPV4数据报  
- 但是IPV4可能无法接收IPV6的数据报  
  - 解决 (从IPV4 到 IPV6的迁移 )
    - 如果两个采用IPV6协议的节点要交换信息，但是中间的路由器是IPV4，那么就称中间的这些IPV4路由器 为隧道  
    - 将IPV6的数据报放在IPV4协议的数据(有效载荷字段中)在IPV之间进行传输  
### 路由选择算法  
- 目的是从发送方到接收方的过程中选择一个通过路由器网络好的路径  
- 集中式路由选择算法
  - 具有全局的状态信息，有称之为链路状态算法  
- 分散式路由选择算法
  - 仅有与其相邻节点的信息，其中的一个是距离向量算法  
- 另一种分类  
  - 静态路由算法
  - 动态路由算法  
- 另一种分类  
  - 负载敏感  
  - 负载迟钝  
- 集中式路由选择算法之 Dijkstra 算法  
  - 无许多言
- DV算法  
  - 分布式，迭代，异步的算法  
  - 假设我们有一个简单的网络，包含四个路由器A、B、C和D，以及它们之间的直接连接。每个路由器初始只知道直接相连的网络：
    - A直接连接到B和C。
    - B直接连接到A和D。
    - C直接连接到A。
    - D直接连接到B。
  - 每个路由器的初始路由表（只显示到其他路由器的距离）可能如下：
    - A: 到B=1, 到C=1, 到D=∞
    - B: 到A=1, 到C=∞, 到D=1
    - C: 到A=1, 到B=∞, 到D=∞
    - D: 到A=∞, 到B=1, 到C=∞
  - 第一轮信息交换
    1. **A发送给B和C**：“到A=0, 到B=1, 到C=1, 到D=∞”
    2. **B发送给A和D**：“到A=1, 到B=0, 到C=∞, 到D=1”
    3. **C发送给A**：“到A=0, 到B=∞, 到C=0, 到D=∞”
    4. **D发送给B**：“到A=∞, 到B=0, 到C=∞, 到D=0”
  - 第一轮更新后
    - **A更新**：从B的信息知道可以通过B到达D，距离为1+1=2，因此A的路由表变为：到B=1, 到C=1, 到D=2（通过B）
    - **B更新**：从A的信息知道可以直接到达C，距离为1，因此B的路由表变为：到A=1, 到C=2（通过A）, 到D=1
    - **C没有新信息更新**
    - **D更新**：从B的信息知道可以通过B到达A，距离为1，因此D的路由表变为：到A=2（通过B）, 到B=1, 到C=∞

  - 第二轮及之后
    - 经过几轮这样的信息交换和更新，最终所有路由器都会得知到其他所有路由器的最短路径。例如，第二轮后D会更新到C的距离为3（通过B再到A再到C），而C也会得知到D的距离为3（通过A再到B再到D）。最终，所有路由表将稳定下来，反映出整个网络的最短路径信息。
    - 请注意，实际操作中还需要考虑避免路由环路的技术，如水平分割（不向信息来源方向回传路由信息）等，以确保算法的正确性和效率。
  - DV算法的一些问题  
    - 链路开销与链路改变引起的无穷计数问题  
      - 是由信息不一致导致的
      - 毒性逆转可以解决两个节点的环路问题，对三个及以上无能为力
        - 当一个路由器检测到某一个路径不可用立刻广播或发送到他相邻的节点/路由器  
- LS vs DV  
  - 报文复杂性   
    - LS 需要向所有节点发送链路开销  O(|e||v|)
    - DV 仅需要向相邻的发送  
  - 收敛速度  
    - LS 要有 O(|E||V|)个O(|N|^2)
    - DV 收敛慢，会出现路由选择环路和无穷计数问题  
  - 健壮性  
    -  LS 的计算是相对分离的  提供了一定的健壮性  
    - DV 的健壮性不匝地  
### 路由协议  OSPF BGP  
#### OSPF  
- 自治系统内协议 
- 对于同一个AS内的选择协议
- 使用洪泛链路状态信息和Dijkstra算法  
- 工作  
  - 路由器向自治系统内的所有路由器广播路由选择信息，而不仅仅是向其相邻的路由器广播  
  - 每当链路状态发生变化就会广播一次
  - 即使没有发生变化也会广播  
> 周期性的更新广播增加了其健壮性  
- 优点(简略)  
  - 安全，可以鉴别OSPF路由器之间的交换  
  - 多条相同开销的路径  
  - 对单播和多播路由的综合支持  
  - 支持在单个AS的层次结构  
#### BGP  
- 自治系统间协议  
- 对于不同的AS之间的协议，也就是源和目的地不再同一个AS  
  - 也就是AS间的路由选择协议  
- 在BGP中  
   - 分组不是路由到达一个特定的目的地址，而是路由到CIDR化的前缀  
   - 每个前缀表示一个子网或者子网集合  
- BGP 为每一台路由器提供的功能：  
  - 从邻居AS 获得前缀的可达性信息  
  - 确定到该前缀最好的路由  
- 外部BGP/内部BGP  
  - 外部即跨AS的  eBGP
  - 内部即在同一个AS 内的  iBGP
- 



### SDN  
- 全称为软件定义网络（Software-Defined Networking），是一种先进的**网络架构模型**，它通过将**网络的控制平面**与**数据转发平面**分离，实现了**网络控制的集中化和网络服务**的可编程性。这种分离允许网络管理员通过软件编程的方式来控制网络设备的行为，而无需对每个单独的网络设备进行配置。
- 四个关键特征  
  - 基于流的转发  
  - 数据平面与控制平面分离   
  - 网络控制功能- 在数据平面交换机外部实现  
  - 可编程的网络  
- 数据平面交换机、SDN控制器、网络控制应用程序是分离的实体  
## Chatpter 6 链路层   
### 概述  
- 链路层提供的服务  
  - 成帧 ： 帧的结构由链路层协议规定  
  - 链路接入 ： MAC(介质访问控制协议) 规定了帧在链路上的传输规则 
  - 可靠交付 ： 主要用于无线传输，有线传输因为很少会出错所以可以直接依靠其上层即运输层的可靠交付即可   
  - 差错检测和纠正  
- 大部分链路层在硬件实现，小部分在软件(CPU) 
- 比特级校验 奇偶校验  
- 现代使用的：
  - 循环冗余检测编码(CRC)，也称之为多项式编码  
### 多路访问链路和协议  
- 两种类型的网络链路  
  - 点对点链路  
    - 由单个发送方和单个接收方
  - 广播链路 
    - 多个发送方，接收方都连接到相同、单一、共享的广播信道  
- 多路访问问题  
  - 如何协调多个发送方，接收方对同一个广播信道的访问  
  - 解决  
    - 通过多路连接访问协议来规范多个发送方、接收方在共享广播信道上的行为  
  - 碰撞  
    - 如果多个节点发送帧，而接收节点就会接收到多个帧，这个就叫做碰撞。碰撞的帧是无效的  
- 协议分类  
  - 信道划分协议  
    - 时分复用  
    - 频分复用  
    - 码分多址  
      - 每对节点采用不同的编码  
  - 随机接入协议 
    - ALOHA  
      - 划分为时隙  
      - 每个节点都知道什么时候时隙开始  
      - 每次每个节点想要发送帧就直接发送  
      - 多个节点同一个时隙发送会发生碰撞  
        - 这时所有的发送失败  
        - 所有的发送的帧都会在之后的时隙以 p 的概率重发  
    - 载波侦听多路访问 CSMA  
      - 载波侦听  
        - 节点传输前先听信道，如果当前信道有帧在传输，等待直至有一段时间无传输，此时节点开始传输  
    - 有了碰撞检测的载波侦听多路访问 CSMA/CD  
      - 碰撞检测  
        - 如果一个节点在传输时发现有其他的帧传进来了，就停止一小段时间然后再重复 侦听-当空闲时传输  
  - 轮流协议  
    - 轮询协议  
    - 令牌传递协议  
- DOCSIS 结合了以上三种协议  
- 协议应具备的特性  (对于速率为Rbps的广播信道)
  - 只有一个节点传输时具有Rbps的吞吐量  
  - M个节点传输时具有Rbps/M的吞吐量(每个) ，不要求节点每时每刻都是这个速率，只需要在一段时间内的平均速率是这个就可  
  - 去中心化 ： 不会因为某个主节点故障导致整个系统崩溃 
  - 简单 ： 实现简单  
### MAC 地址与 ARP 协议  单跳间寻址  
#### MAC地址
- 网络接口具有链路层地址  
- 链路层地址有不同的称呼方式  
  - LAN地址  
  - MAC地址  
  - 物理地址  
- 没有两块适配器具有相同的地址  
#### ARP 地址解析协议  
- 因为存在网络层地址(一般为IP)和链路层地址(MAC地址) ，所以需要将他们进行转换  
- 与DNS十分相似，但是  
  - DNS 为网络中的所有主机提供查询服务  
  - ARP仅为某一子网的主机或者路由器的接口提供IP解析服务  
- 在同一子网中的过程  
  - 一个主机IP1要向另一个设备IP2发送数据报，那么会首先构建ARP分组  
    - ARP分组包含了发送和接收的IP地址和MAC地址  
    - ARP查询分组和响应分组格式相同  
  - 将这个ARP查询分组**广播**到这个子网的所有设备  
  - 每个设备检查是否匹配  
  - 匹配的设备返回响应，这个响应帧的目的设备就是之前发送查询的设备  
- 在不同子网的过程  
  - 当目标主机位于不同子网时，源主机不会尝试直接使用ARP找到目标主机的MAC地址，而是寻找其默认网关的MAC地址。
  - 源主机发送ARP请求来查询默认网关（通常是路由器的接口）的MAC地址。
  - 路由器收到ARP请求后，会回复其接口的MAC地址给源主机。
  - 源主机使用这个MAC地址封装数据帧，然后将数据发送给默认网关。
  - 默认网关（路由器）收到数据后，基于路由表决定数据应该如何转发到目标子网，并在每个跃点重复这一过程，直至数据到达目标子网。
  - 最终，数据包  
### 以太网和交换机  
#### 以太网
- 第一个广泛部署的告诉局域网  
- 以太网变了很多，唯一没变的是其帧结构  
  - 数据字段  承载了IP数据报
  - 目的地址 6字节 目的适配器的MAC地址  
  - 源地址 6字节 发送该数据报的适配器的MAC地址 
  - 类型字段 2字节  允许复用多种网络层协议  
  -  CRC 4字节  循环冗余检测
  - 前同步码 8字节 在整个以太网帧的首部  
#### 交换机  
- 转发和过滤  
  - 转发 ： 确定一个帧应该被导向哪个接口，并把帧移动到那个接口  
  - 过滤 ： 决定一个帧应该被丢弃还是转发  
- 实现转发和过滤需要维护一个表 - 交换机表  
  - 一个MAC地址  
  - 这个MAC地址通向的接口  
  - 该项放置在表中的时间  
- 自学习  
  - 交换机表初始为空  
  - 每次接收一个帧都会更新交换机表的项  
  - 如果交换机长时间没有接收到与一个项匹配的帧，就直接删除这个项  
- 交换机是即插即用的  
- 性质  
  - 消除碰撞  
  - 异质的链路  
  - 管理 
### 数据中心  
- 数据中心提供的服务  
  - 向用户提供诸如 网页，视频等内容  
  - 特定数据处理任务的大规模并行计算(如搜索)
  - 为其他公司提供云计算服务  
- 数据中心的主机称之为刀片  
- 数据中心通过一台或者多台边界路由器与外部互联网相连  
- 负载均衡器  
  - 外部请求会被定向到一个负载均衡器
  - 负载均衡器负责向主机分发这些请求  
  - 分发时以主机当前负载作为函数在主机之间均衡负载  
- 等级体系结构  
  - 通常应用**路由器和交换机等级体系结构**   
- 发展趋势  
  - 成本降低  
  - 集中式SDN控制和管理  
  - 虚拟化  
  - 物理约束  
  - 硬件模块化和定制化  
`
            ,
            },
            titles: [],
            pageNameNow: '',
        }
    },
    methods: {
        showApiDoc() {
            if(this.mode=="edit"){
                window.alert("请先保存编辑内容后操作");
            }
            this.nowDocument=this.document.api;
            this.pageNameNow='接口文档';
            this.ifShowCatagory=true;
            setTimeout(()=>{
                this.updateCatagory();
            },100);
        },
        showGuideDoc() {
            if(this.mode=="edit"){
                window.alert("请先保存编辑内容后操作");
            }
            this.nowDocument=this.document.guide;
            this.pageNameNow='部署指南';
            this.ifShowCatagory=true;
            setTimeout(()=>{
                this.updateCatagory();
            },100);
        },
        updateCatagory(){//切换文档时需要手动切换目录
            const anchors = this.$refs.preview.$el.querySelectorAll('h2,h3,h4')
            const titles = Array.from(anchors).filter(
                title => !!title.innerText.trim()
            )
            if (!titles.length) {
                this.titles = []
                return
            }
            const hTags = Array.from(
                new Set(titles.map(title => title.tagName))
            ).sort()
            this.titles = titles.map(el => ({
                title: el.innerText,
                lineIndex: el.getAttribute('data-v-md-line'),
                indent: hTags.indexOf(el.tagName),
            }))
        },
        handleUploadImage() { },
        handleAnchorClick(anchor) {
            const { preview } = this.$refs
            const { lineIndex } = anchor
            const heading = preview.$el.querySelector(
                `[data-v-md-line="${lineIndex}"]`
            )
            if (heading) {
                preview.previewScrollToTarget({
                    target: heading,
                    scrollContainer: window,
                    top: 60,
                })
            }
        },
        edit(){//编辑文档
            this.ifShowCatagory=false;
            this.mode='edit';
        },
        submit(){//提交文档
            this.mode='preview';
            this.ifShowCatagory=true;
            setTimeout(()=>{
                this.updateCatagory();
            },100);
        },
        reload(){//重新加载文档，这里当作to home使用
            window.location.reload();
        }
    },
    mounted() {
        this.updateCatagory();
    },
}
</script>
<style scoped>
.v-btn {
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
    transform: scale(1.05);
}
</style>