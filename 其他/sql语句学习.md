## Sql 语法记录

##### SELECT 语法

​	SELECT 语句分为 SELECT 和 SELECT * 两种语句，SELECT语句用于从表中选取数据，SELECT语句对语法大小写不敏感，所以 SELECT 相当于 select

​	SELECT 列名称 FROM 表名称  以及 SELECT * FROM 表名称

SELECT 列名称 FROM 表名称实例

```sql
SELECT firstname, secondname FROM database
```

表示从 database 中获取名为 firstname, 和 secondname 列的内容，将内容暂存到结果表中。

SELECT * FROM 表名称实例

```sql
SELECT * FROM database
```

表示从 database 中选取所有列的快捷方式，将内容暂存到结果表中。



#####  DISTINCT 语法

​	在数据库的存储中有时可能会存储很多同名数据，如姓名，年龄等，但有时我们只需要查询出数据库表中存在哪些数据而忽略数据的时候则可以使用 DISTINCT 语法，具体如下

​	如下user表 

|  ID  | NAME | ACTIONS |
| :--: | :--: | :-----: |
|  1   | 路人甲  |   写代码   |
|  2   | 路人乙  |   吃饭    |
|  3   | 路人甲  |   学习    |

```sql
SELECT NAME FORM user
```

查询结果为

| NAME |
| :--: |
| 路人甲  |
| 路人乙  |
| 路人甲  |

使用 DISTINCT 语法，从user表中查询数据库表中有**哪些用户**

```sql
SELECT DISTINCT NAME FROM user
```

查询结果为

| NAME |
| :--: |
| 路人甲  |
| 路人乙  |

##### 在结果集中，**路人甲**只被列举出了一次



##### WHERE 语法

​	WHERE 语法 也称为 WHERE 子句，WHERE子句是 作为一种SELECT搜索规范，也就是SELECT选取时的选定规则，也可以理解为筛选条件。标准语法为下：

```sql
SELECT 列名(或*) FROM 表名称 WHERE 列名 操作符 值
```

|   操作符   |  描述   |
| :-----: | :---: |
|    =    |  等于   |
|   <>    |  不等于  |
|   !=    |  不等于  |
|    >    |  大于   |
|    <    |  小于   |
|  *>=*   | 大于等于  |
|   <=    | 小于等于  |
| BETWEEN | 某个范围内 |
|  LIKE   | 模糊查询  |
|   IN    | 多项查询  |

举例说明

```sql
SELECT * FROM user WHERE NAME = '路人甲'    -- 查询 user 表中 NAME列 所有路人甲的数据
SELECT * FROM user WHERE BORN > '1998'    --  查询 user 表中 BORN 大于 1998 的数据
SELECT * FROM user WHERE AGE BETWEEN 18 AND 25  -- 查询user表中 AGE 在18到25之间的数据
SELECT * FROM user WHERE ID in ('10','11','12') -- 查询user表中 ID 为10、11、12的数据
```



##### AND 和 OR 运算符

​	AND 和 OR 运算符在 WHERE 语句后进行条件连接试用

​	AND 表示 当**条件一**与**条件二** 同时满足时，数据才会被选中

  	OR 表示 当**条件一**与**条件二**有一个条件满足时，数据就会被选中

举例说明  从user表中选中 NAME 为 路人甲，SEX 为 男 的数据， 从user表中选中NAME 为 路人甲或 NAME 为路人乙的数据

```sql
SELECT * FROM user WHERE NAME = '路人甲' AND SEX = '男'   --  NAME 为 路人甲，SEX 为 男
SELECT * FROM user WHERE NAME = '路人甲' OR NAME = '路人乙'-- 所有NAME为路人甲或路人乙的数据都被选中
```

 	AND 与 OR 可以多次被使用 也可以结合使用

```sql
SELECT * FROM user WHERE NAME = '路人甲' AND SEX = '男' AND AGE < 18
SELECT * FROM user WHERE (NAME = '路人甲' OR NAME = '路人乙') AND SEX = '男'
```



##### ORDER BY 子句

​	ORDER BY 子句是一种对结果集操作的语句，可以使结果集按照升序（**ASC**）或是降序(**DESC**)进行排序

| AGE  | NAME | MONEY |
| :--: | :--: | :---: |
|  18  | 路人甲  | 2000  |
|  20  | 炮灰乙  | 1800  |
|  18  | 路人甲  | 2100  |
|  22  | 流氓丙  | 2500  |

```sql
SELECT * FROM user ORDER BY AGE,MONEY DESC   -- 将结果按照AGE升序  MONEY降序
```

查询结果为:

| AGE  | NAME | MONEY |
| :--: | :--: | :---: |
|  18  | 路人甲  | 2100  |
|  18  | 路人甲  | 2000  |
|  20  | 炮灰乙  | 1800  |
|  22  | 流氓丙  | 2500  |

