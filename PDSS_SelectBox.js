(function($, w, undefined) {
    var defaults = {
        usePdssStyle: false,
        filterPlaceHolder: "Filter",
        nonSelectedLabel: "未选中项目",
        selectedLabel: "已选中项目",
        selectorMinimalHeight: 150,
        optionFields: [],
        selectedFields: [],
        optionValue: "value",
        optionText: "text"
    }

    function PDSS_SelectBox(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    /**
     * 过滤事件
     * @param {*} 控件 
     * @param {*} 需要过滤下拉框
     */
    function filterEvent(control, selectBox) {
        var txt = $(control).val();
        if ($.browser.msie) { //IE
            selectBox.children().each(function(index, item) {
                if ($(item).html().indexOf(txt) != -1) {
                    if ($(item).is("span")) {
                        var h = $(item).html();
                        $(h).insertBefore(item);
                        $(item).remove();
                    }
                } else {
                    if (!$(item).is("span")) {
                        $(item).wrap("<SPAN></SPAN>");
                    }
                }
            });
        } else {
            selectBox.children().each(function(index, item) {
                if ($(item).html().indexOf(txt) != -1) {
                    $(item).show();
                } else {
                    $(item).hide();
                }
            })
        }
        return true;
    }

    /**
     * 移动事件
     * @param {*} 被移除选项的下拉框 
     * @param {*} 被添加选项的下拉框
     * @param {*} 是否全部移动
     */
    function moveEvent(firstSelectBox, secondSelectBox, flag) {
        firstSelectBox.children().each(function(index, item) {
            if (flag) {
                secondSelectBox.append(item);
            } else {
                if (item.selected) {
                    secondSelectBox.append(item);
                }
            }
        })
    }

    /**
     * 排序事件
     * @param {*} 上升
     */
    function sortOption(selectBox, upFlag) {
        selectBox.find("option:selected").each(function(index, item) {
            var _item = $(item);
            if (upFlag) {
                var target = _item.prev();
                _item.insertBefore(target);
            } else {
                var target = _item.next();
                _item.insertAfter(target);
            }
        })
    }

    /**
     * 事件绑定
     * @param {*} 主容器 
     */
    function bindEvents(selectListBox) {
        selectListBox.elements.form.submit(function(e) {
            selectListBox.element.empty();
            var result = "";
            selectListBox.elements.select2.children().each(function(index, item) {
                result += "<option value='" + item.value + "' selected >" + item.text + "</option>";
            })
            selectListBox.element.append(result);
            return true;
        });
        selectListBox.elements.moveButton.on("click", function() {
            moveEvent(selectListBox.elements.select1, selectListBox.elements.select2);
        });
        selectListBox.elements.moveAllButton.on("click", function() {
            moveEvent(selectListBox.elements.select1, selectListBox.elements.select2, true);
        });
        selectListBox.elements.removeButton.on("click", function() {
            moveEvent(selectListBox.elements.select2, selectListBox.elements.select1);
        });
        selectListBox.elements.removeAllButton.on("click", function() {
            moveEvent(selectListBox.elements.select2, selectListBox.elements.select1, true);
        });
        selectListBox.elements.upButton.on("click", function() {
            sortOption(selectListBox.elements.select2, true);
        });
        selectListBox.elements.downButton.on("click", function() {
            sortOption(selectListBox.elements.select2);
        });
        selectListBox.elements.filterInput1.on("change keyup", function(e) {
            filterEvent(this, selectListBox.elements.select1);
        })
        selectListBox.elements.filterInput2.on("change keyup", function(e) {
            filterEvent(this, selectListBox.elements.select2);
        })
    }

    PDSS_SelectBox.prototype = {
        init: function() {
            this.container = $("" + '<div class="bootstrap-duallistbox-container">' + ' <div class="box1">' + "   <label></label>" + '   <input class="filter form-control ue-form" type="text" >' + '   <select multiple="multiple"></select>' + " </div>" + ' <div class="btn-box">' + '     <input type="button" class="btn db-btn move" value=">" />' + '     <input type="button" class="btn db-btn moveall" value=">>"  />' + '<p class="clearfix" style="margin-bottom:20px"></p>' + '     <input type="button" class="btn db-btn remove" value="<" />' + '     <input type="button" class="btn db-btn removeall" value="<<" />' + "     </button>" + " </div>" + ' <div class="box2">' + "   <label></label>" + '   <input class="filter form-control ue-form" type="text" >' + '   <select multiple="multiple"></select>' + " </div>" + ' <div class="settingUp-btns">' + '    <input type="button" class="btn db-btn upBtn" value="↑" />' + '    <input type="button" class="btn db-btn downBtn" value="↓"  />' + " </div>" + "</div>").insertBefore(this.element);
            this.elements = {
                originalSelect: this.element,
                box1: $(".box1", this.container),
                box2: $(".box2", this.container),
                filterInput1: $(".box1 .filter", this.container),
                filterInput2: $(".box2 .filter", this.container),
                label1: $(".box1 > label", this.container),
                label2: $(".box2 > label", this.container),
                selectBoxs: $("select", this.container),
                select1: $(".box1 select", this.container),
                select2: $(".box2 select", this.container),
                moveButton: $(".btn-box .move", this.container),
                removeButton: $(".btn-box .remove", this.container),
                moveAllButton: $(".btn-box .moveall", this.container),
                removeAllButton: $(".btn-box .removeall", this.container),
                upButton: $(".settingUp-btns .upBtn", this.container),
                downButton: $(".settingUp-btns .downBtn", this.container),
                form: $($(".box1 .filter", this.container)[0].form)
            };
            this.originalSelectName = this.element.attr("name") || "";
            var select1Id = "bootstrap-duallistbox-nonselected-list_" + this.originalSelectName,
                select2Id = "bootstrap-duallistbox-selected-list_" + this.originalSelectName;
            this.elements.select1.attr("id", select1Id);
            this.elements.select2.attr("id", select2Id);
            this.elements.label1.attr("for", select1Id);
            this.elements.label2.attr("for", select2Id);
            this.setBootstrap2Compatible(this.settings.usePdssStyle);
            this.setNonSelectedLabel(this.settings.nonSelectedLabel);
            this.setSelectedLabel(this.settings.selectedLabel);
            this.setFilterPlaceHolder(this.settings.filterPlaceHolder);
            this.setSelectOrMinimalHeight(this.settings.selectorMinimalHeight);
            this.setBtnboxsStyleInit(this.settings.selectorMinimalHeight);
            this.setAllItem(this.settings.optionFields);
            this.setSeletedItem(this.settings.selectedFields);
            this.setDoubleMove();
            this.element.hide();
            bindEvents(this);
        },
        setBootstrap2Compatible: function(value) {
            this.settings.usePdssStyle = value;
            if (!value) {
                this.container.removeClass("row-fluid bs2compatible").addClass("row");
                this.container.find(".box1, .box2").addClass("col-md-5");
                this.container.find(".btn-box").addClass("col-md-1");
                this.container.find("input, select").addClass("form-control");
                this.container.find(".btn").addClass("btn-default");
            } else {
                this.container.attr("class", "PDSS-SelectBox");
                this.container.find(".box1,.box2").attr("class", "div-select");
                this.container.find(".btn-box").find(".move").attr("class", "_add");
                this.container.find(".btn-box").find(".moveall").attr("class", "_add_all");
                this.container.find(".btn-box").find(".remove").attr("class", "_remove");
                this.container.find(".btn-box").find(".removeall").attr("class", "_remove_all");
                this.container.find(".settingUp-btns").find(".upBtn").attr("class", "_up");
                this.container.find(".settingUp-btns").find(".downBtn").attr("class", "_down");
                this.container.find(".btn-box, .settingUp-btns").removeAttr("class");
            }
            return this.element;
        },
        /**
         * 初始化设置按钮组的样式
         */
        setBtnboxsStyleInit: function(value) {
            if (value < 150) {
                value = 150;
            }
            if (!$.browser.msie && !this.settings.usePdssStyle) {
                var top = this.elements.box1.parent().height() - this.elements.select1.height();
                this.container.find(".btn-box").height(value).css("margin-top", top);
                this.container.find(".settingUp-btns").height(value).css("margin-top", top);
            }
            return this.element;
        },
        /**
         * 设置全部待选项下拉框的标签title
         */
        setNonSelectedLabel: function(value) {
            this.settings.nonSelectedLabel = value;
            if (value) {
                this.elements.label1.show().html(value)
            } else {
                this.elements.label1.hide().html(value)
            }
            return this.element;
        },
        /**
         * 设置已选中的下拉框的标签title
         */
        setSelectedLabel: function(value) {
            this.settings.selectedLabel = value;
            if (value) {
                this.elements.label2.show().html(value)
            } else {
                this.elements.label2.hide().html(value)
            }
            return this.element;
        },
        /**
         * 设置过滤的输入框提示
         */
        setFilterPlaceHolder: function(value) {
            $(this.elements.filterInput1).attr("placeHolder", value);
            $(this.elements.filterInput2).attr("placeHolder", value);
            return this.element;
        },
        /**
         * 设置下拉框高度
         */
        setSelectOrMinimalHeight: function(value) {
            this.settings.selectorMinimalHeight = value;
            var height = this.element.height();
            if (this.elements.select1.height() < value) {
                height = value;
            }
            if (height < 150) {
                height = 150;
            }
            this.elements.select1.height(height);
            this.elements.select2.height(height);
            return this.element;
        },
        /**
         * 设置所有选择项
         */
        setAllItem: function(value) {
            var self = this,
                h = "";
            $(value).each(function(index, item) {
                h += "<option value='" + item[self.settings.optionValue] + "'>" +
                    item[self.settings.optionText] + "</option>";
            })
            self.elements.select1.append(h);
            return self.element;
        },
        /**
         * 设置所有已选中项
         */
        setSeletedItem: function(value) {
            var self = this,
                h = "";
            $(value).each(function(index, item) {
                h += "<option value='" + item[self.settings.optionValue] + "'>" +
                    item[self.settings.optionText] + "</option>";
            })
            self.elements.select2.append(h);
            return self.element;
        },
        /**
         * 设置选项的双击事件
         */
        setDoubleMove: function() {
            var self = this;
            this.elements.selectBoxs.children().each(function(index, item) {
                $(item).on("dblclick", function() {
                    if ($(self.elements.select1).find(item).length === 0) {
                        self.elements.select1.append(item);
                    } else {
                        self.elements.select2.append(item);
                    }
                })
            })
        }
    }

    w.PDSS_SelectBox = PDSS_SelectBox;
})(jQuery, window)