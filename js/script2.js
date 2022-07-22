//修改
function update(){
	document.getElementById('policyname').focus();
	document.getElementById('policyname').select();
		var num_rows = listTable.rows.length;
		// console.log(1);
		  if (num_rows > 20) return alert("请注意最多可添加20条策略！");
		//获取策略名称
		var policyname = document.getElementById("policyname").value;
		//获取匹配条件
		var field = document.getElementById("field");
		var indexone = field.selectedIndex;
		var fieldValue = field.options[indexone].text;
		var symbol = document.getElementById("symbol");
		var indextwo = symbol.selectedIndex;
		var symbolValue = symbol.options[indextwo].text;
		var content = document.getElementById("content").value;
		//获取匹配动作
		var action = document.getElementById("action");
		var indexthree = action.selectedIndex;
		var actionValue = action.options[indexthree].innerText;
		//获取生效端口和优先级
    	var priority = document.getElementById("priority").value;
    	var port = document.getElementById("port").value;


		if(policyname==""||actionValue==""||priority==""){
			alert("请检查策略名称，匹配动作和优先级是否填写！")
			return false
		}
		else if(document.getElementById("modistr").innerHTML=="添加策略"
		) {add(policyname,fieldValue,symbolValue,content,actionValue,priority,port);}
	}	

function add(policyname,fieldValue,symbolValue,content,actionValue,priority,port){
	/*创建节点的方式*/
	var node = document.createElement("tr")
	node.innerHTML =`<td><input type="checkbox" name="item">
					</td>
					<td>${policyname}
					</td>
					<td>
						<p>${fieldValue}${symbolValue}${content}</p>
					</td>
					<td>${actionValue}
					</td>
					<td>${port}
					</td>
					<td>${priority}
					</td>
					<td><input type="checkbox" name="switch">
					</td>
					<td>
						<button onclick="modify(this)" class="md-trigger" data-modal="modal-2" type="button">修改</button>
						<button onclick="delRow(this);" class="delete" type="button">删除</button>
					</td>`
					console.log()
	//创建一个框架节点
	var tr =document.createElement("tr");
	var td1 =document.createElement("td");
	var td2 =document.createElement("td");
	var td3 =document.createElement("td");
	var td4 =document.createElement("td");
	var td5 =document.createElement("td");
	var td6 =document.createElement("td");
	var td7 =document.createElement("td");
	
	//赋值
	//setAttribute：修改节点属性
  var input1=document.createElement("input");
	input1.setAttribute('type','checkbox');
	input1.setAttribute('name','item');
	input1.setAttribute('class','testswitch');
	td1.appendChild(input1);
	//获取到的值进行赋值,innerHTML获取到的值会把标签同时获取
	td2.innerHTML=policyname;
	td3.innerHTML={fieldValue,symbolValue,content};
	td4.innerHTML=actionValue;
	td6.innerHTML=priority;
	td5.innerHTML=port;
	//操作添加
	//创建一个input节点
var input2=document.createElement("input");
	input2.setAttribute('type','checkbox');
	input2.setAttribute('name','onoffswitch');
	input2.setAttribute('class','testswitch');
	td7.appendChild(input2);

var input3=document.createElement("input");
	input3.setAttribute('type','button');
	input3.setAttribute('name','update');
	input3.setAttribute('value','修改');
	//添加修改事件
	input3.setAttribute('class','md-trigger');
	td7.appendChild(input3);

var input4=document.createElement("input");
	input4.setAttribute('type','button');
	input4.setAttribute('value','删除');
	input4.setAttribute('onclick','delRow(this)');
	input4.setAttribute('class','delete');
	//追加节点
	td7.appendChild(input4);
	
	//将所有td标签对放入tr中
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tr.appendChild(td7);
	var table=document.getElementById('listTable');
	table.appendChild(node);
	//重置（方法）
	// resets();
}
	
//全选
  checkAll=function (obj){
		var checked=obj.checked;
		var item=document.getElementsByName("item");
		for(var i=0;i<item.length;i++){
			if(item[i].checked){
				item[i].checked=null;
			}else{
				item[i].checked=checked;
			}
			item[i].checked=checked;	
		}
	}
//批量删除
  delAllRow=function(){
		var items=document.getElementsByName("item");
		for(var i=1;i<items.length;i++){
			if(items[i].checked){
				var parentNode=items[i].parentNode.parentNode;
				var tables=parentNode.parentNode;
				tables.removeChild(parentNode);
				i--;
			}
		}
	}
  
// }

var	rowIndex;
//修改回显
function modify (obj){
	x = document.getElementById("modistr");
    x.innerHTML = "修改策略";
	//获取
	var policyname=document.getElementById('policyname');
	var field = document.getElementById("field");
  	var index = field.selectedIndex;
	var fieldValue = field.options[index].text;
	var symbol = document.getElementById("symbol");
  	var index = symbol.selectedIndex;
	var symbolValue = symbol.options[index].text;
	var content = document.getElementById("content");
	var action = document.getElementById("action");
	var index = action.selectedIndex;
	var actionValue = action.options[index].text;
  	var priority = document.getElementById("priority");
  	var port = document.getElementById("port");
	//获取tr和td对，以及选中的下标
	var tr = obj.parentNode.parentNode;
  	var td = tr.getElementsByTagName('td');
	rowIndex=obj.parentNode.parentNode.rowIndex;
	//赋值
	policyname.value=td[1].innerHTML;

	field.value,symbol.value,content=td[2].innerHTML;
  	for(var i=0;i<field.options.length;i++){
		var value= field.options[i].text;
		if(value==fieldValue+symbolValue+content){
			field.options[i].selected=true;
		}
	}
	actionValue=td[3].innerHTML;
	for(var i=0;i<action.options.length;i++){
		var value= action.options[i].text;
		if(value==actionValue){
			action.options[i].selected=true;
		}
	}
    priority.value=td[5].innerHTML;
    port.value=td[4].innerHTML;	
	
	var addButton=document.getElementById('submit');
	try{
		if(addButton.getAttribute("value")=="修改确认"){
			addButton.setAttribute('onclick','change()');
		}
	}catch(e){
		//TODO handle the exception
	}
}

