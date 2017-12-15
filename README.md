# doubleSelectBox
一个基于jQuery、bootstrap样式的可配置双边下拉选框插件

# 使用方法
  var options = {<br />
      usePdssStyle: true,   //是否使用PDSS样式(即自定义样式)<br />
      filterPlaceHolder: "请输入需要过滤的关键字",   //过滤框提示<br />
      nonSelectedLabel: "请选中您要操作的项目",   //未选中项目的标题<br />
      selectedLabel: "已选中项目",   //已选中项目的标题<br />
      selectorMinimalHeight: 150,   //下拉框的高度<br />
      selectedRequired: false, //是否必选项<br />
      doubleMove: true, //选项是否有双击事件<br />
      optionFields: optionFields,   //未选中项<br />
      selectedFields: selectedFields,   //已选中项<br />
      optionValue: "value",    //下拉框的值value<br />
      optionText: "text"    //下拉框的文本值text<br />
  };<br />
            
  new PDSS_SelectBox($("#SelectBox1"), options);
            
# 示例图
![Image text](https://raw.githubusercontent.com/zLsPitaya/doubleSelectBox/master/images/示例图.png)
