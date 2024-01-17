console.log("hahaha,开始执行script中的脚本命令")
	var input = document.createElement('input');
	input.type = 'file';
	input.id = 'excelfile';
	input.onchange = function(event) {
		var file = event.target.files[0];
		var reader = new FileReader();
	
	      	reader.onload = function(e) {
	        var data = await file.arrayBuffer();
	        var workbook = XLSX.read(data);
	        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
	        var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
			
			var x = -1
	   		var colnum = document.getElementsByTagName('table')[1].rows[1].cells.length;
	   		var ys = Math.ceil((jsonData.length-1)/35); //计算表格页数
			var element = document.getElementsByTagName('input')[0];
			element.parentNode.removeChild(element);//删除input标签
			console.log('excel文件共有 %d 行。',jsonData.length);
			
	        for (var t = 1;t < ys*2 ;t += 2){
				x = x + 1;//正在转换第x页
				console.log('正在转换第 %d 页',x+1);
				
				for (var row = 1; row < 36 && (row+x*35 < jsonData.length); row++) {
					//console.log('正在读取第 %d 行成绩',row+x*35);
				
					for (var col = 6; col < colnum; col++) {
						
						var html  = jsonData[row+x*35][col] ;
						document.getElementsByTagName('table')[t].rows[row].cells[col].innerHTML = html;
					}
			  
				}   				
	        
			}
			
	        console.log('总共完成 %d 页，%d 个学生成绩导入',x+1,jsonData.length-1) ;
			var num = jsonData.length-1;
			alert('请核对总共的学生人数为'+num+'个');
	      };
	
	      reader.readAsArrayBuffer(file);
    	};
	var body = document.body||document.getElementsByTagName('body')[0];
	body.insertBefore(input, body.firstChild);