function change(){	
	//获取
	var table=document.getElementById('listTable');
	var policyname = document.getElementById("policyname").value;
		//获取匹配条件
	var field = document.getElementById("field");
	var indexone = field.selectedIndex;
	var fieldValue = field.options[indexone].text;
	var symbol = document.getElementById("symbol");
	var indextwo = symbol.selectedIndex;
	var symbolValue = symbol.options[indextwo].text;
	var content = document.getElementById("content").value;
		//获取匹配动作
	var action = document.getElementById("action");
	var indexthree = action.selectedIndex;
	var actionValue = action.options[indexthree].innerText;
		//获取生效端口和优先级
    var priority = document.getElementById("priority").value;
    var port = document.getElementById("port").value;	
	//赋值	
	table.rows[rowIndex].cells[1].innerHTML=policyname;
	table.rows[rowIndex].cells[2].innerHTML=fieldValue+symbolValue+content;
	table.rows[rowIndex].cells[3].innerHTML=actionValue;
	table.rows[rowIndex].cells[4].innerHTML=port;
	table.rows[rowIndex].cells[5].innerText=priority;
	var addButton=document.getElementById('submit');
	try{
		if(addButton.getAttribute("value")=="修改确认"){
			addButton.setAttribute('onclick','update()');
		}
	}catch(e){
		//TODO handle the exception
	}
}

function cancel(){	
	var addButton=document.getElementById('submit');
	try{
		if(addButton.getAttribute("value")=="修改确认"){
			addButton.setAttribute('onclick','update()');
		}
	}catch(e){
		//TODO handle the exception
	}
}

//重置
function resets(){
	document.getElementById("policyname").value="";
	document.getElementById("content").value="";
	document.getElementById("action").value="";
	document.getElementById("port").value="";
	//重置下拉框
	var field=document.getElementById('field');
	field.selectedIndex=0;
	var symbol=document.getElementById('symbol');
	symbol.selectedIndex=0;
	var action=document.getElementById('action');
	action.selectedIndex=0;
	//获取焦点
	document.getElementById('policyname').focus();	
}

var row = 0 ;
function getRow(r){
  var i=r.parentNode.parentNode.rowIndex; 
  return i ;
 }
//单个删除
function delRow(r){ 
  document.getElementById('policyname');
  var msg = `提示\n\n您确定要删除该策略吗？`;
  if (confirm(msg)==true){
  document.getElementById('listTable').deleteRow(getRow(r));
  }else{
  return false;
  }
 }

function init() {

    //获取背景
    var overlay = document.querySelector(".md-overlay");
    //获取所有按钮并遍历操作
    document.querySelectorAll(".md-trigger").forEach(function (el, i) {
      //获取当前按钮
      var modal = document.querySelector("#" + el.getAttribute("data-modal"));
      //获取关闭按钮
      var close = modal.querySelector(".md-close");
      //给按钮添加事件
      el.addEventListener("click", () => {
		// resets()
        modal.classList.add("md-show");
        overlay.removeEventListener("click", () => {
          modal.classList.remove("md-show");
          document.documentElement.classList.remove("md-perspective");
        });
        console.log(i);
        //给背景添加点击事件，用于点击背景关闭弹窗
        overlay.addEventListener("click", () => {
          modal.classList.remove("md-show");
          document.documentElement.classList.remove("md-perspective");
        });

        //动画效果
        setTimeout(function () {
          document.documentElement.classList.add("md-perspective");
        }, 25);

        //设置close按钮，用于关闭弹窗
        close.addEventListener("click", (ev) => {
          ev.stopPropagation();
		  resets()
          modal.classList.remove("md-show");

          document.documentElement.classList.remove("md-perspective");
		  x = document.getElementById("modistr");
		  x.innerHTML = "添加策略";
		  try{
			if(addButton.getAttribute("value")=="修改确认"){
				addButton.setAttribute('onclick','update()');
			}
		}catch(e){
			//TODO handle the exception
		}
        });
      });
    });
  }

  init();


  function returnmenu() {
    //获取背景
    var overlay = document.querySelector(".md-overlay");
    //获取所有按钮并遍历操作
    document.querySelectorAll(".md-trigger").forEach(function (el, i) {
      //获取当前按钮
      var modal = document.querySelector("#" + el.getAttribute("data-modal"));
      //获取关闭按钮
      var close = modal.querySelector(".returntomenu");
      //给按钮添加事件
      el.addEventListener("click", () => {
        modal.classList.add("md-show");
        overlay.removeEventListener("click", () => {
          modal.classList.remove("md-show");
          document.documentElement.classList.remove("md-perspective");
        });
        console.log(i);
        //给背景添加点击事件，用于点击背景关闭弹窗
        overlay.addEventListener("click", () => {
          modal.classList.remove("md-show");
          document.documentElement.classList.remove("md-perspective");
        });

        //动画效果
        setTimeout(function () {
          document.documentElement.classList.add("md-perspective");
        }, 25);

        //设置close按钮，用于关闭弹窗
        close.addEventListener("click", (ev) => {
          ev.stopPropagation();
          modal.classList.remove("md-show");
		  resets()
          document.documentElement.classList.remove("md-perspective");
		  x = document.getElementById("modistr");
		  x.innerHTML = "添加策略";
        });
      });
    });
  }

  returnmenu();
// })();


