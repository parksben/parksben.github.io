===

标题: 然并卵：BF 科普 & BF 解释器的 JS 实现
标签: brainFuck, 其他

===

![图片来源：google 搜索](./thumb.jpg)

最近在 [Codewars](https://www.codewars.com/ )上做练习，某道题的内容是实现一个 brainFuck（简称BF语言） 解释器（c/python/js等等均可）。动手实践的过程还是很有趣的，中间也遇到了各种各样的问题，最终通过测试，代码也比较接近目前的 JS 高分 solution。这篇文章准备聊聊相关的一些知识和实现的细节。

## “脑洞大开”的语言 —— BF 简介

Brainfuck（后文以简写BF指代），单是名字就很容易让人脑洞大开，有种不可描述的“哲学”韵味。所以如果你忍不住 google 一下相关图片的话，你会可能搜到类似下面的图片：

![图片来源：google 搜索](./bf_brief.jpeg)

**画面是不是已经很生动了？**

BF 字面上的含义已经暗示了这是一种不太直观和容易阅读的语言，当然，在当下也不会是一种通用语言。她属于 Esolang（全称 Esoteric programming language，直译：深奥的编程语言） 的范畴。

BF诞生于上世纪30年代，曾运用于早期的 PC（Amiga），想详细了解的童鞋可以浏览 [维基百科](https://zh.wikipedia.org/wiki/Brainfuck)。

**BF 在当下有什么应用场景呢？**

我想，对一个吃瓜群众来说，了解了它，对写作 **逼格** 和 **脑力** 的提升是很有用的。BF 具有**极简主义**（搞设计的童鞋的不妨了解下下）和**功能齐全**（图灵完全）的特点，旨在为用户带来困惑和挑战，丰富劳动人民的业余生活。

## 8 种运算符及其操作

BF 作为一种极简的计算机语言，仅有8种运算符，分别为: `<` `>` `+` `-` `,` `.` `[` `]`，其功能对照如下表所示：

| 指令 | 含义 |
|:---:|:---:|
| `<` | 指针减一（指针左移） |
| `>` | 指针加一（指针右移） |
| `+` | 指针指向的字节的值加一（当前单元的数值+1） |
| `-` | 指针指向的字节的值减一（当前单元的数值-1） |
| `,` | 输入内容到指针指向的单元（输入一个字符，将其ASCII码保存到当前指针所指单元） |
| `.` | 将指针指向的存储单元的内容作为字符输出（将ASCII码输出为字符） |
| `[` | 如果指针指向的存储单元为零，向后跳转到对应的 `]` 指令处 |
| `]` | 如果指针指向的存储单元不为零，向前跳转到对应的 `[` 指令处 |

BF基于一个简单的机器模型，除了八个指令，这个机器还包括：一个以字节为单位、被初始化为零的数组、一个指向该数组的指针(初始时指向数组的第一个字节)、以及用于输入输出的两个字节流。

对 BF 比较有意思的比拟可以是这样的：

1. 如果把机器内存看成是一个无限长的“小火车”（类似于`Array`或`List`的数据结构）,每个车厢（存储单元）里面的货物默认都是数字 `0`，列车上仅有一个列车员（数据指针）；
2. `<>` 相当于列车员在车厢间进行移动，只有当列车员在某节车厢时，才能对车厢的货物进行操作；
3. `+-` 相当于列车员对当前所在车厢的货物进行增减；
4. `,` 相当于列车在装货，列车员将当前所在车厢的货物替换为货运站输入的单批次货物（一个字符的ASCII码）；
5. `.` 会将当前车厢里的货物名称（单个字符）出来；
6. `[]` 相当于列车员在满足条件的两节车厢间来回移动；

这里要注意的是，数组的每个单元都是一个字节大小；`-` 命令允许溢出，它可以用 255 个 `+` 命令来代替。例如，当某个存储单元的值为 255 时，其执行指令 `+` 的结果为 0。类似的， 0 执行指令 `-` 的结果为 255.

## 与通用语言的类比

据此，BF的运算符与通用语言的类比如下（以C语言为例）：

| BrainFuck | C |
|:-:|:-:|
| `<` | `--ptr;` |
| `>` | `++ptr;` |
| `+` | `++*ptr;` |
| `-` | `--*ptr;` |
| `,` | `*ptr = getchar();` |
| `.` | `putchar(*ptr);` |
| `[` | `while (*ptr) {` |
| `]` | `}` |

## BF 解释器的 JS 函数实现

### 代码奉上：

```js
function brainLuck(code, input) {             // @1
  const inputChars = input.split('');         // @2

  const codes = code.split('');               // @3
  let codeIdx = 0;

  const arr = [];                             // @4
  let arrIdx = 0;
  let outputStr = '';                         // @5

  while (codeIdx < code.length) {             // @6
    const ops = codes[codeIdx];

    const handleLeftBracket = () => {         // @7
      if (~~arr[arrIdx] === 0) {
        let cnt = 1;

        while (cnt) {
          codeIdx++;
          if (codes[codeIdx] === '[') {
            cnt += 1;
          }
          if (codes[codeIdx] === ']') {
            cnt -= 1;
          }
        }
      }
    };

    const handleRightBracket = () => {        // @8
      if (~~arr[arrIdx] !== 0) {
        let cnt = 1;

        while (cnt) {
          codeIdx--;
          if (codes[codeIdx] === ']') {
            cnt += 1;
          }
          if (codes[codeIdx] === '[') {
            cnt -= 1;
          }
        }
      }
    };

    switch (ops) {                            // @9
      case '>':
        arrIdx += 1;
        break;
      case '<':
        arrIdx -= 1;
        break;
      case '+':
        arr[arrIdx] = (~~arr[arrIdx] + 1) % 256;
        break;
      case '-':
        arr[arrIdx] = (~~arr[arrIdx] || 256) - 1;
        break;
      case ',':
        const iptChar = inputChars.shift();
        arr[arrIdx] = iptChar ? iptChar.charCodeAt(0) : arr[arrIdx];
        break;
      case '.':
        outputStr += String.fromCharCode(arr[arrIdx]);
        break;
      case '[':
        handleLeftBracket();
        break;
      case ']':
        handleRightBracket();
        break;
    }

    codeIdx++;                               // @10
  }

  return outputStr;                          // @11
}

```

### 实现思路阐述（与代码中注释的序号对应）：

(1) 我们实现了一个函数 brainLuck 用以模拟 BF 语言的解释执行，函数 brainLuck 的用例如下：

```js
const code = ',+[-.,+]';
const input = 'Parksben' + String.fromCharCode(255);

const output = brainLuck(code, input);
console.log(output); // -> 'Parksben'
```

(2) 将输入的字符串切割为单个字符，暂存进数组 inputChars；

(3) 将 BF 程序切割为单个操作符，方便遍历每个指令，用 codeIdx 作为下标进行遍历；

(4) 声明一个数组 arr 用以模拟机器内存，过程产生的数值存储到此数组中；

(5) 用字符串 outputStr 存储程序的输出；

(6) 遍历 BF 运算符，对不同指令进行相应的操作；

(7) 方法 handleLeftBracket，用以匹配到与当前 `[` 对应的 `]`（通过操作下标 codeIdx）；

(8) 方法 handleRightBracket，用以匹配到与当前 `]` 对应的 `[`（通过操作下标 codeIdx）；

(9) 用以处理不同指令的 switch 语句；

(10) codeIdx 加一，以向前遍历 codes；

(11) 程序输出；

## 延伸阅读

[Brainfuck: a Programming Language or a Joke?](https://vironit.com/brainfuck-a-programming-language-or-a-joke/)

[丹尼尔·克里斯托法尼的一些 BF 实例](http://www.hevanet.com/cristofd/brainfuck/)

[深奥的编程语言 - 维基百科](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%A5%A5%E7%9A%84%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80)
