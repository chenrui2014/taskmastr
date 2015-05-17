function windowWidth(){return $(window).width()}function windowHeight(){return $(window).height()}function loadData(e){$.ajax({url:"users/login",method:"POST",data:{key:e},dataType:"json",success:function(e){userObj=e,e.todos.forEach(function(e,t){var o=e.item,a=e.status,i=a?"fa fa-check-circle-o":"fa fa-circle-o",s=a?"checked":"";$("#todo-list").append('<li class="todo '+a+'" value="'+o+'"><input type="checkbox" class="check" '+s+'></input><i class="'+i+'"></i><input type="text" class="rename" style="display: none;" value="'+o+'"></input><span class="name">'+o+'</span><i class="fa fa-trash-o"></i></li>')}),$("#dark-mode").attr("value",e.darkmode),"on"===e.darkmode&&($("#dark-mode").addClass("dark"),$("body").addClass("dark-mode"))},error:function(e){console.log(e)}})}function keyModal(){function e(){a.fadeOut(500),o.removeClass("active-modal").animate({top:"-1000px"},500)}{var t=windowWidth(),o=(windowHeight(),$("#key-modal")),a=$("#mask"),i=o.width();o.height()}o.addClass("active-modal").css({left:t/2-i/2-10+"px"}),o.animate({top:"10%"},500),windowWidth()<768&&o.css({width:t+"px"}),function(){$("#tips-button").click(function(){$(".fine-print").slideToggle(250)})}(),$("#key").focus(),a.click(function(){e(),$("#create-todo").focus()}),$("#key").keydown(function(){var t=event.which;13===t&&(userKey=$(this).val(),e(),loadData(userKey),$("#create-todo").focus())})}function sortable(){var e=$("#todo-list");e.sortable({axis:"y",items:"> li:not(.complete)"})}function createTodo(){$("#create-todo").keydown(function(){var e=event.which;if(13===e){var t=$(this).val();$("#todo-list").prepend('<li class="todo" value="'+t+'"><input type="checkbox" class="check"></input><i class="fa fa-circle-o"></i><input type="text" class="rename" style="display: none;" value="'+t+'"></input><span class="name">'+t+'</span><i class="fa fa-trash-o"></i></li>'),$(this).val("")}})}function completeItem(){$("#todo-list").on("click",".fa-circle-o",function(){$(this).siblings(".check").click(),$(this).removeClass("fa-circle-o").addClass("fa-check-circle-o")}),$("#todo-list").on("click",".fa-check-circle-o",function(){$(this).siblings(".check").click(),$(this).removeClass("fa-check-circle-o").addClass("fa-circle-o")}),$("#todo-list").on("click",".check",function(){var e=$(this).prop("checked"),t=$(this).parent(),o=$(this).parents("#todo-list"),a=$(this).parent().siblings(".complete").first();e?(t.addClass("complete"),a.length>0?a.before(t):o.append(t),o.sortable("destroy"),sortable()):(t.removeClass("complete"),a.length>0?a.before(t):o.append(t),o.sortable("destroy"),sortable())})}function deleteItem(){$("#todo-list").on("click",".fa-trash-o",function(){$(this).parents("li").toggle("slide",500,function(){$(this).remove()})})}function renameItem(){$("#todo-list").on("dblclick",".name",function(){$(this).text();$(this).hide(),$(this).siblings(".rename").show().select()}),$("#todo-list").on("keydown",".rename",function(){var e=event.which;if(13===e){var t=$(this).val();$(this).siblings(".name").show().text(t),$(this).hide().attr("value",t),$(this).parents(".todo").attr("value",t)}})}function writeData(){function e(){var e=$("#todo-list li"),t=[],o=new Date;return e.each(function(e,o){var a=$(this).attr("value"),i={};i.item=a,i.status=$(this).hasClass("complete")?"complete":"",t.push(i)}),userObj.todos=t,userObj.darkmode=$("#dark-mode").attr("value"),userObj.dateModified=o.toISOString(),userObj}window.addEventListener("beforeunload",function(t){var o=userKey.length>0?e():null;$.post("/users/write",{json:JSON.stringify(o)},function(e){console.log(e)})}),window.addEventListener("pagehide",function(t){var o=userKey.length>0?e():null;$.post("/users/write",{json:JSON.stringify(o)},function(e){console.log(e)})})}function darkMode(){$("#dark-mode").click(function(){$(this).toggleClass("dark"),$("body").toggleClass("dark-mode");var e=$(this).hasClass("dark")?"on":"off";$(this).attr("value",e)})}var userKey,userObj;$(keyModal),$(sortable),$(createTodo),$(completeItem),$(deleteItem),$(renameItem),$(writeData),$(darkMode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpbmctZmlsZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3dXaWR0aCIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsImxvYWREYXRhIiwia2V5IiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGEiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJ1c2VyIiwidXNlck9iaiIsInRvZG9zIiwiZm9yRWFjaCIsInZhbCIsImkiLCJ0b2RvIiwiaXRlbSIsImNvbXBsZXRlIiwic3RhdHVzIiwiaWNvbiIsImNoZWNrZWQiLCJhcHBlbmQiLCJhdHRyIiwiZGFya21vZGUiLCJhZGRDbGFzcyIsImVycm9yIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImtleU1vZGFsIiwicmVtb3ZlTW9kYWwiLCJtYXNrIiwiZmFkZU91dCIsIm1vZGFsIiwicmVtb3ZlQ2xhc3MiLCJhbmltYXRlIiwidG9wIiwibW9kYWxXaWR0aCIsImNzcyIsImxlZnQiLCJjbGljayIsInNsaWRlVG9nZ2xlIiwiZm9jdXMiLCJrZXlkb3duIiwiZXZlbnQiLCJ3aGljaCIsInVzZXJLZXkiLCJ0aGlzIiwic29ydGFibGUiLCJsaXN0IiwiYXhpcyIsIml0ZW1zIiwiY3JlYXRlVG9kbyIsInByZXBlbmQiLCJjb21wbGV0ZUl0ZW0iLCJvbiIsInNpYmxpbmdzIiwicHJvcCIsInBhcmVudCIsInBhcmVudHMiLCJmaXJzdENvbXBsZXRlIiwiZmlyc3QiLCJsZW5ndGgiLCJiZWZvcmUiLCJkZWxldGVJdGVtIiwidG9nZ2xlIiwicmVtb3ZlIiwicmVuYW1lSXRlbSIsInRleHQiLCJoaWRlIiwic2hvdyIsInNlbGVjdCIsIm5ld05hbWUiLCJ3cml0ZURhdGEiLCJjcmVhdGVPYmoiLCJsaUFyciIsInRvZG9BcnIiLCJub3ciLCJEYXRlIiwiZWFjaCIsInRvZG9UZXh0IiwidG9kb09iaiIsImhhc0NsYXNzIiwicHVzaCIsImRhdGVNb2RpZmllZCIsInRvSVNPU3RyaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvYmoiLCJwb3N0IiwianNvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXJrTW9kZSIsInRvZ2dsZUNsYXNzIiwidmFsdWUiXSwibWFwcGluZ3MiOiJBQUdBLFFBQVNBLGVBQ1IsTUFBT0MsR0FBRUMsUUFBUUMsUUFHbEIsUUFBU0MsZ0JBQ1IsTUFBT0gsR0FBRUMsUUFBUUcsU0FHbEIsUUFBU0MsVUFBU0MsR0FDakJOLEVBQUVPLE1BQ0RDLElBQUssY0FDTEMsT0FBUSxPQUNSQyxNQUNDSixJQUFLQSxHQUVOSyxTQUFVLE9BQ1ZDLFFBQVMsU0FBVUMsR0FDbEJDLFFBQVVELEVBQ1ZBLEVBQUtFLE1BQU1DLFFBQVEsU0FBVUMsRUFBS0MsR0FDakMsR0FBSUMsR0FBT0YsRUFBSUcsS0FDWEMsRUFBV0osRUFBSUssT0FDZkMsRUFBT0YsRUFBVyx1QkFBeUIsaUJBQzNDRyxFQUFVSCxFQUFXLFVBQVksRUFDckNyQixHQUFFLGNBQWN5QixPQUNmLG1CQUFxQkosRUFBVyxZQUFjRixFQUFPLDBDQUE0Q0ssRUFBVSxzQkFBd0JELEVBQU8seUVBQTJFSixFQUFPLGdDQUFrQ0EsRUFBTywrQ0FHdlFuQixFQUFFLGNBQWMwQixLQUFLLFFBQVNiLEVBQUtjLFVBQ2IsT0FBbEJkLEVBQUtjLFdBQ1IzQixFQUFFLGNBQWM0QixTQUFTLFFBQ3pCNUIsRUFBRSxRQUFRNEIsU0FBUyxlQUdyQkMsTUFBTyxTQUFVQyxHQUNoQkMsUUFBUUMsSUFBSUYsTUFrRGYsUUFBU0csWUFRUixRQUFTQyxLQUNSQyxFQUFLQyxRQUFRLEtBQ2JDLEVBQU1DLFlBQVksZ0JBQWdCQyxTQUNqQ0MsSUFBSyxXQUNILEtBWEosQ0FBQSxHQUFJdEMsR0FBUUgsY0FFUnNDLEdBRFNsQyxlQUNESCxFQUFFLGVBQ1ZtQyxFQUFPbkMsRUFBRSxTQUNUeUMsRUFBYUosRUFBTW5DLE9BQ0xtQyxHQUFNakMsU0FTeEJpQyxFQUFNVCxTQUFTLGdCQUFnQmMsS0FDOUJDLEtBQU16QyxFQUFRLEVBQUt1QyxFQUFhLEVBQUssR0FB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ZXk7XG52YXIgdXNlck9iajtcblxuZnVuY3Rpb24gd2luZG93V2lkdGgoKSB7XG5cdHJldHVybiAkKHdpbmRvdykud2lkdGgoKTtcbn1cblxuZnVuY3Rpb24gd2luZG93SGVpZ2h0KCkge1xuXHRyZXR1cm4gJCh3aW5kb3cpLmhlaWdodCgpO1xufVxuXG5mdW5jdGlvbiBsb2FkRGF0YShrZXkpIHtcblx0JC5hamF4KHtcblx0XHR1cmw6ICd1c2Vycy9sb2dpbicsXG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0ZGF0YToge1xuXHRcdFx0a2V5OiBrZXlcblx0XHR9LFxuXHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHVzZXJPYmogPSB1c2VyO1xuXHRcdFx0dXNlci50b2Rvcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGkpIHtcblx0XHRcdFx0dmFyIHRvZG8gPSB2YWwuaXRlbTtcblx0XHRcdFx0dmFyIGNvbXBsZXRlID0gdmFsLnN0YXR1cztcblx0XHRcdFx0dmFyIGljb24gPSBjb21wbGV0ZSA/ICdmYSBmYS1jaGVjay1jaXJjbGUtbycgOiAnZmEgZmEtY2lyY2xlLW8nO1xuXHRcdFx0XHR2YXIgY2hlY2tlZCA9IGNvbXBsZXRlID8gJ2NoZWNrZWQnIDogJyc7XG5cdFx0XHRcdCQoJyN0b2RvLWxpc3QnKS5hcHBlbmQoXG5cdFx0XHRcdFx0JzxsaSBjbGFzcz1cInRvZG8gJyArIGNvbXBsZXRlICsgJ1wiIHZhbHVlPVwiJyArIHRvZG8gKyAnXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tcIiAnICsgY2hlY2tlZCArICc+PC9pbnB1dD48aSBjbGFzcz1cIicgKyBpY29uICsgJ1wiPjwvaT48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInJlbmFtZVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiB2YWx1ZT1cIicgKyB0b2RvICsgJ1wiPjwvaW5wdXQ+PHNwYW4gY2xhc3M9XCJuYW1lXCI+JyArIHRvZG8gKyAnPC9zcGFuPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2gtb1wiPjwvaT48L2xpPidcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0JCgnI2RhcmstbW9kZScpLmF0dHIoJ3ZhbHVlJywgdXNlci5kYXJrbW9kZSk7XG5cdFx0XHRpZiAodXNlci5kYXJrbW9kZSA9PT0gJ29uJykge1xuXHRcdFx0XHQkKCcjZGFyay1tb2RlJykuYWRkQ2xhc3MoJ2RhcmsnKTtcblx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdkYXJrLW1vZGUnKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0fVxuXHR9KTtcbn1cblx0LyokLnBvc3QoJy91c2Vycy9sb2dpbicsIHtcblx0XHRrZXk6IGtleVxuXHR9LCBmdW5jdGlvbiAodXNlcikge1xuXHRcdHVzZXJPYmogPSB1c2VyO1xuXHRcdHVzZXIudG9kb3MuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpKSB7XG5cdFx0XHR2YXIgdG9kbyA9IHZhbC5pdGVtO1xuXHRcdFx0dmFyIGNvbXBsZXRlID0gdmFsLnN0YXR1cztcblx0XHRcdHZhciBpY29uID0gY29tcGxldGUgPyAnZmEgZmEtY2hlY2stY2lyY2xlLW8nIDogJ2ZhIGZhLWNpcmNsZS1vJztcblx0XHRcdHZhciBjaGVja2VkID0gY29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJztcblx0XHRcdCQoJyN0b2RvLWxpc3QnKS5hcHBlbmQoXG5cdFx0XHRcdCc8bGkgY2xhc3M9XCJ0b2RvICcgKyBjb21wbGV0ZSArICdcIiB2YWx1ZT1cIicgKyB0b2RvICsgJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCIgJyArIGNoZWNrZWQgKyAnPjwvaW5wdXQ+PGkgY2xhc3M9XCInICsgaWNvbiArICdcIj48L2k+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJyZW5hbWVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgdmFsdWU9XCInICsgdG9kbyArICdcIj48L2lucHV0PjxzcGFuIGNsYXNzPVwibmFtZVwiPicgKyB0b2RvICsgJzwvc3Bhbj48aSBjbGFzcz1cImZhIGZhLXRyYXNoLW9cIj48L2k+PC9saT4nXG5cdFx0XHQpO1xuXHRcdH0pXG5cdH0pKi9cblxuLypmdW5jdGlvbiBsb2FkRGF0YSgpIHtcblx0JC5hamF4KHtcblx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0Ly91cmw6ICcuL2RhdGEvdG9kb3MuanNvbicsXG5cdFx0dXJsOiAnL3VzZXJzL2xvZ2luJyxcblx0XHRjYWNoZTogZmFsc2UsXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KHVzZXJLZXkpKSB7XG5cdFx0XHRcdF8uZm9ySW4oZGF0YVt1c2VyS2V5XSwgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG5cdFx0XHRcdFx0aWYgKCFpc05hTihrZXkpKSB7XG5cdFx0XHRcdFx0XHR2YXIgdG9kbyA9IHZhbC5pdGVtO1xuXHRcdFx0XHRcdFx0dmFyIGNvbXBsZXRlID0gdmFsLnN0YXR1cztcblx0XHRcdFx0XHRcdHZhciBpY29uID0gY29tcGxldGUgPyAnZmEgZmEtY2hlY2stY2lyY2xlLW8nIDogJ2ZhIGZhLWNpcmNsZS1vJztcblx0XHRcdFx0XHRcdHZhciBjaGVja2VkID0gY29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJztcblx0XHRcdFx0XHRcdCQoJyN0b2RvLWxpc3QnKS5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCc8bGkgY2xhc3M9XCJ0b2RvICcgKyBjb21wbGV0ZSArICdcIiB2YWx1ZT1cIicgKyB0b2RvICsgJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCIgJyArIGNoZWNrZWQgKyAnPjwvaW5wdXQ+PGkgY2xhc3M9XCInICsgaWNvbiArICdcIj48L2k+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJyZW5hbWVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgdmFsdWU9XCInICsgdG9kbyArICdcIj48L2lucHV0PjxzcGFuIGNsYXNzPVwibmFtZVwiPicgKyB0b2RvICsgJzwvc3Bhbj48aSBjbGFzcz1cImZhIGZhLXRyYXNoLW9cIj48L2k+PC9saT4nXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnZGFya21vZGUnKSB7XG5cdFx0XHRcdFx0XHQkKCcjZGFyay1tb2RlJykuYXR0cigndmFsdWUnLCB2YWwpO1xuXHRcdFx0XHRcdFx0dmFyIGRhcmtWYWwgPSAkKCcjZGFyay1tb2RlJykuYXR0cigndmFsdWUnKTtcblx0XHRcdFx0XHRcdGlmIChkYXJrVmFsID09PSAnb24nKSB7XG5cdFx0XHRcdFx0XHRcdCQoJyNkYXJrLW1vZGUnKS5hZGRDbGFzcygnZGFyaycpO1xuXHRcdFx0XHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2RhcmstbW9kZScpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSovXG5cbmZ1bmN0aW9uIGtleU1vZGFsKCkge1xuXHR2YXIgd2lkdGggPSB3aW5kb3dXaWR0aCgpO1xuXHR2YXIgaGVpZ2h0ID0gd2luZG93SGVpZ2h0KCk7XG5cdHZhciBtb2RhbCA9ICQoJyNrZXktbW9kYWwnKTtcblx0dmFyIG1hc2sgPSAkKCcjbWFzaycpO1xuXHR2YXIgbW9kYWxXaWR0aCA9IG1vZGFsLndpZHRoKCk7XG5cdHZhciBtb2RhbEhlaWdodCA9IG1vZGFsLmhlaWdodCgpO1xuXG5cdGZ1bmN0aW9uIHJlbW92ZU1vZGFsKCkge1xuXHRcdG1hc2suZmFkZU91dCg1MDApO1xuXHRcdG1vZGFsLnJlbW92ZUNsYXNzKCdhY3RpdmUtbW9kYWwnKS5hbmltYXRlKHtcblx0XHRcdHRvcDogJy0xMDAwcHgnXG5cdFx0fSwgNTAwKTtcblx0fVxuXG5cdG1vZGFsLmFkZENsYXNzKCdhY3RpdmUtbW9kYWwnKS5jc3Moe1xuXHRcdGxlZnQ6IHdpZHRoIC8gMiAtIChtb2RhbFdpZHRoIC8gMikgLSAxMCArICdweCdcblx0fSk7XG5cdG1vZGFsLmFuaW1hdGUoe1xuXHRcdHRvcDogJzEwJSdcblx0fSwgNTAwKTtcblx0aWYgKHdpbmRvd1dpZHRoKCkgPCA3NjgpIHtcblx0XHRtb2RhbC5jc3Moe1xuXHRcdFx0d2lkdGg6IHdpZHRoICsgJ3B4J1xuXHRcdH0pO1xuXHR9XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcjdGlwcy1idXR0b24nKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuZmluZS1wcmludCcpLnNsaWRlVG9nZ2xlKDI1MCk7XG5cdFx0fSlcblx0fSkoKTtcblxuXHQkKCcja2V5JykuZm9jdXMoKTtcblx0bWFzay5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0cmVtb3ZlTW9kYWwoKTtcblx0XHQkKCcjY3JlYXRlLXRvZG8nKS5mb2N1cygpO1xuXHR9KTtcblxuXHQkKCcja2V5Jykua2V5ZG93bihmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGtleSA9IGV2ZW50LndoaWNoO1xuXHRcdGlmIChrZXkgPT09IDEzKSB7XG5cdFx0XHR1c2VyS2V5ID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdHJlbW92ZU1vZGFsKCk7XG5cdFx0XHRsb2FkRGF0YSh1c2VyS2V5KTtcblx0XHRcdCQoJyNjcmVhdGUtdG9kbycpLmZvY3VzKCk7XG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBzb3J0YWJsZSgpIHtcblx0dmFyIGxpc3QgPSAkKCcjdG9kby1saXN0Jyk7XG5cdGxpc3Quc29ydGFibGUoe1xuXHRcdGF4aXM6IFwieVwiLFxuXHRcdGl0ZW1zOiBcIj4gbGk6bm90KC5jb21wbGV0ZSlcIlxuXHR9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kbygpIHtcblx0JCgnI2NyZWF0ZS10b2RvJykua2V5ZG93bihmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGtleSA9IGV2ZW50LndoaWNoO1xuXHRcdGlmIChrZXkgPT09IDEzKSB7XG5cdFx0XHR2YXIgdG9kbyA9ICQodGhpcykudmFsKCk7XG5cdFx0XHQkKCcjdG9kby1saXN0JykucHJlcGVuZChcblx0XHRcdFx0JzxsaSBjbGFzcz1cInRvZG9cIiB2YWx1ZT1cIicgKyB0b2RvICsgJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCI+PC9pbnB1dD48aSBjbGFzcz1cImZhIGZhLWNpcmNsZS1vXCI+PC9pPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwicmVuYW1lXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIHZhbHVlPVwiJyArIHRvZG8gKyAnXCI+PC9pbnB1dD48c3BhbiBjbGFzcz1cIm5hbWVcIj4nICsgdG9kbyArICc8L3NwYW4+PGkgY2xhc3M9XCJmYSBmYS10cmFzaC1vXCI+PC9pPjwvbGk+J1xuXHRcdFx0KTtcblx0XHRcdCQodGhpcykudmFsKCcnKTtcblx0XHR9XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGNvbXBsZXRlSXRlbSgpIHtcblx0JCgnI3RvZG8tbGlzdCcpLm9uKCdjbGljaycsICcuZmEtY2lyY2xlLW8nLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS5zaWJsaW5ncygnLmNoZWNrJykuY2xpY2soKTtcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1jaXJjbGUtbycpLmFkZENsYXNzKCdmYS1jaGVjay1jaXJjbGUtbycpO1xuXHR9KTtcblx0JCgnI3RvZG8tbGlzdCcpLm9uKCdjbGljaycsICcuZmEtY2hlY2stY2lyY2xlLW8nLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS5zaWJsaW5ncygnLmNoZWNrJykuY2xpY2soKTtcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1jaGVjay1jaXJjbGUtbycpLmFkZENsYXNzKCdmYS1jaXJjbGUtbycpO1xuXHR9KTtcblx0JCgnI3RvZG8tbGlzdCcpLm9uKCdjbGljaycsICcuY2hlY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR2YXIgaXRlbSA9ICQodGhpcykucGFyZW50KCk7XG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpLnBhcmVudHMoJyN0b2RvLWxpc3QnKTtcblx0XHR2YXIgZmlyc3RDb21wbGV0ZSA9ICQodGhpcykucGFyZW50KCkuc2libGluZ3MoJy5jb21wbGV0ZScpLmZpcnN0KCk7XG5cdFx0aWYgKGNoZWNrZWQpIHtcblx0XHRcdGl0ZW0uYWRkQ2xhc3MoJ2NvbXBsZXRlJyk7XG5cdFx0XHRmaXJzdENvbXBsZXRlLmxlbmd0aCA+IDAgPyBmaXJzdENvbXBsZXRlLmJlZm9yZShpdGVtKSA6IGxpc3QuYXBwZW5kKGl0ZW0pO1xuXHRcdFx0bGlzdC5zb3J0YWJsZSgnZGVzdHJveScpO1xuXHRcdFx0c29ydGFibGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnY29tcGxldGUnKTtcblx0XHRcdGZpcnN0Q29tcGxldGUubGVuZ3RoID4gMCA/IGZpcnN0Q29tcGxldGUuYmVmb3JlKGl0ZW0pIDogbGlzdC5hcHBlbmQoaXRlbSk7XG5cdFx0XHRsaXN0LnNvcnRhYmxlKCdkZXN0cm95Jyk7XG5cdFx0XHRzb3J0YWJsZSgpO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUl0ZW0oKSB7XG5cdCQoJyN0b2RvLWxpc3QnKS5vbignY2xpY2snLCAnLmZhLXRyYXNoLW8nLCBmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS5wYXJlbnRzKCdsaScpLnRvZ2dsZSgnc2xpZGUnLCA1MDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH0pXG59XG5cbmZ1bmN0aW9uIHJlbmFtZUl0ZW0oKSB7XG5cdCQoJyN0b2RvLWxpc3QnKS5vbignZGJsY2xpY2snLCAnLm5hbWUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG5hbWUgPSAkKHRoaXMpLnRleHQoKTtcblx0XHQkKHRoaXMpLmhpZGUoKTtcblx0XHQkKHRoaXMpLnNpYmxpbmdzKCcucmVuYW1lJykuc2hvdygpLnNlbGVjdCgpO1xuXHR9KTtcblxuXHQkKCcjdG9kby1saXN0Jykub24oJ2tleWRvd24nLCAnLnJlbmFtZScsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIga2V5ID0gZXZlbnQud2hpY2g7XG5cdFx0aWYgKGtleSA9PT0gMTMpIHtcblx0XHRcdHZhciBuZXdOYW1lID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdCQodGhpcykuc2libGluZ3MoJy5uYW1lJykuc2hvdygpLnRleHQobmV3TmFtZSk7XG5cdFx0XHQkKHRoaXMpLmhpZGUoKS5hdHRyKCd2YWx1ZScsIG5ld05hbWUpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcudG9kbycpLmF0dHIoJ3ZhbHVlJywgbmV3TmFtZSk7XG5cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB3cml0ZURhdGEoKSB7XG5cdGZ1bmN0aW9uIGNyZWF0ZU9iaigpIHtcblx0XHR2YXIgbGlBcnIgPSAkKCcjdG9kby1saXN0IGxpJyk7XG5cdFx0dmFyIHRvZG9BcnIgPSBbXTtcblx0XHR2YXIgbm93ID0gbmV3IERhdGUoKTtcblx0XHRsaUFyci5lYWNoKGZ1bmN0aW9uIChpLCB2YWwpIHtcblx0XHRcdHZhciB0b2RvVGV4dCA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcblx0XHRcdHZhciB0b2RvT2JqID0ge307XG5cdFx0XHR0b2RvT2JqLml0ZW0gPSB0b2RvVGV4dDtcblx0XHRcdHRvZG9PYmouc3RhdHVzID0gJCh0aGlzKS5oYXNDbGFzcygnY29tcGxldGUnKSA/ICdjb21wbGV0ZScgOiAnJztcblx0XHRcdHRvZG9BcnIucHVzaCh0b2RvT2JqKTtcblx0XHR9KVxuXHRcdHVzZXJPYmoudG9kb3MgPSB0b2RvQXJyO1xuXHRcdHVzZXJPYmouZGFya21vZGUgPSAkKCcjZGFyay1tb2RlJykuYXR0cigndmFsdWUnKTtcblx0XHR1c2VyT2JqLmRhdGVNb2RpZmllZCA9IG5vdy50b0lTT1N0cmluZygpO1xuXHRcdHJldHVybiB1c2VyT2JqO1xuXHR9XG5cblx0Ly9kZXNrdG9wIHdyaXRlIHRvIGRiXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBvYmogPSAodXNlcktleS5sZW5ndGggPiAwKSA/IGNyZWF0ZU9iaigpIDogbnVsbDtcblx0XHQkLnBvc3QoXCIvdXNlcnMvd3JpdGVcIiwge1xuXHRcdFx0XHRqc29uOiBKU09OLnN0cmluZ2lmeShvYmopLFxuXHRcdFx0fSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRcblx0Ly9tb2JpbGUgU2FmYXJpIHdyaXRlIHRvIGRiIChkb2Vzbid0IHN1cHBvcnQgdW5sb2FkKVxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBvYmogPSAodXNlcktleS5sZW5ndGggPiAwKSA/IGNyZWF0ZU9iaigpIDogbnVsbDtcblx0XHQkLnBvc3QoXCIvdXNlcnMvd3JpdGVcIiwge1xuXHRcdFx0XHRqc29uOiBKU09OLnN0cmluZ2lmeShvYmopLFxuXHRcdFx0fSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBkYXJrTW9kZSgpIHtcblx0JCgnI2RhcmstbW9kZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdkYXJrJyk7XG5cdFx0JCgnYm9keScpLnRvZ2dsZUNsYXNzKCdkYXJrLW1vZGUnKTtcblx0XHR2YXIgdmFsdWUgPSAkKHRoaXMpLmhhc0NsYXNzKCdkYXJrJykgPyAnb24nIDogJ29mZidcblx0XHQkKHRoaXMpLmF0dHIoJ3ZhbHVlJywgdmFsdWUpO1xuXHR9KTtcbn1cblxuJChrZXlNb2RhbCk7XG4kKHNvcnRhYmxlKTtcbiQoY3JlYXRlVG9kbyk7XG4kKGNvbXBsZXRlSXRlbSk7XG4kKGRlbGV0ZUl0ZW0pO1xuJChyZW5hbWVJdGVtKTtcbiQod3JpdGVEYXRhKTtcbiQoZGFya01vZGUpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==