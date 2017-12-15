# doubleSelectBox
一个基于jQuery、bootstrap样式的可配置双边下拉选框插件

# 使用方法
  new PDSS_SelectBox($("#SelectBox1"), {
                usePdssStyle: true,   //是否使用PDSS样式(即自定义样式)
                filterPlaceHolder: "请输入需要过滤的关键字",   //过滤框提示
                nonSelectedLabel: "请选中您要操作的项目",   //未选中项目的标题
                selectedLabel: "已选中项目",   //已选中项目的标题
                selectorMinimalHeight: 150,   //下拉框的高度
                selectedRequired: false, //是否必选项
                doubleMove: true, //选项是否有双击事件
                optionFields: optionFields,   //未选中项
                selectedFields: selectedFields,   //已选中项
                optionValue: "value",    //下拉框的值value
                optionText: "text"    //下拉框的文本值text
            });
            
# 示例图
![Image text](https://raw.githubusercontent.com/zLsPitaya/doubleSelectBox/master/images/示例图.png)
