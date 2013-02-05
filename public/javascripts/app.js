$(document).ready(function(){
	var todayRows = $("tr > td:nth-child(4)").filter(function() {
		return getDateDiff($(this).text()) <1;
	}).closest("tr").addClass("error");

	var nextWeekRows = $("tr > td:nth-child(4)").filter(function() {
		var x = getDateDiff($(this).text());
		if(x<8)
			return x>0;
		return false;
	}).closest("tr").addClass("warning");

	$("button.followUp").click(function(){
		$("#nextFollowUpDate").val("");
		$("#followUpModal").modal("show");
		id=$(this).attr("name");
	});

	$("button.resolve").click(function(){
		$("#resolveModal").modal("show");
		id=$(this).attr("name");
	});

	$("button.edit").click(function(){
		id=$(this).attr("name");
		$("#editIssueTitle").val($("form[name="+id+"] > input[name='issue']").val());
		$("#editIssueEscTo").val($("form[name="+id+"] > input[name='escto']").val());
		$("#editIssueFollowUpDate").val($("form[name="+id+"] > input[name='next']").val());
		$("#editModal").modal("show");
	});

	$("button.addButton").click(function(){
		$("#issueTitle").val("");
		$("#issueEscTo").val("");
		$("#issueLastFollowUpDate").val(getDateRep());
		$("#issueFollowUpDate").val("");
		$("#createModal").modal("show");
		
	});

	$("#createModal").on('shown', function(){$("#issueTitle").focus();})
	$("#followUpModal").on('shown', function(){$("#nextFollowUpDate").focus();})
	$("#resolveModal").on('shown', function(){$("#resolveButton").focus();})
	$("#editModal").on('shown', function(){$("#editIssueTitle").focus();})

	$("#updateButton").click(followUpComplete);

	$("#editButton").click(function(){
		var data =
		{
			"_id": id,
			"_rev": $("form[name="+id+"] > input[name='_revid']").val(),
			"title": $("#editIssueTitle").val() || $("form[name="+id+"] > input[name='issue']").val(),
			"subject": $("#editIssueEscTo").val() || $("form[name="+id+"] > input[name='escto']").val(),
			"previous": $("form[name="+id+"] > input[name='prev']").val(),
			"next": $("#editIssueFollowUpDate").val() || $("form[name="+id+"] > input[name='next']").val(),
			"resolved": "unresolved"
		}
		update(data);
	});

	$("#resolveButton").click(function(){
		var data=
		{
			"_id": id,
			"_rev": $("form[name="+id+"] > input[name='_revid']").val(),
			"title": $("form[name="+id+"] > input[name='issue']").val(),
			"subject": $("form[name="+id+"] > input[name='escto']").val(),
			"previous": $("form[name="+id+"] > input[name='prev']").val(),
			"next": $("form[name="+id+"] > input[name='next']").val(),
			"resolved": "resolved"
		};
		del(data);
	});

	$("#createButton").click(createComplete);

	$("#createModal > div > div> div > input").keypress(event, function(ev){if(13==event.keyCode)createComplete();})
	$("#followUpModal > div > div> div > input").keypress(event, function(ev){if(13==event.keyCode)followUpComplete();})
});

var id=0;
var revID=0;

function infoError(message){
	$("div.modal.in > div.modal-body").prepend([
			'<div class="alert alert-error">',
				'<button type="button" class="close" data-dismiss="alert">&times;</button>',
				'<h4>',
					message,
				'</h4>',
			'</div>'
		].join(""));

}

function create(data){
	var success = function(response){
		return location.href = "/issues";
	};

	// post to server
	$.ajax({
		"url" : "/issues",
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "POST",
		"success" : success
	});
}

function update(data){
	var success = function(response){
		return location.href = "/issues";
	};

	// put to server
	$.ajax({
		"url" : "/issues/"+data._id,
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "PUT",
		"success" : success
	});
}

function del(data){
	var success = function(response){
		return location.href = "/issues";
	};

	// put to server
	$.ajax({
		"url" : "/issues/"+data._id,
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "DELETE",
		"success" : success
	});
}

function getDateRep(){
	var d = new Date();
	return (d.getMonth()+1)+"/"+(d.getDate())+"/"+d.getFullYear();
}

function correctDateFormat(date){
	var pattern = /^([0-1]?[0-9])[\/|-]([0-3]?[0-9])[\/|-]((?:[0-9]{2})?[0-9]{2})$/g;
	var match = pattern.exec(date);
	if(match){
		var month=match[1];
		var day = match[2];
		var year= match[3];
		if(year.length<4){
			year="20"+year;
		}
		if(day>31||month>12){
			return false;
		}
		if(month<10&&month.length!=1){
			month=month[1];
		}
		return [month,"/",day,"/",year].join("");
	}
	else{
		return false;
	}
}

function getDateDiff(date) {
	var a=new Date(date);
	var b= new Date();
	return Math.floor(((a-b)/86400000))+1;
}

function followUpComplete(){
	var dnext = correctDateFormat($("#nextFollowUpDate").val());
	if(dnext&&getDateDiff(dnext)>-1){
		var data=
		{
			"_id": id,
			"_rev": $("form[name="+id+"] > input[name='_revid']").val(),
			"title": $("form[name="+id+"] > input[name='issue']").val(),
			"subject": $("form[name="+id+"] > input[name='escto']").val(),
			"previous": getDateRep(),
			"next": dnext,
			"resolved": "unresolved"
		};
		update(data);
	}
	else 
	{
		infoError("Dates must be valid dates!");
	}
}

function createComplete(){
	var dtitle = $("#issueTitle").val();
	var dsubject = $("#issueEscTo").val();
	var dprevious = correctDateFormat($("#issueLastFollowUpDate").val());
	var dnext = correctDateFormat($("#issueFollowUpDate").val());
	if(dtitle&&dsubject){
		if(dprevious&&dnext&&(getDateDiff(dnext)>-1)){
			var data=
			{
				"title": dtitle,
				"subject": dsubject,
				"previous": dprevious,
				"next": dnext,
				"resolved": "unresolved"
			};
			create(data);
		}
		else{
			infoError("Dates must be valid dates!");
		}
	}
	else{
		infoError("Please fill out all fields.");
	}
}